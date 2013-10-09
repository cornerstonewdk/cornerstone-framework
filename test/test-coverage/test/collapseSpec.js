define([
    "expect",
    "jquery",
    "widget-collapse",
    "template!test/test-coverage/templates/collapse"
], function (expect, $, Collapse, Template) {
    $("body").append(Template());


    describe('widget-collapse', function () {
        var collapse;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            collapse = new Collapse({
                el: '#accordion .collapse',
                parent: '#accordion',
                toggle: false
            });
            collapse.render();
            $('#collapse a.accordion-toggle').click(function (e) {
                e.preventDefault();
                $($(this).attr('href')).collapse('toggle');
            });
            expect(collapse).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('두번째 패널을 클릭 시 은 콜랩스가 작동하여야 한다.', function (done) {
            this.timeout(2000);
            $('#collapse a.accordion-toggle:eq(1)').click();
            setTimeout(function () {
                expect($('#collapseTwo').hasClass('in')).to.be.true;
                done();
            }, 1000);
        });
    });
});