import { useMemo, useState } from 'react';
import { findAirport } from './airports.js';
import { AIRLINE, CREDIT, TIER, TIERS, CABIN } from './skypass.js';
import {
  fmtDate, fmtDot, fmtNum, fmtWon, fmtWonShort, daysBetween, earnedMiles, flightPoints, flightCost, layover, fmtDuration,
  sortFlights, contributionOf, SOURCE_LABEL, isDomesticKR, tripFlights, cabinOf, baselineDate, BASE_KEYS,
} from './core.js';
import { Icon, AirlineMark, Bar, Ring, Avatar } from './ui.jsx';
import Globe from './Globe.jsx';

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

export function FlightRow({ f, ctx, selected, onClick }) {
  const { today, flights, trips, profile } = ctx;
  const e = earnedMiles(f);
  const p = flightPoints(f);
  const c = flightCost(f, flights, trips);
  const bd = baselineDate(profile);
  const excluded = bd && f.date <= bd;
  return (
    <button className={`frow ${selected ? 'sel' : ''}`} onClick={onClick}>
      <DDay f={f} today={today} />
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
          {f.credit === 'NONE' ? <span className="badge gray">스카이패스 미반영</span> : <span className="chip"><b>+{fmtNum(e)}</b>마일</span>}
          {p > 0 && <span className="chip"><b>+{p}</b>P</span>}
          {c != null && e > 0 && <span className="chip"><b>{fmtWon(c / e)}</b>/마일</span>}
          <CabinBadge f={f} />
          {(f.credit === 'ST' || f.credit === 'OT') && <span className="badge gray">{CREDIT[f.credit].short}</span>}
          {excluded && f.credit !== 'NONE' && <span className="badge gray">입력한 실적에 포함</span>}
        </div>
      </div>
    </button>
  );
}

function Gap({ prev, next }) {
  const l = layover(prev, next);
  if (!l) return null;
  const txt = l.minutes != null ? fmtDuration(l.minutes) : l.days > 0 ? `${l.days}일` : '같은 날';
  return <div className="gap">{city(prev.to)} <span>체류 {txt}</span></div>;
}

