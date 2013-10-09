define([
    "expect",
    "jquery",
    "widget-carousel",
    "template!test/test-coverage/templates/carousel"
], function (expect, $, Carousel, Template) {
    $("body").append(Template());

    describe("widget-carousel", function () {
        var cs;

        cs = new Carousel({
            el: "#carousel-example-generic"
        });

        it("requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.", function (done) {
            cs.render();
            expect(cs).to.be.an["instanceof"](Backbone.View);
            done();
            return $("#btnCsStart").click(function () {
                return cs.$el.carousel("cycle");
            });
        });

        it("캐로셀에 Swipe 기능을 활성화한다.", function (done) {
            this.timeout(2000);
            cs.$el.carousel("activeSwipe");
            cs.$el.trigger("swipeLeft");
            setTimeout(function () {
                cs.$el.trigger("swipeRight");
            }, 1000);
            cs.$el.trigger("slide");
            cs.$el.trigger("slid");
            done();
        });

        it("케로셀이 플레이 될때 play 이벤트가 발생하여야 한다.", function (done) {
            this.timeout(2000);
            cs.$el.on("play.cs.carousel",function (e) {
                expect(e).to.be.an["instanceof"]($.Event);
                expect(e.type).to.be.equal("play");
                return done();
            }).carousel("pause");
            setTimeout(function () {
                return cs.$el.carousel("cycle");
            }, 1000);
        });

        it("케로셀이 멈출 때 pause 이벤트가 발생하여야 한다.", function (done) {
            this.timeout(2000);
            cs.$el.on("pause.cs.carousel", function (e) {
                expect(e).to.be.an["instanceof"]($.Event);
                expect(e.type).to.be.equal("pause");
                return done();
            });
            setTimeout(function () {
                return cs.$el.carousel("pause");
            }, 1000);
        });
    });
});
