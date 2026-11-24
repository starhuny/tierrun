// 임시 점검: 서버에서 호텔 데이터 출처별로 닿는지 확인
export const config = { maxDuration: 30 };
const UA = 'TierTracker/1.0 (+https://tierrun.vercel.app; hotel list)';
const small = '[out:json][timeout:8];node["tourism"="hotel"]["name"~"novotel",i](around:15000,13.75,100.5);out tags 5;';
const tries = () => [
  ['photon', 'https://photon.komoot.io/api/?q=novotel&lat=13.75&lon=100.5&limit=10', {}],
  ['photon-bbox', 'https://photon.komoot.io/api/?q=novotel&bbox=100.3,13.5,100.8,14.0&limit=20&osm_tag=tourism:hotel', {}],
  ['nominatim', 'https://nominatim.openstreetmap.org/search?q=novotel+bangkok&format=jsonv2&limit=10', {}],
  ['op-de', 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(small), {}],
  ['op-coffee', 'https://overpass.private.coffee/api/interpreter?data=' + encodeURIComponent(small), {}],
  ['op-kumi', 'https://overpass.kumi.systems/api/interpreter?data=' + encodeURIComponent(small), {}],
  ['op-jp', 'https://overpass.osm.jp/api/interpreter?data=' + encodeURIComponent(small), {}],
  ['op-tw', 'https://overpass.nchc.org.tw/api/interpreter?data=' + encodeURIComponent(small), {}],
  ['op-ru', 'https://overpass.openstreetmap.ru/api/interpreter?data=' + encodeURIComponent(small), {}],
];
export default async function handler(req, res) {
  const out = [];
  await Promise.all(tries().map(async ([name, url]) => {
    const t = Date.now();
    try {
      const ctl = new AbortController();
      const tm = setTimeout(() => ctl.abort(), 9000);
      const r = await fetch(url, { signal: ctl.signal, headers: { 'User-Agent': UA, Accept: 'application/json', Referer: 'https://tierrun.vercel.app/' } });
      clearTimeout(tm);
      const txt = await r.text();
      const n = (txt.match(/"(name|display_name)"/g) || []).length;
      out.push({ name, status: r.status, ms: Date.now() - t, n, cors: r.headers.get('access-control-allow-origin') || '' });
    } catch (e) {
      out.push({ name, err: e.name === 'AbortError' ? 'timeout' : String(e.message || e).slice(0, 80), ms: Date.now() - t });
    }
  }));
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(out);
}
