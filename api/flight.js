// Vercel 서버 함수: GET /api/flight?airline=KE&no=17&date=2026-12-01
// → { source: 'live' | 'ai', legs: [{ from, to }], note }   (출발·도착 공항만, 시각은 사용자가 직접 입력)
// 환경 변수
//   AERODATABOX_KEY : RapidAPI의 AeroDataBox 키 (있으면 실제 운항 정보로 조회)
//   GEMINI_API_KEY  : 없을 때 AI(구글 검색 참고)로 추정
// 같은 조회는 Vercel CDN에 하루 동안 캐시돼 무료 한도를 아껴요.


function splitLocal(s) {
  const m = String(s || '').match(/(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
  return m ? { date: m[1], time: m[2] } : { date: '', time: '' };
}

async function fromAeroDataBox(code, date) {
  const base = 'https://aerodatabox.p.rapidapi.com/flights/number/' + encodeURIComponent(code);
  const url = (date ? `${base}/${date}` : base) + '?withAircraftImage=false&withLocation=false' + (date ? '&dateLocalRole=Departure' : '');
  const r = await fetch(url, {
    headers: { 'X-RapidAPI-Key': process.env.AERODATABOX_KEY, 'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com' },
  });
  if (r.status === 204 || r.status === 404) return { legs: [] };
  if (!r.ok) throw new Error(`운항 정보 조회 실패 (${r.status})`);
  const list = await r.json();
  const arr = Array.isArray(list) ? list : [list];
  const legs = arr
    .map((x) => {
      const d = splitLocal(x?.departure?.scheduledTime?.local || x?.departure?.scheduledTimeLocal);
      return { from: x?.departure?.airport?.iata || '', to: x?.arrival?.airport?.iata || '', date: d.date };
    })
    .filter((l) => l.from && l.to);
  // 같은 구간이 여러 번(코드셰어 등) 나오면 하나만
  const seen = new Set();
  return { legs: legs.filter((l) => (seen.has(l.from + l.to) ? false : seen.add(l.from + l.to))).map(({ from, to }) => ({ from, to })) };
}

async function gemini(prompt, grounded) {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const body = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0 } };
  if (grounded) body.tools = [{ google_search: {} }];
  else body.generationConfig.responseMimeType = 'application/json';
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify(body),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d?.error?.message || 'gemini error');
  const t = d?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('AI 응답을 읽지 못했어요.');
  return JSON.parse(t.slice(a, b + 1));
}

async function fromAI(airline, no, date) {
  const prompt = `항공편 ${airline}${no}${date ? `(${date} 운항)` : ''}의 출발·도착 공항을 알려줘. 현재 정기 스케줄 기준으로, 확실하지 않으면 지어내지 말고 found를 false로.
경유편(한 편명으로 여러 구간)이라면 legs에 구간을 순서대로 모두 넣어.
JSON 하나만 출력 (설명·코드펜스 금지):
{"found": true|false, "legs": [{"from": "ICN", "to": "LAX"}], "note": "한국어 한 줄"}`;
  let j;
  try {
    j = await gemini(prompt, true);
  } catch {
    j = await gemini(prompt, false);
  }
  const legs = (j?.found === false ? [] : j?.legs || [])
    .map((l) => ({ from: String(l.from || '').toUpperCase(), to: String(l.to || '').toUpperCase() }))
    .filter((l) => /^[A-Z]{3}$/.test(l.from) && /^[A-Z]{3}$/.test(l.to));
  return { legs, note: j?.note || '' };
}

export default async function handler(req, res) {
  const airline = String(req.query.airline || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 2);
  const no = String(req.query.no || '').replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 4);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(req.query.date || '') ? req.query.date : '';
  if (airline.length !== 2 || !no) return res.status(400).json({ error: '항공사와 편명을 넣어 주세요.' });
  try {
    if (process.env.AERODATABOX_KEY) {
      try {
        const r = await fromAeroDataBox(airline + no, date);
        if (r.legs.length || !process.env.GEMINI_API_KEY) {
          res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
          return res.status(200).json({ source: 'live', ...r });
        }
      } catch (e) {
        if (!process.env.GEMINI_API_KEY) throw e;
      }
    }
    if (process.env.GEMINI_API_KEY) {
      const r = await fromAI(airline, no, date);
      res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
      return res.status(200).json({ source: 'ai', ...r });
    }
    return res.status(501).json({ error: '조회 키가 설정되지 않았어요 (AERODATABOX_KEY 또는 GEMINI_API_KEY)' });
  } catch (e) {
    return res.status(502).json({ error: String(e?.message || e) });
  }
}

