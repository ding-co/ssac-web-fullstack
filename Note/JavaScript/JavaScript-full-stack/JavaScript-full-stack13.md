## {풀스택} JavaScript 13강 - 두 번에 정리하는 배열1

### _순수 함수_

- Array가 언어마다 JS 엔진마다 다 구현되어 있는 것이 다름
- ECMA; 기능만 되면 돼 라고 정의만 해두고 구현 방법은 브라우저 벤더 마음
- splice()는 원본 배열 조작함
- 원본 배열이 변경하지 않는 배열의 메서드(함수) => 순수 함수!
  - 순수 함수 예; slice, concat, map, filter, ...
- 순수 함수 안쓰면 발생하는 문제

  - 원본 데이터 조작되면 에러 발생!
  - 데이터가 한 컴포넌트에만 사용되지 않고 여러 컴포넌트에 사용됨!

- 실제로 배열은 해시 테이블로 구성됨
  - 키는 각각의 인덱스
  - 값은 실제 값을 가리키는 메모리 주소

### _Hash 함수_

- Hash 함수
  - 언어마다, 기계마다 다를 수 있음
  - 해싱 돌리면 unique한 주소 나옴
- JS 함수형 언어는 내부 속 자료구조가 다 Hash로 되어 있음

### _Densed Array vs. Sparsed Array_

- 컴파일 언어; densed array (촘촘한)
- 인터프리터 언어; sparsed array (듬성 듬성)
  - JS; 내부 속 자료구조 해시임
    - 어떤 인덱스에 해당하는 값 사라지면 비어있음
    - 메모리 아래에서 위 빈곳으로 땡겨져서 올라오는 것 아님
    - empty로 표현 (비어있다)
    - empty는 실제로 존재하는 것 아님 (없음)
    - length는 보장됨 (그대로 유지)
- array에 계속 push하면 끝도 없이 다 들어가는데 제한은 있음
  - 들어갈 수 있는 칸수가 4Byte로 제한되어 있으면
  - 2^32 - 2 (1은 null pointer, 1은 0)
    - array의 length가 0인건 하나도 없는 것임
  - 이것보다 커지면 Stack overflow

### _Array 생성_

- arr = [1, 2, 3]
  - arr.length = 1; // arr에는 1만 있음 (다른 것은 삭제됨, not exist)
  - empty 아님
- arr = new Array()
  - arr = new Array(1) // 1칸짜리, 값은 empty
- arr = Array()
  - arr = Array(1, 2, 3) // 3칸짜리 (인자 2개 이상이면 값으로 채움)
  - arr2 = Array({}) // object도 들어갈 수 있음

### _자주 사용하는 Array_

- Array(5).fill(0)
- Array.from({length: 5}, (\_, i) => i)
  - from은 static function임
  - 인스턴스 안 만듦
- Array.of(1) // Array는 1이라는 값 하나 가지고 있는 array임 (값 주고 싶을 때)
  - Array(1)은 한 칸짜리 자리 (empty) 잡힘
- 아래 함수들은 순수 함수 아님 (원본 조작됨)
  - arr.push()
  - arr.pop()
  - arr.shift()
  - arr.unshift()
- arr.unshift()는 쓸일 있음!
  - 사용자가 북마크 추가 눌렀을 때
  - arr.push() 하면 아래에 추가 되는데,
  - 추가한 것이 가장 최근 것이므로 맨 위에 있도록 하기 위해서 reverse() 사용하는 건 부담임
  - 처음에 그냥 unshift(bookmarkid)) 하면 매우 편함
  - 데이터 많을 때 unshift하면 편함
  - JS 내부 자료구조는 hash 이므로 앞에 추가한다고 해도 힙 메모리 아래에 만들어지고 <br/>
    인덱스 값 (주소)만 바뀜
    - 인덱스 값도 사실 해시 주소 가지고 있음
    - 아무튼 힙쪽은 안바뀜
    - 인덱스 쪽은 순서 보정 필요하긴 함
- arr.sort((a, b) => a.id - b.id)
  - js에서 sort는 -1, 0, 1임 (리턴)
  - 양수면 1쪽으로 뒤집어짐
  - -1은 순서 그대로 감
  - reverse 하고 싶으면 b.id - a.id
- arr.reverse()
- arr.splice() vs. arr.slice()
  - arr.slice(start, end)
    - start 인덱스부터 end 인덱스 미만 (exclusive)
    - 순수 함수로 많이 사용함
  - arr.splice(start, 개수)
    - start 인덱스부터 해당 개수만큼 배열에 담아 리턴
    - 원본 배열은 변경됨
  - arr.splice(start, end, 값)
    - start 인덱스부터 end 인덱스 미만까지 없애고 해당 값 넣어줌
- arr.concat()
  - 순수 함수
- arr.join(',')
  - 반대는 str.split('')
- arr.map(a => a.name)
- arr.filter(a => a.id > 3)
- arr.reduce((sum, a) => sum + a.id, 0)
  - 숫자는 굳이 초깃값 안줘도 됨
  - 배열의 첫번째 값이 초깃값으로 알아서 들어감
- 배열에서 unique한 값만 뽑아내고 싶으면?
  - [...new Set(arr)]

#

### [Note]

- 배열을 잘 사용 못하면 리액트할 때 고생 많이 함
- 코드 실행에 있어서 메모리 확보가 제일 오래 걸림 (사이즈)
  - 메모리 확보 비용 부담 큼
  - 컴파일 언어는 이미 컴파일할 때 메모리 사이즈 다 잡아서 더 빠름
- 인터프리터 언어는 메모리 단편화 문제 생김
  - 각각 위치 알고 있어야 함
  - 컴파일 언어는 메모리 시작 주소만 알면 됨
- stack overflow는 모든 언어에서 다 존재함
- empty와 not exist는 다른 것임
  - empty는 자리는 확보되어 있지만 값이 없는 것임
  - not exist는 세상에 존재하지 않는 것
- JS에서 스택, 큐 구현
  - 스택; arr.push(), arr.pop()
  - 큐; arr.push(), arr.shift()
    - arr.shift() 하면 리턴값 나옴
- splice 메서드 헷갈림
  - 특히 slice() 메서드와 함께 쓰면 오해의 소지 큼

#

[Reference](https://www.youtube.com/watch?v=6T_Qr3Dfg-A&ab_channel=%EC%8B%9C%EB%8B%88%EC%96%B4%EC%BD%94%EB%94%A9)
