## [21_11_27 토 오프라인 수업 23]

### _공지사항_

- 1000 ~ 1700

  - 오전: 이론 수업
  - 오후: 실습

- 12/14 화, 12/16 목 (마지막 주)
  - 프로젝트 발표

### _본수업_

- 러닝 리액트

  ```js
  // useEffect

  // useLayoutEffect

  // 마운트 되고 렌더링 하기 전/후

  // loading = true
  // useEffect에서 setLoading(false)로 바꿈
  // isLoading ? spin 버튼 돌고, 아니면 리스트 렌더링

  // 데이터 많이 가져올 떄 (fetch)
  // 로딩 많이 걸릴 수 있음

  // useEffect() <- DOM 다 처리 후에 화면에 그림
  // 의존 관계 배열 => [data]
  // 한번만 타게 하고 싶으면 []로 설정

  // useLayoutEffect()는 실제로 DOM에 그리기 전, Virtual DOM 그 단계임
  ```

  ```js
  // 리액트 고급 과정 (성능 개선 위해 마지막에 고려!)
  // 처음에는 reload 되게 짜다가 나중에 데이터 많아질 때 시도해보기
  // 처음부터 한번에 이렇게 코드 짜려면 정말 힘듦 (부담 커짐)

  // 사용자들이 많은 시스템에서 이런 훅들 많이 있음

  // useReducer
  // 세션 로그인 기능 구현시, context에 useReducer 사용해서 만들수도 있음

  // 활용
  const [checked, setChecked] = useState(false);
  <input
    type="checkbox"
    value={checked}
    checked={check}
    // onClick={() => setChecked(!checked)}
    onChange={() => setChecked((checked) => !checked)}
  />;

  // checkbox에 check 하는 순간 setChecked에 true로 바뀜
  // onClick은 a와 button 태그 에만 보통 적용
  // react에서는 onClick 걸려면 버튼으로 만들라고 권장함
  // 그래서 이미지 2개로 체크 버튼 처리하기도 함
  // onChange => 무한루프 돌 수 있음
  // 따라서 setChecked() 내부를 함수로 짜야 함
  // 그러면 저 내부 함수만 타고 끝!
  // 하지만 너무 번거로움

  const [num, setNum] = useState();
  // onClick={() => setNum(num + 100)} <- 좋은 코드 X
  // setNum은 어떤 값을 받아서 기존값에 더하는 것임
  // setter에 비즈니스 로직 많이 들어갈수록 안좋은 코드임
  // 가져오는 과정에서 많은 일을 하면 안좋음
  // 권한 체크 같은 것도 별도로 분리해서 하는 것이 좋음

  // setter 안에 비즈니스 로직을 또 주면 안좋음
  // 함수는 한가지 일만 하도록 해야 함
  // 저 위에 setter 함수에는 두가지 기능이 있음 -> 안좋음!
  // 어디선가 저렇게 더하는 이유가 있을 것임

  // 함수의 매개변수 속에는 비즈니스 로직이 들어가면 안됨!!!!!!!!!!!!!!
  // ex) add(100/10) <- X
  // => add(a,b) {return a/10 }

  // SBM, Board 컴포넌트에 cards 추가 (save)
  const [cards, setCards] = useState();
  addCard = (a, b) => {
    setCards([...cards, { a, b }]); // 함수 매개변수에 비즈니스 로직 들어가면 안좋음
  };

  // setCards 함수의 비즈니스 로직을 바꾸고 싶을 때 -> useReducer 사용!!!

  // toggle => 상태를 toggle 처럼 바꿔버리기
  // 뒤는 초깃값
  // 앞은 setter의 비즈니스 로직 들어감
  const [checked, toggle] = useReducer((checked) => !checked, false);

  const [cards, addCards] = useReducer((card) => [...cards, card], []);

  // setter의 로직을 useReducer 함수 매개값 첫번째로 넣을 수 있음!
  // card 추가만 하는 것이 아니라 수정도 하고 저장도 하고 등..
  workingCard = {};

  // {isEditing && (input 박스 2개)} <- editing 토글
  // onClick = {() => addCard({board, title: titleRef.current.value, url:urlRef.current.value})} <- 비즈니스 로직 들어갈 수 있음
  // 비즈니스 로직인지 찬반론
  // titleRef 사용부분이 비즈니스 로직임
  // 뭔가 고쳤을 때 바뀌면 비즈니스 로직임
  // 위 코드 개선 위해서는?
  // 리팩토링 방법 1) addCard(titleRef, urlRef)

  // 타입스크립트에서 코드 개선 필요함
  // ex) t: useRef<InputElement>(null)
  // input에 ref 걸면 연결됨
  // 타입 다 정해줘야 함 <- 번거로움 (구글링 다 찾아볼 때...)
  // 마우스 갖다대면 type 알려줌
  // card:ICard 이렇게 타입 다 정해놓고 하면 코드 심플해짐

  // 비즈니스 로직 안들어가도록 하기 위해서는 버튼 눌렀을 떄 workingCard 함수 하나 만듦

  // useMemo <- object 캐시화
  // 메모리 한곳에 계속 위치하도록 static 하게 만듦

  // useCallback <- object가 아니라 함수 자체를 캐시화
  // 컴포넌트 메모화 -> 메모리에 static으로 등록시킴
  // 컴포넌트한테 프로퍼티도 주지만, 함수가 바뀌어도 다시 렌더링됨
  // 렌더링 될 때마다 함수 주소도 계속 바뀌므로 컴포넌트 자체, title 같은 프로퍼티, 이벤트 리스너 함수도 다 메모화함
  // 컴포넌트 다 메모화 해놓으면 title 등 바뀌지 않을 때까지는 자식 컴포넌트 다시 그리지마
  // (부모 컴포넌트는 다시 그릴 수 있어도)
  ```

  ```js
  // const login, logout 등 다 함수 만들지 말고 (session에 종속됨)
  // useReducer 이용!
  // contextAPI는 상태를 가짐, 상태를 children한테 다 퍼트림
  const [session, setSession] = useState();
  const reducerFn = (session, payload) => {
    // if문과 switch문은 성능상 차이 없음
    // 어떤 명령어로 주었을 때, 어떻게 실행되는지 지정
    // => 커맨드 패턴
    // (팩토리는 만들기까지)
    // case 문 안에서는 const, let 안 먹음
    // const, let은 block level scope
    // case문은 switch scope 아님, 저 case 내부임

    switch (payload.cmd) {
      // payload는 뭔가를 실어놓은 것임
      case 'login':
        // const 사용 X (스코프 다름)
        // 블록이 아닌데 블록 스코프를 주면 에러 발생!

        // login 함수에서는 return login()
        // login 함수는 session을 return
        return login(payload.email, payload.password);

      case 'logout':
        return logout();

      case 'myinfo':
        return userInfo();

      default:
        return session;
    }
  };

  // login 함수
  // login(email, password) 받아서 서버에 가서 fetch 받아와서 session.response

  // useReducer 함수
  // [,] 앞은 기준이 되는 프로퍼티
  const [session, dispatchSession] = useReducer(reducerFn, {});

  <SessionContext.Provider value={session} />;

  const login = () => {};

  const { session, dispatchSession } = useSession();
  // onClick = {() => login(email, pw)}
  // onClick = (() => dispatchSession({cmd: 'login', email: emailRef, pw: pwRef}))
  ```

  ```js
  // 보드 - 카드 (버튼: 삭제)
  // Board.js (Board component)
  export default Board = ({ board }) => {
    if (!isLoading) {
      훅();
    }
    return (
      <>
        {board.cards.map((card) => {
          <Card key={card.id} card={card} onDelete={deleteCard} />;
        })}
      </>
    );
  };

  // Card.js (컴포넌트 따로 빼기) => 간결, cache, 훅 처리
  // 어떤 조건에서만 Card 훅 처리되도록 할 때 유용
  // 아직 그리지도 않은 상태, 즉 loading 상태에서 훅 돌 필요 없음

  // id는 PK
  const deleteCard = (id) => {
    // fetch의 delete 메서드 => 서버에서 지움
    // useReducer 아직 안했음
    setCards(board.cards.filter((card) => card.id !== id));
  };

  // 화면에서 카드 삭제됨 => 문제는?
  // 카드 1000개 중에 1개 지워서 999개 남는데
  // 카드 999개 컴포넌트들 다시 렌더링 되는 문제 발생...
  // How???
  // useMemo와 useCallback으로 개선하자!

  // useMemo, useCallback
  import Card from './Card.js';

  export default Board({board}) {
    const mCard = memo(Card);
    return (
      <>
        {board.cards.map((card) => {
          <mCard key={card.id} card={card} onDelete={deleteCard} />;
        })}
      </>
    );
  }

  const deleteCard = useCallback((id) => {
    // fetch 서버 처리 코드
    setCards(board.cards.filter((card) => card.id !== id));
  });

  // Board re-rendering은 일어남
  // Board re-rendering 될 때 마다 onDelete 렌더링 됨
  // (card까지는 안바뀌어도..)
  // 보드 리렌더링 될때마다 저 함수를 캐싱해야 함!
  // 함수를 캐싱하는 것은 useCallback 이용!
  // 카드 하나만 삭제하면 저것만 삭제되고, 나머지 다른 아래 카드들은 그대로 있음
  // 삭제하시겠어요? alert 메세지 하나만 제시 (alert 여러번 띄우면 사용성 떨어짐)
  // 스낵바로 하나 정도 제시해주는 것은 괜찮음

  // 3가지 고급 훅 보이면 안정화 작업중인 프로젝트
  // 없으면 현재 아직 개발 진행중인 프로젝트

  // useReducer, useMemo, useCallback은 유지보수성 높이는 것이 주 목적
  // 성능 개선이 있을 수도 있음
  ```

  ```js
  // 리액트 라우터
  // react-router-dom
  <Routes>
    <Route path="/login" element=<Login />>
  </Routes>

  // 히스토리 백
  // route.navigator(-1)

  // react-native 만들기 위해서는 router 필요
  ```

