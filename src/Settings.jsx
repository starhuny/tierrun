import { useState } from 'react';
import { TIERS, DEFAULT_RULES } from './skypass.js';
import { todayISO, mergeRules, fmtNum, BASE_KEYS } from './core.js';
import { Icon, NumInput, DateInput } from './ui.jsx';

const twoYearsEnd = (start) => {
  if (!start) return '';
  const [y, m] = start.split('-').map(Number);
  const d = new Date(y + 2, m, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const emptyProfile = (name = '') => ({
  name, tier: 'MC', periodStart: '', periodEnd: '', baseDate: '',
  base: { preKE: null, preOZ: null, perKE: null, perST: null, perOT: null, perPts: null, lifeKE: null, lifeST: null, lifeOT: null, lifePts: null, lifeOZ: null }, rules: {},
});



export default function Settings({ profile, user, mode, note, isSetup, hasFlights, onSave, onClose, onSample, onFlighty, onExport, onImport, onReset, onSignOut }) {
  const [p, setP] = useState(() => ({ ...emptyProfile(user?.name || ''), ...(profile || {}), base: { ...emptyProfile().base, ...(profile?.base || {}) } }));
  const [rules, setRules] = useState(() => mergeRules(profile?.rules));
  const [imp, setImp] = useState('');
  const [msg, setMsg] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [editEnd, setEditEnd] = useState(false);
  const set = (patch) => setP((x) => ({ ...x, ...patch }));
  const setB = (k, v) => setP((x) => ({ ...x, base: { ...x.base, [k]: v } }));
  const setR = (g, k, v) => setRules((r) => ({ ...r, [g]: { ...r[g], [k]: v ?? 0 } }));
  const periodic = p.tier === 'MC' || p.tier === 'MCS';
  // 등급 시작일이 아직 안 왔으면 지금까지 탄 건 전부 시작일 이전 실적(①)
  const startsLater = periodic && !!p.periodStart && p.periodStart > todayISO();

  const save = () => {
    const diff = {};
    for (const g of Object.keys(DEFAULT_RULES)) {
      for (const k of Object.keys(DEFAULT_RULES[g])) if (rules[g][k] !== DEFAULT_RULES[g][k]) (diff[g] ||= {})[k] = rules[g][k];
    }
    // 숫자를 넣었으면 오늘까지의 실적으로 보고, 오늘 이전 항공편은 중복 계산하지 않음
    const keys = BASE_KEYS[p.tier] || [];
    const base = { ...p.base };
    if ((p.tier === 'MC' || p.tier === 'MCS') && base.preKE == null) base.preKE = 0;
    if (startsLater) {
      // 시작일 전에 입력한 ② 숫자는 ①로 옮김 (대한항공·스카이팀만 평생 누적에 해당)
      base.preKE = (+base.preKE || 0) + (+base.perKE || 0) + (+base.perST || 0);
      base.perKE = base.perST = base.perOT = base.perPts = 0;
    }
    const pick = (b) => JSON.stringify(keys.map((k) => +b?.[k] || 0));
    const hasNums = keys.some((k) => +base[k] > 0);
    const changed = pick(base) !== pick(profile?.base) || p.tier !== profile?.tier;
    const baseDate = !hasNums ? '' : changed || !profile?.baseDate ? todayISO() : profile.baseDate;
    const periodEnd = p.periodEnd || twoYearsEnd(p.periodStart);
    onSave({ ...p, base, baseDate, periodEnd, rules: diff, sample: false });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(onExport());
      setMsg('데이터를 복사했어요. 메모장 등에 붙여 넣어 보관하세요.');
    } catch {
      setMsg('복사가 막혀 있어요. 아래 칸의 내용을 직접 복사해 주세요.');
      setImp(onExport());
    }
  };

  const z = (keys) => keys.every((k) => !(+p.base[k] > 0));
  const startTxt = p.periodStart ? `(${p.periodStart.replaceAll('-', '.')})` : '';
  const zeroNote =
    p.tier === 'SKYPASS' && z(BASE_KEYS.SKYPASS)
      ? '지금은 실적이 0이에요. 앱에 추가한 항공편만 계산되니, 스카이패스 가입 후 탄 대한항공·제휴 항공편을 처음부터 빠짐없이 추가해 주세요.'
      : periodic && !startsLater && z(['perKE', 'perST', 'perOT', 'perPts'])
        ? `지금은 ②가 0이에요. 앱에 추가한 항공편만 계산되니, 등급 시작일${startTxt} 이후 탄 항공편을 처음부터 빠짐없이 추가해 주세요.${z(['preKE', 'preOZ']) ? ' ①도 0이면 프리미엄·밀리언 마일러 진행률은 시작일 이전 항공편까지 추가해야 맞아요.' : ''}`
        : periodic && z(['preKE', 'preOZ'])
          ? '①이 0이에요. 모닝캄 프리미엄·밀리언 마일러 진행률을 맞추려면 등급 시작일 이전 항공편도 추가하거나 ①에 누적 마일을 넣어 주세요.'
          : p.tier === 'MCP' && z(['lifeKE'])
            ? '평생 누적이 0이에요. 지금까지 탄 항공편을 처음부터 추가하거나 평생 누적 마일을 넣어 주세요.'
            : null;

  const num = (k, label, suffix = '마일') => (
    <label className="field" key={k}><span>{label}</span><NumInput value={p.base[k]} suffix={suffix} placeholder="0" onChange={(v) => setB(k, v)} /></label>
  );

  return (
    <div className="fade-in">
      <div className="dhead">
        <span className="mark" style={{ background: 'var(--navy-btn)', color: 'var(--navy-btn-ink)' }}><Icon name="user" size={16} /></span>
        <div><div className="k">{isSetup ? '처음 한 번만 입력해요' : '내 정보'}</div><h2>{isSetup ? '내 등급 설정' : '설정'}</h2></div>
        {!isSetup && <button className="icon-btn" onClick={onClose} aria-label="닫기"><Icon name="close" size={18} /></button>}
      </div>
      <div className="form">
        {isSetup && (
          <div className="card" style={{ background: 'var(--sky-soft)', border: 0 }}>
            <p style={{ margin: 0, fontSize: 14 }}>현재 등급과 등급 시작일만 넣으면 시작할 수 있어요. 실적 숫자는 대한항공 홈페이지 <b>마이페이지 › 마일리지 현황</b>에서 옮겨 적거나, <b>0으로 비워 두고 지난 항공편을 앱에서 하나씩 추가</b>해도 돼요. 0으로 두면 앱에 추가한 항공편만 계산되니, 그때는 <b>등급 시작일 이후 탄 항공편을 처음부터 빠짐없이</b> 넣어 주세요.</p>
          </div>
        )}
        <label className="field"><span>이름</span><input className="input" value={p.name} placeholder="표시할 이름" onChange={(e) => set({ name: e.target.value })} /></label>

        <div className="field">
          <span>현재 등급</span>
          <div className="tierpick">
            {TIERS.map((t) => (
              <button key={t.id} type="button" className={p.tier === t.id ? 'on' : ''} style={{ background: t.bg, color: t.ink }} onClick={() => set({ tier: t.id })} aria-pressed={p.tier === t.id}>{t.name}</button>
            ))}
          </div>
        </div>

        {periodic && (
          <div className="segcard">
            <div className="sh">등급 시작일</div>
            <label className="field">
              <span>{p.tier === 'MC' ? '모닝캄' : '모닝캄 셀렉트'}이 된 날</span>
              <DateInput value={p.periodStart} onChange={(v) => set({ periodStart: v, periodEnd: editEnd ? p.periodEnd : twoYearsEnd(v) })} />
            </label>
            {editEnd ? (
              <label className="field"><span>자격 종료일</span><DateInput value={p.periodEnd} onChange={(v) => set({ periodEnd: v })} /></label>
            ) : (
              <p className="help" style={{ margin: 0 }}>
                {p.periodStart ? <>자격은 <b>{(p.periodEnd || twoYearsEnd(p.periodStart)).replaceAll('-', '.')}</b>까지예요 (시작일로부터 2년 뒤 달 말일). </> : '시작일을 넣으면 종료일은 2년 뒤 달 말일로 자동 계산돼요. '}
                <button type="button" className="link" onClick={() => setEditEnd(true)}>종료일 직접 수정</button>
              </p>
            )}
            <p className="help" style={{ margin: 0 }}>{p.tier === 'MC' ? '이 기간 안의 실적으로 모닝캄 유지와 모닝캄 셀렉트 승급을 계산해요.' : '이 기간 안의 실적으로 셀렉트 유지를 계산해요.'}</p>
          </div>
        )}

        <div className="segcard">
          <div className="sh">지금까지 탄 실적</div>
          <p className="help" style={{ margin: 0 }}>모르면 <b>0으로 비워 두고</b>, 지난 항공편을 앱에서 ‘항공편 추가’로 넣어도 똑같이 계산돼요. 숫자를 넣으면 오늘 이전 날짜의 항공편은 그 숫자에 들어 있는 걸로 보고 중복 계산하지 않아요.</p>
          {zeroNote && <div className="notice">{zeroNote}</div>}
          {p.tier === 'SKYPASS' && (
            <>
              <div className="lab">스카이패스 가입 후 지금까지</div>
              <div className="row2">{num('lifeKE', '대한항공 탑승 마일')}{num('lifePts', '탑승 횟수 포인트', 'P')}</div>
              <div className="row2">{num('lifeST', '스카이팀 탑승 마일')}{num('lifeOT', '기타 제휴 항공사 마일')}</div>
            </>
          )}
          {periodic && (
            <>
              {startsLater && <div className="notice">등급 시작일({p.periodStart.replaceAll('-', '.')})이 아직 오지 않았어요. 지금까지 탄 마일은 모두 시작일 이전 실적이라 <b>①에만</b> 넣어 주세요. 모닝캄 프리미엄·밀리언 마일러에만 반영되고, {p.tier === 'MCS' ? '셀렉트' : '모닝캄'} 실적은 시작일부터 쌓여요.</div>}
              <div className="lab">① {startsLater ? '지금까지 탄 것' : '등급 시작일 이전에 탄 것'} (평생 누적용)</div>
              <div className="row2">{num('preKE', '대한항공 + 스카이팀 탑승 마일')}{num('preOZ', '아시아나 탑승 마일')}</div>
              <p className="help" style={{ margin: 0 }}>아시아나는 아시아나클럽의 <b>탑승 마일만</b> 넣어 주세요 (카드·제휴 적립 제외). 대한항공이 통합 후 아시아나 운항편 탑승 마일도 우수회원 심사에 합산한다고 안내해서 평생 누적에 더해요.</p>
              {!startsLater && (
                <>
                  <div className="lab" style={{ marginTop: 4 }}>② 등급 시작일 이후에 탄 것</div>
                  <div className="row2">{num('perKE', '대한항공 탑승 마일')}{num('perPts', '탑승 횟수 포인트', 'P')}</div>
                  <div className="row2">{num('perST', '스카이팀 탑승 마일')}{num('perOT', '기타 제휴 항공사 마일')}</div>
                </>
              )}
              <p className="help" style={{ margin: 0 }}>①은 모닝캄 프리미엄(평생 50만)·밀리언 마일러 진행률에, ②는 모닝캄 유지·셀렉트 승급에 쓰여요. 모닝캄 유지의 ‘대한항공 편 2만 마일’ 조건은 대한항공 칸만 세요.</p>
            </>
          )}
          {p.tier === 'MCP' && (
            <>
              <div className="row2">{num('lifeKE', '평생 탑승 마일 (대한항공 + 스카이팀)')}{num('lifeOZ', '아시아나 탑승 마일')}</div>
              <p className="help" style={{ margin: 0 }}>아시아나는 아시아나클럽의 탑승 마일만 넣어 주세요. 밀리언 마일러 평생 누적에 더해요.</p>
            </>
          )}
          {p.tier === 'MM' && <p className="help" style={{ margin: 0 }}>밀리언 마일러는 평생 등급이라 추가 목표가 없어요. 항공편 기록과 단가 계산은 그대로 쓸 수 있어요.</p>}
        </div>

        <details className="adv">
          <summary>등급 기준 직접 수정</summary>
          <p className="help">대한항공이 기준을 바꾸면 여기서 숫자만 고치면 돼요. 기본값은 2026년 11월 공지 기준이에요.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="lab">모닝캄 승급 (누적)</div>
            <div className="row3">
              <label className="field"><span>합계</span><NumInput value={rules.mcQualify.total} onChange={(v) => setR('mcQualify', 'total', v)} /></label>
              <label className="field"><span>대한항공 최소</span><NumInput value={rules.mcQualify.keMin} onChange={(v) => setR('mcQualify', 'keMin', v)} /></label>
              <label className="field"><span>또는 포인트</span><NumInput value={rules.mcQualify.points} onChange={(v) => setR('mcQualify', 'points', v)} /></label>
            </div>
            <div className="lab">모닝캄 유지 (2년)</div>
            <div className="row3">
              <label className="field"><span>① 합계</span><NumInput value={rules.mcRetain.total} onChange={(v) => setR('mcRetain', 'total', v)} /></label>
              <label className="field"><span>① 대한항공 최소</span><NumInput value={rules.mcRetain.keMin} onChange={(v) => setR('mcRetain', 'keMin', v)} /></label>
              <label className="field"><span>② 포인트</span><NumInput value={rules.mcRetain.points2} onChange={(v) => setR('mcRetain', 'points2', v)} /></label>
            </div>
            <div className="row2">
              <label className="field"><span>② 합계</span><NumInput value={rules.mcRetain.total2} onChange={(v) => setR('mcRetain', 'total2', v)} /></label>
              <label className="field"><span>③ 포인트만</span><NumInput value={rules.mcRetain.points3} onChange={(v) => setR('mcRetain', 'points3', v)} /></label>
            </div>
            <div className="lab">모닝캄 셀렉트 승급 · 유지</div>
            <div className="row2">
              <label className="field"><span>승급 마일</span><NumInput value={rules.select.miles} onChange={(v) => setR('select', 'miles', v)} /></label>
              <label className="field"><span>승급 포인트</span><NumInput value={rules.select.points} onChange={(v) => setR('select', 'points', v)} /></label>
            </div>
            <div className="row2">
              <label className="field"><span>유지 마일</span><NumInput value={rules.selectRetain.miles} onChange={(v) => setR('selectRetain', 'miles', v)} /></label>
              <label className="field"><span>유지 포인트</span><NumInput value={rules.selectRetain.points} onChange={(v) => setR('selectRetain', 'points', v)} /></label>
            </div>
            <div className="row2">
              <label className="field"><span>프리미엄 (평생)</span><NumInput value={rules.premium.miles} onChange={(v) => setR('premium', 'miles', v)} /></label>
              <label className="field"><span>밀리언 마일러 (평생)</span><NumInput value={rules.million.miles} onChange={(v) => setR('million', 'miles', v)} /></label>
            </div>
            <button className="btn sm ghost" onClick={() => setRules(mergeRules({}))}>기본값으로</button>
          </div>
        </details>

        {!isSetup && (
          <div className="segcard">
            <div className="sh">데이터</div>
            <div className="help" style={{ marginTop: -6 }}>{mode === 'artifact' ? '내 계정에만 저장돼요. 다른 사람은 볼 수 없어요.' : mode === 'firebase' ? `구글 계정(${user?.email || user?.name || ''})에 저장돼요.` : note}</div>
            <div className="row2">
              <button className="btn sm" onClick={copy}><Icon name="copy" size={15} />내보내기(복사)</button>
              {!hasFlights ? <button className="btn sm" onClick={onSample}>예시 데이터</button> : <button className="btn sm" onClick={() => setImp((v) => (v ? '' : ' '))}>가져오기</button>}
            </div>
            {imp !== '' && (
              <>
                <textarea className="input" rows={4} value={imp.trim() ? imp : ''} placeholder="내보낸 데이터를 붙여 넣으세요" onChange={(e) => setImp(e.target.value)} />
                <button className="btn sm sky" onClick={() => { const ok = onImport(imp); setMsg(ok ? '가져왔어요.' : '형식이 맞지 않아요.'); if (ok) setImp(''); }}>붙여 넣은 데이터로 바꾸기</button>
              </>
            )}
            {msg && <div className="ai-note">{msg}</div>}
            {onFlighty && <button className="btn sm sky" onClick={onFlighty}><Icon name="plane" size={15} />Flighty 기록 가져오기 (CSV)</button>}
            {confirmReset ? <button className="btn sm danger" onClick={onReset}>모든 항공편과 설정을 지웁니다</button> : <button className="btn sm danger" onClick={() => setConfirmReset(true)}><Icon name="trash" size={15} />전체 삭제</button>}
            {mode === 'firebase' && <button className="btn sm ghost" onClick={onSignOut}>로그아웃</button>}
          </div>
        )}
        <p className="help" style={{ margin: '4px 2px' }}>대한항공과 관계없는 개인 기록용 도구예요. 구간 마일은 대한항공 ‘구간별 적립 마일리지’ 표(대한항공 운항편)와 대권거리 추정으로 계산하고, 실제 적립·등급 판정은 대한항공 기준을 따릅니다.</p>
      </div>
      <div className="sumbar">
        {isSetup && <button className="btn ghost block" onClick={onSample}>예시 데이터로 먼저 둘러보기</button>}
        <button className="btn primary block" onClick={save}>{isSetup ? '시작하기' : '저장'}</button>
      </div>
    </div>
  );
}
