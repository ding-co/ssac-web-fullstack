## [21_11_20 토 오프라인 수업 21]

### _공지사항_

- 21.11.25.목 수업 => 21.11.27.토 0930 - 1130 으로 대체
- 따라서 21.11.27.토 수업은 0930 ~ 1700

### _본수업_

- 러닝 리액트

  - useContext

  ```js
  // useContext
  // 컨텍스트 여러개 생김 ex) session, resize, ...
  // 컨텍스트 여러개 depth 타고 들어가서 App.js 나옴
  // 컨텍스트 관심사 분리한 것임

  // componenets, utils 폴더

  // hooks 폴더 따로 분리 (디렉토리 구성)
  // session-ctx.js (session.js)

  // custom hook
  const [myinfo, setMyinfo] = useState({});
  const [didLogin, setDidLogin] = useState(false);

  // 브라우저는 아직 안닫고 탭만 닫으면, 세션 키 남아있음 (쿠키 속에)
  // 세션의 expire time <- cookie 내려주기 (session 남아있고 cookie 지워지는 경우 방지)
  // 서버 가서 다시 쿠키도 가져와야 함
  // (쿠키 안에는 세션 id가 있음, login했으면 true만 남기는건 위험함)
  // 암호화된 값을 남겼다가 이후 서버에서 다시 복호화
  // 클라이언트 소스는 모두 공개, 서버는 비공개
  // 서버에서만 그 암호 키를 보관해야 함
  // 서버에서 복호화해서 로그인 시간 등 time 까지 관리

  // 서버 비동기
  // Axios가 더 편하긴 함 (fetch보다)

  // ex) 이름, 권한 등 정보 담아서 암호화해서 내려줌
  // 서버에서는 복호화해서 check
  const URL = 'https://a.com/0.1/myinfo';

  const checkLogin = async () => {
    // 서버 네트워크로 가는 것이므로 반드시 await 달기

    // await 받은 것은 항상 Promise의 suspense 상태 (아직 끝난 것이 아님)
    // 아직 완전한 데이터를 주는 것이 아니고, suspense 상태를 준 것임
    const res = await fetch(URL);

    // 위에 fetch 할 때 await 이면, 받을 떄도 await로 설정해야 함
    // 반드시 데이터 준다는 보장 없음 (undefined 가능성) => ?. 이용
    const myinfo = await res();
    setLogin(!!myinfo?.id);
    setMyinfo(myinfo);
  };

  const login = (id, pwd) => {
    // 서버 fetch
    // login API는 반드시 post (암호화)
    myinfo = fetch(URL, POST);

    // 중복 코드 시 함수로 따로 빼도 됨
    setLogin(myInfo);
  };

  const logout = () => {
    myinfo = fetch(URL, GET || POST);
    setLogin(false);
    setMyinfo('');
  };

  // Promise는 then then 으로 해야 함
  // async, await 는 try, catch 문으로 예외 처리하기

  // fetch함수, setLogin과 setMyinfo 등 다 함수로 뺼수도 있음
  // 함수 분리

  // 로그인 컴포넌트는 어디서든 부를 수 있어야 함
  // 로그인은 App 안에 있으므로 어디서든 SessionContext 이용 가능

  return (
    <SessionContext.Provider value={didLogin, myinfo, login, logout}>
      {children}
    <SessionContext.Provider />
  )

  export const SessionContext = createContext();
  // 그떄그떄 불러오도록 하기 위해 함수로 만들기
  // 리액트는 모두 순수함수임
  // useContext에서 객체를 보내줄 때 복사본을 보내줌 ex) {... }
  export const useSession = () => useContext(SessionContext);

  // export session = ({children})

  // index.js
  import {SessionContext} from './hooks/session-ctx';
  return (
    <SessionContext>
      <App />
    </SessionContext>
  )

  // Nav.js (사용하는 쪽에서는 아래와 같이 편하게 사용 가능)
  import {useSession} from '../session-ctx.js'
  // myinfo, login 중복임
  // 사실 myinfo만 있어도 됨 (myinfo 가져오면 login, ...)
  // 함수를 매번 실행시켜줘야 hooking이 됨
  // array로 리턴하도록 만들 수도 있을 것임
  // 현재는 object 형식으로 리턴함
  const { myinfo, login } = useSession();

  // 주소 참조값을 주면 위험함
  // 항상 리턴시에는 복사본을 줌

  // 라우터 바뀔 때마다 myinfo 계속 가져오므로
  // useEffect로 login, myinfo 등 감싸야 함
  // didLogin을 걸어서 useEffect 해도 됨
  // myinfo나 login 뭐든 useEffect로 거는 것 까지 해야 함
  ```

