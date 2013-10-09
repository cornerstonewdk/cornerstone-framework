define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-sign",
    "template!test/test-coverage/templates/sign",
    "logging"
], function (expect, $, _, Backbone, Sign, Template, Logging) {
    $("body").append(Template());

    describe('widget-sign', function () {
        var sign;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            sign = new Sign({
                el: '#signature'
            });
            sign.render();
            expect(sign).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('서명을 그릴때 start, move, end 이벤트가 발생하여야 한다.', function () {
            sign.$el.on('start.cs.sign',function (e) {
                Logging.info('start.cs.sign', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.sign',function (e) {
                Logging.info('move.cs.sign', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.sign', function (e) {
                Logging.info('end.cs.sign', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            });
        });

        it('서명을 완료한 후 이미지로 보기를 눌렀을 때 이미지가 복사되어야 한다.', function () {
            // 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
            $("button.show-sign").on('click',function (e) {
                var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
                $("div.widget-sign-viewer").html($("<img/>", {
                    src: "data:" + data
                }));
            }).click();
        });
    });
});