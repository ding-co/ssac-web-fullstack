## [21_10_07 목 오프라인 수업 8]

### _공지사항_

- 신청 책
  - 1순위 Material UI
  - 2순위 Node.JS 디자인 패턴
  - 3순위 컴파일러 만들기

### _본수업_

- 딥 다이브

  - 19장 프로토타입
  - 20장 strict mode
    - 오해의 소지가 있는 코드 쓰면 안되겠다!
    - `'use strict';`
    - ESLint, prettier VS Code 확장팩
  - 21장 빌트인 객체
    - 에러 메시지로 built in 자주 만남
    - 표준 빌트인 객체 (standard)
      - Window, Self, Infinity, NaN, isNaN(), parseInt()
    - 호스트 빌트인 객체 (host/browser)
      - browser에서 가지고 있는 DOM
      - BOM; location, history, bookmark, ...
      - node => fs (파일 시스템)
    - 커스텀 (custom)
    - 참고) eval('const a = 1; console.log(a + 1)') <br/>
      eval 함수는 위험한데 어떤 면에서는 유용할 수 있음 <br/>
      FaaS; eval 함수 활용 (string(매개변수)이 소스코드가 되버림)
    - encodeURI / decodeURI
      - HTTP 메서드
        - GET; 주소로 데이터 전달 요청 (?a&d) // 편지 겉에 써있는 것, 짧게
        - POST; 안에 편지지로 작성 (많은 데이터 보낼 때 post로 보내기)
        - DELETE; 데이터 지우기 (작성자만 지울 수 있도록 체크, 로그인 체크 - 로그인 쿠키 아이디 비교)
        - PUT; 수정 (update)
        - PATCH; 수정
        - OPTIONS; 웹서버에서 지원되는 메서드 종류 확인
      - 인코딩
        - URL 보내면 인코딩 되서 데이터 보내고
        - 서버가 그 데이터 인지 위해서는 디코딩함 <br/>
          (express 같은 서버 프레임워크가 디코딩까지 해서 넘겨줌)
        - URI에서 Fragment; #abc 네비게이션 바 -> 스크롤 (화면상에서 이루어짐) <br/>
          (하나의 영역/위치만 잡아줌, 따로 서버로 넘어가지 않음)

#

### [Note]

- 다형성

  - 다형성을 잘 이해하고 코딩해야 좋은 코드가 나옴
  - Animal; `eat()`
    - Cat
    - Dog
  - 메서드 오버라이딩
    - Dog; `eat() { super.eat(); }`
      - `eat(f1, f2) { super.eat( ...arguments ); }`
  - 메서드 오버로드
    - ex) X = { f(a, b) { } f(a) {} }<br/>
      (JS에서는 안되는데 TS에서는 가능, 다른 언어도 모두 허용)

- 생성자

  - ex) const d = new Dog('Mack');
    - 클래스도 함수임
    - 클래스를 선언하는 순간
  - 함수 호출 방식
    - 일반 함수 (function)
    - 메서드 (object 속의 함수)
    - 생성자 함수
      - new 로 부름
      - 생성자 함수도 일종의 object
      - constructor () {} 있으면 그것을 호출하는데 <br/>
        만약 없으면 그 함수 자체가 생성자 함수가 됨
  - this
    - 메모리에 올라가서 잡혀있는 객체 (인스턴스)
    - 인스턴스화 안되어 있으면 this는 윈도우 객체임 (Window, self, global => ES11; globalThis)

- 프로토타입 체인

- 객체(함수) 리터럴은 하나의 값일 뿐임, 생성자 함수 가질 수 없음 <br/>
  생성자 함수 필요 없으면 객체 리터럴로 arrow function 사용

- 상속

  - globalThis가 Object에 프로토타입 할당
  - 상속; 부모에 있는 `__proto__` (프로토타입) 가져옴
  - `__proto__`에 f1(), f2(), eat() 달려서 가져옴 (프로퍼티 등등 모두 다 달림)
  - (프로토타입은 DNA)

- `Window.__proto__` <br/>
  `Dog.__proto__` <br/>
  `Dog.prototype.fy = (x) => {}`
