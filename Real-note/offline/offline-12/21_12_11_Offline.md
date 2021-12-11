## [21_12_11 토 오프라인 수업 27]

### _공지사항_

- 종강 파티는 간단하게 21.12.16.목 (3층)
- 마지막 보강은 21.12.18.토

### _본수업_

- Dependency Injection (DI)

  ```js
  // node
  const chatServer = require(`./${config.chatServer}`);

  app.get('/onlineUsers');

  // config.js
  // chatServer;

  // injector
  // inject 당하는 놈 => Subject, Actor, Instance
  ```

- Proxy Pattern (구조적 패턴)

  ```js
  // Client - proxy - subject(instance, class)

  // 참고
  const u = { id: 1, name: 'hong' };
  const mu = myU(u);

  function myU(u) {
    logger.log();
    return {...u, get()}
  }

  // Proxy 패턴 확장 -> Decorator 패턴

  // Trap (hooking)
  // 리액트 훅의 useState에서 setter 함수가 사실은 observer임
  // re-rendering
  // 그 setter 함수가 프록시임
  // 만약 setter 없으면 데코레이터 (장식만 함)

  // Proxy 사용 방식
  // 1. composition (합성) <- FP의 compose 함수와는 조금 다름
  // 2. object literal (factory) 방식
  // 3. monkey patch
  ```

  ```js
  // 4. Built-in proxy (JS 기본 제공 Proxy 표준 빌트인 객체)
  // AoP 프로그래밍
  // TrapHandler
  // in => isExtensible, hasOwnPropertyDescriptor(), deleteProperty()
  const p = new Proxy(subject, handler);

  // Reflection; property 확인
  // proxy 속에서는 사실 Reflector와 연결되어 있음

  // Serialize (shutdown 될 때 파일로 떨궈놓기 <- byte code로) ex. Redis
  // Serialize는 쓰는 것이고 de-serialize는 읽는 것
  // byte code -> 파일로 써 놓을 수 있음
  // Redis 구동될 때 다시 실행시키는 것은 De-Serialize
  // 객체를 string이나 파일 (plain text)로 떨군다는 것은 serialize
  // 사람이 읽을 수는 없음

  // 사람이 읽으려면 Reflect.has('fn') // fn 함수 가지고 있는지 이 정도 밖에 안됨
  // string을 eval로 실행시키면 byte code로 바뀜
  // JSON.stringify()

  // Handler 예제
  u = { id: 1, name: 'hong', fn: () => {} };
  // handler는 object 임
  // 실행컨텍스트에 proxy의 handler 등록시킴
  // 핸들러는 u 참조하는 형태
  const p = new Proxy(u, {
    // prop or attr
    // get을 재정의함
    // receiver[prop]으로 해도 됨
    get: (target, prop, receiver) => target[prop],

    // 만약 set 재정의 안하고 p.name = val 하면 u의 name 바뀜
    set(target, prop, val, receiver) {},

    has(target, prop, receiver) {},

    deleteProperty(target, prop, receiver) {
      delete receiver[prop];
    },
  });
  // p.id, p.name 다 나옴

  // u.id, u['id'], Reflect.get(u, 'id') <-- 모두 같은 형태
  // Reflect.get(p, 'id', u) // p의 id를 get
  // p는 target, 'id'는 prop, u는 receiver

  // React의 useState 도 옵저버임

  // @observer('name')
  // // name 계속 보다가 변경되면 수정해줘
  // oo(prev, newValue) {
  //   this.prevName = prev;
  // }

  // computed property / observer

  createObserver(oo, {
    set: (target, prop.val) => {
      if (val !== target[prop]) {
        const prev = target[prop];
        target[prop] = val;
        ctx.render({prop.prev, curr: val})
      }
    }
  })

  // LoopBack.io
  // Router, Controller
  export class userController {
    @get('/hello', );
  };
  ```

- Adapter 패턴

  ```js
  // Adapter 패턴
  // 인터페이스 - subject
  // 원래 코드 (레거시)를 냅두고 따로 변경

  // const fs = require('fs');
  // fs.readFile('파일명', 'utf-8', (err, contents) => {});
  const fs = createFileAdapter();

  function createFileAdapter() {
    return ({
      readFile = ('파일명', '') => {}
    })
  }
  ```

