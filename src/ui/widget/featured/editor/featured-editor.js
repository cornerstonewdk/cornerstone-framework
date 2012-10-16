/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-editor.js
 *  Description: 에디터는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD Hybrid 포맷
        define(function (require, exports, module) {
            var $ = require("jquery");
            return factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document) {

    var pluginName = "featuredEditor",
        defaultOptions = {

        };

    var Plugin = function (element, options) {
        var self = this;
        this.options = options;
        this.$el = $(element);

        this.formCheck();

        options = $.extend(true, defaultOptions, options);
        this.iscroll = new iScroll(this.$el.attr("id"), options);

        console.log(this.$el);
    };

    Plugin.prototype.refresh = function () {
        this.iscroll.refresh();
    };

    // 폼 엘리먼트인 경우 드래그로 입력박스 터치불가한 문제를 해결
    Plugin.prototype.formCheck = function () {

        defaultOptions.onBeforeScrollStart = onBeforeScrollStart;
    };

    // 스크롤뷰 플러그인 랩핑 및 기본값 설정
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            myScroll = new Plugin(this, options);
        });
    };

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=scrollview]").each(function (i) {
        $(this)[pluginName]();
    });
}));