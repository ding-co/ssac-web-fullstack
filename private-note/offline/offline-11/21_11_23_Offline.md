## [21_11_23 화 오프라인 수업 22]

### _공지사항_

- 토요일 실습은 핵심적인 부분 위주로

### _본수업_

- 러닝 리액트

  - 리액트 훅스의 성능

  ```js
  // 렌더링 -> 페인팅
  // useEffect(), useLayoutEffect(), useMemo(memo), useReducer()

  const [name, setName] = useState('');

  // name 바꿨을때만 실행
  // [name] <- 의존관계배열
  // 서버에서 가져올 때 한번만 읽으면 됨
  useEffect(() => {}, [name]);

  // 한번만 실행 (서버에서 가져와서 한번만 읽기)
  useEffect(() => {
    fetch();
  }, []);

  // import
  // export const fnComponent

  // rendering 앞이 useLayoutEffect()
  // rendering 뒤가 useEffect()

  // will mount일 때부터 바로 실행 시작

  // input onChange 말고 useRef() 사용!
  // createRef()
  // inputRef.connect.value

  // 치는 동안에는 액션 처리 못함
  // 마지막에 connect.value 해야 가져올 수 있음
  // defaultValue = {name}

  // Ref, defaultValue 둘 다 활용!

  // useMemo()

  // arr 계속 바뀌므로 안바뀌도록 하기

  // React -> Registry 에 캐싱
  // name이 바뀌었을때만 타야 함!
  // arr의 value 값이 세팅됨
  const arr = useMemo(() => name.split(','), [name]);

  // useMemo() 쓰는 순간 그 메모리 주소를 캐시해서 arr은 안바뀜
  // 캐시는 값이 바뀌면 새로운 메모리 주소 잡힘

  // object를 useEffect()에 걸고 싶을 때 useMemo() 사용!
  useEffect(() => {
    const setRefresh = true;
  }, [arr]);

  // arr 바뀌었을 떄만 사용자 목록 보여주는 것을 그리는 함수
  const showList = () => {
    return;
  };

  // return {refresh && (<ul></ul>)}

  // arr 바로 set 하는 것이 아니라 useList로 set

  // refresh 라는 flag를 주는 것과 useList map 이용

  // useEffect 같은 훅한테 async 걸면 안됨!!
  // 훅은 속까지 들어가면 안됨!
  // 어떤 이벤트 발생했을 때 훅을 사용하면, 훅 내부는 최상위 레이어가 아님
  // 이벤트 발생 시 실행시키는 훅은 없음
  // 훅은 항상 최상위 레이어에서 한번에 실행됨!!
  // useInput() 같은 커스텀 훅같은 것도 if 조건문을 걸어서 쓸 수 없음

  // 훅 안에서 비동기로 처리하는 코드 짜면 안됨
  // 중간에 구멍 생김
  // useEffect(async () => {
  //   const res = await fetch(url);
  //   // state 변경
  //   setUserList(await res.json());
  // });

  // 수정한다면,
  useEffect(() => {
    (async () => {
      const res = await fetch(url);
      setUserList(await res.json());
    })();
  }, [arr]);

  // if(isEdit) {useEffect()} <- 불가
  // useEffect() 밖에서 해야 함!

  // 토글 버튼 만들기

  // useEffect()
  // 의존관계배열에 함수가 올 수 있음
  // 함수도 계속 타게 되면 (재정의 되면, 실행 컨텍스트에 함수 계속 생성)
  // => useCallback() 사용!!

  const fn = () => {}; // X 안됨
  const fn = useCallback(() => {}); // O (fn 다시 재정의 되지 않음)

  // rendering -> (useLayoutEffect) -> painting -> (useEffect)
  // 화면을 그리고 나서 처리해야 하는 것

  // useEffect() 안쓰면 어떨 떈 달력 뜨고 어떨 떈 안뜨고 그럴 수 있음
  // useEffect() 사용!

  // DOM하고 상관없는 것들에 useLayoutEffect() 사용!

  // ex) <Button className={btnColor} />
  // btnColor 값은 server에서 fetch 될 때 미리 잡을 수 있음
  // 굳이 Button 그려지고 나서 할 필요는 없음

  // 처음부터 빨간색 칠하기 (useLayoutEffect, paint하기 전에 먼저 하기)
  // 처음에 흰색 페인트 된 이후에 빨간색으로 다시 칠하기 (useEffect())
  // 덧칠하는 것이 모이다보면 어느순간 클라이언트가 무거워짐

  // 훅은 최상위에서만 작동!
  ```

  ```js
  // react.query
  // rerendering 계속 일어나면 서버 부하 높아질 수 있음
  // useEffect() 안써도 리액트 쿼리의 useQuery('url?name=""')
  // 어떤 주소 부르면 저 name 값을 캐시함 (useQuery 자체가)
  // 내부적으로 아마 useEffect, useMemo 다 되어있을 듯

  // 보통 5초 많이 씀 // 사용자 계속 들어오면 바뀜
  // 만약 name값 주면 (즉, 검색하면) => 가야 함
  ```

  ```js
  // Hooks 필수 숙지
  // 1. export (아래) 하는 곳에 훅 써야 함
  // import와 export 사이는 static (변하지 않는 값)

  // 2. 기능을 여러개의 훅으로!
  // if, else 문 많으면 안좋음..
  // A, B, C, 각각 useEffect() 분리하기
  // A - name, B, C - name/isRefresh
  // 훅은 한개의 함수에서 크게 잡기 보다는 작게 작게 잡기
  // useEffect() 속의 함수가 크면 처리해야 할 것이 많음
  // JS엔진의 평가시간이 오래걸림
  // 가능하면 짧게, 함수는 한가지의 일만 하도록 코드 짜기
  // 코드를 함수 내에 짧게 짧게 짜야 빨라짐
  // 상태 바뀌는 함수들 같이 묶어놔야 함
  // 쪼갤 수 있는 대로 최대한 작게 쪼개서 끼리끼리 모여놓기

  // 3. 최상위 레이어에 훅 사용!
  ```

