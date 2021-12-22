# 소셜 북마크 프로젝트

- 보드

  - private; 나만 사용하는 것
    - To Read (읽기 전용)
    - To Study (keep)
  - protected
    - Team Project (공유, public 하지는 않음, 팀원만)
      - keyword - hashtag tagging
      - 팀에서 같이 공용으로 사용하는 것만 여기에 두기
      - 공용 아닌 다른 것은 private로 따로 구성 필요
      - title -> 상세 페이지
      - 회의록 -> markdown editor (직접 만들 필요는 없음)
        - 에디터 직접 만들어 보는 것도 좋은 기회임
  - public
    - Topic
      - ex) 리액트 구인, 카카오 페이 공고, 광고 등
        - 스팸 글 방지 위한 기능
          - 좋아요 표시 많이 받은 것
          - 좋아요는 어떻게?
          - 하나의 task(topic)에 대해서 좋아요 2번 클릭 가능하면 안됨
          - 로그인 필요!
          - 시스템 부하 적도록 하면서 좋아요 한번만 누르게 하기 위해서 어떻게? -> 고민!! 검색 X
          - 신고 버튼 -> 스팸 광고 블랙 리스트 관리
        - 광고 기능
      - stack overflow 같은 Q&A 기능
        - slack 채널 같이 채팅 연동 (국내용)
        - 화면 공유
        - point 얻을 수 있음 -> point 활용하여 입사 지원에 활용 가능
      - hashtag tagging

- 모바일

  - 미디어 쿼리 (가변형 화면 디자인)
    - 화면 좌/우 슬릭 (drag & drop)
    - 탭으로 이동
    - 팝업 - 이동 -> 보드 선택
    - 노션 같은 트리 형태

- git은 처음부터 시작해서 history 남기기 (+ git flow)
- 기획(종이); 요구사항 수집, usecase diagram, 명사/동사
  - usecase diagram
    - 보드 생성
      - 사용자 - 가입 - 이메일, SNS(구글/트위터/카카오/네이버)
      - 사용자 - 로그인 - 보드 생성 - 보드 타입 설정(private/protected/public)
        - ..... or 말풍선 형태 (설명)
        - 종이 접힌 형태 (설명)
        - 사용자가 보드 타입 설정 추가도 가능 (커스터마이징)
          - ex) 가족, ...
    - 명사; User
    - 동사; 생성, 가입, 로그인, ...
- ERD; 명사 -> Object(table), 동사 -> Function/Method
  - table, object 1:1 => value object
  - table column => object의 property
  - 동사 => object의 method
  - class 정의
  - class diagram
    - User; private은 -, protected는 #, public은 +
      - name(+), passwd(#)
      - method; regist(), login()
      - User <- FreeUser, PremiumUser (상속)
      - 자식에서 부모의 private은 못가져오고 protected 까지만 가져올 수 있음
    - Board
      - Board Type 상속
  - ERD
- SQL 설계; 쿼리 설계
- UX 디자인 (보통 기획 이후 바로 들어감) / 퍼블리싱 (웹 페이지 디자인) <- HTML/CSS

#

### [Note]

- node + socket.io

  - socket.io 이용해서 좋아요 기능 구현

- 창업은 내가 잘하는 도메인에서 시작
- 우선 작게 시작 (기획 + 설계)

  - DB 설계; ERD, Queries (CRUD)
  - 쿼리 하나가 나중에 기능별 API 하나가 됨

- 보드 - task
- 버전
  - 0.1.0 (보통 시작 버전)
  - 0.0.1 (기능 작게 시작)
- 개발 환경 설정; ESLint, Prettier 세팅
