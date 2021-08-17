## {풀스택#8} 리눅스(Linux) - docker image 만들기 (2/2)

## **Test Server 구축 (Docker)**

```
docker ps -a
docker start mydealdev

# 안되면 '' 빼고 하면 됨 (윈도우 cmder 터미널 기준)
alias dp='docker ps -a'
dp

# 영구적으로 alias 설정 (맥)
vi .profile
. .profile

alias ds=docker images

# Ctrl + L (위에는 남아 있음)
clear

docker attach mydealdev

pwd

# 도커 컨테이너 중지되면 프로세스들도 다 죽어버림
ps -ef | grep nginx

# 로컬에서는 데몬을 띄우는 것이 아니고 개발용으로 쓰기 떄문에 nginx로 보통 띄움

curl https://get.volta.sh | bash

# 오류 시 도커 컨테이너 나갔다가 다시 들어오면 실행됨
volta

volta install node@14
volta install pm2

yum install python3 -y

# -v는 alias 설정되어 있어서 그런 것임
node -v
npm -v

pip3 --version
python3 --version


# 이미지 굽기
nginx

# nginx의 home
cd /etc/nginx/

alias ll='ls -al'
ll

vi nginx.conf

# 위쪽

# server {

# #root   /usr/share/nginx/html;
# root    /home/workspace/www/mydeal;
# }

# 참고 - 서버는 /usr 가 아니라 /var로 시작함

mkdir -p /home/workspace/www/mydeal
vi /home/workspace/www/mydeal/index.html

# This is Mydeal local nginx!!

# nginx 재시작 (서버는 systemctl인데 재시작 할일 거의 없음)
nginx -s reload

ll conf.d
vi conf.d/local.conf (서버에는 default.conf 있음)

# server {
#       listen 80;
#       server_name local.mydeal.com;

#       location / {
#                root   /home/workspace/www/mydeal;
#                index  index.html;
#                try_files $uri /index.html;
#     }
# }

# local pc에 도메인 등록
# 윈도우 - C:\\Windows\System32\drivers\etc\hosts
# 알약 환경설정 호스트 보호 해제하고 메모장 관리자 권한 실행하여 수정하기

# (맥)
sudo vi /etc/hosts


# http://localhost => nginx.conf 먼저 가고 없으면 DNS로 감
# http://localhost => pc host로 먼저 갔다가 80:80 포트로 docker로 넘어감

# nginx.conf는 왠만하는 냅두는게 나음 (critical 변경 시 백업 후 변경)

# 다시 들어가서 주석처리 하기
# http://localhost => nginx.conf
vi nginx.conf

# server {
#       root    /usr/share/nginx/html;
#      #root    /home/workspace/www/mydeal;
# }


# http://local.mydeal.com => local.conf

vi conf.d/local.conf

# 주소창의 도메인을 conf 파일의 server_name과 비교해서 location으로 처리됨

nginx -s reload

# exit로 나가면 container stop 됨
# Ctrl + P Ctrl + Q

docker ps -a

docker attach mydealdev

# 방금 작업 그대로 살아있음
ll
pwd

ll
ls -al

# cd만 입력하면 내 home으로 감
cd
pwd

# 정상정인 로그인으로 들어가는 것이 아니라 컨테이너 띄어놓고 attach로 들어간 것임
# 처음에 /bin/bash로 실행시키면 .bashrc가 탐
# .bash_profile은 안탐

# .bash_profile 에 alias 걸면 지금은 먹지만 죽이고 다시 나갔다가 들어오면 안됨
# .bashrc 만 탐

vi .bashrc

# alias ll='ls -al'

. .bashrc
ll

# 다시 한번 제대로 체크해보기
exit

docker start mydealdev
docker attach mydealdev
ll

# CentOS 그냥 - UTC; 영국 그리니치 천문대 기준 시간 (9시간 늦음)
date

# 우리 시간으로 맞춰주기
ll /etc/localtime

ll /usr/share/zoneinfo/Asia/Seoul

ll /etc/localtime

# symbolic link 제거
rm /etc/localtime
y

# symbolic link 걸기 [어디를 (바로가기 아이콘) -> 어떤 이름으로]
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 링크가 Seoul 보는지 체크
ll /etc/localtime

# KST로 바뀜 (한국 표준 타임)
date

# 다시 한번 체크
exit

docker start mydealdev
docker attach mydealdev
date

# 들어왔을 때 nginx 바로 떠있도록 하기
vi ~/.bashrc

# 맨 아래에 코드 2줄 추가 (nginx 띄우고 홈으로 바로 가게 함)
# nginx
# cd

. ~/.bashrc
pwd

ps -ef | grep nginx

# nginx 개발 서버인데 docker cpu 8개 뜰 필요 X
# docker 가 작업관리자에서 cpu 너무 많이 쓰면 그 PC는 docker 사용 안하는게 나음
# /etc/nginx/nginx.conf 에서 worker_process 1; 로 변경

# ncloud 명령어 입력하면 바로 들어갈 수 있게 설정
# ssh root@<포트포워딩한 연결 아이피> -p 50000 그때 그때 계속 다 치기 귀찮으니 alias 걸기

vi .bashrc

# alias ncloud='ssh root@<서버 접속용 연결 아이피> -p 50000'
# #nginx (nginx 자동 시작 우선 해제)

. .bashrc


# 네이버 클라우드 접속
ncloud

# 홈 디렉토리 확인
pwd

exit

# 자동 로그인 (docker container에서 설정)
ssh-keygen -t rsa

# 쭉 Enter 치기 => SHA256으로 만들어짐

ll
ll .ssh

# 생성된 키를 해임달에게 복사해주기
ssh-copy-id -i .ssh/id_rsa.pub root@<서버 접속용 공인 IP> -p 50000

# 서버 접속 (Ncloud 서버 호스트 이름: mydeal)
ncloud

pwd
vi check.txt

# Ncloud Ok!

pwd
exit

# 2개 아이피 외우기 어려우므로 등록해놓기

# 마운트된 디스크 확인 (df는 GB로)
df -h (MB로)

# 이미 hosts 사용중 => host OS와 docker의 /etc/hosts 파일을 연결해 놓고 사용중 (컨테이너 구동되면서 docker monut 됨)
# 같은 파일을 공유하고 있으므로 host OS에서 hosts 파일 수정하면 됨

# hosts 파일에 등록하기

# h 붙인건 해임달
# mydeal <공인아이피>
# mydealh <서버 접속용 아이피>

# mydealh로 하면 바로 들어가짐
ssh root@mydealh -p 50000
yes

exit

# ncloud의 .bashrc 도 ip 쓸 필요없음
vi .bashrc

# alias ncloud='ssh root@mydealh -p 50000'

# 반영
. .bashrc

ncloud

exit

# 압축해서 파일 주고 받기 (av는 서로 주고 받는데, z까지 붙으면 압축해서 주고 받음, 22번 포트)
# ncloud에서 가져올 때 ssh를 통해서 가져와라 (다른 사람 못들어오게 차단; ssh 이용해서)

rsync -avz mydealh:/root/check.txt . -e 'ssh -p 50000'

# 체크
ncloud

# rsync 데몬이 떠있어야 함
ps -ef | grep rsync

systemctl start rsyncd.service

# 서비스 등록 후 reboot 되서도 자동으로 뜨게 하기
# (서버 점검 이후 바로 뜨게 하기, 손으로 하기 귀찮)
systemctl enable rsyncd.service

exit

ll
cat check.txt

ncloud
vi check.txt

# Ncloud Ok! goooooooooood!

exit

# receiving 아래 파일 이름 있으면 받아진 것임 (비어 있으면 안 받은 것)
# rcp는 무조건 복사되서 내려오는데 rsync는 변경된 파일만 해줌
# 다 가지 않음
rsync -avz mydealh:/root/check.txt . -e 'ssh -p 50000'

!cat

# 컨테이너 구성 완료
exit

# 컨테이너를 이미지 굽기 (commit)

docker ps -a

# mydealdev container -> mydealdevimg 로 이미지 굽기
# 뒤에 내 user-id 붙여서 2개 구워도 됨
# 참고로 이미지 이름 같으면 덮어씌움
docker commit mydealdev mydealdevimg

docker images

# 이미지 배포(동료들 주기) 전에 내가 사전에 테스트

# docker run해도 괜찮음
# docker container 생성, nginx로 테스트
docker create -it --name "imgtest" -p 80:80 mydealdevimg

# container 생성됨
docker ps -a

# 최근 작업 하나만 보여줌
docker ps -al

docker start imgtest

# attach 전 항상 start 해야함
docker attach imgtest

# hostname 안줘서 아이디로 나옴
[root@edeedda62977 ~]# ps -ef | grep nginx

ll

# nginx 띄움, 만약에 시작 시 자동으로 띄우고 싶으면 .bashrc 수정
nginx

# 500 error (nginx 에러)
cd /etc/nginx/
vi nginx.conf

# error_log 위치 확인

tail -f /var/log/nginx/error.log

# 이제 접속 시도 -> error.log 나옴

# index.html or loal.conf 확인

ll conf.d

vi conf.d/local.conf

# 이 파일이 없음 -> 당신의 directory로 volume 걸어야 함
# (내 OS에 있는 파일임)
# 그 받은 사람도 포트 열고 volume 연결하므로 알아서 잘 씀

ll /home/workspace/www/mydeal

# localhost 주소로 접속 확인

exit

# docker container 제거
docker rm imgtest

docker images

# output은 ~다 (--output)
# docker는 tar로 묶임
docker save -o mydealimg.tar mydealdevimg

# 다른 사람이 이미지 파일 받아서 load
docker load -i mydealdevimg.tar
```

#

### [Note]

- 컨테이너 중지되면 프로세스도 다 죽어버림
- systemctl enable (서비스로 올리기, 실제 서버)
- rsync (서버, 나 파일 주고 받음, ftp 대신 사용)
- docker는 remote에 있는 서버라고 생각 (내 local PC X)
- 서버는 재시작 할 필요 없어서 systemctl 한번만 하고 <br/>
  이후에는 nginx 이용
- hosts 먼저 보고 dns 서버로 감
- 구동할 때 /bin/bash로 실행 시키면, .bashrc 탐
- .bash_profile은 ssh로 접속해서 패스워드 입력하고 로그인 했을때 탐
- volta는 알아서 .bash_profile, .bashrc 둘 다 등록함
- -> (symbolic link, 바로가기 같은 것)
- cd 하면 home으로 바로 감
- 프롬프트 hostname <br/>
  서버: mydeal <br/>
  도커: mydealdev

#

[Reference](https://www.youtube.com/watch?v=2h3Z1nvCiLI&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=17)
