define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-rangeinput",
    "template!test/test-coverage/templates/rangeinput",
    "logging"
], function (expect, $, _, Backbone, RangeInput, Template, Logging) {
    $("body").append(Template());

    describe('widget-rageinput', function () {

        var input_0, input_1, input_2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
                input_0 = new RangeInput({
                    el: '#range1'
                });
                input_1 = new RangeInput({
                    el: '#range2',
                    'progress': true
                });
                input_2 = new RangeInput({
                    el: '#range3',
                    'showInput': true
                });
                input_0.render();
                input_1.render();
                input_2.render();
                expect(input_0).to.be.an.instanceof(Backbone.View);
                expect(input_1).to.be.an.instanceof(Backbone.View);
                expect(input_2).to.be.an.instanceof(Backbone.View);
                done();
        });
    });
});