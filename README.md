Cornerstone Framework
===================

소개
---
Cornerstone Framework은 모바일 및 데스크탑 환경에서 동작하는 고품질의 웹 페이지 또는 웹 앱을 제작할 수 있는 Client-side Framework이다.

디렉토리 구조
-----------

	--- dist
	 +- test
	 +- lib
	 +- build
	 +- examples --- tetris-together
	 |            +- 미정
	 +- src --- mvc
	 |       +- ui
	 |       +- misc
	 +- doc --- 1. User_Document --- images
	         +- 2. Reference ------- images

* src : Framework 소스 코드들을 보관
* lib : Framework이 의존하는 Open Source 제품들을 보관
* test : Framework의 동작, 성능을 검증하기 위한 코드들을 보관
* dist : Framework의 가공된(minified, optimized) 배포판들을 보관
* build : Framework을 빌드(src, lib를 가공해서 dist로 배포하는 작업)하는 코드를 보관
* doc : Framework의 가이드 문서를 보관
* examples : Framework의 예제 애플리케이션의 코드들을 보관

브랜치는 다음과 같은 용도로 사용한다.

* master : 외부에 노출 가능한 완성본 (Release branch)
* dev : 내부 개발시에 사용

COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
