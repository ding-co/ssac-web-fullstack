## {풀스택#6} 리눅스(Linux) - Nginx 셋팅 및 무료 HTTPS 인증서 설치

## **도메인 및 HTTPS 설치**

### _EPEL (Extra Package for Enterprise Linux)_

```putty
yum repolist

yum install epel-release -y

nslookup <도메인 이름>
nslookup mydeal.<도메인 이름>
```

```putty
ps -ef | grep nginx

cd /etc/nginx
ll

cat nginx.conf

ps -ef | grep nginx | grep -v grep

kill -9

cat /var/run/nginx.pid

vi /etc/nginx/mime.types

tail -5 /var/log/nginx/access.log

tail -f /var/log/nginx/access.log

curl http://mydeal.ding-co.tk

ll
ll conf.d/
cat conf.d/default.conf
ll /usr/share/nginx/html

vi /usr/share/nginx/html/index.html
vi /usr/share/nginx/html/50x.html

vi conf.d/mydeal.conf

# Server {
#         listen 80;
#         server_name mydeal.ding-co.tk;
#
#         location / {
#                   root   /var/www/mydeal;
#                   index  index.html;
#                   try_files  $uri  /index.html;
#          }
# }

ll /var
mkdir -p /var/www/mydeal
ll /var/www
echo "This is MyDeaL Homepage" > /var/www/mydeal/index.html
nginx -t
systemctl reload nginx
ps -ef | grep nginx | grep -v grep
```

```putty
yum install certbot python2-certbot-nginx -y

# certbot도 80포트 사용하기 때문에 nginx 죽이기
systemctl stop nginx
ps -ef | grep nginx | grep -v grep

# 인증서 max - 90일 이후에는 expired
certbot --standalone -d mydeal.ding-co.tk certonly

<이메일 주소>
y

systemctl stop nginx

vi conf.d/mydeal.conf

# Server {
#         listen 80;
#         server_name mydeal.ding-co.tk;
#
#         location / {
#                   root   /var/www/mydeal;
#                   index  index.html;
#                   try_files  $uri  /index.html;
#          }
#
#          return   301 https://$host$request_uri;
# }

# server {
#    listen 443 ssl http2;
#    listen [::]:443 ssl http2;
#
#    server_name mydeal.ding-co.tk
#
#    ssl_certificate /etc/letsencrypt/live/mydeal.ding-co.tk/fullchain.pem;
#    ssl_certificate_key /etc/letsencrypt/live/mydeal.ding-co.tk/privkey.pem;
#
#    location / {
#         root    /var/www/mydeal;
#         index   index.html;
#         try_files $uri /index.html;
#     }
# }
:wq

certbot --standalone -d mydeal.ding-co.tk certonly

systemctl start nginx
```

```putty
# 자동 인증서 갱신
certbot renew

# 분시일월주
crontab -l

which certbot

crontab -e

# 분마다 돌림
# * * * * * /usr/bin/certbot renew >> /etc/nginx/cert.log 2>&1

ll
while true; do ll; sleep 2; done

tail -f cert.log

# 0 5 1 */2 /usr/bin/certbot renew --force-renew --pre-hook="/usr/bin/systemctl stop nginx" --post-hook="/usr/bin/systemctl start nginx"
```

<br/>

#

### [Note]

- 무료 도메인; freenom
- gabia 도메인 셋팅 영상 참고
- whois (리눅스 명령어)
- SSL
- 좀비 프로세스 (살아있지도 죽어있지도 않은 것) => master을 kill로 죽임
- / (뒤에 index.html 생략됨)
- 304: 변경 안됨 (not modified) <br/>
  301: redirect <br/>
  404: not found <br/>
  500: server error
- gzip on (압축해서 데이터 올라감 - 모바일 네트워크 패킷 비용 줄어듦)
- 슬래시 (어느것이든)
- Ctrl + a: 커서 맨 앞, Ctre + e: 커서 맨 뒤
- proxy_pass
- 도메인 다음 부분 => uri, 전체를 url
- 리액트가 라우터 갖고 있음 (클라이언트쪽에 있음, 서버에 X)
- configuration 수정은 반드시 재시작 필요
- nginx -s reload # nginx로 시작했을 때 사용하는 것
- restart는 프로세스 죽이고 새로 띄움 <br/>
  reload는 마스터 프로세스는 남아있고 메모리만 다시 채우는 것
- let's encrypt 무료, 자동화된 개방형 (안전함)
- 코모도 (유료 인증서)
- 2 (표준 출력 에러)
- &1 (에러 씹음)
- 개발환경 (Local PC), 개발 서버 (Docker), <br/>
  소스 배포 => 스테이징 서버 (Docker/Cloud), # 베타 테스트<br/>
  서비스 서버 (Cloud)

#

[Reference](https://www.youtube.com/watch?v=s788gZ-cNj8&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=15)
