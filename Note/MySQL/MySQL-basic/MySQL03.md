## MySQL 03 - Table Altering, Sample Data 파이썬으로 자동 등록하기

```
-- MySQL

-- 테이블 수정

-- Alter Table <table명> [Add | Modify | Change | Drop] [Column] <column명>
-- Add: 컬럼 추가 (column명 뒤에 타입 붙임)
-- Modify: 컬럼 타입/사이즈 수정
-- Change: 컬럼 이름 변경
-- Drop: 컬럼 삭제

alter table t_student drop email;

-- Alter Table <table명> [Add | Drop] Index ...
-- index 수정하고 싶으면 index drop 하고 다시 add 해야함

-- index: 메모리에 올림
-- unique: 값이 유일
-- fulltext: text column (메모리 많이 차지함)
-- spatial, primary

show index from Student;

select * from Student;

-- 목표: birth를 6자리로 바꾸고 싶음 (주민번호 앞자리)
select birth, replace(substring(birth, 3), '-', '') from Student;

update Student set birth = replace(substring(birth, 3), '-', '') where id > 0 and birth is not null;

select * from Student where birth is not null;
```

```
# ---터미널---
# nodemon 설치
npm install nodemon -g

# student1000.py 생성

# nodemon 실행
nodemon student1000.py

# pymysql 설치
pip install pymysql
# ---터미널---

# ---student1000.py---

import pymysql
import random

last_names = list("김이박최강고윤엄한배성백전황서천방지마피")
first_names = list("건성현욱정민현주희진영래주동해도모영진선재현호시우인성마무병별솔하라")
alphas = list("abcdefghijklmnopqrstuvwxyz" * 3)
nums = list("0123456789" * 4)
addresses = ['서울', '대전', '부산', '대구', '전주', '강원']

years = list(range(70, 99))
months = list(range(1, 13))
month_30 = [4, 6, 9, 11]
days = list(range(1, 32))
days_30 = list(range(1, 31))
days_28 = list(range(1, 29))

def create_nums(n = 4):
    return "".join(random.sample(nums, n))

def create_alphas(n = 5):
    return "".join(random.sample(alphas, n))

def create_birth():
    year = random.choice(years)
    month = random.choice(months)
    day = random.choice(days)
    if month in month_30 and day > 30:
        day = random.choice(days_30)
    elif month == 2 and day > 28:
        day = random.choice(days_28)

    return "{}{:02d}{:02d}".format(year, month, day)

def create_data():
      last_name = random.choice(last_names)
      first_name = "".join(random.sample(first_names, 2))

      tel = "010-{}-{}".format(create_nums(), create_nums())
      email = "{}@gmail.com".format(create_alphas(random.randrange(3, 9))
      address = random.choice(addresses)

      return (last_name + first_name, tel, email, create_birth(), address)

data = []
for i in range(0, 1000):
    data.append(create_data())

print(data)

conn = pymysql.connect(
    host='localhost',
    user='dingco',
    password='dingco',
    port=3306,
    db='dingcodb',
    charset='utf8')

# ?는 알아서 형변환 (하지만 핸드폰 번호는 불가)
# sqlite는 ? 쓰면 편함, 나머지 db는 %s 사용
# sqlite; rownumber 가 PK와 같음 (MySQL은 다름)
# 숫자는 원래 %d 나 %i but, tuple 에서 가져올 때 int로 정확히 형변환 못함 (db에 줄 때)
# 패킷으로 네트워크 타고 날라갈 때는 string, db에서는 알아서 int로

with conn:
    cur = conn.cursor()
    sql = "insert into Student(name, tel, email, birth, address) values(%s, %s, %s, %s, %s)"
    cur.executemany(sql, data)
    print("AffectedRowCount is", cur.rowcount)
    conn.commit()


-- MySQL Workbench

truncate table Student;

-- 뒤부터 읽기
select * from Student order by id desc;

truncate table Student;

alter table Student add column tt;
alter table Student drop column tt;

-- table 정보
show table status;

drop table Test2;
drop table Test3;

show table status;

show tables;

-- 내 db만 보임 (권한 없어서 다른 db는 안보임)
show databases;

-- 수백만개 데이터 넣을 때 ENGINE 바꿈 (트랙잭션 후 다시 InooDB로)
alter table t1 ENGINE = MyIsam;
```

#

## [Note]

- 테이블 수정; AUTO_INCREMENT, character set, engine 등 제외하면 대부분 column, index 수정임
- 인덱스; 목차, foreign key도 index인데 사실상 constraint임 <br/>
  인덱스는 메모리에 올라옴, data는 disk에 있음
- DB 넣는건 제일 마지막에 넣기

#

### [Q&A]

#

[Reference](https://www.youtube.com/watch?v=4M-AfIrWFj8&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=3)
