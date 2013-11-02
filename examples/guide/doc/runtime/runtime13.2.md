<!--
{
	"title": "주소록 확인 및 전화 걸기, 메세지 보내기 - 주요 코드",
	"group": 2,
	"order": 32
}
-->

-----------------------

# 주소록 확인 및 전화 걸기, 메세지 보내기 - 주요 코드 #

-----------------------

- Contact API
	- Contacts API를 사용해 단말기에 저장된 주소록을 불러온다.

			function success(contacts) {
				for ( var i in contacts) {
					var n = contacts[i].displayName;
					var n2 = contacts[i].phoneNumbers[0].value;
				}
				// ... Action code
			}
		
			function onDeviceReady_CON() {
				navigator.contacts.find([ "displayName", "phoneNumbers" ], success, error, {});
			}
		
			document.addEventListener("deviceready", onDeviceReady_CON, false);