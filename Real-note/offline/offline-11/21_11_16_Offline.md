## [21_11_16 화 오프라인 수업 19]

### _공지사항_

- compose 과제 -> 목요일까지/목요일에 과제 답안 공개
- git 평가 문제 설문 폼

### _본수업_

- 러닝 리액트

  - JSX도 속에서 DOM 트리
  - 모든건 다 컴포넌트 (컴포넌트 트리)
  - 컴포넌트 하나가 함수이자 리액트 엘리먼트임
  - 그리기 (ReactDOM.render(<App/>, document.getElementById()))
  - CRA (Create-React-App) <- npm, npx, yarn 모두 가능
    - npx는 다른 참조 모듈까지 같이 가져오서 더 편함
    - yarn은 빨리 설치하기 위해서 함 (큰 의미는 없음)
    - 현재는 react, react-dom 자동 설치되어 있음
    - npm [--save] <- default
    - `npm i [모듈이름] -D // 빌드할 때만 필요
    - eslint, prettier 등 빌드할 때만 설치
    - index.html은 제일 상위에 생기고
    - src에는 index.js, components/~~, styles 등 생김
  - create-mf-app
    - 어떤 프레임워크로 개발할지 선택창 나옴
    - 조금 더 상위버전임
  - .js, .jsx
  - js compiler 이용해서 돌린다면 .js -> .jsx (설정 가능)
  - JSX
    - js 와 html 공존
    - 중괄호 { } 이용
    - 리액트 15 버전까지는 컴포넌트는 클래스, 현재는 16버전이고 함수임
  - VDOM은 Map이라고 생각
    - key value 쌍

  ```js
  // export default => import에서 {} 없이 바로 가져오기 가능
  // export => import {name} from './hi.js' 로 가져옴

  // js 표준에는 사실 import 없음 => require() 이용

  // watch, nodemon (즉각 업데이트, 계속 보고 있음)

  menus = [{ id: 1, name: 'kim' }];
  menus.map((menu, i) => (
    <>
      <Menu {...menus} keys={menu.id} />
      );
    </>
  ));
  // 과거에는 <React.Fragment> </React.Fragment> 로 감쌌음
  // 컴포넌트 트리는 트리 자료구조임

  // 최근에는 리액트 파일도 검색엔진이 조금씩 타지만
  // 아직은 잘 안되기에 Gatsby나 Next.js 이용

  // checked={true} 는 checked로 생략 가능

  // index.js - App.js - Store.js - Menus.js
  ```

- 웹팩, 바벨

  - 웹팩
    - 모듈 번들러
    - 소스 코드 분리
  - 바벨

- 리액트 상태관리 (6, 7장)

  ```js
  // 컴포넌트가 가지고 있는 상태

  // 상태 관리 훅 (리액트 훅)
  // useState() - 상태값, 상태값 변경하는 setter

  // useRef() - DOM 직접 조작

  export default ReadBtn = () => (
    // 첫번째는 변수, 두번째는 함수
    const [didRead, setRead] = useState(false)
    return (<button
      className={didRead ? 'red' : 'blue'}
      // 토글버튼
      // onClick={() => setRead(!didRead)}
      // onClick = {f => ff} <-- 실행시키고 싶지 않을 때 씹히기
      onClick = {read}
    >
      READ
    </button>)
  );

  const read = (event) => setRead(!didRead)

  // const f = ff => ff
  function f(ff) {
    return ff;
  }

  const x = f(alert)
  x('aa')

  // [didRead, setRead] = () => [
  //    this.state.didRead,
  //    (v) => this.setState('didRead', v)
  // ]

  // 상태를 작게 작게 가져가야 함
  // 컴포넌트도 작게 작게 가져가기!

  // const [title, setTitle] = useState('to Read') 를 Read 컴포넌트 안에 작성해야 함

  // 너무 번거로우므로 useEffect() 이용

  // input은 onChange임 (onClick이 아님)
  // input 태그에 value 쓰면 계속 다시 그려서
  // ref 사용함
  // inpRef.current.value
  // title 바로 걸면 다시 리렌더링 일어나므로
  // title 참조 걸음

  // form에 input 많고 마지막에 submit 있음
  // 모두 ref로 걸면 바뀔때마다 안바뀜
  // submit 할때는 바뀜
  ```

#

### [Note]

```js
// compose ES6+ 버전
const compose =
  (...fns) =>
  (obj) =>
    fns.reduce((c, f) => f(c), obj);
