## {풀스택#1} 리눅스(Linux) 시작 - Linux, Cloud, Serverless 소개

> Cloud Platform Service Vendors

## **Linux**

- GNU Project (리누스 토발즈 리더)
- Linux Kernel - GPL (General Public License)
- CentOS 8
- 리눅스 기본 shell: bash
- PC용은 Debian 계열의 Ubuntu 편하고 좋음, <br/>
  Server용은 Red Hat 계열의 CentOS (무료), RHEL (유료) 안정적
- VMware; 한 대의 물리적인 서버에서 여러 대를 사용 가능, <br/>
  Hypervisor 이용 (여러 os 모두 설치 -> 무거움, 자원 낭비 심함) <br/>
- docker; 설치되어 있는 OS 바로 활용, 별도의 OS 설치 X <br/>
  별도의 container만 있을 뿐 (image), H/W 사양 마음대로 확장 가능 <br/>
  애플리케이션처럼 마음대로 H/W 조작 가능, 서버 복제
- 구글 orchestration - 쿠버네틱스

<br/>

## **Cloud**

- Cloud Server Hosting 시장 성장
- 80% 이상 외산

<br/>

## **Serverless**

- XaaS
- 서버가 없는 것처럼 느껴짐
- Serviceful Serverless; Firebase (단기적 서비스 반응 보기에 많이 활용)
- FaaS; Amazon Lambda (함수 코딩해서 바로 deploy but, 함수 산재되면 관리 어려움)
- IaaS ex) Naver Cloud
- SaaS ex) Google Docs, GMail (Software를 web을 통해 클라우드에서 제공)
- PaaS

#

### [Note]

- GNU; Gnu is Not Unix!
- RHEL; Red Hat Enterprise Linux
- client 환경은 server와 동일하게 docker로 구성 <br/>
  (server에 docker 또 설치할 필요 X => 메모리 먹어서 느려짐)
- 마이크로 서버; cpu 1장 (무료 서버 - 프로세스 하나 => 쓰레드 이용)
- Shell Script => 노가다 사라짐
- 유능한 개발자; 모듈화 -> 반복 코딩 최소화!
- host OS; 가장 바깥쪽의 OS <br/>
  ex) 윈도우 OS 에서 리눅스 설치 => 윈도우 os가 host os임 <br/>
  H/W에 깔려 있는 OS (host OS)
- on-premise (private 사내용)
- FaaS; Function as a Service

#

### [과제]

1. NCloud 가입 => 결제 수단 등록 `[✔]`
2. PC setting
   - Windows PC: putty 설치 `[✔]`
   - docker 설치 `[✔]`

#

## [Reference]

[Reference](https://www.youtube.com/watch?v=B0ExqP8dVjk&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=10)
