describe('Cornerstone 이벤트 확장, view 모듈화 통합 test', function() {

    describe('widget-listview', function() {
        var listView;
        
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-listview','handlebars'],function(WidgetListView,Handlebars){
                var backboneView = function () {
                    var ItemList = Backbone.Collection.extend({
                        url: "data/sample-list.json",
                        model: Backbone.Model.extend({
                            idAttribute: "_id" // 기본 id 속성은 id이다. id 명칭을 변경하고 싶을 때 설정
                        })
                    });
                    var itemList = new ItemList();

                    // 아이템뷰를 만든다.
                    var html = '{{this.title}}';
                    html += '<div class="pull-right">';
                    html += '   <span class="badge">{{this.published}}</span>';
                    html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
                    html += '</div>';

                    // 아이템뷰를 만든다.
                    var html = '{{this.title}}';
                    html += '<div class="pull-right">';
                    html += '   <span class="badge">{{this.published}}</span>';
                    html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
                    html += '</div>';

                    // 리스트 아이템 뷰 정의
                    var ItemView = Backbone.View.extend({
                        tagName: "div",
                        className: "list-group-item",
                        template: Handlebars.compile(html),
                        render: function () {
                            this.$el.html(this.template(this.model.attributes));
                        }
                    });

                    // 리스트뷰 뷰 객체를 생성하고 el에 설정된 타겟에 model객체에 담긴 데이터를 통해 리스트뷰를 그린다.
                    listView = new WidgetListView({
                        el: "#listView",
                        collection: itemList,
                        itemView: ItemView, // 사용자가 정의하는 리스트의 한 Row가 되는 SubView
                        optimization: true, // 최적화 여부 설정
                        scrollEndAction: function () { // ScrollEnd인 경우 호출되는 함수를 사용자가 정의
                            Logging.info("cb scrollEndAction");
                            // 동일한 데이터라도 계속 데이터를 쌓고 싶은 경우 reset: true
                            this.collection.fetch();
                        }
                    });

                    listView.render();

                    listView.$el.on("scrollEnd.cs.listView", function () {
                        console.log("window scrollEndEvent");
                        itemList.url = "data/sample-list2.json";
                        itemList.fetch({update: true, remove: false});
//                    listView.collection.fetch();
                    });

                    itemList.fetch();
                    expect(listView).to.be.an.instanceof(Backbone.View);
                    done();
                    // listView.$el.closest(".list-view-wrapper").scrollTop(2000);
                };
                backboneView();
                listView.$el.on('scrollEnd.cs.listView',function(){
                    Logging.info('event scrollEnd.cs.listView');
                });
                $('#list-view').find(".js-list-add").off("click").on("click", backboneView);
             });
        });
    });

    describe('widget-motioncaptcha', function() {
        var captcha;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-motioncaptcha'], function(WidgetMotioncaptcha) {
                $("#motion-captcha button").off('click').on("click", function(e) {
                    $("#mc-canvas").remove();
                    $("<canvas/>", {
                        "id": "mc-canvas",
                        "class": "mc-canvas"
                    }).css({"float":"left"}).appendTo($("#motion-captcha-example"));
                    captcha = new WidgetMotioncaptcha({
                        el: '#mc-canvas'
                    });
                    captcha.render({
                        errorMsg: '다시 시도해주세요.',
                        successMsg: '성공',
                        onSuccess: function() {
                            Logging.info("성공");
                        }
                    });
                    expect(captcha).to.be.an.instanceof(Backbone.View);
                    done();
                }).click();
            });
        });
        
        it('캡차을 그릴때 start, move, end 이벤트가 발생하여야 한다. 또한 캡차를 잘못그려 fail 이벤트도 발생하여야 한다.', function() {
            captcha.$el.on('start.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('start.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('move.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('end.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            }).on('fail.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('fail.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('fail');
            }).on('success.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('success.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
           });
        });
    });

    describe('widget-scrollview', function() {
        var scrollView, pullDownScrollView;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-scrollview'], function(WidgetScrollView) {
                scrollView = new WidgetScrollView({
                    el: '#scrollView1'
                });
                scrollView.render();
                expect(scrollView).to.be.an.instanceof(Backbone.View);

                pullDownScrollView = new WidgetScrollView({
                    el: '#scrollView2'
                });
                pullDownScrollView.render();
                expect(pullDownScrollView).to.be.an.instanceof(Backbone.View);

                done();
            });
        });   

        it('1번 째 스크롤뷰를 제어할 때 beforeScrollStart, start, beforeScrollMove, move, beforeScrollEnd, scrollEnd, touchEnd 이벤트가 발생하여야 한다.', function() {

            scrollView.$el.on('beforeScrollStart.cs.scrollView',function(e){
                Logging.info('1st scrollview beforeScrollStart.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollStart');
            }).on('start.cs.scrollView',function(e){
                Logging.info('1st scrollview start.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('beforeScrollMove.cs.scrollView',function(e){
                Logging.info('1st scrollview beforeScrollMove.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollMove');
            }).on('move.cs.scrollView',function(e){
                Logging.info('1st scrollview move.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('beforeScrollEnd.cs.scrollView',function(e){
                Logging.info('1st scrollview beforeScrollEnd.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollEnd');
            }).on('scrollEnd.cs.scrollView',function(e){
                Logging.info('1st scrollview scrollEnd.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('scrollEnd');
            }).on('touchEnd.cs.scrollView',function(e){
                Logging.info('1st scrollview touchEnd.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('touchEnd');
            });
        });

        it('2번 째 스크롤뷰를 제어할 때 1번 스크롤뷰와 동일한 이벤트 및 pullDown(pullDown El이 보여진 상태에서 아래로 당길때), pullUp(pullUp El이 보여진 상태에서 위로 당길때), refresh 이벤트가 발생하여야 한다.', function() {
            pullDownScrollView.$el.on('beforeScrollStart.cs.scrollView',function(e){
                Logging.info('2nd scrollview beforeScrollStart',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollStart');
            }).on('start.cs.scrollView',function(e){
                Logging.info('2nd scrollview start.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('beforeScrollMove.cs.scrollView',function(e){
                Logging.info('2nd scrollview beforeScrollMove.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollMove');
            }).on('move.cs.scrollView',function(e){
                Logging.info('2nd scrollview move.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('beforeScrollEnd.cs.scrollView',function(e){
                Logging.info('2nd scrollview beforeScrollEnd.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollEnd');
            }).on('scrollEnd.cs.scrollView',function(e){
                Logging.info('2nd scrollview scrollEnd.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('scrollEnd');
            }).on('touchEnd.cs.scrollView',function(e){
                Logging.info('2nd scrollview touchEnd.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('touchEnd');
            }).on('pullUp.cs.scrollView',function(e){
                Logging.info('2nd scrollview pullUp.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('pullUp');
                setTimeout(function () {
                    pullDownScrollView.refresh();
                }, 500);
            }).on('pullDown.cs.scrollView',function(e){
                Logging.info('2nd scrollview pullDown.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('pullDown');
                setTimeout(function () {
                    // 임시 엘리먼트를 추가한다.
                    var $el = pullDownScrollView.$el.find(".list-group");
                    for (var i = 0; i < 10; i++) {
                        $el.append('<li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li>');
                    }
                    pullDownScrollView.refresh();
                }, 500);
            }).on('refresh.cs.scrollView',function(e){
                Logging.info('2nd scrollview refresh.cs.scrollView',e );
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('refresh');
            });
        });

    });

    describe('widget-sign', function() {
        var sign;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-sign'], function(WidgetSign) {
                sign = new WidgetSign({
                    el: '#signature'
                });
                sign.render();
                expect(sign).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('서명을 그릴때 start, move, end 이벤트가 발생하여야 한다.', function() {
            sign.$el.on('start.cs.sign', function(e) {
                Logging.info('start.cs.sign', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.sign', function(e) {
                Logging.info('move.cs.sign', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.sign', function(e) {
                Logging.info('end.cs.sign', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            });
        });

        it('서명을 완료한 후 이미지로 보기를 눌렀을 때 이미지가 복사되어야 한다.',function(){
            // 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
            $("button.show-sign").on('click', function (e) {
                var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
                $("div.widget-sign-viewer").html($("<img/>", {
                    src: "data:" + data
                }));
            }).click();
        });
    });
});
