import { useMemo, useState } from 'react';
import { findAirport } from './airports.js';
import { fmtNum, fmtDate, fmtDot, fmtWon, daysBetween, todayISO, uid } from './core.js';
import {
  AC_TIERS, AC_TIER, BRAND_GROUPS, DEFAULT_EUR, acSummary, acYear, remText, combos, stayNights, stayPoints, stayDate, brandRate, bonusEvents,
} from './accor.js';
import { Icon, AirlineMark, Bar, Seg, NumInput, WonInput, DateInput, AirportInput, Ring, CardFace } from './ui.jsx';

const city = (c) => findAirport(c)?.city || c || '';
const thisYear = (today) => +today.slice(0, 4);

/* ───────── 카드 ───────── */
export function acFace(prog, stays, today) {
  const s = acSummary(prog, stays, today, undefined, prog?.eur);
  const t = s.held;
  return {
    bg: t.bg, ink: t.ink, en: 'ACCOR · ALL', title: t.en, airline: 'ALL',
    sub: prog?.validUntil ? `${fmtDot(prog.validUntil)}까지` : '호텔',
    foot: <div className="wline"><b>{s.next ? `${s.goal}까지 ${remText(s)}` : `${s.year}년 최고 등급`}</b><span>{s.year} · {fmtNum(s.conf.nights)}박 · {fmtNum(s.conf.points)}P</span></div>,
    conf: s.conf01, plan: Math.max(0, s.all01 - s.conf01),
  };
}

