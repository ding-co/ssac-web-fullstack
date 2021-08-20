## {풀스택#12} 리눅스(Linux) - 실무에서 꼭 필요한 기술 (1/2)

## **Linux (CentOS) 실무에서 유용한 기술**

```
# sudo 권한 부여

# ncloud 서버

# ncloud alias 정보 확인
# cat .bashrc | grep ncloud
cat .profile | grep ncloud

# ncloud 진입
ncloud

# user 체크
cat /etc/passwd

cat .bashrc

exit

# root가 아니라 ding-co user로 접속
ssh ding-co@mydealh -p 50000

whoami

# sudo 권한 체크
sudo bash

# 현재 권한이 없어서 read-only 상태임
vi /etc/hosts

hostname

# 나갔다가 root 권한으로 다시 접속
ncloud

visudo

# 검색
/wheel

# 주석 풀어주기
%wheel ALL=(ALL) NOPASSWD: ALL

# ding-co user에게 sudo 권한 주기
usermod -aG wheel ding-co

# 나갔다가 ding-co user로 다시 접속

sudo bash

# 만약 안되면,
# 나갔다 다시 들어오기
exit

hostname

ssh ding-co@mydealh -p 50000

hostname

# 이번에는 바로 들어감
sudo bash

whoami

exit

whoami

# ding-co

sudo vi /etc/hosts

# 수정 가능
# 마지막에 주석 추가
# This is write sudo test

# 잘 저장됨 체크
cat /etc/hosts

# 팀 프로젝트시,
# root 권한 주는 것은 아니고 파일 등 세팅할 수 있는 권한 주기
```

- 파일 압축

  - legacy - gzip 많이 사용
  - 최근에는 xz (압축률 높음), bzip2 많이 사용

```
# ncloud 서버 (root)

# nginx log로 이동
cd /var/log/nginx/

# 파일 압축
gzip error.log

ll

# 파일 압축 해제
gzip -d error.log.gz

# 파일 하나 압축해서 보관할때 gzip 많이 사용함

# 용량 체크
gzip error.log

ll

gzip -d error.log.gz

# xz (압축률 더 좋음)

xz error.log

xz -d error.log.xz

# bizp2 설치
yum install bzip2 -y

# bzip2로 압축

bzip2 error.log

ll

bzip2 -d error.log.bz2

# 확장자 보고 압축 파일 형식 확인 가능

# 윈도우용 위해 zip
# 만들_파일명 - 압축할_파일명 순서

zip error.log.zip error.log

ll

# 압축 해제
unzip error.log.zip

n

# zip은 새로 압축파일 만듦 (원본 파일 보존하고 새로 만듦)

unzip error.log.zip

# rename
r
err2.log

ll

rm -f err2.log
ll

# 실무에서 tar 가장 많이 씀 (파일 여러개 묶으면서 압축까지 함)

# create vfz, tar로 묶어서 gz로 압축
tar cvfz xxx.tar.gz *.log

ll

# home dir로 옮김
mv xxx.tar.gz ~/

# home dir
cd ~

# extract vfz (z 빠져있으면 묶는걸 풀기만 함, z 붙으면 gzip으로 압축까지)
# 만약 z자리에 J면 xz으로 압축, j면 bzip2로 압축 (tar로 묶어서)
tar xvfz xxx.tar.gz

ll

ll *.log

rm -r *.log

# back 으로 이동
cd -

rm error.log.zip
y

ll

# 비번 걸면서 압축
zip -P "x1234" error.zip error.log

unzip error.zip
x1234
# rename
r
xx

# zip은 파일 그대로 남아서 지저분함 -> 잘 안씀
```

- ftp, sftp

  - 파일 주고 받기 위함
  - ftp (21) - 보안에 취약
  - sftp (22) - SSH 기반, 보안성 강화 <br/>
    (ssh 기반이므로 sshd에 포함되어 있음)
  - samba - windows remote directory 연결
  - ownCloud (오픈 소스 클라우드) - dropbox 구성 가능 <br/>
    (mariadb, httpd, php, 등 설치 필요해서 조금 번거로움)

