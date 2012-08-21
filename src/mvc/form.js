
define( [ 'backbone', 'underscore', 'jquery', 'validation', 'bootstrap' ], function( Backbone, _, $, Validation ) {

	// TODO Validation success/fail 시에 이벤트 발생
	return Backbone.View.extend( {
	
		initialize: function() {
			this.render();
			this.model.on( 'change', this.render, this );	
		},
		
		setValidation: function( CustomValidation ) {
			this.validation = new CustomValidation( { el: this.$el } );	
		},
		
		render: function() {
		
			var self = this;
		
			_.each( this.model.attributes, function( value, key ) {
			
				var input = self.$( ':input[name=' + key + ']:first' );
				if ( !input || !input.length ) return;
				
				var type = input.attr( 'type' );
				if ( type && type.toUpperCase() === 'CHECKBOX' ) {
					self.$( ':input[name=' + key + ']' ).removeAttr( 'checked' );
					
					if ( _.isArray( value ) )
						_.each( value, function( item, index ) {
							self.$( ':input[name=' + key + '][value=' + item + ']' ).attr( 'checked', 'checked' );
						} );
					else
						self.$( ':input[name=' + key + '][value=' + value + ']' ).attr( 'checked', 'checked' );
				}
				else if ( type && type.toUpperCase() === 'RADIO' )
					self.$( ':input[name=' + key + '][value=' + value + ']' ).attr( 'checked', 'checked' );
				else
					input.val( value );
			} );
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
			
			this.model.clear( { silent: true } );
			this.model.set( values, {
				error: function( model, err ) {
				
					if ( _.isArray( err ) )
						_.each( err, self.validation.fail );
					else
						self.validation.fail( err );
				}
			} );
			
			if ( this.model.isValid() ) self.validation.success();
			
			return this.model;
		}
	} );
} );
