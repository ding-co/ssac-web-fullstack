## {풀스택} JavaScript 8강 - Strict mode/ESLint/Prettier/Built-in/SQL Injection/Faas/HTTP/UTF-8/Fragment

### _Strict mode_

- 오해의 소지가 있는 코드를 사용하면 안됨
- 일반 함수로 호출한 함수 속의 this는 전역 객체 => error 발생
- `x = 1` 는 전역으로 잡힘 => 호이스팅 error 발생 <br/>
  (변수 앞에 let/const 키워드 무조건 사용하여야 함)
- `use strict;`
- 리액트 => App.jsx (제일 바깥 컴포넌트에 strict mode 걸음)
- ESLint, Prettier (VS Code extension)
  - ESLint; 구문 오류, 오해 소지 다 잡아줌
  - Prettier; code format 보기 편하게 만들어줌

### _Built-in_

- 표준 빌트인 객체
  - 미리 만들어 놓은 것
  - self, Infinity, NaN, isNaN, parseInt(), ...
- 호스트/브라우저 빌트인 객체
  - DOM; element, style, document, ...
  - BOM (Browser Object Model); location, history, bookmark, ...
- 커스텀 빌트인 객체 (내가 만듦)
- eval(string)
  - ex) `eval('const a = 1; console.log(a + 1);')`
  - node 환경에서 fs (file system) 접근 가능, 특정 경로 remove도 가능
  - eval은 위험함, 어떤 면에서는 사용성이 좋을 수도 있긴 함
    - FaaS; cloud 환경에서 text area에 js 코드 넣으면 API로 만들어짐 (ex. AWS Lambda)
    - eval로 실행시켜 놓으면 함수가 생김
    - 매개변수 string이 소스코드가 되버림
    - 참고) JAVA - 리플렉션
  - eval 스코프
    - strict mode에서는 저 string 으로 들어가는 부분만 따로 잡음 (별도의 스코프)

### _HTTP_

- 메서드
  - GET; 겉에 쓰는 것 (편지 봉투), 1024 ~ 4096 바이트 초과하면 안됨
  - POST; 편지 속에 쓰는 것, 많은 데이터는 무조건 post (파일 업로드 포함)
  - DELETE; ex) 게시글 100번 삭제
  - PUT; 수정
  - PATCH; 수정
  - OPTIONS; 어떤 메서드 지원하는지 알려줌

### _UTF-8_

- URL 주소에 한글 있으면 encoding 됨
- 한글은 UTF-8로 인식되서 한글 1글자는 3바이트
- 인코딩되서 서버로 날라가면 서버에서는 디코딩함 <br/>
  (express, flask 등 서버 프레임워크들이 디코딩해서 나한테 넘겨줌)

### _Fragment_

- 화면상에서 스크롤로 이동됨 (a 태그 링크)
- 하나의 영역 (위치만 잡아주는 것)

### [Note]

- SQL Injection

  - ex) `delete from User;`
  - (현재는 다 이스케이프 처리 되서 순수 text로 처리됨)

- OPTIONS 메서드 참고
  - 현대카드
  - PG 사, 서버
  - 브라우저 결제창 (팝업 - PG사에서 띄워줌, 나는 상점 ID 가지고 PG사의 정해진 API만 호출했을 뿐)
    - 외부에 있는 API 호출할 때는 api token, secret key, (server key - push to app) 필요

#

[Reference](https://www.youtube.com/watch?v=5k_cpzg6UwI)
