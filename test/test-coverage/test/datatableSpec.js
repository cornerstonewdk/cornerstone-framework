define([
    "expect",
    "jquery",
    "widget-datatable",
    "template!test/test-coverage/templates/datatables",
    "logging"
], function (expect, $, Datatable, Template, Logging) {
    $("body").append(Template());


    describe('widget-datatable', function () {
        var table;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function (done) {
            var Model = Backbone.Model.extend({
                url: "base/test/test-coverage/data/sample-datatables.json"
            });
            table = new Datatable({
                el: '#test-datatables',
                model: new Model
            });
            expect(table).to.be.an.instanceof(Backbone.View);
            table.model.fetch({
                success: function() {
                    done();
                }
            });
        });

        it('테이블의 row를 클릭했을 때 itemClick 이벤트가 발생하여야 한다.', function (done) {
            this.timeout(2000);
            table.$el.on('itemClick.cs.datatable', 'tr', function (e, datum, dataset) {
                Logging.info('itemClick.cs.datatable', datum, dataset);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('itemClick');
                expect(datum).to.be.an('object')
                expect(datum.data).to.be.instanceof(Array);
                done();
            });
            table.$el.find('tr:eq(2)').click();
        });
    });
});