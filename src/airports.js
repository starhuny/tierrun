import { WORLD_RAW } from './airports-world.js';

// 공항 데이터: 코드|도시(한글)|공항명(한글)|도시(영문)|국가|위도|경도
// 좌표는 대권거리(추정 마일) 계산과 지도 표시에 사용됩니다.
const RAW = `
ICN|인천|인천국제공항|Seoul Incheon|KR|37.4602|126.4407
GMP|김포|김포국제공항|Seoul Gimpo|KR|37.5583|126.7906
PUS|부산|김해국제공항|Busan|KR|35.1795|128.9382
CJU|제주|제주국제공항|Jeju|KR|33.5113|126.4930
TAE|대구|대구국제공항|Daegu|KR|35.8941|128.6589
CJJ|청주|청주국제공항|Cheongju|KR|36.7166|127.4991
KWJ|광주|광주공항|Gwangju|KR|35.1264|126.8089
RSU|여수|여수공항|Yeosu|KR|34.8423|127.6169
USN|울산|울산공항|Ulsan|KR|35.5935|129.3517
HIN|사천|사천공항|Sacheon Jinju|KR|35.0886|128.0703
KPO|포항|포항경주공항|Pohang|KR|35.9879|129.4204
KUV|군산|군산공항|Gunsan|KR|35.9038|126.6158
WJU|원주|원주공항|Wonju|KR|37.4381|127.9604
MWX|무안|무안국제공항|Muan|KR|34.9914|126.3828
YNY|양양|양양국제공항|Yangyang|KR|38.0613|128.6692
NRT|도쿄|나리타국제공항|Tokyo Narita|JP|35.7720|140.3929
HND|도쿄|하네다공항|Tokyo Haneda|JP|35.5494|139.7798
KIX|오사카|간사이국제공항|Osaka Kansai|JP|34.4320|135.2304
ITM|오사카|이타미공항|Osaka Itami|JP|34.7855|135.4382
UKB|고베|고베공항|Kobe|JP|34.6328|135.2239
NGO|나고야|주부국제공항|Nagoya|JP|34.8584|136.8054
FUK|후쿠오카|후쿠오카공항|Fukuoka|JP|33.5859|130.4510
CTS|삿포로|신치토세공항|Sapporo|JP|42.7752|141.6923
OKA|오키나와|나하공항|Okinawa Naha|JP|26.1958|127.6459
KOJ|가고시마|가고시마공항|Kagoshima|JP|31.8034|130.7194
KMJ|구마모토|구마모토공항|Kumamoto|JP|32.8373|130.8550
NGS|나가사키|나가사키공항|Nagasaki|JP|32.9169|129.9136
OIT|오이타|오이타공항|Oita|JP|33.4794|131.7372
OKJ|오카야마|오카야마공항|Okayama|JP|34.7569|133.8553
HIJ|히로시마|히로시마공항|Hiroshima|JP|34.4361|132.9194
KMQ|고마쓰|고마쓰공항|Komatsu|JP|36.3946|136.4065
KIJ|니가타|니가타공항|Niigata|JP|37.9559|139.1206
AOJ|아오모리|아오모리공항|Aomori|JP|40.7347|140.6908
AKJ|아사히카와|아사히카와공항|Asahikawa|JP|43.6708|142.4475
SDJ|센다이|센다이공항|Sendai|JP|38.1397|140.9170
KMI|미야자키|미야자키공항|Miyazaki|JP|31.8772|131.4486
TAK|다카마쓰|다카마쓰공항|Takamatsu|JP|34.2142|134.0156
MYJ|마쓰야마|마쓰야마공항|Matsuyama|JP|33.8272|132.6997
FSZ|시즈오카|시즈오카공항|Shizuoka|JP|34.7960|138.1894
PEK|베이징|서우두국제공항|Beijing Capital|CN|40.0801|116.5846
PKX|베이징|다싱국제공항|Beijing Daxing|CN|39.5098|116.4105
PVG|상하이|푸둥국제공항|Shanghai Pudong|CN|31.1443|121.8083
SHA|상하이|훙차오국제공항|Shanghai Hongqiao|CN|31.1979|121.3363
CAN|광저우|바이윈국제공항|Guangzhou|CN|23.3924|113.2988
SZX|선전|바오안국제공항|Shenzhen|CN|22.6393|113.8107
HKG|홍콩|홍콩국제공항|Hong Kong|HK|22.3080|113.9185
MFM|마카오|마카오국제공항|Macau|MO|22.1496|113.5916
TPE|타이베이|타오위안국제공항|Taipei Taoyuan|TW|25.0777|121.2328
TSA|타이베이|쑹산공항|Taipei Songshan|TW|25.0694|121.5525
RMQ|타이중|타이중국제공항|Taichung|TW|24.2647|120.6208
KHH|가오슝|가오슝국제공항|Kaohsiung|TW|22.5771|120.3500
DLC|다롄|저우수이쯔국제공항|Dalian|CN|38.9657|121.5386
SHE|선양|타오셴국제공항|Shenyang|CN|41.6398|123.4833
TAO|칭다오|자오둥국제공항|Qingdao|CN|36.3661|120.0880
YNT|옌타이|펑라이국제공항|Yantai|CN|37.6572|120.9872
WEH|웨이하이|웨이하이공항|Weihai|CN|37.1871|122.2290
TSN|톈진|빈하이국제공항|Tianjin|CN|39.1244|117.3462
NKG|난징|루커우국제공항|Nanjing|CN|31.7420|118.8620
HGH|항저우|샤오산국제공항|Hangzhou|CN|30.2295|120.4344
XMN|샤먼|가오치국제공항|Xiamen|CN|24.5440|118.1277
FOC|푸저우|창러국제공항|Fuzhou|CN|25.9351|119.6633
WUH|우한|톈허국제공항|Wuhan|CN|30.7838|114.2081
CSX|창사|황화국제공항|Changsha|CN|28.1892|113.2196
DYG|장자제|허화국제공항|Zhangjiajie|CN|29.1028|110.4430
XIY|시안|셴양국제공항|Xi'an|CN|34.4471|108.7516
CTU|청두|솽류국제공항|Chengdu Shuangliu|CN|30.5785|103.9471
TFU|청두|톈푸국제공항|Chengdu Tianfu|CN|30.3197|104.4450
CKG|충칭|장베이국제공항|Chongqing|CN|29.7192|106.6417
KMG|쿤밍|창수이국제공항|Kunming|CN|25.1019|102.9292
NNG|난닝|우쉬국제공항|Nanning|CN|22.6083|108.1722
CGO|정저우|신정국제공항|Zhengzhou|CN|34.5197|113.8409
TNA|지난|야오창국제공항|Jinan|CN|36.8572|117.2161
HFE|허페이|신차오국제공항|Hefei|CN|31.9878|116.9769
TXN|황산|툰시국제공항|Huangshan|CN|29.7333|118.2556
URC|우루무치|디워푸국제공항|Urumqi|CN|43.9071|87.4742
YNJ|옌지|차오양촨국제공항|Yanji|CN|42.8828|129.4513
MDG|무단장|하이랑국제공항|Mudanjiang|CN|44.5241|129.5689
HRB|하얼빈|타이핑국제공항|Harbin|CN|45.6234|126.2503
CGQ|창춘|룽자국제공항|Changchun|CN|43.9962|125.6850
SYX|싼야|펑황국제공항|Sanya|CN|18.3029|109.4122
HAK|하이커우|메이란국제공항|Haikou|CN|19.9349|110.4590
UBN|울란바토르|칭기스칸국제공항|Ulaanbaatar|MN|47.6467|106.8197
VVO|블라디보스토크|블라디보스토크국제공항|Vladivostok|RU|43.3990|132.1480
IKT|이르쿠츠크|이르쿠츠크국제공항|Irkutsk|RU|52.2680|104.3889
BKK|방콕|수완나품국제공항|Bangkok Suvarnabhumi|TH|13.6900|100.7501
DMK|방콕|돈므앙국제공항|Bangkok Don Mueang|TH|13.9126|100.6068
HKT|푸껫|푸껫국제공항|Phuket|TH|8.1132|98.3169
CNX|치앙마이|치앙마이국제공항|Chiang Mai|TH|18.7668|98.9626
SGN|호찌민|떤선녓국제공항|Ho Chi Minh City|VN|10.8188|106.6520
HAN|하노이|노이바이국제공항|Hanoi|VN|21.2212|105.8072
DAD|다낭|다낭국제공항|Da Nang|VN|16.0439|108.1992
CXR|나트랑|깜라인국제공항|Nha Trang|VN|11.9982|109.2194
DLI|달랏|리엔크엉공항|Da Lat|VN|11.7500|108.3670
PQC|푸꾸옥|푸꾸옥국제공항|Phu Quoc|VN|10.1698|103.9931
MNL|마닐라|니노이아키노국제공항|Manila|PH|14.5086|121.0194
CEB|세부|막탄세부국제공항|Cebu|PH|10.3075|123.9794
CRK|클락|클락국제공항|Clark|PH|15.1860|120.5600
KLO|보라카이|칼리보국제공항|Kalibo Boracay|PH|11.6794|122.3763
BKI|코타키나발루|코타키나발루국제공항|Kota Kinabalu|MY|5.9372|116.0510
KUL|쿠알라룸푸르|쿠알라룸푸르국제공항|Kuala Lumpur|MY|2.7456|101.7099
SIN|싱가포르|창이국제공항|Singapore|SG|1.3644|103.9915
CGK|자카르타|수카르노하타국제공항|Jakarta|ID|-6.1256|106.6559
DPS|발리|응우라라이국제공항|Bali Denpasar|ID|-8.7482|115.1670
PNH|프놈펜|프놈펜국제공항|Phnom Penh|KH|11.5466|104.8441
KTI|프놈펜|테초국제공항|Phnom Penh Techo|KH|11.3580|104.9200
REP|시엠립|시엠립국제공항|Siem Reap|KH|13.4107|103.8130
VTE|비엔티안|왓따이국제공항|Vientiane|LA|17.9883|102.5633
RGN|양곤|양곤국제공항|Yangon|MM|16.9073|96.1332
GUM|괌|괌국제공항|Guam|GU|13.4834|144.7960
SPN|사이판|사이판국제공항|Saipan|MP|15.1190|145.7290
ROR|팔라우|팔라우국제공항|Palau|PW|7.3673|134.5443
BWN|브루나이|브루나이국제공항|Brunei|BN|4.9442|114.9283
DEL|델리|인디라간디국제공항|Delhi|IN|28.5562|77.1000
BOM|뭄바이|뭄바이국제공항|Mumbai|IN|19.0896|72.8656
CMB|콜롬보|반다라나이케국제공항|Colombo|LK|7.1808|79.8841
MLE|말레|벨레나국제공항|Male|MV|4.1918|73.5291
KTM|카트만두|트리부반국제공항|Kathmandu|NP|27.6966|85.3591
TAS|타슈켄트|타슈켄트국제공항|Tashkent|UZ|41.2579|69.2812
ALA|알마티|알마티국제공항|Almaty|KZ|43.3521|77.0405
NQZ|아스타나|아스타나국제공항|Astana|KZ|51.0222|71.4669
DXB|두바이|두바이국제공항|Dubai|AE|25.2532|55.3657
AUH|아부다비|자이드국제공항|Abu Dhabi|AE|24.4330|54.6511
DOH|도하|하마드국제공항|Doha|QA|25.2731|51.6081
RUH|리야드|킹칼리드국제공항|Riyadh|SA|24.9576|46.6988
JED|제다|킹압둘아지즈국제공항|Jeddah|SA|21.6796|39.1565
TLV|텔아비브|벤구리온국제공항|Tel Aviv|IL|32.0114|34.8867
BEY|베이루트|베이루트국제공항|Beirut|LB|33.8209|35.4884
IST|이스탄불|이스탄불공항|Istanbul|TR|41.2753|28.7519
CAI|카이로|카이로국제공항|Cairo|EG|30.1219|31.4056
LHR|런던|히드로공항|London Heathrow|GB|51.4700|-0.4543
LGW|런던|개트윅공항|London Gatwick|GB|51.1537|-0.1821
MAN|맨체스터|맨체스터공항|Manchester|GB|53.3537|-2.2750
EDI|에든버러|에든버러공항|Edinburgh|GB|55.9500|-3.3725
DUB|더블린|더블린공항|Dublin|IE|53.4213|-6.2701
CDG|파리|샤를드골공항|Paris CDG|FR|49.0097|2.5479
ORY|파리|오를리공항|Paris Orly|FR|48.7262|2.3652
NCE|니스|니스코트다쥐르공항|Nice|FR|43.6584|7.2159
LYS|리옹|리옹생텍쥐페리공항|Lyon|FR|45.7256|5.0811
AMS|암스테르담|스히폴공항|Amsterdam|NL|52.3105|4.7683
BRU|브뤼셀|브뤼셀공항|Brussels|BE|50.9010|4.4844
FRA|프랑크푸르트|프랑크푸르트공항|Frankfurt|DE|50.0379|8.5622
MUC|뮌헨|뮌헨공항|Munich|DE|48.3538|11.7861
BER|베를린|베를린브란덴부르크공항|Berlin|DE|52.3667|13.5033
ZRH|취리히|취리히공항|Zurich|CH|47.4582|8.5555
GVA|제네바|제네바공항|Geneva|CH|46.2381|6.1090
VIE|비엔나|빈국제공항|Vienna|AT|48.1103|16.5697
PRG|프라하|바츨라프하벨공항|Prague|CZ|50.1008|14.2600
BUD|부다페스트|부다페스트공항|Budapest|HU|47.4369|19.2556
ZAG|자그레브|자그레브공항|Zagreb|HR|45.7429|16.0688
FCO|로마|피우미치노공항|Rome|IT|41.8003|12.2389
MXP|밀라노|말펜사공항|Milan|IT|45.6306|8.7281
VCE|베네치아|마르코폴로공항|Venice|IT|45.5053|12.3519
NAP|나폴리|나폴리공항|Naples|IT|40.8860|14.2908
MAD|마드리드|바라하스공항|Madrid|ES|40.4983|-3.5676
BCN|바르셀로나|엘프라트공항|Barcelona|ES|41.2974|2.0833
LIS|리스본|리스본공항|Lisbon|PT|38.7742|-9.1342
ATH|아테네|아테네국제공항|Athens|GR|37.9364|23.9445
CPH|코펜하겐|카스트루프공항|Copenhagen|DK|55.6180|12.6508
ARN|스톡홀름|알란다공항|Stockholm|SE|59.6519|17.9186
OSL|오슬로|가르데르모엔공항|Oslo|NO|60.1976|11.1004
HEL|헬싱키|반타공항|Helsinki|FI|60.3172|24.9633
WAW|바르샤바|쇼팽공항|Warsaw|PL|52.1657|20.9671
OTP|부쿠레슈티|앙리코안더공항|Bucharest|RO|44.5711|26.0850
SVO|모스크바|셰레메티예보공항|Moscow|RU|55.9726|37.4146
LED|상트페테르부르크|풀코보공항|St Petersburg|RU|59.8003|30.2625
LAX|로스앤젤레스|로스앤젤레스국제공항|Los Angeles|US|33.9416|-118.4085
SFO|샌프란시스코|샌프란시스코국제공항|San Francisco|US|37.6213|-122.3790
SJC|산호세|산호세국제공항|San Jose|US|37.3639|-121.9289
SEA|시애틀|시애틀타코마국제공항|Seattle|US|47.4502|-122.3088
PDX|포틀랜드|포틀랜드국제공항|Portland|US|45.5898|-122.5951
LAS|라스베이거스|해리리드국제공항|Las Vegas|US|36.0840|-115.1537
SAN|샌디에이고|샌디에이고국제공항|San Diego|US|32.7338|-117.1933
PHX|피닉스|스카이하버국제공항|Phoenix|US|33.4342|-112.0116
SLC|솔트레이크시티|솔트레이크시티국제공항|Salt Lake City|US|40.7899|-111.9791
DEN|덴버|덴버국제공항|Denver|US|39.8561|-104.6737
DFW|댈러스|댈러스포트워스국제공항|Dallas|US|32.8998|-97.0403
IAH|휴스턴|조지부시국제공항|Houston|US|29.9902|-95.3368
AUS|오스틴|오스틴버그스트롬국제공항|Austin|US|30.1975|-97.6664
MSP|미니애폴리스|미니애폴리스국제공항|Minneapolis|US|44.8848|-93.2223
ORD|시카고|오헤어국제공항|Chicago|US|41.9742|-87.9073
DTW|디트로이트|디트로이트메트로공항|Detroit|US|42.2162|-83.3554
ATL|애틀랜타|하츠필드잭슨국제공항|Atlanta|US|33.6407|-84.4277
MSY|뉴올리언스|루이암스트롱국제공항|New Orleans|US|29.9934|-90.2580
BNA|내슈빌|내슈빌국제공항|Nashville|US|36.1263|-86.6774
CLT|샬럿|샬럿더글러스국제공항|Charlotte|US|35.2144|-80.9473
RDU|롤리|롤리더럼국제공항|Raleigh Durham|US|35.8801|-78.7880
MCO|올랜도|올랜도국제공항|Orlando|US|28.4312|-81.3081
TPA|탬파|탬파국제공항|Tampa|US|27.9755|-82.5332
MIA|마이애미|마이애미국제공항|Miami|US|25.7959|-80.2870
FLL|포트로더데일|포트로더데일국제공항|Fort Lauderdale|US|26.0742|-80.1506
JFK|뉴욕|존F케네디국제공항|New York JFK|US|40.6413|-73.7781
EWR|뉴욕|뉴어크리버티국제공항|New York Newark|US|40.6895|-74.1745
LGA|뉴욕|라과디아공항|New York LaGuardia|US|40.7769|-73.8740
BOS|보스턴|로건국제공항|Boston|US|42.3656|-71.0096
PHL|필라델피아|필라델피아국제공항|Philadelphia|US|39.8744|-75.2424
IAD|워싱턴|덜레스국제공항|Washington Dulles|US|38.9531|-77.4565
DCA|워싱턴|레이건내셔널공항|Washington Reagan|US|38.8512|-77.0402
HNL|호놀룰루|대니얼K이노우에국제공항|Honolulu|US|21.3187|-157.9225
OGG|마우이|카훌루이공항|Maui|US|20.8986|-156.4305
KOA|코나|코나국제공항|Kona|US|19.7388|-156.0456
ANC|앵커리지|앵커리지국제공항|Anchorage|US|61.1743|-149.9962
YVR|밴쿠버|밴쿠버국제공항|Vancouver|CA|49.1967|-123.1815
YYC|캘거리|캘거리국제공항|Calgary|CA|51.1215|-114.0076
YYZ|토론토|피어슨국제공항|Toronto|CA|43.6777|-79.6248
YUL|몬트리올|트뤼도국제공항|Montreal|CA|45.4706|-73.7408
MEX|멕시코시티|멕시코시티국제공항|Mexico City|MX|19.4363|-99.0721
CUN|칸쿤|칸쿤국제공항|Cancun|MX|21.0365|-86.8771
BOG|보고타|엘도라도국제공항|Bogota|CO|4.7016|-74.1469
LIM|리마|호르헤차베스국제공항|Lima|PE|-12.0219|-77.1143
GRU|상파울루|과룰류스국제공항|Sao Paulo|BR|-23.4356|-46.4731
EZE|부에노스아이레스|에세이사국제공항|Buenos Aires|AR|-34.8222|-58.5358
SCL|산티아고|산티아고국제공항|Santiago|CL|-33.3930|-70.7858
SYD|시드니|킹스퍼드스미스공항|Sydney|AU|-33.9399|151.1753
MEL|멜버른|멜버른공항|Melbourne|AU|-37.6690|144.8410
BNE|브리즈번|브리즈번공항|Brisbane|AU|-27.3842|153.1175
PER|퍼스|퍼스공항|Perth|AU|-31.9385|115.9672
CNS|케언스|케언스공항|Cairns|AU|-16.8858|145.7553
AKL|오클랜드|오클랜드공항|Auckland|NZ|-37.0082|174.7850
NAN|난디|난디국제공항|Nadi|FJ|-17.7554|177.4434
NBO|나이로비|조모케냐타국제공항|Nairobi|KE|-1.3192|36.9278
ADD|아디스아바바|볼레국제공항|Addis Ababa|ET|8.9779|38.7993
JNB|요하네스버그|탐보국제공항|Johannesburg|ZA|-26.1392|28.2460
CMN|카사블랑카|무함마드5세국제공항|Casablanca|MA|33.3675|-7.5899
`;

