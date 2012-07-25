define(['backbone',
    'views/main', 'views/page-transition', 'views/hover-test',
    'views/fastbutton-test', 'views/scroll-view', 'views/option',
    'bootstrap', 'jquery-aop', 'mobile', 'page-transition', 'stats'],
    function (Backbone, MainView, PageTransitionView, HoverTestView, FastButtonTest, ScrollView, OptionView) {
        return {
            aop:function () {

            },
            init:function () {
                // Router
                var Routers = Backbone.Router.extend({
                    firstPage:true,
                    defaultTransitionType:'slide',
                    transitionType:this.defaultTransitionType,
                    previousPage:"",
                    currentRoute:"",
                    initialize:function () {
                        var self = this;
                        console.log("start Routers");
                        this.mainView = new MainView();
                        this.pageTransitionView = new PageTransitionView();
                        this.hoverTestView = new HoverTestView();
                        this.fastButtonTest = new FastButtonTest();
                        this.scrollView = new ScrollView();
                        this.optionView = new OptionView();
                        Backbone.history.start();

                        $.aop.before({target:Routers, method:'scrollViewRoute'},
                            function (str) {
                                self.log(str);
                            }
                        );
                    },
                    'log':function (str) {
                        console.log('Output = ' + str);
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
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.fastButtonTest.render().$el);
                        $.cornerStoneMobile.fastButton();
                    },
                    'scrollViewRoute':function () {
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.scrollView.render().$el);
                        this.scrollView.afterRender();
                    },
                    'option':function () {
                        this.previousPage = $("#view .current-page ");
                        this.activePage(this.optionView.render().$el);
                    },
                    'activePage':function (view) {
                        var self = this,
                            currentPage = Backbone.history.fragment;

                        this.transitionType = 'slide'; // beforeNoneSlide   slide   pop filp    fade
                        view.addClass('current-page');

                        if(!this.firstPage) {
                            console.log("start activePage");
                            $.cornerStoneTransition({
                                transitionType: this.transitionType,
                                inTarget: view,
                                outTarget: this.previousPage,
                                complete: function() {
                                    this.outTarget.removeClass().html("");
                                }
                            });
                            console.log("end activePage");
                        }

                        this.firstPage = false;
                        this.transitionType = this.defaultTransitionType;
                    }
                });

                new Routers();
            }
        };

    });
