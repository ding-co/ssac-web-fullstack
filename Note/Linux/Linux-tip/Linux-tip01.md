## {Tip&Tech - linux} getopts, getopt - 셸 스크립트에 프로다운 우아한 옵션 주기

## **쉘 스크립트에 우아한 실행 옵션 주기**

```
# ncloud

# 옵션 없이
ls

# -al 이 옵션임
ls -al

# full text로 긴 옵션
ls --help

ls --all

# -l는 list
ls --all -l

# human readable
ls -all -lh

cd bin

clear

date

# date 뒤에도 옵션임 (format)
date +%Y-%m-%d


# linux sh -> 기본적으로 bash shell
which sh
ll /usr/bin/sh

vi datefmt1.sh

#!/bin.sh로 해도 됨. 기본적으로 bash로 인식함
#!/bin/bash

echo "#=$#, 1=$1, 2=$2"

:wq

ll

sh datefmt1.sh

chmod +x datefmt1.sh

ll

./datefmt1.sh aaa bbbb

!vi

#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: ./datafmt1.sh <diffs> <unit> [format]"
    exit 1
fi

D=$1
U=$2

if [ $# -gt 2 ]; then
  F=$3
else
  F='+%Y-%m-%d'
fi

RET=`date $F --date="$D $U"`
echo "$RET"

:wq

./datefmt1.sh

# 3일 후, format 생략
./datefmt1.sh 3 day

# 3일 후, format 지정
./datefmt1.sh 3 day +%m-%d

# 3달 후, format 지정
./datefmt1.sh 3 month +%m-%d

# 3달 전, format 지정
./datefmt1.sh -3 month +%m-%d

cat datefmt1.sh
```

### _`getopts`_

- 짧은 옵션

```
# getopts
# option_string(뒤에 콜론 있으면 값을 받음) varname
# varname은 옵션명 받을 변수, OPTARG 변수에는 실제 옵션 값 세팅됨

# h 뒤에는 콜론이 없으므로 값이 없다는 것임
# d:u:f:h

vi datefmt2.sh

#!/bin/bash

print_try() {
    echo "Try 'datefmt2.sh -h' for more information"
    exit 1
}

print_help() {
    echo "usage: datefmt2.sh -d <diffs> -u <unit> [-f format]"
    exit 1
}

# 옵션 정의 후 변수에 담음
while getopts d:u:f:h opt
do
    echo "opt=$opt"
done

:wq

chmod +x datefmt2.sh

# -- x 정의되지 않은 옵션이라고 나옴
./datefmt2.sh -d 3 -u day -f +%m-%d -h -x

!vi

#!/bin/bash

print_try() {
    echo "Try 'datefmt2.sh -h' for more information"
    exit 1
}

print_help() {
    echo "usage: datefmt2.sh -d <diffs> -u <unit> [-f format]"
    exit 1
}

# 옵션 정의 후 변수에 담음
while getopts d:u:f:h opt
do
    echo "opt=$opt, OPTARG=$OPTARG"
done

:wq

!vi

#!/bin/bash

print_try() {
    echo "Try 'datefmt2.sh -h' for more information"
    exit 1
}

print_help() {
    echo "usage: datefmt2.sh -d <diffs> -u <unit> [-f format]"
    exit 1
}

# 옵션 정의 후 변수에 담음
while getopts d:u:f:h opt
do
    echo "opt=$opt, OPTARG=$OPTARG"
    case $opt in
        d)
          D=$OPTARG;;
        u)
          U=$OPTARG;;
        f)
          F=$OPTARG;;
        h)
          print_help;;
        *)
          print_try;;
    esac
done

RET=`date $F --date="$D $U"`
echo "$RET"

:wq

./datefmt2.sh -d 3 -u day -f +%m-%d -h -x

./datefmt2.sh -d 3 -u day -f +%m-%d

./datefmt2.sh -d 3 -u day -f +%Y-%m-%d

./datefmt2.sh -d 3 -u month -f +%Y-%m-%d

./datefmt2.sh -d 3 -u month

!vi

#!/bin/bash

print_try() {
    echo "Try 'datefmt2.sh -h' for more information"
    exit 1
}

print_help() {
    echo "usage: datefmt2.sh -d <diffs> -u <unit> [-f format]"
    exit 1
}

# 옵션 정의 후 변수에 담음
while getopts d:u:f:h opt
do
    echo "opt=$opt, OPTARG=$OPTARG"
    case $opt in
        d)
          D=$OPTARG;;
        u)
          U=$OPTARG;;
        f)
          F=$OPTARG;;
        h)
          print_help;;
        *)
          print_try;;
    esac
done

# if [ "$F" = "" ]; then
if [ -z $F ]; then
    F="+%m-%d"
fi

RET=`date $F --date="$D $U"`
echo "$RET"

:wq

./datefmt2.sh -d 3 -u month
```