```

- 취업 (쫄지말고 당당하게! 최선을 다해서! 끝까지!)

  - 코딩 테스트 (코테, 알고리즘)

    - 프로그래머스 하루에 1문제씩 풀기 추천
    - 어려운 문제는 천천히 풀어도 괜찮음 (집중해서 파고드는 것이 중요)
    - 완벽함 필요없음

  - 과제 전형
    - 핵심이 되는 것을 위주로 코드 짜기!
      - 바쁘면 최대한 수행한 부분까지 제출
    - 자기의 주관을 관철할때와 양보할 때를 잘 구분!
    - 완벽함 필요없음
  - 구술 시험
    - 전화 면접
    - 줌 원격 비대면
    - Offline

- 패스워드 암호화

  - crypto 모듈 vs. bcrypto 모듈
    - crypto 모듈; 가벼움
    - bcrypto 모듈; 무거움 (CPU 많이 먹음)
  - 암호화 속은 Hashing
    - 뭔가 돌려서 unique한 값이 나옴
    - key / value 쌍
    - Map
      - Hashing (Heap에 있는 데이터의 주소 이용); key 뽑아내기
      - 해시 충돌 방지 방법

- 환경 변수 설정 방법

  - env.local
    - 개발하고 있는 PC
    - ex) confpath
  - env.dev
    - 개발 서버 (테스트)
    - ex) autono
  - env.prod
    - 서버에서 서비스할 때
    - ex) apiurl
  - 파일의 위치는 서버마다 다름
  - local은 굳이 필요없고, dev와 prod는 올려야 함
  - yarn dev, npm run dev => 명령어는 package.json에 정의되어 있음
  - 각 환경변수 값은 다름 (키는 다름)
  - git은 항상 dev, prod 두개에 대한 환경변수 값 가짐
  - build: babel + webpack

- token

  - 서버가 여러대면 redis에 담음
  - 영구 지속위해 redis 쓰기도 함 (cf. 세션 expire 잡기)

- node 서버 닫히면 소켓/웹 소켓 바로 닫히고 node 열리면 소켓도 열림

- 왜 개발자가 되고 싶나요?

  - 재미 X
  - 나에게 맞는 일이 되어야 함!
  - 자신감! (알든 모르든 항상 적당한 자신감!!!!!! 욕심이 크면 쫄음)
  - 모르면 다음에 공부해서 다시 도전!
  - 너무 겸손해서도, 너무 잘난체하면 안됨
  - 자신감은 있어야 문제 해결 능력이 나옴
  - 세상에 정답은 없음, 생각하면 어느정도는 답 나옴

- 회사 떨어져도 다시 지원해서 도전하기!

- 인간관계는 일상생활

  - 내가 이 사람이 좋든 싫든 무조건 줘야 함
  - 힘들어하면 도와주기
  - 도와주지 못해도 도와주는 노력이라도 해야 함
  - 노역과 도움을 구분할 줄 알아야 함
    - ex) 이사하는데 사장님이 오라세요..
  - 가족을 중요시 여기기

- 면접볼때 5분만에 나옴

  - 태도 매우 중요

- 면접보러 갔으면 진심으로 대해야 함

- 업계는 작음

  - 항상 또 만남

- 퇴사하는 사람은 항상 잘해주기!

  - 사과할 건 사과하고, 화해하고 보내기

- 내가 싫으면 싫다고 말해야함 (죄책감 X)

- 남에게 업무를 위임하는 것도 중요한 능력임

  - 내가 시간이 부족하거나 등..

-

### [Curiosity]

### _질문_

-

### _개인_

- MySQL
  - id를 int UN AI로 PK로 잡음
    - 테이블끼리 조인할려면 항상 함께 묶어야 함 => 복잡성 최소화
    - 메모리 많이 먹음 (과거에는 복합키 => 인덱스 여러개 부담...)
    - ORM
      - array.find(id)로 바로 찾아갈 수 있음
      - ex) 학생: {id: {}} 쭉 들어가면 CPU 많이 먹을 수 있음
      - object 다 타고 들어가서 찾으려고 하면 복잡함
      - id 알면 Map/HashMap으로 바로 찾아갈 수 있음
      - 코드량 늘어남
  - 데이터 효율성 위해
