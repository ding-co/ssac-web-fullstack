# {풀스택} React 2강 - SPA/CSR/SSR/SSG

## _SPA_

- Single Page Application
- 한 페이지에 여러 jsx 파일들 있음
  - 웹팩이 하나로 묶은 것을 한번에 다 받음
  - JSX (HTML + JS)
  - 화면 바뀔 때 다시 서버로 가서 페이지 가져오지 않음
  - 서버로 가는 건 데이터 가져갈 때 Ajax로 api call해서 가져옴 (ex. REST 방식)
  - 네트워크 속도가 훨씬 빨라짐 + 비용도 줄어듦
  - 화면 갱신하면 모두 다시 받긴 해야 함

## _CSR_

- Client Side Rendering
- 검색 엔진에 script src만 있음
  - 해당 페이지 정보 등록 안되어 있음
- React

## _SSR_

- Server Side Rendering
- 서버에서 HTML 내려줌
- 검색 엔진에 잘 등록되어 있음
- 서버로 갈 때마다 HTML 다 있음
- Next.js
  - SSR할지 CSR할지 선택 가능

## _SSG_

- Static Site Generation
- ex. 공지사항은 잘 안바뀜
  - HTML로 미리 만들어둠
  - 웹팩이 빌드할 때 DB 미리 갔다와서 HTML로 만들어 둠

#

### [Note]

-

#

### [Reference](https://www.youtube.com/watch?v=4Tu0l2LPbhc)
