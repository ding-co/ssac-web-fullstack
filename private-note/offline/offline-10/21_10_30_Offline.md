## [21_10_30 토 오프라인 수업 15]

### _공지사항_

-

### _본수업_

- 딥 다이브

  - DOM (feat. HTML, HTTP)

    - Browser Rendering

      - 밑그림부터 색까지 다 칠함
      - React (Virtual DOM)
      - 메모리 위에 올리는 DOM이 있음
      - DOM 트리
        - HTML Body, ...
          - css 가져와서 우선 body style 입힘 (과거에는, http 1.x)
          - js 가져오면 변할 수 있으므로 js까지 모두 가져와서 DOM 그려야 함 (http 2.0)
          - contentLength 먼저 옴
            - 엽서 먼저 보내고 나머지 대량은 트럭으로 보냄
            - 300B 사이즈 정보 먼저 내려오고 그걸 보고 브라우저가 판단
        - 사용자 https:// ~ 접속 => 서버에서 index.html 응답
        - (http => html 받기 위한 약속)
        - index.html 속의 css, js, img 등 다시 주세요 하고 서버에게 요청
        - 참고) 텔넷 SBM.COM
          - get HTTP/1.1
          - HTTP 1.1 vs. HTTP 2
            - HTTP 1.1; 하나씩 하나씩 처리됨
              - long polling; keep alive (바로 안끊음, 요청 끝났다고 확실히 확인 전까지는 기다림)
              - 호스 같은거 붙인 keep alive => 훨씬 빠름 (굳이 라우터 거쳐서 DNS 거치고 갈 필요 없음)
              - 하지만 동시 접속 많으면 대기 시간 증가 (큐에 대기열 쌓임)
              - 사용자 많은 곳에서 함부로 keep alive 못 올림
          - 병렬로 부름, connection 여러개 동시에 생성
          - http는 close 빠르게 할 수록 좋음 (큐에 쌓이면 무조건 안좋음, 빨리 빨리 비워줘야 함)
          - ex) 손님 테이블 순환 빠르게

    - `<script defer src="a.js"></script>` // html ,css 가져오고 js 그리기
      - body 태그 맨 마지막쪽에 css, js 태그 모두 다 걸어놓음 (최근 소스코드)
        - head 태그에 다는 거랑 차이점은?
          - head 태그에 있는 것들이 body에 있는 것보다 더 우선적
          - DOM 먼저 그려놓은 다음에 css, js 그리는 것이 훨씬 더 빠름
    - HTML 모든 코드들은 cascading (위에서부터 아래로 내려옴)

      - 이미지도 나중에 그려하라고 처리
        - 서버에서 stream

    - 화면하고 아무 상관 없는데 defer 걸면 안됨 (runtime 느려짐)

      - 필요할 때 쓸 경우 있긴 한데 잘 안씀

    - async
      - a.js 실행되고 b.js 실행
      - a load (parsing, 브라우저 실행할 수 있는 바이트 코드 만듦, 평가 -> 실행)
        - 이후 b.js 실행
      - Bootstrap은 js적으로는 jquery 씀 => jquery가 bootstrap 보다 위에 있으면 됨

  - DOM

    - HTML은 XML 기반 (XHTML)
    - XML vs. HTML
      - XML; Element, attribute, Text, comment (주석)
        - html 태그는 root element
        - doctype은 선언문 (html declaration)
          - XHTML 기반이면 닫는 태그 없으면 무조건 에러 남
        - `<xml: xxx> </xml>` // 만약 format 다를 때 ex) 정부, 법원 혼인증명서
          - Name Space에 따라서 data가 달라질 수 있음
      - HTML; Tag, attribute, Text/ContentText, comment
        - root element, child element, sibling element
        - Tree 자료구조
          - 하나 하나 단위 => 노드
          - 루트 노드 (Document) -> 브랜치 노드 -> 리프 노드
        - 코멘트도 사실 하나의 element 임 (닫는 태그 없음)
    - W3C, ECMA 표준 정함
      - attribute 는 쌍 따옴표가 표준 <br/>
        (jsx는 작은 따옴표라도 상관 없음)
      - ex) `const $ele = document.getElementById('xx');`
      - `class Document { getElementById(){}}` // 인터페이스 <br/> (구현체는 너가 구현해라, 표준 만드는 단체에서 기준만 잡아놓음)
        - ex) class ChromeDocument extends Document {// 메서드 오버라이딩}
        - 미리 구현해 놓은 코드를 브라우저에 심어 놓음 (C로 짜놓든 그건 브라우저 벤더사에 따라 다름)
      - Document 노드 (extends Node // Document <- Element, ...)
        - Node <- Document <- ELement,...
        - 합리성 따져서 상속 누구한테 받을지 코드 결정
        - Object <- EventTarget <- Node (노드는 모두 이벤트 가짐)
          - Node <- ElementNode, DocumentNode, Attribute, CharacterData
            - ElementNode <- div, span, ...
            - DocumentNode <- HTMLDocument
        - Node만 알아도 됨
      - HTMLCollection / NodeList
        - 유사 배열 객체
        - 둘다 iterable => spread 연산자 사용 가능
        - getElementById => HTMLCollection
        - NodeList
          - ex) `const {childNodes} = document.getElementById();`
          - 디스트럭쳐링 사용하기 cf) `const childNodes = document.getElementById.classNodes();`
          - `[...document.getElementById().getElementByTagNames()]`
      - 대부분 querySelector 씀
        - `document.querySelector('div#xx')`
        - selector
          - .a (태그 아무거나의 a 클래스 모두 가져옴)
          - div strong (div 자식 중에 strong 태그 모두)
          - div > strong (div 밑에 있는 바로 그 strong element, 직속 자식, 한세대 차이만 주세요)
          - sibling
            - `+` (바로 뒤 sibling만)
            - `~` (뒤에 있는 것들 중의 sibling)
          - a 태그
            - a:hover 주세요~ (mouseover event)
            - this는 그 해당 target만
            - cf) 스프레드 시트 프로그램 개발 시 hover 시 셀 클릭 객체 가져옴
          - $ul.removeChild(), $ul.appendChild(li), $li = document.createElement()
          - 정렬도 필요할땐 다시 그리는게 나을 수 있음
            - 함수를 따로 만들어 놓고, 함수를 가지고 array sort
            - array는 virtual dom (미리 여기서 array 조작하고 그리는 것만 dom 이용)
            - array => state
        - InputElement -> HTMLElement -> Element -> Node (상속)
          - value 프로퍼티
          - 타입스크립트 이용시에는 타입 다 알아야 함
          - event type도 다 정해줘야 함
          - 구조를 머릿속에 잡고 가야 TS 할 때 매우 편리함
        - innerText, innerHTML
          - createElement() 쭉 해서 appendChild() 하는 것보다 innerHTML 태그 많이 사용 <br/>
            (편리함)
          - script 태그를 innerHTML 안에 넣을 수도 있음
          - 검증 라이브러리 (HTML valid check) => DOMPurify
            - DOMPurify.sanitize()
        - `$ele.classList()`
          - class 추가 add, remove
          - toggle
            - true / false
            - 추가했다 삭제했다 ~
            - 강제 true 설정 => toggle('red-border', true)
          - contains => 갖고 있나? cf) jQuery의 hasClass()
          - classList에 내가 추가하고 삭제한 그 상태 다 저장하기 위해서는 <br/>
            window.getComputedStyle($ele) <br/>
            (computed: 값이 변경이 일어나는, computed Property, 단방향/양방향 computed Property) <br/>
            (예전엔 쌍방향 property => observing 가능 <br/>
            하지만 최근엔는 대부분 다 단방향 property)

  - Event

    ```js
    // DOM Event

    // <button id='btn'>검색</button>

    // 여기서 런타임 에러 나옴 다 실행 안함 (다시 실행해서 안될 수도 있음)
    // 에러 처리 잘해야 함
    const $eles = document.getElementsById('btn');
    const $btn = $eles[0];

    // 과거 - 항상 이렇게 처리 했었음
    if ($eles && $eles.length) {
    }

    // 현재
    const $btn = $eles?.[0];

    // Event Registry => browser window 창에 들어있음

    // Event Queue도 있음 (버튼 엄청 많이 눌렀을 때 그만큼 실행시키기 위해 큐에 계속 쌓임)

    // 방법 1 => ESLint에 걸림 (따로 이벤트 등록해줘야 함)
    // 이건 이벤트 리스너가 아니라 이벤트가 발생했을 떄 실행해라 하는 함수임
    // HTML 에서는 onclick="search()" 쌍 따옴표로 쓰는 것이 표준임
    // 사실 이건 리액트 컴포넌트에서 이벤트 onClick=search 로 써 놓음
    // vue는 v-on:click
    // angular는 (click) => "search"
    function search() {}
    $btn.onclick = search;

    // 방법 2 - 이벤트 리스너 걸 때의 표준 방식
    // 첫번째 인자: 이벤트 이름, 두번째 인자:
    $btn.addEventListener('click');

    // 만약 $btn 없으면 안걸림
    // 화면에 늦게 그려지면 저 이벤트 리스너 안탐

    // 항상 $btn 그려지는지 먼저 보고 (DOM 있는지 체크)
    // 이후 이벤트 리스너 설정

    // $(dom).ready
    // DOMContentLoaded

    // event를 매개변수에 넣는 것은 항상 브라우저가 event 주는 것임
    // event.target => 바깥쪽의 div가 먼저 받음
    // div가 먼저 받고 안에 있는지 체크해서 주는데 사실 줄때도 있고 안줄떄도 있음
    // 클릭했을 때 받은 놈

    // event.currentTarget (<-- 리액트 할때 잘 써야 함) => div 안쪽의 button이 받음
    // 주인공

    // inputElement 아래에 value 있음 (순간적으로 형변환)
    // 리액트할 때 event.target => 바깥쪽 먼저 받음
    // 정확히 하기 위해서 event.currentTarget.value 로 해야 정확한 값 나옴

    // 만약 이벤트 한번만 실행되고 더 이상 실행 안되도록 하기 위해서는?
    // 네트워크 에러로 계속 클릭하면 여러개 생김
    // event.currentTarget.disabled = true;
    // fetch(url, (res) => {~~ event.currentTarget.disabled = true})

    // 게시글 도배/어뷰징 문제 가능 => disabled=false 로 만들고 setInterval() 로 계속 때림

    // 해결 - 이벤트 리스너 없애버리기
    // callee (부름 받는 놈 => 나 자신)
    // 이 함수 자체에 대한 나 자신을 없애기
    // event controller는 caller임 (나 부르는 놈)
    document.removeEventListener('click', arguments.callee);

    // 사실 해킹이라는 것은 막을 수 없음
    ```

    ```js
    // 정리
    // 참고) event 위에 event target 이 있었음
    // Object <- Event <- AnimationEvent, ClipboardEvent, UIEvent
    // UIEvent가 중요함
    // FocusEvent, MouseEvent, KeyboardEvent, InputEvent,...

    // 키보드 이벤트 => event.keyCode
    ```

  - Debounce / Throttle (디바운스와 쓰로틀)

    ```js
    // 나중에 리액트로 커스텀 훅 만들어서 할 것임

    // 디바운스
    // 검색 -> 서버에 데이터 요청 보냄
    // 자음/모음 하나씩 칠 때마다 서버에 데이터 요청 다 날라감
    // 서버 죽을 수 있음

    // 보통 0.5초면 타자 타이핑 다 마침
    // 만약 에니메이션 있으면 0.1초 정도 주기

    // 0.5로 설정해놓았으면
    // 0.5초 미만이면 다 0초로 reset (초기화)

    // 만약 idle time이 0.5이상 되었으면 사용자가 다 입력했다고 치고 서버에 호출함

    // [구현]
    // 어떻게 부를지 먼저 짜 놓고 부르는 함수 짜기
    $inp.addEventListener('change', (event) => {
      // 500ms
      debounce((event) => {
        fetch(url, (res) => {});
      }, 500);
    });

    // 콜백으로 뭘 받을지 생각
    const debounce = (cb, delay) => {
      // timer가 setTimeout 임
      let timer;
      return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(cb, delay, event);
      };
    };

    // setTimeout이 받는 인자를 항상 맨 뒤에 둠

    // 쓰로틀
    // 스크롤 내리거나 키보드로 계속 내림
    // scroll 하면 이벤트 매우 많이 일어남
    // 쓰로틀 안쓰면 브라우저 죽어버림
    // 0.5초 동안에 스크롤 100번 이벤트 실행된 것 => 1번만 실행
    // 0.5초는 한참 내려가야 하므로 보통 0.1초로 세팅

    // 이벤트 리스너의 실행만 한번씩 해주기 (화면은 브라우저 스크롤 다 따라감)

    // 스크롤 한번씩 내릴때마다 DB가 20개씩 가져오고 막 이럼
    // 위에 있는 건 없앨 수 있음 (메모리 훨씬 가벼워짐)
    // 아래껀 append memory
    // 네트워크 속도도 고려해야 하므로 너무 짧아도 안됨
    // 만약 자꾸 끊긴다고 항의 들어오면 0.1초는 유지하고 20개에서 30개로 늘리면 됨

    // [구현]
    // 대기시켜놓기 (30개 불러올때 까지)
    // 0.5초 사이에 이미 대기하는 놈 있으면 씹어버림
    // 만약 대기자 있으면 return 키워드 추가해서 무시

    // 다른 부분만 코드 추가
    if (timer) return;
    timer = setTimeout(() => {
      // 갔다올때까지 대기
      cb(event);
      // 갔다 오면 없앰
      timer = null;
    });
    ```

