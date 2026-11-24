// 알래스카 항공 Atmos 리워드 (원월드) 상태포인트 계산
// 기준: 비플 '알래스카(원월드) 마일런 상세요강' (2026년 기준, 참고용)
// - 등급은 달력 연도(1/1~12/31) 상태포인트(SP)로 판정, 최소 탑승 조건 없음
// - 적립 방식은 1년에 한 번 고르고, 지금 고르면 2027년 1월 1일 출발편부터 적용 (소급 없음)
// - 2026년 탑승분은 거리 기준(1마일 = 1SP)으로 계산
import { AIRLINE } from './skypass.js';

export const AS_PROGRAM = 'AS';
export const METHOD_FROM_YEAR = 2027;

export const AS_TIERS = [
  { id: 'MEMBER', name: '멤버', ow: '', sp: 0, bonus: 0, bg: 'linear-gradient(135deg,#0d5c8c 0%,#01426a 60%,#012c47 100%)', ink: '#ffffff', gem: null },
  { id: 'SILVER', name: '실버', ow: '루비', sp: 20000, bonus: 25, bg: 'linear-gradient(135deg,#eef0f3 0%,#d3d7dd 55%,#b9bec6 100%)', ink: '#14253a', gem: '#b3123a' },
  { id: 'GOLD', name: '골드', ow: '사파이어', sp: 40000, bonus: 50, bg: 'linear-gradient(135deg,#ecd9a8 0%,#d2b26c 55%,#b8924a 100%)', ink: '#2b1d07', gem: '#1f4fb3' },
  { id: 'PLAT', name: '플래티넘', ow: '에메랄드', sp: 80000, bonus: 100, bg: 'linear-gradient(135deg,#5e6b7a 0%,#3f4a57 55%,#2a323c 100%)', ink: '#ffffff', gem: '#13a36b' },
  { id: 'TITAN', name: '티타늄', ow: '에메랄드', sp: 135000, bonus: 150, bg: 'linear-gradient(135deg,#2c2e33 0%,#18191c 55%,#0b0b0d 100%)', ink: '#ffffff', gem: '#13a36b' },
];
export const AS_TIER = Object.fromEntries(AS_TIERS.map((t) => [t.id, t]));

export const METHODS = [
  { id: 'distance', name: '거리 기준', short: '거리', desc: '1마일 = 1SP · 좌석 등급과 상관없이 같아요 · 마일 항공권도 거리만큼', good: '원월드 (할인) 이코노미 장거리를 자주 탈 때' },
  { id: 'dollar', name: '달러 기준', short: '달러', desc: '알래스카·하와이안은 $1 = 5SP, 타사는 좌석 등급별 적립률 · 마일 항공권은 20포인트당 1SP', good: '비즈니스를 많이 탈 때' },
  { id: 'segment', name: '구간 기준', short: '구간', desc: '편명마다 500SP · 마일 항공권도 500SP', good: '단거리를 자주 탈 때' },
];
export const METHOD = Object.fromEntries(METHODS.map((m) => [m.id, m]));

// 마일스톤 보상 (고르는 개수)
export const MILESTONES = [
  { sp: 10000, pick: 1, options: [['b750', '보너스 포인트 750점'], ['food', '사전 주문 무료 음식'], ['silverTrial', '실버 체험판 (2주)'], ['wifi1', '무료 와이파이 1매']] },
  { sp: 30000, pick: 1, options: [['b2500', '보너스 포인트 2,500점'], ['d25', '항공권 $25 할인'], ['goldTrial', '골드 체험판 (2주)'], ['wifi4', '무료 와이파이 4매']] },
  { sp: 55000, pick: 2, options: [['b5000', '보너스 포인트 5,000점'], ['giftSilver', '실버 체험판 선물'], ['lounge', '알래스카 라운지 1회'], ['upg2', '무료 업그레이드 2회']] },
];

