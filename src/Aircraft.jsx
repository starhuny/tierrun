import { useMemo, useState } from 'react';
import { aircraftFamily } from './aircraft.js';
import { fmtDate, fmtNum, sortFlights, earnedMiles } from './core.js';
import { findAirport } from './airports.js';
import { Icon, AirlineMark, Bar, Seg } from './ui.jsx';

const city = (c) => findAirport(c)?.city || c || '?';

function useAircraftStats(flights, today, pastOnly) {
  return useMemo(() => {
    const list = sortFlights(flights).filter((f) => !pastOnly || f.date < today);
    const byType = new Map();
    const missing = [];
    for (const f of list) {
      if (!f.aircraft) { missing.push(f); continue; }
      if (!byType.has(f.aircraft)) byType.set(f.aircraft, { name: f.aircraft, family: aircraftFamily(f.aircraft), flights: [], past: 0, plan: 0, miles: 0, airlines: new Set() });
      const t = byType.get(f.aircraft);
      t.flights.push(f);
      t[f.date < today ? 'past' : 'plan']++;
      t.miles += f.baseMiles || 0;
      t.airlines.add(f.airline);
    }
    const types = [...byType.values()].sort((a, b) => b.flights.length - a.flights.length || a.name.localeCompare(b.name));
    const fams = new Map();
    for (const t of types) {
      if (!fams.has(t.family)) fams.set(t.family, { name: t.family, types: [], count: 0 });
      const g = fams.get(t.family);
      g.types.push(t);
      g.count += t.flights.length;
    }
    return { types, families: [...fams.values()].sort((a, b) => b.count - a.count), missing, total: list.length };
  }, [flights, today, pastOnly]);
}

// 항공편 탭 위 요약 띠
export function AircraftStrip({ flights, today, onClick }) {
  const st = useAircraftStats(flights, today, false);
  const top = st.types[0];
  return (
    <button className="ac-strip" onClick={onClick}>
      <span className="ac-ic"><Icon name="plane" size={18} /></span>
      <span className="ac-txt">
        <b>기종 기록</b>
        <span className="num">
          {st.types.length ? `${st.types.length}개 기종 · 최다 ${top.name} ${top.flights.length}회` : '항공편에 기종을 넣으면 탄 기종이 모여요'}
        </span>
      </span>
      <Icon name="chev" size={16} />
    </button>
  );
}

export function AircraftView({ ctx, onOpen, onClose }) {
  const { flights, today } = ctx;
  const [mode, setMode] = useState('all');
  const [open, setOpen] = useState(null);
  const [showMissing, setShowMissing] = useState(false);
  const st = useAircraftStats(flights, today, mode === 'past');
  const max = Math.max(1, ...st.types.map((t) => t.flights.length));
  const withType = st.total - st.missing.length;
  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)' }}><Icon name="plane" size={16} /></span>
        <div><div className="k">내 항공편</div><h2>기종 기록</h2></div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>

      <div className="pad" style={{ marginTop: 8 }}>
        <Seg small light options={[['all', '전체 (예정 포함)'], ['past', '탑승 완료만']]} value={mode} onChange={setMode} />
      </div>
      <div className="tiles num" style={{ marginTop: 10 }}>
        <div className="tile"><div className="k">탄 기종</div><div className="v">{st.types.length}종</div><div className="s">{st.families.length}개 계열</div></div>
        <div className="tile"><div className="k">기종 기록된 비행</div><div className="v">{withType}편</div><div className="s">전체 {st.total}편 중</div></div>
        {st.types[0] && <div className="tile"><div className="k">가장 많이 탄 기종</div><div className="v">{st.types[0].name}</div><div className="s">{st.types[0].flights.length}회</div></div>}
        {st.missing.length > 0 && <div className="tile"><div className="k">기종 미입력</div><div className="v">{st.missing.length}편</div><div className="s">항공편 편집에서 넣을 수 있어요</div></div>}
      </div>

      {st.types.length === 0 && (
        <p className="muted" style={{ margin: '14px 20px', fontSize: 14 }}>
          아직 기종이 기록된 항공편이 없어요. 항공편 편집의 <b>기종</b> 칸에 넣거나, Flighty CSV를 다시 가져오면서 <b>이미 있는 항공편에 기종 채우기</b>를 켜 보세요.
        </p>
      )}

      {st.families.map((g) => (
        <div key={g.name}>
          <div className="section-h"><span>{g.name}</span><span className="faint num">{g.count}회</span></div>
          <div className="card ac-card">
            {g.types.map((t) => {
              const isOpen = open === t.name;
              const last = [...t.flights].reverse().find((f) => f.date < today);
              return (
                <div key={t.name} className="ac-type">
                  <button className="ac-row" onClick={() => setOpen(isOpen ? null : t.name)} aria-expanded={isOpen}>
                    <span className="ac-name">{t.name}</span>
                    <span className="ac-marks">{[...t.airlines].slice(0, 4).map((a) => <AirlineMark key={a} code={a} size="xs" />)}</span>
                    <span className="ac-cnt num"><b>{t.flights.length}</b>회</span>
                    <span className="ac-bar"><Bar conf={t.past / max} plan={t.plan / max} thin /></span>
                    <span className="ac-sub num">
                      {t.plan ? `탑승 ${t.past} · 예정 ${t.plan}` : `탑승 ${t.past}`} · 총 {fmtNum(t.miles)}마일{last ? ` · 최근 ${fmtDate(last.date, { weekday: false })}` : ''}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="ac-list">
                      {[...t.flights].reverse().map((f) => (
                        <button key={f.id} className="ac-fl num" onClick={() => onOpen(f.id)}>
                          <AirlineMark code={f.airline} size="xs" />
                          <span>{f.airline} {f.flightNo}</span>
                          <span className="r">{city(f.from)} → {city(f.to)}</span>
                          <span className="d">{fmtDate(f.date, { weekday: false })}{f.reg ? ` · ${f.reg}` : ''}{f.date >= today ? ' · 예정' : ''}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {st.missing.length > 0 && (
        <>
          <div className="section-h"><span>기종 미입력</span><button className="link" onClick={() => setShowMissing((v) => !v)}>{showMissing ? '접기' : `${st.missing.length}편 보기`}</button></div>
          {showMissing && (
            <div className="card ac-card" style={{ padding: '6px 0' }}>
              {[...st.missing].reverse().map((f) => (
                <button key={f.id} className="ac-fl num" onClick={() => onOpen(f.id)}>
                  <AirlineMark code={f.airline} size="xs" />
                  <span>{f.airline} {f.flightNo}</span>
                  <span className="r">{city(f.from)} → {city(f.to)}</span>
                  <span className="d">{fmtDate(f.date, { weekday: false })} · +{fmtNum(earnedMiles(f))}마일</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <div style={{ height: 16 }} />
    </div>
  );
}
