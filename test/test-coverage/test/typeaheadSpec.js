define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-typeahead",
    "template!test/test-coverage/templates/typeahead",
    "logging"
], function (expect, $, _, Backbone, Typeahead, Template, Logging) {
    $("body").append(Template());

    describe('widget-typeahead', function () {
        var typeahead, dMenu;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            typeahead = new Typeahead({
                el: 'input.typeahead',
                name: 'countries',
                prefetch: 'base/test/test-coverage/data/typeahead-countries.json',
                limit: 10
            });
            typeahead.render();
            expect(typeahead).to.be.an.instanceof(Backbone.View);
            done();
        });

//        it('input에 korea라고 넣었을 때 2개의 결과값이 검색되어야 한다.', function (done) {
//            $("input.typeahead").focus();
//            typeahead.$el.val('korea');
//            var e = jQuery.Event("input.tt");
//            e.which = e.keycode = 65;
//            typeahead.$el.trigger(e);
//            dMenu = typeahead.$el.closest('.twitter-typeahead').find('.tt-dropdown-menu');
//            expect(dMenu).to.not.be.undefined;
//            expect(dMenu.find('.tt-suggestion').length).to.equal(2);
//            console.log(dMenu.length);
//            done();
//        });
//
//        it('검색된 2개의 결과물중 2번째 "South Korea"를 클릭하면 selected이벤트가 발생하여야 한다.', function (done) {
//            typeahead.$el.on('selected.cs.typeahead', function (e, datum, dataset) {
//                Logging.info('selected.cs.typeahead', e, datum, dataset);
//                expect(e).to.be.an.instanceof($.Event);
//                expect(e.type).to.be.equal('selected');
//                expect(datum.value).to.be.equal('South Korea');
//                expect(dataset).to.be.equal('countries');
//                done();
//            });
//            dMenu.find('.tt-suggestion:eq(1)').click();
//        });
//
//        it('직접 테스트를 하기위해 기존 이벤트(selected의 값 비교 로직) 제거 후 재바인딩', function () {
//            typeahead.$el.off('selected.cs.typeahead').on('selected.cs.typeahead', function (e, datum, dataset) {
//                Logging.info('selected.cs.typeahead', e, datum, dataset);
//                expect(e).to.be.an.instanceof($.Event);
//                expect(e.type).to.be.equal('selected');
//                expect(dataset).to.be.equal('countries');
//            });
//        });
    });
});