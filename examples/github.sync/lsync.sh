#!/bin/bash

# mv *.eco eco_bak/

#java Repl /home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.doc/doc/1* 2> LOG1
#java Repl /home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.doc/doc/2* 2> LOG2
#java Repl /home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.doc/doc/3* 2> LOG3

java -classpath .:./json_library/json-lib-2.3-jdk15.jar:./json_library/commons-lang-2.6.jar:./json_library/ezmorph-1.0.6.jar:./json_library/commons-logging-1.1.1.jar:./json_library/commons-collections-3.2.1.jar:./json_library/commons-beanutils-1.8.3.jar Repl cornerdoc/1* 2> LOG1
java -classpath .:./json_library/json-lib-2.3-jdk15.jar:./json_library/commons-lang-2.6.jar:./json_library/ezmorph-1.0.6.jar:./json_library/commons-logging-1.1.1.jar:./json_library/commons-collections-3.2.1.jar:./json_library/commons-beanutils-1.8.3.jar Repl cornerdoc/2* 2> LOG2
java -classpath .:./json_library/json-lib-2.3-jdk15.jar:./json_library/commons-lang-2.6.jar:./json_library/ezmorph-1.0.6.jar:./json_library/commons-logging-1.1.1.jar:./json_library/commons-collections-3.2.1.jar:./json_library/commons-beanutils-1.8.3.jar Repl cornerdoc/3* 2> LOG3

rm -rf /home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev/examples/cornerstone.livedoc/src/documents/*.eco
cp *.eco /home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev/examples/cornerstone.livedoc/src/documents/

LIVEDOC_IMG=/home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev/examples/cornerstone.livedoc/src/files/images
cp "/home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev/doc/1. User_Document/images"/* $LIVEDOC_IMG/
cp "/home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev/doc/2. Reference/images"/* $LIVEDOC_IMG/
cp "/home/appadmin/CORNER/git/CornersGithub/cornerstone-framework.dev/doc/3. Runtime/images"/* $LIVEDOC_IMG/


