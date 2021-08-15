## {풀스택#5} 리눅스(Linux) - Linux CentOS7에 MySQL8 설치

## **서버 패키지 설치 (서비스 서버 환경 구축)**

- [RPM Package](https://dev.mysql.com/downloads/repo/yum/)
- Red Hat Enterprise Linux 7 / Oracle Linux 7 (Architecture Independent), RPM Package 사전에 설치
- [MySQL](https://dev.mysql.com/downloads/mysql/) <-- yum으로 repository 찾는 것임
- RHEL 7 / x86_64-bit
- RPM Package, MySQL Server [download]
- 다운로드 링크 주소 복사 (RPM repository 링크 주소 복사)
- Putty

```
uname -a  // x86_64 확인

# 내부 저장소 (local repository) 구성 및 설치
yum localinstall <복사한 링크 주소>
```

```
# Configure MySQL Server

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

```
ps- -ef | grep mysql // process 확인
systemctl stop mysqld
systemctl start mysqld

# grep으로 특정 부분 찾기 (cat은 파일 모든 내용 출력)
grep 'temporary password' /var/log/mysqld.log

/usr/bin/mysql_secure_installation
# 최초 패스워드 입력
# 새로운 패스워드 입력 (대문자, 특수문자, 숫자 다 들어가야함, 8자 이상)
```

```
$mydeal> mysql -u root -p

$mysql> show databases;

CREATE DATABASE mydealdb;

# root 사용하기에는 위험함
# user 생성 및 권한 부여 (% 자리는 출발지 IP, %: 0.0.0.0/0 (모든 IP))
# *.* 앞은 DB, 뒤는 table

CREATE USER 'mydeal'@'%' IDENTIFIED WITH mysql_native_password BY '<mydeal-암호>';

GRANT ALL PRIVILEGES ON mydealdb.* TO 'mydeal'@'%' WITH GRANT OPTION;

# password 변경하기
ALTER USER mydeal IDENTIFIED WITH mysql_native_password BY '새암호';

# max-connections
show variables like '%max_connection%';
set global max_connections=100;

quit
```

```
mysql --version

!ps

systemctl stop mysqld
```

- MySQL Workbench connection 생성
- ip는 공인 아이피

#

### [Note]

- Red hat Enterprise linux ~= CentOS (커널 동일)
- mydeal; 호스트 명
- GNU/Linux
- RPM
- Oracle 계정 필요
- yum이 RPM 찾아서 dependency 설치해줌
- mysqld (daemon)
- utf8 사용 => 모든 글자 다 표현 가능 (어떤 언어든지), <br/>
  뒤에 mb4 (4 byte, 특수문자/이모티콘도 표현 가능; 3byte로는 불가)
- MySQL; 프로세스 성격보다 데몬 성격이 강하므로 서비스로 띄우기 <br/>
  (서버에서 지속적으로 떠 있어야 함)
- Enter (No)
- privilege table; 패스워드 암호화해서 담아 놓는 테이블
- nginx 오류 <br/>
  nginx.repo (/etc/yum.repos.d/nginx.repo) 파일 내용에 <br/>
  오타나 공백이 중간에 들어가서 발생하는 문제 => 수정 후 다시 해보기!

#

## [과제]

1. - [x] 도메인 신청 -> 공인 IP로 DNS Setting <br/>
         => ding-co.topician.com
2. PC setting
   - - [x] docker 설치
   - - [x] MySQL Workbench 설치
   - - [x] Github 가입

#

[Reference](https://www.youtube.com/watch?v=dJU7VARhCqE&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=14)
