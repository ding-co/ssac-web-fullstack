## {풀스택#22} MySQL - 데이터 모델 설계, 실무 프로젝트 시작과 설계

### _소프트웨어 개발 주기_

- Agile
- flexible iteration
  1. 계획 /기획
     - 요구사항 분석
     - 사용자 interview
  2. 분석 및 ideation
     - 기획자: 기획서
     - 개발자: Use Case diagram
  3. UI / UX 설계
     - 디자이너: UI / UX 설계
  4. DB 설계 (모델링)
     - 개발자: ERD, EERD
  5. S/W 및 Infra 설계
     - Infra: Cloud, Web 서버, DB 서버
     - 개발자: Class diagram, Sequence diagram
  6. 구현
     - 디자이너: UI / UX 스타일 표준 정하기
     - 개발자: 코딩 convention, 개발 방법론, release 방식 등 정하기
  7. 테스트 및 통합
     - 통합: 분산된 시스템 하나로 통합
     - TDD (테스트 주도 개발): 구현 전에 unit test 먼저 만들고 구현
  8. 오픈 (Release)
     - 베타 오픈 (MVP 모델)
     - 서비스 런칭 오픈
  9. 유지보수 (운영)

### _Database Modeling_

1. 개념적 (Conceptual, Contextual) 모델링

   - Entity 도출 (임대인, 임차인, 중개인, ...)

2. 논리적 (Logical) 모델링

   - ERD 작성
   - Data 구조 및 속성 (column, type 등) 정의
   - 무결성 정의 (FK 관계 형성) 및 정규화(Normal Form, NF, 중복 데이터 제거 등)

3. 물리적 (Physical) 모델링
   - Schema(DB), Table, Index 생성

### _DB 모델 설계_

- 요구 사항 분석
- Use Case diagram 작성
- Entities, Functions 도출
- Relationships - E(E)RD 작성
- 생성 (Pysical Modeling)

### _S/W 설계_

- Use Case Diagram (요구 사항 분석)
  - User가 어떻게 사용하는지
- Deployment Diagram
  - 서버 어떻게 구성되는지 (cloud, web server, db server 등 구성도)
- Sequence Diagram
  - instance 들이 언제 생성되고 소멸되는지 (생명주기, 행동 등)
- Class Diagram
  - class 구성도 (상속, 멤버 변수/멤버 함수, structure/behavior diagram...)
- State Diagram / Flow Chart

  - 데이터/변수 상태 변화도 (transition, action, state,...)

- 참고
  - Role & Responsibility
  - 서버, DB, 언어 등 선정
  - Source 및 코딩 규약 정의
  - 방법론 및 진행 방식 협의
  - Milestone

### _정규화_

- 목표: 중복 데이터 제거, 관계 단순화 (성격 다른 데이터 분리)
- 1NF
  - 원자성 (모든 속성(컬럼)은 하나의 값만 가짐)
  - ex) 공동 소유자는 별도 컬럼으로 분리
- 2NF
  - 완전 함수적 종속 (부분 종속 제거)
  - 모든 속성은 기본키에 속해야 함
  - ex) 임대인 연락처는 임대인 테이블에 종속
- 3NF
  - 이행 종속 제거
  - 기본키 아닌 모든 속성 간에는 서로 종속 불가
  - ex) 기본 주소는 우편번호에 종속 X <br/>
    최근에는 우편번호 테이블 별도로 구성 X
- BCNF

  - 모든 결정자는 후보키에 속해야 함
  - 물건 테이블 외에 임대인 테이블 따로 뺌 (임대인:물건 => 1:다)

- 반(역) 정규화
  - 테이블 반정규화
    - 테이블 중복, 통계(summary)/이력/부분 테이블 생성
  - 컬럼 반정규화
    - 컬럼 합침, 중복/파생
  - 관계 반정규화
    - ex) 관심물건 테이블에 임대인 연락처 컬럼 생성 <br/>
      물건 테이블만 조인하면 되므로 심플해짐

### _모델링 기법(요령)_

1. PK(기본키)가 가장 중요!

   - unique, not null, 변경 X (여러 군데에서 문제 발생 가능)
   - 가능한 1개 컬럼 (복합키로 잡으면 join 비용 부담 큼,...)
   - 실수형 보다는 정수형! (자동 증가 컬럼: auto_increment)

