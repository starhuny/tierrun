// 스카이패스 기준 데이터
// - 구간별 적립 마일리지: 대한항공 홈페이지 '구간별 적립 마일리지' (일반석 편도, 적립률 100% 기준)
//   대한항공이 직접 운항하는 정기편에 적용. 표에 없는 구간은 대권거리로 추정합니다.
// - 예약 등급별 적립률: 탑승일 기준 2025년 9월 17일 이후 표

// [출발 그룹, 도착 그룹, 마일]  그룹 안의 '|'는 같은 도시의 여러 공항
const SEL = 'ICN|GMP';
const TYO = 'NRT|HND';
const OSA = 'KIX|ITM';
const SHA = 'PVG|SHA';
const BJS = 'PEK|PKX';
const PNH = 'PNH|KTI';

const TABLE = [
  // 국내선
  [SEL, 'PUS', 215], [SEL, 'CJU', 276], ['GMP', 'RSU', 194], ['GMP', 'USN', 203], ['GMP', 'HIN', 188],
  ['GMP', 'KPO', 188], ['ICN', 'TAE', 159], ['CJU', 'PUS', 186], ['CJU', 'CJJ', 227], ['CJU', 'TAE', 203],
  ['CJU', 'KUV', 164], ['CJU', 'KWJ', 111], ['CJU', 'HIN', 139], ['CJU', 'USN', 214], ['CJU', 'WJU', 282],
  ['CJU', 'RSU', 109], ['CJU', 'KPO', 235],
  // 일본
  ['ICN', 'KOJ', 459], ['ICN', 'KMQ', 547], ['ICN', 'UKB', 525], ['ICN', 'KMJ', 402], ['ICN', 'NGS', 369],
  ['ICN', 'NGO', 598], ['ICN', 'KIJ', 684], ['ICN', 'CTS', 870], ['ICN', 'AOJ', 791], ['ICN', 'AKJ', 931],
  ['ICN', 'OIT', 401], ['ICN', 'OKJ', 457], ['ICN', 'OKA', 785], ['ICN', 'FUK', 347], ['ICN', 'HIJ', 412],
  [SEL, OSA, 525], [SEL, TYO, 758], ['PUS', TYO, 618], ['PUS', 'NGO', 435], ['PUS', 'CTS', 854],
  ['PUS', OSA, 352], ['PUS', 'FUK', 133], ['CJU', TYO, 784], ['CJU', OSA, 507],
  // 중국/동북아시아
  ['ICN', 'CAN', 1269], ['ICN', 'NNG', 1487], ['ICN', 'NKG', 586], ['ICN', 'DLC', 293], ['ICN', 'MFM', 1311],
  ['ICN', 'MDG', 512], ['ICN', 'VVO', 476], [SEL, SHA, 525], ['ICN', 'XMN', 1032], ['ICN', 'SHE', 338],
  ['ICN', 'SZX', 1281], ['ICN', 'XIY', 1020], ['ICN', 'YNJ', 386], ['ICN', 'URC', 2097], ['ICN', 'WUH', 855],
  ['ICN', 'UBN', 1230], ['ICN', 'WEH', 249], ['ICN', 'IKT', 1484], ['ICN', 'DYG', 1098], ['ICN', 'CGO', 744],
  ['ICN', 'TNA', 539], ['ICN', 'CSX', 1019], ['ICN', 'TAO', 370], ['ICN', 'KMG', 1633], ['ICN', 'TPE', 914],
  ['ICN', 'RMQ', 982], ['ICN', 'TSN', 515], ['ICN', 'FOC', 903], ['ICN', 'HGH', 617], ['ICN', 'HFE', 667],
  ['ICN', 'HKG', 1295], ['ICN', 'TXN', 721], [SEL, BJS, 568], ['PUS', BJS, 765], ['PUS', 'NKG', 634],
  ['PUS', SHA, 518], ['PUS', 'TPE', 837], ['PUS', 'TAO', 515], ['PUS', 'HKG', 1278], ['CJU', BJS, 712],
  ['CJJ', 'HGH', 609], ['TAE', 'SHE', 492],
  // 동남아시아/괌
  ['ICN', 'GUM', 2003], ['ICN', 'CXR', 2053], ['ICN', 'DAD', 1861], ['ICN', 'DLI', 2109], ['ICN', 'DPS', 3282],
  ['ICN', 'DMK', 2286], ['ICN', 'BKK', 2286], ['ICN', 'MNL', 1627], ['ICN', 'CEB', 1887], ['ICN', 'SIN', 2883],
  ['ICN', 'RGN', 2335], ['ICN', 'CGK', 3281], ['ICN', 'CNX', 2109], ['ICN', 'KUL', 2867], ['ICN', 'CRK', 1587],
  ['ICN', 'ROR', 2141], ['ICN', 'HKT', 2693], ['ICN', 'PQC', 2341], ['ICN', PNH, 2244], ['ICN', 'HAN', 1678],
  ['ICN', 'SGN', 2223], ['PUS', 'BKK', 2304], ['PUS', 'GUM', 1789], ['PUS', 'DAD', 1849], [OSA, 'GUM', 1577],
  // 서남아시아/중앙아시아
  ['ICN', 'DEL', 2900], ['ICN', 'MLE', 4078], ['ICN', 'BOM', 3457], ['ICN', 'CMB', 3594], ['ICN', 'KTM', 2474],
  ['ICN', 'TAS', 3013], ['CMB', 'MLE', 484],
  // 북미
  ['ICN', 'JFK|EWR', 6879], ['ICN', 'DFW', 6824], ['ICN', 'LAS', 6009], ['ICN', 'LAX', 5973], ['ICN', 'YVR', 5088],
  ['ICN', 'SFO', 5636], ['ICN', 'SEA', 5196], ['ICN', 'ORD', 6538], ['ICN', 'ATL', 7132], ['ICN', 'IAD', 6944],
  ['ICN', 'YYZ', 6601], ['ICN', 'HNL', 4560], [TYO, 'HNL', 3831], ['ICN', 'BOS', 6808],
  // 유럽/중동
  ['ICN', 'DXB', 4203], ['ICN', 'LHR', 5646], ['ICN', 'FCO', 5579], ['ICN', 'LIS', 6522], ['ICN', 'MAD', 6227],
  ['ICN', 'SVO', 4096], ['ICN', 'MXP', 5509], ['ICN', 'BCN', 5974], ['ICN', 'BUD', 5066], ['ICN', 'VIE', 5131],
  ['ICN', 'LED', 4226], ['ICN', 'AMS', 5439], ['ICN', 'IST', 5180], ['ICN', 'ZAG', 5256], ['ICN', 'ZRH', 5456],
  ['ICN', 'TLV', 5003], ['ICN', 'CDG', 5626], ['ICN', 'PRG', 5134], ['ICN', 'FRA', 5360],
  // 대양주
  ['ICN', 'NAN', 5048], ['ICN', 'MEL', 5336], ['ICN', 'BNE', 4804], ['ICN', 'SYD', 5184], ['ICN', 'AKL', 5998],
];

