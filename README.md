# assignment_tabling

## 소개

Desktop과 Mobile을 모두 지원하는 예약 목록 화면

## 폴더 구조

```bash
├── src
│    ├── index.html
│    ├── App.js
│    │── main.js
│    └── components
│    │     ├── Header.js
│    │     ├── List.js
│    │     └── Detail.js
│    └── scss
│    │     ├── style.scss
│    │     ├── reset.scss
│    │     ├── mixins.scss
│    │     └── variables.scss
│    └── utils
│          ├── api.js
│          └── formatTime.js
├── .eslintrc.js
├── .postcssrc.js
├── .prettierrc.js
├── package.json
├── package-lock.json
└── webpack.config.js
```

## 주요 기능

### 스크린 너비 1024픽셀 기준 Mobile과 Desktop 전환

- 예약 상태가 "done"일 경우 예약 목록 내 미표출
- 초기 예약 상세는 첫 번째 예약 아이템으로 표출
- 예약 아이템 및 예약 상세의 데이터 레이아웃 유지
  - 시간 HH:MM 형식
  - 성인 OO 아이 OO
  - 메뉴명(갯수)[, 메뉴명(갯수)]
  - 예약자명 - 테이블명[, 테이블명]

### 예약 아이템 클릭시 예약 상세에 해당 데이터 표출

### 예약 상태에 따른 버튼 표출 및 버튼 클릭시 상태 변경

- "착석" 클릭 시 "퇴석"으로 변경
- "퇴석" 클릭 시 목록에서 제거

### 팝업 열고 닫기

- 팝업 표출 시, slide-up으로 fade-in 애니메이션 처리
- 닫기 버튼 클릭 시 팝업 종료
- dim 영역 터치 시 팝업 종료
