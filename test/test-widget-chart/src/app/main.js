/**
 * main.js
 * 애플리케이션 메인
 */
define([
    'view/page1',
    'view/page2',
    'view/page3',
    'view/page4',
    'view/page5',
    'backbone',
    'multipage-router',
    'bootstrap',
    'bootstrap-select',
    'style!main' ], function (Page1View, Page2View, Page3View, Page4View, Page5View, Backbone, MultipageRouter) {
    return {
        launch: function () {

            // Router
            var MainRouter = MultipageRouter.extend({

                pages: {
                    'page1': {
                        fragment: [ '', 'page1' ],
                        el: '#page1',
                        render: function () {
                            new Page1View().render();
                        },
                        active: function () {
                            $(".container > section:not(#page1)").html("");
                        }
                    },
                    'page2': {
                        fragment: 'page2',
                        el: '#page2',
                        render: function () {
                            new Page2View().render();
                        },
                        active: function () {
                            $(".container > section:not(#page2)").html("");
                        }
                    },
                    'page3': {
                        fragment: 'page3',
                        el: '#page3',
                        render: function () {
                            new Page3View().render();
                        },
                        active: function () {
                            $(".container > section:not(#page3)").html("");
                            $("#page3").hide().show();
                        }
                    },
                    'page4': {
                        fragment: 'page4',
                        el: '#page4',
                        render: function () {
                            new Page4View().render();
                        },
                        active: function () {
                            $(".container > section:not(#page4)").html("");
                        }
                    },
                    'page5': {
                        fragment: 'page5',
                        el: '#page5',
                        render: function () {
                            new Page5View().render();
                        },
                        active: function () {
                            $(".container > section:not(#page5)").html("");
                        }
                    },
                    'default': {
                        active: function (path) {
                            alert('Page not found');
                            history.back();
                        }
                    }
                },

                transitions: {
                    'page1:page2': 'slide',
                    'page2:page3': 'turn',
                    'page3:page4': 'flip',
                    'page4:page5': 'slide'
                }
            });

            new MainRouter();
            Backbone.history.start();
        }
    };
});
