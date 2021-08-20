## {풀스택#13} 리눅스(Linux) - 실무에서 꼭 필요한 기술 (2/2)

## **Linux (CentOS) 실무에서 유용한 기술**

- 모니터링

```
# 가장 많이 쓰는 모니터링 도구
# 1초에 한번씩 실행 (평균들이 나옴)
vmstat 1

# 한번에 다 나옴 => 정확히 알 수 없음
vmstat

# r (runnable queue; 실행해야 되는데 대기중인 애들)
# b (I/O blocking 되는 애들)
# swpd (swap 되는 애들)
# free (메모리에서 free한 공간), buff (버퍼된 공간)
# cache (재사용되는 애들 올려놓음 ex. OS에서 자주 사용하는 것들 미리 올려놓고 사용함)
# swap; 메모리가 부족해서 디스크를 메모리처럼 사용
# si; swap in; 메모리가 부족해서 디스크에서 읽어오는 양
# so; swap out; 메모리가 부족해서 디스크에 쓰는 양
# io; 디스크/디바이스 block in (in => read), block out (out => write)
# system; in; interrupted 된 횟수
#         cs; context switching 된 횟수
# cpu; us; user 사용하는 cpu의 퍼센티지
#      sy; system이 사용 (커널)
#      id; CPU idle (놀고 있는 경우)
#      wa; i/o 하기 위해 cpu waiting ex) 파일 10개 동시 쓰면 대기하고 있는 퍼센티지
#      st; stolen (vm 바깥쪽에서 훔쳐온 cpu 얼마나 사용)

ps -ef

vmstat 1

# ncloud 서버

yum info python3

# vmstat 보면 interrupt, context switch, user 사용 등 바뀜

yum info nginx

vmstat

vmstat 1

# 1초 단위씩 10회만 봄 (횟수 지정)
vmstat 1 10

# memory; inact / active 확인
vmstat -a

# device; sector (데이터 기록할 수 있는 영역), 속도, total 등 disk 관련
vmstat -d

# 총 stat
vmstat -s

# 순간적인 현재 시스템 상태
vmstat

# 과거 시스템 상태 보기 (10분 단위로 기록), 지난 24시간
sar

# 특정 날짜 보기 (00 => 일자)
sar -f /var/log/sa/sa00

# load average (평균)
sar -q

# netstat (네트워크 모니터링)

# netstat 설치
yum install net-tools -y

# 네트워크 상태
# 앞부분 정리 (몇 개 붙었는지, ip도 나옴, established는 연결됨 상태 (keep connected))
# 그냥 connected는 연결만 되었던 것

# spacebar (넘기기)
netstat | more

# listening 하는 것 까지 좀 더 detail하게 나옴
# listening은 대기중인데 아직 아무도 안붙었다는 것 (들어올 수 있음)
# 33060은 mysqlX (NoSQL MySQL)
netstat -a | more

# established 빠진 상태
netstat -l | more

# 모두
netstat -al | more

# established 만 보기
netstat | more

# 특정 포트 (포트에 누가 붙었는지 알 수 있음)

# MySQL
netstat -an | grep 3306

# https (잠시 keep connection 되었다가 곧 끊어짐)
netstat -an | grep 443

# 좀 더 detail (속도 좀 더 빠름)
ss

# listen 되는 것만 체크
ss -a | grep 3306
```