export function RowList({ list, ctx, selectedId, onOpen }) {
  const out = [];
  list.forEach((f, i) => {
    const prev = list[i - 1];
    if (prev && prev.tripId && prev.tripId === f.tripId) out.push(<Gap key={`g${f.id}`} prev={prev} next={f} />);
    out.push(<FlightRow key={f.id} f={f} ctx={ctx} selected={selectedId === f.id} onClick={() => onOpen(f.id)} />);
  });
  return <div>{out}</div>;
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

/* ───────── 항공편 목록 ───────── */
export function FlightsView({ ctx, goals, selectedId, onOpen, onAdd, onSample, onTier, head, banner }) {
  const { flights, today } = ctx;
  const [showPast, setShowPast] = useState(false);
  const sorted = useMemo(() => sortFlights(flights), [flights]);
  const upcoming = sorted.filter((f) => f.date >= today);
  const past = sorted.filter((f) => f.date < today).reverse();
  return (
    <>
      {head}
      {banner}
      <TierStrip goals={goals} profile={ctx.profile} onClick={onTier} />
      {!flights.length ? (
        <div className="empty fade-in">
          <svg width="150" height="70" viewBox="0 0 150 70" aria-hidden="true">
            <path d="M12 58 Q75 -10 138 58" fill="none" stroke="var(--sky)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
            <circle cx="12" cy="58" r="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
            <circle cx="138" cy="58" r="5" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2.5" />
            <g transform="translate(66 6) rotate(90 9 9)" fill="var(--ink)"><path d="M18 11.6v-1.5l-6-3.8V2.6a1.1 1.1 0 0 0-2.3 0v3.7l-6 3.8v1.5l6-1.9v3.8l-1.5 1.1v1.2l2.6-.8 2.6.8v-1.2l-1.4-1.1V9.7z" /></g>
          </svg>
          <h2>첫 항공편을 추가해 보세요</h2>
          <p>편명과 구간만 넣으면 스카이패스 적립 마일과 등급 진행률이 바로 계산돼요.</p>
          <button className="btn primary" onClick={onAdd}><Icon name="plus" size={18} />항공편 추가</button>
          <button className="btn ghost sm" onClick={onSample}>예시 데이터로 둘러보기</button>
        </div>
      ) : (
        <>
          <div className="section-h"><span>다가오는 항공편</span><span className="faint num">{upcoming.length}편</span></div>
          {upcoming.length ? <RowList list={upcoming} ctx={ctx} selectedId={selectedId} onOpen={onOpen} /> : <p className="pad muted" style={{ margin: '4px 20px 10px' }}>예정된 항공편이 없어요.</p>}
          {past.length > 0 && (
            <>
              <div className="section-h"><span>지난 항공편</span><span className="faint num">{past.length}편</span></div>
              <RowList list={showPast ? past : past.slice(0, 4)} ctx={ctx} selectedId={selectedId} onOpen={onOpen} />
              {past.length > 4 && <button className="btn sm ghost more" onClick={() => setShowPast((v) => !v)}>{showPast ? '접기' : `지난 항공편 ${past.length - 4}편 더 보기`}</button>}
            </>
          )}
        </>
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
  const cost = flightCost(f, flights, trips);
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

      <div className="pad" style={{ marginTop: 14 }}>
        <div className="card">
          <div className="card-h"><span>스카이패스 적립</span><span className="badge gray">{CREDIT[f.credit]?.label}</span></div>
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
          <div className="card-h"><span>비용</span>{trip?.priceMode === 'total' && <span className="faint">묶음 총액을 마일 비율로 배분</span>}</div>
          {cost == null ? (
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>운임을 넣으면 마일당 단가를 계산해요. <button className="link" onClick={onEdit}>운임 입력</button></p>
          ) : (
            <div className="kv num">
              {trip?.priceMode === 'total' && <div><span className="k">여정 총액 ({sibs.length}구간)</span><span className="v">{fmtWon(trip.price)}</span></div>}
              <div><span className="k">이 구간 운임</span><span className="v">{fmtWon(cost)}</span></div>
              <div><span className="k">마일당 단가</span><span className="v" style={{ fontSize: 18 }}>{e > 0 ? fmtWon(cost / e) : '–'}</span></div>
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

export function TierView({ ctx, goals, stats, head, onSettings }) {
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
export function CostView({ ctx, goals, stats, head, onOpen }) {
  const { today, profile } = ctx;
  const h = goals.headline;
  const mileOpt = h ? h.options.find((o) => o.parts.every((p) => p.unit === 'mi')) : null;
  const priced = stats.groups.filter((g) => g.perMile != null);
  const unpriced = stats.groups.filter((g) => g.perMile == null && g.miles > 0);
  const maxPM = Math.max(1, ...priced.map((g) => g.perMile));
  const bestPM = priced.length ? Math.min(...priced.map((g) => g.perMile)) : null;
  // 월별 적립
  const months = useMemo(() => {
    const m = new Map();
    for (const f of ctx.flights) {
      if (f.credit === 'NONE') continue;
      const k = f.date.slice(0, 7);
      if (!m.has(k)) m.set(k, { c: 0, p: 0 });
      m.get(k)[f.date < today ? 'c' : 'p'] += earnedMiles(f);
    }
    const keys = [...m.keys()].sort();
    if (!keys.length) return [];
    const out = [];
    let [y, mo] = keys[0].split('-').map(Number);
    const [ey, em] = keys[keys.length - 1].split('-').map(Number);
    while ((y < ey || (y === ey && mo <= em)) && out.length < 24) {
      const k = `${y}-${String(mo).padStart(2, '0')}`;
      out.push({ k, mo, ...(m.get(k) || { c: 0, p: 0 }) });
      mo++;
      if (mo > 12) { mo = 1; y++; }
    }
    return out;
  }, [ctx.flights, today]);
  const mmax = Math.max(1, ...months.map((x) => x.c + x.p));
  const tripTitle = (g) => {
    const fl = g.flights;
    const codes = [fl[0].from, ...fl.map((x) => x.to)];
    return codes.map(city).join(' → ');
  };
  return (
    <>
      {head}
      <div className="hero-num num">
        <div className="faint" style={{ fontSize: 13, fontWeight: 700 }}>평균 마일당 단가</div>
        <div className="v">{stats.perMile ? fmtWon(stats.perMile) : '–'}<small>/마일</small></div>
        <div className="s">{stats.counted ? `운임 입력한 ${stats.counted}구간 · 총 ${fmtWon(stats.cost)} · ${fmtNum(stats.miles)}마일` : '항공편에 운임을 넣으면 마일당 단가를 계산해요.'}</div>
      </div>
      {mileOpt && stats.perMile && !h.done && (
        <div className="pad" style={{ marginTop: 10 }}>
          <div className="card" style={{ background: 'var(--sky-soft)', border: 0 }}>
            <div className="card-h" style={{ color: 'var(--sky-ink)' }}>{TIER[h.target].name}까지 예상 비용</div>
            <div className="num" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>약 {fmtWonShort(stats.perMile * mileOpt.remMiPlan)}</div>
            <div className="help num">예정 항공편 이후 남은 {fmtNum(mileOpt.remMiPlan)}마일 × 평균 {fmtWon(stats.perMile)}</div>
          </div>
        </div>
      )}
      {months.length > 0 && (
        <div className="pad" style={{ marginTop: 10 }}>
          <div className="card">
            <div className="card-h"><span>월별 적립 마일</span><span className="legend"><span>확정</span><span className="p">예정</span></span></div>
            <div className="months" role="img" aria-label="월별 적립 마일 막대">
              {months.map((x) => (
                <div className="m" key={x.k} title={`${x.k} · 확정 ${fmtNum(x.c)} · 예정 ${fmtNum(x.p)}`}>
                  {x.p > 0 && <i className="p" style={{ height: `${(x.p / mmax) * 100}%` }} />}
                  {x.c > 0 && <i className="c" style={{ height: `${(x.c / mmax) * 100}%`, borderRadius: x.p > 0 ? 0 : '4px 4px 0 0' }} />}
                </div>
              ))}
            </div>
            <div className="months-x num">{months.map((x, i) => <span key={x.k}>{months.length > 12 && i % 2 ? '' : `${x.mo}월`}</span>)}</div>
          </div>
        </div>
      )}
      <div className="section-h"><span>여정별 단가</span><span className="faint">낮을수록 효율적</span></div>
      {priced.length === 0 && <p className="muted" style={{ margin: '4px 20px' }}>운임이 입력된 여정이 아직 없어요.</p>}
      {priced.map((g) => (
        <button className="trow num" key={g.id} onClick={() => onOpen(g.flights[0].id)}>
          <div>
            <div className="rt">{tripTitle(g)}</div>
            <div className="dt">{fmtDate(g.flights[0].date, { weekday: false })}{g.flights.length > 1 ? ` · ${g.flights.length}구간` : ''} · {g.flights[0].date < today ? '탑승 완료' : '예정'}</div>
          </div>
          <div>
            <div className={`pm ${g.perMile === bestPM && priced.length > 1 ? 'best' : ''}`}>{fmtWon(g.perMile)}</div>
            <div className="sub">{fmtWonShort(g.cost)} · {fmtNum(g.miles)}마일</div>
          </div>
          <Bar conf={g.perMile / maxPM} thin />
        </button>
      ))}
      {unpriced.length > 0 && (
        <>
          <div className="section-h"><span>운임 미입력</span><span className="faint">{unpriced.length}개 여정</span></div>
          {unpriced.map((g) => (
            <button className="trow num" key={g.id} onClick={() => onOpen(g.flights[0].id)}>
              <div><div className="rt">{tripTitle(g)}</div><div className="dt">{fmtDate(g.flights[0].date, { weekday: false })} · {fmtNum(g.miles)}마일</div></div>
              <div className="sub" style={{ alignSelf: 'center' }}>입력하기 <Icon name="chev" size={14} /></div>
            </button>
          ))}
        </>
      )}
      {profile?.sample && <p className="basis">예시 데이터예요. 설정에서 지우고 내 항공편으로 시작할 수 있어요.</p>}
    </>
  );
}

export { Avatar };