```
# sftp settings (ftp server)

# 외부 업체에 별도 계정 생성

whoami

# false (로그인 자체 못하게 만듦)
useradd -s /bin/false ftpuser

cat /etc/passwd

# 패스워드 설정 (외부업체에게 줘야 함)
passwd ftpuser
# 암호
seniorcoding

vi /etc/ssh/sshd_config

# Subsystem sftp /usr/libexec/openssh/sftp-server
  Subsystem sftp internal-sftp

systemctl restart sshd

# 현재 시간으로 잘 뜸
ps -ef | grep sshd

# -------
# 사용하는 쪽

# 윈도우 - 알ftp 등 여러 프로그램 많음

# SFTP 연결 설정
# Server ssh 접속용 ip, username, password, port(50000 -> 22), utf8 설정
# -------

cd ~ftpuser
ll

# ftpuser home
pwd

# 한글 깨지는지 check
echo "This is ftp 테스트" > ftptest.txt

# --
# 사용하는 쪽
# 새로고침 해서 파일 체크 -> 한글 안깨짐 (인코딩 잘 맞추면 됨)
# drag & drop 파일 이동
# --

# ftp 프로그램 없을 때
# docker server

hostname

sftp -P 50000 ftpuser@<서버접속IP>
seniorcoding
ls

# ftp 명령어 체크
help

# home의 ftp user (서버의 pwd)
pwd

# local(client)의 pwd (파일 가져올 곳)
lpwd

# server ls
ls

# local의 ls
lls

# 파일 가져오기
get ftptest.txt

lls

# 업로드
put test.txt

# 클라우드 서버 ---
mkdir ttt
ll

echo "ttt" > ttt/ttt.txt
# 클라우드 서버 ----


# 폴더 전체를 가져오기 (-r : directory)
get -r ttt

lls

# 폴더 업로드

put -r <현재 로컬에 존재하는 폴더명>

# -- ftp user는 다른 user에 들어가지 못함 (ftp 프로그램에서)

# bye / quit
# ftp 끊기
bye

# 불필요 파일 제거
rm -rf ttt
```

- 지난 log 파일 정리

  - 오래된 log 파일 삭제

```
# 개발 서버

cd /var/log/nginx
ll

# 이미 압축은 되어 있어서 묶기만 함
tar cvf err.tar error.log*

ll

# 묶은 파일을 ncloud 서버로 옮기기

# --- ncloud 서버에서 우선 /var/log/nginx 에 tmp dir 생성
# ncloud 서버
mkdir tmp
ll

pwd

cd tmp
pwd
 --- ncloud 서버

# --- 개발 서버
# user로 줘도 상관없음
rsync -avz err.tar root@<서버-접속용-ip>:/var/log/nginx/tmp/ -e "ssh -p 50000"
# ncloud 서버 암호 입력
# --- 개발 서버

# --- ncloud 서버
pwd

ll

# tar 풀기
tar xvf err.tar

ll err.tar

# ftpuser home dir로 이동
mv err.tar ~ftpuser/
# --- ncloud 서버

# --- 개발 서버
sftp -P 50000 ftpuser@<서버-접속용-ip>
seniorcoding

ls

get err.tar
# --- 개발 서버

# 오래된 log 파일 지우기

# --- ncloud 서버
find . -name "*.gz"

# word count 인데 line 단위로 보여줌
find . -name "*.gz" | wc -l

# 60일 지난 것들만 보여줌
find . -name "*.gz" -mtime +60

# 60일 지난 로그 파일 삭제
find . -name "*.gz" -mtime +60 -delete

ll

find . -name "*.gz" | wc -l

# 매번 작업 하기 번거로워서 crontab에 걸면 됨

pwd

# bin 폴더에 실행파일들 모여 있음
mkdir ~/bin

vi ~/bin/rmoldlogs.sh

#!/bin/bash
cd /var/log/nginx/tmp
find . -name "*.gz" -mtime +30 -delete

:wq

chmod +x ~/bin/rmoldlogs.sh

# crontab에는 full 경로가 들어가야 함
crontab -e

# 아래에 내용 추가
* * * * * /root/bin/rmoldlogs.sh 2>&1

:wq

ll | wc -l

# *는 특수기호이므로 "" 붙이거나 역슬래시 붙이면 됨
find . -name \*.gz -mtime +30

# 잘 지워짐
# --- ncloud 서버

crontab -e

# 시간 수정
0 1 * * *

:wq

!vi

# 내용 수정

#!/bin/bash
cd /var/log/nginx
find . -name "*" -mtime +30 -delete

:wq

ps -ef | grep atd

# atd는 일회성

at -l

# 시간 지정
at -f /root/bin/rmoldlogs.sh 00:00

date

# 테스트용
!vi

#!/bin/bash
#cd /var/log/nginx
cd /var/log/nginx/tmp

find . -name "*" -mtime +10 -delete

:wq

date

at -l

date

ll

# 다시 수정
!vi

#!/bin/bash
cd /var/log/nginx
#cd /var/log/nginx/tmp

find . -name "*" -mtime +30 -delete

:wq

crontab -l

at -l

# sort, uniq
# 누군가가 내 웹 서버에 DDOS 날린다고 가정
# 누가 어뷰징 하는지 그 사람 ip 찾아보기

# ncloud 서버

# nginx 폴더인지 체크
pwd

ll

tail -10 access.log

clear

# 첫번째 열 체크
cat access.log | awk '{print $1}'

# 각 ip별로 count가 나옴
cat access.log | awk '{print $1}' | uniq -c

# ip 순서대로 sort + uniq
cat access.log | awk '{print $1}' | sort | uniq -c

# reverse sort (descending)
cat access.log | awk '{print $1}' | sort | uniq -c | sort -r

# 한칸 띄움
cat access.log | cut -d" " -f1 | sort | uniq -c

# url까지 나옴
cat access.log | cut -d" " -f1,7 | sort | uniq -c

# cut은 이런 파일들 볼 때 좋음
cat /etc/passwd

# delimiter는 :
# 첫번째 열과 7번쨰 주세요
cat /etc/passwd | cut -d: -f1,7
```

