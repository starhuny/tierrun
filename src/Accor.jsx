import { useEffect, useMemo, useRef, useState } from 'react';
import { loadCities, searchCities } from './cities.js';
import { fetchHotels, filterHotels } from './hotels.js';
import { detectBrand } from './brands.js';
import { AC_BENEFITS, AC_EXTRAS, AC_BENEFITS_CHECKED } from './accorBenefits.js';
import { findAirport } from './airports.js';
import { fmtNum, fmtDate, fmtDot, fmtWon, daysBetween, todayISO, uid, addDays } from './core.js';
import {
  AC_TIERS, AC_TIER, BRAND_GROUPS, DEFAULT_EUR, acSummary, pointsCost, acYear, remText, stayNights, stayPoints, stayDate, brandRate, bonusEvents, isV2, overlapStays, isZhStay, isBonusStay, bonusLabel, makeZhStay, makeBonusStay, ZH_NIGHTS,
} from './accor.js';
import { Icon, AirlineMark, Bar, Seg, NumInput, WonInput, DateInput, AirportInput, Ring, CardFace } from './ui.jsx';

const city = (c) => findAirport(c)?.city || c || '';
// 숙박 위치 이름 (새 형식: 도시 / 예전 형식: 공항 코드)
export const stayPlace = (s) => s.cityName || city(s.city);

// 세계 도시 검색 입력
function CityInput({ value, onPick }) {
  const [list, setList] = useState(null);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef(null);
  useEffect(() => { loadCities().then(setList); }, []);
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', h);
    return () => document.removeEventListener('pointerdown', h);
  }, []);
  const results = useMemo(() => searchCities(list, q, 8), [list, q]);
  const pick = (c) => { onPick(c); setQ(''); setOpen(false); };
  return (
    <label className="field ap-pick" ref={ref}>
      <span>도시 <span className="faint">(지도에 핀으로 표시)</span></span>
      <input
        className="input"
        placeholder={list ? '도시 이름 (한글·영문)' : '도시 목록 불러오는 중…'}
        value={open ? q : value || ''}
        onFocus={() => { setOpen(true); setQ(''); setHi(0); }}
        onChange={(e) => { setQ(e.target.value); setHi(0); setOpen(true); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') setHi((h) => Math.min(h + 1, results.length - 1));
          else if (e.key === 'ArrowUp') setHi((h) => Math.max(h - 1, 0));
          else if (e.key === 'Enter') { e.preventDefault(); if (results[hi]) pick(results[hi]); }
          else if (e.key === 'Escape') setOpen(false);
        }}
      />
      {open && results.length > 0 && (
        <div className="ap-menu" role="listbox">
          {results.map((c, i) => (
            <button type="button" key={`${c.en}${c.cc}${c.lat}`} className={i === hi ? 'hi' : ''} onPointerDown={(e) => e.preventDefault()} onClick={() => pick(c)}>
              <b>{c.cc}</b>
              <span>{c.ko}</span>
              <small>{c.en}</small>
            </button>
          ))}
        </div>
      )}
    </label>
  );
}
const thisYear = (today) => +today.slice(0, 4);

