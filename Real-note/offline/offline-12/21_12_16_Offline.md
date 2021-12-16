## [21_12_16 목 오프라인 수업 29]

### _공지사항_

- 21.12.16.목 수료
- BHC 후라이드 치킨 기프티콘 -> 문자
- 예치금 반환 이메일
- 싹 후기 남기기
- Post SSAC 정회원 기준은 2640만원 이상
  - 취업하면 SSAC에 말하기 + 성호님 연락
- 수료증, 수료 선물 2개
- 만약 3기 한다면? 실습 위주로 진행
  - 3기 진행할 확률은 사실 50%도 안됨
- 어제보다 나은 오늘을 만들기 위해 항상 루틴을 만들어야 함!
- 매달 밋업 진행
  - 첫번째 밋업은 1월 6일 진행
  - '나'가 바쁘면 진행 못함
  - 성호님은 타입스크립트 등 보강 + 다른 사람들은 밋업 진행
  - 스페셜 밋업 (내년 여름쯤 1박 2일 해커톤 등으로 활용 가능)

### _본수업_

- 2022년엔 개발공부 뭐하지?
  - T자형으로 가되 다른 분야들도 약간의 지식 원리 깊이 있게 해야 함
  - 공부를 끝없이 해야 함
  - 그래프가 계속 출렁거릴 수 있음
  - 마지막에는 맨 위 일자로 수렴
- Trend

  - 밋업 때 많이 다룸
  - Lightweight Web Framework

    - 처음엔 아주 작음
    - 처음에 가벼울 때 미리 공부해놓자!
    - 가볍게 해야 하이브리드 앱으로 만들 때도 native 처럼 성능 빨라질 수 있음
      - 나중에 기능 추가되는것 익히는 건 쉬움
    - preact; react 구문 이해할 수 있는 framework (좀 더 가벼움)
      - 빌드 했을 때 번들 크기가 작음
      - 별명이 3KB
      - 잘못짜면 react 코드보다 더 커질 수 있음
    - solidJS (6KB)
    - Svelte (1.6KB); 성능면에서 3~10배 차이(DOM 접근)
      - 개인이 만듦
      - React는 실제 DOM 트리 접근하는 것이 불편해서 VDOM 만듦
        - VDOM 변경 부분만 DOM 부분 찾아가서 비교
        - 찾아가서 다른가 보고 바꾸고 싶은 것을 바꿈
        - 좋긴 하지만 비교하는 시간이 마음에 안듦
      - DOM에 포인터를 달음
      - 메모리 주소만 참조해서 참조형으로 따로 갖고 있음
      - DOM 다 올리는 것은 의미없고 꼭 필요한 것만 가져옴
      - ex) $(div.aaa) 보다 $(#aaa) 이것이 훨씬 빠름
      - DOM 트리에서 id 값이 인덱싱 되어 있는 것 같은 느낌
      - Hashing 알고리즘 원리 => O(1)
      - Svelte는 bundle.js 하나만 떨어짐 (하나만 내려서 사이즈 엄청 작음)
        - 컴파일러 이용해서 만들어줌
        - 바이너리 코드보다는 느리므로 Web Assembly 쪽으로 갈 수도 있음
        - bundle.js 하나만 있으므로 react보다 훨씬 빠름 (마치 Vanilla JS 같은 느낌)

  - WASM (웹 어셈블리); 성능에서 월등
    - Web ASseMbly
    - V8 엔진 - deno
      - socket이 은근히 부하 많이 줌
      - deno는 Rust로 만듦
      - 다른 언어로 코딩을 하든 어셈블리 소스임
      - 그 어셈블리 소스를 브라우저가 실행시키면 끝임
      - 메타버스, AR/VR을 웹에서도 돌릴 수 있게 될 것임
    - C#은 .NET 기반 (dotnet 플랫폼 속에 플랫폼)
      - Blazor 프레임워크
        - JS 부분을 C# 같은 언어로 짤 수 있음
        - 결국 모든 코드들은 .was (어셈블리)로 바뀜
    - Next.js가 Rust로 만들어져 있음
      - TS 기반으로 SSR 가능
      - 리액트보다 편함
      - Next.js 하면 무조건 TS 할 수밖에 없음
      - SEO 관련 이슈는 많이 줄어들 것임 (리액트도 곧 SEO 가능할 것임)
  - UI
    - Bootstrap
      - CSS 많이 공부 안해도 되긴 함
      - 하지만 스타일 마음에 안들 수 있음
      - SASS 찾아 들어가서 변수 바꿔야 함
      - 떡이 됨 (점점 번들이 커짐)
      - 번들이 커지면 다운로드 속도 느려지고 네트워크 비용 증가
    - Material UI
    - 현재 뜨고 있는 것은 Tailwind
    - Headless UI Framework
      - 어떤 디자인 프레임워크도 다 지원
      - property/state 따로 분리 가능
      - children에 style 세팅 가능
      - 필요한 컴포넌트만 다운받아서 사용 가능
      - bundle로 빌드될 때도 필요한 컴포넌트만 묶일 수 있음
      - 테일윈드하고 궁합 좋음
      - 컴포넌트는 각각 태그 역할만 하고 body는 개발자들 자유롭게 해라 (W3C 표준)
  - AI 자동화 툴
    - Github copilot
      - VS Code 무거워짐
      - 편한데 내 창의력으로는 코딩 못함
      - 어떤 기업의 소스코드는 기밀사항인데 함께 튀어나오면 위험
      - 대기업들은 github 잘 안씀 (코드 보안 때문에)
      - 하지만 크게 권장은 X
    - tabNine
      - AI 자동 코드
    - Ponicode
      - unittest 단 몇분만에 짜게 해줌
      - JS 특정 함수에 대해서 unittest 다 만들어줌

- Senior Coding
  - 채널로 꾸준하게 영상 조금씩 올려주실 수 있는 강좌/기술
  - 목표는 '오늘부터 1일 2일 ...'
  - 아직은 중상급자 기준 컨셉
  - Network, 컴퓨터 구조 (H/W)
  - 알고리즘/자료구조
    - 알고리즘 이해가 중요
    - 검색/삽입/삭제 등 모든 기능 다 짜봐야 함
  - 클라우드 (AWS Lambda 등), FaaS/PaaS/SaaS
    - 보안
  - Chrome Extension
    - 파이썬은 업무 자동화 많음
    - 크롤링 등 할 떄 편함
    - 업무 자동화 하기 위한 것 ex) React Dev Tool
    - 나만의 크롬 익스텐션 만들기!
    - 소셜 북마크와 같이 사용
    - 업무용 프로그램 짤 떄 도움 많이 됨 (직원 관리 프로그램 등)
    - 크롬 익스텐션 짜면 여러 브라우저에서도 다 실행 가능하도록 되어 있음 ex) Brave