#

### [Note]

- node.js 는 하나의 JS 엔진
- Chromium
  - 플랫폼; JS를 브라우저처럼 실행시켜주는 플랫폼
  - Electron
    - 브라우저 없음
    - 엔진 필요
    - JS 엔진과 OS, VMware
    - 크로뮴상에서 돌음
- 함수 vs. 프로시저
  - 함수는 리턴값이 있음
  - 프로시저는 리턴값이 있을수도 없을수도
- RPC
  - 프로시저 리턴
- Socket (TCP/IP) -> RPC -> CORBA -> PL/SQL (오라클)
- CORBA (Common Object Request Broker Architecture)
  - IDL (Interface Definiton Language)
  - 모든 함수에 대해 다 IDL 만들면 병목이 될 수 있음
  - 클라이언트, 서버 단에서 각 다른 언어로 짠 것을 이기종간 호환시켜줌
  - 보안 문제도 발생
- PL/SQL; DB가 함수까지 모두 제공함
- REST API; 클라이언트, 서버 개발자 간의 트러블 발생
- GraphQL; Apollo, 클라이언트 개발자 어려움 발생
- GRPC
- 서버에서 JSON 만드는 것이 큰 문제는 아니지만 가공하는 것의 오버헤드 발생 가능
- 기술의 본질은 만드는 기업에 지원하자!
- 기술의 근간이 되는 Tech에 집중!
  - Low-level
- ex) 데이터 100만건
  - VDOM은 금방 되지만, DOM에 페인팅할 때 렌더링 시간 너무 오래 걸림
  - 메모리는 생각보다 많이 안먹음
  - ListView; 20개씩 읽음
    - 스크롤 되는 DOM은 제거
    - 클라이언트에서 제어
  - 서버
    - 캐싱 (게시판 첫 페이지 같은 경우)
    - 수천만건 데이터
      - 사용자를 그룹으로 나눔; 어떤 성향별로 기준 가지고 그룹핑
      - ex) AI - 사용자 성향별로 상품 추천
      - 캐시 여러개 둠
- 메이저 회사는 실력을 2~3년 이상 잘 쌓고 엘리트 팀으로 이직!
- 하루의 20%는 무조건 자기계발 실력에 투자!!!
  - ex) 하루 10~12시간 중 8시간은 일, 2~3시간 나옴
  - 하루에 2~3시간 나한테 투자하기!
  - 평일에 죽어라 하기! 약 2년정도 투자 / 주말에는 조금 쉬기
- 실력, 아는게 힘이다!

### [Curiosity]

### _질문_

-

### _개인_

-
