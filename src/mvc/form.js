
define( [ 'backbone', 'underscore', 'jquery', 'validation', 'bootstrap' ], function( Backbone, _, $, Validation ) {

	// TODO 이름뒤에 View를 붙여서 구분해야 할까? (FormView)
	// 반대방향 동기화(Model이 변경되었을 때 Form 데이터 업데이트) 필요
	// Validation success/fail 시에 이벤트 발생
	return Backbone.View.extend( {
		
		setValidation: function( CustomValidation ) {
			this.validation = new CustomValidation( { el: this.$el } );	
		},
		
		toModel: function() {
		
			// 지정된 validation이 없으면 기본을 사용한다.
			if ( !this.validation ) this.validation = new Validation( { el: this.$el } );
			
			this.validation.reset();
		
			var values = {};
			
			_.each( this.$el.serializeArray(), function( item, index ) {
			
				if ( values[ item.name ] ) {
				
					if ( !_.isArray( values[ item.name ] ) )
						values[ item.name ] = [ values[ item.name ] ];
					
					values[ item.name ].push( item.value );
				}
				else {
					values[ item.name ] = item.value;
				}
			} );
			
			var self = this;
			var modelObj = new this.model();
			
			modelObj.set( values, {
				error: function( model, err ) {
				
					if ( _.isArray( err ) )
						_.each( err, self.validation.fail );
					else
						self.validation.fail( err );
				}
			} );
			
			if ( modelObj.isValid() ) self.validation.success();
			
			return modelObj;
		}
	} );
} );
