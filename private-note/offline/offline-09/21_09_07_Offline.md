## [21_09_07 화 오프라인 수업 6]

### _공지사항_

- 9/9 (목), 9/14 (화) 휴강 <br/>
  (토요일 보충강의 예정)
- 프로젝트
  - 기획: 종이에 화면 설계 (그려보기), 그림 다 그려놔야 함 (안만들더라도)
    - 종이에 그리자마자 바로 git 세팅 해야함
    - PC/모바일 버전 두 개 다 그려야 함
    - killer contents 필요!
    - 화면 그리기 템플릿 활용해도 됨
    - PC/모바일 버전 두 개 다 만들 예정이므로 화면 가변형 필요
      - 화면의 width로 판단 (width 줄이면 모바일 형식으로 나옴)
      - 미디어 태그 (css) 이용, @media (width 어디부터 어디까지)
      - 트렐로 모바일은 스크롤이 있음
      - 탭 이용
      - 팝업 메뉴 활용
      - 노션은 트리 형태로 구성
    - 기획(종이) => Table Column 구성 (class diagram, ERD)
    - (git flow 잡고 sql 설계 들어가기, 사실 혼자는 필요 없지만 협업시 picture 땀)
    - SQL 설계 (뭐뭐뭐 할 것인지, table 설계 잘 해야 쿼리도 잘 나옴)
    - 우리는 바로 화면을 만들 것임
      - UX design (publishing) // HTML, CSS로 웹페이지 구성 (master, develop 브랜치)
      - 예: `<button>` 태그 만들어 놓고
      - 이후 onclick="fn" 이벤트 달기
    - ESLint, Prettier 설정은 필수
    - 여러 프로젝트 동시에 하면서 버겁다 싶으면 과감하게 바로 기능 빼버리기
    - 위키는 text 타입으로 해도 됨 (fulltext도 가능)
    - 만약 NoSQL 쓰고 싶으면 MySQL Dev API
    - 설계 하면서 바로 코딩 들어갈 수도 있음 (보통 서버 -> 클라이언트 개발 순서는 워터풀)
    - Agile하게 개발
  - HTML로 처음에는 안이쁘게 만듦 (나중에는 리액트, 리액트 네이티브 활용)

### _본수업_

- 디자인 패턴

  - GoF
  - 옵저버 패턴 <필수 숙지!>
  - 목적: de-coupling (M - V 분리)
  - 화면그리기 (react; render)
  - publisher/subscriber
  - 예시) 선생님 (추적기 붙이는 순간 observable 한 객체)
  - 1반 반장, 2반 반장 (observer)
  - 객체의 어떤 상태가 바꼈을 때 notify 해줌
  - 상태 변화 추적에 활용
  - 상태 바꼈을 때 필요한 애들한테 notify
  - observable에 observers [], subscribe(), notify(), unsubscribe()
  - 선생님.subscribe(this), this는 나 (1반 반장)
  - 선생님.unsubscribe(나 - 1반 반장)
  - board 상태가 바뀌면 view가 바꿔줘야 함
  - User, Board -> observable 상속
    - 로그인 할때는 유저 정보
    - 보드에 들어왔을 때 subscribe() 해놓으면 자동으로 ~

- 커맨드 액션 패턴 (약속된 명령)

  - Redux, useReduce 등에서 dispatch, ...

- 머슴이 있고 하녀가 있고 양반이 있다고 가정하면, <br/>
  양반이 머슴한테 심부름 시키면서 머슴한테 하녀가 식사 준비하라는 것을 콜백으로 줌..<br/>
  요리는 하녀가 함 <br/>
  콜백은 얘가 갔다오면 얘한테 시킴 <br/>
  cb = 요리하다() 를 머슴한테 줌 <br/>
  cb = 요리하다(고기) // 하녀가 고기 받아서 요리를 함 <br/>
  cb = 하녀.요리하다(고기), 머슴.심부름(cb) ~~~ cb(고기);

- MVC 모델 (MVC 디자인 패턴)
  - 클라이언트에서 나온 디자인 패턴
  - Model - View - Controller
  - Model: data
  - View: 화면
  - Controller: 지시자 (control)
  - ex) 모델에서 카운터로 1 증가하면 view로 화면 다시 그려야 함
  - 리액트는 뷰만 있다고 해서 라이브러리
  - 3개 모두 다 갖추면 프레임워크
  - 서버도 MVC 패턴
    - 받은 json은 모델
    - 뷰는 없지만 controller로 db 사용
    - 타임리프는 SSR (서버 사이드 렌더링)

### _코드리뷰_

- Dom 객체 IIFE 활용해서 만든 것 너무 멋 보인 느낌...
  - 객체 return의 무거움?
  - 객체로 따로 만드는게 덜 무거움 (JSON 같은 것으로)
- resetBtn에 대해서 Dom 관련 따로 묶기 (위에 만든 객체 이용해서)
- Dom 객체에 대해서 innerHTML 속성 사용 (중복 발생) <br/>
  => Dom 따로 모아놓은 곳에서 setter 함수 세팅도 괜찮 <br/>
  innerHTML, innerText, textContent 등 다양하게 사용할 수 있도록 만들기
- set으로 만든 것은 너무 부담이 많이 감 <br/>
  set.size도 부담이 큼 => 차라리 array가 나음
- checkStrike와 checkBall 합치기 (결국 for 2번 돌게 됨)

#

### [Note]

- 오픈 시점에 따라 시스템 차이 큼
- UML 필수! (자율 공부)
- UseCase, Class, Sequence Diagram (3개 기본, 특강)
- Node.js 디자인 패턴 (책 굳이 안사도 됨, 중요한 것만 뽑아서 함)
- value object 안에는 각 column이 들어있음 (property)
  - property, method 정의되면
  - 클래스 다이어그램 생성 가능
- S/W 공학
  - UseCase diagram (요구사항 수집)
    - 명사: Objects, 동사: functions
    - 전체 기능 한 눈에 보임
    - 손으로 diagram 그려야 창의력 향상 가능
    - 예시) 보드 생성
      - 사용자 -> 가입 -> 이메일 가입, SNS 연동 가입 (google, twitter, ...)
      - 사용자 -> 로그인 -> 보드 생성 -> 보드 타입(private, project, public) 점선으로 설명 표시 가능 <br/>
        보드타입 (가정사, 등 세분화도 가능) ->
      - 사용자는 명사, 로그인은 동사, 보드는 명사, (보드)생성은 동사
      - User => +name, .id, regist(), login()
      - Free User / Premium User 는 저 User 를 상속 받음 (protected, public만 변경 가능, private는 변경 불가)
      - protected (상속은 되지만 외부에서는 접근 불가)
      - Board <- 세 타입 (상속) // 클래스 다이어그램
- git flow
  - -uf 사용하지 말기 (잘못하면 서버 커밋 다 날라가서 팀원 피해...)
- DB 연동은 node js로 fetch 이용해서 할 것임 (axios도 안씀!)
