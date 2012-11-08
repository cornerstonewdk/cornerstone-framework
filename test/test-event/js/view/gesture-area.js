
define( [ 'gesture-view' ], function( GestureView ) {

	return GestureView.extend( {

		el: 'div#gesture-area',

		initialize: function() {
			this.$obj = this.$( 'img#image' );
			this.currentDegree = 0;
		},

		events: {
			'doubletap': 'doubletap',
			'dragstart': 'dragstart',
			'drag': 'drag',
			'dragend': 'dragend',
			'transformstart': 'transformstart',
			'transform': 'transform',
			'transformend': 'transformend'
		},
		
		doubletap: function( event ) {
			this.$obj.css( {
				width: this.$obj.width() * 1.2,
				height: this.$obj.height() * 1.2
			} );
		},
		
		dragstart: function( event ) {
			event.preventDefault();
		
			this.position = this.$obj.position();
			
			// position()으로 구한 위치는 padding(19px)을 포함하고 있으므로 제외한다.
			this.position.left -= 19;
			this.position.top -= 19;
		},
		
		drag: function( event ) {
		
			if ( !this.position ) return;
		
			var newPosition = {
				left: this.position.left + event.distanceX,
				top: this.position.top + event.distanceY
			};
			
			this.$obj.css( newPosition );
		},
		
		dragend: function( event ) {
			this.position = null;
		},
		
		transformstart: function( event ) {
			event.preventDefault();
			
			this.width = this.$obj.width();
			this.height = this.$obj.height();
			this.degree = this.currentDegree;
		},
		
		transform: function( event ) {
			this.$obj.css( {
				width: this.width * event.scale,
				height: this.height * event.scale,
				'-webkit-transform': 'rotate(' + ( this.degree + event.rotation ) + 'deg)'
			} );
		},
		
		transformend: function( event ) {
			this.currentDegree = this.degree + event.rotation;
		}
	} );
} );
