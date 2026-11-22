# 티어런 (TierRun) — 대한항공 스카이패스 등급 트래커

모닝캄 · 모닝캄 셀렉트 · 모닝캄 프리미엄 · 밀리언 마일러 달성을 위한 마일런 기록 앱.
React + Vite 웹앱이고, 구글 로그인(Firebase)과 AI 자동 채우기(Gemini 또는 Claude API)를 지원합니다.

> 대한항공과 관계없는 개인 기록용 서비스입니다. 실제 적립·등급 판정은 대한항공 기준을 따릅니다.

## 기능

- **등급 현황** — 다음 등급까지 진행률 링, 방법별(마일/탑승 횟수 포인트) 막대, 확정(탑승 완료)과 예정(앞으로 탈 항공편) 구분, 월 필요 페이스, 인천–LA 왕복 환산, 현재 단가로 남은 비용
- **항공편 추가** — 편도/왕복/다구간, 예약 등급 입력 시 대한항공 적립률 자동 적용, 적립률 슬라이더(10·20·25·30·50·70·80·100·110·125·130%) + 직접 입력, 왕복·다구간 총액 한 번에 입력
- **구간 마일 자동 계산** — 대한항공 운항편은 ‘구간별 적립 마일리지’ 표, 그 외는 대권거리 추정
- **AI 자동 채우기** — 예약 확인 메일·일정 텍스트를 붙여 넣으면 편명·구간·등급·적립 마일을 채움
- **마일당 단가** — 여정별 ₩/마일, 평균 단가, 목표까지 예상 비용, 월별 적립 그래프
- **레이아웃** — 컴퓨터/패드: 지구본 + 왼쪽 패널 / 모바일: 패널 기본 + 하단 컨트롤바(항공편·지도·등급·단가)

## 로컬 실행

```bash
npm install
npm run dev        # http://localhost:5173
```

Firebase 설정이 없으면 로그인 없이 이 브라우저(localStorage)에만 저장하는 모드로 동작합니다.

## 구글 로그인 연결 (Firebase)

1. https://console.firebase.google.com 에서 프로젝트 생성
2. **Authentication › 로그인 방법 › Google** 사용 설정
3. **Firestore Database** 만들기 → 규칙 탭에 `firestore.rules` 내용 붙여 넣고 게시
4. **프로젝트 설정 › 내 앱 › 웹 앱 추가** → 나오는 설정값을 `src/firebaseConfig.js`에 넣기 (현재 tierrun-93e51 프로젝트 값이 들어 있음)
5. 배포 후 **Authentication › 설정 › 승인된 도메인**에 배포 도메인(예: `tierrun.vercel.app`) 추가

데이터는 `users/{uid}` 문서 하나에 저장되고, 본인만 읽고 쓸 수 있습니다.

## 배포 (Vercel 권장)

1. 이 폴더를 GitHub 저장소로 올리기
2. https://vercel.com 에서 저장소 Import (Framework: Vite 자동 인식)
3. **Environment Variables**에 `GEMINI_API_KEY` 입력 (Firebase 값은 코드에 들어 있어서 따로 안 넣어도 됨)
4. Deploy

`api/ai.js`는 Vercel 서버 함수로 자동 배포되어 `/api/ai`에서 동작합니다. API 키는 서버에만 있고 브라우저에 노출되지 않습니다.
Gemini 키는 Google AI Studio(https://aistudio.google.com/apikey)에서 발급합니다. Claude API를 쓰려면 `ANTHROPIC_API_KEY`를 대신 넣으세요.

## 앱으로 전환할 때

같은 코드를 Capacitor로 감싸면 iOS/Android 앱이 됩니다.

```bash
npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init 티어런 com.example.tierrun --web-dir dist
npm run build && npx cap add ios && npx cap add android
```

앱 안에서 구글 로그인은 팝업 대신 `@capacitor-firebase/authentication` 플러그인으로 바꿔야 합니다.

## 데이터·기준 수정 위치

| 내용 | 파일 |
|---|---|
| 구간별 적립 마일리지 표, 예약 등급별 적립률, 항공사, 등급 기준 기본값 | `src/skypass.js` |
| 공항 목록(한글명·좌표) | `src/airports.js` |
| 등급 계산 로직 | `src/core.js` (`computeGoals`) |
| AI 프롬프트 | `src/ai.js` |

등급 기준은 앱의 **설정 › 등급 기준 직접 수정**에서도 바꿀 수 있습니다.

### 현재 반영한 기준 (2026년 11월)

- 모닝캄 승급: 누적 5만 마일(대한항공 탑승 3만 이상, 나머지 제휴 항공사) 또는 대한항공 탑승 횟수 80포인트
- 모닝캄 유지(2년): ① 3만 마일(대한항공 2만 이상) ② 3만 마일 + 30포인트 ③ 40포인트
- 모닝캄 셀렉트: 심사 기간(직전 모닝캄 기간) 내 대한항공+스카이팀 10만 마일 또는 140포인트
- 모닝캄 프리미엄: 평생 대한항공+스카이팀 50만 마일 / 밀리언 마일러: 100만 마일
- 탑승 횟수 포인트: 대한항공 편명, 한국 국내선 1P · 국제선 2P (적립 가능한 운임만)
- 예약 등급별 적립률: 탑승일 2025년 9월 17일 이후 표

## 빌드 명령

- `npm run build` → `dist/` (웹 배포용)
- `npm run build:artifact` → `dist-artifact/index.html` (한 파일 버전, Claude 아티팩트 미리보기용)