#

### [Note]

- 클로저 사용 이유

  - 함수 커링
    - ex1) 중국집 - 테이블 - 탕수육
      - 스코프 서로 다를 때 중국집 함수의 종업원 부르고 싶음 => 클로저 사용해야 함
      - 클로저 (객치 지향 위해 쓰는 다형성 느낌 비슷)
      - 메뉴판만 다르면 재사용하면 됨
      - cf) `const {theme} = fn(중국집, gn(테이블, kn(탕수육)))`
    - ex2) 테마 처리 함수 -

- W3C, MDN 등 레퍼런스 및 CSS 엔진 지식, ... 더 깊게 공부

  - 리액트 같은 프레임워크 만들기 위해서 필요

- c# 명령형 프로그래밍 언어도 괜찮음 cf) .NET Core, F# (함수형)

- jQuery

- 습관

  - 라이브러리 및 프레임워크 사용하면서 이 코드는 어떻게 짜있을까? 상상해보고 <br/>
    만약 내가 만든다면 어떻게 만들었을까 고민해보기 <br/>
    (시간되면 깃헙 소스코드 찾아보기)

- ex) 서버

  - Tomcat; REQUEST 하나가 THREAD 하나 만듦, 쓰레드 하나가 또 다른 스레드 하나 만듦 (자바가 쓰레드 기반, CPU는 한장)
    - SELECT 끝나고 UPDATE 가능하고 ~
    - 쓰레드 다른 놈 하나 더 만들었더니 서로 쓰레드가 영향주면 문제 생김 <br/> (하나 쓰레드에서 다른 쓰레드 호출하면 안됨, 원자성, synchronize 걸어놓음)
    - 사용자 폭주하면 queue에 계속 막힘
    - ex) 혼자 인형 눈알 하나 붙이고 그 다음 공 만들고 ~
  - Node
    - Non-block IO
      - select 하면서 다른 Update 동시에 가능
      - 각각 DB 쿼리 처리 여러 프로세스에게 업무 지정
      - 바로 사용자에게 화면 단으로 응답하고 그 다음 DB 처리해도 됨
      - RunQueue (실행 대기자들, 여기에 쌓이지 않고 바로바로 비움)
      - ex) 10명 인형 눈알 하나씩 붙이고 그 다음 각 공 만들어 ~ (훨씬 빠름)
  - CPU 최소 2장은 되어야 함.. 하지만 무료 서버는 한장...