- 소셜 북마크 프로젝트 실습 (공부용)

  - 북마크 즐겨찾기
  - Nav
    - SBM
    - 로그인 사용자
  - Board
    - Card
      - mark
      - image (og 태그 - mega:og, 썸네일 <- 나중에 node에서 분리 모듈 있음)
      - title
      - 보기 버튼 => 새 창으로 뜸
        - 보기 설정
        - Read + Delete (자동 삭제 모드) / Read /Sorting
          - private board
          - (protected board); 내가 허용한 사용자만 가능 (소모임)
            - 실제로는 남아 있는데 나한테만 안보임
          - public board
    - Reader
      - card, user
    - 다른 사용자가 검색 시, 나와 다른 여러 사람들이 만든 보드 보임
      - import
    - Board
      - title
      - user (보드 주인, 양도해도 상관없음)
    - BoardUser (보드 추가한 사람들, board-user mapping table)
      - board
      - user
    - 설정 화면
    - 추가 화면

- 크롬 익스텐션 모드 (의미 있음)
  - ex) 관리자 툴
- 소셜 코딩
  - PR 해서 배포
- DB는 MySQL 사용
- 우선 private로 시작해서 public으로 감
- 진행 순서
  - HTML + 순수 Bootstrap으로 시작!
  - 리액트 JS (여기까지는 ERD만 만들것임)
  - Node
    - API 서버 붙임

#

### [Note]

- 테일윈드
- sbm

  - overflow: scroll

- neo Vim

- compose 함수

  - 이항 연산자 ? 이용

- node로 passport 이용해서 로그인 구현
- async 만들면,

  - await을 바로 Promise 상태로 리턴하는 모듈도 있고 (suspense)
  - JSON object로 줄지 다름

- 리액트는 컴포넌트 기반 SPA

  - App.js 에 여러 컴포넌트 넣음 (1 페이지)
    - New, List, Detail
  - App - a.js
    - 클릭 => b.js (라우터)
      - c.js
      - d.js
  - login check가 여러 컴포넌트에서 필요한 상황
    - App.js가 처음에 서버한테 물어봄
      - 로그인 안했으면 로그인 페이지 띄워줌
      - 로그인 했으면 로그인 후 페이지
      - 컴포넌트마다 서버 갔다오는 것은 낭비임
      - `<New didLogin={didLogin} />`
      - List, 등 다른 컴포넌트도 다 didLogin 달면 너무 불편함
      - 그래서 contextAPI 사용함

- login 컨텍스트 => SessionContext

  - App의 모든 자식들에게 Session Context 줌

  ```js
  // index.js (render 함수 쪽)
  const SesionContext = createContext();

  <SessionContext.Provider value={didLogin}>
    <App />
  <SessionContext.Provider />

  // 만약 다 주지 않고 한 곳만 주고 싶을 때, Nav 에게만 줌
  // 라우터도 마찬가지
  <App>
    <SessionContext.Provider value={didLogin}>
      <Nav />
    <SessionContext.Provider />
    <List />
    <Detail />
  </App>

  // Nav.js (App 자식 어느곳에서나 SessionLogin 사용 가능)
  const {didLogin} = useContext(SessionContext);

  // 예시) Nav.js
  // SessionContext를 Nav 속에서 하기
  // provider를 menu 말고 item 사이에다가 하기

  // 과거 useContext API 없었을 때, 코드속에 들어갔었음
  // <ul>
  //   <SessionContext.Consumer> (context) => {}
  // </ul>
  ```

- 도메인 - 컨텍스트 - 스코프

### [Curiosity]

### _질문_

- 대댓글 기능 (트리 구조)

  - 최근 다 없애는 추세 (유튜브에 기능 없음)
  - 쿼리, 이중 조인 등 복잡해짐
  - ex) Q1 - R1 - R1-1, R1-2 <br/>
    Q1 - R2 - R2-1 - R2-1-1
  - ex) 부서 (테이블 1개)
    - id 부서명, 상위 부서 <br/>
      1 개발팀 0 (root) <br/>
      2 서버팀 1 <br/>
      3 클라팀 1 <br/>
      4 API팀 2 <br/>
      5 DevOps 2 <br/>
      6 Web 3 <br/>
      7 Node 3
    - self-join
      - d1, d2, pid
      - ex) `Select d1.id, d2.id, d2.pid, d1.name name1 from Dept d1 inner join Dept d2 on d1.id = d2.pid order by d1.pid`
      - order by가 제일 중요
      - select 2번할 수도 있음
      - 보통 temp db 만들어서 짬 (쿼리 조인 이용 안하고)
      - 오라클; connectby 구문 사용 가능
    - 클라이언트 그려보자
      - JSON으로 가공하는 것이 더 빠를 수도 있음
        - ex) root1 => {id:1, name1: '서버팀', children: [ ]}
        - root2 => p.id === root.id, 찾은 녀석을 root.children에 push <br/>
          root = depts[0]; <br/>
          root.children.concat(depts.filter(d => d.pid === '')) <br/>
          root.children.forEach((c) => c.children.concat(depts.filter(d => d.pid === '')))
        - 반복되는 저 filter 코드를 loop 돌기
        - root = d[0]
        - depts는 서버에서 가져온 것
        - function setChildren ([props]) { props.forEach(p => p.children = depts.filter(d => d.pid === p.id)); <br/> setChildren(p.children);}
        - JSON 구조가 저 트리구조로 바뀜
        - 화면에 뿌릴 때는 부모 parentElement 가져와서 append 해서 하기
        - 컴포넌트로 만들어도 됨
        - deptData
        - 개발팀 그리고 그 자식들 그리는 컴포넌트 하나 만들기
          - `<Dept p={deptData}>`
          - p.children.map(c => (<Dept />))
          - 자식들 그리는 것만 컴포넌트 따로 빼도 됨
          - JSON으로 정리 안해도 잘만 하면 바로 그릴 수도 있을듯
            - `const response = await fetch(url);`
            - `const depts = await res.json()`
            - `<Dept p={dept[0]} depth={0} />`
            - `<h1>{p.name}</h1>`
            - `{depts.filter(d => d.pid = p.id).map(c => <Dept p={c} depth={depth + 1} />)}`
  - Q(question) / R(reply)
    - R에 q.id 있음
    - reply table self-join

