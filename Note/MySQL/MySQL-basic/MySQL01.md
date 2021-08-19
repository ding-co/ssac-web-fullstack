## MySQL 01 - Database 및 User 생성하기

### Databases 및 User 생성

```
# docker

docker ps
docker start/restart <container-name>

# 떠 있는 container 안으로 들어가기
# exec로 하면 exit 해도 container stop 안됨
docker exec -it <container-name> bash

# MySQL root 계정으로 진입
mysql -u root -p

# MySQL Commands

show databases;

create database <db-name>;

use <db-name>;

show tables;

# DB 삭제
drop database <db-name>;

# user는 mysql db 안에 있음
use mysql;

# user 생성 시 여기에 있는 user table에 들어감
show tables;

# host, user column 체크
select * from user;

select host, user from user;

# host column은 접속하는 클라이언트 ip
# localhost는 mysql를 품고 있는 서버의 ip (127.0.0.1)
# pc에서도 접속할 것이라 % root 가 있는 것임
# %는 어디서든 접근 가능
# host: localhost or % or ...

# User 생성
create user <user-id>@'%' identified by '<user-pwd>';

# *.* (모든 DB의 모든 Schema 권한)
# 앞부분 DB, 뒷부분 테이블/스키마/프로시져...
# %로 만들었으면 %로 설정, localhost - localhost 이렇게 동일하게 매핑

grant all privileges on dingcodb.* to 'dingco'@'%';

# 아직 적용 안됨
select * from user;

# 적용하기 (commit)
flush privileges;

# User 삭제
drop user '<user-id>'@'<host>';

# mysql 나가기
quit

# user dingco로 mysql 진입
mysql -u dingco -p

# 권한 있는 db만 보임
show databases;
```

- MySQL workbench

  - MySQL workbench 설치
  - setup new connection
    - docker-dingco
  - default schema: dingcodb

## [Note]

- -it (interactive)
- 화살표 위키로 이전 입력 command 자동 생성
- windows; .Net framework or VC++ module pre-install
- Oracle; table space 생성 -> user 생성 -> user 권한 부여 <br/> (MySQL은 db, user 생성 따로 가능; 이 db에게 user 어떤 권한 주겠다 설정; 따로국밥)
- Oracle; tables 볼 때 select 구문으로 봄, user가 db로 보면 됨
- MySQL: Oracle과 다르게 user, db 따로 생성해야 함
- Oracle; SQL developer 공식 tool <br/>
  MySQL; MySQL Workbench 공식 tool
- host: 접속하는 client id, web server ip 적으면 그 ip만 db에 접근 가능 (접근 제한) <br/>
  localhost: MySQL 품고 있는 server의 ip (127.0.0.1) <br/>
  %: 어디서든 접근 가능 <br/>
  같은 user-id라도 host가 다르면 다른 것임
- DBA: 데이터베이스 관리자
- MySQL; 영문이나 \_ 제외하고는 다 ''로 싸줘야 함 <br/>
  %도 특수문자이기 때문에 ''로 싸준 것임

#

[Reference](https://www.youtube.com/watch?v=5Iw8ijN5coc&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=1)
