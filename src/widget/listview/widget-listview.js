/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-listview.js
 *  Description: 리스트뷰는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */
;
(function (root, factory) {
    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "infinity" ], factory);
    else
        root.ListView = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    var pluginName = "featuredListView",
    ListView,
    ListItem,
    defaultOptions;

    var Plugin = function (element, options) {
        var self = this;
        defaultOptions = {
            $scroller: $(window),
            optimization: true,
            SCROLL_THROTTLE: 0,
            PAGE_TO_SCREEN_RATIO: 3,
            scrollEndAction: function () {

            }
        };
        this.$el = $(element);
        this.options = options = $.extend(true, defaultOptions, options);

        infinity.config.SCROLL_THROTTLE = this.options.SCROLL_THROTTLE;
        infinity.config.PAGE_TO_SCREEN_RATIO = this.options.PAGE_TO_SCREEN_RATIO;
        ListView = infinity.ListView;
        ListItem = infinity.ListItem;

        this.$el.each(function () {
            if (options.optimization) {
                var html = self.$el.html();
                self.$el.html("");

                // 리스트뷰 최적화를 위해 Infinity 적용
                var listView = new ListView($(this));
                $(this).data('listView', listView);
                self.$el.data('listView').append(html);
            }
        });

        this.scrollHeight = navigator.userAgent.match(":*iPhone:*") && !window.navigator.standalone ? 60 : 0;
        var scrollTop = 0;
        var scrollEndTrigger = function () {
            options.scrollEndAction();
            self.$el.trigger("scrollEnd.cs.listView");
        };
        options.$scroller.on("scroll.cs.listView", function (e) {
            if (e.target.tagName) {
                if ($(this)[0].scrollHeight - $(this).scrollTop() == $(this).outerHeight()) {
                    scrollEndTrigger();
                }
            } else {
                scrollTop = navigator.userAgent.match("Android") ? $(window).scrollTop() + 100 : $(window).scrollTop();
                if (scrollTop >= ($(document).height() - $(window).height() - self.scrollHeight)) {
                    scrollEndTrigger();
                }
            }
        });
    };

    Plugin.prototype.addItem = function (html) {
        if (this.options.optimization) {
            this.$el.data('listView').append($(html));
        } else {
            this.$el.append(html);
        }
        this.refresh();

        // 리스트 아이템 추가를 완료할 때 이벤트를 발생시킨다.
        this.$el.trigger("listView.addItem.done");
    };

    Plugin.prototype.removeItem = function ($item) {
        if (this.options.optimization) {
            // TODO
            var listView = this.$el.data('listView');
            listView.cleanup();
            $item.remove();
        } else {
            $item.remove();
        }

        this.refresh();
        // 리스트 아이템 삭제를 완료할때 이벤트를 발생시킨다.
        this.$el.trigger("listView.removeItem.done");
    };

    Plugin.prototype.refresh = function () {
        if (this.options.optimization) {
            var height = this.$el.children("div").find("div").eq(0).height();
            var itemHeight = this.$el.find("[data-list-itemid]").outerHeight() * 1.5;
            this.$el.find("[data-infinity-pageid]").each(function () {
                height += $(this).height();
            });

            if (this.$el.find("[data-infinity-pageid]").length === 3) {
                height += itemHeight;
            }
            this.$el.children("div").css("height", height);
        }
    }

    Plugin.prototype.scrollHandler = function () {
        this.$el.data('listView').scrollHandler();
    };

    // 프로토타입 클래스로 정의된 객체를 플러그인과 연결시킨다.
    $.fn[pluginName] = function (options, _options) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)))
            }

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options == 'string') {
                data[options](_options);
            }
        });
    };

    $.fn[pluginName].Constructor = Plugin;

    $(function () {
        /**
         * DATA API (HTML5 Data Attribute)
         */
        $("[data-featured=listView]").each(function () {
            $(this)[pluginName]();
        });
    });

    return Backbone ? Backbone.View.extend({
        tagName: "ul",
        collectionItems: "items",
        initialize: function (options) {
            this.options = options;

            this.listenTo(this.collection, "add", this.addOne);
            this.listenTo(this.collection, "remove", this.removeOne);
            this.listenTo(this.collection, "reset", this.reset);
        },

        addAll: function () {
            this.collection.forEach(this.addOne, this);
        },

        addOne: function (model) {
            // reset된 경우 플러그인이 초기화되므로 reset 이후 최초 add 이벤트 때 플러그인 존재여부 검사
            var plugin = this.$el.data(pluginName);
            plugin || this.$el.featuredListView(this.options);

            var ItemView = this.options.itemView;
            var itemView = new ItemView({model: model});
            itemView.render();
            itemView.$el.attr("data-list-itemid", model.cid);

            this.$el.featuredListView("addItem", itemView.el);
        },

        removeOne: function (model) {
            var $item = this.$el.find("[data-list-itemid=" + model.cid + "]");

            this.$el.featuredListView("removeItem", $item);
        },

        reset: function () {
            this.$el.data(pluginName, null);
            $(window).off("scroll.cs.listView");
            this.$el.empty();
        },

        render: function () {
            this.$el.featuredListView(this.options);
            this.addAll();
            return this;
        }
    }) : Plugin;
}));