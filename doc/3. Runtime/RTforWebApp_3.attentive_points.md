<!--
layout: 'post'
section: 'Cornerstone Framework'
title: 'Runtime 기본구조 (WebApp)'
outline: '런타임 기본구조 (WebApp)'
date: '2012-11-16'
tagstr: 'runtime'
subsection: 'Runtime for WebApp'
order: '[7, 3]'
-->

----------

# 3. Cornerstone Runtime Android와 iOS 공통 개발시 주의할 점 

----------

## 3.1 Android 와 iOS 차이점
- 안드로이드와 iOS는 개발사, 언어, 구조가 전혀 다른 플랫폼이며 따라서 웹앱 개발시에 상황에 따라 이를 구분해야 하는 경우가 있다.


### 3.1.1 Android/iOS 분기 방법
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


### 3.1.2 iOS 웹앱 개발시 어플 종료 문제

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

----------

# 4. Cornerstone Runtime Sample Code

----------

## 4.1 Cornerstone Runtime을 이용한 Runtime Javascript API sample code

-	아래 링크를 통해 Runtime에서 제공하는 JavaScript API 목록을 확인 할 수 있다.  

	[./sample/spechtmls.zip](./sample/spechtmls.zip "Runtime DeviceAPI Spec Table")

-	아래 링크를 통해 Runtime에서 제공하는 JavaScript API 예제를 확인 할 수 있다. 

	[./sample/sample.zip](./sample/sample.zip "Runtime DeviceAPI Sample")

	> example 1. JavaScript Library가 정상적으로 load 되었는지 확인하는 sample (event_sample.html)

		function onDeviceReady(){
			console.log("deviceready");
			//use some deviceAPIs
		}

		document.addEventListener("deviceready", onDeviceReady, false);

	> example 2. 현재 wifi가 연결되었는지를 판단하는 sample (deviceStatus_sample.html) 

		function validSuccessCalback_DS(prop,value) {
		alert("The aspect::" + prop.aspect + "  property::" + prop.property + " is " + value);
		if(value == "undefined")
			alert("현재 wifi로 연결 되어 있지 않음");
		}

		function validErrorCallback_DS(response){
		alert("다음 error: " +  response.message + ", 발생");
		}

		navigator.devicestatus.getPropertyValue(validSuccessCalback_DS ,validErrorCallback_DS ,{aspect:"WiFiNetwork", property:"ssid"});

	> example 3. camera app을 연동하여 사진을 찍는 sample (captureapi_sample.html)
		
		function captureSuccess(filename) {
			console.log("Captured Image path:" + filename);
			var imgDest = document.getElementById("captureimg");
			imgDest.setAttribute("src", filename + "?" + new Date().getTime());
		}

		function captureError(err) {
			console.log(err.message);
		}

		// start Image capture
		navigator.capture.captureImage(captureSuccess, captureError, 
			{destinationFilename : "file://sdcard/skruntimetest/test.png"});

	> example 4. battery 충전 유무가 변경 되었을 때 이를 웹앱에 공지하는 sample (battery_sample.html)

		function onBatteryStatus() {
		alert("navigator.battery.charging = " + navigator.battery.charging);
		alert("navigator.battery.level = " + navigator.battery.level);
		}
	
		navigator.battery.addEventListener("chargingchange", onBatteryStatus,false);

	> example 5. native calendar에 특정 event를 add 하는 sample (calendar_sample.html)

		function eventAddedCB(event) {
			alert("CalendarEvent Added with description = " + event.description
			+ "\nid = " + event.id + "\nstart = " + event.start);
		}

		var calEvent = navigator.calendar.createEvent({
			description : 'HTML5 Introduction',
			summary : 'HTML5 test ',
			start : '2012-07-19 09:00',
			end : '2012-07-19 12:00',
			recurrence : {
				expires : '2012-08-28',
				frequency : 'weekly',
				interval : 1,
			},
			reminder : '-3600000',
			status : 'tentative',
			location : 'SK bundang'
		});

		navigator.calendar.addEvent(eventAddedCB, errorCallback, calEvent);

	> example 6. Device sdcard에 저장되어 있는 Audio 파일을 재생하는 sample (media_sample.html)

		function createmediasc (media) {
		    gMedia2.play();
		}

		function error (err) {
		    // do something with resulting error
		    alert(err.message);
		}

		navigator.mediamanager.createAudio(createmediasc,error,"file:///sdcard/Music/test2.mp3");

	> example 7. Email를 송신 하는 sample (messaging_sample.html) 

		var msg = navigator.messaging.createMessage(Messaging.TYPE_EMAIL);

		msg.to = [ "test@naver.com", "test2@yahho.co.kr" ];
		msg.cc = [ "test1@naver.com", "www1@yahho.co.kr" ];
		msg.bcc = [ "etetet@naver.com", "hfhfh@yahho.co.kr" ];
		msg.body = "test body";
		msg.subject = "test subject";
		
		var imagefile = new FileEntry("aa.png","file:///sdcard/skruntime/aa.png");
		var imagefile2 = new FileEntry("bbbb.jpg","file:///sdcard/skruntime/bbbb.jpg");

		msg.attachments = [imagefile,imagefile2];
		
		try {
			navigator.messaging.sendMessage(function sc() {alert("SendMail OK");}, 
				function ec(err) {alert(err.message)}, msg);
		} catch (e) {
			alert(e.message);
		}
		
	> example 8. 현재 가속도 정보가 변화 될때 마다 웹앱에 통지 하는 sample

		function acceleration_handler(event) {
			console.log("accelerationIncludingGravity.x = " + event.accelerationIncludingGravity.x +
			"\n accelerationIncludingGravity.y = " + event.accelerationIncludingGravity.y +
			"\n accelerationIncludingGravity.z = " + event.accelerationIncludingGravity.z);
		}
		window.addEventListener("devicemotion",acceleration_handler , true);

	> example 9. Device의 pause , resume 상태를 웹앱에 통지 하는 sample (event_sample.html) 

		function onPause(){
			console.log("onPause");
		}

		function onResume(){
			console.log("onResume");
		}

		document.addEventListener("pause", onPause, false);
		document.addEventListener("resume", onResume, false);

	> example 10. Device의 진동을 실행하는 sample (vibrator_sample.html)

		function vibratetime(){
			//2 second
			navigator.vibrate(2000);
		}
		function vibratepattern(){
			//use pattern
			navigator.vibrate([500,30,1000]);
		}

	> example 11. 웹앱을 종료하는 sample (deviceInteraction_sample.html) 

		 navigator.deviceinteraction.exitApp(); 
