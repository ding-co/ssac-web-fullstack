## [21_11_11 목 오프라인 수업 17]

### _공지사항_

- 일정

  - 앞으로 화/목 수업은 19~22시까지도 가능
  - 11/25 목 => 온라인 수업
  - 토요일
    - 11시 30분 수업 시작 전에 팀프 진행
    - 수업 시작 전에 팀프 컨설팅도 가능

- 오프라인 이론 수업
  - 실습 내용 관련 질문 -> 셀프 선 삽질 -> 오프라인 활용
- Social bookmark 실습은 유튜브 비공개 영상으로 제공

### _본수업_

- 러닝 리액트

  - JS in React <br/>
    (feat. 3장 - 함수형 프로그래밍)

    - 스프레드 연산자 / 디스트럭쳐링

    ```js
    const obj = { id: 1, name: 'hong', addr: { city: 'aa', town: 'bb' } };

    // const id = obj.id; (안좋은 예)

    const { id, name } = obj;

    // 디스트럭쳐링의 끝판왕
    const {
      addr: { town: x },
    } = obj;

    const token = 1;
    // name을 'Kim'으로 변경
    // 순서대로 세팅 (lexical)
    res.json({ ...obj, token, name: 'Kim' });

    const board = { id: 1, name: 'baa' };
    const f = ({ name = 'x' }) => {
      console.log(name);
    };
    f(board);

    const f2 = ({ addr: { town } }) => {
      console.log(town);
    };
    f2(obj);

    const token = '13';
    const { token: x } = obj;
    // const {token: token} = obj;
    // const token = obj.token; <- 이렇게 쓰면 안됨 (legacy에는 있긴 함)
    ```

    ```js
    // useState() - React의 built-in 함수

    // return 되면 string임
    <div>{name}</div>; // <div>hong</div>

    // 리액트는 100% 순수함수형 프로그래밍

    const [name, setName] = useState('x');

    // setter 함수, name 변수명은 함부로 바꾸면 안됨
    setName(obj.name);

    const [name, setName] = useState(obj.name);

    // name = 'kim' 으로 변경 불가, name은 readonly임

    // array destructuring

    // 모듈 가져오기
    // import {useState} = React;

    // 참고
    //class React {
    //  useState = (initValue) => [x, setX] // setX는 함수
    //}
    //const React = new React()

    // name은 div 태그에만 있고 그 DOM을 매핑하고 싶음
    // JSX (바벨이 트랜스컴파일시킴)

    // JSP - 트랜스파일러임 cf) 서블릿

    // Virtual DOM 참조중

    // 각각의 변수들이 참조하고 있는 DOM이 있음 (ex. div)

    // set(v,)
    // return [[name]: 'name', `set${v}` : function(v, vd){
    // vd.render(v)
    // }]

    // vd는 virtual dom
    // 리액트 오픈소스 참고하면 됨

    // 변경된 DOM 부분만 다시 그림

    // JSX는 함수임 (옛날엔 클래스였음)
    ```

    ```js
    // 함수형 프로그래밍

    // 1. 고차함수

    // 2. immutability (불변성)

    sum(arr);
    arr[0] = 1; // 이렇게 바꾸면 안됨
    // 잘못되게 바뀌거나 어디서 바뀌어서 잘못되었는지 찾기 힘듦
    // 코딩도 힘들고 디버깅도 힘듦, 테스트도 힘듦, 복잡함

    setName('Kim'); // 이렇게 바꿔야 함 (화면 그리는 것까지 고려)

    // 3. Purity (순수성)
    // 매개변수 1개 이상, return 값 있음 (똑같은 매개변수에 대해 똑같은 값 return 해야 함)

    // 테스트 코드 예시
    // assert sum([1,2,3]) === 6
    // if(args[1]===3) 막 이런 코드 있으면 테스트 코드로 사용 못함
    // 애초에 값이 달라지므로 (테스트 코드에서도 if 문 이렇게 구현 X)

    // 함수 내에서 값을 변경할 수 있는 특별한 입/출력이 있으면 안됨
    // a.json 막 이런거 받아오거나, console.log로 출력도 하면 안됨
    // console.log(sum++) 막 이렇게 쓸 수도 있으므로 다 제거해야 함
    // console.log 쓰다가 의문의 버그 => 하이젠버그

    // console.log 같은 디버그 할 때 사용하는 코드 다 빼는 옵션이 있음

    // console.debug(), console.err()
    // console.debug()으로 하면 build할 때 다 걷어냄

    // arr 속의 값 바꾸면 안됨

    // 4. Data transformation (데이터 변환)

    // 만약 arr[1] 바꾸고 싶으면
    // return [a[0], 9, a[2]]
    // return [...arr, extra] <- 보통 이렇게 추가함

    // 실제코드에서 바꿀 수 있으므로 정석대로 가면
    const arrClone = [...arr];
    arrClone[1] = 9;
    return arrClone;

    // 5. recursion (재귀 호출)

    // reduce 함수 비슷
    factorial = (i) => factorial(i - 1) * i;

    // id or passwd 찾을 때의 인증번호
    // 가입할 때 입력한 이름, 전화번호하고 일치한 사람 찾기
    // select ~ 해서 저 두개랑 일치한 사람 있으면 인증번호 보냄

    // 인증번호에 3분 제한 있음
    // 3분 있다가 메모리에서 해제함
    // 서버 1대일 때 사용자 얼마 없으면  Map 만들어 놓고
    // 브라우저의 세션 ID에 난수값 세팅하면 됨
    // 만약 일치하면 세팅한 값 비워주기 (메모리 해제)
    // 3분있다 지우기 위해서는 setTimeout(Map.remove(t), 3000) 사용
    // 근데 사실 저렇게 안걸음

    // 3분이 시작된 계기는 expired time
    // 쿠키 expire time 처럼 3분이라고 세팅해놓음
    // session 객체에 timeout 이라는 것이 있음
    // session은 로그인한 사용자 다 담고 있음
    // node에서는 express에 session 있음

    // 브라우저에 세션 ID 있음

    // 나중에 저거 없어져야 logout 됨
    // 30분 주기로 계속 다시 접속하면 다 쌓임

    // 짧게 주기

    // 서버 여러 대일때는 Redis 사용

    // input 태그 아래에 span 태그 하나 달음
    // span 태그는 non-block 임
    // <span>{leftTime}</span>

    <div id="timer">
      <input />
      // 사실 함수임, 180초 이렇게 쓰면 안됨 3분으로 써야 함<span>
        {leftTime(lt)}
      </span>
    </div>;

    // leftTime 저렇게 변수로 쓰고 있는 놈들은 리액트에서 다 VDOM으로 갖고 있음

    // 180초
    const [lt, setLt] = useState(3 * 60);

    // 1초에 한번씩
    setLt(lt - 1);

    const leftTime = () => {
      // Math.floor 적용 해야 함
      return `${(lt / 60) % (lt % 60)}`;
    };

    // setInterval() 이용하기!

    const inTl = setInterval(() => {
      setLt(lt - 1);
    }, 1000);

    // 만약 통과되면 그 함수에서는 clearInterval(inTl) 하면 됨

    // 하지만 위 코드는 사실 안됨

    // 함수 호출 해야 그 내부 코드 평가되고 실행됨
    // setLt() 속의 lt는 아직 179임

    // 계속 반복해서 사용되므로 useEffect() 써야 함

    // setInterval() 써도 되긴 하지만 사실 setTimeout() 를 쓰면 편함

    // background에서 setInterval() 이 180번 돌음...계속 생김..

    ff = (_lt) => {};

    ff(lt);

    // recursive 하게 call하기 위해서 setTimeout() 써야 함
    const inTl = setTimeout(() => {
      setLt(lt - 1);
      ff(lt - 1);
    });

    // 시간되면 제한시간 3분 줄어드는 것 짜보기
    ```

    ```js
    // recursive 이용해서 만들 수 있는 함수형 기법

    // 1. curring

    // 2. composition

    // material UI, tailwind 등 react component 모두 다 저걸 활용해서 만들어져 있음
    ```

