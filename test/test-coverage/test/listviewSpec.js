define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-listview",
    "template!test/test-coverage/templates/listview",
    "logging"
], function (expect, $, _, Backbone, ListView, Template, Logging) {
    $("body").append(Template());

    describe('widget-listview', function () {
        var listview;
        var isLoading = false;
        var html;
        var $el = $('#listView');

        function getItem(done) {
            isLoading = true;

            var request = $.ajax({
                url: "base/test/test-coverage/data/sample-list.json",
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
                        html += '   <span class="badge">" + this.published + "</span>';
                        html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
                        html += '   </div>';
                        html += '</li>';
                    });
                    html += "</ul>";
                    listview.$el.featuredListView("addItem", html);
                }
                html = "";
                isLoading = false;
                done();
            });

            request.fail(function (jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
                isLoading = false;
            });
            return true;
        }

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {

            var ItemList = Backbone.Collection.extend({
                url: "base/test/test-coverage/data/sample-list.json"
            });

            var itemList = new ItemList();

            listview = new ListView({
                el: "#listview",
                collection: itemList,
                $scroller: $("#listview").closest(".list-view-wrapper"),
                optimization: true,
                scrollEndAction: function () {
                    console.log("scrollEndAction");
                    getItem(done);
                }
            });
            expect(listview).to.be.an.instanceof(Backbone.View);
            itemList.fetch({
                success: function() {
                    done();
                }
            });
        });


        it('plugin방식으로 적용 후 스크롤을 마지막으로 보냈을 때 scrollend 이벤트가 발생하여야 한다.', function (done) {
            $el.featuredListView({
                $scroller: $el.closest(".list-view-wrapper"),
                optimization: true,
                scrollEndAction: function () {
                    console.log("scrollEndAction");
                }
            });

            $el.on("scrollEnd.cs.liveView", function (e) {
                Logging.info("scrollEnd.cs.liveView", e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('scrollEnd');
                done();
            });

            $el.trigger("scrollEnd.cs.liveView");
        })
    });
});