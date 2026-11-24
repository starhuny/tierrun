// Flighty 앱에서 내보낸 CSV(FlightyExport-YYYY-MM-DD.csv) 읽기
// 대한항공·스카이팀·아시아나 항공편만 골라 티어런 항공편으로 바꿈 (적립률은 모두 100%)
import { baseMilesFor, defaultCredit, uid } from './core.js';
import { normAircraft } from './aircraft.js';

// Flighty는 항공사를 ICAO 3자리로 적음 → IATA 2자리
export const ICAO_TO_IATA = {
  KAL: 'KE', // 대한항공
  AAR: 'OZ', // 아시아나항공
  // 스카이팀
  DAL: 'DL', AFR: 'AF', KLM: 'KL', VIR: 'VS', SAS: 'SK', HVN: 'VN', CAL: 'CI', CES: 'MU', CXA: 'MF',
  GIA: 'GA', AMX: 'AM', ARG: 'AR', AEA: 'UX', KQA: 'KQ', MEA: 'ME', SVA: 'SV', ROT: 'RO',
};
export const GROUP_LABEL = { KE: '대한항공', ST: '스카이팀', OZ: '아시아나' };
const CABIN_MAP = { ECONOMY: 'Y', PREMIUM_ECONOMY: 'W', BUSINESS: 'C', FIRST: 'F' };

// 따옴표 안 줄바꿈·쉼표까지 처리하는 CSV 파서
export function parseCSV(text) {
  const rows = [];
  let row = [], cur = '', q = false;
  const s = String(text || '').replace(/^﻿/, '');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '"') {
        if (s[i + 1] === '"') { cur += '"'; i++; } else q = false;
      } else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && s[i + 1] === '\n') i++;
      row.push(cur); cur = '';
      if (row.some((v) => v !== '')) rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur !== '' || row.length) { row.push(cur); if (row.some((v) => v !== '')) rows.push(row); }
  return rows;
}

const part = (s) => {
  const m = String(s || '').match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  return m ? { date: m[1], time: m[2] } : null;
};
const dayDiff = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

// → { rows: [{ key, group, flight, dup }], total, skipped: { other, canceled } } | throws
export function readFlighty(text, existing = []) {
  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error('CSV에 항공편이 없어요.');
  const head = rows[0].map((h) => h.trim());
  const col = (name) => head.indexOf(name);
  const need = ['Date', 'Airline', 'Flight', 'From', 'To'];
  if (need.some((n) => col(n) < 0)) throw new Error('Flighty에서 내보낸 CSV가 아닌 것 같아요. (Date·Airline·Flight·From·To 열이 없어요)');
  const C = {
    date: col('Date'), airline: col('Airline'), no: col('Flight'), from: col('From'), to: col('To'), canceled: col('Canceled'),
    dep: col('Gate Departure (Scheduled)'), arr: col('Gate Arrival (Scheduled)'), cabin: col('Cabin Class'), seat: col('Seat'),
    aircraft: col('Aircraft Type Name'), reg: col('Tail Number'),
  };
  const have = new Map(existing.map((f) => [`${String(f.airline).toUpperCase()}|${String(f.flightNo).replace(/^0+/, '')}|${f.date}`, f]));
  const out = [];
  let other = 0, canceled = 0;
  for (const r of rows.slice(1)) {
    const icao = (r[C.airline] || '').trim().toUpperCase();
    const code = ICAO_TO_IATA[icao] || (icao.length === 2 && ['KE', 'OZ'].includes(icao) ? icao : null);
    if (!code) { other++; continue; }
    if (C.canceled >= 0 && String(r[C.canceled]).trim().toLowerCase() === 'true') { canceled++; continue; }
    const date = (r[C.date] || '').trim();
    const from = (r[C.from] || '').trim().toUpperCase();
    const to = (r[C.to] || '').trim().toUpperCase();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !from || !to) { other++; continue; }
    const flightNo = String(r[C.no] || '').trim().replace(/^0+(?=\d)/, '');
    const d = part(r[C.dep]), a = part(r[C.arr]);
    const b = baseMilesFor(code, from, to);
    const id = uid();
    const flight = {
      id, tripId: id, airline: code, flightNo, date,
      dep: d?.time || '', arr: a?.time || '', arrOffset: d && a ? Math.max(-1, Math.min(2, dayDiff(d.date, a.date))) : 0,
      from, to, cls: '', cabin: CABIN_MAP[(r[C.cabin] || '').trim()] || 'Y', rate: 100,
      baseMiles: b.miles ?? null, baseSource: b.source ?? null, milesOverride: null,
      credit: defaultCredit(code), price: null, note: '', importedFrom: 'flighty',
      aircraft: C.aircraft >= 0 ? normAircraft(r[C.aircraft]) : '', reg: C.reg >= 0 ? String(r[C.reg] || '').trim().toUpperCase() : '',
    };
    const group = code === 'KE' ? 'KE' : code === 'OZ' ? 'OZ' : 'ST';
    const old = have.get(`${code}|${flightNo}|${date}`);
    // 이미 있는 항공편인데 기종이 비어 있으면 채워 줄 수 있게
    const patch = old && ((!old.aircraft && flight.aircraft) || (!old.reg && flight.reg)) ? { id: old.id, aircraft: old.aircraft || flight.aircraft, reg: old.reg || flight.reg } : null;
    out.push({ key: id, group, flight, dup: !!old, patch });
  }
  out.sort((x, y) => (x.flight.date + x.flight.dep).localeCompare(y.flight.date + y.flight.dep));
  return { rows: out, total: rows.length - 1, skipped: { other, canceled } };
}
