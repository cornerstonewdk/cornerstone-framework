<!--
{
	"title": "이미지 배경화면 지정 - 주요 코드 2",
	"group": 2,
	"order": 24
}
-->

-----------------------

# 이미지 배경화면 지정 - 주요 코드 2 #

-----------------------

- File API : 배경화면 설정
	- deviceinteraction API의 setWallpaper를 사용해 배경화면으로 설정한다.

			function validSuccessCalback_DI() {
				alert("배경화면이 설정되었습니다.");
			}
		
			function validErrorCallback_DI(e) {
				alert(e.message);
			}
		
			function setBackground() {
				// gSelectImageFile : 선택된 사진 파일의 경로
				navigator.deviceinteraction.setWallpaper(validSuccessCalback_DI,
						validErrorCallback_DI, gSelectImageFile);
			}