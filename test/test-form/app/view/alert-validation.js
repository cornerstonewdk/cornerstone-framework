
define( [ 'backbone', 'underscore', 'jquery', 'bootstrap' ], function( Backbone, _, $ ) {

	// Validation이 성공/실패했을 때 event 발생
	return Backbone.View.extend( {
	
		/**
		 * 최초 생성될 때(화면이 그려질 때) 한 번만 실행된다.
		 */
		initialize: function() {
		},
		
		/**
		 * Validation을 초기화한다.
		 * Form을 submit 할 때 마다, 그리고 검증이 성공할 때 실행된다.
		 */
		reset: function() {
			this.$( '.alert' ).remove();
		},
		
		success: function() {
			this.reset();
		},
		
		/**
		 * 검증이 실패하면 실행된다.
		 * Model의 validate 메소드가 여러 error를 리턴하면 (Array) 각각에 대해서 호출된다.
		 */
		fail: function( err ) {
		
			this.$el.prepend( '<div class="alert alert-error"><a href="#" class="close" data-dismiss="alert">&times;</a>' + ( err.message || err ) + '</div>' );
		
			if ( err.attribute ) this.$( ':input[name=' + err.attribute + ']:first' ).focus();
		}
	} );
} );
