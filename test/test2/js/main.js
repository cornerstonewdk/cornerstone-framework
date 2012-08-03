
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'backbone' ], function( Backbone ) {
	return {
		launch: function() {

			// Router
			var MainRouter = Backbone.Router.extend( {

				routes: {
					'': 'list',
					'list': 'list',
					'add': 'add',
					'detail/:id': 'detail',
					'*path': 'notFound'
				},

				list: function() {
					alert( 'list' );
				},

				add: function() {
					alert( 'add' );
				},

				detail: function( id ) {
					alert( 'detail' );
				},

				// TODO 공통된 에러 처리
				notFound: function( path ) {
					alert( 'Path not found: ' + path );
				}
			} );

			new MainRouter();
			Backbone.history.start();
		}	
	};
} );
