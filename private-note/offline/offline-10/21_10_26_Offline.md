## [21_10_26 화 오프라인 수업 13]

### _공지사항_

- 토요일 수업은 11시 30분쯤부터 시작함 (아침, 점심 다 먹고 오기)

### _본수업_

- Symbol, iterator (갖는 의미 => spread, destructuring)

  - primitive type임 (new 하면 안됨)
  - unique 한 중복되지 않는 값

  ```js
  // Symbol 소괄호 안은 description임 (값이 아님)
  sb = Symbol();

  sb = Symbol('up');
  sb2 = Symbol('bottom');

  // 남 - 1, 여 - 2

  // Symbol 역할: enumeration, iterable

  // enum (enumeration)
  const BLOOD_TYPE = {
    A: Symbol('A'),
    B: Symbol('B'),
    O: Symbol('O'),
    AB: Symbol('AB'),
  };

  // keys 메서드는 array 줌
  const x = object.keys(BLOOD_TYPE)[(Math.random() * 10) % 4];
  if (x === BLOOD_TYPE.AB) {
  }

  // BT[object.keys(BLOOD_TYPE)[(Math.random() * 10) % 4]] => BT.B, BT[B]

  // Global Symbol Registry
  // registry로 password check (과거에는 네트워크로 패스워드 체크 X)
  // regedit()

  const sb1 = Symbol.for('A'); // A라는 키 값으로 registry에 등록됨
  const sb2 = Symbol.for('A'); // key는 중복 안됨 (해시 테이블; key-value 쌍)
  // sb1 === sb2 인데 잘 활용하지는 않음 (의미 없음)

  Symbol.keyFor(sb2); // A (키) 나옴

  // const로 BLOOD_TYPE 선언했지만 내부 값 변경 가능 (reference type)
  // BT.O = Symbol() 로 변경 가능

  // 객체 내부 값 변경 불가
  const BLOOD_TYPE = Object.freeze({
    A: Symbol('A'),
    B: Symbol('B'),
    O: Symbol('O'),
    AB: Symbol('AB'),
  });

  Object.isFrozen(BLOOD_TYPE);

  // iterator
  const arr = [1, 2, 3];

  // for of 구문 => 요소(값)
  // for in 구문 => 인덱스

  // Symbol.iterator 반환 값이 키가 됨
  // iterator => 항상 새로운 값 줌 (계속 반복시킴)
  // 어떤 함수를 iterable 하게 만듦 (next 함수 만들 수 있도록)
  obj = {
    [Symbol.iterator]() {
      let curIdx = 0;
      return {
        // next
        next() {
          return {
            value: '',
            done: curIdx++ > arr.length,
            // 마지막 3 요소 갈 때 value는 undefined 됨
          };
        },
      };
    },
  };

  // Array, Set, Map 등 모두 다 iterable
  // Object.prototype 에 next 함수 다 만들어 놓음

  // typeof arr[Symbol.iterator] === 'function object' 만족하면 다 iterable함

  // 객체 자체가 it으로 넘어옴
  it = arr[Symbol.iterator]();
  it.next(); // { value: 0, done: false }
  it.next(); // { value: 1, done: false }
  it.next(); // { value: 2, done:false }
  it.next(); // { value: undefined, done: true }

  while ((x = it.next())) {
    if (x.done) break;
    // x.value ~~
  }

  // for of 나 for in 중간에 반복 끊을 때 번거로움
  // map이나 forEach 등 메서드도 다 돌때까지 안끝남..

  // 이터레이터 => 중간 중간에 끊을 수 있음
  ```

- 스프레드 연산자 & 디스트럭쳐링

```js
const arr1 = [1, 2, 3];
const u = { id: 1, name: 'hong' };

Math.max(1, 2, 3);

// Math.sum() 은 없음 => reduce 메서드 이용

function sum() {
  // 속에서 쓰는 arguments 는 조작하면 안됨 (전역으로 처리도 하면 안됨)
  // unsafe 경고
  // arguments.reduce();

  ...arguments.reduce((prev, curr) => prev + curr, 0); // done이 true 될 때까지 (배열 아님)
  [...arguments.reduce((prev, curr) => prev + curr, 0)]; // 배열로 만듦, 정확히 배열은 아니고 유사 배열 객체

  // arguments 사용 자제

  // ...args
  // [...arr] // 얕은 복사
}

function sum2 (...args){
  [...args].reduce()
}

const sum1 = arr.reduce((prev, curr) => prev + curr, 0); // 초기값 0 없으면 첫번째 원소 값 들어감

const arr3 = [1,2,3]
const [a, b] = arr3; // a = 1, b = 2

const [a, ...b] = arr3; // a = 1, b = [2, 3]

// slice는 순수 함수 (slice 쓰거나 [...arr] 이용)
// splice는 없애 버림

sum(1,2,3) // ...args 로 하면 하나로 풀림
sum(arr) // arr는 array => 함수에서 [...args]로
```

