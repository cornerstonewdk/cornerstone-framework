define([
    "expect",
    "jquery",
    "widget-datepicker",
    "template!test/test-coverage/templates/datepicker",
    "logging"
], function (expect, $, WidgetDatepicker, Template, Logging) {
    $("body").append(Template());

    describe('widget-datepicker', function() {
        var datepicker;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            datepicker = new WidgetDatepicker({
                el: '#date-picker1',
                format: 'yyyy-MM-dd hh:mm:ss',
                startDate: new Date()
            });
            datepicker.render();
            expect(datepicker).to.be.an.instanceof(Backbone.View);
            done();
        });

        it('options의 pickTime과 pickDate가 모두 false인 경우 에러가 발생하여야 한다.',function(done){
            try{
                var datepickerError = new WidgetDatepicker({
                    pickTime: false,
                    pickDate: false
                });
                datepickerError.render();
            }catch(e){
                expect(e).to.be.an.instanceof(Error);
                done();
            }
        });
    });
});