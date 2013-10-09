define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-scrollspy",
    "template!test/test-coverage/templates/scrollspy"
], function (expect, $, _, Backbone, Scrollspy, Template) {
    $("body").append(Template());

    describe('widget-scrollspy', function () {
        var scrollspy;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            scrollspy = new Scrollspy({
                el: '.scrollspy-example',
                target: '#navbar-example2'
            });
            scrollspy.render();
            expect(scrollspy).to.be.an.instanceof(Backbone.View);
            done();
        });
    });
});