### _`getopt`_

- 짧은 옵션, 긴 옵션

```
# getopt
# -o (--options) -l (--longoptions)
# 짧은 옵션, 긴 옵션 (긴 옵션은 콤마로 구분)
# 옵션의 끝이다 라고 마지막에 -- 나옴

# set (- 붙으면 옵션이라 생각해서 먹힘 => -- 사용)
# set을 쓰면 결과 string을 다 자동으로 쪼개줌

# set -- -a -b c d
# echo $1

# set $(date)
# echo $4


# 권한도 그대로 넘어옴
cp datefmt2.sh datefmt3.sh

vi datefmt3.sh

#!/bin/bash

print_try() {
    echo "Try 'datefmt3.sh -h|--help' for more information"
    exit 1
}

print_help() {
    echo "usage: datefmt3.sh -d|--diffs <diffs> -u|--unit <unit> [-f|--format format]"
    exit 1
}

# -n $0 생략 가능
options="$(getopt -o d:u:f:h -l diffs:,unit:,format:,help -- "$@")"

# eval은 문자열을 명령처럼 인식, set은 다 잘라줘
# --은 앞에 - 와도 무시하고 다 잘라줘
eval set -- $options
echo "@=$@"
echo "1=$1, 2=$2, 3=$3"
exit 1

while true
do
    echo "opt=$opt, OPTARG=$OPTARG"
    case $opt in
        d)
          D=$OPTARG;;
        u)
          U=$OPTARG;;
        f)
          F=$OPTARG;;
        h)
          print_help;;
        *)
          print_try;;
    esac
done

# if [ "$F" = "" ]; then
if [ -z $F ]; then
    F="+%m-%d"
fi

RET=`date $F --date="$D $U"`
echo "$RET"

:wq

./datefmt3.sh -d 3 --unit month --format +%m-%d

!vi

#!/bin/bash

print_try() {
    echo "Try 'datefmt3.sh -h|--help' for more information"
    exit 1
}

print_help() {
    echo "usage: datefmt3.sh -d|--diffs <diffs> -u|--unit <unit> [-f|--format format]"
    exit 1
}

options="$(getopt -o d:u:f:h -l diffs:,unit:,format:,help -- "$@")"
eval set -- $options

# 값이 있는건 shift 2, 값이 없는건 shift 1
while true
do
    # echo "$1, $2    [$@]"
    case $1 in
        -d|--diffs)
          D=$2
          shift 2;;
        -u|--unit)
          U=$2
          shift 2;;
        -f|--format)
          F=$2
          shift 2;;
        -h|--help)
          print_help;;
        --)
          break;;
        *)
          print_try;;
    esac
done

RET=`date $F --date="$D $U"`
echo "$RET"

:wq

./datefmt3.sh -d 3 --unit month --format +%m-%d

./datefmt3.sh -d 3 --unit month --format +%Y-%m-%d

./datefmt3.sh -d 3 --unit month -f +%m-%d

./datefmt3.sh -d 3 -u month --format +%m-%d

./datefmt3.sh --diffs 3 --unit month --format +%m-%d

./datefmt3.sh --diffs 100 --unit month --format +%m-%d
```

#

### [Note]

- 쉘 스크립트 쓸 때 single quote 말고 double quote 권장

#

[Reference](https://www.youtube.com/watch?v=DS3PV1q3dwU&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh&index=23)
