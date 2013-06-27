#!/bin/bash

rm *.eco

CLASSPATH=.:./json_library/json-lib-2.3-jdk15.jar:./json_library/commons-lang-2.6.jar:./json_library/ezmorph-1.0.6.jar:./json_library/commons-logging-1.1.1.jar:./json_library/commons-collections-3.2.1.jar:./json_library/commons-beanutils-1.8.3.jar

DEV=/home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev
DEV_DOC=$DEV/doc

java -classpath $CLASSPATH Repl $DEV_DOC/1* 2> LOG1.log
java -classpath $CLASSPATH Repl $DEV_DOC/2* 2> LOG2.log
java -classpath $CLASSPATH Repl $DEV_DOC/3* 2> LOG3.log

DEV_EXAMPLES=$DEV/examples
LIVEDOC=$DEV_EXAMPLES/cornerstone.livedoc
LIVEDOC_DOCUMENTS=$LIVEDOC/src/documents

rm -rf $LIVEDOC_DOCUMENTS/*.eco
cp *.eco $LIVEDOC_DOCUMENTS/

LIVEDOC_FILES_IMAGES=$LIVEDOC/src/files/images

cp $DEV_DOC/"1. User_Document/images"/*  $LIVEDOC_FILES_IMAGES/
cp $DEV_DOC/"2. Reference/images"/*      $LIVEDOC_FILES_IMAGES/
cp $DEV_DOC/"3. Runtime/images"/*        $LIVEDOC_FILES_IMAGES/


