// 편명으로 출발·도착 찾기
//  출발·도착 공항만 채움 (시각은 사용자가 직접 입력)
//  1) 내가 전에 넣은 같은 편명 — 내 기기·내 계정 데이터만 봄, 다른 사람과 공유 안 됨
//  2) 이 기기에 저장된 지난 조회 결과
//  3) 서버 /api/flight (AeroDataBox 실제 운항 정보 → 없으면 AI 추정)
//  아티팩트 버전은 Claude(sample)로 추정
import { aiFill } from './ai.js';

const CACHE_KEY = 'tierrun:flightLookup:v1';
const readCache = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; }
};
const writeCache = (k, v) => {
  try {
    const c = readCache();
    c[k] = { ...v, t: Date.now() };
    const keys = Object.keys(c).sort((a, b) => c[b].t - c[a].t).slice(0, 200);
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(keys.map((x) => [x, c[x]]))));
  } catch { /* 저장 공간 없음 */ }
};

export const normNo = (n) => String(n || '').replace(/\D/g, '').replace(/^0+(?=\d)/, '');

export async function lookupFlight({ airline, flightNo, date }, myFlights = []) {
  const code = String(airline || '').toUpperCase();
  const no = normNo(flightNo);
  if (code.length !== 2 || !no) throw new Error('항공사와 편명을 먼저 넣어 주세요.');

  // 1) 내 기록
  const mine = myFlights
    .filter((f) => String(f.airline).toUpperCase() === code && normNo(f.flightNo) === no && f.from && f.to)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (mine.length) {
    const seen = new Set();
    const legs = mine
      .filter((f) => (seen.has(f.from + f.to) ? false : seen.add(f.from + f.to)))
      .map((f) => ({ from: f.from, to: f.to }));
    return { source: 'mine', legs };
  }

  // 2) 이 기기 캐시 (14일)
  const key = `${code}${no}|${date || ''}`;
  const hit = readCache()[key];
  if (hit && Date.now() - hit.t < 14 * 86400000 && hit.legs?.length) return { source: hit.source, legs: hit.legs, note: hit.note };

  // 3) 서버 또는 AI
  let r;
  if (import.meta.env.VITE_TARGET === 'artifact') {
    const j = await aiFill({ text: `${code}${no} ${date || ''} 편명만 있어. 정기 스케줄로 출발·도착 공항만 채워줘(시각은 비워 둬). 경유편이면 구간을 모두.`, segments: [{ airline: code, flightNo: no, date }], today: date || '' });
    r = { source: 'ai', legs: (j?.segments || []).filter((s) => s.from && s.to).map((s) => ({ from: s.from, to: s.to })), note: j?.notes || '' };
  } else {
    const q = new URLSearchParams({ airline: code, no, ...(date ? { date } : {}) });
    const res = await fetch(`/api/flight?${q}`);
    const d = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(res.status === 404 ? '편명 조회 서버가 아직 배포되지 않았어요.' : d.error || '조회에 실패했어요.');
    r = d;
  }
  if (r.legs?.length) writeCache(key, r);
  return r;
}

export const LOOKUP_SOURCE = {
  mine: '내 기록',
  live: '운항 정보',
  ai: 'AI 추정',
};
