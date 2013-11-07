<!--
{
	"title": "한 화면에서 멀티페이지 구현하기",
	"group": 1,
	"order": 20
}
-->

-----------------------

# 한 화면에서 멀티페이지 구현하기  #

-----------------------

- **하나의 HTML 문서 내에 여러 페이지 존재**  
- **한번에 하나의 페이지만 화면에 표시**  
- **페이지마다 매핑되는 Fragment identifier가 존재**  
- **화면 전환 효과**
- **useDataAttributes: true 옵션을 사용하면 data- 속성으로 선언 가능**

	var MainRouter = MultipageRouter.extend( {

		pages: {
			‘list-page’: { fragment: [ ‘’, ‘list’ ], el: ‘div#list’, active: ‘list’ },
			‘add-page’: { fragment: ‘add’, el: ‘div#add’, active: ‘add’ },
			‘detail-page’: { fragment: ‘detail/:id’, el: ‘div#detail’, active: ‘detail’ }
		},
		
		list: function() { /* URL이 # 또는 #list로 끝나거나 #이 없는 경우 실행된다. */ },
		add: function() { /* URL이 #add로 끝나면 실행된다. */ },
		detail: function( id ) { /* URL 패턴에서 :로 시작되는 부분은 파라미터를 의미한다. */ }
	} );

	new MainRouter();
	Backbone.history.start();

참고 : <http://cornerstone.sktelecom.com/2/livedoc/#14>
