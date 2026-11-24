// 기종 목록·이름 정리 (Flighty 'Boeing 777-300 ER' → 'B777-300ER')
// [이름, 계열]
export const AIRCRAFT_GROUPS = [
  ['보잉', [
    ['B777-300ER', 'B777'], ['B777-300', 'B777'], ['B777-200ER', 'B777'], ['B777-200', 'B777'], ['B777-9', 'B777X'],
    ['B787-10', 'B787'], ['B787-9', 'B787'], ['B787-8', 'B787'],
    ['B767', 'B767'], ['B757', 'B757'], ['B747-8i', 'B747'], ['B747-400', 'B747'],
    ['B737-800', 'B737'], ['B737-900', 'B737'], ['B737-900ER', 'B737'], ['B737-700', 'B737'], ['B737 MAX8', 'B737 MAX'], ['B737 MAX9', 'B737 MAX'],
  ]],
  ['에어버스', [
    ['A380-800', 'A380'], ['A350-1000', 'A350'], ['A350-900', 'A350'],
    ['A330-900neo', 'A330'], ['A330-300', 'A330'], ['A330-200', 'A330'], ['A340-600', 'A340'], ['A340-300', 'A340'],
    ['A321neo', 'A320 계열'], ['A321ceo', 'A320 계열'], ['A320neo', 'A320 계열'], ['A320ceo', 'A320 계열'], ['A319', 'A320 계열'], ['A318', 'A320 계열'],
    ['A220-300', 'A220'], ['A220-100', 'A220'],
  ]],
  ['기타', [
    ['E175', 'E-Jet'], ['E175-E2', 'E-Jet'], ['E190', 'E-Jet'], ['E190-E2', 'E-Jet'], ['E195-E2', 'E-Jet'],
    ['CRJ900', 'CRJ'], ['CRJ700', 'CRJ'], ['ATR 72', 'ATR'], ['Dash 8-400', 'Dash 8'], ['C919', 'COMAC'], ['ARJ21', 'COMAC'],
  ]],
];
export const AIRCRAFT = AIRCRAFT_GROUPS.flatMap(([, list]) => list);
export const AIRCRAFT_NAMES = AIRCRAFT.map((a) => a[0]);

// 비교용 키: 제조사 이름·기호를 빼고, 앞의 A/B도 떼어 냄 ('A321ceo'·'321ceo' → '321ceo')
const keyOf = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/embraer\s*(?=\d)/g, 'e')
    .replace(/airbus|boeing|bombardier|comac|de havilland( canada)?|mitsubishi/g, '')
    .replace(/[^a-z0-9]/g, '')
    .replace(/^b(?=7\d7)/, '')
    .replace(/^a(?=[23]\d\d)/, '');
const BY_KEY = new Map(AIRCRAFT.map(([n, fam]) => [keyOf(n), { name: n, family: fam }]));
// 다른 표기 → 목록 이름
const ALIAS = {
  '321': 'A321ceo', '320': 'A320ceo', '380': 'A380-800', '380800': 'A380-800', '388': 'A380-800',
  '350': 'A350-900', '359': 'A350-900', '35k': 'A350-1000', '333': 'A330-300', '332': 'A330-200', '339': 'A330-900neo', '330900': 'A330-900neo',
  '21n': 'A321neo', '20n': 'A320neo', '220': 'A220-300', '220200': 'A220-300', '223': 'A220-300', bcs3: 'A220-300', bcs1: 'A220-100',
  '7478': 'B747-8i', '74781': 'B747-8i', '748': 'B747-8i', '744': 'B747-400',
  '767300er': 'B767', '767300': 'B767', '767200': 'B767', '767400': 'B767', '757200': 'B757', '757300': 'B757',
  '777300er': 'B777-300ER', b77w: 'B777-300ER', '77w': 'B777-300ER', '773': 'B777-300', '772': 'B777-200', '777200er': 'B777-200ER', '777200lr': 'B777-200ER', '7779': 'B777-9',
  '789': 'B787-9', '788': 'B787-8', '78x': 'B787-10',
  '737max8': 'B737 MAX8', '38m': 'B737 MAX8', b38m: 'B737 MAX8', '737max9': 'B737 MAX9', '39m': 'B737 MAX9', b39m: 'B737 MAX9',
  '738': 'B737-800', '739': 'B737-900', '73j': 'B737-900ER', '737900er': 'B737-900ER',
  e75l: 'E175', e175e2: 'E175-E2', e190e2: 'E190-E2', e195e2: 'E195-E2', crj9: 'CRJ900',
};

// 입력값을 목록 이름으로 (목록에 없으면 제조사 이름만 줄여서 그대로)
export function normAircraft(raw) {
  const s = String(raw || '').trim();
  if (!s) return '';
  const k = keyOf(s);
  const hit = BY_KEY.get(k) || (ALIAS[k] && BY_KEY.get(keyOf(ALIAS[k])));
  if (hit) return hit.name;
  return s
    .replace(/^boeing\s*/i, 'B')
    .replace(/^airbus\s*/i, '')
    .replace(/^embraer\s*/i, 'E')
    .replace(/^bombardier\s*/i, '')
    .replace(/\s+ER$/i, 'ER')
    .replace(/\s{2,}/g, ' ');
}
export const isKnownAircraft = (name) => BY_KEY.has(keyOf(name)) && BY_KEY.get(keyOf(name)).name === name;

export function aircraftFamily(name) {
  const n = normAircraft(name);
  if (!n) return '';
  const hit = BY_KEY.get(keyOf(n));
  if (hit) return hit.family;
  const m = n.match(/^(B7\d7|A3\d0|A2\d0|E1\d\d)/i);
  return m ? m[1].toUpperCase() : n.split(/[-\s]/)[0];
}

// 많이 탄 기종 순위 (탑승 완료 기준)
export function aircraftTop(flights, today, n = 3) {
  const m = new Map();
  for (const f of flights) {
    if (!f.aircraft || f.date >= today) continue;
    const a = normAircraft(f.aircraft);
    m.set(a, (m.get(a) || 0) + 1);
  }
  const all = [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return { top: all.slice(0, n).map(([name, count]) => ({ name, count })), types: all.length };
}
