<!--
{
	"title": "현재 위치 주소 조회 - 주요 코드",
	"group": 2,
	"order": 18
}
-->

-----------------------

# 현재 위치 주소 조회 - 주요 코드 #

-----------------------

- Geolocation API
	- Geolocation을 사용해 디바이스로부터 현재의 위치 정보를 얻어 콜백 함수에서 사용한다.

			function getCurrentAddress() {
				navigator.geolocation.getCurrentPosition(successCallback,errorCallback, 
											{
												maximumAge : 600000
											});
			}
		
			function successCallback(position) {
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				pushDebugMessage("#2. 현재 위치 확인, 위도 : " + lat + ", 경도 : " + lon);
				// ... Action code
			}