const parse = (raw) => raw.trim().split('\n').map((line) => {
  const [code, city, name, en, country, lat, lon] = line.split('|');
  return { code, city, name, en, country, lat: +lat, lon: +lon };
});
// 자주 쓰는 공항(한글 공항명) + 나머지 세계 공항
export const AIRPORTS = [...parse(RAW), ...parse(WORLD_RAW)];

export const AIRPORT = Object.fromEntries(AIRPORTS.map((a) => [a.code, a]));

export function findAirport(code) {
  return code ? AIRPORT[String(code).toUpperCase()] || null : null;
}

// 한글/영문/코드 검색
export function searchAirports(q, limit = 8) {
  const s = String(q || '').trim().toLowerCase();
  if (!s) return [];
  const scored = [];
  for (const a of AIRPORTS) {
    const code = a.code.toLowerCase();
    let score = 0;
    if (code === s) score = 100;
    else if (code.startsWith(s)) score = 80;
    else if (a.city.startsWith(q.trim())) score = 70;
    else if (a.city.includes(q.trim()) || a.name.includes(q.trim())) score = 50;
    else if (a.en.toLowerCase().startsWith(s)) score = 45;
    else if (a.en.toLowerCase().includes(s)) score = 30;
    if (score) scored.push([score + (a.country === 'KR' ? 2 : 0), a]);
  }
  return scored.sort((x, y) => y[0] - x[0]).slice(0, limit).map((x) => x[1]);
}
