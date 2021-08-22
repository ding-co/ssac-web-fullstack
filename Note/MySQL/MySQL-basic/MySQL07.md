## MySQL 07 - 내장함수와 트랜잭션(Transaction)

### _내장함수_

```sql
select sum(id) from Student;

select addr, sum(id) from Student group by addr;
select addr, avg(id) from Student group by addr;

-- mod (나머지 값 구하기)
select id, mod(id, 2) from Test;

-- count (record 수)

-- stdev (표준편차), var_samp (분산)

-- CAST(형 변환)
select CAST('2018-12-25 11:22:22.123' AS DATETIME);

-- CAST는 AS 쓰고 CONVERT는 콤마를 씀
-- Signed, Unsigned (하나의 타입 이름, 형)
select CAST(1.567 AS Signed Integer), CONVERT(1.567, Signed Integer);

-- now는 무조건 현재 시간
-- date는 날짜만, datetime은 날짜 + 시간
select now(), str_to_date('2018-12-03', '%Y-%m-%d');

-- 미국 같은 경우는 연월일 표시 방식 다름 => 순서 맞춰줘야 함
select str_to_date('12/03/2018', '%d/%m/%Y')

-- concat (str 붙이기)
-- 내부적으로 모두 아스키코드 이므로 + 연산자 안먹힘 (파이썬 처럼)
select concat('aaa', 'bbb', 'ccc', 'ddd');

-- concat_ws (delimiter 지정)
select concat_ws(', ', 'aaa', 'bbb', 'ccc');

-- addr 로 grouping 했을 때 min/max 써줘야 함
select addr, min(name) from Student group by addr;

-- 불특정 1명 줌 => 모든 사람 다 주도록 할 때 group_concat 사용
select addr, group_concat(name) from Student group by addr;

-- IF(식, 참일때, 거짓일때)
select addr, if (addr = '강원', '*', ''), group_concat(name) from Student group by addr;

-- IfNull(col1, 'aa')
-- col1이 null일 때 'aa' 주세요
select name, ifnull(leader, '부재중') from Club;
```

- Commit & Rollback

```sql
-- autocommit 체크
-- autocommit 안되어 있으면 항상 하나 할때마다 commit; 해야함
show variables like '%commit%';

-- auto commit 끔 (commit 이나 rollback 할 때까지)
-- 현재 세션만 반영 (메모리 올라가 있음)
-- session 단위로 트랜잭션 제어됨!
-- START TRANSACTION ~ commit이 하나의 save point임
START TRANSACTION;

update Student set name = '111' where id = 1;
select name from Student where id = 1;

-- 다른 세션도 모두 적용
commit;

-- commit 이미 하고 나면 되돌릴 수 없음 (엎질러진 물)
-- backup 한 것 찾아야 함
rollback;
```

#

## [Note]

- Python - dynamic 형 변환 (runtime 속에서 형 변환 정해짐) <br/>
  Java, C 등 정적 타이핑 언어는 초기에 타입 선언
- Ctrl + t: 새 쿼리 탭 열기
- `SET AUTOCOMMIT = FALSE;` 하면 현재 세션의 autocommit 속성이 False가 됨
- `SELECT @@AUTOCOMMIT;` 해서 1이면 autocommit 상태
- mysql 서버 전체설정을 변경하고 싶으면 <br/>
  /etc/my.cnf.d/server.cnf 파일에서 autocommit=0 을 추가하시고 재시작
- Oracle은 10g부터 테이블 삭제(drop)시 바로 삭제하지 않고 휴지통(Bin)으로 먼저 보냄 <br/>
  (휴지통 비우기는 `PURGE RECYCLEBIN;`)
- MySQL은 삭제하면 휴지통으로 보내는 것이 아니라 바로 drop 됨 <br/>
  (drop 후 `show tables;`로 확인 가능, 별도로 purge 옵션 필요 없음)
- MySQL에서는 drop 후 복구할 방법 없음 (Oracle은 가능) <br/>
  => 풀백업을 했거나 트랜잭션 로그 (bin log)가 있어야 복구 가능

#

[Reference](https://www.youtube.com/watch?v=w7LtHkeXbvM&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=7)
