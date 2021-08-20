## {풀스택#11} 리눅스(Linux) - 한방에 정리하는 리눅스 명령어와 쉘스크립트 (2/2)

## **Linux 기본 명령어와 쉘 스크립트**

```
# ncloud 실 서버

# 팀원을 하나의 그룹으로 구성

# 그룹 추가
groupadd ssac

# 추가된 그룹 확인
cat /etc/group

# ssac 그룹에 user 추가
useradd -g ssac <user-name>

# 추가된 user 확인
cat /etc/passwd

# user 비밀번호 상태 체크
cat /etc/shadow

# 새 암호 지정
passwd <user-name>

cat /etc/shadow

# ssac 그룹에 guest 이름의 사용자 계정 추가
useradd -g ssac guest
passwd guest
!cat
```

```
# docker 개발 서버

cat .bashrc | grep ncloud

ssh <user-name>@mydealh -p 50000

whoami

passwd
```

```
# ncloud

whoami

# 현재 계정의 상태
chage -l <user-name>

# expire date를 0으로 세팅
chage -d 0 <user-name>
chage -d 0 guest

chage -l <user-name>

# guest 삭제
userdel guest
```

```
# docker 서버

cat check.txt

# conn 단어 있는 내용 모든 파일에서 찾기 (bold체로 나옴)
grep conn *

# 정규식 [0-9] 0에서 9에 해당하는 것 찾기
echo "aaa 123 hi 459" | grep [0-9]

# .은 글자
echo "Two __33__two" | grep -io __.*__

# $는 끝부분, 특수문자 사용하려면 \ 이용
echo "I love $ hh" | grep \$
```

```
# Shell Script / Cron
# ncloud

whoami

# home dir 이동
cd

ll

vi test.js

# test.js 내용 --
console.log("aaaaaaaaaaaa", new Date())
# test.js 내용 --

# 처음 메모리에 로드하느라 시간 조금 걸림
node test.js

# 실행 빠르게 됨
node test.js

!vi

# test.js 내용 --
function fi(a, b) {
        return a + b;
}
console.log("1 + 2 =", fi(1, 2))
# test.js 내용 --

node test.js

cat test.js

# 문제 tab이 너무 큼

# vim의 runtime configuration 생성 및 세팅
vi .vimrc

# .vimrc 내용 --
set tabstop=4
set shiftwidth=4
set expandtab
set smartindent
set autoindent
set number
set showmatch
# .vimrc 내용 --

pwd

. .vimrc

vi test.js

# 내용 추가
# test.js 내용 --
function f2(name) {
    if (name)
      return "Your name is " + name;

    return "XX";
}
console.log(">>>>", f2('ding-co'))
# test.js 내용 --

# 단축키
o (smart indent)
:set nu / :set number
:set nonu / :set nonumber


node test.js

for i in 1 2 3 4 5; do echo $i; done
for i in {1..100}; do echo $i; done

# infinite loop, 중간에 1초씩 쉼 (sleep 1)
while true; do ll; sleep 1; done

ls
ls -f

# 명령은 백틱 이용
for i in `ls -f`; do echo $i; done

ll

vi t.sh

# t.sh 내용 --
#!/bin/bash

echo "t.sh>>>>>> $0 $1 $#"
# t.sh 내용 --

# 허가 거부되어 있을 것임
./t.sh

# 모두 실행 권한 허용
chmod +x t.sh

./t.sh

# $0은 ./t.sh
# $1은 안나옴 (아무것도 안 넘겨서)
# $#은 개수
cat t.sh

!vi

# t.sh 내용 --
#!/bin/bash

#echo "t.sh>>>>>> $0 $1 $#"

if [ $# -lt 1 ]; then
  echo "Usage: ./t.sh <file>"
  exit 0
fi;

cat $1
# t.sh 내용 --

./t.sh

./t.sh check.txt

!vi

# #!는 선언, exit 0은 정상 종료
# t.sh 내용 --
#!/bin/bash
#echo "t.sh>>>>>> $0 $1 $#"
if [ $# -lt 1 ]; then
  echo "Usage: ./t.sh <file>"
  exit 0
elif [ -d $1 ]; then
  echo "Input file only!!"
  exit 0
fi;
cat $1
# t.sh 내용 --

# 디렉토리 체크
./t.sh <디렉토리-이름>
```

```
# 날짜 format
date +%Y-%m-%d

# ex) 어제 날짜로 백업시 많이 활용
date +%Y-%m-%d --date=yesterday

# 이틀 후 날짜
date +%Y-%m-%d --date='2 day'

# 이틀 전 (ago: 전)
date +%Y-%m-%d --date='2 day ago'

# 1달 후
date +%Y-%m-%d --date='1 month'

# 1달 전
date +%Y-%m-%d --date='1 month ago'
```