export const KE_ROUTE_MILES = (() => {
  const m = new Map();
  for (const [a, b, mi] of TABLE) {
    for (const x of a.split('|')) for (const y of b.split('|')) {
      m.set(`${x}-${y}`, mi);
      m.set(`${y}-${x}`, mi);
    }
  }
  return m;
})();

// 대한항공 예약 등급별 적립률 (%)  — 탑승일 2025.9.17 이후
export const KE_CLASS_RATES = {
  intl: {
    F: 200, A: 0,
    J: 135, C: 125, D: 125, I: 125, R: 125, Z: 100, O: 0,
    V: 110, W: 100, P: 100, N: 0,
    Y: 100, B: 100, M: 100, S: 100, H: 100, E: 100, K: 100, L: 100, U: 100,
    G: 80, Q: 70, T: 70, X: 0,
  },
  dom: {
    C: 125, D: 125, Z: 100, O: 0,
    Y: 100, B: 100, M: 100, S: 100, H: 100, E: 100,
    G: 80, Q: 70, T: 70,
    K: 0, L: 0, W: 0, U: 0, X: 0, V: 0,
  },
};

export const KE_CABIN = {
  F: '일등석', A: '일등석',
  J: '프레스티지', C: '프레스티지', D: '프레스티지', I: '프레스티지', R: '프레스티지', Z: '프레스티지', O: '프레스티지',
  V: '프리미엄', W: '프리미엄', P: '프리미엄', N: '프리미엄',
};

// 슬라이더 고정 눈금 (그 외 값은 직접 입력)
export const RATE_STOPS = [10, 20, 25, 30, 50, 70, 80, 100, 110, 125, 130];

// 실적 구분
export const CREDIT = {
  KE: { label: '대한항공', short: '대한항공', desc: '대한항공 편명 · 탑승 횟수 포인트 적립' },
  ST: { label: '스카이팀', short: '스카이팀', desc: '셀렉트·프리미엄·밀리언 마일러에 합산' },
  OT: { label: '기타 제휴', short: '제휴', desc: '모닝캄 자격의 제휴사 실적에만 합산' },
  NONE: { label: '미반영', short: '미반영', desc: '스카이패스 등급 실적에 넣지 않음' },
};

