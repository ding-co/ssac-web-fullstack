## [21_10_28 목 오프라인 수업 14]

### _공지사항_

- 토요일 수업은 사전에 알려준 일정이 아니라 유동적으로 진행 예정
- 오전 11시 30분 ~ 17시 수업

### _본수업_

- 딥 다이브

  - Set & Map

    ```js
    // Set (집합) - unique한 array
    // 무조건 new 붙여야 함

    [...new Set([1, 2, 3])];

    const st1 = new Set([1, 2, 3]);
    const arr = [...st1];

    const st2 = new Set();
    st2.add(3).add(4);

    // 속에서 모두 hashing해서 쓰기 때문에 index 없음 (array는 있지만)

    // Map (HashMap) - key / value 쌍

    const m = new Map([
      ['k1', 'v1'],
      ['k2', 'v2'],
    ]);

    // concat 해서 넣는 방법도 있음

    // m.set('k3, 'v3');

    // 보통 로그인한 사용자 데이터 => key / value 로 넣기 (캐싱)
    // ex) key: user ID, value: nickname or 살릴 props 등...

    // ex) 학생
    // DB 접근해서 join 너무 많으면 병목 많아짐
    // socket 병목
    // 접속자 => map으로 다 담아 놓음 (접속 안되어 있으면 push 보냄)
    // value로 많은 값 보냄

    // Redis 는 key - value로 string - string 만 됨

    // functional language는 모든 게 다 object 될 수 있음

    const hong = { id: 1, name: 'hong', stdId: '60124681' };

    // 앞에 Map 하나 더 둘 수 있음 (id는 뭐다 ~)

    m.keys(); // keys()는 iterator임
    // m.keys().next(); <-- 찾기 힘듦
    [...m.keys()].filter(); // filter 걸수도 있음

    m.values();

    // 채팅 접속자들은 id만 갖고 오는게 나을 수도 있음

    // 자료구조로 key는 어떤 type을 쓸 것이냐?
    // key는 unique해야 함 (겹치면 overwrite 됨)

    // 키 string 가정, value는 큰 object
    m2.set(hong, hobj);

    // 큰 object는 Map에 담는 것이 아니라 Heap에 담아 둠
    // PM2 ls
    // PM2 monit (프로세스 상태, 메모리, 요청 정보, Heap Size 등 나옴)
    // Heap은 node ~~.js 로 실행했을 때 메모리 확보함

    // 8192B 곱하기 몇개..?? => 메모리 확보 부담

    // Heap 은 우선 시작 지점만 잡음

    // 아무튼 hobj는 heap에 있음

    const u1 = { id: 1, name: 'hong' };
    u2 = u;

    u2 = null; // u1도 null??? (primitive type이면 u1도 null임)

    // u1이 저 object 참조하고 있으므로 G.C 아직 처리 안됨

    // WeakSet, WeakMap 을 써야 함!!!
    // Map은 캐싱으로 정말 많이 씀

    // 예시
    m.set('k5', u1);
    m.get('k5');

    // u1 = null;

    // 만약 Map 자료구조에서 u1이 참조하는 객체를 비우고 싶은데...
    // 원래는 m.set('k5', null)
    // u1는 null 이지만 m.get('k5') 하면 G.C 처리 안됨 (영원히 안됨)

    // G.C 돌기 위해서는 m.set('k5', null) 하고 u1 = null 둘 다 해야함

    // 개발자들 실수할 가능성 많음

    // 그래서 WeakMap을 사용함

    // 참고) DB session 끊을 때 finally 에서 close() 해야 함
    ```

    ```js
    // u, u2 같다고 가정

    m.set(u, uobj);
    m.set(u2, u2obj);

    // 만약 u나 u2 null 해도 그 참조 주소만 없어지지 heap에는 그대로 남아 있음

    m.set(u, uobj);

    const wm = WeakMap();
    wm.set(u, uobj);

    u = null; // u 주소 값은 null이 되었지만 heap에서는 아직 안사라짐

    // G.C는 JS 엔진이 돌림, 근데 언제 돌릴지 모름

    // WeakMap 에서는 key를 먼저 날림 (그냥 Map 에서는 value 날려도 살아 있음)

    // key를 날리기 위해 null 처리

    // Map 에 있는 것은 영원히 안 없어지지만, WeakMap에 있는 것만 없어짐
    // 따라서 Heap 에 있는 data는 영원히 남아 있음

    // 따라서 데이터 클 때는 무조건 WeakMap 사용함!!
    // (데이터 작을 때는 Map 써도 상관 없긴 함)

    // pm2 monit 항상 외워두기!!, pm2 ls

    // WeakSet
    st2.add(u); // WeakMap 과 동일

    // 단점은 key가 object 밖에 안된다

    // Set, Map 에서 주로 사용하는 함수
    // keys(), entries(), size
    // size는 괄호가 없네?
    // class 내에서 get size() 이렇게 접근자로 getter 함수로 구현한 것임
    // 정말 궁금하면 깃헙 가서 참고해서 연습하기

    // G.C 는 바로 안돌고 텀이 있음
    // size 값 바뀌면 안됨

    // Set
    // delete(), has()

    // WeakMap 과 WeakSet 은 key를 없앰 (key는 unique)
    // Set 에서 {원소들} => 원소들 key로 불림

    // key만 없애놓으면 G.C가 알아서 내부적으로 2단계로 돌림

    // Map 자료구조 많이 쓰임
    // map 이라는 npm 라이브러리도 있음 (참고로)

    // db.select(sql, (callback = () => new Map(array.rows)));
    const cache = new Map();
    rows.forEach((row) => cache.set());

    // db set
    let cache2;
    new Map(rows.map((row) => [row.id, row]));

    // 1번 사용자가 접속함
    if (cache.has(1)) return cache.get();

    // 1번 없으면 cache.set(1, row); return row;
    // else 면 return cache.get(1)
    ```

    ```js
    // 합집합
    // st1과 st2가 array 타입일때의 가정
    new Set([...st1, ...st2]);

    // st1과 st2는 set 타입
    // 교집합
    [...st1].filter((s) => st2.has(s));

    // 차집합
    [...st1].filter((s) => !st2.has(s));

    // st2.keys() 타입은 이터레이터 => next() 함수 이용했었음 (과거에)
    ```

