<!--
{
	"title": "개발 실습 2 - Source. ",
	"group": 2,
	"order": 19
}
-->

-----------------------

## 개발 실습 2 - Source.  ##

-----------------------
- 특정 Contact를 탐색하기 

		function errorCallback(response) {
			alert("The following error occurred: " + response.code);
		}

		function contacts_success(contacts) {
			alert(contacts.length
					+ ' contacts returned.'
					+  (contacts[0] && contacts[0].displayName ? (' first contact is ' + contacts[0].displayName): ''));

			alert("contact phonnumber is " + contacts[0].phoneNumbers[0].value);
		}

		var obj = new ContactFindOptions();
		obj.filter = "아무개";
		obj.multiple = true;    // all contacts returned.
		//obj.multiple = false; // only one contact returned.

		navigator.contacts.find( [ "displayName", "phoneNumbers" ] , contacts_success, errorCallback, obj);



 









