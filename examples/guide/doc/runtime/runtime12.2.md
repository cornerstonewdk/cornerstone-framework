<!--
{
	"title": "장치 상태 정보 확인 - 주요 코드 1",
	"group": 2,
	"order": 26
}
-->

-----------------------

# 장치 상태 정보 확인 - 주요 코드 1 #

-----------------------

- Battery Status API
	- 배터리의 양이 바뀌거나 충전 유무가 바뀔 때 마다 배터리 정보를 이벤트로 전달받는다.

			function onBatteryStatus() {
				if (isNaN(navigator.battery.level)) {
					alert("device not supported");
				} else {
					// ... Action code
				}
			}

			function getbatteryStatus() {		
				navigator.battery.addEventListener("levelchange", onBatteryStatus, false);		
				navigator.battery.addEventListener("chargingchange", onBatteryStatus, false);
			}