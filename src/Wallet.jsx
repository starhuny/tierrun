import { useMemo, useRef, useState } from 'react';
import { TIER, AIRLINE } from './skypass.js';
import { findAirport } from './airports.js';
import { fmtNum, fmtDot, fmtDate, daysBetween, todayISO } from './core.js';
import {
  AS_TIERS, AS_TIER, METHODS, METHOD, MILESTONES, CAT, METHOD_FROM_YEAR, EXAMPLES,
  asSummary, asYear, compareMethods, tierBySP, spFor, isOneworld, asCategory,
} from './alaska.js';
import { PROGRAMS, PROGRAM_LIST, walletOf } from './wallet.js';
import { Icon, AirlineMark, Bar, Seg, NumInput, Ring } from './ui.jsx';

const city = (c) => findAirport(c)?.city || c || '?';
const thisYear = (today) => +today.slice(0, 4);
const man = (n) => (n % 10000 === 0 ? `${n / 10000}만` : `${(n / 10000).toFixed(1).replace(/\.0$/, '')}만`);

/* ───────── 카드 모양 ───────── */
function CardFace({ bg, ink, en, title, sub, gem, airline, foot, conf, plan, compact }) {
  return (
    <div className={`wface ${compact ? 'compact' : ''}`} style={{ background: bg, color: ink }}>
      <div className="wtop">
        <div>
          <div className="en">{en}</div>
          <div className="ko">{title}{gem && <i className="gem" style={{ background: gem }} />}</div>
          {sub && <div className="sub">{sub}</div>}
        </div>
        {airline && <AirlineMark code={airline} size="sm" />}
      </div>
      {!compact && (
        <div className="wfoot num">
          {foot}
          {conf != null && <Bar conf={conf} plan={plan || 0} thin />}
        </div>
      )}
    </div>
  );
}

function keFace(profile, goals) {
  const tier = TIER[profile?.tier || 'SKYPASS'];
  const g = goals?.headline;
  const o = g ? g.options[g.best] : null;
  const rem = !g ? '최고 등급이에요' : g.done ? `${TIER[g.target].name} 달성` : `${TIER[g.target].name}까지 ${o.parts.some((p) => p.unit === 'mi') ? `${fmtNum(o.remMi)}마일` : `${fmtNum(o.remPt)}P`}`;
  return {
    bg: tier.bg, ink: tier.ink, en: 'KOREAN AIR SKYPASS', title: tier.name, airline: 'KE',
    sub: profile?.periodEnd && (tier.id === 'MC' || tier.id === 'MCS') ? `${fmtDot(profile.periodEnd)}까지` : tier.id === 'MCP' || tier.id === 'MM' ? '평생 등급' : '',
    foot: <div className="wline"><b>{rem}</b>{o && <span>{Math.floor(o.conf * 100)}%</span>}</div>,
    conf: o ? o.conf : null, plan: o ? o.all - o.conf : 0,
  };
}
function asFace(prog, flights, today) {
  const s = asSummary(prog, flights, today);
  const t = s.held;
  const target = s.next ? s.next.sp : s.earned.sp || 1;
  return {
    bg: t.bg, ink: t.ink, en: 'ALASKA ATMOS REWARDS', title: t.name, gem: t.gem, airline: 'AS',
    sub: t.ow ? `원월드 ${t.ow}` : '원월드',
    foot: <div className="wline"><b>{s.next ? `${s.goal}까지 ${fmtNum(s.rem)} SP` : `${s.year}년 최고 등급 달성`}</b><span>{s.year} · {fmtNum(s.conf)} SP</span></div>,
    conf: Math.min(1, s.conf / target), plan: Math.min(1, s.all / target) - Math.min(1, s.conf / target),
  };
}
export function faceFor(entry, ctx, goals) {
  if (entry.program === 'KE') return keFace(ctx.profile, goals);
  if (entry.program === 'AS') return asFace(entry, ctx.flights, ctx.today);
  return null;
}