/* ───────── 내 항공편 맨 위 띠 ───────── */
export function AcStrip({ prog, ctx, onClick }) {
  const s = acSummary(prog, ctx.stays || [], ctx.today, undefined, prog?.eur);
  return (
    <button className="strip ac" onClick={onClick} aria-label="아코르 등급 보기">
      <div>
        <div className="t"><AirlineMark code="ALL" size="xs" />아코르 {s.held.name}{s.next ? (s.keep ? ' · 유지' : ` → ${s.next.name}`) : ''}</div>
        <div className="v num">{s.next ? `${remText(s)} 남음` : '달성했어요'}</div>
      </div>
      <div className="num" style={{ fontWeight: 800, fontSize: 18 }}>{Math.floor(s.conf01 * 100)}%</div>
      <Bar conf={s.conf01} plan={Math.max(0, s.all01 - s.conf01)} thin />
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
  const [explorerDate, setExplorerDate] = useState(entry?.explorerDate || '');
  const [zh, setZh] = useState(!!entry?.zh);
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
      explorer, explorerDate: explorer ? explorerDate : '', zh, eurAuto, eur: eurAuto ? fx?.rate || +eur || DEFAULT_EUR : +eur || DEFAULT_EUR,
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
          <p className="help" style={{ margin: 0 }}>아코르 앱 <b>내 계정 › 데시보드</b>의 숫자를 그대로 옮겨 주세요. 이미 받은 보너스 박(Explorer·중올플·패스트트랙)도 이 숫자에 들어 있는 걸로 보고, 오늘 이전 숙박은 중복으로 세지 않아요.</p>
        </div>
        <div className="segcard">
          <div className="sh">보너스 박</div>
          <label className="checkrow light">
            <input type="checkbox" checked={explorer} onChange={(e) => setExplorer(e.target.checked)} />
            <span>Accor+ Explorer 가입 <small>(갱신할 때마다 30박)</small></span>
          </label>
          {explorer && (
            <label className="field"><span>다음 갱신일 <span className="faint">(이 날 30박이 예정으로 더해져요)</span></span><DateInput value={explorerDate} onChange={setExplorerDate} /></label>
          )}
          <label className="checkrow light">
            <input type="checkbox" checked={zh} onChange={(e) => setZh(e.target.checked)} />
            <span>중국 Accor Plus(중올플) 가입 <small>(가입할 때 20박 한 번 · 이미 받았으면 위 숫자에 들어 있어요)</small></span>
          </label>
          <div className="lab" style={{ marginTop: 4 }}>패스트트랙 등 프로모션 보너스</div>
          {fast.map((f, i) => (
            <div key={i} className="fastrow">
              <DateInput value={f.date} onChange={(v) => setF(i, { date: v })} />
              <NumInput value={f.nights} suffix="박" placeholder="0" onChange={(v) => setF(i, { nights: v })} />
              <button className="icon-btn" style={{ width: 36, height: 36 }} onClick={() => setFast((l) => l.filter((_, k) => k !== i))} aria-label="삭제"><Icon name="close" size={15} /></button>
            </div>
          ))}
          <button className="btn sm ghost" onClick={() => setFast((l) => [...l, { date: todayISO(), nights: null, label: '패스트트랙' }])}><Icon name="plus" size={15} />보너스 박 추가</button>
          <p className="help" style={{ margin: 0 }}>들어오는 날짜를 넣어 주세요. 오늘 이후면 예정, 지났으면 확정으로 더해요(위 숫자를 입력한 날 이전 것은 이미 포함된 걸로 봐요).</p>
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
          <span>{city(s.city)}{s.city ? ` ${s.city}` : ''}</span>
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

/* ───────── 숙박 추가·수정 ───────── */
const blankStay = () => ({ id: null, hotel: '', brand: 'Novotel', city: '', checkIn: '', checkOut: '', krw: null, nightsOverride: null, pointsOverride: null, note: '' });
export function StayForm({ initial, ctx, onSave, onDelete, onCancel }) {
  const [s, setS] = useState(() => ({ ...blankStay(), ...(initial || {}) }));
  const [tried, setTried] = useState(false);
  const [del, setDel] = useState(false);
  const set = (p) => setS((x) => ({ ...x, ...p }));
  const n = stayNights({ ...s, nightsOverride: null });
  const p = stayPoints({ ...s, pointsOverride: null }, ctx.acProg?.eur);
  const valid = s.hotel.trim() && s.checkIn && s.checkOut && s.checkOut > s.checkIn;
  const save = () => {
    setTried(true);
    if (!valid) return;
    onSave({ ...s, id: s.id || uid(), hotel: s.hotel.trim(), krw: s.krw == null || s.krw === '' ? null : +s.krw });
  };
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark bed" style={{ background: '#1e1852' }}><Icon name="bed" size={16} /></span>
        <div><div className="k">아코르 ALL · 등급 숙박일·포인트 자동 계산</div><h2>{initial?.id ? '숙박 편집' : '숙박 추가'}</h2></div>
        <button className="icon-btn" onClick={onCancel} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div className="form">
        <div className="segcard">
          <label className="field"><span>호텔 이름</span><input className="input" value={s.hotel} placeholder="예: 노보텔 앰배서더 서울 동대문" onChange={(e) => set({ hotel: e.target.value })} /></label>
          {tried && !s.hotel.trim() && <div className="err-t">호텔 이름을 넣어 주세요.</div>}
          <label className="field">
            <span>브랜드 <span className="faint">(10유로당 등급 포인트)</span></span>
            <select className="input" value={s.brand} onChange={(e) => set({ brand: e.target.value })}>
              {BRAND_GROUPS.map(([g, r, list]) => (
                <optgroup key={g} label={`${g} · ${r}P`}>
                  {list.map((b) => <option key={b} value={b}>{b}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <AirportInput label="도시 (가까운 공항으로 골라도 돼요 · 지도에 핀)" value={s.city} onChange={(v) => set({ city: v })} />
          <div className="row2">
            <label className="field"><span>체크인</span><DateInput value={s.checkIn} onChange={(v) => set({ checkIn: v, checkOut: s.checkOut && s.checkOut > v ? s.checkOut : '' })} invalid={tried && !s.checkIn} /></label>
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
        {initial?.id && (del ? <button className="btn danger block" onClick={() => onDelete(s.id)}>이 숙박 삭제</button> : <button className="btn danger block" onClick={() => setDel(true)}><Icon name="trash" size={17} />숙박 삭제</button>)}
      </div>
      <div className="sumbar">
        <div className="line num"><span>등급 <b>{fmtNum(s.nightsOverride ?? n)}박 · {fmtNum(s.pointsOverride ?? p.pts)}P</b></span><span>{+s.krw > 0 && n > 0 ? <>박당 <b>{fmtWon(s.krw / n)}</b></> : '금액 미입력'}</span></div>
        <button className="btn primary block" onClick={save}>{initial?.id ? '저장' : '숙박 추가'}</button>
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
        <Seg small options={[['prog', '진행'], ['combo', '보너스 조합'], ['stays', '숙박']]} value={tab} onChange={setTab} />
      </div>

      {tab === 'prog' && (
        <>
          <div className="goal">
            <h3>{nt ? `${s.goal}까지` : '최고 등급 달성'}</h3>
            <div className="scope">{yr}.01.01 ~ {yr}.12.31{dleft >= 0 && yr === yr0 ? ` · D-${dleft}` : ''} · 딴 등급은 {fmtDot(s.validUntil)}까지</div>
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
          <div className="tiles num" style={{ marginTop: 10 }}>
            <div className="tile"><div className="k">{nt ? `${s.goal}까지` : '다음 등급'}</div><div className="v" style={{ fontSize: 16 }}>{nt ? remText(s) : '–'}</div><div className="s">{nt ? `예정 포함 ${remText(s, true)}` : '최고 등급'}</div></div>
            <div className="tile"><div className="k">{yr}년 실적으로</div><div className="v">{s.earnedPlan.name}</div><div className="s">예정 포함 · {fmtDot(s.validUntil)}까지</div></div>
            <div className="tile"><div className="k">보너스 박</div><div className="v">{s.bonus.length ? `+${fmtNum(s.bonus.reduce((a, b) => a + b.nights, 0))}박` : '–'}</div><div className="s">{s.bonus.length ? s.bonus.map((b) => b.label).join(' · ') : prog.explorer ? 'Explorer 갱신일을 넣어 주세요' : '입력한 숫자 이후 없음'}</div></div>
            <div className="tile"><div className="k">지금 등급</div><div className="v">{s.held.name}</div><div className="s">{prog.validUntil ? `${fmtDot(prog.validUntil)}까지` : '유효기간 미입력'}</div></div>
          </div>
          {s.est > 0 && <div className="notice" style={{ margin: '8px 16px 0' }}>등급 포인트는 금액으로 추정한 값이 {s.est}건 있어요. 숙박 후 아코르 앱 값으로 고치면 정확해져요.</div>}
          <StayList rows={s.rows} ctx={ctx} title={`${yr}년 숙박`} onOpen={onOpenStay} onAdd={onAddStay} />
          <p className="basis">입력한 숫자(입력한 날까지)와 그 뒤 숙박·보너스 박을 더해 계산해요. 등급 포인트는 원화 금액을 유로로 바꿔 브랜드별 적립률(10유로당 25·12.5·10·5P)로 추정한 참고값이고, 실제 적립은 아코르 기준이 우선이에요.</p>
        </>
      )}

      {tab === 'combo' && <ComboTab prog={prog} s={s} yr={yr} />}
      {tab === 'stays' && (
        <StayList rows={[...stays].sort((a, b) => stayDate(b).localeCompare(stayDate(a))).map((x) => ({ s: x }))} ctx={ctx} title="전체 숙박" onOpen={onOpenStay} onAdd={onAddStay} />
      )}
      {footer}
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

function ComboTab({ prog, s, yr }) {
  // 그 해 숙박(입력한 숫자 이후)만으로 계산하고 보너스 박을 바꿔 가며 비교
  const stayN = s.rows.reduce((a, r) => a + r.nights, 0);
  const stayP = s.rows.reduce((a, r) => a + r.points, 0);
  const fastN = (prog.fast || []).filter((f) => +String(f.date).slice(0, 4) === yr).reduce((a, f) => a + +f.nights, 0);
  const list = combos(stayN, stayP, fastN);
  return (
    <div className="pad" style={{ marginTop: 14 }}>
      <div className="card">
        <div className="card-h"><span>{yr}년 숙박 {fmtNum(stayN)}박{fastN ? ` + 패스트트랙 ${fastN}박` : ''} 기준</span></div>
        <div className="cmp">
          {list.map((c) => (
            <div key={c.id} className="cmpbar">
              <div className="h num">
                <b>{c.label}</b>
                {(c.id === 'exp' && prog.explorer) || (c.id === 'zh' && prog.zh) || (c.id === 'both' && prog.explorer && prog.zh) ? <span className="badge">가입함</span> : null}
                <span className="v">{c.tier.name}</span>
              </div>
              <Bar conf={Math.min(1, c.total / 60)} thin done={c.total >= 60} />
              <div className="help num">{fmtNum(c.total)}박{c.next ? ` · ${c.next.name}까지 ${fmtNum(c.rem)}박` : ' · 플래티넘 이상'} · {yr + 1}년 말까지 유지</div>
            </div>
          ))}
        </div>
      </div>
      <p className="basis" style={{ padding: '12px 4px' }}>Accor+ Explorer는 갱신할 때마다 30박, 중국 Accor Plus(중올플)는 가입할 때 20박이 한 번 들어와요. 이미 받은 보너스는 이 비교에 넣지 않았어요. 다이아몬드는 등급 포인트(26,000P)로만 갈 수 있어요.</p>
    </div>
  );
}
