
define( [ 'backbone', 'jquery', 'bootstrap' ], function( Backbone, $ ) {

	// Validation이 성공/실패했을 때 event 발생
	return Backbone.View.extend( {
	
		/**
		 * 최초 생성될 때(화면이 그려질 때) 한 번만 실행된다.
		 */
		initialize: function() {
			// Form과 그 하위의 :input 들에 대해서 tooltip을 설정한다.
			this.$el.tooltip( { trigger: 'manual', animation: false, container: 'body' } );
			this.$( ':input' ).tooltip( { trigger: 'manual', animation: false, container: 'body' } );
			this.reset();
		},
		
		/**
		 * Validation을 초기화한다.
		 * Form을 submit 할 때 마다, 그리고 검증이 성공할 때 실행된다.
		 */
		reset: function() {
			this.$( '.form-group' ).removeClass( 'has-error' );
			this.$( '.form-group' ).find( '.help-block' ).text( '' ).hide();
			this.$( ':input' ).tooltip( 'hide' ).removeAttr( 'data-invalid' );
		},
		
		success: function() {
			this.reset();
		},
		
		/**
		 * 검증이 실패하면 실행된다.
		 * Model의 validate 메소드가 여러 error를 리턴하면 (Array) 각각에 대해서 호출된다.
		 */
		fail: function( err ) {
		
			var field;
			
			// attribute가 지정되어 있으면 name에 해당하는 input element를 찾고, 없으면 첫번째 input element를 사용한다.
			if ( err.attribute ) field = this.$( ':input[name=' + err.attribute + ']:first' );
			field = field || this.$( ':input:first' );
			
			var group = field.parents( '.form-group' );
			group && group.addClass( 'has-error' );
			
			// help-block을 찾아서 메시지를 표시한다. help-block이 없으면 tooltip을 사용한다.
			var help = group.find( '.help-block' );
			if ( help && help.length )
				help.text( err.message || err ).show();
			else {
				field.attr( { 'data-original-title': err.message || err, 'data-invalid': true } );
				field.tooltip( 'show' );
			}
			
			field.focus();
		}
	} );
} );