- C는 쓰레드 기반이 아니라 프로세스 기반 (nginx 도 프로세스 기반)

- Browser Painting

  - 색만 칠함

- stream (16진수 바이트) <- 이미지 처리; 반응성 높아짐

  - a -> b -> c 이렇게 주는 방식이 있고
  - abc 한번에 주는 방식도 있음
  - 우선 구멍 숭숭 뚫린 상태로 전달 (이미지 흐릿 -> 선명)\
  - 상품 이미지 위에서부터 아래로 천천히도 있긴 함
  - 참고) 하얗게 나오다가 이미지가 펑 나오면 답답함

- 아마존; 이미지 처리 빠르게 보이게 함 (매출 증가)

  - 사용자가 가격 보고 빠르게 들어와서 구매하고 나가고 순환 빨라짐
  - 매출 증대

- TCP/IP

  - Streaming
    - 카톡 파일 올리건 다운받건 등 모두 다 스트리밍임 (TCP/IP)
    - 파일을 서버의 메모리에 올림
    - connection (호스 꽂음), 호스 크기 => 대역폭
      - 2G, 5G (호스 사이즈 다름)
    - 호스 별로 다 만들고 Buffer 사이즈 만큼만 내려줌 (버퍼: 바가지)
    - 버퍼 쓰는 주체가 바쁠땐 버퍼링이 일어남
    - 도착할 땐 어느게 먼저 올지 모름 => external merge sort 할시간 필요

