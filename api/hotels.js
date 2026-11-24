// Vercel 서버 함수: GET /api/hotels?lat=13.75&lon=100.50[&cc=TH]
//   → { hotels: [{ id, name, nameEn, brand, lat, lon, km }], source }
// 아코르는 호텔 목록 API를 공개하지 않아서 OpenStreetMap 검색(Photon)으로 도시 주변 아코르 브랜드 호텔을 찾음
// (Overpass 공개 서버는 클라우드 요청을 막거나 너무 느려서 Photon 사용)
// 같은 도시는 Vercel CDN에 7일 캐시
import { detectBrand } from '../src/brands.js';

export const config = { maxDuration: 20 };
const UA = 'TierTracker/1.0 (+https://tierrun.vercel.app; hotel list)';
const R_KM = 25;
const QUERIES = ['novotel', 'ibis', 'sofitel', 'mercure', 'pullman', 'mgallery', 'movenpick', 'swissotel', 'fairmont', 'raffles', 'adagio', 'mama shelter', 'banyan tree', 'angsana', 'mondrian', '25hours', 'hoxton', 'peppers', 'mantra', 'rixos'];
const LOCAL = {
  KR: ['노보텔', '이비스', '소피텔', '머큐어', '풀만', '몬드리안', '페어몬트', '스위스텔', '모벤픽', '반얀트리'],
  JP: ['ノボテル', 'イビス', 'ソフィテル', 'メルキュール', 'プルマン', 'スイスホテル', 'フェアモント'],
  CN: ['诺富特', '宜必思', '索菲特', '美居', '铂尔曼', '瑞士酒店', '费尔蒙'],
  TW: ['諾富特', '宜必思', '索菲特', '美居', '鉑爾曼'],
};

const km = (a, b, c, d) => {
  const t = Math.PI / 180;
  const x = Math.sin(((c - a) * t) / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(x));
};

async function photon(q, bbox, lang) {
  const u = new URL('https://photon.komoot.io/api/');
  u.searchParams.set('q', q);
  u.searchParams.set('bbox', bbox);
  u.searchParams.set('limit', '50');
  u.searchParams.set('osm_tag', 'tourism');
  if (lang) u.searchParams.set('lang', lang);
  const ctl = new AbortController();
  const tm = setTimeout(() => ctl.abort(), 5000);
  try {
    const r = await fetch(u, { signal: ctl.signal, headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (!r.ok) throw new Error(`photon ${r.status}`);
    return (await r.json())?.features || [];
  } finally {
    clearTimeout(tm);
  }
}

export default async function handler(req, res) {
  try {
    return await main(req, res);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ hotels: [], error: '호텔 목록을 가져오지 못했어요.', crash: String(e?.stack || e).slice(0, 300) });
  }
}

async function main(req, res) {
  if (req.query.ping) {
    const t = Date.now();
    try { const f = await photon('novotel', '100.3,13.5,100.8,14.0', 'en'); return res.status(200).json({ ok: true, n: f.length, ms: Date.now() - t }); } catch (e) { return res.status(200).json({ ok: false, err: String(e.message || e), ms: Date.now() - t }); }
  }
  const lat = Math.round(+req.query.lat * 100) / 100, lon = Math.round(+req.query.lon * 100) / 100;
  const cc = String(req.query.cc || '').toUpperCase().slice(0, 2);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 85 || Math.abs(lon) > 180) {
    return res.status(400).json({ error: '좌표가 필요해요.' });
  }
  const dLat = R_KM / 111, dLon = R_KM / (111 * Math.max(0.2, Math.cos((lat * Math.PI) / 180)));
  const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((x) => x.toFixed(3)).join(',');
  // 한국은 한글 이름 그대로, 그 밖은 영어 이름 우선
  const lang = cc === 'KR' ? '' : 'en';
  const qs = [...QUERIES, ...(LOCAL[cc] || [])].slice(0, +req.query.n || 99);
  if (req.query.stage === 'a') return res.status(200).json({ bbox, qs, lang });
  // 공개 서버라 한 번에 몰아 보내지 않고 8개씩, 실패한 건 한 번 더
  const t0 = Date.now();
  const results = new Array(qs.length);
  const run = async (i) => {
    for (let k = 0; k < 2; k++) {
      try { results[i] = { status: 'fulfilled', value: await photon(qs[i], bbox, lang) }; return; } catch (e) {
        results[i] = { status: 'rejected', reason: e };
        if (Date.now() - t0 > 6000) return;
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  };
  let next = 0;
  await Promise.all(Array.from({ length: 8 }, async () => { while (next < qs.length && Date.now() - t0 < 7000) await run(next++); }));
  const ok = results.filter((r) => r?.status === 'fulfilled');
  if (req.query.stage === 'b') return res.status(200).json({ ms: Date.now() - t0, st: results.map((r) => r?.status + ':' + (r?.value?.length ?? String(r?.reason?.message || ''))) });
  const failed = qs.filter((_, i) => results[i]?.status !== 'fulfilled');
  if (!ok.length) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ hotels: [], error: '호텔 목록을 가져오지 못했어요.', detail: results.filter(Boolean).map((r) => String(r.reason?.message || r.reason || '')).slice(0, 3) });
  }
  const seen = new Map();
  for (const r of ok) {
    for (const f of r.value) {
      const p = f.properties || {};
      const [x, y] = f.geometry?.coordinates || [];
      if (y == null || !p.name) continue;
      const brand = detectBrand(p.name);
      if (!brand) continue;
      const d = km(lat, lon, y, x);
      if (d > R_KM * 1.2) continue;
      const id = `${(p.osm_type || 'x').toLowerCase()}${p.osm_id}`;
      if (!seen.has(id)) seen.set(id, { id, name: p.name, nameEn: '', brand, lat: +y.toFixed(5), lon: +x.toFixed(5), km: Math.round(d * 10) / 10 });
    }
  }
  // 같은 호텔(같은 브랜드 150m 안이거나 같은 이름)은 하나로
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9가-힣぀-ヿ一-鿿]/g, '');
  const keep = [];
  for (const h of [...seen.values()].sort((a, b) => a.km - b.km)) {
    if (keep.some((k) => norm(k.name) === norm(h.name) || (k.brand === h.brand && km(k.lat, k.lon, h.lat, h.lon) < 0.15))) continue;
    keep.push(h);
  }
  const partial = failed.length > 0;
  res.setHeader('Cache-Control', partial ? 's-maxage=600' : keep.length ? 's-maxage=604800, stale-while-revalidate=1209600' : 's-maxage=86400');
  return res.status(200).json({ hotels: keep.slice(0, 200), source: 'OpenStreetMap (Photon)', partial, failed, ms: Date.now() - t0 });
}
