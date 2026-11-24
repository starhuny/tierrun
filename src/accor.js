// 아코르 ALL (호텔) 등급 계산
// - 달력 연도 등급박(Status nights) 또는 등급 포인트(Status points) 중 먼저 닿는 쪽
// - Silver 10박/2,000P · Gold 30박/7,000P · Platinum 60박/14,000P · Diamond 26,000P(포인트로만)
// - 그 해에 딴 등급은 다음 해 12월 31일까지 유지
// - 등급 포인트: 10유로당 25(대부분) · 12.5(ibis·ibis Styles·Mama Shelter) · 10(Mantra·Peppers·BreakFree·Art Series·Adagio) · 5(Adagio Access·Jo&Joe·greet)
// - Accor+ Explorer는 갱신 때 30박, 중국 Accor Plus(중올플)는 가입 때 20박 한 번

export const AC_PROGRAM = 'ALL';
export const DEFAULT_EUR = 1620; // 1유로 = 원 (설정에서 바꿀 수 있음)

export const AC_TIERS = [
  { id: 'CLASSIC', name: '클래식', en: 'Classic', nights: 0, points: 0, bg: 'linear-gradient(135deg,#f1ede6 0%,#ddd5c8 60%,#c9bfae 100%)', ink: '#2a2420' },
  { id: 'SILVER', name: '실버', en: 'Silver', nights: 10, points: 2000, bg: 'linear-gradient(135deg,#eceef1 0%,#cfd3d9 55%,#b3b9c2 100%)', ink: '#1d2530' },
  { id: 'GOLD', name: '골드', en: 'Gold', nights: 30, points: 7000, bg: 'linear-gradient(135deg,#e9d6a6 0%,#cdb070 55%,#ad8c48 100%)', ink: '#2b1d07' },
  { id: 'PLAT', name: '플래티넘', en: 'Platinum', nights: 60, points: 14000, bg: 'linear-gradient(135deg,#6b7079 0%,#4a4f57 55%,#33373e 100%)', ink: '#ffffff' },
  { id: 'DIAMOND', name: '다이아몬드', en: 'Diamond', nights: null, points: 26000, bg: 'linear-gradient(135deg,#2b2b30 0%,#17171a 55%,#060607 100%)', ink: '#ffffff' },
];
export const AC_TIER = Object.fromEntries(AC_TIERS.map((t) => [t.id, t]));

// 브랜드 (10유로당 등급 포인트)
export const BRAND_GROUPS = [
  ['럭셔리·프리미엄', 25, ['Raffles', 'Orient Express', 'Fairmont', 'Sofitel Legend', 'Sofitel', 'Banyan Tree', 'Faena', 'MGallery', 'Pullman', 'Swissôtel', 'Mövenpick', 'Grand Mercure', 'Angsana', 'Emblems', 'Mantis', 'Delano', 'SO/', 'SLS', 'Mondrian', '25hours', 'The Hoxton', 'Hyde', 'Rixos', 'Tribe']],
  ['미드스케일', 25, ['Novotel', 'Mercure', 'Handwritten']],
  ['이비스·마마셸터 (절반)', 12.5, ['ibis', 'ibis Styles', 'Mama Shelter']],
  ['장기 체류 (40%)', 10, ['Mantra', 'Peppers', 'BreakFree', 'Art Series', 'Adagio']],
  ['이코노미 (20%)', 5, ['Adagio Access', 'Jo&Joe', 'greet', 'ibis budget']],
  ['기타', 25, ['기타 아코르 브랜드']],
];
export const BRAND_RATE = Object.fromEntries(BRAND_GROUPS.flatMap(([, r, list]) => list.map((b) => [b, r])));
export const brandRate = (b) => BRAND_RATE[b] ?? 25;

const year = (d) => +String(d || '').slice(0, 4);
const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

export const stayNights = (s) => (s.nightsOverride != null && s.nightsOverride !== '' ? +s.nightsOverride : s.checkIn && s.checkOut ? Math.max(0, days(s.checkIn, s.checkOut)) : 0);
export const stayEur = (s, eur = DEFAULT_EUR) => (+s.krw > 0 ? +s.krw / (+eur || DEFAULT_EUR) : 0);
export function stayPoints(s, eur) {
  if (s.pointsOverride != null && s.pointsOverride !== '') return { pts: Math.round(+s.pointsOverride), est: false };
  const e = stayEur(s, eur);
  return { pts: Math.floor((e * brandRate(s.brand)) / 10), est: true };
}
// 숙박은 체크아웃 날 적립된 걸로 봄
export const stayDate = (s) => s.checkOut || s.checkIn || '';

// 보너스 박 (입력한 날 이후 들어오는 것만 더함 — 그 전 것은 입력한 숫자에 이미 들어 있음)
export function bonusEvents(prog) {
  const out = [];
  if (prog?.explorer && prog.explorerDate) out.push({ date: prog.explorerDate, nights: 30, label: 'Accor+ Explorer 갱신' });
  for (const f of prog?.fast || []) if (f?.date && +f.nights > 0) out.push({ date: f.date, nights: +f.nights, label: f.label || '패스트트랙' });
  return out;
}

