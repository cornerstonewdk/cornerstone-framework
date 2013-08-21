
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'backbone', 'multipage-router', 'model/documents', 'view/home', 'view/index', 'view/tags', 'view/detail', 'bootstrap', 'style!main' ], function( $, Backbone, MultipageRouter, Documents, HomeView, IndexView, TagsView, DetailView ) {
	return {
		launch: function() {

			var docs = new Documents();

			// 모든 데이터를 다 받아오고 나면
			docs.on( 'sync', function() {

				// order 속성 순으로 정렬
				docs.sortBy( function( doc ) {
					return doc.get( 'order' );
				} );

				// 부가 정보 만들기
				docs.each( function( doc ) {
					var order = doc.get( 'order' );
					if ( order.length == 2 ) doc.set( 'secondDepth', true );
					else if ( order.length == 3 ) doc.set( 'thirdDepth', true );
					else if ( order.length == 4 ) doc.set( 'fourthDepth', true );
				} );

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
								new IndexView( { collection: docs } ).render();
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
								new TagsView( { collection: docs } ).render();
							},
							active: function() {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).addClass( 'active' );
							}
						},
						'default': {
							render: function( path ) {

								var doc = docs.get( path );

								if ( !doc ) {
									alert( 'Page not found' );
									history.back();
									return;
								}

								new DetailView( { collection: docs, model: doc } ).render();
							},
							active: function() {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
								$( '#page-detail' ).show();
							},
							inactive: function() {
								$( '#page-detail' ).hide();
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
