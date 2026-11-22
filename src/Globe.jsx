import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate, geoDistance, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import land50 from 'world-atlas/land-50m.json';
import land110 from 'world-atlas/land-110m.json';
import { findAirport } from './airports.js';

let LANDS = null;
const lands = () => (LANDS ||= { hi: feature(land50, land50.objects.land), lo: feature(land110, land110.objects.land) });
const GRAT = geoGraticule10();
const DEG = 180 / Math.PI;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// CSS 변수(light-dark 포함)를 실제 색으로 풀어서 캔버스에 사용
function readColors(el) {
  const cs = getComputedStyle(el);
  const probe = document.createElement('i');
  probe.style.display = 'none';
  el.appendChild(probe);
  const g = (n) => {
    probe.style.color = '';
    probe.style.color = `var(${n})`;
    return getComputedStyle(probe).color || '#888';
  };
  const out = {
    o1: g('--map-ocean-1'), o2: g('--map-ocean-2'), land: g('--map-land'), edge: g('--map-land-edge'), grat: g('--map-grat'),
    glow: g('--map-glow'), arc: g('--map-arc'), past: g('--map-arc-past'), sel: g('--map-arc-sel'), label: g('--map-label'),
    halo: g('--map-halo'), pill: g('--map-pill'), pillInk: g('--map-pill-ink'),
    font: cs.getPropertyValue('--font').trim() || 'sans-serif',
  };
  probe.remove();
  return out;
}

// 화면에 맞추기: 중심점과 확대 배율
function fitTarget(segs, w, h, insetL, insetB, baseR) {
  const pts = [];
  for (const s of segs) {
    const a = findAirport(s.from), b = findAirport(s.to);
    if (!a || !b) continue;
    const ip = geoInterpolate([a.lon, a.lat], [b.lon, b.lat]);
    for (let t = 0; t <= 1.0001; t += 0.125) pts.push(ip(t));
  }
  if (!pts.length) return { lon: 127.8, lat: 36, k: 3.2 };
  const c = segs.length === 1 ? pts[Math.floor(pts.length / 2)] : geoCentroid({ type: 'MultiPoint', coordinates: pts });
  let maxA = 0;
  for (const p of pts) maxA = Math.max(maxA, geoDistance(c, p));
  const avail = (Math.min(w - insetL, h - insetB) / 2) * 0.72;
  const ang = Math.max(maxA, 0.02);
  let R = ang >= 1.35 ? baseR : avail / Math.sin(ang);
  R = Math.max(baseR, Math.min(R, baseR * 60));
  return { lon: c[0], lat: Math.max(-70, Math.min(70, c[1])), k: R / baseR };
}

