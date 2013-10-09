define([
    "expect",
    "jquery",
    "widget-editor",
    "template!test/test-coverage/templates/editor",
    "logging"
], function (expect, $, Editor, Template, Logging) {
    $("body").append(Template());

    describe('widget-editor', function () {
        var editor;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            editor = new Editor({
                el: '#textarea'
            });
            editor.render();
            expect(editor).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('에디터에 포커스를 잃으면 blur 이벤트가 발생하여야 한다.', function (done) {
            editor.$el.on('blur',function (e) {
                Logging.info('editor blur', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('blur');
                done();
            }).focus().blur();
        });
    });
});