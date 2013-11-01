/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'backbone', 'multipage-router', 'model/documents', 'view/home', 'view/index', 'view/tags', 'view/detail', 'view/detail-lnb', 'bootstrap', 'style!main' ], function ( $, Backbone, MultipageRouter, Documents, HomeView, IndexView, TagsView, DetailView, DetailLnbView ) {
	return {
		launch: function () {

			var docs = new Documents();

			// 모든 데이터를 다 받아오고 나면
			docs.on( 'sync', function () {

				// order 속성 순으로 정렬
				docs.comparator = function ( doc ) {
					var order = doc.get( 'order' );
					return order[ 0 ] * 1000 * 1000 + order[ 1 ] * 1000 + ( order[ 2 ] || 0 );
				};
				docs.sort();

				// 부가 정보 만들기
				docs.each( function ( doc ) {
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
							render: function () {
								new HomeView( { collection: docs } ).render();
							},
							active: function () {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
							}
						},
						'index': {
							fragment: 'index',
							el: '#page-index',
							render: function () {
								new IndexView( { collection: docs } ).render();
							},
							active: function () {
								$( '#nav-index' ).addClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
							}
						},
						'tags': {
							fragment: 'tags',
							el: '#page-tags',
							render: function () {
								new TagsView( { collection: docs } ).render();
							},
							active: function () {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).addClass( 'active' );
							}
						},
						'default': {
							render: function ( path ) {

								var doc = docs.get( path );

								if ( !doc ) {
									alert( 'Page not found' );
									history.back();
									return;
								}

								new DetailView( { collection: docs, model: doc } ).render();

								// 상세페이지 메뉴 랜더링
								this.DetailLnbView = this.DetailLnbView || new DetailLnbView( {collection: docs, model: doc} );
								this.DetailLnbView.model = doc;
								this.DetailLnbView.update();
							},
							active: function () {
								$( '#nav-index' ).removeClass( 'active' );
								$( '#nav-tags' ).removeClass( 'active' );
								$( '#page-detail' ).show();
								//$('html, body').animate({ scrollTop : 0 }, "easeOutQuart");
								$('html, body').scrollTop(0);
							},
							inactive: function () {
								$( '#detail-content' ).html( '' );
								$( '#page-detail' ).hide();
							}
						}
					}

					//transitions: {
					//	'home:index': 'fade',
					//	'home:tags': 'fade',
					//	'index:tags': 'fade'
					//}
				} );
				window.app = {};
				window.app.router = new MainRouter();
				Backbone.history.start();
			} );

			docs.fetch();
		}
	};
} );
