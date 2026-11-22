// Vercel 서버 함수: POST /api/ai  { prompt } → { json }
// 환경 변수: GEMINI_API_KEY (권장, Google AI Studio에서 발급) 또는 ANTHROPIC_API_KEY
// 선택: GEMINI_MODEL (기본 gemini-2.5-flash), ANTHROPIC_MODEL (기본 claude-haiku-5-5)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { prompt } = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (!prompt || prompt.length > 20000) return res.status(400).json({ error: 'bad prompt' });
  try {
    if (process.env.GEMINI_API_KEY) {
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.1 },
        }),
      });
      const d = await r.json();
      if (!r.ok) return res.status(502).json({ error: d?.error?.message || 'gemini error' });
      const text = d?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
      return res.status(200).json({ json: text });
    }
    if (process.env.ANTHROPIC_API_KEY) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] }),
      });
      const d = await r.json();
      if (!r.ok) return res.status(502).json({ error: d?.error?.message || 'anthropic error' });
      return res.status(200).json({ json: d?.content?.map((c) => c.text || '').join('') || '' });
    }
    return res.status(501).json({ error: 'AI 키가 설정되지 않았어요 (GEMINI_API_KEY 또는 ANTHROPIC_API_KEY)' });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
