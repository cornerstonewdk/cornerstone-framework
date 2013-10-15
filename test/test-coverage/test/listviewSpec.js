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
                model: Backbone.Model.extend(),
                url: "base/test/test-coverage/data/sample-list.json",
                parse: function (response) {
                    this.imgPath = response.imgPath; // JSON 데이터 중 콜렉션외의 정보를 콜렉션 객체에 추가한다.
                    return response.items; // JSON 데이터 중 콜렉션 정보를 넘겨준다.
                }
            });

            // 아이템뷰를 만든다.
            var html = '{{this.title}}';
            html += '<div class="pull-right">';
            html += '   <span class="badge">{{this.published}}</span>';
            html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
            html += '</div>';

            // 리스트 아이템 뷰 정의
            var ItemView = Backbone.View.extend({
                tagName: "li",
                className: "list-group-item clearfix",
                template: Handlebars.compile(html),

                initialize: function () {
                    // 목록에 cid 추가를 위해 모델 속성에 cid 추가
                    this.model.set("cid", this.model.cid);

                    this.listenTo(this.model, "change", this.render);
                    this.listenTo(this.model, "destroy", this.remove);
                },
                render: function () {
                    this.$el.html(this.template(this.model.attributes));
                    return this;
                },

                remove: function () {
                    this.$el.remove();
                }
            });

            var itemList = new ItemList();
            // 리스트뷰 뷰 객체를 생성하고 el에 설정된 타겟에 model객체에 담긴 데이터를 통해 리스트뷰를 그린다.
            listView = new ListView({
                el: "#listView",
                collection: itemList,
                itemView: ItemView, // 사용자가 정의하는 리스트의 한 Row가 되는 SubView
                optimization: true, // 최적화 여부 설정
                scrollEndAction: function () { // ScrollEnd인 경우 호출되는 함수를 사용자가 정의
                    console.log("cb scrollEndAction");
                    // 동일한 데이터라도 계속 데이터를 쌓고 싶은 경우 reset: true
                    this.collection.fetch();
                }
            });
            
            itemList.fetch();
            expect(listView).to.be.an.instanceof(Backbone.View);
            done();
        });


        it('plugin방식으로 적용 후 스크롤을 마지막으로 보냈을 때 scrollend 이벤트가 발생하여야 한다.', function (done) {
            $el.featuredListView({
                $scroller: $el.closest(".list-view-wrapper"),
                optimization: true,
                scrollEndAction: function () {
                    console.log("scrollEndAction");
                }
            });

            $el.on("scrollEnd.cs.listView", function (e) {
                Logging.info("scrollEnd.cs.listView", e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('scrollEnd');
                done();
            });

            $el.trigger("scrollEnd.cs.listView");
        })
    });
});