#

### [Note]

- 러닝 리액트 3회독 권장
- 용어
  - 회사마다 다 다름 (마치 방언처럼, 은어처럼)
  - 근본은 동일할 수 있지만 변형될 수 있음
  - 코딩 스타일, 용어 등 모두 회사 스타일에 맞게 해야 함
  - 타입스크립트에서는 화살표 함수 사용 시 매개변수에 소괄호 쓰면 더 잘보이긴 함 <br/>
    (프로젝트마다 다 다름)
- 좋은 질문을 하는 신입 개발자
- 모르는 것은 확실히 모른다고 말하기
- 면접관으로부터 질문 압박 많이 받아서 감정 폭 크면 안좋은 이미지가 됨
- 당황해서 말 못하면 안됨
  - 쫄면 안됨 (안붙어도 된다고 생각하기)
- 신입 vs. 재수생(중고 신입, 0~2년)
  - 신입이 취업하기 힘듦
  - 인턴십도 3~6개월 괜찮
  - 최저시급은 받아야 함
- 젊을 때 창업 추천
  - 스타트업 경쟁률은 낮음
  - 만약 0.001% 지분만 받아도 월 200씩 나오면 난 디지털 노마드를 하던 뭐든 할 수 있음
  - 참고 사람
    - 한달 앱 광고 수입 20만원 -> 현재는 발전시켜서 다른 앱 월 수입 2000씩 나옴 <br/>
      (아무것도 안해도..)
    - 자유로운 인생을 사는 중..
