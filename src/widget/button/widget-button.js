;
( function ( root, doc, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD
        define( [ 'backbone', 'underscore', 'jquery', 'bootstrap' ], function ( Backbone, _, $ ) {
            factory( $, root, doc );
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

       var $parent = this.$element.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $old = $parent.find('.active')
            var $input = this.$element.find('input').prop('checked', !this.$element.hasClass('active'))

            if ($input.prop('type') === 'radio') {
                $old.length && $parent.trigger( 'toggleOff.cs.button', $old );
                $parent.find('.active').removeClass('active')
                this.$element.toggleClass('active')
                $parent.trigger( 'toggleOn.cs.button', this.$element );
            }

            if ($input.prop('type') === 'checkbox') {
                var flag = this.$element.hasClass('active');
                this.$element.toggleClass('active');
                flag ? $parent.trigger( 'toggleOff.cs.button', this.$element ) : $parent.trigger( 'toggleOn.cs.button', this.$element );
            }
        }
    };

    $.fn.button.Constructor = Button;
} ) );