/* ───────── 처음 시작: 어떤 등급을 관리할지 고르기 ───────── */
const PICK_DESC = {
  KE: '모닝캄 · 셀렉트 · 프리미엄 · 밀리언 마일러',
  AS: '실버(루비) · 골드(사파이어) · 플래티넘(에메랄드) · 티타늄',
  TK: '클래식 플러스 · 엘리트 · 엘리트 플러스',
};
export function SetupStart({ user, onNext, onSample }) {
  const [name, setName] = useState(user?.name || '');
  const [pick, setPick] = useState([]);
  const toggle = (id) => setPick((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const ordered = PROGRAM_LIST.filter((p) => pick.includes(p.id)).map((p) => p.id);
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)', color: 'var(--navy-btn-ink)' }}><Icon name="wallet" size={16} /></span>
        <div><div className="k">처음 한 번만 입력해요</div><h2>어떤 등급을 관리할까요?</h2></div>
        <span />
      </div>
      <div className="form">
        <label className="field"><span>이름</span><input className="input" value={name} placeholder="표시할 이름" onChange={(e) => setName(e.target.value)} /></label>
        <div className="field">
          <span>가지고 있거나 도전할 항공사 등급 <span className="faint">(여러 개 골라도 돼요)</span></span>
          <div className="spick">
            {PROGRAM_LIST.map((p) => {
              const on = pick.includes(p.id);
              return (
                <button key={p.id} type="button" className={`${on ? 'on' : ''} ${p.soon ? 'soon' : ''}`} disabled={p.soon} onClick={() => toggle(p.id)} aria-pressed={on}>
                  <AirlineMark code={p.airline} />
                  <span>
                    <b>{p.name}</b>
                    <small>{p.alliance === 'OW' ? '원월드' : p.alliance === 'SA' ? '스타얼라이언스' : '스카이팀'} · {p.soon ? '준비 중' : PICK_DESC[p.id]}</small>
                  </span>
                  <span className="ck">{on && <Icon name="check" size={14} stroke={3} />}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="help" style={{ margin: 0 }}>고른 등급은 지갑에 카드로 들어가요. 나중에 오른쪽 위 프로필을 누르면 열리는 <b>지갑</b>에서 언제든 더 추가할 수 있어요.</p>
      </div>
      <div className="sumbar">
        {onSample && <button className="btn ghost block" onClick={onSample}>예시 데이터로 먼저 둘러보기</button>}
        <button className="btn primary block" disabled={!pick.length} onClick={() => onNext({ name: name.trim(), programs: ordered })}>
          {pick.length ? `다음 · ${ordered.map((id) => PROGRAMS[id].short).join(', ')} 설정` : '1개 이상 골라 주세요'}
        </button>
      </div>
    </div>
  );
}

/* ───────── 지갑 ───────── */
export function WalletView({ ctx, goals, user, onOpen, onAdd, onSettings, onFriends, onReorder, onClose }) {
  const wallet = walletOf(ctx.profile);
  const [edit, setEdit] = useState(false);
  const missing = PROGRAM_LIST.filter((p) => !wallet.some((w) => w.program === p.id));
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)', color: 'var(--navy-btn-ink)' }}><Icon name="wallet" size={16} /></span>
        <div><div className="k">{ctx.profile?.name || user?.name || '내 지갑'}</div><h2>티어 지갑</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      {edit ? (
        <Reorder wallet={wallet} onDone={(w) => { onReorder(w); setEdit(false); }} />
      ) : (
        <div className="wstack">
          {/* 1순위가 맨 앞(맨 아래, 다 보이는 카드)에 오도록 거꾸로 쌓음 */}
          {[...wallet].reverse().map((w) => {
            const f = faceFor(w, ctx, goals);
            return f && (
              <button key={w.program} className="wcard" onClick={() => onOpen(w.program)} aria-label={`${PROGRAMS[w.program].name} 열기`}>
                <CardFace {...f} />
              </button>
            );
          })}
        </div>
      )}
      <div className="wbtns">
        {!edit && wallet.length > 1 && <button className="btn sm ghost" onClick={() => setEdit(true)}><Icon name="list" size={15} />순서 바꾸기</button>}
        {!edit && <p className="help" style={{ margin: 0, textAlign: 'center' }}>맨 앞 카드가 1순위예요. ‘내 항공편’ 맨 위 띠와 등급 현황도 이 순서로 보여요.</p>}
      </div>
      <div className="section-h"><span>티어 추가</span></div>
      <div className="pad" style={{ display: 'grid', gap: 8 }}>
        {missing.map((p) => (
          <button key={p.id} className={`wadd ${p.soon ? 'soon' : ''}`} onClick={() => !p.soon && onAdd(p.id)} disabled={p.soon}>
            <AirlineMark code={p.airline} size="sm" />
            <span><b>{p.name}</b><small>{p.alliance === 'OW' ? '원월드' : p.alliance === 'SA' ? '스타얼라이언스' : '스카이팀'}{p.soon ? ' · 준비 중' : ''}</small></span>
            {!p.soon && <Icon name="plus" size={18} />}
          </button>
        ))}
        {!missing.filter((p) => !p.soon).length && <p className="help" style={{ margin: 0 }}>지금 지원하는 프로그램은 모두 추가했어요.</p>}
      </div>
      <div className="section-h"><span>메뉴</span></div>
      <div className="pad" style={{ display: 'grid', gap: 8, paddingBottom: 24 }}>
        <button className="wmenu" onClick={onSettings}><Icon name="user" size={18} />{wallet.some((w) => w.program === 'KE') ? '설정 · 스카이패스 실적 입력' : '설정 · 데이터'}<Icon name="chev" size={16} /></button>
        {onFriends && <button className="wmenu" onClick={onFriends}><Icon name="user" size={18} />친구<Icon name="chev" size={16} /></button>}
      </div>
    </div>
  );
}

// 끌어서 순서 바꾸기 (손잡이를 잡고 위아래로)
const ROW_H = 64;
function Reorder({ wallet, onDone }) {
  const [list, setList] = useState(wallet);
  const [drag, setDrag] = useState(null); // { i, dy }
  const start = useRef(0);
  const target = drag ? Math.max(0, Math.min(list.length - 1, drag.i + Math.round(drag.dy / ROW_H))) : -1;
  const down = (i) => (e) => {
    start.current = e.clientY;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* 무시 */ }
    setDrag({ i, dy: 0 });
  };
  const move = (e) => drag && setDrag({ ...drag, dy: e.clientY - start.current });
  const up = () => {
    if (!drag) return;
    const n = [...list];
    const [x] = n.splice(drag.i, 1);
    n.splice(target, 0, x);
    setList(n);
    setDrag(null);
  };
  const shift = (i) => {
    if (!drag || i === drag.i) return 0;
    if (drag.i < i && i <= target) return -ROW_H;
    if (target <= i && i < drag.i) return ROW_H;
    return 0;
  };
  return (
    <div className="pad">
      <p className="help" style={{ margin: '0 2px 8px' }}>1번이 지갑 맨 앞 카드예요. 손잡이를 잡고 끌어서 바꿔요.</p>
      <div className="wreorder" style={{ height: list.length * ROW_H }}>
        {list.map((w, i) => {
          const p = PROGRAMS[w.program];
          const y = i * ROW_H + (drag?.i === i ? drag.dy : shift(i));
          return (
            <div key={w.program} className={`wrow ${drag?.i === i ? 'drag' : ''}`} style={{ transform: `translateY(${y}px)`, transition: drag?.i === i ? 'none' : 'transform .18s ease' }}>
              <span className="num faint">{i + 1}</span>
              <AirlineMark code={p.airline} size="sm" />
              <b>{p.name}</b>
              <span className="handle" onPointerDown={down(i)} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label="끌어서 순서 바꾸기"><Icon name="grip" size={20} /></span>
            </div>
          );
        })}
      </div>
      <button className="btn primary block" style={{ marginTop: 12 }} onClick={() => onDone(list)}>순서 저장</button>
    </div>
  );
}

/* ───────── 티어 추가·수정 (알래스카) ───────── */
export function TierAddView({ program, entry, ctx, onSave, onDelete, onClose }) {
  const yr = thisYear(ctx.today);
  const editing = !!entry;
  const [tier, setTier] = useState(entry?.tier || 'MEMBER');
  const [sp, setSp] = useState(entry?.sp ?? null);
  const [method, setMethod] = useState(entry?.method || 'distance');
  const ow = ctx.flights.filter((f) => f.program !== 'AS' && isOneworld(f.airline));
  const [convert, setConvert] = useState(true);
  const [ask, setAsk] = useState(false);
  const asCount = ctx.flights.filter((f) => f.program === 'AS').length;
  if (program !== 'AS') return null;
  const save = () => {
    const changed = (+sp || 0) !== (+entry?.sp || 0);
    const spDate = !(+sp > 0) ? '' : changed || !entry?.spDate ? todayISO() : entry.spDate;
    onSave({ ...(entry || {}), program: 'AS', tier, sp: +sp || 0, spDate, method, rewards: entry?.rewards || {} }, { convert: convert ? ow.map((f) => f.id) : [] });
  };
  return (
    <div className="fade-in">
      <div className="dhead">
        <AirlineMark code="AS" />
        <div><div className="k">{editing ? '티어 수정' : '지갑에 티어 추가'}</div><h2>알래스카 Atmos 리워드</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div className="form">
        <div className="field">
          <span>지금 가진 등급</span>
          <div className="tierpick">
            {AS_TIERS.map((t) => (
              <button key={t.id} type="button" className={tier === t.id ? 'on' : ''} style={{ background: t.bg, color: t.ink }} onClick={() => setTier(t.id)} aria-pressed={tier === t.id}>
                <span>{t.name}{t.ow ? <small style={{ display: 'block', fontWeight: 700, opacity: 0.75, fontSize: 10 }}>{t.ow}</small> : null}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="segcard">
          <div className="sh">{yr}년 상태포인트</div>
          <label className="field">
            <span>올해 지금까지 쌓은 상태포인트 (SP)</span>
            <NumInput value={sp} suffix="SP" placeholder="0" onChange={setSp} />
          </label>
          <p className="help" style={{ margin: 0 }}>알래스카 앱 첫 화면의 상태포인트를 옮겨 적거나, <b>0으로 두고 올해 탄 원월드 항공편을 추가</b>해도 돼요. 숫자를 넣으면 오늘 이전 항공편은 그 숫자에 들어 있는 걸로 보고 중복 계산하지 않아요. 등급은 1월 1일~12월 31일 실적으로 정해져요.</p>
        </div>
        <div className="segcard">
          <div className="sh">{METHOD_FROM_YEAR}년 적립 방식</div>
          <div className="mpick">
            {METHODS.map((m) => (
              <button key={m.id} type="button" className={method === m.id ? 'on' : ''} onClick={() => setMethod(m.id)} aria-pressed={method === m.id}>
                <span className="r" aria-hidden="true" />
                <span><b>{m.name}</b><small>{m.desc}</small><small className="good">유리: {m.good}</small></span>
              </button>
            ))}
          </div>
          <p className="help" style={{ margin: 0 }}>알래스카에서 고른 방식과 똑같이 골라 주세요. <b>{METHOD_FROM_YEAR}년 1월 1일 출발편부터</b> 이 방식으로 적립 예정을 보여주고, {METHOD_FROM_YEAR - 1}년 탑승분은 거리 기준(1마일 = 1SP)으로 계산해요. 어느 쪽이 유리한지는 카드 상세의 <b>방식 비교</b>에서 볼 수 있어요.</p>
        </div>
        {ow.length > 0 && (
          <label className="checkrow">
            <input type="checkbox" checked={convert} onChange={(e) => setConvert(e.target.checked)} />
            <span>이미 추가한 원월드 항공편 <b>{ow.length}편</b>을 알래스카로 적립 <small>({[...new Set(ow.map((f) => f.airline))].map((c) => AIRLINE[c]?.name || c).join(', ')})</small></span>
          </label>
        )}
        {editing && (
          ask ? (
            <div className="row2">
              <button className="btn sm danger" onClick={onDelete}>지갑에서 빼기</button>
              <button className="btn sm ghost" onClick={() => setAsk(false)}>취소</button>
            </div>
          ) : (
            <button className="btn sm ghost danger-t" onClick={() => setAsk(true)}><Icon name="trash" size={15} />지갑에서 빼기</button>
          )
        )}
        {ask && <p className="help" style={{ margin: 0 }}>알래스카로 적립한 항공편 {asCount}편은 지워지지 않고 스카이패스 항공편으로 돌아가요.</p>}
      </div>
      <div className="sumbar">
        <button className="btn primary block" onClick={save}>{editing ? '저장' : '지갑에 추가'}</button>
      </div>
    </div>
  );
}

/* ───────── 알래스카 상세 ───────── */
function Track({ conf, plan }) {
  const max = conf + plan >= 76000 ? 135000 : 80000;
  const marks = [...MILESTONES.map((m) => ({ sp: m.sp, ms: true })), ...AS_TIERS.slice(1).filter((t) => t.sp <= max).map((t) => ({ sp: t.sp, t }))].sort((a, b) => a.sp - b.sp);
  return (
    <div className="track">
      <Bar conf={Math.min(1, conf / max)} plan={Math.min(1, (conf + plan) / max) - Math.min(1, conf / max)} />
      <div className="ticks">
        {marks.map((m) => (
          <i key={m.sp} className={`${m.ms ? 'ms' : 'tr'} ${conf >= m.sp ? 'got' : conf + plan >= m.sp ? 'plan' : ''}`} style={{ left: `${(m.sp / max) * 100}%`, ...(m.t ? { '--c': m.t.gem } : {}) }} />
        ))}
      </div>
      <div className="tlabels num">
        {marks.map((m) => (
          <span key={m.sp} className={m.sp === max ? 'end' : ''} style={{ left: `${(m.sp / max) * 100}%` }}>
            {man(m.sp)}{m.t && <small>{m.t.name}</small>}
          </span>
        ))}
      </div>
    </div>
  );
}

function SpRow({ r, onOpen, today }) {
  const f = r.f;
  return (
    <button className="sprow num" onClick={() => onOpen(f.id)}>
      <AirlineMark code={f.airline} size="sm" />
      <span className="m">
        <b>{city(f.from)} → {city(f.to)}</b>
        <small>{f.airline} {f.flightNo} · {fmtDate(f.date, { weekday: false })}{f.date >= today ? ' · 예정' : ''}{f.award ? ' · 마일 항공권' : ''}</small>
      </span>
      <span className="v"><b>+{fmtNum(r.sp)}</b><small>{r.est ? '추정' : 'SP'}</small></span>
    </button>
  );
}

export function AlaskaView({ prog, ctx, head, footer, onEdit, onBack, onSetMethod, onRewards, onOpen }) {
  const { flights, today } = ctx;
  const yr0 = thisYear(today);
  const years = [yr0, yr0 + 1];
  const [yr, setYr] = useState(yr0);
  const [tab, setTab] = useState('prog');
  const s = useMemo(() => asSummary(prog, flights, today, yr), [prog, flights, today, yr]);
  const held = s.held;
  const dleft = daysBetween(today, s.deadline);
  return (
    <div className="fade-in">
      {head || (
        <div className="dhead">
          <button className="icon-btn" onClick={onBack} aria-label="지갑으로"><Icon name="back" size={18} /></button>
          <div><div className="k">원월드 · 지갑</div><h2>알래스카 Atmos</h2></div>
          <button className="icon-btn" onClick={onEdit} aria-label="티어 수정"><Icon name="edit" size={17} /></button>
        </div>
      )}
      <div className="pad" style={{ paddingTop: 6 }}>
        <CardFace {...asFace(prog, flights, today)} />
      </div>
      <div className="pad" style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        <Seg small light options={years.map((y) => [y, `${y}년`])} value={yr} onChange={setYr} />
        <Seg small options={[['prog', '진행'], ['ms', '마일스톤'], ['cmp', '방식 비교']]} value={tab} onChange={setTab} />
      </div>

      {tab === 'prog' && (
        <>
          <div className="goal">
            <h3>{s.next ? `${s.goal}까지` : '최고 등급 달성'}</h3>
            <div className="scope">{yr}.01.01 ~ {yr}.12.31{dleft >= 0 && yr === yr0 ? ` · D-${dleft}` : ''} · {METHOD[s.method].name}{yr < METHOD_FROM_YEAR ? ' (2026년 고정)' : ''}</div>
            <div className="ringwrap">
              <Ring conf={s.next ? Math.min(1, s.conf / s.next.sp) : 1} all={s.next ? Math.min(1, s.all / s.next.sp) : 1}>
                <b className="num">{fmtNum(s.conf)}</b>
                <small>SP 확정</small>
              </Ring>
              <div className="kv num">
                {s.base > 0 && <div><span className="k">입력한 SP</span><span className="v">{fmtNum(s.base)}</span></div>}
                <div><span className="k">항공편</span><span className="v">{fmtNum(s.conf - s.base)}</span></div>
                <div><span className="k">예정</span><span className="v" style={{ color: 'var(--sky-ink)' }}>+{fmtNum(s.plan)}</span></div>
                {s.next && <div><span className="k">목표</span><span className="v">{fmtNum(s.next.sp)}</span></div>}
                <div className="legend" style={{ marginTop: 4 }}><span>확정</span><span className="p">예정</span></div>
              </div>
            </div>
          </div>
          <div className="pad"><Track conf={s.conf} plan={s.plan} /></div>
          <div className="tiles num" style={{ marginTop: 6 }}>
            <div className="tile"><div className="k">{s.next ? `${s.goal}까지` : '다음 등급'}</div><div className="v">{s.next ? `${fmtNum(s.rem)} SP` : '–'}</div><div className="s">{s.next ? (s.remPlan === 0 ? '예정 항공편으로 충분해요' : `예정 포함 ${fmtNum(s.remPlan)} SP 더`) : '티타늄 달성'}</div></div>
            <div className="tile"><div className="k">{yr + 1}년 등급 예상</div><div className="v">{s.earnedPlan.name}</div><div className="s">{s.earnedPlan.ow ? `원월드 ${s.earnedPlan.ow} · ` : ''}예정 포함</div></div>
            <div className="tile"><div className="k">다음 마일스톤</div><div className="v">{s.nextMs ? `${man(s.nextMs.sp)} SP` : '모두 달성'}</div><div className="s">{s.nextMs ? `${fmtNum(s.nextMs.sp - s.conf)} SP 남음` : '보상을 골라 두세요'}</div></div>
            <div className="tile"><div className="k">지금 등급</div><div className="v">{held.name}</div><div className="s">{held.bonus ? `보너스 포인트 +${held.bonus}%` : '보너스 없음'}</div></div>
          </div>
          {s.est > 0 && <div className="notice" style={{ margin: '8px 16px 0' }}>운임(USD)이나 사용 포인트를 안 넣은 항공편 {s.est}편은 추정치예요. 항공편을 눌러 입력하면 정확해져요.</div>}
          <div className="section-h"><span>{yr}년 알래스카 적립 항공편</span><span className="faint num">{s.rows.length}편</span></div>
          {s.rows.length ? s.rows.map((r) => <SpRow key={r.f.id} r={r} onOpen={onOpen} today={today} />) : <p className="muted pad" style={{ margin: '0 20px', fontSize: 14 }}>아직 없어요. 원월드 항공편을 추가하면 알래스카로 자동 적립돼요.</p>}
          <p className="basis">입력한 상태포인트와 알래스카로 적립한 항공편을 더해 계산해요. 정리표(2026년 기준) 규칙으로 계산한 참고값이고, 실제 적립은 알래스카 항공 기준이 우선이에요. 등급 보너스 포인트(+25~100%)는 상태포인트가 아니라 사용하는 포인트에만 붙어요.</p>
        </>
      )}

      {tab === 'ms' && <MilestonesTab prog={prog} s={s} yr={yr} onRewards={onRewards} />}
      {tab === 'cmp' && <CompareTab prog={prog} ctx={ctx} yr={yr} onSetMethod={onSetMethod} onOpen={onOpen} />}
      {footer}
    </div>
  );
}

function MilestonesTab({ prog, s, yr, onRewards }) {
  const picked = prog.rewards?.[yr] || {};
  const items = [...MILESTONES.map((m) => ({ ...m, kind: 'ms' })), ...AS_TIERS.slice(1).map((t) => ({ sp: t.sp, kind: 'tier', t }))].sort((a, b) => a.sp - b.sp);
  return (
    <div className="pad" style={{ marginTop: 14 }}>
      <Track conf={s.conf} plan={s.plan} />
      <div className="mslist">
        {items.map((m) => {
          const got = s.conf >= m.sp, plan = !got && s.all >= m.sp;
          const mine = picked[m.sp] || [];
          return (
            <div key={`${m.kind}${m.sp}`} className={`msrow ${got ? 'got' : plan ? 'plan' : ''} ${m.kind}`}>
              <span className="dot" style={m.t ? { '--c': m.t.gem } : null}>{got && <Icon name="check" size={13} stroke={3} />}</span>
              <div>
                <div className="mh num">
                  <b>{m.kind === 'tier' ? `${m.t.name} 등급 (원월드 ${m.t.ow})` : `${man(m.sp)} 마일스톤 · ${m.pick}개 선택`}</b>
                  <span className={got ? 'ok' : ''}>{got ? '달성' : plan ? '예정대로면 달성' : `${fmtNum(m.sp - s.conf)} SP 남음`}</span>
                </div>
                <div className="faint num" style={{ fontSize: 12 }}>{fmtNum(m.sp)} SP{m.kind === 'tier' ? ` · ${yr + 1}년 등급 · 보너스 포인트 +${m.t.bonus}%` : ''}</div>
                {m.kind === 'ms' && (
                  <div className="ropts">
                    {m.options.map(([id, label]) => {
                      const on = mine.includes(id);
                      return (
                        <button
                          key={id}
                          className={`ropt ${on ? 'on' : ''}`}
                          disabled={!got}
                          onClick={() => {
                            const next = on ? mine.filter((x) => x !== id) : [...mine, id].slice(-m.pick);
                            onRewards(yr, m.sp, next);
                          }}
                          aria-pressed={on}
                        >
                          {on && <Icon name="check" size={12} stroke={3} />}{label}
                        </button>
                      );
                    })}
                  </div>
                )}
                {m.kind === 'ms' && got && mine.length < m.pick && <div className="help">받은 보상을 {m.pick}개 골라 기록해 두세요.</div>}
              </div>
            </div>
          );
        })}
      </div>
      <p className="basis" style={{ padding: '12px 4px' }}>마일스톤은 해마다 새로 시작해요. 고른 보상은 기록용이고, 실제 선택은 알래스카 앱에서 해야 해요.</p>
    </div>
  );
}

function CompareTab({ prog, ctx, yr, onSetMethod, onOpen }) {
  const { flights, today } = ctx;
  const c = useMemo(() => compareMethods(prog, flights, yr, today), [prog, flights, yr, today]);
  const [open, setOpen] = useState(false);
  const [ex, setEx] = useState(false);
  const max = Math.max(1, ...c.list.map((m) => m.total));
  const mine = prog.method || 'distance';
  const base = yr === thisYear(today) && prog.spDate && +prog.spDate.slice(0, 4) === yr ? +prog.sp || 0 : 0;
  const rows = c.list[0].rows.map((r, i) => ({ f: r.f, v: c.list.map((m) => m.rows[i]) }));
  const cur = c.list.find((m) => m.id === mine);
  const diff = c.best.total - cur.total;
  return (
    <div className="pad" style={{ marginTop: 14 }}>
      {yr < METHOD_FROM_YEAR && <div className="notice info" style={{ marginBottom: 10 }}>{yr}년 탑승분은 거리 기준으로 고정이에요. 아래는 같은 항공편을 다른 방식으로 계산했을 때의 참고값이에요. {METHOD_FROM_YEAR}년 탭에서 내년 계획을 비교해 보세요.</div>}
      {!c.list[0].rows.length ? (
        <div className="card"><p className="muted" style={{ margin: 0, fontSize: 14 }}>{yr}년에 알래스카로 적립할 항공편이 아직 없어요. 계획 중인 항공편을 추가하면 세 방식을 바로 비교해 드려요.</p></div>
      ) : (
        <>
          <div className="card">
            <div className="card-h"><span>{yr}년 항공편 {rows.length}편 기준</span>{base > 0 && <span className="faint">입력한 {fmtNum(base)} SP 제외</span>}</div>
            <div className="cmp">
              {c.list.map((m) => {
                const t = tierBySP(m.total + base);
                return (
                  <div key={m.id} className={`cmpbar ${m.id === c.best.id ? 'best' : ''}`}>
                    <div className="h num">
                      <b>{m.name}</b>
                      {m.id === c.best.id && <span className="badge good">가장 유리</span>}
                      {m.id === mine && yr >= METHOD_FROM_YEAR && <span className="badge">내 선택</span>}
                      <span className="v">{fmtNum(m.total)} SP</span>
                    </div>
                    <Bar conf={m.conf / max} plan={m.plan / max} thin done={m.id === c.best.id} />
                    <div className="help num">{t.id !== 'MEMBER' ? `${yr + 1}년 ${t.name} 등급` : `${yr + 1}년 등급 없음`}{base ? ' (입력한 SP 포함)' : ''}{m.est ? ` · 추정 ${m.est}편 포함` : ''}</div>
                  </div>
                );
              })}
            </div>
            {yr >= METHOD_FROM_YEAR && (diff > 0 ? (
              <div className="cmp-say">
                <span><b>{c.best.name}</b>이 지금 고른 {cur.name}보다 <b className="num">{fmtNum(diff)} SP</b> 더 쌓여요.</span>
                <button className="btn sm sky" onClick={() => onSetMethod(c.best.id)}>{c.best.name}으로 바꾸기</button>
              </div>
            ) : <div className="cmp-say ok">지금 고른 <b>{cur.name}</b>이 이 계획에서 가장 유리해요.</div>)}
          </div>
          <button className="more-btn" style={{ width: '100%', margin: '10px 0 4px' }} onClick={() => setOpen((v) => !v)}>{open ? '편별 비교 접기' : '편별로 어디서 차이 나는지 보기'} <Icon name="chev" size={14} /></button>
          {open && (
            <div className="cmptable num">
              <div className="th"><span>항공편</span>{c.list.map((m) => <span key={m.id}>{m.short}</span>)}</div>
              {rows.map(({ f, v }) => {
                const hi = Math.max(...v.map((x) => x.sp));
                const cat = asCategory(f);
                return (
                  <button key={f.id} className="tr" onClick={() => onOpen(f.id)}>
                    <span className="fl"><b>{f.from}→{f.to}</b><small>{f.airline}{f.flightNo} · {f.award ? '마일 항공권' : CAT[cat.cat]?.name}</small></span>
                    {v.map((x, i) => <span key={i} className={x.sp === hi && hi > 0 ? 'hi' : ''}>{fmtNum(x.sp)}{x.est ? <sup>*</sup> : null}</span>)}
                  </button>
                );
              })}
              <p className="help" style={{ margin: '6px 2px 0' }}>* 운임(USD)·사용 포인트를 안 넣어 추정한 값</p>
            </div>
          )}
        </>
      )}
      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-h"><span>방식별 계산법</span></div>
        <div className="mlist">
          {METHODS.map((m) => <div key={m.id}><b>{m.name}</b><span>{m.desc}</span></div>)}
          <div><b>달러 기준 · 타사 운항편</b><span>구간 거리 × 할인 이코노미 25% · 이코노미 50% · 프리미엄 이코노미 100% · 비즈니스·퍼스트 250%</span></div>
        </div>
        <button className="link" style={{ fontSize: 13, marginTop: 8 }} onClick={() => setEx((v) => !v)}>{ex ? '예시 접기' : '정리표 예시로 보기'}</button>
        {ex && (
          <div className="cmptable num" style={{ marginTop: 8 }}>
            <div className="th"><span>예시</span><span>거리</span><span>달러</span><span>구간</span></div>
            {EXAMPLES.map((e) => (
              <div key={e.label} className="tr">
                <span className="fl"><b>{e.label}</b><small>{e.f.usd ? `$${e.f.usd} · ` : ''}{fmtNum(e.f.baseMiles)}마일</small></span>
                {['distance', 'dollar', 'segment'].map((m) => <span key={m}>{fmtNum(spFor(e.f, m).sp)}</span>)}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="basis" style={{ padding: '12px 4px' }}>적립 방식은 1년에 한 번 바꿀 수 있고 소급되지 않아요. 여기서 바꾸면 {METHOD_FROM_YEAR}년 이후 항공편의 적립 예정이 그 방식으로 바뀌어요. 알래스카 계정에서도 같은 방식으로 골라 주세요.</p>
    </div>
  );
}

/* ───────── 등급 현황 탭 맨 위: 지갑 순서대로 프로그램 고르기 ───────── */
export function ProgSwitch({ list, value, onChange, onEdit }) {
  return (
    <div className="pswitch">
      <div className="pchips" role="tablist" aria-label="등급 프로그램">
        {list.map((w) => {
          const p = PROGRAMS[w.program];
          return (
            <button key={w.program} role="tab" aria-selected={value === w.program} className={value === w.program ? 'on' : ''} onClick={() => onChange(w.program)}>
              <AirlineMark code={p.airline} size="xs" />{p.short}
            </button>
          );
        })}
      </div>
      {onEdit && <button className="link" onClick={onEdit}>수정</button>}
    </div>
  );
}

/* ───────── 내 항공편 맨 위 띠 (알래스카) ───────── */
export function AsStrip({ prog, ctx, onClick }) {
  const s = asSummary(prog, ctx.flights, ctx.today);
  const target = s.next ? s.next.sp : 1;
  return (
    <button className="strip as" onClick={onClick} aria-label="알래스카 티어 보기">
      <div>
        <div className="t"><AirlineMark code="AS" size="xs" />알래스카 {s.held.name}{s.next ? (s.next.sp <= s.held.sp ? ' · 유지' : ` → ${s.next.name}`) : ''}</div>
        <div className="v num">{s.next ? `${fmtNum(s.rem)} SP 남음` : '달성했어요'}</div>
      </div>
      <div className="num" style={{ fontWeight: 800, fontSize: 18 }}>{s.next ? Math.floor((s.conf / target) * 100) : 100}%</div>
      <Bar conf={Math.min(1, s.conf / target)} plan={Math.min(1, s.all / target) - Math.min(1, s.conf / target)} thin />
    </button>
  );
}
