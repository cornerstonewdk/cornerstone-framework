<!--
{
	"title": "이미지 배경화면 지정 - 주요 코드 1",
	"group": 2,
	"order": 23
}
-->

-----------------------

# 이미지 배경화면 지정 - 주요 코드 1 #

-----------------------

- File API : 사진 보기
	- 디바이스에 저장된 사진들이 있는 디렉토리에 접근해 Entry들을 가져온다.

			function gallerylistsuccess(entries) {
				// ... Action code
			}

			function onFileSystemSuccess(fileSystem) {
				window.resolveLocalFileSystemURI("file://mnt/sdcard/cornerstone", onResolveSuccess, fail);
			}
		
			function fail(error) {
				alert(error.code);
			}
		
			function onResolveSuccess(fileEntry) {		
				var directoryReader = fileEntry.createReader();
				directoryReader.readEntries(gallerylistsuccess, fail);
			}
		
			function init() {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
		
			}
		
			document.addEventListener("deviceready", init, false);