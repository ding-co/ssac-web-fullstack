## {풀스택#5} 리눅스(Linux) - Linux CentOS7에 MySQL8 설치

## **서버 패키지 설치 (서비스 서버 환경 구축)**

- [RPM Package](https://dev.mysql.com/downloads/repo/yum/)
- Red Hat Enterprise Linux 7 / Oracle Linux 7 <br/>
  (Architecture Independent), RPM Package 먼저 설치
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- RHEL 7 / x86_64-bit
- RPM Package, MySQL Server [download]
- 다운로드 링크 주소 복사 (RPM repository 링크 주소 복사)
- Putty

```putty
uname -a  // x86_64 확인

yum localinstall <복사한 링크 주소>

vi /etc/my.cnf
```

<br/>

#

### [Note]

- Red hat Enterprise linux ~= CentOS
- mydeal; 호스트 명
- GNU/Linux
- RPM
- Oracle 계정 필요
- yum이 RPM 찾아서 dependency 설치
-

#

## [Reference]

[Reference](https://www.youtube.com/watch?v=dJU7VARhCqE&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=14)
