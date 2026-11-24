// 친구에게 공유하는 요약과 '같은 비행기' 찾기
import { sortFlights, cabinOf } from './core.js';
import { TIER } from './skypass.js';
import { aircraftTop } from './aircraft.js';
import { walletOf } from './wallet.js';
import { asSummary } from './alaska.js';

export const INVITE_PARAM = 'f';
export const INVITE_KEY = 'tierrun:invite';
export const newToken = () => Array.from(crypto.getRandomValues(new Uint8Array(9)), (b) => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
export const inviteLink = (token) => `${location.origin}/?${INVITE_PARAM}=${token}`;

const normNo = (n) => String(n || '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
export const flightKey = (f) => `${String(f.airline || '').toUpperCase()}${normNo(f.flightNo)}|${f.date}`;

// 탑승 완료 항공편으로 만든 비행 기록 요약 (친구와 비교용, 횟수만)
export function flightStats(flights, today) {
  const past = flights.filter((f) => f.date < today);
  const tally = (keys) => {
    const m = new Map();
    for (const k of keys) if (k) m.set(k, (m.get(k) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };
  const al = tally(past.map((f) => String(f.airline || '').toUpperCase()));
  const ap = tally(past.flatMap((f) => [f.from, f.to]));
  const top = (arr, n = 3) => arr.slice(0, n).map(([code, count]) => ({ code, count }));
  return {
    flights: past.length,
    dist: Math.round(past.reduce((a, f) => a + (+f.baseMiles || 0), 0)),
    airlines: top(al), airlineCount: al.length,
    airports: top(ap), airportCount: ap.length,
  };
}

// 친구에게 보이는 것: 이름·사진, 현재 등급, 다음 등급 진행률, 다가오는 항공편(운임·메모·지난 항공편 제외)
export function buildPublic({ profile, user, flights, goals, today }) {
  const h = goals?.headline;
  const best = h ? h.options[h.best] : null;
  const mileOpt = h ? h.options.find((o) => o.parts.every((p) => p.unit === 'mi')) || best : null;
  const tier = profile?.tier || 'SKYPASS';
  return {
    v: 1,
    name: profile?.name || user?.name || '',
    photo: user?.photo || '',
    tier,
    periodEnd: tier === 'MC' || tier === 'MCS' ? profile?.periodEnd || '' : '',
    goal: h
      ? {
          target: h.target,
          title: `${TIER[h.target]?.name || ''}까지`,
          conf: Math.round(best.conf * 1000) / 1000,
          all: Math.round(best.all * 1000) / 1000,
          remMi: mileOpt ? Math.round(mileOpt.remMi) : null,
          remMiPlan: mileOpt ? Math.round(mileOpt.remMiPlan) : null,
          done: !!h.done,
        }
      : null,
    // 지갑의 다른 티어 (지금은 알래스카): 등급과 올해 상태포인트 진행률만
    wallet: walletOf(profile).filter((w) => w.program !== 'KE').map((w) => {
      if (w.program !== 'AS') return { program: w.program };
      const x = asSummary(w, flights, today);
      return { program: 'AS', tier: x.held.id, year: x.year, sp: x.conf, all: x.all, next: x.next?.id || null, nextSp: x.next?.sp || null };
    }),
    // 많이 탄 기종 순위(탑승 완료 기준, 횟수만)
    aircraft: aircraftTop(flights, today, 3),
    stats: flightStats(flights, today),
    upcoming: sortFlights(flights)
      .filter((f) => f.date >= today)
      .slice(0, 40)
      .map((f) => ({ airline: f.airline, flightNo: f.flightNo, date: f.date, from: f.from, to: f.to, dep: f.dep || '', arr: f.arr || '', arrOffset: +f.arrOffset || 0, cabin: cabinOf(f), aircraft: f.aircraft || '' })),
  };
}

// 내 항공편 id → 같은 비행기 타는 친구들
export function togetherMap(myFlights, friends, today) {
  const idx = new Map();
  for (const fr of friends || []) {
    for (const u of fr.upcoming || []) {
      if (u.date < today) continue;
      const k = flightKey(u);
      if (!idx.has(k)) idx.set(k, []);
      idx.get(k).push(fr);
    }
  }
  const out = new Map();
  for (const f of myFlights) {
    const list = idx.get(flightKey(f));
    if (list?.length) out.set(f.id, list);
  }
  return out;
}

export const friendNames = (list) => (!list?.length ? '' : list.length === 1 ? list[0].name || '친구' : `${list[0].name || '친구'} 외 ${list.length - 1}명`);
