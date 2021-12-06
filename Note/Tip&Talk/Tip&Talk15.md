## {결석자용} 프로그래밍 기초 이론 공부 순서와 요령, XP, 여러 Diagram 소개

### _프로그래밍 공부_

1. 언어 (깊게 공부)
2. 컴파일러 (컴퓨터 논리적인 개념)
3. 아키텍쳐 (컴퓨터 물리적인 H/W 개념)
4. 자료구조 & 알고리즘
5. Design Pattern (어떻게 코딩, 옵저버 패턴, 퍼사드 패턴, ...)
6. Refactoring
7. Network
8. S/W Engineering (개발 방법론 - Scrum, Agile, RUP의 diagrams, 디자인 패턴, ...)
9. OS

추가) Database

#

### [Note]

- 언어와 컴파일러를 같이 공부해야 시너지 효과가 큼
- XP (Extreme Programming)
  - Pair Programming (지식의 융합, 시너지)
  - Standup Meeting
  - Refactoring (중복 코드 제거, 함수 분리, ...)
- Agile
- Scrum
- Lean Startup (창업 관련)
- 커플링; 함수 간, 네트워크에서 서버 간 (웹 서버 - DB 서버), nginx - node <br/>
  (커플링이 적을수록 가벼워짐, 하지만 너무 가벼워지면은 안됨)
- MSA (MicroService Architecture); 커플링 제거, 모듈들을 다 쪼갬
- RPC (Remote Procedure Call); 요즘엔 잘 안씀 <br/>
  (너무 떨어져 있어도 소통 비용 증가)
- Diagrams
  - Component diagram
    - React
    - 컴포넌트 속에 여러 함수가 있음 <br/>
      컴포넌트 속에서 함수 단위도 설계 가능
  - Class diagram
    - ex) Animal 클래스 (네모) <- Cat 클래스, Dog 클래스 [상속 받음] <br/>
      눈코입 인터페이스 (동그라미) <----- Cat 클래스 <br/>
      [인터페이스는 구현은 안하고 정의만 함, 이후 구현 객체 ~]
  - State chart diagram
    - 순서 그리기
  - Activity diagram
  - Deployment diagram
    - 서버를 어떻게 구성할지
    - 노드, 플라스크, nginx, ...
  - Sequence Diagram
    - instance 그리기
    - 변수/컴포넌트 등 모두 다 instance 될 수 있음
    - ex) login component 활성화 됨 (instance 됨) <br/>
      -> id, passwd 틀렸을 때 Alert 뿌리고 사용자 한테 메세지 박스 가고, ... <br/>
      -> 로그인 성공 시에는 Home 컴포넌트가 활성화됨 <br/>
      (각 인스턴스들을 보면 코드가 그대로 보임) <br/>
      그림을 그리고 코드로 generate 가능 (순/역공학)
- Github (MS) - Copilot
- 자료구조 & 알고리즘도 그림으로 표현 가능 (ex. sequence diagram)
- flow chart
- 지식간의 연결이 생김 => 시너지 => 폭풍 성장 => 책의 내용이 나의 이야기가 됨
- 책 처음 읽을 땐 쭉 빠르게 보기 <br/>
  2회독 할 떈 설명하면서 보기 <br/>
  3회독 부터는 볼펜이나 형광펜으로 중요 부분 체크하면서 보기 <br/>
  (반복 부분은 book dart)
- 책이 너덜너덜 해질 때까지 보기
- 디자인 패턴 <- 소통 위해 필요함
- 2년 정도면 client & server 기술 + 이론 다 배움 (풀스택)
- 책 사고 버리지는 말기 (나중에 언젠가는 봐야 함, 지금 안읽더라도 눈에 보이는 곳에 놔둬야 함) <br/>
- 손코딩 연습
- 코드를 내가 설명할 수 있어야 함! (설명 습관)

#

[Reference](https://www.youtube.com/watch?v=t1jfnlPvNSs&list=PLEOnZ6GeucBXxALyjhnC-kwXdHelCPfEx&index=4)
