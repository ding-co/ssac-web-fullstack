### {풀스택} JavaScript 3강 - 변수, 상수, 데이터 타입, 호이스팅, 스코프 체인

### _CPU & Memory_

- 변수는 메모리에 저장됨
- 연산을 위해서 CPU가 필요
- 컴퓨터는 모두 이진수로 연산함
- 컴퓨터는 속에 트랜지스터가 있음 <br/>
  (CPU는 트랜지스터의 집합, 트랜지스터 고압축 => 집적회로)
- 이진수의 표현은 트랜지스터로 함 (1 전기 신호 on, 0 전기 신호 off)
- 트랜지스터 연산; OR, AND, XOR <br/>
  이진수의 덧셈은 사실 OR, XOR 섞은 형태
- CPU (연산 장치); Cache, Register <br/>
  CPU와 메모리 사이 속도 차이 극복 위해 보통 Cache를 CPU안에 탑재
- 메모리 셀 하나 크기 1byte (8bit)
- 어셈블리어 (기계어)
- 프로그램 코드 -> 컴파일/인터프리트 -> <br/>
  VM이 이해 가능한 Byte Code로 변환 (JS는 JS 엔진, Java는 JVM,...) <br/>
  -> (링커) -> 기계어 (어셈블리어 - 기계어에 가장 가까운 언어)
- CPU마다 이해할 수 있는 기계어 다름 (호환 애플리케이션 다를 수 있음)
- 어셈블리어가 기계어에 가장 가까우므로 속도 빠름
- JS 엔진은 평가와 실행 2단계를 거침 <br/>
  평가 단계에서 미리 각 값 PUSH, 실행할 때 LOAD, ADD 연산 수행하면 빠름

### _Declaration과 Definition_

- JS에서의 선언과 정의
- 선언; 메모리 번지수만 잡음 <br/>
  정의; 메모리에 값 할당
- JS는 선언과 정의가 같음 <br/>
  => JS 엔진이 초기에 변수 선언시 변수에 undefined 값 초기화
- 식별자 (identifier)
  - 한글 (3바이트), 숫자 (1바이트)
- 리터럴; 값을 나타내는 것
- 함수가 리터럴인 것이 함수형 프로그래밍의 핵심
- JS 엔진의 평가(실행 전 메모리 공간 잡아 놓거나 쭉 세팅)

### _변수(var, let)와 상수(const)_

- `var` (ES5 이전, lexical function scope)
- `let`, `const` (ES6 이후, lexical block scope)
- block scope는 JS 엔진 평가 단계에서 쓰지 않음 <br/>
  `var` 같은 function scope는 함수 바깥에 있는 것임
- `var` 는 평가 단계에서 hoisting 된 것임

### _Scope의 존재_

- Lexical Scope (정적 스코프, JS 같은 함수형 언어)
  - 평가 단계에서 이미 정해짐
- 동적 스코프는 실행 순서에 따라 정해지는 것임

### _hoisting과 Scope Chain_

- 전체 바깥쪽에 global (window) 함수가 있음
- hoisting (let, var, const, function 모두 다 됨)
  - var, function는 function scope 내에서 제일 위로
  - const, let은 block scope 내에서 제일 위로
- 함수형 언어는 정적 스코프이므로 모두 hoisting 됨
- Scope Chain; 외부에서 내부 함수의 변수는 접근 불가

### _데이터 타입_

- Primitive (원시) 타입; immutable, call by value

  - 새로운 값 할당 시, 메모리 공간 새로 잡음
  - 값 비교 (===)

- Object 타입; mutable, call by reference

  - 가변적이므로 stack에 바로 넣지 못하고 heap 메모리 영역에 저장
  - 참조되는 주소 비교 (===)

### _데이터 타입 변환_

- data type casting

- 명시적 타입 변환 (explicit coercion, 개발자가 바꿈)

  - undefined는 메모리에 존재하지 않는 빈 값임 <br/>
    (메모리 셀에 아직 정의되지 않은 것, JS 엔진이 활용함)
  - null은 명시적으로 메모리 비우기 <br/>
    (개발자가 메모리 비울 때 사용, G.C가 자동으로 청소해줌)
  - new를 붙이면 object 타입으로 바뀜
  - Symbol (class 아님, primitive 타입)

- 암묵적 타입 변환 (implicit coercion, JS가 엔진에서 스스로 바꾸는 것)

  - 더하기 연산자 사용 시 string 연결 연산
  - 더하기 연산자는 숫자나 문자열, boolean 타입에 적용 가능
  - 빼기/곱셈/나눗셈 사용 시 정수 연산 (숫자 연산으로 알아서 판단함)
    - `+true` => 1 (숫자)
    - `+'1' + 2` => 3 (숫자)

- 일시적 객체로의 변환 (wrapper object)

  - 기본 타입이 일시적으로 wrapper 객체로 변환
  - 기본 타입은 원래 method 가질 수 없음 <br/>
    but) 임시로 잠깐 object로 변했다가 다시 돌아옴
  - 순간적으로 object 로 변해서 속성이나 메소드 사용할 수 있음 <br/>
    => 이후 바로 다시 돌아옴

#

### [Note]

- ESLint, Prettier 중요한 Extension
- ESLint setting 필요
- JS Engine 이해 필요
- DOMContentLoaded (jQuery의 document.ready 같은 것임)
- immutable (스스로 값을 바꿀 수 없음, 바깥에서 값을 변경해줘야 함) <br/>
  mutable (object 내에서 스스로 바꿀 수 있음)
- [], {}, 1, "false" => 모두 true <br/>
  '', NaN, null, 0 => 모두 false

#

[Reference](https://www.youtube.com/watch?v=tlF5eMAGATI&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=3)
