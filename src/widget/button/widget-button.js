;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
            return Backbone.View.extend( {
                tagName: 'button',
                className: 'btn',
                render: function () {
                    this.$el.attr( 'data-toggle', 'button' );
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
     토글 버튼 이벤트 확장 : 토글시 이벤트 발생;
     */
    var Button = function () {};

    Button = $.fn.button.Constructor;

    Button.prototype.toggle = function () {
        var self = this;
        var $radio = self.$element.closest('[data-toggle="buttons-radio"]');
        var $checkbox = self.$element.closest('[data-toggle="buttons-checkbox"]');   

        if ( $radio.length ) {
            $radio.find('.active').removeClass('active');
            self.$element.find( 'input' ).off( 'click' ).on( 'click', function () {
                self.$element.trigger( e = $.Event('toggleOn.cs.button') );
            } );
        }

        if ( $checkbox.length ) {
            self.$element.find( 'input' ).off( 'click' ).on( 'click', function () {
                if ( $( this ).is( ':checked' ) ) {
                    self.$element.trigger( e = $.Event('toggleOn.cs.button') );       
                } else {
                    self.$element.trigger( e = $.Event('toggleOff.cs.button') );                
                }
            } );
        }

        if ( !$radio.length && !$checkbox.length ) {
            if ( self.$element.hasClass( 'active' ) ) {
                self.$element.trigger( e = $.Event('toggleOff.cs.button') );
            } else {
                self.$element.trigger( e = $.Event('toggleOn.cs.button') );
            }
        }

        self.$element.toggleClass('active');
    };

    $.fn.button.Constructor = Button;
} ) );