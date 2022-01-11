## {풀스택} JavaScript 16강 - Date

### _Date 메서드_

- 시간은 다 뒤에 s 붙음
- d.getYear() // 1900 ~ diff 나옴
- d.getFullYear() // 연도는 이거 사용
- d.getMonth() // 하나 작게 나옴
- d.getDate() // 일
- d.getDay() // weekDay => 요일
  - 일요일이 0 ~ 토요일은 6
  - 주말인지 체크하기 위해서?
    - `dd = d.getDay();`
    - `dd === 0 || dd === 6`
    - `dd % 6 === 0`
    - `!(dd % 6)`
- toLocaleString()으로 하면 보기 편함
  - 현재 PC locale 설정 값으로 나옴
- d.setDate(d.getDate() + 2) // 2일 후로 일자 설정
  - 31일이면 다음달 2일로 알아서 바꿔줌
  - 번거로워서 moment 모듈 사용함

### _Global 서비스의 DB에 TIMESTAMP 사용 필수 이유_

- 날짜 컬럼 타입
  - varchar(8)로 만들면 되긴 함
  - 영국 GMT 9시간 차이
  - varchar 사용하면 안되고 TIMESTAMP 데이터 타입 사용해야 함!
  - TIMESTAMP 는 GMT 시간까지 같이 갖고 있음
    - GTM 붙는 이유; Select 할 때 기본 타임 잡음
    - PC, Server 시계 맞추기 편하기 위해 한 것 (보기 편하게 하기 위함)
    - 실제로 DB에 들어간 것은 ms 단위로 long 타입으로 들어있음

### _Moment.js 모듈_

- Admin 만들 때는 사용하긴 함
- Customer 앱에서는 빌드하면 용량 커져서 부담되서 잘 안씀
- `m = moment();`
- m.format('YYYY-MM-DD')
  - HH:mm:ss
- m.format('L') // 연월일
  - LL 은 좀 더 친근하게 몇월 몇일
  - LLL 은 아마 시간까지? ...
  - 소문자로 사용해도 상관 없음
- m.add(2, 'day') // 2일 후
- 대부분 회사에서 사용함

### _대부분 회사에서 사용하는 라이브러리_

- moment 모듈
  - 무거워서 안 쓰는 회사 많음
- Axios 모듈
- 만약 회사 서비스 커져서 moment 모듈 뺀다면?
  - date.util.js로 따로 유틸리티 파일 별도로 빼는데
    - moment 라이브러리 사용 중지하고 싶으면
    - npm uninstall moment 한 번 때리고
    - 이쪽 소스 다 고쳐야 함 (Date 객체 이용해서 다 수정 필요)
    - 제대로 고쳤는지 불안해서 unittest로 항상 걸어놔야 함
    - 처음 moment로 개발할 때부터 단위 테스트 다 해야함
    - 프로토타입은 안하는 경우 많지만 제품은 반드시 해야 함
    - 유지보수 비용 훨씬 절약됨

#

### [Note]

- Date 힘듦
  - locale 따라감
  - 나라마다 날짜 표기 방식 다 다름
- `d = new Date();` // 현재 시스템(PC) 시간
- Local 설정
  - GMT 방식; 그리니치 평균 시간
    - 우리나라는 GMT + 9 (사실 원래는 8.5)
  - `d.toString()` // 끝에 +0900
- 하이브리드 앱
  - 스마트폰 언어, 폰 설정 시간 체크 이용함 (권한 허용)
  - locale 설정 값 받음
  - 웹 브라우저에 미리 setLocale() 만들어놔야 함
  - 컴포넌트 속에서 window.setLocale = () => {} 로 활용
  - setLocale 함수는 Native 하이브리드 껍데기가 불러줌
  - 전역에 담기 위해서 context API 활용해서 전역 객체에 담을 수 있음
  - date.utils에서 import해서 setLocale 사용하면 됨

#

[Reference](https://www.youtube.com/watch?v=OSp9Ej_Ap-4)