export default function Globe({ flights, selectedId, onSelect, insetLeft = 0, insetBottom = 0, today, interactive = true, fitKey }) {
  const wrap = useRef(null);
  const cvs = useRef(null);
  const st = useRef({ lon: 127.8, lat: 30, k: 1, w: 0, h: 0, dpr: 1, colors: null, anim: null, dragging: false, raf: 0 });
  const props = useRef({});
  props.current = { flights, selectedId, onSelect, insetLeft, insetBottom, today };

  const draw = () => {
    const s = st.current;
    const c = cvs.current;
    if (!c || !s.w) return;
    const { flights: fl, selectedId: sel, insetLeft: L, insetBottom: B, today: td } = props.current;
    const ctx = c.getContext('2d');
    const col = s.colors || (s.colors = readColors(wrap.current));
    const baseR = Math.min(s.w - L, s.h - B) * 0.42;
    const R = baseR * s.k;
    const cx = L + (s.w - L) / 2, cy = (s.h - B) / 2 + 4;
    const proj = geoOrthographic().rotate([-s.lon, -s.lat]).scale(R).translate([cx, cy]).clipAngle(90).precision(0.4);
    const path = geoPath(proj, ctx);
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    ctx.clearRect(0, 0, s.w, s.h);

    // 대기광
    const glow = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.12);
    glow.addColorStop(0, col.glow);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
    ctx.fill();
    // 바다
    const og = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
    og.addColorStop(0, col.o1);
    og.addColorStop(1, col.o2);
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = og;
    ctx.fill();
    // 경위선
    ctx.beginPath();
    path(GRAT);
    ctx.strokeStyle = col.grat;
    ctx.lineWidth = 0.6;
    ctx.stroke();
    // 육지
    const L2 = lands();
    ctx.beginPath();
    path(s.dragging && s.k < 2.5 ? L2.lo : L2.hi);
    ctx.fillStyle = col.land;
    ctx.fill();
    ctx.strokeStyle = col.edge;
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // 노선
    const center = [s.lon, s.lat];
    const visible = (p) => geoDistance(center, p) < Math.PI / 2 - 0.02;
    const segs = fl.filter((f) => findAirport(f.from) && findAirport(f.to));
    const order = [...segs].sort((a, b) => (a.id === sel) - (b.id === sel));
    const apCount = new Map();
    for (const f of order) {
      const a = findAirport(f.from), b = findAirport(f.to);
      const isSel = f.id === sel;
      const past = td && f.date < td;
      const line = { type: 'LineString', coordinates: [[a.lon, a.lat], [b.lon, b.lat]] };
      ctx.globalAlpha = sel && !isSel ? 0.28 : 1;
      if (isSel) {
        ctx.beginPath();
        path(line);
        ctx.strokeStyle = col.halo;
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.beginPath();
      path(line);
      ctx.strokeStyle = isSel ? col.sel : past ? col.past : col.arc;
      ctx.lineWidth = isSel ? 3.2 : past ? 1.5 : 2.2;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.globalAlpha = 1;
      for (const ap of [a, b]) apCount.set(ap.code, { ap, n: (apCount.get(ap.code)?.n || 0) + 1, sel: isSel || apCount.get(ap.code)?.sel });
    }

    // 공항 점
    const placed = [];
    const overlaps = (r) => placed.some((q) => r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y);
    const aps = [...apCount.values()].sort((x, y) => (y.sel - x.sel) || (y.n - x.n));
    for (const { ap } of aps) {
      const p = [ap.lon, ap.lat];
      if (!visible(p)) continue;
      const [x, y] = proj(p);
      ctx.beginPath();
      ctx.arc(x, y, 3.6, 0, Math.PI * 2);
      ctx.fillStyle = col.halo;
      ctx.fill();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = sel ? col.sel : col.arc;
      ctx.stroke();
    }
    // 라벨
    ctx.textBaseline = 'middle';
    for (const { ap, sel: isSelAp } of aps) {
      const p = [ap.lon, ap.lat];
      if (!visible(p)) continue;
      const [x, y] = proj(p);
      if (isSelAp && sel) {
        ctx.font = `700 12px ${col.font}`;
        const t = `${ap.city} ${ap.code}`;
        const tw = ctx.measureText(t).width + 16;
        const r = { x: x + 8, y: y - 12, w: tw, h: 24 };
        if (r.x + r.w > s.w - 8) r.x = x - 8 - tw;
        placed.push(r);
        ctx.fillStyle = col.pill;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(r.x, r.y, r.w, r.h, 12) : ctx.rect(r.x, r.y, r.w, r.h);
        ctx.fill();
        ctx.fillStyle = col.pillInk;
        ctx.fillText(t, r.x + 8, y);
        continue;
      }
      ctx.font = `700 12px ${col.font}`;
      const tw = ctx.measureText(ap.city).width;
      const r = { x: x + 7, y: y - 8, w: tw + 4, h: 16 };
      if (overlaps(r)) continue;
      placed.push(r);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = col.halo;
      ctx.lineJoin = 'round';
      ctx.strokeText(ap.city, x + 8, y);
      ctx.fillStyle = col.label;
      ctx.fillText(ap.city, x + 8, y);
    }
    s.proj = proj;
  };

  const request = () => {
    const s = st.current;
    if (s.raf) return;
    s.raf = requestAnimationFrame(() => {
      s.raf = 0;
      draw();
    });
  };

  const animateTo = (t, ms = 900) => {
    const s = st.current;
    const from = { lon: s.lon, lat: s.lat, k: s.k };
    let dl = ((t.lon - from.lon + 540) % 360) - 180;
    const t0 = performance.now();
    cancelAnimationFrame(s.anim);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const step = (now) => {
      const p = reduce ? 1 : Math.min(1, (now - t0) / ms);
      const e = ease(p);
      s.lon = from.lon + dl * e;
      s.lat = from.lat + (t.lat - from.lat) * e;
      s.k = Math.exp(Math.log(from.k) + (Math.log(t.k) - Math.log(from.k)) * e);
      draw();
      if (p < 1) s.anim = requestAnimationFrame(step);
    };
    s.anim = requestAnimationFrame(step);
  };

  const fit = (animate = true) => {
    const s = st.current;
    const { flights: fl, selectedId: sel, insetLeft: L, insetBottom: B } = props.current;
    if (!s.w) return;
    const segs = sel ? fl.filter((f) => f.id === sel) : fl;
    const baseR = Math.min(s.w - L, s.h - B) * 0.42;
    const t = fitTarget(segs.length ? segs : fl, s.w, s.h, L, B, baseR);
    if (animate) animateTo(t);
    else {
      Object.assign(s, t);
      draw();
    }
  };

  // 크기
  useEffect(() => {
    const el = wrap.current;
    const ro = new ResizeObserver(() => {
      const s = st.current;
      const r = el.getBoundingClientRect();
      s.w = r.width;
      s.h = r.height;
      s.dpr = Math.min(2.5, window.devicePixelRatio || 1);
      cvs.current.width = Math.round(s.w * s.dpr);
      cvs.current.height = Math.round(s.h * s.dpr);
      if (!s.fitted) {
        s.fitted = true;
        fit(false);
      } else draw();
    });
    ro.observe(el);
    // 테마 변경
    const recolor = () => {
      st.current.colors = null;
      request();
    };
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    mq?.addEventListener?.('change', recolor);
    const mo = new MutationObserver(recolor);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
    return () => {
      ro.disconnect();
      mo.disconnect();
      mq?.removeEventListener?.('change', recolor);
      cancelAnimationFrame(st.current.anim);
      cancelAnimationFrame(st.current.raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 선택·데이터 변화 → 맞추기
  useEffect(() => {
    if (st.current.fitted) fit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, fitKey, insetLeft, insetBottom]);
  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flights, today]);

  // 조작
  useEffect(() => {
    if (!interactive) return;
    const c = cvs.current;
    const s = st.current;
    const ptrs = new Map();
    let moved = 0, last = null, pinch = null;
    const R = () => Math.min(s.w - props.current.insetLeft, s.h - props.current.insetBottom) * 0.42 * s.k;
    const down = (e) => {
      c.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      cancelAnimationFrame(s.anim);
      moved = 0;
      last = { x: e.clientX, y: e.clientY };
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: s.k };
      }
    };
    const move = (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 2 && pinch) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        s.k = Math.max(0.8, Math.min(60, (pinch.k * d) / pinch.d));
        s.dragging = true;
        moved += 10;
        request();
        return;
      }
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved < 3) return;
      s.dragging = true;
      const r = R();
      s.lon -= (dx / r) * DEG;
      s.lat = Math.max(-80, Math.min(80, s.lat + (dy / r) * DEG));
      request();
    };
    const up = (e) => {
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (ptrs.size === 0) {
        const was = s.dragging;
        s.dragging = false;
        if (was) request();
        if (moved < 4) hit(e);
      }
    };
    const hit = (e) => {
      const { flights: fl, onSelect } = props.current;
      if (!onSelect || !s.proj) return;
      const rect = c.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const center = [s.lon, s.lat];
      let best = null, bd = 14;
      for (const f of fl) {
        const a = findAirport(f.from), b = findAirport(f.to);
        if (!a || !b) continue;
        const ip = geoInterpolate([a.lon, a.lat], [b.lon, b.lat]);
        for (let t = 0; t <= 1; t += 1 / 40) {
          const p = ip(t);
          if (geoDistance(center, p) > Math.PI / 2 - 0.02) continue;
          const q = s.proj(p);
          const d = Math.hypot(q[0] - x, q[1] - y);
          if (d < bd) {
            bd = d;
            best = f.id;
          }
        }
      }
      if (best) onSelect(best);
    };
    const wheel = (e) => {
      e.preventDefault();
      cancelAnimationFrame(s.anim);
      s.k = Math.max(0.8, Math.min(60, s.k * Math.exp(-e.deltaY * 0.0016)));
      request();
    };
    c.addEventListener('pointerdown', down);
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerup', up);
    c.addEventListener('pointercancel', up);
    c.addEventListener('wheel', wheel, { passive: false });
    return () => {
      c.removeEventListener('pointerdown', down);
      c.removeEventListener('pointermove', move);
      c.removeEventListener('pointerup', up);
      c.removeEventListener('pointercancel', up);
      c.removeEventListener('wheel', wheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive]);

  // 외부 제어 (확대/축소/전체 보기)
  useEffect(() => {
    const el = wrap.current;
    el.__globe = {
      zoom: (f) => animateTo({ lon: st.current.lon, lat: st.current.lat, k: Math.max(0.8, Math.min(60, st.current.k * f)) }, 350),
      fit: () => fit(true),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrap} style={{ position: 'absolute', inset: 0 }} className="globe">
      <canvas ref={cvs} aria-label="내 항공편 노선 지도" role="img" style={{ touchAction: interactive ? 'none' : 'auto', cursor: interactive ? undefined : 'default' }} />
    </div>
  );
}
