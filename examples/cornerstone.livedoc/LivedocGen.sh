#!/bin/bash

echo "--------------------- LiveDoc SYNC START ------------------------";
echo;

echo "Livedoc generating...";
echo CURRENT DIR = [ `pwd` ];
echo;
docpad generate
rm -rf out_mid
cp -r out out_mid
echo;

echo "---------------------- LiveDoc SYNC END -------------------------";
echo;

done


