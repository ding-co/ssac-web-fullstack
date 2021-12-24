### {풀스택} JavaScript 7강 - 함수의 모든 것

#

### [Note]

- OOP - 다형성
- 메서드 오버로딩 vs. 메서드 오버라이딩

  - JS는 프로토타입을 통해 상속됨

    - Animal <- Cat, Dog

      - Animal; eat()
      - Cat
      - Dog; eat(){super.eat();}

        - constructor() {}

        - eat(food1, food2, ...)
        - 자바는 매개변수 개수 정해짐 (JS는 개수 몇개인지 모름)
        - ex) eat(food1, food2){super.eat(...arguments)}
        - Animal과 Dog의 eat 함수는 서로 다른 함수임

          - 디스트럭쳐링
          - ex) arr = [1, 2, 3]
          - arr2 = [...arr] // arr 원본 보존

  - 메서드 오버로딩;
    - ex) class X {f(a, b){} f(a){}}
    - 위 구문은 JS에서는 불가, 다른 언어에서는 가능
    - 다른 언어에서는 서로 다른 함수로 취급됨
    - JS에서는 불가능해서 TS 이용 필요
    - 같은 매개변수 개수여도 타입 다르면 다른 함수 (오버로딩)
    - 매개변수 형태 다름, return 이 다를수도 있음
    - 매개변수가 다른 동일한 이름의 함수 구현
    - tip) 짐을 하나 더 실음
      - 매개변수 개수 다른 것 화살 맞음
  - 메서드 오버라이딩
    - ex) Y extends X {f(a, b){}}
    - 매개변수 동일한 메서드 새롭게 구현
    - tip) 말 타는 A, B 사람
      - 뒤에서 화살 쏘면 B 가장 먼저 맞음
      - 똑같은 이름 함수 덮어 씌우기

- 생성자 (constructor)
- 일반 함수(function) vs. 메서드 (object)
  - 호출되는 방식에 따라 일반함수 or 메서드 됨
  - new로 부르는 것은 생성자 함수임
  - this 바인딩 다름
    - 객체의 인스턴스 자체를 가리킬 때 => this
    - 일반 함수; this => 전역 객체 (인스턴스 확보되지 못한 상태)
      - window, self, global => globalThis (ES11)
    - 메서드; this => 생성자 함수가 미래에 생성할 인스턴스
- 최상위 클래스; Object
  - Object에 프로토타입 달음 (표준 빌트인 객체 등..)
  - 부모의 프로토타입 다 자식으로 상속 (주렁주렁 계속 달리면서)
    - constructor는 안달림 (객체 인스턴스 생성할 때 호출되는 것)
- 함수는 그냥 object가 아니라 function object임
  - 메모리의 다른 곳에 잡힘
- `window.__proto__` (`__proto__`는 누구나 가지고 있음)
  - 접근자 함수 (\_\_ 2개)
- 명령형 프로그래밍 vs. 선언형 프로그래밍
- 항상 코딩은 선언형으로 하자!
- 소프트웨어 공학은 컴퓨터 공학에 포함됨
  - 컴퓨터 공학은 H/W 포함
  - 과거; 전자 계산학과 (S/W) / 전자 공학과 (H/W)
- 순수 함수; 외부에서 넘겨준 데이터 손상 X
- S/W 공학에서 화살표의 의미
  - ex) Dog -> Animal
  - Dog가 Animal한테 간다가 아니라 Dog가 Animal 사용한다는 의미
  - Dog가 Animal 참조
  - 화살표 맞는 놈이 항상 당하는 놈
  - ex) Student, Lesson 테이블
    - Student -> Lesson 이 아니라
    - Lesson -> Student (Lesson이 Student 이용)
    - Lesson 테이블에 stdid 컬럼 있음
- String.isEmpty(), Array.isEmpty()
  - if 비교 체크 구문 계속 해야 함
    - ex) if(!a || !a.length){}
  - => 옵셔널 체이닝 연산자 이용!
    - ex) if(!a?.length){}
  - 귀찮음 그때 그때 만들기가..
  - Array.prototype.isEmpty() 따로 만들기 가능
  - 하지만 프로토타입 거는 것은 별로 안좋음
  - 나만의 Array를 만들고 싶다!
    - ex) JArray API
    - JArray(a)
    - JArray 클래스 속에 isEmpty() 함수만 정의해놓으면 됨
    - class JArray extends Array {isEmpty()}
    - findBy(p, v) // p는 프로퍼티 이름, v는 값
    - 프레임워크들은 JArray 같은 것을 미리 다 구현해놨음
  - Array에서 가장 많이 사용하는 메서드
    - map (다 연산해서 리턴되는 것)
    - filter (조건 만족하는 여러개)
      - 한개가 아니라 array로 리턴됨
    - find (조건 만족하는 하나만)
      - ex) arr.find(a => a.name = inp) // inp는 사용자 입력값
      - cf) arr.findBy('name', inp)
      - 나만의 메서드를 만듦 (회사만의 별도 API Document 생기는 것임)
      - mapBy()
    - forEach (for ~)
    - reduce
- 접근자; 정보 은닉성 관련 (캡슐화)
  - private 프로퍼티나 함수들 외부에서 호출 불가 (외부 오염 방지)
  - 클래스 내부에 getter/setter 함수 구현하여 간접 접근 가능
- AOP; 함수 실행 전/후에 어떤 일을 할 수 있음 (마치 DBMS 트리거 같은 느낌)

#

[Reference](https://www.youtube.com/watch?v=AD9fzki-rwk&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=8)