#

### [Note]

- NHN 회사

  - 6개월 교육 시켜줌
  - 메이저 가기 위한 전초 회사로 매우 좋음

- Node 서버 개발자

  - 여러 기술 쭉 나열하면서 열거되어 있으면 SI일 가능성?
  - TypeScript 쓰는 회사는 왠만하면 기재함
  - 석사 우대, 전공자 우대, 2년 이상 등 조건 있으면 애매함
    - 고졸 기술력 높은 사람도 많음
  - 공고문만 봐도 티가 남
  - 영어회화 가능? -> 외국계 기업?
  - 영어 레퍼런스 읽기 가능?
    - 당연한 건데 얼마나 없었으면... 냄새가 남

- 과제 전형

  - 인력 없으면 다 못봄
  - 전체 소스 구조 잘 짜기
  - 만약 10가지 기능 있으면, 핵심이 되는 기능 과 sub 기능 분리
  - 다 짜는 것보다 제대로 핵심이 되는 기능만 짜도 충분함
  - 소스 코드 적은게 오히려 더 좋을 수도 있음
  - 하나라도 제대로 짜는게 제일 중요함! (리팩토링!)
  - 복붙 절대로 하지 말기! (복붙한거 다 앎)
  - 이 과제의 의도가 무엇일까? 잘 파악하기!

- 면접 역질문

  - 궁금한 점 없어요?
    - MySQL X Dev API
    - JSON object
    - 형상 관리 어떻게? git?
  - 면접자에게 기술 관련 질문 별로 없으면 흠...

