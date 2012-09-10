
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/gesture-area', 'backbone', 'bootstrap' ], function( GestureAreaView, Backbone ) {
	return {
		launch: function() {
			new GestureAreaView();
		}	
	};
} );
