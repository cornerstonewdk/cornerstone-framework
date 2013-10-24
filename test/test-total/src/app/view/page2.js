
define( [ 'backbone', 'template!view/page2', 'logging', 'style!css/page2' ], function( Backbone, template, Logging ) {
	
	return Backbone.View.extend( {

		el: 'section#page2',

		render: function() {
			this.$el.html( template() );

			var TouchView = Backbone.View.extend( {
			    el: '#page2 .touch-area',
			    events: {
			        'touchstart': 'start',
			        'touchmove': 'move',
			        'touchend': 'end'
			    },
			    start: function( event ) {
			        Logging.debug( 'touch start' );
			    },
			    move: function( event ) {
			       Logging.debug( 'touch move' );
			    },
			    end: function( event ) {
			        Logging.debug( 'touch end' );
			    }
			} );
			
			new TouchView().render().$el.on( 'touchmove', function ( e ) {
				if (e.target.type === 'range') { return; }
	            e.preventDefault();
			} );

			require( [ 'gesture-view' ], function ( GestureView ) {
				var gestureView = GestureView.extend( {
					el: '#page2 .gesture-area',
					 events: {
			            'tap': 't',
			            'doubletap': 'dt',
			            'hold': 'h',
			            'dragstart': 'ds',
			            'drag': 'd',
			            'dragend': 'de',
			            'swipe': 'sw',
			            'transformstart': 'trs',
			            'transform': 'tr',
			            'transformend': 'tre',
			            'release': 're'
			        },
			        t: function () {
			        	Logging.debug( 'tap' );
			        },
			        dt: function () {
			        	Logging.debug( 'doubletap' );
			        },
			        h: function () {
			        	Logging.debug( 'hold' );
			        },
			        ds: function () {
			        	Logging.debug( 'dragstart' );
			        },
			        d: function () {
			        	Logging.debug( 'drag' );
			        },
			        de: function () {
			        	Logging.debug( 'dragend' );
			        },
			        sw: function () {
			        	Logging.debug( 'swipe' );
			        },
			        trs: function () {
			        	Logging.debug( 'transformstart' );
			        },
			        tr: function () {
			        	Logging.debug( 'transform' );
			        },
			        tre: function () {
			        	Logging.debug( 'transformend' );
			        },
			        re: function () {
			        	Logging.debug( 'release' );
			        },
				} );
				new gestureView().render();
			} );
			return this;
		},

		events: {
			'click button.prev': 'prevPage',
			'click button.next': 'nextPage'
		},

		prevPage: function() {
			location.href = '#page1';
		},

		nextPage: function() {
			location.href = '#page3';
		}
	} );
} );
