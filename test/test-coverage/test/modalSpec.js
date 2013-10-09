define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-modal",
    "template!test/test-coverage/templates/modal"
], function (expect, $, _, Backbone, Modal, Template) {
    $("body").append(Template());

    describe('widget-modal', function () {
        var modal;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            modal = new Modal({
                el: '#myModal'
            });
            modal.render();
            expect(modal).to.be.an.instanceof(Backbone.View);
            $('#btnModalToggle').click(function () {
                modal.$el.modal('toggle');
            });
            done();
        });

        it('modal이 적용된 후 토글을 실행하였을 때 modal이 사라져야 한다.', function (done) {
            modal.$el.modal('toggle');
            this.timeout(2000);
            setTimeout(function () {
                expect(modal.$el.data('bs.modal').$backdrop).to.be.equal(null);
                done()
            }, 500);
        });
    });
});