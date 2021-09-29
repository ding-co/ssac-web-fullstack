## {즉문즉설} WAS와 WS의 차이점은?

### WAS (Web Application Server)

- Server가 application의 역할도 같이 함
  - application (DB select 조회 등 비즈니스 로직 포함된 것)
- 비즈니스 로직 처리까지 하는 것을 WAS라고 함 (애플리케이션 역할까지 함)
- 도메인 -> 웹 서버 (nginx (proxy 역할), index.html, nginx.conf로 ns 설정) <br/>
  -> node server(9001, /api), flask server(9002, /ml)

### WS (Web Server)

- nginx만 가지고 Web Server라고 부름 <br/>
  (소스코드에 대한 실행 권한 없음, proxy 역할만 함)

#

### [Note]

- 방화벽은 nginx 앞 단에 존재함
  - ex) NCP; 특정 포트 열기 (80 - nginx, 3306 - mysql)
- nginx (80 포트)
  - C로 구현되어 있어서 WAS보다 매우 가벼움
  - proxy (한쪽에서 다른쪽으로 보냄)
  - 포트 생략되면 무조건 nginx가 먼저 받음
  - 보통 html 문서 만들 떄 img 태그 src들은 nginx 앞단에 static 폴더 미리 만들어 둠 <br/>
    (nginx가 바로 서비스 가능, 외부에서 URL만 알면 바로 볼 수 있음, <br/>
    사용자 개인정보 등 컨텐츠는 nginx가 서비스하면 위험함)
- 도메인/api/users
  - api (name space (ns), 도메인 다음 기준이 되는 URL)
  - 이론상 원래 nginx 안거치고 바로 node 서버로 갈 수 있음 (ns 세팅해놓으면)
  - 하지만 방화벽을 걸어놓아서 바로 갈 수 없고 80을 거쳐서 가야함
  - 80 거쳐서 node 서버로 가서 node 에서 DB select 조회해서 응답을 내보냄
  - ex) 홍길동 개인정보 -> node 서버 단에 secure/ 에 만들어 놓음 <br/>
    => 도메인/api/secure/hong.jpg <br/>
    (secure라는 URI가 있으면 현재 접속한 사용자의 쿠키/세션 확인, <br/>
    현재 로그인한 사용자가 맞을 때에만 hong.jpg return)
- 도메인/ml/부동산시세
  - 80 거쳐서 flask 서버로 감
  - flask가 DB에 있는 것을 읽거나 외부 부동산 시세 관련 서버에서 크롤링해서 가져와서 nginx에게 주고
  - nginx은 response 해서 클라이언트에게 반환
- MySQL (3306 포트)
- 화면을 react.js로 빌드하면 -> production version 나옴 <br/>
  index.html 뿐만 아니라 여러 router들 나옴 <br/>
  react.js 소스코드는 nginx의 document root에 배포 <br/>
  서버단 코드는 node에 배포해야 함
- NEXT.JS는 react 코드가 nginx에 배포되는데, <br/>
  nginx에서 `start next` 하면 node가 떠버림 <br/>
  결국 nginx와 node가 한 몸이 되버림 (그래야 서버에서 HTML이 generate되서 내려옴) <br/>
  순수 react로 짜면 routing은 모두 브라우저에서 나타남

- 배포시, 화면 관련된 것들은 웹 서버에 배포하고, <br/>
  비즈니스 로직들은 WAS에 배포가 되어야 함 <br/>
  (WS 없이 WAS를 바로 쓰는 것은 부담이 많음)

- CSS, JS, 이미지 등 파일들도 사실 CDN이라는 서버에 배포해 놓음 <br/>
  ex) AWS의 S3 서버 (static 파일 빠르게 서비스 해주는 서버)

#

[Reference](https://www.youtube.com/watch?v=6xl3wKMjmWg)
