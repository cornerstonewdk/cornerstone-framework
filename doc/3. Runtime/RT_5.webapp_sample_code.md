<!--
{
	"id": 6800 ,
	"title": "하이브리드앱 샘플코드",
	"outline": "Cornerstone Runtime을 이용한 Runtime Java Script API Sample Code를 제공한다.",
	"tags" : ["runtime"],
	"order": [6, 8],
	"thumbnail": "6.5.00.sample.png"
}
-->

-----------------------

# 하이브리드앱 샘플코드 

----------------------

- 아래 링크를 통해 Cornerstone Runtime에서 제공하는 Java Script API 목록을 확인 할 수 있다.  

	[./sample/spechtmls.zip](./sample/spechtmls.zip "Runtime DeviceAPI Spec Table")

- 아래 링크를 통해 Cornerstone Runtime에서 제공하는 Java Script API 예제를 확인 할 수 있다. 

	[./sample/sample.zip](./sample/sample.zip "Runtime DeviceAPI Sample")

	> example 1. Java Script Library가 정상적으로 Load 되었는지 확인하는 Sample (event_sample.html)

		function onDeviceReady(){
			console.log("deviceready");
			//use some deviceAPIs
		}

		document.addEventListener("deviceready", onDeviceReady, false);

	> example 2. WIFI가 현재 연결되었는지를 판단하는 Sample (deviceStatus_sample.html) 

		function validSuccessCalback_DS(prop,value) {
			alert("The aspect::" + prop.aspect + "  property::" + prop.property + " is " + value);
			if(value == "undefined")
				alert("현재 wifi로 연결 되어 있지 않음");
		}

		function validErrorCallback_DS(response){
			alert("다음 error: " +  response.message + ", 발생");
		}

		navigator.devicestatus.getPropertyValue(validSuccessCalback_DS ,validErrorCallback_DS ,{aspect:"WiFiNetwork", property:"ssid"});

	> example 3. Native Camera App을 연동하여 사진을 찍는 Sample (captureapi_sample.html)
		
		function captureSuccess(filename) {
			console.log("Captured Image path:" + filename);
			var imgDest = document.getElementById("captureimg");
			imgDest.setAttribute("src", filename + "?" + new Date().getTime());
		}

		function captureError(err) {
			console.log(err.message);
		}

		// start Image capture
		navigator.capture.captureImage(captureSuccess, captureError, {destinationFilename : "file://sdcard/skruntimetest/test.png"});

	> example 4. Battery 충전 유무가 변경 되었을 때 이를 하이브리드앱에 공지하는 Sample (battery_sample.html)

		function onBatteryStatus() {
			alert("navigator.battery.charging = " + navigator.battery.charging);
			alert("navigator.battery.level = " + navigator.battery.level);
		}
	
		navigator.battery.addEventListener("chargingchange", onBatteryStatus,false);

	> example 5. Native Calendar에 특정 Event를 추가하는 Sample (calendar_sample.html)

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

	> example 6. Device SDcard에 저장되어 있는 Audio 파일을 재생하는 Sample (media_sample.html)

		function createmediasc (media) {
		    gMedia2.play();
		}

		function error (err) {
		    // do something with resulting error
		    alert(err.message);
		}

		navigator.mediamanager.createAudio(createmediasc,error,"file:///sdcard/Music/test2.mp3");

	> example 7. Email를 송신 하는 Sample (messaging_sample.html) 

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
		
	> example 8. 현재 가속도 정보가 변화 될때 마다 하이브리드앱에 통지 하는 Sample

		function acceleration_handler(event) {
			console.log("accelerationIncludingGravity.x = " + event.accelerationIncludingGravity.x +
			"\n accelerationIncludingGravity.y = " + event.accelerationIncludingGravity.y +
			"\n accelerationIncludingGravity.z = " + event.accelerationIncludingGravity.z);
		}
		window.addEventListener("devicemotion",acceleration_handler , true);

	> example 9. Device의 pause , resume 상태를 하이브리드앱에 통지 하는 sample (event_sample.html) 

		function onPause(){
			console.log("onPause");
		}

		function onResume(){
			console.log("onResume");
		}

		document.addEventListener("pause", onPause, false);
		document.addEventListener("resume", onResume, false);

	> example 10. Device의 진동을 실행하는 Sample (vibrator_sample.html)

		function vibratetime(){
			//2 second
			navigator.vibrate(2000);
		}
		function vibratepattern(){
			//use pattern
			navigator.vibrate([500,30,1000]);
		}

	> example 11. 하이브리드앱을 종료하는 Sample (deviceInteraction_sample.html) 

		 navigator.deviceinteraction.exitApp(); //only Android

	> example 12. 물리 메뉴버튼을 사용하였을 경우 Menu를 추가/삭제/이벤트를 등록하는 Sample (menu_sample.html)

			- 사용자 정의 메뉴를 특정 페이지에서 생성 하였을 경우 페이지를 빠져 나갈시 removeAll()을 반드시 호출하여야 한다.

        function MenuCallback1(){
			alert("menu1 button click");
		}
		function addMenu(){
			navigator.menumanager.addMenu("menu1",MenuCallback1);
		}
		function removeMenu(){
			navigator.menumanager.removeMenu("menu1");
		}
		function removeAll(){
			//개발자 custom 추가메뉴를 모두 삭제한다. 
			navigator.menumanager.removeAll();
		}

	> example 13. 물리 메뉴버튼을 사용하였을 경우 Default Menu를 삭제/삽입 하는 Sample (menu_sample.html)

		navigator.menumanager.removeMenu("OPENBROWSER");   // 브라우져로 열기 메뉴 삭제
		navigator.menumanager.removeMenu("REFRESH");       // 새로고침 메뉴 삭제 
		navigator.menumanager.removeMenu("EXITAPP");       // 하이브리드앱 종료 메뉴 삭제 

		navigator.menumanager.addMenu ("OPENBROWSER");   // 브라우져로 열기 메뉴 삽입
		navigator.menumanager.addMenu ("REFRESH");       // 새로고침 메뉴 삽입
		navigator.menumanager.addMenu ("EXITAPP");       // 하이브리드앱 종료 메뉴 삽입

	> example 14. NFC TAG를 읽고 하이브리드앱에 이를 통지하는 Sample (nfc_sample.html) 

		function readTagCallback(obj){
			alert(obj.tag);
		}

		function setNFCUseTrue(){
			if(navigator.nfc.isNFCSupport()){
		  		navigator.nfc.setNFCUse(true);
			}
			navigator.nfc.setReadTagCallback(readTagCallback);
		}

		function setNFCUseFalse(){
			navigator.nfc.setNFCUse(false);
		}

    > example 15. NFC TAG와 connection 후에 특정 data를 I/O하는 Sample (nfc_sample.html) 

		function transceiveCallback(tag){
			alert("tagtype::" + tag.type + " tag.transceive:::" + tag.transceive);
		}
		function testSC(tag){
			alert("tagtype::" + tag.type + " tag.transceive:::" + tag.transceive[0]);
			if(tag.transceive[0] == "6F060102030405069000"){
			navigator.nfc.transceive(transceiveCallback,transceiveErrorCallback,["00CA000005"]);
			}
		}
		function transceiveErrorCallback(e){
			alert(e);	
		}

		function Select_Test_Applet(){
			navigator.nfc.transceive(testSC,transceiveErrorCallback,
							  [
	                          "00A4040006112233445566", //IsoDep
	                          ]);
		}
