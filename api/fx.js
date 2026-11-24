// Vercel 서버 함수: GET /api/fx → { rate, date, source }   (1유로 = rate 원)
// 공개 환율 API에서 가져오고, Vercel CDN에 6시간 캐시(하루 넘게는 안 씀)
// 1순위 Frankfurter(유럽중앙은행 기준), 실패하면 open.er-api.com

async function frankfurter() {
  const r = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=KRW');
  if (!r.ok) throw new Error(`frankfurter ${r.status}`);
  const j = await r.json();
  const rate = +j?.rates?.KRW;
  if (!(rate > 0)) throw new Error('frankfurter: no rate');
  return { rate, date: j.date || '', source: '유럽중앙은행(Frankfurter)' };
}
async function erApi() {
  const r = await fetch('https://open.er-api.com/v6/latest/EUR');
  if (!r.ok) throw new Error(`er-api ${r.status}`);
  const j = await r.json();
  const rate = +j?.rates?.KRW;
  if (!(rate > 0)) throw new Error('er-api: no rate');
  const d = j.time_last_update_utc ? new Date(j.time_last_update_utc).toISOString().slice(0, 10) : '';
  return { rate, date: d, source: 'ExchangeRate-API' };
}

export default async function handler(req, res) {
  const errs = [];
  for (const fn of [frankfurter, erApi]) {
    try {
      const out = await fn();
      res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
      return res.status(200).json({ ...out, rate: Math.round(out.rate * 100) / 100 });
    } catch (e) {
      errs.push(String(e.message || e));
    }
  }
  res.setHeader('Cache-Control', 'no-store');
  return res.status(502).json({ error: '환율을 가져오지 못했어요.', detail: errs });
}
