<!--
{
	"title": "뷰",
	"group": 1,
	"order": 14
}
-->

-----------------------

# 뷰  #

-----------------------

**- Backbone.View를 extend해서 새로운 View를 정의**  
**- 사용자 인터페이스를 담당**  
**- 모든 View는 DOM 객체를 가지고 있다.**

```
var UserView = Backbone.View.extend( {

	tagName: ‘ul’,
	className: ‘user’,

	render: function() {
		// View를 그리는 코드를 작성한다.
	}
} );

var userView = new UserView( { model: user } );
userView.render();
```
```
var UserView = Backbone.View.extend( {

	el: ‘section#list-section’,

	render: function() {
		// View를 그리는 코드를 작성한다.
	}
} );
```

참고 : <http://cornerstone.sktelecom.com/livedoc/2_07_view.html>