- 최근 방식
  - 만약 댓글 10만개 => 다 select 하면 매우 부담
  - 요즘에는 접고 펼침
    - p.id = 0인놈 먼저 읽음 (서버에서 fetch)
      - 답글 보기 버튼 또는 체크 버튼
      - 눌렀을 때 다시 서버가서 호출
    - data fetch는 많지만, select는 가볍게 됨
    - (depth 컬럼을 두는 곳도 많음)
    - 댓글 n개 처리
      - reply count 또는 sub-query도 가능
      - 사용자 많아지면 count 테이블 따로 빼기
      - update Q qset rcnt = (select count(\*) from Reply where qid = q.id)
      - nullable 없을수록 정규화 잘된 것임
        - default 값을 0으로 주면 됨 (굳이 null로 주지 말기)
      - 컬럼 추가, 트리거 생성
      - 댓글이 insert 될 때 after insert 되면 +1
      - 댓글이 delete 될 때 rcnt - 1 (rcnt 0일 때 -는 안됨)
    - MySQL process list 확인해서 병목 많이 있는 부분 체크 후 저 컬럼 및 트리거 작업 처리
    - 만약 데이터 100만개 이상되면 컬럼 추가하는 것도 문제임
      - read는 상관없지만 write (insert/delete) 문제..
      - table lock 걸림
      - 새벽에 작업하거나 공지를 올려서 작업해야함
        - 새벽에 작업할 때는 어떻게?
        - 페이스북 같은 큰 규모 회사면 빨리 저 작업 준비해놓고 <br/>
          여러 데이터베이스 사전에 필요 <br/>
          데이터베이스 하나씩 작업해야 하기 <br/>
          replication으로 답이 안나오면 clustering 필요
        - db 하나는 남겨놓고 돌리고, 다른 것 작업 (마스터 계속 변경)
        - 클러스터링도 쉽지 않음 (하둡, 카프카 등 빅데이터 시스템)
        - region (대륙)별로 댓글 나눠져 있으면 region 대로 작업하기
        - region 별로 클러스터링 작업
        - 댓글 읽을 때 최신글 위주로 읽고 과거는 잘 안읽으므로 redis에 담아두고 <br/>
          redis로 받고, redis를 서서히 하나씩 MySQL로 작업하기\
          - 새로 들어오는 것은 redis에 key value 쌍으로 쌓아놓고
          - 읽을 땐 redis와 mysql에 있는 데이터 merge 해서 보여주기 <br/>
            (MySQL에서 작업 끝날 때까지)
          - dump로 백업 해놓고 작업하기 (마음 편하고 안전하게)
      - 사전에 시나리오 및 리허설 철저한 준비 필요, 리스크 등 예측 <br/>
        치밀한 계획도 필요 <br/>
        작업 1개 사전 예측 시간 밀리면 다 밀림
      - 서버 작업은 사실 원격 작업 너무 힘듦
- 클라이언트 측 개발에선 링크드 리스트 형태로 쉽게 가능
  - 서버측만 본다면 배열 가능
  - 따라서 서버측에서 API를 그리기 좋게 최대한 만들어서 내려줘야 함
  - 링크드 리스트 형태로 만들 수 있도록 해주기
  - 서버가 무겁고 클라이언트가 가벼운게 나은가? vs. 서버가 가볍고 클라이언트가 무거운게 낫나?
  -
- 데이터 너무 많이 받으면 패킷 비용만 많이 듦...
- 최대한 데이터 적게 가져오면서 터치 유도
- 서비스 수익 안되면 대부분 6개월 안에 다 접음
  - 사용자별 개발 로드맵 필요
  - 소스에는 버전이 있음 (버전 미리 예측)
    - 각 버전별로 어떤 작업을 할지 미리 규정
- document db도 쓸 수 있으면 사용하기!

- 참고사항

  - 12월 말부터 개발 들어감 (좋은 기회)
  - (서형님) 프로젝트
  - '소장 자동 작성 시스템'
  - 현재는 기획단계
  - 성호님 개발 참여
    - honor: 서형님
    - 개발 총괄: 성호님
    - 관심 있으면 같이 함께 가능
  - 취업 되도 참여는 가능
  - 취업 안되면 취업 준비하면서 함께 진행
  - 보상체계?

### _개인_

-
