## {풀스택} JavaScript 8강 - Strict mode/ESLint/Prettier/Built-in/SQL Injection/Faas/HTTP/UTF-8/Fragment

### _Strict mode_

- 오해의 소지가 있는 코드를 사용하면 안됨
- 일반 함수로 호출한 함수 속의 this는 전역 객체 => 함수 속에서 this 사용시 error 발생 (strict mode에서)
- `x = 1` 는 전역으로 잡힘 => 호이스팅 error 발생 <br/>
  (변수 앞에 let/const 키워드 무조건 사용하여야 함)
- `use strict;`
- 가끔 npm 또는 다른 라이브러리 사용하는데 strict mode 걸었더니 에러 발생 가능
  - 라이브러리 만든 회사로 이메일 보내서 수정 요청
- 밖은 strict mode가 아닌데 함수 내부만 strict mode만 쓰면 안됨
  - 헷갈림 (오해의 소지 있음)
- 리액트 => App.jsx (제일 바깥 컴포넌트에 React Strict Mode 걸음)
- 최근은 Strict mode 의미가 많이 없어짐
  - ESLint, Prettier (VS Code extension)
    - ESLint; 구문 오류, 오해 소지 다 잡아줌
    - Prettier; code format 보기 편하게 만들어줌

### _Built-in_

- 표준 빌트인 객체 (스탠다드 빌트인)
  - 미리 만들어 놓은 것
  - ECMAScript 에서 미리 정의해 놓은 명세
  - 모든 JS에서 다 구동됨
  - window, self, Infinity, NaN, isNaN, parseInt(), String, Number, Boolean ...
- 호스트 빌트인 객체 (브라우저 빌트인)
  - DOM; element, style, document, ...
  - BOM (Browser Object Model); location, history, bookmark, ...
- 커스텀 빌트인 객체 (내가 만든 빌트인)
  - ex) JArray 의 swap 메서드
- eval('str')
  - ex) `eval('const a = 1; console.log(a + 1);')`
  - ;은 문장 구분
  - node 환경에서 fs (file system) 접근 가능, 특정 경로 remove도 가능
  - eval은 위험함, 어떤 면에서는 사용성이 좋을 수도 있긴 함
    - FaaS; cloud 환경에서 text area에 js 코드 넣으면 API로 만들어짐 (ex. AWS Lambda)
    - eval로 실행시켜 놓으면 함수가 생김
      - 함수가 실행 컨텍스트에 존재해서 호출 가능
    - eval 함수의 매개변수 string이 소스코드가 되버림
    - rule 기반으로 함수 만들어서 메모리 상에 인스턴스로 올릴 수 있다 등 생각 가능...
    - 참고) JAVA - 리플렉션
  - eval 스코프
    - strict mode에서는 저 string 으로 들어가는 부분만 따로 잡음 (별도의 스코프)
    - 함수 속의 별도 스코프로 인식됨

### _HTTP_

- HTTP 메서드
  - GET; 브라우저 창에 주소 상으로만 데이터 전달 ex) ?a=1&b=2 // node 에서는 request.params 으로 받을 수 있음
    - 겉에 쓰는 것 (편지 봉투)
    - 1024 (http 1.0) ~ 4096 바이트 초과하면 안됨
    - ex) board/delete?id=1 로 get 이용해서 만들면 위험 (아무나 다 부를 수 있음)
  - POST; 편지지 속에 쓰는 것
    - 많은 데이터는 무조건 post 이용 (파일 업로드 포함)
  - DELETE; ex) 게시글 100번 삭제해줘~
    - 작성자만 지울 수 있도록 로그인 등 체크... <br/>
      (작성자의 id와 지우려고 하는 게시글의 사용자 cookie 일치하는지 체크)
  - PUT; 수정
  - PATCH; 수정
  - OPTIONS; 서버에서 어떤 메서드 지원하는지 알려줌

### _UTF-8_

- URL 주소에 한글 있으면 encoding 됨 (복붙했을 때)
- URL 주소는 네트워크를 타고 날라감
- 한글은 UTF-8로 인식되서 한글 1글자는 3바이트 <br/>
  영문, 숫자 1바이트, 특수문자 2바이트, 일본어 3바이트, 중국어 3바이트, 이모티콘 3 or 4 바이트
- 인코딩되서 서버로 날라가면 서버에서는 디코딩함 <br/>
  (express, flask 등 서버 프레임워크들이 디코딩해서 나한테 넘겨줌)
- https/http - 프로토콜
- www.naver.com - 도메인
- /board/ - path
- :8080 - 포트
- ?a=1 - 쿼리 스트링
- URL 뒤에 # 붙일 수 있음 - 화면 안 뒤집힘 // 싱글 페이지에서 바로 스크롤
  - 프래그먼트

### _Fragment_

- 화면상에서 스크롤로 이동됨 (a 태그 링크)
- 다른 곳으로 가지 않음
- 리액트에서도 프래그먼트 사용함, 하나의 영역 (위치만 잡아주는 것)

#

### [Note]

- SQL Injection

  - ex) `delete from User;`
  - 서브쿼리 처럼 처리되서 실행될 수 있음
  - 현재는 값들이 다 이스케이프 처리 되서 순수 text로 인식됨

- OPTIONS 메서드 참고
  - 현대카드
  - PG 사 (결제사) API 서버 연동할 때
    - 브라우저 결제창 (팝업 - PG사에서 띄워줌, 고객은 상점 ID 가지고 PG사의 정해진 API만 호출했을 뿐)
    - 상점 ID
    - 외부에 있는 API 호출할 때는 api token, secret key, (server key <- for push to app) 필요
    - server key는 server가 가지고 있음
    - token은 기기마다 정해짐
    - secret key는 상점 id 암호화해서 unique하게 만들어진 것
  - 사용자가 인증 다하면 그 데이터는 우선 PG사의 서버가 받음
    - 브라우저 - PG사 - 상점 서버 - PG사 (상점 서버에서 OK) - 카드사 - PG사 - 상점 서버 - 고객 브라우저로 redirect
  - 고객 PC 브라우저 - PG 사이는 HTTPS가 지켜줌 (암호화)
  - PG사가 현대카드로 보내서 현대카드에서 카드 승인 다 하면 (현대사에 보안망 있음)
  - PG사가 고객한테 알려줘야 하는데 바로 반환하지 않음
  - 이미 소스코드 노출된 상태임 (고객 - PG사)
  - 승인된 결과는 상점 서버로 보냄 (check api 사전 구현, 승인된 결과 db에 저장 필요, 문제 있으면 reject하고 반복...)
  - 상점 서버에서는 고객 브라우저로 redirect 함 (고객 브라우저와 상점 서버 사이에 연결 고리가 없음)
    - session 알고 있으면 리다이렉트 보낼 수 있음 (계속 세션 가지고 다님)

#

[Reference](https://www.youtube.com/watch?v=5k_cpzg6UwI)
