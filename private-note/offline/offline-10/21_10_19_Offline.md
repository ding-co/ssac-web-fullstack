## [21_10_19 화 오프라인 수업 10]

### _공지사항_

- 토요일

  - 오전; 이론
  - 오후; 소셜 북마크 진행 예정
    - 화면 설계 + ERD generate
    - 화면 그리기 (HTML/CSS + Bootstrap 5)
    - node + express (router)
    - passport, jwt 인증
      - 시간되면 소셜 로그인 연동까지
    - 세션; 레디스
    - 소셜 북마크는 12월 중순까지 쭉 감

- 러닝 리액트는 아마 다음주 목요일부터 들어갈 예정

  - 소셜 북마크 => 리액트로 변환 + 노드

- 팀 프로젝트

  - 멤버가 중요
  - 보통 3명이 적당
  - 화면 설계 (B4/A3 또는 Kakao Oven)
    - 6등분으로 그리기
  - 10월까지는 기획 및 설계 모두 완료해야 함
    - 기획 및 설계 시에는 코딩/구현은 생각하지 말기
  - 11월 ~ 12월 중순까지 본격적으로 코딩/구현
  - Admin

    - 관리용
    - 공지사항
    - FAQ
    - Admin에서 이미지를 App에 올림
      - CMS (Contents Management System)
    - 로그인 (순수 react + js)

  - Customer (App)
    - 고객용
    - 로그인 (react + ts)
  - Admin 역할분담 + Customer 역할분담
  - 기획 및 설계는 같이 진행

- 프로젝트 12월 중순까지 완성 X
  - 베타버전 느낌으로 태깅 처리하면 됨

### _본수업_

