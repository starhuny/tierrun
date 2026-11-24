// 유로 환율: 하루에 한 번 /api/fx 에서 받아 기기에 저장 (한국 날짜 기준)
const KEY = 'tierrun:fx';
const kstDate = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);

export function cachedFx() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    return v?.rate > 0 ? v : null;
  } catch {
    return null;
  }
}

export async function dailyFx() {
  const c = cachedFx();
  if (c && c.day === kstDate()) return c;
  try {
    const r = await fetch('/api/fx');
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    if (!(j?.rate > 0)) throw new Error('no rate');
    const v = { rate: j.rate, date: j.date || '', source: j.source || '', day: kstDate() };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* 무시 */ }
    return v;
  } catch {
    return c; // 실패하면 마지막으로 받은 값
  }
}

// 실제로 쓸 환율: 직접 입력으로 고정했으면 그 값, 아니면 오늘 환율
export const effectiveEur = (prog, fx, fallback) => (prog?.eurAuto === false ? +prog.eur || fallback : fx?.rate || +prog?.eur || fallback);
