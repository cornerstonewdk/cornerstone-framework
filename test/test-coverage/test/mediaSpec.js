define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-media",
    "template!test/test-coverage/templates/media"
], function (expect, $, _, Backbone, Media, Template) {
    $("body").append(Template());

    describe('widget-media', function () {
        var media1, media2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            media1 = new Media({
                el: '#media .panel:first-child video'
            });
            media1.render();
            expect(media1).to.be.an.instanceof(Backbone.View);
            media2 = new Media({
                el: '#media .panel:nth-child(1) audio'
            });
            media2.render();
            expect(media2).to.be.an.instanceof(Backbone.View);
            done();
        });
    });
});