- 도전을 해야 새로운 인생이 보임 => 창업!
  - 젊을 때 창업 도전해야 함
- 실무에서 영어로 많이 설명하면 못 알아들을 수 있음
  - 소통 안되는 minus 될 수 있음 (상대방 상황 고려해서 말해야 함)
- 러닝 리액트 1,2 장은 JS 기초
- 명령형 프로그래밍 vs. 선언형 프로그래밍

  - 함수형 프로그래밍 언어 아니어도 선언형으로 해야 함

  ```js
  // 명령형 예시
  // let a = 1;
  // for(let i = 0; i < >)

  // 함수형/명령형 예시
  // 뭘 하는지 바로 알 수 있음
  arr.reduce((sum, a) => sum + a, 0);

  // reduce함수가 람다 함수로부터 온 것임 // 1930년대 람다 표기법
  // Dana Scott이 주장함
  // 함수가 다른 함수의 결과를 받는다

  // reduce 함수가 함수를 받음
  // reduce 함수는 고차함수라고 함

  // 고차함수

  // 선언형으로 쓸 수 있도록 reduce 함수 같이 다 built-in 함수가 제공됨
  ```

- 컴퓨터의 노벨상 => 튜링상
- Lisp 언어 아직도 실무에서 쓰긴 함

  - 금융 트레이드 등 금융권 에서
  - 존 메카시

- 함수형 프로그래밍의 특징

- 커링, 컴포즈

### [Curiosity]

### _질문_

- 1GB 파일 1개 복사하는데 걸리는 시간? 추측

  - 내가 면접관에게 질문하기
    - 핵심은 여쭤보는 것에 대해서 아는지 파악하는 것임
    - OS 어떤 것? -> 윈도우, 리눅스,...
      - 리눅스는 string ~ 메모리 적게 쓰고 ~ 등...
    - 몇 비트?
    - 메모리 얼마?
    - 캐시 메모리 얼마?
    - 면접관에게 질문해서 정보 파악한 이후 계산해보기 (가능하면)
      - ex) 32bit = 4byte, 10000MHZ \* 4byte, ...

- 레거시: 기존의 구축된 시스템 (이미 구축된 시스템, 이미 끝난 프로젝트)
- 클라우드 분야에서 온 프레미스는 레거시와 비슷한 의미로 통용

  - 클라우드도 이미 구축된 시스템이므로 레거시라고도 볼 수 있긴 함 (위의 의미상)

  - 스파게티 로직/코드, 누들 로직/코드 (중국)

- API 서버 구축할 때 validation check 관련

  - client 에서 validation check 함
  - API 서버에서는 값만 받음 하지만 서버에서도 validation check 해야 함?

    - postman이나 브라우저에서 fetch 때릴 수도 있음 (서버로)
    - abusing 할 수 있으므로 서버에서도 validation check 해야 함
    - client의 form에서 어떻게 왔는지 알기 위해서는 어떻게 해야 하나? <br/>
      (tokenizer 해서 abuse 하긴 함)

      - referer 로 check (어디서 왔는지 check)
      - referer 외부에서 조작 가능함 (http 요청하므로 헤더에 있음)
      - 그러면 어떻게 방지하나?
      - response에서 token 값 set, res.json() // 응답을 json 형태로 보냄
        - Unique한 토큰을 input에 담아 놓고, ...

      ```js
      x = { id: 1, name: 'king' };
      x.token = uniqueid;
      // 6자리 난수 => 100000 * random() * 90000
      res.json({...x, token{}});

      // form에서 <input type="hidden" value={res.token} name="token" />
      // res.token => '123'

      // submit (저장)

      // token 값 일치하면 정상적으로 온 것임
      // 가장 많이 쓰는 패턴은 token을 session에 담음
      // session은 사실 redis에 담음

      // 만약 WAS 2대 있으면 어디 서버로 갈지 사실 모름
      // session이 한 곳에만 있으면, 다른 곳으로 가면 로그아웃 불가
      // 따라서 session을 redis라는 캐시 메모리에 둠

      // 물론 MySQL에 둬도 되긴 하지만, MySQL에 두면 disk 이므로 i/o 느림
      // redis에 key, value 쌍으로 담아둠

      // 세션은 브라우저마다 1개임

      session.set('token-uid', '123')

      // 저 123이랑 가져온 res.token이랑 같냐?
      // 만약 없으면 40x 관련 경고 및 에러 보냄 (401, 403)

      // 이렇게 하면 abuse 막을 수 있음

      // 최근, 서버에서 html 내려주긴 하지만, response token 값을 따로 내려줌

      // 리액트는 SPA이므로 html, css 등 다 한번에 가져와서 그림

      // SPA vs. 서버 사이드 렌더링
      ```

### _개인_

-
