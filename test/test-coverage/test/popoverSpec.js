define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-popover",
    "template!test/test-coverage/templates/popover",
    "logging"
], function (expect, $, _, Backbone, Popover, Template, Logging) {
    $("body").append(Template());

    describe('widget-popover', function () {
        var singlePop, topPop, bottomPop;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            singlePop = new Popover({
                el: '#popover > div > a',
                placement: 'top',
                content: 'single popover testing'
            });
            singlePop.render();
            expect(singlePop).to.be.an.instanceof(Backbone.View);
            topPop = new Popover({
                el: '#popover > div > div > ul > li:nth-child(1) > a',
                placement: 'top',
                content: 'top popover test'
            });
            topPop.render();
            expect(topPop).to.be.an.instanceof(Backbone.View);
            bottomPop = new Popover({
                el: '#popover > div > div > ul > li:nth-child(2) > a',
                placement: 'bottom',
                content: 'bottom popover test'
            });
            bottomPop.render();
            expect(bottomPop).to.be.an.instanceof(Backbone.View);

            //화면 확인용 리스너
            topPop.$el.on('show.bs.popover',function () {
                Logging.info('top popover show.bs.popover');
            }).on('shown.bs.popover',function () {
                Logging.info('top popover shown.bs.popover')
            }).on('hide.bs.popover',function () {
                Logging.info('top popover hide.bs.popover')
            }).on('hidden.bs.popover', function () {
                Logging.info('top popover hidden.bs.popover')
            });

            bottomPop.$el.on('show.bs.popover',function () {
                Logging.info('bottomPop popover show.bs.popover');
            }).on('shown.bs.popover',function () {
                Logging.info('bottomPop popover shown.bs.popover')
            }).on('hide.bs.popover',function () {
                Logging.info('bottomPop popover hide.bs.popover')
            }).on('hidden.bs.popover', function () {
                Logging.info('bottomPop popover hidden.bs.popover')
            });

            done();
        });

        it('싱글 팝오버 버튼을 클릭하면 show,shown 이벤트가 발생하여야 한다.', function (done) {
            singlePop.$el.on('show.bs.popover',function (e) {
                Logging.info('single popover show.bs.popover');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('show');
            }).on('shown.bs.popover', function (e) {
                Logging.info('single popover shown.bs.popover');
                e.preventDefault();
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('shown');
                done();
            });
            singlePop.$el.click();
        });

        it('싱글 팝오버 버튼을 다시 클릭하면 hide,hidden 이벤트가 발생하여야 한다.', function (done) {
            this.timeout(1000);
            singlePop.$el.on('hide.bs.popover',function (e) {
                Logging.info('single popover hide.bs.popover');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.bs.popover', function (e) {
                Logging.info('single popover hidden.bs.popover');
                e.preventDefault();
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            });
            setTimeout(function () {
                singlePop.$el.click();
            }, 500);

        });
    });

});