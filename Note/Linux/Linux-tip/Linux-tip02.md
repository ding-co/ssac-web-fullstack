## {Tip&Tech - linux} 셸 스크립트를 시스템 명령으로 등록하기

## **만들어진 쉘 스크립트를 시스템 명령으로 등록하기**

```
# 방법 1) alias 이용하는 방식

# .bashrc 또는 .bash_profile에 alias 걸기

vi .bash_profile

alias datefmt='/root/bin/datefmt2.sh'

:wq

. .bash_profile

datefmt -d 10 -u month

vi /bin/datefmt2.sh

datefmt2.sh -> datefmt 로 수정

# echo "opt=$opt, OPTARG=$OPTARG

:wq

datefmt -h

# 사용자 계정 변경
su - ding-co

# command not found
# root에만 적용되고 다른 사용자는 적용이 안됨
datefmt

exit
```

```
# 방법 2) 시스템 명령어로 등록
# Centos 에서 /sbin -> /usr/sbin 이고 /bin -> /usr/bin (symbolic link)
# bin은 일반적인 리눅스 명령어
# sbin은 시스템 관련 명령어

ll /sbin

ll /usr/sbin

ll /usr/bin

ll /usr/bin | more

ll /usr/sbin | more

# 시스템 관리를 위한 것이면 sbin, 이외는 bin

# 위의 2곳에 명령어 넣으면 위험해서
# 사용자가 만든 명령어는 일반적으로 /usr/local/bin 이나 /usr/local/sbin 에 걸음

# 아예 옮기는 건 조금 위험함
# mv /root/bin/datefmt3.sh /usr/local/bin/datef

# 쉘 스크립트들도 깃에 보관함
# 소스 관리를 위해서 소스는 그대로 두고 symbolic link를 걸음

cd /usr/local/bin

ll

ln -s /root/bin/datefmt3.sh datef
datef

datef -h

datef --help

vi ~/bin/datefmt3.sh

datefmt3.sh -> datef 로 2개 수정

:wq

datef -h

datef -d 100 -u day -f +%m-%d

datef -d -100 -u month -f +%m-%d

datef -d 100 -u hour -f +%m-%d

su - ding-co

whoami

datef --help

echo $PATH

ll

ll /usr/local/bin

exit

ll /usr/local/bin

chmod +x .

su - ding-co

datef

datef --help

datef -d 30 -u month

exit

ll | more

ll /

# root dir 실행권한만 줌
```

#

### [Note]

- 권한; 자신 - 그룹 - 그외

#

[Reference](https://www.youtube.com/watch?v=7RgsqcgY4S4&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=24)
