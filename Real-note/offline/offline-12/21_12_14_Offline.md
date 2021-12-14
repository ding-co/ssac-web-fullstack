## [21_12_14 화 오프라인 수업 28]

### _공지사항_

- 무조건 목요일까지 포트폴리오 했던 것 제출

  - 깃 주소 또는 소스코드 지혜님한테 제출

- 21.12.18.토 리모델링 공사 진행 (오프라인 수업 힘듦)

  - 다음주 화 또는 목에 진행 가능

- 풀타임 수업이 아니므로 사실상 실습 수업이 거의 없음

  - 실습 수업은 유튜브로 제공 예정 (소셜 북마크)

- 단톡방은 공지용으로 활용
- 슬랙으로 자유롭게 의견/이슈/면접 등 아무거나 공유
- 목요일 발표하고 3층 가서 다과 등 식사

### _본수업_

- TypeScript

```ts
// 타입스크립트 장점 (JS와 비교해서 차별성)
// 1. 코딩 실수 방지; 굳이 타입 변환하거나 그럴 필요 없음 (애매모호함 감소)
// 2. suggest 기능 (타입, 프로퍼티 등 알려줌 - 자동 완성)
// 3. 다형성 (ex. 인터페이스 - 함수 이름만 있어도 됨)
// 4. 코딩 스타일 (JS만 사용시 ESLint + Prettier 사용)
// tslint 도 있는데 그런 것 말고 타입을 명시하므로 상당히 직관적임
// 산출물 줄어듦
// 타입 명시하면 또 Unit test 줄여줌
// ex) assert add(1, 2) === 3
// BigInt, 소수점, string, undefined 등 넣을게 너무 많음
// 동적 타입 언어 => 유닛 테스트 만들기 힘듦
// TS 사용하면 유닛 테스트 만들기 너무 편해짐

// TS의 사용 이유: "실용성"
```

```ts
// TSC (TypeScript Compiler)
// TSC (.ts) -> JS (.js)
// JS로 떨구기 전에 type checker를 통해 타입 검사 => 오류 체크
// 오류 나도 default로 JS로 떨어짐 (그래야 배포 가능)
// 하지만 오류 나면 빌드하면 안됨
// build (웹팩)
// warning (hint ex. 사용하지 않는 변수 <- ESLint에서 세팅 가능>)
// type checker가 핵심임
// TS는 pre-compile 역할

// node a.js
// 컴파일과 실행까지 같이 해주는 것이 ts-node
// ts-node a.ts

// 컴파일러의 가장 기본 - parser (구문 다 토크나이즈함)
// parsing 하면 Abstract Syntax Tree 를 만듦
// AST를 가지고 byte code로 떨궈야 실행 가능
// byte code가 되어야 런타임에 실행 가능한 코드가 될 수 있음
// 실행 위해 byte code 를 기계어로 변환 후 JS 엔진 평가/실행 과정
// 위 과정까지 tsc가 다 돌림
// 따라서 tsc가 생각보다 실행 느림 (함수 call이 아니라 type을 미리 가상으로 실행함)
// 50~60% 정도의 unit test 줄여줌
// 함수 call 은 당연히 JS에서 진행

// JavaScript가 weak type
// TypeScript는 strong type

// JS는 모든 곳에서 다 존재함
// JS로도 크로스 플랫폼 다 가능
// JS가 매우 가치 있기 때문에 TS 사용
// 함수형 언어의 장점을 살리고 type에 대한 불안한 부분을 해소

// TypeScript 준수사항
// 1. var 이런 키워드 사용하면 안됨 (ES6+/ESNext 권장)
// 최근 타겟을 보통 ES2015 (ES6)로 떨궈줌. 작년까지는 ES5
// 빌드하기 전에 ES5로 변환하면 읽기가 힘듦 (아직 기업들 많이 있음)
// 그래서 ES2015 권장
// ES5로 변환하면 장점은 빌드할 때 약간 빨라짐
// 2. 순수 함수; side effect 줄이기
// 사실 unit test 만들기 편해서 순수 함수 사용 (가장 큰 장점)
// 오류될 확률 줄어듦
// 스프레드 연산자, 디스트럭쳐링 할당 등 이용
// 3. type을 모두 붙이는게 좋긴 함 (기계 잘 인지하도록)
// let i = 0; <- 굳이 안붙여도 되지만 붙여도 상관없음
// let i; <- 이렇게 해놓으면 정말 안좋은 코드임 (뒤에 어떤 일이?)
// let i; 같은 경우는 number 타입 붙여주는 것이 좋음
// 타입 붙이는 팁은 이후에 따로 알려주심
// ex. 함수 매개변수에는 타입 무조건 붙이기
// 매개변수 타입 붙여서 함수 return 값에 대해서는 굳이 타입 안붙여도 됨
// object 필드 등에는 무조건 타입 줘야함

// react 의 경우
// const [name, setName] = useState('')
// 정석 답안: const [name, setName] = useState<string>('')
// 하지만 <string> 은 생략 가능, 초기값으로 string 타입 무조건 옴
// 만약 <string | User | .... > 등 너무 퍼지면 제네릭 사용 필요
// 아니면 any 써야 하는데 any는 가급적 사용하지 말기!

// xonChange=(evt: HTMLElement<HTMLInputElement>)
// <input onChange={xonChange}>
// => <input onChange={evt => }> 이렇게 쓰다보면 바로 타입 나와서 긁어 붙이면 됨
// 위는 복잡하게 (정확하게) 해줘야 함
// 실제로 DOM을 부르는 것이 아님
// React 의 JSX에 대한 input은 React가 속에서 불러줌
// const evt: 다른 타입 => tsc에서 에러 발생
// react 쓰므로 react 한테 이 정도는 배려 해줘야 함

// 소켓 사용시
// 서버 소켓; socket.io
// connect 할 때
// const socket = io('ws://')
// const socket = io('https://')
// 사실 위 같은 경우는 socket 타입 굳이 지정할 필요 없음
// 우항의 리턴값의 타입이 socket 타입임

// 클라이언트 소켓; socket.io-client (다른 모듈)

// useState<소켓 타입>(null | undefined)

// 인터페이스
// 선언 합침 (여러 타입을 합침)
// 그러면 복잡해짐
// Ctrl + 클릭으로 들어가면 인터페이스 하나 나옴
// 그럴 때는 useState<typeof Socket> 이렇게 써도 됨 (편법)
// SocketIOClient 타입 쓰는게 원래 정석

// 모듈 설치 (npm install -D @types/socket.io)
// 저렇게 설치해주면 타입 다 나옴

// 오픈 소스 대부분 타입스크립트로 만들어져 있음
// 타입스크립트로 한번 코딩 해놓으면 JS는 변환해서 올리면 됨
// 오픈 소스 -> 타입스크립트 소스코드 1개
// 굳이 JS 소스코드 안올려도 됨 (최근 안올리는 경우 많음)
```

