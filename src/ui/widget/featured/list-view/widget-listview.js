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

        define([ "backbone", "underscore", "jquery"], function (Backbone, _, $) {
            factory($, root, doc);
            return Backbone.View.extend({
                initialize:function () {
                    _.bindAll(this, "render");
                },

                addItem:function (view, collection) {
                    collection.each(function (model) {
                        view.itemView = new view.options.itemView({model:model});
                        view.$el.featuredListView("addItem", view.itemView.render().el);
                    });
                },

                removeItem:function ($target, aNumbers) {
                    return this.$el.featuredListView("removeItem", $target, aNumbers);
                },

                updateListView:function (view) {
                    view.collection.fetch({
                        success:function (collection) {
                            view.addItem(view, collection);
                        }
                    });
                },

                render:function () {
                    this.$el.featuredListView(this.options);

                    this.updateListView(this);

                    return this;
                }
            });
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
        defaultOptions;

    var Plugin = function (element, options) {
        var self = this;
        defaultOptions = {
            optimization:true,
            SCROLL_THROTTLE:0,
            scrollEndAction:null
        };
        this.$el = $(element);
        this.options = options = $.extend(true, defaultOptions, options);

        infinity.config.SCROLL_THROTTLE = this.options.SCROLL_THROTTLE;
        ListView = infinity.ListView;
        ListItem = infinity.ListItem;

        this.$el.each(function () {
            if (options.optimization) {
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

        this.scrollHeight = navigator.userAgent.match(":*iPhone:*") && !window.navigator.standalone ? 60 : 0;
        $(window).on("scroll", function () {
//            console.log($(window).scrollTop(), $(document).height() , $(window).height() , self.scrollHeight);
            if ($(window).scrollTop() == $(document).height() - $(window).height() - self.scrollHeight) {
                options.scrollEndAction();
                self.$el.trigger("scrollEnd");
            }
        });
    };

    Plugin.prototype.addItem = function (options, html) {
        if (options.optimization) {
            this.$el.data('listView').append($(html));
        } else {
            this.$el.append(html);
        }

        // 리스트 아이템 추가를 완료할 때 이벤트를 발생시킨다.
        this.$el.trigger("listView.addItem.done");
    };

    Plugin.prototype.removeItem = function (options, page, items) {
        var i = 0, j = 0;
        var height = 0;
        var length;
        var listItems;
        var target;
        if (options.optimization) {
            if (typeof items === "undefined") {
                listItems = this.$el.data('listView').find(page);
                for (i = 0, length = listItems.length; i < length; i++) {
                    listItems[i].remove();
                }
            } else {
                listItems = this.$el.data('listView').find(page);
                for (i = 0, length = listItems.length; i < length; i++) {
                    for (j in items) {
                        target = listItems[i].$el.find("[data-list-itemid='" + items[j] + "']");
                        height += target.height()
                        target.remove();
                    }
                    listItems[i].parent.height = listItems[i].parent.height - height;
                }
            }

            window.scrollTo(window.scrollX, window.scrollY - ($(options.spinner).height()));
        } else {
            if (typeof items === "undefined") {
                page.remove();
            } else {
                for (i in items) {
                    page.find("[data-list-itemid='" + items[i] + "']").remove();
                }
            }

            window.scrollTo(window.scrollX, window.scrollY - ($(options.spinner).height()));
        }

        this.refresh();
        // 리스트 아이템 삭제를 완료할때 이벤트를 발생시킨다.
        this.$el.trigger("listView.removeItem.done");
    };

    Plugin.prototype.refresh = function (option) {
        var listView = this.$el.data('listView');
        var height = 0;

        $(listView.pages).each(function (i) {
            height += this.height;
        });
        listView.height = height;
        this.$el.children("div").css({"height":listView.height});

        window.scrollTo(window.scrollX, window.scrollY - $(options.spinner).height());
    };

    Plugin.prototype.scrollHandler = function (options) {
        this.$el.data('listView').scrollHandler();
    };

    // 프로토타입 클래스로 정의된 객체를 플러그인과 연결시킨다.
    $.fn[pluginName] = function (options, page, items) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)))
            }

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options == 'string') {
                data[options](data.options, page, items);
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

    return Plugin;
}));