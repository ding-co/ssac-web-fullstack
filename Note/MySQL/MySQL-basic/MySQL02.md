## MySQL 02 - Table생성, 한글(UTF-8) 설정, Session개념

```
-- mysql

-- 권한 확인
show grants for '<user-name>'@'<host>';

-- 모든 host에 대한 권한 다 보기
show grants for '<user-name>';

-- 권한 삭제(취소)
revoke all privileges on <db-name>.* from <user-name>@'<host>';

-- user 삭제
drop user '<사용자>'@'<host>';
```

```
-- table 생성
-- PK는 보통 id로 만듦 (ORM)
-- unsigned (음의 정수 안취함)
-- varchar (가변형, 영어는 1개가 1바이트, 한글은 2 or 3 바이트)
-- UTF8은 기본적으로 한글 3바이트
-- CURRENT_TIMESTAMP (레코드가 생길 때 TIMESTAMP 값)
-- date를 varchar로 쓰는 경우도 있음
-- tinyint(1) - 한자리 숫자
-- PK는 당연히 unique
-- MySQL Engine - InnoDB (transaction 가능), MyISAM (SQLite 처럼 파일에다가 씀)
-- AUTO_INCREMENT=45 로 지정하면 id가 46부터 생김
-- table 여러개 쪼갤 수 있음


CREATE TABLE [IF NOT EXISTS] Student (
  id int unsigned not null auto_increment COMMENT '학번'.
  name varchar(31) not null COMMENT '학생명',
  createdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  graduatedt varchar(10) DEFAULT NULL COMMENT '졸업일',
  auth tinyint(1) unsigned NOT NULL DEFAULT '9' COMMENT '0:sys, 1:super, ...',
  ...,
  PRIMARY KEY (id),
  UNIQUE KEY unique_stu_id_name (createdate, name)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

desc Student;
```

```
-- MySQL Workbench

set time_zone = 'Asia/Seoul';

show variables like '%time_zone%';

set global time_zone = 'Asia/Seoul';

-- system milliseconds (1970년 ~)
select unix_timestamp();

-- 사전에 time zone 세팅해서 한국 시간 보여줌
-- 원래는 숫자만 나옴
select FROM_UNIXTIME(<millseconds>);

-- Create Table Tips
-- Timestamp: DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP
-- on UPDATE (현재 record에 수정이 일어나면 무조건 현재 시간으로 바꿈)
-- (ex. worktime 누가 언제 수정했는지 파악 가능)
-- desc <table명> 로 table 정보 확인함
-- truncate table <table명> table 비우기

-- unsigned 걸면 값의 범위가 2배 됨
-- ex. 학과 id tinyint로 잡음 (255개는 안넘음)
-- 4byte인 INT 까지는 부담없이 잡음 (8B인 BIGINT는 고민..)
-- 나중에 alter로 늘려도 됨

create table Test(
    id tinyint unsigned not null auto_increment,
    name char(5) not null,
    primary key(id)
);

-- 테이블 정보 확인
desc Test;

-- id는 auto_increment 이므로 줄 필요 없음
insert into Test(name) values('김일수');

-- 한글 설정 (tool 활용해도 됨)
-- collate는 charset 더 detail하게 표현

-- TINYINT(0) 0은 default

-- Table 보는 명령어
-- 1. desc 명령어 하면 column 명만 나옴
-- 2. show create table 명령어 하면 깨져보임

show create table Test;

select * from Test;

-- DB 만들 때 Table, Column 한글 설정
-- column <-> table default 값 따라감

-- DB 엔진 default 는 InnoDB임
CREATE DATABASE <db> DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

ALTER DATABASE <db> DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

```
-- Try This

-- 1. 학생 테이블(Student) 생성

-- 학번(id, int, auto_increment),
-- 학생명(name, 최대 32),
-- 주소(addr, 최대 30),
-- 생년월일(birth, 8),
-- 전화번호(tel, 15),
-- email(email, 31),
-- 등록일시(regdt, timestamp) : insert 시간으로 자동 저장

