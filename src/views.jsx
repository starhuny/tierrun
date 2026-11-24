import { useEffect, useMemo, useRef, useState } from 'react';
import { findAirport } from './airports.js';
import { AIRLINE, CREDIT, TIER, TIERS, CABIN } from './skypass.js';
import {
  fmtDate, fmtDot, fmtNum, fmtWon, fmtWonShort, daysBetween, earnedMiles, flightPoints, flightCost, layover, fmtDuration,
  sortFlights, contributionOf, SOURCE_LABEL, isDomesticKR, tripFlights, cabinOf, baselineDate, BASE_KEYS,
} from './core.js';
import { Icon, AirlineMark, Bar, Ring, Avatar } from './ui.jsx';
import Globe from './Globe.jsx';
import { FriendsSection, FriendFace } from './Friends.jsx';
import { AircraftStrip } from './Aircraft.jsx';
import { friendNames } from './social.js';
import { walletOf, PROGRAMS, allianceOf } from './wallet.js';
import { ALLIANCES } from './skypass.js';
import { flightSP, spFor, METHOD, METHODS, methodFor, asCategory, CAT, isOwn, asSummary, nextTier } from './alaska.js';
import { AsStrip, ProgSwitch } from './Wallet.jsx';
import { AcStrip, StayRow } from './Accor.jsx';
import { stayDate, stayNights, stayPoints, acSummary, isZhStay } from './accor.js';

export const city = (c) => findAirport(c)?.city || c || '?';
export const routeTitle = (f) => `${city(f.from)} → ${city(f.to)}`;

function DDay({ f, today }) {
  const d = daysBetween(today, f.date);
  if (d < 0) return <div className="dday"><span className="done"><Icon name="check" size={16} stroke={2.6} /></span><small>탑승 완료</small></div>;
  if (d === 0) return <div className="dday today"><b>오늘</b></div>;
  return <div className="dday"><b className="num">{d}</b><small>일 후</small></div>;
}

export function CabinBadge({ f }) {
  const c = cabinOf(f);
  return <span className={`badge cabin-${c}`}>{CABIN[c]?.name || '일반석'}</span>;
}

export function FlightRow({ f, ctx, selected, onClick, pick }) {
  const { today, flights, trips, profile } = ctx;
  const e = earnedMiles(f);
  const p = flightPoints(f);
  const c = flightCost(f, flights, trips, ctx.asProg);
  const sp = f.program === 'AS' ? flightSP(f, ctx.asProg).sp : 0;
  const bd = baselineDate(profile);
  const excluded = bd && f.date <= bd;
  return (
    <button className={`frow ${selected ? 'sel' : ''} ${pick ? 'picked' : ''}`} onClick={onClick} aria-pressed={pick === undefined ? undefined : pick}>
      {pick === undefined ? <DDay f={f} today={today} /> : (
        <div className="dday">
          <span className={`pick-ck ${pick ? 'on' : ''}`}>{pick && <Icon name="check" size={16} stroke={3} />}</span>
          <small>{daysBetween(today, f.date) < 0 ? '탑승 완료' : `${daysBetween(today, f.date)}일 후`}</small>
        </div>
      )}
      <div>
        <div className="fmeta">
          <AirlineMark code={f.airline} size="sm" />
          <span>{f.airline} {f.flightNo}</span>
          <span className="d">{fmtDate(f.date)}</span>
        </div>
        <div className="ftitle">{routeTitle(f)}</div>
        <div className="ftimes num">
          <span>{f.from} {f.dep && <b>{f.dep}</b>}</span>
          <span>{f.to} {f.arr && <b>{f.arr}{+f.arrOffset ? <sup> +{f.arrOffset}</sup> : null}</b>}</span>
        </div>
        <div className="fchips num">
          {f.program === 'AS' ? (
            <>
              <span className="chip"><b>+{fmtNum(flightSP(f, ctx.asProg).sp)}</b>SP</span>
              <span className="badge cr-AS">알래스카</span>
            </>
          ) : f.credit === 'NONE' ? <span className="badge gray">스카이패스 미반영</span> : <span className="chip"><b>+{fmtNum(e)}</b>마일</span>}
          {p > 0 && <span className="chip"><b>+{p}</b>P</span>}
          {f.program === 'AS' ? c != null && sp > 0 && <span className="chip"><b>{fmtWon(c / sp)}</b>/포인트</span> : c != null && e > 0 && <span className="chip"><b>{fmtWon(c / e)}</b>/마일</span>}
          {!(+f.baseMiles > 0) && f.milesOverride == null && <span className="badge warn">거리 정보 없음</span>}
          <CabinBadge f={f} />
          {f.aircraft && <span className="badge gray">{f.aircraft}</span>}
          {(f.credit === 'ST' || f.credit === 'OT') && <span className={`badge cr-${f.credit}`}>{CREDIT[f.credit].short}</span>}
          {excluded && f.credit !== 'NONE' && <span className="badge gray">입력한 실적에 포함</span>}
          {ctx.together?.get(f.id) && <span className="badge together"><Icon name="user" size={12} />{friendNames(ctx.together.get(f.id))} 같이 가요</span>}
        </div>
      </div>
    </button>
  );
}

