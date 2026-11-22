// AI 자동 채우기
//  - 아티팩트: Claude (sample 기능)
//  - 배포 버전: /api/ai 서버 함수 (Gemini 또는 Claude API 키 필요)
import { AIRLINES } from './skypass.js';

let samplePromise = null;
async function getSample() {
  if (!window.claude?.use) {
    if (import.meta.env.VITE_TARGET !== 'artifact') return null;
    const t0 = Date.now();
    while (!window.claude?.use && Date.now() - t0 < 3000) await new Promise((r) => setTimeout(r, 50));
    if (!window.claude?.use) return null;
  }
  if (!samplePromise) samplePromise = Promise.race([window.claude.use('sample'), new Promise((r) => setTimeout(() => r(null), 10000))]);
  return samplePromise;
}

export async function aiAvailable() {
  if (window.claude?.use || import.meta.env.VITE_TARGET === 'artifact') return !!(await getSample());
  return import.meta.env.VITE_AI_ENDPOINT !== 'off';
}

const SCHEMA = `{
  "tripType": "oneway" | "round" | "multi",
  "totalPrice": number | null,          // 원화 총액. 외화면 원화로 환산하지 말고 null, currencyNote에 적기
  "currencyNote": string | null,
  "segments": [{
    "airline": "KE",                    // 판매(편명) 항공사 IATA 2자리 코드
    "flightNo": "41",                   // 숫자 부분만
    "date": "YYYY-MM-DD",
    "from": "ICN", "to": "SEA",         // IATA 공항 코드
    "dep": "HH:MM" | null, "arr": "HH:MM" | null, "arrOffset": 0,
    "bookingClass": "Q" | null,
    "earnRate": number | null,          // 스카이패스 적립률(%)
    "distanceMiles": number | null,     // 스카이패스 구간 마일(편도, 100% 기준) 추정
    "credit": "KE" | "ST" | "OT" | "NONE",
    "confidence": "high" | "medium" | "low",
    "note": string                      // 한국어 한 줄 근거
  }],
  "notes": string                       // 사용자에게 보여줄 한국어 한두 문장
}`;

function buildPrompt({ text, segments, today }) {
  const airlineList = AIRLINES.map((a) => `${a.code} ${a.name} (${a.credit})`).join(', ');
  return `너는 대한항공 스카이패스 마일리지 계산을 돕는 도우미야. 아래 입력을 읽고 항공편 구간을 채워서 JSON 하나만 출력해. 설명 문장, 코드펜스 금지.

오늘 날짜: ${today}  (연도가 없는 날짜는 오늘 이후 가장 가까운 날짜로)

규칙
- 구간 마일은 스카이패스 기준 편도 운항 거리(마일). 대한항공 운항편은 대한항공 '구간별 적립 마일리지' 값, 그 외는 대권거리(마일)를 정수로.
- 대한항공(KE 편명) 예약 등급 적립률(2025.9.17 이후): 국제선 F 200, A 0, J 135, C/D/I/R 125, Z 100, O 0, V 110, W/P 100, N 0, Y/B/M/S/H/E/K/L/U 100, G 80, Q/T 70, X 0. 국내선 C/D 125, Z 100, Y/B/M/S/H/E 100, G 80, Q/T 70, K/L/W/U/X/V 0.
- 스카이팀 제휴 항공사 탑승을 스카이패스로 적립할 때의 적립률은 항공사·예약 등급별로 다름. 아는 범위에서 추정하고 confidence를 낮게 표시.
- credit: KE=대한항공 편명, ST=스카이팀 항공사, OT=스카이패스 적립 가능한 기타 제휴 항공사, NONE=적립 불가(저비용항공 등).
- 항공사 참고: ${airlineList}
- 모르는 값은 null. 지어내지 말 것. 편명만 있고 노선을 모르면 from/to를 null로 두고 note에 적기.
- 왕복/다구간 항공권 총액이 보이면 totalPrice(원)에 넣기.

출력 형식
${SCHEMA}

입력 텍스트:
"""${text || '(없음)'}"""

현재 입력된 구간(빈 칸을 채워줘):
${JSON.stringify(segments || [], null, 0)}`;
}

function extractJSON(s) {
  if (s && typeof s === 'object') return s;
  const t = String(s || '');
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('AI 응답을 읽지 못했어요.');
  return JSON.parse(t.slice(a, b + 1));
}

export async function aiFill({ text, segments, today }) {
  const prompt = buildPrompt({ text, segments, today });
  const sample = await getSample();
  if (sample) {
    try {
      if (typeof sample.json === 'function') return extractJSON(await sample.json(prompt, { modelTier: 'default' }));
      const r = await sample(prompt, { modelTier: 'default' });
      return extractJSON(r.text);
    } catch (e) {
      if (e?.code === 'not_granted') throw new Error('AI 사용 권한이 허용되지 않았어요.');
      if (e?.code === 'rate_limited') throw new Error('요청이 많아요. 잠시 후 다시 시도해 주세요.');
      throw new Error(e?.message || 'AI 요청에 실패했어요.');
    }
  }
  if (import.meta.env.VITE_TARGET === 'artifact') throw new Error('이 화면에서는 AI를 사용할 수 없어요.');
  const endpoint = import.meta.env.VITE_AI_ENDPOINT || '/api/ai';
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
  if (!res.ok) throw new Error(res.status === 404 ? 'AI 서버 함수(/api/ai)가 배포되지 않았어요.' : 'AI 요청에 실패했어요.');
  const data = await res.json();
  return extractJSON(data.json ?? data.text ?? data);
}
