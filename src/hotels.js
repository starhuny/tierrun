// 도시 주변 아코르 호텔 목록 (OpenStreetMap) — 같은 도시는 기기에 7일 보관
import { OVERPASS, buildQuery, parseOverpass } from './osmHotels.js';
const KEY = 'tierrun:hotels';
const TTL = 7 * 86400000;
const mem = new Map();

const keyOf = (lat, lon) => `${(+lat).toFixed(2)},${(+lon).toFixed(2)}`;
function readStore() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function writeStore(k, hotels) {
  try {
    const all = readStore();
    all[k] = { t: Date.now(), hotels };
    // 오래된 도시는 지워서 20곳까지만
    const keys = Object.keys(all).sort((a, b) => all[b].t - all[a].t);
    for (const x of keys.slice(20)) delete all[x];
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch { /* 저장 공간 부족 등은 무시 */ }
}

export async function fetchHotels(lat, lon) {
  const k = keyOf(lat, lon);
  if (mem.has(k)) return mem.get(k);
  const hit = readStore()[k];
  if (hit && Date.now() - hit.t < TTL) { mem.set(k, hit.hotels); return hit.hotels; }
  const la = +(+lat).toFixed(2), lo = +(+lon).toFixed(2);
  const body = 'data=' + encodeURIComponent(buildQuery(la, lo, 25000));
  let hotels = null, last = null;
  for (const url of OVERPASS) {
    try {
      const ctl = new AbortController();
      const tm = setTimeout(() => ctl.abort(), 20000);
      const r = await fetch(url, { method: 'POST', body, signal: ctl.signal, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      clearTimeout(tm);
      if (!r.ok) throw new Error(`${r.status}`);
      hotels = parseOverpass(await r.json(), la, lo);
      break;
    } catch (e) { last = e; }
  }
  if (!hotels) throw last || new Error('hotels');
  mem.set(k, hotels);
  if (hotels.length) writeStore(k, hotels);
  return hotels;
}

// 이름·영문·브랜드로 거르기
export function filterHotels(list, q, brand) {
  const t = String(q || '').trim().toLowerCase().replace(/\s+/g, '');
  return (list || []).filter((h) => (!brand || h.brand === brand) && (!t || `${h.name}${h.nameEn}${h.brand}`.toLowerCase().replace(/\s+/g, '').includes(t)));
}
