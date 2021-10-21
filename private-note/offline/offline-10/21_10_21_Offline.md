b## [21_10_21 목 오프라인 수업 11]

### _공지사항_

- 2층 오픈캠프, 집중학습룸1, 휴게실에서 팀 프로젝트 진행
- 화/목 (집중학습룸1, 오픈캠프)
- 토 (종일, 0900-1700)
  - 오전; 이론수업
  - 오후; 실습(소셜 북마크)/팀 프로젝트
- 다음주부터 러닝 리액트 진행 (모든 챕터 다 봐야함)
- 러닝 리액트 끝나면 노드 + TS
  - TS
- 소셜 북마크 (SBM)

  - HTML/CSS + Bootstrap 5
    - html, js
    - css -> Bootstrap 5
  - React + JS, [Material UI]
    - CRA (Create-React-App)
      - manifest 파일 생김 (PWA 위함)
  - Node (서버) + express
    - js
      - passport (로컬 정책, SNS 로그인 등)
      - multer (파일 업로드)
      - socket.io
        - 실시간 처리 필요
        - 카드 다른 테스크로 옮김 (drag & drop)
          - db에 저장 후 받는 쪽으로 re-fetch
    - 익숙해지면 TS로 변환
  - React + JS, [Material UI] -> Create Next App (TS 필요)
    - SSR, Router, css, ...
  - PWA 앱 올림

- 팀 프로젝트 결과물 (제품)

  - 스토어에 올림
  - 2개 버전 (깃헙 3개 레포지토리)

    - Admin

      - React + JS (순수 브라우저)
      - 고객 문의/신고하기 기능 => Admin 알아야 함 (socket.io 써도 push 필요) <br/>
        => PWA (사파리에서는 push 불가)

      - PWA (Progressive Web App); 스마트폰 바탕화면에 설치 가능
        - 주소창 없이 마치 앱처럼 사용 가능
        - push 받기 가능 (고객 문의에 대한 push -> 서버 통해 db에 넣고 admin에게 알림)
        - offline에서 caching (local에서 localStorage 이용)

    - Customer
      - Next + TS
      - Native App or Hybrid App
        - Hybrid App; 겉은 껍데기 (틀만 앱), 속은 다 웹
        - Native App; 겉, 속 모두 앱
          - Android; Kotlin, Java
          - IOS; Swift
        - Flutter -> AOS/IOS 빌드하는 대로 나옴
          - 슬라이드 등 에니메이션 다 있음 (편리)
        - React Native
          - 비즈니스 로직은 그대로지만 화면, css 등은 다 바꿔야 함
          - 단점: Flutter 보다 에니메이션 등 기능 다 구현해야함
          - Next.js 할 때 create react-native 하면 됨
    - Server

      - node + express (앞단에 nginx 무조건 붙임)
      - 사용자가 API call 하면 nginx가 먼저 받고<br/>
        (443 포트 사용, 만약 80포트 오면 redirect) <br/>
        특정 네임 스페이스만 node가 받음 (8000포트, API 서버) <br/>
        next.js는 조금 다름 (next 안쓰면 React build한 것 nginx의 document root에 두면 됨, htdocs) <br/>
        next.js는 자체적으로 node를 품고 있음 <br/>
        nginx -> api 아니면 next.js (3000 포트) 로 감 <br/>
        PM2 위에 node, next.js 두개 다 올림 <br/>
        이미지 같은 경우, next.js가 알아서 처리해줌 <br/>
        흐릿하게 보이다가 서서히 보이게 할 수도 있고 위에서부터 그냥 보이게 할 수도 있음 <br/>
        이미지 처리 늦게 뜰 수 있으므로 next.js로 처리함 <br/>
        이미지 처리 잘해야 함 (용량 많이 필요함) <br/>
        따라서 압축을 해서 보내는데 압축은 nginx에서 설정할 수도 있고 <br/>
        next.js에서도 설정할 수 있음. <br/>
        node, db 등 io 다 비동기 처리함 (async await) <br/>
        nginx에 캐싱 처리해서 처리할 수도 있음

      - JS / TS (Next.js)

