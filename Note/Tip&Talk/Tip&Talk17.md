## {Tips} Q. Nginx는 Node를 어떻게 처리하나요?

### Nginx에서 node 동시 받는 수 어떻게 계산

- nginx에서 queue 사이즈 정함 (몇 명까지 대기 가능)
  - 큐 초과하면 메모리 full 나고 서버 죽어버림
- 한번에 동시 실행되는 node 개수도 처리 가능
- ex) 일단 앉히고 서빙은 하나씩, cpu 2개면 서빙은 2개씩 가능
- 주방장 1명, 종업원 여러명이어도 (nginx 여러개) => 느림
  - 종업원들 놀고 있음
- cpu 만약 10장이면 10개 동시에 처리하면 됨
- nginx에 한번에 처리할 수 있는 cpu 개수 10개로 세팅
- 사용자 수 많으면 계속 맞춰감
- nginx.conf에 지정
- 10개 노드가 모두 동시에 증가하는 것은 아님 (ex. count + 1)
  - 노드에서 증가시키는 함수 실행
  - 노드에서 DB로 알아서 해 하고 10개 다 때려 넣음 (비동기 non-block I/O)
  - DB가 waiting 시킴
  - 동시에 동일한 id 조회 같은 것을 DB에서 하고 있으면 lock 걸림
    - 처음 들어온 것 증가, 그 다음은 waiting
    - 한 놈이 끝나면 lock 풀리고 순차적으로 처리 (table의 row에 lock 걸림)
    - 결국 병목은 DB에 항상 생김
    - node는 그냥 오는대로 다 보냄
    - 하지만 DB는 항상 하나씩 처리밖에 못함
  - DB는 가스렌지, node은 주방장, nginx는 종업원

### [Note]

- mongoDB; \_docid => collection
  - collection은 테이블하고 1:1이 아님
  - \_docid 단위로 lock 걸림 (table의 \_docid = 1에 여러명이 동시에 write 불가)
    - lock 걸림
  - delete/insert는 row count가 달라지므로 table lock 걸릴 수 있음
  - insert문은 크게 문제가 안되지만 delete가 문제가 될 수 있음
  - delete id = 100 하면 delete하고 count 조회? count 조회 후 delete?
    - 보통은 지우고 나서 주게 됨
      - select count 들어올 때는 table 락이 걸림
- mysql show processlist
  - 계속 떠 있는 놈은 lock이 걸린 것임

#

[Reference](https://www.youtube.com/watch?v=Wvtc97YWuLI)
