// 티어 지갑: 사용자가 추가한 항공사 등급 프로그램 목록
// profile.wallet = [{ program: 'KE' }, { program: 'AS', tier, sp, spDate, method, rewards }]
// - 대한항공(스카이패스) 설정은 예전처럼 profile 본문(tier, periodStart, base…)에 그대로 둠
// - 항공편은 f.program 으로 어느 프로그램에 적립하는지 구분 (없으면 스카이패스)
import { AIRLINE } from './skypass.js';

export const PROGRAMS = {
  KE: { id: 'KE', name: '대한항공 스카이패스', short: '스카이패스', airline: 'KE', alliance: 'ST' },
  AS: { id: 'AS', name: '알래스카 Atmos 리워드', short: '알래스카', airline: 'AS', alliance: 'OW' },
  TK: { id: 'TK', name: '터키항공 Miles&Smiles', short: '터키항공', airline: 'TK', alliance: 'SA', soon: true },
};
export const PROGRAM_LIST = Object.values(PROGRAMS);

export function walletOf(profile) {
  const w = profile?.wallet;
  const list = Array.isArray(w) ? w.filter((x) => PROGRAMS[x?.program]) : [];
  return list.some((x) => x.program === 'KE') ? list : [{ program: 'KE' }, ...list];
}
export const progEntry = (profile, id) => walletOf(profile).find((p) => p.program === id) || null;
export const hasProgram = (profile, id) => !!progEntry(profile, id);

export const programOf = (f) => f.program || 'KE';
export function allianceOf(f) {
  if (f.program === 'AS') return 'OW';
  return AIRLINE[String(f.airline || '').toUpperCase()]?.alliance || null;
}
// 새 항공편의 기본 적립 프로그램
export function defaultProgram(airline, profile) {
  const al = AIRLINE[String(airline || '').toUpperCase()]?.alliance;
  if (al === 'OW' && hasProgram(profile, 'AS')) return 'AS';
  return 'KE';
}
export const allianceOfProgram = (id) => PROGRAMS[id]?.alliance || null;
