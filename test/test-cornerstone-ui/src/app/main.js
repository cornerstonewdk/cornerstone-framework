/**
 * main.js
 * 애플리케이션 메인
 */
define([
    'view/page1',
    'view/page2',
    'backbone',
    'multipage-router',
    'bootstrap',
    'style!main' ], function (Page1View, Page2View, Backbone, MultipageRouter) {
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
                            this.releasePage('#page1');
                        }
                    },
                    'page2': {
                        fragment: [ ':id', 'page2' ],
                        el: '#page2',
                        render: function (id) {
                            new Page2View().render(id);
                        },
                        active: function () {
                            this.releasePage('#page2');
                        }
                    }
                },
                transitions: {
                    'page1:page2': 'slide'
                },

                releasePage: function (currentPage) {
                    return $('.container > section:not(' + currentPage + ')').html('');
                }
            });

            $(document).on('click', '#page2 a', function (e) {
                e.preventDefault();
            });

            $('#nav-component .dropdown-menu a').on('click', function () {
                $(this).closest('.dropdown').find('.dropdown-toggle').dropdown('toggle');
            });

            new MainRouter();
            Backbone.history.start();
        }
    };
});
