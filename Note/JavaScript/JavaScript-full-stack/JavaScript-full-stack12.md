### {풀스택} JavaScript 12강 - 한번에 정리하는 클래스

### _클래스_

- ES6 에서 클래스 나옴

```js
// Function, Class 는 동일 (재사용되는 코드 ,1개만 생성됨)
// 틀만 정의해놓음 (템플릿 프로토타입 라인)

// 반대는 인스턴스 계열 (new 할 때마다 인스턴스 생김)
// 인스턴스 프로토타입 라인

// typeof Animal => function
// 클래스는 다 속에서 function임
class Animal {
  // 인스턴스 생성
  constructor(name) {
    this.name = name;
  }
  // 클래스 내에서는 function 예약어 생략 가능
  getName() {
    return this.name;
  }
  // static은 인스턴스 계열이 아니라 프로토타입, 템플릿 라인에 존재
  // static은 인스턴스 생성 시 못 가져옴, Class 쪽 라인에 있어서 공유함
  // static 쪽에는 인스턴스 접근하는 것이 있으면 안됨
  static info() {
    console.log('this is Animal class.');
  }
}

const a = new Animal('기린');
a.getName();

const b = new Animal('사자');
b.getName();

// b.info() <- 에러 (프로토타입 체인 따라 올라가도 info() 없음)
Animal.info();
```

```js
// extends는 상속
// Animal Class Prototype <- Dog Class Prototype (Function.prototype 계열)
class Dog extends Animal {
  constructor(nm) {
    super(nm);
    console.log('dog');
  }

  // 메소드 오버라이딩
  getName() {
    return super.getName() + 'Doggy';
  }
}

const dog = new Dog('Mary');
// dog.info() <- 에러
// 만약 Animal 클래스 모르고 Dog 클래스만 알면, Dog.info() 로 호출 가능

// 모두 가능
// Object.prototype에 toString() 있음
dog.toString();
Dog.toString();
```

```js
class Animal {
  // #은 private, #은 상속 안됨
  #id = 10;
  constructor(name) {
    // 부모 입장에서 자식이 뭘로 만들어졌는지 체크 (다형성 처리)
    // js는 인터페이스 없어서 new.target 활용할 수 있음
    // (타입스크립트는 인터페이스 있음)
    console.log(new.target);
    this.name = name;
  }

  // 접근자
  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }
}

a.id; // 에러 발생 X (getter를 프로퍼티처럼 사용 가능)
b.id = 100;

// happy instanceof Dog <- Dog로 만들어진 인스턴스인지 확인 (밖에서)
// 클래스 속에서는 new.target 이용해서 확인
```

- 나머지 매개변수 / 전개 연산자

```js
function f1(a, b, c) {}

function f1() {
  // 유사 배열 객체 - arguments
}

// 나머지 매개변수
function f1(...args) {}

function f2(a, b, ...etc) {}
```

```js
const s = 'abc,efg';
const ss = s.split(',');

const x = ss[0];
const y = ss[1];

const [x, y] = s.split(',');

function f() {
  // 귀찮음
  // return { x: 0, y: 0 };
  return [x, y];
}

// object 보다 더 simple 해짐
const [x, y] = f();
```

```js
// super는 상위 무조건 타고 갈 수 있음
constructor(...args) {
super(args) // 다 위로 넘겨~
}
```

#

### [Note]

- tsc (타입스크립트 컴파일러) -> js로 변환

#

[Reference](https://www.youtube.com/watch?v=tiXcdgdekfw)
