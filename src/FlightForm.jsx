import { useMemo, useState } from 'react';
import { AIRLINES, AIRLINE, CREDIT, CABINS, CABIN, cabinFromClass } from './skypass.js';
import { findAirport } from './airports.js';
import { baseMilesFor, defaultCredit, keClassRate, earnedMiles, flightPoints, fmtNum, fmtWon, uid, SOURCE_LABEL, gcMiles } from './core.js';
import { aiFill } from './ai.js';
import { lookupFlight, LOOKUP_SOURCE } from './lookup.js';
import { AIRCRAFT_GROUPS, normAircraft, isKnownAircraft } from './aircraft.js';
import { Icon, RateSlider, AirportInput, WonInput, NumInput, Seg, AirlineMark, DateInput } from './ui.jsx';

const blank = (o = {}) => ({
  key: uid(), id: null, airline: 'KE', flightNo: '', date: '', dep: '', arr: '', arrOffset: 0, from: '', to: '', cls: '',
  cabin: 'Y', rate: 100, baseMiles: null, baseSource: null, baseTouched: false, milesOverride: null, credit: 'KE', creditTouched: false,
  price: null, note: '', aircraft: '', reg: '', showBase: false, showOverride: false, ...o,
});

// 자동 계산: 구간 마일, 실적 구분, 적립률
function auto(s, changed) {
  const n = { ...s };
  const code = (n.airline || '').toUpperCase();
  if (changed.includes('airline') && !n.creditTouched) n.credit = defaultCredit(code);
  if ((changed.includes('airline') || changed.includes('from') || changed.includes('to')) && !n.baseTouched) {
    const b = baseMilesFor(code, n.from, n.to);
    if (b.miles != null) {
      n.baseMiles = b.miles;
      n.baseSource = b.source;
    } else if (n.baseSource !== 'ai') {
      n.baseMiles = null;
      n.baseSource = null;
    }
  }
  if ((changed.includes('cls') || changed.includes('from') || changed.includes('to') || changed.includes('airline')) && code === 'KE' && n.cls) {
    const r = keClassRate(n.cls, n.from, n.to);
    if (r != null) n.rate = r;
    if (changed.includes('cls')) n.cabin = cabinFromClass(n.cls) || n.cabin;
  }
  return n;
}

function fromFlight(f) {
  return blank({ ...f, cabin: f.cabin || (f.airline === 'KE' && f.cls ? cabinFromClass(f.cls) : 'Y'), key: f.id, showBase: f.baseSource === 'manual', showOverride: f.milesOverride != null, baseTouched: f.baseSource === 'manual' || f.baseSource === 'ai', creditTouched: f.credit !== defaultCredit(f.airline) });
}

