## MySQL 04 - Insert, Select, Update, Delete 문

```
-- DML (CRUD)

-- insert

select * from Test;
desc Test;

-- 표준
insert into Test(name) value('김오수');

-- Oracle에서는 안될 거임
insert into Test set name='김삼수';

-- select

-- update
update Test set name = '김쌈수' where id = 3;

-- update (using sub-query)
update Test set name=(select name from Student where id = 2997) where id = 3;

-- insert select 문
insert into Test(name) select name from Student where id < 10;

-- delete
delete from Test where id > 10;

-- truncate
```

```
-- select

-- 김씨로 시작하는 사람들 조회
-- %는 글자수 제한 X, _는 1글자
select * from Student where name like '김%_';

select * from Student where id in (10, 20, 30);
select * from Student where id = 10 or id = 20 or id = 30;

select * from Student where id not in (10, 20, 30);
select * from Student where id != 10 and id != 20 and id != 30;

select * from Student where id >= 10 and id <= 30;
select * from Student where id between 10 and 30;

select * from Student where id not between 10 and 30;

-- email이 a로 시작하고, tel의 가운데 숫자가 9000보다 큰 학생 추출
select * from Student where email like 'a%' and tel like '010-9%';

-- distinct는 중복 제거
select distinct(birth) from Student where birth = '701110' order by birth;

select count(*) from Student where birth = '701110';

select count(distinct birth) from Student where birth = '701110';

-- addr 먼저 sort 이후 name sort
select * from Student order by addr, name;

-- random sorting
select * from Student order by rand();

-- 게시판 페이지 만드는 쿼리
-- 11 ~ 30 나옴 (인덱스는 0부터 시작하므로)
select * from Student limit 10, 20;

-- DB 연산은 Like 검색보다 = 이 제일 빠름
-- 강원지역 학생 중 어린 순서로 11번째부터 5명 추출
select * from Student where addr = '강원' order by birth desc limit 10, 5;

-- 지역별 학생수 (그룹별 매핑)
select addr, count(*) as cnt from Student group by addr order by cnt desc;

-- 지역별로 학생수가 330명 이상인 지역들만 추출
-- grouping 한 것에서 where 조건 사용 불가; having 조건절 이용!
select addr, count(*) as cnt from Student group by addr having cnt >= 330;

-- case when 1
select name, birth,
    (case when birth like '7%' then '아재'
          when birth like '8%' then '젊은이'
          else '청춘' end)
  from Student limit 10;

-- case when 2 (위는 =, 아래는 like 연산)
select name, birth,
    (case addr when '서울' then 'SE'
               when '부산' then 'PS'
               else 'GD' end),
    (case when birth like '7%' then '아재'
          when birth like '8%' then '젊은이'
          else '청춘' end)
  from Student limit 10;
```

```
-- append gender column
-- null 값 없이 default 값 주는게 좋음
alter table Student add column gender bit not null default 0;

desc Student;

select * from Student;

update Student set gender = (case when name like '%해%' or name like '%솔%'
                              or name like '%숙%' or name like '%민%'
                              or name like '%현%' or name like '%회%'
                              or name like '%영%' or name like '%주%' then 0 else 1 end);

update Student set gender = 1
where not (name like '%해%' or name like '%솔%'
                              or name like '%숙%' or name like '%민%'
                              or name like '%현%' or name like '%회%'
                              or name like '%영%' or name like '%주%')
    and id > 0;

select gender, count(*) from Student group by gender;

update Student set gender = mod(id, 2);
```

#

## [Note]

-

#

### [Q&A]

#

[Reference](https://www.youtube.com/watch?v=CrFpnuZT6dw&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=4)
