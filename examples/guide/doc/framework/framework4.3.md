<!--
{
	"title": "콜렉션",
	"group": 1,
	"order": 13
}
-->

-----------------------

# 콜렉션  #

-----------------------

**- Collection은 Model의 정렬된 집합**  
**- Backbone.Collection을 extend해서 새로운 Collection을 정의**

	var Users = Backbone.Collection.extend( { model: User } );

	// 빈 Collection 객체 생성
	var users1 = new Users();

	// Model들을 추가해서 Collection 생성
	var users2 = new Users( [ user1, user2, user3 ] );

	// 객체를 추가해서 Collection 생성, 각 객체는 User Model로 변환되어 추가된다.
	var users3 = new Users( [
		{ name: ‘홍길동’, age: 40 },
		{ name: ‘김철수’, age: 35 },
		{ name: ‘이영수’, age: 20 }
	] );

참고 : <http://cornerstone.sktelecom.com/livedoc/2_06_collection.html>
