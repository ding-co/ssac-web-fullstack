## MySQL 05 - 관계(Foreign Key)와 index의 개념

### _Relation_

- 예시 1

  - 테이블

    - 학생(id, name)
    - 과목(id, name)
    - 수강내역(id, 학생, 과목)

  - 관계

    - 다대다 관계 (학생 여러명이 과목 여러개 수강할 수 있음)
    - 학생 한 명이 여러 과목 들을 수도 있고 과목 하나는 여러 학생을 받을 수 있음
    - 학생 - 수강내역 (1:N)
    - 과목 - 수강내역 (1:N)
    - 학생 - 과목 (N:N)

- 예시 2

  - 테이블

    - 학생
    - 교수
    - 주임교수

  - 관계

    - 학생 1명당 주임교수는 1명 <br/>
      주임교수 1명당 학생 여러명
    - 학생 - 주임교수 (N:1)
    - 교수 - 주임교수 (1:1)
    - 학생 - 교수 (1:N)

- 예시 3

  - 테이블

    - 학생(id)
    - 동아리(학생짱:id)
    - 동아리회원

  - 관계

    - 학생 - 동아리 (1:N)
    - 동아리 - 동아리회원(1:N)
    - 학생 - 동아리 회원(1:N)

- 예시 4

  - 테이블

    - 부서(인사)
    - 직원

  - 관계
    - 부서 - 직원 (1:N) <br/>
      (부서 하나에는 직원 여러명 가능)
    - 만약, 직원이 두 개 부서 이상 가능하다면 N:N 관계가 됨 <br/>
      (직원 1명이 여러 부서 가능 && 부서 1개는 여러 직원 가능)
    - 만약, 직원 1명이 부서 1개만 가능, 부서 1개는 직원 여러 명 가능 <br/>
      => 1:1, 1:N 각각 곱해서 => `1*1 : 1*n` => 1 : N (부서 - 직원)

- 예시 5

  - 테이블
    - 학생(id, name, gender)
    - 기타정보(id, 혈액형, 취미, 특기)
    - 전과기록(id, 전과연도)
  - 관계

    - 학생 - 기타정보 (1:1)
    - 학생 - 전과기록 (1:N) <br/>
      (학생 1명이 여러 전과 가능하다면)
    - 자주 쓰지 않는 정보는 테이블로 분리 (정규화) => SELECT 편함
    - 메인 테이블은 학생 테이블 (참조 당하는/되는 테이블)
    - 기타정보 depends on 학생 (기타정보는 학생에 의존적) <br/>
      => 기타정보에는 학생의 id가 있어야 함
    - 전과기록 depends on 학생 => 전과기록 테이블에도 학생 id 있어야 함 <br/>
      전과기록 테이블의 학생 id (FK)가 학생 테이블의 학생 id (PK) 참조

- 실습

  - 테이블

    - Club(동아라id, 동아리name, createdate, leader)
    - Student(학생id)
    - Enroll(id int, subject:fk_subject, student:fk_student) <br/>
      나중에 ORM 떄문에 id 하나를 PK로 뺌, FK는 둘 다 CASCADE 가능
    - Subject(과목id, 과목name, professor:fk_prof set null)
    - Professor(교수id smallint unsigned, 교수name varchar(31), likecnt int default 0)

  - 관계
    - Club의 leader - Student의 id (1:1, 리더 1명 당 학생 1명)
    - Enroll의 student - Student의 id (N:N, 학생 1명이 여러 과목 수강 가능, 한 과목은 여러 학생 수강 가능)
    - Enroll의 subject - Subject의 id (1:1)
    - Subject의 prof - Professor의 교수id (1:1로 간주, 한 과목은 한 교수만 담당, 담당교수)
    - 서로 다른 테이블의 name column 끼리 매핑하면 잘 모름 (동명이인 가능) <br/>
      => id를 매핑하자!

```sql
-- Club table 생성
-- leader는 학생 테이블의 id를 참조하므로 type 일치 필요
create table Club(
    id smallint unsigned not null auto_increment primary key,
    name varchar(31) not null,
    createdate timestamp not null default current_timestamp,
    leader int,
    [Constraint] foreign key fk_leader_student(leader) references Student(id)
    [on delete]
    [on update]
);

desc Club;
show create table Club;

-- Professor table 생성
create table Professor(
  id smallint unsigned not null auto_increment primary key,
  name varchar(31) not null,
  likecnt int not null default 0
)

-- Subject table 생성
create table `Subject`(
  id smallint unsigned not null auto_increment primary key,
  name varchar(31) not null,
  professor smallint unsigned,
  constraint foreign key fk_professor_professor (professor) references Professor(id)
  on delete set null
);

-- Enroll table 생성
create table Enroll(
  id int unsigned not null auto_increment primary key,
  subject smallint unsigned not null,
  student int not null
);

show create table Enroll;

alter table Enroll add constraint foreign key fk_subject (subject) references Subject(id) on delete cascade;

alter table Enroll add constraint foreign key fk_student (student) references Student(id) on delete cascade;

insert into Club(name, leader) values('요트부', 100);
insert into Club(name, leader) values('음악부', 200);
insert into Club(name, leader) values('미술부', 300);

-- leader 이름까지 같이 보고 싶음
select c.*, s.name as 'student name' from Club c inner join Student s on c.leader = s.id;

-- MySQL은 dual 안써도 됨 (원래는 쓰는 게 정석)
select ceil(rand() * 10) from dual;

-- Student 테이블부터 불특정 상위 100명 가져옴
-- order by rand()는 PK(id)에 대한 난수
-- name은 PK를 랜덤하게 받은 데이터에서 뽑아낸 컬럼일 뿐
insert into Professor(name, likecnt) select name, ceil(rand() * 10) from Student order by rand() limit 100;

select * from Professor;

insert into Subject(name, professor)
  select '국어', id from Professor order by rand() limit 10;

select * from Subject;

update Subject set name = '역사' where name = '국어' and id <> 10 limit 1;
update Subject set name = '사회' where name = '국어' and id <> 10 limit 1;
update Subject set name = '윤리' where name = '국어' and id <> 10 limit 1;
update Subject set name = '공업' where name = '국어' and id <> 10 limit 1;
update Subject set name = '영어' where name = '국어' and id <> 10 limit 1;
update Subject set name = '생물' where name = '국어' and id <> 10 limit 1;
update Subject set name = '화학' where name = '국어' and id <> 10 limit 1;
update Subject set name = '컴퓨터' where name = '국어' and id <> 10 limit 1;
update Subject set name = '문예' where name = '국어' and id <> 10 limit 1;

-- tool index setting
-- uq_subject_name UNIQUE name
```