// 달러 기준일 때 타사 운항편 적립률 (구간 거리 × 적립률)
export const CATS = [
  { id: 'DY', name: '할인 이코노미', rate: 25 },
  { id: 'Y', name: '이코노미', rate: 50 },
  { id: 'W', name: '프리미엄 이코노미', rate: 100 },
  { id: 'C', name: '비즈니스', rate: 250 },
  { id: 'F', name: '퍼스트', rate: 250 },
  { id: 'X', name: '적립 불가 클래스', rate: 0 },
];
export const CAT = Object.fromEntries(CATS.map((c) => [c.id, c]));

// 제휴사 예약 클래스 (정리표 별첨1)
export const PARTNER_CLASS = {
  CX: { DY: 'BHKLMV', Y: 'Y', W: 'ERW', C: 'JCDIP' },
  QR: { DY: 'BGHKLMNOQSTVW', Y: 'Y', C: 'JCDIRP' },
  AY: { DY: 'KMLVSNQOZAG', Y: 'YBH', W: 'WETP', C: 'JCDIR' },
  JL: { DY: 'NQLVSOGHKM', Y: 'YB', W: 'WER', C: 'JCDIX' },
  MH: { DY: 'KLMNSV', Y: 'HBY', C: 'JCDFAZ' },
  QF: { DY: 'GKLMNOQSV', Y: 'HBY', W: 'RTW', C: 'JCDI' },
};
// 알래스카·하와이안 자사편 (운임을 모를 때 추정용)
const OWN_RATE = { Y: 150, B: 150, H: 125, K: 125, M: 100, L: 100, V: 100, S: 100, N: 100, Q: 100, O: 100, G: 100, F: 200, J: 200 };
export const isOwn = (airline) => airline === 'AS' || airline === 'HA';
export const isOneworld = (airline) => AIRLINE[String(airline || '').toUpperCase()]?.alliance === 'OW';

const year = (d) => +String(d || '').slice(0, 4);
export const methodFor = (prog, date) => (year(date) >= METHOD_FROM_YEAR ? prog?.method || 'distance' : 'distance');

// 좌석 구분 (달러 기준 타사 적립률용): 직접 고른 값 > 예약 클래스 표 > 좌석 등급
export function asCategory(f) {
  if (f.asCat && CAT[f.asCat]) return { cat: f.asCat, how: 'manual' };
  const c = String(f.cls || '').toUpperCase();
  const t = PARTNER_CLASS[f.airline];
  if (t && c) {
    for (const k of ['C', 'W', 'Y', 'DY']) if (t[k]?.includes(c)) return { cat: k, how: 'table' };
    return { cat: 'X', how: 'table' };
  }
  const cab = f.cabin || 'Y';
  if (cab === 'F') return { cat: 'F', how: 'cabin' };
  if (cab === 'C') return { cat: 'C', how: 'cabin' };
  if (cab === 'W') return { cat: 'W', how: 'cabin' };
  return { cat: 'DY', how: 'guess' };
}

// 한 편의 상태포인트 (방식 지정)
// 반환: { sp, est, why }  est = 추정값(운임·포인트 미입력 등)
export function spFor(f, method) {
  const dist = Math.max(0, Math.round(+f.baseMiles || 0));
  if (method === 'segment') return { sp: 500, est: false, why: '편명당 500' };
  if (method === 'distance') return { sp: dist, est: !dist, why: `${dist.toLocaleString('ko-KR')}마일 × 1` };
  // 달러 기준
  if (f.award) {
    const pts = +f.awardPts || 0;
    if (pts > 0) return { sp: Math.floor(pts / 20), est: false, why: `사용 ${pts.toLocaleString('ko-KR')}포인트 ÷ 20` };
    return { sp: 0, est: true, why: '사용 포인트를 넣으면 계산돼요' };
  }
  if (isOwn(f.airline)) {
    const usd = +f.usd || 0;
    if (usd > 0) return { sp: Math.round(usd * 5), est: false, why: `$${usd.toLocaleString('ko-KR')} × 5` };
    const c = String(f.cls || '').toUpperCase();
    const r = OWN_RATE[c] ?? (f.cabin === 'C' || f.cabin === 'F' ? 150 : 100);
    return { sp: Math.floor((dist * r) / 100), est: true, why: `운임(USD)을 넣으면 정확해요 · 지금은 ${dist.toLocaleString('ko-KR')}마일 × ${r}%로 추정` };
  }
  const { cat, how } = asCategory(f);
  const r = CAT[cat].rate;
  return { sp: Math.floor((dist * r) / 100), est: how === 'guess', why: `${dist.toLocaleString('ko-KR')}마일 × ${r}% (${CAT[cat].name})` };
}

