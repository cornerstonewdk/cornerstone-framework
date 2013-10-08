;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Button = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    /*
     토글 버튼 이벤트 확장 : 토글시 이벤트 발생;
     */
    var Button = $.fn.button.Constructor;

    Button.prototype.toggle = function () {

        var flag;
        var self = this.$element;
        var $parent = self.closest('[data-toggle="buttons"]');

        if ($parent.length) {
            var $old = $parent.find('.active');
            var $input = self.find('input').prop('checked', !self.hasClass('active'));

            if ($input.prop('type') === 'radio') {
                $old.length && $parent.trigger('toggleOff.cs.button', $old);
                $parent.find('.active').removeClass('active');
                self.toggleClass('active');
                $parent.trigger('toggleOn.cs.button', self);
            } else {
                flag = self.hasClass('active');
                self.toggleClass('active');
                flag ? $parent.trigger('toggleOff.cs.button', self) : $parent.trigger('toggleOn.cs.button', self);
            }
        } else {
            flag = self.hasClass('active');
            self.toggleClass('active');
            flag ? self.trigger($.Event('toggleOff.cs.button')) : self.trigger($.Event('toggleOn.cs.button'));
        }
    };

    $.fn.button.Constructor = Button;

    return Backbone ? Backbone.View.extend({
        render: function () {
            this.$el.button(this.options);
            return this;
        }
    }) : Button;
}));