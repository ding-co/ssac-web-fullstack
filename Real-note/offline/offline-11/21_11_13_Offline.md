## [21_11_11 목 오프라인 수업 18]

### _공지사항_

- 정말 급한 용무 -> 삼각지역 8번 출구
- 싹 센터에 월~토 개인 자습 가능
- 21일까지는 밤 10시 / 22일부터 밤 11시까지 센터 운영
- 수료 후에도 가끔 Meet Up 열어서 네트워킹 가능
- 실습 영상 따로 제작 힘듦
- 오프라인에서 이론 먼저 하고 실습 간단히만 함
  - 이후 뒤에 가서 실습을 또 따로 진행할 예정
- 이론 + 실습을 하나로 묶어서 유튜브 업로드 예정
- 화/목은 이론 위주, 토요일은 실습 위주 (소셜 북마크)
- 11/20 토요일 회식 예정
- 11/25 목요일은 행사 6시 전에 끝나면 오프라인 될 수도 있지만 <br/>
  현재는 온라인 줌 잠정적 예정
- 매주 토요일 팀 프로젝트 관련 컨설팅 => 1000 ~ 1130 정도 가능
- 매주 토요일 10시 전에 선생님 오실 예정이니, 팀플 및 개인적인 질문은 선생님께 개인적으로 슬랙

### _본수업_

- 러닝 리액트

  - 함수 커링 & 컴포즈

  ```js
  // Curring

  // 중국집, 이탈리안 레스토랑
  // 처음에는 어디로 들어갈지가 중요 (첫 진입점이 중요)
  // 그 다음에 주문이라는 함수를 호출함
  // 바깥쪽 함수, 안쪽 함수 2개가 됨

  // store는 중국집, 이탈리안 같은 매개값임
  // 화살표 2개 연결되면 커링임
  const order = (store) => (menu) => console.log(`${store}-${menu}`);

  order('중국집')('자장면');

  // 위 코드를 ES5로 작성할 수 있으면 실행 컨텍스트를 그릴 수 있음
  // ES5는 화살표 함수 아직 못씀
  function order(store) {
    return function (menu) {
      console.log(`${store}-${menu}`);
    };
  }

  // 코딩 읽는 방식 => 밖에서 읽다가 안에서 다시 밖으로 익어야 함
  // 클로저를 사용해서 내부 함수가 외부 함수의 변수 읽기 가능

  // 중복 코드 많아질 수 있음...
  order('중국집')('짬뽕');

  // 함수는 항상 동사부터 시작 (함수명)
  const orderCh = order('중국집');

  // 아직은 orderCh 타입은 함수임

  orderCh('짬뽕');

  const orderIt = order('이탈리안');
  orderIt('스파게티');

  // 예) 배민같은 어플의 그 가게 메뉴만 나오도록 구성

  // 만약 PWA나 앱 등으로도 활용하고 싶으면 위와 같이 코드 짜서 로컬 스토리지에 담아두기

  // JS로 게임 만들 때 많이 활용 (앱도 마찬가지)
  // 게임은 업데이트(패치)하지 않은 이상은 바뀌지 않음
  // ex) 도끼, 망치를 게임 앱에 그냥 심어버림
  // 업그레이드 해야 칼 등 생김

  // 다크모드로 들어간 다음에 라이트 모드 등 모드 처리 관련에도 활용 가능
  ```

  ```js
  // Composition
  // Composition 도 ES5로 변환하는 연습

  // 예제
  // f1: fullName
  // f2: appendAddr
  // f3: removeNames

  // 만약 주소 필요 없으면 f1하고 f3 타면 됨
  // 만약 다 필요하면 3개 다 탐

  // 함수 내부에 명령형으로 3개 함수 코드 짜놓으면 안좋음
  // 버전업 하고 자유롭게 모듈처럼 갖다가 쓰도록 하기 위해서는?

  // u 필요하면 맨 뒤에 넣기
  // u = {id:1, firstName: 'Gil-dong', lastName:'Hong'}
  const data = compose(fullName, appendAddr, removeNames)(u);
  // removeNames 뒤에 , 붙여도 되고 안붙여도 되는데 보통 붙이긴 함
  // 만약 각 함수 속에 프로미스까지 해놓으면 너무 편함 -> 가독성이 매우 좋음

  // data 가지고 이제 setState 등 이용해서 뿌리면 됨

  // 하나로 있는 것을 3개의 함수로 쪼개는것 (리팩토링)
  // 서버 API 구축 시 함수 매개변수로 caller 세팅하고 내부 코드에 일일히 조건문 처리하면 매우 불편...

  // 처음부터 한번에 명령형으로 먼저 해놓고 나중에 함수형으로 리팩토링하기
  // 처음부터 선언형으로 하려고 하면 매우 잘 안됨

  // 동사형
  // fs는 보통 노드 예약어 같이 file system 지칭

  // 사실 user 붙이면 안됨 (compose의 본연 목적에 위배)
  // 화살표 2개 이상 연쇄 => 커링

  // ES6버전 compose 함수임
  const compose =
    (...fns) =>
    (obj) => {
      // 만약 함수 1개이면 그냥 return 하면 됨
      // 만약 함수 여러개면 array 메서드의 reduce 메서드 활용하기

      // reduce 메서드
      // 만약 초기값이 primitive type이면 그냥 주고
      // 만약 reference type이면 그 값이 함수의 매개값으로 들어가서 호출됨

      // 현재 로직보면 u -> fullNmae -> appendAddr -> removeNames
      fns.reduce((composit, fn) => {
        fn(composit);
      }, obj);
    };

  const fullName = (user) => ({
    ...user,
    fullName: `${user.firstName},
               ${user.lastName}`,
  });

  const appendAddr = (user) => ({
    ...user,
    addr: `Seoul`,
  });

  const removeNames = (user) => {
    delete user.firstName;
    delete user.lastName;
    return use;
  };
  ```

