<!--
{
	"title": "휴대폰 흔들면 진동 - 주요 코드",
	"group": 2,
	"order": 16
}
-->

-----------------------

# 휴대폰 흔들면 진동 - 주요 코드 #

-----------------------

- Accelerometer API
	- devicemotion 속성의 EventListener를 추가하고 콜백 함수에서 기능을 구현한다.

			function successCallback(response) {
			
				var deltaX = Math.abs(x - response.accelerationIncludingGravity.x);
				var deltaY = Math.abs(y - response.accelerationIncludingGravity.y);
				var deltaZ = Math.abs(z - response.accelerationIncludingGravity.z);
				// ... Action code
			}
	
			function watchAcceleration() {
				window.removeEventListener("devicemotion", successCallback, true);
				window.addEventListener("devicemotion", successCallback, true);
			}

- Vibration API
	- 진동이 울리기를 원하는 지점에 아래의 코드를 추가한다.

			navigator.vibrate(1000);// makes the device vibrate during 10 secs