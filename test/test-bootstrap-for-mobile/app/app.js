define(['backbone', 'views/main', 'views/page-transition', 'views/page-transition-slide', 'views/page-transition-flip', 'views/hover-test', 'views/option', 'bootstrap'],
    function (Backbone, MainView, PageTransitionView, PageTransitionSlideView, PageTransitionFlipView, HoverTestView, OptionView) {
        return {
            init:function () {
                // Router
                var Routers = Backbone.Router.extend({
                    firstPage:true,
                    transitionType:'slide',
                    previousPage:"",
                    initialize:function () {
                        console.log("start Routers");
                        this.mainView = new MainView();
                        this.pageTransitionView = new PageTransitionView();
                        this.pageTransitionSlideView = new PageTransitionSlideView();
                        this.pageTransitionFlipView = new PageTransitionFlipView();
                        this.hoverTestView = new HoverTestView();
                        this.optionView = new OptionView();
                        Backbone.history.start();
                    },
                    currentRoute:"",
                    routes:{
                        '':'main',
                        'main':'main',
                        'page-transition':'pageTransition',
                        'page-transition-slide':'pageTransitionSlide',
                        'page-transition-flip':'pageTransitionFlip',
                        'hover-test':'hoverTest',
                        'option':'option'
                    },
                    'main':function () {
                        this.previousPage = $("#view .current-page ");
                        console.log(this.previousPage);
                        this.activePage(this.mainView.render().$el);
                    },
                    'pageTransition':function () {
                        this.previousPage = $("#view .current-page ");
                        console.log(this.previousPage);
                        this.activePage(this.pageTransitionView.render().$el);
                    },
                    'pageTransitionSlide':function () {
                        this.previousPage = $("#view .current-page ");
                        console.log(this.previousPage);
                        this.transitionType = 'slide';
                        this.activePage(this.pageTransitionSlideView.render().$el);
                    },
                    'pageTransitionFlip':function () {
                        this.previousPage = $("#view .current-page ");
                        console.log(this.previousPage);
                        this.transitionType = 'flip';
                        this.activePage(this.pageTransitionFlipView.render().$el);
                    },
                    'hoverTest':function () {
                        this.previousPage = $("#view .current-page ");
                        console.log(this.previousPage);
                        this.activePage(this.hoverTestView.render().$el);
                    },
                    'option':function () {
                        this.previousPage = $("#view .current-page ");
                        console.log(this.previousPage);
                        this.activePage(this.optionView.render().$el);
                    },
                    'activePage':function (view) {
                        var currentPage = Backbone.history.fragment;

                        // TODO 모바일 터치 반응을 빠르기 위해 수동적으로 Dropdown 후 처리
                        $(".nav-collapse").css('height', '0').removeClass('in');

                        $('header .nav li').each(function (i) {
                            $(this).removeClass("active");
                            if (("#" + currentPage) == $("a", this).attr("href")) {
                                $(this).addClass("active");
                            }
                        });

                        $("#view section").attr("class", "");

                        if (this.firstPage) {
                            view.addClass("current-page active in");
                        } else {
                            console.log(this.previousPage);
                            this.previousPage.addClass("active out " + this.transitionType);

                            /**
                             * TODO IE9에서 webkit-animation 미지원
                             * 방안1) Fade효과로 대체
                             * 방안2) -webkit-animation을 사용하지 않고 IE인 경우 $.animate로 대체
                             */
                            if ($.browser.msie) {
                                this.previousPage.html("");
                                alert(this.previousPage);
                                view.fadeIn();
                            } else {
                                view.addClass("current-page active in " + this.transitionType);
                            }
                        }
                        this.transitionType = 'slide';
                        this.firstPage = false;
                    }
                });

                new Routers();
            }
        };

    });