- 리액트의 작동원리

  ```js
  // 리액트는 View 영역
  // MVC 패턴에서 View
  // M 영역을 커버하는 것이 Redux - 상태까지 관리
  // Redux 는 중간지에 미들웨어를 둘 수 있음 => 좀 많이 무거워질 수 있음

  // 예전엔 클래스형 컴포넌트 사용했었음 (15까지)
  // 현재는 함수형으로 컴포넌트 구성 (16 버전부터)
  // 16 버전에서 Context API 추가됨

  // Context API, useReducer() 등 리액트 훅 많이 사용
  // 훅 잘못 사용하면 브라우저 죽을 수 있음 (잘못하면, 메모리 관련 문제, 화면 계속 다시 그리는 문제...)

  // useEffect(), useLayoutEffect() 할 때 라이프 사이클 개념 나올 것임

  // 클래스형 컴포넌트 -> 함수형 컴포넌트로 바꿀 수 있어야 함

  // React 는 2013년도에 나옴, CRA (Create-React-APP) <- Amber cli에서 온것임

  // 올해 초까지는 immutable.js 많이 썼었음
  // moment.js (날짜 시간 처리)
  // fetch 안쓰고 Axios 많이 씀

  // IE는 보안에 취약해서 쓰면 안됨

  // ESNext -> ES5 로 변환 필요 (Babel 이용)
  // React는 2013년, Babel은 2014년에 나옴, ES6는 2015년에 나옴
  // 2013년도에 JSX (JavaScript XML) - JS 코드 안에 HTML 쓸 수 있도록 해줌
  // 바벨이 JS 표준 넣어줌, 따라서 JSX로 짜도 트랜스파일됨

  // babel.min.js (과거에 보통 import 해서 썼었음)

  // Webpack
  // js 파일들 순서에 맞게 하나로 쭉 모듈 번들러
  // 코드 minify (축소)
  // 컴파일도 한번만 하면 됨

  // sass -> css, image 등 기능 모두 다 포함

  // CRA React 만든 것 -> build 하면 bundling
  // bundle.js 사실 이렇게 이름 쓰지는 않고 회사이름.js, 회사이름.min.js (코드 축소화)

  // 회사이름.map.js - 디버깅 할 때 활용 (각 파일이 어디에 속하는 건지 나옴)

  // SPA (Single Page Application)
  // a.jsx ~ z.jsx (여러 파일들 있음, jsx: html + js)
  // 웹팩이 하나로 묶어주는데, 라우터 이동할 때마다 서버 갔다오는 것은 아님
  // api call 할때만 서버 잠시 갔다오는 것이지 html 다시 가져오지는 않음
  // 네트워크 비용 축소
  // 하지만 화면을 갱신하면 다시 처음부터 다 받아야 함

  // 검색 엔진 취약 => SSR, SSG 나옴

  // SSR (Server-Side Rendering)
  // 서버가서 페이지 받아오므로 다 검색 엔진에 걸리게 됨

  // 서버에서 렌더링한다 => Next.js
  // Next.js로 SPA로 할지 SSR 할지 다 설정 가능

  // 웹펙이 빌드할 때 DB 갔다와서 li 리스트 태그 관련 데이터 가져옴
  // 하지만 Next.js는 자동으로 다 해줌 (SSG)
  ```

  ```js
  // JSX

  const boards = [ {id: 1, title: 'title'} ]

  <h1>{user.name.toUpperCase()}</h1>
  <ul>
    <li>{boards.id}</li>
    <li>{boards.title}</li>
  </ul>

  // <h1>홍</h1>
  // id
  // title

  // React가 createElement() 이용해서 다 그린것임 (사실 내부적으로)

  // 이름 홍을 김으로 바꾸고 싶으면 어떻게? -> 다시 그려야 함
  // 리액트는 다 React Element 로 되어 있어서 저 h1 태그 부분만 바꿀수는 없음

  // 태그명, id/className, children
  // React.createElement('h1', {id: 'name', className: 'hi'})
  // 3번째 인자부터는 다 children 임

  // composition 처럼 보임
  // 앞의 결과가 뒤의 입력으로 들어가는 것은 아니지만
  // 순서가 중요함 (정확히 함수 compose는 아니긴 함)

  // import {createElement} from 'React';
  // createElement('ul', null,
  //      createElement('li', null, bs[0]),
  //      createElement('li', null, bs[1]))
  // );

  // 이름이 바뀜
  // 저만큼의 object를 변수로 받고 따로 바깥에서 함수 이용해서 처리
  // h1(props) {}

  // JSX 특징 - 태그를 함수로 인식함
  // 필요하다면 React가 짜준 것임 (필요없는 것은 createElement() 이용)

  // 만약 custom tag 만들고 싶으면 function xxx() {}

  // 값이 바뀌니깐 props를 따로 받아서 함수에서 처리해서 변경하는 것임

  // h1 태그 내부 값이 h1 함수의 return 값임

  // 변하는 값이 있으면 다시 그려야 하니깐 function xxx(props) {} 로
  // props를 받아야 함

  <div>
    <span></span>
  </div>

  function xxx(props) {
    return (<div><span>{}</span></div>)
  }

  // xxx를 React DOM의 이벤트 리스너로 등록

  // 변하는 값을 props로 따로 함수에서 받아서 처리

  // 전체를 다시 그리면 속 편한데 저 부분만 따로 받아서 처리하는 것이
  // DOM은 무거워서 그릴 때만 DOM 사용
  // 함수 속 태그들은 모두 Virtual DOM에 있음 (React DOM)

  // VDOM <- ReactDOM.render()
  // 함수들을 실행 컨텍스트에 올려서 ~~

  // DOM은 무겁다, 그래서 VDOM 사용 (React 에서)
  // getElementByID 등은 Map에 담아서 찾기 빠름 (캐시)

  // return 스트링 일종
  // 바뀐 부분만 그림 => 그래서 VDOM 필요함

  // children 찾는데 시간 많이 뺏길 수 있음
  // 그래서 li 태그에 key={bs.id}
  // list(array) 키 값을 보고 Map에 저장되서 바로 찾아갈 수 있음

  // VDOM은 속에서 Map임 (그래서 빠름)
  ```

