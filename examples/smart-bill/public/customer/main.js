
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'backbone', 'multipage-router', 'model/bills', 'template!templates/list', 'template!templates/detail', 'bootstrap' ], function( $, Backbone, MultipageRouter, Bills, listTemplate, detailTemplate ) {
	return {
		launch: function() {

			var bills = new Bills();

			// 목록 화면 ================================================================
			( function() {
				$( '#section-list' ).on( 'render', function() {
					$( this ).html( listTemplate( bills.toJSON() ) );
				} );

				$( '#refresh' ).click( function() {
					bills.fetch();
				} );

				bills.on( 'all', function( eventName ) {
					console.log( 'event: ' + eventName );
				} );

				// 모든 데이터를 다 받아오고 나면
				bills.on( 'sync', function() {

					$( window ).resize( function( event ) {
						// margin(15+15) 포함
						$( '.editor-grid' ).width( $( '.editor-content' ).width() + 30 );
					} );

					// Router
					new ( MultipageRouter.extend( { useDataAttributes: true } ) );
					Backbone.history.start();
				} );
			} )();

			// 상세 화면 ================================================================
			( function() {
				$( '#section-detail' ).on( 'render', function( event, id ) {
					var bill = bills.get( id );
					$( '#section-detail' ).html( detailTemplate( bill.toJSON() ) );
				} );

			} )();

			bills.fetch();
		}	
	};
} );
