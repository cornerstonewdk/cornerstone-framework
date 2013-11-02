<!--
{
	"title": "음성 녹음 및 재생 - 주요 코드",
	"group": 2,
	"order": 34
}
-->

-----------------------

# 음성 녹음 및 재생 - 주요 코드 #

-----------------------

- Media Capture (Javascript) API
	- 디바이스 마이크를 연동해 오디오를 녹음하고 재생, 일시정지, 정지 기능을 제공합니다.

			var gMedia1;			

			function play() {
				gMedia1.play();
			}
		
			function pause() {
				gMedia1.pause();
			}
		
			function stop() {
				gMedia1.stop();
			}

			function createmediasc(media) {
				gMedia1 = media;
			}

			function captureSuccess(filename) {
				navigator.mediamanager.createAudio(createmediasc, error, filename);
			};

			function captureAudio() {		
				navigator.capture.captureAudio(captureSuccess, captureError, {
					destinationFilename : "file://sdcard/audio/aa.wav",
					highRes : true
				});
			}