## {풀스택#7} 리눅스(Linux) - docker image 만들기 (1/2)

## **Test Server 구축 (Docker)**

```
# 도커 설치 확인
docker version

# 도커 설정 확인
docker system info

docker images / docker image ls

# docker container 띄우기 (잠깐 들어가서 출력만 하고 바로 나옴)
# docker에 설치되어 있는 이미지를 가지고 container를 띄우는 것임
# echo 혹시 못찾을 수도 있으니 /bin 붙임
docker [container] run --name centos2 centos:latest /bin/echo 'Hello docker!'

# 실행중인 컨테이너만 보기
docker ps

# 설치되어 있는 컨테이너 모두 보기
docker ps -a

# 도커 컨테이너 실행, it(interactive 형태)
docker [container] run -it --name "<컨테이너-이름>" centos /bin/bash

# 현재 돌고 있는 컨테이너 id만 출력
docker ps -q

# container 모든 id 출력
docker ps -aq

docker start/stop <컨테이너-이름>

# 컨테이너 들어가기
docker attach <컨테이너-이름>

# 도커 컨테이너 지우기
docker rm <컨테이너-id>

# 모든 컨테이너 중지 ($는 변수)
docker stop $(docker ps -aq)
```

```
# pull은 받아오기, push는 보내기
docker [image] (pull | push) <image-name>

# nginx image 삭제
docker image rm nginx

# 사용하지 않는 모든 image 삭제
docker image prun

# docker hub 로그인
docker login
```

1. File Sharing 필수! (docker랑 local pc의 directory 연결)

- VSCode로 코딩할 directory에 git을 세팅해야 함, flask 폴더 등 배치

- Mac
  - 도커 desktop - preferences - file sharing - + - C:\Users\Aaron Kim\workspace\sfd
- Windows
  - C드라이브의 Users 폴더 이하는 자동으로 공유되서 따로 설정할 필요 없음

2. Run Container by CentOS image (CentOS 도커 컨테이너 안)

- mydealdev :port

  - Nginx: 80
  - volta
  - PM2 by volta
  - Node, NPM (express): 7101
  - python3, pip (flask): 7201
  - (MySQL8: 3306)
  - (rsync, rcp setting: 22) <br/>
    (docker를 putty로 들어갈 일은 없음, <br/>
    만약 들어간다면, 22번 포트 열고 sbin/init으로 구동해야 데몬 뜸)

  ```
  cd workspace/sfd/
  touch t.txt
  touch test.js

  # 포트 설정하고 공유 폴더 이용해서 컨테이너 띄우기
  docker container run -it --name "mydealdev" --hostname mydealdev -v "C:/Users/Aaron Kim/workspace/sfd:/home/workspace" -p 80:80 -p 7101:7101 -p 7201:7201 centos /bin/bash

  # 도커 컨테이너 안
  [root@mydealdev /]# yum install epel-release -y
  [root@mydealdev /]# yum install telnet -y

  # clear 명령어 사용하기 위해 설치
  [root@mydealdev /]# yum install ncurses

  # 사전에 NCloud ACG 셋팅 필요
  [root@mydealdev /]# telnet <공인ip> 3306

  # docker 잘 되는지 체크
  [root@mydealdev /]# curl https://ding-co.topician.com

  [root@mydealdev /]# yum install which rsync openssh-clients -y
  [root@mydealdev /]# which rsync

  [root@mydealdev /]# vi /etc/yum.repos.d/nginx.repo

  # [nginx]
  # name=nginx repo
  # baseurl=https://nginx.org/packages/centos/7/$basearch/
  # gpgcheck=0
  # enabled=1

  [root@mydealdev /]# yum install nginx -y

  # 설치되어 있는지 확인 명령어 => which
  [root@mydealdev /]# which nginx

  # systemctl로 띄울 필요 없음, nginx로 띄움 (데몬이 필요 없음)
  [root@mydealdev /]# ps -ef | grep nginx
  [root@mydealdev /]# nginx
  [root@mydealdev /]# !ps

  # localhost 웹사이트 주소
  # network - localhost - clear browser cache
  ```

#

### [Note]

- 터미널 나갈 때 exit / Ctrl + d / logout
- exited (빠져나온 상태, 현재는 실행 X)
- docker는 안에서 id로 컨테이너들이 각각 다 맵핑되어 있음
- $()가 변수임 <br/>
  cmder에서는 명령어가 안먹히지만, powersehll/git bash 에서는 잘 먹힘 <br/>
  (linux bash shell 같은 곳에서만 허용되는 명령어인듯)
- telnet은 암호화가 안된 망
- image commit (이미지 구워놓기)

#

[Reference](https://www.youtube.com/watch?v=K_fCYjjZneo&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=16)
