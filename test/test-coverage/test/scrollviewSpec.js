define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-scrollview",
    "template!test/test-coverage/templates/scrollview",
    "logging"
], function (expect, $, _, Backbone, ScrollView, Template, Logging) {
    $("body").append(Template());

    describe('widget-scrollview', function () {
        var scrollView, pullDownScrollView;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            scrollView = new ScrollView({
                el: '#scrollView1'
            });
            scrollView.render();
            expect(scrollView).to.be.an.instanceof(Backbone.View);

            pullDownScrollView = new ScrollView({
                el: '#scrollView2'
            });
            pullDownScrollView.render();
            expect(pullDownScrollView).to.be.an.instanceof(Backbone.View);

            done();
        });

        it('1번 째 스크롤뷰를 제어할 때 beforeScrollStart, start, beforeScrollMove, move, beforeScrollEnd, scrollEnd, touchEnd 이벤트가 발생하여야 한다.', function () {

            scrollView.$el.on('beforeScrollStart.cs.scrollView',function (e) {
                Logging.info('1st scrollview beforeScrollStart.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollStart');
            }).on('start.cs.scrollView',function (e) {
                Logging.info('1st scrollview start.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('beforeScrollMove.cs.scrollView',function (e) {
                Logging.info('1st scrollview beforeScrollMove.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollMove');
            }).on('move.cs.scrollView',function (e) {
                Logging.info('1st scrollview move.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('beforeScrollEnd.cs.scrollView',function (e) {
                Logging.info('1st scrollview beforeScrollEnd.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            }).on('scrollEnd.cs.scrollView',function (e) {
                Logging.info('1st scrollview scrollEnd.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('scrollEnd');
            }).on('touchEnd.cs.scrollView', function (e) {
                Logging.info('1st scrollview touchEnd.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('touchEnd');
            });
        });

        it('2번 째 스크롤뷰를 제어할 때 1번 스크롤뷰와 동일한 이벤트 및 pullDown(pullDown El이 보여진 상태에서 아래로 당길때), pullUp(pullUp El이 보여진 상태에서 위로 당길때), refresh 이벤트가 발생하여야 한다.', function () {
            pullDownScrollView.$el.on('beforeScrollStart.cs.scrollView',function (e) {
                Logging.info('2nd scrollview beforeScrollStart', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollStart');
            }).on('start.cs.scrollView',function (e) {
                Logging.info('2nd scrollview start.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('beforeScrollMove.cs.scrollView',function (e) {
                Logging.info('2nd scrollview beforeScrollMove.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollMove');
            }).on('move.cs.scrollView',function (e) {
                Logging.info('2nd scrollview move.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('beforeScrollEnd.cs.scrollView',function (e) {
                Logging.info('2nd scrollview beforeScrollEnd.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('beforeScrollEnd');
            }).on('scrollEnd.cs.scrollView',function (e) {
                Logging.info('2nd scrollview scrollEnd.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('scrollEnd');
            }).on('touchEnd.cs.scrollView',function (e) {
                Logging.info('2nd scrollview touchEnd.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('touchEnd');
            }).on('pullUp.cs.scrollView',function (e) {
                Logging.info('2nd scrollview pullUp.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('pullUp');
                setTimeout(function () {
                    pullDownScrollView.refresh();
                }, 500);
            }).on('pullDown.cs.scrollView',function (e) {
                Logging.info('2nd scrollview pullDown.cs.scrollView', e);
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
            }).on('refresh.cs.scrollView', function (e) {
                Logging.info('2nd scrollview refresh.cs.scrollView', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('refresh');
            });
        });

    });

});