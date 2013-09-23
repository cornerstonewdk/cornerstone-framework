define([
    'jquery',
    'underscore',
    'backbone',
    'template!view/page2',
    'style!view/page2',
    "widget-rangeinput"
], function ($, _, Backbone, template) {
    return Backbone.View.extend({

        el: 'section#page2',

        render: function (id) {
            var self = this;

            require(['template!../app/template/' + id], function (example) {
                var title = $.trim(id).replace(/css-|cs-/gi, '').replace('cs-', '').replace(/-/gi, ' ');
                self.$el.html(
                    template({
                        pageTitle: title,
                        exampleHtml: example()
                    })
                );

                // 이미지 썸네일 holder.js
                if (id.match(/.*carousel|.*images|.*thumbnails|.*media-object/gi)) {
                    require(['../app/lib/holder'], function () {
                        Holder.run();
                    });
                }

                // 플러그인
                // 모달
                // 드롭다운

                // 스크롤스파이
                $('[data-spy="scroll"]').each(function () {
                    var $spy = $(this);
                    $spy.scrollspy($spy.data())
                });

                // 탭
                // 툴팁
                // 팝오버
                // 경고창
                // 버튼
                // 콜랩스
                // 캐로셀
                // 범위 입력상자
                if (id.match(/.*range-input/gi)) {
                    require(['widget-rangeinput'], function () {
                        $(".widget-range").rangeinput({
                            showInput: true
                        });
                    });
                }
                // 싸인
                if (id.match(/.*sign/gi)) {
                    require(['widget-sign'], function () {
                        $("#signature").length && $("#signature").sign();
                    });
                }
                // 스피너
                if (id.match(/.*spinner/gi)) {
                    require(['widget-spinner']);
                }
                // 모션캡챠
                if (id.match(/.*motion-captcha/gi)) {
                    require(['widget-motioncaptcha'], function () {
                        $("#motion-captcha button").on("click", function (e) {
                            $("#mc-canvas").remove();
                            $("<canvas/>", {
                                "id": "mc-canvas",
                                "class": "mc-canvas"
                            }).appendTo($("#motion-captcha-example")).motioncaptcha({
                                    errorMsg: '다시 시도해주세요.',
                                    successMsg: '성공',
                                    onSuccess: function () {
                                        console.log("성공");
                                    }
                                }).on('start.cs.motionCaptcha',function (e) {
                                    console.log('start.cs.motionCaptcha', e);
                                }).on('move.cs.motionCaptcha',function (e) {
                                    console.log('move.cs.motionCaptcha', e);
                                }).on('end.cs.motionCaptcha',function (e) {
                                    console.log('end.cs.motionCaptcha', e);
                                }).on('success.cs.motionCaptcha',function (e) {
                                    console.log('success 이벤트 감지', e);
                                }).on('fail.cs.motionCaptcha', function (e) {
                                    console.log('fail 이벤트 감지', e);
                                });
                        });
                        $("#motion-captcha button").trigger("click");
                    });
                }
                // 날짜 입력상자
                if (id.match(/.*datepicker/gi)) {
                    require(['widget-datepicker'], function () {
                        $("#date-picker1, #date-picker2").datetimepicker({
                            firstDisable: true,
                            changeDisplay: true
                        });
                    });
                }
                // 자동완성
                if (id.match(/.*typeahead/gi)) {
                    require(['widget-typeahead'], function () {
                        $('.example-countries .typeahead').typeahead({
                            name: 'countries',
                            prefetch: 'data/typeahead-countries.json',
                            limit: 10
                        });
                    });
                }


                // 피처드
                // 스크롤뷰
                if (id.match(/.*scrollview/gi)) {
                    require(['widget-scrollview'], function(ScrollView) {
                        $("#scrollView1,#scrollView2").featuredScrollView();
                    });
                }
                // 리스트뷰
                if (id.match(/.*listview/gi)) {
                    require(['widget-listview'], function () {
                        $(".js-addItem").on("click", function (e) {
                            getItem();
                        });

                        var $el = $('#listView');
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
                                html = '<ul class="list-group">';
                                if (typeof json === "object" && json.items.length > 0) {
                                    $(json.items).each(function (i) {
                                        html += '<li class="list-group-item">';
                                        html += this.title;
                                        html += '   <div class="pull-right">'
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

                        }
                    });
                }
                // 미디어
                // 에디터
                // 차트
                if (id.match(/.*chart/gi)) {
                    require(['widget-chart']);
                }
                // 데이터테이블
            });
            return this;
        },

        events: {
            'click button.next': 'nextPage'
        },

        nextPage: function () {
            location.href = '#page2';
        }
    });
});