-- 작은 숫자는 tinyint, 큰 숫자는 int, 아주 큰 숫자는 bigint
-- string은 거의 대부분 varchar()
-- CURRENT_TIMESTAMP (전역변수) constant 변수는 대문자로 적는게 좋음
-- date는 8B, 생년월일 할때 varchar(6)으로 해도 됨

create table Student(
    id int unsigned not null auto_increment comment '학번',
    name varchar(32) not null comment '학생명',
    addr varchar(30) comment '주소',
    birth date not null,
    tel varchar(15),
    email varchar(31),
    regdt timestamp default CURRENT_TIMESTAMP not null,
    primary key(id)
);

-- show create table Student;
desc Student;

-- 2. 학생 3명 등록

insert into Student(name, addr, birth, tel, email)
             values('김일수', '서울', '2003-01-02', '010-9999-8888', 'aaa@gmail.com');

insert into Student(name, addr, birth, tel, email)
             values('김이수', '서울', '2004-01-02', '010-9999-5588', 'aaaaa@gmail.com');

insert into Student(name, addr, birth, tel, email)
             values('김삼수', '서울', '2005-01-02', '010-9999-1188', 'aaaaaaaaa@gmail.com');

insert into Student(name, addr, birth, tel, email)
             values('김사수', '서울', '2005-01-02','010-9599-1188', 'aaaaaaaaa@gmail.com');

select * from Student;

-- PK로 조건절 걸기
update Student set tel='010-2222-125125' where id = 4;

-- 보통 DB or table 백업해두고 함 (나중에 노가다 복구 매우 힘듦)
-- 임시 테이블 생성
-- as select로 만든 것이 아니므로 값은 없음 (명세만 한 것)
-- create table t_student as select * from Student 하면 data까지 다 만들어짐
-- data export 해놔도 됨 (나중에 data 손상 시 import 하면 됨)
-- export는 file로 떨궈놓음 (dump 떠놓음)

create table t_student like Student;

select * from t_student;

show create table t_student;

-- column 다 하면 생략 가능
-- Student의 id는 auto increment인데 값을 줘도 됨
insert into t_student select * from Student;

# table 비움, id 1번부터 들어감 (auto increment flag까지 다 지움)
truncate table t_student;

