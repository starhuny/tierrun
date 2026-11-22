import { addDays, uid, baseMilesFor, defaultCredit, keClassRate } from './core.js';

// 예시 데이터 (오늘 날짜 기준으로 앞뒤에 배치)
export function sampleState(today) {
  const trips = {};
  const flights = [];
  const trip = (priceMode, price, kind, segs) => {
    const id = uid();
    trips[id] = { id, kind, priceMode, price };
    for (const s of segs) {
      const b = baseMilesFor(s.airline, s.from, s.to);
      const rate = s.rate ?? (s.airline === 'KE' ? keClassRate(s.cls, s.from, s.to) ?? 100 : 100);
      flights.push({
        id: uid(), tripId: id, airline: s.airline, flightNo: s.no, date: addDays(today, s.d), dep: s.dep || '', arr: s.arr || '', arrOffset: s.off || 0,
        from: s.from, to: s.to, cls: s.cls || '', rate, baseMiles: b.miles, baseSource: b.source, milesOverride: null,
        credit: defaultCredit(s.airline), price: s.price ?? null, note: '',
      });
    }
  };
  trip('total', 489000, 'round', [
    { airline: 'KE', no: '651', from: 'ICN', to: 'BKK', d: -41, dep: '09:05', arr: '13:05', cls: 'Q' },
    { airline: 'KE', no: '652', from: 'BKK', to: 'ICN', d: -41, dep: '14:35', arr: '22:15', cls: 'Q' },
  ]);
  trip('total', 168000, 'round', [
    { airline: 'KE', no: '1203', from: 'GMP', to: 'CJU', d: -12, dep: '07:00', arr: '08:10', cls: 'B' },
    { airline: 'KE', no: '1240', from: 'CJU', to: 'GMP', d: -12, dep: '11:00', arr: '12:10', cls: 'B' },
  ]);
  trip('each', null, 'oneway', [{ airline: 'KE', no: '1105', from: 'GMP', to: 'PUS', d: 29, dep: '15:05', arr: '16:10', cls: 'H', price: 79000 }]);
  trip('total', 1680000, 'multi', [
    { airline: 'KE', no: '41', from: 'ICN', to: 'SEA', d: 43, dep: '16:10', arr: '09:05', cls: 'Q' },
    { airline: 'DL', no: '2949', from: 'SEA', to: 'LAS', d: 44, dep: '20:25', arr: '22:58', rate: 100 },
    { airline: 'DL', no: '1771', from: 'LAS', to: 'LAX', d: 49, dep: '19:10', arr: '20:25', rate: 100 },
    { airline: 'KE', no: '12', from: 'LAX', to: 'ICN', d: 50, dep: '22:00', arr: '04:00', off: 2, cls: 'Q' },
  ]);
  trip('total', 712000, 'round', [
    { airline: 'KE', no: '895', from: 'ICN', to: 'PVG', d: 64, dep: '08:30', arr: '09:35', cls: 'M' },
    { airline: 'KE', no: '896', from: 'PVG', to: 'ICN', d: 66, dep: '11:00', arr: '13:55', cls: 'M' },
  ]);
  const start = addDays(today, -190);
  const end = (() => {
    const d = new Date(+start.slice(0, 4) + 2, +start.slice(5, 7), 0);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();
  const profile = {
    name: '',
    tier: 'MC',
    periodStart: start,
    periodEnd: end,
    baseDate: addDays(today, -60),
    base: { perKE: 18240, perST: 0, perOT: 0, perPts: 10, lifeKE: 61200, lifeST: 0, lifeOT: 0, lifePts: 0 },
    sample: true,
  };
  return { profile, flights, trips };
}
