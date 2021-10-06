## [21_08_28 토 오프라인 수업 4]

### _공지사항_

- 과제
  - 과제 완성 못해도 완성 못한 버전으로 제출 가능
  - 과제는 배운 한도 내에서 최대한 열심히 하기 <br/>
    (뒤의 내용 미리 사용해도 상관 없음)
  - 과제 점수는 크게 중요하지 않음
  - 성호님 일요일쯤 비공개로 올린 과제 코드 확인 <br/>
    (배운 범위 내로 구현)
- 코드 리뷰는 곧 영상 촬영 예정 (유튜브)

### _본수업_

- Tip&Talk 자바스크립트 역사 (프로그래밍 언어 트렌드)

  - 트렌드
    - 인기 있는 언어라고 해서 좋은 언어는 아님/많이 사용하는 언어도 아님
    - JS, HTML/CSS, SQL, TS
    - MySQL, SQLite (file 다루기 유용), MS-SQL, Redis (메모리 DB), DynamoDB (document base)
    - AWS, GCP, AZure, Heroku, OCP
    - React, Express, Angular, Vue, ASP.NET Core, Amber, Svelte
    - 함수형 언어
    - 개발자 풀이 적으면 평균 연봉이 올라갈 수 있음 (통계상)
  - 연대별 언어
    - 1943 애니악 (앨런 튜링)
    - 1951 어셈블리 (기계어에 가장 가까운 언어)
    - 1954 포트란 (공학용)
    - 1958 LISP (함수형 언어의 근간)
    - 1959 COBOL (소스 코드에 데이터 같이 있음)
    - 1964 BASIC (초중고 교육용)
    - 1969 Pascal (대학교 수학 교육용)
    - 1970~1984 CommonLisp
    - 1972 C
    - 1975 Scheme (함수형 언어)
    - 1978 SQL
    - 1980 Self (함수형 언어)
    - 1983 C++
    - 1984 MATLAB
    - 1986 Object-C (애플), ErLang (금융, 주식)
    - 1987 Perl (네트워크 장비, 쉘 스크립트로 DB 접근 가능)
    - 1989~1998 XML (데이터 표준, 파싱 무거움)
    - 1989 ~ 1991 HTML
    - 1990 Haskell
    - 1991 Python
    - 1993 Ruby, R
    - 1991~1995 Java
    - 1995 JS, PHP, Delphi
    - 1996 Rust, CSS1
    - 1999 XSLT -> CSS3 (2005)
    - 2001 C#
    - 2009 Clojure
    - 2003 Groovy, Go, Scala
    - 2011 Xamarin, Dart, 엘릭서
  - JS의 탄생
    - 1989 URL, HTTP, HTML -> Hypertext Browser (팀 버너스리)
    - 1993 NCSA Mosaic Graphic Browser
    - 1994 Mosaic Netscape 0.9, Mozilla
    - 1995 Mosaic Netscape -> Netscape Navigator
  - JS의 발전
    - 브랜던 에이크 (Self, Scheme 전문가)
    - LiveScript
    - JavaScript
    - ECMA
  - ECMAScript
    - European Computer Manufactures Association
    - 2011 ES5
    - 2015 ES6
    - 2021 ES12 (replaceAll())
  - TypeScript (2012~2019)

- 숫자 야구 게임 코드 리뷰 (자율)

  - ESLint, Prettier 필수 익스텐션
  - 선언적 함수 -> 페이지 로드 시간 고려 필요 <br/>
    (공통적으로 다 쓴다면 괜찮을 수도 있음)
  - init은 생성자 함수라고 생각할 수 있으므로 함수명은 읽기 좋게 길게 쓰기
  - 함수 네이밍 ex) get ~ is ~
  - 변수 선언/정의도 따로 함수로 빼는 것이 좋음 <br/>
    document ready 체크 (load) <br/>
    DOM ready 안될 때 체크하는 것이 중요!
  - Math.random() 에 숫자 곱하는 것 그 숫자를 따로 상수로 빼는 것도 괜찮을듯
  - array의 include(), from() 함수 등 따로 직접 만들어보는 훈련 좋음 <br/>
    (알고리즘 시험)
  - DOM 관련된 것은 따로 함수로 만들어서 분리하는 것도 좋음
  - lazy loading (DOM 먼저 로드된 이후 실행해라~)
  - head 태그에 script 태그 넣기 vs. body 태그 아래에 script 태그 넣기
    - head 태그에 넣으면 다 로드된 이후 실행됨
    - 하지만 head 태그에 넣었다고 해서 DOM 모두 구성되는 것은 아님
    - DOM은 메모리에 올라갔지만 DOM tree를 모두 구성해야 그것이 다 ready 된 것임
  - === true 나 === false 이런 코드 없다고 생각! (! 붙이면 됨) <br/>
    boolean 끼리 연산 X
  - Array.keys()
  - for in vs. for of
  - style 색상 속성들도 모두 따로 함수로 빼기
  - for loop 돌 때 array.length 를 따로 변수로 빼는 것이 좋음 <br/>
    array 크면 그만큼 또 돌아야 하므로 시간 느려짐
  - input value에 대해서 substring으로 0~2로 잘라내기 (일일이 키코드 등 if 조건 걸지 말고)<br/>
    - NaN이 아니면 ~
  - if 조건 내용 많으면 한 줄씩 구분
  - 중복 코드 무조건 함수로 빼놓기 (나중에 없애는 한이 있더라도)
  - 인덱스 i, j, k, l, m, n
  - DOM 객체 가져온 변수는 맨 앞에 $ 쓰는 것이 관례
  - string literal은 항상 참

