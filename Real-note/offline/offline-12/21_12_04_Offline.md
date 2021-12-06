## [21_12_04 토 오프라인 수업 25]

### _공지사항_

-

### _본수업_

- Node.js

- Promise.all(f1,f2)로 비동기를 병렬로 처리 가능

**_setImmediate_**

- 스레드의 **맨 마지막에 실행**되는 것을 보장받는 함수
- setTimeout과 비슷한 기능
- 여러 함수가 있어도 무조건 마지막에 실행

**_nextTick_**

- `process.nextTick()`
- 자신이 포함한 함수의 마지막에 실행

<br>

```js
// 방식 1 Callback
f1(a){
  db.connect({}, (err, conn) => {
    if (err) return err처리문;
    conn.query(sql, [a], (error, row) => {
      conn.query(sql2, rows[0].email, (err2, row2) => ....)
    })
  })
}

// 방식 2 Promise (or async/await)
const {promisify} = require('util');
const {connect} = db;
...
// Promise를 async/await으로 바꿀 때 프로미스가 아니라면 promisify로 감싼다.


// 방식 3 Iterator pattern
// fu: user 가져오는 함수, fe: email 가져오는 함수
// 재귀형식에 compose로 보통 쓰는데 코드 짜라 때 고민 좀 해야 할 것
fs = [fu, fe];
rf(conn, err, res, idx=0){
  if(idx>=fs.length)
  fs[idx](res, (err,row) => fs[idx+1](conn, err, row));
}

db.conn({}, (err,conn) => rf(conn, err, null));

```

**_주의사항_**

- `fs.map(f => await f());` 같은 코드는 await이 proxy 상태라 오류 뜸
- 아래와 같이 쓰되, proxy 상태를 만들기 위해 `f => f()`를 사용했으므로 `await f;`에서는 실행하지 않는 것에 유의!
  - `fss.map(f => f());`
    <br> `for (f of fss) {await f;}`
- fs는 함수가 원소인 배열이므로 반복문으로 실행하고 shift로 함수를 제거하는 식으로도 설계

<br>

- promise의 then보다 await이 이벤트 큐에 조금 더 빨리 들어가는 경향이 있음
- call stack에 바로 쌓이냐 이벤트루프가 넣어주냐 이런 차이인데 속도가 큰 차이는 아님

<br>

**_중간 정리_**

```js
console.log('A');
setTimeout(() => console.log('B'));
setImmediate((c) => console.log('c'));
process.nextTick(() => console.log('D'));
console.log('End');
```

```js
// 출력되는 순서는?
const { nextTick } = require('process');

console.log('A');
setTimeout(() => console.log('B'), 0);
setImmediate(() => console.log('C'));
nextTick(() => console.log('D'));
console.log('End');

// A
// End
// D
// B
// C

// setTimeOut()가 비동기 함수인데, 내부에 있는 console.log가 동기이므로 먼저 실행될 것임
// 비동기 함수는 언제 실행될지 확실히 보장은 못 받음
```

```js
// 전형적인 nextTick() 쓰는 패턴
// producer - consumer 패턴

class TaskQueue {
  constructor() {
    this.queue = [];
  }

  // 생성자 (Producer)
  pushTask(task) {
    this.queue.push(task);
  }

  // 소비자 (Consumer)
  // 이터레이터 패턴
  next() {
    while (this.queue.length) {
      this.queue.shift()(() => {
        process.nextTick(this.next.bind(this));
      });
    }
  }
}

// Singleton 패턴 (인스턴스 유일하게 1개 보장)
const tq = new TaskQueue();
tq.pushTask(f1);
tq.pushTask(f2);
tq.pushTask(f3);
```