- Load Balancing

  - 처음부터 서버 2대 이상으로 구성하는 경우 많음 (초기는 성능 낮은 서버로)
  - 서버 다운 시 다른 서버가 서비스하기 위해서
  - 이후 서비스 사용자 많아지면 2대 서버 성능 좀 올리다가 <br/>
    더 이상 못버티면 서버 수량 늘림
  - DNS 서버 (Round-Robin) 방식
    - 같은 도메인에 2개 아이피 (끝 숫자 +1) DNS Round-Robin
    - 사용자가 2곳으로 들어갈 수 있음 (어디로 갈진 모름)
    - 도메인 설정하면 됨
    - 문제: 만약 한 서버가 다운해서 죽으면 DNS 서버가 죽은 서버 아이피 return 해줄 수 있음 <br/>
      (DNS 서버는 이 서버가 죽었는지 모름)
    - 단순한 Load Balancing (2대 서버 서비스 구성 가능)
    - 보편적 구성 방식
      - 데이터베이스는 Master (write, read) - Slave (read)
      - Master는 Slave에게 data sync 역할 (서버 다운시 slave를 master로 승격하면 됨)
      - DB 복원하기 위해 시간 걸리므로 위와 같이 이중화함
      - 서버는 2대 웹 서버 두고 각 서버 내 플라스크 등 다 동일한데 <br/>
        한쪽 서버에 업로드를 하면 다른쪽 서버에 들어온 사람은 그 업로드 폴더에 접근 불가 <br/>
        => 따라서 다른쪽 서버도 업로드한 dir를 가지고 있어야 함 (NFS로 구성)
  - Load Balancer 사용 방식
    - L/B (L2,3,4,7)
    - 대부분 L4하고, 대규모 서비스는 L7 사용하기도 함 (DDOS 방지 등 위해, 고가)
    - L2는 데이터 링크 Layer (MAC address 만 가지고 Round-Robin), 저가, 부하 심해질 수 있음
    - L3는 IP로 Round-Robin, 가벼운 대신 IP까지 밖에 안됨
    - L4는 transport layer; port로도 L/B 가능, ip 와 port 같이 사용 가능
    - L7는 응용 계층; IP, port, 패킷까지도 가능, 애플리케이션처럼 DDOS 방지 등 세팅 가능
    - L/B의 가상 IP인 VIP를 받음
      - 사용자들은 이 가상 IP 서버로 들어옴
      - NAT를 통해 2대의 서버로 L/B를 함
      - 여러 알고리즘이 있음
        - Round-Robin (어디로 갈지 모름)
        - Least Connection; User connection 수 적은 서버 쪽으로 보냄
        - Weighted Least Connection; 서버 성능 마다 가중치를 주고 사용자 받는 비율 조정
        - Fastest Least Connection; 응답 가장 빠른 쪽으로 줌 <br/>
          (바쁜 서버는 응답 속도 느릴 것임, 현재 응답 빠른쪽이 서버가 놀고 있는 중)
        - Adaptive; 팬디드된 connection, 사용자가 http 요청 ex. image, css 등 요청 적은 쪽으로 줌
        - Fixed; 미리 정해놓음 ex. 홀수번 ip는 이쪽 짝수번 ~
        - Hashing; 해시 알고리즘 (어디로 보낼지 모름)
        - Min Misses; connection 유실 (error) 적은 쪽
        - Random
        - URL-based; ex. 게시판은 이쪽, 첫 화면은 저쪽
        - Cookie; 사용자의 쿠키나 헤더로 분리 가능 ex. 로그인한 사용자는 이쪽, 안한 사용자는 저쪽, 관리자 로그인,...
        - SSL session ID; https로 들어오면 브라우저 접속자마다 session id 달라짐 <br/>
          (브라우저 tab은 session 동일할 수 있는데 크롬 시크릿 모드는 session 달라짐)
        - nginx에도 Load Balancing 기능 있음, 세팅 가능
        - NAT가 client 어딘지 알려줌 (공인 아이피 -> 비공인 아이피 해석) <br/>
          (똑같은 게이트웨이로 들어오면 같은 ip지만 NAT로 들어오면 모두 다 다른 IP가 됨 <br/>
          NAT를 통해서 공인 아이피가 내부 비공인 아이피로 해석됨)

- NFS (Network File System)

  - /upload 폴더를 NFS로 구성
  - 서버 2대 연동 (친구 서버와 연동해서 테스트 해도 됨)
  - 친구 서버와 서로 upload 폴더 mount

