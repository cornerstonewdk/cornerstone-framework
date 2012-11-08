/**
 * logging.js
 */
;( function( root, console, log, factory ) {

	// AMD
	if ( typeof define === 'function' && define.amd )
		define( [ 'blackbird' ], function( log ) {
			return factory( console, log );
		} );
	else {
		root.Logging = factory( console, log );
	}
	
} )( window, console, log, function( console, log ) {
	
	return {
		// 기본 설정
		options: {
			defaultLevel: 'debug',
			debug: 'console',
			info: 'console',
			warn: 'console',
			error: 'console',
			time: 'console'
		},
		
		timers: {},
		
		// debug, info, warn, error에 대해서 각각 출력 방향(none/console/screen)을 지정할 수 있다.
		config: function( options ) {
		
			if ( !options ) return;
			
			if ( options.defaultLevel ) this.options.defaultLevel = options.defaultLevel;
			if ( options.debug ) this.options.debug = options.debug;
			if ( options.info ) this.options.info = options.info;
			if ( options.warn ) this.options.warn = options.warn;
			if ( options.error ) this.options.error = options.error;
			if ( options.time ) this.options.time = options.time;
			
			if ( options.debug == 'screen' || options.info == 'screen' || options.warn == 'screen' || options.error == 'screen' || options.time == 'screen' )
				log.init();
		},
		
		doLog: function( level, msg ) {
		
			level = level || this.options.defaultLevel;
		
			switch ( this.options[ level ] ) {
				case 'console':
					
					switch ( level ) {
						case 'debug':
							if ( console.debug ) console.debug( msg ); else console.log( msg );
							break;
						case 'info':
							console.info( msg );
							break;
						case 'warn':
							console.warn( msg );
							break;
						case 'error':
							console.error( msg );
							break;
					}
					
					break;
				case 'screen':
				
					log.init();
					
					switch ( level ) {
						case 'debug':
							log.debug( msg );
							break;
						case 'info':
							log.info( msg );
							break;
						case 'warn':
							log.warn( msg );
							break;
						case 'error':
							log.error( msg );
							break;
					}
					
					break;
			}
		},
		
		debug: function( msg ) {
			this.doLog( 'debug', msg );
		},
		
		info: function( msg ) {
			this.doLog( 'info', msg );
		},
		
		warn: function( msg ) {
			this.doLog( 'warn', msg );
		},
		
		error: function( msg ) {
			this.doLog( 'error', msg );
		},
		
		log: function( msg ) {
			this.doLog( null, msg );
		},
		
		time: function( timer ) {
			if ( this.options.time == 'console' ) {
				if ( console.time )
					console.time( timer );
				else {
					this.timers[ timer ] = new Date();
					console.log( timer );
				}
			}
			else if ( this.options.time == 'screen' ) {
				log.init();
				log.profile( timer );
			}
		},
		
		timeEnd: function( timer ) {
			if ( this.options.time == 'console' ) {
				if ( console.time )
					console.timeEnd( timer );
				else if ( this.timers[ timer ] ) {
					console.log( timer + ': ' + ( new Date().getTime() - this.timers[ timer ].getTime() ) + 'ms' );
					delete this.timers[ timer ];
				}
			}
			else if ( this.options.time == 'screen' ) {
				log.init();
				log.profile( timer );
			}
		}
	};
} );
