import { useMemo, useRef, useState } from 'react';
import { readFlighty, GROUP_LABEL } from './flighty.js';
import { earnedMiles, fmtDate, fmtNum, fmtDot, baselineDate } from './core.js';
import { findAirport } from './airports.js';
import { Icon, AirlineMark } from './ui.jsx';

const STEPS = [
  ['Flighty 앱 열기', <>아래 탭에서 <b>Passport</b>를 누르고, 오른쪽 위 <b>프로필 사진</b>을 눌러요.</>],
  ['설정으로 이동', <>메뉴에서 <b>Settings</b>를 누른 뒤, MANAGE 아래 <b>Account Data</b>로 들어가요.</>],
  ['내보내기 요청', <><b>Export Your Flights</b>를 누르고 이메일을 넣은 다음 <b>Continue</b>를 눌러요. 몇 분 안에 메일이 와요.</>],
  ['CSV 파일 저장', <>메일의 <b>FlightyExport-날짜.csv</b> 첨부파일을 길게 눌러 <b>‘파일’에 저장</b>해요. 컴퓨터라면 그냥 내려받으면 돼요.</>],
  ['여기서 파일 고르기', <>아래 <b>CSV 파일 고르기</b>를 눌러 방금 저장한 파일을 선택해요. 파일은 이 기기 안에서만 읽고 어디에도 올리지 않아요.</>],
  ['확인하고 추가', <>대한항공·스카이팀·아시아나 항공편만 골라서 보여줘요. 넣을 항공편을 확인하고 <b>추가</b>를 누르면 끝이에요.</>],
];