- 딥 다이브

  - 24장 클로저

    - mdn; JS는 Lexical Scope
    - 클로저; Lexical Scope <br/>
      함수와 함수가 선언된 위치 (호출 위치 X)

    ```js
    const x4 = 10;
    function f1() {
      x1 = 10;
    }

    function f2() {
      console.log(x1);
    }

    f1(); // undefined
    f2(); // 10
    ```

    ```js
    // 클로저
    function f1() {
      const x1 = 10;
      function f2() {
        console.log(x1);
      }
      return f2;
    }
    const f = f1();
    // f1이 스택에서는 없어졌지만,
    // 전역 declarative record의 f > f1 function environment record의 f2 참조 (아직 링크 남아 있음)
    // f2가 x1 참조
    f();

    // f2는 f1.x1 참조 가능
    // 사실 f1 내부의 const x1은 private임
    // 그것을 f2 중첩함수를 이용해서 접근할 수 있도록 해주는 것이 클로저임

    // 참고로 f1 내부에 다른 변수 있어도 아마 안없어질 것임

    // new로 만들었을 때 공유하게 됨 (그냥이면 따로 잡힘)
    // 클래스 === 생성자 함수
    ```

    ```js
    function F1() {
      let x1 = 10;
      // 생성자 함수
      function F1() {
        console.log(x1);
        x1 = 100;
      }
    }

    const f = new F1();
    const ff = new F1();

    // Object.prototype <- F1.prototype <- f.prototype (인스턴스)
    // Object.prototype <-  function.prototype
    // x1은 사실 function.prototype에서 생김
    // function.prototype => f.prototype (new하면 참조)
    // function.prototype => ff.prototype (new하면 참조)
    // x1은 function.prototype에 존재 (string임)

    // 너무 번거로움 -> 클래스의 탄생
    ```

  - 25장 클래스

    - ES6에서 등장

    ```js
    // typeof Animal => function
    class Animal {
      constructor(name) {
        this.name = name;
      }
      getName() {
        return this.name;
      }
      static info() {
        console.log('info');
      }
    }

    const a = new Animal('기린');
    const b = new Animal('사자');

    Animal.info();

    // Object.prototype <- Animal.prototype
    // function.prototype 쪽이 class 임 (재사용 되는 코드, 한번만 생성됨, 틀만 정의됨)
    // 반대편이 인스턴스 계열

    // static은 인스턴스 계열이 아니라 템플릿 프로토타입 계열에 속함
    // info는 인스턴스 계열로 가져오지 못하고 class 계열 (function.prototype)에서만 사용 가능
    // static은 인스턴스가 될 수 없음 (인스턴스 접근하는 것이 있으면 안됨)
    ```

    ```js
    class Dog extends Animal {
      constructor(name) {
        super(name);
        console.log('hi');
      }

      // 메서드 오버라이딩
      getName() {
        return super.getName() + ' dog';
      }
    }

    const dog = new Dog('Mary');
    dog.info(); // 안불러짐
    Dog.info(); // 가능 (Animal 모른다는 가정)
    dog.toString(); // 가능
    Dog.toString(); // 가능

    // Object.prototype <- 템플릿 라인 prototype <- Dog.class.prototype
    // static 아니면 constructor의 name, getName() 등 다 줌 (인스턴스에게)
    ```

    ```js
    // 캡슐화 (정보 은닉성)
    class Animal {
      #id = 1;
      constructor(name) {
        // target이 dog냐 cat이냐?
        // Animal로 직접 new하는 경우는 많이 없음
        console.log(new.target);
        this.name = name;
      }

      get id() {
        return this.#id;
      }

      set id(id) {
        this.#id = id;
      }
    }

    const a = new Animal('Mary');

    a.id;
    // a.id로 접근 불가 (# 붙이면 private 속성임)
    // 하지만 에러는 안남; get id() 있음

    a.id = 100; // id 값이 100으로 바뀜

    // # (private)은 상속 안됨

    class Cat extends Animal {}
    class Dog extends Animal {}

    // happy instanceof Dog
    // js에는 인터페이스가 없지만 TS에는 있음 => 오픈소스 (다형성)
    // TS로 먼저 코드 짜고 node ts로 tsc로 컴파일 해서 JS로도 사용 가능
    ```

  - 26장

    - rest parameter / spread operator

    ```js
    // 나머지 매개변수
    function f1(...args) {
      // arguments (유사 배열 객체)
    }

    const s = 'abc efg';
    const ss = s.split(' ');
    const x = ss[0];
    const y = ss[1];

    // const [x, y] = s.split(' ')

    // 만약 2개 이상 return 하고 싶으면,
    function f() {
      return [0, 0];
    }

    const [x, y] = f();

    // super(args)
    // constructor(...args){}
    ```

    - 디스트럭쳐링

#

### [Note]

- Moya (승완님, 권능님, 민수님)
- 데이팅 서비스 (찬우님, 서형님)
- 미정 (병수님, 승철님, 정은님)

- 찬우님 문제

  - S3 (PaaS)
    - image, html/css/js
    - 사용자; index.html (저장 -> EC2 -> RDS)
    - 압축; deplate? (용량 줄음)
  - Cloud Front (CDN)
    - 서울 ->
    - index.html -> Cloud Front -> S3
    - 빠르긴 할텐데 현재 문제 생김 (트래픽 초과?)
      - 네트워크 비용 과금
  - EC2 (IaaS); nginx, node
    - nginx 캐싱하므로 nginx 쓰는 것이 더 빠를 것임
  - RDS (MySQL)
  - 사실 굳이 S3 쓸 필요 없이 EC2만 써도 됨

- Domain / Context / Scope

  - 기준 존재
  - Context (문맥, 맥락); Global, Function 실행 컨텍스트

- Lexical; 말의 맥락이 존재

  - 점심 - 자장면 - 단무지
  - 단무지 말하면 위의 문맥은 추측 가능하지만 <br/>
    점심만 말하면 단무지 먹었는지는 유추 불가
  - 상위 스코프에는 접근할 수 있음

- Functional Language; 인공지능에서 파생되서 나온 개념

- getElementsByTagName

  - DOM collection (배열 유사한 객체임)

- Array, 정규표현식 (적당히)
- 비동기

### [Curiosity]

### _질문_

-

### _개인_

- 24장, 25장 딥 다이브 읽기
- 정적 메서드를 왜 사용할까? 이점은?
