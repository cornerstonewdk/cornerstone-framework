#!/bin/bash

echo "=======================================================================================";
echo "=================== LiveDocument MD to ECO Transformation START =======================";
echo "=======================================================================================";
echo;

echo "1. Livedoc Markdown to ECO ...";
cd ../github.sync
EXAMPLES=..
ROOT=$EXAMPLES/..
DOC=$ROOT/doc
LIVEDOC=$EXAMPLES/cornerstone.livedoc
LIVEDOC_DOCUMENTS=$LIVEDOC/src/documents
LIVEDOC_FILES_IMAGES=$LIVEDOC/src/files/images
LIVEDOC_FILES_SAMPLE=$LIVEDOC/src/files/sample
echo "    "CURRENT DIR = [ `pwd` ];
echo;

CLASSPATH=.:./json_library/json-lib-2.3-jdk15.jar:./json_library/commons-lang-2.6.jar:./json_library/ezmorph-1.0.6.jar:./json_library/commons-logging-1.1.1.jar:./json_library/commons-collections-3.2.1.jar:./json_library/commons-beanutils-1.8.3.jar

rm -rf *.eco
java -classpath $CLASSPATH Repl $DOC/1* 2> LOG1.log
java -classpath $CLASSPATH Repl $DOC/2* 2> LOG2.log
java -classpath $CLASSPATH Repl $DOC/3* 2> LOG3.log

rm -rf $LIVEDOC_DOCUMENTS/*.eco
cp *.eco $LIVEDOC_DOCUMENTS/


cp $DOC/"1. User_Document/images"/*  $LIVEDOC_FILES_IMAGES/
cp $DOC/"2. Reference/images"/*      $LIVEDOC_FILES_IMAGES/
cp $DOC/"3. Runtime/images"/*        $LIVEDOC_FILES_IMAGES/
cp $DOC/"3. Runtime/sample"/*        $LIVEDOC_FILES_SAMPLE/
echo;

echo "=======================================================================================";
echo "==================== LiveDocument MD to ECO Transformation END ========================";
echo "=======================================================================================";
echo;
echo;
echo;
echo "---------------------------------------------------------------------------------------";
echo "--------------------------- LiveDocument Generation START -----------------------------";
echo "---------------------------------------------------------------------------------------";
echo;

echo "2. Livedoc generating...";
cd $LIVEDOC
echo "    "CURRENT DIR = [ `pwd` ];
echo;
docpad generate
rm -rf out_public
cp -r out out_public
echo;

echo "---------------------------------------------------------------------------------------";
echo "---------------------------- LiveDocument Generation END ------------------------------";
echo "---------------------------------------------------------------------------------------";
echo;

