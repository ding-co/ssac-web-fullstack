## [21_12_07 화 오프라인 수업 26]

### _공지사항_

- 수료

### _본수업_

- 디자인 패턴

```js
// Factory Pattern

// 리액트의 useReducer
useReducer((prev, newValue) => prev + newValue);
useReducer(reducer, payload);
// reducer
// switch(payload.cmd) { case 'login': return '' }
```

```js
// Builder Pattern
const client = new HTTPClientBuild();
```

```js
// 커맨드 패턴
const Command = (exec, undo, val) => {
  exec(result, val);
};
```

```js
// 싱글톤 패턴
```

#

### [Note]

- 커맨드 패턴 vs. 팩토리 패턴
  - 커맨트 패턴은 명령이 중요
  -
- 구조적 언어 vs. 함수형 언어
- 백엔드 개발
  - 프레임워크는 의미 없음
  - 스프링 mvc? 스프링부트?
  - Django, Flask, Fast API
  - 노드 express? koa?
  - deno?
- 대기업에서는 스프링 많이 씀
  - ex) 금융쪽은 자바 많이 씀
  - 자바 많이 쓰는 이유?
    - SI 외주(하청) 때문에?
    - 우리나라는 아직 까지도 하청업체(다 자바 개발자임)에서 자바 말고 다른 언어 짜면 다 엉망임
    - 자바 언어 깊게 한 사람 만나기 힘듦
    - 자바 언어 (정부 공식 전자정부 프레임워크)
- IT 전문 메이저 회사에서 자바의 용도
  - ex) 네이버, 카카오, 넷플릭스, ...
  - 자바 필요한 곳에 씀
    - 카카오 지도
    - 카페는 spring 씀
    - 채팅은 node 씀
  - 다 도구일 뿐 (언어도 도구일뿐임)
  - 도구를 적절히 쓰는 것임
- 도구를 제대로 쓰기! (개발 방식 추구 방향성)
  - 가벼운 기능에 스프링 쓴다?
  - 오버 스펙이 될 수 있음
  - 도구별로 사용하는 특징을 다 알면 끝남
  - 코딩은 그때 그때 공부하면서 하면 됨
  - 전제: S/W 공학, 컴퓨터 사이언스, 프로그래밍 언어 등 기본은 최소한 되있어야 함
- 알고리즘은 꾸준히 풀어야 함
- 저연차가 고연차 개발자 이기는 방법은 디자인 패턴, 리팩토링
- 디자인 패턴
  - 싱글톤 패턴, 옵저버 패턴, 빌드업 패턴
  - 프록시 패턴

### [Curiosity]

### _질문_

-

### _개인_

-
