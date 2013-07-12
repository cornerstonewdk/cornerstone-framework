
define( [ 'backbone', 'underscore', 'jquery', 'validation-view', 'bootstrap' ], function( Backbone, _, $, ValidationView ) {

	// TODO Validation success/fail 시에 이벤트 발생
	return Backbone.View.extend( {

		initialize: function() {
			this.render();
			this.model.on( 'change', this.render, this );

			if ( this.options.validationViewClass )
				this.validation = new this.options.validationViewClass( { el: this.$el } );
			else
				this.validation = new ValidationView( { el: this.$el } );
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

		_onValidationError: function( model, err ) {

			if ( _.isArray( err ) )
				_.each( err, this.validation.fail );
			else
				this.validation.fail( err );
		},

		toModel: function() {

			this.validation.reset();

			var values = {};
            /* Toby 추가 Vaildation 체크를 위해 모든 Form 값을 체크하도록한다 BEGIN*/
            var FormSerialize=this.$el.serializeArray();

            var thisNmArray={};
            var i=0;
            this.$el.find(":input[name]").each(function(){
                //Diabled 된 값은 체크 하지 않도록 한다.
                if($(this).attr("disabled")!='disabled'){
                    var this_nm=$(this).attr('name');
                    var is_exist=false;
                    $.each(thisNmArray,function(key,value){
                        if(value==this_nm){
                            is_exist=true;
                        }
                    });
                    if(is_exist==false){
                        thisNmArray[i]=this_nm;
                        i++;
                    }
                }
            });
            $.each(thisNmArray,function(key,value){
                var is_exist=false;
                var this_nm=value;
                _.each( FormSerialize, function( item, index ) {
                    if(item.name==this_nm){
                       is_exist=true;
                        if ( values[ item.name ] ) {
                            if ( !_.isArray( values[ item.name ] ) )
                                values[ item.name ] = [ values[ item.name ] ];

                            values[ item.name ].push( item.value );
                        }
                        else {
                            values[ item.name ] = item.value;
                        }
                    }
                });
                if(is_exist==false){
                    values[this_nm]='';
                }
            });
            /* Toby 추가 Vaildation 체크를 위해 모든 Form 값을 체크하도록한다 END*/

    		this.model.off( 'error', this._onValidationError, this );

    		this.model.on( 'error', this._onValidationError, this );

			this.model.clear( { silent: true } );

        	this.model.set( values );

    		if ( this.model.isValid() ) this.validation.success();

			return this.model;
		}
	} );
} );
