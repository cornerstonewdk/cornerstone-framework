define([
    "jquery",
    "underscore",
    "backbone",
    "handlebars",
    "template!view/page2",
    "widget-modal",
    "widget-dropdown",
    "widget-scrollspy",
    "widget-tab",
    "widget-tooltip",
    "widget-popover",
    "widget-alert",
    "widget-button",
    "widget-collapse",
    "widget-carousel",
    "widget-rangeinput",
    "widget-sign",
    "widget-spinner",
    "widget-motioncaptcha",
    "widget-datepicker",
    "widget-typeahead",
    "widget-scrollview",
    "widget-listview",
    "widget-media",
    "widget-editor",
    "widget-datatable",
    "widget-touch",
    "style!view/page2"
], function ($, _, Backbone, Handlebars, Template, Modal, Dropdown, Scrollspy, Tab, Tooltip, Popover, Alert, Button, Collapse, Carousel, RangeInput, Sign, Spinner, Motioncaptcha, Datepicker, Typeahead, ScrollView, ListView, Media, Editor, Datatable) {

    return Backbone.View.extend({
        el: "section#page2",
        template: Template,
        render: function (id) {
            var self = this;

            require(["template!../app/template/" + id], function (example) {
                var title = $.trim(id).replace(/css-|cs-/, "").replace("cs-", "").replace(/-/, " ");
                self.$el.html(self.template({
                    pageTitle: title,
                    exampleHtml: example()
                }));
                self.activePlugin();
            });
            return this;
        },

        activePlugin: function () {
            // 이미지 썸네일 holder.js
            require(["lib/holder"], function () {
                Holder.run();
            });

            $('[data-toggle=tooltip]').each(function () {
                $(this).tooltip();
            });

            $('[data-toggle=popover]').each(function () {
                $(this).popover();
            });

            // Plugin
            this.activeScrollspy();
            this.activeButton();
            this.activeRangeinput();
            this.activeSign();
            this.activeSpinner();
            this.activeMotioncaptcha();
            this.activeDatepicker();
            this.activeTypeahead();

            // Featured
            this.activeScrollView();
            this.activeListView();
            this.activeMedia();
            this.activeEditor();
            this.activeDatatable();
        },

        activeScrollspy: function () {
            $("[data-spy=scroll]").each(function () {
                var $spy = $(this);
                $spy.scrollspy($spy.data())
            });
        },
        activeButton: function () {
            $("#fat-btn").click(function () {
                var btn = $(this);
                btn.button("loading");
                setTimeout(function () {
                    btn.button("reset");
                }, 3000)
            });
        },
        activeRangeinput: function () {
            $(".widget-range").each(function () {
                var $el = $(this);
                $el.rangeinput($el.data("rangeOptions"));
            });
        },
        activeSign: function () {
            var $signature = $("#signature");
            $signature.length && $signature.sign();

            // 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
            $("button.show-sign").on("click", function () {
                var data = $signature.sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
                $("div.widget-sign-viewer").html($("<img/>", {
                    src: "data:" + data
                }));
                console.log(data);
            });

            // 초기화
            $("button.reset-sign").on("click", function () {
                $signature.sign("reset"); // 초기화
                $(".widget-sign-viewer img").remove();
            });

            // sign 플로그인 이벤트 확장
            $signature.on("start.cs.sign",function (e) {
                console.log("start.cs.sign", e);
            }).on("move.cs.sign",function (e) {
                console.log("move.cs.sign", e);
            }).on("end.cs.sign", function (e) {
                console.log("end.cs.sign", e);
            });
        },
        activeSpinner: function () {
            $("[data-plugin=spinner]").on("click", function (e) {
                e.preventDefault();
                var target = $(this).data("spinnerTarget");
                window.setTimeout(function () {
                    $(target).spinner("hide");
                }, 3000);
            });
        },
        activeMotioncaptcha: function () {
            var $motionCaptcha = $("#motion-captcha");
            $motionCaptcha.find("button").on("click", function () {
                $("#mc-canvas").remove();
                $("<canvas/>", {
                    "id": "mc-canvas",
                    "class": "mc-canvas"
                }).appendTo($("#motion-captcha-example")).motioncaptcha({
                    errorMsg: "다시 시도해주세요.",
                    successMsg: "성공",
                    onSuccess: function () {
                        console.log("성공");
                    }
                }).on("start.cs.motionCaptcha",function (e) {
                    console.log("start.cs.motionCaptcha", e);
                }).on("move.cs.motionCaptcha",function (e) {
                    console.log("move.cs.motionCaptcha", e);
                }).on("end.cs.motionCaptcha",function (e) {
                    console.log("end.cs.motionCaptcha", e);
                }).on("success.cs.motionCaptcha",function (e) {
                    console.log("success 이벤트 감지", e);
                }).on("fail.cs.motionCaptcha", function (e) {
                    console.log("fail 이벤트 감지", e);
                });
            });
            $motionCaptcha.find("button").trigger("click");
        },
        activeDatepicker: function () {
            $("#date-picker1, #date-picker2").datetimepicker({
                firstDisable: true,
                changeDisplay: true
            });
        },
        activeTypeahead: function () {
            $(".example-countries .typeahead").typeahead({
                name: "countries",
                prefetch: "data/typeahead-countries.json",
                limit: 10
            });
        },
        activeScrollView: function () {
            $("#scrollView1").featuredScrollView()
            .on("pullDown",function (e) {
                console.log("pullDown", e);
            }).on("pullUp",function (e) {
                console.log("pullUp", e);
            }).on("refresh",function (e) {
                console.log("refresh", e);
            }).on("destroy", function (e) {
                console.log("destroy", e);
            });

            $("#scrollView2").featuredScrollView({
                scrollbarClass: ""
            }).on("pullDown",function (e) {
                console.log("pullDown", e);
            }).on("pullUp",function (e) {
                console.log("pullUp", e);
            }).on("refresh",function (e) {
                console.log("refresh", e);
            }).on("destroy", function (e) {
                console.log("destroy", e);
            });

            var $scrollView3 = $("#scrollView3");
            $scrollView3.featuredScrollView({
                pullDownAction: function () {
                    setTimeout(function () {
                        $scrollView3.featuredScrollView("refresh");
                    }, 500);
                },
                pullUpAction: function () {
                    // ajax로 데이터바인딩이 완료될때 꼭 스크롤뷰 새로고침이 필요함.
                    setTimeout(function () {
                        // 임시 엘리먼트를 추가한다.
                        var $el = $scrollView3.find(".list-group");
                        for (var i = 0; i < 10; i++) {
                            $el.append('<li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li>');
                        }
                        $scrollView3.featuredScrollView("refresh");
                    }, 500);
                }
            }).on("pullDown",function (e) {
                console.log("pullDown", e);
            }).on("pullUp",function (e) {
                console.log("pullUp", e);
            }).on("refresh",function (e) {
                console.log("refresh", e);
            }).on("destroy", function (e) {
                console.log("destroy", e);
            });


            var scrollView = new ScrollView({
                el: "#scrollView4",
                pullDownAction: function () {
                    setTimeout(function () {
                        scrollView.refresh();
                    }, 500);
                },
                pullUpAction: function () {
                    // ajax로 데이터바인딩이 완료될때 꼭 스크롤뷰 새로고침이 필요함.
                    setTimeout(function () {
                        // 임시 엘리먼트를 추가한다.
                        var $el = scrollView.$el.find(".list-group");
                        for (var i = 0; i < 10; i++) {
                            $el.append('<li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li>');
                        }
                        scrollView.refresh();
                    }, 500);
                }
            });
            scrollView.render();
        },
        activeListView: function () {
            var $el = $("#listView");
            // 리스트뷰
            var jQueryPlugin = function () {
                var isLoading = false;
                var html;
                var getItem = function ($el) {
                    if (isLoading)
                        return false;

                    isLoading = true;

                    var request = $.ajax({
                        url: "data/sample-list.json",
                        type: "GET",
                        dataType: "json"
                    });

                    request.done(function (json) {
                        html = '<ul class="list-group">';
                        if (typeof json === "object" && json.items.length > 0) {
                            $(json.items).each(function () {
                                html += '<li class="list-group-item">';
                                html += this.title;
                                html += '   <div class="pull-right">';
                                html += '   <span class="badge">' + this.published + '</span>';
                                html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
                                html += '   </div>';
                                html += '</li>';
                            });
                            html += "</ul>";
                            $el.featuredListView("addItem", html);
                        }
                        html = "";
                        isLoading = false;
                    });

                    request.fail(function (jqXHR, textStatus) {
                        console.log("Request failed: " + textStatus);
                        isLoading = false;
                    });
                    return true;
                };

                /**
                 * Default ListView
                 */
                $el.featuredListView({
                    optimization: true,
                    scrollEndAction: function () {
                        console.log("window scrollEndAction");
                        getItem($el);
                    }
                }).on("scrollEnd.cs.listView", function () {
                    console.log("window scrollEndEvent");
                });
                getItem($el);
            };
            var backboneView = function () {
                // 콜렉션에 데이터를 가져올 url를 설정한다.
                var ItemList = Backbone.Collection.extend({
                    url: "data/sample-list.json",
                    model: Backbone.Model.extend({
                        idAttribute: "_id" // 기본 id 속성은 id이다. id 명칭을 변경하고 싶을 때 설정
                    })
                });
                var itemList = new ItemList();

                // 아이템뷰를 만든다.
                var html = '{{_id}}. {{this.title}}';
                html += '<div class="pull-right">';
                html += '   <span class="badge">{{this.published}}</span>';
                html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
                html += '</div>';

                // 리스트 아이템 뷰 정의
                var ItemView = Backbone.View.extend({
                    tagName: "div",
                    className: "list-group-item",
                    template: Handlebars.compile(html),
                    render: function () {
                        this.$el.html(this.template(this.model.attributes));
                    }
                });

                window.myitem = itemList;

                // 리스트뷰 뷰 객체를 생성하고 el에 설정된 타겟에 model객체에 담긴 데이터를 통해 리스트뷰를 그린다.
                var listView = new ListView({
                    el: "#listView",
                    collection: itemList,
                    itemView: ItemView, // 사용자가 정의하는 리스트의 한 Row가 되는 SubView
                    optimization: true
                });
                listView.render();

                listView.$el.on("scrollEnd.cs.listView", function () {
                    console.log("window scrollEndEvent");
                    itemList.url = "data/sample-list2.json";
                    itemList.fetch({update: true, remove: false});
//                    itemList.fetch();
                });
                itemList.fetch();
            };

            backboneView();

            this.$el.find(".js-plugin").off("click").on("click", jQueryPlugin);
            this.$el.find(".js-view").off("click").on("click", backboneView);
        },
        activeMedia: function () {
            $("[data-featured=media]").each(function () {
                $(this).featuredMedia();
            });
        },
        activeEditor: function () {
            $("[data-featured=editor]").each(function () {
                $.fn.featuredEditor && $(this).featuredEditor();
            });
        },
        activeDatatable: function () {
            if($("#datatable").length) {
                var Model = Backbone.Model.extend({
                    url: "data/sample-datatables.json"
                });
                var model = new Model();

                var detatable = new Datatable({
                    el: "#datatable",
                    model: model
                });
                model.fetch();
            }

            $("[data-featured=datatable]").each(function () {
                $.fn.featuredDataTable && $(this).featuredDataTable({
                    "sAjaxSource": $(this).data("datatableBind")
                });
            });
        }
    });
});
