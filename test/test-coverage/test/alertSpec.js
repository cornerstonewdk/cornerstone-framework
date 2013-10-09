define([
    "expect",
    "jquery",
    "widget-alert",
    "template!test/test-coverage/templates/alert"
], function (expect, $, Alert, Template) {
    $("body").append(Template());
    describe("widget-alert", function () {
        var alert1, alert2;

        it("requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.", function (done) {
            alert1 = new Alert({
                el: 'div.alert:first-child'
            });
            alert1.render();
            alert2 = new Alert({
                el: 'div.alert:nth-child(2)'
            });
            alert2.render();
            expect(alert1).to.be.an.instanceof(Backbone.View);
            expect(alert2).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('내부 버튼에(button.close) 클릭 리스너를 바인딩 하여 뷰에 플러그인 동작이 되는지 확인한다.', function(done) {
            alert1.$el.find('button.close').click(function(e) {
                alert1.$el.alert('close');
                expect(alert1.$el.css('display')).to.equal('none');
                done();
            }).click();

            alert2.$el.find('button.close').click(function(e) {
                alert2.$el.alert('close');
            });
        });
    });
});
