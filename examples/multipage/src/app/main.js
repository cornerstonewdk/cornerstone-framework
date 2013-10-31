
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'backbone', 'multipage-router', 'bootstrap' ], function( Backbone, MultipageRouter ) {
	return {
		launch: function() {

			// Router
			var MainRouter = MultipageRouter.extend( {
			
				pages: {
					'list-page': {
						fragment: [ '', 'list' ],
						el: '#list-section',
						render: function() {
							// 이 페이지가 활성화되고 Transition이 일어나기 전 실행된다. 
						},
						active: function() {
							// 이 페이지가 활성화되고 Transition이 일어나고 나서 실행된다.
						},
						inactive: function( nextPageId ) {
							// 다른 페이지가 활성화되기 전 이 페이지가 비활성화되면서 실행된다.
						}
					},
					'add-page': {
						fragment: 'add',
						el: '#add-section'
					},
					'detail-page': {
						fragment: 'detail/:id',
						el: '#detail-section'
					},
					'default': {
						el: '#err-section'
					}
				},
				
				transitions: {
					'list-page:add-page': { type: 'slide', duration: 3000 },
					'list-page:default': 'slide',
					'list-page:detail-page': 'flip'
				}
			} );
			
			new MainRouter();
			Backbone.history.start();
		}	
	};
} );
