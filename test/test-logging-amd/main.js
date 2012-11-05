
/**
 * main.js
 * 애플리케이션 메인
 */
define( [ 'jquery', 'logging', 'bootstrap', 'style!main' ], function( $, Logging ) {
	return {
		launch: function() {
			
			// Logging 설정
			Logging.config( { defaultLevel: 'info' } );
			
			function config() {
				Logging.config( {
					debug: $( '#debug-group .active' ).text(),
					info: $( '#info-group .active' ).text(),
					warn: $( '#warn-group .active' ).text(),
					error: $( '#error-group .active' ).text(),
					time: $( '#time-group .active' ).text()
				} );
			}
			
			$( '#debug' ).click( function() {
				config();
				Logging.debug( 'Debug 메시지를 로그에 남깁니다.' );
			} );
			
			$( '#info' ).click( function() {
				config();
				Logging.info( 'Info 메시지를 로그에 남깁니다.' );
			} );
			
			$( '#warn' ).click( function() {
				config();
				Logging.warn( 'Warn 메시지를 로그에 남깁니다.' );
			} );
			
			$( '#error' ).click( function() {
				config();
				Logging.error( 'Error 메시지를 로그에 남깁니다.' );
			} );
			
			$( '#log' ).click( function() {
				config();
				Logging.log( 'Log 메시지를 로그에 남깁니다.' );
			} );
			
			$( '#time' ).click( function() {
				config();
				Logging.time( 'timer1' );
			} );
			
			$( '#timeEnd' ).click( function() {
				config();
				Logging.timeEnd( 'timer1' );
			} );
		}	
	};
} );