- Strategy 패턴 (state 패턴)

  ```js
  // passport 모듈

  setupStrategy() {
    strategy(s => {
      passport.use(s.strategy);
      app.get('/sns/callback')
      passport.authenticate(())
    })
  }
  ```

  ```js
  // 이터레이터 패턴

  // next, done

  // 비동기 iterator
  while (!it.done) {
    val = await it.next();
  }

  async next() {
    res = await query()
    return res
  }
  ```

  ```js
  // 템플릿 패턴
  // 서로 다르게 확장하는 것 ex) 포유류, 조류
  ```

  ```js
  // 미들웨어 패턴

  app.use('/emp-list', (req, res, next) => {
    x = dec(req.header.token);
    if (x.auth < 3)
      return res.status(301).json({ code: 401, message: 'Not Authorized' });
    next();
  });
  // 권한 체크 없어서 보안 위험
  app.get('/emp-list', (req, res, next) => {
    const res = db.query();
    res.json(res);
  });
  ```

#

### [Note]

- 이벤트 큐에는 비동기로 들어가지면 실행은 동기적으로
  - 만약 next로 이터레이터 패턴 이용해서 만들면 이벤트 큐에 들어갈 때도 동기적으로 만들 수 있음
- JS는 100만개 한번에 insert 가능..
- 커맨드 패턴
  - 행위자 Actor 한테 실행
  - 인스턴스가 알아서 부르도록 하는 것은 static 패턴
- npm 모듈
  - 주 사용자 수 체크 -> 오픈 소스 코드 확인
  - passport; 인증
    - oAuth2; API_KEY, SECRET_KEY
  - multer; 파일 업로드
- observer / computed property
  - property에 값이 computed 됨
  - observer는 함수 return
    - cf) 템플릿(화면)에 비즈니스 로직 들어가면 별로 안좋음
    - u.getName() 말고 {u.name} 이 나음
  - ex) computed property
    - @computed('국어', '영어', ...) <br/>
      get: total() { return 국어 점수 + 영어 점수, ...}
- 양방향 computed vs. 단방향 computed
- 오픈소스
  - Core Member
  - Committer
  - Contributor
- Sprint
  - XP -> Agile -> Scrum -> Sprint
  - 클린 코드 (도서 추천)
- 좋은 개발 리더
  - 불필요한 기능 제한
  - MVP 핵심 기능에 집중
  - 효율 / 효과
- Service
  - DAO (Data Access Object)
  - DTO (Data Transfer Object )
    - VO (Value Object)
- AOP
  - Aspect Oriented Programming (관점/관심 지향 프로그래밍)
- IoC
  - Inversion of Control
  - 프레임워크한테 제어를 맡김
  - JSP -> Servlet -> EJB
    - EntityBean; data만 담고 있음
    - SessionBean; 비즈니스 로직 처리
- 프레임워크 만들 때 유의사항
  - 항상 캐시 사용
- 리액트에는 프레임워크 특징인 IoC 이런 것이 없어서 <br/>
  mobX나 redux 같은 것을 사용함
- Pool (메모리에 올려놓고 계속 재사용, 프레임워크가 가지고 있음)
  - DB/Socket connection pool
  - DB Session Pool
  - DB Index Pool
  - EntityBean => Object pool
  - Thread pool
    - Thread도 객체임 (async)
    - cache

### [Curiosity]

### _질문_

- 커넥션 풀
- 제너레이터, 이터레이터
- node.js 디자인 패턴 바이블 ... js 디자인 패턴
- js 리팩터링 책? 학습 언제?
- 클린 코드 / 클린 아키텍쳐 / 클린 애자일 도서?

### _개인_

- symbol table
- heap; key, value
  - heap에 string 저장되어 있으면 문자열 길이가 작을 땐 primitive type <br/>
    만약 string 길이 커지면 reference type으로 자동 변환 (JS 엔진이)
- 실무 => class OOP 많이 사용?
  - function 으로만 코드를 짤 수도 있지만 실무에서 class 아직 많이 사용
- API dockerfile <- docker-compose