```js
const fs = require('fs');
const { promisify } = require('util');
const { gzip } = require('zlib');

// readFile 비동기
// readFile sync (동기) 안쓰는 것이 좋음
const f = async () => {
  // buffering
  // TODO: utf8 인코딩 처리 <-- 위험
  // const data = await fs.readFile('f.txt', 'utf8');
  const data = await fs.readFile('f.txt');
  // gzip은 async가 아님
  const zipData = await promisify(gzip)(data);
  fs.writeFile('w.txt', zipData);
};

const { createReadStream, createWriteStream } = require('fs');

const { createGzip } = require('zlib');

// 받은거 바로바로 넘겨줌 (pipe)
// 자동으로 chunk (64K) 넘어감
createReadStream('f.txt').pipe(createGzip(c));
createReadStream('f.txt').pipe(res);
createReadStream('f.txt').pipe(createWriteStream('wgz'));
createReadStream('f.txt').on('finish', () => {});

// 파이프라인
// 동시에 실행되는 것은 아니고 동기적으로 처리됨 (then 같은 느낌)
// 내부적으로 chunk 값 넘어가는 것은 병렬이라고 볼 수도 있긴 함
const { pipeline } = require('stream');
pipeline(createReadStream(), createGzip(), createWriteStream(), (err) => {});
// 마지막 함수가 끝났을 떄 호출되는 함수

// 스트레스 테스트
// autocannon 모듈
```

```js
// Stream 방식

// 1. Readable (읽기만)
// node (_read)

// 2. Writable (쓰기만)

// 3. Duplex (읽기 + 쓰기)
// file은 동시에 읽으면서 쓰기 불가
// socket 에서 사용자가 뭔가 emit(보내고, write)
// 내가 또 뭔가 emit해서 보냄(read)
// socket은 무조건 Duplex 방식

// 4. Transform (조각들 합치는 작업)
// 누가 값 보냄 (_write), buffer를 transform함
// 사용자는 읽음 (_read)
// _flush()

class MyStream extends Readable {
  // _는 내부에서만 쓰겠다!
  _read(chunk, encoding) {}
}

createReadStream('', { highWaterMark: 10 });
```

- 디자인 패턴

#

### [Note]

- 인터페이스는 인스턴스화 될 수 없음
  - new 해서 만들 수 없음
  - 항상 implement 해야 함
  - 인터페이스는 구현부 쓰면 안됨
  - 추상클래스는 부분적으로 메서드 구현부 작성 가능
- 추상 클래스 vs. 인터페이스
  - 둘 다 구현할 것 정의한 것임
  - 둘 다 인스턴스화 되지 않음
- JS에는 인터페이스 없으므로 추상 클래스 이용
  - TS에는 인터페이스 있긴 함
- 'worse is better'
  - 인터페이스는 simple 한데 구현부도 복잡하면 안됨
  - 인터페이스 작게 작게 정의 잘해야 함!
- 동접자
  - 동시에 접속 (동시에 request)
- 일유저
- 사용자 많을 때 nextTick() 쓸 때와 안쓸 때 차이 큼
- streaming vs. buffering

  - streaming
  - buffering

    - 8192B 사이즈대로 넘어가서 취합됨
    - HTTP가 해줌
    - chunk (하나의 묶음 단위, 데이터 하나의 조각, 64K <- 노드에서는 chunk size 고정되어 있음)
    - buffer size는 OS마다 다를 수 있음
    - MAX_LENGTH (그냥 버퍼 사이즈)
    - MAX_STRING_LENGTH (string 버퍼 사이즈)

    ```js
    const buffer = require('buffer');

    console.log(buffer.constants.MAX_LENGTH / (1024 * 1024));
    console.log(buffer.constants.MAX_STRING_LENGTH / (1024 * 1024));
    ```

### [Curiosity]

### _질문_

- HTTP 2의 push

  - PWA의 push 기능과는 다름
  - 동기적 호출

- 노드는 사실 멀티 프로세스?

  - 아님 1개 CPU만 사용함
  - 자바는 멀티 쓰레드인데 그래도 1개 CPU 사용
  - 노드는 사실 2개의 쓰레드를 사용하기는 하지만 <br/>
    (event queue에 비동기로 들어가고, 실행은 동기적으로 됨) <br/>
    실행 관점을 기준으로 단일 쓰레드임

- Promise.all(f1, f2) 병렬로 실행 => round-robin?
  - round-robin 방식은 아님
  - 비동기이므로 어떤 것부터 실행될 지 모름

### _개인_

-
