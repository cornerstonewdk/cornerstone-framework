define([
    "expect",
    "jquery",
    "widget-dropdown",
    "template!test/test-coverage/templates/dropdown"
], function (expect, $, Dropdown, Template) {
    $("body").append(Template());


    describe('widget-dropdown', function () {
        var dropdown1, dropdown2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            dropdown1 = new Dropdown({
                el: '#dropdown .btn-group:first-child > button'
            });
            dropdown1.render();
            expect(dropdown1).to.be.an.instanceof(Backbone.View);
            dropdown2 = new Dropdown({
                el: '#dropdown .btn-group:nth-child(2) > button'
            });
            dropdown2.render();
            expect(dropdown2).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('첫번째 드랍다운 버튼을 눌렀을 때 메뉴가 펼쳐져야 한다.', function (done) {
            dropdown1.$el.click(function (e) {
                expect($(this).parent().hasClass('open')).to.be.true;
                done();
            }).click();
        });

        it('첫번째 드랍다운 메뉴가 펼쳐져 있을 때 버튼을 누르면 메뉴가 접혀야 한다.', function (done) {
            this.timeout(600);
            dropdown1.$el.off('click').click(function (e) {
                setTimeout(function () {
                    expect($(this).parent().hasClass('open')).to.be.false;
                    $(this).off('click');
                    done();
                }, 500);
            }).click();
        });
    });
});