export const flightSP = (f, prog) => spFor(f, methodFor(prog, f.date));
export const isAS = (f) => f.program === AS_PROGRAM;

// 연도 집계: 입력한 SP(입력한 날까지)가 있으면 그 날 이전 항공편은 중복으로 보고 뺌
export function asYear(prog, flights, yr, today, method) {
  const inBase = prog?.spDate && year(prog.spDate) === yr && +prog.sp > 0;
  const base = inBase ? +prog.sp : 0;
  const rows = [];
  let conf = base, plan = 0, est = 0;
  for (const f of flights) {
    if (!isAS(f) || year(f.date) !== yr) continue;
    if (inBase && f.date <= prog.spDate) continue;
    const r = method ? spFor(f, method) : flightSP(f, prog);
    const past = f.date < today;
    if (past) conf += r.sp;
    else plan += r.sp;
    if (r.est) est++;
    rows.push({ f, ...r, past });
  }
  rows.sort((a, b) => a.f.date.localeCompare(b.f.date));
  return { year: yr, base, conf, plan, all: conf + plan, rows, est };
}

export const tierBySP = (sp) => [...AS_TIERS].reverse().find((t) => sp >= t.sp) || AS_TIERS[0];
export const nextTier = (sp) => AS_TIERS.find((t) => t.sp > sp) || null;

// 진행 상황 요약 (카드·띠용)
export function asSummary(prog, flights, today, yr = year(today)) {
  const y = asYear(prog, flights, yr, today);
  const held = AS_TIER[prog?.tier] || AS_TIERS[0];
  // 지금 등급에 못 미치면 목표는 '지금 등급 유지', 넘었으면 그 위 등급
  const nt = y.conf < held.sp ? held : nextTier(y.conf);
  const ms = MILESTONES.find((m) => m.sp > y.conf) || null;
  return {
    ...y,
    held,
    earned: tierBySP(y.conf),
    earnedPlan: tierBySP(y.all),
    next: nt,
    // 지금 등급 이하 목표면 '유지', 위면 승급
    goal: nt ? (nt.sp <= held.sp ? `${nt.name} 유지` : nt.name) : '',
    rem: nt ? nt.sp - y.conf : 0,
    remPlan: nt ? Math.max(0, nt.sp - y.all) : 0,
    nextMs: ms,
    method: methodFor(prog, `${yr}-01-01`),
    deadline: `${yr}-12-31`,
  };
}

// 세 방식 비교 (항공편만, 입력한 SP는 방식과 상관없이 같으니 제외)
export function compareMethods(prog, flights, yr, today) {
  const out = METHODS.map((m) => {
    const y = asYear({ ...prog, sp: 0 }, flights, yr, today, m.id);
    return { ...m, total: y.all, conf: y.conf, plan: y.plan, est: y.est, rows: y.rows };
  });
  const best = out.reduce((a, b) => (b.total > a.total ? b : a), out[0]);
  return { list: out, best };
}

// 정리표 4번 예시로 계산이 맞는지 확인할 때 쓰는 샘플
export const EXAMPLES = [
  { label: '알래스카 이코노미', f: { airline: 'AS', baseMiles: 15250, usd: 340, cls: 'Q', cabin: 'Y' }, expect: { distance: 15250, dollar: 1700, segment: 500 } },
  { label: '핀에어 이코노미 (할인)', f: { airline: 'AY', baseMiles: 1200, cls: 'K', cabin: 'Y' }, expect: { distance: 1200, dollar: 300, segment: 500 } },
  { label: '카타르 비즈니스', f: { airline: 'QR', baseMiles: 14500, cls: 'J', cabin: 'C' }, expect: { distance: 14500, dollar: 36250, segment: 500 } },
];
