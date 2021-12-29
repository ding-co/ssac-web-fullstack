### {풀스택} JavaScript 10강 - 실행 코드로 알아보는 실행컨텍스트 동작 원리

### _실행 컨텍스트_

```js
var g1 = 1;
const c1 = 2;
function gfn(x) {
  var v1 = 3;
  const c2 = 4;
  g1 = 11;
  function fn(y) {
    const c = 5;
    console.log(x + v1 + c2 + g1 + c2 + y);
  }
  fn(6);
}
gfn(100);
if (g1 > 10) {
  let g1 = 1000;
}
console.log(g1);
```

- JS 엔진 평가할 때 실행 컨텍스트를 생성함 (스코프 단위로)
- 사람이 이해하는 순서대로 코드를 이해 (Lexical)
- 모든 언어는 실행 순서 정하기 위해 콜 스택 사용
  - Stack (LIFO)
  - 콜 스택
  - JS => 실행 컨텍스트 스택 (Execution Context Stack)
  - 콜 스택은 메모리에서 생김 (CPU가 아님)
  - CPU는 실행시킬 때 위치 찾아가주고 만들어주는 역할
  - 실제로 만들어지는 곳은 메모리임
- Global Execution Context
  - Global Lexical Environment
    - Environment Record
      - Object Environment Record
        - Binding Object (참조)
          - window
      - Declarative Environment Record; const, let
    - Outer Lexical Environment Reference (외부 참조)
- function Execution Context
  - function Lexical Environment
    - function environment record
    - Outer Lexical Environment Reference
- G.C가 실행 끝난 실행 컨텍스트 바로 지우진 않고 marking 함
  - 만약 외부에서 pop된 실행 컨텍스트에 있는 변수 아직 사용중이면 <br/>
    그 사용중인 것만 살려놓음
  - Environment Record <- G.C가 안돎
- 블록은 조건식이 true이면 활성화 됨 => Block Lexical Environment

  - Block Lexical Environment

    - Environment Record

      - Declarative

    - Outer Reference

  - 블록은 따로 실행 컨텍스트 안생김
  - 블록은 실행 가능한 코드가 아님

#

### [Note]

- 실행 가능한 코드 (스코프)
  - 전역
  - 함수
  - eval('str')
  - module; 코드들의 뭉치, npm으로 설치 가능, `<script src='x.js' module>` <- 모듈로 불리는 것 <br/>
    (모듈 스코프)
- 리터럴은 실행 가능하다고 부르지 않음
- 전역도 모듈에 대한 참조 가능

#

[Reference](https://www.youtube.com/watch?v=pfQfEwnJHRs&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=11)
