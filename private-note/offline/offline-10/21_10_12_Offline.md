## [21_10_12 화 오프라인 수업 9]

### _공지사항_

- 강의실

  - 11월부터는 매주 토요일 사용 가능 예정

- 취업 준비
  - 11월 중순부터 이력서 및 면접 대비

### _본수업_

- 딥 다이브

  - 22장 this

    - 일반 함수 / 클래스 A의 생성자 함수
    - 일반함수의 this는 window 객체
    - window/global/globalThis
    - 클래스 속의 this는 생성될 메모리 위치 (인스턴스 위치)
    - 화살표 함수

      - 예시)

      ```js
      // name = 'kim';
      setTimeout(function () {
        const c3 = 3;
        console.log(this.name, c3);
      }, 1000);
      // console은 바깥 말고 그 상위의 window 객체에 있음
      // new 없으면 일반 함수임
      // 따라서 window 객체가 가지고 있는 name 참조함 (문서가 가지고 있는 title)
      // 화살표 함수는 바로 상위의 인스턴스 가리킴
      ```

    - bind 함수
      ```js
      a = new A('홍');
      function f(x, y) {
        this.name;
      }
      f.bind(a); // 호출은 안하고 f() 속의 this에게 a라는 객체 줌
      f.apply(a, [1, 2]); // apply는 array로 줌
      f.call(a, 1, 2);
      ```

  - 23장 실행 컨텍스트
    - 실행 가능한 코드 (스코프)
      - 전역 코드
      - 함수 코드
      - eval 코드
        - eval 함수 안은 string
      - 모듈 코드
        - 코드의 뭉치
        - script 태그 안에 module로 부르는 것은 module 스코프임 <br/>
          (그냥 src 안으로 불러오는 것도 모듈이긴 함)
    - var, const/let으로 선언된 변수의 스코프 각각 다름
    - 사람이 읽기 쉬운 순서대로 (이해하는 순서대로, lexical)
    - 모든 언어는 실행 순서 정하기 위해 call stack이 존재
      - 콜 스택은 메모리에 생김 (CPU는 위치를 찾아가주는 곳임, 스택 만드는 것은 메모리임)
      - 실행 컨텍스트 스택
      - 전역 실행 컨텍스트
        - Lexical Environment
          - EnvironmentRecord
            - Object Environment Record
              - BindingObject -> window
            - Declarative Environment Record
              - const/let
          - OuterLexicalEnvironmentReference
    - 바로 pop 되지는 않고 G.C가 marking 함

#

### [Note]

- 나만의 npm을 만들어서 오픈소스화
- 나의 실력이 포트폴리오 (프로젝트가 다가 아님)
- 학습 to-do list / 컨디션
  - 1번 to-do가 제일 중요 (충분히 할 수 있는 만큼, 범위 작게 잡기)
- 계획은 시간이 아니라 to-do list로 잡자!
- 인스턴스 (메모리에 있는 나 자신, 객체)

  - 스코프에 따라 생기는 시점이 다름
  - 실행 컨텍스트

    - 전역 코드
      - 평가
        - 메모리 위치만 잡음 (위치만 잡음, 사이즈는 모름)
    - 함수

      - 평가할 때 미리 포인터 잡아놓음 (상위, 전역 스코프 연결)
      - 전역은 안쪽의 누구나 포인터 다 가지고 있음

    - 블록

- JS 평가 - 실행
  - JS는 인터프리터 언어
- 인터프리터 / 컴파일러 언어
  - 인터프리터
    - 컴파일 과정 따로 없음 <br/>
      (메모리 사이즈 따로 안잡음, 실행할 때 잡음)
    - JS 엔진의 평가 과정
  - 컴파일러
    - 컴파일할 때 메모리 위치/사이즈 정해짐 (정적 타이핑 언어)
    - 바이트 코드 -> 기계어
- 도메인 vs. 컨텍스트 vs. 스코프
  - 도메인; 넓은 영역/분야
  - 컨텍스트
  - 스코프
- 포인터; 메모리의 위치
- var는 function level scope
- let, const는 block level scope
- primitive type 아니면 모두 참조
- addEventListener
  - event 일어났을 때 그 콜백함수 실행됨
  - event는 그 listen 객체에 종속되서 콜백함수의 this는 그 event listen 객체임 <br/>
    (event.target)
  - 보통 화살표 함수 형태 사용 (this가 굳이 이벤트 대상 객체 가리킬 필요는 없음)
- if 문 안의 블록은 아직 전역 코드 평가에서 안함

- 실행 컨텍스트 직접 그려보기 (연습)

- 매주 화목 5~6시쯤 프로젝트 컨설팅

### [Curiosity]

### _질문_

-

### _개인_

- ```js
  f1();
  const f1 = function () {}; // 오류 발생
  // 메모리 내부 속에서 구체적으로 어떻게 동작?
  ```
