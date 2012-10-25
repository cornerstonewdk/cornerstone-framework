
define( [ 'gesture-view' ], function( GestureView ) {

	return GestureView.extend( {

		el: 'div#gesture-area',

		initialize: function() {
			this.$obj = this.$( 'div#gesture-obj' );
			this.currentDegree = 0;
		},

		events: {
			'doubletap div#gesture-obj': 'doubletap',
			'dragstart': 'dragstart',
			'drag': 'drag',
			'dragend': 'dragend',
			'transformstart': 'transformstart',
			'transform': 'transform',
			'transformend': 'transformend'
		},
		
		// 이벤트가 발생한 클릭(터치) 위치가 #gesture-obj 위인지를 검사한다.	
		isOnGestureObj: function( position ) {
		
			var objPosition = this.$obj.position();
			
			if ( position.x < objPosition.left ) return false;
			if ( position.y < objPosition.top ) return false;
			if ( position.x > objPosition.left + this.$obj.width() ) return false;
			if ( position.y > objPosition.top + this.$obj.height() ) return false;
			
			return true;
		},
		
		doubletap: function( event ) {
			this.changeFontSize( 1.2 );
		},
		
		dragstart: function( event ) {
		
			if ( this.isOnGestureObj( event.position ) ) {
				this.position = this.$obj.position();
				
				// position()으로 구한 위치는 padding(19px)을 포함하고 있으므로 제외한다.
				this.position.left -= 19;
				this.position.top -= 19;
			}
		},
		
		drag: function( event ) {
		
			if ( !this.position ) return;
		
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
			this.position = null;
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
