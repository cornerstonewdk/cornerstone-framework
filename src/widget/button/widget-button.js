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

        var self = this.$element;
        var $parent = self.closest('[data-toggle="buttons"]')

        if ($parent.length) {
            var $old = $parent.find('.active')
            var $input = self.find('input').prop('checked', !self.hasClass('active'))

            if ($input.prop('type') === 'radio') {
                $old.length && $parent.trigger( 'toggleOff.cs.button', $old );
                $parent.find('.active').removeClass('active')
                self.toggleClass('active')
                $parent.trigger( 'toggleOn.cs.button', self );
            } else {
                var flag = self.hasClass('active');
                self.toggleClass('active');
                flag ? $parent.trigger( 'toggleOff.cs.button', self ) : $parent.trigger( 'toggleOn.cs.button', self );
            }
        } else {
            var flag = self.hasClass('active');
            self.toggleClass('active');
            flag ? self.trigger( 'toggleOff.cs.button', self ) : self.trigger( 'toggleOn.cs.button', self );
        }
    };

    $.fn.button.Constructor = Button;
} ) );