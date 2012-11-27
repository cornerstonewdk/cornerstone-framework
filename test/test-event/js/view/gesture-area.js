
define( [ 'gesture-view' ], function( GestureView ) {

	return GestureView.extend( {

		el: 'div#gesture-area',

		initialize: function() {
			this.$obj = this.$( 'img#image' );
			
			this.status = {
				x: 0,
				y: 0,
				scale: 1,
				rotate: 0	
			};
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
		
		gestureOptions: {
			prevent_default: true
		},
		
		doubletap: function( event ) {
			this.applyTransform( { scale: 1.2 } );
			this.status.scale *= 1.2;
		},
		
		dragstart: function( event ) {
		},
		
		drag: function( event ) {
			this.applyTransform( { x: event.distanceX, y: event.distanceY } );
			this.lastX = event.distanceX;
			this.lastY = event.distanceY;
		},
		
		dragend: function( event ) {
			this.status.x += this.lastX;
			this.status.y += this.lastY;
		},
		
		transformstart: function( event ) {
		},
		
		transform: function( event ) {
			this.applyTransform( { scale: event.scale, rotate: event.rotation } );
		},
		
		transformend: function( event ) {
			this.status.scale *= event.scale;
			this.status.rotate += event.rotation;
		},
		
		applyTransform: function( delta ) {
		
			var t = '';
			t += 'translateX(' + ( this.status.x + ( delta.x || 0 ) ) + 'px) ';
			t += 'translateY(' + ( this.status.y + ( delta.y || 0 ) ) + 'px) ';
			t += 'translateZ(0px) ';
			t += 'scale(' + ( this.status.scale * ( delta.scale || 1 ) ) + ') ';
			t += 'rotate(' + ( this.status.rotate + ( delta.rotate || 0 ) ) + 'deg)';
			
			this.$obj.css( '-webkit-transform', t );
		}
	} );
} );