- Name Server - DNS (resolv.conf)

```
# 공인 ip 나옴
nslookup ding-co.topician.com

# 클라우드 플랫폼의 네임서버
cat /etc/resolv.conf

# 가끔 다른 네임 서버 썼는데 느려짐 -> 도메인 찾는 것이 느려서 그럼
# 자신한테 가장 가까운 네임서버 걸면 됨
# 현재는 NCloud가 걸려 있음

# 기본 DNS 서버 죽으면 보조 DNS 서버가 알려줌
```

- 각종 서버 monitoring 도구 (vmstat, sar, netstat)

- NFS 구성

  - Network File System
  - 개발 서버가 2대 이상 되었을 때 파일 공유시 필요
  - 개발 서버 - 실 서버 연동/백업 할 때도 필요

#

### [Note]

- DNS; 도메인 가지고 라우터 거쳐서 네임서버 찾아감 <br/>
  찾은 네임서버한테 가서 IP 주소 확인하고 웹서버로 가서 <br/>
  웹서버의 ip주소를 가지고 html 내려줌 (브라우저에)
- .com이 네임서버의 가장 상위 레이어 (가장 먼저 찾음)
- httpd (apache)

#

### [Q&A]

- DDOS 같은 해킹 공격에 대한 공격자의 ip 주소를 확인하기 위해서 uniq, sort 등 명령어를 이용하여 <br/>
  ip 주소를 추적하신다고 하셨는데, 하지만 공격자가 단순히 자신의 ip 주소를 그대로 노출해서 <br/>
  보낼 리는 절대로 없다고 생각합니다. IP spoofing 같은 기법을 통해서 source address를 위조하여 <br/>
  보내면 그에 대한 ip 주소를 역추적하는 것이 어렵다고 생각되는데 <br/>
  만약 이에 대해서 실무에서 실제로 DDOS와 같은 해킹 방지를 위해 어떠한 방법을 주로 활용하거나 <br/>
  사례 같은 것이 있는지 알 수 있을까요? <br/>

  => DDOS 같은 경우 VPN이나 IP Spoofing같은 걸 쓰면 많이 느려짐 <br/>
  DDOS의 생명은 단시간 내에 많은 요청을 보내야 함 <br/>
  실무에서는 uniq, sort 보다 L4, L7 같은 네트웍 장비에서 DDOS를 먼저 차단함 <br/>
  특정 어뷰징 패턴 등을 차단하도록 설정해 놓기 때문에 서버까지 못 들어옴 <br/>
  조그만 서비스는 L4나 L7이 비싸기 때문에 대부분 사용하지 않음

#

[Reference](https://www.youtube.com/watch?v=R35etAo0Deo&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=21)
