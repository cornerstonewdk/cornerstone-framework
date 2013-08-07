
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'backbone', 'multipage-router', 'model/documents', 'view/home', 'view/index', 'view/tags', 'bootstrap', 'style!main' ], function( $, Backbone, MultipageRouter, Documents, HomeView, IndexView, TagsView ) {
	return {
		launch: function() {

			var docs = new Documents();

			// 모든 데이터를 다 받아오고 나면
			docs.on( 'sync', function() {

				// Router
				var MainRouter = MultipageRouter.extend( {
				
					pages: {
						'home': {
							fragment: [ '', 'home' ],
							el: '#page-home',
							render: function() {
								new HomeView( { collection: docs } ).render();
							},
							active: function() {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
							}
						},
						'index': {
							fragment: 'index',
							el: '#page-index',
							render: function() {
								new IndexView().render();
							},
							active: function() {
								$( '#nav-index' ).addClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
							}
						},
						'tags': {
							fragment: 'tags',
							el: '#page-tags',
							render: function() {
								new TagsView().render();
							},
							active: function() {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).addClass( 'active' );
							}
						},
						'default': {
							active: function( path ) {

								var doc = docs.get( path );

								if ( !doc ) {
									alert( 'Page not found' );
									history.back();
									return;
								}

								$( )

								alert( doc.id );
							},
							active: function() {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
							}
						}
					},
					
					transitions: {
						'home:index': 'fade',
						'home:tags': 'fade',
						'index:tags': 'fade'
					},
				} );

				new MainRouter();
				Backbone.history.start();
			} );

			docs.fetch();
		}	
	};
} );
