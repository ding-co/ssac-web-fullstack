## {풀스택#10} 리눅스(Linux) - 한방에 정리하는 리눅스 명령어와 쉘스크립트 (1/2)

## **Linux 기본 명령어와 쉘 스크립트**

- Shell
  - sh (unix super shell, Bourne shell)
  - bash (linux super shell, Bourne-agin shell)
- File System Directories

  - /bin: 기본 명령어
  - /dev: device file, cd-rom
  - /home: user home dir
  - /lib: shared library
  - /proc: process info
  - /root: root home dir
  - /sbin: 관리자용, (daemon)
  - /tmp, /usr, /var,...

- Linux Ports

  - 22 SSH / rsync / rcp
  - 23 Telnet
  - 25 SMTP (메일 발송)
  - 110 POP3 (메일 수신)
  - 80 HTTP
  - 443 HTTPS

- Command Tips

- 한글 적용

```
# RPM 패키지 의존성 해결 => dnf
dnf install glibc-langpack-ko -y

# UTF-8 파일 생성
yum install glibc-locale-source glibc-langpack-en -y

# UTF-8 정의하고 있는 파일에 ko_KR 삽입
localedef -f UTF-8 -i ko_KR ko_KR.utf8

yum install file -y

# charset 체크
file -bi <file-name>
```

```
# 파일 수정 상태 reload
touch <파일명>

# 새로운 파일 생성
touch <새로운-파일-이름>

# -f (지속적으로 파일 봄)
tail -f <파일명>

# less는 page up/down 키도 먹음
less
more

# clear 설치
yum install ncurses

# 작업하던 바로 이전 디렉토리로 이동
cd -

# home dir
cd ~

# root의 home dir
cd ~root

# dir 속에 아무것도 없어야 지워짐
rmdir

find . -name id-rsa
find / -name id-rsa -print

whoami

# -h 붙이면 단위 보기 좋게 나옴
df -h

# du는 사용량
du -sh *

# free는 메모리
# 내용 중에 free는 active 된 것
free -h

vmstat

# 1초 단위로 갱신
vmstat 1

# idle (cpu가 얼마나 놀고 있나, 100에 가까울수록 놀고 있음)
# r는 대기, b는 블록 (i/o 블록)
# swpd은 메모리가 부족해서 디스크를 메모리처럼 씀

# active (메모리 할당된 것), inactive (메모리 할당되지 않은 것)
vmstat -a

# 작업관리자 같은 것, 1
top

# 스레드까지 봄
top -h

vi t.sh

#!/bin/bash <-- env에 나는 bin/bash 쉘로 실행하겠다 선언!

# 나 그룹 너

# 어디를 어떤 이름으로 link
ln -s 목적지 이름
```

#

### [Note]

- cwd (link): mysql home directory
- `cd -` (cd back)
- 한글 적용 - ncloud는 설치 되어 있는데 docker는 설치 필요
- `dnf` 명령어

#

[Reference](https://www.youtube.com/watch?v=ca9e1BDAKsc&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=19)
