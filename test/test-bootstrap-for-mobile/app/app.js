define(['backbone',
    'views/main', 'views/page-transition', 'views/hover-test',
    'views/fastbutton-test', 'views/scroll-view', 'views/option',
    'bootstrap', 'jquery-aop', 'mobile', 'page-transition', 'stats'],
    function (Backbone, MainView, PageTransitionView, HoverTestView, FastButtonTest, ScrollView, OptionView) {
        return {
            init:function () {
                // Router
                var Routers = Backbone.Router.extend({
                    firstPage:true,
                    defaultTransitionType:'slide',
                    transitionType:this.defaultTransitionType,
                    previousPage:"",
                    currentRoute:"",
                    previousRoute:"",
                    isReverse:false,
                    initialize:function () {
                        var self = this;
                        this.mainView = new MainView();
                        this.pageTransitionView = new PageTransitionView();
                        this.hoverTestView = new HoverTestView();
                        this.fastButtonTest = new FastButtonTest();
                        this.scrollView = new ScrollView();
                        this.optionView = new OptionView();
                        Backbone.history.start();

                        $.aop.before({target:Routers, method:'scrollViewRoute'},
                            function (str) {
                            }
                        );
                    },
                    routes:{
                        '':'main',
                        'main':'main',
                        'page-transition/:type':'pageTransition',
                        'page-transition-slide':'pageTransitionSlide',
                        'page-transition-flip':'pageTransitionFlip',
                        'hover-test':'hoverTest',
                        'fastbutton-test':'fastbuttonTest',
                        'scroll-view/:type':'scrollViewRoute',
                        'option':'option'
                    },
                    'main':function () {
                        this.previousPage = $("#view .current-page ");
                        this.transitionType = "flip"; // beforeNoneSlide slide pop filp fade
                        this.activePage(this.mainView.render().$el);
                    },
                    'pageTransition':function (type) {
                        this.transitionType = type;
                        this.previousPage = $("#view .current-page ");
                        this.transitionType = type;
                        this.activePage($(this.pageTransitionView.render(type).el));
                    },
                    'hoverTest':function () {
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.hoverTestView.render().$el);
                    },
                    'fastbuttonTest':function () {
                        this.transitionType = "fade"; // beforeNoneSlide slide pop filp fade
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.fastButtonTest.render().$el);
                        $.cornerStoneMobile.fastButton();
                    },
                    'scrollViewRoute':function () {
                        this.transitionType = "flip"; // beforeNoneSlide slide pop filp fade
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.scrollView.render().$el);
                        this.scrollView.afterRender();
                    },
                    'option':function () {
                        this.transitionType = "slide"; // beforeNoneSlide slide pop filp fade
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.optionView.render().$el);
                    },
                    'activePage':function (view) {
                        var self = this;

                        view.addClass("current-page");
                        $(this.previousPage).addClass("current-page");

                        if (!this.firstPage) {
                            this.transitionType = "turn"; // beforeNoneSlide slide pop filp fade
                            $.cornerStoneTransition({
                                transitionType:this.transitionType,
                                fallbackType: "fade",
                                inTarget:{
                                    id:"#" + $(view).attr("id"),
                                    done:function () {
                                    }
                                },
                                outTarget:{
                                    id:"#" + $(this.previousPage).attr("id"),
                                    done:function () {
                                        $(this.id).removeClass("current-page")[0].innerHTML = "";
                                    }
                                },
                                isReverse:this.isReverse
                            });
                        }

                        this.previousPage = view;
                        this.firstPage = false;
                        this.transitionType = this.defaultTransitionType;
                        this.isReverse = false;
                    }
                });

                new Routers();
            }
        };

    });
