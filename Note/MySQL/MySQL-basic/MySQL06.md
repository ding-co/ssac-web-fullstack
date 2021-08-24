## MySQL 06 - Join Tables 테이블 조인하기

### _Join Tables_

```sql
-- plan 1: 과목별로 랜덤 학생 배정 -> 문제점: 랜덤으로 추출된 학생이 고정됨!
-- (이미 추출한 학생들을 대상으로 과목이 선정되므로)
-- 학생 id 중복될 수 있음 (서브 쿼리 먼저 실행되므로)
select sbj.id, sbj.name
  from Subject sbj, (select id from Student order by rand() limit 3) s order by sbj.id;

-- plan 1. plan1을 과목별로 한과목씩 실행시킴! (배정받은 과목은 제외)
insert into Enroll(subject, student)
  select sbj.id, s.id
    from (select id from Subject where id not in (select distinct subject from Enroll) order by id limit 1) sbj,
         (select id from Student order by rand() limit 100) s;

-- 과목별 학생수
select subject, count(*) from Enroll group by subject;

select count(distinct student) from Enroll;

truncate table Enroll;

-- plan 2. 모든 학생이 적어도 한 과목은 수강하며, 한 학생은 최대 3과목까지 수강
insert into Enroll(student, subject)
  select id, (select id from Subject order by rand() limit 1) sid from Student order by id;

insert into Enroll(student, subject)
  select id, (select id from Subject order by rand() limit 1) sid from Student order by rand() limit 500 on duplicate key update student = student;

select student, count(*) from Enroll group by student;

insert into Enroll(student, subject)
  select id, (select id from Subject order by rand() limit 1) sid from Student order by rand() limit 500 on duplicate key update student = student;
```

```sql
select * from Subject;

-- 과목별 담당 교수명
select s.*, p.name as 'prof. name'
  from Subject s inner join Professor p on s.professor = p.id;

-- 과목별 학생수
select e.subject, max(s.name) as 'subject name', count(*) as '학생수'
  from Enroll e inner join Subject s on e.subject = s.id
  group by e.subject;

-- 역사 과목의 학생 목록
select s.name, s.birth
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id
  where sbj.name = '역사';

-- 국어 과목을 듣는 서울 거주 학생 목록 (과목명, 학번, 학생명)
select s.name, s.birth
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id
  where sbj.name = '국어' and s.addr = '서울';

-- 역사 과목을 수강중인 지역별 학생수
select s.name, s.birth
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id
  where sbj.name = '역사' group by s.addr;

-- 강의를 수강중인 과목별 지역별 학생수
select sbj.id, max(sbj.name), s.name, s.birth
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id
  group by sbj.id, s.addr;

select substring(s.addr, 1, 2) as a, count(*)
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id
  where sbj.name = '역사' group by a;
```

```sql
-- view 만들기
-- 반복되는 쿼리 부분 view로 만들기

-- view 만들기 전 사용할 컬럼 체크
select e.id as enrollid, s.id stuid, sbj.id sbjid, s.name student_name,
      s.birth, s.addr, sbj.name subject_name
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id

-- view 존재시 replace, 없으면 create
create or replace view v_enroll_student_subject as
  select e.id as enrollid, s.id stuid, sbj.id sbjid, s.name student_name,
      s.birth, s.addr, sbj.name subject_name
  from Enroll e inner join Student s on e.student = s.id
                inner join Subject sbj on e.subject = sbj.id

select * from v_enroll_student_subject;

select student_name, birth
  from v_enroll_student_subject
 where subject_name = '역사';

select addr, count(*)
  from v_enroll_student_subject
 where subject_name = '역사' group by addr;

-- view는 함수와 비슷한 테이블
```

```sql
-- outer join
select * from Club;

select c.*, s.name from Club c left outer join Student s on c.leader = s.id;
```

- Clustered Index

  - table 생성 시 항상 id(PK, auto_increment) 세팅
  - 영구 저장 장치에 디스크 써지는 인덱스 잡아주는 인덱스가 clustered index <br/>
    (PK 순서대로 써짐, 물리적 인덱스)
  - 레코드 하나는 16KB
  - non clustered index => index 페이지에 별도로 순서가 정의되어 있음 (논리적 인덱스)

## [Note]

- 인덱스를 거는 이유 => join 시 양쪽 모두 인덱스 있어야 검색 빠름
- 2개 컬럼에 unique 인덱스를 걸었더니 기존의 한 컬럼에 해당하는 FK 인덱스가 사라짐 <br/>
  (한 컬럼 인덱스 중복이니 FK 인덱스 하나는 사라짐) <br/>
  먼저 체크한 우선순위 1위는 남아있고 2위에 해당하는 인덱스가 사라진 것임 <br/>
  2개 컬럼 사용할 때는 2개 컬럼 있는 인덱스가 사용됨 <br/>
  FK 제약조건은 모두 다 남아있음
- exact matching은 inner join
- max/min 그룹핑 한 것 중에 최대/최소값 (정석적인 방법)
- join은 가능하면 최대한 인덱스끼리 매핑 (FK,PK)
- 인덱스는 모두 인덱스 페이지에 있음 <br/>
  인덱스 페이지는 실제로 다 메모리에 올림 <br/>
  만약 메모리에 올리지 못하면 disk에 swap in <br/>
  조인 결과를 한번에 다 보여주지는 못하고 버퍼 사이즈 단위로 보여줌 <br/>
  (버퍼 사이즈 단위는 16KB, 데이터는 실제로 디스크에도 있고 인덱스는 인덱스 페이지에도 있음, <br/>
  디스크에 써지는 단위도 16KB 단위)
- disk에 써야 영구적으로 저장됨

#

[Reference](https://www.youtube.com/watch?v=AgELXGiGfnE&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=6)
