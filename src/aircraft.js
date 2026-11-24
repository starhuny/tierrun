// 기종 목록·이름 정리 (Flighty 'Boeing 777-300 ER' → 'B777-300ER')
export const AIRCRAFT = [
  ['A220-100', 'A220'], ['A220-300', 'A220'], ['A319', 'A320 계열'], ['A320', 'A320 계열'], ['A320neo', 'A320 계열'], ['A321', 'A320 계열'], ['A321neo', 'A320 계열'],
  ['A330-200', 'A330'], ['A330-300', 'A330'], ['A330-900neo', 'A330'], ['A340-300', 'A340'], ['A340-600', 'A340'],
  ['A350-900', 'A350'], ['A350-1000', 'A350'], ['A380', 'A380'],
  ['B737-800', 'B737'], ['B737-900', 'B737'], ['B737-900ER', 'B737'], ['B737 MAX 8', 'B737 MAX'], ['B737 MAX 9', 'B737 MAX'],
  ['B747-400', 'B747'], ['B747-8', 'B747'], ['B757-200', 'B757'], ['B767-300ER', 'B767'],
  ['B777-200', 'B777'], ['B777-200ER', 'B777'], ['B777-300', 'B777'], ['B777-300ER', 'B777'], ['B777-9', 'B777X'],
  ['B787-8', 'B787'], ['B787-9', 'B787'], ['B787-10', 'B787'],
  ['E175', 'E-Jet'], ['E175-E2', 'E-Jet'], ['E190', 'E-Jet'], ['E190-E2', 'E-Jet'], ['E195-E2', 'E-Jet'],
  ['CRJ700', 'CRJ'], ['CRJ900', 'CRJ'], ['ATR 72', 'ATR'], ['Dash 8-400', 'Dash 8'], ['C919', 'COMAC'], ['ARJ21', 'COMAC'],
];
export const AIRCRAFT_NAMES = AIRCRAFT.map((a) => a[0]);

const keyOf = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/embraer\s*(?=\d)/g, 'e')
    .replace(/airbus|boeing|bombardier|comac|de havilland( canada)?|mitsubishi/g, '')
    .replace(/[^a-z0-9]/g, '')
    .replace(/^b(?=7\d7)/, '');
const BY_KEY = new Map(AIRCRAFT.map(([n, fam]) => [keyOf(n), { name: n, family: fam }]));
const ALIAS = { a380800: 'A380', a3808: 'A380', '7478i': 'B747-8', '7478': 'B747-8', b77w: 'B777-300ER', b789: 'B787-9', b78x: 'B787-10', b788: 'B787-8', a359: 'A350-900', a35k: 'A350-1000', a333: 'A330-300', a332: 'A330-200', a21n: 'A321neo', a20n: 'A320neo', b38m: 'B737 MAX 8', b39m: 'B737 MAX 9', b739: 'B737-900', b738: 'B737-800', b748: 'B747-8', a388: 'A380', bcs3: 'A220-300', e75l: 'E175' };

// 입력값을 보기 좋은 이름으로 (목록에 없으면 제조사 이름만 줄여서 그대로)
export function normAircraft(raw) {
  const s = String(raw || '').trim();
  if (!s) return '';
  const k = keyOf(s);
  const hit = BY_KEY.get(k) || (ALIAS[k] && BY_KEY.get(keyOf(ALIAS[k]))) || (ALIAS[s.toLowerCase()] && BY_KEY.get(keyOf(ALIAS[s.toLowerCase()])));
  if (hit) return hit.name;
  return s
    .replace(/^boeing\s*/i, 'B')
    .replace(/^airbus\s*/i, '')
    .replace(/^embraer\s*/i, 'E')
    .replace(/^bombardier\s*/i, '')
    .replace(/\s+ER$/i, 'ER')
    .replace(/\s{2,}/g, ' ');
}

export function aircraftFamily(name) {
  const n = normAircraft(name);
  if (!n) return '';
  const hit = BY_KEY.get(keyOf(n));
  if (hit) return hit.family;
  const m = n.match(/^(B7\d7|A3\d0|A2\d0|A3[48]0|E1\d\d)/i);
  return m ? m[1].toUpperCase() : n.split(/[-\s]/)[0];
}
