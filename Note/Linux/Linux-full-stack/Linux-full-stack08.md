## {풀스택#8} 리눅스(Linux) - docker image 만들기 (2/2)

## **Test Server 구축 (Docker)**

```docker
docker ps -a
docker start mydealdev
alias dp='docker ps -a' # 안되면 '' 빼고 하면 됨 (윈도우)
dp

# 영구적으로 alias 설정 (맥)
vi .profile
. .profile

alias ds=docker images
clear # Ctrl + L

docker attach mydealdev

pwd
ps -ef | grep nginx
curl https://get.volta.sh | bash
volta
volta install node@14
volta install pm2
yum install python3 -y
node -v
npm -v
pip3 --version
python3 --version

# 이미지 굽기
nginx
cd /etc/nginx/
ll
alias ll=ls -al
ll
vi nginx.conf

# server {

# #root   /usr/share/nginx/html;
# root    /home/workspace/www/mydeal;
# }

ncloud
clear
ll /var
mkdir -p /home/workspace/www/mydeal
vi /home/workspace/www/mydeal/index.html

# This is Mydeal local nginx!!

nginx -s reload
ll conf.d
vi conf.d/local.conf

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

vi nginx.conf

# http://localhost => nginx.conf

# server {
#       root    /usr/share/nginx/html;
#      #root    /home/workspace/www/mydeal;
# }


# http://local.mydeal.com => local.conf

vi conf.d/local.conf

# 주소창의 도메인을 conf 파일의 server_name과 비교해서 location으로 처리됨

nginx -s reload

# Ctrl + P Ctrl + Q

docker ps -a

docker attach mydealdev
ll
pwd

# Ctrl + L

ll
ls -al
cd
pwd

# .bash_profile은 안탐
# .bash_profile 에 alias 걸면 지금은 먹지만 죽이고 다시 나갔다가 들어오면 안됨
# .bashrc 만 탐
vi .bashrc

# alias ll='ls -al'

. .bashrc
ll

exit

docker start mydealdev
docker attach mydealdev
ll

# UTC; 영국 그리니치 천문대 기준 시간 (9시간 늦음)
date

# 우리 시간으로 맞춰주기
ll /etc/localtime

ll /usr/share/zoneinfo/Asia/Seoul

ll /etc/localtime
rm /etc/localtime
y

# symbolic link 걸기 [어디를 (바로가기 아이콘) -> 어떤 이름으로]
ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

ll /etc/localtime

# KST로 바뀜 (한국 표준 타임)
date

exit

docker start mydealdev
docker attach mydealdev
date

# 들어왔을 때 nginx 바로 떠있도록 하기
vi ~/.bashrc

# 맨 아래에 코드 2줄 추가
# nginx
# cd

. ~/.bashrc
pwd

ps -ef | grep nginx

ncloud
ssh root@<포트포워딩한 연결 아이피> -p 50000

vi .bashrc

# alias ncloud='ssh root@<연결 아이피> -p 50000'

. .bashrc

ncloud

# 자동 로그인
pwd
ssh-keygen -t rsa

ll
ll .ssh

ssh-copy-id -i .ssh/id_rsa.pub root@106.10.58.201 -p 50000

ncloud
pwd
vi check.txt

# Ncloud Ok!

pwd
exit

# 마운트된 디스크 확인
df -h

# mydeal 공인아이피
# mydealh 서버 접속용 아이피

ssh root@mydealh -p 50000
yes

vi .bashrc

# alias ncloud='ssh root@mydealh -p 50000'

. .bashrc

exit

# 압축해서 파일 주고 받기
rsync -avz mydealh:/root/check.txt . -e 'ssh -p 50000'

ncloud

ps -ef | grep rsync

systemctl start rsyncd.service

# 서비스 등록 후 reboot 되서도 자동으로 뜨게 하기 (서버 점검 등 이유)
systemctl enable rsyncd.service

exit

ll
cat check.txt

ncloud
vi check.txt

# Ncloud Ok! goooooooooood!

exit

# rsync 무조건 복사되서 내려오는데 변경된 파일만 해줌
rsync -avz mydealh:/root/check.txt . -e 'ssh -p 50000'

!cat

# 컨테이너 구성 완료
exit

docker ps -a

# mydealdev container -> mydealdevimg 로 이미지 굽기
docker commit mydealdev mydealdevimg
docker commit mydealdev mydealdevimg_ding-co

docker images

# 이미지 배포(동료들 주기) 전에 테스트

# docker run해도 괜찮음
# docker container 생성, nginx로 테스트
docker create -it --name "imgtest" -p 80:80 mydealdevimg_ding-co

docker ps -a

# 최근 하나
docker ps -al

docker start imgtest

# attach 전 항상 start 해야함
docker attach imgtest

ps -ef | grep nginx

ll

nginx

# 500 error (nginx 에러)
cd /etc/nginx/
vi nginx.conf

# error_log 위치 확인

tail -f /var/log/nginx/error.log

# 이제 접속 시도 -> error.log 나옴

# index.html
ll conf.d

vi /conf.d/local.conf

# 이 파일이 없음 -> volume 걸어야 함
ll /home/workspace/www/mydeal

# localhost 주소로 접속 확인

exit

docker rm imgtest
docker images

# output은 ~다 (--output)
docker save -o mydealimg.tar mydealdevimg_ding-co
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
  서버: mydeal ~]# <br/>
  도커: mydealdev ~]#

#

[Reference](https://www.youtube.com/watch?v=2h3Z1nvCiLI&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=17)
