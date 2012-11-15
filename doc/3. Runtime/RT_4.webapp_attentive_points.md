<!--
layout: 'post'
section: 'Cornerstone Framework'
title: '웹앱 개발시 주의사항'
outline: '안드로이드와 iOS는 개발사, 언어, 구조가 전혀 다른 플랫폼이며 따라서 웹앱 개발시에 상황에 따라 이를 구분해야 하는 경우가 있다.'
date: '2012-11-16'
tagstr: 'runtime'
subsection: 'Runtime for WebApp'
order: '[6, 4]'
-->

## Android 와 iOS 차이점
- 안드로이드와 iOS는 개발사, 언어, 구조가 전혀 다른 플랫폼이며 따라서 웹앱 개발시에 상황에 따라 이를 구분해야 하는 경우가 있다.


### Android/iOS 분기 방법
1) **device.platform** : Runtime이 로딩되면 해당 변수에 Android 인지 iOS인지가 스트링으로 기록된다.
이를 이용하여 간단히 분기 할 수 있다.

> example code 

		if(device.platform == "Android"){
		// android 처리
		...
		} else {
		// iOS 처리
		...		
		}

2) DeviceStatus 모듈의 **aspect:Device,property:platform**를 이용하면 플랫폼을 알수 있다.

> example code

		var g_platform = null;

		function validSuccessCalback_DS(prop,value) {
			console.log("The aspect::" + prop.aspect + "  property::" + prop.property + " is " + value);
			g_platform = value
		}
		
		navigator.devicestatus.getPropertyValue(validSuccessCalback_DS ,validErrorCallback_DS ,{aspect:"Device", property:"platform"});

3) 위의 device.platform를 포함한 모든 Runtime의 함수/변수는 최초 1회 **deviceready** 이벤트가 불린 뒤부터 사용가능하다. 

> example code

		var g_platform = null;
	    var onSuccess = function(e) {
			g_platform = device.platform
	    }
	
	    document.addEventListener("deviceready", onSuccess, true);


### iOS 웹앱 개발시 어플 종료 문제

1) 안드로이드와는 다르게 iOS 어플들은 애플사의 정책에 따라 어플 종료 개념이 없으며 홈버튼이 이를 대체한다.  
- 관련 링크 : [(애플사는 공식적으로 어플 종료 API를 제공하지 않는다)](https://developer.apple.com/library/ios/#qa/qa2008/qa1561.html)


2) 따라서 하나의 소스로 안드로이드와 iOS를 둘다 지원하는 Cornerstone Runtime의 특성상 안드로이드 웹앱에 종료버튼이 있으면 iOS는 이를 지원하지 않아 문제가 될 수 있다.

3) 해결방법

- 웹앱이 android/ios에 따라 분기를 타서 iOS는 종료버튼을 생성하지 않도록 개발한다.
	- 플랫폼에 따른 분기를 타는 방법은 위의 3.1.1에 설명되어 있다.

<br>

- plugin을 통해 어플 종료 기능을 추가한다.
	- plugin을 통한 Runtime 기능 추가는 forPlugin.md 문서에 자세히 설명되어 있다.
	     종료기능은 네이티브 부분에 'exit(0);' 한줄만 호출하면 기능 구현 가능하나 이는 애플사가 권장하는 방식이 아님 을 밝혀둔다.  

	-	관련 링크 : [CornerStone Runtime일을 이용한 Plugin 확장구조 개발](./forPlugin.html)

<br>