```
# client는 net-tools 정도만 있으면 됨 (mount 위해)
yum install net-tools -y

# server에서 dir 띄워놓고 서비스 해야함
# rpc-bind는 nfs 모니터링 용도
# yum install nfs-utils rpc-bind -y

# mydeal ncloud

hostname

yum install nfs-utils rpc-bind -y

mkdir /upload
ll /
chmod 757 /upload

# dir 사용자 설정

vi /etc/exports

# read write 권한, sync로 안전하게
/upload <client-다른 서버-ip>(rw,sync)

# systemctl start nfs
systemctl start nfs-server

# nfs 데몬 체크
ps -ef | grep nfs

# 데몬이 서비스에 등록됨
systemctl enable nfs-server

# 적용 잘 되었는지 확인
exportfs -v

# root_squash는 root 권한 안주겠다
# 앞에 no_ 붙어있으면 root 권한까지 주는 것임

# Server의 NFS TCP(111)/UDP(2049) 포트 열기
# NCP 사이트 콘솔에서 설정
# ACG 설정 (방화벽 포트 설정) - 적용

# TCP - client ip - 111 - nfs
# UDP - client ip - 111 - nfs
# TCP - client ip - 2049 - nfs
# UDP - client ip - 2049 - nfs

df -h

cd /upload/

cp ~/check.txt .
ll

# 권한 주고 싶으면 chmod 757 check.txt
```

```
# client 서버

# ssh 아니므로 그냥 공인 ip임
telnet <다른 서버 공인 ip> 111

mkdir /upload

mount -t nfs <다른 서버 공인 ip>:/upload /upload

df -h

echo "This is nfs client" > /upload/client.txt
ll /upload/

cd /upload/
ll

ll

# 읽기는 가능
cat check.txt

# root 권한 이므로 수정은 불가
vi check.txt

:q!

# 서버가 만든 파일을 클라이언트쪽에서는 수정/삭제 불가

# 다른 폴더 갔다가 umount
cd ~

umount /upload/
```

#

### [Note]

- TCP/UDP 등 서버의 포트를 열때는 공인 IP로 열면 됨 <br/>
  서버 접속용 IP는 ssh로 접속할 때만 사용됨
- 버퍼; 한쪽에서 한쪽으로 데이터를 넘길 때 중간에 버퍼를 두고 <br/>
  훨씬 유연하게 데이터가 넘어갈 수 있음
- interrupt: CPU가 하나의 연산을 수행하려면 한바퀴가 도는데 CPU가 혼자 하나의 연산만 수행하도록 두지 않음 <br/>
  가만히 있을 수 없으므로 계속 중간중간 interrupt 당함 (OS 명령 수행될 떄)
- context switching: 긴 프로세스 연산 (nginx) 같은 경우 중간에 mysql을 실행시키면 mysql 연산을 수행해야 함 <br/>
  mysql cpu 상태 그대로 보존한 상태에서 mysql 연산을 돌림 <br/>
  (하나의 프로세스의 정보를 그대로 남겨두고 다른 프로세스 수행 다하고 다시 돌아와서 해야함, CPU 연산 전환)
- cpu idle 보면 얼마나 cpu가 일하는지 볼 수 있고, iowait를 보면 disk가 얼마나 바쁜지 알 수 있음
- 현재 상태는 vmstat, 지난 시간은 sar
- 만약 CPU, memory, i/o 다 괜찮은데 사용자들이 느리다고 하면 <br/>
  => 네트워크가 문제임
- MySQL `show processlist;`
- MAC address (서버에 붙어있는 Network card에 있는 address는 다 다름, 공인 IP는 동일하지만)
- NAT (Network Address Translation)
- 함수 부를 때 sync, async <br/>
  sync: 함수를 부르고 이 함수가 어떤 일을 하고 응답을 줄 때까지 나는 아무것도 못하고 기다림 <br/>
  async: 함수 호출하고 난 다른거 진행함, 그 함수가 끝나면 callback
- 프로젝트 수행하면서 실제로 배우는 것이 진정한 공부임!

#

### [Q&A]

- NFS 할 때 만약 클라이언트 서버 쪽에서 mount가 안되시는 분들 <br/>

  => yum install nfs-utils -y 로 nfs-utils 설치하시고 mount 하시면 잘됨

- Cookie vs. Session vs. Cache <br/>

  => 서버에서는 접속자(브라우저 마다)를 세션으로 관리하고, <br/>
  이 세션 정보를 클라이언트 브라우저에는 쿠키로 관리함 <br/>
  그리고 서버 세션은 서버(노드)가 재시작되면 지워지는 걸 방지하기 위해 <br/>
  cache(redis)에 사용자 세션을 저장해 두죠

#

[Reference](https://www.youtube.com/watch?v=F2PEISfDGDs&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=22)
