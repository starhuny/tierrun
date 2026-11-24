// 세계 공항 (OurAirports 공개 데이터, 정기편이 있는 대형·중형 공항)
// 코드|도시(한글이 있으면 한글)|공항명|도시(영문)|국가|위도|경도 — airports.js 목록에 없는 공항만
export const WORLD_RAW = `
AAA|Anaa|Anaa Airport|Anaa|PF|-17.3526|-145.5100
AAC|El Arish|El Arish International Airport|El Arish|EG|31.0553|33.8280
AAE|Annaba|Annaba Rabah Bitat Airport|Annaba|DZ|36.8268|7.8133
AAL|올보르|Aalborg Airport|Aalborg|DK|57.0948|9.8499
AAN|알아인|Al Ain International Airport|Al Ain|AE|24.2617|55.6092
AAP|Samarinda|Aji Pangeran Tumenggung Pranoto International Airport|Samarinda|ID|-0.3745|117.2501
AAR|오르후스|Aarhus Airport|Aarhus|DK|56.3033|10.6183
AAT|Altay|Altay Xuedu Airport|Altay|CN|47.7499|88.0858
AAX|Araxá|Romeu Zema Airport|Araxá|BR|-19.5632|-46.9604
AAY|Al Ghaydah|Al Ghaydah International Airport|Al Ghaydah|YE|16.1933|52.1742
ABA|Abakan|Abakan International Airport|Abakan|RU|53.7400|91.3850
ABB|Asaba|Asaba International Airport|Asaba|NG|6.2042|6.6653
ABD|Abadan|Abadan Ayatollah Jami International Airport|Abadan|IR|30.3679|48.2301
ABE|Allentown|Lehigh Valley International Airport|Allentown|US|40.6518|-75.4428
ABI|Abilene|Abilene Regional Airport|Abilene|US|32.4113|-99.6819
ABJ|아비장|Félix-Houphouët-Boigny International Airport|Abidjan|CI|5.2614|-3.9263
ABK|Kebri Dahar|Kebri Dahar Airport|Kebri Dahar|ET|6.7326|44.2413
ABL|Ambler|Ambler Airport|Ambler|US|67.1055|-157.8553
ABQ|앨버커키|Albuquerque International Sunport|Albuquerque|US|35.0400|-106.6089
ABR|Aberdeen|Aberdeen Regional Airport|Aberdeen|US|45.4491|-98.4218
ABS|Abu Simbel|Abu Simbel Airport|Abu Simbel|EG|22.3759|31.6117
ABT|Al-Baha|King Saud Bin Abdulaziz (Al Baha) Airport|Al-Baha|SA|20.2985|41.6362
ABV|아부자|Nnamdi Azikiwe International Airport|Abuja|NG|9.0068|7.2632
ABX|East Albury|Albury Airport|East Albury|AU|-36.0668|146.9591
ABY|Albany|Southwest Georgia Regional Airport|Albany|US|31.5329|-84.1962
ABZ|애버딘|Aberdeen International Airport|Aberdeen|GB|57.2019|-2.1978
ACA|Acapulco|General Juan N. Álvarez International Airport|Acapulco|MX|16.7571|-99.7531
ACC|아크라|Kotoka International Airport|Accra|GH|5.6052|-0.1668
ACE|란사로테|César Manrique-Lanzarote Airport|San Bartolomé|ES|28.9455|-13.6052
ACH|St. Gallen|Sankt Gallen Altenrhein Airport|St. Gallen|CH|47.4850|9.5608
ACI|Saint Anne|Alderney Airport|Saint Anne|GG|49.7061|-2.2147
ACK|Nantucket|Nantucket Memorial Airport|Nantucket|US|41.2531|-70.0602
ACT|Waco|Waco Regional Airport|Waco|US|31.6113|-97.2305
ACV|Arcata|California Redwood Coast-Humboldt County Airport|Arcata|US|40.9781|-124.1090
ACX|Xingyi|Xingyi Wanfenglin Airport|Xingyi|CN|25.0834|104.9608
ACY|Atlantic City|Atlantic City International Airport|Atlantic City|US|39.4562|-74.5775
ADB|이즈미르|Adnan Menderes International Airport|Gaziemir|TR|38.2924|27.1570
ADE|아덴|Aden International Airport|Aden|YE|12.8296|45.0300
ADF|Adıyaman|Adıyaman Airport|Adıyaman|TR|37.7314|38.4689
ADJ|암만|Marka International (Amman Civil) Airport|Amman|JO|31.9727|35.9916
ADK|Adak|Adak Airport|Adak|US|51.8836|-176.6428
ADL|애들레이드|Adelaide International Airport|Adelaide|AU|-34.9475|138.5334
ADQ|Kodiak|Kodiak Airport|Kodiak|US|57.7500|-152.4940
ADU|Ardabil|Ardabil Airport|Ardabil|IR|38.3257|48.4244
ADZ|San Andrés|Gustavo Rojas Pinilla International Airport|San Andrés|CO|12.5836|-81.7112
AEB|Baise|Baise (Bose) Bama Airport|Baise|CN|23.7206|106.9600
AEP|부에노스아이레스 아에로파르케|Aeroparque Jorge Newbery|Buenos Aires|AR|-34.5594|-58.4155
AER|소치|Sochi International Airport|Sochi|RU|43.4499|39.9566
AES|Ålesund|Ålesund Airport|Ålesund|NO|62.5604|6.1108
AEU|Abu Musa|Abu Musa Island Airport|Abu Musa|IR|25.8757|55.0330
AEX|Alexandria|Alexandria International Airport|Alexandria|US|31.3258|-92.5467
AEY|Akureyri|Akureyri International Airport|Akureyri|IS|65.6566|-18.0720
AFA|San Rafael|Suboficial Ay Santiago Germano Airport|San Rafael|AR|-34.5883|-68.4039
AFL|Alta Floresta|Piloto Osvaldo Marques Dias Airport|Alta Floresta|BR|-9.8664|-56.1063
AFZ|Sabzevar|Sabzevar National Airport|Sabzevar|IR|36.1681|57.5952
AGA|아가디르|Al Massira Airport|Agadir|MA|30.3225|-9.4120
AGH|Ängelholm|Ängelholm-Helsingborg Airport|Ängelholm|SE|56.2961|12.8471
AGP|말라가|Málaga-Costa del Sol Airport|Málaga|ES|36.6782|-4.5002
AGR|Agra|Agra Airport / Agra Air Force Station|Agra|IN|27.1580|77.9610
AGS|Augusta|Augusta Regional At Bush Field|Augusta|US|33.3699|-81.9645
AGT|Ciudad del Este|Guaraní International Airport|Ciudad del Este|PY|-25.4555|-54.8436
AGU|Aguascalientes|Aguascalientes International Airport|Aguascalientes|MX|21.6996|-102.3184
AGX|Agatti|Agatti Airport|Agatti|IN|10.8237|72.1760
AHA|Ambikapur|Maa Mahamaya Airport|Ambikapur|IN|22.9875|83.1961
AHB|아브하|Abha International Airport|Abha|SA|18.2404|42.6566
AHE|Ahe Atoll|Ahe Airport|Ahe Atoll|PF|-14.4281|-146.2570
AHO|Alghero|Alghero-Fertilia Airport|Alghero|IT|40.6321|8.2908
AHU|Al Hoceima|Cherif Al Idrissi Airport|Al Hoceima|MA|35.1771|-3.8395
AIA|Alliance|Alliance Municipal Airport|Alliance|US|42.0525|-102.8040
AIN|Wainwright|Wainwright Airport|Wainwright|US|70.6380|-159.9950
AJA|Ajaccio|Ajaccio Napoléon Bonaparte airport|Ajaccio|FR|41.9236|8.8029
AJF|Al-Jawf|Al-Jawf International Airport|Al-Jawf|SA|29.7833|40.1009
AJI|Ağrı|Ağrı Airport|Ağrı|TR|39.6556|43.0257
AJL|Aizawl|Lengpui Airport|Aizawl|IN|23.8406|92.6197
AJN|Ouani|Ouani Airport|Ouani|KM|-12.1310|44.4300
AJR|Arvidsjaur|Arvidsjaur Airport|Arvidsjaur|SE|65.5903|19.2819
AJU|Aracaju|Aracaju - Santa Maria Airport|Aracaju|BR|-10.9839|-37.0729
AKF|Kufra|Kufra Airport|Kufra|LY|24.1787|23.3140
AKN|King Salmon|King Salmon Airport|King Salmon|US|58.6778|-156.6520
AKP|Anaktuvuk Pass|Anaktuvuk Pass Airport|Anaktuvuk Pass|US|68.1336|-151.7430
AKR|Akure|Akure Airport|Akure|NG|7.2467|5.3010
AKU|Aksu|Aksu Hongqipo Airport|Aksu|CN|41.2625|80.2917
AKX|Aktobe|Aktobe International Airport|Aktobe|KZ|50.2481|57.2041
AKY|Sittwe|Sittwe Airport|Sittwe|MM|20.1332|92.8707
ALB|올버니|Albany International Airport|Albany|US|42.7483|-73.8017
ALC|알리칸테|Alicante-Elche Miguel Hernández Airport|Alicante|ES|38.2822|-0.5582
ALF|Alta|Alta Airport|Alta|NO|69.9761|23.3717
ALG|알제|Houari Boumediene Airport|Algiers|DZ|36.6939|3.2145
ALH|Albany|Albany Airport|Albany|AU|-34.9433|117.8089
ALO|Waterloo|Waterloo Regional Airport|Waterloo|US|42.5571|-92.4003
ALP|Aleppo|Aleppo International Airport|Aleppo|SY|36.1813|37.2269
ALS|Alamosa|San Luis Valley Regional Airport/Bergman Field|Alamosa|US|37.4349|-105.8670
ALW|Walla Walla|Walla Walla Regional Airport|Walla Walla|US|46.0949|-118.2880
AMA|Amarillo|Rick Husband Amarillo International Airport|Amarillo|US|35.2179|-101.7064
AMD|아마다바드|Sardar Vallabh Patel International Airport|Ahmedabad|IN|23.0772|72.6347
AMH|Arba Minch|Arba Minch Airport|Arba Minch|ET|6.0394|37.5905
AMM|암만|Queen Alia International Airport|Amman|JO|31.7226|35.9932
AMQ|Ambon|Pattimura International Airport|Ambon|ID|-3.7103|128.0890
AMV|Amderma|Amderma Airport|Amderma|RU|69.7637|61.5567
ANF|Antofagasta|Andrés Sabella Gálvez International Airport|Antofagasta|CL|-23.4453|-70.4452
ANI|Aniak|Aniak Airport|Aniak|US|61.5816|-159.5430
ANR|Antwerp|Antwerp International Airport (Deurne)|Antwerp|BE|51.1907|4.4632
ANU|Osbourn|V. C. Bird International Airport|Osbourn|AG|17.1367|-61.7927
ANV|Anvik|Anvik Airport|Anvik|US|62.6467|-160.1910
ANX|Andenes|Andøya Airport, Andenes|Andenes|NO|69.2952|16.1394
AOE|Eskişehir|Hasan Polatkan Airport|Eskişehir|TR|39.8116|30.5193
AOG|Anshan|Anshan Teng'ao Airport / Anshan Air Base|Anshan|CN|41.1053|122.8540
AOI|Falconara Marittima|Marche Airport|Falconara Marittima|IT|43.6163|13.3623
AOK|Karpathos Island|Karpathos Airport|Karpathos Island|GR|35.4214|27.1460
AOO|Altoona|Altoona Blair County Airport|Altoona|US|40.2964|-78.3200
AOR|Alor Satar|Sultan Abdul Halim Airport|Alor Satar|MY|6.1897|100.3980
APL|Nampula|Nampula Airport|Nampula|MZ|-15.1056|39.2818
APN|Alpena|Alpena County Regional Airport|Alpena|US|45.0781|-83.5603
APO|Carepa|Antonio Roldán Betancur Airport|Carepa|CO|7.8120|-76.7164
APW|아피아|Faleolo International Airport|Apia|WS|-13.8300|-172.0080
AQA|Araraquara|Araraquara Airport|Araraquara|BR|-21.8120|-48.1330
AQG|Anqing|Anqing Tianzhushan Airport / Anqing North Air Base|Anqing|CN|30.5822|117.0500
AQI|Qaisumah|Qaisumah–Hafar Al-Batin International Airport|Qaisumah|SA|28.3357|46.1271
AQJ|아카바|King Hussein International Airport|Aqaba|JO|29.6116|35.0181
AQP|Arequipa|Rodríguez Ballón International Airport|Arequipa|PE|-16.3408|-71.5695
ARC|Arctic Village|Arctic Village Airport|Arctic Village|US|68.1147|-145.5790
ARH|Archangelsk|Talagi Airport|Archangelsk|RU|64.6003|40.7167
ARI|Arica|Chacalluta International Airport|Arica|CL|-18.3485|-70.3387
ARK|Arusha|Arusha Airport|Arusha|TZ|-3.3678|36.6333
ARM|Armidale|Armidale Airport|Armidale|AU|-30.5281|151.6170
ART|Watertown|Watertown International Airport|Watertown|US|43.9919|-76.0217
ARU|Araçatuba|Araçatuba Airport|Araçatuba|BR|-21.1415|-50.4246
ARW|Arad|Arad International Airport|Arad|RO|46.1761|21.2643
ASB|아시가바트|Ashgabat International Airport|Ashgabat|TM|37.9868|58.3610
ASD|Andros Town|Andros Town Airport|Andros Town|BS|24.6979|-77.7956
ASE|Aspen|Aspen-Pitkin County Airport (Sardy Field)|Aspen|US|39.2232|-106.8690
ASF|Astrakhan|Astrakhan Narimanovo Boris M. Kustodiev International Airport|Astrakhan|RU|46.2828|48.0105
ASI|Cat Hill|RAF Ascension Island|Cat Hill|SH|-7.9702|-14.3927
ASJ|Amami|Amami Airport|Amami|JP|28.4306|129.7130
ASM|Asmara|Asmara International Airport|Asmara|ER|15.2919|38.9107
ASO|Asosa|Asosa Airport|Asosa|ET|10.0185|34.5863
ASP|Alice Springs|Alice Springs Airport|Alice Springs|AU|-23.8066|133.9034
ASR|카이세리|Kayseri Erkilet International Airport|Kayseri|TR|38.7704|35.4954
ASU|아순시온|Silvio Pettirossi International Airport|Asunción|PY|-25.2402|-57.5192
ASV|Ol Tukai|Amboseli Airport|Ol Tukai|KE|-2.6448|37.2529
ASW|아스완|Aswan International Airport|Aswan|EG|23.9611|32.8204
ATC|Arthur's Town|Arthur's Town Airport|Arthur's Town|BS|24.6294|-75.6738
ATK|Atqasuk|Atqasuk Edward Burnell Sr Memorial Airport|Atqasuk|US|70.4670|-157.4360
ATM|Altamira|Altamira Interstate Airport|Altamira|BR|-3.2531|-52.2539
ATQ|암리차르|Sri Guru Ram Das Ji International Airport|Amritsar|IN|31.7096|74.7973
ATW|Appleton|Appleton International Airport|Appleton|US|44.2585|-88.5190
ATY|Watertown|Watertown Regional Airport|Watertown|US|44.9140|-97.1547
ATZ|Asyut|Asyut International Airport|Asyut|EG|27.0460|31.0128
AUA|아루바|Queen Beatrix International Airport|Oranjestad|AW|12.5011|-70.0143
AUC|Arauca|Santiago Perez Airport|Arauca|CO|7.0689|-70.7369
AUG|Augusta|Augusta State Airport|Augusta|US|44.3206|-69.7973
AUQ|Hiva Oa Island|Hiva Oa-Atuona Airport|Hiva Oa Island|PF|-9.7659|-139.0097
AUR|Aurillac|Aurillac airport|Aurillac|FR|44.8914|2.4219
AUX|Araguaína|Araguaína Airport|Araguaína|BR|-7.2279|-48.2405
AVA|Anshun|Anshun Huangguoshu Airport|Anshun|CN|26.2606|105.8733
AVK|Arvaikheer|Arvaikheer Airport|Arvaikheer|MN|46.2503|102.8020
AVL|Asheville|Asheville Regional Airport|Asheville|US|35.4355|-82.5419
AVN|Avignon|Avignon Caumont airport|Avignon|FR|43.9073|4.9018
AVP|Wilkes-Barre|Wilkes-Barre/Scranton International Airport|Wilkes-Barre|US|41.3371|-75.7242
AVR|Amravati|Amravati  Airport|Amravati|IN|20.8146|77.7178
AVV|멜버른 아발론|Melbourne Avalon International Airport|Geelong|AU|-38.0403|144.4672
AWA|Hawassa|Hawassa International Airport|Hawassa|ET|7.1006|38.3965
AWK|Wake Island|Wake Island Airfield|Wake Island|UM|19.2824|166.6366
AWZ|Ahvaz|Qasem Soleimani International Airport|Ahvaz|IR|31.3364|48.7638
AXA|The Valley|Clayton J. Lloyd International Airport|The Valley|AI|18.2048|-63.0538
AXD|Alexandroupolis|Alexandroupoli Democritus Airport|Alexandroupolis|GR|40.8559|25.9563
AXF|Bayanhot|Alxa Left Banner Bayanhot Airport|Bayanhot|CN|38.7483|105.5842
AXJ|Amakusa|Amakusa Airport|Amakusa|JP|32.4825|130.1590
AXM|Armenia|El Eden Airport|Armenia|CO|4.4528|-75.7664
AXP|Spring Point|Spring Point Airport|Spring Point|BS|22.4418|-73.9709
AXR|Arutua Airport|Arutua Airport|Arutua Airport|PF|-15.2483|-146.6170
AXT|Akita|Akita Airport|Akita|JP|39.6156|140.2190
AXU|Axum|Axum Airport|Axum|ET|14.1468|38.7728
AYJ|Faizabad|Maharshi Valmiki International Airport|Faizabad|IN|26.7477|82.1637
AYP|Ayacucho|Air Force Colonel Alfredo Mendivil Duarte Airport|Ayacucho|PE|-13.1548|-74.2044
AYQ|Yulara|Ayers Rock Connellan Airport|Yulara|AU|-25.1859|130.9770
AYT|안탈리아|Antalya International Airport|Antalya|TR|36.8987|30.8005
AZA|Mesa|Mesa Gateway Airport|Mesa|US|33.3078|-111.6550
AZD|Yazd|Shahid Sadooghi Airport|Yazd|IR|31.9049|54.2765
AZN|Andijan|Andijan International Airport|Andijan|UZ|40.7277|72.2940
AZO|Kalamazoo|Kalamazoo/Battle Creek International Airport|Kalamazoo|US|42.2321|-85.5496
AZR|Adrar|Touat-Cheikh Sidi Mohamed Belkebir Airport|Adrar|DZ|27.8376|-0.1864
AZS|Samana|Samaná El Catey International Airport|Samana|DO|19.2693|-69.7374
BAH|바레인|Bahrain International Airport|Manama|BH|26.2673|50.6376
BAL|Batman|Batman Airport|Batman|TR|37.9290|41.1166
BAQ|Barranquilla|Ernesto Cortissoz International Airport|Barranquilla|CO|10.8896|-74.7808
BAR|Qionghai|Qionghai Bo'ao Airport|Qionghai|CN|19.1410|110.4528
BAV|바오터우|Baotou Donghe International Airport|Baotou|CN|40.5600|109.9970
BAX|Barnaul|Barnaul Gherman Titov International Airport|Barnaul|RU|53.3613|83.5397
BAY|Tăuții-Măgherăuș|Maramureș International Airport|Tăuții-Măgherăuș|RO|47.6584|23.4644
BBA|Balmaceda|Balmaceda Airport|Balmaceda|CL|-45.9160|-71.6895
BBI|부바네스와르|Biju Patnaik International Airport|Bhubaneswar|IN|20.2510|85.8147
BBK|Kasane|Kasane International Airport|Kasane|BW|-17.8317|25.1662
BBM|Battambang|Battambang Airport|Battambang|KH|13.0956|103.2240
BBN|Bario|Bario Airport|Bario|MY|3.7346|115.4785
BBO|Berbera|Berbera Airport|Berbera|SO|10.3850|44.9367
BBQ|Codrington|Burton-Nibbs International Airport|Codrington|AG|17.6212|-61.7983
BBU|Bucharest|Bucharest Băneasa Aurel Vlaicu International Airport|Bucharest|RO|44.5031|26.1029
BCA|Baracoa|Gustavo Rizo Airport|Baracoa|CU|20.3653|-74.5062
BCD|바콜로드|Bacolod-Silay International Airport|Bacolod City|PH|10.7762|123.0189
BCH|Baucau|Baucau Airport|Baucau|TL|-8.4865|126.4000
BCI|Barcaldine|Barcaldine Airport|Barcaldine|AU|-23.5663|145.3021
BCM|Bacău|Bacău George Enescu International  Airport|Bacău|RO|46.5219|26.9103
BCO|Jinka|Jinka Airport|Jinka|ET|5.7497|36.5602
BCU|Bauchi|Sir Abubakar Tafawa Balewa Bauchi State International Airport|Bauchi|NG|10.4828|9.7440
BDA|Hamilton|L.F. Wade International Airport|Hamilton|BM|32.3638|-64.6782
BDB|Bundaberg|Bundaberg Airport|Bundaberg|AU|-24.9050|152.3226
BDH|Bandar Lengeh|Bandar Lengeh International Airport|Bandar Lengeh|IR|26.5323|54.8248
BDJ|Banjarbaru|Syamsudin Noor International Airport|Banjarbaru|ID|-3.4401|114.7612
BDL|하트퍼드|Bradley International Airport|Hartford|US|41.9386|-72.6880
BDO|Bandung|Husein Sastranegara International Airport|Bandung|ID|-6.9006|107.5760
BDQ|Vadodara|Vadodara International Airport|Vadodara|IN|22.3362|73.2263
BDS|Brindisi|Brindisi Airport|Brindisi|IT|40.6576|17.9470
BDT|Gbadolite|Gbadolite Airport|Gbadolite|CD|4.2527|20.9753
BDU|Målselv|Bardufoss Airport|Målselv|NO|69.0558|18.5404
BEB|Balivanich|Benbecula Airport|Balivanich|GB|57.4811|-7.3628
BED|Bedford|Laurence G Hanscom Field|Bedford|US|42.4700|-71.2890
BEF|Bluefields|Bluefields Airport|Bluefields|NI|11.9910|-83.7741
BEG|베오그라드|Belgrade Nikola Tesla Airport|Belgrade|RS|44.8184|20.3091
BEJ|Tanjung Redeb - Borneo Island|Kalimarau Airport|Tanjung Redeb - Borneo Island|ID|2.1478|117.4307
BEK|Bareilly|Bareilly Air Force Station|Bareilly|IN|28.4221|79.4508
BEL|Belém|Val de Cans/Júlio Cezar Ribeiro International Airport|Belém|BR|-1.3793|-48.4762
BEM|Oulad Yaich|Beni Mellal Airport|Oulad Yaich|MA|32.4019|-6.3159
BEN|Benina|Benina International Airport|Benina|LY|32.0968|20.2695
BES|Brest|Brest Bretagne airport|Brest|FR|48.4479|-4.4185
BET|Bethel|Bethel Airport|Bethel|US|60.7798|-161.8380
BEU|Bedourie|Bedourie Airport|Bedourie|AU|-24.3461|139.4600
BEW|Beira|Beira International Airport|Beira|MZ|-19.7964|34.9076
BFD|Bradford|Bradford Regional Airport|Bradford|US|41.8031|-78.6401
BFF|Scottsbluff|Western Neb. Rgnl/William B. Heilig Airport|Scottsbluff|US|41.8740|-103.5960
BFI|Seattle|King County International Airport - Boeing Field|Seattle|US|47.5270|-122.2999
BFJ|Bijie|Bijie Feixiong Airport|Bijie|CN|27.2671|105.4721
BFL|Bakersfield|Meadows Field|Bakersfield|US|35.4336|-119.0570
BFN|Bloemfontein|Bram Fischer International Airport|Bloemfontein|ZA|-29.0927|26.3024
BFS|벨파스트|Belfast International Airport|Belfast|GB|54.6575|-6.2158
BFV|Buriram|Buri Ram Airport|Buriram|TH|15.2295|103.2530
BFY|Bengbu|Bengbu Tenghu Airport|Bengbu|CN|33.1663|117.0583
BGA|Bucaramanga|Palonegro Airport|Bucaramanga|CO|7.1265|-73.1848
BGC|Bragança|Bragança Airport|Bragança|PT|41.8578|-6.7071
BGF|Bangui|Bangui M'Poko International Airport|Bangui|CF|4.3985|18.5188
BGG|Bingöl|Bingöl Airport|Bingöl|TR|38.8601|40.5945
BGI|바베이도스|Grantley Adams International Airport|Bridgetown|BB|13.0747|-59.4910
BGM|Binghamton|Greater Binghamton/Edwin A Link field|Binghamton|US|42.2087|-75.9798
BGO|베르겐|Bergen Airport, Flesland|Bergen|NO|60.2934|5.2181
BGR|Bangor|Bangor International Airport|Bangor|US|44.8064|-68.8267
BGW|바그다드|Baghdad International Airport / New Al Muthana Air Base|Baghdad|IQ|33.2625|44.2346
BGY|밀라노 베르가모|Il Caravaggio International Airport|Orio al Serio|IT|45.6694|9.7089
BHB|Bar Harbor|Hancock County-Bar Harbor Airport|Bar Harbor|US|44.4500|-68.3615
BHD|Belfast|George Best Belfast City Airport|Belfast|GB|54.6181|-5.8725
BHE|Blenheim|Woodbourne Airport|Blenheim|NZ|-41.5183|173.8700
BHH|Bisha|Bisha Airport|Bisha|SA|19.9844|42.6209
BHI|Bahía Blanca|Comandante Espora Airport|Bahía Blanca|AR|-38.7250|-62.1693
BHJ|Bhuj|Bhuj Airport|Bhuj|IN|23.2878|69.6702
BHK|부하라|Bukhara International Airport|Bukhara|UZ|39.7753|64.4823
BHM|Birmingham|Birmingham-Shuttlesworth International Airport|Birmingham|US|33.5629|-86.7507
BHO|Bhopal|Raja Bhoj International Airport|Bhopal|IN|23.2875|77.3374
BHQ|Broken Hill|Broken Hill Airport|Broken Hill|AU|-32.0014|141.4720
BHS|Bathurst|Bathurst Airport|Bathurst|AU|-33.4068|149.6512
BHU|Bhavnagar|Bhavnagar Airport|Bhavnagar|IN|21.7522|72.1852
BHV|Bahawalpur|Bahawalpur Airport|Bahawalpur|PK|29.3481|71.7180
BHX|버밍엄|Birmingham Airport|Birmingham|GB|52.4539|-1.7480
BHY|Beihai|Beihai Fucheng Airport|Beihai|CN|21.5387|109.2937
BIA|Bastia|Bastia-Poretta International airport|Bastia|FR|42.5527|9.4837
BIH|Bishop|Eastern Sierra Regional Airport|Bishop|US|37.3731|-118.3640
BIK|Biak|Frans Kaisiepo Airport|Biak|ID|-1.1900|136.1080
BIL|Billings|Billings Logan International Airport|Billings|US|45.8089|-108.5412
BIM|South Bimini|South Bimini Airport|South Bimini|BS|25.6999|-79.2647
BIO|빌바오|Bilbao Airport|Bilbao|ES|43.3011|-2.9106
BIQ|Biarritz|Biarritz Pays Basque airport|Biarritz|FR|43.4684|-1.5232
BIR|Biratnagar|Biratnagar Airport|Biratnagar|NP|26.4815|87.2640
BIS|Bismarck|Bismarck Municipal Airport|Bismarck|US|46.7727|-100.7469
BJA|Béjaïa|Soummam–Abane Ramdane Airport|Béjaïa|DZ|36.7125|5.0699
BJB|Bojnord|Bojnord Airport|Bojnord|IR|37.4930|57.3082
BJC|Denver|Rocky Mountain Metropolitan Airport|Denver|US|39.9088|-105.1170
BJF|Båtsfjord|Båtsfjord Airport|Båtsfjord|NO|70.6003|29.6926
BJL|Banjul|Banjul International Airport|Banjul|GM|13.3380|-16.6522
BJM|Bujumbura|Bujumbura Melchior Ndadaye International Airport|Bujumbura|BI|-3.3240|29.3185
BJR|Bahir Dar|Bahir Dar Airport|Bahir Dar|ET|11.6081|37.3216
BJV|보드룸|Milas Bodrum International Airport|Bodrum|TR|37.2493|27.6640
BJX|Silao|Guanajuato International Airport|Silao|MX|20.9927|-101.4803
BJZ|Badajoz|Badajoz Airport|Badajoz|ES|38.8913|-6.8213
BKG|Branson|Branson Airport|Branson|US|36.5321|-93.2005
BKN|Balkanabat|Balkanabat International Airport|Balkanabat|TM|39.6811|54.2060
BKO|Bamako|Modibo Keita International Airport|Bamako|ML|12.5335|-7.9499
BKQ|Blackall|Blackall Airport|Blackall|AU|-24.4317|145.4297
BKS|Bengkulu|Fatmawati Soekarno Airport|Bengkulu|ID|-3.8637|102.3390
BKW|Beaver|Raleigh County Memorial Airport|Beaver|US|37.7873|-81.1242
BLA|Barcelona|General José Antonio Anzoategui International Airport|Barcelona|VE|10.1111|-64.6922
BLB|Panamá City|Panamá Pacífico International Airport|Panamá City|PA|8.9148|-79.5996
BLD|Boulder City|Boulder City Municipal Airport|Boulder City|US|35.9472|-114.8588
BLE|Borlange|Dala Airport|Borlange|SE|60.4220|15.5152
BLI|Bellingham|Bellingham International Airport|Bellingham|US|48.7928|-122.5380
BLJ|Batna|Batna Mostefa Ben Boulaid Airport|Batna|DZ|35.7521|6.3086
BLL|빌룬|Billund Airport|Billund|DK|55.7403|9.1570
BLQ|볼로냐|Bologna Guglielmo Marconi Airport|Bologna|IT|44.5354|11.2887
BLR|벵갈루루|Kempegowda International Airport Bengaluru|Bengaluru|IN|13.1979|77.7063
BLV|Belleville|Scott AFB/Midamerica Airport|Belleville|US|38.5452|-89.8352
BLZ|Blantyre|Chileka International Airport|Blantyre|MW|-15.6772|34.9723
BMA|Stockholm|Stockholm-Bromma Airport|Stockholm|SE|59.3544|17.9417
BME|Broome|Broome International Airport|Broome|AU|-17.9492|122.2283
BMI|Bloomington|Central Illinois Regional Airport at Bloomington-Normal|Bloomington|US|40.4771|-88.9159
BMU|Bima|Sultan Muhammad Salahuddin Airport|Bima|ID|-8.5372|118.6850
BMV|Buon Ma Thuot|Buon Ma Thuot Airport|Buon Ma Thuot|VN|12.6683|108.1200
BMW|Bordj Badji Mokhtar|Bordj Badji Mokhtar Airport|Bordj Badji Mokhtar|DZ|21.3778|0.9270
BND|Bandar Abbas|Bandar Abbas International Airport|Bandar Abbas|IR|27.2183|56.3778
BNI|Benin|Benin Airport|Benin|NG|6.3170|5.5995
BNK|Ballina|Ballina Byron Gateway Airport|Ballina|AU|-28.8332|153.5615
BNN|Brønnøy|Brønnøysund Airport, Brønnøy|Brønnøy|NO|65.4611|12.2175
BNS|Barinas|Barinas Airport|Barinas|VE|8.6150|-70.2142
BNX|Mahovljani|Banja Luka International Airport|Mahovljani|BA|44.9414|17.2975
BOB|Motu Mute|Bora Bora Airport|Motu Mute|PF|-16.4444|-151.7510
BOC|Isla Colón|Bocas del Toro "Isla Colón" International Airport|Isla Colón|PA|9.3408|-82.2508
BOD|보르도|Bordeaux–Mérignac Airport|Bordeaux|FR|44.8287|-0.7154
BOH|Bournemouth|Bournemouth Airport|Bournemouth|GB|50.7805|-1.8396
BOI|보이시|Boise Air Terminal/Gowen Field|Boise|US|43.5644|-116.2230
BOJ|부르가스|Burgas Airport|Burgas|BG|42.5699|27.5152
BON|Kralendijk|Flamingo International Airport|Kralendijk|BQ|12.1310|-68.2685
BOO|보되|Bodø Airport|Bodø|NO|67.2692|14.3653
BOR|Ton Phueng|Bokeo International Airport|Ton Phueng|LA|20.3240|100.1654
BOY|Bobo Dioulasso|Bobo Dioulasso Airport|Bobo Dioulasso|BF|11.1601|-4.3310
BPE|Qinhuangdao|Qinhuangdao Beidaihe Airport|Qinhuangdao|CN|39.6664|119.0614
BPL|Bole|Bole Alashankou Airport|Bole|CN|44.8955|82.3001
BPN|발릭파판|Sultan Aji Muhammad Sulaiman Sepinggan International Airport|Balikpapan|ID|-1.2683|116.8945
BPS|Porto Seguro|Porto Seguro International Airport|Porto Seguro|BR|-16.4384|-39.0806
BPT|Beaumont|Jack Brooks Regional Airport|Beaumont|US|29.9508|-94.0207
BPX|Bangda|Qamdo Bangda Airport|Bangda|CN|30.5536|97.1083
BPY|Besalampy|Besalampy Airport|Besalampy|MG|-16.7445|44.4825
BQK|Brunswick|Brunswick Golden Isles Airport|Brunswick|US|31.2588|-81.4665
BQL|Boulia Airport|Boulia Airport|Boulia Airport|AU|-22.9133|139.9000
BQN|Aguadilla|Rafael Hernández International Airport|Aguadilla|PR|18.4949|-67.1294
BQS|Blagoveschensk|Ignatyevo Airport|Blagoveschensk|RU|50.4267|127.4155
BQT|Brest|Brest International Airport|Brest|BY|52.1081|23.8968
BQU|Bequia|J F Mitchell Airport|Bequia|VC|12.9884|-61.2620
BRC|San Carlos de Bariloche|Teniente Luis Candelaria International Airport|San Carlos de Bariloche|AR|-41.1512|-71.1575
BRD|Brainerd|Brainerd Lakes Regional Airport|Brainerd|US|46.4029|-94.1297
BRE|브레멘|Bremen Airport|Bremen|DE|53.0468|8.7893
BRI|바리|Bari Karol Wojtyła International Airport|Bari|IT|41.1389|16.7606
BRK|Bourke Airport|Bourke Airport|Bourke Airport|AU|-30.0392|145.9520
BRL|Burlington|Southeast Iowa Regional Airport|Burlington|US|40.7832|-91.1255
BRM|Barquisimeto|Jacinto Lara International Airport|Barquisimeto|VE|10.0427|-69.3586
BRN|Bern|Bern Airport|Bern|CH|46.9127|7.4988
BRO|Brownsville|Brownsville South Padre Island International Airport|Brownsville|US|25.9072|-97.4252
BRQ|Brno|Brno-Tuřany Airport|Brno|CZ|49.1513|16.6940
BRR|Eoligarry|Barra Airport|Eoligarry|GB|57.0228|-7.4431
BRS|브리스틀|Bristol Airport|Bristol|GB|51.3823|-2.7165
BRW|Utqiaġvik|Wiley Post Will Rogers Memorial Airport|Utqiaġvik|US|71.2854|-156.7660
BRX|Barahona|Maria Montez International Airport|Barahona|DO|18.2515|-71.1204
BSA|Bosaso|Bender Qassim International Airport|Bosaso|SO|11.2752|49.1392
BSB|브라질리아|Presidente Juscelino Kubitschek International Airport|Brasília|BR|-15.8692|-47.9208
BSC|Bahía Solano|José Celestino Mutis Airport|Bahía Solano|CO|6.2029|-77.3947
BSD|Baoshan|Baoshan Yunrui Airport|Baoshan|CN|25.0533|99.1683
BSG|Bata|Bata International Airport|Bata|GQ|1.9055|9.8057
BSK|Biskra|Biskra - Mohamed Khider Airport|Biskra|DZ|34.7932|5.7389
BSL|바젤|EuroAirport Basel–Mulhouse–Freiburg|Bâle|FR|47.6007|7.5211
BSO|Basco|Basco Airport|Basco|PH|20.4513|121.9800
BSR|바스라|Basra International Airport|Basra|IQ|30.5491|47.6621
BSZ|비슈케크|Manas International Airport|Bishkek|KG|43.0613|74.4776
BTC|Batticaloa|Batticaloa International Airport|Batticaloa|LK|7.7051|81.6772
BTH|바탐|Hang Nadim International Airport|Batam|ID|1.1210|104.1190
BTI|Barter Island|Barter Island Long Range Radar Station Airport|Barter Island|US|70.1340|-143.5820
BTJ|Banda Aceh|Sultan Iskandar Muda International Airport|Banda Aceh|ID|5.5251|95.4200
BTK|Bratsk|Bratsk Airport|Bratsk|RU|56.3696|101.7018
BTM|Butte|Bert Mooney Airport|Butte|US|45.9548|-112.4970
BTR|Baton Rouge|Baton Rouge Metropolitan Airport|Baton Rouge|US|30.5332|-91.1496
BTS|브라티슬라바|M. R. Štefánik Airport|Bratislava|SK|48.1702|17.2127
BTU|Bintulu|Bintulu Airport|Bintulu|MY|3.1239|113.0200
BTV|Burlington|Patrick Leahy Burlington International Airport|Burlington|US|44.4719|-73.1533
BUA|Buka Island|Buka Airport|Buka Island|PG|-5.4223|154.6727
BUF|버펄로|Buffalo Niagara International Airport|Buffalo|US|42.9405|-78.7322
BUN|Buenaventura|Gerardo Tobar López Airport|Buenaventura|CO|3.8196|-76.9898
BUQ|Bulawayo|Joshua Mqabuko Nkomo International Airport|Bulawayo|ZW|-20.0163|28.6229
BUR|버뱅크|Hollywood Burbank/Bob Hope Airport|Burbank|US|34.2028|-118.3581
BUS|바투미|Alexander Kartveli Batumi International Airport|Batumi|GE|41.6094|41.6003
BUX|Bunia|Bunia Airport|Bunia|CD|1.5657|30.2207
BUZ|Bushehr|Bushehr Airport|Bushehr|IR|28.9448|50.8346
BVA|파리 보베|Beauvais-Tillé airport|Beauvais|FR|49.4544|2.1128
BVB|Boa Vista|Atlas Brasil Cantanhede International Airport|Boa Vista|BR|2.8462|-60.6906
BVC|Rabil|Aristides Pereira International Airport|Rabil|CV|16.1365|-22.8889
BVE|Brive|Brive Souillac airport|Brive|FR|45.0397|1.4856
BVG|Berlevåg|Berlevåg Airport|Berlevåg|NO|70.8715|29.0341
BVH|Vilhena|Brigadeiro Camarão Airport|Vilhena|BR|-12.6944|-60.0983
BVI|Birdsville Airport|Birdsville Airport|Birdsville Airport|AU|-25.8975|139.3480
BVJ|Bovanenkovo|Bovanenkovo Airport|Bovanenkovo|RU|70.3153|68.3336
BWA|Siddharthanagar|Gautam Buddha International Airport|Siddharthanagar|NP|27.5046|83.4104
BWI|볼티모어|Baltimore/Washington International Thurgood Marshall Airport|Baltimore|US|39.1754|-76.6683
BWK|Gornji Humac|Brač Airport|Gornji Humac|HR|43.2845|16.6784
BWO|Balakovo|Balakovo Airport|Balakovo|RU|51.8583|47.7456
BWT|Burnie|Wynyard Airport|Burnie|AU|-40.9970|145.7260
BXH|Balkhash|Balkhash Airport|Balkhash|KZ|46.8942|75.0045
BXR|Bam|Bam Airport|Bam|IR|29.0842|58.4500
BXU|Butuan|Bancasi Airport|Butuan|PH|8.9515|125.4788
BXY|Baikonur|Baikonur Krayniy International Airport|Baikonur|KZ|45.6220|63.2108
BYK|Bouaké|Bouaké Airport|Bouaké|CI|7.7388|-5.0737
BYM|Bayamo|Carlos Manuel de Cespedes Airport|Bayamo|CU|20.3964|-76.6214
BYN|Bayankhongor|Bayankhongor Airport|Bayankhongor|MN|46.1633|100.7040
BZE|Belize City|Philip S. W. Goldson International Airport|Belize City|BZ|17.5400|-88.3036
BZG|Bydgoszcz|Ignacy Jan Paderewski Bydgoszcz Airport|Bydgoszcz|PL|53.0968|17.9777
BZI|Balıkesir|Balıkesir Airport|Balıkesir|TR|39.6193|27.9260
BZL|Barisal|Barisal Airport|Barisal|BD|22.8010|90.3012
BZN|Bozeman|Bozeman Yellowstone International Airport|Bozeman|US|45.7789|-111.1537
BZO|Bolzano|Bolzano Airport|Bolzano|IT|46.4592|11.3261
BZR|Béziers|Béziers Vias airport|Béziers|FR|43.3235|3.3539
BZV|Brazzaville|Maya-Maya International Airport|Brazzaville|CG|-4.2517|15.2530
BZX|Bazhong|Bazhong Enyang Airport|Bazhong|CN|31.7384|106.6449
CAB|Cabinda|Cabinda Airport|Cabinda|AO|-5.5984|12.1881
CAC|Cascavel|Coronel Adalberto Mendes da Silva Airport|Cascavel|BR|-25.0003|-53.5012
CAE|Columbia|Columbia Metropolitan Airport|Columbia|US|33.9382|-81.1230
CAG|칼리아리|Cagliari Elmas Airport|Cagliari|IT|39.2515|9.0543
CAH|Ca Mau City|Cà Mau Airport|Ca Mau City|VN|9.1777|105.1778
CAJ|Canaima|Canaima Airport|Canaima|VE|6.2320|-62.8548
CAK|Akron|Akron Canton Regional Airport|Akron|US|40.9161|-81.4422
CAL|Campbeltown|Campbeltown Airport|Campbeltown|GB|55.4372|-5.6864
CAP|Cap Haitien|Cap Haitien International Airport|Cap Haitien|HT|19.7255|-72.2007
CAT|Cascais|Cascais Airport|Cascais|PT|38.7250|-9.3552
CAW|Campos dos Goytacazes|Bartolomeu Lisandro Airport|Campos dos Goytacazes|BR|-21.6983|-41.3017
CAY|Matoury|Cayenne – Félix Eboué Airport|Matoury|GF|4.8200|-52.3613
CAZ|Cobar Airport|Cobar Airport|Cobar Airport|AU|-31.5383|145.7940
CBB|Cochabamba|Jorge Wilsterman International Airport|Cochabamba|BO|-17.4211|-66.1771
CBH|Béchar|Béchar Boudghene Ben Ali Lotfi Airport|Béchar|DZ|31.6457|-2.2699
CBO|Datu Odin Sinsuat|Cotabato (Awang) Airport|Datu Odin Sinsuat|PH|7.1648|124.2099
CBQ|Calabar|Margaret Ekpo International Airport|Calabar|NG|4.9760|8.3472
CBR|Canberra|Canberra Airport|Canberra|AU|-35.3069|149.1950
CBT|Catumbela|Catumbela Airport|Catumbela|AO|-12.4792|13.4869
CCC|Cayo Coco|Jardines Del Rey Airport|Cayo Coco|CU|22.4610|-78.3284
CCE|New Cairo|Capital International Airport|New Cairo|EG|30.0647|31.8400
CCF|Carcassonne|Carcassonne Salvaza Airport|Carcassonne|FR|43.2160|2.3063
CCJ|코지코드|Calicut International Airport|Calicut|IN|11.1360|75.9552
CCK|West Island|Cocos (Keeling) Islands Airport|West Island|CC|-12.1922|96.8341
CCP|Concepcion|Carriel Sur International Airport|Concepcion|CL|-36.7724|-73.0628
CCR|Concord|Buchanan Field|Concord|US|37.9897|-122.0570
CCS|Maiquetía|Maiquetía Simón Bolívar International Airport|Maiquetía|VE|10.6022|-66.9912
CCU|콜카타|Netaji Subhash Chandra Bose International Airport|Kolkata|IN|22.6540|88.4476
CCZ|Chub Cay|Chub Cay Airport|Chub Cay|BS|25.4171|-77.8809
CDB|Cold Bay|Cold Bay Airport|Cold Bay|US|55.2079|-162.7250
CDC|Cedar City|Cedar City Regional Airport|Cedar City|US|37.7010|-113.0990
CDE|Chengde|Chengde Puning Airport|Chengde|CN|41.1225|118.0739
CDP|Kadapa|Kadapa Airport|Kadapa|IN|14.5132|78.7692
CDR|Chadron|Chadron Municipal Airport|Chadron|US|42.8376|-103.0950
CDT|Castellón de la Plana|Castellón-Costa Azahar Airport|Castellón de la Plana|ES|40.2139|0.0733
CDV|Cordova|Merle K (Mudhole) Smith Airport|Cordova|US|60.4918|-145.4780
CEC|Crescent City|Jack Mc Namara Field Airport|Crescent City|US|41.7789|-124.2364
CED|Ceduna Airport|Ceduna Airport|Ceduna Airport|AU|-32.1306|133.7100
CEE|Cherepovets|Cherepovets Airport|Cherepovets|RU|59.2736|38.0158
CEI|치앙라이|Mae Fah Luang - Chiang Rai International Airport|Chiang Rai|TH|19.9523|99.8829
CEK|Chelyabinsk|Kurchatov Chelyabinsk International Airport|Chelyabinsk|RU|55.3031|61.5049
CEN|Ciudad Obregón|Ciudad Obregón International Airport|Ciudad Obregón|MX|27.3926|-109.8330
CEZ|Cortez|Cortez Municipal Airport|Cortez|US|37.3030|-108.6280
CFE|Clermont-Ferrand|Clermont-Ferrand Auvergne airport|Clermont-Ferrand|FR|45.7867|3.1692
CFG|Cienfuegos|Jaime Gonzalez Airport|Cienfuegos|CU|22.1500|-80.4142
CFK|Chlef|Chlef Aboubakr Belkaid International Airport|Chlef|DZ|36.2166|1.3411
CFN|Donegal|Donegal Airport|Donegal|IE|55.0442|-8.3410
CFR|Caen|Caen Carpiquet airport|Caen|FR|49.1768|-0.4549
CFS|Coffs Harbour|Coffs Harbour Airport|Coffs Harbour|AU|-30.3206|153.1160
CFU|코르푸|Corfu Ioannis Kapodistrias International Airport|Kerkyra|GR|39.6014|19.9122
CGB|Cuiabá|Várzea Grande–Marechal Rondon International Airport|Cuiabá|BR|-15.6529|-56.1167
CGD|Changde|Changde Taohuayuan Airport|Changde|CN|28.9189|111.6400
CGH|상파울루 콩고냐스|Congonhas–Deputado Freitas Nobre Airport|São Paulo|BR|-23.6277|-46.6546
CGI|Cape Girardeau|Cape Girardeau Regional Airport|Cape Girardeau|US|37.2253|-89.5708
CGM|Mambajao|Camiguin Airport|Mambajao|PH|9.2539|124.7091
CGN|쾰른|Cologne Bonn Airport|Köln|DE|50.8659|7.1427
CGP|치타공|Shah Amanat International Airport|Chattogram|BD|22.2496|91.8133
CGR|Campo Grande|Campo Grande Airport|Campo Grande|BR|-20.4700|-54.6740
CGY|카가얀데오로|Laguindingan International Airport|Laguindingan|PH|8.6122|124.4565
CHA|Chattanooga|Chattanooga Metropolitan Airport (Lovell Field)|Chattanooga|US|35.0353|-85.2038
CHC|크라이스트처치|Christchurch International Airport|Christchurch|NZ|-43.4890|172.5321
CHG|Shuangta|Chaoyang Airport|Shuangta|CN|41.5381|120.4350
CHH|Chachapoyas|Chachapoyas Airport|Chachapoyas|PE|-6.2019|-77.8562
CHM|Chimbote|FAP Lieutenant Jaime Andres de Montreuil Morales Airport|Chimbote|PE|-9.1496|-78.5238
CHO|Charlottesville|Charlottesville Albemarle Airport|Charlottesville|US|38.1386|-78.4529
CHQ|하니아|Chania International Airport|Souda|GR|35.5312|24.1507
CHS|찰스턴|Charleston International Airport|Charleston|US|32.8962|-80.0382
CHT|Te One|Inia William Tuuta Memorial Airport|Te One|NZ|-43.8119|-176.4651
CHX|Changuinola|Changuinola Captain Manuel Niño International Airport|Changuinola|PA|9.4590|-82.5151
CIA|로마 참피노|Ciampino–G. B. Pastine International Airport|Rome|IT|41.7988|12.5953
CID|Cedar Rapids|The Eastern Iowa Airport|Cedar Rapids|US|41.8847|-91.7108
CIF|Chifeng|Chifeng Yulong Airport|Chifeng|CN|42.1597|118.8410
CIJ|Cobija|Capitán Aníbal Arab Airport|Cobija|BO|-11.0391|-68.7828
CIT|심켄트|Shymkent International Airport|Shymkent|KZ|42.3650|69.4756
CIU|Kincheloe|Chippewa County International Airport|Kincheloe|US|46.2420|-84.4621
CIW|Canouan|Canouan Airport|Canouan|VC|12.6990|-61.3424
CIX|Chiclayo|Capitán FAP José A. Quiñones González International Airport|Chiclayo|PE|-6.7892|-79.8283
CIY|Comiso|Comiso Airport|Comiso|IT|36.9958|14.6089
CJA|Cajamarca|Mayor General FAP Armando Revoredo Iglesias Airport|Cajamarca|PE|-7.1392|-78.4894
CJB|Coimbatore|Coimbatore International Airport|Coimbatore|IN|11.0300|77.0434
CJC|Calama|El Loa Airport|Calama|CL|-22.4982|-68.9036
CJL|Chitral|Chitral Airport|Chitral|PK|35.8862|71.7999
CJM|Chumphon|Chumphon Airport|Chumphon|TH|10.7112|99.3617
CJS|Ciudad Juárez|Abraham González International Airport|Ciudad Juárez|MX|31.6367|-106.4285
CKB|Bridgeport|North Central West Virginia Airport|Bridgeport|US|39.2966|-80.2281
CKH|Chokurdah|Chokurdakh Airport|Chokurdah|RU|70.6231|147.9020
CKS|Parauapebas|Carajás Airport|Parauapebas|BR|-6.1178|-50.0034
CKY|Conakry|Ahmed Sékou Touré International Airport|Conakry|GN|9.5769|-13.6120
CKZ|Çanakkale|Çanakkale Airport|Çanakkale|TR|40.1377|26.4268
CLD|Carlsbad|McClellan-Palomar Airport|Carlsbad|US|33.1283|-117.2800
CLE|클리블랜드|Cleveland Hopkins International Airport|Cleveland|US|41.4117|-81.8498
CLJ|클루지나포카|Avram Iancu Cluj International Airport|Cluj-Napoca|RO|46.7860|23.6857
CLL|College Station|Easterwood Field|College Station|US|30.5886|-96.3638
CLO|칼리|Alfonso Bonilla Aragon International Airport|Cali|CO|3.5427|-76.3819
CLQ|Colima|Licenciado Miguel de la Madrid International Airport|Colima|MX|19.2770|-103.5770
CLY|Calvi|Calvi Sainte Catherine Airport|Calvi|FR|42.5304|8.7930
CMA|Cunnamulla Airport|Cunnamulla Airport|Cunnamulla Airport|AU|-28.0300|145.6220
CME|Ciudad del Carmen|Ciudad del Carmen International Airport|Ciudad del Carmen|MX|18.6515|-91.7994
CMF|Chambéry|Chambéry Aix les Bains airport|Chambéry|FR|45.6381|5.8802
CMG|Corumbá|Corumbá International Airport|Corumbá|BR|-19.0119|-57.6728
CMH|콜럼버스|John Glenn Columbus International Airport|Columbus|US|39.9980|-82.8919
CMI|Savoy|University of Illinois Willard Airport|Savoy|US|40.0398|-88.2762
CMU|Kundiawa|Chimbu Airport|Kundiawa|PG|-6.0243|144.9710
CMW|Camaguey|Ignacio Agramonte International Airport|Camaguey|CU|21.4199|-77.8480
CMX|Hancock|Houghton County Memorial Airport|Hancock|US|47.1684|-88.4891
CNB|Coonamble Airport|Coonamble Airport|Coonamble Airport|AU|-30.9809|148.3778
CND|Constanța|Mihail Kogălniceanu International Airport|Constanța|RO|44.3622|28.4883
CNF|벨루오리존치|Tancredo Neves International Airport|Belo Horizonte|BR|-19.6357|-43.9669
CNJ|Cloncurry|Cloncurry Airport|Cloncurry|AU|-20.6686|140.5040
CNM|Carlsbad|Cavern City Air Terminal|Carlsbad|US|32.3375|-104.2630
CNN|Kannur|Kannur International Airport|Kannur|IN|11.9163|75.5450
CNP|Neerlerit Inaat|Neerlerit Inaat Airport|Neerlerit Inaat|GL|70.7431|-22.6505
CNQ|Corrientes|Corrientes Airport|Corrientes|AR|-27.4455|-58.7619
CNY|Moab|Canyonlands Regional Airport|Moab|US|38.7550|-109.7550
COD|Cody|Yellowstone Regional Airport|Cody|US|44.5202|-109.0240
COK|코치|Cochin International Airport|Kochi|IN|10.1510|76.4008
COO|Cotonou|Cotonou Cadjehoun International Airport|Cotonou|BJ|6.3572|2.3843
COQ|Choibalsan Airport|Choibalsan Airport|Choibalsan Airport|MN|48.1354|114.6472
COR|Cordoba|Ingeniero Aeronáutico Ambrosio L.V. Taravella International Airport|Cordoba|AR|-31.3123|-64.2083
COS|콜로라도스프링스|City of Colorado Springs Municipal Airport|Colorado Springs|US|38.8058|-104.7010
COU|Columbia|Columbia Regional Airport|Columbia|US|38.8181|-92.2196
COV|Tarsus|Çukurova International Airport|Tarsus|TR|36.8915|35.0712
CPC|Chapelco|Aviador C. Campos Airport|Chapelco|AR|-40.0754|-71.1373
CPD|Coober Pedy|Coober Pedy Airport|Coober Pedy|AU|-29.0383|134.7222
CPE|Campeche|Ingeniero Alberto Acuña Ongay International Airport|Campeche|MX|19.8160|-90.5001
CPO|Copiapo|Desierto de Atacama Airport|Copiapo|CL|-27.2612|-70.7792
CPR|Casper|Casper-Natrona County International Airport|Casper|US|42.9074|-106.4616
CPT|케이프타운|Cape Town International Airport|Cape Town|ZA|-33.9740|18.6043
CPV|Campina Grande|Presidente João Suassuna Airport|Campina Grande|BR|-7.2697|-35.8961
CPX|Culebra|Benjamin Rivera Noriega Airport|Culebra|PR|18.3130|-65.3039
CQW|Wulong|Chongqing Xiannüshan Airport|Wulong|CN|29.4657|107.6937
CRA|Craiova|Craiova International Airport|Craiova|RO|44.3181|23.8886
CRD|Comodoro Rivadavia|General Enrique Mosconi International Airport|Comodoro Rivadavia|AR|-45.7869|-67.4634
CRI|Colonel Hill|Colonel Hill Airport|Colonel Hill|BS|22.7456|-74.1824
CRL|브뤼셀 샤를루아|Brussels South Charleroi Airport|Charleroi|BE|50.4620|4.4596
CRM|Catarman|Catarman National Airport|Catarman|PH|12.5016|124.6353
CRP|Corpus Christi|Corpus Christi International Airport|Corpus Christi|US|27.7704|-97.5012
CRV|Isola di Capo Rizzuto|Crotone Sant'Anna Pythagoras Airport|Isola di Capo Rizzuto|IT|38.9972|17.0802
CRW|Charleston|Yeager Airport|Charleston|US|38.3731|-81.5932
CRZ|Türkmenabat|Türkmenabat International Airport|Türkmenabat|TM|38.9307|63.5640
CSG|Columbus|Columbus Airport|Columbus|US|32.5164|-84.9396
CSK|Cap Skirring|Cap Skirring Airport|Cap Skirring|SN|12.3953|-16.7480
CSW|Cabo San Lucas|Cabo San Lucas International Airport|Cabo San Lucas|MX|22.9491|-109.9395
CSY|Cheboksary|Cheboksary Airport|Cheboksary|RU|56.0903|47.3473
CTA|카타니아|Catania-Fontanarossa Airport|Catania|IT|37.4668|15.0664
CTC|Catamarca|Coronel Felipe Varela International Airport|Catamarca|AR|-28.5931|-65.7512
CTD|Chitré|Alonso Valderrama Airport|Chitré|PA|7.9878|-80.4098
CTG|카르타헤나|Rafael Nuñez International Airport|Cartagena|CO|10.4424|-75.5130
CTL|Charleville|Charleville Airport|Charleville|AU|-26.4133|146.2620
CTM|Chetumal|Chetumal International Airport|Chetumal|MX|18.5050|-88.3280
CTN|Cooktown Airport|Cooktown Airport|Cooktown Airport|AU|-15.4436|145.1832
CUC|Cúcuta|Camilo Daza International Airport|Cúcuta|CO|7.9276|-72.5115
CUE|Cuenca|Mariscal Lamar Airport|Cuenca|EC|-2.8895|-78.9844
CUF|Levaldigi|Cuneo International Airport|Levaldigi|IT|44.5475|7.6230
CUK|Caye Caulker|Caye Caulker Airport|Caye Caulker|BZ|17.7350|-88.0329
CUL|Culiacán|Bachigualato Federal International Airport|Culiacán|MX|24.7650|-107.4752
CUM|Cumaná|Antonio José de Sucre Airport|Cumaná|VE|10.4503|-64.1305
CUP|Carúpano|General Francisco Bermúdez Airport|Carúpano|VE|10.6600|-63.2617
CUQ|Coen|Coen Airport|Coen|AU|-13.7611|143.1133
CUR|퀴라소|Hato International Airport|Willemstad|CW|12.1889|-68.9598
CUU|Chihuahua|General Roberto Fierro Villalobos International Airport|Chihuahua|MX|28.7026|-105.9638
CUZ|쿠스코|Alejandro Velasco Astete International Airport|Cusco|PE|-13.5357|-71.9388
CVG|신시내티|Cincinnati Northern Kentucky International Airport|Cincinnati|US|39.0488|-84.6678
CVM|Ciudad Victoria|General Pedro Jose Mendez International Airport|Ciudad Victoria|MX|23.7033|-98.9565
CVN|Clovis|Clovis Municipal Airport|Clovis|US|34.4266|-103.0788
CVQ|Carnarvon|Carnarvon Airport|Carnarvon|AU|-24.8843|113.6664
CWA|Mosinee|Central Wisconsin Airport|Mosinee|US|44.7774|-89.6702
CWB|쿠리치바|Curitiba-Afonso Pena International Airport|Curitiba|BR|-25.5285|-49.1758
CWJ|Lincang|Cangyuan Washan Airport|Lincang|CN|23.2763|99.3732
CWL|카디프|Cardiff International Airport|Cardiff|GB|51.3967|-3.3433
CXB|Cox's Bazar|Cox's Bazar Airport|Cox's Bazar|BD|21.4575|91.9633
CXI|Kiritimati|Cassidy International Airport|Kiritimati|KI|1.9863|-157.3500
CXJ|Caxias Do Sul|Hugo Cantergiani Regional Airport|Caxias Do Sul|BR|-29.1972|-51.1876
CXP|Cilacap|Tunggul Wulung Airport|Cilacap|ID|-7.6451|109.0340
CYA|Les Cayes|Antoine-Simon International Airport|Les Cayes|HT|18.2711|-73.7883
CYB|West End|Charles Kirkconnell International Airport|West End|KY|19.6870|-79.8828
CYC|Caye Chapel|Caye Chapel Airport|Caye Chapel|BZ|17.6838|-88.0450
CYI|Shuishang|Chiayi Airport|Shuishang|TW|23.4626|120.3905
CYO|Cayo Largo del Sur|Vilo Acuña International Airport|Cayo Largo del Sur|CU|21.6165|-81.5460
CYP|Calbayog City|Calbayog Airport|Calbayog City|PH|12.0726|124.5451
CYS|Cheyenne|Cheyenne Regional Jerry Olson Field|Cheyenne|US|41.1557|-104.8120
CYX|Cherskiy|Cherskiy Airport|Cherskiy|RU|68.7406|161.3380
CYZ|Cauayan City|Cauayan Airport|Cauayan City|PH|16.9299|121.7530
CZE|Coro|José Leonardo Chirinos Airport|Coro|VE|11.4149|-69.6809
CZH|Corozal|Corozal Airport|Corozal|BZ|18.3822|-88.4119
CZL|Constantine|Mohamed Boudiaf International Airport|Constantine|DZ|36.2760|6.6204
CZM|코수멜|Cozumel International Airport|Cozumel|MX|20.5149|-86.9285
CZS|Cruzeiro Do Sul|Cruzeiro do Sul Airport|Cruzeiro Do Sul|BR|-7.5999|-72.7695
CZU|Corozal|Las Brujas Airport|Corozal|CO|9.3327|-75.2856
CZX|Changzhou|Changzhou Benniu International Airport|Changzhou|CN|31.9205|119.7755
DAB|Daytona Beach|Daytona Beach International Airport|Daytona Beach|US|29.1825|-81.0595
DAC|다카|Hazrat Shahjalal International Airport|Dhaka|BD|23.8433|90.3978
DAL|댈러스 러브필드|Dallas Love Field|Dallas|US|32.8448|-96.8477
DAM|다마스쿠스|Damascus International Airport|Damascus|SY|33.4115|36.5156
DAR|다르에스살람|Julius Nyerere International Airport|Dar es Salaam|TZ|-6.8735|39.2073
DAT|다퉁|Datong Yungang International Airport|Datong|CN|40.0614|113.4805
DAU|Daru|Daru Airport|Daru|PG|-9.0868|143.2080
DAV|David|Enrique Malek International Airport|David|PA|8.3890|-82.4364
DAY|Dayton|James M. Cox Dayton International Airport|Dayton|US|39.9024|-84.2194
DBB|El Alamein|El Alamein International Airport|El Alamein|EG|30.9243|28.4616
DBC|Baicheng|Baicheng Chang'an Airport|Baicheng|CN|45.5053|123.0197
DBO|Dubbo|Dubbo City Regional Airport|Dubbo|AU|-32.2167|148.5750
DBQ|Dubuque|Dubuque Regional Airport|Dubuque|US|42.4020|-90.7095
DBR|Darbhanga|Darbhanga Airport|Darbhanga|IN|26.1928|85.9169
DBV|두브로브니크|Dubrovnik Ruđer Bošković Airport|Dubrovnik|HR|42.5622|18.2655
DCF|Canefield|Canefield Airport|Canefield|DM|15.3367|-61.3921
DCM|Castres|Castres Mazamet Airport|Castres|FR|43.5563|2.2892
DCY|Garzê|Daocheng Yading Airport|Garzê|CN|29.3163|100.0603
DDC|Dodge City|Dodge City Regional Airport|Dodge City|US|37.7634|-99.9656
DDG|Dandong|Dandong Langtou International Airport|Dandong|CN|40.0255|124.2867
DDR|Xigazê|Shigatse Tingri Airport|Xigazê|CN|28.6046|86.7980
DEA|Dera Ghazi Khan|Dera Ghazi Khan Airport|Dera Ghazi Khan|PK|29.9610|70.4859
DEB|데브레첸|Debrecen International Airport|Debrecen|HU|47.4895|21.6163
DEC|Decatur|Decatur Airport|Decatur|US|39.8346|-88.8657
DED|Dehradun|Dehradun Jolly Grant Airport|Dehradun|IN|30.1892|78.1767
DEF|Dezful|Dezful Airport|Dezful|IR|32.4344|48.3976
DGA|Dangriga|Dangriga Airport|Dangriga|BZ|16.9825|-88.2310
DGO|Durango|General Guadalupe Victoria International Airport|Durango|MX|24.1255|-104.5279
DGT|Dumaguete City|Sibulan Airport|Dumaguete City|PH|9.3342|123.3019
DHM|Kangra|Kangra Airport|Kangra|IN|32.1649|76.2630
DHN|Dothan|Dothan Regional Airport|Dothan|US|31.3213|-85.4496
DHX|Kediri|Dhoho International Airport|Kediri|ID|-7.7495|111.9468
DIB|Dibrugarh|Dibrugarh Airport|Dibrugarh|IN|27.4839|95.0169
DIE|Antisiranana|Arrachart Airport|Antisiranana|MG|-12.3494|49.2917
DIG|Diqing|Diqing Shangri-La Airport|Diqing|CN|27.7936|99.6772
DIK|Dickinson|Dickinson Theodore Roosevelt Regional Airport|Dickinson|US|46.7975|-102.8019
DIL|딜리|Presidente Nicolau Lobato International Airport|Dili|TL|-8.5466|125.5245
DIN|Dien Bien Phu|Dien Bien Phu Airport|Dien Bien Phu|VN|21.3975|103.0080
DIR|Dire Dawa|Aba Tenna Dejazmach Yilma International Airport|Dire Dawa|ET|9.6235|41.8550
DIY|Diyarbakır|Diyarbakır Airport|Diyarbakır|TR|37.8939|40.2010
DJE|Mellita|Djerba Zarzis International Airport|Mellita|TN|33.8737|10.7773
DJG|Djanet|Tiska Djanet Airport|Djanet|DZ|24.2854|9.4637
DJJ|Sentani|Dortheys Hiyo Eluay International Airport|Sentani|ID|-2.5796|140.5199
DJT|웨스트팜비치|President Donald J. Trump International Airport|West Palm Beach|US|26.6832|-80.0956
DKA|Katsina|Umaru Musa Yar'adua Airport|Katsina|NG|13.0078|7.6604
DLA|두알라|Douala International Airport|Douala|CM|4.0061|9.7195
DLE|Dole|Dole Tavaux Airport|Dole|FR|47.0390|5.4276
DLG|Dillingham|Dillingham Airport|Dillingham|US|59.0447|-158.5050
DLH|Duluth|Duluth International Airport|Duluth|US|46.8419|-92.1987
DLM|달라만|Dalaman International Airport|Dalaman|TR|36.7131|28.7925
DLU|Dali|Dali Fengyi Airport|Dali|CN|25.6494|100.3190
DLZ|Dalanzadgad|Dalanzadgad Airport|Dalanzadgad|MN|43.6086|104.3677
DMB|Taraz|Taraz International Airport|Taraz|KZ|42.8536|71.3036
DME|모스크바 도모데도보|Domodedovo International Airport|Moscow|RU|55.4088|37.9063
DMM|담맘|King Fahd International Airport|Ad Dammam|SA|26.4691|49.7982
DMU|Dimapur|Dimapur Airport|Dimapur|IN|25.8839|93.7711
DND|Dundee|Dundee Airport|Dundee|GB|56.4525|-3.0258
DNH|둔황|Dunhuang Mogao International Airport|Dunhuang|CN|40.1620|94.8128
DNZ|Denizli|Çardak Airport|Denizli|TR|37.7856|29.7013
DOD|Dodoma|Dodoma Airport|Dodoma|TZ|-6.1706|35.7560
DOG|Dongola|Dongola Airport|Dongola|SD|19.1537|30.4301
DOL|Deauville|Deauville Normandie airport|Deauville|FR|49.3652|0.1545
DOM|Marigot|Douglas-Charles Airport|Marigot|DM|15.5467|-61.3011
DOV|Dover|Dover Civil Air Terminal/Dover Air Force Base|Dover|US|39.1295|-75.4660
DOY|Dongying|Dongying Shengli Airport|Dongying|CN|37.5014|118.7899
DPL|Dipolog|Dipolog Airport|Dipolog|PH|8.6020|123.3419
DPO|Devonport|Devonport Airport|Devonport|AU|-41.1697|146.4300
DQM|두큼|Duqm International Airport|Duqm|OM|19.5019|57.6342
DRG|Deering|Deering Airport|Deering|US|66.0689|-162.7669
DRO|Durango|Durango La Plata County Airport|Durango|US|37.1515|-107.7540
DRP|레가스피|Bicol International Airport|Legazpi|PH|13.1119|123.6768
DRS|드레스덴|Dresden Airport|Dresden|DE|51.1341|13.7678
DRW|다윈|Darwin International Airport / RAAF Darwin|Darwin|AU|-12.4150|130.8818
DSI|Destin|Destin Executive Airport|Destin|US|30.4001|-86.4715
DSM|디모인|Des Moines International Airport|Des Moines|US|41.5340|-93.6567
DSN|오르도스|Ordos Ejin Horo International Airport|Ordos|CN|39.4935|109.8599
DSO|Sŏndŏng-ni|Sondok Airport|Sŏndŏng-ni|KP|39.7452|127.4740
DSS|다카르|Blaise Diagne International Airport|Dakar|SN|14.6709|-17.0728
DSY|Ta Noun|Dara Sakor International Airport|Ta Noun|KH|10.9142|103.2267
DTM|Dortmund|Dortmund Airport|Dortmund|DE|51.5183|7.6122
DTU|Heihe|Wudalianchi Dedu Airport|Heihe|CN|48.4410|126.1284
DUD|Dunedin|Dunedin International Airport|Dunedin|NZ|-45.9290|170.1978
DUE|Chitato|Dundo Airport|Chitato|AO|-7.4009|20.8185
DUJ|Dubois|DuBois Regional Airport|Dubois|US|41.1783|-78.8987
DUM|Dumai|Pinang Kampai Airport|Dumai|ID|1.6090|101.4335
DUR|더반|King Shaka International Airport|Durban|ZA|-29.6134|31.1179
DUS|뒤셀도르프|Düsseldorf Airport|Düsseldorf|DE|51.2895|6.7668
DUT|Unalaska|Tom Madsen (Dutch Harbor) Airport|Unalaska|US|53.8988|-166.5450
DVL|Devils Lake|Devils Lake Regional Airport|Devils Lake|US|48.1155|-98.9088
DVO|다바오|Francisco Bangoy International Airport|Davao|PH|7.1255|125.6460
DWC|두바이 알막툼|Al Maktoum International Airport|Dubai|AE|24.8962|55.1624
DWD|Dawadmi|Dawadmi Domestic Airport|Dawadmi|SA|24.4499|44.1212
DXN|Gautam Buddha Nagar|Noida International Airport|Gautam Buddha Nagar|IN|28.1799|77.6118
DYR|Anadyr|Ugolny Yuri Ryktheu Airport|Anadyr|RU|64.7349|177.7410
DYU|두샨베|Dushanbe International Airport|Dushanbe|TJ|38.5437|68.8230
DZA|Dzaoudzi|Dzaoudzi Pamandzi International Airport|Dzaoudzi|YT|-12.8093|45.2818
DZH|Dazhou|Dazhou Jinya Airport|Dazhou|CN|31.0488|107.4356
DZN|Zhezkazgan|Zhezkazgan National Airport|Zhezkazgan|KZ|47.7090|67.7381
EAM|Najran|Najran Domestic Airport|Najran|SA|17.6114|44.4192
EAR|Kearney|Kearney Regional Airport|Kearney|US|40.7270|-99.0068
EAS|Hondarribia|San Sebastián Airport|Hondarribia|ES|43.3565|-1.7906
EAT|Wenatchee|Pangborn Memorial Airport|Wenatchee|US|47.3989|-120.2070
EAU|Eau Claire|Chippewa Valley Regional Airport|Eau Claire|US|44.8658|-91.4843
EBA|Campo nell'Elba|Marina di Campo Airport|Campo nell'Elba|IT|42.7609|10.2398
EBB|엔테베|Entebbe International Airport|Entebbe|UG|0.0424|32.4435
EBD|El-Obeid|El-Obeid Airport|El-Obeid|SD|13.1532|30.2327
EBJ|Esbjerg|Esbjerg Airport|Esbjerg|DK|55.5259|8.5534
EBL|에르빌|Erbil International Airport|Arbil|IQ|36.2360|43.9466
ECN|Tymbou|Ercan International Airport|Tymbou|CY|35.1531|33.5074
ECP|Panama City Beach|Northwest Florida Beaches International Airport|Panama City Beach|US|30.3571|-85.7954
EDL|Eldoret|Eldoret International Airport|Eldoret|KE|0.4045|35.2389
EDO|Edremit|Balıkesir Koca Seyit Airport|Edremit|TR|39.5525|27.0102
EFL|Kefallinia Island|Kefalonia International Airport "Anna Pollatou"|Kefallinia Island|GR|38.1201|20.5005
EGC|Bergerac|Bergerac Dordogne-Périgord airport|Bergerac|FR|44.8253|0.5186
EGE|Eagle|Eagle County Regional Airport|Eagle|US|39.6426|-106.9180
EGS|Egilsstaðir|Egilsstaðir Airport|Egilsstaðir|IS|65.2833|-14.4014
EGX|Egegik|Egegik Airport|Egegik|US|58.1844|-157.3749
EHU|Ezhou|Ezhou Huahu International Airport|Ezhou|CN|30.3412|115.0393
EIE|Yeniseysk|Yeniseysk Airport|Yeniseysk|RU|58.4742|92.1125
EIN|에인트호번|Eindhoven Airport|Eindhoven|NL|51.4501|5.3745
EIS|Beef Island|Terrance B. Lettsome International Airport|Beef Island|VG|18.4455|-64.5417
EJA|Barrancabermeja|Yariguíes Airport|Barrancabermeja|CO|7.0243|-73.8068
EJH|Al Wajh|Al Wajh Domestic Airport|Al Wajh|SA|26.1986|36.4764
EKO|Elko|Elko Regional Airport|Elko|US|40.8249|-115.7920
ELC|Elcho Island|Elcho Island Airport|Elcho Island|AU|-12.0194|135.5710
ELD|El Dorado|South Arkansas Regional Airport at Goodwin Field|El Dorado|US|33.2210|-92.8133
ELF|El Fasher|El Fasher Airport|El Fasher|SD|13.6149|25.3246
ELG|El Menia|El Golea Airport|El Menia|DZ|30.5807|2.8616
ELH|North Eleuthera|North Eleuthera Airport|North Eleuthera|BS|25.4758|-76.6808
ELM|Elmira|Elmira Corning Regional Airport|Elmira|US|42.1599|-76.8916
ELP|엘패소|El Paso International Airport|El Paso|US|31.8099|-106.3756
ELQ|카심|Prince Naif bin Abdulaziz International Airport|Qassim|SA|26.3028|43.7744
ELS|East London|King Phalo Airport|East London|ZA|-33.0356|27.8259
ELU|Guemar|Guemar Airport - مطار قمار بالوادي|Guemar|DZ|33.5114|6.7768
EMA|이스트미들랜즈|East Midlands Airport|Nottingham|GB|52.8311|-1.3281
EMD|Emerald|Emerald Airport|Emerald|AU|-23.5675|148.1790
EMK|Emmonak|Emmonak Airport|Emmonak|US|62.7861|-164.4910
ENA|Kenai|Kenai Municipal Airport|Kenai|US|60.5709|-151.2452
ENF|Enontekio|Enontekio Airport|Enontekio|FI|68.3626|23.4243
ENH|Enshi|Enshi Xujiaping Airport|Enshi|CN|30.3203|109.4850
ENO|Encarnación|Teniente Ramon A. Ayub Gonzalez International Airport|Encarnación|PY|-27.2275|-55.8376
ENU|Enegu|Akanu Ibiam International Airport|Enegu|NG|6.4737|7.5605
ENY|Yan'an|Yan'an Nanniwan Airport|Yan'an|CN|36.4794|109.4641
EOH|Medellín|Enrique Olaya Herrera Airport|Medellín|CO|6.2197|-75.5906
EOI|Eday|Eday Airport|Eday|GB|59.1906|-2.7722
EPR|Esperance|Esperance Airport|Esperance|AU|-33.6844|121.8230
EPU|Pärnu|Pärnu Airport|Pärnu|EE|58.4190|24.4728
EQS|Esquel|Esquel Brigadier Antonio Parodi International Airport|Esquel|AR|-42.9080|-71.1395
ERC|Erzincan|Erzincan Airport|Erzincan|TR|39.7102|39.5270
ERF|Erfurt|Erfurt-Weimar Airport|Erfurt|DE|50.9783|10.9607
ERH|Errachidia|Moulay Ali Cherif Airport|Errachidia|MA|31.9475|-4.3983
ERI|Erie|Erie International Tom Ridge Field|Erie|US|42.0831|-80.1739
ERL|Erenhot|Erenhot Saiwusu International Airport|Erenhot|CN|43.4241|112.0911
ERS|Windhoek|Eros Airport|Windhoek|NA|-22.6049|17.0790
ERZ|Erzurum|Erzurum International Airport|Erzurum|TR|39.9565|41.1702
ESB|앙카라|Esenboğa International Airport|Ankara|TR|40.1281|32.9951
ESC|Escanaba|Delta County Airport|Escanaba|US|45.7232|-87.0886
ESD|Eastsound|Orcas Island Airport|Eastsound|US|48.7082|-122.9100
ESL|Elista|Elista Airport|Elista|RU|46.3739|44.3309
ESM|Tachina|Carlos Concha Torres International Airport|Tachina|EC|0.9785|-79.6266
ESR|El Salvador|Ricardo García Posada Airport|El Salvador|CL|-26.3111|-69.7652
ESU|Essaouira|Essaouira-Mogador Airport|Essaouira|MA|31.3975|-9.6817
ETM|에일라트|Ramon International Airport|Eilat|IL|29.7270|35.0141
ETR|Santa Rosa|Santa Rosa - Artillery Colonel Victor Larrea International Airport|Santa Rosa|EC|-3.4420|-79.9970
ETZ|Goin|Metz-Nancy-Lorraine Airport|Goin|FR|48.9821|6.2513
EUG|Eugene|Eugene Airport|Eugene|US|44.1246|-123.2120
EUN|El Aaiún|Laayoune Hassan I International Airport|El Aaiún|EH|27.1425|-13.2249
EUX|Oranjestad|F. D. Roosevelt Airport|Oranjestad|BQ|17.4965|-62.9794
EVE|Evenes|Harstad/Narvik Airport|Evenes|NO|68.4913|16.6781
EVN|예레반|Zvartnots International Airport|Yerevan|AM|40.1489|44.3979
EVV|Evansville|Evansville Regional Airport|Evansville|US|38.0370|-87.5324
EWB|New Bedford|New Bedford Regional Airport|New Bedford|US|41.6761|-70.9569
EWN|New Bern|Coastal Carolina Regional Airport|New Bern|US|35.0730|-77.0429
EXT|Exeter|Exeter International Airport|Exeter|GB|50.7343|-3.4140
EYK|Beloyarskiy Airport|Beloyarskiy Airport|Beloyarskiy Airport|RU|63.6869|66.6986
EYP|Yopal|El Alcaravan - Yopal Airport|Yopal|CO|5.3191|-72.3840
EYW|Key West|Key West International Airport|Key West|US|24.5561|-81.7596
EZS|Elazığ|Elazığ Airport|Elazığ|TR|38.5980|39.2835
FAE|Vágar|Vágar Airport|Vágar|FO|62.0633|-7.2758
FAI|Fairbanks|Fairbanks International Airport|Fairbanks|US|64.8151|-147.8560
FAO|파루|Faro - Gago Coutinho International Airport|Faro|PT|37.0159|-7.9709
FAR|Fargo|Hector International Airport|Fargo|US|46.9207|-96.8158
FAT|프레즈노|Fresno Yosemite International Airport|Fresno|US|36.7758|-119.7180
FAV|Fakarava Airport|Fakarava Airport|Fakarava Airport|PF|-16.0547|-145.6579
FAY|Fayetteville|Fayetteville Regional Airport - Grannis Field|Fayetteville|US|34.9912|-78.8803
FBM|Lubumbashi|Lubumbashi International Airport|Lubumbashi|CD|-11.5915|27.5308
FCA|Kalispell|Glacier Park International Airport|Kalispell|US|48.3105|-114.2560
FCN|Wurster Nordseeküste|Sea-Airport Cuxhaven/Nordholz / Nordholz Naval Airbase|Wurster Nordseeküste|DE|53.7677|8.6592
FDF|Fort-de-France|Martinique Aimé Césaire International Airport|Fort-de-France|MQ|14.5910|-61.0032
FDH|Friedrichshafen|Bodensee Airport Friedrichshafen|Friedrichshafen|DE|47.6713|9.5115
FDU|Bandundu|Bandundu Airport|Bandundu|CD|-3.3113|17.3817
FEG|Fergana|Fergana International Airport|Fergana|UZ|40.3588|71.7450
FEN|Fernando de Noronha|Fernando de Noronha Airport|Fernando de Noronha|BR|-3.8545|-32.4230
FEZ|페스|Fes Saïss International Airport|Saïss|MA|33.9273|-4.9780
FGU|Fangatau|Fangatau Airport|Fangatau|PF|-15.8200|-140.8881
FIH|킨샤사|Ndjili International Airport|Kinshasa|CD|-4.3857|15.4446
FIZ|Fitzroy Crossing Airport|Fitzroy Crossing Airport|Fitzroy Crossing Airport|AU|-18.1836|125.5598
FJR|푸자이라|Fujairah International Airport|Fujairah|AE|25.1084|56.3281
FKB|Rheinmünster|Karlsruhe Baden-Baden Airport|Rheinmünster|DE|48.7794|8.0805
FKI|Kisangani|Bangoka International Airport|Kisangani|CD|0.4816|25.3380
FKQ|Fakfak|Fakfak Airport|Fakfak|ID|-2.9205|132.2670
FKS|Sukagawa|Fukushima Airport|Sukagawa|JP|37.2274|140.4310
FLA|Florencia|Gustavo Artunduaga Paredes Airport|Florencia|CO|1.5892|-75.5644
FLG|Flagstaff|Flagstaff Pulliam Airport|Flagstaff|US|35.1398|-111.6698
FLN|플로리아노폴리스|Hercílio Luz International Airport|Florianópolis|BR|-27.6703|-48.5525
FLO|Florence|Florence Regional Airport|Florence|US|34.1854|-79.7239
FLR|피렌체|Florence Airport, Peretola|Firenze|IT|43.8086|11.2028
FLW|Santa Cruz das Flores|Flores Airport|Santa Cruz das Flores|PT|39.4553|-31.1314
FLZ|Sibolga|Dr. Ferdinand Lumban Tobing Airport|Sibolga|ID|1.5571|98.8871
FMA|Formosa|Formosa National Airport|Formosa|AR|-26.2127|-58.2281
FMI|Kalemie|Kalemie Airport|Kalemie|CD|-5.8756|29.2500
FMM|멤밍겐|Memmingen Allgau Airport|Memmingen|DE|47.9881|10.2382
FMO|Greven|Münster Osnabrück Airport|Greven|DE|52.1338|7.6885
FNA|Freetown|Lungi International Airport|Freetown|SL|8.6164|-13.1955
FNC|마데이라|Cristiano Ronaldo International Airport|Funchal|PT|32.6978|-16.7746
FNI|Nîmes|Nîmes-Arles-Camargue Airport|Nîmes|FR|43.7574|4.4164
FNJ|평양|Pyongyang Sunan International Airport|Pyongyang|KP|39.2241|125.6700
FNT|Flint|Bishop International Airport|Flint|US|42.9693|-83.7434
FOD|Fort Dodge|Fort Dodge Regional Airport|Fort Dodge|US|42.5526|-94.1912
FOG|Foggia|Foggia Gino Lisa Airport|Foggia|IT|41.4336|15.5346
FON|La Fortuna|La Fortuna Arenal Airport|La Fortuna|CR|10.4693|-84.5791
FOR|포르탈레자|Pinto Martins International Airport|Fortaleza|BR|-3.7758|-38.5322
FPO|Freeport|Grand Bahama International Airport|Freeport|BS|26.5580|-78.6956
FRD|Friday Harbor|Friday Harbor Airport|Friday Harbor|US|48.5237|-123.0246
FRL|Forlì|Forlì-Luigi Ridolfi International Airport|Forlì|IT|44.1948|12.0701
FRO|Florø|Florø Airport|Florø|NO|61.5836|5.0247
FRS|San Benito|Mundo Maya International Airport|San Benito|GT|16.9137|-89.8661
FRW|Francistown|Phillip Gaonwe Matante International Airport|Francistown|BW|-21.1592|27.4688
FSC|Figari|Figari Sud-Corse Airport|Figari|FR|41.5018|9.0971
FSD|Sioux Falls|Sioux Falls Regional Airport|Sioux Falls|US|43.5855|-96.7412
FSM|Fort Smith|Fort Smith Regional Airport|Fort Smith|US|35.3366|-94.3674
FSP|Saint-Pierre|Saint-Pierre Pointe-Blanche Airport|Saint-Pierre|PM|46.7627|-56.1750
FTE|El Calafate|El Calafate - Commander Armando Tola International Airport|El Calafate|AR|-50.2803|-72.0534
FTU|Tôlanaro|Tôlanaro Airport|Tôlanaro|MG|-25.0381|46.9561
FTW|Fort Worth|Fort Worth Meacham International Airport|Fort Worth|US|32.8199|-97.3608
FUE|푸에르테벤투라|Fuerteventura Airport|El Matorral|ES|28.4527|-13.8638
FUG|Yingzhou|Fuyang Xiguan Airport|Yingzhou|CN|32.8822|115.7344
FUJ|Goto|Fukue Airport|Goto|JP|32.6663|128.8330
FUN|Funafuti|Funafuti International Airport|Funafuti|TV|-8.5239|179.1970
FUO|Foshan|Foshan Shadi Airport|Foshan|CN|23.0825|113.0708
FWA|Fort Wayne|Fort Wayne International Airport|Fort Wayne|US|40.9789|-85.1945
FYJ|Fuyuan|Fuyuan Dongji Airport|Fuyuan|CN|48.1972|134.3630
FYN|Fuyun|Fuyun Koktokay Airport|Fuyun|CN|46.8042|89.5120
FYU|Fort Yukon|Fort Yukon Airport|Fort Yukon|US|66.5717|-145.2500
GAJ|Higashine|Yamagata Airport|Higashine|JP|38.4119|140.3710
GAL|Galena|Edward G. Pitka Sr Airport|Galena|US|64.7362|-156.9370
GAM|Gambell|Gambell Airport|Gambell|US|63.7677|-171.7333
GAN|간|Gan International Airport|Gan|MV|-0.6930|73.1526
GAQ|Gao|Gao International Airport|Gao|ML|16.2485|-0.0054
GAU|구와하티|Lokpriya Gopinath Bordoloi International Airport|Guwahati|IN|26.1067|91.5852
GAY|Gaya|Gaya Airport|Gaya|IN|24.7443|84.9512
GBB|Gabala|Gabala International Airport|Gabala|AZ|40.8086|47.7254
GBE|가보로네|Sir Seretse Khama International Airport|Gaborone|BW|-24.5552|25.9182
GBJ|Grand-Bourg|Marie-Galante Airport|Grand-Bourg|GP|15.8689|-61.2701
GCC|Gillette|Northeast Wyoming Regional Airport|Gillette|US|44.3489|-105.5390
GCH|Gachsaran|Gachsaran Airport|Gachsaran|IR|30.3339|50.8338
GCI|Saint Peter Port|Guernsey Airport|Saint Peter Port|GG|49.4350|-2.6020
GCK|Garden City|Garden City Regional Airport|Garden City|US|37.9275|-100.7240
GCM|George Town|Owen Roberts International Airport|George Town|KY|19.2928|-81.3577
GCN|Grand Canyon - Tusayan|Grand Canyon National Park Airport|Grand Canyon - Tusayan|US|35.9524|-112.1470
GDB|Gondia|Gondia Airport|Gondia|IN|21.5268|80.2903
GDE|Gode|Gode Airport|Gode|ET|5.9351|43.5786
GDL|과달라하라|Guadalajara International Airport|Guadalajara|MX|20.5233|-103.3101
GDN|그단스크|Gdańsk Lech Wałęsa Airport|Gdańsk|PL|54.3776|18.4662
GDQ|Azezo|Gondar Airport|Azezo|ET|12.5199|37.4340
GDT|Cockburn Town|JAGS McCartney International Airport|Cockburn Town|TC|21.4445|-71.1423
GDV|Glendive|Dawson Community Airport|Glendive|US|47.1377|-104.8069
GDX|Magadan|Sokol Airport|Magadan|RU|59.9110|150.7200
GDZ|Gelendzhik|Gelendzhik Airport|Gelendzhik|RU|44.5821|38.0125
GEA|Nouméa|Nouméa Magenta Airport|Nouméa|NC|-22.2577|166.4728
GEG|스포캔|Spokane International Airport|Spokane|US|47.6199|-117.5340
GEL|Santo Ângelo|Santo Ângelo Airport|Santo Ângelo|BR|-28.2825|-54.1696
GEM|Mengomeyén|President Obiang Nguema International Airport|Mengomeyén|GQ|1.6764|11.0249
GEO|Georgetown|Cheddi Jagan International Airport|Georgetown|GY|6.4985|-58.2541
GER|Nueva Gerona|Rafael Cabrera Airport|Nueva Gerona|CU|21.8347|-82.7838
GES|General Santos|General Santos International Airport|General Santos|PH|6.0572|125.0962
GET|Moonyoonooka|Geraldton Airport|Moonyoonooka|AU|-28.7961|114.7070
GEV|Gällivare|Gällivare Airport|Gällivare|SE|67.1324|20.8146
GFF|Griffith|Griffith Airport|Griffith|AU|-34.2508|146.0670
GFK|Grand Forks|Grand Forks International Airport|Grand Forks|US|47.9493|-97.1761
GGG|Longview|East Texas Regional Airport|Longview|US|32.3840|-94.7115
GGT|Moss Town|Exuma International Airport|Moss Town|BS|23.5626|-75.8780
GGW|Glasgow|Glasgow Valley County Airport Wokal Field|Glasgow|US|48.2125|-106.6150
GHA|El Atteuf|Noumérat - Moufdi Zakaria Airport|El Atteuf|DZ|32.3841|3.7941
GHB|Governor's Harbour|Governor's Harbour Airport|Governor's Harbour|BS|25.2847|-76.3310
GHV|Brașov|Brașov-Ghimbav International Airport|Brașov|RO|45.7056|25.5229
GIB|Gibraltar|Gibraltar Airport|Gibraltar|GI|36.1517|-5.3498
GID|Gitega|Gitega Airport|Gitega|BI|-3.4172|29.9113
GIG|Rio De Janeiro|Rio de Janeiro Galeão – Tom Jobim International Airport|Rio De Janeiro|BR|-22.8100|-43.2506
GIL|Gilgit|Gilgit Airport|Gilgit|PK|35.9188|74.3336
GIS|Gisborne|Gisborne Airport|Gisborne|NZ|-38.6633|177.9780
GIZ|Jizan|Jizan Regional Airport / King Abdullah bin Abdulaziz Airport|Jizan|SA|16.9011|42.5858
GJA|Guanaja|La Laguna Airport|Guanaja|HN|16.4454|-85.9066
GJL|Tahir|Jijel Ferhat Abbas Airport|Tahir|DZ|36.7941|5.8737
GJT|Grand Junction|Grand Junction Regional Airport|Grand Junction|US|39.1267|-108.5294
GKA|Goronka|Goroka Airport|Goronka|PG|-6.0817|145.3920
GKN|Gulkana|Gulkana Airport|Gulkana|US|62.1559|-145.4547
GLA|글래스고|Glasgow Airport|Glasgow|GB|55.8719|-4.4331
GLF|Golfito|Golfito Airport|Golfito|CR|8.6540|-83.1822
GLH|Greenville|Mid Delta Regional Airport|Greenville|US|33.4829|-90.9856
GLT|Gladstone|Gladstone Airport|Gladstone|AU|-23.8698|151.2254
GMA|Gemena|Gemena Airport|Gemena|CD|3.2354|19.7713
GMB|Gambela|Gambela Airport|Gambela|ET|8.1288|34.5631
GME|Gomel|Gomel Airport|Gomel|BY|52.5270|31.0167
GMO|Gombe|Gombe Lawanti International Airport|Gombe|NG|10.2989|10.9000
GMQ|Golog|Golog Maqên Airport|Golog|CN|34.4181|100.3011
GMR|Totegegie Airport|Totegegie Airport|Totegegie Airport|PF|-23.0799|-134.8900
GNB|Grenoble|Grenoble Alpes Isère Airport|Grenoble|FR|45.3629|5.3294
GND|Saint George's|Maurice Bishop International Airport|Saint George's|GD|12.0040|-61.7853
GNJ|Ganja|Ganja International Airport|Ganja|AZ|40.7387|46.3204
GNS|Gunungsitoli|Binaka Airport|Gunungsitoli|ID|1.1663|97.7052
GNV|Gainesville|Gainesville Regional Airport|Gainesville|US|29.6901|-82.2718
GNY|Şanlıurfa|Şanlıurfa GAP Airport|Şanlıurfa|TR|37.4457|38.8956
GOA|제노바|Genoa Cristoforo Colombo Airport|Genova|IT|44.4120|8.8407
GOH|Nuuk|Nuuk International Airport|Nuuk|GL|64.1911|-51.6791
GOI|고아|Goa Dabolim International Airport|Vasco da Gama|IN|15.3801|73.8333
GOJ|Nizhny Novgorod|Nizhny Novgorod / Strigino International Airport|Nizhny Novgorod|RU|56.2274|43.7852
GOM|Goma|Goma International Airport|Goma|CD|-1.6668|29.2380
GOP|Gorakhpur|Gorakhpur Airport|Gorakhpur|IN|26.7397|83.4497
GOQ|Golmud|Golmud Airport|Golmud|CN|36.4006|94.7861
GOT|예테보리|Göteborg Landvetter Airport|Göteborg|SE|57.6628|12.2798
GOU|Garoua|Garoua International Airport|Garoua|CM|9.3348|13.3721
GOV|Nhulunbuy|Gove Airport|Nhulunbuy|AU|-12.2694|136.8180
GOX|고아 모파|Manohar International Airport|Mopa|IN|15.7443|73.8606
GPA|Patras|Patras Araxos Agamemnon Airport|Patras|GR|38.1511|21.4256
GPI|Guapi|Guapi Airport|Guapi|CO|2.5701|-77.8980
GPS|Isla Baltra|Seymour Galapagos Ecological Airport|Isla Baltra|EC|-0.4538|-90.2659
GPT|Gulfport|Gulfport Biloxi International Airport|Gulfport|US|30.4056|-89.0698
GRB|Green Bay|Austin Straubel International Airport|Green Bay|US|44.4835|-88.1308
GRI|Grand Island|Central Nebraska Regional Airport|Grand Island|US|40.9675|-98.3096
GRJ|George|George Airport|George|ZA|-34.0056|22.3789
GRK|Fort Cavazos|Killeen Regional Airport / Robert Gray Army Airfield|Fort Cavazos|US|31.0672|-97.8289
GRO|Girona|Girona-Costa Brava Airport|Girona|ES|41.9046|2.7618
GRQ|Groningen|Groningen Airport Eelde|Groningen|NL|53.1191|6.5777
GRR|그랜드래피즈|Gerald R. Ford International Airport|Grand Rapids|US|42.8808|-85.5228
GRV|Grozny|Akhmat Kadyrov Grozny International Airport|Grozny|RU|43.3881|45.6998
GRW|Santa Cruz da Graciosa|Graciosa Airport|Santa Cruz da Graciosa|PT|39.0922|-28.0298
GRX|Granada|F.G.L. Airport Granada-Jaén Airport|Granada|ES|37.1887|-3.7774
GRY|Grímsey|Grímsey Airport|Grímsey|IS|66.5458|-18.0173
GRZ|그라츠|Graz Airport|Feldkirchen bei Graz|AT|46.9911|15.4396
GSM|Qeshm|Qeshm International Airport|Qeshm|IR|26.7546|55.9024
GSO|그린즈버러|Piedmont Triad International Airport|Greensboro|US|36.0994|-79.9373
GSP|Greenville|Greenville-Spartanburg International Airport|Greenville|US|34.8957|-82.2189
GST|Gustavus|Gustavus Airport|Gustavus|US|58.4253|-135.7070
GSV|Saratov|Gagarin International Airport|Saratov|RU|51.7128|46.1711
GTE|Groote Eylandt|Groote Eylandt Airport|Groote Eylandt|AU|-13.9724|136.4586
GTF|Great Falls|Great Falls International Airport|Great Falls|US|47.4820|-111.3710
GTR|Columbus|Golden Triangle Regional Airport|Columbus|US|33.4503|-88.5914
GUA|과테말라시티|La Aurora International Airport|Guatemala City|GT|14.5829|-90.5275
GUC|Gunnison|Gunnison Crested Butte Regional Airport|Gunnison|US|38.5347|-106.9346
GUP|Gallup|Gallup Municipal Airport|Gallup|US|35.5117|-108.7882
GUR|Gurney|Gurney Airport|Gurney|PG|-10.3115|150.3340
GUW|아티라우|Atyrau International Airport|Atyrau|KZ|47.1213|51.8203
GVR|Governador Valadares|Coronel Altino Machado Airport|Governador Valadares|BR|-18.8959|-41.9829
GWD|Gurandani|New Gwadar International Airport|Gurandani|PK|25.2967|62.4988
GWL|Gwalior|Gwalior Airport|Gwalior|IN|26.2933|78.2278
GWT|Sylt|Westerland Sylt Airport|Sylt|DE|54.9132|8.3405
GXF|Seiyun|Seiyun Hadhramaut International Airport|Seiyun|YE|15.9659|48.7881
GXG|Negage|Negage Airport|Negage|AO|-7.7545|15.2877
GXH|Gannan|Gannan Xiahe Airport|Gannan|CN|34.8190|102.6223
GYA|Guayaramerín|Guayaramerín Airport|Guayaramerín|BO|-10.8886|-65.3810
GYD|바쿠|Heydar Aliyev International Airport|Baku|AZ|40.4728|50.0509
GYE|과야킬|José Joaquín de Olmedo International Airport|Guayaquil|EC|-2.1574|-79.8836
GYM|Guaymas|General José María Yáñez International Airport|Guaymas|MX|27.9690|-110.9250
GYN|Goiânia|Santa Genoveva International Airport|Goiânia|BR|-16.6320|-49.2207
GYS|Guangyuan|Guangyuan Panlong Airport|Guangyuan|CN|32.3903|105.6946
GYU|Guyuan|Guyuan Liupanshan Airport|Guyuan|CN|36.0789|106.2169
GYY|Gary|Gary/Chicago International Airport|Gary|US|41.6171|-87.4132
GZP|Gazipaşa|Gazipaşa-Alanya Airport|Gazipaşa|TR|36.2988|32.2970
GZT|가지안테프|Gaziantep Oğuzeli International Airport|Gaziantep|TR|36.9472|37.4787
HAC|Hachijojima|Hachijojima Airport|Hachijojima|JP|33.1148|139.7856
HAD|Halmstad|Halmstad Airport|Halmstad|SE|56.6911|12.8202
HAH|Moroni|Prince Said Ibrahim International Airport|Moroni|KM|-11.5337|43.2719
HAJ|하노버|Hannover Airport|Hannover|DE|52.4611|9.6851
HAM|함부르크|Hamburg Helmut Schmidt Airport|Hamburg|DE|53.6304|9.9882
HAQ|하닐마두|Hanimaadhoo International Airport|Haa Dhaalu Atoll|MV|6.7432|73.1671
HAS|Hail|Hail International Airport|Hail|SA|27.4379|41.6863
HAU|Karmøy|Haugesund Airport, Karmøy|Karmøy|NO|59.3453|5.2084
HAV|아바나|José Martí International Airport|Havana|CU|22.9892|-82.4091
HBA|호바트|Hobart International Airport|Hobart|AU|-42.8370|147.5130
HBE|알렉산드리아|Alexandria International Airport|Alexandria|EG|30.9325|29.6964
HBX|Hubballi|Hubballi Airport|Hubballi|IN|15.3611|75.0821
HCJ|Hechi|Hechi Jinchengjiang Airport|Hechi|CN|24.8043|107.7108
HCR|Holy Cross|Holy Cross Airport|Holy Cross|US|62.1883|-159.7750
HCZ|Chenzhou|Chenzhou Beihu Airport|Chenzhou|CN|25.7534|112.8454
HDF|Zirchow|Heringsdorf Airport|Zirchow|DE|53.8787|14.1523
HDG|Handan|Handan Airport|Handan|CN|36.5248|114.4241
HDM|Hamadan|Hamadan Airport|Hamadan|IR|34.8664|48.5607
HDN|Hayden|Yampa Valley Airport|Hayden|US|40.4812|-107.2180
HDS|Hoedspruit|Eastgate Airport / Air Force Base Hoedspruit|Hoedspruit|ZA|-24.3619|31.0529
HDY|핫야이|Hat Yai International Airport|Hat Yai|TH|6.9332|100.3930
HEA|Guzara|Herat - Khwaja Abdullah Ansari International Airport|Guzara|AF|34.2100|62.2283
HEH|Heho|Heho Airport|Heho|MM|20.7471|96.7920
HEK|Heihe|Heihe Aihui Airport|Heihe|CN|50.1716|127.3089
HER|이라클리온|Heraklion International Nikos Kazantzakis Airport|Heraklion|GR|35.3397|25.1803
HET|후허하오터|Hohhot Baita International Airport|Hohhot|CN|40.8497|111.8246
HFA|Haifa|Uri Michaeli Haifa International Airport|Haifa|IL|32.8102|35.0437
HFN|Höfn|Hornafjörður Airport|Höfn|IS|64.2956|-15.2272
HFT|Hammerfest|Hammerfest Airport|Hammerfest|NO|70.6797|23.6686
HGA|Hargeisa|Egal International Airport|Hargeisa|SO|9.5141|44.0835
HGI|Hollongi|Itanagar Donyi Polo Hollongi Airport|Hollongi|IN|26.9668|93.6388
HGN|Mae Hong Son|Mae Hong Son Airport|Mae Hong Son|TH|19.3013|97.9758
HGO|Korhogo|Korhogo Airport|Korhogo|CI|9.3872|-5.5567
HGR|Hagerstown|Hagerstown Regional Richard A Henson Field|Hagerstown|US|39.7088|-77.7280
HGU|Mount Hagen|Mount Hagen Kagamuga Airport|Mount Hagen|PG|-5.8282|144.2994
HHH|Hilton Head Island|Hilton Head Airport|Hilton Head Island|US|32.2244|-80.6975
HHN|프랑크푸르트 한|Frankfurt-Hahn Airport|Frankfurt am Main|DE|49.9464|7.2617
HHQ|Hua Hin|Hua Hin Airport|Hua Hin|TH|12.6362|99.9515
HHR|Hawthorne|Jack Northrop Field Hawthorne Municipal Airport|Hawthorne|US|33.9228|-118.3350
HIA|화이안|Huai'an Lianshui Airport|Huai'an|CN|33.7927|119.1267
HIB|Hibbing|Range Regional Airport|Hibbing|US|47.3848|-92.8369
HID|Horn|Horn Island Airport|Horn|AU|-10.5856|142.2928
HII|Lake Havasu City|Lake Havasu City Airport|Lake Havasu City|US|34.5705|-114.3577
HIR|호니아라|Honiara International Airport|Honiara|SB|-9.4280|160.0550
HJJ|Huaihua|Huaihua Zhijiang Airport|Huaihua|CN|27.4431|109.7047
HJR|Khajuraho|Khajuraho Airport|Khajuraho|IN|24.8172|79.9186
HKD|하코다테|Hakodate Airport|Hakodate|JP|41.7700|140.8220
HKK|Hokitika Airfield|Hokitika Airfield|Hokitika Airfield|NZ|-42.7136|170.9850
HKN|Kimbe|Hoskins Airport|Kimbe|PG|-5.4638|150.4073
HLA|요하네스버그 란세리아|Lanseria International Airport|Johannesburg|ZA|-25.9390|27.9266
HLD|하이라얼|Hulunbuir Hailar Airport|Hailar|CN|49.2086|119.8223
HLE|Jamestown|Saint Helena International Airport|Jamestown|SH|-15.9589|-5.6461
HLN|Helena|Helena Regional Airport|Helena|US|46.6068|-111.9830
HLP|자카르타 할림|Halim Perdanakusuma International Airport|Jakarta|ID|-6.2670|106.8903
HLZ|Hamilton|Hamilton International Airport|Hamilton|NZ|-37.8670|175.3320
HMA|Khanty-Mansiysk|Khanty Mansiysk Airport|Khanty-Mansiysk|RU|61.0285|69.0861
HMB|Suhaj|Suhaj International Airport|Suhaj|EG|26.3425|31.7430
HME|Hassi Messaoud|Hassi Messaoud-Oued Irara Krim Belkacem Airport|Hassi Messaoud|DZ|31.6730|6.1404
HMI|Hami|Hami Airport|Hami|CN|42.8414|93.6692
HMO|Hermosillo|General Ignacio L. Pesqueira International Airport|Hermosillo|MX|29.0928|-111.0530
HNA|Hanamaki|Iwate Hanamaki Airport|Hanamaki|JP|39.4286|141.1350
HNM|Hana|Hana Airport|Hana|US|20.7956|-156.0140
HNS|Haines|Haines Airport|Haines|US|59.2439|-135.5239
HNY|Hengyang|Hengyang Nanyue Airport|Hengyang|CN|26.7221|112.6180
HOB|Hobbs|Lea County Regional Airport|Hobbs|US|32.6875|-103.2170
HOF|알아흐사|Al-Ahsa International Airport|Hofuf|SA|25.2853|49.4852
HOG|Holguin|Frank Pais International Airport|Holguin|CU|20.7851|-76.3155
HOI|Otepa|Hao Airport|Otepa|PF|-18.0748|-140.9460
HOM|Homer|Homer Airport|Homer|US|59.6445|-151.4792
HOR|Horta|Horta Airport|Horta|PT|38.5199|-28.7159
HOT|Hot Springs|Memorial Field Airport|Hot Springs|US|34.4788|-93.0963
HOU|휴스턴 하비|William P. Hobby Airport|Houston|US|29.6453|-95.2768
HOV|Ørsta|Ørsta-Volda Airport, Hovden|Ørsta|NO|62.1800|6.0741
HPA|Lifuka|Lifuka Island Airport|Lifuka|TO|-19.7770|-174.3410
HPG|Shennongjia|Shennongjia Hongping Airport|Shennongjia|CN|31.6260|110.3400
HPH|하이퐁|Cat Bi International Airport|Haiphong|VN|20.8174|106.7243
HPN|White Plains|Westchester County Airport|White Plains|US|41.0670|-73.7076
HQL|Tashikuergan|Tashikuergan Hongqilafu Airport|Tashikuergan|CN|37.6613|75.2889
HRE|하라레|Robert Gabriel Mugabe International Airport|Harare|ZW|-17.9318|31.0928
HRG|후르가다|Hurghada International Airport|Hurghada|EG|27.1768|33.7967
HRI|Mattala|Mattala Rajapaksa International Airport|Mattala|LK|6.2839|81.1242
HRL|Harlingen|Valley International Airport|Harlingen|US|26.2285|-97.6544
HRO|Harrison|Boone County Airport|Harrison|US|36.2615|-93.1547
HSA|Turkıstan|Hazrat Sultan International Airport|Turkıstan|KZ|43.3111|68.5504
HSC|Shaoguan|Shaoguan Danxia Airport|Shaoguan|CN|24.9786|113.4210
HSG|사가|Kyushu Saga International Airport|Saga|JP|33.1497|130.3020
HSL|Huslia|Huslia Airport|Huslia|US|65.6979|-156.3510
HSN|저우산|Zhoushan Putuoshan International Airport|Zhoushan|CN|29.9339|122.3623
HSR|Rajkot|Rajkot International Airport|Rajkot|IN|22.3788|71.0394
HSS|Hisar|Maharaja Agrasen International Airport|Hisar|IN|29.1861|75.7414
HSV|Huntsville|Huntsville International Airport|Huntsville|US|34.6362|-86.7744
HTA|Chita|Chita-Kadala International Airport|Chita|RU|52.0248|113.3058
HTG|Khatanga|Khatanga Airport|Khatanga|RU|71.9781|102.4910
HTI|Hamilton Island|Hamilton Island Airport|Hamilton Island|AU|-20.3581|148.9520
HTN|Hotan|Hotan Airport|Hotan|CN|37.0385|79.8649
HTS|Huntington|Tri-State Airport / Milton J. Ferguson Field|Huntington|US|38.3667|-82.5580
HTT|Mengnai|Huatugou Airport|Mengnai|CN|38.2016|90.8378
HTY|Antakya|Hatay Airport|Antakya|TR|36.3608|36.2856
HUH|Fare|Huahine-Fare Airport|Fare|PF|-16.6871|-151.0216
HUI|후에|Phu Bai International Airport|Huế|VN|16.4006|107.7041
HUN|화롄|Hualien Chiashan Airport|Hualien City|TW|24.0232|121.6180
HUO|Holingol|Holingol Huolinhe Airport|Holingol|CN|45.4872|119.4072
HUU|Huánuco|Alferez Fap David Figueroa Fernandini Airport|Huánuco|PE|-9.8788|-76.2048
HUX|Huatulco|Bahías de Huatulco International Airport|Huatulco|MX|15.7754|-96.2605
HUY|Grimsby|Humberside Airport|Grimsby|GB|53.5762|-0.3495
HUZ|Huizhou|Huizhou Pingtan Airport|Huizhou|CN|23.0500|114.6000
HVB|Hervey Bay|Hervey Bay Airport|Hervey Bay|AU|-25.3201|152.8807
HVD|Khovd|Khovd Airport|Khovd|MN|47.9541|91.6282
HVG|Honningsvåg|Honningsvåg Airport, Valan|Honningsvåg|NO|71.0097|25.9836
HVN|New Haven|Tweed New Haven Airport|New Haven|US|41.2629|-72.8877
HVR|Havre|Havre City County Airport|Havre|US|48.5414|-109.7629
HWR|Halwara|Halwara International Airport|Halwara|IN|30.7485|75.6298
HXD|Delingha|Haixi Delingha Airport|Delingha|CN|37.1253|97.2687
HYA|Hyannis|Cape Cod Gateway Airport|Hyannis|US|41.6693|-70.2804
HYD|하이데라바드|Rajiv Gandhi International Airport|Hyderabad|IN|17.2313|78.4299
HYN|Taizhou|Taizhou Luqiao Airport|Taizhou|CN|28.5622|121.4290
HYS|Hays|Hays Regional Airport|Hays|US|38.8445|-99.2731
HZA|Heze|Heze Mudan Airport|Heze|CN|35.2130|115.7367
HZG|Hanzhong|Hanzhong Chenggu Airport|Hanzhong|CN|33.1335|107.2038
HZH|Liping|Liping Airport|Liping|CN|26.3222|109.1499
IAA|Igarka|Igarka Airport|Igarka|RU|67.4372|86.6219
IAG|Niagara Falls|Niagara Falls International Airport|Niagara Falls|US|43.1073|-78.9462
IAM|In Aménas|Zarzaitine - In Aménas Airport|In Aménas|DZ|28.0515|9.6429
IAN|Kiana|Bob Baker Memorial Airport|Kiana|US|66.9761|-160.4390
IAR|Tunoshna|Golden Ring Yaroslavl International Airport|Tunoshna|RU|57.5607|40.1574
IAS|이아시|Iaşi International Airport|Iaşi|RO|47.1796|27.6214
IBA|Ibadan|Ibadan Airport|Ibadan|NG|7.3625|3.9783
IBE|Ibagué|Perales Airport|Ibagué|CO|4.4216|-75.1333
IBR|이바라키|Ibaraki Airport|Omitama|JP|36.1815|140.4144
IBZ|이비사|Ibiza Airport|Ibiza|ES|38.8729|1.3731
ICT|Wichita|Wichita Dwight D. Eisenhower National Airport|Wichita|US|37.6503|-97.4286
IDA|Idaho Falls|Idaho Falls Regional Airport|Idaho Falls|US|43.5146|-112.0710
IDR|인도르|Devi Ahilya Bai Holkar International Airport|Indore|IN|22.7214|75.8005
IEG|Nowe Kramsko|Zielona Góra-Babimost Airport|Nowe Kramsko|PL|52.1385|15.7986
IFJ|Ísafjörður|Ísafjörður Airport|Ísafjörður|IS|66.0581|-23.1353
IFN|이스파한|Isfahan Shahid Beheshti International Airport|Isfahan|IR|32.7551|51.8839
IGA|Matthew Town|Inagua Airport|Matthew Town|BS|20.9750|-73.6669
IGD|Iğdır|Iğdır Airport|Iğdır|TR|39.9766|43.8766
IGR|Puerto Iguazu|Cataratas Del Iguazú International Airport|Puerto Iguazu|AR|-25.7373|-54.4734
IGT|Sunzha|Magas Airport|Sunzha|RU|43.3233|45.0126
IGU|포스두이구아수|Cataratas International Airport|Foz do Iguaçu|BR|-25.5942|-54.4894
IJK|Izhevsk|Izhevsk Airport|Izhevsk|RU|56.8345|53.4622
IKA|테헤란|Imam Khomeini International Airport|Tehran|IR|35.4161|51.1522
IKG|Karakol|Karakol International Airport|Karakol|KG|42.5081|78.4078
IKI|Iki|Iki Airport|Iki|JP|33.7490|129.7850
IKS|Tiksi|Tiksi Airport|Tiksi|RU|71.6977|128.9030
IKU|Tamchy|Issyk-Kul International Airport|Tamchy|KG|42.5856|76.7012
ILD|Lleida|Lleida-Alguaire Airport|Lleida|ES|41.7282|0.5350
ILG|Wilmington|Wilmington Airport|Wilmington|US|39.6787|-75.6065
ILI|Iliamna|Iliamna Airport|Iliamna|US|59.7544|-154.9110
ILM|Wilmington|Wilmington International Airport|Wilmington|US|34.2723|-77.9051
ILO|일로일로|Iloilo International Airport|Cabatuan|PH|10.8330|122.4934
ILP|Île des Pins|Île des Pins Airport|Île des Pins|NC|-22.5889|167.4560
ILQ|Ilo|General Jorge Fernandez Maldon Airport|Ilo|PE|-17.6950|-71.3440
ILR|Ilorin|General Tunde Idiagbon International Airport|Ilorin|NG|8.4402|4.4939
ILS|San Salvador|Ilopango International Airport|San Salvador|SV|13.6995|-89.1199
ILY|Isle of Islay|Islay Airport|Isle of Islay|GB|55.6827|-6.2575
IMF|Imphal|Bir Tikendrajit International Airport|Imphal|IN|24.7600|93.8967
IMP|Imperatriz|Prefeito Renato Moreira Airport|Imperatriz|BR|-5.5313|-47.4600
IMT|Kingsford|Ford Airport|Kingsford|US|45.8191|-88.1146
INC|인촨|Yinchuan Hedong International Airport|Yinchuan|CN|38.3228|106.3932
IND|인디애나폴리스|Indianapolis International Airport|Indianapolis|US|39.7173|-86.2944
INH|Inhambane|Inhambane Airport|Inhambane|MZ|-23.8764|35.4085
INI|Niš|Niš Constantine the Great Airport|Niš|RS|43.3365|21.8562
INL|International Falls|Falls International Airport|International Falls|US|48.5662|-93.4031
INN|인스브루크|Innsbruck Airport|Innsbruck|AT|47.2603|11.3439
INU|Yaren|Nauru International Airport|Yaren|NR|-0.5479|166.9195
INV|Inverness|Inverness Airport|Inverness|GB|57.5425|-4.0475
INZ|In Salah|In Salah Airport|In Salah|DZ|27.2510|2.5120
IOA|Ioannina|Ioannina King Pyrrhus National Airport|Ioannina|GR|39.6964|20.8225
IOM|Castletown|Isle of Man Airport|Castletown|IM|54.0831|-4.6239
IOS|Ilhéus|Bahia - Jorge Amado Airport|Ilhéus|BR|-14.8159|-39.0335
IPC|이스터섬|Mataveri International Airport|Isla De Pascua|CL|-27.1654|-109.4210
IPH|이포|Sultan Azlan Shah Airport|Ipoh|MY|4.5673|101.0916
IPI|Ipiales|San Luis Airport|Ipiales|CO|0.8619|-77.6718
IPL|Imperial|Imperial County Airport|Imperial|US|32.8354|-115.5740
IPN|Ipatinga|Usiminas Airport|Ipatinga|BR|-19.4707|-42.4876
IPT|Williamsport|Williamsport Regional Airport|Williamsport|US|41.2421|-76.9224
IQM|Qiemo|Qiemo Yudu Airport|Qiemo|CN|38.2345|85.4655
IQN|Qingyang|Qingyang Xifeng Airport|Qingyang|CN|35.8026|107.5989
IQQ|Iquique|Diego Aracena International Airport|Iquique|CL|-20.5363|-70.1814
IQT|Iquitos|Coronel FAP Francisco Secada Vignetta International Airport|Iquitos|PE|-3.7847|-73.3088
IRG|Lockhart River|Lockhart River Airport|Lockhart River|AU|-12.7869|143.3050
IRJ|La Rioja|Capitan V A Almonacid Airport|La Rioja|AR|-29.3816|-66.7958
IRK|Kirksville|Kirksville Regional Airport|Kirksville|US|40.0935|-92.5449
IRP|Isiro|Matari Airport|Isiro|CD|2.8276|27.5883
ISA|Mount Isa|Mount Isa Airport|Mount Isa|AU|-20.6664|139.4885
ISB|이슬라마바드|Islamabad International Airport|Attock|PK|33.5490|72.8257
ISE|Isparta|Süleyman Demirel International Airport|Isparta|TR|37.8554|30.3684
ISG|Ishigaki|New Ishigaki Airport|Ishigaki|JP|24.3964|124.2450
ISK|Nashik|Nashik International Airport|Nashik|IN|20.1191|73.9129
ISP|Islip|Long Island MacArthur Airport|Islip|US|40.7963|-73.1017
ISU|Sulaymaniyah|Jalal Talabani International Airport|Sulaymaniyah|IQ|35.5605|45.3151
ITB|Itaituba|Itaituba Airport|Itaituba|BR|-4.2421|-56.0007
ITH|Ithaca|Ithaca Tompkins Regional Airport|Ithaca|US|42.4910|-76.4584
ITO|Hilo|Hilo International Airport|Hilo|US|19.7214|-155.0454
IUE|Alofi|Niue International Airport|Alofi|NU|-19.0801|-169.9235
IVC|Invercargill|Invercargill Airport|Invercargill|NZ|-46.4124|168.3130
IVL|이발로|Ivalo Airport|Ivalo|FI|68.6073|27.4053
IWA|Ivanovo|Ivanovo South Airport|Ivanovo|RU|56.9394|40.9408
IWJ|Masuda|Iwami Airport|Masuda|JP|34.6764|131.7900
IWK|Iwakuni|Iwakuni Kintaikyo Airport|Iwakuni|JP|34.1463|132.2472
IXA|Agartala|Agartala - Maharaja Bir Bikram Airport|Agartala|IN|23.8870|91.2404
IXB|Siliguri|Bagdogra Airport|Siliguri|IN|26.6812|88.3286
IXC|찬디가르|Shaheed Bhagat Singh International Airport|Chandigarh|IN|30.6735|76.7885
IXD|Allahabad|Prayagraj Airport|Allahabad|IN|25.4401|81.7339
IXE|Mangaluru|Mangaluru International Airport|Mangaluru|IN|12.9547|74.8868
IXG|Belgaum|Belagavi Airport|Belgaum|IN|15.8593|74.6183
IXI|Lilabari|Lilabari North Lakhimpur Airport|Lilabari|IN|27.2957|94.0973
IXJ|Jammu|Jammu Airport|Jammu|IN|32.6888|74.8382
IXK|Keshod|Keshod Airport|Keshod|IN|21.3171|70.2704
IXL|Leh|Leh Kushok Bakula Rimpochee Airport|Leh|IN|34.1359|77.5465
IXM|Madurai|Madurai Airport|Madurai|IN|9.8345|78.0934
IXP|Pathankot|Pathankot Airport|Pathankot|IN|32.2336|75.6344
IXR|Ranchi|Birsa Munda Airport|Ranchi|IN|23.3143|85.3217
IXS|Silchar|Silchar Airport|Silchar|IN|24.9129|92.9787
IXU|Aurangabad|Aurangabad Airport|Aurangabad|IN|19.8629|75.3963
IXY|Kandla|Kandla Airport|Kandla|IN|23.1127|70.1003
IXZ|Port Blair|Veer Savarkar International Airport / INS Utkrosh|Port Blair|IN|11.6402|92.7290
IZA|Juiz de Fora|Presidente Itamar Franco Airport|Juiz de Fora|BR|-21.5131|-43.1731
IZO|Izumo|Izumo Enmusubi Airport|Izumo|JP|35.4136|132.8900
IZT|Ixtepec|General Antonio Cárdenas Rodríguez National Airport / Ixtepec Air Base|Ixtepec|MX|16.4460|-95.0937
JAC|Jackson|Jackson Hole Airport|Jackson|US|43.6073|-110.7380
JAE|Jaén|Shumba Airport|Jaén|PE|-5.5925|-78.7740
JAF|Jaffna|Jaffna International Airport|Jaffna|LK|9.7923|80.0701
JAI|자이푸르|Jaipur International Airport|Jaipur|IN|26.8242|75.8122
JAN|Jackson|Jackson-Medgar Wiley Evers International Airport|Jackson|US|32.3112|-90.0759
JAU|Jauja|Francisco Carle Airport|Jauja|PE|-11.7831|-75.4734
JAV|Ilulissat|Ilulissat Airport|Ilulissat|GL|69.2456|-51.0522
JAX|잭슨빌|Jacksonville International Airport|Jacksonville|US|30.4925|-81.6878
JBQ|La Isabela|La Isabela International Airport|La Isabela|DO|18.5725|-69.9856
JBR|Jonesboro|Jonesboro Municipal Airport|Jonesboro|US|35.8317|-90.6464
JCL|České Budějovice|České Budějovice South Bohemian Airport|České Budějovice|CZ|48.9482|14.4283
JDF|Juiz de Fora|Francisco de Assis Airport|Juiz de Fora|BR|-21.7915|-43.3861
JDH|Jodhpur|Jodhpur Airport|Jodhpur|IN|26.2511|73.0489
JDZ|Jingdezhen|Jingdezhen Luojia Airport|Jingdezhen|CN|29.3386|117.1760
JEE|Carrefour Sanon|Jérémie Airport|Carrefour Sanon|HT|18.6631|-74.1703
JEG|Aasiaat|Aasiaat Airport|Aasiaat|GL|68.7218|-52.7847
JER|St. Peter|Jersey Airport|St. Peter|JE|49.2079|-2.1955
JGA|Jamnagar|Jamnagar Airport|Jamnagar|IN|22.4655|70.0126
JGD|Jiagedaqi|Daxing'anling Elunchun Airport|Jiagedaqi|CN|50.3714|124.1175
JGN|Jiayuguan|Jiayuguan International Airport|Jiayuguan|CN|39.8591|98.3393
JGS|Ji'an|Jinggangshan Airport|Ji'an|CN|26.8569|114.7370
JHB|조호르바루|Senai International Airport|Johor Bahru|MY|1.6413|103.6700
JHG|시솽반나|Xishuangbanna Gasa International Airport|Jinghong|CN|21.9746|100.7622
JHM|Lahaina|Kapalua Airport|Lahaina|US|20.9629|-156.6730
JHS|Sisimiut|Sisimiut Airport|Sisimiut|GL|66.9513|-53.7293
JIB|지부티|Djibouti-Ambouli Airport|Djibouti City|DJ|11.5473|43.1595
JIC|Jinchang|Jinchang Jinchuan Airport|Jinchang|CN|38.5422|102.3483
JIJ|Jijiga|Gerad Wilwal International Airport|Jijiga|ET|9.3319|42.9118
JIM|Jimma|Jimma Airport|Jimma|ET|7.6661|36.8166
JIQ|Qianjiang|Qianjiang Wulingshan Airport|Qianjiang|CN|29.5133|108.8311
JJD|Cruz|Comandante Ariston Pessoa Airport|Cruz|BR|-2.9064|-40.3573
JJN|취안저우|Quanzhou Jinjiang International Airport|Quanzhou|CN|24.7959|118.5886
JJU|Qaqortoq|Qaqortoq Airport|Qaqortoq|GL|60.7638|-46.0650
JKG|Jönköping|Jönköping Airport|Jönköping|SE|57.7576|14.0687
JKH|Chios Island|Chios Island National Airport|Chios Island|GR|38.3432|26.1406
JKR|Janakpur|Janakpur Airport|Janakpur|NP|26.7088|85.9224
JLN|Joplin|Joplin Regional Airport|Joplin|US|37.1518|-94.4983
JLR|Jabalpur|Jabalpur Airport|Jabalpur|IN|23.1778|80.0520
JMJ|Pu'er|Lancang Jingmai Airport|Pu'er|CN|22.4177|99.7840
JMK|Mykonos|Mykonos Island National Airport|Mykonos|GR|37.4351|25.3481
JMS|Jamestown|Jamestown Regional Airport|Jamestown|US|46.9297|-98.6782
JMU|Jiamusi|Jiamusi Songjiang International Airport|Jiamusi|CN|46.8428|130.4643
JNG|Jining|Jining Da'an Airport|Jining|CN|35.6474|116.7433
JNH|Xiuzhou|Jiaxing Nanhu Airport|Xiuzhou|CN|30.6981|120.6631
JNU|Juneau|Juneau International Airport|Juneau|US|58.3549|-134.5744
JNZ|Jinzhou|Jinzhou Bay Airport|Jinzhou|CN|40.9360|121.2771
JOE|Joensuu|Joensuu Airport|Joensuu|FI|62.6588|29.6194
JOG|Yogyakarta|Adisutjipto International Airport|Yogyakarta|ID|-7.7882|110.4320
JOI|Joinville|Lauro Carneiro de Loyola Airport|Joinville|BR|-26.2245|-48.7974
JOL|Jolo|Jolo Airport|Jolo|PH|6.0537|121.0110
JOS|Jos|Yakubu Gowon Airport|Jos|NG|9.6398|8.8691
JPA|João Pessoa|Presidente Castro Pinto International Airport|João Pessoa|BR|-7.1487|-34.9506
JRH|Jorhat|Jorhat Airport|Jorhat|IN|26.7305|94.1754
JRO|킬리만자로|Kilimanjaro International Airport|Arusha|TZ|-3.4270|37.0735
JSA|Jaisalmer Airport|Jaisalmer Airport|Jaisalmer Airport|IN|26.8887|70.8650
JSH|Crete Island|Sitia Airport|Crete Island|GR|35.2161|26.1013
JSI|Skiathos|Skiathos Island National Airport|Skiathos|GR|39.1771|23.5037
JSJ|Jiansanjiang|Jiansanjiang Shidi Airport|Jiansanjiang|CN|47.1082|132.6579
JSR|Jashore|Jessore Airport|Jashore|BD|23.1838|89.1608
JST|Johnstown|John Murtha Johnstown Cambria County Airport|Johnstown|US|40.3161|-78.8339
JTC|Bauru|Bauru/Arealva–Moussa Nakhal Tobias State Airport|Bauru|BR|-22.1608|-49.0703
JTR|산토리니|Santorini International Airport|Santorini Island|GR|36.4000|25.4786
JUB|Juba|Juba International Airport|Juba|SS|4.8720|31.6011
JUJ|San Salvador de Jujuy|Gobernador Horacio Guzman International Airport|San Salvador de Jujuy|AR|-24.3928|-65.0978
JUL|Juliaca|Inca Manco Capac International Airport|Juliaca|PE|-15.4677|-70.1565
JUZ|Quzhou|Quzhou Airport|Quzhou|CN|28.9661|118.8988
JXA|Jixi|Jixi Xingkaihu Airport|Jixi|CN|45.2930|131.1930
JYV|Jyväskylän Maalaiskunta|Jyväskylä Airport|Jyväskylän Maalaiskunta|FI|62.3995|25.6783
JZH|Ngawa|Jiuzhai Huanglong Airport|Ngawa|CN|32.8533|103.6822
KAB|Kariba|Kariba Airport|Kariba|ZW|-16.5198|28.8850
KAC|Qamishli|Qamishli International Airport|Qamishli|SY|37.0206|41.1914
KAD|Kaduna|Kaduna International Airport|Kaduna|NG|10.6960|7.3201
KAI|Kaieteur Falls|Kaieteur Airport|Kaieteur Falls|GY|5.1773|-59.4890
KAJ|Kajaani|Kajaani Airport|Kajaani|FI|64.2855|27.6924
KAN|Kano|Mallam Aminu Kano International Airport|Kano|NG|12.0456|8.5236
KAO|Kuusamo|Kuusamo Airport|Kuusamo|FI|65.9876|29.2394
KAT|Awanui|Kaitaia Airport|Awanui|NZ|-35.0698|173.2871
KAW|Kawthoung|Kawthoung Airport|Kawthoung|MM|10.0493|98.5380
KBL|카불|Kabul International Airport|Kabul|AF|34.5659|69.2123
KBR|Kota Baharu|Sultan Ismail Petra Airport|Kota Baharu|MY|6.1669|102.2930
KBV|크라비|Krabi International Airport|Krabi|TH|8.0956|98.9890
KCH|쿠칭|Kuching International Airport|Kuching|MY|1.4874|110.3529
KCM|Kahramanmaraş|Kahramanmaraş Airport|Kahramanmaraş|TR|37.5388|36.9535
KCT|Galle|Koggala Airport|Galle|LK|5.9937|80.3203
KCY|Krasnoyarsk|Krasnoyarsk Cheremshanka Airport|Krasnoyarsk|RU|56.1776|92.5459
KCZ|고치|Kochi Ryoma Airport|Nankoku|JP|33.5452|133.6702
KDH|Kandahar|Ahmad Shah Baba International Airport|Kandahar|AF|31.5058|65.8480
KDL|Kärdla|Kärdla Airport|Kärdla|EE|58.9908|22.8307
KDM|Huvadhu Atoll|Kaadedhdhoo Airport|Huvadhu Atoll|MV|0.4881|72.9969
KDO|Kadhdhoo|Kadhdhoo Airport|Kadhdhoo|MV|1.8592|73.5219
KDU|Skardu|Skardu International Airport|Skardu|PK|35.3387|75.5386
KEF|레이캬비크|Keflavik International Airport|Reykjavík|IS|63.9850|-22.6056
KEJ|Kemerovo|Alexei Leonov Kemerovo International Airport|Kemerovo|RU|55.2701|86.1072
KEM|Kemi|Kemi-Tornio Airport|Kemi|FI|65.7787|24.5821
KEP|Nepalgunj|Nepalgunj Airport|Nepalgunj|NP|28.1036|81.6670
KER|Kerman|Ayatollah Hashemi Rafsanjani International Airport|Kerman|IR|30.2713|56.9497
KET|Kengtung|Kengtung Airport|Kengtung|MM|21.3016|99.6360
KFS|Kastamonu|Kastamonu Airport|Kastamonu|TR|41.3142|33.7958
KGA|Kananga|Kananga Airport|Kananga|CD|-5.9001|22.4692
KGC|Kingscote Airport|Kingscote Airport|Kingscote Airport|AU|-35.7139|137.5210
KGD|칼리닌그라드|Khrabrovo Airport|Kaliningrad|RU|54.8916|20.5986
KGF|카라간다|Sary-Arka Airport|Karaganda|KZ|49.6708|73.3344
KGI|Broadwood|Kalgoorlie Boulder Airport|Broadwood|AU|-30.7915|121.4646
KGL|키갈리|Kigali International Airport|Kigali|RW|-1.9686|30.1395
KGP|Kogalym|Kogalym International Airport|Kogalym|RU|62.1904|74.5338
KGS|코스|Kos International Airport "Ippokratis"|Kos Island|GR|36.7945|27.0911
KGT|Garzê|Kangding Airport|Garzê|CN|30.1425|101.7387
KHD|Khoram Abad Airport|Khoram Abad Airport|Khoram Abad Airport|IR|33.4354|48.2829
KHG|카슈가르|Kashgar Laining International Airport|Kashgar|CN|39.5423|76.0202
KHI|카라치|Jinnah International Airport|Karachi|PK|24.9065|67.1608
KHK|Khark|Khark Airport|Khark|IR|29.2605|50.3222
KHN|난창|Nanchang Changbei International Airport|Nanchang|CN|28.8648|115.9027
KHS|Khasab|Khasab Airport|Khasab|OM|26.1710|56.2406
KHT|Khost|Khost International Airport|Khost|AF|33.2846|69.8073
KHV|Khabarovsk|Khabarovsk Novy Airport|Khabarovsk|RU|48.5283|135.1886
KHX|Kihihi|Savannah Airstrip|Kihihi|UG|-0.7165|29.6997
KIH|키시|Kish International Airport|Kish Island|IR|26.5254|53.9805
KIK|키르쿠크|Kirkuk International Airport|Kirkuk|IQ|35.4695|44.3489
KIM|Kimberley|Kimberley Airport|Kimberley|ZA|-28.8054|24.7649
KIN|킹스턴|Norman Manley International Airport|Kingston|JM|17.9357|-76.7875
KIR|Farranfore|Kerry Airport|Farranfore|IE|52.1809|-9.5238
KIS|Kisumu|Kisumu International Airport|Kisumu|KE|-0.0861|34.7289
KJA|크라스노야르스크|Krasnoyarsk International Airport|Krasnoyarsk|RU|56.1757|92.4858
KJB|Orvakal|Kurnool Airport|Orvakal|IN|15.7163|78.1692
KJH|Kaili|Kaili Huangping Airport|Kaili|CN|26.9720|107.9880
KJI|Burqin|Burqin Kanas Airport|Burqin|CN|48.2223|86.9959
KJT|Kertajati|Kertajati International Airport|Kertajati|ID|-6.6474|108.1656
KKC|Khon Kaen|Khon Kaen Airport|Khon Kaen|TH|16.4666|102.7840
KKE|Kerikeri|Kerikeri Airport|Kerikeri|NZ|-35.2591|173.9133
KKJ|기타큐슈|Kitakyushu Airport|Kitakyushu|JP|33.8459|131.0350
KKN|Kirkenes|Kirkenes Airport, Høybuktmoen|Kirkenes|NO|69.7258|29.8913
KKR|Raitahiti|Kaukura Airport|Raitahiti|PF|-15.6633|-146.8850
KKS|Kashan|Kashan Airport|Kashan|IR|33.8953|51.5770
KKW|Kikwit|Kikwit Airport|Kikwit|CD|-5.0358|18.7856
KKX|Kikai|Kikai Airport|Kikai|JP|28.3213|129.9280
KLH|Kolhapur|Kolhapur Airport|Kolhapur|IN|16.6647|74.2894
KLR|Kalmar|Kalmar Airport|Kalmar|SE|56.6855|16.2876
KLU|Klagenfurt am Wörthersee|Klagenfurt Airport|Klagenfurt am Wörthersee|AT|46.6425|14.3377
KLV|Karlovy Vary|Karlovy Vary Airport|Karlovy Vary|CZ|50.2030|12.9150
KLW|Klawock|Klawock Airport|Klawock|US|55.5792|-133.0760
KLX|Kalamata|Kalamata Airport|Kalamata|GR|37.0683|22.0255
KMA|Kerema|Kerema Airport|Kerema|PG|-7.9636|145.7710
KMC|King Khaled Military City|King Khaled Military City Airport|King Khaled Military City|SA|27.9009|45.5282
KME|Kamembe|Kamembe Airport|Kamembe|RW|-2.4622|28.9079
KMS|Kumasi|Prempeh I International Airport|Kumasi|GH|6.7146|-1.5908
KMW|Kostroma|Kostroma Sokerkino Airport|Kostroma|RU|57.7969|41.0194
KND|Kindu|Kindu Airport|Kindu|CD|-2.9192|25.9154
KNG|Kaimana|Utarom Airport|Kaimana|ID|-3.6446|133.6951
KNH|Shang-I|Kinmen Airport|Shang-I|TW|24.4279|118.3590
KNO|메단|Kualanamu International Airport|Beringin|ID|3.6378|98.8706
KNQ|Koné|Koné Airport|Koné|NC|-21.0536|164.8388
KNS|King Island Airport|King Island Airport|King Island Airport|AU|-39.8775|143.8780
KNU|Kanpur|Kanpur Airport|Kanpur|IN|26.4043|80.4101
KNX|Kununurra|East Kimberley Regional (Kununurra) Airport|Kununurra|AU|-15.7781|128.7080
KOE|Kupang|El Tari Airport|Kupang|ID|-10.1716|123.6710
KOI|Kirkwall|Kirkwall Airport|Kirkwall|GB|58.9579|-2.9051
KOK|Kokkola|Kokkola-Pietarsaari Airport|Kokkola|FI|63.7212|23.1431
KOP|Nakhon Phanom|Nakhon Phanom Airport|Nakhon Phanom|TH|17.3838|104.6430
KOS|시아누크빌|Sihanouk International Airport|Preah Sihanouk|KH|10.5706|103.6321
KOV|Kokshetau|Kokshetau International Airport|Kokshetau|KZ|53.3291|69.5946
KPW|Keperveem|Keperveem Airport|Keperveem|RU|67.8450|166.1400
KQH|Ajmer|Kishangarh Airport Ajmer|Ajmer|IN|26.5910|74.8130
KQT|Bokhtar|Bokhtar International Airport|Bokhtar|TJ|37.8663|68.8645
KRF|Nyland|Kramfors-Sollefteå Höga Kusten Airport|Nyland|SE|63.0486|17.7689
KRK|크라쿠프|Kraków John Paul II International Airport|Balice|PL|50.0777|19.7848
KRL|Korla|Korla Licheng Airport|Korla|CN|41.6150|86.1408
KRN|Kiruna|Kiruna Airport|Kiruna|SE|67.8220|20.3368
KRO|Kurgan|Kurgan Airport|Kurgan|RU|55.4753|65.4156
KRP|Karup|Midtjyllands Airport / Air Base Karup|Karup|DK|56.2971|9.1043
KRR|크라스노다르|Krasnodar Pashkovsky International Airport|Krasnodar|RU|45.0345|39.1742
KRS|Kristiansand|Kristiansand Airport|Kristiansand|NO|58.2042|8.0854
KRT|하르툼|Khartoum International Airport|Khartoum|SD|15.5895|32.5532
KRW|Turkmenbaşy|Turkmenbaşy International Airport|Turkmenbaşy|TM|40.0628|53.0051
KSA|Okat|Kosrae International Airport|Okat|FM|5.3570|162.9580
KSC|Košice|Košice International Airport|Košice|SK|48.6631|21.2411
KSD|Karlstad|Karlstad Airport|Karlstad|SE|59.4447|13.3374
KSF|Calden|Kassel Airport|Calden|DE|51.4184|9.3916
KSH|Kermanshah|Shahid Ashrafi Esfahani Airport|Kermanshah|IR|34.3459|47.1581
KSL|Kassala|Kassala Airport|Kassala|SD|15.3875|36.3288
KSN|Kostanay|Kostanay International Airport|Kostanay|KZ|53.2069|63.5503
KSU|Kvernberget|Kristiansund Airport, Kvernberget|Kvernberget|NO|63.1118|7.8245
KSY|Kars|Kars Airport|Kars|TR|40.5622|43.1150
KSZ|Kotlas|Kotlas Airport|Kotlas|RU|61.2358|46.6975
KTA|Karratha|Karratha Airport|Karratha|AU|-20.7122|116.7730
KTD|Kitadaitōjima|Kitadaito Airport|Kitadaitōjima|JP|25.9447|131.3270
KTG|Ketapang|Rahadi Osman Airport|Ketapang|ID|-1.8172|109.9635
KTN|Ketchikan|Ketchikan International Airport|Ketchikan|US|55.3556|-131.7140
KTP|Tinson Pen|Tinson Pen Airport|Tinson Pen|JM|17.9886|-76.8238
KTT|키틸레|Kittilä International Airport|Kittilä|FI|67.7010|24.8468
KTW|카토비체|Katowice Wojciech Korfanty International Airport|Katowice|PL|50.4760|19.0807
KUA|Kuantan|Kuantan Airport|Kuantan|MY|3.7754|103.2090
KUF|사마라|Kurumoch International Airport|Samara|RU|53.5049|50.1643
KUH|Kushiro|Kushiro Airport|Kushiro|JP|43.0410|144.1930
KUM|Yakushima|Yakushima Airport|Yakushima|JP|30.3856|130.6590
KUN|카우나스|Kaunas International Airport|Kaunas|LT|54.9640|24.0858
KUO|Kuopio|Kuopio Airport|Kuopio|FI|63.0071|27.7978
KUS|Kulusuk|Kulusuk Airport|Kulusuk|GL|65.5736|-37.1236
KUT|쿠타이시|David the Builder Kutaisi International Airport|Kopitnari|GE|42.1774|42.4854
KUU|Bhuntar|Kullu Manali Airport|Bhuntar|IN|31.8767|77.1544
KVA|Kavala|Kavala Alexander the Great International Airport|Kavala|GR|40.9133|24.6192
KVG|Kavieng|Kavieng Airport|Kavieng|PG|-2.5794|150.8080
KVO|Kraljevo|Morava Airport|Kraljevo|RS|43.8175|20.5867
KVX|Kirov|Pobedilovo Airport|Kirov|RU|58.5039|49.3478
KWA|Kwajalein|Bucholz Army Air Field|Kwajalein|MH|8.7201|167.7320
KWE|구이양|Guiyang Longdongbao International Airport|Guiyang|CN|26.5418|106.8040
KWI|쿠웨이트|Kuwait International Airport|Kuwait City|KW|29.2245|47.9698
KWL|구이린|Guilin Liangjiang International Airport|Guilin|CN|25.2198|110.0396
KWM|Kowanyama|Kowanyama Airport|Kowanyama|AU|-15.4854|141.7526
KWZ|Kolwezi|Kolwezi Airport|Kolwezi|CD|-10.7659|25.5057
KXB|Kolaka|Sangia Nibandera Airport|Kolaka|ID|-4.3382|121.5240
KXK|Komsomolsk-on-Amur|Komsomolsk-on-Amur Airport|Komsomolsk-on-Amur|RU|50.4090|136.9340
KYA|콘야|Konya Airport|Konya|TR|37.9790|32.5619
KYD|Orchid Island|Lanyu Airport|Orchid Island|TW|22.0270|121.5350
KYP|Kyaukpyu|Kyaukpyu Airport|Kyaukpyu|MM|19.4264|93.5348
KYS|Kayes|Kayes Dag Dag Airport|Kayes|ML|14.4825|-11.3993
KYZ|Kyzyl|Kyzyl Airport|Kyzyl|RU|51.6694|94.4006
KZI|Kozani|Kozani National Airport Filippos|Kozani|GR|40.2861|21.8408
KZN|카잔|Kazan International Airport|Kazan|RU|55.6062|49.2787
KZO|Kyzylorda|Korkyt Ata International Airport|Kyzylorda|KZ|44.7069|65.5925
KZR|Altıntaş|Zafer Airport|Altıntaş|TR|39.1111|30.1304
LAE|Lae|Nadzab Tomodachi International Airport|Lae|PG|-6.5680|146.7265
LAF|West Lafayette|Purdue University Airport|West Lafayette|US|40.4129|-86.9394
LAJ|Lages|Lages Airport|Lages|BR|-27.7821|-50.2815
LAL|Lakeland|Lakeland Linder International Airport|Lakeland|US|27.9893|-82.0207
LAN|Lansing|Capital Region International Airport|Lansing|US|42.7776|-84.5857
LAO|라오아그|Laoag International Airport|Laoag City|PH|18.1751|120.5310
LAP|La Paz|Manuel Márquez de León International Airport|La Paz|MX|24.0723|-110.3627
LAQ|Al Albraq|Al Abraq International Airport|Al Albraq|LY|32.7890|21.9549
LAR|Laramie|Laramie Regional Airport|Laramie|US|41.3121|-105.6750
LAU|Lamu|Manda Airport|Lamu|KE|-2.2524|40.9129
LAW|Lawton|Lawton Fort Sill Regional Airport|Lawton|US|34.5677|-98.4166
LBA|리즈|Leeds Bradford Airport|Leeds|GB|53.8659|-1.6606
LBB|Lubbock|Lubbock Preston Smith International Airport|Lubbock|US|33.6636|-101.8230
LBC|Lübeck|Lübeck Blankensee Airport|Lübeck|DE|53.8054|10.7192
LBD|Khujand|Khujand International Airport|Khujand|TJ|40.2154|69.6947
LBE|Latrobe|Arnold Palmer Regional Airport|Latrobe|US|40.2759|-79.4048
LBF|North Platte|North Platte Regional Airport Lee Bird Field|North Platte|US|41.1262|-100.6840
LBL|Liberal|Liberal Mid-America Regional Airport|Liberal|US|37.0442|-100.9600
LBS|Labasa|Labasa Airport|Labasa|FJ|-16.4667|179.3400
LBU|Labuan|Labuan Airport|Labuan|MY|5.3017|115.2483
LBV|리브르빌|Libreville Leon M'ba International Airport|Libreville|GA|0.4590|9.4121
LCA|라르나카|Larnaca International Airport|Larnaca|CY|34.8751|33.6249
LCE|La Ceiba|Golosón International Airport|La Ceiba|HN|15.7425|-86.8530
LCG|Culleredo|A Coruña Airport|Culleredo|ES|43.3021|-8.3773
LCH|Lake Charles|Lake Charles Regional Airport|Lake Charles|US|30.1261|-93.2233
LCJ|Łódź|Łódź Władysław Reymont Airport|Łódź|PL|51.7219|19.3981
LCK|Columbus|Rickenbacker International Airport|Columbus|US|39.8138|-82.9278
LCX|Longyan|Liancheng Guanzhishan Airport|Longyan|CN|25.6759|116.7459
LCY|London|London City Airport|London|GB|51.5053|0.0553
LDB|Londrina|Governor José Richa Airport|Londrina|BR|-23.3344|-51.1284
LDE|Tarbes|Tarbes-Lourdes-Pyrénées Airport|Tarbes|FR|43.1787|-0.0064
LDS|Yichun|Yichun Lindu Airport|Yichun|CN|47.7521|129.0191
LDU|Lahad Datu|Lahad Datu Airport|Lahad Datu|MY|5.0324|118.3238
LDX|Saint-Laurent-du-Maroni|Saint-Laurent-du-Maroni Airport|Saint-Laurent-du-Maroni|GF|5.4819|-54.0350
LDY|Derry|City of Derry Airport|Derry|GB|55.0428|-7.1611
LEA|Exmouth|Learmonth Airport|Exmouth|AU|-22.2352|114.0900
LEB|Lebanon|Lebanon Municipal Airport|Lebanon|US|43.6261|-72.3042
LEI|Almería|Almería Airport|Almería|ES|36.8439|-2.3701
LEJ|라이프치히|Leipzig/Halle Airport|Schkeuditz|DE|51.4207|12.2327
LEN|La Virgen del Camino|León Airport|La Virgen del Camino|ES|42.5907|-5.6534
LER|Leinster Airport|Leinster Airport|Leinster Airport|AU|-27.8433|120.7030
LET|Leticia|Alfredo Vásquez Cobo International Airport|Leticia|CO|-4.1911|-69.9420
LEU|La Seu d'Urgell Pyrenees and Andorra|Pirineus - la Seu d'Urgel Airport|La Seu d'Urgell Pyrenees and Andorra|ES|42.3386|1.4092
LEX|Lexington|Blue Grass Airport|Lexington|US|38.0351|-84.6067
LFM|Lamerd|Lamerd Airport|Lamerd|IR|27.3727|53.1888
LFQ|Linfen|Linfen Yaodu Airport|Linfen|CN|36.1326|111.6412
LFT|Lafayette|Lafayette Regional Airport|Lafayette|US|30.2053|-91.9876
LFW|Lomé|Lomé–Tokoin International Airport|Lomé|TG|6.1656|1.2545
LGB|롱비치|Long Beach International Airport|Long Beach|US|33.8165|-118.1499
LGG|Grâce-Hollogne|Liège Airport|Grâce-Hollogne|BE|50.6386|5.4439
LGI|Deadman's Cay|Deadman's Cay Airport|Deadman's Cay|BS|23.1790|-75.0936
LGK|랑카위|Langkawi International Airport|Langkawi|MY|6.3297|99.7287
LHE|라호르|Allama Iqbal International Airport|Lahore|PK|31.5216|74.4036
LHG|Lightning Ridge Airport|Lightning Ridge Airport|Lightning Ridge Airport|AU|-29.4529|147.9771
LHL|Lachin|Lachin International Airport|Lachin|AZ|39.8838|46.3631
LHS|Las Heras|Las Heras Airport|Las Heras|AR|-46.5385|-68.9653
LHW|란저우|Lanzhou Zhongchuan International Airport|Lanzhou|CN|36.5152|103.6200
LIF|Lifou|Lifou Airport|Lifou|NC|-20.7746|167.2393
LIG|Limoges|Limoges Airport|Limoges|FR|45.8628|1.1794
LIH|카우아이|Lihue Airport|Lihue|US|21.9744|-159.3371
LIL|Lesquin|Lille Airport|Lesquin|FR|50.5666|3.1024
LIN|밀라노 리나테|Milano Linate Airport|Segrate|IT|45.4451|9.2767
LIO|Limón|Limón International Airport|Limón|CR|9.9580|-83.0220
LIR|리베리아|Daniel Oduber Quirós International Airport|Liberia|CR|10.5933|-85.5444
LIT|Little Rock|Bill & Hillary Clinton National Airport/Adams Field|Little Rock|US|34.7292|-92.2236
LIW|Loikaw|Loikaw Airport|Loikaw|MM|19.6915|97.2148
LJG|리장|Lijiang Sanyi International Airport|Lijiang|CN|26.6775|100.2449
LJU|류블랴나|Ljubljana Jože Pučnik Airport|Zgornji Brnik|SI|46.2237|14.4576
LKL|Lakselv|Lakselv Airport, Banak|Lakselv|NO|70.0688|24.9735
LKN|Leknes|Leknes Airport|Leknes|NO|68.1525|13.6094
LKO|러크나우|Chaudhary Charan Singh International Airport|Lucknow|IN|26.7606|80.8893
LLA|Luleå|Luleå Airport|Luleå|SE|65.5438|22.1220
LLF|Yongzhou|Yongzhou Lingling Airport|Yongzhou|CN|26.3387|111.6100
LLV|Lüliang|Lüliang Dawu Airport|Lüliang|CN|37.6833|111.1428
LLW|Lumbadzi|Kamuzu International Airport|Lumbadzi|MW|-13.7894|33.7810
LMM|Los Mochis|Valle del Fuerte International Airport|Los Mochis|MX|25.6855|-109.0812
LMN|Limbang|Limbang Airport|Limbang|MY|4.8083|115.0100
LMP|Lampedusa|Lampedusa Airport|Lampedusa|IT|35.4979|12.6181
LNJ|Lincang|Lincang Boshang Airport|Lincang|CN|23.7381|100.0250
LNK|Lincoln|Lincoln Airport|Lincoln|US|40.8449|-96.7618
LNL|Longnan|Longnan Chengzhou Airport|Longnan|CN|33.7899|105.7900
LNO|Leonora|Leonora Airport|Leonora|AU|-28.8781|121.3150
LNS|Lancaster|Lancaster Airport|Lancaster|US|40.1217|-76.2961
LNY|Lanai City|Lanai Airport|Lanai City|US|20.7857|-156.9513
LNZ|린츠|Linz-Hörsching Airport|Linz|AT|48.2354|14.1881
LOE|Loei Airport|Loei Airport|Loei Airport|TH|17.4391|101.7220
LOO|Laghouat|Laghouat - Molay Ahmed Medeghri Airport|Laghouat|DZ|33.7644|2.9283
LOP|롬복|Lombok International Airport|Mataram|ID|-8.7600|116.2782
LOS|라고스|Murtala Muhammed International Airport|Lagos|NG|6.5774|3.3212
LPA|그란카나리아|Gran Canaria Airport|Gran Canaria Island|ES|27.9319|-15.3866
LPB|La Paz|El Alto International Airport|La Paz|BO|-16.5103|-68.1894
LPF|Liupanshui|Liupanshui Yuezhao Airport|Liupanshui|CN|26.6094|104.9790
LPI|Linköping|Linköping City Airport|Linköping|SE|58.4049|15.6845
LPL|리버풀|Liverpool John Lennon Airport|Liverpool|GB|53.3349|-2.8496
LPP|Lappeenranta|Lappeenranta Airport|Lappeenranta|FI|61.0446|28.1447
LPQ|루앙프라방|Luang Phabang International Airport|Luang Phabang|LA|19.9043|102.1672
LPT|Lampang Airport|Lampang Airport|Lampang Airport|TH|18.2709|99.5042
LRD|Laredo|Laredo International Airport|Laredo|US|27.5438|-99.4616
LRE|Longreach|Longreach Airport|Longreach|AU|-23.4320|144.2775
LRH|La Rochelle|La Rochelle Île de Ré Airport|La Rochelle|FR|46.1792|-1.1953
LRM|La Romana|Casa De Campo International Airport|La Romana|DO|18.4522|-68.9111
LRR|Lar|Lar Airport|Lar|IR|27.6747|54.3833
LRU|Las Cruces|Las Cruces International Airport|Las Cruces|US|32.2894|-106.9220
LSC|La Serena-Coquimbo|La Florida Airport|La Serena-Coquimbo|CL|-29.9162|-71.1995
LSE|La Crosse|La Crosse Regional Airport|La Crosse|US|43.8790|-91.2567
LSG|Leshan|Leshan Airport|Leshan|CN|29.4386|103.7492
LSH|Lashio|Lashio Airport|Lashio|MM|22.9779|97.7522
LSI|Lerwick|Sumburgh Airport|Lerwick|GB|59.8789|-1.2956
LSP|Paraguaná|Josefa Camejo International Airport|Paraguaná|VE|11.7808|-70.1515
LSR|Kutacane|Alas Leuser Airport|Kutacane|ID|3.3915|97.8637
LST|Launceston|Launceston Airport|Launceston|AU|-41.5449|147.2108
LSY|Lismore|Lismore Airport|Lismore|AU|-28.8307|153.2584
LTD|Ghadames|Ghadames Airport|Ghadames|LY|30.1455|9.7021
LTI|Altai|Altai Airport|Altai|MN|46.3764|96.2211
LTK|Latakia|Latakia International Airport|Latakia|SY|35.4011|35.9487
LTM|Lethem|Lethem Airport|Lethem|GY|3.3728|-59.7894
LTN|런던 루턴|London Luton Airport|Luton|GB|51.8747|-0.3683
LTO|Loreto|Loreto International Airport|Loreto|MX|25.9895|-111.3484
LTU|Latur|Murod Kond Airport|Latur|IN|18.4115|76.4647
LTX|Latacunga|Cotopaxi International Airport|Latacunga|EC|-0.9068|-78.6158
LUA|Lukla|Tenzing-Hillary Airport|Lukla|NP|27.6868|86.7295
LUD|Luderitz|Luderitz Airport|Luderitz|NA|-26.6874|15.2429
LUG|Agno|Lugano Airport|Agno|CH|46.0043|8.9106
LUK|Cincinnati|Cincinnati Municipal Airport Lunken Field|Cincinnati|US|39.1024|-84.4189
LUM|Dehong|Dehong Mangshi International Airport|Dehong|CN|24.4011|98.5317
LUN|루사카|Kenneth Kaunda International Airport|Lusaka|ZM|-15.3308|28.4527
LUQ|San Luis|Brigadier Mayor D Cesar Raul Ojeda Airport|San Luis|AR|-33.2732|-66.3564
LUR|Cape Lisburne|Cape Lisburne LRRS Airport|Cape Lisburne|US|68.8751|-166.1100
LUV|Langgur|Karel Sadsuitubun Airport|Langgur|ID|-5.7603|132.7594
LUX|룩셈부르크|Luxembourg-Findel International Airport|Luxembourg|LU|49.6268|6.2121
LUZ|Lublin|Lublin Airport|Lublin|PL|51.2402|22.7135
LVI|리빙스턴|Harry Mwanga Nkumbula International Airport|Livingstone|ZM|-17.8215|25.8196
LWB|Lewisburg|Greenbrier Valley Airport|Lewisburg|US|37.8579|-80.4004
LWN|Gyumri|Shirak International Airport|Gyumri|AM|40.7504|43.8593
LWS|Lewiston|Lewiston Nez Perce County Airport|Lewiston|US|46.3745|-117.0150
LXA|Shannan|Lhasa Gonggar International Airport|Shannan|CN|29.2980|90.9120
LXR|룩소르|Luxor International Airport|Luxor|EG|25.6710|32.7064
LYA|뤄양|Luoyang Beijiao Airport|Luoyang|CN|34.7411|112.3880
LYC|Lycksele|Lycksele Airport|Lycksele|SE|64.5483|18.7162
LYG|롄윈강|Lianyungang Huaguoshan International Airport|Lianyungang|CN|34.4141|119.1790
LYH|Lynchburg|Lynchburg Regional Airport - Preston Glenn Field|Lynchburg|US|37.3267|-79.2004
LYI|Linyi|Linyi Qiyang Airport|Linyi|CN|35.0529|118.4118
LYP|Faisalabad|Faisalabad International Airport|Faisalabad|PK|31.3649|72.9953
LYR|Longyearbyen|Svalbard Airport, Longyear|Longyearbyen|NO|78.2461|15.4656
LZG|Nanchong|Langzhong Gucheng Airport|Nanchong|CN|31.5019|106.0344
LZH|Liuzhou|Liuzhou Bailian Airport / Bailian Air Base|Liuzhou|CN|24.2075|109.3910
LZN|Matsu|Matsu Nangan Airport|Matsu|TW|26.1597|119.9584
LZO|Luzhou|Luzhou Yunlong Airport|Luzhou|CN|29.0304|105.4684
LZY|Nyingchi|Nyingchi Mainling Airport|Nyingchi|CN|29.3033|94.3353
MAA|첸나이|Chennai International Airport|Chennai|IN|12.9900|80.1693
MAB|Marabá|João Correa da Rocha Airport|Marabá|BR|-5.3686|-49.1380
MAF|Midland|Midland International Air and Space Port|Midland|US|31.9425|-102.2020
MAG|Madang|Madang Airport|Madang|PG|-5.2071|145.7890
MAH|Mahón|Menorca Airport|Mahón|ES|39.8626|4.2187
MAJ|마주로|Marshall Islands International Airport|Majuro Atoll|MH|7.0651|171.2717
MAK|Malakal|Malakal International Airport|Malakal|SS|9.5587|31.6519
MAM|Matamoros|General Servando Canales International Airport|Matamoros|MX|25.7699|-97.5253
MAO|마나우스|Eduardo Gomes International Airport|Manaus|BR|-3.0386|-60.0497
MAQ|Mae Sot Airport|Mae Sot Airport|Mae Sot Airport|TH|16.6999|98.5451
MAR|Maracaibo|La Chinita International Airport|Maracaibo|VE|10.5575|-71.7293
MAS|Manus Island|Momote Airport|Manus Island|PG|-2.0619|147.4240
MAU|Maupiti Airport|Maupiti Airport|Maupiti Airport|PF|-16.4265|-152.2440
MAZ|Mayaguez|Eugenio Maria De Hostos Airport|Mayaguez|PR|18.2557|-67.1485
MBA|몸바사|Moi International Airport|Mombasa|KE|-4.0348|39.5942
MBD|Mafeking|George Dick Montshioa Airport|Mafeking|ZA|-25.7984|25.5480
MBE|Monbetsu|Monbetsu Airport|Monbetsu|JP|44.3039|143.4040
MBI|Mbeya|Songwe Airport|Mbeya|TZ|-8.9199|33.2740
MBJ|몬테고베이|Sangster International Airport|Montego Bay|JM|18.5034|-77.9132
MBS|Freeland|MBS International Airport|Freeland|US|43.5332|-84.0831
MBT|Masbate|Moises R. Espinosa Airport|Masbate|PH|12.3697|123.6301
MBW|Melbourne|Melbourne Moorabbin Airport|Melbourne|AU|-37.9778|145.0998
MBX|Maribor|Maribor Edvard Rusjan Airport|Maribor|SI|46.4799|15.6861
MCE|Merced|Merced Regional Macready Field|Merced|US|37.2847|-120.5140
MCG|McGrath|McGrath Airport|McGrath|US|62.9529|-155.6060
MCI|캔자스시티|Kansas City International Airport|Kansas City|US|39.3017|-94.7139
MCK|McCook|McCook Ben Nelson Regional Airport|McCook|US|40.2078|-100.5928
MCN|Macon|Middle Georgia Regional Airport|Macon|US|32.6928|-83.6492
MCP|Macapá|Macapá - Alberto Alcolumbre International Airport|Macapá|BR|0.0507|-51.0722
MCT|무스카트|Muscat International Airport|Muscat|OM|23.6002|58.2853
MCW|Mason City|Mason City Municipal Airport|Mason City|US|43.1598|-93.3297
MCX|Makhachkala|Makhachkala Uytash International Airport|Makhachkala|RU|42.8168|47.6523
MCY|Maroochydore|Sunshine Coast Airport|Maroochydore|AU|-26.5933|153.0832
MCZ|Maceió|Zumbi dos Palmares International Airport|Maceió|BR|-9.5126|-35.7918
MDC|마나도|Sam Ratulangi International Airport|Manado|ID|1.5486|124.9262
MDE|메데인|Jose Maria Córdova International Airport|Medellín|CO|6.1645|-75.4231
MDI|Makurdi|Makurdi Airport|Makurdi|NG|7.7039|8.6139
MDK|Mbandaka|Mbandaka Airport|Mbandaka|CD|0.0226|18.2887
MDL|만달레이|Mandalay International Airport|Mandalay|MM|21.7022|95.9779
MDQ|Mar del Plata|Ástor Piazzola International Airport|Mar del Plata|AR|-37.9342|-57.5733
MDT|Harrisburg|Harrisburg International Airport|Harrisburg|US|40.1928|-76.7623
MDU|Mendi|Mendi Airport|Mendi|PG|-6.1477|143.6570
MDW|시카고 미드웨이|Chicago Midway International Airport|Chicago|US|41.7860|-87.7524
MDZ|Mendoza|Governor Francisco Gabrielli International Airport|Mendoza|AR|-32.8317|-68.7929
MEB|Essendon Fields|Melbourne Essendon Airport|Essendon Fields|AU|-37.7281|144.9020
MEC|Manta|Eloy Alfaro International Airport|Manta|EC|-0.9461|-80.6788
MED|메디나|Prince Mohammad Bin Abdulaziz Airport|Medina|SA|24.5534|39.7051
MEE|Maré|Maré Airport|Maré|NC|-21.4824|168.0385
MEG|Malanje|Malanje Airport|Malanje|AO|-9.5251|16.3124
MEH|Mehamn|Mehamn Airport|Mehamn|NO|71.0297|27.8267
MEI|Meridian|Key Field / Meridian Regional Airport|Meridian|US|32.3326|-88.7519
MEM|멤피스|Frederick W. Smith International Airport|Memphis|US|35.0438|-89.9763
MEQ|Kuala Pesisir|Cut Nyak Dhien Airport|Kuala Pesisir|ID|4.0410|96.2533
MFE|McAllen|McAllen Miller International Airport|McAllen|US|26.1761|-98.2380
MFK|Matsu|Matsu Beigan Airport|Matsu|TW|26.2241|120.0027
MFR|Medford|Rogue Valley International-Medford Airport|Medford|US|42.3742|-122.8730
MFU|Mfuwe|Mfuwe International Airport|Mfuwe|ZM|-13.2589|31.9366
MGA|Managua|Augusto C. Sandino (Managua) International Airport|Managua|NI|12.1415|-86.1682
MGB|Mount Gambier|Mount Gambier Airport|Mount Gambier|AU|-37.7444|140.7806
MGC|Michigan City|Michigan City Municipal Airport|Michigan City|US|41.7033|-86.8212
MGF|Maringá|Regional de Maringá - Sílvio Name Júnior Airport|Maringá|BR|-23.4761|-52.0162
MGH|Margate|Margate Airport|Margate|ZA|-30.8574|30.3430
MGM|Montgomery|Montgomery Regional (Dannelly Field) Airport|Montgomery|US|32.3006|-86.3940
MGQ|모가디슈|Aden Adde International Airport|Mogadishu|SO|2.0144|45.3047
MGW|Morgantown|Morgantown Municipal Airport Walter L. (Bill) Hart Field|Morgantown|US|39.6433|-79.9176
MGZ|Mkeik|Myeik Airport|Mkeik|MM|12.4398|98.6215
MHD|마슈하드|Mashhad International Airport|Mashhad|IR|36.2348|59.6429
MHG|Mannheim|Mannheim-City Airport|Mannheim|DE|49.4731|8.5142
MHH|Marsh Harbour|Leonard M. Thompson International Airport|Marsh Harbour|BS|26.5107|-77.0843
MHK|Manhattan|Manhattan Regional Airport|Manhattan|US|39.1410|-96.6708
MHQ|Mariehamn|Mariehamn Airport|Mariehamn|FI|60.1222|19.8982
MHT|Manchester|Manchester-Boston Regional Airport|Manchester|US|42.9326|-71.4357
MHU|Mount Hotham|Mount Hotham Airport|Mount Hotham|AU|-37.0475|147.3340
MID|메리다|Manuel Crescencio Rejón International Airport|Mérida|MX|20.9305|-89.6455
MIG|Mianyang|Mianyang Nanjiao Airport|Mianyang|CN|31.4281|104.7410
MII|Marília|Frank Miloye Milenkowichi–Marília State Airport|Marília|BR|-22.1969|-49.9265
MIM|Merimbula|Merimbula Airport|Merimbula|AU|-36.9086|149.9010
MIR|Monastir|Monastir Habib Bourguiba International Airport|Monastir|TN|35.7581|10.7547
MIU|Maiduguri|Maiduguri International Airport|Maiduguri|NG|11.8542|13.0807
MJF|Mosjøen|Mosjøen Airport, Kjærstad|Mosjøen|NO|65.7840|13.2149
MJI|Tripoli|Mitiga International Airport|Tripoli|LY|32.8918|13.2879
MJK|Denham|Shark Bay Airport|Denham|AU|-25.8973|113.5758
MJM|Mbuji Mayi|Mbuji Mayi Airport|Mbuji Mayi|CD|-6.1212|23.5690
MJN|Mahajanga|Amborovy Airport|Mahajanga|MG|-15.6668|46.3512
MJT|Mytilene|Mytilene International Airport|Mytilene|GR|39.0574|26.5986
MJZ|Mirny|Mirny Airport|Mirny|RU|62.5347|114.0390
MKE|밀워키|General Mitchell International Airport|Milwaukee|US|42.9472|-87.8966
MKG|Muskegon|Muskegon County Airport|Muskegon|US|43.1695|-86.2382
MKK|Kaunakakai|Molokai Airport|Kaunakakai|US|21.1529|-157.0960
MKL|Jackson|McKellar-Sipes Regional Airport|Jackson|US|35.5999|-88.9156
MKM|Mukah|Mukah Airport|Mukah|MY|2.8819|112.0433
MKP|Makemo|Makemo Airport|Makemo|PF|-16.5839|-143.6580
MKQ|Merauke|Mopah International Airport|Merauke|ID|-8.5239|140.4197
MKR|Meekatharra Airport|Meekatharra Airport|Meekatharra Airport|AU|-26.6117|118.5480
MKU|Makokou|Makokou Airport|Makokou|GA|0.5792|12.8909
MKW|Manokwari|Rendani Airport|Manokwari|ID|-0.8918|134.0490
MKY|Mackay|Mackay Airport|Mackay|AU|-21.1708|149.1826
MKZ|Malacca|Malacca International Airport|Malacca|MY|2.2656|102.2528
MLA|몰타|Malta International Airport|Valletta|MT|35.8459|14.4915
MLB|Melbourne|Melbourne Orlando International Airport|Melbourne|US|28.1020|-80.6411
MLG|Malang|Abdul Rachman Saleh Airport|Malang|ID|-7.9291|112.7142
MLI|Moline|Quad City International Airport|Moline|US|41.4485|-90.5075
MLM|Morelia|General Francisco J. Mujica International Airport|Morelia|MX|19.8499|-101.0250
MLN|Melilla|Melilla Airport|Melilla|ES|35.2798|-2.9563
MLU|Monroe|Monroe Regional Airport|Monroe|US|32.5109|-92.0377
MLW|Monrovia|Spriggs Payne Airport|Monrovia|LR|6.2891|-10.7587
MLX|Malatya|Malatya Erhaç Airport|Malatya|TR|38.4353|38.0910
MMB|Ōzora|Memanbetsu Airport|Ōzora|JP|43.8806|144.1640
MMD|Minamidaito|Minamidaito Airport|Minamidaito|JP|25.8465|131.2630
MME|Darlington|Teesside International Airport|Darlington|GB|54.5092|-1.4294
MMG|Mount Magnet Airport|Mount Magnet Airport|Mount Magnet Airport|AU|-28.1161|117.8420
MMH|Mammoth Lakes|Mammoth Yosemite Airport|Mammoth Lakes|US|37.6254|-118.8431
MMJ|Matsumoto|Shinshu-Matsumoto Airport|Matsumoto|JP|36.1668|137.9230
MMK|Murmansk|Emperor Nicholas II Murmansk Airport|Murmansk|RU|68.7817|32.7508
MMO|Vila do Maio|Maio Airport|Vila do Maio|CV|15.1559|-23.2137
MMX|말뫼|Malmö Sturup Airport|Malmö|SE|55.5356|13.3763
MMY|Miyakojima|Miyako Airport|Miyakojima|JP|24.7828|125.2950
MNC|Nacala|Nacala International Airport|Nacala|MZ|-14.4882|40.7122
MNG|Maningrida|Maningrida Airport|Maningrida|AU|-12.0561|134.2340
MNI|Gerald's Park|John A. Osborne Airport|Gerald's Park|MS|16.7918|-62.1932
MNJ|Mananjary|Mananjary Airport|Mananjary|MG|-21.2018|48.3583
MNX|Manicoré|Manicoré Airport|Manicoré|BR|-5.8114|-61.2783
MOB|Mobile|Mobile Regional Airport|Mobile|US|30.6912|-88.2428
MOC|Montes Claros|Mário Ribeiro Airport|Montes Claros|BR|-16.7069|-43.8189
MOG|Mong Hsat|Mong Hsat Airport|Mong Hsat|MM|20.5168|99.2568
MOL|Årø|Molde Airport, Årø|Årø|NO|62.7447|7.2625
MOQ|Morondava|Morondava Airport|Morondava|MG|-20.2847|44.3176
MOT|Minot|Minot International Airport|Minot|US|48.2580|-101.2791
MOV|Moranbah|Moranbah Airport|Moranbah|AU|-22.0578|148.0770
MOZ|Moorea-Maiao|Moorea Temae Airport|Moorea-Maiao|PF|-17.4898|-149.7618
MPA|Mpacha|Katima Mulilo Airport|Mpacha|NA|-17.6343|24.1767
MPH|Caticlan|Godofredo P. Ramos Airport|Caticlan|PH|11.9245|121.9540
MPL|몽펠리에|Montpellier-Méditerranée Airport|Montpellier|FR|43.5762|3.9630
MPM|마푸투|Maputo Airport|Maputo|MZ|-25.9208|32.5726
MPN|Mount Pleasant|Mount Pleasant Airport / RAF Mount Pleasant|Mount Pleasant|FK|-51.8226|-58.4458
MPY|Maripasoula|Maripasoula Airport|Maripasoula|GF|3.6559|-54.0394
MQF|Magnitogorsk|Magnitogorsk International Airport|Magnitogorsk|RU|53.3920|58.7552
MQJ|Khonuu|Moma Airport|Khonuu|RU|66.4509|143.2616
MQL|Mildura|Mildura Airport|Mildura|AU|-34.2292|142.0860
MQM|Mardin|Mardin Airport|Mardin|TR|37.2233|40.6317
MQN|Mo i Rana|Mo i Rana Airport, Røssvoll|Mo i Rana|NO|66.3639|14.3014
MQP|Mbombela|Kruger Mpumalanga International Airport|Mbombela|ZA|-25.3833|31.1053
MQS|Lovell|Mustique Airport|Lovell|VC|12.8879|-61.1802
MQT|Gwinn|Marquette Sawyer Regional Airport|Gwinn|US|46.3515|-87.3959
MQX|Mekele|Mekele Alula Aba Nega Airport|Mekele|ET|13.4674|39.5335
MRE|Serena|Mara Serena Lodge Airstrip|Serena|KE|-1.4046|35.0083
MRI|Anchorage|Merrill Field|Anchorage|US|61.2128|-149.8440
MRS|마르세유|Marseille Provence Airport|Marignane|FR|43.4381|5.2125
MRU|모리셔스|Sir Seewoosagur Ramgoolam International Airport|Plaine Magnien|MU|-20.4302|57.6836
MRV|Mineralnyye Vody|Mineralnye Vody Airport|Mineralnyye Vody|RU|44.2251|43.0819
MRX|Mahshahr|Mahshahr Airport|Mahshahr|IR|30.5562|49.1519
MRY|Monterey|Monterey Regional Airport|Monterey|US|36.5868|-121.8442
MRZ|Moree|Moree Airport|Moree|AU|-29.4989|149.8450
MSJ|Misawa|Misawa Airport / Misawa Air Base|Misawa|JP|40.7032|141.3680
MSL|Muscle Shoals|Northwest Alabama Regional Airport|Muscle Shoals|US|34.7451|-87.6130
MSN|Madison|Dane County Regional Truax Field|Madison|US|43.1399|-89.3375
MSO|Missoula|Missoula Montana Airport|Missoula|US|46.9158|-114.0911
MSQ|민스크|Minsk National Airport|Minsk|BY|53.8881|28.0400
MSR|Muş|Muş Airport|Muş|TR|38.7478|41.6612
MSS|Massena|Massena International Airport Richards Field|Massena|US|44.9362|-74.8443
MST|Maastricht|Maastricht Aachen Airport|Maastricht|NL|50.9111|5.7694
MSU|Maseru|Moshoeshoe I International Airport|Maseru|LS|-29.4563|27.5545
MSZ|Moçâmedes|Welwitschia Mirabilis International Airport|Moçâmedes|AO|-15.2612|12.1468
MTJ|Montrose|Montrose Regional Airport|Montrose|US|38.5098|-107.8940
MTR|Montería|Los Garzones Airport|Montería|CO|8.8237|-75.8258
MTT|Cosoleacaque|Minatitlán/Coatzacoalcos International Airport|Cosoleacaque|MX|18.1034|-94.5807
MTY|몬테레이|Monterrey International Airport|Monterrey|MX|25.7785|-100.1070
MUA|Munda|Munda Airport|Munda|SB|-8.3280|157.2630
MUB|마운|Maun International Airport|Maun|BW|-19.9705|23.4314
MUE|Waimea|Waimea Kohala Airport|Waimea|US|20.0013|-155.6680
MUH|Marsa Matruh|Mersa Matruh International Airport|Marsa Matruh|EG|31.3243|27.2223
MUN|Maturín|José Tadeo Monagas International Airport|Maturín|VE|9.7490|-63.1533
MUR|Marudi|Marudi Airport|Marudi|MY|4.1787|114.3303
MUX|Multan|Multan International Airport|Multan|PK|30.2032|71.4191
MVB|Franceville|M'Vengue El Hadj Omar Bongo Ondimba International Airport|Franceville|GA|-1.6562|13.4380
MVD|몬테비데오|Carrasco General Cesáreo L. Berisso International Airport|Ciudad de la Costa|UY|-34.8356|-56.0265
MVF|Mossoró|Dix-Sept Rosado Airport|Mossoró|BR|-5.2019|-37.3643
MVP|Mitú|Fabio Alberto Leon Bentley Airport|Mitú|CO|1.2537|-70.2339
MVQ|Mogilev|Mogilev Airport|Mogilev|BY|53.9549|30.0951
MVR|Maroua|Salak Airport|Maroua|CM|10.4514|14.2574
MVT|Mataiva Airport|Mataiva Airport|Mataiva Airport|PF|-14.8727|-148.7140
MWA|Marion|Veterans Airport of Southern Illinois|Marion|US|37.7512|-89.0166
MWL|Mineral Wells|Mineral Wells Regional Airport|Mineral Wells|US|32.7816|-98.0602
MWZ|Mwanza|Mwanza International Airport|Mwanza|TZ|-2.4466|32.9360
MXL|Mexicali|General Rodolfo Sánchez Taboada International Airport|Mexicali|MX|32.6306|-115.2428
MXV|Mörön|Mörön Airport|Mörön|MN|49.6637|100.1000
MXX|Mora|Mora Airport|Mora|SE|60.9579|14.5114
MYA|Moruya|Moruya Airport|Moruya|AU|-35.8978|150.1440
MYD|Malindi|Malindi International Airport|Malindi|KE|-3.2293|40.1017
MYE|Miyakejima|Miyakejima Airport|Miyakejima|JP|34.0736|139.5600
MYG|Abraham Bay Settlement|Mayaguana Airport|Abraham Bay Settlement|BS|22.3795|-73.0135
MYL|McCall|McCall Municipal Airport|McCall|US|44.8888|-116.1011
MYP|Mary|Mary International Airport|Mary|TM|37.6235|61.8957
MYQ|Mysore|Mysore Airport|Mysore|IN|12.2298|76.6537
MYR|머틀비치|Myrtle Beach International Airport|Myrtle Beach|US|33.6797|-78.9283
MYT|Myitkyina|Myitkyina Airport|Myitkyina|MM|25.3836|97.3519
MYU|Mekoryuk|Mekoryuk Airport|Mekoryuk|US|60.3723|-166.2698
MYW|Mtwara|Mtwara Airport|Mtwara|TZ|-10.3362|40.1820
MYY|Miri|Miri Airport|Miri|MY|4.3220|113.9870
MZG|Huxi|Penghu Magong Airport|Huxi|TW|23.5687|119.6280
MZH|Amasya|Amasya Merzifon Airport|Amasya|TR|40.8294|35.5220
MZI|Sévaré|Mopti Airport|Sévaré|ML|14.5128|-4.0796
MZL|Manizales|La Nubia Airport|Manizales|CO|5.0296|-75.4647
MZO|Manzanillo|Sierra Maestra International Airport|Manzanillo|CU|20.2886|-77.0875
MZQ|Mkuze|Mkuze Airport|Mkuze|ZA|-27.6261|32.0443
MZR|Mazar-i-Sharif|Mazar-i-Sharif International Airport|Mazar-i-Sharif|AF|36.7041|67.2105
MZS|Moradabad|Moradabad Airport|Moradabad|IN|28.8175|78.9219
MZT|Mazatlàn|General Rafael Buelna International Airport|Mazatlàn|MX|23.1628|-106.2645
MZV|Mulu|Mulu Airport|Mulu|MY|4.0483|114.8050
MZW|Mecheria|Mecheria Airport|Mecheria|DZ|33.5359|-0.2424
NAA|Narrabri|Narrabri Airport|Narrabri|AU|-30.3192|149.8270
NAG|나그푸르|Dr. Babasaheb Ambedkar International Airport|Nagpur|IN|21.0922|79.0472
NAH|Tabukan Utara|Naha Airport|Tabukan Utara|ID|3.6848|125.5272
NAJ|Nakhchivan|Nakhchivan International Airport|Nakhchivan|AZ|39.1888|45.4584
NAL|Nalchik|Nalchik Airport|Nalchik|RU|43.5129|43.6366
NAM|Namniwel|Namniwel Airport|Namniwel|ID|-3.1432|126.9765
NAQ|Qaanaaq|Qaanaaq Airport|Qaanaaq|GL|77.4886|-69.3887
NAS|나소|Lynden Pindling International Airport|Nassau|BS|25.0390|-77.4662
NAT|Natal|Rio Grande do Norte/São Gonçalo do Amarante–Governador Aluízio Alves International Airport|Natal|BR|-5.7698|-35.3666
NAV|카파도키아|Nevşehir Kapadokya Airport|Nevşehir|TR|38.7719|34.5345
NAW|Narathiwat Airport|Narathiwat Airport|Narathiwat Airport|TH|6.5199|101.7430
NBC|Nizhnekamsk|Begishevo Airport|Nizhnekamsk|RU|55.5647|52.0925
NBE|Enfidha|Enfidha - Hammamet International Airport|Enfidha|TN|36.0758|10.4386
NBJ|루안다|Dr. Antonio Agostinho Neto International Airport|Luanda|AO|-9.0507|13.4991
NBS|Baishan|Changbaishan Airport|Baishan|CN|42.0669|127.6022
NCA|North Caicos|North Caicos Airport|North Caicos|TC|21.9161|-71.9430
NCL|뉴캐슬|Newcastle International Airport|Newcastle upon Tyne|GB|55.0380|-1.6896
NCU|Nukus|Nukus International Airport|Nukus|UZ|42.4884|59.6233
NCY|Annecy|Annecy Meythet airport|Annecy|FR|45.9289|6.0987
NDB|Nouadhibou|Nouadhibou International Airport|Nouadhibou|MR|20.9324|-17.0302
NDC|Nanded|Nanded Airport|Nanded|IN|19.1833|77.3167
NDG|치치하얼|Qiqihar Sanjiazi Airport|Qiqihar|CN|47.2300|123.9142
NDJ|N'Djamena|N'Djamena International Airport|N'Djamena|TD|12.1337|15.0340
NDR|Al Aaroui|Nador Al Aaroui International Airport|Al Aaroui|MA|34.9888|-3.0282
NDU|Rundu|Rundu Airport|Rundu|NA|-17.9565|19.7194
NEC|Necochea|Necochea Airport|Necochea|AR|-38.4907|-58.8163
NER|Neryungri|Chulman Airport|Neryungri|RU|56.9139|124.9140
NEV|Charlestown|Vance W. Amory International Airport|Charlestown|KN|17.2057|-62.5899
NGB|닝보|Ningbo Lishe International Airport|Ningbo|CN|29.8267|121.4620
NGE|N'Gaoundéré|N'Gaoundéré Airport|N'Gaoundéré|CM|7.3570|13.5592
NGQ|Shiquanhe|Ngari Gunsa Airport|Shiquanhe|CN|32.0979|80.0540
NHV|Nuku Hiva|Nuku Hiva Airport|Nuku Hiva|PF|-8.7956|-140.2290
NIM|Niamey|Diori Hamani International Airport|Niamey|NE|13.4815|2.1836
NJC|Nizhnevartovsk|Nizhnevartovsk Airport|Nizhnevartovsk|RU|60.9493|76.4836
NJF|나자프|Al Najaf International Airport|Najaf|IQ|31.9911|44.4050
NKC|Nouakchott|Nouakchott–Oumtounsy International Airport|Nouakchott|MR|18.3100|-15.9697
NKM|Nagoya|Nagoya Airport / JASDF Komaki Air Base|Nagoya|JP|35.2558|136.9241
NKT|Şırnak|Şırnak Şerafettin Elçi Airport|Şırnak|TR|37.3647|42.0582
NLA|Ndola|Simon Mwansa Kapwepwe International Airport|Ndola|ZM|-12.9651|28.5156
NLD|Nuevo Laredo|Quetzalcóatl International Airport|Nuevo Laredo|MX|27.4439|-99.5705
NLH|Ninglang|Ninglang Luguhu Airport|Ninglang|CN|27.5403|100.7593
NLI|Nikolayevsk-na-Amure Airport|Nikolayevsk-na-Amure Airport|Nikolayevsk-na-Amure Airport|RU|53.1550|140.6500
NLK|Burnt Pine|Norfolk Island International Airport|Burnt Pine|NF|-29.0418|167.9395
NLT|Xinyuan|Xinyuan Nalati Airport|Xinyuan|CN|43.4318|83.3786
NLU|멕시코시티 펠리페앙헬레스|Felipe Ángeles International Airport|Mexico City|MX|19.7438|-99.0151
NMA|나망간|Namangan International Airport|Namangan|UZ|40.9846|71.5578
NMF|Noonu Atoll|Maafaru International Airport|Noonu Atoll|MV|5.8174|73.4684
NMI|나비뭄바이|Navi Mumbai International Airport|Navi Mumbai|IN|18.9846|73.0653
NNM|Naryan Mar|Naryan Mar Airport|Naryan Mar|RU|67.6400|53.1219
NNT|Nan Airport|Nan Airport|Nan Airport|TH|18.8079|100.7830
NOB|Nicoya|Nosara Airport|Nicoya|CR|9.9765|-85.6530
NOC|Charlestown|Ireland West Airport Knock|Charlestown|IE|53.9104|-8.8170
NOJ|Noyabrsk|Noyabrsk Airport|Noyabrsk|RU|63.1833|75.2700
NOP|Sinop|Sinop Airport|Sinop|TR|42.0183|35.0718
NOS|Nosy Be|Nosy Be International Airport|Nosy Be|MG|-13.3121|48.3148
NOU|누메아|La Tontouta International Airport|Nouméa|NC|-22.0146|166.2130
NOV|Huambo|Albano Machado Airport|Huambo|AO|-12.8089|15.7605
NOZ|Novokuznetsk|Spichenkovo Airport|Novokuznetsk|RU|53.8114|86.8772
NPE|Napier|Hawke's Bay Airport|Napier|NZ|-39.4658|176.8700
NPL|New Plymouth|New Plymouth Airport|New Plymouth|NZ|-39.0086|174.1790
NPO|Nanga Pinoh-Borneo Island|Nanga Pinoh Airport|Nanga Pinoh-Borneo Island|ID|-0.3486|111.7462
NPT|Newport|Newport State Airport|Newport|US|41.5322|-71.2810
NQN|Neuquén|Presidente Perón International Airport|Neuquén|AR|-38.9490|-68.1557
NQY|Newquay|Cornwall Airport Newquay|Newquay|GB|50.4406|-4.9954
NRA|Narrandera|Narrandera Airport|Narrandera|AU|-34.7022|146.5120
NRK|Norrköping|Norrköping Airport|Norrköping|SE|58.5863|16.2506
NRN|Weeze|Weeze (Niederrhein) Airport|Weeze|DE|51.6014|6.1412
NRR|Ceiba|José Aponte de la Torre Airport|Ceiba|PR|18.2473|-65.6398
NSH|Nowshahr|Nowshahr Airport|Nowshahr|IR|36.6643|51.4627
NSI|Yaoundé|Yaoundé Nsimalen International Airport|Yaoundé|CM|3.7226|11.5533
NSK|Norilsk|Alykel International Airport|Norilsk|RU|69.3080|87.3259
NSN|Nelson|Nelson Airport|Nelson|NZ|-41.2967|173.2243
NST|Nakhon Si Thammarat|Nakhon Si Thammarat Airport|Nakhon Si Thammarat|TH|8.5396|99.9447
NTE|낭트|Nantes Atlantique Airport|Nantes|FR|47.1532|-1.6107
NTG|Nantong|Nantong Xingdong International Airport|Nantong|CN|32.0736|120.9801
NTL|Williamtown|Newcastle Airport|Williamtown|AU|-32.7961|151.8350
NTN|Normanton|Normanton Airport|Normanton|AU|-17.6841|141.0697
NTQ|Wajima|Noto Satoyama Airport|Wajima|JP|37.2931|136.9620
NTX|Ranai-Natuna Besar Island|Ranai Airport|Ranai-Natuna Besar Island|ID|3.9087|108.3880
NUE|뉘른베르크|Nuremberg Airport|Nuremberg|DE|49.4987|11.0781
NUI|Nuiqsut|Nuiqsut Airport|Nuiqsut|US|70.2100|-151.0060
NUM|Sharma|Neom Bay Airport|Sharma|SA|27.9243|35.2936
NUX|Novy Urengoy|Novy Urengoy Airport|Novy Urengoy|RU|66.0694|76.5203
NVA|Neiva|Benito Salas Airport|Neiva|CO|2.9501|-75.2940
NVI|Navoi|Navoi International Airport|Navoi|UZ|40.1176|65.1727
NVT|Navegantes|Ministro Victor Konder International Airport|Navegantes|BR|-26.8794|-48.6510
NWI|Norwich|Norwich Airport|Norwich|GB|52.6758|1.2828
NYA|Nyagan|Nyagan Airport|Nyagan|RU|62.1100|65.6150
NYI|Sunyani|Sunyani Airport|Sunyani|GH|7.3618|-2.3288
NYK|Gathiuru|Nanyuki Civil Airport|Gathiuru|KE|-0.0624|37.0413
NYM|Nadym|Nadym Airport|Nadym|RU|65.4809|72.6989
NYO|Nyköping|Stockholm Skavsta Airport|Nyköping|SE|58.7897|16.9115
NYT|네피도|Nay Pyi Taw International Airport|Naypyitaw|MM|19.6235|96.2010
NZC|Nazca|Maria Reiche Neuman Airport|Nazca|PE|-14.8540|-74.9615
NZH|Manzhouli|Manzhouli Xijiao Airport|Manzhouli|CN|49.5667|117.3300
NZL|Zhalantun|Zhalantun Genghis Khan Airport|Zhalantun|CN|47.8659|122.7687
OAJ|Richlands|Albert J Ellis Airport|Richlands|US|34.8292|-77.6121
OAK|오클랜드|Oakland San Francisco Bay Airport|Oakland|US|37.7201|-122.2212
OAX|오악사카|Xoxocotlán International Airport|Oaxaca|MX|16.9988|-96.7261
OBO|Obihiro|Tokachi-Obihiro Airport|Obihiro|JP|42.7333|143.2170
OCC|Coca|Francisco De Orellana Airport|Coca|EC|-0.4629|-76.9868
OCE|Ocean City|Ocean City Municipal Airport|Ocean City|US|38.3104|-75.1240
OCJ|Boscobel|Ian Fleming International Airport|Boscobel|JM|18.4041|-76.9698
OCS|Corisco Island|Corisco International Airport|Corisco Island|GQ|0.9109|9.3303
ODB|Córdoba|Córdoba Airport|Córdoba|ES|37.8420|-4.8489
ODE|Odense|Odense Hans Christian Andersen Airport|Odense|DK|55.4753|10.3272
OEC|Oecussi-Ambeno|Oecusse Route of the Sandalwood International Airport|Oecussi-Ambeno|TL|-9.1984|124.3379
OER|Örnsköldsvik|Örnsköldsvik Airport|Örnsköldsvik|SE|63.4083|18.9900
OGD|Ogden|Ogden Hinckley Airport|Ogden|US|41.1959|-112.0120
OGL|Ogle|Eugene F. Correia International Airport|Ogle|GY|6.8059|-58.1077
OGN|Yonaguni|Yonaguni Airport|Yonaguni|JP|24.4673|122.9798
OGS|Ogdensburg|Ogdensburg International Airport|Ogdensburg|US|44.6819|-75.4655
OGU|Ordu|Ordu–Giresun Airport|Ordu|TR|40.9669|38.0860
OGX|Ouargla|Ain Beida Airport|Ouargla|DZ|31.9172|5.4128
OGZ|Beslan|Vladikavkaz Beslan International Airport|Beslan|RU|43.2051|44.6066
OHD|Ohrid|Ohrid St. Paul the Apostle Airport|Ohrid|MK|41.1800|20.7423
OHE|Mohe|Mohe Gulian Airport|Mohe|CN|52.9169|122.4228
OHO|Okhotsk|Okhotsk Airport|Okhotsk|RU|59.4101|143.0565
OHS|소하르|Suhar International Airport|Suhar|OM|24.3860|56.6254
OIM|Izu Oshima|Oshima Airport|Izu Oshima|JP|34.7820|139.3600
OIR|Okushiri Island|Okushiri Airport|Okushiri Island|JP|42.0717|139.4330
OKC|오클라호마시티|OKC Will Rogers World Airport|Oklahoma City|US|35.3934|-97.5982
OKD|Sapporo|Sapporo Okadama Airport|Sapporo|JP|43.1174|141.3813
OKE|Wadomari|Okinoerabu Airport|Wadomari|JP|27.4316|128.7056
OKI|Okinoshima|Oki Global Geopark Airport|Okinoshima|JP|36.1784|133.3236
OKL|Oksibil|Oksibil Airport|Oksibil|ID|-4.9071|140.6277
OKY|Oakey Army Aviation Centre|Oakey Army Aviation Centre|Oakey Army Aviation Centre|AU|-27.4093|151.7367
OLA|Ørland|Ørland Airport|Ørland|NO|63.6989|9.6040
OLB|올비아|Olbia Costa Smeralda Airport|Olbia|IT|40.8990|9.5185
OLF|Wolf Point|L M Clayton Airport|Wolf Point|US|48.0945|-105.5750
OLM|Olympia|Olympia Regional Airport|Olympia|US|46.9694|-122.9030
OLZ|Olyokminsk|Olyokminsk Airport|Olyokminsk|RU|60.4018|120.4761
OMA|오마하|Eppley Airfield|Omaha|US|41.3032|-95.8941
OMD|Oranjemund|Oranjemund Airport|Oranjemund|NA|-28.5853|16.4464
OME|Nome|Nome Airport|Nome|US|64.5122|-165.4450
OMH|Urmia|Urmia Airport|Urmia|IR|37.6681|45.0687
OMN|Zomin|Zomin Airport|Zomin|UZ|40.0140|68.4110
OMO|Mostar|Mostar International Airport|Mostar|BA|43.2825|17.8461
OMR|Oradea|Oradea International Airport|Oradea|RO|47.0253|21.9025
OMS|Omsk|Omsk Central Airport|Omsk|RU|54.9631|73.3124
OND|Ondangwa|Ondangwa Airport|Ondangwa|NA|-17.8782|15.9526
ONJ|Kitaakita|Odate Noshiro Airport|Kitaakita|JP|40.1919|140.3710
ONQ|Zonguldak|Zonguldak Çaycuma Airport|Zonguldak|TR|41.5064|32.0886
ONT|온타리오|Ontario International Airport|Ontario|US|34.0560|-117.6010
ONX|Colón|Enrique Adolfo Jimenez Airport|Colón|PA|9.3566|-79.8674
OOL|골드코스트|Gold Coast Airport|Gold Coast|AU|-28.1660|153.5066
OOM|Cooma|Cooma Snowy Mountains Airport|Cooma|AU|-36.3004|148.9724
OPF|Miami|Miami-Opa Locka Executive Airport|Miami|US|25.9070|-80.2784
OPO|포르투|Francisco de Sá Carneiro Airport|Porto|PT|41.2481|-8.6814
OPU|Balimo|Balimo Airport|Balimo|PG|-8.0500|142.9330
ORB|Örebro|Örebro Airport|Örebro|SE|59.2237|15.0380
ORF|노퍽|Norfolk International Airport|Norfolk|US|36.8953|-76.2010
ORH|Worcester|Worcester Regional Airport|Worcester|US|42.2673|-71.8757
ORK|코크|Cork International Airport|Cork|IE|51.8413|-8.4911
ORN|Es-Sénia|Oran Es-Sénia (Ahmed Ben Bella) International Airport|Es-Sénia|DZ|35.6206|-0.6225
ORT|Northway|Northway Airport|Northway|US|62.9613|-141.9290
ORU|Oruro|Juan Mendoza International Airport|Oruro|BO|-17.9562|-67.0758
OSD|Östersund|Åre Östersund Airport|Östersund|SE|63.1935|14.5042
OSI|Osijek|Osijek Airport|Osijek|HR|45.4624|18.8113
OSR|Mošnov|Leoš Janáček Airport Ostrava|Mošnov|CZ|49.6963|18.1111
OSS|오시|Osh International Airport|Osh|KG|40.6090|72.7933
OST|Oostende|Ostend-Bruges International Airport|Oostende|BE|51.1998|2.8747
OSW|Orsk|Orsk Airport|Orsk|RU|51.0725|58.5956
OTH|North Bend|Southwest Oregon Regional Airport|North Bend|US|43.4171|-124.2460
OTZ|Kotzebue|Ralph Wien Memorial Airport|Kotzebue|US|66.8847|-162.5990
OUA|Ouagadougou|Ouagadougou Thomas Sankara International Airport|Ouagadougou|BF|12.3532|-1.5124
OUD|Ahl Angad|Oujda Angads Airport|Ahl Angad|MA|34.7896|-1.9260
OUL|오울루|Oulu Airport|Oulu|FI|64.9301|25.3546
OUZ|Zouérate|Tazadit Airport|Zouérate|MR|22.7573|-12.4822
OVB|노보시비르스크|Novosibirsk Tolmachevo Airport|Novosibirsk|RU|55.0198|82.6187
OVD|Ranón|Asturias Airport|Ranón|ES|43.5636|-6.0346
OVS|Sovetskiy|Sovetskiy Airport|Sovetskiy|RU|61.3266|63.6019
OWB|Owensboro|Owensboro Daviess County Airport|Owensboro|US|37.7401|-87.1668
OXB|Bissau|Osvaldo Vieira International Airport|Bissau|GW|11.8943|-15.6536
OYE|Oyem|Oyem Airport|Oyem|GA|1.5431|11.5814
OZC|Ozamiz|Labo Airport|Ozamiz|PH|8.1785|123.8420
OZG|Zagora|Zagora Airport|Zagora|MA|30.2658|-5.8608
OZZ|Ouarzazate|Ouarzazate International Airport|Ouarzazate|MA|30.9391|-6.9094
PAB|Bilaspur|Bilaspur Airport|Bilaspur|IN|21.9884|82.1110
PAC|Albrook|Marcos A. Gelabert International Airport|Albrook|PA|8.9733|-79.5556
PAD|Büren|Paderborn Lippstadt Airport|Büren|DE|51.6125|8.6175
PAE|Everett|Seattle Paine Field International Airport|Everett|US|47.9063|-122.2820
PAG|Pagadian|Pagadian Airport|Pagadian|PH|7.8256|123.4596
PAH|Paducah|Barkley Regional Airport|Paducah|US|37.0608|-88.7738
PAP|Port-au-Prince|Toussaint Louverture International Airport|Port-au-Prince|HT|18.5800|-72.2926
PAT|Patna|Jay Prakash Narayan Airport|Patna|IN|25.5913|85.0880
PAV|Paulo Afonso|Paulo Afonso Airport|Paulo Afonso|BR|-9.4009|-38.2506
PAZ|Poza Rica|El Tajín National Airport|Poza Rica|MX|20.6027|-97.4608
PBC|Puebla|Hermanos Serdán International Airport|Puebla|MX|19.1585|-98.3716
PBD|Porbandar|Porbandar Airport|Porbandar|IN|21.6495|69.6564
PBG|Plattsburgh|Plattsburgh International Airport|Plattsburgh|US|44.6509|-73.4681
PBH|파로|Paro International Airport|Paro|BT|27.4032|89.4246
PBM|Paramaribo|Johan Adolf Pengel International Airport|Paramaribo|SR|5.4528|-55.1878
PBO|Paraburdoo|Paraburdoo Airport|Paraburdoo|AU|-23.1711|117.7450
PBR|Puerto Barrios|Puerto Barrios Airport|Puerto Barrios|GT|15.7309|-88.5838
PBU|Putao|Putao Airport|Putao|MM|27.3299|97.4263
PCL|Pucallpa|Cap FAP David Abenzur Rengifo International Airport|Pucallpa|PE|-8.3781|-74.5745
PCP|São Tomé & Príncipe|Principe Airport|São Tomé & Príncipe|ST|1.6612|7.4111
PCR|Puerto Carreño|German Olano Airport|Puerto Carreño|CO|6.1847|-67.4932
PDA|Puerto Inírida|Obando Cesar Gaviria Trujillo Airport|Puerto Inírida|CO|3.8535|-67.9062
PDG|파당|Minangkabau International Airport|Padang|ID|-0.7860|100.2804
PDK|Atlanta|DeKalb Peachtree Airport|Atlanta|US|33.8763|-84.3021
PDL|아소르스|João Paulo II Airport|Ponta Delgada|PT|37.7412|-25.6979
PDO|Talang Gudang-Sumatra Island|Pendopo Airport|Talang Gudang-Sumatra Island|ID|-3.2861|103.8800
PDP|Punta del Este|Capitan Corbeta CA Curbelo International Airport|Punta del Este|UY|-34.8551|-55.0943
PDS|Piedras Negras|Piedras Negras International Airport|Piedras Negras|MX|28.6279|-100.5352
PDT|Pendleton|Eastern Oregon Regional Airport at Pendleton|Pendleton|US|45.6951|-118.8410
PDV|Plovdiv|Plovdiv International Airport|Plovdiv|BG|42.0678|24.8508
PED|Pardubice|Pardubice Airport|Pardubice|CZ|50.0150|15.7398
PEE|페름|Perm International Airport|Perm|RU|57.9145|56.0212
PEG|Perugia|Perugia San Francesco d'Assisi – Umbria International Airport|Perugia|IT|43.0959|12.5132
PEI|Pereira|Matecaña International Airport|Pereira|CO|4.8127|-75.7395
PEM|Puerto Maldonado|Padre Aldamiz International Airport|Puerto Maldonado|PE|-12.6136|-69.2286
PEN|페낭|Penang International Airport|Penang|MY|5.2963|100.2762
PES|Petrozavodsk|Petrozavodsk Airport|Petrozavodsk|RU|61.8852|34.1547
PET|Pelotas|João Simões Lopes Neto International Airport|Pelotas|BR|-31.7172|-52.3278
PEV|Pécs|Pécs-Pogány International Airport|Pécs|HU|45.9889|18.2420
PEW|페샤와르|Bacha Khan International Airport|Peshawar|PK|33.9939|71.5146
PEX|Pechora|Pechora Airport|Pechora|RU|65.1211|57.1308
PEZ|Penza|Penza Airport|Penza|RU|53.1106|45.0211
PFB|Passo Fundo|Lauro Kurtz Airport|Passo Fundo|BR|-28.2440|-52.3278
PFO|파포스|Paphos International Airport|Paphos|CY|34.7180|32.4857
PGA|Page|Page Municipal Airport|Page|US|36.9242|-111.4477
PGD|Punta Gorda|Punta Gorda Airport|Punta Gorda|US|26.9202|-81.9905
PGF|Perpignan|Perpignan-Rivesaltes (Llabanère) Airport|Perpignan|FR|42.7404|2.8707
PGH|Pantnagar|Pantnagar Airport|Pantnagar|IN|29.0334|79.4737
PGK|Pangkal Pinang|Depati Amir Airport|Pangkal Pinang|ID|-2.1622|106.1390
PGU|Khiyaroo|Persian Gulf International Airport|Khiyaroo|IR|27.3796|52.7377
PGV|Greenville|Pitt-Greenville Airport|Greenville|US|35.6355|-77.3843
PGZ|Ponta Grossa|Ponta Grossa Airport - Comandante Antonio Amilton Beraldo|Ponta Grossa|BR|-25.1845|-50.1438
PHB|Parnaíba|Parnaíba - Prefeito Doutor João Silva Filho International Airport|Parnaíba|BR|-2.8937|-41.7320
PHC|Port Harcourt|Port Harcourt International Airport|Port Harcourt|NG|5.0155|6.9496
PHE|Port Hedland|Port Hedland International Airport|Port Hedland|AU|-20.3828|118.6298
PHF|Newport News|Newport News Williamsburg International Airport|Newport News|US|37.1319|-76.4930
PHG|Port Harcourt|Port Harcourt City Airport / Port Harcourt Air Force Base|Port Harcourt|NG|4.8461|7.0214
PHH|포카라|Pokhara International Airport|Pokhara|NP|28.1838|84.0147
PHS|Phitsanulok|Phitsanulok Airport|Phitsanulok|TH|16.7829|100.2790
PHW|Phalaborwa|Hendrik Van Eck Airport|Phalaborwa|ZA|-23.9372|31.1554
PHY|Phetchabun Airport|Phetchabun Airport|Phetchabun Airport|TH|16.6760|101.1950
PIA|Peoria|General Wayne A. Downing Peoria International Airport|Peoria|US|40.6638|-89.6926
PIB|Moselle|Hattiesburg Laurel Regional Airport|Moselle|US|31.4671|-89.3371
PIE|세인트피터즈버그|St. Petersburg Clearwater International Airport|Pinellas Park|US|27.9102|-82.6874
PIH|Pocatello|Pocatello Regional Airport|Pocatello|US|42.9098|-112.5960
PIK|Prestwick|Glasgow Prestwick Airport|Prestwick|GB|55.5015|-4.5772
PIR|Pierre|Pierre Regional Airport|Pierre|US|44.3827|-100.2860
PIS|Poitiers|Poitiers-Biard Airport|Poitiers|FR|46.5877|0.3067
PIT|피츠버그|Pittsburgh International Airport|Pittsburgh|US|40.4915|-80.2329
PIU|Piura|PAF Captain Guillermo Concha Iberico International Airport|Piura|PE|-5.2058|-80.6164
PIX|Pico Island|Pico Airport|Pico Island|PT|38.5543|-28.4413
PIZ|Point Lay|Point Lay LRRS Airport|Point Lay|US|69.7329|-163.0050
PJM|Puerto Jimenez|Puerto Jimenez Airport|Puerto Jimenez|CR|8.5333|-83.3000
PKB|Parkersburg|Mid Ohio Valley Regional Airport|Parkersburg|US|39.3451|-81.4392
PKC|Petropavlovsk-Kamchatsky|Yelizovo Airport|Petropavlovsk-Kamchatsky|RU|53.1687|158.4511
PKE|Parkes|Parkes Airport|Parkes|AU|-33.1314|148.2390
PKR|포카라|Pokhara Domestic Airport|Pokhara|NP|28.2006|83.9812
PKU|Pekanbaru|Sultan Syarif Kasim II International Airport / Roesmin Nurjadin AFB|Pekanbaru|ID|0.4586|101.4443
PKV|Pskov|Princess Olga Pskov International Airport|Pskov|RU|57.7813|28.3938
PKY|Palangkaraya|Tjilik Riwut Airport|Palangkaraya|ID|-2.2271|113.9434
PKZ|팍세|Pakse International Airport|Pakse|LA|15.1340|105.7799
PLJ|Placencia|Placencia Airport|Placencia|BZ|16.5370|-88.3615
PLM|Palembang|Sultan Mahmud Badaruddin II Airport|Palembang|ID|-2.8977|104.6981
PLN|Pellston|Pellston Regional Airport of Emmet County Airport|Pellston|US|45.5709|-84.7967
PLO|Port Lincoln|Port Lincoln Airport|Port Lincoln|AU|-34.6053|135.8800
PLQ|Palanga|Palanga International Airport|Palanga|LT|55.9732|21.0939
PLS|Providenciales|Providenciales International Airport|Providenciales|TC|21.7737|-72.2683
PLW|Palu|Mutiara - SIS Al-Jufrie Airport|Palu|ID|-0.9165|119.9086
PLX|Semey|Semei International Airport|Semey|KZ|50.3513|80.2344
PLZ|Gqeberha|Chief Dawid Stuurman International Airport|Gqeberha|ZA|-33.9897|25.6174
PMC|Puerto Montt|El Tepual International Airport|Puerto Montt|CL|-41.4431|-73.0941
PMF|Parma|Parma Airport|Parma|IT|44.8264|10.2971
PMG|Ponta Porã|Ponta Porã Airport|Ponta Porã|BR|-22.5496|-55.7026
PMI|팔마 데 마요르카|Palma de Mallorca Airport|Palma de Mallorca|ES|39.5517|2.7388
PMO|팔레르모|Falcone–Borsellino Airport|Palermo|IT|38.1760|13.0910
PMQ|Perito Moreno|Perito Moreno Jalil Hamer Airport|Perito Moreno|AR|-46.5379|-70.9787
PMR|Palmerston North|Palmerston North Airport|Palmerston North|NZ|-40.3206|175.6170
PMV|Isla Margarita|Del Caribe Santiago Mariño International Airport|Isla Margarita|VE|10.9126|-63.9666
PMW|Palmas|Brigadeiro Lysias Rodrigues Airport|Palmas|BR|-10.2915|-48.3570
PMY|Puerto Madryn|El Tehuelche Airport|Puerto Madryn|AR|-42.7592|-65.1027
PNA|Pamplona|Pamplona Airport|Pamplona|ES|42.7700|-1.6463
PNI|Pohnpei Island|Pohnpei International Airport|Pohnpei Island|FM|6.9851|158.2099
PNK|Pontianak|Supadio International Airport|Pontianak|ID|-0.1523|109.4045
PNL|Pantelleria|Pantelleria Airport|Pantelleria|IT|36.8165|11.9689
PNP|Popondetta|Girua Airport|Popondetta|PG|-8.8045|148.3090
PNQ|푸네|Pune International Airport|Pune|IN|18.5821|73.9197
PNR|Pointe Noire|Antonio Agostinho-Neto International Airport|Pointe Noire|CG|-4.8160|11.8866
PNS|펜서콜라|Pensacola International Airport|Pensacola|US|30.4727|-87.1866
PNT|Puerto Natales|Lieutenant Julio Gallardo Airport|Puerto Natales|CL|-51.6707|-72.5291
PNY|Puducherry|Pondicherry Airport|Puducherry|IN|11.9680|79.8120
PNZ|Petrolina|Senador Nilo Coelho Airport|Petrolina|BR|-9.3624|-40.5691
POA|포르투알레그리|Porto Alegre-Salgado Filho International Airport|Porto Alegre|BR|-29.9940|-51.1675
POG|Port Gentil|Port Gentil International Airport|Port Gentil|GA|-0.7117|8.7544
POL|Pemba|Pemba Airport|Pemba|MZ|-12.9933|40.5249
POM|포트모르즈비|Port Moresby Jacksons International Airport|Port Moresby|PG|-9.4434|147.2200
POP|Puerto Plata|Gregorio Luperon International Airport|Puerto Plata|DO|19.7579|-70.5700
POR|Pori|Pori Airport|Pori|FI|61.4617|21.8000
POS|포트오브스페인|Piarco International Airport|Port of Spain|TT|10.5953|-61.3376
POZ|포즈난|Poznań-Ławica Airport|Poznań|PL|52.4216|16.8234
PPB|Presidente Prudente|Presidente Prudente Airport|Presidente Prudente|BR|-22.1751|-51.4246
PPG|Pago Pago|Pago Pago International Airport|Pago Pago|AS|-14.3310|-170.7100
PPK|Petropavl|Petropavl International Airport|Petropavl|KZ|54.7756|69.1874
PPN|Popayán|Guillermo León Valencia Airport|Popayán|CO|2.4544|-76.6093
PPP|Proserpine|Proserpine Whitsunday Coast Airport|Proserpine|AU|-20.4944|148.5536
PPS|푸에르토프린세사|Puerto Princesa International Airport / PAF Antonio Bautista Air Base|Puerto Princesa|PH|9.7420|118.7591
PPT|파페에테|Fa'a'ā International Airport|Papeete|PF|-17.5535|-149.6069
PQI|Presque Isle|Presque Isle International Airport|Presque Isle|US|46.6890|-68.0448
PQQ|Port Macquarie|Port Macquarie Airport|Port Macquarie|AU|-31.4358|152.8630
PRA|Parana|General Urquiza Airport|Parana|AR|-31.7948|-60.4804
PRC|Prescott|Prescott Regional Airport - Ernest A. Love Field|Prescott|US|34.6535|-112.4199
PRI|Praslin Island|Praslin Island Airport|Praslin Island|SC|-4.3193|55.6916
PRM|Portimão|Portimão Airport|Portimão|PT|37.1493|-8.5840
PRN|프리슈티나|Priština Adem Jashari International Airport|Prishtina|XK|42.5728|21.0358
PSA|피사|Pisa International Airport|Pisa|IT|43.6839|10.3927
PSC|Pasco|Tri Cities Airport|Pasco|US|46.2647|-119.1190
PSD|Port Said|Port Said International Airport|Port Said|EG|31.2793|32.2406
PSE|Ponce|Mercedita International Airport|Ponce|PR|18.0083|-66.5630
PSG|Petersburg|Petersburg James A Johnson Airport|Petersburg|US|56.8017|-132.9450
PSM|Portsmouth|Portsmouth International Airport at Pease|Portsmouth|US|43.0779|-70.8233
PSO|Chachagüí|Antonio Nariño Airport|Chachagüí|CO|1.3967|-77.2909
PSP|팜스프링스|Palm Springs International Airport|Palm Springs|US|33.8297|-116.5070
PSR|Pescara|Abruzzo Airport|Pescara|IT|42.4311|14.1830
PSS|Posadas|Libertador Gral D Jose De San Martin Airport|Posadas|AR|-27.3858|-55.9707
PSU|Putussibau-Borneo Island|Pangsuma Airport|Putussibau-Borneo Island|ID|0.8346|112.9402
PSZ|Puerto Suárez|Capitán Av. Salvador Ogaya G. airport|Puerto Suárez|BO|-18.9753|-57.8206
PTG|Polokwane|Polokwane International Airport|Polokwane|ZA|-23.8453|29.4586
PTH|Port Heiden|Port Heiden Airport|Port Heiden|US|56.9579|-158.6302
PTJ|Portland Airport|Portland Airport|Portland Airport|AU|-38.3181|141.4710
PTP|Pointe-à-Pitre|Maryse Condé International Airport|Pointe-à-Pitre|GP|16.2654|-61.5328
PTU|Platinum|Platinum Airport|Platinum|US|59.0177|-161.8279
PTY|파나마시티|Tocumen International Airport|Tocumen|PA|9.0714|-79.3835
PUB|Pueblo|Pueblo Memorial Airport|Pueblo|US|38.2891|-104.4970
PUD|Puerto Deseado|Puerto Deseado Airport|Puerto Deseado|AR|-47.7353|-65.9041
PUF|Pau|Pau Pyrénées Airport|Pau|FR|43.3800|-0.4186
PUG|Port Augusta Airport|Port Augusta Airport|Port Augusta Airport|AU|-32.5069|137.7170
PUJ|푼타카나|Punta Cana International Airport|Punta Cana|DO|18.5671|-68.3646
PUQ|푼타아레나스|President Carlos Ibáñez International Airport|Punta Arenas|CL|-53.0026|-70.8546
PUU|Puerto Asís|Tres De Mayo Airport|Puerto Asís|CO|0.5052|-76.5008
PUW|Pullman|Pullman-Moscow Regional Airport|Pullman|US|46.7416|-117.1116
PUY|풀라|Pula Airport|Pula|HR|44.8935|13.9222
PUZ|Puerto Cabezas|Puerto Cabezas Airport|Puerto Cabezas|NI|14.0472|-83.3867
PVA|Providencia|El Embrujo Airport|Providencia|CO|13.3575|-81.3580
PVD|프로비던스|Rhode Island T. F. Green International Airport|Providence|US|41.7250|-71.4257
PVH|Porto Velho|Governador Jorge Teixeira de Oliveira International Airport|Porto Velho|BR|-8.7085|-63.9023
PVK|Preveza|Aktion National Airport|Preveza|GR|38.9255|20.7653
PVR|푸에르토바야르타|Puerto Vallarta International Airport|Puerto Vallarta|MX|20.6799|-105.2544
PVU|Provo|Provo Municipal Airport|Provo|US|40.2189|-111.7224
PWE|Apapelgino|Pevek Airport|Apapelgino|RU|69.7833|170.5970
PWM|포틀랜드(메인)|Portland International Jetport|Portland|US|43.6462|-70.3093
PWQ|Pavlodar|Pavlodar International Airport|Pavlodar|KZ|52.1950|77.0731
PXM|Puerto Escondido|Puerto Escondido International Airport|Puerto Escondido|MX|15.8768|-97.0891
PXO|Vila Baleira|Porto Santo Airport|Vila Baleira|PT|33.0734|-16.3500
PXR|Surin|Surin Airport|Surin|TH|14.8683|103.4980
PXU|Pleiku|Pleiku Airport|Pleiku|VN|14.0045|108.0170
PYJ|Yakutia|Polyarny Airport|Yakutia|RU|66.4004|112.0300
PYK|Karaj|Payam International Airport|Karaj|IR|35.7761|50.8267
PZB|Pietermaritzburg|Pietermaritzburg Airport|Pietermaritzburg|ZA|-29.6490|30.3987
PZH|Fort Sandeman|Zhob Airport|Fort Sandeman|PK|31.3584|69.4636
PZI|Panzhihua|Panzhihua Bao'anying Airport|Panzhihua|CN|26.5400|101.7985
PZO|Guyana City|General Manuel Carlos Piar International Airport|Guyana City|VE|8.2885|-62.7604
PZU|Port Sudan|Port Sudan New International Airport|Port Sudan|SD|19.4346|37.2341
QBC|Bella Coola|Bella Coola Airport|Bella Coola|CA|52.3875|-126.5960
QOW|Owerri|Sam Mbakwe International Cargo Airport|Owerri|NG|5.4271|7.2060
QRO|Querétaro|Querétaro Intercontinental Airport|Querétaro|MX|20.6188|-100.1864
QRW|Okpe|Warri Airport|Okpe|NG|5.5982|5.8187
QSF|Sétif|Ain Arnat Airport|Sétif|DZ|36.1785|5.3299
QSR|Salerno|Salerno Costa d'Amalfi Airport|Salerno|IT|40.6204|14.9113
QSZ|Shache|Shache Airport|Shache|CN|38.2454|77.0561
QUO|Uyo|Akwa Ibom International Airport|Uyo|NG|4.8725|8.0930
RAB|Kokopo|Tokua Airport|Kokopo|PG|-4.3405|152.3800
RAE|Arar|Arar Domestic Airport|Arar|SA|30.9066|41.1382
RAH|Rafha|Rafha Domestic Airport|Rafha|SA|29.6264|43.4906
RAI|Praia|Nelson Mandela International Airport|Praia|CV|14.9411|-23.4847
RAK|마라케시|Marrakesh Menara Airport|Marrakesh|MA|31.6048|-8.0358
RAO|Ribeirão Preto|Leite Lopes Airport|Ribeirão Preto|BR|-21.1343|-47.7741
RAP|Rapid City|Rapid City Regional Airport|Rapid City|US|44.0453|-103.0570
RAR|라로통가|Rarotonga International Airport|Avarua|CK|-21.2027|-159.8060
RAS|Rasht|Sardar-e-Jangal Airport|Rasht|IR|37.3233|49.6178
RBA|라바트|Rabat-Salé Airport|Rabat|MA|34.0515|-6.7515
RBR|Rio Branco|Rio Branco-Plácido de Castro International Airport|Rio Branco|BR|-9.8690|-67.8940
RBY|Ruby|Ruby Airport|Ruby|US|64.7272|-155.4700
RCB|Richards Bay|Richards Bay Airport|Richards Bay|ZA|-28.7410|32.0921
RCH|Riohacha|Almirante Padilla Airport|Riohacha|CO|11.5262|-72.9260
RDD|Redding|Redding Municipal Airport|Redding|US|40.5090|-122.2930
RDM|Redmond|Roberts Field|Redmond|US|44.2541|-121.1500
RDO|Radom|Warsaw Radom Airport|Radom|PL|51.3894|21.2147
RDP|Durgapur|Kazi Nazrul Islam Airport|Durgapur|IN|23.6225|87.2430
RDZ|Rodez|Rodez–Aveyron Airport|Rodez|FR|44.4079|2.4827
REC|헤시피|Recife/Guararapes - Gilberto Freyre International Airport|Recife|BR|-8.1275|-34.9230
REG|Reggio Calabria|Reggio Calabria Airport|Reggio Calabria|IT|38.0712|15.6516
REL|Rawson|Almirante Marco Andres Zar Airport|Rawson|AR|-43.2105|-65.2703
REN|Orenburg|Orenburg Central Airport|Orenburg|RU|51.7927|55.4572
RER|Retalhuleu|Retalhuleu Airport|Retalhuleu|GT|14.5214|-91.6970
RES|Resistencia|Resistencia International Airport|Resistencia|AR|-27.4499|-59.0561
REU|Reus|Reus Airport|Reus|ES|41.1475|1.1684
REW|Rewa|Rewa Airport, Chorhata, REWA|Rewa|IN|24.5034|81.2203
REX|Reynosa|General Lucio Blanco International Airport|Reynosa|MX|26.0089|-98.2285
RFD|Chicago|Chicago Rockford International Airport|Chicago|US|42.1954|-89.0972
RFP|Uturoa|Raiatea Airport|Uturoa|PF|-16.7229|-151.4660
RGA|Rio Grande|Gobernador Ramón Trejo Noel International Airport|Rio Grande|AR|-53.7777|-67.7494
RGI|Rangiroa Airport|Rangiroa Airport|Rangiroa Airport|PF|-14.9543|-147.6610
RGL|Rio Gallegos|Piloto Civil Norberto Fernández International Airport|Rio Gallegos|AR|-51.6088|-69.3089
RGO|Hoemun-ri|Orang (Chongjin) Airport|Hoemun-ri|KP|41.4285|129.6476
RHD|Termas de Río Hondo|Termas de Río Hondo international Airport|Termas de Río Hondo|AR|-27.4966|-64.9360
RHI|Rhinelander|Rhinelander Oneida County Airport|Rhinelander|US|45.6312|-89.4675
RHO|로도스|Rhodes International Airport "Diagoras"|Rhodes|GR|36.4054|28.0862
RIA|Santa Maria|Santa Maria Airport|Santa Maria|BR|-29.7114|-53.6882
RIB|Riberalta|Capitán Av. Selin Zeitun Lopez Airport|Riberalta|BO|-11.0094|-66.0755
RIC|리치먼드|Richmond International Airport|Richmond|US|37.5052|-77.3197
RIS|Rishiri|Rishiri Airport|Rishiri|JP|45.2420|141.1860
RIW|Riverton|Central Wyoming Regional Airport|Riverton|US|43.0642|-108.4600
RIX|리가|Riga International Airport|Riga|LV|56.9208|23.9707
RIY|Mukalla|Riyan International Airport|Mukalla|YE|14.6622|49.3753
RIZ|Rizhao|Rizhao Shanzihe Airport|Rizhao|CN|35.4050|119.3244
RJA|Madhurapudi|Rajahmundry Airport|Madhurapudi|IN|17.1058|81.8132
RJH|Rajshahi|Shah Makhdum Airport|Rajshahi|BD|24.4372|88.6165
RJK|Rijeka|Rijeka Airport|Rijeka|HR|45.2164|14.5709
RJL|Logroño|Logroño-Agoncillo Airport|Logroño|ES|42.4610|-2.3222
RJN|Rafsanjan|Rafsanjan Airport|Rafsanjan|IR|30.2983|56.0490
RKD|Rockland|Knox County Regional Airport|Rockland|US|44.0601|-69.0992
RKE|Roskilde|Copenhagen Roskilde Airport|Roskilde|DK|55.5856|12.1314
RKS|Rock Springs|Southwest Wyoming Regional Airport|Rock Springs|US|41.5942|-109.0650
RKT|라스알카이마|Ras Al Khaimah International Airport|Ras Al Khaimah|AE|25.6135|55.9388
RKV|Reykjavík|Reykjavík Domestic Airport|Reykjavík|IS|64.1287|-21.9376
RKZ|Xigazê|Xigaze Peace Airport / Shigatse Air Base|Xigazê|CN|29.3509|89.2992
RLG|Laage|Rostock-Laage Airport|Laage|DE|53.9182|12.2783
RLK|Bayannur|Bayannur Tianjitai Airport|Bayannur|CN|40.9264|107.7409
RMA|Roma|Roma Airport|Roma|AU|-26.5450|148.7750
RMF|Marsa Alam|Marsa Alam International Airport|Marsa Alam|EG|25.5555|34.5924
RMI|Rimini|Federico Fellini International Airport|Rimini|IT|44.0200|12.6122
RML|Colombo|Colombo Ratmalana International Airport|Colombo|LK|6.8216|79.8859
RMO|키시너우|Chişinău International Airport|Chişinău|MD|46.9277|28.9317
RMU|Corvera|Region of Murcia International Airport|Corvera|ES|37.8029|-1.1249
RMZ|Tobolsk|Tobolsk Remezov Airport|Tobolsk|RU|58.0597|68.3480
RNB|Ronneby|Ronneby Airport|Ronneby|SE|56.2667|15.2650
RNJ|Yoron|Yoron Airport|Yoron|JP|27.0438|128.4016
RNN|Rønne|Bornholm Airport|Rønne|DK|55.0633|14.7596
RNO|리노|Reno Tahoe International Airport|Reno|US|39.4991|-119.7680
RNS|Saint-Jacques-de-la-Lande|Rennes-Saint-Jacques Airport|Saint-Jacques-de-la-Lande|FR|48.0695|-1.7348
ROA|Roanoke|Roanoke–Blacksburg Regional Airport|Roanoke|US|37.3255|-79.9754
ROB|Monrovia|Roberts International Airport|Monrovia|LR|6.2338|-10.3623
ROC|로체스터|Frederick Douglass Greater Rochester International Airport|Rochester|US|43.1189|-77.6724
ROI|Roi Et|Roi Et Airport|Roi Et|TH|16.1168|103.7740
ROK|Rockhampton|Rockhampton Airport|Rockhampton|AU|-23.3800|150.4754
ROO|Rondonópolis|Maestro Marinho Franco Airport|Rondonópolis|BR|-16.5843|-54.7248
ROP|Rota Island|Rota International Airport|Rota Island|MP|14.1733|145.2411
ROS|Rosario|Rosario Islas Malvinas International Airport|Rosario|AR|-32.9036|-60.7850
ROT|Rotorua|Rotorua Regional Airport|Rotorua|NZ|-38.1092|176.3170
ROW|Roswell|Roswell Air Center Airport|Roswell|US|33.3016|-104.5310
RPR|Raipur|Swami Vivekananda Airport|Raipur|IN|21.1804|81.7388
RQA|Ruoqiang Town|Ruoqiang Loulan Airport|Ruoqiang Town|CN|38.9747|88.0083
RRG|Port Mathurin|Sir Charles Gaetan Duval Airport|Port Mathurin|MU|-19.7577|63.3610
RRS|Røros|Røros Airport|Røros|NO|62.5784|11.3423
RSA|Santa Rosa|Santa Rosa Airport|Santa Rosa|AR|-36.5883|-64.2757
RSD|Rock Sound|Rock Sound International Airport|Rock Sound|BS|24.8916|-76.1776
RSI|Hanak|Red Sea International Airport|Hanak|SA|25.6280|37.0889
RST|Rochester|Rochester International Airport|Rochester|US|43.9083|-92.5000
RSW|포트마이어스|Southwest Florida International Airport|Fort Myers|US|26.5347|-81.7528
RTB|Coxen Hole|Juan Manuel Gálvez International Airport|Coxen Hole|HN|16.3168|-86.5230
RTM|로테르담|Rotterdam The Hague Airport|Rotterdam|NL|51.9569|4.4372
RUA|Arua|Arua Airport|Arua|UG|3.0492|30.9117
RUN|Sainte-Marie|Roland Garros Airport|Sainte-Marie|RE|-20.8901|55.5189
RUR|Rurutu Airport|Rurutu Airport|Rurutu Airport|PF|-22.4336|-151.3607
RUT|Rutland|Rutland - Southern Vermont Regional Airport|Rutland|US|43.5294|-72.9496
RVK|Rørvik|Rørvik Airport, Ryum|Rørvik|NO|64.8383|11.1461
RVN|로바니에미|Rovaniemi Airport|Rovaniemi|FI|66.5633|25.8298
RVY|Rivera|Pres. Gral. Óscar D. Gestido Binational Airport|Rivera|UY|-30.9746|-55.4762
RXS|Roxas City|Roxas Airport|Roxas City|PH|11.5977|122.7520
RYK|Rahim Yar Khan|Shaikh Zaid Airport|Rahim Yar Khan|PK|28.3839|70.2796
RZE|Jasionka|Rzeszów-Jasionka Airport|Jasionka|PL|50.1098|22.0242
RZR|Ramsar|Ramsar Airport|Ramsar|IR|36.9070|50.6873
RZV|Rize|Rize–Artvin Airport|Rize|TR|41.1798|40.8488
SAB|Zion's Hill|Juancho E. Yrausquin Airport|Zion's Hill|BQ|17.6453|-63.2205
SAF|Santa Fe|Santa Fe Municipal Airport|Santa Fe|US|35.6171|-106.0890
SAG|Kakadi|Shirdi International Airport|Kakadi|IN|19.6892|74.3737
SAH|사나|Sanaa International Airport|Sanaa|YE|15.4763|44.2197
SAI|시엠레아프|Siem Reap-Angkor International Airport|Siem Reap|KH|13.3697|104.2238
SAL|산살바도르|El Salvador International Airport Saint Óscar Arnulfo Romero y Galdámez|San Salvador|SV|13.4445|-89.0558
SAP|San Pedro Sula|Ramón Villeda Morales International Airport|San Pedro Sula|HN|15.4526|-87.9236
SAQ|Andros Island|San Andros Airport|Andros Island|BS|25.0538|-78.0490
SAT|샌안토니오|San Antonio International Airport|San Antonio|US|29.5337|-98.4698
SAV|서배너|Savannah Hilton Head International Airport|Savannah|US|32.1266|-81.2000
SAW|이스탄불 사비하괵첸|Istanbul Sabiha Gökçen International Airport|Pendik|TR|40.8986|29.3092
SBA|Santa Barbara|Santa Barbara Municipal Airport|Santa Barbara|US|34.4262|-119.8400
SBD|샌버나디노|San Bernardino International Airport|San Bernardino|US|34.0967|-117.2366
SBH|Gustavia|St. Jean Airport|Gustavia|BL|17.9044|-62.8433
SBN|South Bend|South Bend International Airport|South Bend|US|41.7083|-86.3169
SBP|San Luis Obispo|San Luis County Regional Airport|San Luis Obispo|US|35.2368|-120.6420
SBT|Sabetta|Sabetta International Airport|Sabetta|RU|71.2192|72.0522
SBW|Sibu|Sibu Airport|Sibu|MY|2.2616|111.9850
SBY|Salisbury|Salisbury Ocean City Wicomico Regional Airport|Salisbury|US|38.3405|-75.5103
SBZ|Sibiu|Sibiu International Airport|Sibiu|RO|45.7858|24.0867
SCC|Deadhorse|Deadhorse Airport|Deadhorse|US|70.1947|-148.4650
SCE|State College|State College Regional Airport|State College|US|40.8494|-77.8485
SCK|Stockton|Stockton Metropolitan Airport|Stockton|US|37.8933|-121.2381
SCN|Saarbrücken|Saarbrücken Airport|Saarbrücken|DE|49.2145|7.1097
SCO|악타우|Aktau International Airport|Aktau|KZ|43.8601|51.0909
SCQ|Santiago de Compostela|Santiago-Rosalía de Castro Airport|Santiago de Compostela|ES|42.8963|-8.4151
SCR|Malung-Sälen|Scandinavian Mountains Airport|Malung-Sälen|SE|61.1651|12.8335
SCT|Mori|Socotra Airport|Mori|YE|12.6321|53.9062
SCU|Santiago|Antonio Maceo International Airport|Santiago|CU|19.9747|-75.8355
SCV|Suceava|Suceava Ștefan cel Mare International Airport|Suceava|RO|47.6875|26.3541
SCW|Syktyvkar|Syktyvkar Airport|Syktyvkar|RU|61.6470|50.8451
SDD|Lubango|Lubango Mukanka International Airport|Lubango|AO|-14.9248|13.5767
SDE|Santiago del Estero|Vicecomodoro Angel D. La Paz Aragonés Airport|Santiago del Estero|AR|-27.7656|-64.3100
SDF|루이빌|Louisville Muhammad Ali International Airport|Louisville|US|38.1706|-85.7351
SDG|Sanandaj Airport|Sanandaj Airport|Sanandaj Airport|IR|35.2459|47.0092
SDK|Sandakan|Sandakan Airport|Sandakan|MY|5.9009|118.0590
SDL|Sundsvall|Sundsvall-Härnösand Airport|Sundsvall|SE|62.5281|17.4439
SDP|Sand Point|Sand Point Airport|Sand Point|US|55.3139|-160.5221
SDQ|산토도밍고|Las Américas International Airport|Santo Domingo|DO|18.4297|-69.6689
SDR|Santander|Seve Ballesteros-Santander Airport|Santander|ES|43.4271|-3.8200
SDS|Sado|Sado Airport|Sado|JP|38.0602|138.4140
SDU|리우 산투스두몽|Santos Dumont Airport|Rio de Janeiro|BR|-22.9104|-43.1628
SDW|Chipi|Sindhudurg Airport|Chipi|IN|16.0026|73.5298
SDY|Sidney|Sidney - Richland Regional Airport|Sidney|US|47.7051|-104.1944
SEB|Sabha|Sabha Airport|Sabha|LY|26.9925|14.4662
SEK|Srednekolymsk|Srednekolymsk Airport|Srednekolymsk|RU|67.4805|153.7364
SEN|Southend-on-Sea|London Southend Airport|Southend-on-Sea|GB|51.5706|0.6936
SEZ|세이셸|Seychelles International Airport|Victoria|SC|-4.6743|55.5218
SFA|Sfax|Sfax Thyna International Airport|Sfax|TN|34.7180|10.6910
SFB|올랜도 샌퍼드|Orlando Sanford International Airport|Orlando|US|28.7743|-81.2346
SFG|Grand Case|Grand Case-l'Espérance Airport|Grand Case|MF|18.1001|-63.0474
SFJ|Kangerlussuaq|Kangerlussuaq International Airport|Kangerlussuaq|GL|67.0104|-50.7153
SFN|Santa Fe|Sauce Viejo Airport|Santa Fe|AR|-31.7117|-60.8117
SFS|Olongapo|Subic Bay International Airport / Naval Air Station Cubi Point|Olongapo|PH|14.7948|120.2719
SFT|Skellefteå|Skellefteå Airport|Skellefteå|SE|64.6248|21.0769
SGC|Surgut|Surgut International Airport|Surgut|RU|61.3405|73.4058
SGD|Sønderborg|Sønderborg Airport|Sønderborg|DK|54.9644|9.7917
SGF|Springfield|Springfield Branson National Airport|Springfield|US|37.2450|-93.3886
SGU|St George|St George Regional Airport|St George|US|37.0364|-113.5103
SHB|Nakashibetsu|Nakashibetsu Airport|Nakashibetsu|JP|43.5775|144.9600
SHD|Weyers Cave|Shenandoah Valley Regional Airport|Weyers Cave|US|38.2638|-78.8964
SHI|Miyakojima|Shimojishima Airport|Miyakojima|JP|24.8267|125.1450
SHJ|샤르자|Sharjah International Airport|Sharjah|AE|25.3286|55.5172
SHL|Shillong|Shillong Airport|Shillong|IN|25.7036|91.9787
SHM|Shirahama|Nanki Shirahama Airport|Shirahama|JP|33.6622|135.3640
SHO|Mpaka|King Mswati III International Airport|Mpaka|SZ|-26.3586|31.7169
SHR|Sheridan|Sheridan County Airport|Sheridan|US|44.7692|-106.9800
SHS|Jingzhou|Jingzhou Shashi Airport|Jingzhou|CN|30.2928|112.4485
SHV|Shreveport|Shreveport Regional Airport|Shreveport|US|32.4447|-93.8267
SHW|Sharurah|Sharurah Domestic Airport|Sharurah|SA|17.4669|47.1214
SID|Espargos|Amílcar Cabral International Airport|Espargos|CV|16.7414|-22.9494
SIG|San Juan|Fernando Luis Ribas Dominicci Airport|San Juan|PR|18.4568|-66.0981
SIS|Sishen|Sishen Airport|Sishen|ZA|-27.6486|22.9993
SIT|Sitka|Sitka Rocky Gutierrez Airport|Sitka|US|57.0471|-135.3620
SJD|로스카보스|Los Cabos International Airport|San José del Cabo|MX|23.1519|-109.7207
SJE|San José Del Guaviare|Jorge E. Gonzalez Torres Airport|San José Del Guaviare|CO|2.5797|-72.6394
SJI|San Jose|San Jose Airport|San Jose|PH|12.3615|121.0470
SJJ|사라예보|Sarajevo International Airport|Sarajevo|BA|43.8246|18.3315
SJK|São José Dos Campos|Professor Urbano Ernesto Stumpf Airport|São José Dos Campos|BR|-23.2292|-45.8615
SJL|São Gabriel da Cachoeira|São Gabriel da Cachoeira Airport|São Gabriel da Cachoeira|BR|-0.1484|-66.9855
SJO|산호세(코스타리카)|Juan Santamaría International Airport|San José|CR|9.9939|-84.2088
SJP|São José do Rio Preto|Prof. Eribelto Manoel Reino State Airport|São José do Rio Preto|BR|-20.8171|-49.4070
SJT|San Angelo|San Angelo Regional Mathis Field|San Angelo|US|31.3577|-100.4960
SJU|산후안|Luis Munoz Marin International Airport|San Juan|PR|18.4394|-66.0018
SJW|스자좡|Shijiazhuang Zhengding International Airport|Shijiazhuang|CN|38.2807|114.6970
SJZ|Velas|São Jorge Airport|Velas|PT|38.6655|-28.1758
SKB|Basseterre|Robert L. Bradshaw International Airport|Basseterre|KN|17.3108|-62.7191
SKD|사마르칸트|Samarkand International Airport|Samarkand|UZ|39.7018|66.9815
SKG|테살로니키|Thessaloniki Macedonia International Airport|Thessaloniki|GR|40.5193|22.9700
SKN|Hadsel|Stokmarknes Airport, Skagen|Hadsel|NO|68.5788|15.0334
SKO|Sokoto|Sadiq Abubakar III International Airport|Sokoto|NG|12.9157|5.2075
SKP|스코페|Skopje International Airport|Ilinden|MK|41.9581|21.6226
SKT|Sialkot|Sialkot International Airport|Sialkot|PK|32.5359|74.3646
SKX|Saransk|Saransk International Airport|Saransk|RU|54.1251|45.2123
SKZ|Sukkur|Begum Nusrat Bhutto International Airport Sukkur|Sukkur|PK|27.7220|68.7917
SLA|Salta|Martín Miguel de Güemes International Airport|Salta|AR|-24.8560|-65.4862
SLD|Sliač|Sliač Airport|Sliač|SK|48.6378|19.1341
SLE|Salem|Salem-Willamette Valley Airport/McNary Field|Salem|US|44.9095|-123.0030
SLK|Saranac Lake|Adirondack Regional Airport|Saranac Lake|US|44.3869|-74.2046
SLL|살랄라|Salalah International Airport|Salalah|OM|17.0387|54.0913
SLM|Salamanca|Salamanca Airport|Salamanca|ES|40.9521|-5.5020
SLN|Salina|Salina Municipal Airport|Salina|US|38.7910|-97.6522
SLP|San Luis Potosí|Ponciano Arriaga International Airport|San Luis Potosí|MX|22.2620|-100.9357
SLU|Castries|George F. L. Charles Airport|Castries|LC|14.0202|-60.9929
SLW|Saltillo|Plan de Guadalupe International Airport|Saltillo|MX|25.5379|-100.9283
SLY|Salekhard|Salekhard Airport|Salekhard|RU|66.5908|66.6110
SLZ|São Luís|Marechal Cunha Machado International Airport|São Luís|BR|-2.5864|-44.2350
SMA|Vila do Porto|Santa Maria Airport|Vila do Porto|PT|36.9714|-25.1706
SMF|새크라멘토|Sacramento International Airport|Sacramento|US|38.6954|-121.5910
SMI|Samos Island|Samos Airport|Samos Island|GR|37.6900|26.9117
SML|Stella Maris|Stella Maris Airport|Stella Maris|BS|23.5830|-75.2689
SMN|Salmon|Lemhi County Airport|Salmon|US|45.1222|-113.8820
SMR|Santa Marta|Simón Bolívar International Airport|Santa Marta|CO|11.1196|-74.2306
SMS|Vohilava|Sainte Marie Airport|Vohilava|MG|-17.0939|49.8158
SMW|Smara|Smara Airport|Smara|EH|26.7320|-11.6837
SMX|Santa Maria|Santa Maria Public Airport Captain G Allan Hancock Field|Santa Maria|US|34.8989|-120.4570
SNA|오렌지카운티|John Wayne Orange County International Airport|Santa Ana|US|33.6751|-117.8693
SNB|Milikapiti|Snake Bay Airport|Milikapiti|AU|-11.4177|130.6485
SNC|Salinas|General Ulpiano Paez International Airport|Salinas|EC|-2.2101|-80.9851
SNE|Preguiça|Preguiça Airport|Preguiça|CV|16.5889|-24.2841
SNN|섀넌|Shannon Airport|Shannon|IE|52.7020|-8.9248
SNO|Sakon Nakhon Airport|Sakon Nakhon Airport|Sakon Nakhon Airport|TH|17.1951|104.1190
SNP|St Paul Island|St Paul Island Airport|St Paul Island|US|57.1663|-170.2226
SNU|Santa Clara|Abel Santamaria International Airport|Santa Clara|CU|22.4922|-79.9431
SNV|Santa Elena de Uairén|Santa Elena de Uairén Airport|Santa Elena de Uairén|VE|4.5547|-61.1452
SNW|Thandwe|Thandwe Airport|Thandwe|MM|18.4607|94.3001
SOB|Sármellék|Hévíz–Balaton Airport|Sármellék|HU|46.6864|17.1591
SOC|Surakarta|Adisoemarmo International Airport|Surakarta|ID|-7.5160|110.7575
SOF|소피아|Sofia Airport|Sofia|BG|42.6964|23.4177
SOJ|Sørkjosen|Sørkjosen Airport|Sørkjosen|NO|69.7868|20.9594
SOM|El Tigre|San Tomé Airport|El Tigre|VE|8.9451|-64.1511
SON|Luganville|Santo Pekoa International Airport|Luganville|VU|-15.5050|167.2200
SOQ|Sorong|Domine Eduard Osok Airport|Sorong|ID|-0.8940|131.2870
SOU|Southampton|Southampton Airport|Southampton|GB|50.9503|-1.3568
SOW|Show Low|Show Low Regional Airport|Show Low|US|34.2641|-110.0071
SPC|Sta Cruz de la Palma|La Palma Airport|Sta Cruz de la Palma|ES|28.6265|-17.7556
SPD|Saidpur|Saidpur Airport|Saidpur|BD|25.7592|88.9089
SPI|Springfield|Abraham Lincoln Capital Airport|Springfield|US|39.8441|-89.6779
SPP|Menongue|Menongue Airport|Menongue|AO|-14.6576|17.7198
SPR|San Pedro|John Greif II Airport|San Pedro|BZ|17.9139|-87.9711
SPS|Wichita Falls|Wichita Falls Municipal Airport / Sheppard Air Force Base|Wichita Falls|US|33.9888|-98.4919
SPU|스플리트|Split Saint Jerome Airport|Split|HR|43.5389|16.2980
SPX|기자|Sphinx International Airport|Al Jiza|EG|30.1082|30.8957
SPY|San Pedro Airport|San Pedro Airport|San Pedro Airport|CI|4.7467|-6.6608
SQD|Shangrao|Shangrao Sanqingshan Airport|Shangrao|CN|28.3797|117.9643
SQG|Sintang|Tebelian Airport|Sintang|ID|-0.0452|111.4580
SQJ|Sanming|Sanming Shaxian Airport|Sanming|CN|26.4263|117.8336
SQL|San Carlos|San Carlos Airport|San Carlos|US|37.5131|-122.2508
SRE|Sucre|Alcantarí International Airport|Sucre|BO|-19.2468|-65.1496
SRG|세마랑|Jenderal Ahmad Yani Airport|Semarang|ID|-6.9707|110.3732
SRP|Leirvik|Stord Airport, Sørstokken|Leirvik|NO|59.7919|5.3408
SRQ|사라소타|Sarasota Bradenton International Airport|Sarasota|US|27.3946|-82.5544
SRT|Soroti|Soroti Airport|Soroti|UG|1.7277|33.6228
SRY|Sari|Sari Dasht-e Naz International Airport|Sari|IR|36.6444|53.1888
SRZ|Santa Cruz|El Trompillo Airport|Santa Cruz|BO|-17.8116|-63.1715
SSA|사우바도르|Deputado Luiz Eduardo Magalhães International Airport|Salvador|BR|-12.9086|-38.3225
SSG|Malabo|Malabo International Airport|Malabo|GQ|3.7553|8.7087
SSH|샤름엘셰이크|Sharm El Sheikh International Airport|Sharm El Sheikh|EG|27.9773|34.3947
SSJ|Alstahaug|Sandnessjøen Airport, Stokka|Alstahaug|NO|65.9568|12.4689
SST|Santa Teresita|Santa Teresita Airport|Santa Teresita|AR|-36.5423|-56.7218
SSY|Mbanza Congo|Mbanza Congo Airport|Mbanza Congo|AO|-6.2699|14.2470
STC|Saint Cloud|Saint Cloud Regional Airport|Saint Cloud|US|45.5466|-94.0599
STD|Santo Domingo|Mayor Buenaventura Vivas International Airport|Santo Domingo|VE|7.5654|-72.0351
STG|St George|St George Airport|St George|US|56.5773|-169.6638
STI|Santiago|Cibao International Airport|Santiago|DO|19.4041|-70.6044
STL|세인트루이스|St. Louis Lambert International Airport|St Louis|US|38.7487|-90.3700
STM|Santarém|Santarém - Maestro Wilson Fonseca International Airport|Santarém|BR|-2.4224|-54.7931
STN|런던 스탠스테드|London Stansted Airport|London|GB|51.8850|0.2350
STR|슈투트가르트|Stuttgart Airport|Stuttgart|DE|48.6899|9.2220
STS|Santa Rosa|Charles M. Schulz Sonoma County Airport|Santa Rosa|US|38.5090|-122.8130
STT|Charlotte Amalie|Cyril E. King Airport|Charlotte Amalie|VI|18.3372|-64.9733
STV|Surat|Surat International Airport|Surat|IN|21.1155|72.7433
STW|Stavropol|Stavropol Shpakovskoye Airport|Stavropol|RU|45.1092|42.1128
STX|Christiansted|Henry E. Rohlsen Airport|Christiansted|VI|17.7014|-64.8026
SUB|수라바야|Juanda International Airport|Surabaya|ID|-7.3798|112.7870
SUF|Lamezia Terme|Lamezia Terme Sant'Eufemia International Airport|Lamezia Terme|IT|38.9062|16.2460
SUG|Surigao City|Surigao Airport|Surigao City|PH|9.7558|125.4809
SUI|Sukhumi|Vladislav Ardzinba Sukhum International Airport|Sukhumi|GE|42.8582|41.1281
SUJ|Satu Mare|Satu Mare International Airport|Satu Mare|RO|47.7033|22.8857
SUN|Hailey|Friedman Memorial Airport|Hailey|US|43.5044|-114.2960
SUV|수바|Nausori International Airport|Nausori|FJ|-18.0442|178.5615
SUX|Sioux City|Sioux Gateway Airport / Brigadier General Bud Day Field|Sioux City|US|42.3976|-96.3822
SVA|Savoonga|Savoonga Airport|Savoonga|US|63.6864|-170.4930
SVB|Sambava|Sambava Airport|Sambava|MG|-14.2786|50.1747
SVC|Silver City|Grant County Airport|Silver City|US|32.6367|-108.1547
SVD|Kingstown|Argyle International Airport|Kingstown|VC|13.1597|-61.1488
SVG|스타방에르|Stavanger Airport, Sola|Stavanger|NO|58.8767|5.6378
SVI|San Vicente Del Caguán|Eduardo Falla Solano Airport|San Vicente Del Caguán|CO|2.1522|-74.7663
SVJ|Svolvær|Svolvær Airport, Helle|Svolvær|NO|68.2433|14.6692
SVL|Savonlinna|Savonlinna Airport|Savonlinna|FI|61.9431|28.9451
SVQ|세비야|Seville Airport|Seville|ES|37.4180|-5.8931
SVX|예카테린부르크|Koltsovo Airport|Yekaterinburg|RU|56.7431|60.8027
SVZ|San Antonio del Tachira|Juan Vicente Gómez International Airport|San Antonio del Tachira|VE|7.8408|-72.4399
SWA|산터우|Jieyang Chaoshan International Airport|Jieyang|CN|23.5520|116.5033
SWF|Newburgh|New York Stewart International Airport|Newburgh|US|41.5042|-74.1089
SWO|Stillwater|Stillwater Regional Airport|Stillwater|US|36.1621|-97.0856
SXB|스트라스부르|Strasbourg Airport|Strasbourg|FR|48.5383|7.6282
SXM|신트마르턴|Princess Juliana International Airport|Sint Maarten|SX|18.0410|-63.1089
SXR|스리나가르|Srinagar International Airport|Srinagar|IN|33.9871|74.7742
SYO|Shonai|Shonai Airport|Shonai|JP|38.8122|139.7870
SYQ|San Jose|Tobías Bolaños International Airport|San Jose|CR|9.9571|-84.1398
SYR|시러큐스|Syracuse Hancock International Airport|Syracuse|US|43.1112|-76.1063
SYS|Saskylakh|Saskylakh Airport|Saskylakh|RU|71.9279|114.0800
SYY|Stornoway|Stornoway Airport|Stornoway|GB|58.2156|-6.3311
SYZ|시라즈|Shiraz Shahid Dastghaib International Airport|Shiraz|IR|29.5392|52.5898
SZA|Soyo|Soyo Airport|Soyo|AO|-6.1411|12.3718
SZB|쿠알라룸푸르 수방|Sultan Abdul Aziz Shah International Airport|Subang|MY|3.1306|101.5490
SZF|Samsun|Samsun-Çarşamba Airport|Samsun|TR|41.2540|36.5675
SZG|잘츠부르크|Salzburg Airport|Salzburg|AT|47.7933|13.0043
SZH|Shuozhou|Shuozhou Zirun Airport|Shuozhou|CN|39.2732|112.6916
SZK|Skukuza|Skukuza Airport|Skukuza|ZA|-24.9609|31.5886
SZY|Szymany|Olsztyn-Mazury Airport|Szymany|PL|53.4819|20.9377
SZZ|Szczecin|Solidarity Szczecin–Goleniów Airport|Szczecin|PL|53.5847|14.9022
TAB|Scarborough|A.N.R. Robinson International Airport|Scarborough|TT|11.1496|-60.8313
TAC|Tacloban City|Daniel Z. Romualdez Airport|Tacloban City|PH|11.2278|125.0278
TAG|보홀|Bohol-Panglao International Airport|Panglao|PH|9.5730|123.7701
TAH|Tanna Island|Whitegrass Airport|Tanna Island|VU|-19.4551|169.2240
TAI|Taiz|Taiz International Airport|Taiz|YE|13.6860|44.1391
TAM|Ciudad Madero|General Francisco Javier Mina International Airport|Ciudad Madero|MX|22.2926|-97.8671
TAP|Tapachula|Tapachula International Airport|Tapachula|MX|14.7945|-92.3699
TAT|Poprad|Poprad-Tatry Airport|Poprad|SK|49.0710|20.2414
TAY|Tartu|Tartu Airport|Tartu|EE|58.3074|26.6865
TAZ|Daşoguz|Dashoguz International Airport|Daşoguz|TM|41.7599|59.8361
TBB|Tuy Hoa|Dong Tac Airport|Tuy Hoa|VN|13.0496|109.3340
TBH|Tablas Island|Tugdan Airport|Tablas Island|PH|12.3110|122.0850
TBI|Cat Island|New Bight Airport|Cat Island|BS|24.3153|-75.4523
TBJ|Tabarka|Tabarka-Aïn Draham International Airport|Tabarka|TN|36.9800|8.8769
TBN|Fort Leonard Wood|Waynesville-St. Robert Regional Airport-Forney Field|Fort Leonard Wood|US|37.7416|-92.1407
TBP|Tumbes|Captain Pedro Canga Rodríguez International Airport|Tumbes|PE|-3.5521|-80.3811
TBS|트빌리시|Tbilisi International Airport|Tbilisi|GE|41.6692|44.9547
TBT|Tabatinga|Tabatinga International Airport|Tabatinga|BR|-4.2557|-69.9358
TBU|누쿠알로파|Fua'amotu International Airport|Nuku'alofa|TO|-21.2414|-175.1492
TBZ|타브리즈|Tabriz International Airport|Tabriz|IR|38.1339|46.2350
TCA|Tennant Creek|Tennant Creek Airport|Tennant Creek|AU|-19.6344|134.1830
TCB|Treasure Cay|Treasure Cay Airport|Treasure Cay|BS|26.7453|-77.3913
TCO|Tumaco|La Florida Airport|Tumaco|CO|1.8144|-78.7492
TCP|Taba|Taba International Airport|Taba|EG|29.5945|34.7758
TCQ|Tacna|Coronel FAP Carlos Ciriani Santa Rosa International Airport|Tacna|PE|-18.0533|-70.2758
TCZ|Baoshan|Tengchong Tuofeng Airport|Baoshan|CN|24.9381|98.4858
TDD|Trinidad|Teniente Av. Jorge Henrich Arauz Airport|Trinidad|BO|-14.8187|-64.9180
TDK|Taldykorgan|Taldykorgan Airport|Taldykorgan|KZ|45.1225|78.4428
TDX|Laem Ngop|Trat Airport|Laem Ngop|TH|12.2746|102.3190
TEB|Teterboro|Teterboro Airport|Teterboro|US|40.8501|-74.0608
TEE|Tébessi|Cheikh Larbi Tébessi Airport|Tébessi|DZ|35.4316|8.1207
TEN|Tongren|Tongren Fenghuang Airport|Tongren|CN|27.8833|109.3089
TEQ|Çorlu|Tekirdağ Çorlu Airport|Çorlu|TR|41.1382|27.9191
TER|Praia da Vitória|Lajes Airport|Praia da Vitória|PT|38.7618|-27.0908
TET|Tete|Tete Airport|Tete|MZ|-16.1048|33.6402
TEX|Telluride|Telluride Regional Airport|Telluride|US|37.9538|-107.9080
TEZ|Tezpur Airport|Tezpur Airport|Tezpur Airport|IN|26.7091|92.7847
TFF|Tefé|Tefé Airport|Tefé|BR|-3.3829|-64.7241
TFN|테네리페 북|Tenerife Norte-Ciudad de La Laguna Airport|Tenerife|ES|28.4828|-16.3417
TFS|테네리페|Tenerife Sur Airport|Tenerife|ES|28.0445|-16.5725
TGD|포드고리차|Podgorica Airport / Podgorica Golubovci Airbase|Podgorica|ME|42.3594|19.2519
TGG|Kuala Terengganu|Sultan Mahmud Airport|Kuala Terengganu|MY|5.3826|103.1030
TGJ|Tiga|Tiga Airport|Tiga|NC|-21.0964|167.8038
TGM|Recea|Târgu Mureş Transilvania International Airport|Recea|RO|46.4677|24.4125
TGO|Tongliao|Tongliao Airport|Tongliao|CN|43.5567|122.2000
TGR|Touggourt|Touggourt Sidi Madhi Airport|Touggourt|DZ|33.0678|6.0887
TGT|Tanga|Tanga Airport|Tanga|TZ|-5.0924|39.0712
TGU|Tegucigalpa|Toncontín Airport|Tegucigalpa|HN|14.0609|-87.2172
TGZ|Tuxtla Gutiérrez|Angel Albino Corzo International Airport|Tuxtla Gutiérrez|MX|16.5616|-93.0257
THE|Teresina|Senador Petrônio Portela Airport|Teresina|BR|-5.0602|-42.8237
THG|Biloela|Thangool Airport|Biloela|AU|-24.4949|150.5780
THL|Tachileik|Tachileik Airport|Tachileik|MM|20.4838|99.9354
THN|Trollhättan|Trollhättan-Vänersborg Airport|Trollhättan|SE|58.3181|12.3450
THQ|Tianshui|Tianshui Maijishan Airport|Tianshui|CN|34.5601|105.8603
THR|테헤란 메흐라바드|Mehrabad International Airport|Tehran|IR|35.6892|51.3144
THS|Sukhothai Airport|Sukhothai Airport|Sukhothai Airport|TH|17.2380|99.8182
TIA|티라나|Tirana International Airport Mother Teresa|Rinas|AL|41.4147|19.7206
TIF|타이프|Taif International Airport|Taif|SA|21.4847|40.5441
TIH|Tuherahera|Tikehau Airport|Tuherahera|PF|-15.1196|-148.2310
TIJ|티후아나|General Abelardo L. Rodriguez International Airport|Tijuana|MX|32.5410|-116.9700
TIM|Timika|Mozes Kilangin Airport|Timika|ID|-4.5298|136.8874
TIN|Tindouf|Tindouf Airport|Tindouf|DZ|27.7004|-8.1671
TIQ|Tinian Island|Francisco Manglona Borja / Tinian International Airport|Tinian Island|MP|14.9992|145.6194
TIR|Tirupati|Tirupati International Airport|Tirupati|IN|13.6320|79.5399
TIU|Timaru Airport|Timaru Airport|Timaru Airport|NZ|-44.3028|171.2250
TIV|Tivat|Tivat Airport|Tivat|ME|42.4047|18.7233
TIW|Tacoma|Tacoma Narrows Airport|Tacoma|US|47.2674|-122.5773
TJA|Tarija|Capitan Oriel Lea Plaza Airport|Tarija|BO|-21.5557|-64.7013
TJG|Tanta-Tabalong|Warukin Airport|Tanta-Tabalong|ID|-2.2166|115.4360
TJH|Toyooka|Konotori Tajima Airport|Toyooka|JP|35.5128|134.7870
TJK|Tokat|Tokat Airport|Tokat|TR|40.3247|36.3906
TJM|Tyumen|Roshchino International Airport|Tyumen|RU|57.1790|65.3277
TJU|Kulob|Kulob International Airport|Kulob|TJ|37.9881|69.8050
TKD|Sekondi-Takoradi|Takoradi Airport|Sekondi-Takoradi|GH|4.8961|-1.7748
TKF|Truckee|Truckee Tahoe Airport|Truckee|US|39.3186|-120.1406
TKG|Bandar Lampung|Radin Inten II International Airport|Bandar Lampung|ID|-5.2468|105.1825
TKK|Weno Island|Chuuk International Airport|Weno Island|FM|7.4619|151.8430
TKN|Amagi|Tokunoshima Airport|Amagi|JP|27.8364|128.8814
TKP|Takapoto Airport|Takapoto Airport|Takapoto Airport|PF|-14.7095|-145.2460
TKS|도쿠시마|Tokushima Awaodori Airport / JMSDF Tokushima Air Base|Tokushima|JP|34.1326|134.6078
TKU|투르쿠|Turku Airport|Turku|FI|60.5141|22.2628
TKX|Takaroa Airport|Takaroa Airport|Takaroa Airport|PF|-14.4558|-145.0250
TLC|Toluca|Adolfo López Mateos International Airport|Toluca|MX|19.3369|-99.5658
TLE|Toliara|Toliara Airport|Toliara|MG|-23.3834|43.7285
TLH|Tallahassee|Tallahassee International Airport|Tallahassee|US|30.4012|-84.3543
TLL|탈린|Lennart Meri Tallinn Airport|Tallinn|EE|59.4132|24.8326
TLM|Zenata|Zenata – Messali El Hadj Airport|Zenata|DZ|35.0127|-1.4571
TLN|Hyères|Toulon-Hyères Airport|Hyères|FR|43.0973|6.1460
TLQ|Turpan|Turpan Jiaohe Airport|Turpan|CN|43.0308|89.0987
TLS|툴루즈|Toulouse-Blagnac Airport|Toulouse|FR|43.6291|1.3638
TME|Tame|Gustavo Vargas Airport|Tame|CO|6.4511|-71.7603
TMH|Tanah Merah|Tanah Merah Airport|Tanah Merah|ID|-6.0967|140.3035
TMJ|Termez|Termez Airport|Termez|UZ|37.2873|67.3119
TML|Tamale|Yakubu Tali International Airport|Tamale|GH|9.5539|-0.8661
TMM|Toamasina|Toamasina Ambalamanasy Airport|Toamasina|MG|-18.1135|49.3923
TMP|탐페레|Tampere-Pirkkala Airport|Tampere|FI|61.4141|23.6044
TMR|Tamanrasset|Aguenar – Hadj Bey Akhamok Airport|Tamanrasset|DZ|22.8110|5.4508
TMS|São Tomé|São Tomé International Airport|São Tomé|ST|0.3782|6.7122
TMT|Oriximiná|Trombetas Airport|Oriximiná|BR|-1.4896|-56.3968
TMW|Tamworth|Tamworth Airport|Tamworth|AU|-31.0779|150.8455
TMX|Timimoun|Timimoun Airport|Timimoun|DZ|29.2371|0.2760
TND|Trinidad|Alberto Delgado Airport|Trinidad|CU|21.7883|-79.9972
TNE|Tanegashima|New Tanegashima Airport|Tanegashima|JP|30.6051|130.9910
TNG|탕헤르|Tangier Ibn Battuta Airport|Tangier|MA|35.7317|-5.9215
TNH|Tonghua|Tonghua Sanyuanpu Airport|Tonghua|CN|42.0484|125.7340
TNJ|Tanjung Pinang-Bintan Island|Raja Haji Fisabilillah International Airport|Tanjung Pinang-Bintan Island|ID|0.9240|104.5334
TNN|타이난|Tainan International Airport / Tainan Air Base|Tainan|TW|22.9504|120.2060
TNR|안타나나리보|Ivato International Airport|Antananarivo|MG|-18.7969|47.4788
TOD|Tioman Island|Tioman Airport|Tioman Island|MY|2.8182|104.1600
TOE|Tozeur|Tozeur Nefta International Airport|Tozeur|TN|33.9397|8.1106
TOF|Tomsk|Tomsk Kamov Airport|Tomsk|RU|56.3803|85.2083
TOL|Toledo|Eugene F. Kranz Toledo Express Airport|Toledo|US|41.5868|-83.8078
TOM|Timbuktu|Tombouktou Airport|Timbuktu|ML|16.7305|-3.0076
TOS|트롬쇠|Tromsø Airport|Tromsø|NO|69.6833|18.9189
TOU|Touho|Touho Airport|Touho|NC|-20.7901|165.2595
TOY|Toyama|Toyama Kitokito Airport|Toyama|JP|36.6484|137.1874
TPJ|Taplejung|Taplejung Airport|Taplejung|NP|27.3509|87.6953
TPP|Tarapoto|Cadete FAP Guillermo Del Castillo Paredes Airport|Tarapoto|PE|-6.5087|-76.3732
TPQ|Tepic|Amado Nervo National Airport|Tepic|MX|21.4198|-104.8425
TPS|Trapani|Vincenzo Florio Airport Trapani-Birgi|Trapani|IT|37.9114|12.4880
TQO|툴룸|Felipe Carrillo Puerto International Airport Tulum|Tulum|MX|20.1721|-87.6603
TRA|Tarama|Tarama Airport|Tarama|JP|24.6538|124.6755
TRC|Torreón|Francisco Sarabia Tinoco International Airport|Torreón|MX|25.5623|-103.4046
TRD|트론헤임|Trondheim Airport, Værnes|Trondheim|NO|63.4578|10.9240
TRE|Balemartine|Tiree Airport|Balemartine|GB|56.4992|-6.8692
TRF|Sandefjord|Sandefjord Airport, Torp|Sandefjord|NO|59.1867|10.2586
TRG|Tauranga|Tauranga Airport|Tauranga|NZ|-37.6719|176.1960
TRI|Blountville|Tri-Cities Regional TN/VA Airport|Blountville|US|36.4752|-82.4074
TRK|Tarakan|Juwata International Airport / Suharnoko Harbani AFB|Tarakan|ID|3.3251|117.5642
TRN|토리노|Turin Airport|Caselle Torinese|IT|45.2008|7.6496
TRR|Trincomalee|China Bay Airport|Trincomalee|LK|8.5392|81.1813
TRS|Ronchi dei Legionari|Trieste Airport|Ronchi dei Legionari|IT|45.8279|13.4667
TRT|Toraja|Toraja Airport|Toraja|ID|-3.1844|119.9191
TRU|Trujillo|Capitán FAP Carlos Martínez de Pinillos International Airport|Trujillo|PE|-8.0824|-79.1088
TRV|티루바난타푸람|Thiruvananthapuram International Airport|Thiruvananthapuram|IN|8.4819|76.9200
TRW|South Tarawa|Bonriki International Airport|South Tarawa|KI|1.3816|173.1470
TRZ|Tiruchirappalli|Tiruchirappalli International Airport|Tiruchirappalli|IN|10.7629|78.7177
TSF|베네치아 트레비소|Treviso Airport|Treviso|IT|45.6484|12.1944
TSJ|Tsushima|Tsushima Airport|Tsushima|JP|34.2849|129.3310
TSM|Taos|Taos Regional Airport|Taos|US|36.4525|-105.6775
TSR|티미쇼아라|Timișoara Traian Vuia International Airport|Timişoara|RO|45.8099|21.3379
TST|Trang|Trang Airport|Trang|TH|7.5087|99.6166
TSV|Townsville|Townsville Airport / RAAF Base Townsville|Townsville|AU|-19.2529|146.7665
TTA|Tan Tan|Tan Tan Airport|Tan Tan|MA|28.4476|-11.1617
TTE|Ternate|Sultan Babullah Airport|Ternate|ID|0.8310|127.3816
TTJ|Tottori|Tottori Sand Dunes Conan Airport|Tottori|JP|35.5301|134.1650
TTN|Ewing Township|Trenton Mercer Airport|Ewing Township|US|40.2767|-74.8135
TTT|Taitung City|Taitung Airport|Taitung City|TW|22.7549|121.1018
TTU|Tétouan|Sania Ramel Airport|Tétouan|MA|35.5943|-5.3200
TUA|Tulcán|Lieutenant Colonel Luis A. Mantilla International Airport|Tulcán|EC|0.8095|-77.7081
TUB|Tubuai Airport|Tubuai Airport|Tubuai Airport|PF|-23.3654|-149.5240
TUC|San Miguel de Tucumán|Teniente Benjamín Matienzo International Airport|San Miguel de Tucumán|AR|-26.8374|-65.1042
TUF|Tours|Tours Val de Loire Airport|Tours|FR|47.4322|0.7276
TUG|Tuguegarao City|Tuguegarao Airport|Tuguegarao City|PH|17.6434|121.7332
TUI|Turaif|Turaif Domestic Airport|Turaif|SA|31.6922|38.7315
TUK|Turbat|Turbat International Airport|Turbat|PK|25.9848|63.0289
TUL|털사|Tulsa International Airport|Tulsa|US|36.1971|-95.8862
TUN|튀니스|Tunis Carthage International Airport|Tunis|TN|36.8510|10.2272
TUO|Taupo|Taupo Airport|Taupo|NZ|-38.7397|176.0840
TUP|Tupelo|Tupelo Regional Airport|Tupelo|US|34.2681|-88.7699
TUR|Tucuruí|Tucuruí Airport|Tucuruí|BR|-3.7860|-49.7203
TUS|투손|Tucson International Airport|Tucson|US|32.1150|-110.9381
TUU|타북|Prince Sultan bin Abdulaziz International Airport|Tabuk|SA|28.3711|36.6249
TVC|Traverse City|Cherry Capital Airport|Traverse City|US|44.7414|-85.5822
TVF|Thief River Falls|Thief River Falls Regional Airport|Thief River Falls|US|48.0657|-96.1850
TVT|Tashkent|Tashkent-Khumo International Airport|Tashkent|UZ|41.3129|69.3955
TVY|Dawei|Dawei Airport|Dawei|MM|14.1039|98.2036
TWF|Twin Falls|Joslin Field Magic Valley Regional Airport|Twin Falls|US|42.4818|-114.4880
TWT|Bongao|Sanga Sanga Airport|Bongao|PH|5.0482|119.7433
TWU|Tawau|Tawau Airport|Tawau|MY|4.3134|118.1215
TXE|Takengon|Rembele Airport|Takengon|ID|4.7211|96.8519
TXK|Texarkana|Texarkana Regional Airport (Webb Field)|Texarkana|US|33.4537|-93.9910
TYF|Torsby|Torsby Airport|Torsby|SE|60.1576|12.9913
TYL|Talara|Captain Victor Montes Arias International Airport|Talara|PE|-4.5766|-81.2541
TYN|타이위안|Taiyuan Wusu International Airport|Taiyuan|CN|37.7469|112.6280
TYR|Tyler|Tyler Pounds Regional Airport|Tyler|US|32.3541|-95.4024
TYS|녹스빌|McGhee Tyson Airport|Knoxville|US|35.8110|-83.9940
TZA|Belize City|Sir Barry Bowen Municipal Airport|Belize City|BZ|17.5172|-88.1958
TZL|Dubrave Gornje|Tuzla International Airport|Dubrave Gornje|BA|44.4599|18.7236
TZN|Andros|Congo Town Airport|Andros|BS|24.1587|-77.5898
TZX|트라브존|Trabzon International Airport|Trabzon|TR|40.9951|39.7897
UAI|Suai|Commander in Chief of FALINTIL, Kay Rala Xanana Gusmão, International Airport|Suai|TL|-9.3019|125.2863
UAQ|San Juan|Domingo Faustino Sarmiento Airport|San Juan|AR|-31.5715|-68.4182
UAR|Bouarfa|Bouarfa Airport|Bouarfa|MA|32.5143|-1.9831
UBA|Uberaba|Mário de Almeida Franco Airport|Uberaba|BR|-19.7650|-47.9648
UBJ|Ube|Yamaguchi Ube Airport|Ube|JP|33.9300|131.2790
UBP|Ubon Ratchathani|Ubon Ratchathani Airport|Ubon Ratchathani|TH|15.2513|104.8700
UCB|Ulanqab|Ulanqab Jining Airport|Ulanqab|CN|41.1303|113.1073
UCT|Ukhta|Ukhta Airport|Ukhta|RU|63.5669|53.8047
UDI|Uberlândia|Ten. Cel. Aviador César Bombonato Airport|Uberlândia|BR|-18.8836|-48.2259
UDR|Udaipur|Maharana Pratap Airport|Udaipur|IN|24.6177|73.8961
UEL|Quelimane|Quelimane Airport|Quelimane|MZ|-17.8555|36.8691
UEO|Kumejima|Kumejima Airport|Kumejima|JP|26.3634|126.7138
UET|Quetta|Quetta International Airport|Quetta|PK|30.2514|66.9378
UFA|우파|Ufa International Airport|Ufa|RU|54.5575|55.8744
UGA|Bulgan|Bulgan Airport|Bulgan|MN|48.8550|103.4760
UGC|우르겐치|Urgench International Airport|Urgench|UZ|41.5827|60.6434
UGU|Bilogai|Bilorai Airport|Bilogai|ID|-3.7395|137.0312
UIB|Quibdó|El Caraño Airport|Quibdó|CO|5.6908|-76.6412
UIH|Quy Nohn|Phu Cat Airport|Quy Nohn|VN|13.9550|109.0420
UIN|Quincy|Quincy Regional Airport Baldwin Field|Quincy|US|39.9427|-91.1946
UIO|키토|Mariscal Sucre International Airport|Quito|EC|-0.1254|-78.3543
UKE|Bhawanipatna|Utkela Airport|Bhawanipatna|IN|20.0978|83.1833
UKK|우스티카메노고르스크|Oskemen International Airport|Ust-Kamenogorsk|KZ|50.0350|82.4961
UKX|Ust-Kut|Ust-Kut Airport|Ust-Kut|RU|56.8567|105.7300
ULG|Ölgii|Ölgii Mongolei International Airport|Ölgii|MN|48.9933|89.9225
ULH|알울라|Al-Ula International Airport|Al-Ula|SA|26.4836|38.1170
ULK|Lensk|Lensk Airport|Lensk|RU|60.7236|114.8253
ULO|Ulaangom|Ulaangom Airport|Ulaangom|MN|50.0666|91.9383
ULP|Quilpie Airport|Quilpie Airport|Quilpie Airport|AU|-26.6092|144.2537
ULU|Gulu|Gulu Airport|Gulu|UG|2.8056|32.2718
ULV|Ulyanovsk|Ulyanovsk Baratayevka Airport|Ulyanovsk|RU|54.2702|48.2256
ULY|Cherdakly|Ulyanovsk Vostochny Airport|Cherdakly|RU|54.4010|48.8027
UME|Umeå|Umeå Airport|Umeå|SE|63.7918|20.2828
UNI|Union Island|Union Island International Airport|Union Island|VC|12.6001|-61.4119
UNK|Unalakleet|Unalakleet Airport|Unalakleet|US|63.8884|-160.7990
UNN|Ranong|Ranong Airport|Ranong|TH|9.7776|98.5855
UPG|마카사르|Sultan Hasanuddin International Airport|Makassar|ID|-5.0755|119.5537
UPN|Uruapan|Uruapan - Licenciado y General Ignacio Lopez Rayon International Airport|Uruapan|MX|19.3967|-102.0390
URA|Uralsk|Manshuk Mametova International Airport|Uralsk|KZ|51.1520|51.5437
URE|Kuressaare|Kuressaare Airport|Kuressaare|EE|58.2299|22.5095
URG|Uruguaiana|Rubem Berta Airport|Uruguaiana|BR|-29.7822|-57.0382
URJ|Uray|Uray Airport|Uray|RU|60.1033|64.8267
URT|Surat Thani|Surat Thani Airport|Surat Thani|TH|9.1326|99.1356
URY|Gurayat|Gurayat Domestic Airport|Gurayat|SA|31.4124|37.2789
USA|Concord|Concord-Padgett Regional Airport|Concord|US|35.3878|-80.7091
USH|Ushuaia|Ushuaia - Malvinas Argentinas International Airport|Ushuaia|AR|-54.8433|-68.2958
USK|Usinsk|Usinsk Airport|Usinsk|RU|66.0047|57.3672
USM|코사무이|Samui International Airport|Na Thon|TH|9.5478|100.0620
USR|Ust-Nera|Ust-Nera Airport|Ust-Nera|RU|64.5500|143.1150
UST|St Augustine|Northeast Florida Regional Airport|St Augustine|US|29.9592|-81.3398
USU|Coron|Francisco B. Reyes (Busuanga) Airport|Coron|PH|12.1219|120.1008
UTH|우돈타니|Udon Thani International Airport|Udon Thani|TH|17.3862|102.7886
UTN|Upington|Upington Airport|Upington|ZA|-28.4002|21.2636
UTO|Utopia Creek|Indian Mountain LRRS Airport|Utopia Creek|US|65.9928|-153.7040
UTP|파타야|U-Tapao–Rayong–Pattaya International Airport|Rayong|TH|12.6799|101.0050
UTT|Mthatha|K. D. Matanzima Airport|Mthatha|ZA|-31.5464|28.6734
UUA|Bugulma|Bugulma Airport|Bugulma|RU|54.6412|52.8002
UUD|Ulan Ude|Baikal International Airport|Ulan Ude|RU|51.8086|107.4397
UUS|유즈노사할린스크|Yuzhno-Sakhalinsk International Airport|Yuzhno-Sakhalinsk|RU|46.8855|142.7175
UVE|Ouvéa|Ouvéa Airport|Ouvéa|NC|-20.6409|166.5730
UVF|Vieux Fort|Hewanorra International Airport|Vieux Fort|LC|13.7332|-60.9526
UYL|Nyala|Nyala Airport|Nyala|SD|12.0535|24.9562
UYN|Yulin|Yulin Yuyang Airport|Yulin|CN|38.3597|109.5909
UYU|Quijarro|Joya Andina International Airport|Quijarro|BO|-20.4413|-66.8576
VAA|Vaasa|Vaasa Airport|Vaasa|FI|63.0502|21.7625
VAI|Vanimo|Vanimo Airport|Vanimo|PG|-2.6926|141.3028
VAM|Maamigili|Villa International Airport Maamigili|Maamigili|MV|3.4718|72.8326
VAN|Van|Van Ferit Melen Airport|Van|TR|38.4682|43.3323
VAQ|Vanavara|Vanavara Airport|Vanavara|RU|60.3562|102.3096
VAR|바르나|Varna Airport|Varna|BG|43.2321|27.8251
VAS|Sivas|Sivas Nuri Demirağ Airport|Sivas|TR|39.8138|36.9035
VAV|Vava'u Island|Vava'u International Airport|Vava'u Island|TO|-18.5853|-173.9620
VAW|Vardø|Vardø Airport, Svartnes|Vardø|NO|70.3554|31.0449
VBS|Montichiari|Brescia Gabriele d'Annunzio Airport|Montichiari|IT|45.4289|10.3306
VBY|Visby|Visby Airport|Visby|SE|57.6628|18.3462
VCA|껀터|Can Tho International Airport|Can Tho|VN|10.0834|105.7094
VCP|캄피나스|Viracopos International Airport|Campinas|BR|-23.0074|-47.1345
VCS|Con Dao|Con Dao Airport|Con Dao|VN|8.7318|106.6330
VCT|Victoria|Victoria Regional Airport|Victoria|US|28.8526|-96.9185
VDC|Vitória da Conquista|Glauber de Andrade Rocha Airport|Vitória da Conquista|BR|-14.9079|-40.9148
VDE|El Hierro Island|El Hierro Airport|El Hierro Island|ES|27.8148|-17.8871
VDH|Dong Hoi|Dong Hoi Airport|Dong Hoi|VN|17.5150|106.5906
VDM|Viedma|Gobernador Castello Airport|Viedma|AR|-40.8692|-63.0004
VDO|Van Don|Van Don International Airport|Van Don|VN|21.1207|107.4154
VDS|Vadsø|Vadsø Airport|Vadsø|NO|70.0653|29.8447
VDZ|Valdez|Valdez Pioneer Field|Valdez|US|61.1327|-146.2466
VEL|Vernal|Vernal Regional Airport|Vernal|US|40.4362|-109.5117
VEO|Severo-Yeniseysk|Severo-Yeniseysk Airport|Severo-Yeniseysk|RU|60.3733|93.0117
VER|Veracruz|General Heriberto Jara International Airport|Veracruz|MX|19.1396|-96.1886
VFA|빅토리아폴스|Victoria Falls International Airport|Victoria Falls|ZW|-18.0974|25.8369
VGA|Vijayawada|Vijayawada International Airport|Vijayawada|IN|16.5300|80.8049
VGO|Vigo|Vigo Airport|Vigo|ES|42.2318|-8.6268
VHM|Vilhelmina|Vilhelmina South Lapland Airport|Vilhelmina|SE|64.5791|16.8336
VIG|El Vigía|Juan Pablo Pérez Alfonso Airport|El Vigía|VE|8.6241|-71.6727
VII|Vinh|Vinh Airport|Vinh|VN|18.7376|105.6710
VIJ|Spanish Town|Virgin Gorda Airport|Spanish Town|VG|18.4466|-64.4279
VIL|Dakhla|Dakhla Airport|Dakhla|EH|23.7183|-15.9320
VIT|Alava|Vitoria Airport|Alava|ES|42.8828|-2.7245
VIX|Vitória|Eurico de Aguiar Salles International Airport|Vitória|BR|-20.2580|-40.2850
VKG|Rach Gia|Rach Gia Airport|Rach Gia|VN|9.9580|105.1324
VKO|모스크바 브누코보|Vnukovo International Airport|Moscow|RU|55.5915|37.2615
VKT|Vorkuta|Vorkuta Airport|Vorkuta|RU|67.4886|63.9931
VLC|발렌시아|Valencia Airport|Valencia|ES|39.4892|-0.4810
VLD|Valdosta|Valdosta Regional Airport|Valdosta|US|30.7825|-83.2767
VLI|포트빌라|Bauerfield International Airport|Port Vila|VU|-17.6993|168.3200
VLL|Valladolid|Valladolid Airport|Valladolid|ES|41.7061|-4.8519
VLN|Valencia|Arturo Michelena International Airport|Valencia|VE|10.1497|-67.9284
VLV|Valera|Dr. Antonio Nicolás Briceño Airport|Valera|VE|9.3405|-70.5841
VMU|Baimuru|Baimuru Airport|Baimuru|PG|-7.4970|144.8218
VNO|빌뉴스|Vilnius International Airport|Vilnius|LT|54.6341|25.2858
VNS|바라나시|Lal Bahadur Shastri International Airport|Varanasi|IN|25.4522|82.8625
VNX|Vilanculo|Vilankulo Airport|Vilanculo|MZ|-22.0184|35.3133
VOG|Volgograd|Volgograd International Airport|Volgograd|RU|48.7813|44.3392
VOL|Nea Anchialos|Nea Anchialos National Airport|Nea Anchialos|GR|39.2196|22.7943
VOZ|Voronezh|Voronezh International Airport|Voronezh|RU|51.8143|39.2309
VPE|Ngiva|Ngjiva Pereira Airport|Ngiva|AO|-17.0435|15.6838
VPN|Vopnafjörður|Vopnafjörður Airport|Vopnafjörður|IS|65.7206|-14.8506
VPS|Valparaiso|Destin-Fort Walton Beach Airport|Valparaiso|US|30.4813|-86.5158
VPY|Chimoio|Chimoio Airport|Chimoio|MZ|-19.1513|33.4290
VQS|Vieques|Antonio Rivera Rodriguez Airport|Vieques|PR|18.1348|-65.4936
VRA|Matanzas|Juan Gualberto Gomez International Airport|Matanzas|CU|23.0344|-81.4353
VRB|Vero Beach|Vero Beach Regional Airport|Vero Beach|US|27.6556|-80.4179
VRC|Virac|Virac Airport|Virac|PH|13.5764|124.2060
VRL|Vila Real|Vila Real Airport|Vila Real|PT|41.2743|-7.7205
VRN|베로나|Verona Villafranca Valerio Catullo Airport|Caselle|IT|45.3950|10.8873
VSA|Villahermosa|Carlos Rovirosa Pérez International Airport|Villahermosa|MX|17.9943|-92.8182
VSE|Viseu|Aerodromo Goncalves Lobato (Viseu Airport)|Viseu|PT|40.7255|-7.8890
VST|Stockholm|Stockholm Västerås Airport|Stockholm|SE|59.5894|16.6336
VTU|Las Tunas|Hermanos Ameijeiras Airport|Las Tunas|CU|20.9876|-76.9358
VTZ|Visakhapatnam|Alluri Sitarama Raju International Airport (Vizag)|Visakhapatnam|IN|17.9715|83.5036
VUP|Valledupar|Alfonso López Pumarejo Airport|Valledupar|CO|10.4350|-73.2495
VUS|Velikiy Ustyug|Velikiy Ustyug Airport|Velikiy Ustyug|RU|60.7883|46.2600
VVC|Villavicencio|Vanguardia Airport|Villavicencio|CO|4.1679|-73.6138
VVI|Santa Cruz|Viru Viru International Airport|Santa Cruz|BO|-17.6448|-63.1354
VVZ|Illizi|Illizi Takhamalt Airport|Illizi|DZ|26.7235|8.6227
VXC|Lichinga|Lichinga Airport|Lichinga|MZ|-13.2740|35.2663
VXE|São Pedro|Cesaria Evora International Airport|São Pedro|CV|16.8334|-25.0553
VXO|Växjö|Växjö Kronoberg Airport|Växjö|SE|56.9291|14.7280
VYI|Vilyuisk|Vilyuisk Airport|Vilyuisk|RU|63.7567|121.6933
WAE|Wadi Al Dawasir|Wadi Al Dawasir Domestic Airport|Wadi Al Dawasir|SA|20.5043|45.1996
WAG|Wanganui|Wanganui Airport|Wanganui|NZ|-39.9635|175.0244
WBM|Wapenamanda|Wapenamanda Airport|Wapenamanda|PG|-5.6353|143.8922
WDH|빈트후크|Hosea Kutako International Airport|Windhoek|NA|-22.4799|17.4709
WDS|Shiyan|Shiyan Wudangshan Airport|Shiyan|CN|32.5929|110.9063
WEF|Weifang|Weifang Nanyuan Airport|Weifang|CN|36.6467|119.1190
WEI|Weipa|Weipa Airport|Weipa|AU|-12.6775|141.9226
WGA|Forest Hill|Wagga Wagga Airport|Forest Hill|AU|-35.1635|147.4683
WGE|Walgett Airport|Walgett Airport|Walgett Airport|AU|-30.0328|148.1260
WGN|Shaoyang|Shaoyang Wugang Airport|Shaoyang|CN|26.8061|110.6410
WHA|Wuhu|Wuhu Xuanzhou Airport|Wuhu|CN|31.1045|118.6669
WHK|Whakatāne|Whakatāne Airport|Whakatāne|NZ|-37.9222|176.9170
WIC|Wick|Wick John O'Groats Airport|Wick|GB|58.4589|-3.0931
WIL|Nairobi|Nairobi Wilson Airport|Nairobi|KE|-1.3217|36.8148
WIN|Winton Airport|Winton Airport|Winton Airport|AU|-22.3636|143.0860
WJR|Wajir|Wajir Airport|Wajir|KE|1.7332|40.0916
WKA|Wanaka|Wanaka Airport|Wanaka|NZ|-44.7221|169.2463
WKJ|Wakkanai|Wakkanai Airport|Wakkanai|JP|45.4042|141.8010
WKK|Aleknagik|Aleknagik / New Airport|Aleknagik|US|59.2826|-158.6180
WLG|웰링턴|Wellington International Airport|Wellington|NZ|-41.3268|174.8069
WLS|Wallis Island|Hihifo Airport|Wallis Island|WF|-13.2394|-176.1986
WMI|Nowy Dwór Mazowiecki|Warsaw Modlin Airport|Nowy Dwór Mazowiecki|PL|52.4511|20.6518
WMN|Maroantsetra|Maroantsetra Airport|Maroantsetra|MG|-15.4377|49.6891
WMT|Zunyi|Zunyi Maotai Airport|Zunyi|CN|27.9618|106.4354
WMX|Wamena|Wamena Airport|Wamena|ID|-4.0973|138.9524
WNI|Wangi-wangi Island|Matahora Airport|Wangi-wangi Island|ID|-5.2921|123.6362
WNP|Naga|Naga Airport|Naga|PH|13.5849|123.2700
WNR|Windorah|Windorah Airport|Windorah|AU|-25.4106|142.6684
WNS|Nawabashah|Shaheed Benazirabad Airport|Nawabashah|PK|26.2194|68.3901
WNZ|원저우|Wenzhou Longwan International Airport|Wenzhou|CN|27.9106|120.8535
WOS|Wonsan|Wonsan Kalma Airport|Wonsan|KP|39.1652|127.4879
WRE|Whangarei|Whangarei Airport|Whangarei|NZ|-35.7693|174.3637
WRG|Wrangell|Wrangell Airport|Wrangell|US|56.4843|-132.3700
WRO|브로츠와프|Copernicus Wrocław Airport|Wrocław|PL|51.1037|16.8821
WSI|시드니 웨스턴|Western Sydney International (Nancy-Bird Walton) Airport|Sydney|AU|-33.8835|150.7130
WST|Westerly|Westerly State Airport|Westerly|US|41.3496|-71.8034
WSZ|Westport|Westport Airport|Westport|NZ|-41.7371|171.5790
WTB|Toowoomba|Toowoomba Wellcamp Airport|Toowoomba|AU|-27.5583|151.7933
WUA|Wuhai|Wuhai Airport|Wuhai|CN|39.7934|106.7993
WUN|Wiluna Airport|Wiluna Airport|Wiluna Airport|AU|-26.6327|120.2219
WUS|Wuyishan|Nanping Wuyishan Airport|Wuyishan|CN|27.7019|118.0010
WUU|Wau|Wau Airport|Wau|SS|7.7258|27.9750
WUX|우시|Sunan Shuofang International Airport|Wuxi|CN|31.4970|120.4304
WUZ|Tangbu|Wuzhou Xijiang Airport|Tangbu|CN|23.4032|111.0933
WVB|Walvis Bay|Walvis Bay International Airport|Walvis Bay|NA|-22.9793|14.6471
WWK|Wewak|Wewak International Airport|Wewak|PG|-3.5838|143.6690
WYA|Whyalla|Whyalla Airport|Whyalla|AU|-33.0589|137.5140
WYS|West Yellowstone|Yellowstone Airport|West Yellowstone|US|44.6884|-111.1180
XAI|Xinyang|Xinyang Minggang Airport|Xinyang|CN|32.5408|114.0791
XAP|Chapecó|Serafin Enoss Bertaso Airport|Chapecó|BR|-27.1342|-52.6566
XBJ|Birjand|Birjand International Airport|Birjand|IR|32.8965|59.2813
XCH|Flying Fish Cove|Christmas Island International Airport|Flying Fish Cove|CX|-10.4504|105.6911
XCR|Chalons en Champagne|Chalons Vatry airport|Chalons en Champagne|FR|48.7733|4.2061
XFN|Xiangyang|Xiangyang Liuji Airport|Xiangyang|CN|32.1522|112.2917
XIC|Liangshan|Xichang Qingshan Airport|Liangshan|CN|27.9891|102.1840
XIL|Xilinhot|Xilinhot Airport|Xilinhot|CN|43.9156|115.9640
XKS|Kasabonika|Kasabonika Airport|Kasabonika|CA|53.5247|-88.6428
XMH|Manihi Airport|Manihi Airport|Manihi Airport|PF|-14.4354|-146.0684
XMS|Macas|Coronel E Carvajal Airport|Macas|EC|-2.2992|-78.1208
XNA|Fayetteville|Northwest Arkansas National Airport|Fayetteville|US|36.2819|-94.3068
XNN|Haidong|Xining Caojiabao International Airport|Haidong|CN|36.5277|102.0402
XPL|Palmerola|Palmerola International Airport|Palmerola|HN|14.3824|-87.6212
XQP|Quepos|Quepos Managua Airport|Quepos|CR|9.4432|-84.1298
XQU|Qualicum Beach|Qualicum Beach Airport|Qualicum Beach|CA|49.3375|-124.3931
XRY|Jerez de la Frontera|Jerez Airport|Jerez de la Frontera|ES|36.7446|-6.0601
XSC|South Caicos|South Caicos Airport|South Caicos|TC|21.5157|-71.5285
XSP|Seletar|Seletar Airport|Seletar|SG|1.4156|103.8667
XTG|Thargomindah|Thargomindah Airport|Thargomindah|AU|-27.9864|143.8121
XUZ|Xuzhou|Xuzhou Guanyin International Airport|Xuzhou|CN|34.0591|117.5553
XWA|Williston|Williston Basin International Airport|Williston|US|48.2609|-103.7512
YAA|Anahim Lake|Anahim Lake Airport|Anahim Lake|CA|52.4515|-125.3038
YAG|Fort Frances|Fort Frances Municipal Airport|Fort Frances|CA|48.6557|-93.4435
YAK|Yakutat|Yakutat Airport|Yakutat|US|59.5087|-139.6604
YAM|Sault Ste Marie|Sault Ste Marie Airport|Sault Ste Marie|CA|46.4832|-84.5085
YAP|Yap Island|Yap International Airport|Yap Island|FM|9.4989|138.0830
YAY|St. Anthony|St. Anthony Airport|St. Anthony|CA|51.3919|-56.0832
YAZ|Tofino|Tofino / Long Beach Airport|Tofino|CA|49.0798|-125.7756
YBC|Baie-Comeau|Baie-Comeau Airport|Baie-Comeau|CA|49.1325|-68.2044
YBG|Saguenay|Saguenay-Bagotville Airport|Saguenay|CA|48.3301|-70.9920
YBK|Baker Lake|Baker Lake Airport|Baker Lake|CA|64.2989|-96.0778
YBL|Campbell River|Campbell River Airport|Campbell River|CA|49.9508|-125.2710
YBP|Yibin|Yibin Wuliangye Airport|Yibin|CN|28.8584|104.5262
YBR|Brandon|Brandon Municipal Airport|Brandon|CA|49.9100|-99.9519
YBX|Blanc-Sablon|Lourdes-de-Blanc-Sablon Airport|Blanc-Sablon|CA|51.4436|-57.1853
YBY|Bonnyville|Bonnyville Airport|Bonnyville|CA|54.3042|-110.7440
YCB|Cambridge Bay|Cambridge Bay Airport|Cambridge Bay|CA|69.1081|-105.1380
YCD|Nanaimo|Nanaimo Airport|Nanaimo|CA|49.0550|-123.8699
YCG|Castlegar|Castlegar/West Kootenay Regional Airport|Castlegar|CA|49.2964|-117.6320
YCM|Niagara-on-the-Lake|Niagara District Airport|Niagara-on-the-Lake|CA|43.1916|-79.1717
YCU|Yuncheng|Yuncheng Yanhu International Airport|Yuncheng|CN|35.1178|111.0340
YDA|Dawson City|Dawson City Airport|Dawson City|CA|64.0431|-139.1280
YDF|Deer Lake|Deer Lake Airport|Deer Lake|CA|49.2082|-57.3961
YDN|Dauphin|Dauphin Barker Airport|Dauphin|CA|51.1008|-100.0520
YEG|에드먼턴|Edmonton International Airport|Edmonton|CA|53.3097|-113.5800
YEI|Yenişehir|Bursa Yenişehir Airport|Yenişehir|TR|40.2552|29.5626
YEV|Inuvik|Inuvik Mike Zubko Airport|Inuvik|CA|68.3042|-133.4830
YFB|Iqaluit|Iqaluit Airport|Iqaluit|CA|63.7564|-68.5558
YFC|Fredericton|Fredericton International Airport|Fredericton|CA|45.8687|-66.5299
YFS|Fort Simpson|Fort Simpson Airport|Fort Simpson|CA|61.7602|-121.2370
YGJ|Yonago|Yonago Kitaro Airport / JASDF Miho Air Base|Yonago|JP|35.4922|133.2360
YGL|La Grande Rivière|La Grande Rivière Airport|La Grande Rivière|CA|53.6253|-77.7042
YGP|Gaspé|Michel-Pouliot Gaspé Airport|Gaspé|CA|48.7749|-64.4819
YGR|Les Îles-de-la-Madeleine|Îles-de-la-Madeleine Airport|Les Îles-de-la-Madeleine|CA|47.4252|-61.7786
YGV|Havre-Saint-Pierre|Havre-Saint-Pierre Airport|Havre-Saint-Pierre|CA|50.2819|-63.6114
YGW|Kuujjuarapik|Kuujjuarapik Airport|Kuujjuarapik|CA|55.2819|-77.7653
YHM|해밀턴|John C. Munro Hamilton International Airport|Hamilton|CA|43.1713|-79.9294
YHU|Montréal|Montréal / Saint-Hubert Metropolitan Airport|Montréal|CA|45.5175|-73.4169
YHY|Hay River|Hay River / Merlyn Carter Airport|Hay River|CA|60.8397|-115.7830
YHZ|핼리팩스|Halifax / Stanfield International Airport|Halifax|CA|44.8808|-63.5086
YIA|족자카르타|Yogyakarta International Airport|Yogyakarta|ID|-7.9053|110.0573
YIC|Yichun|Yichun Mingyueshan Airport|Yichun|CN|27.8025|114.3062
YIE|Arxan|Arxan Yi'ershi Airport|Arxan|CN|47.3106|119.9117
YIF|St-Augustin|St Augustin Airport|St-Augustin|CA|51.2117|-58.6583
YIH|Yichang|Yichang Sanxia Airport|Yichang|CN|30.5541|111.4826
YIN|Ili|Ili Yining International Airport|Ili|CN|43.9558|81.3303
YIV|Island Lake|Island Lake Airport|Island Lake|CA|53.8572|-94.6536
YIW|이우|Yiwu Airport|Yiwu|CN|29.3421|120.0312
YKA|Kamloops|Kamloops John Moose Fulton Field Regional Airport|Kamloops|CA|50.7030|-120.4486
YKF|Breslau|Region of Waterloo International Airport|Breslau|CA|43.4608|-80.3786
YKH|Yingkou|Yingkou Lanqi Airport|Yingkou|CN|40.5425|122.3586
YKL|Schefferville|Schefferville Airport|Schefferville|CA|54.8053|-66.8053
YKM|Yakima|Yakima Air Terminal McAllister Field|Yakima|US|46.5682|-120.5440
YKO|Hakkari|Hakkari Yüksekova Airport|Hakkari|TR|37.5497|44.2381
YKS|Yakutsk|Platon Oyunsky Yakutsk International Airport|Yakutsk|RU|62.0933|129.7710
YLK|Barrie|Barrie-Lake Simcoe Regional Airport|Barrie|CA|44.4851|-79.5547
YLL|Lloydminster|Lloydminster Airport|Lloydminster|CA|53.3092|-110.0730
YLW|켈로나|Kelowna International Airport|Kelowna|CA|49.9561|-119.3780
YLX|Yulin|Yulin Fumian Airport|Yulin|CN|22.4330|110.1200
YMM|Fort McMurray|Fort McMurray International Airport|Fort McMurray|CA|56.6533|-111.2220
YMO|Moosonee|Moosonee Airport|Moosonee|CA|51.2911|-80.6078
YMS|Yurimaguas|Moises Benzaquen Rengifo Airport|Yurimaguas|PE|-5.8938|-76.1182
YMT|Chibougamau|Chapais Airport|Chibougamau|CA|49.7719|-74.5281
YMX|Montréal|Montreal Mirabel International Airport|Montréal|CA|45.6795|-74.0387
YNA|Natashquan|Natashquan Airport|Natashquan|CA|50.1901|-61.7890
YNB|얀부|Prince Abdulmohsen Bin Abdulaziz International Airport|Yanbu|SA|24.1442|38.0634
YND|Gatineau|Ottawa / Gatineau Airport|Gatineau|CA|45.5217|-75.5636
YNL|Points North Landing|Points North Landing Airport|Points North Landing|CA|58.2767|-104.0820
YNZ|Yancheng|Yancheng Nanyang International Airport|Yancheng|CN|33.4283|120.2054
YOJ|High Level|High Level Airport|High Level|CA|58.6214|-117.1650
YOL|Yola|Yola Airport|Yola|NG|9.2576|12.4304
YOW|오타와|Ottawa Macdonald-Cartier International Airport|Ottawa|CA|45.3225|-75.6692
YPA|Prince Albert|Prince Albert Glass Field|Prince Albert|CA|53.2142|-105.6730
YPE|Peace River|Peace River Airport|Peace River|CA|56.2269|-117.4470
YPL|Pickle Lake|Pickle Lake Airport|Pickle Lake|CA|51.4464|-90.2142
YPN|Port-Menier|Port-Menier Airport|Port-Menier|CA|49.8364|-64.2886
YPQ|Peterborough|Peterborough Regional Airport|Peterborough|CA|44.2323|-78.3621
YPR|Prince Rupert|Prince Rupert Airport|Prince Rupert|CA|54.2861|-130.4450
YPW|Powell River|Powell River Airport|Powell River|CA|49.8342|-124.5000
YPX|Puvirnituq|Puvirnituq Airport|Puvirnituq|CA|60.0506|-77.2869
YPY|Fort Chipewyan|Fort Chipewyan Airport|Fort Chipewyan|CA|58.7672|-111.1170
YPZ|Burns Lake|Burns Lake Airport|Burns Lake|CA|54.3764|-125.9510
YQA|Gravenhurst|Muskoka Airport|Gravenhurst|CA|44.9754|-79.3065
YQB|퀘벡|Quebec Jean Lesage International Airport|Quebec|CA|46.7911|-71.3933
YQD|The Pas|The Pas Airport|The Pas|CA|53.9714|-101.0910
YQG|Windsor|Windsor International Airport|Windsor|CA|42.2756|-82.9556
YQH|Watson Lake|Watson Lake Airport|Watson Lake|CA|60.1168|-128.8220
YQK|Kenora|Kenora Airport|Kenora|CA|49.7883|-94.3631
YQL|Lethbridge|Lethbridge County Airport|Lethbridge|CA|49.6303|-112.8000
YQM|Moncton|Greater Moncton Roméo LeBlanc International Airport|Moncton|CA|46.1132|-64.6772
YQN|Nakina|Nakina Airport|Nakina|CA|50.1828|-86.6964
YQQ|Comox|Comox Valley International Airport / CFB Comox|Comox|CA|49.7108|-124.8870
YQR|Regina|Regina International Airport|Regina|CA|50.4319|-104.6609
YQT|Thunder Bay|Thunder Bay International Airport|Thunder Bay|CA|48.3719|-89.3239
YQU|Grande Prairie|Grande Prairie Airport|Grande Prairie|CA|55.1797|-118.8850
YQX|Gander|Gander International Airport|Gander|CA|48.9363|-54.5677
YQY|Sydney|Sydney / J.A. Douglas McCurdy Airport|Sydney|CA|46.1611|-60.0498
YQZ|Quesnel|Quesnel Airport|Quesnel|CA|53.0261|-122.5100
YRB|Resolute Bay|Resolute Bay Airport|Resolute Bay|CA|74.7169|-94.9694
YRJ|Roberval|Roberval Airport|Roberval|CA|48.5197|-72.2657
YRL|Red Lake|Red Lake Airport|Red Lake|CA|51.0669|-93.7931
YRO|Ottawa|Ottawa / Rockcliffe Airport|Ottawa|CA|45.4605|-75.6440
YRT|Rankin Inlet|Rankin Inlet Airport|Rankin Inlet|CA|62.8114|-92.1158
YSB|Sudbury|Sudbury Airport|Sudbury|CA|46.6250|-80.7989
YSF|Stony Rapids|Stony Rapids Airport|Stony Rapids|CA|59.2503|-105.8410
YSJ|Saint John|Saint John Airport|Saint John|CA|45.3161|-65.8903
YSM|Fort Smith|Fort Smith Airport|Fort Smith|CA|60.0203|-111.9620
YSQ|Qian Gorlos Mongol Autonomous County|Songyuan Chaganhu Airport|Qian Gorlos Mongol Autonomous County|CN|44.9311|124.5521
YTH|Thompson|Thompson Airport|Thompson|CA|55.8011|-97.8642
YTS|Timmins|Timmins/Victor M. Power|Timmins|CA|48.5697|-81.3767
YTY|Yangzhou|Yangzhou Taizhou Airport|Yangzhou|CN|32.5634|119.7198
YTZ|Toronto|Billy Bishop Toronto City Airport|Toronto|CA|43.6279|-79.3955
YUM|Yuma|Yuma International Airport / Marine Corps Air Station Yuma|Yuma|US|32.6509|-114.6094
YUS|Yushu|Yushu Batang Airport|Yushu|CN|32.8364|97.0364
YUX|Sanirajak|Hall Beach Airport|Sanirajak|CA|68.7761|-81.2425
YUY|Rouyn-Noranda|Rouyn Noranda Airport|Rouyn-Noranda|CA|48.2061|-78.8356
YVB|Bonaventure|Bonaventure Airport|Bonaventure|CA|48.0711|-65.4603
YVC|La Ronge|La Ronge Airport|La Ronge|CA|55.1514|-105.2620
YVO|Val-d'Or|Val-d'Or Airport|Val-d'Or|CA|48.0533|-77.7828
YVP|Kuujjuaq|Kuujjuaq Airport|Kuujjuaq|CA|58.0961|-68.4269
YVQ|Norman Wells|Norman Wells Airport|Norman Wells|CA|65.2816|-126.7980
YVV|Wiarton|Wiarton Airport|Wiarton|CA|44.7458|-81.1072
YWG|위니펙|Winnipeg / James Armstrong Richardson International Airport|Winnipeg|CA|49.9100|-97.2399
YWK|Wabush|Wabush Airport|Wabush|CA|52.9219|-66.8644
YWL|Williams Lake|Williams Lake Airport|Williams Lake|CA|52.1831|-122.0540
YXC|Cranbrook|Cranbrook/Canadian Rockies International Airport|Cranbrook|CA|49.6108|-115.7820
YXE|새스커툰|Saskatoon John G. Diefenbaker International Airport|Saskatoon|CA|52.1707|-106.7008
YXH|Medicine Hat|Medicine Hat Regional Airport|Medicine Hat|CA|50.0189|-110.7210
YXJ|Fort Saint John|Fort St John / North Peace Regional Airport|Fort Saint John|CA|56.2381|-120.7400
YXL|Sioux Lookout|Sioux Lookout Airport|Sioux Lookout|CA|50.1139|-91.9053
YXS|Prince George|Prince George (International) Airport|Prince George|CA|53.8843|-122.6666
YXT|Terrace|Northwest Regional Airport Terrace-Kitimat|Terrace|CA|54.4685|-128.5760
YXU|London|London International Airport|London|CA|43.0328|-81.1490
YXX|Abbotsford|Abbotsford International Airport|Abbotsford|CA|49.0253|-122.3610
YXY|Whitehorse|Whitehorse / Erik Nielsen International Airport|Whitehorse|CA|60.7085|-135.0657
YYA|Yueyang|Yueyang Sanhe Airport|Yueyang|CN|29.3117|113.2816
YYB|North Bay|North Bay Jack Garland Airport|North Bay|CA|46.3636|-79.4228
YYD|Smithers|Smithers Airport|Smithers|CA|54.8247|-127.1830
YYE|Fort Nelson|Fort Nelson Airport|Fort Nelson|CA|58.8364|-122.5970
YYF|Penticton|Penticton Regional Airport|Penticton|CA|49.4631|-119.6020
YYG|Charlottetown|Charlottetown Airport|Charlottetown|CA|46.2889|-63.1252
YYJ|빅토리아|Victoria International Airport|Victoria|CA|48.6472|-123.4278
YYL|Lynn Lake|Lynn Lake Airport|Lynn Lake|CA|56.8639|-101.0760
YYQ|Churchill|Churchill Airport|Churchill|CA|58.7392|-94.0650
YYR|Goose Bay|Goose Bay Airport|Goose Bay|CA|53.3192|-60.4258
YYT|세인트존스|St. John's International Airport|St. John's|CA|47.6186|-52.7519
YYY|Mont-Joli|Mont Joli Airport|Mont-Joli|CA|48.6086|-68.2081
YZF|Yellowknife|Yellowknife International Airport|Yellowknife|CA|62.4628|-114.4400
YZP|Sandspit|Sandspit Airport|Sandspit|CA|53.2543|-131.8140
YZS|Coral Harbour|Coral Harbour Airport|Coral Harbour|CA|64.1933|-83.3594
YZT|Port Hardy|Port Hardy Airport|Port Hardy|CA|50.6806|-127.3670
YZU|Whitecourt|Whitecourt Airport|Whitecourt|CA|54.1439|-115.7870
YZV|Sept-Îles|Sept-Îles Airport|Sept-Îles|CA|50.2233|-66.2656
YZY|Zhangye|Zhangye Ganzhou Airport|Zhangye|CN|38.8019|100.6750
ZAD|자다르|Zadar Airport|Zadar|HR|44.0970|15.3536
ZAH|Zahedan|Zahedan International Airport|Zahedan|IR|29.4757|60.9062
ZAL|Valdivia|Pichoy Airport|Valdivia|CL|-39.6500|-73.0861
ZAM|삼보앙가|Zamboanga International Airport|Zamboanga|PH|6.9224|122.0600
ZAT|Zhaotong|Zhaotong Zhaoyang Airport|Zhaotong|CN|27.2058|103.6915
ZAZ|Zaragoza|Zaragoza Airport|Zaragoza|ES|41.6662|-1.0415
ZBF|South Tetagouche|Bathurst Airport|South Tetagouche|CA|47.6297|-65.7389
ZBR|Konarak|Chabahar Konarak International Airport|Konarak|IR|25.4432|60.3822
ZCL|Zacatecas|General Leobardo C. Ruiz International Airport|Zacatecas|MX|22.8949|-102.6872
ZCO|Temuco|La Araucanía International Airport|Temuco|CL|-38.9259|-72.6515
ZEL|Bella Bella|Bella Bella (Campbell Island) Airport|Bella Bella|CA|52.1850|-128.1570
ZHA|잔장|Zhanjiang Wuchuan International Airport|Zhanjiang|CN|21.4817|110.5903
ZHY|Zhongwei|Zhongwei Shapotou Airport|Zhongwei|CN|37.5731|105.1545
ZIA|모스크바 주콥스키|Zhukovsky International Airport|Moscow|RU|55.5533|38.1500
ZIG|Ziguinchor|Ziguinchor Airport|Ziguinchor|SN|12.5556|-16.2833
ZIH|Ixtapa|Ixtapa-Zihuatanejo International Airport|Ixtapa|MX|17.6018|-101.4606
ZIX|Zhigansk|Zhigansk Airport|Zhigansk|RU|66.7965|123.3610
ZKP|Zyryanka|Zyryanka Airport|Zyryanka|RU|65.7485|150.8889
ZLO|Manzanillo|Playa de Oro International Airport|Manzanillo|MX|19.1448|-104.5590
ZMT|Masset|Masset Airport|Masset|CA|54.0275|-132.1250
ZND|Zinder|Zinder Airport|Zinder|NE|13.7790|8.9838
ZNE|Newman|Newman Airport|Newman|AU|-23.4178|119.8030
ZNZ|잔지바르|Abeid Amani Karume International Airport|Zanzibar|TZ|-6.2220|39.2249
ZOS|Osorno|Cañal Bajo Carlos Hott Siebert Airport|Osorno|CL|-40.6112|-73.0610
ZQN|퀸스타운|Queenstown Airport|Queenstown|NZ|-45.0192|168.7464
ZQZ|Zhangjiakou|Zhangjiakou Ningyuan Airport|Zhangjiakou|CN|40.7387|114.9334
ZSA|San Salvador|San Salvador International Airport|San Salvador|BS|24.0630|-74.5232
ZSE|Saint-Pierre|Saint-Pierre Pierrefonds Airport|Saint-Pierre|RE|-21.3194|55.4225
ZSJ|Sandy Lake|Sandy Lake Airport|Sandy Lake|CA|53.0642|-93.3444
ZTH|Zakynthos|Zakynthos International Airport "Dionysios Solomos"|Zakynthos|GR|37.7509|20.8843
ZUH|주하이|Zhuhai Jinwan Airport|Zhuhai|CN|22.0064|113.3760
ZYI|Zunyi|Zunyi Xinzhou Airport|Zunyi|CN|27.8107|107.2472
ZYL|Sylhet|Osmany International Airport|Sylhet|BD|24.9640|91.8647
`;