// 연도 집계
export function acYear(prog, stays, yr, today, eur) {
  const inBase = prog?.baseDate && year(prog.baseDate) === yr;
  const bn = inBase ? +prog.nights || 0 : 0, bp = inBase ? +prog.points || 0 : 0;
  const r = { year: yr, base: { nights: bn, points: bp }, conf: { nights: bn, points: bp }, plan: { nights: 0, points: 0 }, rows: [], bonus: [], est: 0 };
  const after = (d) => !inBase || d > prog.baseDate;
  for (const s of stays || []) {
    const d = stayDate(s);
    if (year(d) !== yr || !after(d)) continue;
    const n = stayNights(s), p = stayPoints(s, eur);
    const w = d <= today ? 'conf' : 'plan';
    r[w].nights += n;
    r[w].points += p.pts;
    if (p.est) r.est++;
    r.rows.push({ s, nights: n, points: p.pts, est: p.est, past: w === 'conf' });
  }
  for (const b of bonusEvents(prog)) {
    if (year(b.date) !== yr || !after(b.date)) continue;
    const w = b.date <= today ? 'conf' : 'plan';
    r[w].nights += b.nights;
    r.bonus.push({ ...b, past: w === 'conf' });
  }
  r.rows.sort((a, b) => stayDate(a.s).localeCompare(stayDate(b.s)));
  r.all = { nights: r.conf.nights + r.plan.nights, points: r.conf.points + r.plan.points };
  return r;
}

export function tierBy(n, p) {
  let t = AC_TIERS[0];
  for (const x of AC_TIERS) if ((x.nights != null && n >= x.nights) || p >= x.points) t = x;
  return t;
}
const nextAbove = (n, p) => AC_TIERS.find((x) => AC_TIERS.indexOf(x) > AC_TIERS.indexOf(tierBy(n, p))) || null;

export function acSummary(prog, stays, today, yr = year(today), eur) {
  const y = acYear(prog, stays, yr, today, eur);
  const held = AC_TIER[prog?.tier] || AC_TIERS[0];
  const earned = tierBy(y.conf.nights, y.conf.points);
  const earnedPlan = tierBy(y.all.nights, y.all.points);
  // 목표: 지금 등급에 못 미치면 유지, 넘었으면 그 위
  const next = AC_TIERS.indexOf(earned) < AC_TIERS.indexOf(held) ? held : nextAbove(y.conf.nights, y.conf.points);
  const keep = next && next.id === held.id && held.id !== 'CLASSIC';
  const remN = next && next.nights != null ? Math.max(0, next.nights - y.conf.nights) : null;
  const remP = next ? Math.max(0, next.points - y.conf.points) : 0;
  const remNPlan = next && next.nights != null ? Math.max(0, next.nights - y.all.nights) : null;
  const remPPlan = next ? Math.max(0, next.points - y.all.points) : 0;
  // 진행률: 박·포인트 중 더 가까운 쪽
  const pctN = next?.nights ? Math.min(1, y.conf.nights / next.nights) : 0;
  const pctP = next ? Math.min(1, y.conf.points / next.points) : 1;
  const pctNA = next?.nights ? Math.min(1, y.all.nights / next.nights) : 0;
  const pctPA = next ? Math.min(1, y.all.points / next.points) : 1;
  const byNights = next?.nights != null && pctNA >= pctPA;
  return {
    ...y, held, earned, earnedPlan, next, keep,
    goal: next ? (keep ? `${next.name} 유지` : next.name) : '',
    remN, remP, remNPlan, remPPlan,
    conf01: byNights ? pctN : pctP, all01: byNights ? pctNA : pctPA, byNights,
    deadline: `${yr}-12-31`, validUntil: `${yr + 1}-12-31`,
  };
}

// 남은 양 문구: "12박 또는 520P"
export function remText(s, plan = false) {
  if (!s.next) return '최고 등급 달성';
  const n = plan ? s.remNPlan : s.remN, p = plan ? s.remPPlan : s.remP;
  if ((n != null && n === 0) || p === 0) return '달성';
  return n != null ? `${n.toLocaleString('ko-KR')}박 또는 ${p.toLocaleString('ko-KR')}P` : `${p.toLocaleString('ko-KR')}P`;
}

// 보너스 조합 비교 (내년 계획용): 예정 숙박 + 고른 보너스로 어디까지 가는지
export function combos(stayNightsPlanned, stayPointsPlanned, fastNights = 0) {
  const list = [
    { id: 'none', label: '보너스 없이', nights: 0 },
    { id: 'exp', label: 'Accor+ Explorer (+30박)', nights: 30 },
    { id: 'zh', label: '중올플 (+20박)', nights: 20 },
    { id: 'both', label: 'Explorer + 중올플 (+50박)', nights: 50 },
  ];
  return list.map((c) => {
    const n = stayNightsPlanned + c.nights + fastNights;
    const t = tierBy(n, stayPointsPlanned);
    const nx = AC_TIERS.find((x) => AC_TIERS.indexOf(x) > AC_TIERS.indexOf(t) && x.nights != null) || null;
    return { ...c, total: n, tier: t, next: nx, rem: nx ? nx.nights - n : 0 };
  });
}
