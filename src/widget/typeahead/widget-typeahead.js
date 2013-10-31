;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === "function" && define.amd)
        define([ "jquery", "underscore", "backbone", "typeahead" ], factory);
    else
        root.Typeahead = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    /*
     typeahead : typeahead내에 typeahead:selected 발생 시 동일한 구조의 selected.cs.typeahead 발생
     */
    $.fn.twitterTypeahead = $.fn.typeahead;

    $.fn.typeahead = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.twitterTypeahead(options);
            $this.on('typeahead:selected', function (e, datum, dataset) {
                $this.trigger('selected.cs.typeahead', [ datum, dataset ]);
            });
        });
    };

    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.typeahead(methodName);
            } else {
                this.$el.typeahead(this.options);
            }
            return this;
        }
    });
}));