2. 적절한 정규화!

   - 원자성(1NF) 최대한 준수! (최대한 중복 데이터 없도록)
   - 계산 결과 컬럼 최대한 자제
   - Nullable 할 필요 없으면 NOT NULL로 하자!

3. 참조(데이터) 무결성을 위해 FK 정의

   - ON DELETE CASCADE (PK 삭제 시 FK 쓰레기 데이터 됨)

4. 서로 다른 성격의 컬럼들은 테이블 분리!
   - ex) 아파트 단지 테이블, 토지 테이블 등 분리

### _Use Case Diagram 실습_

- MyDeal Modeling
- mydealdb
- Use Case Diagram 작성

  - 칠판에 그리기 (색상으로 구분)
    - 명사는 모두 Entity (table or column)
    - 동사(행동)는 Use Case (행위)
    - <가입 유즈케이스> <br/>
      임차인 -> 회원가입 -> 실명인증 <br/>
      임차인 -> 로그인
    - 페르소나 <br/>
      임대인(집주인 - 별칭): 나이, 거주지, 아파트 소유,... <br/>
      중개인: 나이, 공인중개사무소 대표 <br/>
      임차인(세입자): 이름, 나이, 직업,... <br/>
    - 유즈 케이스
      - 임대인(집주인) -> 로그인(/회원가입) -> 물건 올림 -> 물건 <br/>
        임대인 -> 로그인 -> 계약알림 -> 계약 <br/>
        임대인 -> 로그인 -> 중개인 승인 (중개인 승인 --- 중개인 등록) <br/>
        ->
      - 임차인(세입자) -> 로그인(/회원가입) -> 물건 검색(/추천물건) -> 물건 <br/>
        -> 계약 신청 -> 계약 -> 이사 (종료)
        임차인 -> 물건 검색 -> 물건 -> 찜하기 -> 관심 물건 목록
      - 중개인 -> 로그인(/회원가입) -> 중개인등록 <br/>
        중개인 -> 로그인 -> 계약
      - 계약 종료 전에 가계약, 최종 계약서 작성 (모두 참여)
      - 중개인은 계약 들어갈 때 등기부등본 등 근거 자료 제시 필요 <br/>
        임대인, 임차인 모두 검증 필요
      - 시스템 관리자 -> 로그인 -> 중개대행(중개인 없는 물건) <br/>
        MVP에서는 보통 중요하지 않으니 제외
  - 툴로 그리기 (draw.io)
    - 문서 update 힘듦

- 유즈케이스로 Entity 모두 도출 이후 ERD 작성
- MySQL Workbench 이용

### _Forward Engineering_

### _수정 및 검토_

- reverse engineering
  - 쿼리로 만든 후 diagram으로 확인 (역 정규화)

## [Note]

- MySQL EERD (Enhanced Entity Relationship Diagram)
- 모든 문제는 잘못된 데이터 모델링으로부터 시작됨!
- 초기 DB 설계시 잘 정규화 해놓으면 나중에 유연하게 변경사항 대처 가능
- nginx; 논리적인 서버
- cloud 서버는 device
- instance: 클래스를 메모리에 올린 상태
- table (value object) -> class
- 업무 흐름도 위해서 기획자들도 flow chart 많이 사용
- 반정규화; 데이터 유지 어려움
- 뷰도 매번 조인마다 비용 발생
- 빅데이터에서 반정규화 많이 하긴 함 (성능 위해, 데이터 유지 계획 필수)
- Column은 비싸고 row는 쌈
- 기타정보를 모두 컬럼으로 만들면 낭비임 <br/>
  기타정보라는 테이블을 분리해서 type, value를 row로 만듬 <br/>
  column -> row로 변경 (자주 사용하면 역정규화, 기타정보 컬럼 무수히 많으면 분리)
- persona - 가상 대표 인물
- 비밀번호는 단방향 암호화 (ssh 512 쓸 것이므로 varchar(256)로 세팅)
- 주민번호는 양방향 암호화 (암호화 후 나중에 복호화, varchar(60) 이상 세팅)

#

[Reference](https://www.youtube.com/watch?v=GroeyzBNhfU&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=23)