- 팀 프로젝트
  - 기획
  - 설계; 화면 설계, 기능 설계, DB 설계 (10월까지는 기획 + 설계는 다 끝내야 함)
    - DB 설계는 처음에 대충
    - 화면 만들면서 새로운 아이디어 추가되면 계속 바뀜
    - 서버 API도 계속 바뀜
    - 전체가 모두 동시에 일어남
  - client view (화면) 개발 + 서버 개발 (API)
    - 11월 부터 본격적으로 구현 시작 (사실 1달, 나머지 2주는 테스트/디버깅)
    - 서버 API도 버전 필요
    - API URL; ~/api/0.1/users
    - 관리하기 힘들어서 앱 실행하면 auto upgrade로 걸어 놓음 <br/>
      (이전 버전 쓰지 못하게 하는데 만약 이전 버전 사용하고 있는 사람은 <br/>
      요청이 안올 수 있어서 문제 있을 수 있음)
  - App
- 팀 프로젝트 유의사항

  - Admin, Customer 모두 같이 역할분담 (기획, DB 설계, 서버 코딩은 같이)
  - 공통 컴포넌트 (모듈) 먼저 만들기
    - button, input, file, nav, footer, model, select 등 컴포넌트 만들기
    - 예) model - confirm, validate + alert (유효 검증, 경고창)

- TS 프로그래밍 교재는 6~7장 까지만 우선 봐도 됨

### _본수업_

- 딥 다이브
  - 27장 배열 (Array)
    - 배열을 잘 써야 리액트를 잘할 수 있음 (for 순수 함수)
    - 리액트는 무조건 순수함수 사용해야 함 (안쓰면 에러날 수 있음)
    - array 속에 어떤 타입의 값이든 들어갈 수 있음 <br/>
      => 미리 메모리 공간 확보할 수 없음 (동적 타이핑 언어) <br/>
      인터프리터 언어 => 단편화 문제 발생 가능 => 메모리 각 주소, 크기도 사실 다 알야아 함 <br/>
      => 해시 테이블 자료구조 사용하면 좋음 (key, value)
    - 메서드 <br/>
      (array 속의 각 값에 대한 주소 있음)
      - 원본 변경 X => 순수 함수
        - slice
          - slice(a, b) // 인덱스 a 이상 b 미만
        - concat
        - map
        - filter
        - find
        - reduce
    - 단순함 추구 (FP 언어)
      - arr = new Array() 에서 new 생략 가능
      - not exist; 애초에 존재하지 않음 (자리도 X)
      - empty; 자리는 있지만 값이 확보되어 있지 X
      - Array(1, 2, 3) => 길이 3짜리, 1, 2, 3 값으로 들어감
      - Array({})
      - 예전엔 arguments 사용
      - Array(5).fill(0)
      - Array.from({length: 3}, (\_, i) => i) <br/>
        from은 static function이라서 instance 안만듦
      - Array.of(1) <= length가 아니라 값 주고 싶을 때 of 사용
    - array.push(), array.pop()
    - array.shift() // 배열 맨 앞 값 제거
    - array.unshift() 많이 사용함 // 배열 맨 앞에 값 추가
    - 최신 것을 위로 올리고 싶을 때
      - push 사용시, reverse() 함수 사용
        - array.sort(), array.reverse()
        - reverse() 는 사실 부담
      - array.unshift() 사용
    - array.splice()
      - array.splice(1, 2); 인덱스 1부터 2개까지 제거 (remove)
    - array.join()
    - array.sort()

#

### [Note]

- VS Code 터미널 느려짐 (무거움) <br/>
  => Sublime의 vim (TS 쓰면 무거워서 느려짐) <br/>
  => 순수 vim 에디터 (neovim) 사용 // ESLint 등 다 올라감
- TS에서 . 치면 다 나옴
- 고사양 컴퓨터면 VS Code 써도 됨
- 트렐로 (과거); Ember.js + PWA, 현재는 Hybrid Web App
- Next.js
  - react 위에 react 단점 보완하는 프레임워크
- app은 heroku등에 무료로 올릴 수 있긴 함 (앱 스토어는 계정이 필요)
- release version (milestone)
  - 어디까지 MVP로 할 것인지 계획 (release 버전 생각)
  - MVP로 오픈 => 기능 추가/삭제 등 하면서 release 반복
- 하이브리드 앱
  - 겉은 앱
  - 속은 브라우저 (스마트폰 기본 내장 브라우저, 크롬 따로 설정하기 힘듦)
- 도메인

  - admin; admin.abc.com
  - customer; abc.com
  - 모바일 => abc.com/m
    - m 자리는 htdocs 폴더일 수도 있고 api의 네임스페이스 일수도 있음
    - 뒤에 m 붙이기 애매함
    - abc.com 앞에는 cafe, blog 등 붙여야 함
    - 따라서 앞에 m을 붙임 => m.abc.com
    - 모바일 버전 카페는 => m.cafe.abc.com
    - 사실, request의 UserAgent를 보면 됨

