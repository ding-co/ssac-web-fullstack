## {풀스택#14} MySQL 시작 - 샘플 데이터 생성

### _Test Sample Data 생성하기_

- MySQL Workbench 설치 (8버전)
- create Database (testdb)

  ```sql
  -- Docker container에서 ncloud 접속
  -- MySQL Workbench는 사용자들 접속용으로 보통 들어가고
  -- root 계정은 Workbench 말고 터미널로 직접 들어가도록 함

  ncloud

  mysql -u root -p

  show databases;

  create database testdb;

  grant all privileges on testdb.* to mydeal@'%';

  flush privileges;
  ```

- create Tables (Dept, Emp)

  ```sql
  -- MySQL Workbench
  -- 나중에 ORM 위해 id를 PK로 세팅함 (+ auto_increment)

  create table Dept(
    id tinyint unsigned not null auto_increment,
    pid tinyint unsigned not null default 0 comment '상위부서id',
    dname varchar(31) not null,
    PRIMARY KEY(id)
  );

  create table Emp(
    id int unsigned not null auto_increment,
    ename varchar(31) not null,
    dept tinyint unsigned not null,
    salary int not null default 0,
    primary key(id),
    foreign key(dept) references Dept(id)
  );
  ```

- insert Test Data (7개 부서, 200명 이상 직원)

  ```sql
  -- 가라 데이터 삽입
  -- 상위 부서
  insert into Dept(pid, dname) values (0, '영업부'), (0, '개발부');

  select * from Dept;

  -- 하위 부서
  insert into Dept(pid, dname) values (1, '영업1팀'), (1, '영업2팀'), (1, '영업3팀'), (2, '서버팀'), (2, '클라이언트팀');

  -- self join
  select d1.dname as '상위부서', d2.*
    from Dept d1 inner join Dept d2 on d1.id = d2.pid;

  select * from Emp;

  -- create function

  CREATE FUNCTION `f_rand1` (_str varchar(255))
  RETURNS varchar(31)
  BEGIN
      declare v_ret varchar(31);
      declare v_len tinyint;

      set v_len = char_length(_str);
      set v_ret = substring(_str, ceil(rand() * v_len), 1);
  RETURN v_ret;
  END

  -- 함수 테스트
  select f_rand1('김이박');

  -- 부서 번호 랜덤 (1~7)
  -- Emp table의 dept 자리에 넣을 예정
  select f_rand1('1234567');

  -- 이름 랜덤 함수 생성
  CREATE FUNCTION `f_randname` ()
  RETURNS varchar(31)
  BEGIN
      declare v_ret varchar(31);
      declare v_lasts varchar(255) default '김이박조최전천방지마유배원';
      declare v_firsts varchar(255) default '순신세종성호지혜가은세호윤국가나다라마바사아자차파태하결찬희';

    set v_ret = concat(f_rand1(v_lasts), f_rand1(v_firsts), f_rand1(v_firsts));

  RETURN v_ret;
  END

  -- 이름 랜덤 함수 테스트
  select f_randname();

  desc Emp;

  -- 2번 넣어보기
  insert into Emp(ename, dept, salary) values(f_randname(), f_rand1("34567"), f_rand1("123456789") * 100);

  select * from Emp;

  -- 프로시저 생성
  CREATE PROCEDURE `sp_test_emp` (_cnt int)
  BEGIN
    declare v_idx int default 0;

    while v_idx < _cnt
      do
        insert into Emp(ename, dept, salary) values(f_randname(), f_rand1("34567"), f_rand1("123456789") * 100);

        set v_idx = v_idx + 1;
      end while;
  END

  -- 10개 삽입 테스트
  call sp_test_emp(10);

  select * from Emp;

  -- 250개 삽입
  call sp_test_emp(250);

  select * from Emp;

  -- 오차 크지 않음 (체크)
  select dept, count(*) from Emp group by dept;
  ```

#

## [Note]

- MySQL X DevAPI: MySQL 8부터 지원하는 NoSQL (Document Store)
- MySQL Workbench; 서버명 - DB 명
- 숫자 같은 경우 없어도 not null로 하고 default 0으로 주는 것이 좋음
- UTF8; 한글 하나에 3바이트, 영어는 1바이트

#

### [Q&A]

- Stored Function 만들 때 ERROR 1418 <br/>
  => SET GLOBAL log_bin_trust_function_creators = 1; 쿼리 수행 <br/>
  (terminal - ncloud mysql root로 로그인 해서 쿼리 수행)

#

[Reference](https://www.youtube.com/watch?v=3S8koZ-UAQo&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=16)
