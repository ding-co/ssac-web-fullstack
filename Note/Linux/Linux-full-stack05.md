## {풀스택#5} 리눅스(Linux) - Linux CentOS7에 MySQL8 설치

## **서버 패키지 설치 (서비스 서버 환경 구축)**

- [RPM Package](https://dev.mysql.com/downloads/repo/yum/)
- Red Hat Enterprise Linux 7 / Oracle Linux 7 <br/>
  (Architecture Independent), RPM Package 먼저 설치
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- RHEL 7 / x86_64-bit
- RPM Package, MySQL Server [download]
- 다운로드 링크 주소 복사 (RPM repository 링크 주소 복사)
- Putty

```putty
uname -a  // x86_64 확인

yum localinstall <복사한 링크 주소>
```

```putty
vi /etc/my.cnf

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqldump]
default-character-set = utf8mb4

[mysqld]
skip-character-set-client-handshake
init_connect="SET collation_connection = utf8mb4_unicode_ci"
init_connect="SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"

character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

#[mysqld]
```

```putty
ps- -ef | grep mysql // process 확인
systemctl stop mysqld
systemctl start mysqld

grep 'temporary password' /var/log/mysqld.log
/usr/bin/mysql_secure_installation
```

```putty
mysql -u root -p

show databases;

CREATE DATABASE mydealdb;

# user 생성 및 권한 부여 (%는 모든 아이피, 출발지)
# *.* 앞은 DB, 뒤는 table
CREATE USER 'mydeal'@'%' IDENTIFIED WITH mysql_native_password BY '암호';
GRANT ALL PRIVILEGES ON mydealdb.* TO 'mydeal'@'%' WITH GRANT OPTION;

# password 변경하기
ALTER USER mydeal IDENTIFIED WITH mysql_native_password BY '새암호';

# max-connections
show variables like 'max_connection%';
set global max_connections=100;

quit
```

```putty
mysql --version

!ps

systemctl stop mysqld
```

- MySQL Workbench connection 생성
- ip는 공인 아이피
- password는 8자 이상, 대문자 포함

<br/>

#

### [Note]

- Red hat Enterprise linux ~= CentOS
- mydeal; 호스트 명
- GNU/Linux
- RPM
- Oracle 계정 필요
- yum이 RPM 찾아서 dependency 설치
- mysqld (daemon)
- utf8 사용 => 모든 글자 다 표현 가능, mb4 (4 byte)
- Enter (No)
- privilege table; 패스워드 암호화해서 담아 놓는 테이블

#

## [과제]

1. 무료 도메인 신청 -> 공인 IP로 DNS Setting
2. PC setting
   - docker 설치 `[✔]`
   - MySQL Workbench 설치 `[✔]`
   - Github 가입 `[✔]`

#

## [Reference]

[Reference](https://www.youtube.com/watch?v=dJU7VARhCqE&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=14)
