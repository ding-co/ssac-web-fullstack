# {풀스택} JavaScript 25강 - 비동기 관련 개념까지 한번에 🧐

## _Thread vs. Process_

- JS, C, PHP 등은 싱글 스레드
  - JS는 비동기 non-block I/O
  - 프로세스 하나에 스레드 하나
  - 이벤트 기반으로는 매우 빠름 (큐를 빨리 비워야 함)
- Java, C#은 멀티 스레드
  - 프로세스 하나에 스레드 여러 개
  - 현재 실행되고 있는 스레드 => 스레드 로컬
  - 병렬로 동시에 실행되는 것처럼 보이지만 3번 반복 실행과 비슷

## _비동기_

- 내부적으로는 다 Promise
  - Promise; 속에서 이터레이터
- 비동기는 다 I/O에서 일어남
  - Input; write
  - Output; read
- Stream도 비동기

## _콜백 지옥_

- Callback Hell

## _task queue_

- 비동기 함수 내 콜백 담아둠

## _콜백 지옥 벗어나는 법_

- 이벤트 루프가 태스크 큐 관리
- 콜백 헬 벗어나기 위해 Promise 사용

## _micro task queue_

- 프로미스는 마이크로태스크 큐에 담음
- 마이크로태스크 큐가 태스크 큐보다 우선순위 높음

## _Promise_

- then 프로미스 후속 처리 메서드
- reject
  - err가 있으면 reject(err)
  - catch를 부름
- resolve
  - 통과하면 resolve(ret)
  - then 부름

## _Promise 메서드_

- Promise.all([f1, f2, f3]).then(console.log)
  - 3개 다 실행 끝나야 탐 (resolve 된 것만)
  - 동시에 병렬로 실행
- Promise.race()
  - 빨리 끝난 놈 탐
- Promise.allSettled()
  - resolve, reject 상관없이 다 줌

#

### [Note]

- PHP가 노드보다 더 빠름 (PHP는 C기반)
- 최근에는 다 async/await 사용함
- graphQL 잘못하면 서버 부담 큼
  - 1번 읽을 것을 계속 반복해서 여러 번 읽어서 부담 많아지면 서버 죽을 수 있음

#

[Reference](https://www.youtube.com/watch?v=_wpXOxh0XVk&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=27)
