#!/bin/bash

### 라이브도큐먼트의 git 루트 디렉토리와 converting 용 디렉토리를 설정한다.
GIT_ROOT=/home/appadmin/CORNER/git/CornersGithub
GIT_DEV=$GIT_ROOT/cornerstone-framework.dev
GIT_DEV_SYNC=$GIT_DEV/examples/github.sync
GIT_DEV_LIVEDOC=$GIT_DEV/examples/cornerstone.livedoc

### 10분 단위로 git pull이 수행되도록 설정한다.
TEN_MIN=60
sleep_interval=$TEN_MIN

AN_HOUR=3600
hourly_reset_cnt=`expr $AN_HOUR \/ $TEN_MIN`

reset_cnt=$hourly_reset_cnt

##################################################
### GIT pull 반복 수행 용 루프 와 초기 세팅 값!!!
##################################################
cnt=0
hcnt=0

echo "----------------------SYNC START-------------------------";
echo;

while [ 1 ] 
do


if [ $cnt = $reset_cnt ]
then
cnt=0
hcnt=`expr $hcnt + 1`;
fi

cnt=`expr $cnt + 1`;

### git pull 수행
echo "1. [ DEV branch pulling ... ]";
cd $GIT_DEV
echo CURRENT DIR = [ `pwd` ]; echo;
git pull;
echo;

echo "2. [ doc to Livedoc : converting ... ]";
cd $GIT_DEV_SYNC
echo CURRENT DIR = [ `pwd` ]; echo;
lsync.sh
#ls -l
echo;

echo "3. [ Livedoc : generating ... ]";
cd $GIT_DEV_LIVEDOC
echo CURRENT DIR = [ `pwd` ]; echo;
#docpad generate
#rm -rf out_mid
#cp -r out out_mid
echo;

echo Execute GIT pull '(count = '$cnt', hour = '$hcnt')';

sleep $sleep_interval

echo;

done


