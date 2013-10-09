define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-tooltip",
    "template!test/test-coverage/templates/tooltip",
    "logging"
], function (expect, $, _, Backbone, Tooltip, Template, Logging) {
    $("body").append(Template());

    describe('widget-tooltip', function () {
        var singleTooltip, leftTooltip, rightTooltip;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            singleTooltip = new Tooltip({
                el: '#tooltip div.well > a',
                placement: 'top'
            });
            singleTooltip.render();
            expect(singleTooltip).to.be.an.instanceof(Backbone.View);
            leftTooltip = new Tooltip({
                el: '#tooltip ul.demo-tooltips > li:nth-child(2) > a',
                placement: 'left'
            });
            leftTooltip.render();
            expect(leftTooltip).to.be.an.instanceof(Backbone.View);
            rightTooltip = new Tooltip({
                el: '#tooltip ul.demo-tooltips > li:nth-child(1) > a',
                placement: 'right'
            });
            rightTooltip.render();
            expect(rightTooltip).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('첫번째 버튼에 마우스를 오버하면 show,shown 이벤트가 발생하여야 한다.', function (done) {
            singleTooltip.$el.each(function () {
                $(this).on('show.bs.tooltip',function (e) {
                    Logging.info('single tooltip show.bs.tooltip');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                }).on('shown.bs.tooltip', function (e) {
                    Logging.info('single tooltip shown.bs.tooltip');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                    done();
                });
            });
            $(singleTooltip.$el[0]).mouseover();
        });

        it('첫번째 버튼에 마우스 오버를 해제하면 hide,hidden 이벤트가 발생하여야 한다.', function (done) {

            singleTooltip.$el.each(function () {
                $(this).on('hide.bs.tooltip',function (e) {
                    Logging.info('single tooltip hide.bs.tooltip');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hide');
                }).on('hidden.bs.tooltip', function (e) {
                    Logging.info('single tooltip hidden.bs');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hidden');
                    done();
                });
            });
            $(singleTooltip.$el[0]).mouseout();
        });

        it('왼쪽 툴팁에 마우스 오버 및 해제시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function (done) {
            leftTooltip.$el.on('show.bs.tooltip',function (e) {
                Logging.info('left tooltip show.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('show');
            }).on('shown.bs.tooltip',function (e) {
                Logging.info('left tooltip shown.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('shown');
            }).on('hide.bs.tooltip',function (e) {
                Logging.info('left tooltip hide.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.bs.tooltip',function (e) {
                Logging.info('left tooltip hidden.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            }).mouseover().mouseout();
        });

        it('오른쪽 툴팁에 마우스 오버 및 해제시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function (done) {
            rightTooltip.$el.on('show.bs.tooltip',function (e) {
                Logging.info('right tooltip show.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('show');
            }).on('shown.bs.tooltip',function (e) {
                Logging.info('right tooltip shown.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('shown');
            }).on('hide.bs.tooltip',function (e) {
                Logging.info('right tooltip hide.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.bs.tooltip',function (e) {
                Logging.info('right tooltip hidden.bs.tooltip');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            }).mouseover().mouseout();
        });
    });
});