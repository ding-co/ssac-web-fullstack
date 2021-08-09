## MySQL 02 - Table생성, 한글 설정, Session개념

<br/>

### _docker commands_

<br/>

### _MySQL commands_

- CREATE TABLE [IF NOT EXISTS] {table-name} ( <br/>
  id int unsigned not null auto_increment, COMMENT '학번', <br/>
  name varchar(31) not null COMMENT '학생명', <br/>
  createdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시', <br/>
  graduatedt varchar(10) DEFAULT NULL COMMENT '졸업일',
  auth tinyint(1) unsigned NOT NULL ... <br/>

  PRIMARY KEY (id), <br/>
  UNIQUE KEY unique_stu_id_name (createdate, name) <br/>
  ) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

<br/>

### _MySQL workbench_

- set time_zone = 'Asia/Seoul';
- show variables like '%time_zone%';
- select now();

#

## [Note]

- documentation pseudocode 보는 법 알아야 함! <br/>
  []: optional <br/>
  Ignore: 존재하면 무시, Replace: 존재하면 대치 (PK 냅두고 나머지 update 처리 가능) <br/>
  Like: 테이블과 똑같이 만들어 줌 <br/>
  COLLATE: 테이블의 charset 지정 가능
- unsigned: 음의 정수는 안 취함 (양의 정수만! 1 ~ )
- PK 는 대부분 id로 column name 지정 (OR mapping 때문에)
- varchar: 가변형, 알파벳은 하나에 1바이트, 한글은 2 or 3 바이트 <br/>
  UTF-8이면 한글 1글자에 3바이트
- tinyint(1): 한자리 숫자 (1 바이트)
- MySQL Engine: InnoDB (트랜잭션 가능) / MyISAM (파일에 쓰는 것)
- Column type <br/>
  year(1B) // 1970년 부터 기준 최대 아마 2038년 <br/>
  char (고정형), varchar (가변형)
- Datetime vs Timestamp <br/>
  Datetime: 상수 (8B) <br/>
  Timestamp (4B)
- MySQL workbench; Ctrl + Enter (현재 줄 실행) <br/>
  Ctrl + Shift + Enter (전체 줄 실행)

#

## [Reference]

[Reference](https://www.youtube.com/watch?v=woS6ifxaCFQ&list=PLEOnZ6GeucBU7FR26mn9d3Mxqc8V81yHX&index=2)
