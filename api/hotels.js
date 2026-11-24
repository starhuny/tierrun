// Vercel 서버 함수: GET /api/hotels?lat=13.75&lon=100.50
//   → { hotels: [{ id, name, brand, lat, lon, km, stars }], source, run }
// 아코르 호텔 목록: All The Places(공개 데이터, 아코르 공식 사이트에서 매주 수집)의 accor.geojson (~5,900곳)
// 함수 인스턴스 메모리에 하루 보관하고, 도시별 결과는 Vercel CDN에 7일 캐시
import { detectBrand } from '../src/brands.js';

export const config = { maxDuration: 20 };
const R_KM = 25;
const DAY = 86400000;
let cache = null; // { t, run, list: [[name, brand, lat, lon, stars, ref]] }

const km = (a, b, c, d) => {
  const t = Math.PI / 180;
  const x = Math.sin(((c - a) * t) / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(x));
};

// "IBIS POITIERS BEAULIEU" → "ibis Poitiers Beaulieu"
const KEEP = { ibis: 'ibis', mgallery: 'MGallery', 'so/': 'SO/', sls: 'SLS', jo: 'JO', joe: 'JOE', '&': '&', de: 'de', du: 'du', la: 'la', le: 'le', les: 'les', des: 'des', et: 'et', by: 'by', the: 'the', of: 'of', and: 'and', at: 'at' };
function nice(s) {
  if (!s || /[a-z]/.test(s)) return s || '';
  return s.toLowerCase().split(/(\s+|-|\/)/).map((w, i) => {
    if (KEEP[w] && (i > 0 || w === 'ibis' || w === 'mgallery')) return KEEP[w];
    return w.replace(/^(\p{L})/u, (c) => c.toUpperCase());
  }).join('').replace(/^So\//, 'SO/').replace(/(\p{L})['’](\p{L})/gu, (m, a, b) => `${a}'${b.toUpperCase()}`);
}

async function load() {
  if (cache && Date.now() - cache.t < DAY) return cache;
  const meta = await (await fetch('https://data.alltheplaces.xyz/runs/latest.json')).json();
  const r = await fetch(`https://alltheplaces-data.openaddresses.io/runs/${meta.run_id}/output/accor.geojson`);
  if (!r.ok) throw new Error(`atp ${r.status}`);
  const gj = await r.json();
  const list = [];
  for (const f of gj.features || []) {
    const p = f.properties || {};
    const [x, y] = f.geometry?.coordinates || [];
    if (y == null || x == null || !p.name) continue;
    const name = nice(p.name);
    const brand = detectBrand(name, p.brand) || '기타 아코르 브랜드';
    list.push([name, brand, +y.toFixed(5), +x.toFixed(5), +p.stars || 0, String(p.ref || '')]);
  }
  if (!list.length) throw new Error('atp empty');
  cache = { t: Date.now(), run: meta.run_id, list };
  return cache;
}

export default async function handler(req, res) {
  const lat = Math.round(+req.query.lat * 100) / 100, lon = Math.round(+req.query.lon * 100) / 100;
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return res.status(400).json({ error: '좌표가 필요해요.' });
  }
  try {
    const c = await load();
    const dLat = R_KM / 111;
    const hotels = [];
    for (const [name, brand, y, x, stars, ref] of c.list) {
      if (Math.abs(y - lat) > dLat) continue;
      const d = km(lat, lon, y, x);
      if (d > R_KM) continue;
      hotels.push({ id: `a${ref || `${y},${x}`}`, name, nameEn: '', brand, lat: y, lon: x, km: Math.round(d * 10) / 10, stars });
    }
    hotels.sort((a, b) => a.km - b.km);
    res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=1209600');
    return res.status(200).json({ hotels: hotels.slice(0, 300), source: 'All The Places', run: c.run });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ hotels: [], error: '호텔 목록을 가져오지 못했어요.', detail: String(e.message || e) });
  }
}
