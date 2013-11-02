<!--
{
	"title": "장치 상태 정보 확인 - 주요 코드 5",
	"group": 2,
	"order": 30
}
-->

-----------------------

# 장치 상태 정보 확인 - 주요 코드 5 #

-----------------------

- Device Status API : CellularNetwork
	- 디바이스 CellularNetwork의 mcc, mnc, operatorName 정보를 확인한다.

			function onValueRetrieved10(prop, val) {
				// ... Action code
			}
			function onValueRetrieved11(prop, val) {
				// ... Action code
			}
			function onValueRetrieved12(prop, val) {
				// ... Action code
			}

			function getmccmnc() {		
				var pRef = {};
				pRef.aspect = "CellularNetwork";
				pRef.property = "mcc";
				navigator.devicestatus.getPropertyValue(onValueRetrieved10, errorCallback, pRef);
		
				pRef.aspect = "CellularNetwork";
				pRef.property = "mnc";
				navigator.devicestatus.getPropertyValue(onValueRetrieved11, errorCallback, pRef);
		
				pRef.aspect = "CellularNetwork";
				pRef.property = "operatorName";
				navigator.devicestatus.getPropertyValue(onValueRetrieved12, errrCallback, pRef);
		
			}