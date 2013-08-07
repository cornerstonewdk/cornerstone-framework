/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-spinner.js
 *  Description: 스피너는 화면전환 등의 로딩이 필요한 컨텐츠에 대해 UI적으로 로딩 중이라는 것을 표현하기 위한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    factory(root.jQuery, root, doc);
}(this, document, function (jQuery, window, document, undefined) {

    var hasTouch = ('ontouchstart' in window);

    $.fn.spinner = function (opts) {
        opts = $.extend({}, {
            lines: 13, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#FFF', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: true, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        }, opts);

        this.each(function () {
            var $this = $(this),
                data = $this.data();
                console.log('$this',$this);
            if (data.spinner && typeof opts === "string") {
                data.spinner[opts]();
            } else {
                if (data.spinner) {
                    $this.trigger($.Event('hide.cs.spinner'));
                    // 존재한 상태에서 spinner 플러그인을 재호출하면 플러그인을 제거시킨다.
                    setTimeout(function () {
                        data.spinner.stop();
                        delete data.spinner;
                        $this.toggleClass("spinner-outer-bg");
                        $this.trigger($.Event('hidden.cs.spinner'));
                    }, 150);
                } else {
                    $this.trigger($.Event('show.cs.spinner'));
                    $(this).toggleClass("spinner-outer-bg");
                    var style = $this.attr("style");
                    data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
                    ($this.height() > $(window).height()) && $this.find(".spinner:first-child").attr("style", style);
                    $this.trigger($.Event('shown.cs.spinner'));
                }
            }
        });
        return this;
    };

    $.fn.spinner.presets = {
        tiny: { lines: 8, length: 2, width: 2, radius: 3 },
        small: { lines: 8, length: 4, width: 3, radius: 5 },
        large: { lines: 10, length: 8, width: 4, radius: 8 }
    };

    $(function () {
        $(document).off("click.Spinner.data-api").on("click.Spinner.data-api",
            "[data-plugin^=spinner], .spinner-outer-bg", function (e) {
                console.log(e);
            var $btn = $(e.target);
            var target = $btn.data("spinnerTarget");
            $(target).length ? $(target).spinner() : $(this).spinner();
        });

    });
}));

