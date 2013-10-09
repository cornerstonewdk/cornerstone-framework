define([
    "expect",
    "jquery",
    "widget-button",
    "template!test/test-coverage/templates/button",
    "logging"
], function (expect, $, Button, Template, Logging) {
    $("body").append(Template());

    describe('widget-button', function () {

        describe('single toggle button', function () {
            var sTgBtn;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
                sTgBtn = new Button({
                    el: '#single-toggle-button'
                });
                sTgBtn.render().$el.on('click', function () {
                    $(this).button('toggle');
                });
                expect(sTgBtn).to.be.an.instanceof(Backbone.View);
                done();
            });

            it('버튼 클릭시 toggleOn 이벤트가 발생해야 한다', function (done) {
                sTgBtn.$el.on('toggleOn.cs.button',function (e) {
                    Logging.info('singlebutton toggleOn.cs.button', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.equal('toggleOn');
                    done();
                }).click();
            });

            it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있어야 한다.', function () {
                expect(sTgBtn.$el.hasClass('active')).to.be.true;
            });

            it('이미 토글되어 있는 버튼 클릭시 toggleOff 이벤트가 발생해야 한다.', function (done) {
                sTgBtn.$el.on('toggleOff.cs.button',function (e) {
                    Logging.info('singlebutton toggleOff.cs.button', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.equal('toggleOff');
                    done();
                }).click();
            });

            it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있지 않아야 한다.', function () {
                expect(sTgBtn.$el.hasClass('active')).to.not.be.true;
            });
        });

        describe('checkbox', function () {

            var checkbox;
            var checkLabel0, checkLabel1, checkLabel2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
                checkbox = new Button({
                    el: '#check-toggle-1'
                });
                checkbox.render();
                checkLabel0 = checkbox.$el.find('label:eq(0)');
                checkLabel1 = checkbox.$el.find('label:eq(1)');
                checkLabel2 = checkbox.$el.find('label:eq(2)');
                expect(checkbox).to.be.an.instanceof(Backbone.View);
                done();
            });

            it('첫번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 한다.', function (done) {
                checkbox.$el.on('toggleOn.cs.button', function (e, el) {
                    Logging.info('checkbox toggleOn.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    done();
                });
                checkLabel0.click();
            });

            it('첫번째 체크 박스가 .active를 가져야 하며 나머지는 .active를 가지면 안된다.', function () {
                expect(checkLabel0.hasClass('active')).to.be.ok;
                expect(checkLabel1.hasClass('active')).to.not.be.ok;
                expect(checkLabel2.hasClass('active')).to.not.be.ok;
            });

            it('선택된 첫번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 한다.', function (done) {
                checkbox.$el.on('toggleOff.cs.button', function (e, el) {
                    Logging.info('checkbox toggleOff.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    done();
                });
                checkLabel0.click();
            });

            it('.active를 가진 체크박스가 존재하면 안된다.', function () {
                expect(checkLabel0.hasClass('active')).to.not.be.ok;
                expect(checkLabel1.hasClass('active')).to.not.be.ok;
                expect(checkLabel2.hasClass('active')).to.not.be.ok;
            });

            it('세번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 해당 체크박스만 .active를 가져야 한다..', function (done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

                checkbox.$el.on('toggleOn.cs.button', function (e, el) {
                    Logging.info('checkbox toggleOn.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    expect(checkLabel0.hasClass('active')).to.not.be.ok;
                    expect(checkLabel1.hasClass('active')).to.not.be.ok;
                    expect(checkLabel2.hasClass('active')).to.be.ok;
                    done();
                });
                checkLabel2.click();
            });

            it('두번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 두번째, 세번째 체크박스가 .active를 가져야 한다.', function (done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

                checkbox.$el.on('toggleOn.cs.button', function (e, el) {
                    Logging.info('checkbox toggleOn.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    expect(checkLabel0.hasClass('active')).to.not.be.ok;
                    expect(checkLabel1.hasClass('active')).to.be.ok;
                    expect(checkLabel2.hasClass('active')).to.be.ok;
                    done();
                });
                checkLabel1.click();
            });

            it('세번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 하고 두번째 체크박스만 .active를 가져야 한다.', function (done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
                checkbox.$el.on('toggleOff.cs.button', function (e, el) {
                    Logging.info('checkbox toggleOff.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    expect(checkLabel0.hasClass('active')).to.not.be.ok;
                    expect(checkLabel1.hasClass('active')).to.be.ok;
                    expect(checkLabel2.hasClass('active')).to.not.be.ok;
                    done();
                });
                checkLabel2.click();
            });

            it('기존 테스트용 이벤트 리스너를 초기화 한다.', function () {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
                checkbox.$el.on('toggleOff.cs.button',function (e, el) {
                    Logging.info('toggleOff.cs.button', el);
                }).on('toggleOn.cs.button', function (e, el) {
                    Logging.info('checkbox toggleOn.cs.button', el);
                });
            });
        });

        describe('radio', function () {
            var radio;
            var radioLabel0, radioLabel1, radioLabel2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
                radio = new Button({
                    el: '#radio-toggle'
                });
                radio.render();
                radioLabel0 = radio.$el.find('label:eq(0)');
                radioLabel1 = radio.$el.find('label:eq(1)');
                radioLabel2 = radio.$el.find('label:eq(2)');
                expect(radio).to.be.an.instanceof(Backbone.View);
                done();
            });

            it('첫번째 라디오 버튼 클릭 시 toggleOn 이벤트가 발생하여야 한다.', function (done) {
                radio.$el.on('toggleOn.cs.button', function (e, el) {
                    Logging.info('radio toggleOn.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    done();
                });
                radioLabel0.click();
            });

            it('첫번째 라디오 버튼은 .active를 가져야하며 나머지는 .active를 가지면 안된다.', function () {
                expect(radioLabel0.hasClass('active')).to.be.ok;
                expect(radioLabel1.hasClass('active')).to.not.be.ok;
                expect(radioLabel2.hasClass('active')).to.not.be.ok;
            });

            it('두번째 라디오 버튼을 클릭 시 toggleOff와 toggleOn이 동시에 발생하여야 한다.', function (done) {
                radio.$el.on('toggleOff.cs.button',function (e, el) {
                    Logging.info('radio toggleOff.cs.button', e, el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    done();
                }).off('toggleOn.cs.button').on('toggleOn.cs.button', function (e, el) {
                    Logging.info('radio toggleOn.cs.button', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                });
                radioLabel1.click();
            });
        });
    });
});