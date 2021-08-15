## {풀스택#2} 리눅스(Linux) - NCP(Naver Cloud Platform) CentOS 서버 생성 및 설정

## **MyDeal 서버 설치 (MyDeal 서비스 서버 환경 구축)**

- NCP (Naver Cloud Platform)
- 1년 무료 micro-g1 server; 10만원(3개월) 크레딧
- Classic 1세대, Linux&HDD, 공인 IP 월 4,032원
- 서버 생성 - 50GB, OS (CentOS 7), Micro
- 서버 설정 - KR-2, HDD, g1, Micro, 월요금제, 서버 1대, 서버 이름(넘버링 유용), 반납 보호 설정
- 인증키 설정 - 인증키 이름, pem 파일 다운로드 (root - pem file)
- 네트워크 접근 설정 - ACG default
- 공인 IP 세팅
- 서버 접속용 공인 IP (SSH 접속용 IP, 서버 들어가기 위한 데몬일뿐, 해임달) <br/>
  서비스용으로는 못들어감
- 공인 IP 신청 - KR2, 일반, 서버 선택
- ACG 설정 <br/>
  nginx(http): 80 // web server/http <br/>
  nginx(https): 443 // https<br/>
  mysql: 3306 // mysql <br/>
  cf) flask & node is entered through Nginx
- 접근 소스 (출발지); 0.0.0.0/0 (모든 곳에서 다 들어올 수 있음)
- 22번 포트 - ssh (과거에는 telnet; 암호화되지 않음)
- 80 포트 - http (test 용도) [옵션]
- 443 포트 - https 반드시 열기
- 3306 포트 - MySQL, 33060 포트 - NoSQL MySQL (mysqlx API)
- 포트포워딩; 외부 포트 50000 (ssh 접속 용도) <br/>
  외부에서 50000번 포트로 들어오면 해임달이 22번 포트로 보내줌 <br/>
  22번 포트는 서버 접속용 공인 ip로만 들어갈 수 있음
- 서버 관리 및 설정 변경 - 관리자 비밀번호 확인 - pem file drag&drop - 비밀번호 체크
- putty 접속 - 50000 포트 - login as: root, 패스워드 입력

```
# Mac OS
ssh root@<서버 접속용 ip> -p 50000
<비번 입력>
```

#

### [Note]

- 개발 서버 - local PC에 docker로 가상으로 설치 <br/>
  서비스 서버 - NCP 이용
- 실제 스타트업; MySQL 따로 설치 X, 클라우드 내 DB 사용
- Redis (메모리 DB)

- Compute - Server 설정 (스타트업 초기 견적; 보통은 초기에 마이크로 서버로 시작)
  - MS-SQL 사용하려면 윈도우 OS 설정해야 하고, OS 라이센스 비용 별도 지불...<br/>
    따라서 굳이 windows OS 선택하지 않고 리눅스 선택!
  - SSD vs. HDD (SSD 권장. I/O 부하 떄문) <br/>
    무료에서는 SSD 사용 불가, 따라서 HDD 선택
  - 초기에는 Standard 서버 타입 설정 후 -> 나중에 서비스 커지면 High CPU/Memory 변경하면 됨 <br/>
    (클라우드/도커의 장점, 나중에 서버 사양 늘릴 수 있음)
  - CPU 2개, 8GB, 서버 1대
- Database - Cloud DB for MySQL 설정

  - VPC (내부망)
  - 서버 타입 standard
  - 서버 스펙 CPU 2개, 8GB
  - 마스터 서버 1대, 슬레이브 서버 1대
  - SSD
  - 데이터 스토리지 사용량 50GB
  - 백업 스토리지 사용량 50GB

- I/O 병목 많이 생기는 부분 => Network, Disk, Database
- 마스터 서버; write, 슬레이브 서버; read (Replication) <br/>
  ex) 게시판 글 쓰기 - 마스터 서버, 게시판 글 읽기 - 슬레이브 서버
- 보통 WAS랑 DB 서버 분리
- ACG (Access Control Group)
- 공인 ip (SSH 접속 서버 IP)
- https://berryservice.net/ipaddress (실제 IP 주소 나옴)
- UDP; NCP 서버 내부에서만 들어오게 함 (관리용)
- 플라스크와 노드는 보안상 열지 않음 -> 포트포워딩 <br/>
  (nginx가 받아서 포워딩시킴; 해킹 방지)
- ftp (31번 포트)

#

[Reference](https://www.youtube.com/watch?v=HCMXDPYXd9g&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=11)
