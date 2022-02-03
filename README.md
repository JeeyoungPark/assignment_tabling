## 📃 소개

<div align="center">
  <div><h3>Desktop과 Mobile을 모두 지원하는 예약 목록 화면</h3></div>
  <span>
  <img src="https://user-images.githubusercontent.com/80609368/152366263-f10f78cb-ac5b-4738-95fa-649199bd8540.png" style="width: 300px;"/>
  </span>
  <span>
  <img src="https://user-images.githubusercontent.com/80609368/152366076-32e2d1ac-1dec-411c-b75f-7fdea47eadb2.png" style="height: 200px;" /></span>
</div>

<br>

## 🔎 폴더 구조

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
│          ├── validate.js
│          └── format.js
├── .eslintrc.js
├── .postcssrc.js
├── .prettierrc.js
├── package.json
├── package-lock.json
└── webpack.config.js
```

## 📍 주요 기능

### ✨ 스크린 너비 1024픽셀 기준 Mobile과 Desktop 전환
- 예약 상태가 `done`일 경우 예약 목록 내 미표출
- 초기 예약 상세는 첫 번째 예약 아이템으로 표출
- 예약 아이템 및 예약 상세의 데이터 레이아웃 유지
  - 시간 HH:MM 형식
  - 성인 00 아이 00
  - 메뉴명(갯수)[, 메뉴명(갯수)]
  - 예약자명 - 테이블명[, 테이블명]
  
| Desktop과 Mobile 반응형 디자인 |
|---------------------------|
|<img src="https://user-images.githubusercontent.com/80609368/152360748-e7a12e39-90f1-4592-a055-f5ad08082ebd.gif" style="width: 600px;"/>|

### ✨ 예약 아이템 클릭시 예약 상세에 해당 데이터 표출

| 예약 아이템과 예약 상세 데이터 연결 |
|---------------------------|
|<img src="https://user-images.githubusercontent.com/80609368/152361780-9feef0ed-522d-421b-ac15-2edba6a94fe4.gif" style="width: 600px;"/>|

### ✨ 예약 상태에 따른 버튼 표출 및 버튼 클릭시 상태 변경

- "착석" 클릭 시 "퇴석"으로 변경
- "퇴석" 클릭 시 목록에서 제거

| Desktop | Mobile |
|---------------------------|---------------------------|
|<img src="https://user-images.githubusercontent.com/80609368/152363429-b73a355f-765b-4401-903a-ab0e0110c9e4.gif" style="width: 500px;"/>|<img src="https://user-images.githubusercontent.com/80609368/152365394-3f89c57b-ab45-424d-bc95-a2a6716f9de6.gif" style="width: 200px;"/>|


### ✨ Mobile 뷰 - 팝업 열고 닫기

- 팝업 표출 시, slide-up으로 fade-in 애니메이션 처리
- `닫기` 버튼 클릭 시 팝업 종료
- `dim` 영역 터치 시 팝업 종료

| 팝업 닫기 및 애니메이션 | 
|---------------------------|
|<img src="https://user-images.githubusercontent.com/80609368/152364941-7975df55-4ba9-4596-b453-4ae1f55c0f0e.gif" style="width: 200px;"/>|



