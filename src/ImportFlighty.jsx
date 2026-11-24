import { useMemo, useRef, useState } from 'react';
import { readFlighty, GROUP_LABEL } from './flighty.js';
import { earnedMiles, fmtDate, fmtNum, fmtDot, baselineDate, BASE_KEYS } from './core.js';
import { TIER } from './skypass.js';
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

const BASE_LABEL = {
  preKE: '① 시작일 이전 · 대한항공+스카이팀', preOZ: '① 시작일 이전 · 아시아나',
  perKE: '② 시작일 이후 · 대한항공', perST: '② 시작일 이후 · 스카이팀', perOT: '② 시작일 이후 · 기타 제휴', perPts: '② 시작일 이후 · 탑승 포인트',
  lifeKE: '대한항공 탑승', lifeST: '스카이팀 탑승', lifeOT: '기타 제휴', lifePts: '탑승 포인트', lifeOZ: '아시아나 탑승',
};

// 설정에 넣어 둔 실적 숫자를 보여주고, CSV와 겹치지 않게 확인하라는 안내
function BaseCheck({ profile, onSettings }) {
  const tier = profile?.tier || 'SKYPASS';
  const keys = BASE_KEYS[tier] || [];
  if (!keys.length) return null;
  const b = profile?.base || {};
  const filled = keys.filter((k) => +b[k] > 0);
  const bd = baselineDate(profile);
  return (
    <div className={`notice ${filled.length ? '' : 'info'}`} style={{ marginTop: 12 }}>
      <b>먼저 설정에 넣은 실적 숫자를 확인해 주세요</b>
      {filled.length ? (
        <>
          <div className="base-list num">
            {filled.map((k) => (
              <div key={k}><span>{BASE_LABEL[k]}</span><b>{fmtNum(+b[k])}{k.endsWith('Pts') ? 'P' : '마일'}</b></div>
            ))}
          </div>
          <p style={{ margin: '6px 0 0' }}>
            이 숫자는 {bd ? `${fmtDot(bd)}까지` : '입력한 날까지'} 탄 실적({TIER[tier].name} 기준)으로 저장돼 있어요. 그래서 <b>{bd ? `${fmtDot(bd)} 이전` : '입력한 날 이전'} 항공편은 CSV로 가져와도 실적에 더하지 않아요</b> (중복 방지).
          </p>
          <p style={{ margin: '6px 0 0' }}>
            CSV의 지난 항공편으로 실적을 처음부터 계산하고 싶다면, 설정에서 실적 숫자를 <b>0으로 바꾼 뒤</b> 가져와 주세요. 이 숫자가 정확하다면 그대로 두고 가져와도 돼요.
          </p>
        </>
      ) : (
        <p style={{ margin: '4px 0 0' }}>지금은 실적 숫자가 모두 0이라, 가져온 항공편이 그대로 실적에 들어가요. 대한항공 홈페이지 실적과 맞는지 가져온 뒤 등급 탭에서 확인해 보세요.</p>
      )}
      {onSettings && <button className="link" style={{ marginTop: 6 }} onClick={onSettings}>설정에서 실적 숫자 확인하기</button>}
    </div>
  );
}

export default function ImportFlighty({ ctx, onImport, onClose, onSettings }) {
  const { flights, profile } = ctx;
  const fileRef = useRef(null);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const [fname, setFname] = useState('');
  const [picked, setPicked] = useState(() => new Set());
  const [groups, setGroups] = useState({ KE: true, ST: true, OZ: true });
  const [fillOld, setFillOld] = useState(true);
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
  const patches = res ? res.rows.filter((x) => x.patch).map((x) => x.patch) : [];

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
          <BaseCheck profile={profile} onSettings={onSettings} />
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
            <BaseCheck profile={profile} onSettings={onSettings} />
            {patches.length > 0 && (
              <label className={`imp-row fill-old ${fillOld ? 'on' : ''}`} style={{ marginTop: 10 }}>
                <input type="checkbox" checked={fillOld} onChange={() => setFillOld((v) => !v)} />
                <span className="ck">{fillOld && <Icon name="check" size={12} stroke={3} />}</span>
                <span className="mid" style={{ gridColumn: '3 / -1' }}>
                  <span className="t">이미 있는 항공편 {patches.length}편에 기종 채우기</span>
                  <span className="s">앱에 있던 항공편은 그대로 두고, 비어 있는 기종·기체 번호만 CSV 값으로 넣어요.</span>
                </span>
              </label>
            )}
            {beforeBase > 0 && (
              <div className="notice" style={{ marginTop: 10 }}>
                고른 항공편 중 <b>{beforeBase}편</b>은 {fmtDot(bd)} 이전이라, 추가해도 목록에만 보이고 실적에는 더하지 않아요.
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
                      <span className="s num">{f.airline} {f.flightNo} · {fmtDate(f.date, { weekday: false })}{f.aircraft ? ` · ${f.aircraft}` : ''}{x.dup ? ' · 이미 있음' : ''}</span>
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
            {beforeBase > 0 && <div className="help" style={{ color: 'var(--warn)', margin: 0 }}>{beforeBase}편은 설정의 실적 숫자와 겹쳐 실적에 더하지 않아요.</div>}
            <button className="btn primary block" disabled={!chosen.length && !(fillOld && patches.length)} onClick={() => onImport(chosen.map((x) => x.flight), fillOld ? patches : [])}>
              {chosen.length ? `${chosen.length}편 추가` : ''}{chosen.length && fillOld && patches.length ? ' · ' : ''}{fillOld && patches.length ? `기종 ${patches.length}편 채우기` : ''}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
