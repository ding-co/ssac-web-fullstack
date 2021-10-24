## [21_10_23 목 오프라인 수업 12]

### _본수업_

- 딥 다이브

  - Array 메서드

    ```js
    // filter
    arr = [
      { id: 1, name: 'hey' },
      { id: 2, name: 'kim' },
      { id: 3, name: 'lee' },
    ];

    arr.filter((a) => a.id > 2); // object (array) type

    // find (하나만 찾고 싶음)
    arr.find((a) => a.id === 2); // 그 해당 요소 1개만 나옴

    // concat
    a1 = [1, 2];
    a2 = [3, 4, [5, 6]];
    a1.concat(a2);

    // flat
    a1.concat(a2).flat();
    ```

  - Number, Math 객체

    ```js
    // Number.EPSILON
    // Number.MAX_VALUE
    // Number.MIN_VALUE

    // window 객체에 속하냐? Number 객체에 속하냐? (헷갈림)

    // NaN
    // isFinite
    // isNaN 사용하기 (=== NaN 말고)

    n = 123;
    n.toFixed(1); // 소수점 한자리로 바뀜 + string 타입으로 변환

    n = 123.04;
    n.toFixed(); // 소수점 없앰 + string 타입으로 변환

    // new 안붙여도 됨 ex) Array()

    // Math.abs(), Math.PI, Math.sqrt()

    Math.random(); // 0이상 1미만 소수
    Math.random() * 10; // 0이상 9미만 (1의 자리수)

    // floor 메서드 주의사항
    // 음수처리할 때 내림 주의
    Math.floor(-1.1);

    // Math.pow(a, b) 이제 안쓰고
    // a ** b (지수 연산자 사용!)
    ```

  - Date 객체

    ```js
    // 날짜 locale 따라감 (나라마다 다름)
    // 우리나라, 일본 => 2021-10-23
    // 해외 => (미국 제외) 23/10/2021
    // (미국) 10/23/2021

    d = new Date();

    // PC 조작 우려 생김 (PC 시간 변경)

    // 아이디어 1)
    // 1. 화면 상 timestamp 암호화해서 내림for 해킹 방지)
    // 2. 서버에서 클라이언트로 올릴 때 token 형태로 클라이언트 시간 같이 올림

    // 아이디어 2)
    // socket 이용 (for 실시간 처리)
    // diff 구해서 이용 or hashing 해서 사용할 수도 있음
    // 나중에 save 눌렀을 때 그 시간 비교 (diff 타임)

    // 이슈)
    // 만약 1/10000 초 오류 생긴다면 안될 수 있음 => 300ms로 줌
    // 토큰을 form tag 사이에 심어 놓음 (토큰 값 계속 바꿔서 도배 방지)
    // 소켓 이용해서 토큰 값 계속 바꿈
    // 최근에는, 소켓의 패킷 잡아서 https 사용

    // 브라우저는 ws 사용 (웹소켓은 HTML5 기능임)
    // socket.io 는 XHR 메서드 이용
    // 최근 브라우저는 ws 모두 다 됨; wss
    // local 개발 시에는 ws 사용, 배포시에는 wss 사용
    // 최근, active-x 안깔아도 됨 (socket 사용해서)

    // Locale
    // GMT (영국 그리니치 천문대 시간 기준)

    d = new Date();
    d.toString(); // 끝자리 +0900

    // mysql date => varchar(8)
    // 미국이나 다른 나라 시간대면 varchar 쓰기 애매함
    // 따라서 timestamp 씀! (timestamp에 GMT 붙음)
    // timestamp에 들어가 있는건 ms로 들어가 있음 (우리가 보는건 string 이지만... 실제 내부는 ms)
    // 보이는 것: 2021-10-23 11:30:40.9
    // 시간 빼고는 다 메서드 뒤쪽에 s 붙임
    // d.getYear(), d.getFullYear()
    // d.getYear()는 1900년 부터 지금까지 diff 나옴
    // login 시간, 가입 시간, 예약 시간 등은 글로벌 서비스 위해서는 timestamp 사용 추천

    // d.getMonth() 는 달 숫자 하나 적게 나옴
    // d.getDay()는 week day (0~ 6, 0은 일, 6은 토)

    // dd = d.getDay()
    // dd === 0 || dd === 6
    // dd % 6 === 0
    // !dd%6

    // moment 라이브러리 사용 (js 모듈)
    // 무거워서 잘 안쓰기는 하는데 admin 같은 경우는 moment js 사용 가능
    // admin은 프로젝트 자체가 가볍게 만들어서
    // customer는 잘 안씀

    m = moment();
    m.format('YYYY-MM-DD HH:MM:SS');

    // 미국 방식
    m.format('L'); // 년원일
    m.format('LL');

    // d.setDate(d.getDate() + 숫자) 해서 사용할 수 있지만
    // 너무 번거로워서 moment 라이브러리 사용함

    // locale 코드
    // ko-KR
    // ja-JP
    // en-US
    // zh-CN

    // toLocaleString('en-US')
    ```

  - RegExp, String 객체

    ```js
    // 암묵적 형변환 (primitive -> object type)
    const s = 'abc';
    s.length;
    s.toString();

    // new 붙여도 되고 안붙여도 됨
    const s2 = new String('abc'); // String {'abc'}

    // [[primitiveType]]: 'abc'
    // [[ ]] 실제로 내부적으로 키 값임
    // String 객체 타입은 속에서 모두 primitive type 이므로
    // 중간 중간 문자 변경 불가

    // 키 값에 변수 사용하고 싶으면 대괄호 사용
    obj = {
      [s]: 1,
    };

    // string 타입 이지만 메모리 내부적으로는 모두 char (character)로 잡혀 있음
    // character 의 array로 잡혀 있음
    // cf) C 언어 - char* (character의 포인터; 시작 주소 가지고 있음)

    // str[0] str[1] str[2] 이렇게 string도 array처럼 사용할 수 있는 것이
    // string 내부적으로는 char의 array임
    // 실제로는 array가 아니라 array 와 비슷한 유사 배열 객체임

    [...s.split('')]; // 완전히 새로운 array 배열임

    s.toUpperCase();
    s.toLowerCase();
    s.replace();
    s.startsWith('a');
    s.endsWith('c');
    s.substring(1, 3); // 인덱스 1부터 인덱스 3 - 1까지 잘라줘
    s.slice(); // substring과 동일
    s.repeat();
    ```

    ```js
    // 정규식
    // 특정 문자열 패턴 찾아내기
    // RegExp 클래스

    // 전체 식 => 정규식
    new RegExp(/ /i | g | m); // 소괄호 안이 정규표현식

    // i는 ignore case (대소문자 구분 X)
    // g는 global case

    // 예제
    const s = 'String is not a string 34a5';
    // /string /i (첫번쨰 걸리는 것만 찾음)
    // /string /ig (있는 것 다 찾아줌)
    // /string /igm (m은 문자열 속의 개행 다 무시함)

    // /[0-9] / (0~9 찾기, - 는 어떤 것 부터 어디까지, ASCII 코드 값, 9-5는 안됨)
    // /[5-9 1-3] / (4 빼고 나머지 다 찾음)
    // /[nt] /g (n 또는 t 전체에서 다 찾아줘)

    // /[A-Z] /
    // /[A-Z a-z] /
    // /[0-9 A-Z a-z] /

    // /^s /ig (s로 시작 다 찾음)
    // /[^A-Z] / (A-Z 아닌 것 다 찾음, 대괄호 안의 ^는 not)

    // /[-aA_] / (-a하고 A_ 찾아줘)

    re = new RegExp(/ /);
    s.indexOf('not');
    s.includes();

    // \s는 스페이스
    // /w는 워드

    [0-9 A-Z a-z _] [$#] // 반복해서 씀

    // ([0-9 A-Z a-z _] [$#]) 이렇게 소괄호 치면 두개 대괄호 포함 가능

    // 컴파일러 parser 만든다고 하면 저걸 걸면 됨
    re.test() // 만족하는 것 있으면 true 반환
    re.match(/\w)
    re.match(^[A-Z a-z] +) // A-Z or a-z로 시작할 텐데 무조건 1글자 이상 옴

    // +는 1글자 이상
    // *는 있어도 되고 없어도 됨
    // ?는 1 or 0

    // \d (\D 는 \d 아닌 것), \ㅇ는 숫자
    // \W (\w 아닌 것)

    // 예제 - 전화번호 패턴
    // 02-405-1249 (3파트)
    // 031-1245-1251
    // 1577-1577 (2파트)
    // 1577-49000

    // 전화번호 제대로 입력했는지 validation check 위해서 어떻게?

    \d{2,3} // 숫자 2글자 부터 3글자까지
    \d{2,} // 숫자 2글자 이상
    \d{,3} //숫자 3글자까지

    \d{2,3}-? // -은 와도 되고 안와도 됨

    \d{2,3}-?\d{3,4}-?\d{4}

    t1 = u.RegExp(/\d{2,3}-?\d{3,4}-?\d{4}/)
    t2 = u.RegExp(/\d{4}-\d{4,5/)
    t1.test(tel) && t2.test(tel)

    // nginx.conf에 /api/ 하고 /apis/ 두 코드 뭉치 만들면 낭비임
    // 정규표현식 사용하기!

    // 맨 앞 /는 http:// 할때 /임
    /{/^apis?}  // ^는 시작
    /{/^api[s]?} // ss 올수도 있어서
    /{/^api[s]*} // s 안와도 됨
    /{/^api[s]+} // s 한글자 이상 무조건 와야 함

    // 예제 2 - 이메일
    // indiflex.corp@gmail.com

    // 1글자 이상 무조건 시작, 뒤에건 와도 되고 안와도 되고,
    ^[0-9A-Za-z]+[-0-9A-Za-z_\.]*
    ^[0-9A-Za-z]+[-\w\.]*

    // .은 문자 하나 가리킴 (스페이스바도 문자 하나임)
    // ... 글자 3개
    // .{3,3} (3자리부터 3자리까지)
    // \[ (이스케이프 처리)

    re.test() // RegExp
    s.match() // string

    s.match(/ /) // 정규표현식은 컴파일 일어남

    const RE = new RegExp(/ /) // 외부에 전역으로 한번 초기화 (컴파일 한번만 일어남)

    // 자주 사용하는 것들은 new RexExp()로 전역으로 빼놓고 쓰면 됨

    s.match(/\d/g) // g 안붙이면 처음 발견되는 3만 나옴, g 붙여야 3,4,5 다 나옴

    s.match(/\d+/g) // 34, 5

    s.match(/\D/) // 숫자 아닌 문자만 출력

    // replace, split 메서드 쓸 때 정규식 많이 사용함
    ```

    ```js
    // replace 는 string 반환함
    s.replace('not', ''); // not을 없애고 싶음

    s.replace('String', '').replace('string', ''); // 비추천
    s.replace(/string/gi, '');

    s.split(' string');
    s.split(/\s+string/i); // \s 는 스페이스 1개 이상 무조건 옴

    // \n을 ;로 변환
    s.replace(/\n/g, ';')

    //replace 메서드에 match 쓰기
    s.replace(/\s+string/, 'String');

    // \s를 ;로 바꾸고 싶을땐?
    // match는 array로 줌

    // [\s] 대괄호 써도 됨
    // \s+는 match[0], string는 match[1] (인덱스)
    s.replace(/(\s)+string, match => ';' + match[1])
    s.replace(/[\s]+string, match => `;${match[1]}`)

    // 스페이스 개수만큼 찍고 싶으면 repeat 함수 사용
    s.replace(/[\s]+string, match => ';'.repeat(match[0].length))

    // 스네이크 케이스 <-> 카멜 케이스 변환
    // _ 붙이는 쪽은 항상 대문자 쪽 => [A-Z]

    s.replace(/[A-Z]/, '_')

    // 만약 앞에 한글자도 알고 싶으면 . 이용

    s.replace(/.[A-Z]/, match => match[0] + '_' + match[1].toLowerCase())

    s.replace(/.[A-Z]/, match => match[0] + `_${match[1].toLowerCase()})

    // 반대로 하고 싶으면
    s.replace(/_[a-zA-Z], match => `${match[0]}_${match[1]}.toLowerCase()`)

    ```

  - Symbol, iterable

#

### [Note]

- flat 활용

  - 1차원 배열로 flatten
  - 트리 형태 계층 구조를 recursive로 재귀 호출해서 돌릴 수 있음
  - flat으로 한번에 1차원 배열로 만들어서 돌릴 수도 있음
  - query 에서 depth 처리할 수도 있음 (자식한테 붙이는건 pid, self 조인 걸어서 select)
    - 게시판 댓글 (대댓글 같은 기능)

- query flat 처리

  - oracle; connect by
  - mysql;
    - self-join => ORM으로 보냄
    - with-CTE 사용해도 됨

- 최근에는 대댓글 없이 1 depth로 구성되서 잘 안씀
- 1 depth로 구성할 때는 질문 테이블, 답글 테이블로 구성해서 관리 (분리)

  - Mongodb 쓰면 array 형태로 그 속에 집어넣음

- users API 경우

  - ex) https:~/api/0.1/users/2
  - 맨 뒤의 2는 id임
  - 테이블 여러개 조인하는 쿼리문 많아짐 <br/>

- DB

  - LIKE 검색 (%) => DB 매우 부담 <br/>
    => Full Text Search 사용! <br/>
    => data 많아서 FTS로 해결 안되면 elastic search 나 sphinx 같은 검색 엔진 사용

- format

  - JSX; babel에 JSX 포함되어 있음 (ES6 이상 JS를 ES5로 변환)

    - 항상 Babel 필요함
    - ul 태그 안의 li들을 반복 돌 떄 JSX 사용 (map 함수 이용)

    ```js
    <ul>
      {arr.map((a) => (
        <li key={a.id}>{a.name}</li>
      ))}
    </ul>;

    // 함수로 따로 빼야 함
    // 삭제되는 경우 (DELETE 메서드)
    const list = (d) => arr.filter((a) => a.id !== d.id);

    // unique
    const a = [...Set([])];
    ```

  - Handlebars

- 회원탈퇴

  - 개인정보보호법; 6개월 이내에 개인정보 삭제해야 함
  - 회원탈퇴 복구 요청 많음 ex) 네이버, 다음 아이디, ...
  - ex) 다음 카페 탈퇴
  - 탈퇴 되었다고 해서 한번에 다 안지움
    - isdel; 삭제되었는지 여부만 알고 싶음
    - outdt; 회원탈퇴 날짜 => 6개월 뒤에 새벽에 batch 돎 (crontab에 걸어 놔서 자동 delete)
    - delete로 보내지만 서버에서는 update로 처리 (어떤 의도로 보냈는지가 중요함)
    - 서버까지 오는 것에만 http 메서드 의미 부여하고, 서버 내에서 꼭 쿼리와 함께 일치시킬 필요 없음
    - where outdt is null로 response (회원인 사람들만)

- 컴퓨터 설계; 현재 폰노이만 구조 => 실수 연산 처리 힘듦 (소수점) <br/>
  => 비트 연산 필요 (shift, unshift) <br/>
  (앨런 튜링 방식이었으면 하는 아쉬움?)

- 비트 연산

  - 맨 앞 비트는 부호 비트
  - 예제) 0.1 + 0.2 = 0.3000....4 (정확히 0.3은 아님)

- 회계 프로그램

  - 소수점 처리 떄문에 Math.round, Math.ceil, Math.floor 가득한 지저분한 코드...
  - 부가세; 소수점 .원 (사실상 존재 X) => 사업자 신고하는 마음 // 나중에 종합소득세 환급 <br/>
    => 부가세 구하는 function 하나로 통일해야 함! round / ceil / floor 중에서 하나로 일관성!
  - 엑셀하고 완전히 일치하지 않음 (소수 연산), 구글 시트의 엑셀도 다름 <br/>
    => 같은 함수라도 결과값 다를 수 있음
  - Number.EPSILON 이용! (판단 기준)

- 보안 회사 관련

  - 백신 관련 소스 거의 못봄 (연구파트 등 다른 파트임...)
  - 토스 같은 큰 금융 회사의 서버 개발로 가면 소스를 볼 수 있을 것임
  - 보안 관련 1년 정도 경험 쌓는 것도 괜찮음
  - 최근, 웹쪽은 보안 크게 할일 없긴 함

- PG 사

  - 서버 2개 (secret key 이용)
  - 고객 브라우저 - 서버 (client key); 토큰 다 등록해야 함
  - 클라이언트가 서버로 던지면 그 다른 서버와 통신해서 세션 맞는지 비교

- node.js 모듈

  - Axios는 대부분 다 씀 <br/>
    (라이브러리 하나가 사실 이미지보다 용량 더 작음)
  - moment는 무거워서 가볍게 만들고 싶으면 잘 안씀
  - moment 코드 다 바꿀려고 할 때 너무 노가다 힘듦 <br/>
    => date.utils.js 파일로 따로 빼서 add(), format() 등 다 만들어놓음 <br/>
    모든 페이지에서 이 파일 하나만 공유해서 사용, moment 패키지 제거하고 코드 일일히 다 수정해야 하는데 <br/>
    번거로워서 unittest 초반에 다 만들어 놓고 코드 구현함 (리팩토링시 편함) <br/>
    (프로토타입 개발 시에는 unittest 필요 없는데 장기적인 관점에서 규모 큰 서비스 개발 시에는 필수)

- 하이브리드

  - 껍데기는 앱
    - 네이티브 앱 (껍데기)이 setLocale() 함수 호출함
  - 속은 웹뷰 (브라우저)
  - setLocale() 다 만들어놔야 함 (다국어)
    - window.setLocale() ~~
    - 전역 객체에 담기 위해 Context API 이용!!!
    - Context API에서 date.utils.js 임포트해서 사용함

- 웹

  - 브라우저에 설정된 값은 윈도우 OS에서 가져옴
  - 브라우저마다 locale 값 다를 때, 어떻게 할까요?
    - 브라우저마다 locale 값 표준 없으면 일일히 다 넣어야 함

- 개발자 이동 흐름

  - 연초에 대규모 채용 많음
  - 보통 회사에서 프로젝트 끝나면 우르르 옮김
  - 일반적으로 5~6명이 프로젝트 진행했으면 1~2명은 남겨 둠 (for 유지보수)
  - 3~4명은 다른 프로젝트로 옮기는데, 그 1~2명 남은 사람 튀어나가고 악순환 반복
  - 따라서 연초에 많이 움직이는 흐름이 있음
  - 가을 쯤 입사하는 것을 추천
    - 교육 조금 받고 연초에 프로젝트 투입됨
  - 주주총회는 보통 봄에 많이 함 => 어떤 서비스 하겠다 발표함
    - 개발자 많이 투입함
  - 연초에 프로젝트 발표되고 투입 인력 많아질 수 밖에 없음
  - 보통 프로젝트 본격 시작 전에 주식 못사게 함
    - 프로젝트 투입 전 계획은 대략적으로 알고 있으므로 주식 미리 사면 문제 될 수 있음

- vi 에디터

  - :%s/^/Q/g (모든 줄 맨 앞에 Q 붙임, ^는 시작)
  - :%s/$/;/g (모든 줄 맨 끝에 ; 붙임, $는 끝)

- 정규식 작성은 못하더라도 읽을 수는 있어야 함
- 정규표현식 다양한 패턴 넣어서 테스트 필요함 (잘못 헷갈려서 실수할 수 있음)

### [Curiosity]

### _질문_

-

### _개인_

-