- CD; 자석판 (N, S극 / +1 0)

  - Head Sector; 각 페이지 어느 위치에 있는지 지정
  - LP판의 암 ex) HDD

- 서버 통신

  - 동시에 받을 때 경우 계산 어떻게?
    - nginx 큐 사이즈 미리 정함 (넉넉하게) + 한번에 실행되는 개수 (ex. cpu 10장 처리 가능 개수)
      - ex) 식당 - 일단 앉으세요, 종업원은 한명씩 갖다 드림 (요리 시간은 기다려야 함)
      - 종업원
    - node
      - 비동기로 여러 명이 때리면, DB가 waiting 시켜야 함
      - DB에서 write(update) lock 걸음 (table의 row에 걸음)
      - 주방장
      - 만약 insert/delete 는 table lock 걸수도 있음
        - 특히 delete가 중요함
        - 지우고 나서 count 주기 vs. 지우기 전에 미리 count 주고 지우기
          - 보통 지우고 나서 count 줌
          - 왜 그렇게 하는지 파악하는 것이 중요함!

- 몽고 DB

  - `_doc.id = 1`
  - 콜렉션은 table하고 1:1이 아님
  - `_doc`의 contents에 여러 명이 동시에 write 하면 안됨 (doc 단위로 lock 걸기)

