# {풀스택} JavaScript 21강 - 실무에서 필요한 브라우저 렌더링과 HTTP 압축 정리

## _브라우저 렌더링 과정_

- DOM 트리를 먼저 메모리에 올려놓음
- https://sbm.com
- nginx(웹 서버)로부터 index.html 받아옴
- CSS, JS, img 등 주세요~

## _HTTP_

- http 1.0
- http 1.1
  - 하나씩 요청하고 하나씩 받고 등...
  - 하나씩 올 때는 long polling 방식 사용했음
    - 과거 채팅 구현 방식
    - 서버에서 keep alive true로 설정하면 connection 바로 안끊음
    - 요청 더 이상 없을 때까지 한참동안 안끊음
    - 하지만 동시 접속자 수 문제 발생
    - 큐에 다 쌓여버림
    - 사용자 많으면 함부로 keep alive true 못함
- http 2
  - 브라우저에서 개선 시작
  - 동시에 서버로 요청함
  - connection 병렬로 맺음
  - 한번에 가면 문제는?
    - JS에서 DOM 조작하면 HTML, CSS, JS 다 받아오고 나서 실행 가능
    - 서버로부터 한번에 다 가져왔는데 결국 실행은 하나씩 됨...

#

### [Note]

- DOM, Event 내용 방대함
  - W3C, MDN, CSS 엔진 등 다 공부해야 리액트 같은 라이브러리 만들 수 있음
- 렌더링; 화면 그리기 (밑그림부터 색칠까지 다)
- 페인팅; 마지막에 색칠하기
- http는 connection close를 빨리 할 수록 좋음
- 서버로부터 모든 컨텐츠 한번에 다 내려오는 것은 아님
  - 헤더의 contentLength가 서버로부터 먼저 내려옴
  - 그 다음 브라우저 판단하에 처리
- 습관!
  - 이 라이브러리/프레임워크 함수들 어떻게 구현되어 있을까?
    - 상상해보기 -> 궁금하면 소스 보기
    - 내가 만들었다면 어떻게 만들었을까 생각
- 개발자 => 문제 해결 능력, 창의력 키우기!
- 자바, Tomcat은 쓰레드 기반
- nginx, C는 프로세스 기반
- 노드는 단일 스레드, non-block I/O, 프로세스 방식
  - run queue (실행 대기자) 빨리 비워짐

#

[Reference](https://www.youtube.com/watch?v=aipkB_nPDZQ)
