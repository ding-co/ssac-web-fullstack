## [21_11_02 화 오프라인 수업 16]

### _본수업_

- 비동기

  - 테스크 큐
    - 동기 작업 확실히 하도록 함
  - Promise

  ```js
  // Promise (속에서 Iterator, Symbol.Iterator로 구현한 것임)
  // Promise 아닌 걸로 짜면 동기 (Synchronous), Promise로 짜면 비동기 (Asynchronous)
  // input: write
  // output: read

  // req.write (사용자 입장), req.read (서버 입장) - read stream
  // res.read (사용자 입장), res.write (서버 입장) - write stream

  // input/output stream
  // 문자 데이터 (아스키 코드) / 바이너리 데이터 (이미지)

  // input stream (write stream), Binary byte write stream

  // Stream은 대표적인 비동기

  // read.json(), read.send(), read.write(fs), read.download()

  // Database
  // ES5 구문
  // call back hell (계속 타고 타고 내려감)
  f2((username) => {
    connpool.connect(dbinfo, conn => {
      f3(username, conn(err, results) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.json(results);
      });
    })
  });

  // 사용자 에러 메시지는 사용자 친화적으로 만들기!

  catch(err) {
    res.status(404).send({// 에러})
  }
  ```

  ```js
  // Promise

  // Event Loop
  // Task Queue에 프로미스로 짜면 더 빠름 => Micro task queue
  // Micro task queue 비었나까지 모두 check

  // async, await

  // f2() 이것이 Promise임 (객체, class)
  f2(xx).then(f3).then(f4).catch(err);

  function f2(xx) {
    return new Promise((resolve, reject) => {
      // catch()
      if (err) return reject(err);
      // then() => 위의 f3 함수의 매개값으로 들어감
      else return resolve(result);
    });
  }

  // Promise 라는 객체 (class)는 resolve, reject 함수 모두 받음
  // Promise는 콜백으로 resolve, reject 줌

  function f2(x) {
    return new Promise((resolve, reject) => {
      conn.query('', (err, result) => {
        // reject(err); return; (return 문은 조기 종료)
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  // bluebird (Promise 객체화)

  // static 함수
  // f1 실행 후 f2 실행 후 f3 실행하고 나서 그 결과를 array에 담아 놓음
  // 순서 보장됨
  // 성공한 놈만 줌
  Promise.all([f1, f2, f3]).then(console.log);
  // 앞의 결과를 뒤의 console.log() 의 매개값으로 넣음

  // 앞의 3개 중 하나만이라도 끝나면 then() 탐
  Promise.race();

  // 앞 3개 다 끝나야만 뒤의 then() 탐
  // 성공하지 않아도 다 줌
  // settle: 서버에 갔다가 왔어요
  Promise.allSettled();

  // suspend: 아직 가고 있는데 부르지 마세요
  // proxy: await, yield (끝나기 전까지는 proxy 상태임)
  Promise.suspend();

  // json은 3차원, (RDB는 2차원)
  // 그래프QL -> 서버 병목 많이 생길 수 있음 (병목은 대부분 DB에서 생김)
  // 조인 1번 하면 될 것을 3번씩이나 하니깐 병목 생김
  ```

- Generator, Async / Await

  ```js
  // Generator (속에서 Iterator, next 함수 제공, value와 done 가지고 있는 객체 리턴)

  // 한번 돌면 그 부분은 비워짐

  // return하면 모두 clear 됨

  // 불러야지만 실행되므로 비동기
  function* f() {
    yield 1; // 양보하다
    yield 2;

    const x = yield 1;
    const y = yield x + 1;
    return x + y;
  }

  x = f();
  x.next(); // value는 1이고 done은 false
  x.next(); // value는 2이고 done은 false
  x.next(); // value는 null이고 done은 true

  // 참고
  f2().then(f3).catch(err).finally();

  // const r1 = f2(); 는 안됨, f2는 비동기 함수임

  // await 다음 호출 결과가 와야 r2 값에 들어갈 수 있음
  const r2 = await f2();

  function async f() {}

  // 제너레이터 함수 => 화살표 함수 못 씀, new 써서 객체 인스턴스도 못 만듦

  // 함수에 반드시 async 써야 await 쓸 수 있음
  async () => {
    // r1에 값이 들어가는 순간 task queue에 들어감
    const r1 = await f2()
    return r1;

    // return async f2(); <- 사용 불가
    // (r1에 값이 들어가면서 task queue에 들어가는데 바로 못들어감)
    // 프로미스는 micro task queue에 들어감
  }

  // 만약 함수에 async 못달면 즉시실행함수로 빼버림
  ```

- 에러처리

  - catch 문 안에도 throw error 해야 밖에서도 error 났는지 알 수 있음
  - f3 -> f2 -> f1 길 따라 감
  - 에러의 종류

  ```js
  // 에러 (Error)
  // 프로세스 다 죽어버림 (속의 쓰레드도 다 죽어서 멈춰버림)
  // nginx까지는 갔지만 node 서버 죽어버릴 수 있음
  forever index.js
  nodemon index.js
  pm2 index.js

  // js 평가할 때 syntax error 나옴
  // ReferenceError 참조 못할 때 나옴 (클로저 잘 써야 함)
  // TypeError

  // 예외 (Exception); Runtime Exception, NullPointerException, ...
  // Exception은 프로세스 죽이진 않음
  ```

#

### [Note]

- 디바운스, 쓰로틀 무조건 알아야 함! (매우 중요)
- 항상 기간을 넉넉히 여유롭게 잡기
- 항상 자원 (근무 시간)의 20%는 미래를 위해 투자
  - 공부, 책, 인맥, ...
- 가스라이팅; 사람을 이용해먹음 -> 지배
- JS는 싱글 쓰레드
  - 콜스택 1개
  - ex) 한사람 빨리 먹고 그 다음 사람 빨리 먹고, ...
  - 큐를 빨리 비우는 게 좋음
  - PHP가 노드보다는 빠름 (PHP는 C 기반)
  - 노드는 JS 런타임 환경
  - f1 함수 안의 f2 함수, f3 함수 호출 시 => f2 함수가 콜 스택에서 pop 되어야 그 다음 f3 함수 push 가능 (싱글 스레드)
  - 콜백함수 활용해서 병렬 처리할 수 있도록 도움
- Java, C#은 멀티 쓰레드
  - 프로세스 여러 개 동시에 실행되는 것처럼 보이지만 실제로는 프로세스 하나
  - 콜스택 n개
  - 현재 실행되고 있는 쓰레드 => 쓰레드 로컬
  - 쓰레드 lock
  - ex) 세사람 다 천천히 밥 먹음
- 에러 처리 방지
  - try, catch, finally
  - finally 문은 무조건 탐
- Event Loop
- 쓰레드 vs. 프로세스