- HTML, CSS 강의 1시간 영상 따로 제작해서 제공 예정

- 컴포넌트; 어떤 HTML의 한 뭉치

- 리액트는 화면 그리기 용도로 그냥 끝남

  - 이벤트 처리는 내가 다 짜야함 (convention이 없음)

- focus 이벤트

  - focus
  - focus in
  - blur
  - focus out

- focus와 blur; bubble 안됨
  - 내 부모 이벤트 실행시키지 마
- focus in 과 focus out은 bubble 됨

  - 내 부모 이벤트도 실행시켜~

- 이벤트 실행되면 제일 바깥쪽 element 가 받음 (cascading)
- div에 있는 button도 클릭되고, 그 안에 button 이벤트도 실행됨
  - div가 먼저 받지만 실행은 button이 먼저 실행됨 (active인 놈 먼저 실행)
- div에 버튼 2개가 있을 때,

  - div (바깥쪽) 항상 먼저 받지만, 실행은 그 안쪽에 있는 버튼이 실행됨
  - 받는 건 div 영역이 받는 것이지만, 받는 거랑 실행하는 것은 다름
  - 클릭했을 떄, client x, client y 좌표 가지고 실행한 놈 있는지 체크함
  - 사실 둘이 거의 동시에 실행됨 (이벤트 비동기)
  - 둘이 같은 변수 가리키면 문제 발생 가능
  - 나보다 주인공이 있는 놈이 있나? 그러면 그 안에 한테 먼저 양보함 (이벤트 실행)
  - 바깥쪽에 있는 것이 먼저 실행될 수도 있음
  - 브라우저마다 어떤 것이 먼저 탈지는 잘 모름

- form - submit 이벤트

  - form 태그 안에 type이 submit 인 버튼
    - 무조건 submit 있는 버튼 이벤트 탐
  - 만약 텍스트 input에서 엔터를 실수로 쳤는데 submit 이벤트가 탐
  - 이럴 때 input form 보다 submit type 버튼이 우선되서 먼저 탄 경우임
  - submit 이건 다 브라우저에서 만든 것임
    - event.preventDefault();

- 가장 바깥쪽 div가 먼저 이벤트 받음

  - 속에 있는 것을 그냥 무시해 ~ 경우
    - div.addEventListener 에서 capturing을 false로 했었음
    - 현재는 이렇게 코딩 안함
  - 바깥쪽은 실행 하지 마라 이런 것이 최신 추세
    - 내 부모 (상위) div 실행 X
    - btn.addEventListener('click', (event) => event.stopPropagation();)

- 위에서 아래로 내려오는 것은 capturing, 아래에서 위로 올라오는 것은 bubbling

### [Curiosity]

### _질문_

- 파이프라인 방식?

- http polling, http long polling

- 쓰레드는 사실 동기적?

### _개인_

- 앞 부분 필기 참조 양해 부탁

- TCP/IP 통신

- 콜렉션

- 단방향 / 양방향 computed property

- 디바운스와 쓰로틀링