- 과제형 프로젝트 선정

- 옵저버 패턴

#

### [Note]

- 알고리즘 문제 꾸준히 조금이라도 풀기 <br/>
  (언어는 상관 없음, 나의 생각대로, 너무 답안대로 X)
  - split 사용하는 것 보다 바로 인덱싱하는게 더 빠름
  - 정규식은 빠름
  - 빠른 모듈 있다고 하더라도 날로 코딩해야 함!
  - 예시) zero ~ nine 있고, 1nine297three => 모두 숫자로 변환하는 문제
    - 컴파일러 알면 토크나이즈 이용?
      - three two 처리 (2번째 문자도 보고...)
    - 정규식 이용?
- TS pre-compile(transpile) -> JS
- Django -> Flask -> Fast API
- Docker
  - 개발 서버는 실제 서비스용/Cloud/release 서버 환경과 동일하게 구성함
  - 개발 서버는 Q/A, Stay 테스트 서버용
  - 개발 소스는 배포 직전 소스
  - local PC VS Code -> 개발 서버의 도커 컨테이너에서 테스트 -> 실 서비스 서버의 도커 컨테이너로 배포
  - 최근에는 local PC에서 깃헙에 커밋 후 개발 서버에서 pull 받아서 하기도 함 (소스코드) <br/>
    (C++, C, Java 등 언어마다 컴파일러 다름, JS는 컴파일 필요 없어서 괜찮음) <br/>
    사실 FTP, NFS rsync 등 써도 됨 방식의 차이일뿐
  - 개발 서버에 DB까지 같이 두면 부담됨
  - 컴퓨터 사양 계속 올리는 이유가 개발 서버의 도커에 DB 까지 같이 두려는 목적
  - 사내에서 개발 서버를 모두가 공유하므로 개인적으로 도커 컨테이너로 서버 구성해서 테스트 함
  - 하지만 여러 프로젝트들을 동시에 하는 경우 개인 local에서 도커 컨테이너 잘 안 띄우고 <br/>
    바로 node 서버 띄우기도 함
  - C에서 컴파일하면 라이브러리 파일로 .dll로 나옴
  - npm install을 개발 공유 서버에서 다시 해야 함 <br/>
    사전에 개인 도커 컨테이너에서 먼저 테스트 하고 이후 개발 공유 서버로 반영 <br/>
    만약 모두가 함께 쓰는 개발 공유 서버에 바로 npm 등 설치하면 모듈 꼬여서 큰 문제 발생 가능
  - 테스트 서버, 실제 서버 (예) 둘 다 CentOS)
    - 테스트 서버 안에 docker 컨테이너 하나 두고 구현 후 이미지로 굽고 <br/>
      이후 실 서버에서 도커로 이미지 pull <br/>
      사용자는 실 서버 안에 있는 도커 컨테이너 속으로 접속하게 됨 <br/>
      실 서버에서 도커 컨테이너 바꿀 때 서버 2대 이상 필요 (서비스 중지 안되게 하기 위해)
  - shell script로 git pull 등 다 짜놓기 (자동화 목적)
  - Jenkins; git 관련 설정 가능, push/pull 감시, unittest 등 기능 있음
  - 서버 관리하는 애플리케이션을 따로 만들어 놓음 (rollback 버튼을 통해 쉘 스크립트 실행)
  - warm-up (준비 과정, 잘못된 서버 죽이고 다른 서버가 혼자 부담하고 있는 동안 <br/>
    죽인 서버 코드를 수정해서 다시 제대로 된 서버로 구동하기 전 준비 운동; JS 엔진 평가/실행 과정) <br/>
    => 그러면 부드럽게 서비스됨 (안하면 run queue에 많이 쌓여서 오래 걸림)