#

### [Note]

- 기술의 노예가 되면 안됨
  - 기술에 내가 자유로워져야 함
  - 그래야 학습하는 것
- Vanilla JS; npm install 하나도 없이 순수한 JS
  - 성능 엄청 빠름 (DOM 직접 접근, Ajax, fetch 등 사용)
  - 업무용 툴에 많이 사용
  - react는 코드량이 큼
    - mobx, redux 등 추가하면 더 무거워짐
    - 코딩은 쉽지만 성능은 느려짐
- Vanilla JS만 사용하는 회사도 추천
- Vanilla JS 정말 잘해야 프레임워크 만들 수 있는 능력 생김
- 리액트 코드 짤 때 mobx (+ 30kb), redux (+ 30kb) 추가되면 더 무거워짐
  - context API 사용해서 mobx나 redux처럼 짜면 됨
- Svelte 상당히 매력적임
- Ionic; JS로 개발하면 어떤 플랫폼이든 다 빌드 됨
- deno 무조건 공부하기 (V8 엔진이 속에서 assembly로 실행시켜줌)
- Rust
- Next.js
- 모바일 브라우저가 PC 브라우저보다 빨리 발전할 것임
- Client: Next.js + Sever: Deno
- TDD로 개발? vs. 바로 deadline 맞춰서 개발?
  - TDD; TDD로 했을 때 안했을 때보다 속도 훨씬 빠름
    - uniitest 짜야함
    - 실제로 시간 훨씬 더 빠름
    - 쌩 노다가 많이 하면 외로움이 밀려옴.. (지친 것 => 쉬면 다 나음)
    - 화면 없음, 코딩만 함, 재밌음
    - uniittest 더 빠르게 짜기 위해서 TS 이용
  - 만약 TDD 아니면 배포할 때도 불안함
    - 사람이 노가다한 것이라 강박증 생김
    - 스트레스 많아짐
- B 트리

### [Curiosity]

### _질문_

-

### _개인_

- Svelte DOM 관련 원리
- Svelte, WASM, Next.js, deno, (MS; Blazor)
- Tailwind, Headless UI framework
- Network/Computer Architecture/Algorithm/Data Structure
- Cloud (+ 보안), Chrome Extension
