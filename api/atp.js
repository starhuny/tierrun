// 임시 점검: All The Places 아코르 데이터 위치·크기
export const config = { maxDuration: 30 };
export default async function handler(req, res) {
  const out = {};
  const t = Date.now();
  try {
    const r = await fetch('https://data.alltheplaces.xyz/runs/latest.json');
    out.latestStatus = r.status;
    const j = await r.json();
    out.latest = { run_id: j.run_id, output_url: j.output_url };
    const urls = [
      `https://alltheplaces-data.openaddresses.io/runs/${j.run_id}/output/accor.geojson`,
      `https://data.alltheplaces.xyz/runs/${j.run_id}/output/accor.geojson`,
    ];
    out.tries = [];
    for (const u of urls) {
      try {
        const g = await fetch(u);
        const txt = g.ok ? await g.text() : '';
        let n = 0, sample = null;
        if (txt) { const gj = JSON.parse(txt); n = gj.features?.length || 0; sample = gj.features?.slice(0, 2).map((f) => ({ p: f.properties, c: f.geometry?.coordinates })); }
        out.tries.push({ u, status: g.status, bytes: txt.length, n, sample });
        if (n) break;
      } catch (e) { out.tries.push({ u, err: String(e.message || e) }); }
    }
  } catch (e) { out.err = String(e.message || e); }
  out.ms = Date.now() - t;
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(out);
}
