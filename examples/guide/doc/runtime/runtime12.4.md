<!--
{
	"title": "장치 상태 정보 확인 - 주요 코드 3",
	"group": 2,
	"order": 28
}
-->

-----------------------

# 장치 상태 정보 확인 - 주요 코드 3 #

-----------------------

- Device Status API : OperatingSystem
	- 디바이스의 OS 정보 중 현재 설정된 언어 정보를 확인한다.

			function onValueRetrieved7(prop, val) {
				if (val == "KR") {
					// ... Action code
				} else if (val == "US") {
					// ... Action code
				} else {
					// ... Action code
				}
			}
		
			function getlanguage() {
				var pRef = {};		
				pRef.aspect = "OperatingSystem";
				pRef.property = "language";
				navigator.devicestatus.getPropertyValue(onValueRetrieved7, errorCallback, pRef);
			}
