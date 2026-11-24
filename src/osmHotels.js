// 도시 주변 아코르 호텔 찾기 — OpenStreetMap(Overpass)에 브라우저에서 바로 물어봄
// (Overpass 공개 서버가 클라우드 서버(Vercel) 요청은 막아서, 사용자 기기에서 직접 요청)
import { detectBrand } from './brands.js';

export const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];
const NAME_RE =
  'novotel|ibis|sofitel|mercure|pullman|fairmont|raffles|swiss.?tel|m.e?venpick|gallery|mondrian|adagio|mama shelter|peppers|mantra|banyan tree|angsana|25 ?hours|hoxton|rixos|so/|art series|breakfree|jo.?joe|faena|delano|' +
  '노보텔|이비스|소피텔|머큐어|풀만|페어몬트|래플|스위스|벤픽|몬드리안|아다지오|반얀|갤러리';
const TOURISM = '^(hotel|apartment|resort|motel|guest_house|hostel)$';

export function buildQuery(lat, lon, r) {
  // 반경 안 숙소를 먼저 모은 뒤 이름·브랜드로 거름 (정규식을 전 세계에 돌리지 않게)
  return `[out:json][timeout:25];
nwr["tourism"~"${TOURISM}"](around:${r},${lat},${lon})->.h;
(nwr.h["name"~"${NAME_RE}",i];nwr.h["name:en"~"${NAME_RE}",i];nwr.h["brand"~"${NAME_RE}",i];nwr.h["operator"~"accor",i];);
out center tags 400;`;
}

const km = (a, b, c, d) => {
  const R = 6371, t = Math.PI / 180;
  const x = Math.sin(((c - a) * t) / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};
const latin = (s) => /^[\x00-\u024f\u1e00-\u1eff\s'\u2019&\-\u2013.,()/0-9]+$/.test(s || '');

export function parseOverpass(json, lat, lon) {
  const out = [];
  for (const el of json?.elements || []) {
    const t = el.tags || {};
    const y = el.lat ?? el.center?.lat, x = el.lon ?? el.center?.lon;
    if (y == null || x == null || !t.name) continue;
    const brand = detectBrand(t['name:en'], t.name, t.brand, t['brand:en']);
    if (!brand) continue;
    const ko = t['name:ko'] || (!latin(t.name) && /[가-힣]/.test(t.name) ? t.name : '');
    const en = t['name:en'] || (latin(t.name) ? t.name : '');
    out.push({ id: `${el.type[0]}${el.id}`, name: ko || en || t.name, nameEn: en && en !== (ko || t.name) ? en : '', brand, lat: +y.toFixed(5), lon: +x.toFixed(5), km: Math.round(km(lat, lon, y, x) * 10) / 10 });
  }
  // 같은 호텔(이름 같거나 같은 브랜드 150m 이내) 하나로
  out.sort((a, b) => a.km - b.km);
  const keep = [];
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
  for (const h of out) {
    if (keep.some((k) => norm(k.name) === norm(h.name) || (k.brand === h.brand && km(k.lat, k.lon, h.lat, h.lon) < 0.15))) continue;
    keep.push(h);
  }
  return keep.slice(0, 200);
}
