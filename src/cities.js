// 세계 도시 검색 (숙박 위치용). 데이터가 커서 숙박 화면을 열 때만 불러옴
let CITIES = null;
let loading = null;

export function loadCities() {
  if (CITIES) return Promise.resolve(CITIES);
  if (!loading) {
    loading = import('./cities-data.js').then(({ CITIES_RAW }) => {
      CITIES = CITIES_RAW.trim().split('\n').map((l) => {
        const [ko, en, cc, lat, lon, pop] = l.split('|');
        return { ko, en, cc, lat: +lat, lon: +lon, pop: +pop };
      });
      return CITIES;
    });
  }
  return loading;
}

// 한글·영문 검색, 인구 많은 순
export function searchCities(list, q, limit = 8) {
  const s = String(q || '').trim();
  if (!s || !list) return [];
  const l = s.toLowerCase();
  const out = [];
  for (const c of list) {
    let score = 0;
    if (c.ko === s || c.en.toLowerCase() === l) score = 100;
    else if (c.ko.startsWith(s) || c.en.toLowerCase().startsWith(l)) score = 70;
    else if (c.ko.includes(s) || c.en.toLowerCase().includes(l)) score = 40;
    if (score) out.push([score + Math.log10(c.pop + 10), c]);
    if (out.length > 400) break;
  }
  return out.sort((a, b) => b[0] - a[0]).slice(0, limit).map((x) => x[1]);
}
