## [21_09_02 목 오프라인 수업 5]

### _공지사항_

- 과제

  - 매주 목요일까지 과제 제출 (최대한 코드 리뷰 전까지)
  - 다음 과제: 선정한 프로젝트 DB 설계서 작성!!! (9월 한달 안에 프로젝트 다 마무리 해야함) <br/>
    기획은 화면, 설계는 MySQL로 DB 설계
  - 기획 -> 설계 <br/>
    아직 서버 안배워서 HTML/CSS/JS로 구현 시작 (mock data 활용) <br/>
    => node express로 서버 만들고 (배우면서) => 리액트 Client (배우면서)
  - fetch, Axios는 써도 됨, 하지만 jQuery.ajax는 최대한 안쓸거임 <br/>
    순수한 자바스크립트로 최대한 구현할 것임, Material UI는 안할거임 (개인 자율)
  - HTML, CSS, JS 위주로 최대한!
  - 2주 동안 DB 설계까지 끝내야 함 (쿼리까지 다 구성해야함, API) <br/>
    기능에 따른 MySQL 설계, 쿼리, 등 까지 모두 해야 함
  - 간간히 코드 리뷰 진행할 예정

- 프로젝트 설명

  1. 소셜 북마크
     - 순서
       - 1단계: HTML/CSS/JS => To Read, To Study (private)
       - 2단계: 서버 => 프로젝트 관련
       - 3단계: 소셜까지 가서 오픈/홍보, 광고, ...
     - 북마크 저장, 삭제
     - 1회성 북마크 (To Read, private)
     - 공부할 stuff keep 북마크 (To Study, private)
     - 팀프 관련 (테스크); 3000, 8000, 개발, 실서버, webRTC, ... (Project,) <br/>
       팀만 쓸 수 있는 것만 남김
     - 토픽 (보드) ex) 리액트 구인
     - 스팸 막기 - 좋아요/싫어요 표시 수 기준 (중복 클릭은 불가능하도록) <br/>
       => 로그인 필요 (id/passwd) -> node, socket io 연동 (real-time)
     - 좋아요/싫어요 표시 수 1회로 제한하기 위해 어떻게 하면 좋을까 <br/>
       꼭 유명 기업들 방법 따라할 필요 없음, 내가 생각하는 것이 중요
     - 신고 기능
     - 마크다운문법; 이미지 쉽게 붙이는 기능은 어떻게?
     - 실시간 채팅 기능 -> 질의응답 (slack 비슷하게) <br/>
       화면 공유, 답변 받은 사람에게 포인트 주는 방식 (스택오버플로우) <br/>
       이런 내용들을 위의 보드 ex) 리액트 구인으로 연동 ...... 등
  2. Advanced ToDo

     - ToDo / Doing / Done
     - ex) 하나의 비즈니스인데 프로젝트가 4~5개 <br/>
       homepage(react,Next,html..), <br/>
       customer(react hybrid), <br/>
       admin, server, lecture, ...

     - 중요 , 급함 (4사분면)
     - 스케쥴링

       - 전환 비용 발생
       - 각 태스크 별로 스케줄링 연결
       - 일단 log만 서버에 남기기 (머신러닝은 나중에)
       - 처음엔 사용자들에게 스케쥴링 하도록 함
       - 집중도에는 한계가 있음 <br/>
         집중도에 대한 시간도 관리해줄 수 있는 장치 필요
       - 회사뿐만 아니라 가정, 동호회 등도 소셜 태그를 활용해서 확장 가능

- 팀 프로젝트

  - 9월 말까지 팀 빌딩 및 주제 선정, 화면 설계 (기획) 등 다 완료! <br/>
    (최대한 빨리 기획 및 설계까지 마무리!, 완벽한 기획은 없음)
  - 10월부터 본격적으로 구현 시작

- 성호님 다른 프로젝트 선택해서 하시는데 우리 모두 컨트리뷰터로 함께 진행

### _본수업_

- 성호님 코드 리뷰 (성호님만의 코딩 스타일)

  - 주석으로 구조 잡기
  - 중간 중간 만들어야하는 기능 (해야 할 일) 있으면 주석으로 <br/>
    나만의 태그로 달아놓기 ex) `TODO: `

  - 항상 quit/retry 기능 있어야 함
  - 주석은 마지막에 다 제거! (주석은 함수명으로 다 커버쳐야함)
  - 2중 루프 쓰기 싫지만 일단 생각 안나면 써놓고 이후 리팩토링
  - 전역변수는 식별자 맨 앞에 g 붙임
  - (Command + \ => 창 2개 뜸)
  - 바깥 -> 안으로 들어가는 느낌으로 코드 짜기
  - reset/end game은 제일 밑으로 빼놓기
  - return 함수()
  - 순환할 때 많이 사용하는 것이 mod (%) 연산자
  - 소스의 구성
    - includes, splice 등 메서드 사용하지 않고 로직 짜보기

  ```js
  const MAX_TRY_COUNT = 9;
  const ANSWER_NUMS = [0, 0, 0];

  // set answer
  function setAnswer() {}

  // question

  // readline

  // check validation

  // end game with score (win or fail)
  ```

- 코드 리뷰 (다음주 화요일까지 리팩토링 후 진행)

#

### [Note]

- 수료하고 더 공부해야지 <- 안좋음!
- 취업하고 일 다니면서 공부하는 것이 제일 좋음 <br/>
- 창업 준비는 회사 다니면서 주말과 그외 시간에 MVP 모델까지 만들고 이후 본격 시작
- 창업은 5년안에 거의 98~99% 망함..
- 창업은 경력으로 취급 가능 -> 이후 경력직으로 입사도 가능
- 창업해보고 취업하는 것도 좋음
- 추천 코스: 창업 -> 실패 -> 취업 2~3년 -> ...
- 창업 책 추천
  - 린 스타트업
  - 백달러로 창업?
- 개발자의 덕목: 문제 해결 능력 키우기
- 기업 케이스
  - 노션; 핵심 기능 하나 만들고 확장
  - 페이스북; 일단 전체 만들어 놓고 핵심 기능 탑재
- 브라우저 커서 컨트롤 how??
- 창업은 내가 잘하는 도메인에서 시작하는 것이 좋음

- node js terminal I/O

  ```js
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', function (line) {
    console.log('hello !', line);
    rl.close();
  }).on('close', function () {
    process.exit();
  });
  ```