// 도시 주변 아코르 호텔 고르기 (이름 입력칸 겸 검색)
function HotelPicker({ s, set, onTypeName }) {
  const cLat = s.cityLat ?? s.lat, cLon = s.cityLon ?? s.lon;
  const has = cLat != null && cLon != null;
  const [st, setSt] = useState({ k: '', list: null, err: false });
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState(false);
  const [brand, setBrand] = useState('');
  const k = has ? `${(+cLat).toFixed(2)},${(+cLon).toFixed(2)}` : '';
  useEffect(() => {
    if (!k || st.k === k) return;
    let live = true;
    setSt({ k, list: null, err: false });
    fetchHotels(cLat, cLon).then((list) => live && setSt({ k, list, err: false })).catch(() => live && setSt({ k, list: [], err: true }));
    return () => { live = false; };
  }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  // 도시를 새로 고르면 목록을 펼침
  const prevK = useRef(k);
  useEffect(() => { if (k && prevK.current !== k && !s.hotelId) setOpen(true); prevK.current = k; }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  const list = st.list || [];
  const brands = useMemo(() => {
    const m = new Map();
    for (const h of list) m.set(h.brand, (m.get(h.brand) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [list]);
  const shown = filterHotels(list, typed ? s.hotel : '', brand);
  const pick = (h) => {
    set({ hotel: h.name, hotelEn: h.nameEn || '', brand: h.brand, lat: h.lat, lon: h.lon, hotelId: h.id });
    setTyped(false); setOpen(false); setBrand('');
  };
  const sel = s.hotelId ? list.find((h) => h.id === s.hotelId) : null;
  return (
    <div className="field">
      <span>호텔</span>
      <input
        className="input"
        value={s.hotel}
        placeholder={has ? '목록에서 고르거나 이름 입력' : '예: 노보텔 앰배서더 서울 동대문'}
        onFocus={() => has && setOpen(true)}
        onChange={(e) => { onTypeName(e.target.value); setTyped(true); if (has) setOpen(true); }}
      />
      {!has && <div className="help" style={{ margin: 0 }}>도시를 먼저 고르면 그 도시의 아코르 호텔 목록이 떠요.</div>}
      {has && !open && (
        <button type="button" className="hpicked" onClick={() => setOpen(true)}>
          {s.hotelId ? <span><b>{s.brand}</b>{sel ? ` · 도심에서 ${sel.km}km` : ''} · 지도에 호텔 위치로 표시</span> : <span>{s.cityName || '이 도시'} 아코르 호텔 목록 보기</span>}
          <small>{s.hotelId ? '다른 호텔' : '열기'}</small>
        </button>
      )}
      {has && open && (
        <div className="hlist">
          <div className="hlist-h">
            <span>{st.list == null ? '호텔 목록 불러오는 중…' : st.err ? '목록을 불러오지 못했어요' : `${s.cityName || '이 도시'} 아코르 호텔 ${list.length}곳 · 가까운 순`}</span>
            <button type="button" className="lnk" onClick={() => setOpen(false)}>닫기</button>
          </div>
          {brands.length > 1 && (
            <div className="hchips">
              <button type="button" className={!brand ? 'on' : ''} onClick={() => setBrand('')}>전체</button>
              {brands.map(([b, n]) => <button type="button" key={b} className={brand === b ? 'on' : ''} onClick={() => setBrand(brand === b ? '' : b)}>{b} <small>{n}</small></button>)}
            </div>
          )}
          <div className="hrows">
            {shown.map((h) => (
              <button type="button" key={h.id} className={`hrow${s.hotelId === h.id ? ' on' : ''}`} onClick={() => pick(h)}>
                <span className="hb">{h.brand.replace(/^ibis /, 'ibis\u00a0')}</span>
                <span className="hn"><b>{h.name}</b><small>{h.nameEn ? `${h.nameEn} · ` : ''}{h.km}km</small></span>
              </button>
            ))}
            {st.list != null && !shown.length && (
              <p className="help" style={{ margin: '6px 4px' }}>
                {st.err ? '이름을 직접 넣어 주세요. 브랜드는 이름에서 알아서 골라요.' : list.length ? `‘${s.hotel}’와 맞는 호텔이 없어요. 적은 이름 그대로 저장돼요.` : '이 도시에서 찾은 아코르 호텔이 없어요. 이름을 직접 넣어 주세요.'}
              </p>
            )}
          </div>
          <div className="hlist-f">OpenStreetMap 기준이라 새로 연 호텔은 빠져 있을 수 있어요.</div>
        </div>
      )}
    </div>
  );
}

/* ───────── 카드 ───────── */
export function acFace(prog, stays, today) {
  const s = acSummary(prog, stays, today, undefined, prog?.eur);
  const t = s.held;
  return {
    bg: t.bg, ink: t.ink, en: 'ACCOR · ALL', title: t.en, airline: 'ALL',
    sub: prog?.validUntil ? `${fmtDot(prog.validUntil)}까지` : '호텔',
    foot: s.achieved ? (
      <div className="wline"><b>✓ {s.year} {s.achieved.name} 달성</b><span>{s.next && !s.stretch ? `${s.next.name}까지 ${remText(s)}` : `${fmtNum(s.conf.nights)}박 · ${fmtNum(s.conf.points)}P`}</span></div>
    ) : (
      <div className="wline"><b>{s.next ? `${s.goal}까지 ${remText(s)}` : `${s.year}년 최고 등급`}</b><span>{s.year} · {fmtNum(s.conf.nights)}박 · {fmtNum(s.conf.points)}P</span></div>
    ),
    conf: s.achieved && (s.stretch || !s.next) ? 1 : s.conf01, plan: s.achieved && (s.stretch || !s.next) ? 0 : Math.max(0, s.all01 - s.conf01),
  };
}

/* ───────── 내 항공편 맨 위 띠 ───────── */
export function AcStrip({ prog, ctx, onClick }) {
  const s = acSummary(prog, ctx.stays || [], ctx.today, undefined, prog?.eur);
  return (
    <button className="strip ac" onClick={onClick} aria-label="아코르 등급 보기">
      <div>
        <div className="t"><AirlineMark code="ALL" size="xs" />{s.achieved ? `아코르 ${s.year} ${s.achieved.name} 달성` : `아코르 ${s.held.name}${s.next ? (s.keep ? ' · 유지' : ` → ${s.next.name}`) : ''}`}</div>
        <div className="v num">{s.achieved ? (s.next && !s.stretch ? `${s.next.name}까지 ${remText(s)}` : `${fmtDot(s.validUntil)}까지 유지`) : s.next ? `${remText(s)} 남음` : '달성했어요'}</div>
      </div>
      <div className="num" style={{ fontWeight: 800, fontSize: 18 }}>{s.achieved && (s.stretch || !s.next) ? '✓' : `${Math.floor(s.conf01 * 100)}%`}</div>
      <Bar conf={s.achieved && (s.stretch || !s.next) ? 1 : s.conf01} plan={s.achieved && (s.stretch || !s.next) ? 0 : Math.max(0, s.all01 - s.conf01)} thin done={!!s.achieved} />
    </button>
  );
}

/* ───────── 티어 추가·수정 ───────── */
export function AccorAddView({ entry, ctx, fx, onSave, onDelete, onClose }) {
  const yr = thisYear(ctx.today);
  const editing = !!entry;
  const [tier, setTier] = useState(entry?.tier || 'CLASSIC');
  const [validUntil, setValid] = useState(entry?.validUntil || '');
  const [nights, setNights] = useState(entry?.nights ?? null);
  const [points, setPoints] = useState(entry?.points ?? null);
  const [explorer, setExplorer] = useState(!!entry?.explorer);
  const legacy = !!entry && !isV2(entry);
  const overlap = overlapStays({ ...(entry || {}), v: 2, baseDate: entry?.baseDate || ctx.today, nights, points }, ctx.stays);
  // 예전 입력은 '다음 갱신일'이었으니 미래 날짜면 1년 전(최근 갱신일)으로 바꿔 보여 줌
  const [explorerDate, setExplorerDate] = useState(() => {
    const d = entry?.explorerDate || '';
    return legacy && d && d > ctx.today ? `${+d.slice(0, 4) - 1}${d.slice(4)}` : d;
  });
  const [eur, setEur] = useState(entry?.eur || fx?.rate || DEFAULT_EUR);
  const [eurAuto, setEurAuto] = useState(entry?.eurAuto !== false);
  const [ask, setAsk] = useState(false);
  const save = () => {
    const changed = (+nights || 0) !== (+entry?.nights || 0) || (+points || 0) !== (+entry?.points || 0);
    const has = +nights > 0 || +points > 0;
    const baseDate = !has ? '' : changed || !entry?.baseDate ? todayISO() : entry.baseDate;
    onSave({
      ...(entry || {}), program: 'ALL', tier, validUntil, nights: +nights || 0, points: +points || 0, baseDate,
      v: 2, explorer, explorerDate: explorer ? explorerDate : '', zh: false, zhDate: '', eurAuto, eur: eurAuto ? fx?.rate || +eur || DEFAULT_EUR : +eur || DEFAULT_EUR,
      fast: [],
    });
  };
  return (
    <div className="fade-in">
      <div className="dhead">
        <AirlineMark code="ALL" />
        <div><div className="k">{editing ? '티어 수정' : '지갑에 티어 추가'}</div><h2>아코르 ALL</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div className="form">
        <div className="field">
          <span>지금 가진 등급</span>
          <div className="tierpick">
            {AC_TIERS.map((t) => (
              <button key={t.id} type="button" className={tier === t.id ? 'on' : ''} style={{ background: t.bg, color: t.ink }} onClick={() => setTier(t.id)} aria-pressed={tier === t.id}><span>{t.en}</span></button>
            ))}
          </div>
        </div>
        <label className="field"><span>등급 유효기간 <span className="faint">(아코르 앱 카드에 적힌 날짜)</span></span><DateInput value={validUntil} onChange={setValid} /></label>
        <div className="segcard">
          <div className="sh">{yr}년 실적 중 기록하지 않은 부분</div>
          <div className="row2">
            <label className="field"><span>등급 숙박일</span><NumInput value={nights} suffix="박" placeholder="0" onChange={setNights} /></label>
            <label className="field"><span>등급 포인트</span><NumInput value={points} suffix="P" placeholder="0" onChange={setPoints} /></label>
          </div>
          <p className="help" style={{ margin: 0 }}>숙박을 하나하나 기록하지 않고 숫자로만 넣고 싶을 때 쓰는 칸이에요. 아코르 앱 <b>내 계정 › 대시보드</b> 숫자에서 <b>기록한 숙박과 보너스 박(Explorer·중올플·패스트트랙 등)을 뺀 나머지</b>를 넣어 주세요. <b>올해 숙박을 다 기록했다면 둘 다 0</b>이에요.</p>
          {overlap && (
            <div className="notice" style={{ margin: 0 }}>
              {yr}년에 기록한 숙박이 {overlap.count}건({fmtNum(overlap.nights)}박 · 약 {fmtNum(overlap.points)}P) 있어요. 위 숫자에 이 숙박이 들어 있으면 두 번 세져요.
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <button type="button" className="btn sm" onClick={() => { setNights(0); setPoints(0); }}>다 기록했어요 · 0으로</button>
                <button type="button" className="btn sm ghost" onClick={() => { setNights(Math.max(0, (+nights || 0) - overlap.nights)); setPoints(Math.max(0, (+points || 0) - overlap.points)); }}>기록한 만큼 빼기</button>
              </div>
            </div>
          )}
        </div>
        <div className="segcard">
          <div className="sh">Accor+ Explorer</div>
          <label className="checkrow light">
            <input type="checkbox" checked={explorer} onChange={(e) => setExplorer(e.target.checked)} />
            <span>가입했어요 <small>(가입·갱신할 때마다 30박이 자동으로 들어가요)</small></span>
          </label>
          {explorer && (
            <label className="field"><span>가입일 또는 최근 갱신일</span><DateInput value={explorerDate} onChange={setExplorerDate} /></label>
          )}
          <p className="help" style={{ margin: 0 }}>중올플·패스트트랙·플라잉블루 이벤트처럼 한 번 받는 보너스 박은 <b>+ › 숙박 추가 › 보너스 박</b>으로 넣어요. 숙박과 같이 날짜순 기록에 보여요.</p>
        </div>
        <div className="segcard">
          <div className="sh">환율 <span className="faint" style={{ fontWeight: 600, fontSize: 12 }}>숙박 금액 원화 → 유로 (등급 포인트 추정용)</span></div>
          <label className="checkrow light">
            <input type="checkbox" checked={eurAuto} onChange={(e) => setEurAuto(e.target.checked)} />
            <span>매일 자동으로 맞추기 <small>{fx ? `오늘 1유로 = ${fmtNum(fx.rate)}원 · ${fx.date ? `${fmtDot(fx.date)} 기준 · ` : ''}${fx.source}` : '환율을 아직 받아오지 못했어요 (기본값 사용)'}</small></span>
          </label>
          {!eurAuto && <label className="field"><span>직접 입력</span><NumInput value={eur} suffix="원 / 1유로" onChange={setEur} /></label>}
        </div>
        {editing && (
          ask ? (
            <div className="row2">
              <button className="btn sm danger" onClick={onDelete}>지갑에서 빼기</button>
              <button className="btn sm ghost" onClick={() => setAsk(false)}>취소</button>
            </div>
          ) : (
            <button className="btn sm ghost danger-t" onClick={() => setAsk(true)}><Icon name="trash" size={15} />지갑에서 빼기 (숙박 기록은 그대로)</button>
          )
        )}
      </div>
      <div className="sumbar">
        <button className="btn primary block" onClick={save}>{editing ? '저장' : '지갑에 추가'}</button>
      </div>
    </div>
  );
}

/* ───────── 숙박 한 줄 ───────── */
export function StayRow({ s, ctx, onClick }) {
  if (isBonusStay(s)) return <StayBonusRow s={s} ctx={ctx} onClick={onClick} />;
  const n = stayNights(s);
  const p = stayPoints(s, ctx.acProg?.eur);
  const d = daysBetween(ctx.today, s.checkIn || s.checkOut);
  const out = (s.checkOut || '') < ctx.today;
  return (
    <button className="frow stayrow" onClick={onClick}>
      {out ? <div className="dday"><span className="done"><Icon name="check" size={16} stroke={2.6} /></span><small>숙박 완료</small></div>
        : d <= 0 ? <div className="dday today"><b>숙박 중</b></div>
        : <div className="dday"><b className="num">{d}</b><small>일 후</small></div>}
      <div>
        <div className="fmeta">
          <span className="mark sm bed"><Icon name="bed" size={13} /></span>
          <span>{s.brand || '호텔'}</span>
          <span className="d">{fmtDate(s.checkIn)}</span>
        </div>
        <div className="ftitle">{s.hotel || '호텔'}</div>
        <div className="ftimes num">
          <span>{stayPlace(s)}</span>
          <span>{fmtDate(s.checkIn, { weekday: false })} → {fmtDate(s.checkOut, { weekday: false })}</span>
        </div>
        <div className="fchips num">
          <span className="chip"><b>+{n}</b>박</span>
          <span className="chip"><b>+{fmtNum(p.pts)}</b>P{p.est ? ' 추정' : ''}</span>
          {+s.krw > 0 && n > 0 && <span className="chip"><b>{fmtWon(s.krw / n)}</b>/박</span>}
          <span className="badge cr-ALL">아코르</span>
        </div>
      </div>
    </button>
  );
}

// 보너스 박 한 줄 (중올플·패스트트랙 등 기록 / Explorer 자동)
export function BonusRow({ label, nights, date, sub, krw, ctx, onClick, auto }) {
  const d = daysBetween(ctx.today, date);
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag className={`frow stayrow bonusrow${auto ? ' auto' : ''}`} onClick={onClick}>
      {d < 0 ? <div className="dday"><span className="done"><Icon name="check" size={16} stroke={2.6} /></span><small>적용됨</small></div>
        : d === 0 ? <div className="dday today"><b>오늘</b></div>
        : <div className="dday"><b className="num">{d}</b><small>일 후</small></div>}
      <div>
        <div className="fmeta">
          <span className="mark sm bonus"><Icon name="plus" size={13} /></span>
          <span>보너스 박{auto ? ' · 자동' : ''}</span>
          <span className="d">{fmtDate(date)}</span>
        </div>
        <div className="ftitle">{label} <span className="bn num">+{nights}박</span></div>
        {sub && <div className="ftimes"><span>{sub}</span></div>}
        {+krw > 0 && <div className="fchips num"><span className="chip"><b>{fmtWon(krw / nights)}</b>/박</span></div>}
      </div>
    </Tag>
  );
}
function StayBonusRow({ s, ctx, onClick }) {
  const n = stayNights(s);
  return <BonusRow label={bonusLabel(s)} nights={n} date={s.checkIn} sub={isZhStay(s) ? '중국 Accor Plus · 한 번만' : s.note || ''} krw={s.krw} ctx={ctx} onClick={onClick} />;
}

// 보너스 박 입력
const BONUS_KINDS = [
  { id: 'zh', label: '중올플 활성화', nights: ZH_NIGHTS, help: '중국 Accor Plus를 사서 활성화하면 20박이 한 번 들어와요.' },
  { id: 'fast', label: '패스트트랙 (1+9)', nights: 9, help: '패스트트랙 오퍼로 받은(받을) 보너스 박이에요.' },
  { id: 'fb', label: '플라잉블루 이벤트 (1+1)', nights: null, help: '묵은 만큼 더 주는 이벤트는 받은 보너스 박수만 넣어 주세요.' },
  { id: 'etc', label: '', nights: null, help: '이름과 박수를 직접 넣어 주세요.' },
];
const kindOf = (s) => (isZhStay(s) ? 'zh' : BONUS_KINDS.find((k) => k.label && k.label === s.hotel)?.id || 'etc');
function BonusForm({ s, set, setS, tried, otherZh, editing }) {
  const k = kindOf(s);
  const kd = BONUS_KINDS.find((x) => x.id === k);
  const pick = (id) => {
    const x = BONUS_KINDS.find((y) => y.id === id);
    const base = id === 'zh' ? makeZhStay(s.checkIn, s.id) : makeBonusStay(s.checkIn, s.id, x.label, x.nights);
    setS({ ...base, krw: s.krw, note: s.note });
  };
  return (
    <div className="segcard">
      {!editing && (
        <div className="bkinds">
          {BONUS_KINDS.map((x) => <button key={x.id} type="button" className={k === x.id ? 'on' : ''} onClick={() => pick(x.id)}>{x.id === 'etc' ? '직접 입력' : x.label}{x.nights ? <small> +{x.nights}</small> : null}</button>)}
        </div>
      )}
      <p className="help" style={{ margin: 0 }}>{kd.help} 들어온 날이 속한 해의 등급에 더해져요.</p>
      {k === 'zh' && otherZh && <div className="notice" style={{ margin: 0 }}>이미 {fmtDot(otherZh.checkIn)} 중올플 기록이 있어요. 한 번만 받는 보너스라 중복되지 않게 확인해 주세요.</div>}
      {k !== 'zh' && <label className="field"><span>이름</span><input className="input" value={s.hotel} placeholder="예: 패스트트랙 (1+9)" onChange={(e) => set({ hotel: e.target.value })} /></label>}
      <div className="row2">
        <label className="field"><span>{k === 'zh' ? '활성화한 날' : '들어온 날'}</span><DateInput value={s.checkIn} onChange={(v) => set({ checkIn: v, checkOut: v })} invalid={tried && !s.checkIn} /></label>
        <label className="field"><span>보너스 박</span><NumInput value={s.nightsOverride} suffix="박" placeholder={k === 'zh' ? String(ZH_NIGHTS) : '0'} onChange={(v) => set({ nightsOverride: v })} /></label>
      </div>
      {tried && (!s.checkIn || (k !== 'zh' && !(+s.nightsOverride > 0))) && <div className="err-t">날짜와 박수를 넣어 주세요.</div>}
      <label className="field"><span>결제 금액 <span className="faint">(선택 · 단가 탭 박당 비용에 포함)</span></span><WonInput value={s.krw} onChange={(v) => set({ krw: v })} /></label>
      <label className="field"><span>메모 <span className="faint">(선택)</span></span><input className="input" value={s.note || ''} onChange={(e) => set({ note: e.target.value })} /></label>
    </div>
  );
}

/* ───────── 숙박 추가·수정 ───────── */
const blankStay = () => ({ id: null, hotel: '', brand: 'Novotel', city: '', checkIn: '', checkOut: '', krw: null, nightsOverride: null, pointsOverride: null, note: '' });
export function StayForm({ initial, ctx, onSave, onDelete, onCancel }) {
  const [s, setS] = useState(() => ({ ...blankStay(), ...(initial || {}) }));
  const [tried, setTried] = useState(false);
  const [del, setDel] = useState(false);
  const [brandTouched, setBrandTouched] = useState(!!initial?.id);
  const set = (p) => setS((x) => ({ ...x, ...p }));
  const n = stayNights({ ...s, nightsOverride: null });
  const p = stayPoints({ ...s, pointsOverride: null }, ctx.acProg?.eur);
  const zh = isBonusStay(s);
  const otherZh = (ctx.stays || []).find((x) => isZhStay(x) && x.id !== s.id);
  const valid = zh ? !!s.checkIn && (isZhStay(s) || (+s.nightsOverride > 0 && s.hotel.trim())) : s.hotel.trim() && s.checkIn && s.checkOut && s.checkOut > s.checkIn;
  const save = () => {
    setTried(true);
    if (!valid) return;
    const krw = s.krw == null || s.krw === '' ? null : +s.krw;
    if (zh) return onSave({ ...s, id: s.id || uid(), hotel: s.hotel.trim(), checkOut: s.checkIn, nightsOverride: +s.nightsOverride > 0 ? +s.nightsOverride : ZH_NIGHTS, pointsOverride: 0, krw });
    onSave({ ...s, id: s.id || uid(), kind: undefined, hotel: s.hotel.trim(), krw });
  };
  // 새로 넣을 때만 종류를 고를 수 있음
  const setKind = (k) => {
    if (k === (zh ? 'bonus' : 'stay')) return;
    setTried(false);
    setS(k === 'bonus' ? makeBonusStay(s.checkIn || ctx.today, null, BONUS_KINDS[1].label, BONUS_KINDS[1].nights) : { ...blankStay(), checkIn: '', checkOut: '' });
  };
  // 체크인을 바꾸면 박수를 그대로 두고 체크아웃을 옮김(처음엔 다음 날)
  // 체크아웃을 바꿨는데 체크인이 비었거나 체크아웃보다 늦으면 체크인을 전날로
  const setCheckIn = (v) => {
    if (!v) return set({ checkIn: v });
    const n = s.checkIn && s.checkOut > s.checkIn ? daysBetween(s.checkIn, s.checkOut) : 1;
    set({ checkIn: v, checkOut: addDays(v, n > 0 && n <= 60 ? n : 1) });
  };
  const setCheckOut = (v) => {
    if (!v) return set({ checkOut: v });
    set({ checkOut: v, checkIn: !s.checkIn || s.checkIn >= v ? addDays(v, -1) : s.checkIn });
  };
  const zN = +s.nightsOverride > 0 ? +s.nightsOverride : isZhStay(s) ? ZH_NIGHTS : 0;
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark bed" style={{ background: '#1e1852' }}><Icon name="bed" size={16} /></span>
        <div><div className="k">아코르 ALL · 등급 숙박일·포인트 자동 계산</div><h2>{initial?.id ? (zh ? '보너스 박 편집' : '숙박 편집') : '숙박 추가'}</h2></div>
        <button className="icon-btn" onClick={onCancel} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div className="form">
        {!initial?.id && <Seg options={[['stay', '호텔 숙박'], ['bonus', '보너스 박']]} value={zh ? 'bonus' : 'stay'} onChange={setKind} />}
        {zh ? <BonusForm s={s} set={set} setS={setS} tried={tried} otherZh={otherZh} editing={!!initial?.id} /> : (
        <div className="segcard">
          <CityInput value={stayPlace(s)} onPick={(c) => set({ cityName: c.ko, cityEn: c.en, cc: c.cc, lat: c.lat, lon: c.lon, cityLat: c.lat, cityLon: c.lon, city: '', hotelId: null })} />
          <HotelPicker s={s} set={set} onTypeName={(v) => set({ hotel: v, hotelId: null, ...(brandTouched ? {} : { brand: detectBrand(v) || s.brand }), ...(s.hotelId && s.cityLat != null ? { lat: s.cityLat, lon: s.cityLon } : {}) })} />
          {tried && !s.hotel.trim() && <div className="err-t">호텔 이름을 넣어 주세요.</div>}
          <label className="field">
            <span>브랜드 <span className="faint">(10유로당 등급 포인트{!brandTouched && s.hotel ? ' · 이름으로 자동 선택' : ''})</span></span>
            <select className="input" value={s.brand} onChange={(e) => { setBrandTouched(true); set({ brand: e.target.value }); }}>
              {BRAND_GROUPS.map(([g, r, list]) => (
                <optgroup key={g} label={`${g} · ${r}P`}>
                  {list.map((b) => <option key={b} value={b}>{b}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <div className="row2">
            <label className="field"><span>체크인</span><DateInput value={s.checkIn} onChange={setCheckIn} invalid={tried && !s.checkIn} /></label>
            <label className="field"><span>체크아웃</span><DateInput value={s.checkOut} onChange={setCheckOut} invalid={tried && !(s.checkOut > s.checkIn)} /></label>
          </div>
          {tried && !(s.checkIn && s.checkOut > s.checkIn) && <div className="err-t">체크인·체크아웃 날짜를 넣어 주세요.</div>}
          <label className="field"><span>숙박 금액 <span className="faint">(원화 · 세금 포함 결제 금액)</span></span><WonInput value={s.krw} onChange={(v) => set({ krw: v })} /></label>
          <div className="miles-out num">
            <div>
              <div className="lab">{n}박 · 약 €{fmtNum(+s.krw > 0 ? +s.krw / (+ctx.acProg?.eur || DEFAULT_EUR) : 0)} × {brandRate(s.brand)}P/10유로</div>
              <b>{fmtNum(s.nightsOverride ?? n)}<small style={{ fontSize: 13, marginLeft: 3 }}>박</small></b>
              <b style={{ marginLeft: 12 }}>{fmtNum(s.pointsOverride ?? p.pts)}<small style={{ fontSize: 13, marginLeft: 3 }}>P</small></b>
              {s.pointsOverride == null && <span className="faint" style={{ marginLeft: 8, fontWeight: 700 }}>추정</span>}
            </div>
          </div>
          <div className="row2">
            <label className="field"><span>실제 등급 숙박일 <span className="faint">(앱 값)</span></span><NumInput value={s.nightsOverride} suffix="박" placeholder={String(n)} onChange={(v) => set({ nightsOverride: v })} /></label>
            <label className="field"><span>실제 등급 포인트 <span className="faint">(앱 값)</span></span><NumInput value={s.pointsOverride} suffix="P" placeholder={String(p.pts)} onChange={(v) => set({ pointsOverride: v })} /></label>
          </div>
          <p className="help" style={{ margin: 0 }}>숙박 후 아코르 앱에 적립된 값을 넣으면 그 값으로 계산해요. 비워 두면 금액·브랜드로 추정해요.</p>
          <label className="field"><span>메모 <span className="faint">(선택)</span></span><input className="input" value={s.note || ''} onChange={(e) => set({ note: e.target.value })} /></label>
        </div>
        )}
        {initial?.id && (del ? <button className="btn danger block" onClick={() => onDelete(s.id)}>{zh ? '이 기록 삭제' : '이 숙박 삭제'}</button> : <button className="btn danger block" onClick={() => setDel(true)}><Icon name="trash" size={17} />{zh ? '기록 삭제' : '숙박 삭제'}</button>)}
      </div>
      <div className="sumbar">
        {zh ? (
          <div className="line num"><span>등급 <b>+{fmtNum(zN)}박</b></span><span>{+s.krw > 0 ? <>박당 <b>{fmtWon(s.krw / zN)}</b></> : '금액 미입력'}</span></div>
        ) : (
          <div className="line num"><span>등급 <b>{fmtNum(s.nightsOverride ?? n)}박 · {fmtNum(s.pointsOverride ?? p.pts)}P</b></span><span>{+s.krw > 0 && n > 0 ? <>박당 <b>{fmtWon(s.krw / n)}</b></> : '금액 미입력'}</span></div>
        )}
        <button className="btn primary block" onClick={save}>{initial?.id ? '저장' : zh ? '보너스 박 추가' : '숙박 추가'}</button>
      </div>
    </div>
  );
}

/* ───────── 등급 현황: 아코르 ───────── */
export function AccorView({ prog, ctx, head, footer, onOpenStay, onAddStay }) {
  const { today } = ctx;
  const stays = ctx.stays || [];
  const yr0 = thisYear(today);
  const [yr, setYr] = useState(yr0);
  const [tab, setTab] = useState('prog');
  const s = useMemo(() => acSummary(prog, stays, today, yr, prog.eur), [prog, stays, today, yr]);
  const nt = s.next;
  const dleft = daysBetween(today, s.deadline);
  const ov = overlapStays(prog, stays);
  // 그 해 기록: 숙박·보너스 박 기록 + Explorer 자동 보너스, 날짜순
  const items = [
    ...s.rows.map((r) => ({ key: r.s.id, date: stayDate(r.s), r })),
    ...s.bonus.filter((b) => b.auto).map((b) => ({ key: `exp-${b.date}`, date: b.date, b })),
  ].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="fade-in">
      {head}
      <div className="pad" style={{ paddingTop: 6 }}><CardFace {...acFace(prog, stays, today)} /></div>
      <div className="pad" style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        <Seg small options={[['prog', '진행'], ['perks', '등급 혜택']]} value={tab} onChange={setTab} />
      </div>

      {tab === 'prog' && (
        <>
          <div className="pad" style={{ marginTop: 10 }}>
            <Seg small light options={[yr0, yr0 + 1].map((y) => [y, `${y}년 실적`])} value={yr} onChange={setYr} />
          </div>

          {/* 1. 결론: 달성했나 / 얼마나 남았나 */}
          {s.achieved ? (
            <div className="pad" style={{ marginTop: 12 }}>
              <div className="achv" style={{ background: s.achieved.bg, color: s.achieved.ink }}>
                <span className="achv-ic"><Icon name="check" size={22} /></span>
                <div>
                  <div className="k">{yr}년 실적</div>
                  <h3>{s.achieved.name} 달성</h3>
                  <p className="num">{fmtDot(s.validUntil)}까지 {s.achieved.name}예요.{s.achieved.nights != null ? ` ${yr + 1}년에 ${s.achieved.nights}박 또는 ${fmtNum(s.achieved.points)}P면 ${yr + 2}년 말까지 이어져요.` : ''}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="goal">
              <h3>{nt ? `${s.goal}까지 ${remText(s)}` : '최고 등급'}</h3>
              <div className="scope">{yr}년 12월 31일까지{dleft >= 0 && yr === yr0 ? ` · D-${dleft}` : ''} · 달성하면 {fmtDot(s.validUntil)}까지</div>
              {s.achievedPlan && <div className="notice" style={{ margin: '10px 0 0' }}>예정된 숙박·보너스 박까지 마치면 <b>{s.achievedPlan.name} 달성</b>이에요.</div>}
              {nt && (
                <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
                  {nt.nights != null && (
                    <div>
                      <div className="pl num" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span className="muted">등급 숙박일</span><b>{fmtNum(s.conf.nights)}{s.plan.nights ? <span style={{ color: 'var(--sky-ink)' }}> +{fmtNum(s.plan.nights)}</span> : null} / {nt.nights}박</b></div>
                      <Bar conf={Math.min(1, s.conf.nights / nt.nights)} plan={Math.max(0, Math.min(1, s.all.nights / nt.nights) - Math.min(1, s.conf.nights / nt.nights))} done={s.conf.nights >= nt.nights} />
                    </div>
                  )}
                  <div>
                    <div className="pl num" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span className="muted">등급 포인트</span><b>{fmtNum(s.conf.points)}{s.plan.points ? <span style={{ color: 'var(--sky-ink)' }}> +{fmtNum(s.plan.points)}</span> : null} / {fmtNum(nt.points)}P</b></div>
                    <Bar conf={Math.min(1, s.conf.points / nt.points)} plan={Math.max(0, Math.min(1, s.all.points / nt.points) - Math.min(1, s.conf.points / nt.points))} done={s.conf.points >= nt.points} />
                  </div>
                  <div className="legend"><span>확정</span><span className="p">예정</span><span style={{ marginLeft: 'auto' }}>박수·포인트 중 하나만 채우면 돼요</span></div>
                </div>
              )}
            </div>
          )}

          {/* 2. 어떻게 계산됐나: 박수 내역 */}
          <Ledger s={s} prog={prog} yr={yr} target={s.achieved || nt} />
          {ov && yr === +String(prog.baseDate).slice(0, 4) && (
            <div className="notice" style={{ margin: '10px 16px 0' }}>
              직접 입력한 실적({fmtNum(+prog.nights || 0)}박 · {fmtNum(+prog.points || 0)}P)과 기록한 숙박 {ov.count}건이 겹치면 두 번 세져요. 숙박을 다 기록했다면 위 <b>수정</b>에서 숙박일·포인트를 <b>0</b>으로 바꿔 주세요.
            </div>
          )}

          {/* 3. 다음 목표 (달성 후) */}
          {s.achieved && nt && !s.stretch && (
            <div className="pad" style={{ marginTop: 10 }}>
              <div className="card">
                <div className="card-h"><span>다음 · {nt.name}까지</span><b className="num" style={{ color: 'var(--ink)' }}>{remText(s)}</b></div>
                <Bar conf={s.conf01} plan={Math.max(0, s.all01 - s.conf01)} thin />
              </div>
            </div>
          )}
          {s.stretch && <DiamondCard s={s} eur={prog.eur} />}

          {/* 4. 그 해 기록 */}
          <div className="section-h"><span>{yr}년 기록</span><span className="faint num">{items.length}건</span></div>
          {items.length ? items.map((it) => (
            <div key={it.key} className="rowwrap">
              {it.b ? (
                <BonusRow label="Accor+ Explorer" nights={it.b.nights} date={it.b.date} sub="가입·갱신 때마다 자동 · 설정에서 바꿔요" ctx={ctx} auto />
              ) : (
                <>
                  <StayRow s={it.r.s} ctx={ctx} onClick={() => onOpenStay(it.r.s.id)} />
                  {it.r.included && <div className="incl-note">입력한 숫자({fmtDot(prog.baseDate)})에 이미 들어 있어 더하지 않아요</div>}
                </>
              )}
            </div>
          )) : <p className="muted" style={{ margin: '0 20px', fontSize: 14 }}>{yr}년 숙박·보너스 박이 아직 없어요.</p>}
          <div className="pad" style={{ marginTop: 10 }}><button className="btn ghost block" onClick={onAddStay}><Icon name="plus" size={17} />숙박·보너스 박 추가</button></div>
          {s.est > 0 && <div className="notice" style={{ margin: '10px 16px 0' }}>등급 포인트는 금액으로 추정한 값이 {s.est}건 있어요. 숙박 후 아코르 앱 값으로 고치면 정확해져요.</div>}
          <p className="basis">등급 포인트 추정은 원화 금액을 유로로 바꿔 브랜드별 적립률(10유로당 25·12.5·10·5P)로 계산한 참고값이에요. 실제 적립은 아코르 기준이 우선이에요.</p>
        </>
      )}

      {tab === 'perks' && <PerksTab held={s.held} />}
      {footer}
    </div>
  );
}

// 박수 내역: 입력값 + 그 뒤 숙박 + 보너스 박 = 합계
function Ledger({ s, prog, yr, target }) {
  const after = s.rows.filter((r) => !r.bonus && !r.included);
  const sum = (l, k) => l.reduce((a, r) => a + r[k], 0);
  const aConf = after.filter((r) => r.past), aPlan = after.filter((r) => !r.past);
  const lines = [];
  if (s.base.nights || s.base.points) lines.push({ k: '직접 입력한 실적', d: `기록 안 한 숙박 · ${fmtDot(prog.baseDate)} 입력`, n: s.base.nights, p: s.base.points });
  if (after.length) lines.push({ k: '기록한 숙박', d: `${after.length}건 · 아래 기록${after.some((r) => r.est) ? ' · 포인트 일부 추정' : ''}`, n: sum(aConf, 'nights'), p: sum(aConf, 'points'), np: sum(aPlan, 'nights'), pp: sum(aPlan, 'points') });
  for (const b of s.bonus) lines.push({ k: b.label, d: `${fmtDot(b.date)}${b.past ? '' : ' 예정'}`, n: b.past ? b.nights : 0, np: b.past ? 0 : b.nights, bonus: true });
  const v = (a, b, u) => (a || b ? <>{a ? fmtNum(a) : b ? '' : 0}{b ? <span className="pl-p">{a ? ' +' : '+'}{fmtNum(b)}</span> : null}{u}</> : <span className="faint">–</span>);
  return (
    <div className="pad" style={{ marginTop: 12 }}>
      <div className="card ledger">
        <div className="card-h"><span>{yr}년 등급 실적 내역</span><span className="faint">박 · 포인트</span></div>
        {lines.length ? lines.map((l, i) => (
          <div key={i} className={`lrow num${l.bonus ? ' b' : ''}`}>
            <span className="lk"><b>{l.bonus && <span className="lb">보너스</span>}{l.k}</b><small>{l.d}</small></span>
            <span className="lv">{v(l.n, l.np, '박')}</span>
            <span className="lv">{l.bonus ? <span className="faint">–</span> : v(l.p, l.pp, 'P')}</span>
          </div>
        )) : <p className="muted" style={{ margin: 0, fontSize: 14 }}>아직 없어요. 설정에서 올해 숙박일·포인트를 넣거나 숙박을 추가해 주세요.</p>}
        {lines.length > 0 && (
          <>
            <div className="lrow num tot">
              <span className="lk"><b>합계</b></span>
              <span className="lv">{v(s.conf.nights, s.plan.nights, '박')}</span>
              <span className="lv">{v(s.conf.points, s.plan.points, 'P')}</span>
            </div>
            {target && <div className="ltgt num">{target.name} 기준 {target.nights != null ? `${target.nights}박 또는 ` : ''}{fmtNum(target.points)}P{target.nights == null ? ' (포인트로만)' : ''}</div>}
          </>
        )}
      </div>
    </div>
  );
}

// 등급별 혜택
function PerksTab({ held }) {
  const [tid, setTid] = useState(held.id);
  const [more, setMore] = useState(false);
  const t = AC_TIER[tid];
  const ix = (id) => AC_TIERS.findIndex((x) => x.id === id);
  const has = (b) => ix(b.from) <= ix(tid);
  const val = (b) => b.v?.[tid] || (b.v ? Object.entries(b.v).filter(([k]) => ix(k) <= ix(tid)).pop()?.[1] : '');
  const isNew = (b) => tid !== 'CLASSIC' && (b.from === tid || (b.v && b.v[tid] && b.v[tid] !== b.v[AC_TIERS[ix(tid) - 1]?.id]));
  const mine = AC_BENEFITS.filter(has), later = AC_BENEFITS.filter((b) => !has(b));
  const row = (b, on) => (
    <div key={b.t} className={`perk${on ? '' : ' off'}`}>
      <span className="perk-ic">{on ? <Icon name="check" size={14} /> : null}</span>
      <div>
        <div className="perk-t"><b>{b.t}</b>{on && val(b) ? <span className="perk-v">{val(b)}</span> : null}{on && isNew(b) ? <span className="badge">NEW</span> : null}{!on ? <span className="perk-from">{AC_TIER[b.from].name}부터</span> : null}</div>
        {b.d && <div className="perk-d">{b.d}</div>}
      </div>
    </div>
  );
  return (
    <div className="pad" style={{ marginTop: 14 }}>
      <div className="perk-tiers">
        {AC_TIERS.map((x) => (
          <button key={x.id} type="button" className={tid === x.id ? 'on' : ''} style={{ background: x.bg, color: x.ink }} onClick={() => setTid(x.id)} aria-pressed={tid === x.id}>
            <span>{x.en}</span>{x.id === held.id && <small>내 등급</small>}
          </button>
        ))}
      </div>
      <div className="card" style={{ marginTop: 10 }}>
        <div className="card-h"><span>{t.name} 혜택 {mine.length}가지</span><span className="faint num">{t.nights != null ? `${t.nights}박 또는 ` : ''}{t.points ? `${fmtNum(t.points)}P` : '가입'}</span></div>
        <div className="perks">{mine.map((b) => row(b, true))}</div>
      </div>
      {later.length > 0 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="card-h"><span>위 등급에서 생기는 혜택</span></div>
          <div className="perks">{later.map((b) => row(b, false))}</div>
        </div>
      )}
      <button className="btn sm ghost block" style={{ marginTop: 10 }} onClick={() => setMore((m) => !m)}>{more ? '브랜드·제휴 혜택 접기' : '브랜드·제휴 혜택 더 보기'}</button>
      {more && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="perks">{AC_EXTRAS.map((b) => row(b, has(b)))}</div>
        </div>
      )}
      <p className="basis" style={{ padding: '12px 4px' }}>아코르 공식 '회원 등급별 제공 혜택' 기준({AC_BENEFITS_CHECKED} 확인)이에요. 대부분 호텔 사정(객실 상황)에 따라 달라지고, 브랜드·지역별 예외가 있어요. 정확한 조건은 ALL 앱에서 확인해 주세요.</p>
    </div>
  );
}

// 다이아몬드: 포인트로만 가는 '도전' 목표
const manwon = (krw) => `약 ${fmtNum(Math.round(krw / 10000))}만 원`;
function DiamondCard({ s, eur }) {
  const nt = s.next;
  const c = pointsCost(s.remP, eur);
  const cp = pointsCost(s.remPPlan, eur);
  return (
    <div className="pad" style={{ marginTop: 12 }}>
      <div className="card">
        <div className="card-h"><span>{nt.name} 도전</span><span className="badge gray">등급 포인트로만</span></div>
        <Bar conf={Math.min(1, s.conf.points / nt.points)} plan={Math.max(0, Math.min(1, s.all.points / nt.points) - Math.min(1, s.conf.points / nt.points))} done={s.conf.points >= nt.points} />
        <div className="pl num" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 8 }}><span className="muted">{fmtNum(s.conf.points)}{s.plan.points ? ` +${fmtNum(s.plan.points)}` : ''} / {fmtNum(nt.points)}P</span><b>{fmtNum(s.remP)}P 남음</b></div>
        <p className="help" style={{ margin: '8px 0 0' }}>
          {s.remP > 0
            ? <>박수로는 갈 수 없고, 보통 브랜드(10유로당 25P) 기준 <b>€{fmtNum(c.eur)} · {manwon(c.krw)}</b>을 더 묵어야 해요.{s.plan.points ? ` 예정 숙박까지 넣으면 ${manwon(cp.krw)} 남아요.` : ''}</>
            : '다이아몬드 포인트를 채웠어요.'}
        </p>
      </div>
    </div>
  );
}


