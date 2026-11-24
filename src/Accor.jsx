import { useEffect, useMemo, useRef, useState } from 'react';
import { loadCities, searchCities } from './cities.js';
import { fetchHotels, filterHotels } from './hotels.js';
import { detectBrand } from './brands.js';
import { AC_BENEFITS, AC_EXTRAS, AC_BENEFITS_CHECKED } from './accorBenefits.js';
import { findAirport } from './airports.js';
import { fmtNum, fmtDate, fmtDot, fmtWon, daysBetween, todayISO, uid, addDays } from './core.js';
import {
  AC_TIERS, AC_TIER, BRAND_GROUPS, DEFAULT_EUR, acSummary, pointsCost, acYear, remText, combos, stayNights, stayPoints, stayDate, brandRate, bonusEvents, isV2, isZhStay, makeZhStay, ZH_NIGHTS,
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
const FAST_PRESETS = [
  { btn: '패스트트랙 (+9박)', label: '패스트트랙 (1+9)', nights: 9 },
  { btn: '플라잉블루 1+1', label: '플라잉블루 이벤트 (1+1)', nights: null },
  { btn: '직접 입력', label: '', nights: null },
];
export function AccorAddView({ entry, ctx, fx, onSave, onDelete, onClose }) {
  const yr = thisYear(ctx.today);
  const editing = !!entry;
  const [tier, setTier] = useState(entry?.tier || 'CLASSIC');
  const [validUntil, setValid] = useState(entry?.validUntil || '');
  const [nights, setNights] = useState(entry?.nights ?? null);
  const [points, setPoints] = useState(entry?.points ?? null);
  const [explorer, setExplorer] = useState(!!entry?.explorer);
  const legacy = !!entry && !isV2(entry);
  // 예전 입력은 '다음 갱신일'이었으니 미래 날짜면 1년 전(최근 갱신일)으로 바꿔 보여 줌
  const [explorerDate, setExplorerDate] = useState(() => {
    const d = entry?.explorerDate || '';
    return legacy && d && d > ctx.today ? `${+d.slice(0, 4) - 1}${d.slice(4)}` : d;
  });
  const zhRec = (ctx.stays || []).find(isZhStay);
  const [fast, setFast] = useState(entry?.fast || []);
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
      fast: fast.filter((f) => f.date && +f.nights > 0).map((f) => ({ ...f, nights: +f.nights })),
    });
  };
  const setF = (i, patch) => setFast((l) => l.map((f, k) => (k === i ? { ...f, ...patch } : f)));
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
          <div className="sh">{yr}년 실적</div>
          <div className="row2">
            <label className="field"><span>등급 숙박일</span><NumInput value={nights} suffix="박" placeholder="0" onChange={setNights} /></label>
            <label className="field"><span>등급 포인트</span><NumInput value={points} suffix="P" placeholder="0" onChange={setPoints} /></label>
          </div>
          <p className="help" style={{ margin: 0 }}>숙박일은 <b>실제로 묵은 박수만</b> 넣어 주세요. Explorer·중올플·패스트트랙·플라잉블루 이벤트 같은 보너스 박은 빼고, 아래 보너스 박에 따로 넣으면 돼요. 포인트는 아코르 앱 <b>내 계정 › 대시보드</b>의 등급 포인트 그대로예요. 오늘 이전 숙박은 이 숫자에 들어 있는 걸로 봐요.</p>
          {legacy && +entry?.nights > 0 && <div className="notice" style={{ margin: 0 }}>지금 {fmtNum(+entry.nights)}박은 보너스 박이 섞인 앱 숫자일 수 있어요. 보너스를 뺀 실제 투숙 박수로 고쳐 주세요.</div>}
        </div>
        <div className="segcard">
          <div className="sh">보너스 박</div>
          <label className="checkrow light">
            <input type="checkbox" checked={explorer} onChange={(e) => setExplorer(e.target.checked)} />
            <span>Accor+ Explorer 가입 <small>(갱신할 때마다 30박)</small></span>
          </label>
          {explorer && (
            <label className="field"><span>가입일 또는 최근 갱신일 <span className="faint">(이 날과 매년 같은 날 30박)</span></span><DateInput value={explorerDate} onChange={setExplorerDate} /></label>
          )}
          <div className="help" style={{ margin: 0 }}>중국 Accor Plus(중올플)는 한 번 사는 거라 숙박처럼 넣어요. <b>+ › 숙박 추가 › 중올플 활성화</b>{zhRec ? <> · 지금 {fmtDot(zhRec.checkIn)} 활성화로 들어가 있어요.</> : null}</div>
          <div className="lab" style={{ marginTop: 4 }}>추가 보너스 박 <span className="faint">(패스트트랙·플라잉블루 이벤트 등)</span></div>
          {fast.map((f, i) => (
            <div key={i} className="fastbox">
              <div className="fasthead">
                <input className="input sm" value={f.label || ''} placeholder="이름 (예: 패스트트랙)" onChange={(e) => setF(i, { label: e.target.value })} />
                <button className="icon-btn" style={{ width: 36, height: 36 }} onClick={() => setFast((l) => l.filter((_, k) => k !== i))} aria-label="삭제"><Icon name="close" size={15} /></button>
              </div>
              <div className="fastrow">
                <DateInput value={f.date} onChange={(v) => setF(i, { date: v })} />
                <NumInput value={f.nights} suffix="박" placeholder="0" onChange={(v) => setF(i, { nights: v })} />
              </div>
            </div>
          ))}
          <div className="fastadd">
            {FAST_PRESETS.map((p) => (
              <button key={p.label} className="btn sm ghost" onClick={() => setFast((l) => [...l, { date: todayISO(), nights: p.nights, label: p.label }])}><Icon name="plus" size={14} />{p.btn}</button>
            ))}
          </div>
          <p className="help" style={{ margin: 0 }}>보너스 박이 들어온(들어올) 날짜와 박수를 넣어 주세요. 오늘 이후면 예정, 지났으면 확정으로 그 해에 더해요. 플라잉블루 1+1처럼 묵은 만큼 더 주는 이벤트는 받은 보너스 박수만 넣으면 돼요.</p>
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
  if (isZhStay(s)) return <ZhRow s={s} ctx={ctx} onClick={onClick} />;
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

