<!--
{
	"title": "개발 실습 3 - Source. ",
	"group": 2,
	"order": 21
}
-->

-----------------------

## 개발 실습 3 - Source.  ##

-----------------------
- 사용자 정의 menu 추가 하기 
  
		function MenuCallback(){
			alert("menu1 button click");
		}

		navigator.menumanager.addMenu("menu1" , MenuCallback);

- 사용자 정의 menu 삭제 하기 

 		navigator.menumanager.removeMenu("menu1");
		navigator.menumanager.removeAll();









