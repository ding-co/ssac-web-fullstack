## {풀스택#16} MySQL - SQL 한방에 정리하기 Part 2 - DML, TCL

### _DML (CRUD)_

- insert, select ,update, delete

```sql
-- insert ignore
-- PK나 Unique key 무시하고 insert

select workdate, count(*) from Dept group by workdate;

select * from Dept order by rand() desc;

-- 4 ~ 5
select * from Dept limit 3, 2;

select workdate, count(*) cnt from Dept
  group by workdate
  having cnt > 1;

-- sub-query
select * from Dept where id in (select dept from Emp where id in (1,2));

select *, (case when pid = 0 then '최상위부서' else '부서' end) as ppid from Dept;

-- 2 rows affected
-- 처음에 insert 하고 duplicate 되어 있으니 update 한 것
insert into Dept(pid, dname) values (2, '서버팀')
on duplicate key update dname = '서버팀2';

select * from Dept;

-- auto_increment 나중에 꼬여버림
insert into Dept(pid, dname) values (2, '서버팀2')
on duplicate key update dname = concat(dname, '222');

select * from Dept
-- update Dept set dname = '서버팀'
where id = 6;

select * from Dept;
```

### _Foreign Key_

- 수강 신청

  - 테이블: Subject, Enroll, Club, Prof
  - main (참조 당하는) table 먼저 생성 (master)

- 회사
  - 테이블: Dept, Emp, Email(id, sender, receiver, subject)
  - FK 관계; Emp.dept -> Dept.id (set null) <br/>
    Email.sender -> Emp.id, Email.sender -> Emp.id (cascade)

### _Join Tables_

- inner join
- outer join

```sql
insert into Dept(pid, dname) values(2, 'DB팀');

select e.*, d.dname
  from Dept d inner join Emp e on d.id = e.dept
 where e.id = 5;

delete from Dept where id = 11;

select * from Emp where id = 5;

select e.*, d.dname
  from Dept d inner join Emp e on d.id = e.dept
 order by e.id;

select e.*, d.dname
  from Dept d right outer join Emp e on d.id = e.dept
 order by e.id;
```

```sql
-- outer join examples

-- Dept table에 captain(부서장, Emp.id) 추가
-- 캡틴이 없는 부서도 존재 (상위부서, 부재중, 퇴사, ...)
desc Emp;

alter table Dept add column captain int unsigned;

select * from Dept;

-- 모든 부서에 부서장 등록 (단 해당 부서 직원)
-- 최상위 부서는 부서장 없다고 가정
update Dept d
   set captain = (select id from Emp where dept = d.id order by rand() limit 1);

select * from Dept;

select *, (select dept from Emp where id = d.captain) as eee from Dept d;

-- 부서장이 없는 팀 1개 생성
select * from Dept
-- update Dept set captain = null
 where id = 6;

-- 전체 부서 목록 추출 (부서장 명 포함, 부서장 없는 부서도 포함)
select *, (select ename from Emp where id = d.captain) as '부서장명' from Dept d;

select *
  from Dept d left outer join Emp e on d.captain = e.id;

-- 부서가 없는 직원 1명 생성 (최상위 또는 Staff)
-- 아까 만들었음 update로 null 세팅
select * from Emp where dept is null;

-- 전체 부서명과 직원 출력 (부서장 없는 부서 + 부서가 없는 직원)
select * from Dept d left outer join Emp e on d.captain = e.id
UNION
select * from Dept d right outer join Emp e on d.captain = e.id;

-- 카티션 곱 (실무에선 거의 존재하지 않음)
select * from Dept, Emp;
```

### _Transaction_

- TCL: Commit & Rollback

```sql
select @@autocommit;

-- transaction 시작
start transaction;

select * from Dept where id in (1, 2);

update Dept set dname = '영업부서' where id = 1;

-- commit/rollback;

start transaction;

select * from Dept where id in (1, 2);

savepoint sp1;
update Dept set dname = '영업222' where id = 1;

savepoint sp2;
update Dept set dname = '개발222' where id = 2;

rollback to savepoint sp2;

commit;
```

#

## [Note]

- truncate; 테이블을 drop하고 create (DDL)
- truncate vs. delete
- group by는 select 이루어지고 나서 타는 것임 <br/>
  마치 select 문이 서브 쿼리로 작동함
- FK와 FK가 참조하는 PK 사이에 타입 일치! <br/>
  (not null, auto_increment은 상관 없지만)
- FK 관계 설정 시 set null하면 우선 그 컬럼 타입 not null 풀어야 함
- 최근에는 join 많이 안함 (ORM 때문에)
- MySQL은 full outer join 안먹힘
- cross join (카티션 곱)
- Session; DB 커넥션 맺고 close 하기 전까지
- table create 등 DDL은 rollback 적용 안됨

#

[Reference](https://www.youtube.com/watch?v=_j2JgznBA2Y&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=17)
