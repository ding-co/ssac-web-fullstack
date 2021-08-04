## { linux } 리눅스01 - 리눅스 기초

## Linux

- 리누스 토발즈
- 리눅스 배포 버전 <br/>

  1. Debian 계열: Ubuntu, Debian(mac)
  2. Red Hat 계열: CentOS, RHEL, Fedora
  3. Slackware 계열 [기업체 목적]

- Kernel
- Linux Shell; Linux Kernel 감싸고 있는 껍질 (kernel 쉽게 사용 위함)
- sh (Bourne shell): 최상위 Shell (Unix Shell) <br/>
  bash (Bourne-agin shell): 리눅스의 super shell <br/>
  csh (C shell), tcsh, ksh, zch, ...
- Linux File System Directories <br/>
  /bin: 기본 명령어 있음 <br/>
  /etc: config, passwd, rc.d <br/>
  /proc: process info <br/>
  /home: user <br/>
  /sbin: 관리자용, ifconfig <br/>
  /tmp: temporary dir <br/>
  /usr: source or programs <br/>
  /var: logs, ftp, spool, mail <br/>
  /lost+found: 사용 x 파일 모아놓음
- Linux Ports <br/>
  FTP - data (20), FTP - control (21), SSH (22), Telnet (23), <br/> SMTP (25), DNS (53), HTTP (80), HTTPS (443), POP3 (110), NTP (123)

<br>

### _Linux Commands_

root command

- whoami
- adduser {account-name} (계정 + 폴더 등 모두 생성) <br/>
  cf) useradd (계정만 생성)
- cd home
- ll <br/>
  권한: d (dircetory) <br/>
  나의 권한, 그룹 권한, 타인 권한 <br/>
  왼쪽 - 나 (주인), 오른쪽 - 그룹
- passwd {account-name} 패스워드 변경
- deluser {account-name} user 삭제 <br/>
  => directory는 지워지지 않음 (data는 남아 있음)
- vi etc/passwd
- rm {파일 이름}, rmdir {빈 폴더 이름} <br/>
  rm -rf {폴더 이름} // -r: directory, f: force
- su - {account-name}
- pwd (present working directory)
- .profile/.bash_profile 개인 설정 파일
- cat 파일 내용 출력
- echo <br/>
  echo (print), $대문자 (환경변수 <- os가 씀)
- grep (정규식)
- alias (별명)
- touch (파일 생성)
- l, ls -al, ls -alF
- exit (안쪽 쉘 하나 빠져나가기)
- apt-get update <br/>
  sudo는 super user do (root 권한으로 실행)
- apt-get install vim (vi editor)
- :q

기본 명령어

- ls / touch / cat
- echo "message" > {파일이름.확장자명} 파일 새로 write <br/>
  echo "msg" >> {파일이름.확장자명} 파일 뒤에 내용 추가 (attach)
- head -숫자 {파일이름.확장자명}
- tail -숫자 {파일이름.확장자명}
- which vi / which rm
- :은 구분자
- clear
- cd / cd - (history back)
- mkdir / rmdir
- cp (copy)
- mv
- rm
- ~ (home directory)
- .. (상위 directory) <br/>
  . (현재 directory)
- find . -name {파일명.확장자}
- passwd

기본 명령어2

- df (현재 mount 되어 있는 disk 정보 표시)
- df -m (메가 바이트 단위)
- df -h
- du /home
- du -sk /home (합)
- du -sm /home
- free (메모리 사용량)
- free -m
- swap; 메모리 <-> 디스크 부족시 번갈아 사용
- top (cpu 사용량) <br/>
  space bar (최신버전으로 갱신) <br/>
  1 (cpu 펼쳐짐) <br/>
  vmstat 1 (1초 단위로 갱신)
- ps / ps -ef / ps -ef | grep bash (grep: 필터)

기본 명령어3

- echo '#!/bin/sh' > test.sh (작은 따옴표로 하기) <br/>
  (""은 우분투에서 명령어로 인식되는 듯)
- echo "echo 123" >> test.sh
- !cat
- sh test.sh
- chmod <br/>
  r: read, w: write, x: execute <br/>
  나의 권한, 그룹의 권한, 외부의 권한 <br/>
  이진수; 111 111 111 (모두 켜질 시) => 777
- chmod 777 test.sh
- ./test.sh (sh ./test.sh 는 sh가 실행하는 것임)
- cp -af test.sh /home/ding-co/
- /home/ding-co/test.sh
- chmod +x test.sh (실행 권한 모두 주기)
- chown ding-co:ding-co test.sh
- cd / (제일 바깥쪽)
- mv test.sh ttt/ <br/>
  mv test.sh ttt/bb.sh 도 가능
- mv test.sh bb.sh (rename 따로 없음)
- cd ~ (root의 홈)
- ln -s (symbolic 링크/바로가기 달기)
- ln -s 목적지(존재하는) 링크명

ubuntu

- apt-get install openjdk-8-jdk -y

grep

- grep {찾을 단어} {file-name} [-io]
- echo "Two aa tao" | grep t[wa]o (w or a)
- echo "Two aa tao" | grep -i t[wa]o (대문자도 찾음, 끝에 -i 줘도 됨)

한글 적용

- apt-get install locales
- cat /usr/share/i18n/SUPPORTED | grep k (k로 된 것만 보임)
- ko_KR
- 언어명\_국가명 charset
- locale
- locale -a (사용 가능한 charset)
- localedef -f UTF-8 -i ko_KR ko_KR.UTF-8

#

### [Note]

- Unix - workstation, 무거움 <br/>
  Linux는 가벼움
- OS; command/kernel (kernel; infra와 가깝게 붙어 있음)
- H/W 제어하는 S/W => Firmware
- Linux Shell; manipulate linux kernel
- Linux inode; 파일 시스템을 tree 형태로 메모리에 올려놓고 있음 </br>
  => 빠른 검색 가능
- POP3 ex) outlook - email
- NTP (Network Time Protocol)
- Command Line tips <br/>
  tab, arrow up&down, !, !!, Ctrl + A, Ctrl + E, history, man {명령} (메뉴얼)
- vmstat, vmstat 1
- Ctrl + Backspace: 지우기
- Ctrl + c: 현재 작업 중지
- ps -ef: 작업 관리자 <br/>
  TTY 0 (백그라운드), 1 (내가 쓰는 것) <br/>
  PPID (PID의 parent)
- 프로세스: CPU가 연산 처리하는 단위
- load; 하드웨어가 받는 부담
- zombie; 프로세스 비정상 종료
- cache; 메모리와 cpu 사이 속도 차이 해결 메모리
- idle 0이면 CPU 놀고 있음
- -i (ignore)
- docker attach 한 것은 ctrl+p q로 해야 살아있음 or detach
- docker commit {컨테이너 이름} {이미지명}
- docker ps -q
- docker stop 틸드docker ps -q틸드

#

[Reference](https://www.youtube.com/watch?v=6Sr3e5MEUvI&t=1093s)
