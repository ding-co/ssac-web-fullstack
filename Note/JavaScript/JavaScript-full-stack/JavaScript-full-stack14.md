## {풀스택} JavaScript 14강 - 두 번에 정리하는 배열 2

### _자주 사용하는 배열 2_

- arr.flat()

  - a1 = [1, 2]
  - a2 = [3, 4, [5, 6]]
  - a1.concat(a2).flat()

- arr.filter()

  - arr.filter(a => a.id >= 2);
  - array 타입 return

- arr.find()
  - arr.find(a => a.id === 2)
  - 값 하나만 가져옴

### _JSX_

- Handlebars
- JavaScript XML
- JSX는 Babel에 포함되어 있음
  - Babel; ES6 이상을 ES5로 변환
  - 중괄호 { } 안에 js 구문 사용 (+ HTML도 가능)
  - Babel에 의해 {x} => `${x}` 로 바뀜
- 목록 뿌릴 때 JSX 사용

  - 중괄호 안에 HTML 들어갈 수도 있음

  ```js
  <ul>
    {arr.map(a =>
      <li key={a.id}>{a.name}</li>
    }
  </ul>

  // 만약 서버에서 삭제했으면 arr 내부 값 변경되서 변경되는 컴포넌트 다 다시 그림
  // 그런 것을 방지하기 위해 function으로 뺌

  const list = () => arr.map(a => ...)

  // 만약 뭔가 삭제되었으면 (삭제 기능 추가 한다면)
  // d는 삭제한 놈 (2번이라면) => 1,3번 내용만 나옴
  const list = (d) => arr.filter(a => a.id !== d.id)

  <button onClick={list(a)}>X</button>
  ```

#

### [Note]

- Dept
  - HR부
    - 인사부
    - 회계팀
    - 총무팀
- 트리 구조
  - 하나가 n개의 자식 가짐
  - 화면 HTML에 그리고 싶을 때?
  - 재귀 호출로 계속 돌려도 됨
  - 또는 flat() 해서 다 1차원 배열로 만들어서 pid로만 처리해도 됨
  - 쿼리에서도 depth까지 다 추출해낼 수 있음
- 요즘엔 잘 안씀
  - 답글의 답글 기능 거의 사라짐
  - 1 depth만 있음
    - DB 구성은?
    - 질문 테이블, 답글 테이블만 있으면 됨
    - MongoDB면 array 형태로 그냥 넣으면 됨
- 참고
  - `https://www.socialbm.com/api/0.0.1/users/2`
  - Get이면 2번 user 주세요
  - Delete면 서버에서 메서드 체크 후 삭제
  - id 없이 Get 부르는 건 list
  - 테이블 여러개 조인되서 다양한 정보 준다면?
    - Like의 %는 굉장히 부담스런 검색임
    - 김%는 괜찮지만 %길동% 이면 부담임
    - 근데 어쩔 수 없긴 함
    - 이런 것이 너무 많으면 Full-text Search 사용!
    - 그걸로도 해결 안된다면 user가 5천만명 넘으면 검색이 안됨
    - elastic search나 스핑크스 같은 검색 엔진 사용해야 함

#

[Reference](https://www.youtube.com/watch?v=mFQxilF5v4k)
