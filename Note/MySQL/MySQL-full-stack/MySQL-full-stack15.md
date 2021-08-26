## {풀스택#15} MySQL - SQL 한방에 정리하기 Part 1 - DCL, DDL

### _DCL_

- Data Control Language
- grant, revoke, deny

```
# 터미널로 들어갈 일은 root밖에 없음

ncloud

mysql -u root -p

show databases;

use testdb

show tables;

-- 명세 보기
desc Dept;

desc Emp;

-- create 어떻게 했는지 확인 가능
-- FK 체크할 때 편리
show create table Dept;

-- index 나옴
show index from Emp;

-- 권한 확인
show grants for mydeal@'%';

-- 현재 접속된 유저 확인
select current_user();
```

### _DDL_

- Data Definition Language
- create, alter, drop, rename, truncate
- truncate는 복구 안되도록 데이터 내용 지움

```sql
-- create table Dept2 like Dept;

select * from Dept2;

-- 테이블 구조 + 데이터까지 통으로 만듦
-- create table Dept3 AS select * from Dept;

select * from Dept3;

show create table Dept3;

-- create table Emp2 AS select * from Emp;

-- reference key는 들어오지 않음
-- 데이터와 테이블 구조는 동일하지만 인덱스 값은 안옴 (PK, FK)
-- 인덱스는 별도로 잡아야 함
show create table Emp2;

-- 필요없는 테이블 제거
-- 블록 지정 후 Ctrl + Shift + Enter
drop table Dept2;
drop table Dept3;
drop table Emp2;

-- timezone (일반적으로 OS 따라감, 리눅스에 종속적)
-- @@ 전역변수
-- 변경은 root 권한으로만 가능
select @@time_zone;

show variables like '%time_zone%';

alter table Dept add column workdate timestamp not null default current_timestamp
        on update current_timestamp;

select * from Dept;
-- update Dept set dname = '클라팀'
  where id = 7;

create table Test(
  id int unsigned not null auto_increment,
  ttt varchar(31) not null,
  primary key(id)
);

select * from Test;
insert into Test(ttt) values('aaa1'),('aaa2'),('aaa3');

-- update Test set dept = f_rand1('34567') where id > 0;

show create table Test;

-- truncate는 완전히 data 날림 (drop 했다가 create)
-- truncate table Test;

select * from Test;

-- id 1 2 3 새로 만들어짐
insert into Test(ttt, dept) values ('aaa', 1), ('bbb', 2), ('ccc', 3);

-- delete 는 data만 지우고 테이블은 그대로 남겨둠
delete from Test where id > 0;

select * from Test;

-- id 값이 4부터 만들어짐
insert into Test(ttt, dept) values ('aaa', 1), ('bbb', 2), ('ccc', 3);

update Test set ttt = '한글뷐' where id = 3;

select * from Test;

select length('한글뷐🚴‍♂️');

-- ttt는 현재 utf8 상태라서 불가능
update Test set ttt = '한글뷐🚴‍♂️' where id = 2;

-- Dept는 utf8mb4라 가능
update Dept set dname = '클라팀🚴‍♂️' where id = 7;

select * from Dept;
```

### _DML_

- Data Manipulation Language
- create, select, update, delete

### _TCL_

- Transaction Control Language
- begin transaction, commit, rollback, savepoint

#

## [Note]

- commit하면 실제로 메모리에 있는 것을 디스크에 씀 (그 전에는 메모리에만 남아 있음)
- MySQL 인덱스는 모두 B 트리임
- db명.\* (뒤에 \*는 select/update/insert 등 모두 가능)
- userid@'%' (%는 접속 호스트 - 어느 아이피든지 모두 가능) <br/>
  localhost로 설정하면 터미널로밖에 안됨, MySQL workbench로 pc에 따로 접속 못함
- root 같은 권한은 사무실 ip나 특정 ip만 허용하는 것이 안전함!
- create table할 때 [if not exists]는 이미 존재하는 테이블에 대해서 오류 안나도록 하겠다라는 의미
- PK는 음수가 나올 수 없으므로 unsigned로 하고 auto_increment
- CURRENT_TIMESTAMP (현재 datetime으로 default 값 주기)
- UNIQUE 인덱스
- Column Type
  - Numeric Type
    - tinyint(1B, unsigned 0 ~ 255), smallint(2B), mediumint(3B), int(4B)
  - Date & Time Type
    - date(3B, 년월일), datetime(8B)/timestamp(4B, 글로벌 서비스), year(1B, 1970 ~ 2030년)
  - String Type
    - char(n) 고정 길이 vs. varchar(n) 가변 길이
    - text(65535B) 글자 많음
- blob 붙은건 다 바이너리 파일
- KST는 Korea Standard Time
- 이미 만들어져있는 테이블에 column 먼저 생성 후 FK 주기
- FK도 인덱스임
- create, select 등은 상관 없는데 <br/>
  update(write) 구문은 실수할 수 있으므로 했으면 주석 처리하기!
- DB 엔진
  - Myisam은 transaction 지원 X (select은 매우 빠름, file db 처리 유용)
  - memory는 메모리에만 존재하는 data (mysql reboot 시 다 날라감)
  - archive는 압축해서 사용하는 것 (백업 같은 것으로 사용, 8버전 부터 별로도 테이블로도 지정 가능)
- alter table change column ~ (컬럼 이름 변경은 change)
- alter table modify column ~ (컬럼 타입 변경은 modify)
- comment는 엑셀에 일괄적 변경 가능
- database 이름 바꾸고 싶으면 rename 없어서 full back-up 받은 다음에 <br/>
  drop database 하고 restore 하면 됨

#

### [Q&A]

- alter table할 때 어떤 한 컬럼의 타입을 정수값, not null로 하면 <br/>
  default 지정 안해도 자동으로 초기값 0으로 세팅해줌 <br/>
  (초기 altering 할때만 해당)

#

[Reference](https://www.youtube.com/watch?v=8oEE0fgXA4M&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=15)
