### {풀스택} JavaScript 18강 - Symbol이 Enum과 Iterator역할도 했었어!?

### _Symbol_

- primitive type
  - new Symbol 하면 안됨
  - Symbol() 대문자인 이유
    - 나중에 추가되서 그럼
    - 기존 레거시 코드 겹칠 수 있음
- unique 한 값
- 심벌 unique 값 주는 방법
- Symbol의 역할 (2가지)

  - enum (enumeration)

    - TS에는 enum 타입 있음 (JS에는 없음)
    - JS에서 enum 타입 구현 방법

      ```js
      // 값은 의미없고 구분만 되게 하면 됨!
      const BLOOD_TYPE = Object.freeze({
        // Symbol 함수의 인자값은 단순한 description임
        A: Symbol('A'),
        B: Symbol('B'),
        O: Symbol('O'),
        AB: Symbol('AB'),
      });

      BLOOD_TYPE[Object.keys(BLOOD_TYPE)[Math.floor(Math.random() * 10) % 4]];
      ```

  - iterable
    - 이터레이터
    - Symbol.iterator
    - 이터러블은 next 함수 부를 수 있는 객체
    - `typeof 객체[Symbol.iterator] === 'function'`
    - for ... of문 이나 for ... in문 같은 곳에서 <br/>
      전체 다 돌지 않고 일부분만 돌리고 싶으면 <br/>
      `while (x = it.next()) { if(x.done) break; }` 구문 이용

- Global Symbol Registry
  - Symbol.for('')
  - Symbol.keyFor()

#

### [Note]

- AOP
  - 전/후처리 미들웨어 필요

#

[Reference](https://www.youtube.com/watch?v=Giam9zjd11w&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=19)
