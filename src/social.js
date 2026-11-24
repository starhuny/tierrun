// 친구에게 공유하는 요약과 '같은 비행기' 찾기
import { sortFlights, cabinOf } from './core.js';
import { TIER } from './skypass.js';

export const INVITE_PARAM = 'f';
export const INVITE_KEY = 'tierrun:invite';
export const newToken = () => Array.from(crypto.getRandomValues(new Uint8Array(9)), (b) => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
export const inviteLink = (token) => `${location.origin}/?${INVITE_PARAM}=${token}`;

const normNo = (n) => String(n || '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');
export const flightKey = (f) => `${String(f.airline || '').toUpperCase()}${normNo(f.flightNo)}|${f.date}`;

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
