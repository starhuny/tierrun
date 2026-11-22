import { geoDistance } from 'd3-geo';
import { findAirport } from './airports.js';
import { KE_ROUTE_MILES, KE_CLASS_RATES, AIRLINE, DEFAULT_RULES, cabinFromClass } from './skypass.js';

/* ───────── 날짜·숫자 ───────── */
export const pad = (n) => String(n).padStart(2, '0');
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayISO = () => toISO(new Date());
export const parseISO = (s) => {
  const [y, m, d] = String(s).split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};
export const addDays = (s, n) => {
  const d = parseISO(s);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
export const daysBetween = (a, b) => Math.round((parseISO(b) - parseISO(a)) / 86400000);
const WD = ['일', '월', '화', '수', '목', '금', '토'];
export function fmtDate(s, { year = 'auto', weekday = true } = {}) {
  if (!s) return '';
  const d = parseISO(s);
  const showYear = year === true || (year === 'auto' && d.getFullYear() !== new Date().getFullYear());
  return `${showYear ? d.getFullYear() + '년 ' : ''}${d.getMonth() + 1}월 ${d.getDate()}일${weekday ? ` (${WD[d.getDay()]})` : ''}`;
}
export const fmtDot = (s) => (s ? s.replaceAll('-', '.') : '');
export const fmtNum = (n) => (n == null || Number.isNaN(n) ? '–' : Math.round(n).toLocaleString('ko-KR'));
export const fmtWon = (n) => (n == null || Number.isNaN(n) ? '–' : '₩' + Math.round(n).toLocaleString('ko-KR'));
export function fmtWonShort(n) {
  if (n == null || Number.isNaN(n)) return '–';
  if (n >= 1e8) return `${(n / 1e8).toFixed(n >= 1e9 ? 0 : 1).replace(/\.0$/, '')}억원`;
  if (n >= 1e4) return `${Math.round(n / 1e4).toLocaleString('ko-KR')}만원`;
  return `${Math.round(n).toLocaleString('ko-KR')}원`;
}
export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

/* ───────── 거리·마일 ───────── */
const EARTH_MI = 3958.8;
export function gcMiles(from, to) {
  const a = findAirport(from), b = findAirport(to);
  if (!a || !b) return null;
  return Math.round(geoDistance([a.lon, a.lat], [b.lon, b.lat]) * EARTH_MI);
}
export const isDomesticKR = (from, to) => findAirport(from)?.country === 'KR' && findAirport(to)?.country === 'KR';

// 구간 마일: 대한항공 운항 + 공식 표에 있으면 표, 아니면 대권거리
export function baseMilesFor(airline, from, to) {
  if (!from || !to) return { miles: null, source: null };
  const key = `${from}-${to}`;
  if (airline === 'KE' && KE_ROUTE_MILES.has(key)) return { miles: KE_ROUTE_MILES.get(key), source: 'ke' };
  if (KE_ROUTE_MILES.has(key) && airline !== 'KE') {
    // 타사 운항편은 대권거리 기준이 원칙이지만 같은 구간이면 참고값으로 표 사용
    const gc = gcMiles(from, to);
    return { miles: gc ?? KE_ROUTE_MILES.get(key), source: 'gc' };
  }
  const gc = gcMiles(from, to);
  return { miles: gc, source: gc != null ? 'gc' : null };
}
export const SOURCE_LABEL = { ke: '대한항공 공식 구간 마일', gc: '대권거리 추정', ai: 'AI 추정', manual: '직접 입력' };

export function keClassRate(cls, from, to) {
  if (!cls) return null;
  const t = isDomesticKR(from, to) ? KE_CLASS_RATES.dom : KE_CLASS_RATES.intl;
  const r = t[String(cls).toUpperCase()];
  return r == null ? null : r;
}

export const cabinOf = (f) => f.cabin || (f.airline === 'KE' && f.cls ? cabinFromClass(f.cls) : null) || 'Y';

export const defaultCredit = (airline) => AIRLINE[String(airline || '').toUpperCase()]?.credit || 'NONE';

export function earnedMiles(f) {
  if (f.milesOverride != null && f.milesOverride !== '') return Math.max(0, Math.round(+f.milesOverride));
  if (f.credit === 'NONE') return 0;
  const base = +f.baseMiles || 0;
  const rate = f.rate == null ? 100 : +f.rate;
  return Math.floor((base * rate) / 100);
}
export function flightPoints(f) {
  if (f.credit !== 'KE') return 0;
  if (earnedMiles(f) <= 0) return 0;
  return isDomesticKR(f.from, f.to) ? 1 : 2;
}
export const isPast = (f, today) => f.date < today;

/* ───────── 여정·비용 ───────── */
export function sortFlights(list) {
  return [...list].sort((a, b) => (a.date + (a.dep || '99')).localeCompare(b.date + (b.dep || '99')));
}
export function tripFlights(flights, tripId) {
  return sortFlights(flights.filter((f) => f.tripId === tripId));
}
// 항공편별 비용: 묶음 총액이면 적립 마일 비율로 배분
export function flightCost(f, flights, trips) {
  const trip = f.tripId && trips[f.tripId];
  if (trip && trip.priceMode === 'total') {
    if (trip.price == null || trip.price === '') return null;
    const group = flights.filter((x) => x.tripId === f.tripId);
    const sum = group.reduce((s, x) => s + earnedMiles(x), 0);
    const share = sum > 0 ? earnedMiles(f) / sum : 1 / group.length;
    return +trip.price * share;
  }
  return f.price == null || f.price === '' ? null : +f.price;
}
export function costStats(flights, trips) {
  let cost = 0, miles = 0, counted = 0;
  const byTrip = new Map();
  for (const f of flights) {
    const c = flightCost(f, flights, trips);
    const key = f.tripId || f.id;
    if (!byTrip.has(key)) byTrip.set(key, { id: key, trip: trips[f.tripId] || null, flights: [], cost: 0, miles: 0, priced: true });
    const g = byTrip.get(key);
    g.flights.push(f);
    g.miles += earnedMiles(f);
    if (c == null) g.priced = false;
    else g.cost += c;
    if (c != null && f.credit !== 'NONE') {
      cost += c;
      miles += earnedMiles(f);
      counted++;
    }
  }
  const groups = [...byTrip.values()].map((g) => ({
    ...g,
    flights: sortFlights(g.flights),
    perMile: g.priced && g.miles > 0 ? g.cost / g.miles : null,
  }));
  groups.sort((a, b) => (a.flights[0]?.date || '').localeCompare(b.flights[0]?.date || ''));
  return { cost, miles, counted, perMile: miles > 0 ? cost / miles : null, groups };
}

export function layover(prev, next) {
  if (!prev || !next || prev.to !== next.from) return null;
  if (prev.arr && next.dep) {
    const a = parseISO(addDays(prev.date, +prev.arrOffset || 0));
    const [ah, am] = prev.arr.split(':').map(Number);
    a.setHours(ah, am);
    const b = parseISO(next.date);
    const [bh, bm] = next.dep.split(':').map(Number);
    b.setHours(bh, bm);
    const min = Math.round((b - a) / 60000);
    if (min < 0) return null;
    return { minutes: min };
  }
  return { days: daysBetween(prev.date, next.date) };
}
export function fmtDuration(min) {
  const d = Math.floor(min / 1440), h = Math.floor((min % 1440) / 60), m = min % 60;
  if (d) return `${d}일 ${h}시간`;
  if (h) return m ? `${h}시간 ${m}분` : `${h}시간`;
  return `${m}분`;
}

/* ───────── 등급 계산 ───────── */
// 등급별로 설정 화면에서 받는 실적 칸
export const BASE_KEYS = {
  SKYPASS: ['lifeKE', 'lifeST', 'lifeOT', 'lifePts'],
  MC: ['preKE', 'preOZ', 'perKE', 'perST', 'perOT', 'perPts'],
  MCS: ['preKE', 'preOZ', 'perKE', 'perST', 'perOT', 'perPts'],
  MCP: ['lifeKE', 'lifeOZ'],
  MM: [],
};
// 입력한 실적 숫자가 있을 때만 그 날짜 이전 항공편을 중복으로 보고 뺌
export function baselineDate(profile) {
  if (!profile?.baseDate) return '';
  const b = profile.base || {};
  const keys = [...(BASE_KEYS[profile.tier || 'SKYPASS'] || []), ...((profile.tier === 'MC' || profile.tier === 'MCS') && b.preKE == null ? ['lifeKE'] : [])];
  return keys.some((k) => +b[k] > 0) ? profile.baseDate : '';
}
export function mergeRules(r) {
  const out = {};
  for (const k of Object.keys(DEFAULT_RULES)) out[k] = { ...DEFAULT_RULES[k], ...(r?.[k] || {}) };
  return out;
}
const zero = () => ({ ke: 0, st: 0, ot: 0, oz: 0, pts: 0 });
const KEY = { KE: 'ke', ST: 'st', OT: 'ot' };

export function tally(profile, flights, today) {
  const b = profile?.base || {};
  const n = (k) => +b[k] || 0;
  const tier = profile?.tier || 'SKYPASS';
  const life = { conf: zero(), plan: zero() };
  const period = { conf: zero(), plan: zero() };
  // 입력한 숫자는 baseDate(입력한 날) 기준 실적이라, 등급 시작일이 그보다 뒤면 기간 실적이 될 수 없음
  // (예: 11.22에 입력, 셀렉트 시작 12.17 → 입력 숫자는 평생 누적에만)
  const periodic = tier === 'MC' || tier === 'MCS';
  const startsLater = periodic && profile?.periodStart && profile.periodStart > (profile?.baseDate || today);
  period.conf = startsLater ? zero() : { ke: n('perKE'), st: n('perST'), ot: n('perOT'), oz: 0, pts: n('perPts') };
  if ((tier === 'MC' || tier === 'MCS') && b.preKE != null) {
    // 평생 = 등급 시작일 이전 누적(대한항공·스카이팀 + 아시아나 탑승) + 시작일 이후 실적
    // ① 숫자는 평생 누적(프리미엄·밀리언 마일러)에만 쓰고, 유지·셀렉트 기간 실적에는 넣지 않음
    life.conf = { ke: n('preKE') + n('perKE'), st: n('perST'), ot: n('perOT'), oz: n('preOZ'), pts: n('perPts') };
  } else {
    life.conf = { ke: n('lifeKE'), st: n('lifeST'), ot: n('lifeOT'), oz: n('lifeOZ'), pts: n('lifePts') };
  }
  const baseDate = baselineDate(profile);
  const ps = profile?.periodStart || '0000-00-00';
  const pe = profile?.periodEnd || '9999-12-31';
  const counted = [];
  for (const f of flights) {
    const k = KEY[f.credit];
    if (!k) continue;
    if (baseDate && f.date <= baseDate) continue;
    const e = earnedMiles(f), p = flightPoints(f);
    const w = isPast(f, today) ? 'conf' : 'plan';
    life[w][k] += e;
    life[w].pts += p;
    if (f.date >= ps && f.date <= pe) {
      period[w][k] += e;
      period[w].pts += p;
    }
    counted.push(f.id);
  }
  return { life, period, counted: new Set(counted) };
}

// part 생성기
const part = (label, conf, plan, target, unit = 'mi') => ({ label, conf, plan, target, unit });

function evalOption(o) {
  const parts = o.parts.map((p) => ({
    ...p,
    confPct: p.target ? Math.min(1, p.conf / p.target) : 1,
    allPct: p.target ? Math.min(1, (p.conf + p.plan) / p.target) : 1,
  }));
  const conf = Math.min(...parts.map((p) => p.confPct));
  const all = Math.min(...parts.map((p) => p.allPct));
  const remMi = Math.max(0, ...parts.filter((p) => p.unit === 'mi').map((p) => p.target - p.conf));
  const remMiPlan = Math.max(0, ...parts.filter((p) => p.unit === 'mi').map((p) => p.target - p.conf - p.plan));
  const remPt = Math.max(0, ...parts.filter((p) => p.unit === 'pt').map((p) => p.target - p.conf));
  const remPtPlan = Math.max(0, ...parts.filter((p) => p.unit === 'pt').map((p) => p.target - p.conf - p.plan));
  return { ...o, parts, conf, all, done: conf >= 1, doneWithPlan: all >= 1, remMi, remMiPlan, remPt, remPtPlan };
}
function goal(g) {
  const options = g.options.map(evalOption);
  let best = 0;
  options.forEach((o, i) => {
    const b = options[best];
    if (o.all > b.all + 1e-9 || (Math.abs(o.all - b.all) < 1e-9 && o.conf > b.conf)) best = i;
  });
  return { ...g, options, best, done: options.some((o) => o.done), doneWithPlan: options.some((o) => o.doneWithPlan) };
}

export function computeGoals(profile, flights, today) {
  const R = mergeRules(profile?.rules);
  const { life, period } = tally(profile, flights, today);
  const tier = profile?.tier || 'SKYPASS';
  const L = life.conf, Lp = life.plan, P = period.conf, Pp = period.plan;
  const deadline = profile?.periodEnd || null;
  const goals = [];

  if (tier === 'SKYPASS') {
    goals.push(goal({
      id: 'mcQualify', kind: 'qualify', target: 'MC', title: '모닝캄 승급', scope: '가입 후 누적 · 기간 제한 없음',
      options: [
        { label: `대한항공 + 제휴 항공사 ${fmtNum(R.mcQualify.total)}마일`, note: `이 중 ${fmtNum(R.mcQualify.keMin)}마일 이상은 대한항공 편 탑승이어야 해요 (스카이팀 제외)`, parts: [
          part('전체 (대한항공 + 스카이팀·제휴)', L.ke + L.st + L.ot, Lp.ke + Lp.st + Lp.ot, R.mcQualify.total),
          part('대한항공 편 탑승만', L.ke, Lp.ke, R.mcQualify.keMin),
        ] },
        { label: `대한항공 탑승 횟수 ${fmtNum(R.mcQualify.points)}포인트`, note: '국내선 1P · 국제선 2P', parts: [part('탑승 횟수 포인트', L.pts, Lp.pts, R.mcQualify.points, 'pt')] },
      ],
    }));
  }
  if (tier === 'MC') {
    goals.push(goal({
      id: 'select', kind: 'qualify', target: 'MCS', title: '모닝캄 셀렉트 승급', scope: '심사 기간 내', deadline,
      options: [
        { label: `대한항공 + 스카이팀 ${fmtNum(R.select.miles)}마일`, parts: [part('대한항공 + 스카이팀', P.ke + P.st, Pp.ke + Pp.st, R.select.miles)] },
        { label: `대한항공 탑승 횟수 ${fmtNum(R.select.points)}포인트`, note: '국내선 1P · 국제선 2P', parts: [part('탑승 횟수 포인트', P.pts, Pp.pts, R.select.points, 'pt')] },
      ],
    }));
    goals.push(goal({
      id: 'mcRetain', kind: 'retain', target: 'MC', title: '모닝캄 유지', scope: '자격 유효기간 2년 내', deadline,
      options: [
        { label: `${fmtNum(R.mcRetain.total)}마일 적립`, note: `이 중 ${fmtNum(R.mcRetain.keMin)}마일 이상은 대한항공 편 탑승이어야 해요 (스카이팀 제외)`, parts: [
          part('전체 (대한항공 + 스카이팀·제휴)', P.ke + P.st + P.ot, Pp.ke + Pp.st + Pp.ot, R.mcRetain.total),
          part('대한항공 편 탑승만', P.ke, Pp.ke, R.mcRetain.keMin),
        ] },
        { label: `${fmtNum(R.mcRetain.total2)}마일 + 탑승 횟수 ${R.mcRetain.points2}포인트`, note: '포인트를 채우면 잔여 마일은 제휴사로', parts: [
          part('전체 (대한항공 + 스카이팀·제휴)', P.ke + P.st + P.ot, Pp.ke + Pp.st + Pp.ot, R.mcRetain.total2),
          part('탑승 횟수 포인트', P.pts, Pp.pts, R.mcRetain.points2, 'pt'),
        ] },
        { label: `탑승 횟수 ${R.mcRetain.points3}포인트`, parts: [part('탑승 횟수 포인트', P.pts, Pp.pts, R.mcRetain.points3, 'pt')] },
      ],
    }));
  }
  if (tier === 'MCS') {
    goals.push(goal({
      id: 'selectRetain', kind: 'retain', target: 'MCS', title: '모닝캄 셀렉트 유지', scope: '자격 유효기간 내', deadline, editable: true,
      options: [
        { label: `대한항공 + 스카이팀 ${fmtNum(R.selectRetain.miles)}마일`, parts: [part('대한항공 + 스카이팀', P.ke + P.st, Pp.ke + Pp.st, R.selectRetain.miles)] },
        { label: `탑승 횟수 ${fmtNum(R.selectRetain.points)}포인트`, parts: [part('탑승 횟수 포인트', P.pts, Pp.pts, R.selectRetain.points, 'pt')] },
      ],
    }));
  }
  if (tier !== 'MCP' && tier !== 'MM') {
    goals.push(goal({
      id: 'premium', kind: 'lifetime', target: 'MCP', title: '모닝캄 프리미엄', scope: '평생 누적',
      options: [{ label: `대한항공 + 스카이팀 평생 ${fmtNum(R.premium.miles)}마일`, note: L.oz ? `아시아나 탑승 ${fmtNum(L.oz)}마일 포함` : undefined, parts: [part('평생 누적', L.ke + L.st + L.oz, Lp.ke + Lp.st, R.premium.miles)] }],
    }));
  }
  if (tier !== 'MM') {
    goals.push(goal({
      id: 'million', kind: 'lifetime', target: 'MM', title: '밀리언 마일러', scope: '평생 누적',
      options: [{ label: `대한항공 + 스카이팀 평생 ${fmtNum(R.million.miles)}마일`, note: L.oz ? `아시아나 탑승 ${fmtNum(L.oz)}마일 포함` : undefined, parts: [part('평생 누적', L.ke + L.st + L.oz, Lp.ke + Lp.st, R.million.miles)] }],
    }));
  }
  const headlineId = { SKYPASS: 'mcQualify', MC: 'select', MCS: 'premium', MCP: 'million', MM: null }[tier];
  const headline = goals.find((g) => g.id === headlineId) || null;
  return { goals, headline, life, period, rules: R };
}

// 같은 마일이 등급 목표에 얼마나 기여하는지
export function contributionOf(f, profile) {
  const e = earnedMiles(f);
  const p = flightPoints(f);
  const out = [];
  const bd = baselineDate(profile);
  if (f.credit === 'NONE' || (bd && f.date <= bd)) return { miles: e, points: p, rows: out, excluded: true };
  const R = mergeRules(profile?.rules);
  const inPeriod = (!profile?.periodStart || f.date >= profile.periodStart) && (!profile?.periodEnd || f.date <= profile.periodEnd);
  const tier = profile?.tier || 'SKYPASS';
  const keSt = f.credit === 'KE' || f.credit === 'ST';
  if (tier === 'SKYPASS') out.push({ label: '모닝캄 승급', value: e, of: R.mcQualify.total });
  if (tier === 'MC' && inPeriod) {
    if (keSt) out.push({ label: '셀렉트 승급', value: e, of: R.select.miles });
    out.push({ label: '모닝캄 유지', value: e, of: R.mcRetain.total });
  }
  if (tier === 'MCS' && inPeriod && keSt) out.push({ label: '셀렉트 유지', value: e, of: R.selectRetain.miles });
  if (keSt && tier !== 'MCP' && tier !== 'MM') out.push({ label: '모닝캄 프리미엄', value: e, of: R.premium.miles });
  if (keSt && tier !== 'MM') out.push({ label: '밀리언 마일러', value: e, of: R.million.miles });
  return { miles: e, points: p, rows: out, excluded: false };
}
