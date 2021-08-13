## {풀스택#9} 리눅스(Linux) - docker image 만들기 정리 영상

## **Test Server 구축 (정리영상)**

## [Workflow]

1. PC (mac or windows)

   - host 파일 등록
   - 공인아이피, 접속아이피, 도메인
   - windows는 메모장 이용

2. docker (mydealdev)

   - nginx에서 conf 설정
   - .bashrc 수정
   - timezone 설정 (Seoul)

3. rsync workflow (rsync는 파일 주고 받기 위한 용도)
   - Ncloud - 실제 서비스 서버
     - rsync daemon 띄우기
   - docker(mydealdev)
     - rsync 사용

```linux
# mydealimg.tar 다운 받기

docker load -i mydealdevimg.tar
```

#

### [Note]

- 그냥 pwd => /user/bin/pwd (내가 지금 working)<br/>
  /bin/pwd는 바깥쪽 시스템의 pwd
- pm2는 지속적으로 refresh 함

#

[Reference](https://www.youtube.com/watch?v=KIStLWKp4S4&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=18)
