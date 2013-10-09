define([
    "expect",
    "jquery",
    "underscore",
    "backbone",
    "widget-spinner",
    "template!test/test-coverage/templates/spinner",
    "logging"
], function (expect, $, _, Backbone, Spinner, Template, Logging) {
    $("body").append(Template());

    describe('widget-spinner', function () {
        var body_spinner, inner_spinner;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
                body_spinner = new Spinner({
                    el: 'body'
                });
                body_spinner.$el.on('show.cs.spinner',function (e) {
                    Logging.info('body show.cs.spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                }).on('shown.cs.spinner', function (e) {
                    Logging.info('body shown.cs.spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                    done();
                });
                body_spinner.render();
                body_spinner.$el.spinner('show');
                expect(body_spinner).to.be.an.instanceof(Backbone.View);
        });

        it('전체 영역 스피너가 보여질 때 백그라운드를 클릭 시 hide, hidden 이벤트가 순차적으로 일어나야한다.', function (done) {
            body_spinner.$el.on('hide.cs.spinner',function (e) {
                e.stopPropagation();
                Logging.info('body hide.cs.spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.cs.spinner', function (e) {
                e.stopPropagation();
                Logging.info('body hidden.cs.spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            });
            body_spinner.$el.spinner('hide');
        });

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
                inner_spinner = new Spinner({
                    el: '#loadingCircle'
                });
                inner_spinner.$el.on('show.cs.spinner',function (e) {
                    e.stopPropagation();
                    Logging.info('inner show.cs.spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                }).on('shown.cs.spinner', function (e) {
                    e.stopPropagation();
                    Logging.info('inner shown.cs.spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                    done();
                });
                inner_spinner.render();
                inner_spinner.$el.spinner('show');
                expect(inner_spinner).to.be.an.instanceof(Backbone.View);
        });

        it('일부 영역 스피너가 보여질 때 백그라운드를 클릭 시 hide, hidden 이벤트가 순차적으로 일어나야한다.', function (done) {
            inner_spinner.$el.on('hide.cs.spinner',function (e) {
                e.stopPropagation();
                Logging.info('inner hide.cs.spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.cs.spinner', function (e) {
                e.stopPropagation();
                Logging.info('inner hidden.cs.spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            });
            inner_spinner.$el.spinner('hide');
        });
    });
});