- 전광판 (광고판)

  - 내부에 라즈베리파이 설치되어 있음
  - WI-FI 기능도 탑재되어 있음
  - 라즈베리파이 (PC) 또는 아두이노 (Cpu, 소형 메모리만 있음)
  - 세탁기는 화면단이 필요 없으므로 아두이노 올리는게 나음
  - 최근 안드로이드 OS 올림, 안드로이드 OS는 브라우저도 갖고 있고 다 갖고 있음
  - 안드로이드 올려서 무거우면 리눅스 올릴 수도 있음

- React SPA

  - 검색 엔진 최적화 힘듦
  - head 태그의 meta 태그로 다 붙여야 함
  - 리액트로 만들면 구글은 검색 되는데 다른 사이트는 안되고...
  - 서버 사이드 렌더링 필요 <br/>
    => url 다 들어있음 <br/>
    검색 엔진은 그 링킹을 해서 링크를 내부에서 다 열어서 그 html 파일 추적함
  - SEO (검색 엔진 최적화)
  - 검색 엔진 모두 뜨게 하고 싶으면 Next.js로 가면 됨
  - 하지만 서버로 계속 가면 검색은 잘 될 수 있지만 <br/>
    Network I/O 부하, 비용 발생 가능 <br/>
    next.js는 html, 텍스트 등 파일 다 가져오므로 네트워크 비용 많이 발생 가능 <br/>
    그럴 떄는 그냥 React 쓰면서 메타 태그 활용 <br/>
    만약 여러 정보 다 호출하고 싶으면 그냥 next.js 쓰는게 나음

- SSR

  - 노드에서 템플릿 만들어서 내릴 수도 있고
  - Gatsby 도 있음
  - 최근 트렌드는 SSR <br/>
    서버는 대부분 놀고 있어서 활용하는게 나음
  - Next.js는 리액트의 단점 보완 (개발 효율성 높임)

- 리액트

  - 리덕스는 이제 안씀 => context API, useReducer 등 쓰면 됨 (훨씬 가볍고 좋음)
  - 리덕스만이 가지고 있는 장점도 있음; 미들웨어, AOP <br/>
    하지만 리덕스 쓰면 리액트 훅스 다양하게 쓰는 것보단 편할 수 있지만 <br/>
    이제는 좋은 리액트 훅 많이 있어서 그걸로 다 활용 가능 (일반적으로 리덕스 무거움)
  - 클래스형 컴포넌트는 절대로 사용하지 말기 (함수형 컴포넌트로 사용!, 가벼움)
  - Lodash도 안 쓸 예정 (편하지만..)
  - 기본 기능을 잘 쓸 수 있으면 붙여서 쓰는건 매우 쉬움
  - 사실 장기적인 면을 보고 공부 위해서는 단순히 express에서 mysql 모듈을 <br/>
    활용하는 것보다 직접 프로토콜 다 만들고 할 수 있으면 mysql 모듈 쓰는 건 <br/>
    매우 쉬움
  - Axios 도 일반적으로 무거워서 fetch 함수 사용하면 됨 (JS 빌트인 객체임)
  - 하지만 Axios도 사실 가벼워서 많이 쓰긴 함
  - 예)
    - 라우터 이동
    - 라우터 이동시키려고 redux 쓰는건 쓸데없는 짓임 (필요없는 데 굳이 쓸 필요는 없음)
    - context api 하나만 있으면 됨 (훅 하나만 있으면 끝남)
    - 적절하게 사용해야 하는 걸 알아야 함 (모르고 사용하면 안됨!)

- JS 비동기; Promise 객체, async/await

- 해시

  - 해시도 함수임 (언어, 기계/CPU마다 다를 수 있음)
  - 해시 함수 돌리면 유니크한 값 나옴 (type도 정해짐)

- 컴파일러 언어; dense array (array 촘촘)
- JS; 원소 지워져도 length 안바뀜 (구멍 생김) => link 끊어져서 empty라고 표현됨 <br/>
  ex) [1, empty, 3] === [1, , 3] // Sparse Array (드문드문)

- 참고) 4byte => 2^32 - 2 (null pointer 포함 뻄), <br/>
  메모리 넘치면 overflow

- 스택, 큐
  - 스택; push, pop
  - 큐; push. shift

### [Curiosity]

### _질문_

-

### _개인_

-
