<!--
{
	"title": "사진 촬영 및 보기 - 주요 코드 1",
	"group": 2,
	"order": 20
}
-->

-----------------------

# 사진 촬영 및 보기 - 주요 코드 1 #

-----------------------

- Media Capture (javascript) API : 사진 촬영
	- 디바이스 카메라를 연동해 사진을 찍는다. 촬영된 사진의 경로가 콜백 함수의 인자로 넘어간다.

			function startCapture() {
				var imgnamepath = "file://mnt/sdcard/cornerstone/test.png";
		
				navigator.capture.captureImage(captureSuccess, captureError, {
					destinationFilename : imgnamepath,
					highRes : true
				});
			}

			function captureSuccess(filename) {
				// ... Action code
			};