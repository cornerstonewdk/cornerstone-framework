define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-motioncaptcha",
    "template!test/test-coverage/templates/motioncaptcha"
], function (expect, $, _, Backbone, Motioncaptcha, Template) {
    $("body").append(Template());

    describe('widget-motioncaptcha', function () {
        var captcha;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            $("#motion-captcha button").off('click').on("click",function (e) {
                $("#mc-canvas").remove();
                $("<canvas/>", {
                    "id": "mc-canvas",
                    "class": "mc-canvas"
                }).css({"float": "left"}).appendTo($("#motion-captcha-example"));
                captcha = new Motioncaptcha({
                    el: '#mc-canvas'
                });
                captcha.render({
                    errorMsg: '다시 시도해주세요.',
                    successMsg: '성공',
                    onSuccess: function () {
                        Logging.info("성공");
                    }
                });
                expect(captcha).to.be.an.instanceof(Backbone.View);
                done();
            }).click();
        });

        it('캡차을 그릴때 start, move, end 이벤트가 발생하여야 한다. 또한 캡차를 잘못그려 fail 이벤트도 발생하여야 한다.', function () {
            captcha.$el.on('start.cs.motionCaptcha',function (e) {
                e.stopPropagation();
                Logging.info('start.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.motionCaptcha',function (e) {
                e.stopPropagation();
                Logging.info('move.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.motionCaptcha',function (e) {
                e.stopPropagation();
                Logging.info('end.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            }).on('fail.cs.motionCaptcha',function (e) {
                e.stopPropagation();
                Logging.info('fail.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('fail');
            }).on('success.cs.motionCaptcha', function (e) {
                e.stopPropagation();
                Logging.info('success.cs.motionCaptcha', e);
                expect(e).to.be.an.instanceof($.Event);
            });
        });
    });
});