function ZhRow({ s, ctx, onClick }) {
  const n = stayNights(s);
  const d = daysBetween(ctx.today, s.checkIn);
  return (
    <button className="frow stayrow" onClick={onClick}>
      {d < 0 ? <div className="dday"><span className="done"><Icon name="check" size={16} stroke={2.6} /></span><small>적용됨</small></div>
        : d === 0 ? <div className="dday today"><b>오늘</b></div>
        : <div className="dday"><b className="num">{d}</b><small>일 후</small></div>}
      <div>
        <div className="fmeta">
          <span className="mark sm bed"><Icon name="plus" size={13} /></span>
          <span>보너스 박</span>
          <span className="d">{fmtDate(s.checkIn)}</span>
        </div>
        <div className="ftitle">중올플 활성화 +{n}박</div>
        <div className="ftimes num"><span>중국 Accor Plus</span><span>{fmtDate(s.checkIn, { weekday: false })} 적용</span></div>
        <div className="fchips num">
          <span className="chip"><b>+{n}</b>박</span>
          {+s.krw > 0 && <span className="chip"><b>{fmtWon(s.krw / n)}</b>/박</span>}
          <span className="badge cr-ALL">아코르</span>
        </div>
      </div>
    </button>
  );
}

// 중올플 활성화 입력
function ZhForm({ s, set, tried, other }) {
  return (
    <div className="segcard">
      <p className="help" style={{ margin: 0 }}>중국 Accor Plus(중올플)를 사서 활성화하면 등급 숙박일 <b>20박</b>이 한 번 들어와요. 활성화한 날이 속한 해의 등급에 더해져요.</p>
      {other && <div className="notice" style={{ margin: 0 }}>이미 {fmtDot(other.checkIn)} 중올플 활성화 기록이 있어요. 한 번만 들어오는 보너스라 중복되지 않게 확인해 주세요.</div>}
      <label className="field"><span>활성화한 날</span><DateInput value={s.checkIn} onChange={(v) => set({ checkIn: v, checkOut: v })} invalid={tried && !s.checkIn} /></label>
      {tried && !s.checkIn && <div className="err-t">활성화한 날을 넣어 주세요.</div>}
      <div className="row2">
        <label className="field"><span>등급 숙박일</span><NumInput value={s.nightsOverride} suffix="박" placeholder={String(ZH_NIGHTS)} onChange={(v) => set({ nightsOverride: v })} /></label>
        <label className="field"><span>결제 금액 <span className="faint">(선택)</span></span><WonInput value={s.krw} onChange={(v) => set({ krw: v })} /></label>
      </div>
      <p className="help" style={{ margin: 0 }}>금액을 넣으면 단가 탭에서 박당 비용에 함께 계산돼요.</p>
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
  const zh = isZhStay(s);
  const otherZh = (ctx.stays || []).find((x) => isZhStay(x) && x.id !== s.id);
  const valid = zh ? !!s.checkIn : s.hotel.trim() && s.checkIn && s.checkOut && s.checkOut > s.checkIn;
  const save = () => {
    setTried(true);
    if (!valid) return;
    const krw = s.krw == null || s.krw === '' ? null : +s.krw;
    if (zh) return onSave({ ...s, id: s.id || uid(), checkOut: s.checkIn, nightsOverride: +s.nightsOverride > 0 ? +s.nightsOverride : ZH_NIGHTS, pointsOverride: 0, krw });
    onSave({ ...s, id: s.id || uid(), kind: undefined, hotel: s.hotel.trim(), krw });
  };
  // 새로 넣을 때만 종류를 고를 수 있음
  const setKind = (k) => {
    if (k === (zh ? 'zh' : 'stay')) return;
    setTried(false);
    setS(k === 'zh' ? { ...makeZhStay(s.checkIn || ctx.today, null) } : { ...blankStay(), checkIn: '', checkOut: '' });
  };
  const zN = +s.nightsOverride > 0 ? +s.nightsOverride : ZH_NIGHTS;
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark bed" style={{ background: '#1e1852' }}><Icon name="bed" size={16} /></span>
        <div><div className="k">아코르 ALL · 등급 숙박일·포인트 자동 계산</div><h2>{initial?.id ? (zh ? '중올플 활성화 편집' : '숙박 편집') : '숙박 추가'}</h2></div>
        <button className="icon-btn" onClick={onCancel} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div className="form">
        {!initial?.id && <Seg options={[['stay', '호텔 숙박'], ['zh', '중올플 활성화 +20박']]} value={zh ? 'zh' : 'stay'} onChange={setKind} />}
        {zh ? <ZhForm s={s} set={set} tried={tried} other={otherZh} /> : (
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
            <label className="field"><span>체크인</span><DateInput value={s.checkIn} onChange={(v) => set({ checkIn: v, checkOut: v && !(s.checkOut > v) ? addDays(v, 1) : s.checkOut })} invalid={tried && !s.checkIn} /></label>
            <label className="field"><span>체크아웃</span><DateInput value={s.checkOut} onChange={(v) => set({ checkOut: v })} invalid={tried && !(s.checkOut > s.checkIn)} /></label>
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
        <button className="btn primary block" onClick={save}>{initial?.id ? '저장' : zh ? '중올플 활성화 추가' : '숙박 추가'}</button>
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
  return (
    <div className="fade-in">
      {head}
      <div className="pad" style={{ paddingTop: 6 }}><CardFace {...acFace(prog, stays, today)} /></div>
      <div className="pad" style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        <Seg small light options={[yr0, yr0 + 1].map((y) => [y, `${y}년`])} value={yr} onChange={setYr} />
        <Seg small options={[['prog', '진행'], ['combo', '보너스 조합'], ['stays', '숙박'], ['perks', '혜택']]} value={tab} onChange={setTab} />
      </div>

      {tab === 'prog' && (
        <>
          {s.achieved && (
            <div className="pad" style={{ marginTop: 14 }}>
              <div className="achv" style={{ background: s.achieved.bg, color: s.achieved.ink }}>
                <span className="achv-ic"><Icon name="check" size={22} /></span>
                <div>
                  <div className="k">{yr}년 실적 · 확정</div>
                  <h3>{s.achieved.name} 달성</h3>
                  <div className="achv-n num">{fmtNum(s.conf.nights)}박{s.plan.nights ? ` (+예정 ${fmtNum(s.plan.nights)})` : ''} · {fmtNum(s.conf.points)}P{s.plan.points ? ` (+예정 ${fmtNum(s.plan.points)})` : ''}</div>
                  <p className="num">{fmtDot(s.validUntil)}까지 {s.achieved.name}{s.achieved.id === s.held.id ? ' 유지' : ''}예요.{s.achieved.nights != null ? ` ${yr + 1}년에 ${s.achieved.nights}박 또는 ${fmtNum(s.achieved.points)}P를 채우면 ${yr + 2}.12.31까지 이어져요.` : ''}</p>
                </div>
              </div>
            </div>
          )}
          {s.stretch && <DiamondCard s={s} eur={prog.eur} />}
          {!s.stretch && (nt || !s.achieved) && (<>
          <div className="goal">
            <h3>{nt ? (s.achieved ? `다음 목표 · ${nt.name}까지` : `${s.goal}까지`) : '최고 등급 달성'}</h3>
            <div className="scope">{yr}.01.01 ~ {yr}.12.31{dleft >= 0 && yr === yr0 ? ` · D-${dleft}` : ''} · 딴 등급은 {fmtDot(s.validUntil)}까지</div>
            {s.achievedPlan && <div className="notice" style={{ margin: '10px 0 0' }}>예정된 숙박·보너스 박까지 마치면 <b>{s.achievedPlan.name} 달성</b>이에요.</div>}
            <div className="ringwrap">
              <Ring conf={s.conf01} all={s.all01}>
                <b className="num">{Math.floor(s.conf01 * 1000) / 10}%</b>
                <small>{s.byNights ? '숙박일 기준' : '포인트 기준'}</small>
              </Ring>
              <div className="kv num">
                <div><span className="k">숙박일</span><span className="v">{fmtNum(s.conf.nights)}{s.plan.nights ? <span style={{ color: 'var(--sky-ink)' }}> +{fmtNum(s.plan.nights)}</span> : null}박</span></div>
                <div><span className="k">포인트</span><span className="v">{fmtNum(s.conf.points)}{s.plan.points ? <span style={{ color: 'var(--sky-ink)' }}> +{fmtNum(s.plan.points)}</span> : null}P</span></div>
                {nt && <div><span className="k">목표</span><span className="v">{nt.nights != null ? `${nt.nights}박 / ` : ''}{fmtNum(nt.points)}P</span></div>}
                <div className="legend" style={{ marginTop: 4 }}><span>확정</span><span className="p">예정</span></div>
              </div>
            </div>
          </div>
          {nt && (
            <div className="pad" style={{ display: 'grid', gap: 12, marginTop: 4 }}>
              {nt.nights != null && (
                <div>
                  <div className="pl num" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span className="muted">등급 숙박일</span><b>{fmtNum(s.conf.nights)} / {nt.nights}박</b></div>
                  <Bar conf={Math.min(1, s.conf.nights / nt.nights)} plan={Math.max(0, Math.min(1, s.all.nights / nt.nights) - Math.min(1, s.conf.nights / nt.nights))} done={s.conf.nights >= nt.nights} />
                </div>
              )}
              <div>
                <div className="pl num" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}><span className="muted">등급 포인트{nt.nights == null ? ' (다이아몬드는 포인트로만)' : ''}</span><b>{fmtNum(s.conf.points)} / {fmtNum(nt.points)}P</b></div>
                <Bar conf={Math.min(1, s.conf.points / nt.points)} plan={Math.max(0, Math.min(1, s.all.points / nt.points) - Math.min(1, s.conf.points / nt.points))} done={s.conf.points >= nt.points} />
              </div>
            </div>
          )}
          </>)}
          <div className="tiles num" style={{ marginTop: 10 }}>
            <div className="tile"><div className="k">{nt ? `${s.goal}까지` : '다음 등급'}</div><div className="v" style={{ fontSize: 16 }}>{nt ? remText(s) : '–'}</div><div className="s">{nt ? `예정 포함 ${remText(s, true)}` : '최고 등급'}</div></div>
            <div className="tile"><div className="k">{yr}년 실적으로</div><div className="v">{s.earnedPlan.name}</div><div className="s">예정 포함 · {fmtDot(s.validUntil)}까지</div></div>
            <div className="tile"><div className="k">보너스 박</div><div className="v">{s.bonus.length ? `+${fmtNum(s.bonusN)}박` : '–'}</div><div className="s">{s.bonus.length ? s.bonus.map((b) => `${b.label}${b.past ? '' : ' (예정)'}`).join(' · ') : `${yr}년 보너스 없음`}</div></div>
            <div className="tile"><div className="k">지금 등급</div><div className="v">{s.held.name}</div><div className="s">{prog.validUntil ? `${fmtDot(prog.validUntil)}까지` : '유효기간 미입력'}</div></div>
          </div>
          {s.est > 0 && <div className="notice" style={{ margin: '8px 16px 0' }}>등급 포인트는 금액으로 추정한 값이 {s.est}건 있어요. 숙박 후 아코르 앱 값으로 고치면 정확해져요.</div>}
          <StayList rows={s.rows} ctx={ctx} title={`${yr}년 숙박`} onOpen={onOpenStay} onAdd={onAddStay} />
          <p className="basis">입력한 실제 투숙 박수·포인트(입력한 날까지)에 그 뒤 숙박과 그 해 보너스 박(Explorer·중올플·추가 보너스)을 더해 계산해요. 등급 포인트는 원화 금액을 유로로 바꿔 브랜드별 적립률(10유로당 25·12.5·10·5P)로 추정한 참고값이고, 실제 적립은 아코르 기준이 우선이에요.</p>
        </>
      )}

      {tab === 'combo' && <ComboTab prog={prog} s={s} yr={yr} stays={stays} />}
      {tab === 'perks' && <PerksTab held={s.held} />}
      {tab === 'stays' && (
        <StayList rows={[...stays].sort((a, b) => stayDate(b).localeCompare(stayDate(a))).map((x) => ({ s: x }))} ctx={ctx} title="전체 숙박" onOpen={onOpenStay} onAdd={onAddStay} />
      )}
      {footer}
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
            ? <>박수로는 갈 수 없고, 보통 브랜드(10유로당 25P) 기준 <b>€{fmtNum(c.eur)} · {manwon(c.krw)}</b>을 더 묵어야 해요.{s.plan.points ? ` 예정 숙박까지 넣으면 약 ${manwon(cp.krw)} 남아요.` : ''}</>
            : '다이아몬드 포인트를 채웠어요.'}
        </p>
      </div>
    </div>
  );
}

function StayList({ rows, ctx, title, onOpen, onAdd }) {
  return (
    <>
      <div className="section-h"><span>{title}</span><span className="faint num">{rows.length}건</span></div>
      {rows.length ? rows.map((r) => <div key={r.s.id} className="rowwrap"><StayRow s={r.s} ctx={ctx} onClick={() => onOpen(r.s.id)} /></div>) : <p className="muted" style={{ margin: '0 20px', fontSize: 14 }}>아직 숙박이 없어요.</p>}
      {onAdd && <div className="pad" style={{ marginTop: 10 }}><button className="btn ghost block" onClick={onAdd}><Icon name="plus" size={17} />숙박 추가</button></div>}
    </>
  );
}

function ComboTab({ prog, s, yr, stays }) {
  // 그 해 실제 숙박 + 기타 보너스(패스트트랙 등)를 두고 멤버십 보너스(Explorer·중올플)만 바꿔 가며 비교
  const v2 = isV2(prog);
  const real = s.rows.filter((r) => !r.bonus);
  const stayN = (v2 ? s.base.nights : 0) + real.reduce((a, r) => a + r.nights, 0);
  const stayP = (v2 ? s.base.points : 0) + real.reduce((a, r) => a + r.points, 0);
  const isMember = (b) => /Explorer|중올플/.test(b.label);
  const otherN = s.bonus.filter((b) => !isMember(b)).reduce((a, b) => a + b.nights, 0);
  const zhRec = (stays || []).find(isZhStay);
  const zhYear = zhRec ? +String(zhRec.checkIn).slice(0, 4) : 0;
  const zhUsed = zhYear > 0 && zhYear < yr;
  const expIn = s.bonus.some((b) => /Explorer/.test(b.label));
  const zhIn = s.bonus.some((b) => /중올플/.test(b.label));
  const list = combos(stayN, stayP, otherN, { zhUsed });
  const mine = (id) => (id === 'none' ? !expIn && !zhIn : id === 'exp' ? expIn && !zhIn : id === 'zh' ? zhIn && !expIn : expIn && zhIn);
  return (
    <div className="pad" style={{ marginTop: 14 }}>
      <div className="card">
        <div className="card-h"><span>{yr}년 숙박 {fmtNum(stayN)}박{otherN ? ` + 기타 보너스 ${fmtNum(otherN)}박` : ''} 기준</span></div>
        <div className="cmp">
          {list.map((c) => (
            <div key={c.id} className="cmpbar">
              <div className="h num">
                <b>{c.label}</b>
                {mine(c.id) ? <span className="badge">지금 내 상태</span> : null}
                <span className="v">{c.tier.name}</span>
              </div>
              <Bar conf={Math.min(1, c.total / 60)} thin done={c.total >= 60} />
              <div className="help num">{fmtNum(c.total)}박{c.next ? ` · ${c.next.name}까지 ${fmtNum(c.rem)}박` : ' · 플래티넘 이상'} · {yr + 1}년 말까지 유지</div>
            </div>
          ))}
        </div>
      </div>
      <p className="basis" style={{ padding: '12px 4px' }}>Accor+ Explorer는 가입·갱신할 때마다 30박, 중국 Accor Plus(중올플)는 가입할 때 20박이 한 번 들어와요.{zhUsed ? ` 중올플은 ${zhYear}년에 이미 받아서 이 해 비교에서 뺐어요.` : ''} 다이아몬드는 등급 포인트(26,000P)로만 갈 수 있어요.</p>
    </div>
  );
}