```ts
// 타입

$> mkdir ts
$> cd ts
$> npm init -y
// npm i --save-dev
$> npm i -D typescript tslint ts-node @types/node
// tsconfig.json 떨어짐
// target: es2016
$> ./node_modules/.bin/tsc --init
// tslint.json
$> ./node_modules/.bin/tslint --init
// 보통 output을 dist 폴더로 지정
$> touch index.ts

// JS 엔진은 V8 엔진 (노드, 크롬, 오페라 등)
// 크로뮴은 V8
// 크로뮴도 윈도우에서 돎

// chakra는 MS edge가 쓰고 있음
// chakra는 크로뮴 갖고 있음

// spider monkey는 firefox
// JSCore는 Safari

// 크롬 무거우면 Brave 사용하면 됨 (V8 엔진 동일)

// 채팅 앱 만들 때, 브라우저 여러 개 이욯해서 테스트
// 쿠키 공유 방지
// 크롬밖에 없다고 하면 Ctrl + Shift + N (크롬 시크릿 모드로 사용)
// PC방은 시크릿 모드 사용하는 것이 가장 마음 편함
```

```ts
// : number 이것도 annotation임
// 코드에 힌트 다는 것을 모두 다 annotation 이라고 함
let a: number = 0;

let obj = { id: 1, name: 'hong' };

// nodemon 글로벌로 깔아두기
// volta install nodemon -g

// nodemon --exec '.\node_modules\.bin\ts-node' index.ts

// const vs. let [필수 질문]
let a: number = 0;
const a = 0; // number 타입 쓰지 말기
// tsc가 속에서 인식하는 것이 다름 (js로 떨어지는 건 차이 없음)
// const a 의 타입은 0이라는 리터럴임
// const a는 0밖에 못옴

const obj = { id: 1, name: 'hong' };
// obj.id = 2로 값이 바뀔 수 있으므로 타입 리터럴로 생각 X
// 객체는 레퍼런스 타입임

// type 리터럴 (type literal)
// 리터럴 자체가 타입이 됨 (정말 많이 씀)
let a: 0 | 10 = 0; // 0이나 10만 와라
User: IStudent | IProfessor; // 인터페이스도 되지만 타입 리터럴도 됨

let ba = true;
let bb: boolean = true;
let bc: true = true;
// let bd: false = true; <- 에러 발생, bd는 false type literal 임

// [type 정리]
// unknown <- any
// undefined <- void <- any
// any -> null
// any <- String, number, boolean, bigint, symbol, object ({})
// object <- Object
// string, number <- enum
// symbol <- unique symbol

// 타입의 제일 위는 unknown (알수 없음)
// any는 뭐가 와도 된다는 뜻 (any는 사용 금지!)

// 우항의 값은 object literal
let obj: User = { id: 1, name: 'hong' };

// type 따로 정의
// 가운데 세미콜론으로 구분
type TUser = { id: number; name: string };

// User 앞에 T 붙여도 됨 (타입이라는 표시)
// 인터페이스는 IUser (실제 클래스 이름은 User이므로 구분)

// 타입 vs. 인터페이스

// bigint
let bi: bigint = 1234n;

// tinyint 는 -128 ~ 127
// unsigned로 하면 0~ 256

// tsconfig.json 에서 target="es2020" 으로 세팅
// OS, CPU에 따라서 node 다르게 build 됨
// bigint 사용하는 이유
// JS는 number가 double 타입이라서 그것에 맞춰줌
// 숫자에서 소수점 제외할 때 bigint 사용

// 1_000_000 <- 백만

// 프로젝트 끝나면 any 타입은 보통 2~3개 정도 나옴
// any 타입 안쓰는 것이 좋음
// any 안쓰고 unknown 타입 쓰기
// 변수를 쓰긴 할 건데 타입 의미가 없음
let ua: unknown;
let ub: unknown;
if (ua === ub) {
}
// typeof, instanceof
// unknown 타입까지는 괜찮

// ?는 와도 되고 안와도 됨
// 없으면 undefined

IUser : {'id': 1, 'name':'hong'} | {xx: string}
// 인터페이스 extends IUser {xx: string}

// public 쓰면 this.name = name 자동으로 붙여준 효과
class User {
  constructor(id, name) {
    // private 붙이면 자동 클로져 효과
    // 은닉성
    private id: number, public name: string
  }
}

const hong = new User(1, 'hong')
const kim = new User(2, 'kim')

s:symbol = Symbol();
// s+ 'abc' 모두 에러 바생

// unique symbol 은 항상 const 사용! (let 아님)
const ss:unique symbol = Symbol();

// symbol은 다 unique 함 => unique symbol 많이 씀

// object
const obj : {id: any}

// 리액트
// myFn 타입이 아무것도 리턴 안한다면? () => void
// function myFn(): void
// const myFn = () => {}
// <Comp fn={myFn} />
// function Comp (fn: ) <- fn 함수 타입 줘야 함!

// type emptyfn = () => void

// let i;
// i + 'abc' => 'undefinedabc'
// ts는 에러 발생

// 인터페이스도 ts에서는 object임
// id는 k에 매칭
// k가 이김
// object k 시그니쳐가 더 쌤
// name은 괜찮음 (key는 string, 값도 string)
// id에서 에러 발생
// id 타입을 number -> string으로 바꾸면 에러 발생 X
let obj: { id: string; name: string; [k: string]: string; [k: number]: string };

// obj[x] = 0; <- 에러 발생
// obj.x = 0; <- 에러 발생 X

// 붙일 때마다 뭔가 계속 달라지는 경우 있음
// 추가하는 것이 일반적이지만 급할 때는 key로 씀
// 값을 받아서 string만 넘어오게 할 수도 있음
// 프로젝트 하다보면 1~2개 정도 쓸일 있음

// User을 타입으로 정의할 수 있음
//type User = {} <- 에러 발생
type User = {
  id: number;
  name: string
}

function f() {
  type User = {} // 괜찮, type은 block scope임
}

// ?는 그 타입이랑 또는 undefined
```

