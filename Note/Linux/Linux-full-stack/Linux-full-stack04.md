## {풀스택#4} 리눅스(Linux) - Linux 서버에 Volta, node, pm2, python 설치

## **서버 패키지 설치 (서비스 서버 환경 구축)**

- volta install <br/>

```unix
  curl https://get.volta.sh | bash
```

- pwd
- cd <br/>
  ~: root
- ls -algs (숨김 파일 표시)
- ls -al (user, group 나옴)
- ls -l (ll)
- .으로 시작하는 파일 (설정 파일)
- ~ (root) 에다가 설치해야 함
- cat .bash_profile (bash 쉘의 기본 설정 파일)
- source 아니면 . 을 이용하여 실행
- . .bash_profile
- echo $VOLTA_HOME
- ll .volta/

node 설치

- volta install node@14(LTS version) (node js 설치)
- node (node 실행)
- .exit (node 나오기)
- node --version
- npm --version

pm2 설치

- volta install pm2
- pm2 list / pm2 ls

python 설치

- python --version
- yum install python3 -y (-y: 묻지마)
- python3 --version

<br/>

#

### [Note]

- volta; 노드 상이한 버전 관리 편하게 해줌, 가벼움
- node js는 LTS 버전 설치 (안정적)
- PM2; 노드 프로세스 상태 파악 쉬움
- .bashrc (bash runtime configuration)
- curl (저 url에서 content 가져다 줌)
- #! (선언)
- command는 format을 줄 수 있음 (echo랑 비슷)
- npm; 모듈 설치

#

[Reference](https://www.youtube.com/watch?v=B_jgH_ZyjIY&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=13)
