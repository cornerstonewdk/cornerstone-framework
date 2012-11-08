
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'view/list', 'view/add', 'view/detail', 'model/users', 'backbone', 'sync', 'multipage-router', 'bootstrap', 'style!main' ], function( ListView, AddView, DetailView, Users, Backbone, Sync, MultipageRouter ) {
	return {
		launch: function() {

			var users = new Users();
			var listView = new ListView( { collection: users } );
			var addView = new AddView( { collection: users } );	// 새로 추가하면 collection에 추가되어야 하기 때문에 필요하다.
			var detailView = null;

			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'list-page': {
						fragment: [ '', 'list' ],
						el: '#list-section',
						render: function() {
							users.fetch();
						},
						// fragment가 바뀌고 나서 transition이 시작되기 전에 callback이 필요하다. (화면을 그리기 위해)
						// transition이 완료되고 나서 실행되는 callback
						inactive: function( nextPageId ) {
							//if ( nextPageId != 'detail-page' )
							//	$( '#list-section' ).removeClass( 'active' );
						}
					},
					'add-page': {
						fragment: 'add',
						el: '#add-section',
						render: 'add',
						inactive: function() {
						}
					},
					'detail-page': {
						fragment: 'detail/:id',
						el: '#detail-section',
						render: 'detail',
						active: function() {
							
						}
					},
					'default': {
						el: '#err-section',
						active: function( path ) {
						},
						
						inactive: function( nextPageId ) {
						}
					}
				},
				
				transitions: {
					'list-page:add-page': { type: 'slide', duration: 3000 },
					'list-page:default': 'slide',
					'list-page:detail-page': 'flip'
				},

				add: function() {
					addView.render();
				},

				detail: function( id ) {
					// 삭제 기능을 위해 collection이 필요하다.
					detailView = new DetailView( { collection: users, model: users.get( id ) } );
					detailView.render();
				}
			} );

			Backbone.sync = Sync.local;
			new MainRouter();
			Backbone.history.start();
		}	
	};
} );