export default function FlightForm({ initial, today, aiOk, myFlights = [], onSave, onCancel, onDeleteTrip }) {
  const editing = !!initial;
  const [kind, setKind] = useState(initial?.trip?.kind || (initial?.flights?.length > 1 ? 'multi' : 'oneway'));
  const [segs, setSegs] = useState(() => (initial?.flights?.length ? initial.flights.map(fromFlight) : [blank()]));
  const [priceMode, setPriceMode] = useState(initial?.trip?.priceMode || 'each');
  const [tripPrice, setTripPrice] = useState(initial?.trip?.price ?? null);
  const [aiText, setAiText] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [aiMsg, setAiMsg] = useState(null);
  const [tried, setTried] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const setSeg = (i, patch) =>
    setSegs((arr) => {
      const keys = Object.keys(patch);
      let next = arr.map((s, k) => (k === i ? auto({ ...s, ...patch, mirror: i === 1 && keys.some((x) => ['from', 'to', 'airline'].includes(x)) ? false : s.mirror }, keys) : s));
      // 왕복: 가는 편을 고치면 오는 편을 반대로 맞춰 줌 (오는 편을 직접 고치기 전까지)
      if (kind === 'round' && i === 0 && next[1]?.mirror) {
        const a = next[0], b = next[1];
        next = [a, auto({ ...b, airline: a.airline, from: a.to, to: a.from, cls: a.cls || b.cls, rate: a.rate, credit: a.credit, creditTouched: a.creditTouched, date: b.date || a.date }, ['airline', 'from', 'to', 'cls'])];
      }
      return next;
    });

  const changeKind = (k) => {
    setKind(k);
    setSegs((arr) => {
      if (k === 'oneway') return arr.slice(0, 1);
      if (arr.length >= 2) return k === 'round' ? arr.slice(0, 2) : arr;
      const a = arr[0];
      const back = auto(blank({ airline: a.airline, from: a.to, to: a.from, date: a.date, cls: a.cls, rate: a.rate, credit: a.credit, creditTouched: a.creditTouched, mirror: true }), ['airline', 'from', 'to', 'cls']);
      return [a, back];
    });
    if (k !== 'oneway' && priceMode === 'each' && !editing) setPriceMode('total');
    if (k === 'oneway') setPriceMode('each');
  };

  const flightsOut = useMemo(
    () => segs.map((s) => ({
      id: s.id || s.key, airline: (s.airline || '').toUpperCase(), flightNo: s.flightNo.trim(), date: s.date, dep: s.dep, arr: s.arr, arrOffset: +s.arrOffset || 0,
      from: s.from, to: s.to, cls: (s.cls || '').toUpperCase(), cabin: s.cabin || 'Y', rate: s.rate == null ? 100 : +s.rate, baseMiles: s.baseMiles == null ? 0 : +s.baseMiles,
      baseSource: s.baseSource || 'manual', milesOverride: s.showOverride && s.milesOverride != null ? +s.milesOverride : null, credit: s.credit,
      price: priceMode === 'each' ? s.price : null, note: s.note || '',
      aircraft: normAircraft(s.aircraft), reg: String(s.reg || '').trim().toUpperCase(),
    })),
    [segs, priceMode],
  );
  const totalMiles = flightsOut.reduce((a, f) => a + earnedMiles(f), 0);
  const totalPts = flightsOut.reduce((a, f) => a + flightPoints(f), 0);
  const totalCost = priceMode === 'total' ? tripPrice : flightsOut.every((f) => f.price == null) ? null : flightsOut.reduce((a, f) => a + (+f.price || 0), 0);
  const errs = segs.map((s) => ({ from: !s.from, to: !s.to, date: !s.date, airline: !s.airline }));
  const valid = errs.every((e) => !e.from && !e.to && !e.date && !e.airline);

  const runAI = async () => {
    setAiBusy(true);
    setAiMsg(null);
    try {
      const cur = segs.map((s) => ({ airline: s.airline, flightNo: s.flightNo, date: s.date, from: s.from, to: s.to, bookingClass: s.cls, earnRate: s.rate }));
      const r = await aiFill({ text: aiText.trim(), segments: aiText.trim() ? [] : cur, today });
      const list = Array.isArray(r?.segments) ? r.segments : [];
      if (!list.length) throw new Error('채울 수 있는 구간을 찾지 못했어요. 편명·날짜·구간을 조금 더 적어 주세요.');
      const next = list.map((x, i) => {
        const prev = aiText.trim() ? null : segs[i];
        const code = String(x.airline || prev?.airline || 'KE').toUpperCase();
        let s = blank({
          ...(prev || {}),
          key: prev?.key || uid(),
          id: prev?.id || null,
          airline: code,
          flightNo: String(x.flightNo ?? prev?.flightNo ?? '').replace(/^[A-Z0-9]{2}\s*/i, (m) => (m.trim().toUpperCase() === code ? '' : m)),
          date: x.date || prev?.date || '',
          from: String(x.from || prev?.from || '').toUpperCase(),
          to: String(x.to || prev?.to || '').toUpperCase(),
          dep: x.dep || prev?.dep || '',
          arr: x.arr || prev?.arr || '',
          arrOffset: x.arrOffset ?? prev?.arrOffset ?? 0,
          cls: String(x.bookingClass || prev?.cls || '').toUpperCase().slice(0, 1),
          credit: ['KE', 'ST', 'OT', 'NONE'].includes(x.credit) ? x.credit : defaultCredit(code),
          creditTouched: ['KE', 'ST', 'OT', 'NONE'].includes(x.credit) && x.credit !== defaultCredit(code),
          note: x.note || prev?.note || '',
          aircraft: normAircraft(x.aircraft || prev?.aircraft || ''),
        });
        const b = baseMilesFor(code, s.from, s.to);
        if (b.miles != null) s = { ...s, baseMiles: b.miles, baseSource: b.source, baseTouched: false };
        else if (x.distanceMiles) s = { ...s, baseMiles: Math.round(x.distanceMiles), baseSource: 'ai', baseTouched: true };
        s.cabin = (code === 'KE' && s.cls ? cabinFromClass(s.cls) : null) || (['Y', 'W', 'C', 'F'].includes(x.cabin) ? x.cabin : prev?.cabin || 'Y');
        const kr = code === 'KE' && s.cls ? keClassRate(s.cls, s.from, s.to) : null;
        s.rate = kr ?? (x.earnRate != null ? +x.earnRate : prev?.rate ?? 100);
        return s;
      });
      setSegs(next);
      const k = r.tripType === 'round' && next.length === 2 ? 'round' : next.length > 1 ? 'multi' : 'oneway';
      setKind(k);
      if (r.totalPrice) {
        if (next.length > 1) {
          setPriceMode('total');
          setTripPrice(Math.round(r.totalPrice));
        } else setSegs((arr) => arr.map((s, i) => (i === 0 ? { ...s, price: Math.round(r.totalPrice) } : s)));
      } else if (next.length > 1 && !editing) setPriceMode('total');
      const unknown = next.filter((s) => s.from && !findAirport(s.from) || s.to && !findAirport(s.to)).length;
      setAiMsg({ ok: true, text: [r.notes, r.currencyNote, unknown ? '목록에 없는 공항은 구간 마일을 AI 추정값으로 넣었어요.' : null].filter(Boolean).join(' ') || `${next.length}개 구간을 채웠어요. 값을 확인하고 저장하세요.` });
    } catch (e) {
      setAiMsg({ ok: false, text: e.message || 'AI 요청에 실패했어요.' });
    } finally {
      setAiBusy(false);
    }
  };

  const save = () => {
    setTried(true);
    if (!valid) return;
    const tripId = initial?.trip?.id || initial?.flights?.[0]?.tripId || uid();
    const trip = { id: tripId, kind, priceMode: segs.length > 1 ? priceMode : 'each', price: segs.length > 1 && priceMode === 'total' ? tripPrice : null };
    onSave({ trip, flights: flightsOut.map((f) => ({ ...f, tripId })), removedIds: (initial?.flights || []).map((f) => f.id).filter((id) => !flightsOut.some((f) => f.id === id)) });
  };

  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)', color: 'var(--navy-btn-ink)' }}><Icon name="plane" size={16} /></span>
        <div><div className="k">스카이패스 기준 자동 계산</div><h2>{editing ? '여정 편집' : '항공편 추가'}</h2></div>
        <button className="icon-btn" onClick={onCancel} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>
      <div className="form">
        <Seg options={[['oneway', '편도'], ['round', '왕복'], ['multi', '다구간']]} value={kind} onChange={changeKind} />

        <div className="ai-box">
          <div className="t"><Icon name="spark" size={18} fill />AI로 자동 채우기</div>
          <div className="s">예약 확인 메일이나 일정을 붙여 넣으면 편명·구간·예약 등급·적립 마일을 채워요. 비워 두고 누르면 아래 빈 칸만 채워요.</div>
          <textarea className="input" rows={3} value={aiText} onChange={(e) => setAiText(e.target.value)} placeholder={'예) 1/4 KE41 인천→시애틀 Q클래스\n1/5 DL2949 시애틀→라스베이거스\n1/11 KE12 LA→인천  총 1,680,000원'} />
          <button className="btn primary" onClick={runAI} disabled={aiBusy || !aiOk}>
            {aiBusy ? <><span className="spin" />채우는 중…</> : <><Icon name="spark" size={16} fill />{aiText.trim() ? '일정으로 채우기' : '빈 칸 채우기'}</>}
          </button>
          {!aiOk && <div className="ai-note">이 환경에서는 AI를 쓸 수 없어요. 구간 마일은 대한항공 구간표·대권거리로 자동 계산돼요.</div>}
          {aiMsg && <div className={`ai-note ${aiMsg.ok ? '' : 'err'}`}>{aiMsg.text}</div>}
        </div>

        {segs.map((s, i) => (
          <SegCard
            key={s.key}
            s={s}
            i={i}
            n={segs.length}
            err={tried ? errs[i] : {}}
            showPrice={priceMode === 'each'}
            myFlights={myFlights}
            onChange={(p) => setSeg(i, p)}
            onRemove={kind === 'multi' && segs.length > 2 ? () => setSegs((a) => a.filter((_, k) => k !== i)) : null}
          />
        ))}
        {kind === 'multi' && (
          <button className="btn ghost" onClick={() => setSegs((a) => {
            const last = a[a.length - 1];
            return [...a, auto(blank({ airline: last.airline, from: last.to, date: last.date, credit: last.credit, creditTouched: last.creditTouched }), ['airline', 'from'])];
          })}><Icon name="plus" size={17} />구간 추가</button>
        )}

        {segs.length > 1 && (
          <div className="segcard">
            <div className="sh">운임</div>
            <Seg small light options={[['total', '총액 한 번에'], ['each', '구간별로']]} value={priceMode} onChange={setPriceMode} />
            {priceMode === 'total' ? (
              <label className="field"><span>{kind === 'round' ? '왕복' : '다구간'} 항공권 총액</span><WonInput value={tripPrice} onChange={setTripPrice} /></label>
            ) : null}
            <p className="help" style={{ margin: 0 }}>총액은 각 구간의 적립 마일 비율로 나눠 구간별 단가를 보여줘요.</p>
          </div>
        )}
      </div>
      {editing && (
        <div style={{ padding: '0 16px 16px' }}>
          {confirmDel ? <button className="btn danger block" onClick={onDeleteTrip}>이 여정의 {segs.length}개 구간을 모두 삭제</button> : <button className="btn danger block" onClick={() => setConfirmDel(true)}><Icon name="trash" size={17} />여정 삭제</button>}
        </div>
      )}
      <div className="sumbar">
        <div className="line num">
          <span>적립 <b>{fmtNum(totalMiles)}마일</b>{totalPts ? ` · +${totalPts}P` : ''}</span>
          <span>{totalCost ? <>{fmtWon(totalCost)} · <b>{totalMiles ? fmtWon(totalCost / totalMiles) : '–'}</b>/마일</> : '운임 미입력'}</span>
        </div>
        {tried && !valid && <div className="err-t">출발·도착 공항과 날짜를 모든 구간에 넣어 주세요.</div>}
        <button className="btn primary block" onClick={save}>{editing ? '저장' : `${segs.length}개 구간 추가`}</button>
      </div>
    </div>
  );
}

