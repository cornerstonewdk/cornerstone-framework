<!--
{
	"title": "모델",
	"group": 1,
	"order": 12
}
-->

-----------------------

# 모델  #

-----------------------

**- Backbone.Model을 extend해서 자신만의 Model을 정의**

	// model/user
	define( [ ‘backbone’ ], function( Backbone ) {

		return Backbone.Model.extend( {
			
			defaults: {
				name: ‘홍길동’,
				age: 40
			},
			
			initialize: function() {
				console.log( ‘Created!’ );
			}
		} );
	} );
***
	require( [ ‘model/user’ ], function( User ) {
		var user = new User();
	} );

참고 : <http://cornerstone.sktelecom.com/2/livedoc/#6>