export default function ImportFlighty({ ctx, onImport, onClose }) {
  const { flights, profile } = ctx;
  const fileRef = useRef(null);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const [fname, setFname] = useState('');
  const [picked, setPicked] = useState(() => new Set());
  const [groups, setGroups] = useState({ KE: true, ST: true, OZ: true });
  const bd = baselineDate(profile);

  const onFile = async (file) => {
    if (!file) return;
    setErr('');
    setFname(file.name);
    try {
      const text = await file.text();
      const r = readFlighty(text, flights);
      setRes(r);
      setPicked(new Set(r.rows.filter((x) => !x.dup).map((x) => x.key)));
      if (!r.rows.length) setErr('대한항공·스카이팀·아시아나 항공편이 없어요.');
    } catch (e) {
      setRes(null);
      setErr(e.message || '파일을 읽지 못했어요.');
    }
  };

  const shown = useMemo(() => (res ? res.rows.filter((x) => groups[x.group]) : []), [res, groups]);
  const chosen = shown.filter((x) => picked.has(x.key));
  const totalMi = chosen.reduce((a, x) => a + earnedMiles(x.flight), 0);
  const count = (g) => res?.rows.filter((x) => x.group === g).length || 0;
  const toggle = (k) => setPicked((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const setAll = (on) => setPicked((s) => { const n = new Set(s); shown.forEach((x) => (on ? n.add(x.key) : n.delete(x.key))); return n; });
  const dupCount = shown.filter((x) => x.dup).length;
  const beforeBase = bd ? chosen.filter((x) => x.flight.date <= bd).length : 0;

  // 연도별로 묶어서 보여주기
  const byYear = useMemo(() => {
    const m = new Map();
    for (const x of shown) {
      const y = x.flight.date.slice(0, 4);
      if (!m.has(y)) m.set(y, []);
      m.get(y).push(x);
    }
    return [...m.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [shown]);

  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)' }}><Icon name="plane" size={16} /></span>
        <div>
          <div className="k">항공편 가져오기</div>
          <h2>Flighty에서 가져오기</h2>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>
      </div>

      {!res && (
        <div className="pad" style={{ marginTop: 10 }}>
          <ol className="steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className="n num">{i + 1}</span>
                <div><b>{t}</b><p>{d}</p></div>
              </li>
            ))}
          </ol>
          <div className="notice info" style={{ marginTop: 12 }}>
            가져온 항공편은 <b>적립률 100%</b>로 들어가요. 예약 등급에 따라 적립률이 다르면 항공편을 눌러 <b>편집</b>에서 고쳐 주세요. 운임·예약 등급·메모는 비어 있어요.
          </div>
        </div>
      )}

      <div className="pad" style={{ marginTop: 14 }}>
        <input ref={fileRef} type="file" accept=".csv,text/csv,text/comma-separated-values" hidden onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ''; }} />
        <button className={`btn block ${res ? 'ghost' : 'primary'}`} onClick={() => fileRef.current?.click()}>
          <Icon name="plus" size={17} />{res ? '다른 파일 고르기' : 'CSV 파일 고르기'}
        </button>
        {fname && res && <div className="help" style={{ textAlign: 'center', marginTop: 6 }}>{fname}</div>}
        {err && <div className="notice" style={{ marginTop: 10 }}>{err}</div>}
      </div>

      {res && res.rows.length > 0 && (
        <>
          <div className="pad" style={{ marginTop: 14 }}>
            <div className="card">
              <div className="card-h"><span>전체 {fmtNum(res.total)}편 중 {fmtNum(res.rows.length)}편을 찾았어요</span></div>
              <div className="imp-groups">
                {['KE', 'ST', 'OZ'].map((g) => (
                  <button key={g} className={`imp-g ${groups[g] ? 'on' : ''}`} onClick={() => setGroups((s) => ({ ...s, [g]: !s[g] }))} aria-pressed={groups[g]}>
                    <span className="ck">{groups[g] && <Icon name="check" size={12} stroke={3} />}</span>{GROUP_LABEL[g]} <b className="num">{count(g)}</b>
                  </button>
                ))}
              </div>
              <p className="help" style={{ margin: '10px 0 0' }}>
                그 외 항공사 {fmtNum(res.skipped.other)}편{res.skipped.canceled ? `, 결항 ${res.skipped.canceled}편` : ''}은 뺐어요.
                {dupCount > 0 && ` 이미 앱에 있는 같은 편명·날짜 ${dupCount}편은 체크를 풀어 뒀어요.`}
              </p>
            </div>
            {beforeBase > 0 && (
              <div className="notice" style={{ marginTop: 10 }}>
                설정에 넣은 실적 숫자는 {fmtDot(bd)}까지의 실적이에요. 고른 항공편 중 {beforeBase}편은 그 날짜 이전이라 목록에는 보이지만 실적에 다시 더하지는 않아요.
              </div>
            )}
          </div>

          <div className="section-h">
            <span>가져올 항공편 <span className="num">{chosen.length}</span>/{shown.length}</span>
            <span style={{ display: 'flex', gap: 12 }}>
              <button className="link" onClick={() => setAll(true)}>모두 선택</button>
              <button className="link" onClick={() => setAll(false)}>모두 해제</button>
            </span>
          </div>
          {byYear.map(([y, list]) => (
            <div key={y}>
              <div className="imp-year num">{y}</div>
              {list.map((x) => {
                const f = x.flight;
                const on = picked.has(x.key);
                return (
                  <label key={x.key} className={`imp-row ${on ? 'on' : ''}`}>
                    <input type="checkbox" checked={on} onChange={() => toggle(x.key)} />
                    <span className="ck">{on && <Icon name="check" size={12} stroke={3} />}</span>
                    <AirlineMark code={f.airline} size="sm" />
                    <span className="mid">
                      <span className="t">{findAirport(f.from)?.city || f.from} → {findAirport(f.to)?.city || f.to}</span>
                      <span className="s num">{f.airline} {f.flightNo} · {fmtDate(f.date, { weekday: false })}{x.dup ? ' · 이미 있음' : ''}</span>
                    </span>
                    <span className="mi num">{f.baseMiles != null ? `+${fmtNum(earnedMiles(f))}` : '–'}</span>
                  </label>
                );
              })}
            </div>
          ))}
          <div className="sumbar">
            <div className="line num">
              <span><b>{chosen.length}편</b> · 적립률 100% 기준 <b>{fmtNum(totalMi)}마일</b></span>
            </div>
            <button className="btn primary block" disabled={!chosen.length} onClick={() => onImport(chosen.map((x) => x.flight))}>{chosen.length}편 추가</button>
          </div>
        </>
      )}
    </div>
  );
}