- Node 관련 질문 예상

  - ENV 관련 (실행 환경), Router 관련
  - Jade (server side template)
  - JS, TS, Non-block IO
  - CORS
  - Multer; 파일 업로드 관련 쓰는지?
  - Hoisting, closure, Web Socket vs. Socket.IO
  - Redis
    - Redis Clustering
  - babel
  - 실행 컨텍스트
  - http 1.1 vs. http 2 (과거)

- 실력이 비슷하면 용기가 있어야 함

  - 용기는 압박에서 나옴 (스트레스, deadline 등 압박)
  - 수습 기간이 나쁜 것은 아님

- 취업

  - 코딩 테스트
    - 하루 1문제씩 100일 플랜
  - 면접
    - 기술 면접
    - 임원 면접

- 면접

  - 회사 분위기를 봐야 함 (사람들 표정 등)
    - 화장실 다녀오면서 휴게실 등.. 쭉 돌아보기
  - 가운데 책상에 앉아서 개발할 수 있을지 생각해보기
  - 절대로 거짓말 하지 말기
  - 계속 수동적으로 맞다고 하지 말기
  - 침착하기
  - 총명하기
    - 경청하기
      - 아니면 그래요? 이거 아닌가요? 등 말하기
    - 눈 맑은 사람
    - 말은 최대한 적게 하면서 핵심은 잘 말해야 함!
    - 생각이 빨라야 함
  - 면접관 세 사람 있으면 한 사람만 보면 안되고 다 봐야 함
  - 면접관 뿐만 아니라 면접자들의 이야기도 들어야 함
  - 쫄면 안됨!
  - 앉아 있는 태도부터 태도가 아주 중요!!!

- 중소기업

  - 기업 문화

- 스타트업 (벤쳐기업)

  - 초기 멤버
  - stock 옵션 (인센티브) 부여
    - 상장을 하거나 누가 그 기업을 사갈 때 내가 갖는 금액임
    - 성공했을 때 Exit함
  - 이 회사는 성공할 것 같다고 판단, 마음 가지고 가야 함
  - 기업 문화

- SI 회사 - 다양한 프로젝트 경험할 수 있는 장점은 있음

- SI 회사

  - 기술 등급
    - 기술사; 국가고시 봐야함 (논술 형태), 암행어사?, 공무원 스타일
    - 기술 특급
    - 기술 고급; 고급부터 기술료 붙음
    - 기술 중급
    - 기술 초급; 5년 미만?
      - 운 없으면 노가다...
    - (정보처리기사는 1년 더 취급해줌)
    - 프리랜서는 3.3%만 떼서 줌
  - ex) 갑 - 국세청
    - 을 - 삼성 SDS, 병 정...

- SI 솔루션 업체

- 정부 폼 구성

  - XML; data (data를 표현하기 위해 나옴)
    - ex) `<Id>1</Id>`
  - XSL (Extensible Stylesheet Language); 화면
    - ex) `<Name font-style="strong"></Name>`
    - XSLT
  - 서버에 올릴 땐 다시 XML로 만들어서 올리고 다시 parsing 했음
    - ex) Java JDOM
      - `Document dom = new Document(body.contents)`
  - XML과 XSL 연결시켜 주는 태그

- 정부 보안 관련

  - VPN (Virtual Private Network)
    - 인트라넷 내부 PC ip 할당 받음
    - 인트라넷 내부적으로도 다 보안 처리함

- XML -> XHTML -> HTML

  - HTML도 XML 처럼 태그 기반으로 하자!

- 정규식은 CPU 비용 많이 들어감

  - 태그 처리 쉬움

- EDS
  - ex) `1;홍길동;` 구분자 이용 (압축률 높음 but, byte 등 너무 다를 수 있음)
  - 그래서 정부에서 XML 사용했었음

### [Curiosity]

### _질문_

-

### _개인_

- HashMap vs. Hash table

- Set vs. WeakSet

- Map vs. WeakMap

### [건의]

- 시계
