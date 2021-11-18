## [21_11_18 목 오프라인 수업 20]

### _본수업_

- compose 함수

  ```js
  // ES6+
  const compose =
    (...fns) =>
    (obj) =>
      fns.reduce((c, f) => f(c), obj);

  // compose(f1, f2, f3)(obj)

  // ES5 (단, reduce 사용 금지, recursion 사용!)
  // 여러번 재귀 호출 돌릴 때는 항상 idx 필요
  // idx에 ++ 단항 연산자 사용하지 않도록 유의
  function compose() {
    var fns = arguments;
    return function rfn(obj, idx) {
      if (idx < fns.length) {
        return rfn(fns[idx](obj), idx + 1);
      }
      return obj;
    };
  }

  // 만약 compose()(u) 처럼 아무 매개값도 안넘겨주면? => {} 가 떨어짐
  // 참고) 상속 시 function(args) {
  // super(...args)
  // }
  ```

- 러닝 리액트

  - 리액트 훅

  ```js
  // useState
  // state는 상태값 (readonly)
  // useState() 안의 매개값은 초기값
  // 크게 보면서 속에는 어떻게 구현되어 있을까도 추측할 수 있어야 함! (소스 봐도 좋음)
  // 최대한 유추하도록 노력하고, 정 안되면 소스 보기

  // A.js
  const [state, setState] = useState(false);

  const useState = (initValue) => [
    this.state,
    // action 함수
    // (v) => this.state = v;
    (v) => this.setState(v),
  ];

  // useRef <- react-hook-form
  // 하나 칠 때마다 set이 일어나서 컴포넌트가 다시 그림
  let x;
  <input
    value={state}
    type="text"
    onChange={(event) => setState(event.target.value)}
  />;

  // name 프로퍼티가 state가 됨
  // 속에서는 props도 다 state됨
  // 상태가 바뀌면 다시 그림 (prop도 상태!)
  <MyCompo name = {x} />
  <div>{name}</div>

  // Custom Hook
  // 중복코드에서 힌트 얻기! (훅킹할 수 있는 것은?)
  // form-hooks.js
  const [stateProps, resetState] = useInput('')
  const [nameProps, resetName] = useInput('')
  <input {...stateProps} type='text' />
  <input {...nameProps} type='text' />
  const useInput = (defValue) => {
    const [value, setValue] = useState(defVal);
    return [{value, onChange: (event) => setValue(event.target.value),
    () => setValue(defVal);
    }]};

  // {} or [] 어떤 것을 쓰든 상관없음

  // 같은 성격의 훅은 함께 모으기
  export useInput;
  // utils.js에 30개넘게 다 때려받는 것은 사실 좋진 않음
  // math, date 등 관련된 util 따로 분리해놓기
  // import {useInput} from './form-hooks.js';


  // 여러 input form들이 있고 submit누르면 input 내부 값 모두 초기화 시켜야 함
  // reset 함수 만들기
  const defaultState = '';
  const resetState = () => setState('');

  const submit = (event) => {
    event.preventDefault();
    // 서버 관련 코드
    resetState();
  };
  ```

  ```js
  // useContext

  // useReducer

  // useEffect
  useEffect(() => {
    // fectch (...);
    // state observing
  }, [state]);

  // 3분 제한시간 => 초기값 (시간) 바뀔 때만 하도록 하기
  useEffect(() => {
    const timer = setTimeout();
    // return 해주게 되면 항상 will destroy
    return clearInterval(timer);
  }, defTime);

  // useLayoutEffect

  // useMemo
  useMemo(f, [studentData]);
  ```

#

### [Note]

- 3개월 미만 근무하면 인턴십이라고 써야함...
- 입사 후 그 회사의 도메인 지식, 소스코드 분석 필요
- 만약 책 보기 등 하다가 졸리면 코딩하기
- 화살표 2개면 커링임
- reduce 함수가 함수형 프로그래밍의 백미임
- 리액트 공식 깃헙 소스 보기!
- 커스텀 훅이 리액트의 핵심임 (16.x 이후)
- 리액트는 미시적이 아니라 거시적으로 넓게 보아야 함
  - 함수 단위로 크게 크게 보기 (함수형 언어)
- 그린다는 표현
  - 메모리상 DOM에 무언가 변화 일으킨후 그림
  - rendering, painting
  - rendering
    - React는 VDOM을 가지고 있음 (ReactElement object 구조)
    - 아직은 안그림 (VDOM 가볍게 다룸)
- 커스텀 훅 만들고 시작하는건 별로 안좋을 수 있음
  - 커스텀 훅 만드는 것에서 시작 많이 소요될 수 있음
  - 커스텀 훅 빨리 잘 만들면 정말 최고
  - 훅 네이밍은 항상 use로 시작
- 먼저 사용할 것을 먼저 쓰고 구현을 나중에 쓰기!
  - 선언형으로 코드 구현!
- export default, export
- TDD (Test Driven Development)
  - unittest 짜놓고 가도됨
- 참고
  - a.js 에서 useInput()해서 씀
    - 그 속에서는 이미 state 생김
    - onChange 함수 만들어서 실행
    - useInput() 안에서 뭔가 바뀌면 바뀌는건 여기지만
  - input 여러개 있으면 그 바뀐 input 태그만 바뀌지만, <br/>
    사실 코드들은 모두 실행되긴 함
- registry 에 state 등록
  - 옵저버패턴임
  - rerender
- useInput('', 'text') <- type까지 리턴
- npm 가서 읽어보기
  - react-hook-form
  - react-slick
  - axios
  - react-query
- 컴포넌트 상태 주기 (생명 주기)

  - 생성 (create) // didInsert()
    - 컴포넌트 메모리에 없어서 만들어서 브라우저에 등록함
  - 변경 (update) // didUpdate()
    - 상태나 프로퍼티 변경됨
  - 변환 (transition) / willTransition()
  - 소멸 (destroy) // willdestroy()
    - 메모리에서 G.C가 돌 수도 있음
    -

- 부모는 브라우저임 (파일이 아님)
- will update 없음 (모름)

### [Curiosity]

### _질문_

-

### _개인_

-
