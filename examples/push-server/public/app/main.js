/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'handlebars', 'jquery', 'backbone', 'multipage-router', 'model/devices', 'view/send', 'view/devices', 'bootstrap' ], function( Handlebars, $, Backbone, MultipageRouter, Devices, SendView, DevicesView ) {
	return {
		launch: function() {

			var devices = new Devices();
			var sendView = new SendView( { el: '#section-send', collection: devices } );
			var devicesView = new DevicesView( { el: '#section-devices', collection: devices } );

			$( '#section-send' ).on( 'render', function() {
				devices.fetch();
			} ).on( 'active', function() {
				$( '#nav-send' ).addClass( 'active' );
			} ).on( 'inactive', function() {
				$( '#nav-send' ).removeClass( 'active' );
			} );

			$( '#section-devices' ).on( 'render', function() {
				devices.fetch();
			} ).on( 'active', function() {
				$( '#nav-devices' ).addClass( 'active' );
			} ).on( 'inactive', function() {
				$( '#nav-devices' ).removeClass( 'active' );
			} );

			// Router
			new ( MultipageRouter.extend( { useDataAttributes: true } ) );
			Backbone.history.start();
		}	
	};
} );