// 항공사 (마크 색은 구분용)
export const AIRLINES = [
  { code: 'KE', name: '대한항공', credit: 'KE', color: '#0c3d91' },
  { code: 'DL', name: '델타항공', credit: 'ST', color: '#b3002d' },
  { code: 'AF', name: '에어프랑스', credit: 'ST', color: '#002157' },
  { code: 'KL', name: 'KLM 네덜란드항공', credit: 'ST', color: '#00a1de' },
  { code: 'VS', name: '버진애틀랜틱', credit: 'ST', color: '#c4002f' },
  { code: 'SK', name: '스칸디나비아항공', credit: 'ST', color: '#000c5c' },
  { code: 'VN', name: '베트남항공', credit: 'ST', color: '#00616d' },
  { code: 'CI', name: '중화항공', credit: 'ST', color: '#c2457a' },
  { code: 'MU', name: '중국동방항공', credit: 'ST', color: '#a1123a' },
  { code: 'MF', name: '샤먼항공', credit: 'ST', color: '#145aa6' },
  { code: 'GA', name: '가루다인도네시아', credit: 'ST', color: '#006b7d' },
  { code: 'AM', name: '아에로멕시코', credit: 'ST', color: '#0b2343' },
  { code: 'AR', name: '아르헨티나항공', credit: 'ST', color: '#2280c6' },
  { code: 'UX', name: '에어유로파', credit: 'ST', color: '#123b84' },
  { code: 'KQ', name: '케냐항공', credit: 'ST', color: '#b5121b' },
  { code: 'ME', name: '미들이스트항공', credit: 'ST', color: '#00733a' },
  { code: 'SV', name: '사우디아', credit: 'ST', color: '#0b6b4f' },
  { code: 'RO', name: '타롬', credit: 'ST', color: '#0a3c7d' },
  { code: 'OZ', name: '아시아나항공', credit: 'OT', color: '#8b1f2d' },
  { code: 'CZ', name: '중국남방항공', credit: 'OT', color: '#0b6db5' },
  { code: 'EY', name: '에티하드항공', credit: 'OT', color: '#a37d2c' },
  { code: 'AA', name: '아메리칸항공', credit: 'OT', color: '#36495a' },
  { code: 'LJ', name: '진에어', credit: 'NONE', color: '#5b7f1d' },
  { code: '7C', name: '제주항공', credit: 'NONE', color: '#e2570f' },
  { code: 'TW', name: '티웨이항공', credit: 'NONE', color: '#c8102e' },
  { code: 'BX', name: '에어부산', credit: 'NONE', color: '#1666b0' },
  { code: 'RS', name: '에어서울', credit: 'NONE', color: '#2aa7a0' },
];
export const AIRLINE = Object.fromEntries(AIRLINES.map((a) => [a.code, a]));

// 등급
export const TIERS = [
  { id: 'SKYPASS', name: '스카이패스', en: 'SKYPASS', bg: 'linear-gradient(135deg,#d8ecfa 0%,#eaf4fc 46%,#f4dde8 100%)', ink: '#0c1d55', accent: '#6fb6e6' },
  { id: 'MC', name: '모닝캄', en: 'Morning Calm', bg: 'linear-gradient(135deg,#f3f4f6 0%,#dfe2e7 55%,#c9cdd4 100%)', ink: '#0c1d55', accent: '#9aa1ad' },
  { id: 'MCS', name: '모닝캄 셀렉트', en: 'Morning Calm Select', bg: 'linear-gradient(135deg,#9a9da3 0%,#76797f 55%,#5d6066 100%)', ink: '#ffffff', accent: '#6b6e74' },
  { id: 'MCP', name: '모닝캄 프리미엄', en: 'Morning Calm Premium', bg: 'linear-gradient(135deg,#d8bd8f 0%,#bf9b66 55%,#a27f4d 100%)', ink: '#2b1d07', accent: '#b8915c' },
  { id: 'MM', name: '밀리언 마일러', en: 'Million Miler', bg: 'linear-gradient(135deg,#3a3b40 0%,#1f2024 55%,#0f0f12 100%)', ink: '#ffffff', accent: '#2a2b30' },
];
export const TIER = Object.fromEntries(TIERS.map((t) => [t.id, t]));

// 등급 기준 (설정에서 바꿀 수 있음)
export const DEFAULT_RULES = {
  mcQualify: { total: 50000, keMin: 30000, points: 80 },
  mcRetain: { total: 30000, keMin: 20000, total2: 30000, points2: 30, points3: 40 },
  select: { miles: 100000, points: 140 },
  selectRetain: { miles: 100000, points: 140 },
  premium: { miles: 500000 },
  million: { miles: 1000000 },
};
