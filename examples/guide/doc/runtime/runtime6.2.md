<!--
{
	"title": "개발 실습 1 - Source. ",
	"group": 2,
	"order": 17
}
-->

-----------------------

## 개발 실습 1 - Source.  ##

-----------------------
- 카메라 캡쳐 후 MMS 전송  
	
		function captureSuccess(filename) {
		
			console.log("Captured Image path:" + filename);
		
			var msg = navigator.messaging.createMessage(Messaging.TYPE_MMS);
		
			var imagefile1 = new FileEntry("testpicture.png","file://mnt/sdcard/testdirectory/testpicture.png");
		
			msg.to = ["01012341234"];
			msg.body = "test body is long.";
			msg.attachments = [imagefile1];

			try {
				var reval = navigator.messaging.sendMessage(function sc(){}, function ec(err){alert(err.message);}, msg);
			} catch (e) {
				alert(e);
			}	
		}

		function captureError(err) {
			alert(err.message);
		}

		navigator.capture.captureImage(captureSuccess, captureError, 
									  { destinationFilename : "file://mnt/sdcard/testdirectory/testpicture.png" });


 