- 실습 (소셜 북마크)

  ```js

  ```

#

### [Note]

- JS를 깊이 있게 해야함!!!
- 먼저 상대방의 의견을 들어봐야 함!
  - 고친 코드를 가지고 토론!
- 실수한 것 처럼 생각하지 말기!
- 당황했을 때 실수할 수 있음
  - `select from [update/delete] where`
  - 항상 select 하고 주석처리
  - Ctrl + Shift + Enter 로 update/delete 처리
  - 쿼리 모두 기록해놓자!! (+ 주석 처리)
    - 나중에 문제 발생 시 반드시 필요
    - workinglog.sql
    - ex) user 관련 쿼리 => user.sql
  - 복구
    - full back up
    - 트랜잭션 로그 (big log)
      - 시점 체크
    - 복구하고 나서 그 시점 이후는 모두 날라가있음
      - 시점 이후 데이터도 복구해야 함
      - Auto Increment 처리 필수
- 사고 치는 것 두려워하지 말기
- 실수했다고 주눅들지 말기!
  - 주눅들면 업무 진행 안되고, 또 사고 칠 수 있음
  - 악순환 반복... 최악
- 쫄지 말기!
- 조급할수록 안좋은 회사 갈 확률 높음
  - 절대 조급해하지 말고 여유를 가지고 하기!
  - 이직을 하고 싶으면 인턴을 하거나 일 하는 것이 훨씬 더 좋음
  - 공부하면서 일하기!
