### {풀스택} JavaScript 11강 - 한번에 정리하는 클로저

### _클로저_

- Lexical Scope
- 클로저는 함수와 함수가 선언된 위치 (호출 위치는 아님)

```js
function f1() {
  const x1 = 10;
}

function f2() {
  console.log(x1);
}

f1();

// f2에서 f1의 변수 x1 참조 불가
// 점심, 저녁 동질의 다른 얘기임
f2(); // undefined
```

```js
// 클로저
// 함수 정의(선언)되어 있는 부분과 함수 호출하는 것 사이의 combination [MDN]
function f1() {
  const x1 = 10;
  // const x3 = 5;
  // 만약 f2에서 참조하지 않는 변수가 있다면?
  // 아마 안 없앨 것임 (function environment record의 한 몸임)
  function f2() {
    console.log(x1);
  }
  return f2;
}

const f = f1(); // 출력되는 것 없음

f(); // 10

// 전역 (밖)에서 함수 f1 속의 변수 x1을 바로 접근할 수는 없지만
// 함수 f1 속의 함수 f2를 이용해서 접근 가능
// private한 저 f1 속의 x1 변수를 f2 중첩함수를 이용하여 접근할 수 있도록 해줌
// => 클로저
// 하지만 저런 특성을 이용해서 내부 함수를 getter/setter로 구현은 못함
// 함수일 뿐 (함수 내부 속의 변수는 멤버 변수라 말할 수는 없음)

// 클로저: 내부 함수가 정의(선언)된 위치와 외부 함수와의 관계 (combination)
// 내부 함수에서 외부 함수의 변수 접근 가능
// 그 외 바깥(전역)에서는 외부 함수의 변수 접근 불가
```

```js
function f1() {
  let x1 = 10;
  function f2() {
    console.log(x1);
    x1 = 100;
  }
  return f2;
}

const f = f1();
f(); // 10

const ff = f1();
ff(); // 10

// 함수 실행 컨텍스트 두개 따로 따로 만들어져서 각각 10 참조
```

```js
// 생성자 함수 (객체 생성)
function F1() {
  let x1 = 10;
  // 동일한 이름 함수 => 생성자 함수
  function F1() {
    console.log(x1);
    x1 = 100;
    // this.x2 = 50;
  }
  function f2() {}
}

const f = new F1();
const ff = new F1();

// new로 해서 인스턴스 생성 후 x1 참조 시 같은 값 참조하게 됨

// - Object.prototype
//   - F1.prototype; 생성자 함수로 객체 만들어질 때, 인스턴스 계열
//     - const f = new F1() // f.prototype (인스턴스)
//     - const ff = new F1() // ff.prototype (인스턴스)
//   - Function.prototype; 하나의 틀 (function object),
//                         함수가 자체적으로 가지고 있는 것, x1, F1, f2 다 여기에 있음

// Function.prototype은 함수 소스코드, string, 템플릿 자체임 (아직 호출 X)

// new 하는 순간 Function.prototype에 있는 x1, F1, f2 가져감

// x1은 함수 몸체에 있어서 Function.prototype에만 존재
// 생성자 함수 내에서 this.x2로 만들어낸 변수는 인스턴스 생성할 때 인스턴스에만 있음
// x2는 f.prototype (인스턴스)에 있음

// 옛날에 함수로 클래스 만들기 너무 힘들었음
// 그래서 다 F1.prototype.x1 이렇게 쭉 일일이 다 만들었음
// 클래스 키워드 나오기 전까지
```

#

### [Note]

- 클로저 (MDN)
- Lexical Scope; 영역은 흐름 없이 존재할 수는 없음
  - 기준이 되는 영역이 있음
  - 영역은 혼자 존재할 수 없음
  - 컨텍스트 간에도 global에서 함수를 불러야 함수 컨텍스트가 존재
  - 맥락(문맥)이 있어야 함
  - ex) Lexical (흐름)
    - 점심 먹었어
      - 자장면을 먹었어
        - 단무지 맛있어
    - 사람은 하나만 봐도 상황보고 판단 가능하지만 기계는 불가
    - 단무지 먹으면 점심까지 연결 되지만 <br/>
      점심 먹었다고 해서 단무지 먹었다고 알 수는 없음
    - 단무지에서 상위 스코프로 접근 가능하지만 <br/>
      점심에서 하위 단무지 스코프는 접근 불가
    - JS 평가 단계
    - 컨텍스트를 사람이 상식적으로 이해할 수 있는 문맥
- 함수형 언어; 인공지능에서 나온 개념, 어떻게 하면 컴퓨터가 사람처럼 생각할지?
- 참조하는 링크 있으면 G.C가 해제 안함 (선이 없어지기 전까지)
- 생성자 함수와 클래스는 동일

#

[Reference](https://www.youtube.com/watch?v=SMd-a8yJ13U&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=12)
