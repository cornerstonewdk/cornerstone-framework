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
     토글 버튼 이벤트 확장 : 토글시 이벤트 발생 ( single 이외에 다른 토글 버튼도 모두 적용 ? );
     */
    var Button = function () {};

    Button = $.fn.button.Constructor;

    Button.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
        
        if ($parent) {
            $parent.find('.active').removeClass('active')
        }
        this.$element.toggleClass('active');
        if ( this.$element.hasClass( 'active' ) ) {
            this.$element.trigger( e = $.Event('toggleOn.cs.button') );
        } else {
            this.$element.trigger( e = $.Event('toggleOff.cs.button') );
        }

    };

    $.fn.button.Constructor = Button;
} ) );