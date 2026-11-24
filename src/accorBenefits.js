// 아코르 ALL 등급별 혜택 (아코르 공식 '회원 등급별 제공 혜택' 페이지 기준, 2026년 11월 확인)
// from: 이 등급부터 / v: 등급별로 다른 내용
export const AC_BENEFITS_CHECKED = '2026.11';

export const AC_BENEFITS = [
  { t: '회원가', from: 'CLASSIC', d: 'ALL 회원 전용 할인 요금' },
  { t: '프리미엄 Wi-Fi', from: 'CLASSIC', d: '전 세계 호텔 고속 Wi-Fi' },
  { t: '헬스장·스포츠 시설', from: 'CLASSIC', d: '유료 시설이 있는 호텔에서 무료' },
  { t: '숙박 리워드 포인트 보너스', from: 'SILVER', v: { SILVER: '+24%', GOLD: '+48%', PLAT: '+76%', DIAMOND: '+100%' }, d: '클래식 대비 더 쌓이는 리워드 포인트' },
  { t: '웰컴 드링크', from: 'SILVER', d: '본인과 같은 객실 투숙객 · 앱의 디지털 바우처로 교환' },
  { t: '얼리 체크인·레이트 체크아웃', from: 'SILVER', v: { SILVER: '레이트 체크아웃', GOLD: '얼리 또는 레이트', PLAT: '얼리 + 레이트', DIAMOND: '얼리 + 레이트' }, d: '요청 시, 호텔 사정에 따라' },
  { t: '객실 보장', from: 'GOLD', v: { GOLD: '도착 3일 전 예약까지', PLAT: '도착 2일 전 예약까지', DIAMOND: '도착 2일 전 예약까지' }, d: '만실이어도 방을 보장 · 아다지오·리조트 일부는 7박 이상일 때만' },
  { t: '객실 업그레이드', from: 'GOLD', d: '체크인 때 가능하면 한 단계 위 객실 · ibis 계열·아다지오처럼 객실 타입이 하나인 호텔은 제외' },
  { t: '웰컴 어메니티', from: 'GOLD', d: 'ibis·ibis Styles·ibis budget·BreakFree·Adagio Access·greet·JO&JOE 제외' },
  { t: '라운지', from: 'PLAT', v: { PLAT: '라운지 있는 호텔', DIAMOND: '+ 페어몬트 골드 라운지' }, d: '객실 타입과 상관없이 · 같은 객실 투숙객 포함' },
  { t: '무료 조식', from: 'PLAT', v: { PLAT: '아시아·태평양 매일', DIAMOND: '전 세계 주말 + 아태 매일' }, d: '라운지가 있으면 라운지, 없으면 레스토랑 · 주말 조식은 직접 예약(앱·ALL.com·콜센터·호텔)일 때 · 조지아·카자흐스탄 제외' },
  { t: 'Suite Night Upgrade', from: 'PLAT', v: { PLAT: '2회', DIAMOND: '5회' }, d: '60박 또는 14,000P에 2회, 18,000P에 1회 추가, 그 뒤 4,000P마다 1회' },
  { t: '프리미엄 고객 서비스', from: 'PLAT', d: '24시간 전담 지원' },
  { t: '다이닝·스파 리워드', from: 'DIAMOND', d: '10유로 바우처 10장(약 100유로) · 호텔 리셉션에서 사용' },
  { t: '등급 선물', from: 'DIAMOND', d: '지정한 1명에게 골드 등급' },
  { t: '래플즈 24시간 집사', from: 'DIAMOND', d: '래플즈 모든 객실 타입에서' },
];

// 브랜드·제휴 부가 혜택 (더 보기)
export const AC_EXTRAS = [
  { t: '공항 라운지 할인', from: 'CLASSIC', v: { CLASSIC: '10%', SILVER: '13%', GOLD: '14%', PLAT: '15%', DIAMOND: '15%' } },
  { t: '렌터카 제휴 할인', from: 'CLASSIC', d: '최대 15%' },
  { t: 'Fairmont Fit 운동복·운동화 대여', from: 'SILVER', d: '실버부터 무료 (클래식은 유료)' },
  { t: '스위소텔 스파·스포츠 할인', from: 'GOLD', d: '호텔 직영 시설 20%' },
  { t: '래플즈 레스토랑 예약 보장', from: 'PLAT', d: '24시간 전 예약, 최대 4인' },
  { t: '풀만 다림질 서비스', from: 'PLAT', d: '투숙당 1벌' },
  { t: '머큐어 레스토랑·바 할인', from: 'PLAT', d: '최대 4인 10%' },
  { t: 'JO&JOE 서비스', from: 'PLAT', d: '개인실 침대 정리, 도미토리 수건 무료' },
];
