## {풀스택#3} 리눅스(Linux) - Linux CentOS7에 Nginx 웹서버 설치하기

## **서버 패키지 설치 (서비스 서버 환경 구축)**

- YUM (Yellodog Updater, Modified, 패키지 저장소) <br/>
  RPM의 Package Dependency 개선 (관계 의존도 개선)
- passwd (패스워드 변경)
- whoami (현재 사용자 이름)
- hostname (설정한 서버 이름)
- /sbin/ifconfig (서버 내부 ip 보기)
- cd /etc/yum.repos.d/
- vi nginx.repo

```linux
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```

- [] 안에는 패키지 명
- yum install nginx -y (-y: 모두 yes)
- ps -ef | grep nginx (프로세스 확인)
- nginx (구동)
- nginx -s stop (구동 중지, 프로세스 죽임)
- 공인 아이피로 nginx 구동 여부 확인 가능 (웹 http)
- nginx -s reload (프로세스 재시작, root 프로세스 id 안바뀜)
- nginx 설정들은 모두 메모리에 올려 놓음 <br/>
  stop 시 프로세스 죽임 <br/>
  reload 시에는 메모리만 비웠다가 다시 채움 (메모리 공간은 그대로) <br/>
  restart 는 프로세스를 아예 죽였다가 다시 띄움
- service로 등록 (윈도우) <br/>
  systemctl start nginx (데몬 띄우기)
- 데몬: 서버에 떠서 계속 죽지 않고 버티고 있음
- systemctl enable nginx (서비스로 등록, 데몬으로 서비스 띄우기)
- systemctl stop nginx (데몬 내리기)
- nginx 명령어는 프로세스로 실행 <br/>
  systemctl 명령어는 서비스로 실행 (서비스가 OS에서 계속 돌고있음)
- systemctl (system controller)

#

### [Note]

- centOS 7은 python 2 이미 깔려 있음
- volta => node 설치
- RPM(Red hat Package Manager)
- tab: 자동 완성
- :wq (저장 후 나가기, vi editor 에서)
- nano or vi editor 사용법 익히기
- cat (내용 출력)
- nginx; 80 포트 사용 (http)
- Ctrl + R: 웹사이트 새로고침

#

[Reference](https://www.youtube.com/watch?v=WSGuy2QiESw&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=12)