#

### [Note]

- 어떤 언어라도 최대한 선언형으로 짜기
  - 물론 함수 속 코드는 명령형이어도 선언형으로 짜야 함!!
  - 훈련이 많이 필요함!
- 함수형/선언형 프로그래밍
- 자바는 선언형으로 짜기 힘들어도 람다 등 이용해서 선언형으로 짤 수 있음
- 자바스크립트로 선언형으로 짠 코드를 다른 언어 선언형으로 변환해서 짜보기
- 자바스크립트 백미 - array의 reduce 메서드 등...
- 레거시 코드 (기존에 짜져있는 코드)

- 미들웨어 (중간에 끼어 들어가는 것)

- 리액트 컨퍼런스 등 참여해보기 (재밌음)

- SPA 비교

  - 사실 프레임워크는 코드 스타일만 다를뿐 다 똑같음
  - 하나만이라도 제대로 하면 좋음
  - Vue
    - 가벼움
    - 근데 자동화 되어 있는 것이 별로 없어서 일일히 다 짜야함 (귀찮음)
    - 매력적이긴 하지만 귀찮음
    - Vuex 이런것 붙이고 덕지 덕지... 노가다가 되버림
    - 명령형...
  - Angular
  - React
    - 전세계적으로 대부분 다 React 이용 (대체 인력 뽑기 쉬움)
    - Vue 보다는 괜찮음
    - 함수형 언어로 작성 가능
    - 리액트 잘하면 Vue 훨씬 쉬움
    - 먼저 마스터하자!
    - 다른 프레임워크들을 렌더링이 점점 더 빨라져서 react가 느리다는 이야기도 있음
  - Ember

    - convention/규칙 기반, 자동화가 많이 되어 있음
    - TS도 다 자동으로 만들어줌
    - 귀찮은 작업없이 코딩만 신경 쓰면 됨
    - 실행 엔진 파일 클 것임 (전체적으로 무거울 것임, Redux 이런건 사용 X)
    - 페이지 로딩 속도 느릴 수 있으므로 아주 가벼운 Vue 로 짬
    - 우리나라 거의 대부분 사용 안함
    - 공부 차원으로 도전은 나쁘지 않음, 재밌음
    - 최근 넷플릭스 Ember + React
      - Ember; 글리머 이용해서 렌더링 속도 빠름

  - Svelte

