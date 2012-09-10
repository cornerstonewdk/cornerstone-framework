
define( [ 'gesture-view' ], function( GestureView ) {

	return GestureView.extend( {

		el: 'div#gesture-area',

		initialize: function() {
			this.$obj = this.$( 'div#gesture-obj' );
			this.currentDegree = 0;
		},

		events: {
			'doubletap div#gesture-obj': 'doubletap',
			'dragstart div#gesture-obj': 'dragstart',
			'drag div#gesture-obj': 'drag',
			'dragend div#gesture-obj': 'dragend',
			'transformstart': 'transformstart',
			'transform': 'transform',
			'transformend': 'transformend'
		},
		
		doubletap: function( event ) {
			this.changeFontSize( 1.2 );
		},
		
		dragstart: function( event ) {
			this.position = this.$obj.position();
		},
		
		drag: function( event ) {
		
			var newPosition = {
				left: this.position.left + event.distanceX,
				top: this.position.top + event.distanceY
			};
			
			if ( newPosition.left < 0 ) newPosition.left = 0;
			if ( newPosition.top < 0 ) newPosition.top = 0;
			if ( newPosition.left > this.$el.width() - this.$obj.width() ) newPosition.left = this.$el.width() - this.$obj.width();
			if ( newPosition.top > this.$el.height() - this.$obj.height() ) newPosition.top = this.$el.height() - this.$obj.height();
			
			this.$obj.css( newPosition );
		},
		
		dragend: function( event ) {
			
		},
		
		transformstart: function( event ) {
			this.fontSize = parseInt( this.$obj.css( 'font-size' ) );
			this.degree = this.currentDegree;
		},
		
		transform: function( event ) {
			this.$obj.css( 'font-size', this.fontSize * event.scale );
			this.$obj.css( '-webkit-transform', 'rotate(' + ( this.degree + event.rotation ) + 'deg)' );
		},
		
		transformend: function( event ) {
			this.currentDegree = this.degree + event.rotation;
		},
		
		changeFontSize: function( times ) {
			var fontSize = parseInt( this.$obj.css( 'font-size' ) );
			this.$obj.css( 'font-size', fontSize * times );
		},
		
		rotate: function( degree ) {
			this.currentDegree += degree;
			this.$obj.css( '-webkit-transform', 'rotate(' + this.currentDegree + 'deg)' );
		}
	} );
} );
