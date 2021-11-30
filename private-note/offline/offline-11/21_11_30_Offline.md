## [21_11_30 화 오프라인 수업 24]

### _공지사항_

-

### _본수업_

- Node.js

  - 비동기 non-block I/O

    - 비동기
      - A, B
      - 함수형 프로그래밍
    - 동기
      - A 끝나고 나서 B 실행됨
      - Java, C++ 등 명령형 프로그래밍
    - non-block
    - Input / Output
      - file, Network, DB, time, ...
    - EventEmitter (이벤트 리스너 별도로 구성)

      - 메모리 더 먹음

      ```js
      // 비동기로 다른 것이 이미 지나가버림

      // 이벤트 리스너 방식 (emitter)
      // const emitter = new EventEmitter();

      // => 콜백으로 짜기

      // 위와 같은 문제 방지 위해 Promise 방식으로 짤 수 있음
      f1('a.txt', emitter).on();
      ```

    - 콜백 함수 기본 코딩 패턴 (콜백 규칙)

      ```js
      // Callback Coding Rule
      // throw 하면 어디로 갈지 모름 (throw 잘 안함)

      f1(file.readFile());

      // 콜백에서는 절대로 throw 하지 말기

      // return cb(err) 이용!

      // err을 관례적으로 항상 앞에 주기

      const grep = (err, content) => {};
      f1('a.txt', grep);

      // f1('a.txt', cb, 'b.txt') <- 절대로 이렇게 짜지 말기
      // 귀찮아서 저렇게 짜는데 이러면 안됨
      // 콜백은 항상 끝에 가야 함!

      // try-catch 쓰고 싶으면 프로미스 이용
      // async await 이용
      ```

#

### [Note]

- 멀티 쓰레드 각각 메타 정보들 다 메모리에 올리면 메모리 많이 먹을 수 있음
  - 쓰레드별로 실행 컨텍스트 다 다름
- 이벤트 루프가 싱글 스레드 (사실 동기 같음)
  - 사실은 2개의 쓰레드가 도는 것 같음
- Reactor 패턴
  - 뭔가 주는 것이 있을 때까지 리턴 안함
- setTimeOut은 비동기, console.log은 동기

- 진입지점을 무조건 한쪽으로 모는 패턴

  - Facade [퍼사드] 패턴

- 인스턴스 하나만 만들도록 하는 패턴

  - 없으면 만들고 있으면 만들지 마라 (static 하게)

  - 싱글톤 패턴

- LazyInstantiate

  - 인스턴스 만드는 비용이 비쌈 (메모리 확보 필요)
    - 매번 인스턴스화 할 필요 없음 (부담)
    - 서버에 미리 캐싱
  - useState() 이용
  - 시간은 ROM에서 가져옴 (Read Only Memory)
  - 명령 -> OS -> ROM
  - ex) System.currentTimeMilis()
  - ex) new Date().getTimes()

- Go, Erlang, Haskell 등 언어 뜨고 있는중 (deno에 영향 끼친 언어)

  - Erlang; 병렬 프로그래밍 (동시에 들어오는 여러 요청 어떻게 처리)
  - Go; 비동기 I/O
  - Haskell; 순수 함수형 프로그래밍 언어
    - 금융권 곧 도입 가능성

- Java

  - 멀티 쓰레드 기반

- node

  - 비동기 I/O, JS 언어
  - 활용성: socket.io
    - transports: WebSocket (실시간 처리)
  - deno (Rust로 개발되어서 C++과 성능 비슷, 빠름)
  - 취약점
    - 보안성
    - node_modules (npm)

- 업무 외에 하스켈 따로 혼자서 공부해도 괜찮음

- 3개월 수습 및 계약직이면 인턴임

  - 잘하면 정규직까지도 가능
  - 잘려도 아무말 없음. 괜찮음

- WAIM

  - Web Assembly Interface Model
  - VM이 이해할 수 있는 언어는 기계어

- JS 엔진이 Rust로 만들어짐

- WebSocket

  - HTTP 프로토콜 위에 있는 Socket
  - 브라우저에 존재
  - wss 서버
  - open (connection), message, close (3가지 규약)
  - ws.send

- 게임 서버는 성능이 매우 중요
  - Socket 이용
  - socket.emit, send

### [Curiosity]

### _질문_

- HTTP 2의 push

- 노드는 사실 멀티 프로세스?

### _개인_

-
