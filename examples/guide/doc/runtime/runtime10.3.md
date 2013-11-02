<!--
{
	"title": "사진 촬영 및 보기 - 주요 코드 2",
	"group": 2,
	"order": 21
}
-->

-----------------------

# 사진 촬영 및 보기 - 주요 코드 2 #

-----------------------

- Media Capture (javascript) API & File API : 사진 보기
	- Device Filesystem을 요청한 후 사진들이 저장된 디렉토리를 resolve하여 Entry들을 읽어온다.

			function gallerylistsuccess(entries) {
				// ... Action code
			}
	
			function onResolveSuccess(fileEntry) {
				var directoryReader = fileEntry.createReader();
				directoryReader.readEntries(gallerylistsuccess, fail);
			}
		
			function onFileSystemSuccess(fileSystem) {
				window.resolveLocalFileSystemURI("file://mnt/sdcard/cornerstone", onResolveSuccess, fail);
			}
		
			function init() {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
			}
		
			document.addEventListener("deviceready", init, false);