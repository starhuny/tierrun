import { useState } from 'react';
import { TIERS, DEFAULT_RULES } from './skypass.js';
import { todayISO, mergeRules, fmtNum, BASE_KEYS } from './core.js';
import { Icon, NumInput } from './ui.jsx';

const twoYearsEnd = (start) => {
  if (!start) return '';
  const [y, m] = start.split('-').map(Number);
  const d = new Date(y + 2, m, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const emptyProfile = (name = '') => ({
  name, tier: 'MC', periodStart: '', periodEnd: '', baseDate: '',
  base: { preKE: null, perKE: null, perST: null, perOT: null, perPts: null, lifeKE: null, lifeST: null, lifeOT: null, lifePts: null }, rules: {},
});



export default function Settings({ profile, user, mode, note, isSetup, hasFlights, onSave, onClose, onSample, onExport, onImport, onReset, onSignOut }) {
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

  const save = () => {
    const diff = {};
    for (const g of Object.keys(DEFAULT_RULES)) {
      for (const k of Object.keys(DEFAULT_RULES[g])) if (rules[g][k] !== DEFAULT_RULES[g][k]) (diff[g] ||= {})[k] = rules[g][k];
    }
    // 숫자를 넣었으면 오늘까지의 실적으로 보고, 오늘 이전 항공편은 중복 계산하지 않음
    const keys = BASE_KEYS[p.tier] || [];
    const base = { ...p.base };
    if ((p.tier === 'MC' || p.tier === 'MCS') && base.preKE == null) base.preKE = 0;
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
            <p style={{ margin: 0, fontSize: 14 }}>현재 등급과 등급 시작일만 넣으면 시작할 수 있어요. 실적 숫자는 대한항공 홈페이지 <b>마이페이지 › 마일리지 현황</b>에서 옮겨 적거나, <b>0으로 비워 두고 지난 항공편을 앱에서 하나씩 추가</b>해도 돼요.</p>
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
              <input className="input num" type="date" value={p.periodStart} onChange={(e) => set({ periodStart: e.target.value, periodEnd: editEnd ? p.periodEnd : twoYearsEnd(e.target.value) })} />
            </label>
            {editEnd ? (
              <label className="field"><span>자격 종료일</span><input className="input num" type="date" value={p.periodEnd} onChange={(e) => set({ periodEnd: e.target.value })} /></label>
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
          {p.tier === 'SKYPASS' && (
            <>
              <div className="lab">스카이패스 가입 후 지금까지</div>
              <div className="row2">{num('lifeKE', '대한항공 탑승 마일')}{num('lifePts', '탑승 횟수 포인트', 'P')}</div>
              <div className="row2">{num('lifeST', '스카이팀 탑승 마일')}{num('lifeOT', '기타 제휴 항공사 마일')}</div>
            </>
          )}
          {periodic && (
            <>
              <div className="lab">① 등급 시작일 이전에 탄 것 (평생 누적용)</div>
              {num('preKE', '대한항공 + 스카이팀 탑승 마일')}
              <div className="lab" style={{ marginTop: 4 }}>② 등급 시작일 이후에 탄 것</div>
              <div className="row2">{num('perKE', '대한항공 탑승 마일')}{num('perPts', '탑승 횟수 포인트', 'P')}</div>
              <div className="row2">{num('perST', '스카이팀 탑승 마일')}{num('perOT', '기타 제휴 항공사 마일')}</div>
              <p className="help" style={{ margin: 0 }}>①은 모닝캄 프리미엄(평생 50만)·밀리언 마일러 진행률에, ②는 모닝캄 유지·셀렉트 승급에 쓰여요. 모닝캄 유지의 ‘대한항공 편 2만 마일’ 조건은 대한항공 칸만 세요.</p>
            </>
          )}
          {p.tier === 'MCP' && num('lifeKE', '평생 누적 탑승 마일 (대한항공 + 스카이팀)')}
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