- 자신감이 매우 중요!!!
- 참고
  - 아인슈타인
    - 모든 훌륭한 과학자는 훌륭한 예술가이다.
  - 개발자는 예술가이면서 운동선수임
    - 소설 쓰는 것 비슷
    - 문제를 해결해가는 능력
      - 삽질 반복 이후 깨달음
- 만약 어느정도 시간이 걸릴 것 같음
  - 2~3배로 시간 잡아야 함
  - ex) 3시간이면, 1~2시간은 삽질
- 구글링 vs. 문제 해결 능력

  - 비즈니스 로직은 구글에 거의 없음
  - ex) 채팅 앱 만들기

    - 채팅 입력 시 화면 스크롤 됨

    ```js
    // $chat <- getElementById() 로 가져옴
    $chat.scrollTop = $chat.scrollHeight;

    // JS Scroll Property Event
    ```

    - 정말 급할 땐 바로 찾아야 하는데, 조금 시간의 여유가 있으면 고민해보기!
    - 마음에 들지 않는 코드, 상황에 맞지 않는 코드 많을 수 있음
    - 생각의 힘 키우기!!

- 회사 퇴사 시 소스코드 다 사라짐

  - 내가 짠 핵심 코드는 항상 히스토리로 남겨놔야 함
  - 나중에 꼭 한번씩은 비슷한 코드 다시 짤 상황 많아짐
  - 물론 회사 저작권 관련은 잘 유의해야함
  - 세월이 흘러갈수록 기억에 대한 핸디캡 많아질 수 있음
  - 예전에 짠 코드 vs. 현재 코드
    - 예전 코드가 훨씬 좋은 경우도 있음
    - 코드는 함부로 지우지 말고 보관해놓기!!
    - 어떻게 생각했지 등 기록 남기기

