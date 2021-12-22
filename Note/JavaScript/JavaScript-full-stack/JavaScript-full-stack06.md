### {풀스택} JavaScript 6강 - 객체 지향 프로그래밍을 듣다 보니 어느새 타입스크립트의 인터페이스까지 알게 되었네?!

### _객체 지향 프로그래밍 (OOP)_

1. 상속 (Inheritance)

   - Animal <- Cat, Dog
     - Animal; eat()
   - 메서드 오버라이딩
     - Dog; eat() {super.eat(); 허겁지겁...}
     - Animal과 Dog에 있는 eat()는 다른 함수 (프로토타입 다름)
     - 최상위 Object 클래스 상속 받음 (프로토타입 다 가져옴)
     - 프로토타입에 함수, 프로퍼티 다 달아놓음 ex. 굴비
     - 자식에서 부모에 있는 prototype을 끌어옴
     - ES5 까지는 모두 프로토타입으로 개발 했음 (상속)
     - 중간에 jQuery 조금
   - 메서드 오버로딩

2. 다형성 (Polymorphism)
   - ex 자바) Animal ani = new Cat(); // new Dog();
   - ani.eat('치킨');
   - ex 타입스크립트) morning(ani: Animal) {}
   - 추상 클래스, 인터페이스 (어떤 것이 와도 됨)
3. 은닉성 (캡슐화)
   - 접근 제한자
     - public; 누구나 다 어디서든 접근 가능
     - private; 내 시스템만이 가지고 있는 정보를 외부로 공개 X (정보 감춤)
     - protected; 일반적으로 직속 자식만 부모 정보 접근 가능

#

### [Note]

- 클래스 다이어그램
- Array.swap 메서드 만들기
  - ex) arr1 = new Array(3);
  - arr2 = Array(3)
  - arr1.swap(arr2)
  - arr1과 arr2의 메모리 주소는 안바뀜
  - 내부 속 값끼리 서로 swap됨 (외부에서 봤을 때는 순수함수임)
  - Array.prototype.swap = (arr) => {}
- 클래스 vs. 인터페이스
  - 클래스; 인스턴스 찍어내는 틀
  - 인터페이스 자체는 인스턴스 만들 수 없음
  - 인터페이스는 동그라미로 그림 (클래스는 네모)
  - 인터페이스 장점
    - 내가 화상 채팅 앱 만들고 다른 슬랙/줌/트렐로 등과 연동하고 싶음
    - ex) 줌; 접속(), 화면공유(), 오디오on/off() // 3가지 기능
    - 나는 저 3가지 함수 구현만 해서 인스턴스에서 호출하면 연동해서 기능 사용 가능
    - 줌은 저 3가지 인터페이스만 만들어 놓고 우리는 함수 내부 구현
    - 줌에서 제공해줘야 함 (함수 이름만 있음)
    - 모든 플랫폼은 거의 대부분 다 인터페이스임
  - ex) 만약 내가 클라우드 서비스 구축
    - 내 인터페이스는 표준 SQL (다른 DB 다 붙을 수 있음)
    - 다른 DB vendor들이 제공 안해줘서 내가 함수 다 구현해야함
    - instanceof mysql => mysql 실행
  - 추상 클래스로는 공통적인 코드 미리 만들어놓을 수 있지만 인터페이스는 구현체에서 다 내부 구현 필요
  - 힘 있으면 인터페이스로 선언
  - 힘 없으면 추상 클래스로 공통부분 코딩

#

[Reference](https://www.youtube.com/watch?v=8DkMLlaCo1s&list=PLEOnZ6GeucBW11uFNvzxToKym9Zv74hxh&index=7)
