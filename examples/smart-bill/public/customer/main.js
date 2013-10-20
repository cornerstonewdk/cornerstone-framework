/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'handlebars', 'jquery', 'backbone', 'multipage-router', 'model/bills', 'view/list', 'view/detail', 'bootstrap' ], function( Handlebars, $, Backbone, MultipageRouter, Bills, ListView, DetailView ) {
	return {
		launch: function() {

			function numberFormat( value ) {
				return value.toString().replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );
			}

			Handlebars.registerHelper( 'numberFormat', function( value ) {
				return numberFormat( value );
			} );

			Handlebars.registerHelper( 'items1Data', function( data, index ) {
				return numberFormat( data.items1[ index ] );
			} );

			Handlebars.registerHelper( 'items2Data', function( data, index ) {
				return numberFormat( data.items2[ index ] );
			} );

			var bills = new Bills();

			bills.on( 'sync', function() {
				$( '#section-list' ).on( 'render', function() {
					new ListView( { collection: bills } ).render();
				} );

				$( '#section-detail' ).on( 'render', function( event, id ) {
					var bill = bills.get( id );
					new DetailView( { model: bill } ).render();
				} ).on( 'inactive', function() {
					$( '#modal-table, #modal-total, #modal-sum1, #modal-sum2, #modal-sum3, #modal-text, #modal-image, #modal-map, #modal-video, #modal-graph' ).modal( 'hide' );
				} );

				// Router
				new ( MultipageRouter.extend( { useDataAttributes: true } ) );
				Backbone.history.start();
			} );

			bills.fetch();
		}	
	};
} );