// 지도 아래 항공편 카드: 옆으로 넘기면 지난·다음 항공편
export function MapStrip({ ctx, selId, onSel, onOpen }) {
  const list = useMemo(() => sortFlights(ctx.flights), [ctx.flights]);
  const ref = useRef(null);
  const timer = useRef(0);
  const first = useRef(true);
  const idx = Math.max(0, list.findIndex((f) => f.id === selId));
  const [shown, setShown] = useState(idx);

  // 선택이 바뀌면(지도에서 노선을 눌렀을 때 등) 그 카드로 이동
  useEffect(() => {
    const el = ref.current;
    const c = el?.children[idx];
    if (!c) return;
    const left = c.offsetLeft - (el.clientWidth - c.clientWidth) / 2;
    if (Math.abs(el.scrollLeft - left) > 2) el.scrollTo({ left, behavior: first.current ? 'auto' : 'smooth' });
    first.current = false;
    setShown(idx);
  }, [idx, list.length]);

  const settle = () => {
    const el = ref.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0, bd = Infinity;
    [...el.children].forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid);
      if (d < bd) { bd = d; best = i; }
    });
    setShown(best);
    const f = list[best];
    if (f && f.id !== selId) onSel(f.id);
  };
  const onScroll = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(settle, 140);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!list.length) return null;
  return (
    <div className="map-strip-wrap">
      <div className="map-strip" ref={ref} onScroll={onScroll}>
        {list.map((f, i) => (
          <div key={f.id} className="map-slide">
            <FlightRow f={f} ctx={ctx} onClick={() => onOpen(f.id)} />
            {list.length > 1 && <span className="map-idx num" aria-label={`${list.length}편 중 ${i + 1}번째`}>{i + 1} / {list.length}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Gap({ prev, next }) {
  const l = layover(prev, next);
  if (!l) return null;
  const txt = l.minutes != null ? fmtDuration(l.minutes) : l.days > 0 ? `${l.days}일` : '같은 날';
  return <div className="gap">{city(prev.to)} <span>체류 {txt}</span></div>;
}

export function RowList({ list, ctx, selectedId, onOpen, onDelete, swipe, picking, onPick }) {
  const out = [];
  list.forEach((f, i) => {
    const prev = list[i - 1];
    if (prev && prev.tripId && prev.tripId === f.tripId) out.push(<Gap key={`g${f.id}`} prev={prev} next={f} />);
    if (picking) {
      out.push(<div key={f.id} className="rowwrap"><FlightRow f={f} ctx={ctx} pick={picking.has(f.id)} onClick={() => onPick(f.id)} /></div>);
      return;
    }
    const row = <FlightRow f={f} ctx={ctx} selected={selectedId === f.id} onClick={() => onOpen(f.id)} />;
    out.push(onDelete ? <SwipeRow key={f.id} id={f.id} swipe={swipe} onDelete={onDelete}>{row}</SwipeRow> : <div key={f.id} className="rowwrap">{row}</div>);
  });
  return <div>{out}</div>;
}

// 항공편과 숙박을 날짜순으로 섞어서 (숙박이 끼어들면 그 앞까지 항공편 묶음을 끊음)
function MixedList({ list, stays, rp, onStay, desc }) {
  if (!stays.length) return <RowList list={list} {...rp} />;
  const out = [];
  let chunk = [];
  const flush = () => { if (chunk.length) out.push(<RowList key={`c${out.length}`} list={chunk} {...rp} />); chunk = []; };
  let i = 0, j = 0;
  while (i < list.length || j < stays.length) {
    const st = stays[j], f = list[i];
    const stayFirst = st && (!f || (desc ? st.checkIn > f.date : st.checkIn < f.date));
    if (stayFirst) {
      flush();
      out.push(<div key={`s${st.id}`} className="rowwrap"><StayRow s={st} ctx={rp.ctx} onClick={() => onStay(st.id)} /></div>);
      j++;
    } else {
      chunk.push(f);
      i++;
    }
  }
  flush();
  return <>{out}</>;
}

// 왼쪽으로 밀면 삭제 버튼이 나옴 (한 번에 하나만 열림)
const DEL_W = 88;
function SwipeRow({ id, swipe, onDelete, children }) {
  const open = swipe?.open === id;
  const g = useRef(null);
  const block = useRef(false);
  const [dx, setDx] = useState(0);
  const [drag, setDrag] = useState(false);
  const base = open ? -DEL_W : 0;
  const down = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    g.current = { x: e.clientX, y: e.clientY, axis: null };
  };
  const move = (e) => {
    const s = g.current;
    if (!s) return;
    const mx = e.clientX - s.x, my = e.clientY - s.y;
    if (!s.axis) {
      if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
      s.axis = Math.abs(mx) > Math.abs(my) * 1.2 ? 'x' : 'y';
      if (s.axis === 'x') {
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* 무시 */ }
        setDrag(true);
        if (swipe.open && swipe.open !== id) swipe.setOpen(null);
      }
    }
    if (s.axis !== 'x') return;
    setDx(Math.max(-DEL_W - 36, Math.min(0, base + mx)) - base);
  };
  const up = () => {
    const s = g.current;
    g.current = null;
    if (!s || s.axis !== 'x') return;
    block.current = true;
    const pos = base + dx;
    setDrag(false);
    setDx(0);
    swipe.setOpen(pos < -DEL_W / 2 ? id : null);
  };
  const clickCapture = (e) => {
    if (block.current) {
      block.current = false;
      e.preventDefault();
      e.stopPropagation();
    } else if (open) {
      e.preventDefault();
      e.stopPropagation();
      swipe.setOpen(null);
    }
  };
  return (
    <div className={`swipe ${open || drag ? 'opening' : ''}`}>
      <button className="swipe-del" onClick={() => { swipe.setOpen(null); onDelete(id); }} tabIndex={open ? 0 : -1} aria-hidden={!open}>
        <Icon name="trash" size={18} />삭제
      </button>
      <div
        className="swipe-front"
        style={{ transform: `translateX(${base + dx}px)`, transition: drag ? 'none' : 'transform .22s ease' }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClickCapture={clickCapture}
      >
        {children}
      </div>
    </div>
  );
}

export function Head({ title, right }) {
  return (
    <div className="head">
      <h1>{title}</h1>
      {right}
    </div>
  );
}

/* ───────── 등급 요약 띠 ───────── */
export function TierStrip({ goals, profile, onClick }) {
  const g = goals.headline;
  const tier = TIER[profile?.tier || 'SKYPASS'];
  if (!g) {
    return (
      <button className="strip" onClick={onClick}>
        <div><div className="t">{tier.name}</div><div className="v">최고 등급이에요</div></div>
      </button>
    );
  }
  const o = g.options[g.best];
  const mi = o.parts.some((x) => x.unit === 'mi');
  return (
    <button className="strip" onClick={onClick} aria-label="등급 현황 보기">
      <div>
        <div className="t">{tier.name} → {TIER[g.target].name}</div>
        <div className="v num">
          {g.done ? '달성했어요' : mi ? `${fmtNum(o.remMi)}마일 남음` : `${fmtNum(o.remPt)}포인트 남음`}
        </div>
      </div>
      <div className="num" style={{ fontWeight: 800, fontSize: 18 }}>{Math.floor(o.conf * 100)}%</div>
      <Bar conf={o.conf} plan={o.all - o.conf} thin />
    </button>
  );
}

/* ───────── 맨 위 띠: 지갑 순서대로 옆으로 넘기기 ───────── */
export function TierCarousel({ ctx, goals, alliance, onProgram, onAddProgram }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const all = walletOf(ctx.profile);
  const list = alliance === 'ALL' ? all : all.filter((w) => PROGRAMS[w.program]?.alliance === alliance);
  const slides = list.map((w) =>
    w.program === 'KE' ? <TierStrip key="KE" goals={goals} profile={ctx.profile} onClick={() => onProgram('KE')} />
      : w.program === 'AS' ? <AsStrip key="AS" prog={w} ctx={ctx} onClick={() => onProgram('AS')} />
      : w.program === 'ALL' ? <AcStrip key="ALL" prog={ctx.acProg || w} ctx={ctx} onClick={() => onProgram('ALL')} /> : null,
  ).filter(Boolean);
  if (!slides.length) {
    const add = alliance === 'OW' ? ['AS', '원월드', '알래스카 티어를 지갑에 추가해 보세요'] : alliance === 'ST' ? ['KE', '스카이팀', '대한항공 스카이패스를 지갑에 추가해 보세요'] : alliance === 'HOTEL' ? ['ALL', '호텔', '아코르 ALL 티어를 지갑에 추가해 보세요'] : alliance === 'ALL' ? [null, '티어 지갑', '지갑에 항공사 등급을 추가해 보세요'] : null;
    slides.push(
      add ? (
        <button key="add" className="strip add" onClick={() => onAddProgram(add[0])}>
          <div><div className="t">{add[1]}</div><div className="v" style={{ fontSize: 16 }}>{add[2]}</div></div>
          <Icon name="plus" size={20} />
        </button>
      ) : (
        <div key="soon" className="strip add">
          <div><div className="t">스타얼라이언스</div><div className="v" style={{ fontSize: 16 }}>터키항공 Miles&Smiles는 준비 중이에요</div></div>
        </div>
      ),
    );
  }
  const onScroll = () => {
    const el = ref.current;
    if (el) setAt(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  };
  return (
    <div className="tstrip-wrap">
      <div className="tstrip" ref={ref} onScroll={onScroll}>
        {slides.map((x, i) => <div className="tslide" key={i}>{x}</div>)}
      </div>
      {slides.length > 1 && (
        <div className="tdots" aria-hidden="true">{slides.map((_, i) => <i key={i} className={i === Math.min(at, slides.length - 1) ? 'on' : ''} />)}</div>
      )}
    </div>
  );
}

const CHIPS = [['ALL', '전체'], ...ALLIANCES.map((a) => [a.id, a.short || a.name]), ['HOTEL', '호텔']];

/* ───────── 항공편 목록 ───────── */
export function FlightsView({ ctx, goals, selectedId, onOpen, onAdd, onSample, onFlighty, onDelete, onProgram, onAddProgram, onOpenStay, onAddStay, alliance = 'ALL', setAlliance, onAircraft, picking, setPicking, onGroup, head, banner }) {
  const { flights, today } = ctx;
  const [showPast, setShowPast] = useState(false);
  const [openId, setOpenId] = useState(null);
  const swipe = { open: openId, setOpen: setOpenId };
  const pickOne = (id) => setPicking((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const sorted = useMemo(() => sortFlights(alliance === 'ALL' ? flights : flights.filter((f) => allianceOf(f) === alliance)), [flights, alliance]);
  // 숙박: 전체·호텔에서만, 피킹(여정 묶기) 중에는 숨김
  const stays = ctx.stays || [];
  const showStays = !picking && (alliance === 'ALL' || alliance === 'HOTEL');
  const stUp = showStays ? stays.filter((x) => stayDate(x) >= today).sort((a, b) => a.checkIn.localeCompare(b.checkIn)) : [];
  const stPast = showStays ? stays.filter((x) => stayDate(x) < today).sort((a, b) => b.checkIn.localeCompare(a.checkIn)) : [];
  const chips = CHIPS.filter(([id]) => id !== 'HOTEL' || ctx.acProg || stays.length);
  const upcoming = sorted.filter((f) => f.date >= today);
  const past = sorted.filter((f) => f.date < today).reverse();
  return (
    <>
      {head}
      {banner}
      <TierCarousel ctx={ctx} goals={goals} alliance={alliance} onProgram={onProgram} onAddProgram={onAddProgram} />
      {flights.length > 0 && onAircraft && <AircraftStrip flights={flights} today={today} onClick={onAircraft} />}
      {!flights.length && !stays.length ? (
        <div className="empty fade-in">
          <svg width="150" height="70" viewBox="0 0 150 70" aria-hidden="true">
            <path d="M12 58 Q75 -10 138 58" fill="none" stroke="var(--sky)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
            <circle cx="12" cy="58" r="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
            <circle cx="138" cy="58" r="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
            <g transform="translate(66 6) rotate(90 9 9)" fill="var(--ink)"><path d="M18 11.6v-1.5l-6-3.8V2.6a1.1 1.1 0 0 0-2.3 0v3.7l-6 3.8v1.5l6-1.9v3.8l-1.5 1.1v1.2l2.6-.8 2.6.8v-1.2l-1.4-1.1V9.7z" /></g>
          </svg>
          <h2>첫 항공편을 추가해 보세요</h2>
          <p>편명과 구간만 넣으면 적립 마일·상태포인트와 등급 진행률이 바로 계산돼요.</p>
          <button className="btn primary" onClick={onAdd}><Icon name="plus" size={18} />항공편 추가</button>
          {onFlighty && <button className="btn sky sm" onClick={onFlighty}>Flighty 기록 가져오기</button>}
          <button className="btn ghost sm" onClick={onSample}>예시 데이터로 둘러보기</button>
        </div>
      ) : (
        <>
          <div className="pick-head">
            {picking ? (
              <>
                <span><b>여정으로 묶을 항공편</b>을 고르세요</span>
                <button className="link" onClick={() => setPicking(null)}>취소</button>
              </>
            ) : (
              <>
                {setPicking && flights.length > 1 && <button className="btn sm sky" onClick={() => { setPicking(new Set()); setShowPast(true); }}><Icon name="list" size={15} />{setAlliance ? '여정으로 묶기' : '골라서 여정으로 묶기'}</button>}
                {setAlliance && (
                  <div className="achips" role="tablist" aria-label="얼라이언스">
                    {chips.map(([id, label]) => (
                      <button key={id} role="tab" aria-selected={alliance === id} className={alliance === id ? 'on' : ''} onClick={() => setAlliance(id)}>{label}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          {(() => {
            const rp = { ctx, selectedId, onOpen, onDelete, swipe, picking, onPick: pickOne };
            const what = alliance === 'HOTEL' ? '숙박' : stays.length && alliance === 'ALL' ? '일정' : '항공편';
            const cnt = (f, st) => [f ? `${f}편` : '', st ? `숙박 ${st}` : ''].filter(Boolean).join(' · ') || '0';
            const pastN = past.length + stPast.length;
            // 지난 것: 항공편·숙박을 합쳐 최근 4건만 먼저
            const merged = [...past.map((f) => ({ k: 'f', d: f.date, x: f })), ...stPast.map((x) => ({ k: 's', d: x.checkIn, x }))]
              .sort((a, b) => b.d.localeCompare(a.d) || (a.k === b.k ? 0 : a.k === 'f' ? -1 : 1));
            const shown = showPast ? merged : merged.slice(0, 4);
            const pastF = shown.filter((m) => m.k === 'f').map((m) => m.x);
            const pastS = shown.filter((m) => m.k === 's').map((m) => m.x);
            return (
              <>
                <div className="section-h"><span>다가오는 {what}</span><span className="faint num">{cnt(upcoming.length, stUp.length)}</span></div>
                {upcoming.length || stUp.length ? <MixedList list={upcoming} stays={stUp} rp={rp} onStay={onOpenStay} /> : <p className="pad muted" style={{ margin: '4px 20px 10px' }}>{alliance === 'ALL' ? '예정된 항공편이 없어요.' : alliance === 'HOTEL' ? '예정된 숙박이 없어요.' : `예정된 ${CHIPS.find((c) => c[0] === alliance)?.[1]} 항공편이 없어요.`}</p>}
                {alliance === 'HOTEL' && onAddStay && <div className="pad" style={{ margin: '8px 0' }}><button className="btn ghost block" onClick={onAddStay}><Icon name="plus" size={17} />숙박 추가</button></div>}
                {pastN > 0 && (
                  <>
                    <div className="section-h"><span>지난 {what}</span><span className="faint num">{cnt(past.length, stPast.length)}</span></div>
                    <MixedList list={pastF} stays={pastS} rp={rp} onStay={onOpenStay} desc />
                    {pastN > 4 && <button className="btn sm ghost more" onClick={() => setShowPast((v) => !v)}>{showPast ? '접기' : `지난 ${what} ${pastN - 4}건 더 보기`}</button>}
                  </>
                )}
              </>
            );
          })()}
          {onDelete && !picking && <p className="help" style={{ margin: '14px 20px 0', textAlign: 'center' }}>항공편을 왼쪽으로 밀면 바로 삭제할 수 있어요.</p>}
          {picking && <PickBar flights={sorted} picking={picking} setPicking={setPicking} onGroup={onGroup} />}
          {onFlighty && <button className="link imp-link" onClick={onFlighty}>Flighty 기록 가져오기</button>}
        </>
      )}
    </>
  );
}

// 고른 항공편 묶기 바: 한 편만 골랐으면 돌아오는 편(또는 이어지는 편) 추천
function PickBar({ flights, picking, setPicking, onGroup }) {
  const chosen = flights.filter((f) => picking.has(f.id));
  let hint = null;
  if (chosen.length >= 1) {
    const first = chosen[0], last = chosen[chosen.length - 1];
    const within = (a, b) => (Date.parse(b) - Date.parse(a)) / 86400000;
    hint = flights.find((f) => !picking.has(f.id) && f.date >= last.date && within(last.date, f.date) <= 60 && f.from === last.to && (f.to === first.from || chosen.length === 1)) || null;
  }
  return (
    <div className="pick-bar">
      <div className="pick-line num">
        <span><b>{chosen.length}편</b> 선택{chosen.length ? ` · ${chosen.map((f) => f.from).concat(chosen[chosen.length - 1].to).join('→')}` : ''}</span>
        {chosen.length > 0 && <button className="link" onClick={() => setPicking(new Set())}>모두 해제</button>}
      </div>
      {hint && (
        <button className="pick-hint num" onClick={() => setPicking((p) => new Set([...p, hint.id]))}>
          <Icon name="plus" size={14} />{hint.to === chosen[0].from ? '돌아오는 편' : '이어지는 편'} 추가: {hint.airline} {hint.flightNo} · {fmtDate(hint.date, { weekday: false })} {hint.from}→{hint.to}
        </button>
      )}
      <button className="btn primary block" disabled={chosen.length < 2} onClick={onGroup}>{chosen.length < 2 ? '2편 이상 골라 주세요' : `${chosen.length}편을 여정으로 묶기`}</button>
    </div>
  );
}

/* ───────── 알래스카 적립 카드 (항공편 상세) ───────── */
function AsEarnCard({ f, ctx }) {
  const prog = ctx.asProg;
  const m = methodFor(prog, f.date);
  const r = spFor(f, m);
  const yr = +f.date.slice(0, 4);
  const s = prog ? asSummary(prog, ctx.flights, ctx.today, yr) : null;
  const cat = asCategory(f);
  const past = f.date < ctx.today;
  return (
    <>
      <div className="card">
        <div className="card-h"><span>알래스카 상태포인트</span><span className="badge cr-AS">{METHOD[m].name}</span></div>
        <div className="calc num">
          <span className="muted">계산</span><b style={{ fontSize: 14 }}>{r.why}</b>
          {!f.award && (m === 'legacy' || !isOwn(f.airline)) && <><span className="muted">좌석 구분 {cat.how === 'table' ? `(${f.cls} 클래스 표)` : cat.how === 'guess' ? '(예약 클래스 미입력)' : ''}</span><b style={{ fontSize: 14 }}>{m === 'legacy' ? (['C', 'F'].includes(cat.cat) ? '비즈니스·퍼스트 125%' : '이코노미 100%') : `${CAT[cat.cat].name} ${CAT[cat.cat].rate}%`}</b></>}
          <div className="eq">
            <span className="muted">{past ? '적립' : '적립 예정'}</span>
            <b>{fmtNum(r.sp)}<small style={{ fontSize: 14, marginLeft: 3 }}>SP</small></b>
          </div>
        </div>
        {r.est && <div className="notice" style={{ marginTop: 10 }}>{f.award ? '마일 항공권은 사용한 포인트를 넣으면 달러 기준 적립을 계산해요.' : isOwn(f.airline) ? '알래스카·하와이안 편은 세금을 뺀 운임(USD)을 넣으면 정확해져요.' : '예약 클래스를 넣으면 좌석 구분을 정확히 판정해요.'}</div>}
        {!prog && <div className="notice" style={{ marginTop: 10 }}>알래스카 티어가 지갑에 없어요. 지갑에서 추가하면 등급 진행률에 들어가요.</div>}
      </div>
      {m === 'legacy' ? (
        <div className="card"><p className="muted" style={{ margin: 0, fontSize: 14 }}>2026년 탑승분은 <b>2026년 기준</b>(구간 거리 1:1 · 500마일 미만은 500 · 비즈니스·퍼스트 125%)으로 계산해요. 2027년 1월 1일 출발편부터는 고른 적립 방식(거리·달러·구간)으로 계산돼요.</p></div>
      ) : (
        <div className="card">
          <div className="card-h"><span>적립 방식별로 계산하면</span></div>
          <div className="mini3 num">
            {METHODS.map((x) => {
              const v = spFor(f, x.id);
              return <div key={x.id} className={x.id === m ? 'on' : ''}><span>{x.short}{x.id === m ? ' · 내 선택' : ''}</span><b>{fmtNum(v.sp)}{v.est ? '*' : ''}</b></div>;
            })}
          </div>
        </div>
      )}
      {s && s.next && (
        <div className="card">
          <div className="card-h"><span>{yr}년 {s.goal}까지 기여</span><span className="faint">{past ? '확정' : '예정'}</span></div>
          <div className="contrib num">
            <div className="row">
              <span>+{fmtNum(r.sp)} SP</span>
              <b>{((r.sp / s.next.sp) * 100).toFixed(1)}%</b>
              <Bar conf={past ? r.sp / s.next.sp : 0} plan={past ? 0 : r.sp / s.next.sp} thin />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ───────── 항공편 상세 ───────── */
export function DetailView({ f, ctx, mobile, onClose, onEdit, onDelete, onOpen }) {
  const { flights, trips, profile, today } = ctx;
  const a = findAirport(f.from), b = findAirport(f.to);
  const e = earnedMiles(f);
  const p = flightPoints(f);
  const cost = flightCost(f, flights, trips, ctx.asProg);
  const isAS = f.program === 'AS';
  const units = isAS ? flightSP(f, ctx.asProg).sp : e;
  const U = isAS ? '포인트' : '마일';
  const trip = f.tripId ? trips[f.tripId] : null;
  const sibs = f.tripId ? tripFlights(flights, f.tripId) : [f];
  const contrib = contributionOf(f, profile);
  const d = daysBetween(today, f.date);
  const km = f.baseMiles ? Math.round(f.baseMiles * 1.609344) : null;
  const cabin = CABIN[cabinOf(f)]?.name || '일반석';
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="fade-in">
      <div className="dhead">
        <AirlineMark code={f.airline} />
        <div>
          <div className="k num">{f.airline} {f.flightNo} · {fmtDate(f.date, { year: true })}</div>
          <h2>{routeTitle(f)}</h2>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div style={{ padding: '4px 20px 0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {d < 0 ? <span className="badge good"><Icon name="check" size={13} stroke={3} />탑승 완료 · 확정 실적</span> : d === 0 ? <span className="badge">오늘 출발</span> : <span className="badge">D-{d} · 예정 실적</span>}
        <CabinBadge f={f} />
        <span className="badge gray">{AIRLINE[f.airline]?.name || f.airline}</span>
        {(f.aircraft || f.reg) && <span className="badge gray"><Icon name="plane" size={12} />{[f.aircraft, f.reg].filter(Boolean).join(' · ')}</span>}
        {isDomesticKR(f.from, f.to) ? <span className="badge gray">국내선</span> : <span className="badge gray">국제선</span>}
      </div>
      {mobile && (
        <div className="mini-map">
          <Globe flights={[f]} selectedId={f.id} today={today} interactive={false} />
        </div>
      )}
      <div className="leg" style={{ marginTop: 10 }}>
        <div className="ap">{f.from} · {a?.name || '공항 정보 없음'}</div>
        <div className="tm num">{f.dep || '—'}</div>
        <div className="sub">출발 · {fmtDate(f.date)}</div>
      </div>
      <div className="legline num"><Icon name="plane" size={14} />{f.baseMiles ? `${fmtNum(f.baseMiles)} mi · ${fmtNum(km)} km` : '거리 정보 없음'}</div>
      <div className="leg">
        <div className="ap">{f.to} · {b?.name || '공항 정보 없음'}</div>
        <div className="tm num">{f.arr || '—'}{+f.arrOffset ? <sup>+{f.arrOffset}</sup> : null}</div>
        <div className="sub">도착</div>
      </div>

      {ctx.together?.get(f.id) && (
        <div className="pad" style={{ marginTop: 14 }}>
          <div className="card together-card">
            <div className="card-h"><span>같은 비행기 타는 친구</span></div>
            {ctx.together.get(f.id).map((fr) => (
              <div key={fr.uid} className="tg-row">
                <FriendFace fr={fr} size={32} />
                <b>{fr.name || '친구'}</b>
                <span className="muted" style={{ fontSize: 13 }}>{f.airline} {f.flightNo} 같이 가요</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pad" style={{ marginTop: 14 }}>
        {f.program === 'AS' ? <AsEarnCard f={f} ctx={ctx} /> : (
        <div className="card">
          <div className="card-h"><span>스카이패스 적립</span><span className={`badge ${f.credit === 'ST' || f.credit === 'OT' ? `cr-${f.credit}` : 'gray'}`}>{CREDIT[f.credit]?.label}</span></div>
          {f.credit === 'NONE' ? (
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>이 항공편은 스카이패스 등급 실적에 넣지 않았어요. 편집에서 실적 구분을 바꿀 수 있어요.</p>
          ) : (
            <div className="calc num">
              <span className="muted">구간 마일 <span className={`src ${f.baseSource || ''}`}>{SOURCE_LABEL[f.baseSource] || '직접 입력'}</span></span>
              <b>{fmtNum(f.baseMiles)}</b>
              <span className="muted">적립률 · {cabin}{f.cls ? ` ${f.cls.toUpperCase()} 클래스` : ''}</span>
              <b>× {f.rate ?? 100}%</b>
              {f.milesOverride != null && <><span className="muted">직접 수정한 적립 마일</span><b>적용</b></>}
              <div className="eq">
                <span className="muted">적립 마일{p ? ` · 탑승 횟수 +${p}P` : ''}</span>
                <b>{fmtNum(e)}<small style={{ fontSize: 14, marginLeft: 3 }}>마일</small></b>
              </div>
            </div>
          )}
        </div>
        )}

        {!contrib.excluded && contrib.rows.length > 0 && (
          <div className="card">
            <div className="card-h"><span>등급 기여</span><span className="faint">{d < 0 ? '확정' : '예정'}</span></div>
            <div className="contrib num">
              {contrib.rows.map((r) => (
                <div className="row" key={r.label}>
                  <span>{r.label}</span>
                  <b>+{fmtNum(r.value)} <span className="faint" style={{ fontWeight: 600 }}>({((r.value / r.of) * 100).toFixed(r.value / r.of < 0.01 ? 2 : 1)}%)</span></b>
                  <Bar conf={d < 0 ? r.value / r.of : 0} plan={d < 0 ? 0 : r.value / r.of} thin />
                </div>
              ))}
            </div>
          </div>
        )}
        {contrib.excluded && f.credit !== 'NONE' && (
          <div className="card"><p className="muted" style={{ margin: 0, fontSize: 14 }}>설정에 입력한 실적({fmtDot(baselineDate(profile))}까지)에 이미 들어 있는 항공편이라 중복 계산하지 않아요. 비용·단가 통계에는 그대로 들어가요.</p></div>
        )}

        <div className="card">
          <div className="card-h"><span>비용</span>{trip?.priceMode === 'total' && <span className="faint">묶음 총액을 {isAS ? '상태포인트' : '적립 마일'} 비율로 배분</span>}</div>
          {cost == null ? (
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>운임을 넣으면 {U}당 단가를 계산해요. <button className="link" onClick={onEdit}>운임 입력</button></p>
          ) : (
            <div className="kv num">
              {trip?.priceMode === 'total' && <div><span className="k">여정 총액 ({sibs.length}구간)</span><span className="v">{fmtWon(trip.price)}</span></div>}
              <div><span className="k">이 구간 운임</span><span className="v">{fmtWon(cost)}</span></div>
              <div><span className="k">{U}당 단가{isAS ? ' (상태포인트)' : ''}</span><span className="v" style={{ fontSize: 18 }}>{units > 0 ? fmtWon(cost / units) : '–'}</span></div>
            </div>
          )}
        </div>

        {sibs.length > 1 && (
          <div className="card">
            <div className="card-h"><span>같은 여정</span><span className="faint">{sibs.length}구간</span></div>
            {sibs.map((s) => (
              <button key={s.id} className={`sib ${s.id === f.id ? 'cur' : ''}`} onClick={() => onOpen(s.id)}>
                <AirlineMark code={s.airline} size="sm" />
                <span>{s.from} → {s.to}</span>
                <span className="r num">{fmtDate(s.date, { weekday: false })} · {fmtNum(earnedMiles(s))}마일</span>
              </button>
            ))}
          </div>
        )}
        {f.note && <div className="card"><div className="card-h">메모</div><p style={{ margin: 0 }}>{f.note}</p></div>}
      </div>
      <div className="actions">
        <button className="btn" onClick={onEdit}><Icon name="edit" size={17} />{sibs.length > 1 ? '여정 편집' : '편집'}</button>
        {confirm ? (
          <button className="btn danger" onClick={() => onDelete(f.id)}>정말 삭제</button>
        ) : (
          <button className="btn danger" onClick={() => setConfirm(true)}><Icon name="trash" size={17} />삭제</button>
        )}
      </div>
    </div>
  );
}

/* ───────── 등급 현황 ───────── */
function MethodBlock({ o, i, done }) {
  const mi = o.parts.some((x) => x.unit === 'mi');
  const unit = (u) => (u === 'pt' ? '포인트' : '마일');
  const remTxt = o.done ? '달성했어요!' : [o.remMi > 0 ? `${fmtNum(o.remMi)} 마일` : null, o.remPt > 0 ? `${fmtNum(o.remPt)} 포인트` : null].filter(Boolean).join(' · ') + ' 남았어요!';
  return (
    <div className="method">
      <span className="badge">방법 {i + 1}</span>
      <div className="lbl">{o.label}</div>
      {o.note && <div className="note">{o.note}</div>}
      {o.parts.map((p, k) => (
        <div className="part" key={k}>
          {o.parts.length > 1 && (
            <div className="pl num"><span>{p.label}</span><span>{fmtNum(p.conf)}{p.plan > 0 && <span className="faint"> (+{fmtNum(p.plan)})</span>} / {fmtNum(p.target)}</span></div>
          )}
          <Bar conf={p.confPct} plan={p.allPct - p.confPct} done={done && p.confPct >= 1} />
        </div>
      ))}
      <div className="foot num">
        <b>{remTxt}</b>
        {o.parts.length === 1 && <span className="muted">{fmtNum(o.parts[0].target)} {unit(o.parts[0].unit)}</span>}
      </div>
      {!o.done && (o.remMiPlan < o.remMi || o.remPtPlan < o.remPt) && (
        <div className="help num" style={{ marginTop: 4 }}>
          예정 항공편까지 타면 {o.doneWithPlan ? '달성' : [o.remMiPlan > 0 && mi ? `${fmtNum(o.remMiPlan)}마일` : null, o.remPtPlan > 0 ? `${fmtNum(o.remPtPlan)}포인트` : null].filter(Boolean).join(' · ') + ' 남음'}
        </div>
      )}
    </div>
  );
}

function GoalCard({ g }) {
  const status = g.done ? <span className="badge good"><Icon name="check" size={13} stroke={3} />달성</span> : g.doneWithPlan ? <span className="badge">예정대로면 달성</span> : <span className="badge gray">{Math.floor(g.options[g.best].conf * 100)}%</span>;
  const [open, setOpen] = useState(false);
  const shown = open ? g.options : [g.options[g.best]];
  return (
    <div className="card gcard">
      <div className="top">
        <div><h4>{g.title}</h4><div className="sc">{g.scope}{g.deadline ? ` · ${fmtDot(g.deadline)}까지` : ''}</div></div>
        {status}
      </div>
      {shown.map((o) => (
        <div key={o.label} style={{ marginTop: 12 }}>
          <div className="pl num" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6, gap: 8 }}>
            <span className="muted">{o.label}</span>
            <b>{o.done ? '완료' : [o.remMi > 0 ? `${fmtNum(o.remMi)}마일` : null, o.remPt > 0 ? `${fmtNum(o.remPt)}P` : null].filter(Boolean).join(' · ') + ' 남음'}</b>
          </div>
          {o.parts.map((p, k) => (
            <div key={k} style={{ marginTop: k ? 8 : 0 }}>
              {o.parts.length > 1 && <div className="help num" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span>{p.label}</span><span>{fmtNum(p.conf)} / {fmtNum(p.target)}{p.unit === 'pt' ? 'P' : ''}</span></div>}
              <Bar conf={p.confPct} plan={p.allPct - p.confPct} thin done={p.confPct >= 1} />
            </div>
          ))}
        </div>
      ))}
      {g.options.length > 1 && <button className="link" style={{ fontSize: 13, marginTop: 10 }} onClick={() => setOpen((v) => !v)}>{open ? '접기' : `다른 방법 ${g.options.length - 1}가지 보기`}</button>}
      {g.editable && <p className="help" style={{ margin: '8px 0 0' }}>셀렉트 유지 기준은 공지 확인 후 설정 › 등급 기준에서 바꿀 수 있어요.</p>}
    </div>
  );
}

export function TierView({ ctx, goals, stats, head, onSettings, friendsBox }) {
  const { profile, today, user } = ctx;
  const tier = TIER[profile?.tier || 'SKYPASS'];
  const h = goals.headline;
  const others = goals.goals.filter((g) => g !== h);
  const best = h ? h.options[h.best] : null;
  const mileOpt = h ? h.options.find((o) => o.parts.every((p) => p.unit === 'mi')) || best : null;
  const dleft = profile?.periodEnd ? daysBetween(today, profile.periodEnd) : null;
  const deadline = h?.deadline;
  const monthsLeft = deadline ? Math.max(1, daysBetween(today, deadline) / 30.44) : null;
  const tierIdx = TIERS.findIndex((t) => t.id === tier.id);
  const R = goals.rules;
  const caps = ['가입', `${fmtNum(R.mcQualify.total / 1e4)}만 · ${R.mcQualify.points}P`, `2년 ${fmtNum(R.select.miles / 1e4)}만 · ${R.select.points}P`, `평생 ${fmtNum(R.premium.miles / 1e4)}만`, `평생 ${fmtNum(R.million.miles / 1e4)}만`];
  return (
    <>
      {head}
      <div className="tcard" style={{ background: tier.bg, color: tier.ink }}>
        <div>
          <div className="en">{tier.en}</div>
          <div className="ko">{tier.name}</div>
        </div>
        <div className="foot num">
          <span>{profile?.name || user?.name || '회원'}</span>
          <span>{profile?.periodEnd && (tier.id === 'MC' || tier.id === 'MCS') ? `${fmtDot(profile.periodEnd)}까지${dleft != null && dleft >= 0 ? ` · D-${dleft}` : ''}` : tier.id === 'MCP' || tier.id === 'MM' ? '평생 등급' : ''}</span>
        </div>
      </div>

      {(() => {
        const t = profile?.tier || 'SKYPASS';
        const later = (t === 'MC' || t === 'MCS') && profile?.periodStart > today;
        if (later) {
          return (
            <div className="notice info" style={{ margin: '12px 16px 0' }}>
              {TIER[t].name} 실적은 등급 시작일 <b>{fmtDot(profile.periodStart)}</b>부터 쌓여요 (D-{daysBetween(today, profile.periodStart)}). 그 전에 탄 마일은 모닝캄 프리미엄·밀리언 마일러 평생 누적에만 들어가요.
            </div>
          );
        }
        const keys = t === 'MC' || t === 'MCS' ? ['perKE', 'perST', 'perOT', 'perPts'] : BASE_KEYS[t] || [];
        if (!keys.length || keys.some((k) => +profile?.base?.[k] > 0)) return null;
        const since = t === 'MC' || t === 'MCS' ? `등급 시작일${profile?.periodStart ? `(${fmtDot(profile.periodStart)})` : ''} 이후` : t === 'SKYPASS' ? '스카이패스 가입 후' : '지금까지';
        return (
          <div className="notice" style={{ margin: '12px 16px 0' }}>
            실적 숫자를 0으로 두었어요. 앱에 추가한 항공편만 계산되니, {since} 탄 항공편을 <b>처음부터 빠짐없이</b> 추가해야 진행률이 정확해요.{' '}
            <button className="link" onClick={onSettings}>실적 입력</button>
          </div>
        );
      })()}
      {h ? (
        <div className="goal">
          <h3>{TIER[h.target].name}까지</h3>
          <div className="scope">{h.scope}{deadline ? ` · ${fmtDot(profile.periodStart)} ~ ${fmtDot(deadline)}` : ''}</div>
          <div className="ringwrap">
            <Ring conf={best.conf} all={best.all}>
              <b className="num">{Math.floor(best.conf * 1000) / 10}%</b>
              <small>예정 포함 {Math.floor(best.all * 1000) / 10}%</small>
            </Ring>
            <div className="kv num">
              {mileOpt && (
                <>
                  <div><span className="k">확정</span><span className="v">{fmtNum(mileOpt.parts[0].conf)}</span></div>
                  <div><span className="k">예정</span><span className="v" style={{ color: 'var(--sky-ink)' }}>+{fmtNum(mileOpt.parts[0].plan)}</span></div>
                  <div><span className="k">목표</span><span className="v">{fmtNum(mileOpt.parts[0].target)}</span></div>
                </>
              )}
              <div className="legend" style={{ marginTop: 4 }}><span>확정</span><span className="p">예정</span></div>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            {h.options.map((o, i) => <MethodBlock key={i} o={o} i={i} done={h.done} />)}
          </div>
        </div>
      ) : (
        <div className="goal"><h3>최고 등급이에요</h3><div className="scope">밀리언 마일러는 평생 유지돼요.</div></div>
      )}

      {h && mileOpt && !h.done && (
        <div className="tiles num">
          <div className="tile"><div className="k">예정까지 타면</div><div className="v">{mileOpt.doneWithPlan ? '달성' : `${fmtNum(mileOpt.remMiPlan)}마일`}</div><div className="s">{mileOpt.doneWithPlan ? '예정 항공편으로 충분해요' : '더 필요해요'}</div></div>
          <div className="tile"><div className="k">인천–LA 왕복 환산</div><div className="v">{mileOpt.remMiPlan > 0 ? `약 ${(mileOpt.remMiPlan / (5973 * 2)).toFixed(1)}회` : '–'}</div><div className="s">적립률 100% 기준</div></div>
          {monthsLeft != null && <div className="tile"><div className="k">남은 기간 D-{daysBetween(today, deadline)}</div><div className="v">월 {fmtNum(mileOpt.remMiPlan / monthsLeft)}마일</div><div className="s">이 속도로 적립하면 달성</div></div>}
          <div className="tile"><div className="k">현재 단가로 남은 비용</div><div className="v">{stats.perMile && mileOpt.remMiPlan > 0 ? `약 ${fmtWonShort(stats.perMile * mileOpt.remMiPlan)}` : '–'}</div><div className="s">{stats.perMile ? `평균 ${fmtWon(stats.perMile)}/마일` : '운임을 넣으면 계산돼요'}</div></div>
        </div>
      )}

      {others.length > 0 && <div className="section-h"><span>다른 목표</span></div>}
      {others.map((g) => <GoalCard key={g.id} g={g} />)}

      {friendsBox && <FriendsSection ctx={ctx} box={friendsBox} />}

      <div className="section-h"><span>등급 사다리</span></div>
      <div className="ladder">
        {TIERS.map((t, i) => (
          <div key={t.id} className={`rung ${i === tierIdx ? 'on' : i < tierIdx ? 'got' : ''}`} style={{ background: t.bg, color: t.ink }}>{t.name}</div>
        ))}
      </div>
      <div className="ladder-cap num">{caps.map((c) => <span key={c}>{c}</span>)}</div>

      <p className="basis">
        {profile?.tier === 'MC' || profile?.tier === 'MCS' ? '등급 시작일 이후 실적은 설정에 입력한 숫자와 여기 추가한 항공편을 더해 계산해요. ' : '설정에 입력한 실적과 여기 추가한 항공편을 더해 계산해요. '}
        {baselineDate(profile) ? `입력한 숫자는 ${fmtDot(baselineDate(profile))}까지의 실적으로 보고, 그 전 날짜의 항공편은 중복 계산하지 않아요. ` : ''}
        탑승일이 지난 항공편은 확정, 남은 항공편은 예정으로 봐요. 실제 적립·등급은 대한항공 기준이 우선이에요.{' '}
        <button className="link" onClick={onSettings}>실적 수정</button>
      </p>
    </>
  );
}

/* ───────── 비용 ───────── */
export function CostView({ ctx, goals, stats: keStats, asStats, avatar, onOpen, onOpenStay }) {
  const { today, profile, asProg } = ctx;
  // 스카이패스(마일당) ↔ 알래스카(포인트당): 지갑 순서대로, 기본은 1순위
  const modes = walletOf(profile).map((w) => w.program).filter((p) => p === 'KE' || (p === 'AS' && asProg) || (p === 'ALL' && ctx.acProg));
  const [mode0, setMode] = useState(null);
  const mode = modes.includes(mode0) ? mode0 : modes[0] || 'KE';
  const isAS = mode === 'AS';
  const isAC = mode === 'ALL';
  const stats = isAS ? asStats : keStats;
  const U = isAS ? '포인트' : '마일';
  const per = (v) => `${fmtWon(v)}/${U}`;
  const h = isAS ? null : goals.headline;
  // 알래스카는 달력 연도 기준: 내년 항공편이 잡혀 있으면 내년 기준으로 남은 양 계산
  const ny = +today.slice(0, 4) + 1;
  const asYr = isAS && ctx.flights.some((f) => f.program === 'AS' && +f.date.slice(0, 4) === ny) ? ny : +today.slice(0, 4);
  const asS = isAS ? asSummary(asProg, ctx.flights, today, asYr) : null;
  // 다음 등급까지 남은 양 (예정 항공편 이후)
  const left = isAS ? (() => {
    // 예정 항공편까지 다 탄 뒤의 다음 목표 (지금 등급에 못 미치면 유지, 넘으면 그 위 등급)
    const t = asS.all < asS.held.sp ? asS.held : nextTier(asS.all);
    return t ? { name: `${asYr}년 ${t.sp <= asS.held.sp ? `${t.name} 유지` : t.name}`, rem: t.sp - asS.all } : null;
  })() : (() => {
    const o = h ? h.options.find((x) => x.parts.every((p) => p.unit === 'mi')) : null;
    return o && !h.done ? { name: TIER[h.target].name, rem: o.remMiPlan } : null;
  })();
  const priced = stats.groups.filter((g) => g.perMile != null);
  const unpriced = stats.groups.filter((g) => g.perMile == null && g.miles > 0);
  const maxPM = Math.max(1, ...priced.map((g) => g.perMile));
  const [allTrips, setAllTrips] = useState(false);
  const byPM = [...priced].sort((a, b) => a.perMile - b.perMile);
  const split = priced.length > 10 && !allTrips;
  const bestList = split ? byPM.slice(0, 5) : [];
  const worstList = split ? byPM.slice(-5).reverse() : [];
  const bestPM = priced.length ? Math.min(...priced.map((g) => g.perMile)) : null;
  // 월별 적립: 이번 달 기준 앞뒤 6개월 (13개월)
  const months = useMemo(() => {
    const m = new Map();
    for (const f of ctx.flights) {
      if (isAS ? f.program !== 'AS' : f.program === 'AS' || f.credit === 'NONE') continue;
      const k = f.date.slice(0, 7);
      if (!m.has(k)) m.set(k, { c: 0, p: 0 });
      m.get(k)[f.date < today ? 'c' : 'p'] += isAS ? flightSP(f, asProg).sp : earnedMiles(f);
    }
    if (!m.size) return [];
    const [ty, tm] = today.split('-').map(Number);
    const out = [];
    for (let d = -6; d <= 6; d++) {
      const t = ty * 12 + (tm - 1) + d;
      const y = Math.floor(t / 12), mo = (t % 12) + 1;
      const k = `${y}-${String(mo).padStart(2, '0')}`;
      out.push({ k, y, mo, now: d === 0, ...(m.get(k) || { c: 0, p: 0 }) });
    }
    return out;
  }, [ctx.flights, today, isAS, asProg]);
  const mmax = Math.max(1, ...months.map((x) => x.c + x.p));
  const tripTitle = (g) => {
    const fl = g.flights;
    const codes = [fl[0].from, ...fl.map((x) => x.to)];
    return codes.map(city).join(' → ');
  };
  const TripRow = ({ g }) => (
    <button className="trow num" onClick={() => onOpen(g.flights[0].id)}>
      <div>
        <div className="rt">{tripTitle(g)}</div>
        <div className="dt">{fmtDate(g.flights[0].date, { weekday: false })}{g.flights.length > 1 ? ` · ${g.flights.length}구간` : ''} · {g.flights[0].date < today ? '탑승 완료' : '예정'}</div>
      </div>
      <div>
        <div className={`pm ${g.perMile === bestPM && priced.length > 1 ? 'best' : ''}`}>{fmtWon(g.perMile)}</div>
        <div className="sub">{fmtWonShort(g.cost)} · {fmtNum(g.miles)}{isAS ? ' SP' : '마일'}</div>
      </div>
      <Bar conf={g.perMile / maxPM} thin />
    </button>
  );
  if (isAC) {
    return (
      <>
        <Head title="박당 단가" right={avatar} />
        {modes.length > 1 && <ProgSwitch list={modes.map((p) => ({ program: p }))} value={mode} onChange={setMode} />}
        <AccorCost ctx={ctx} onOpenStay={onOpenStay} />
      </>
    );
  }
  return (
    <>
      <Head title={isAS ? '포인트당 단가' : '마일당 단가'} right={avatar} />
      {modes.length > 1 && <ProgSwitch list={modes.map((p) => ({ program: p }))} value={mode} onChange={setMode} />}
      <div className="hero-num num">
        <div className="faint" style={{ fontSize: 13, fontWeight: 700 }}>{isAS ? '알래스카 평균 포인트당 단가' : '평균 마일당 단가'}</div>
        <div className="v">{stats.perMile ? fmtWon(stats.perMile) : '–'}<small>/{U}</small></div>
        <div className="s">{stats.counted ? `운임 입력한 ${stats.counted}구간 · 총 ${fmtWon(stats.cost)} · ${fmtNum(stats.miles)}${isAS ? ' SP' : '마일'}` : `항공편에 운임을 넣으면 ${U}당 단가를 계산해요.`}</div>
        {isAS && <div className="s">상태포인트(SP) 1점을 얻는 데 든 비용이에요. 적립 방식(거리·달러·구간)에 따라 달라져요.</div>}
      </div>
      {left && stats.perMile && left.rem > 0 && (
        <div className="pad" style={{ marginTop: 10 }}>
          <div className="card" style={{ background: 'var(--sky-soft)', border: 0 }}>
            <div className="card-h" style={{ color: 'var(--sky-ink)' }}>{left.name}까지 예상 비용</div>
            <div className="num" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>약 {fmtWonShort(stats.perMile * left.rem)}</div>
            <div className="help num">예정 항공편 이후 남은 {fmtNum(left.rem)}{isAS ? ' SP' : '마일'} × 평균 {per(stats.perMile)}</div>
          </div>
        </div>
      )}
      {months.length > 0 && (
        <div className="pad" style={{ marginTop: 10 }}>
          <div className="card">
            <div className="card-h"><span>월별 적립 {isAS ? '상태포인트' : '마일'} <span className="faint" style={{ fontWeight: 600 }}>· 앞뒤 6개월</span></span><span className="legend"><span>확정</span><span className="p">예정</span></span></div>
            <div className="months" role="img" aria-label={`월별 적립 ${U} 막대`}>
              {months.map((x) => (
                <div className={`m ${x.now ? 'now' : ''}`} key={x.k} title={`${x.k} · 확정 ${fmtNum(x.c)} · 예정 ${fmtNum(x.p)}`}>
                  {x.p > 0 && <i className="p" style={{ height: `${(x.p / mmax) * 100}%` }} />}
                  {x.c > 0 && <i className="c" style={{ height: `${(x.c / mmax) * 100}%`, borderRadius: x.p > 0 ? 0 : '4px 4px 0 0' }} />}
                </div>
              ))}
            </div>
            <div className="months-x num">{months.map((x, i) => <span key={x.k} className={x.now ? 'now' : ''}>{x.now ? '이번 달' : i % 2 ? '' : x.mo === 1 || i === 0 ? `${String(x.y).slice(2)}.${x.mo}월` : `${x.mo}월`}</span>)}</div>
          </div>
        </div>
      )}
      <div className="section-h"><span>여정별 단가</span><span className="faint">낮을수록 효율적</span></div>
      {priced.length === 0 && <p className="muted" style={{ margin: '4px 20px' }}>운임이 입력된 여정이 아직 없어요.</p>}
      {split ? (
        <>
          <div className="sub-h good">베스트 5</div>
          {bestList.map((g) => <TripRow key={g.id} g={g} />)}
          <div className="sub-h bad">워스트 5</div>
          {worstList.map((g) => <TripRow key={g.id} g={g} />)}
          <button className="more-btn" onClick={() => setAllTrips(true)}>전체 {priced.length}개 여정 보기 <Icon name="chev" size={14} /></button>
        </>
      ) : (
        <>
          {priced.map((g) => <TripRow key={g.id} g={g} />)}
          {priced.length > 10 && <button className="more-btn" onClick={() => setAllTrips(false)}>베스트·워스트 5만 보기</button>}
        </>
      )}
      {unpriced.length > 0 && (
        <>
          <div className="section-h"><span>운임 미입력</span><span className="faint">{unpriced.length}개 여정</span></div>
          {unpriced.map((g) => (
            <button className="trow num" key={g.id} onClick={() => onOpen(g.flights[0].id)}>
              <div><div className="rt">{tripTitle(g)}</div><div className="dt">{fmtDate(g.flights[0].date, { weekday: false })} · {fmtNum(g.miles)}{isAS ? ' SP' : '마일'}</div></div>
              <div className="sub" style={{ alignSelf: 'center' }}>입력하기 <Icon name="chev" size={14} /></div>
            </button>
          ))}
        </>
      )}
      {profile?.sample && <p className="basis">예시 데이터예요. 설정에서 지우고 내 항공편으로 시작할 수 있어요.</p>}
    </>
  );
}

// 아코르: 박당 단가·등급 포인트당 단가
function AccorCost({ ctx, onOpenStay }) {
  const eur = ctx.acProg?.eur;
  const rows = (ctx.stays || []).map((x) => ({ s: x, n: stayNights(x), p: stayPoints(x, eur).pts, krw: +x.krw || 0 })).filter((r) => r.krw > 0 && r.n > 0);
  const tot = rows.reduce((a, r) => ({ krw: a.krw + r.krw, n: a.n + r.n, p: a.p + r.p, pk: a.pk + (isZhStay(r.s) ? 0 : r.krw) }), { krw: 0, n: 0, p: 0, pk: 0 });
  const byN = [...rows].sort((a, b) => a.krw / a.n - b.krw / b.n);
  const unpriced = (ctx.stays || []).filter((x) => !(+x.krw > 0));
  const s = acSummary(ctx.acProg, ctx.stays || [], ctx.today, undefined, eur);
  const perN = tot.n ? tot.krw / tot.n : null;
  return (
    <>
      <div className="hero-num num">
        <div className="faint" style={{ fontSize: 13, fontWeight: 700 }}>아코르 평균 박당 단가</div>
        <div className="v">{perN ? fmtWon(perN) : '–'}<small>/박</small></div>
        <div className="s">{rows.length ? `금액 입력한 ${rows.length}건 · 총 ${fmtWon(tot.krw)} · ${fmtNum(tot.n)}박 · ${fmtNum(tot.p)}P` : '숙박에 금액을 넣으면 박당 단가를 계산해요.'}</div>
        {tot.p > 0 && <div className="s">등급 포인트 1점당 {fmtWon(tot.pk / tot.p)}{rows.some((r) => isZhStay(r.s)) ? ' (숙박만)' : ''}</div>}
      </div>
      {perN && s.next && s.remNPlan != null && s.remNPlan > 0 && (
        <div className="pad" style={{ marginTop: 10 }}>
          <div className="card" style={{ background: 'var(--sky-soft)', border: 0 }}>
            <div className="card-h" style={{ color: 'var(--sky-ink)' }}>{s.year}년 {s.goal}까지 예상 비용</div>
            <div className="num" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>약 {fmtWonShort(perN * s.remNPlan)}</div>
            <div className="help num">예정 숙박·보너스 이후 남은 {fmtNum(s.remNPlan)}박 × 평균 {fmtWon(perN)}/박</div>
          </div>
        </div>
      )}
      <div className="section-h"><span>숙박별 단가</span><span className="faint">박당 낮은 순</span></div>
      {byN.length === 0 && <p className="muted" style={{ margin: '4px 20px' }}>금액이 입력된 숙박이 아직 없어요.</p>}
      {byN.map((r) => (
        <button key={r.s.id} className="trow num" onClick={() => onOpenStay?.(r.s.id)}>
          <div>
            <div className="rt">{r.s.hotel}</div>
            <div className="dt">{fmtDate(r.s.checkIn, { weekday: false })} · {isZhStay(r.s) ? `보너스 ${r.n}박` : `${r.n}박 · ${r.s.brand}`}</div>
          </div>
          <div>
            <div className="pm">{fmtWon(r.krw / r.n)}</div>
            <div className="sub">{fmtWonShort(r.krw)} · {r.p > 0 ? `${fmtWon(r.krw / r.p)}/P` : '–'}</div>
          </div>
          <Bar conf={(r.krw / r.n) / Math.max(1, ...byN.map((x) => x.krw / x.n))} thin />
        </button>
      ))}
      {unpriced.length > 0 && (
        <>
          <div className="section-h"><span>금액 미입력</span><span className="faint">{unpriced.length}건</span></div>
          {unpriced.map((x) => (
            <button className="trow num" key={x.id} onClick={() => onOpenStay?.(x.id)}>
              <div><div className="rt">{x.hotel}</div><div className="dt">{fmtDate(x.checkIn, { weekday: false })} · {stayNights(x)}박</div></div>
              <div className="sub" style={{ alignSelf: 'center' }}>입력하기 <Icon name="chev" size={14} /></div>
            </button>
          ))}
        </>
      )}
    </>
  );
}

export { Avatar };