function SegCard({ s, i, n, err, showPrice, myFlights, onChange, onRemove }) {
  const known = AIRLINE[s.airline];
  const [custom, setCustom] = useState(!known && !!s.airline);
  const [lk, setLk] = useState(null); // { busy } | { ok, text, source, legs }

  // 편명으로는 출발·도착 공항만 채우고, 시각은 직접 입력
  const applyLeg = (leg, source) => {
    onChange({ from: leg.from, to: leg.to });
    const name = (c) => findAirport(c)?.city || c;
    const unknown = [leg.from, leg.to].filter((c) => !findAirport(c));
    setLk({ ok: true, source, text: `${name(leg.from)} → ${name(leg.to)} 채웠어요.${source === 'ai' ? ' AI 추정이라 맞는지 확인해 주세요.' : ''}${unknown.length ? ` ${unknown.join('·')}은 공항 목록에 없어 구간 마일을 직접 넣어야 해요.` : ''}` });
  };
  const lookup = async () => {
    if (!s.airline || !s.flightNo) return setLk({ ok: false, text: '항공사와 편명을 먼저 넣어 주세요.' });
    setLk({ busy: true });
    try {
      const r = await lookupFlight({ airline: s.airline, flightNo: s.flightNo, date: s.date }, myFlights);
      const legs = r.legs || [];
      if (!legs.length) return setLk({ ok: false, text: `${s.airline}${s.flightNo} 운항 정보를 찾지 못했어요. 출발·도착을 직접 골라 주세요.` });
      const pick = legs.length === 1 ? legs[0] : legs.find((l) => s.from && l.from === s.from) || null;
      if (pick) return applyLeg(pick, r.source);
      setLk({ ok: true, source: r.source, legs, text: '여러 구간을 운항하는 편명이에요. 탄 구간을 골라 주세요.' });
    } catch (e) {
      setLk({ ok: false, text: e.message || '조회에 실패했어요.' });
    }
  };
  const e = earnedMiles({ ...s, milesOverride: s.showOverride ? s.milesOverride : null });
  const p = flightPoints({ ...s });
  const cabin = s.cls && s.airline === 'KE' ? CABIN[cabinFromClass(s.cls)]?.name : null;
  const keRate = s.airline === 'KE' && s.cls ? keClassRate(s.cls, s.from, s.to) : null;
  const gc = s.from && s.to ? gcMiles(s.from, s.to) : null;
  return (
    <div className="segcard">
      <div className="sh">
        <AirlineMark code={s.airline} size="sm" />
        {n > 1 ? `${i + 1}구간` : '항공편'}
        {s.from && s.to && <span className="faint" style={{ fontWeight: 600 }}>{s.from} → {s.to}</span>}
        {onRemove && <button className="icon-btn x" style={{ width: 32, height: 32 }} onClick={onRemove} aria-label="구간 삭제"><Icon name="close" size={15} /></button>}
      </div>
      <div className="row2" style={{ gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)' }}>
        <label className="field">
          <span>항공사</span>
          {custom ? (
            <input className="input" value={s.airline} maxLength={2} placeholder="코드 2자리" onChange={(ev) => onChange({ airline: ev.target.value.toUpperCase() })} onBlur={() => !s.airline && setCustom(false)} />
          ) : (
            <select className="input" value={s.airline} onChange={(ev) => (ev.target.value === '__' ? (setCustom(true), onChange({ airline: '' })) : onChange({ airline: ev.target.value }))}>
              {AIRLINES.map((a) => <option key={a.code} value={a.code}>{a.code} · {a.name}</option>)}
              <option value="__">직접 입력…</option>
            </select>
          )}
        </label>
        <label className="field">
          <span>편명</span>
          <div className="inbtn">
            <input className="input num" value={s.flightNo} inputMode="numeric" placeholder="예: 41" onChange={(ev) => { onChange({ flightNo: ev.target.value.replace(/\s/g, '') }); if (lk && !lk.busy) setLk(null); }} onBlur={() => s.flightNo && !s.from && !s.to && !lk && lookup()} onKeyDown={(ev) => ev.key === 'Enter' && (ev.preventDefault(), lookup())} />
            <button type="button" className="in-btn" onMouseDown={(ev) => ev.preventDefault()} onClick={lookup} disabled={lk?.busy} aria-label="편명으로 출발·도착 찾기" title="편명으로 출발·도착 찾기">
              {lk?.busy ? <span className="spin" style={{ width: 15, height: 15 }} /> : <Icon name="search" size={17} />}
            </button>
          </div>
        </label>
      </div>
      {lk && !lk.busy && (
        <div className={`lookup ${lk.ok ? '' : 'err'}`}>
          {lk.source && <span className={`src ${lk.source === 'live' ? 'ke' : lk.source === 'ai' ? 'ai' : ''}`}>{LOOKUP_SOURCE[lk.source]}</span>}
          <span>{lk.text}</span>
          {lk.legs && (
            <div className="legs">
              {lk.legs.map((l) => (
                <button key={l.from + l.to} type="button" className="chip-btn num" onClick={() => applyLeg(l, lk.source)}>
                  {l.from} → {l.to}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="route">
        <AirportInput label="출발" value={s.from} onChange={(v) => onChange({ from: v })} />
        <button type="button" className="swap" onClick={() => onChange({ from: s.to, to: s.from })} aria-label="출발·도착 바꾸기"><Icon name="swap" size={18} /></button>
        <AirportInput label="도착" value={s.to} onChange={(v) => onChange({ to: v })} />
      </div>
      {(err.from || err.to) && <div className="err-t">출발·도착 공항을 골라 주세요.</div>}
      <div className="row2" style={{ gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)' }}>
        <label className="field">
          <span>날짜</span>
          <DateInput value={s.date} onChange={(v) => onChange({ date: v })} invalid={err.date} />
        </label>
        <label className="field">
          <span>예약 등급 <span className="faint">(선택)</span></span>
          <input className="input" value={s.cls} maxLength={1} placeholder="예: Q" style={{ textTransform: 'uppercase', fontWeight: 700 }} onChange={(ev) => onChange({ cls: ev.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase() })} />
        </label>
      </div>
      {err.date && <div className="err-t">날짜를 넣어 주세요.</div>}
      <div className="field">
        <span>좌석 등급</span>
        <Seg small light options={CABINS.map((c) => [c.id, c.name])} value={s.cabin || 'Y'} onChange={(v) => onChange(s.cls ? { cabin: v } : { cabin: v, rate: CABIN[v].rate })} />
      </div>
      <div className="row3" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
        <label className="field"><span>출발 시각</span><DateInput type="time" value={s.dep} onChange={(v) => onChange({ dep: v })} /></label>
        <label className="field"><span>도착 시각</span><DateInput type="time" value={s.arr} onChange={(v) => onChange({ arr: v })} /></label>
        <label className="field"><span>도착일</span>
          <select className="input" value={s.arrOffset} onChange={(ev) => onChange({ arrOffset: +ev.target.value })}>
            <option value={-1}>−1일</option><option value={0}>당일</option><option value={1}>+1일</option><option value={2}>+2일</option>
          </select>
        </label>
      </div>
      <div className="row2" style={{ gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)' }}>
        <label className="field">
          <span>기종 <span className="faint">(선택)</span></span>
          <AircraftSelect value={s.aircraft || ''} onChange={(v) => onChange({ aircraft: v })} />
        </label>
        <label className="field">
          <span>기체 번호 <span className="faint">(선택)</span></span>
          <input className="input num" value={s.reg || ''} placeholder="예: HL8082" autoCapitalize="characters" onChange={(ev) => onChange({ reg: ev.target.value.toUpperCase().replace(/\s/g, '') })} />
        </label>
      </div>
      <div className="field">
        <span>실적 구분</span>
        <Seg small light options={Object.entries(CREDIT).map(([k, v]) => [k, v.short])} value={s.credit} onChange={(v) => onChange({ credit: v, creditTouched: true })} />
      </div>
      {s.airline === 'KE' && s.cls && (
        <div className="help" style={{ marginTop: -4 }}>{keRate == null ? `${s.cls} 클래스는 대한항공 적립률 표에 없어요. 적립률을 직접 골라 주세요.` : `${s.cls} 클래스${cabin ? ` · ${cabin}` : ''} → 적립률 ${keRate}%${keRate === 0 ? ' (적립 불가)' : ''} 자동 적용`}</div>
      )}
      {s.credit !== 'KE' && s.credit !== 'NONE' && <div className="help" style={{ marginTop: -4 }}>{CREDIT[s.credit].desc}. 제휴 항공사 적립률은 항공사·예약 등급마다 달라요.</div>}
      <RateSlider value={s.rate} onChange={(v) => onChange({ rate: v })} />
      <div className="miles-out num">
        <div>
          <div className="lab" style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            구간 {s.baseMiles != null ? fmtNum(s.baseMiles) : '–'} × {s.rate ?? 100}%
            {s.baseSource && <span className={`src ${s.baseSource}`}>{SOURCE_LABEL[s.baseSource]}</span>}
          </div>
          <b>{fmtNum(e)}<small style={{ fontSize: 13, marginLeft: 3 }}>마일</small></b>{p > 0 && <span className="faint" style={{ marginLeft: 8, fontWeight: 700 }}>+{p}P</span>}
        </div>
        <div style={{ display: 'grid', gap: 4, justifyItems: 'end' }}>
          <button className="link" style={{ fontSize: 12 }} onClick={() => onChange({ showBase: !s.showBase })}>구간 마일 수정</button>
          <button className="link" style={{ fontSize: 12 }} onClick={() => onChange({ showOverride: !s.showOverride, milesOverride: s.showOverride ? null : e })}>{s.showOverride ? '자동 계산으로' : '적립 마일 직접'}</button>
        </div>
      </div>
      {s.showBase && (
        <label className="field">
          <span>구간 마일 (편도, 100% 기준){gc != null && s.baseSource !== 'gc' ? <span className="faint"> · 대권거리 {fmtNum(gc)}</span> : null}</span>
          <NumInput value={s.baseMiles} suffix="마일" onChange={(v) => onChange({ baseMiles: v, baseSource: 'manual', baseTouched: true })} />
        </label>
      )}
      {s.showOverride && (
        <label className="field"><span>실제 적립 마일 (대한항공 적립 내역 기준)</span><NumInput value={s.milesOverride} suffix="마일" onChange={(v) => onChange({ milesOverride: v })} /></label>
      )}
      {showPrice && <label className="field"><span>운임</span><WonInput value={s.price} onChange={(v) => onChange({ price: v })} /></label>}
    </div>
  );
}

// 기종 고르기: 목록에서 선택, 없으면 '직접 입력'
function AircraftSelect({ value, onChange }) {
  const [custom, setCustom] = useState(() => !!value && !isKnownAircraft(value));
  if (custom) {
    return (
      <div className="inbtn">
        <input className="input" value={value} placeholder="기종 직접 입력" autoFocus={!value} onChange={(ev) => onChange(ev.target.value)} onBlur={() => value && onChange(normAircraft(value))} />
        <button type="button" className="in-btn" onMouseDown={(ev) => ev.preventDefault()} onClick={() => { const n = normAircraft(value); onChange(isKnownAircraft(n) ? n : ''); setCustom(false); }} aria-label="목록에서 고르기" title="목록에서 고르기">
          <Icon name="list" size={17} />
        </button>
      </div>
    );
  }
  return (
    <select className="input" value={value} onChange={(ev) => (ev.target.value === '__' ? (setCustom(true), onChange('')) : onChange(ev.target.value))}>
      <option value="">선택 안 함</option>
      {AIRCRAFT_GROUPS.map(([g, list]) => (
        <optgroup key={g} label={g}>
          {list.map(([n]) => <option key={n} value={n}>{n}</option>)}
        </optgroup>
      ))}
      <option value="__">직접 입력…</option>
    </select>
  );
}