# data 모두 삭제 후 그 다음 id 번호로 들어감
delete from t_student where id > 0;
```

#

## [Note]

- UTF-8 (Unicode Transformation Format - 8 bit)
- MySQL, MS-SQL은 user 자체가 user임 <br/>
  Oracle은 user가 db라고 보면 됨
- SQL에서 만약 특수기호가 들어있으면 ''로 싸줘야 함 (\_, 영문, 숫자 제외)
- MySQL user는 host 별로 나눠짐 (host가 다르면 다른 user임)
- db는 다 복잡함
- MySQL 공식 manual; Pseudocode 보는 법

  - CREATE 문
    - 대괄호 [ ] 는 optional
    - IGNORE는 무시, REPLACE는 대치 (ex. PK만 냅두고 나머지 모두 overwrite)
    - LIKE 문
    - AUTO_INCREMENT (자동 증가)
    - COMMENT (주석)
    - COLLATE (table의 charset 정할 수 있음)
  - Column Type
    - Numeric Type (숫자 타입)
      - TINYINT - 1바이트 (-128 ~ 127, max unsigned 255)
    - Date & Time
      - date(3B), time(3B), datetime(8B), timestamp(4B), year(1B)
      - year는 256가지면 부족한데 왜 충분? DB는 모두 1970년 기준 ~ 2038년까지
      - Datetime 은 상수 ex) '2018-12-03 15:33:45.9' (8B) <br/>
        string으로 넣어도 됨
      - TIMESTAMP (4B, int) 는 맞춰서 넣어야 함, 날짜가 숫자로 들어가 있음 <br/>
        2038년 넘으면? 앞에 column 하나 추가하면 됨
    - String type
      - char 고정형; 나머지 공백으로 채워짐
      - varchar 가변형; 나머지는 null로 비워놓음
      - 255B 이상이면 자동으로 text로 넘어감 (내부에서)
      - text는 varchar 보다 LIKE 검색 시 부담 많이 됨
      - binary/byte (255B)

- MySQL Workbench

  - MySQL 설치 후 한글, Timestamp 기본 세팅함
  - Ctrl + Enter: 쿼리 한줄만 실행
  - Ctrl + Shift + Enter: 쿼리 전체 실행
  - Ctrl + t: query tab 생성
  - bold 처리 되어 있는 것이 들어온 db
  - 오류 copy row => 보기 (error code는 약속되어 있음)
    - error code 1075
  - Workbench 통해 3306 포트 접근한 것임
  - client (MySQL Workbench, Python, WAS,...)가 3306 포트로 접근할 때마다 하나의 세션을 만들어줌 <br/>
    `show processlist;` id는 세션 id (접속할 때 마다 세션 생김) <br/>
    세션은 client가 접속했을 때 하나씩 table 놔줌 <br/>
    `global` setting 하면 숫가락/젓가락 들고 와서 테이블 앉음 <br/>
    세션마다 charset 다르게 지정 가능

- Collation (charset)
- 대부분 InnoDB (트랜잭션 가능), MYISAM은 나중에 log 파일용으로 쓰이기도 함
- 유니코드 (세상 모든 글자 다 표현한 것)
- utf8mb4 (이모티콘은 4B 써야함, 3B로는 표현 불가 ex. 게시판, 채팅)
- Schema (Database)
- tool 쓰기 편하면 tool 쓰면 됨 (굳이 명령 다 외울 필요 없음) <br/>
  terminal 에서는 명령어 필요하긴 함
- general/unicode
- MODIFY/CHANGE COLUMN
- 세션

  - 처음에 client가 MySQL에 접속할 때 db,uid,upwd 달고 들어옴
  - 들어올 수 있는지 권한 먼저 check
  - 들어오면 session 하나 열어줌
  - session에 charset 등 설정 값 달고 옴
  - 판 하나 깔아줌
  - 들어오는 입구는 3306 포트
  - 3306포트에 MySQL이라는 큰 데몬이 떠있음
  - server socket (client socket)
  - 접속할 때마다 탁자 하나씩 있어야 함
  - 따라서 세션 id 알고 있어야 함
  - 두번째 사람이 들어오면 탁자 하나 깔고,...
  - 세번째 사람이 만약 root로 들어오면 다른 탁자임
  - 실행은 db에서 함, 세션은 그냥 탁자일 뿐
  - 한개의 세션은 한개의 프로세스를 가짐 (프로세스 기반)
  - `show processlist;` (1개의 세션은 1개의 프로세스)
  - 쓰레드 방식이면 1개의 프로세스 나눠쓰므로 느려질 것임
  - CPU 많은 서버일수록 유리
  - 세션 다 close하면 MySQL 닫힘

- 웹 세션

  - 클라이언트가 네이버에 접속하면 서버에 하나의 세션을 만듦
  - 세션은 응답/돌아갈 위치 (프로그램 상에서는 socket이라는 말 사용)
  - 네이버 로그인 한 결과를 브라우저가 받음
  - 로그인한 session id를 브라우저가 받아서 브라우저에 cookie를 심음
  - 웹 서버는 결과 주고 나면 무조건 끊음 (세션 없애버림, 세션 개수 한정)
  - 동일한 사람이 다시 웹 서버에 접속하면 쿠키를 달고 들어와서 내가 누군지 파악 가능

- DB는 큰 단위를 작은 단위로 줄일 수는 없음 <br/>
  ex) date -> varchar(6) 불가 <br/>
  date는 8B, varchar(6)은 6B <br/>
  varchar(8) 로 바꿔도 오류남, varchar(10) 로 바꾸는건 잘됨

#

### [Q&A]

- ORM?

#

[Reference](https://www.youtube.com/watch?v=woS6ifxaCFQ&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=2)
