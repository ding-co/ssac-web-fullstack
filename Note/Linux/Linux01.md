## { linux } 리눅스01 - 리눅스 기초

>

## python, telnet, putty, git 설치

<br>

### _Python_

- apt-get update
- apt-get install python3
- apt-get install python3-pip -y
- cd /usr/bin => mv python3 python
- apt-get install ntp
- cp python python3
- pip3 install requests

### _Putty_

- apt-get install xinetd telentd
- vi /etc/xinetd.d/telnet
- :set paste
- /etc/init.d/xinetd restart
- apt-get install telnet
- apt-get install sudo
- docker start ub2
- docker exec -it ub2 bash
- docker commit ub2 ub_telnet
- docker images
- docker run -itd --name ubt -p 23:23 ub_telnet bash
- cd /usr/bin => vi start_telnet.sh => #!/bin/sh /etc/init.d/xinetd restart
- chmod +x start_telnet.sh
- telnet localhost 23

### _Git (in Putty)_

- apt-get install git
- git config --list
- git config --global user.name [github-username]
- git config --global user.email [github-email]
- git config credential.helper store

#

### [Note]

-

#

### [과제]

#

[Reference](https://www.youtube.com/watch?v=6Sr3e5MEUvI&t=1093s)
