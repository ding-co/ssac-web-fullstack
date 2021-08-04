## {풀스택#2} 리눅스(Linux) - NCP(Naver Cloud Platform) CentOS 서버 생성 및 설정

>

## **MyDeal 서버 설치 (서비스 서버 환경 구축)**

- NCP (Naver Cloud Platform)
- 1년 무료 micro server
- 1세대, 공인 IP 월 4,032원,
- ACG 설정 <br/>
  nginx(http): 80 <br/>
  nginx(https): 443 <br/>
  mysql: 3306 <bf/>
  cf) flask & node is entered through Nginx
- 접근 소스 (출발지); 0.0.0.0/0 (모든 곳에서 다 들어올 수 있음)
- 22번 포트 - ssh
- 80 포트 - http (web server) test 용도 [옵션]
- 443 포트 - https 반드시 열기
- 3306 포트 - MySQL, 33060 포트 - NoSQL MySQL (mysqlx)
- 포트포워딩; 외부 포트 50000 (ssh 접속 용도)

<br/>

#

### [Note]

- Redis; 메모리 DB
- 마스터 서버; write, 슬레이브 서버; read
- ACG (Access Control Group)
- 공인 ip (SSH 접속 서버 IP)
- https://berryservice.net/ipaddress (실제 IP 주소 나옴)
- UDP; 내부에서만 들어오게 함, 관리용
- 플라스크와 노드는 보안상 안열음 -> 포트포워딩

#

[Reference](https://www.youtube.com/watch?v=HCMXDPYXd9g&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=11)
