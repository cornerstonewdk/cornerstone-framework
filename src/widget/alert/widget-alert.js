;
(function(root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(['backbone', 'underscore', 'jquery', 'bootstrap'], function(Backbone, _, $) {
            factory($, root, doc);
            return Backbone.View.extend({
                render: function() {
                    this.$el.alert(this.options);
                    return this;
                }
            });
        });
    } else {
        // None AMD
        factory(root.jQuery, root, doc);
    }
}(window, document, function($, window, document) {
    /*
     Alert 기능 확장 : Close할때 마크업 삭제가 아닌 display none/block 처리 추가
     */
    var dismiss = '[data-dismiss="alert"]';
    var Alert = $.fn.alert.Constructor;

    Alert.prototype.close = function(e) {
        console.log('changed');
        var $this = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            $parent.trigger('closed.bs.alert').hide()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
            .one($.support.transition.end, removeElement)
            .emulateTransitionEnd(150) :
            removeElement()
    }

    $.fn.alert.Constructor = Alert;

    // ALERT DATA-API 재정의
    // ==============
    $(document).off('click.bs.alert.data-api').on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
}));