```js
const arr = [1, 2, 3];
const [a, b, c = 8] = arr; // a = 1, b = 2, c = 3
const [a, b, c, d = 7] = arr; // a = 1, b = 2, c = 3 , d = 7
```

- Object 도 spread 쓰게 해달라 (ES 제안 사항)

```js
// u도 next 불러주세요 (사실 object는 next 없음)
// 올해부터 직접 구현할 필요 없어짐

const u = { id: 1, name: 'hong' };

const u2 = { ...u, addr: 'Seoul' };

const uu = { id: 5, name: 'kim' };

const u3 = { ...u, ...uu }; // id: 5, name: 'kim', addr: 'Seoul' (merge)
```

```js
// 디스트럭쳐링
const u = { id: 1, name: 'hong' };
const { name } = u; // const {name: name} = u; => name = 'hong'

// x: x, y: y, zz: 3
const xy = { x, y, z: zz };

const { name: nm } = u; // name을 nm으로 재정의

const u3 = { ...u, xy }; // xy: xy (xy => {x:1, y:2})
// xy: {x:1, y:2}

const {addr: a, xy: xyy} // 변수 a에는 seoul  xyy에는 {x:1, y:2}

const {addr:a, xy: {x}} // xy에 x:1 이것만 주세요
const {addr:a, xy: {x:xxx}} // 앞에 x 써서 xxx로 재정의

// 사용자가 데이터 수정함 ex) 이메일과 이름 입력
user = {name: '', email: ''} // 초기값으로 뭔가 뿌림

// 이후 사용자가 수정함 (name, email)
// 사용자가 수정하고 저장 누름

// user 객체는 조작하면 안됨

// 저장 실행 함수에서는 user 새로 할등
const user = {...user, email} // email이 덮어씀

const {id, ...userInfo} = u3; // id 뺴고 나머지 값은 userInfo라는 object로 다 들어감

// 원본 객체 조작 하면 안됨 (새로 할당하는 한이 있더라도)
// 중간에 루프 돌고 있는 동안에 다른 행동 할 수 있음 (JS는 비동기 IO, 동시 처리 가능)
// 브라우저에서 여러 함수 돌 수 있음 (여러 버튼 등 이벤트)
// => 에러 날 수 있음

// 모두 순수 함수로 만들어야 함!
```

#

### [Note]

- 최근 추가된 사양에서 함부로 소문자로 만들기 힘듦
  - 레거시 프로젝트에 동일한 변수명 있을 수 있음
  - 따라서 S가 대문자임
  - 내년에 들어갈 사양들이 실제로 지금 브라우저에 되는 것도 있음
- 참고) ES2021
  - 'str'.replaceAll()
- ECMA 제안된 사양 (ESNext)
- ES버전 새로 공표하기 전에 1년 전에 미리 알려줌 (대형 브라우저 vendor들에게)
  - 여러 브라우저 플랫폼 구현 필요
- 과거
  - 세법이 바뀌면 더존에 알려줌 (괜찮으지 체크 여부 물어봄)
- JS 엔진

  - static 영역 (전역, 어디서나 빨리 쓸 수 있는 CPU에 가까이에 있는 영역)
    - CPU에 붙어 있는 캐시 메모리 영역
    - cf) M1 칩 -> CPU에 캐시 메모리 같이 넣음
    - oracle sequence
      - 비동기로 여러 개가 동시에 때리면 같은 값을 줄 수 있음 (사실 바뀐 것인데 그 사이에)
      - AOP 필요 (미들웨어)
        - 전처리
          - sync
          - 큐에 넣기 (다른 애들 아직 안옴)
          - 실행은 pop해서 줌 (return 콜백함수) <br/>
            만약 다른 놈이 쓰고 있으면 아직 pop 안함
          - cb(next), q.pop() => 새로운 콜백 옴
        - 후처리
        - (재수 없으면 논리적으로 오류 발생 가능할 수도 있음. 물리적으로는 아니지만)
  - heap 영역 (넓은 공터)

- JS에는 enum 타입 없음

  ```js
  // enum 타입이 있음

  enum BLOOD_TYPE = {
    A,
    B,
    O,
    AB
  }

  // select box (예시)
  // 사용자가 선택한 것이 O인가요?
  // (라디오 버튼의 value 값, 아직 모름)
  if(u.BLOOD_TYPE === BLOOD_TYPE.O){}
  ```

- Array, Set, Map, NodeList, HTMLCollection
- uInt8Array => 고정형 int 8 바이트 array (의미 없음)

### [Curiosity]

### _질문_

-

### _개인_

-
