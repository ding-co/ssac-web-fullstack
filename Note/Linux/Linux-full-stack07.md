## {풀스택#7} 리눅스(Linux) - docker image 만들기 (1/2)

## **Test Server 구축 (Docker)**

```docker
docker version
clear
docker system info

docker images / docker image ls

docker container run --name centos2 centos:latest /bin/echo 'Hello docker!'

# 실행중인 컨테이너만 나옴
docker ps

# 설치되어 있는 컨테이너 모두 나옴
docker ps -a

docker container run -it --name "<컨테이너-이름>" centos /bin/bash

docker ps -q

# container 모든 id
docker ps -aq

docker start/stop <컨테이너-이름>

# 컨테이너 들어가기
docker attach <컨테이너-이름>

docker rm <컨테이너-id>

# 모든 컨테이너 중지
docker stop $(docker ps -aq)

# 모든 컨테이너 삭제
dokcer rm $(docker ps -aq)
```

```docker
# pull은 받아오기 | push는 보내기
docker [image] (pull | push) <image-name>
```

1. File Sharing

- 도커 desktop - preferences - file sharing - + - "/Users/Aaron Kim/workspace/sfd"

```docker
cd workspace/sfd/
touch t.txt
touch test.js

docker container run -it --name "mydealdev" --hostname mydealdev -v "/Users/Aaron Kim/workspace/sfd":/home/workspace -p 80:80 -p 7101:7101 -p 7201:7201 centos /bin/bash

yum install epel-release -y
yum install telnet -y

# 사전에 NCloud ACG 셋팅 필요
telnet <공인ip> 3306

curl https://mydeal.ding-co.tk

yum install which rsync openssh-clients -y
which rsync

vi /etc/yum.repos.d/nginx.repo
yum install nginx -y
which nginx

ps -ef | grep nginx
nginx
!ps

# localhost 웹사이트 주소
# network - localhost - clear browser cache
```

<br/>

#

### [Note]

- 터미널 나갈 때 exit / Ctrl + d / logout
- exited (빠져나온 상태, 현재는 실행 X)
- -it (interactive)
- $()가 변수임
- file sharing 항상 걸어야 함 (git 연동)
- image commit (이미지 구워놓기)

#

## [Reference]

[Reference](https://www.youtube.com/watch?v=K_fCYjjZneo&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=16)
