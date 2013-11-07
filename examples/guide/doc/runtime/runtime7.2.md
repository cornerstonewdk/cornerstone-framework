<!--
{
	"title": "나침반 및 기울계 - 주요 코드",
	"group": 2,
	"order": 14
}
-->

-----------------------

# 나침반 및 기울계 - 주요 코드 #

-----------------------

- Orientation API
	- window에 deviceorientation 속성의 addEventListener를 등록한 후 콜백 함수를 구현한다.

			function orientationChange(rotation) {
				r = rotation.alpha;
				g = rotation.beta;
				b = rotation.gamma;
				// ... Action code
			}
	
		    function onDeviceReady() {
				window.addEventListener("deviceorientation", orientationChange, true);
			}

			function init() {
				document.addEventListener("deviceready", onDeviceReady, false);
			}