```
# array

vi t.sh

# t.sh 내용 --
declare -a arr
arr=("aaa" "bbb" 123)

echo $arr
echo ${arr[0]}
echo ${arr[@]}

exit 0
# t.sh 내용 --

# $arr는 하나만 나옴 (첫번째 것만 나옴, 주소 참조)
# @ 붙이면 다 찍힘
./t.sh
```

```
# function 부를 때는 괄호 안쓰고 한칸 띄워서 인자 줌

!vi

# t.sh 내용 --
for i in `ls -al`
do
  echo $i
done

exit 0
# t.sh 내용 --

./t.sh

# IFS는 필드 분리하는 값 (현재 space로 되어 있음)
echo $IFS

!vi

# IFS 구분자 개행됨, 마지막엔 다시 원 위치
# t.sh 내용 --
PRE_IFS=$IFS
IFS=


for i in `ls -al`
do
  echo $i
done

IFS=$PRE_IFS

exit 0
# t.sh 내용 --

# 한줄씩 실행됨
./t.sh

!vi

# awk는 몇번째인지 찍어줌, 뒤에 '' 사용
# 한칸 띄우기 위해 강제로 " " 넣음
# t.sh 내용 --
PRE_IFS=$IFS
IFS=


for i in `ls -al`
do
  echo $i | awk '{print $5" "$9}'
done

IFS=$PRE_IFS

exit 0
# t.sh 내용 --

./t.sh
```

```
# Cron tab

# docker 서버

# crontab 체크
crontab -l

# Centos crontab 설치 (ubuntu는 apt-get 명령어 이용)
yum install cronie -y

crontab -l

ll

pwd

cat t.sh

crontab -e

# 분 시 일 월 주
# 2>&1; (표준 출력 에러 씹음)
# 2는 표준 에러, 1은 표준 출력

# crontab 내용 --
* * * * * /root/t.sh >> /root/t.log 2>&1;
# crontab 내용 --

ll

ps -ef | grep cron

# cron daemon 띄우기

# init.d로 실행한 게 아니라서 안됨
systemctl start crond

crond start/stop

# sbin에 등록되어 있음
which crond

ll

# t.log 생성되는지 체크
while true; do ll; sleep 1; done
```

#

### [Note]

- 터미널 창 2개 띄워놓을 때 개발서버 - 실서버 순서로 권장
- 파이썬으로 쉘 스크립트 많이 짬
- centos에 파이썬 2 기본적으로 설치되어 있음
- vi editor / nano

#

### [Q&A]

1. 도커를 init.d로 실행시킨 게 아니기 때문에 Host is down이 뜬다는 게 어떤 의미? <br/>

   => 리눅스 시스템을 정상(물리)적으로 구동(booting)했다면 리눅스가 시작될 때 init.d 데몬으로 구동됨 <br/>
   하지만 docker를 이용하여 가상(논리적)로 리눅스를 구동했기 때문에 init.d 데몬으로 구동된 게 아님 <br/>
   systemctl은 init.d로 구동된 리눅스 시스템에서 사용할 수 있음

2. `crond stop` 시 오류 <br/>
   crond: can't lock /var/run/crond.pid, otherpid may be 66: Resource temporarily unavailable <br/>

   => crond.pid 파일을 특정 프로세스가 붙들고(사용중에) 있는 듯 <br/>
   `ps -ef` 해보고 해당 프로세스를 kill 해야 함 <br/>
   안되면 `killall -9 crond` <br/>
   그래도 안되면 `systemctl stop crond`

3. 말씀해주신 대로 `ps -ef`로 프로세스 상태를 확인해보니 crond start가 떠있었습니다. <br/>
   그래서 그 프로세스의 id를 kill 해서 crond 데몬 구동을 중지했습니다. <br/>
   그런데 매번 crond 데몬을 중지하기 위해서 일일이 `ps -ef`로 프로세스의 id를 파악하고 <br/>
   kill을 하는 것이 번거롭다고 생각됩니다. .bashrc 파일에 alias를 걸어서 해결할 수 있을 듯 싶은데 <br/>
   근데 매번 달라지는 프로세스 id를 추적하는 것이 어려워서 <br/>
   혹시 다른 좋은 방법이나 `crond stop` 명령어로 셋팅하는 방법이 있을까요? <br/>

   => crond는 중지하거나 재시작할 일이 거의 없음 <br/>
   지속적으로 돌고 있어야 cron임! <br/>
   한번 시작해 놓으면 영원히(?) 도는 느낌으로~

#

[Reference](https://www.youtube.com/watch?v=XYnqdjF0q2A&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=20)