```ts
// 인터페이스 타입
// 제네릭 타입
// 다형성
// 비동기 프로그래밍할 때 어떻게 타입 지정
```

#

### [Note]

- 첫 직장 => 스타트업이나 IT 전문 회사 추천
  - 너무 조급하게 마음 먹을 필요 없음
  - 3~6개월 정도 시간 여유롭게 두기
  - 가고 싶은 회사 가는 것이 제일 좋음
- TS 처음에는 조금 어렵지만 금방 익숙해짐
  - 전제: JS 잘해야 함
  - 초반에는 조금 헤맬 수 있음
  - JS, Python 공통점; unittest 만들어도 불안함
    - 동적 타입 언어는 런타임에 오류날 확률 높음
    - Java도 컴파일 언어지만 null pointer exception 많이 발생 가능
    - C, C++는 안정적이지만 코딩할 때 힘듦
    - 순수 JS 쓰는 것보다는 성능 조금 떨어질 수 있음
      - TS -> JS 컴파일
- IDE
  - VS Code; Ctrl + 클릭
- 서브라임이나 네오빔 같은 코드 에디터 추천
- VS Code 많이 뜨면 느려짐
  - 메모리 32GB 컴퓨터로 바꿔도 느려질 수 있음
  - 터미널 등 기능 많이 가지고 있어서 메모리 많이 잡아먹음
- db 인터페이스; select, update 등 다 구현해야 의미 가짐
  - 만약 인터페이스 없으면 클래스로 일일이 다 만들어서 상속해서 구현해야 함
- js와 ts 소스코드 같이 있으면 ts 는 TSC 따로 작동
  - 겹쳐도 상관 없음

### [Curiosity]

### _질문_

-

### _개인_

-
