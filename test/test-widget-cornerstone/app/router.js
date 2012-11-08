define([
    "require",
    "backbone",
    "transition",
    "views/layout/layoutView",
    "widget-plugins"
], function (require, Backbone, Transition, LayoutView) {
    var MainRouter = Backbone.Router.extend({
        routes:{
            // 개요
            "":"index",
            "index":"index",

            // 리스트뷰
            "list":"list",
            "list/:index":"listDetail",

            // 차트
            "chart":"chart",
            "chart/:type":"chartDetail",

            // 데이터테이블
            "datatables":"datatables",
            "datatables/:index":"datatablesDetail",

            // 라우트에 바인딩 되지 않은 Hash은 모두 404 에러로 처리한다.
            "*actions":"error404"
        },

        firstPage:true,

        // 초기화
        initialize:function () {
            this.layoutView = new LayoutView();
            this.layoutView.render();
        },

        // 타겟 Hash 라우트 이전 실행
        beforeRoute:function () {
            this.layoutView.footerView.fixBodyHeight();
        },

        // Hash별 정의된 함수와 전후 처리 함수를 실행
        runRoute:function (currentRouteObj) {
            this.beforeRoute(currentRouteObj.fragment);
            currentRouteObj.func(this);

            if (this.firstPage) {
                this.firstPage = false;
            }
        },

        // 타겟 Hash 라우트 이후 실행
        afterRoute:function () {
            var transitionType = "flip"; //$(this).attr("data-transition"),
            var inTargetID = "#front";
            var outTargetID = "#" + $("div.current").attr("id");

            if (outTargetID === "#front") {
                inTargetID = "#back";
            }

            if(this.firstPage) {
                $(inTargetID).toggleClass("current").toggleClass("new-page");
                $(outTargetID).toggleClass("current").toggleClass("new-page");
            }

            if (!this.firstPage) {
                Transition.launcher({
                    transitionType:transitionType, // 화면전환 효과 기본 None(효과 없음)
                    inTarget:{
                        el:inTargetID // 들어오는 페이지의 ID 값
                    },
                    outTarget:{
                        el:outTargetID // 나가는 페이지의 ID 값
                    },
                    isReverse:false, // 뒤로가기 여부
                    done:function () {
                        $(inTargetID).toggleClass("current").toggleClass("new-page");
                        $(outTargetID).toggleClass("current").toggleClass("new-page");

                    }
                });
            }
            this.layoutView.headerView.headerMenuActivate();
        },

        index:function () {
            location.href = "#list";
//            this.runRoute({
//                fragment:Backbone.history.fragment,
//                func:function (self) {
//                }
//            });
        },

        // 리스트뷰
        list:function () {
            this.runRoute({
                fragment:Backbone.history.fragment,
                func:function (self) {
                    require(["views/list/indexView"], function (View) {
                        var view = new View();
                        view.render();
                        self.afterRoute();
                    });
                }
            });
        },
        listDetail:function (index) {
            this.runRoute({
                fragment:Backbone.history.fragment,
                func:function (self) {
                    require(["views/list/detailView"], function (View) {
                        var view = new View();
                        view.render();
                        self.afterRoute();
                    });
                }
            });
        },

        // 차트
        chart:function () {
            this.runRoute({
                fragment:Backbone.history.fragment,
                func:function (self) {
                    require(["views/chart/indexView"], function (View) {
                        var view = new View();
                        view.render();
                        self.afterRoute();
                    });
                }
            });
        },
        chartDetail:function (index) {
            this.runRoute({
                fragment:Backbone.history.fragment,
                func:function (self) {
                }
            });
        },

        // 데이터테이블
        datatables:function () {
            this.runRoute({
                fragment:Backbone.history.fragment,
                func:function (self) {
                    require(["views/datatables/indexView"], function (View) {
                        var view = new View();
                        view.render();
                        self.afterRoute();
                    });
                }
            });
        },
        datatablesDetail:function (index) {
            this.runRoute({
                fragment:Backbone.history.fragment,
                func:function (self) {
                    require(["views/datatables/indexView"], function (View) {
                        var view = new View();
                        view.render();
                    });
                }
            });
        },

        // 404 에러 핸들링
        error404:function (actions) {
            console.log("404 ERROR", actions);
        },

        // 500 에러
        error500:function (actions, error) {
            console.log("500 ERROR", actions, error);
        }

    });

    new MainRouter();

    Backbone.history.start();
});