- `__`는 접근자임 (accessor)
  - 정보 은닉성; private
  - getter, settger 함수 생성
    - getX(){return this.X}
    - setX(v) {this.x = v}
  - 변수 오용 방지 위해 private로 설정
  - AOP (마치 MySQL 트리거 같은 느낌)
  - 접근자는 게터 세터임
- `const s1 = 'abc'`는 `const s1 = new String('abc')`와 같은 의미 <br/>
  하지만 new로 한 것은 (메모리에 확보된 것은) 다 object임 wrapping 한 것임
- 함수는 object와 다름

  - function object로 별도의 공간으로 잡힘
  - 함수는 코드가 평가되고 실행됨
  - 함수는 반복해서 호출되고 재사용될 수 있으므로 그냥 object라고 안함
  - 함수는 function object라고 함, 다른 곳에 잡힘

- 프레임워크

  - 자주 사용하는 것을 미리 다 만들어두고 편하게 재사용
  - 코딩 속도 상승
  - 참고) 옵셔널 체이닝 - ?.

- array
  - map 함수 (새로운 array 리턴)
  - filter 함수 (조건엔 만족하는 것 여러개 찾기)
  - find 함수 (조건에 만족하는 것을 하나만 찾기)
    - arr.find(a => a.name = inp) <-- 명령형 방식
    - 참고) findBy 따로 만듬 <br/>
      arr.findBy(프로퍼티, 값) <br/>
      arr.findBy('name', inp) <-- 선언형 방식
  - forEach 함수 (for 돌음)
  - reduce 함수
- 리액트; 순수 JS 코드로 작성
- 항상 코딩을 선언형(함수형)으로 하자!
- 컴퓨터 공학: HW (몸) + SW (정신)
- JS는 프로토타입으로 상속함
- 디스트럭쳐링 할당
  - `...`해야 정확히 잘 들어가고 원본 변경 안 일어남 (손상 X)
  - ex) arr = [1, 2, 3] <br/>
    arr2 = [...arr]
- A가 B를 참조한다 (A -> B) <br/>
  A가 B를 호출한다 (B를 가져옴) <br/>
  ex) Lesson -> Student 가 맞음 (반대는 틀림); Lesson이 Student 사용

- Object.keys(); JSON 키 가져오기
- for in 는 key를 받고 for of는 값을 받음

- SQL Injection (해킹)

  - `delete from User;`
  - 위 sql은 현재는 다 escape 처리됨

- Java reflection
- 사용자들로부터 값을 받아서 instance로 올릴 수 있음 (메모리로)

- 전자결제 ex) PG, 이니시스 (중간 vendor)

  - API 토큰, secret, (Secretkey)
  - 브라우저 - PG - 현대사
  - 브라우저와 PG 사이에서는 HTTPS가 지켜줌
  - PG에서 승인된 결과는 따로 서버로 들어옴 (따로 서버에서 체크 및 저장)
    - 체크 API
    - 저장 API
    - 문제 있으면 다시 PG로 리젠
    - 최종 OK되면 브라우저로 redirect 됨 (브라우저와 서버의 연결고리 없음) <br/>
      unique 세션 가지고 서버에서 브라우저로 redirect 하면 결제 완료 팝업 뜸

- Bootstrap, material UI, Tailwind, 벌판?
- 리액트 style component
- 프리미엄 템플릿
- splash (무료 사진 많음)

- 개인 과제 프로젝트
  - 순수 html, css (animation, grid 등은 옵션)
  - bootstrap
  - 리액트로 갈때는 material UI (리액트 컴포넌트로 다 만들어져 있음)
  - TS, Next.js
- 팀 프로젝트

  - 앱
    - Admin - React, Bootstrap, node + JS
      - 로그인, 관리자 등록 등 다 만듦
    - Customer - React, Material UI, node + TS, Next.js (React를 SSR, 서버에서 각 페이지 만들어줌)

- SPA; HTML, CSS 한번에 로드, 라우팅
- Next.js; SSR - 서버에서 HTML generate (검색 엔진에 노출)
- 트렐로가 amber로 만듦 + PWA; 서비스 워커 달아서 앱처럼 (과거)

### [Curiosity]

### _질문_

-

### _개인_

- PUT vs. Patch (HTTP 메서드)
  - PUT; 리소스 모든 것 업데이트
  - Patch; 리소스 일부 업데이트
- OPTIONS 메서드; 웹서버에서 지원되는 메소드 확인
