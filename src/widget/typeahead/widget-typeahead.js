;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery', 'typeahead' ], function ( Backbone, _, $, typeahead ) {
            factory( $, root, doc );
            return Backbone.View.extend( {
            	render: function () {
            		this.$el.typeahead( this.options );
            		return this;
            	}
            } );
        } );
    } else {
        // None AMD
        factory( root.jQuery, root, doc );
    }
} ( window, document, function ( $, window, document ) {
	/*
     typeahead : typeahead내에 typeahead:selected 발생 시 동일한 구조의 selected.cs.typeahead 발생
     */
	
	$.fn.twitterTypeahead = $.fn.typeahead;
        
    $.fn.typeahead = function ( options ) {
        return this.each( function () {
            var $this = $( this );
            $this.twitterTypeahead(options);
            $this.on('typeahead:selected',function(e, datum, dataset){
                $this.trigger('selected.cs.typeahead', [ datum, dataset ] );
            });
        } );
    };
} ) );