## {풀스택#1} 리눅스(Linux) 시작 - Linux, Cloud, Serverless 소개

> Cloud Platform Service Vendors

> Cloud Server Hosting Service

- 강의에서 리눅스를 따로 설치하지는 않음 (Gabia 같은 인프라 회사는 설치 가능)
- 강의 목표: 개발을 위한 환경 설정 (mydeal 서버 구축)

## **Linux**

- GNU Project (리누스 토발즈 리더)
- Linux Kernel (어셈블리 언어)
- GPL (General Public License), FSF (Free Software Foundation)
- CentOS 8
- 리눅스 기본 shell: <u>bash shell</u>
- PC용은 Debian 계열의 Ubuntu가 편하고 좋음, <br/>
  Server용은 Red Hat 계열의 CentOS (무료), RHEL (유료, 기술지원) 안정적
- VMware: 한 대의 물리적인 서버에서 여러 대를 사용 가능, <br/>
  Hypervisor 이용 (Host OS - 가상 서버 OS 연결 다리 역할) <br/>
  여러 OS 모두 설치 -> 무거움, 자원 낭비 심함
- docker: 설치되어 있는 host OS 바로 활용, 별도의 OS 설치 X <br/>
  별도의 container만 있을 뿐 (image), H/W 사양 마음대로 확장 가능, <br/>
  애플리케이션처럼 마음대로 H/W 조작 가능, 서버 복제
- 구글 orchestration - 쿠버네틱스

<br/>

## **Cloud**

- Cloud Server Hosting 한국 시장의 성장 <br/>
  (한국 - 네트워크 사용량 多, 통신 기술 발전)
- 현재 80% 이상 외산
- Cloud 중간 vendor (agent) 有
- Public Cloud의 ACG (Access Control Group) <br/>
  (포트 막아주는 일종의 방화벽)

<br/>

## **Serverless**

- XaaS (X: \*, all)
- 서버가 없는 것처럼 느껴짐 (서버가 없는 것은 아님)
- Serviceful Serverless; Firebase <br/>
  (단기적 서비스 반응만 보는 용도로 많이 활용, NoSQL임, RDB x, MVP 개발 -> 빠르게 개발 후 출시)
- FaaS (Function as a Service); Amazon Lambda <br/>
  (Client 단에서 함수 코딩하여 바로 deploy 가능 but, 함수 산재되면 관리 어려움)
- IaaS (Infrastructure as a Service) <br/>
  ex) Naver Cloud
- SaaS (Software as a Service) <br/>
  ex) Google Docs, GMail (Software를 web을 통해 클라우드에서 제공, 따로 서버 구축 없이 S/W 제공)
- PaaS (Platform as a Service)

#

### [Note]

- GNU; Gnu is Not Unix!
- RHEL; Red Hat Enterprise Linux
- Client 환경은 Server와 동일하게 docker로 구성 <br/>
  (Server에 docker 또 설치할 필요 X => 메모리/CPU 먹어서 느려짐)
- 서버 세팅: NCP <br/>
  클라이언트 세팅: docker 및 개발 환경 세팅
- 마이크로 서버; cpu 1장 (무료 서버, 프로세스 하나 => 쓰레드 이용)
- Shell Script => 노가다 사라짐 (서비스 커지면 필요)
- 유능한 개발자; 모듈화(함수화) -> 반복 코딩 최소화! (노가다 제거) <br/>
  (무능한 개발자는 copy&paste...)
- Mac OS (애플), 안드로이드도 리눅스 기반
- host OS; 가장 바깥쪽의 OS (H/W에 설치되어 있는 OS) <br/>
  ex) 윈도우 OS 에서 리눅스 설치 => 윈도우 OS가 host OS임, 리눅스는 guest OS <br/>
- 사내에서 폐쇄망 사용; on-premise (private 사내용) -> docker 사용 가능

#

### [과제]

1. - [x] NCloud 가입 => 결제 수단 등록
2. PC setting
   - - [x] Windows PC: putty 설치
   - - [x] docker 설치

#

[Reference](https://www.youtube.com/watch?v=B0ExqP8dVjk&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=10)