- 게으른 개발자; 단순 반복 싫어해서 다 자동화함

  - ex) 서버 - 서버 사이에 DNS/L3,L4 등 제어해주는 장치
  - 서버 - DB 사이에 OLTP 같은 것이 있었음 (트랜잭션 관리 위함)
  - DB 병목 자주 생김
    - socket 쓸때 부하 많이 받으면 병목 생김
    - Map 대신해주는 것이 Redis 같은 메모리 DB
      - 게시판 첫 페이지는 Redis 같은 곳에 담아두기
  - 통합 DB / 분산 DB
    - 통합 DB
      - MySQL Replication
      - 마스터는 R/W, 슬레이브는 Read만 가능
      - ex) 보통 insert 하고 회원수 cnt 증가
        - 만약 cnt 먼저 주면 rollback 해서 해야 하는데 그게 안될 수 있음
        - Delete 해서 insert 한 것 다시 뺄 수 있는 문제... (쿼리 많으면 복잡)
        - 참고) JOTM (Java Object Transaction Management)
        - 트랜잭션I, 트랜잭션D => middleware.i(), middleware.d() 가능

- 취업 관련

  - 신입 잘 안뽑긴 하지만 회사 적당히 보면서 넣기 (너무 많이 넣지는 말기)
  - 취업에 너무 조급하면 안됨
  - 첫 직장이 매우 중요함
    - 단기적으로 1~2년 있더라도 이때 개발자로서의 방향 및 습성이 결정됨
    - 이것이 평생을 좌우함
    - 회사가 너무 좋아도 나한테 안맞을 수 있음
      - 1~2년 동안 내가 character 잘못 형성해 온 것임
      - 그 1~2년동안의 생활이 매우 중요함
      - 지각 많이 하면 평생 지각 많이할 수 있음
      - character(습성)와 인맥도 형성됨
  - 서버는 보안에 민감해서 소스 잘 볼수 없음
  - 백엔드 + DevOps + DBA 능력 모두 갖춰야 함
    - DevOps 가더라도 분명히 백엔드 기회가 올 수 있음
    - git 브랜치 merge 등 빌드 및 테스트 통합 다 해봐야함
  - FE쪽은 퍼블리셔로 시작하면 FE로 넘어가기 힘들 수 있음 (기회 부족)
  - 취업
    - 스타트업 인 하우스
    - 개발 능력 부족하면 외주를 주긴 함 (서버쪽 필요한 기능)
    - 약간 반반치킨 느낌이 됨
    - 여기까지가 고전적인 스타트업 메인 주류였음
    - 예전엔 무조건 자기 기술의 특허 싸움이었음
    - 특허 유지하다가 회사 망하는 경우도 많았음
    - ~2010년 초까지 이렇게 되다가 2010년 초 ~ 2017년까지는 <br/>
      외주를 많이 줌 (개발자가 비쌈)
  - 개발자가 자주 안된다고 하면 되는 프로젝트도 안될 수 있음
    - 외주할 때 소스코드 저작권까지 걸고 계약하고 그럼
    - 외주 회사 망하고 등 여러 문제 생겨서 이제는 내재화를 해야 함
    - 개발자 많이 뽑기 시작, 괜찮은 개발자들은 다 메이저로 감
    - 법인 회사 대표들의 망한 이유
      - IT 개발 시스템에 돈을 많이 투자
      - 실력 있는 개발자들은 연봉이 엄청 높음
      - 스타트업에서 정말 괜찮은 개발자들 없음
    - 그래서 이제야 우리 신입도 인터뷰할 기회가 생긴 것임
    - 경력 개발자 없어서 사수 없는 경우가 많음 (대부분)
  - 면접 볼 때 개발 팀 구성 파악하는 것도 중요함
    - 명함 받아두기
      - 명함에 회사 느낌이나 정보 등 적어두기
      - 명함으로 회사 지원 등 관리
    - 회사 떨어져도 다시 전화올 경우 있음
  - 보통 면접볼 때 CTO가 오면 사수 없는 경우가 많음
    - 팀장, 실장 등 있으면 사수 가능성?
  - 실력 있는 개발자와 있으면 그 주파수가 비슷해져서 다른 회사를 이직해도 <br/>
    실력 있는 개발자 또 있을 확률 높음
  - 내가 만난 인맥이 앞으로 비슷한 인맥을 만나게 될 확률이 높음
  - 주니어 개발자들만 많은 젊은 분들이 많은 곳을 가면 사실 남는건 없음
    - 다 고만고만함, 리스펙트 할 사람 있는지 존재 여부도 불확실
  - 항상 심심할 때 미리 이직할 회사들 알아봐야 함
  - 회사 정 때문에 이직 못하는 경우도 있음
    - 발전을 위해서는 이직을 해야 함
    - 이직해도 친한 사람은 만날 수 있음
    - 추천 인재 못 끌어와도 예의 안지킨 것이 아니라 아무 상관없음
  - 해외로 갈 수 있으면 갔다오는 것도 좋음
    - ex) 미국 실리콘밸리 본사, 한국 분사
  - 가장 중요한 것
    - 테크 트리: 내가 타고자 하는 테크 트리를 생각 (내가 하고 싶은 것)
      - 만약 내 주류 언어 아닌 언어나 기술을 사용하는 곳이라도 죽어라 배워서 해야 함 (취업 성공시)
      - 내가 잘하는 것만 하면 풀스택이 절대 안됨
      - 본질(개념)은 동일함, 배울게 많은게 중요
      - 내 메인 기술이 아니라도 일단 최소 몇달은 다녀봐야 함
      - 오해 가능성 (사실은 아님, 가능성)
        - 안좋은 회사들이 오히려 들어온 신입들 잘해줌
        - 좋은 회사들은 오히려 쌀쌀하게 대해줄 수 있음
  - 가고 싶은 회사 다 Try 해보고, 회사가 나를 원하는 것이 아니라 <br/>
    내가 이 회사를 원해야 함 <br/>
    만약 다 Try 했는데 다 떨어지면, SI 나 다른 안좋은 회사 갈까??
    - 그런 아래 회사 가기 전에 먼저 성호님께 상담 받고 진행...
    - 실력 있으면 추천도 가능하지만 만약 그 인재가 못하면 오히려 추천한 사람이 욕 먹음
    - 퇴사 이직 관련 다 상담해보기 (성호님께)
  - JS를 깊게 한다고 해도 어느 선에서 멈춤
    - 다른 언어나 프레임워크도 계속 해야 더 깊게 들어갈 수 있음
    - 하나만 한다고 되는 것이 아님
    - 여러개를 해야 다 깊어지는 것임 (하나만 하면 어느 시기에는 한계 봉착)
    - 생활의 20%는 공부, 독서, 친구/인맥 등에 활용해야 함
  - 만약 내가 백엔드를 맡았는데 JS 프론트엔드를 하고 싶음
    - 그럼 백엔드 안에서 진행되는 여러 부서간 요청이나 그런 프로세스들을 <br/>
      내가 프론트엔드 예를 들어 리액트로 만들어서 업무에 활용해도 괜찮음
    - 시간 여유로울 때는 vue로 되어있는 것을 다른 것으로 변환해보는 것도 좋음
    - 이미 관리자 있는데 만들면 그냥 개인적으로 관리자 브랜치 만들어서 <br/>
      관리자에게 한번 물어보기 (하고 싶어서 해봤다 솔직히 말하기) <br/>
      -> 코드리뷰 받고 등...
    - 나중에 회사 임원급으로부터 좋은 이미지 받으면 연봉 인상 등 유리함
    - 자기 주도적으로 스스로 일을 찾아서 해야 함
    - 시킨 것만 하지 말고 능동적으로 해야 함
  - 회사가 좋아야 하고 테크 트리가 좋아야 함
    - 테크 트리는 언어만 보는 것이 아니고, 매일 이상한 잡무만 시키고 그러면 별로임
  - 도전이 중요함
  - 창업
    - 지분이 많이 분리되어 있으면 사실 투자 많이 받기 힘듦

- useLayoutEffect() 할 때 reflow 앞, useEffect()할 때 repaint 앞

### [과제]

- compose 함수 ES5으로 짜보기 (재귀 이용)
