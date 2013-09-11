<!--
{
	"title": "개발 실습 2 - Source. ",
	"group": 2,
	"order": 18
}
-->

-----------------------

## 개발 실습 2 - Source.  ##

-----------------------
- Contact를 Device에 추가하기 


		function errorCallback(response) {
			alert("The following error occurred: " + response.code);
		}

		function contactAddedCB(contact) {
			alert("Contact Added with phonenumber = "
				+ contact.phoneNumbers[0].value + " id = " + contact.id);
		}

		var contact = navigator.contacts.create({
			displayName : '아무개',
			emails : [{value : 'user@domain.com' , type : 'work'}],
			phoneNumbers : [{value : '01012345678' , type : 'mobile'} , {value : '03212454545',type :'home'}]});

		navigator.contacts.add(contactAddedCB, errorCallback, contact);


 









