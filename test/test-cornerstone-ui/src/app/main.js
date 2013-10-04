/**
 * main.js
 * 애플리케이션 메인
 */
define([
    "jquery",
    "view/page1",
    "view/page2",
    "backbone",
    "multipage-router",
    "bootstrap",
    "style!main" ], function ($, Page1View, Page2View, Backbone, MultipageRouter) {
    return {
        launch: function () {
            var app, MainRouter;

            app = window.app = {
                changeStyle: function () {
                    var myStyle = localStorage.getItem("cs-style");
                    var $baseStyle = $("#baseStyle");
                    var $customStyle = $("#customStyle");
                    $customStyle.remove();

                    if (myStyle.match(/theme/)) {
                        $baseStyle.attr("href", "../../../dist/lib/bootstrap/css/bootstrap.css");
                        $baseStyle.after('<link id="customStyle" rel="stylesheet" href="../../../dist/src/style/' + myStyle + '/cornerstone.css"/>');
                    } else {
                        $baseStyle.attr("href", "../../../dist/src/style/" + myStyle + "/cornerstone.css");
                    }
                }
            };

            if (typeof localStorage.getItem("cs-style") !== "string") {
                localStorage.setItem("cs-style", "theme-white");
            }

            // Router
            MainRouter = MultipageRouter.extend({
                pages: {
                    "page1": {
                        fragment: [ "", "page1" ],
                        el: "#page1",
                        render: function () {
                            new Page1View().render();
                        },
                        active: function () {
                            this.releasePage("#page1");
                        }
                    },
                    "page2": {
                        fragment: [ ":id", "page2" ],
                        el: "#page2",
                        render: function (id) {
                            new Page2View().render(id);
                        },
                        active: function () {
                            this.releasePage("#page2");
                        }
                    }
                },
                transitions: {
                    "page1:page2": "slide"
                },

                releasePage: function (currentPage) {
                    return $(".container > section:not(" + currentPage + ")").html("");
                }
            });

            $(document).on("click", "[data-style]", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var $target = $(e.target);
                var myStyle = $(e.target).data("style");
                localStorage.setItem("cs-style", myStyle);
                app.changeStyle();
            });

            $(document).on("click", "#page2 a[href]:not([data-bypass]),[type=submit]:not([data-bypass])", function (evt) {
                evt.preventDefault();
            });

            $("#nav-component .dropdown-menu a").on("click", function () {
                $(this).closest(".dropdown").find(".dropdown-toggle").dropdown("toggle");
            });

            app.router = new MainRouter();
            Backbone.history.start();

            $(document).on("click", "a:not([data-bypass])", function (evt) {
                // Get the absolute anchor href.
                var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
                // Get the absolute root.
                var root = location.protocol + "//" + location.host + app.root;

                // Ensure the root is part of the anchor href, meaning it's relative.
                if (href.prop && href.prop.slice(0, root.length) === root) {
                    // Stop the default event to ensure the link will not cause a page
                    // refresh.
                    evt.preventDefault();

                    // `Backbone.history.navigate` is sufficient for all Routers and will
                    // trigger the correct events. The Router's internal `navigate` method
                    // calls this anyways.  The fragment is sliced from the root.
                    Backbone.history.navigate(href.attr, true);
                }
            });
        }
    };
});
