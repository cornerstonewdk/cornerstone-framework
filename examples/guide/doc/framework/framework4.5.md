<!--
{
	"title": "라우터 사용법 익히기",
	"group": 1,
	"order": 15
}
-->

-----------------------

# 라우터 사용법 익히기  #

-----------------------

**- Backbone.Router를 extend해서 새로운 Router 정의**  
**- 새로운 Router 객체 생성**  
**- Backbone.history.start()**  
**- Fragment identifier의 변경을 감지**

	var MainRouter = Backbone.Router.extend( {

		// Fragment identifier의 패턴과 함수의 매핑
		routes: {
			‘’: ‘list’,				// # or #이 없는 경우
			‘list’: ‘list’,			// #list
			‘add’: ‘add’,			// #add
			‘detail/:id’: ‘detail’	// #detail/5
		},

		list: function() { /* URL이 # 또는 #list로 끝나거나 #이 없는 경우 실행된다. */ },
		add: function() { /* URL이 #add로 끝나면 실행된다. */ },
		detail: function( id ) { /* URL 패턴에서 :로 시작되는 부분은 파라미터를 의미한다. */ }
	} );

	new MainRouter();
	Backbone.history.start();

참고 : <http://cornerstone.sktelecom.com/2/livedoc/#14>
