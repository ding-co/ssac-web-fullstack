## [21_08_21 토 오프라인 수업 3]

### _공지사항_

- 야구 게임 만들기 과제 (JS)
- ssac.topician.com (amber로 제작)
  - 비공개 동영상 => 교재 영상 오픈
- Kakao Developer - amber <br/>
  넷플릭스 - react (채팅) + amber

### _본수업_

- 개발 필독서 학습 순서 [추천] <br/>
  (실무하면서 2~3년 정도 소요, 깊이 있게는 안하고 쭉 읽음)

  1. 언어 깊이 있게 학습할 수 있는 언어 ex) 딥 다이브, 러닝 리액트, 타입 스크립트,...
  2. 컴파일러 (언어와 병행) - 컴퓨터 논리적인 설명
  3. 컴퓨터 아키텍쳐 - 컴퓨터 물리적인 설명 (H/W)
  4. 자료구조 & 알고리즘 (코딩 시 큰 도움 됨)
  5. Design Pattern
  6. Refactoring (XP, Agile 등 개발 방법론)
  7. Network (BE 서버 개발)
  8. S/W 공학 (개발 방법론 - Scrum, Agile, RUP의 여러 diagrams,...)
  9. Operating System

- 코드 리뷰 (2주차 리눅스 과제)

  - 함수 모듈화, 예외 처리 로직에서 인자 받는 것을 변수로 세팅
  - `nginx -s reopen` <br/>
    => 꺼져 있는 상태에서 reopen 하면 안켜짐, 켜진 상태에서 해야 함... <br/>
    (nginx 명령어 세팅 원래 그렇게 되어 있는 것임)
  - if elif else 구문 한 줄씩 띄우기 (가독성 위해)
  - "Usage: start < mysql || nginx >" <- format 형식 알려주기
  - .sh 파일 안 명령어에 상세한 경로 적어주기 (crontab 위해) <br/>
    => root뿐만 아니라 다른 user도 접속해서 명령어 작용할 수 있도록 하기
  - nginx도 systemctl 이용해서 데몬으로 키게 하기
  - exit 0 / exit 1 은 상관 없음 (에러는 아니기 때문)
  - exit 0 굳이 필요없음 (if문 밖에 코드 없기 때문)
  - `#!/bin/sh`로 하면 default shell로 돌음 <br/>
    bash로 해도 됨 (sh가 bash 포함)
  - `exit`는 가능하면 코드 중간/아래에 쓰지 말기 (위에는 괜찮은데..)
  - `grep`은 단어 검색
  - `grep --help`
  - `grep --help | grep -r`
  - `=~` (부분 검색)
  - 백틱은 도커 명령어임
  - `grep -v`로 제외
  - ps는 process
  - 전역변수는 관례적으로 모두 대문자
  - 세미콜론은 개행의 역할 (코드 표준 스타일로 일관성 지키기)
  - 다른 데몬 사이의 순서, 실행 등도 고려해서 예외 처리 로직 구현 <br/>
    (실행 안 되어 있으면 경고 메시지 등 출력)
  - $OPTARGS 처음에 컴파일시 미리 hoisting 됨
  - `-z`
  - `nginx -s reload/reopen`
  - `systemctl enable`만 해줬으면 reboot 해도 뜸 (필수) <br/>
    (systemctl or nginx로 띄우든 간에 상관없이)
  - `systemctl restart nginx`

#

### [Note]

- 여러 게임 만들어보기 (블랙잭,...) <br/>

  => 코드 리팩토링!

- 스스로 짜본 코드는 깃헙에 기록 (의미 있음 -> 계속 발전)

- Lean Startup 책

- 깃헙 Copilot - 코드 유출 문제 등...

- MSA (Micro Service Architecture)

  - 모두 세부적으로 다 쪼갬 (Coupling 제거)
  - 연동하는 것이 매우 힘듦
    - RPC (Remote Procedure Call) - 최근엔 잘 안씀
    - 너무 떨어져 있어서 소통 비용 증가

- 프로젝트 설계

  - 클래스 상속, 인터페이스 (변수나 함수 정의, 구현 X) 등 관계를 diagram으로 그려야 함
  - component diagram, class diagram, <br/>
    deployment diagram (서버 구성), sequence diagram (instance 표현 -> 코드가 보임) <br/>
    등 필수 diagrams 숙지 필요!!! (자료구조/알고리즘도 표현 가능)

- XP

  - pair programming <br/>
    (지식의 융합, 시너지 효과, 학습 효율 증대)
  - Standup Meeting (최소 비용. 최대 효율)
    - 중요 이슈 공유
    - 말은 너무 길어지지 않도록
  - Refactoring
    - 중복 코드 제거
    - 함수 단위로 분리 (coupling 최소화)

- 자료구조&알고리즘

  - 먼저 내가 코드 짜보고 비교 후 이해

- 교재 읽으면서 연필로 체크 (궁금점, 헷갈리는 부분 등...) <br/>
  유튜브는 그때 순간 뿐이고 책 읽는 것이 좋음 (언제 어디서나 꾸준히)
