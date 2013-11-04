<!--
{
	"title": "장치 상태 정보 확인 - 주요 코드 4",
	"group": 2,
	"order": 29
}
-->

-----------------------

# 장치 상태 정보 확인 - 주요 코드 4 #

-----------------------

- Device Status API : WiFiNetwork
	- 디바이스의 WiFiNetwork 정보를 확인한다.

			function onValueRetrieved9(prop, val) {
				if (val == null) {
					str += '<li>WIFI : OFF</li>';
				} else {
					str += '<li>WIFI : ON</li>';
					str += '<li>SSIS : ' + val + '</li>';
					// ... Action code
				}
			}
		
			function getWifistatus() {
				var pRef = {};		
				pRef.aspect = "WiFiNetwork";
				pRef.property = "ssid";
				navigator.devicestatus.getPropertyValue(onValueRetrieved9, errorCallback, pRef);
			}