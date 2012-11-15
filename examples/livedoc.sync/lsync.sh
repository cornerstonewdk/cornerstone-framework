#!/bin/bash

# 코드미러 삽입 프로그램 Repl.java를 컴파일 한다.
javac Repl.java

# 변환할 Markdown 문서가 들어있는 디렉토리를 인수로 지정하여 실행한다.

MARKDOWN_DIR=/home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.doc

java Repl $MARKDOWN_DIR/doc/1* 2> LOG1
java Repl $MARKDOWN_DIR/doc/2* 2> LOG2
java Repl $MARKDOWN_DIR/doc/3* 2> LOG3

# 프로그램을 실행한 위치에 변환된 파일들이 생성된다. ( *.html.md.eco )
