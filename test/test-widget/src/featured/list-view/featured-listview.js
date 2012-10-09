/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-listview.js
 *  Description: 리스트뷰는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        /**
         * ListView는 Handlebar.js와 Infinity.js를 사용한다.
         */
        define(function (require, exports, module) {
            var $ = require("jquery");
            return factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document) {
    var pluginName = "featuredListView",
        ListView,
        ListItem,
        listTemplate,
        template,
        defaultOptions = {
            optimization: true,
            SCROLL_THROTTLE: 100
        };

    var Plugin = function (element, options) {
        var self = this;
        this.$el = $(element);
        this.options = options = $.extend(true, defaultOptions, options);

        infinity.config.SCROLL_THROTTLE = this.options.SCROLL_THROTTLE;
        ListView = infinity.ListView;
        ListItem = infinity.ListItem;

        this.$el.each(function () {
            if(options.optimization) {
                html = self.$el.html();
                self.$el.html("");

                // 리스트뷰 최적화를 위해 Infinity 적용
                listView = new ListView($(this));
                $(this).data('listView', listView);
                self.$el.data('listView').append(html);

                // HTML 초기화
                html = "";
            }
        });
    };

    Plugin.prototype.addItem = function (options, html) {
        if(options.optimization) {
            this.$el.data('listView').append(html);
        } else {
            this.$el.append(html);
        }

        // 리스트 아이템을 완료할때 이벤트를 발생시킨다.
        this.$el.trigger("listView.addItem.done");
    };

    Plugin.prototype.scrollHandler = function (options) {
        this.$el.data('listView').scrollHandler();
    };

    // 프로토타입 클래스로 정의된 객체를 플러그인과 연결시킨다.
    $.fn[pluginName] = function (options, html) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)))
            }

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options == 'string') {
                data[options](data.options, html);
            }
        });
    };

    $.fn[pluginName].Constructor = Plugin;

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=listView]").each(function (i) {
        $(this)[pluginName]();
    });
}));