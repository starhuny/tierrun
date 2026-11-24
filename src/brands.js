// 아코르 브랜드 알아보기 (호텔 이름 → 브랜드). 서버 함수(api/hotels.js)에서도 씀 — 다른 import 없이 둘 것
// 순서가 중요: 긴(구체적인) 이름이 먼저
export const BRAND_PATTERNS = [
  ['Sofitel Legend', /sofitel legend|소피텔 레전드/i],
  ['Grand Mercure', /grand mercure|그랜드 ?머큐어/i],
  ['ibis Styles', /ibis ?styles|이비스 ?스타일/i],
  ['ibis budget', /ibis ?budget|이비스 ?버짓/i],
  ['Adagio Access', /adagio access/i],
  ['Mama Shelter', /mama ?shelter|마마 ?[셸쉘]터/i],
  ['Orient Express', /orient express/i],
  ['Banyan Tree', /banyan ?tree|반얀 ?트리/i],
  ['Art Series', /art series/i],
  ['The Hoxton', /hoxton|혹스턴/i],
  ['25hours', /25 ?hours/i],
  ['Jo&Joe', /jo ?(&|and) ?joe/i],
  ['Raffles', /raffles|래플[즈스]/i],
  ['Fairmont', /fairmont|페어몬트/i],
  ['Sofitel', /sofitel|소피텔/i],
  ['MGallery', /\bm ?gallery|엠 ?갤러리/i],
  ['Pullman', /pullman|풀만/i],
  ['Swissôtel', /swiss[oô]tel|스위스?텔|스위소텔/i],
  ['Mövenpick', /m[oö]e?venpick|[뫼모]벤픽/i],
  ['Mondrian', /mondrian|몬드리안/i],
  ['Angsana', /angsana|앙사나/i],
  ['Emblems', /emblems/i],
  ['Mantis', /\bmantis\b/i],
  ['Delano', /\bdelano\b/i],
  ['SLS', /\bsls\b/i],
  ['SO/', /(^|\s)so\/|^so sofitel/i],
  ['Rixos', /rixos|릭소스/i],
  ['Faena', /\bfaena\b/i],
  ['Handwritten', /handwritten/i],
  ['Novotel', /novotel|노보텔/i],
  ['Mercure', /mercure|머큐어/i],
  ['ibis', /\bibis\b|이비스/i],
  ['Mantra', /\bmantra\b/i],
  ['Peppers', /\bpeppers\b/i],
  ['BreakFree', /break ?free/i],
  ['Adagio', /adagio|아다지오/i],
  ['Hyde', /^hyde\b/i],
  ['Tribe', /^tribe\b/i],
  ['greet', /^greet\b/i],
];

export function detectBrand(...names) {
  for (const n of names) {
    if (!n) continue;
    for (const [b, re] of BRAND_PATTERNS) if (re.test(n)) return b;
  }
  return null;
}
