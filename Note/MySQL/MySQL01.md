## MySQL 01 - Database 및 User 생성하기

<br>

### _docker commands_

- docker ps
- docker start {container-name} <br/>
  docker restart {container-name}
- docker exec -it {container-name} bash
- mysql -u {user-name} -p

<br/>

### _MySQL commands_

- show databases;
- create database {db-name};
- use {db-name}
- show tables;
- DB 삭제 <br/>
  drop database {db-name};
- use mysql
- select \* from user;
- select host, user from user;
- User 생성 <br/>
  create user {user-name}@'{host}' identified by '{user-pw}';
- 특정 DB 권한 부여 <br/>
  grant all privileges on {DB.Table/schema/procedure} to '{user-name}'@'{host}'; <br/>
  cf) 별.별 (전체 권한 부여)
- 적용하기 <br/>
  flush privileges;
- User 삭제 <br/>
  drop user '{user-name}'@'{host}';
- 권한 확인 <br/>
  show grants for '{user-name}'@'{host}';
- 권한 삭제 (취소) <br/>
  revoke all privileges on {db-name}.\* from {user-name}@'{host}';
- User 삭제 <br/>
  drop user '{user-name}'@'{host}';
- quit

<br/>

### _MySQL workbench_

- MySQL workbench 설치
- setup new connection <br/>
  connection name, username, password, default schema

#

## [Note]

- -it (interactive)
- 화살표 위키로 이전 입력 command 자동 생성
- windows; .Net framework or VC++ module pre-install
- Oracle; table space 생성 -> user 생성 -> user 권한 부여 <br/> MySQL; 따로 가능
- Oracle; tables 볼 때 select 구문으로 봄, user가 db로 보면 됨
- MySQL: Oracle과 다르게 user 따로 생성해야 함
- Oracle; SQL developer 공식 tool <br/>
  MySQL; MySQL Workbench 공식 tool
- host: 접속하는 client id, web server ip 적으면 그 ip만 db에 접근 가능 (접근 제한) <br/>
  localhost: MySQL 품고 있는 server의 ip (127.0.0.1) <br/>
  %: 어디서든 접근 가능 <br/>
  같은 user-name라도 host가 다르면 다른 것임
- DBA: 데이터베이스 관리자
- MySQL; 영문이나 \_ 제외하고는 다 ''로 싸줘야 함 <br/>
  %도 특수문자이기 때문에 ''로 싸준 것임

#

## [Reference]

[Reference](https://www.youtube.com/watch?v=5Iw8ijN5coc&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=1)
