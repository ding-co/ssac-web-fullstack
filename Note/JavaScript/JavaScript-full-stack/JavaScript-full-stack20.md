### {풀스택} JavaScript 20강 - Set, Map이 실무에서는 이렇게 쓰는구나...

### _Set_

- 집합
- unique한 이터러블
- Set은 무조건 new 붙여야 함
- 중복하지 않기 위해 많이 사용

### _Map_

- (Hash)Map
- Map 사용 이유
  - 채팅에 접속한 사람들만 따로 map으로 캐싱
  - 학생 수강하고 있는 과목 캐싱 (조인에 대한 부담 사전 차단)

### _WeakSet & WeakMap_

- WeakSet

- WeakMap
  - key가 object일 때 (MDN)
  - m.set('k5', null); u = null;
  - key를 먼저 날림
  - G.C 돌면 없어짐
  - get, set, delete, has 메서드

### _Set & Map 함수_

- keys()
  - return 타입은 이터레이터
- entries()
- size

### _집합 연산_

- 합집합
  - new Set([...str1, ...str2])
- 교집합
  - [...str1].filter(s => str2.has(s))
- 차집합
  - [...str1].filter(s => !str2.has(s))

#

### [Note]

- Node할 때 Set, Map 많이 사용함
  - 클라이언트단은 잘 안씀
- Hash Table은 HashMap보다 좀 더 정교한 것
  - HashMap은 조금 가벼움
- `pm2 monit`
- `pm2 ls`

#

[Reference](https://www.youtube.com/watch?v=m4no-uamHpk)