#

## [Note]

- id는 보통 PK, auto_increment
- DB는 ERD (Entity Relationship Diagram)
  - 위에는 테이블 명
  - 아래는 컬럼 명
- 클래스는 클래스 다이어그램
- tinyint(1byte, 256)
- smallint(2B, 65536)
- int(4B)
- 학생수강 테이블에서 PK를 복합키로 잡지 않고 따로 id로 두는 이유
  1. ORM 구성 시 참조(hasMany, belongsTo) 용의
  2. PK 인덱스 크기가 작아 디스크 및 메모리에 효율적
  3. 두 개 이상의 column에 PK(Unique Key)를 사용하면 <br/> 데이터베이스 시스템이 내부에서 할 일이 많아짐
  4. where 조건절이나 join 절이 복잡하고 느려짐
  5. 복합키라 함은 의미있는 데이터 컬럼들이 PK로 사용되게 되는데, <br/>
     만약 수정이 발생한다면 PK의 기본 요건 <br/>
     (안정적이고 간단하며 갱신할 필요가 없는 컬럼으로 구성)에 위배됨
- FK는 create table 할 때 걸어도 되고, alter table 할 때 해도 됨
- FK는 constraint인데 속에서는 index임 <br/>
  index가 되야 table join 해서 빠르게 검색 가능 <br/>
  (양쪽 모두 index 키로 세팅되어야 빠르게 검색 가능, FK-PK)
- index는 sorting 되어 있는 메모리의 어떤 색인
- FK
  - RESTRICT: 누가 참조하고 있으면 PK 삭제 불가 (default)
  - SET NULL: PK 삭제 전에 FK 부분 null로 세팅 후 PK 삭제
  - CASCADE: PK 삭제 하면 FK 해당 부분도 모두 삭제 (조심) <br/>
    (ex. 수강 테이블에서 과목이 없어지면 수강 내역도 모두 삭제해야함)
- Column
  - not null default 0 <br/>
    (null 지정해서 insert는 에러, column 다 지정 안하면 자동으로 0 들어감)
  - data 용량면에서는 안좋을 수 있지만 성능 면에서는 무조건 not null이 좋음
- MySQL index; 디스크에 data 씀
  - 한 record size가 16KB 안쪽이 좋음
  - index page; 한 page를 16KB로 정해놓음
  - record 위치 알기 위해 id(PK) 주소 값에 대한 색인을 별도 공간에 명세함 (index page)
  - index page도 모두 16KB로 나눔 (서랍장 하나 16KB)
  - 인덱스 페이지 중 하나 16KB => 16 x 1024 B <br/>
    (int 4byte, varchar(2) UTF8 => 6byte) <br/>
    index를 int와 varchar 모두 잡음 => 10 byte (실제 데이터 값) <br/>
    끝에 페이지가 주소임
  - 주소값은 16B로 정해져 있음 + 10B => 26B (레코드 하나)
  - 인덱스 페이지 하나에 16KB / 26B => 16 \* 1024B / 26B => 약 630개 레코드 소화 가능
  - 레코드 630개 넘어가면 인덱스 페이지 2장 필요
  - 인덱스 페이지 적게 가져가려면 인덱스를 작게 해야 함 <br/>
    복합 컬럼을 PK로 잡으면 (복합키) 인덱스 페이지 더 많이 필요해서 성능 떨어짐 <br/>
    인덱스가 많아도 안좋고 사이즈 커도 안좋음
- 실제로 한글 한글자가 3byte가 아닐 수 있음 (DB에서 1/2/3 byte 지정 가능)
- 인덱스마다 별도의 인덱스 페이지 생성됨
- index page 효율적으로 사용하기 위해 PK를 복합키로 지정하지 않음
- comment 다 다는게 좋음
- MySQL은 자동으로 FK를 index로 만듦 (table join시 성능 향상 위함)

#

[Reference](https://www.youtube.com/watch?v=WjEi7tKo0to&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=5)
