// Vercel 서버 함수: GET /api/hotels?lat=21.03&lon=105.85[&r=25000]
//   → { hotels: [{ id, name, nameEn, brand, lat, lon, km }], source }
// 아코르는 호텔 목록 API를 공개하지 않아서 OpenStreetMap(Overpass)에서 아코르 브랜드 호텔을 찾음
// 도시 좌표(소수 2자리로 반올림)별로 Vercel CDN에 7일 캐시
import { detectBrand } from '../src/brands.js';

export const config = { maxDuration: 30 };

const MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];
const NAME_RE =
  'novotel|ibis|sofitel|mercure|pullman|fairmont|raffles|swiss.?tel|m.e?venpick|gallery|mondrian|adagio|mama shelter|peppers|mantra|banyan tree|angsana|25 ?hours|hoxton|rixos|so/|art series|breakfree|jo.?joe|faena|delano|' +
  '노보텔|이비스|소피텔|머큐어|풀만|페어몬트|래플|스위스|벤픽|몬드리안|아다지오|반얀|갤러리';
const TOURISM = '^(hotel|apartment|resort|motel|guest_house|hostel)$';

export function buildQuery(lat, lon, r) {
  const a = `(around:${r},${lat},${lon})`;
  return `[out:json][timeout:25];(
nwr["tourism"~"${TOURISM}"]["brand"~"${NAME_RE}",i]${a};
nwr["tourism"~"${TOURISM}"]["name"~"${NAME_RE}",i]${a};
nwr["tourism"~"${TOURISM}"]["name:en"~"${NAME_RE}",i]${a};
nwr["tourism"~"${TOURISM}"]["operator"~"accor",i]${a};
);out center tags 400;`;
}

const km = (a, b, c, d) => {
  const R = 6371, t = Math.PI / 180;
  const x = Math.sin(((c - a) * t) / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};
const latin = (s) => /^[\x00-\u024f\u1e00-\u1eff\s'\u2019&\-\u2013.,()/0-9]+$/.test(s || '');

export function parseOverpass(json, lat, lon) {
  const out = [];
  for (const el of json?.elements || []) {
    const t = el.tags || {};
    const y = el.lat ?? el.center?.lat, x = el.lon ?? el.center?.lon;
    if (y == null || x == null || !t.name) continue;
    const brand = detectBrand(t['name:en'], t.name, t.brand, t['brand:en']);
    if (!brand) continue;
    const ko = t['name:ko'] || (!latin(t.name) && /[가-힣]/.test(t.name) ? t.name : '');
    const en = t['name:en'] || (latin(t.name) ? t.name : '');
    out.push({ id: `${el.type[0]}${el.id}`, name: ko || en || t.name, nameEn: en && en !== (ko || t.name) ? en : '', brand, lat: +y.toFixed(5), lon: +x.toFixed(5), km: Math.round(km(lat, lon, y, x) * 10) / 10 });
  }
  // 같은 호텔(이름 같거나 같은 브랜드 150m 이내) 하나로
  out.sort((a, b) => a.km - b.km);
  const keep = [];
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
  for (const h of out) {
    if (keep.some((k) => norm(k.name) === norm(h.name) || (k.brand === h.brand && km(k.lat, k.lon, h.lat, h.lon) < 0.15))) continue;
    keep.push(h);
  }
  return keep.slice(0, 200);
}

export default async function handler(req, res) {
  if (req.query.ping) return res.status(200).json({ ok: true, brand: detectBrand('Novotel Suites Hanoi') });
  if (req.query.diag) {
    // 점검: 서버·요청 방식별로 아주 작은 질의를 7초 안에
    const out = [];
    const q = '[out:json][timeout:5];node["tourism"="hotel"](around:500,21.03,105.85);out tags 3;';
    const enc = encodeURIComponent(q);
    const tries = [
      ['de-post-ua', 'https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + enc, headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'TierRun/1.0 (+https://tierrun.vercel.app)', Accept: '*/*' } }],
      ['de-post-plain', 'https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + enc, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }],
      ['de-get', 'https://overpass-api.de/api/interpreter?data=' + enc, { headers: { 'User-Agent': 'TierRun/1.0 (+https://tierrun.vercel.app)', Accept: 'application/json' } }],
      ['kumi', 'https://overpass.kumi.systems/api/interpreter', { method: 'POST', body: 'data=' + enc, headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'TierRun/1.0 (+https://tierrun.vercel.app)' } }],
      ['coffee-get', 'https://overpass.private.coffee/api/interpreter?data=' + enc, { headers: { 'User-Agent': 'TierRun/1.0 (+https://tierrun.vercel.app)' } }],
    ];
    await Promise.all(tries.map(async ([name, url, opt]) => {
      const t = Date.now();
      try {
        const ctl = new AbortController();
        const tm = setTimeout(() => ctl.abort(), 7000);
        const r = await fetch(url, { ...opt, signal: ctl.signal });
        clearTimeout(tm);
        const txt = await r.text();
        out.push({ name, status: r.status, ms: Date.now() - t, n: (txt.match(/"type"/g) || []).length });
      } catch (e) {
        out.push({ name, err: String(e.name === 'AbortError' ? 'timeout' : e.message || e), ms: Date.now() - t });
      }
    }));
    return res.status(200).json(out);
  }
  const lat = Math.round(+req.query.lat * 100) / 100, lon = Math.round(+req.query.lon * 100) / 100;
  const r = Math.min(40000, Math.max(3000, +req.query.r || 25000));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return res.status(400).json({ error: '좌표가 필요해요.' });
  }
  const body = 'data=' + encodeURIComponent(buildQuery(lat, lon, r));
  const errs = [];
  const t0 = Date.now();
  for (const url of MIRRORS) {
    if (Date.now() - t0 > 14000) break;
    try {
      const ctl = new AbortController();
      const tm = setTimeout(() => ctl.abort(), 8000);
      const resp = await fetch(url, { method: 'POST', body, signal: ctl.signal, headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'tierrun.vercel.app (hotel list)' } });
      clearTimeout(tm);
      if (!resp.ok) throw new Error(`${new URL(url).host} ${resp.status}`);
      const j = await resp.json();
      const hotels = parseOverpass(j, lat, lon);
      res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=1209600');
      return res.status(200).json({ hotels, source: 'OpenStreetMap' });
    } catch (e) {
      errs.push(`${new URL(url).host}: ${String(e.name === 'AbortError' ? 'timeout' : e.message || e)} (${Date.now() - t0}ms)`);
    }
  }
  // 실패도 200으로 돌려줘서(본문 error) 브라우저·점검 도구에서 이유를 볼 수 있게
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ hotels: [], error: '호텔 목록을 가져오지 못했어요.', detail: errs });
}
