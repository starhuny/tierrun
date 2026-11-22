import { useState } from 'react';
import { TIERS, DEFAULT_RULES } from './skypass.js';
import { todayISO, mergeRules, fmtNum } from './core.js';
import { Icon, NumInput } from './ui.jsx';

const twoYearsEnd = (start) => {
  if (!start) return '';
  const [y, m] = start.split('-').map(Number);
  const d = new Date(y + 2, m, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const emptyProfile = (name = '') => ({
  name, tier: 'MC', periodStart: '', periodEnd: '', baseDate: todayISO(),
  base: { perKE: null, perST: null, perOT: null, perPts: null, lifeKE: null, lifeST: null, lifeOT: null, lifePts: null }, rules: {},
});

export default function Settings({ profile, user, mode, note, isSetup, hasFlights, onSave, onClose, onSample, onExport, onImport, onReset, onSignOut }) {
  const [p, setP] = useState(() => ({ ...emptyProfile(user?.name || ''), ...(profile || {}), base: { ...emptyProfile().base, ...(profile?.base || {}) } }));
  const [rules, setRules] = useState(() => mergeRules(profile?.rules));
  const [imp, setImp] = useState('');
  const [msg, setMsg] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const set = (patch) => setP((x) => ({ ...x, ...patch }));
  const setB = (k, v) => setP((x) => ({ ...x, base: { ...x.base, [k]: v } }));
  const setR = (g, k, v) => setRules((r) => ({ ...r, [g]: { ...r[g], [k]: v ?? 0 } }));
  const periodic = p.tier === 'MC' || p.tier === 'MCS';

  const save = () => {
    const diff = {};
    for (const g of Object.keys(DEFAULT_RULES)) {
      for (const k of Object.keys(DEFAULT_RULES[g])) if (rules[g][k] !== DEFAULT_RULES[g][k]) (diff[g] ||= {})[k] = rules[g][k];
    }
    onSave({ ...p, rules: diff, sample: false });
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
            <p style={{ margin: 0, fontSize: 14 }}>대한항공 홈페이지 <b>마이페이지 › 마일리지 현황 › 등급 현황</b>의 숫자를 그대로 옮겨 적으면, 그 뒤로 추가하는 항공편이 더해져 진행률이 계산돼요.</p>
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
            <div className="sh">자격 유효기간 · 심사 기간</div>
            <div className="row2">
              <label className="field"><span>시작일</span><input className="input num" type="date" value={p.periodStart} onChange={(e) => set({ periodStart: e.target.value, periodEnd: p.periodEnd || twoYearsEnd(e.target.value) })} /></label>
              <label className="field"><span>종료일</span><input className="input num" type="date" value={p.periodEnd} onChange={(e) => set({ periodEnd: e.target.value })} /></label>
            </div>
            <p className="help" style={{ margin: 0 }}>{p.tier === 'MC' ? '모닝캄 셀렉트 승급과 모닝캄 유지를 이 기간 안의 실적으로 계산해요. 등급 현황의 ‘심사 기간’ 날짜와 같아요.' : '셀렉트 유지를 이 기간 안의 실적으로 계산해요.'}</p>
          </div>
        )}

        <div className="segcard">
          <div className="sh">기준 실적</div>
          <label className="field"><span>기준일 — 이 날짜까지의 탑승은 아래 숫자에 이미 들어 있어요</span><input className="input num" type="date" value={p.baseDate} onChange={(e) => set({ baseDate: e.target.value })} /></label>
          {p.tier === 'SKYPASS' && (
            <>
              <p className="help" style={{ margin: 0 }}>가입 후 누적 실적 (모닝캄 승급은 기간 제한이 없어요)</p>
              <div className="row2">{num("lifeKE", "대한항공 탑승 마일")}{num("lifePts", "탑승 횟수 포인트", "P")}</div>
              <div className="row2">{num("lifeST", "스카이팀 탑승 마일")}{num("lifeOT", "기타 제휴 항공사 마일")}</div>
            </>
          )}
          {periodic && (
            <>
              <p className="help" style={{ margin: 0 }}>심사 기간 안의 실적</p>
              <div className="row2">{num("perKE", "대한항공 탑승 마일")}{num("perPts", "탑승 횟수 포인트", "P")}</div>
              <div className="row2">{num("perST", "스카이팀 탑승 마일")}{num("perOT", "기타 제휴 항공사 마일")}</div>
              <p className="help" style={{ margin: 0 }}>홈페이지에 ‘대한항공 + 스카이팀’ 합계만 보이면 대한항공 칸에 합계를 넣어도 돼요. 다만 모닝캄 유지의 ‘대한항공 2만 마일’ 조건은 대한항공 칸으로만 계산돼요.</p>
            </>
          )}
          {p.tier !== 'SKYPASS' && p.tier !== 'MM' && num('lifeKE', '평생 누적 탑승 마일 (대한항공 + 스카이팀)')}
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
