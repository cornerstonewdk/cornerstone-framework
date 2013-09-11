<!--
{
    "id": "6",
	"title": "개발 실습 주요 Source. ",
	"group": 2,
	"order": 16
}
-->

-----------------------

## 개발 실습 1 - Source.  ##

-----------------------
- 초기 테스트 Directory 만들기 

		function onResolveSuccess(dirEntry) {
			console.log(dirEntry.fullPath);
		
			function success(entry) {
		    	console.log("entry Name: " + entry.name);
			}

			function fail(error) {
		    	alert("Unable to create new directory: " + error.code);
			}

			dirEntry.getDirectory("testdirectory", {create: true, exclusive: false}, success, fail);
		}

		function fail(error) {
			console.log(error.message);
		}

		window.resolveLocalFileSystemURI("file://mnt/sdcard", onResolveSuccess, fail);
		


 