- 사수와 부사수 갭 너무 크면 또 안좋음

  - 상급 - 중급
  - 중급 - 주니어

- 인턴십도 좋음

  - 공부하면서 인턴
    - 구인구직 또는 이직 미리 알아보는 것 괜찮

- Cobol; db를 안고 있는 언어

- 모든 언어 및 프레임워크 다 매력적임

- 레거시가 크다

  - 기존 서비스가 잘 된다!
  - migration 하는 이유
    - 무조건 유지보수성 위함 (유지보수 비용 커짐)
    - 성능

- 레거시의 사이즈가 중요함!

  - 단순히 레거시가 중요하지 않음
  - 클라이언트, 서버 개발자 규모 여쭤보기
  - 마이그레이션 일정 알아보기
  - 남의 코드 읽어보는 능력 생김
  - DB 마이그레이션도 재밌음
    - 현재 DBMS 사실 다 좋음
  - 레거시도 중요함!!

- 2 CPU도 괜찮음

  - 런칭해서 돈 못버는데, 돈 매일 나가도
  - PM2 monit이 상당히 많은 시스템 자원 사용 가능
    - 서버 느릴 수 있음

- 음원 주파수 데이터

  - 어떤 음악인지 체크
  - API 제공 음악 업체
  - 음악 여부만 체크하도록 학습시켜서 만듦
    - 접시 깨는 소리, 잔 부딪히는 소리 등은?
    - 라이브 감지? (데이터 달라서 안잡힐 수 있음)

- 인디플렉스/시니어코딩 개발 네트워크

- 세상에 무보수는 없음

  - 진행이 잘 안될 수 있음

- 코딩 빠르게 한다고 좋은 개발자가 아님
- 함수의 매개변수 속에는 비즈니스 로직이 들어가면 안됨!!!!!!!!!!!!!!

### [Curiosity]

### _질문_

- DB에 있는 text 내용을 파일로 받고 싶음 <br/>
  (DB 내용 가지고 write 하는 것이 아니라)

  - stream readable 사용
  - string을 stream으로 보내고 싶음

  ```js
  const Readable = require('stream').Readable;
  const s = new Readable();

  // _read => 속에서 읽음 (한번에 읽어서 메모리에 올리지 말기!)
  // 내부 함수 재정의
  s._read = () => {};

  // stream 에 쓰기
  s.push('...');
  s.push(null);

  // buffer 단위로 받기
  s.pipe(res);
  ```

### _개인_

- DB 텍스트 받기
