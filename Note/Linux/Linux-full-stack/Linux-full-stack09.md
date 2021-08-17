## {풀스택#9} 리눅스(Linux) - docker image 만들기 정리 영상

## **Test Server 구축 (정리영상)**

## [Workflow]

1. PC (mac or windows)

   - host 파일 등록
     - 공인아이피, 접속아이피, 도메인 세팅 <br/>
       (도메인은 localhost 말고 다르게 들어오도록)
     - windows는 메모장 이용

2. docker (mydealdev)

   - nginx에서 conf 설정
   - .bashrc 수정 (ll, ncloud)
   - timezone 설정 (Seoul로 새로운 링크 걸음)

3. rsync workflow (rsync는 파일 주고 받기 위한 도구일뿐) <br/>
   (내 PC에서 코딩 이후 서버에 올리기 위함)
   - Ncloud - 실제 서비스 서버
     - rsync daemon 띄우기
   - docker(mydealdev)
     - rsync 사용 (왼쪽 출발지, 오른쪽 도차지)

```linux
# mydealimg.tar 다운 받기

docker load -i mydealdevimg.tar
```

#

### [Note]

- 그냥 pwd => /user/bin/pwd (내가 지금 working)<br/>
  /bin/pwd는 바깥쪽 시스템의 pwd (실제 directory 보기)
- 로컬 pc의 workspace에서 파일 생성 후, <br/>
  docker run 시 -v /Users/.../sfd:/home/workspace 에도 생김 <br/>
  `docker container run -it --name "mydealdev" --hostname mydealdev -v "C:/Users/Aaron Kim/workspace/sfd:/home/workspace" -p 80:80 -p 7101:7101 -p 7201:7201 mydealdevimg /bin/bash`
- -v는 이 호스트에 있는 directory를 docker에 있는 이름으로 마운트하겠다!
- `^node^cat` node를 cat으로 바꿔서 실행
- `pm2 start 파일명.js` <br/>
  `pm2 ls` <br/>
  `pm2 logs 0` <br/>
  `pm2 stop 0` (여기서 숫자는 id이고 name 써도 됨)
- pm2는 지속적으로 refresh 함 (pc에서 수정하면 docker에서 바로 반응, pm2로 체크)

#

[Reference](https://www.youtube.com/watch?v=KIStLWKp4S4&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=18)
