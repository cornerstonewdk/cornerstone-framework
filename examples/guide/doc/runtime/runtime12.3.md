<!--
{
	"title": "장치 상태 정보 확인 - 주요 코드 2",
	"group": 2,
	"order": 27
}
-->

-----------------------

# 장치 상태 정보 확인 - 주요 코드 2 #

-----------------------

- Device Status API : Device
	- 디바이스의 Android Version, 모델명, imei 정보를 얻는다.

			function onValueRetrieved4(prop, val) {
				// ... Action code
			}
			function onValueRetrieved5(prop, val) {
				// ... Action code
			}
			function onValueRetrieved6(prop, val) {
				// ... Action code
			}

			function getAndroidVersion() {
				var pRef = {};		
				pRef.aspect = "Device";
				pRef.property = "version";
				navigator.devicestatus.getPropertyValue(onValueRetrieved4, errorCallback, pRef);
		
				pRef.aspect = "Device";
				pRef.property = "model";
				navigator.devicestatus.getPropertyValue(onValueRetrieved5, errorCallback, pRef);
		
				pRef.aspect = "Device";
				pRef.property = "imei";
				navigator.devicestatus.getPropertyValue(onValueRetrieved6, errorCallback, pRef);
			}
