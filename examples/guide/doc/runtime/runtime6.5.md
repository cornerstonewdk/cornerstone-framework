<!--
{
	"title": "개발 실습 2 - Source. ",
	"group": 2,
	"order": 20
}
-->

-----------------------

## 개발 실습 2 - Source.  ##

-----------------------
- 특정 Contact를 삭제하기  

		function errorCallback(response) {
			alert("The following error occurred: " + response.code);
		}

		function contacts_success(contacts) {
			alert(contacts.length
					+ ' contacts returned.'
					+  (contacts[0] && contacts[0].displayName ? (' first contact is ' + contacts[0].displayName): ''));

			alert("contact phonnumber is " + contacts[0].phoneNumbers[0].value);

			function removeSC() {
				alert("Contact is removed");
			}
		
			alert("we will remove contact id = " + contacts[0].id )
			navigator.contacts.remove(removeSC , errorCallback, contacts[0].id);
		}

		var obj = new ContactFindOptions();
		obj.filter = "아무개";
		obj.multiple = true; // all contacts returned.

		navigator.contacts.find(["displayName", "phoneNumbers" ], contacts_success, errorCallback, obj);



 









