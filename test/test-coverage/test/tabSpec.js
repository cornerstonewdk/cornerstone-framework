define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-tab",
    "template!test/test-coverage/templates/tab"
], function (expect, $, _, Backbone, Tab, Template) {
    $("body").append(Template());

    describe('widget-tab', function () {
        var tab;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            tab = new Tab({
                el: '#myTab'
            });
            tab.render();

            $('#myTab a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })

            expect(tab).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('프로파일 탭을 클릭했을 때 2번째 탭이 보여야 한다.', function (done) {
            this.timeout(1000);
            tab.$el.find('a[href="#profile"]').click();
            setTimeout(function () {
                expect($('#myTabContent > #profile').hasClass('active in')).to.be.true;
                done();
            }, 500);
        })
    });
});