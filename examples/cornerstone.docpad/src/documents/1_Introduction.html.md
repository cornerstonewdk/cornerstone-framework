---
title: "LiveDocument: 1. Introduction"
date: "2012-10-04"
layout: "post"
tags: 'post'
outline: "Framework 사용했을 때 얻을 수 있는 이점들에 대한 설명"
---

# 개요

----------

목표
---
`Framework 사용했을 때 얻을 수 있는 이점들에 대한 설명`

1. 다양한 화면 크기에 대응하는 UI를 쉽게 만들 수 있는 구조와 체계를 제공한다.
2. 서버에 의존하지 않고 클라이언트 코드만으로 높은 사용성을 제공한다.
3. 모바일 환경에서 쾌적한 사용이 가능한 성능을 확보한다.
4. 구조화되고 이해하기 쉬우며 관리하기 좋은 코드를 생성할 수 있는 체계를 제공한다.
5. 각 영역별로 일관되고 통일성 있는 사용 방법을 유지한다.
6. 비즈니스 로직과 관계 없는 코드를 최소화하여 개발 생산성을 향상한다.
7. 제공되는 기능과 스타일을 상황에 맞게 커스터마이징하고 새로운 기능을 추가할 수 있는 체계를 제공한다.

철학	
---
Framework의 철학
- HTML / CSS / JS

원칙	
---
`왜 HTML / CSS / JS로 분류해서 개발하는지에 대한 당위성 및 원칙 규정`

1. 모바일 웹과 데스크탑 웹을 모두 지원한다.
2. MVC Framework 없이도 UI Widget을 활용할 수 있게 한다.
3. 웹의 기본 언어인 HTML(내용) + CSS(스타일) + Javascript(기능)의 구조를 유지한다.

특장점
-----
특별한 장점


의존성
-----

Framework은 직/간접적으로 다음 제품들을 사용한다.

구분 | 제품명 | 역할 | 라이선스
--- | ----- | --- | ------
Helper | RequireJS | 자바스크립트를 모듈로 분리해서 관리할 수 있게 한다. 모듈별로 독자적인 Namespace를 제공하고 의존성을 관리한다. | BSD/MIT
Helper | jQuery | HTML Documenet를 탐색하고 조작하기 편한 방법을 제공한다. | MIT/GPL
Helper | Underscore | Functional Programming을 지원해 Collection/Array의 제어를 쉽게 한다. | MIT
MVC | Backbone | 애플리케이션에서 Model-View-Controller 패턴을 사용할 수 있도록 지원한다. | MIT
UI | Bootstrap | 웹 페이지의 기본 스타일, 레이아웃, Widget들을 제공한다. | Apache v2
UI | Handlebars | HTML Template을 데이터와 제어문들을 사용해 렌더링한다. | MIT
UI | Harvey | Media Query의 상태를 관리하고 Media가 변경되면 알려준다. | MIT
UI Widget | gRaphael | Chart Widget | MIT
UI Widget | DataTables | DataTable Widget | GPLv2/BSD
UI Widget | TinyMCE | Editor Widget | LGPL
UI Widget | MediaElement.js | Video/Audio Player Widget | GPLv2/MIT
UI Widget | MotionCAPTCHA | CAPTCHA Widget | MIT/BSD
UI Widget | jSignature | 서명 Widget | MIT
Network | Socket.io | 애플리케이션이 서버와 실시간 양방향 통신을 할 수 있게 한다. | MIT
Storage | Lawnchair | LocalStorage, IndexedDB, Memory 등 여러 저장소를 동일한 방법으로 사용할 수 있도록 한다. | MIT

구조
---
![](images/architecture.png?raw=true)

동작환경
------
Cornerstone Framework은 다음 브라우저를 지원한다.

* Desktop 브라우저
	* Google Chrome 14 이상
	* Mozilla Firefox 5 이상
	* Apple Safari 5 이상
	* MS Internet Explorer 9 이상
	
		_IE 9에서는 일부 스타일이 다르게 표시될 수 있다._

* Mobile 브라우저
	* iOS 5 이상의 기본 브라우저
	* Android 4.0 (ICS) 이상의 기본 브라우저
