define([
    "jquery",
    "underscore",
    "backbone",
    "template!view/page2",
    "style!view/page2",
    "widget-rangeinput"
], function ($, _, Backbone, template) {
    return Backbone.View.extend({

        el: "section#page2",

        render: function (id) {
            var self = this;

            require(["template!../app/template/" + id], function (example) {
                var title = $.trim(id).replace(/css-|cs-/, "").replace("cs-", "").replace(/-/, " ");
                self.$el.html(
                    template({
                        pageTitle: title,
                        exampleHtml: example()
                    })
                );

                // 이미지 썸네일 holder.js
                require(["lib/holder"], function () {
                    Holder.run();
                });

                // 플러그인
                // 모달
                // 드롭다운

                // 스크롤스파이
                $("[data-spy=scroll]").each(function () {
                    var $spy = $(this);
                    $spy.scrollspy($spy.data())
                });

                // 탭
                // 툴팁
                if (id.match(/.*tooltip/)) {
                    require(["widget-tooltip"]);
                }
                // 팝오버
                if (id.match(/.*popover/)) {
                    require(["widget-popover"]);
                }
                // 경고창
                // 버튼
                if (id.match(/.*button/)) {
                    $('#fat-btn').click(function () {
                        var btn = $(this)
                        btn.button('loading')
                        setTimeout(function () {
                            btn.button('reset')
                        }, 3000)
                    })
                }
                // 콜랩스
                // 캐로셀
                // 범위 입력상자
                if (id.match(/.*range-input/)) {
                    require(["widget-rangeinput"], function () {
                        $(".widget-range").rangeinput({
                            showInput: true
                        });
                    });
                }
                // 싸인
                if (id.match(/.*sign/)) {
                    require(["widget-sign"], function () {
                        $("#signature").length && $("#signature").sign();

                        // 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
                        $("button.show-sign").on('click', function (e) {
                            var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
                            $("div.widget-sign-viewer").html($("<img/>", {
                                src: "data:" + data
                            }));
                            console.log(data);
                        });

                        // 초기화
                        $("button.reset-sign").on('click', function (e) {
                            $("#signature").sign("reset"); // 초기화
                            $(".widget-sign-viewer img").remove();
                        });

                        // sign 플로그인 이벤트 확장
                        $("#signature").on('start.cs.sign',function (e) {
                            console.log('start.cs.sign', e);
                        }).on('move.cs.sign',function (e) {
                                console.log('move.cs.sign', e);
                            }).on('end.cs.sign', function (e) {
                                console.log('end.cs.sign', e);
                            });

                    });
                }
                // 스피너
                if (id.match(/.*spinner/)) {
                    require(["widget-spinner"], function () {
                        $("[data-plugin=spinner]").on("click", function (e) {
                            e.preventDefault();
                            var self = this;
                            var target = $(this).data("spinnerTarget");
                            window.setTimeout(function () {
                                $(target).spinner("hide");
                            }, 3000);
                        });
                    });
                }
                // 모션캡챠
                if (id.match(/.*motion-captcha/)) {
                    require(["widget-motioncaptcha"], function () {
                        $("#motion-captcha button").on("click", function (e) {
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
                        $("#motion-captcha button").trigger("click");
                    });
                }
                // 날짜 입력상자
                if (id.match(/.*datepicker/)) {
                    require(["widget-datepicker"], function () {
                        $("#date-picker1, #date-picker2").datetimepicker({
                            firstDisable: true,
                            changeDisplay: true
                        });
                    });
                }
                // 자동완성
                if (id.match(/.*typeahead/)) {
                    require(["widget-typeahead"], function () {
                        $(".example-countries .typeahead").typeahead({
                            name: "countries",
                            prefetch: "data/typeahead-countries.json",
                            limit: 10
                        });
                    });
                }


                // 피처드
                // 스크롤뷰
                if (id.match(/.*scrollview/)) {
                    require(["widget-scrollview"], function (ScrollView) {
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

                        $("#scrollView3").featuredScrollView({
                            pullDownAction: function () {
                                setTimeout(function () {
                                    $("#scrollView3").featuredScrollView("refresh");
                                }, 500);
                            },
                            pullUpAction: function () {
                                // ajax로 데이터바인딩이 완료될때 꼭 스크롤뷰 새로고침이 필요함.
                                setTimeout(function () {
                                    // 임시 엘리먼트를 추가한다.
                                    var $el = $("#scrollView3").find(".list-group");
                                    for (i = 0; i < 10; i++) {
                                        $el.append('<li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li>');
                                    }
                                    $("#scrollView3").featuredScrollView("refresh");
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
                                    for (i = 0; i < 10; i++) {
                                        $el.append('<li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li>');
                                    }
                                    scrollView.refresh();
                                }, 500);
                            }
                        });
                        scrollView.render();

                    });
                }
                // 리스트뷰
                if (id.match(/.*listview/)) {
                    require(["widget-listview"], function () {
                        $(".js-addItem").on("click", function (e) {
                            getItem();
                        });

                        var $el = $("#listView");
                        var isLoading = false;
                        var html;

                        $el.on("scrollEnd.cs.liveView", function () {
                            console.log("scrollEndEvent");
                        });

                        // ID가 listView이 엘리먼트에 ListView 피쳐드 적용
                        $el.length && $el.featuredListView({
                            $scroller: $el.closest(".list-view-wrapper"),
                            optimization: true,
                            scrollEndAction: function () {
                                console.log("scrollEndAction");
                            }
                        });

                        // AJAX로 데이터를 가져오는 함수
                        function getItem() {
                            if (isLoading) {
                                return false;
                            }

                            isLoading = true;

                            var request = $.ajax({
                                url: "data/sample-list.json",
                                type: "GET",
                                dataType: "json"
                            });

                            request.done(function (json) {
                                html = "<ul class='list-group'>";
                                if (typeof json === "object" && json.items.length > 0) {
                                    $(json.items).each(function (i) {
                                        html += "<li class='list-group-item'>";
                                        html += this.title;
                                        html += "   <div class='pull-right'>"
                                        html += "   <span class='badge'>" + this.published + "</span>";
                                        html += "   <span class='glyphicon glyphicon-chevron-right'></span>";
                                        html += "   </div>";
                                        html += "</li>";
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

                        }
                    });
                }
                // 미디어
                if (id.match(/featured-media/)) {
                    require(["widget-media"]);
                }
                // 에디터
                if (id.match(/.*editor/)) {
                    require(["widget-editor"]);
                    $("[data-featured=editor]").each(function () {
                        $.fn.featuredEditor && $(this).featuredEditor();
                    });
                }
                // 차트
                if (id.match(/.*chart/)) {
                    require(["widget-chart"]);
                    $("[data-featured=chart]").each(function () {
                        var self = this,
                            dataUrl = $(this).data("chartBind");

                        dataUrl && $.getJSON(dataUrl).success(function (json) {
                            $.fn.featuredChart && $(self).featuredChart({
                                chartType: $(self).data("chartType"),
                                format: $(self).data("chartFormat"),
                                data: json
                            });
                        });
                    });
                }
                // 데이터테이블
                if (id.match(/.*datatable/)) {
                    require(["widget-datatable"]);
                    $("[data-featured=datatable]").each(function () {
                        $.fn.featuredDataTable && $(this).featuredDataTable({
                            "sAjaxSource": $(this).data("datatableBind")
                        });
                    });
                }
            });
            return this;
        },

        events: {
            "click button.next": "nextPage"
        },

        nextPage: function () {
            location.href = "#page2";
        }
    });
});
