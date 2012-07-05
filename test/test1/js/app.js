
define( [ 'view/list', 'view/add', 'view/detail', 'model/users', 'backbone', 'bootstrap', 'text', 'handlebars' ], function( ListView, AddView, DetailView, Users, Backbone ) {

	return {
		initialize: function() {

			var users = new Users();
			var listView = new ListView( { collection: users } );
			var addView = new AddView( { collection: users } );	// 새로 추가하면 collection에 추가되어야 하기 때문에 필요하다.

			// modal이 떠 있는 상태인지 추적
			var detailView = null;

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

					if ( detailView ) {
						detailView.dispose();
						detailView = null;
					}

					// ListView를 다시 렌더링하기 위해 users에 이벤트를 보낸다.
					// TODO 원래는 fetch를 사용해서 서버에서 데이터를 받아야 한다.
					users.trigger( 'init' );

					$( 'section.page' ).removeClass( 'active' );
					$( 'section.page#list-section' ).addClass( 'active' );
				},

				add: function() {

					if ( detailView ) {
						detailView.dispose();
						detailView = null;
					}

					addView.render();

					$( 'section.page' ).removeClass( 'active' );
					$( 'section.page#add-section' ).addClass( 'active' );
				},

				detail: function( id ) {
					// 삭제 기능을 위해 collection이 필요하다.
					detailView = new DetailView( { collection: users, model: users.at( 0 ) } );
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
