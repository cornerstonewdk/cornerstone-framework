describe('Cornerstone event extend test', function() {

    // describe('widget-alert', function() {
    //     var alert;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-alert'], function(WidgetAlert) {
    //             $('div.alert').each(function(i) {
    //                 var view = new WidgetAlert({
    //                     el: this
    //                 });
    //                 expect(view).to.be.an.instanceof(Backbone.View);
    //                 i === $('div.alert').length - 1 && done();
    //             });
    //         });
    //     });
    // });

    // describe('widget-button', function() {

    //     describe('single toggle button', function() {
    //         var sTgBtn;

    //         it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //             require(['widget-button'], function(WidgetButton) {
    //                 sTgBtn = new WidgetButton({
    //                     el: '#single-toggle-button'
    //                 });
    //                 sTgBtn.render().$el.on('click', function() {
    //                     $(this).button('toggle');
    //                 });
    //                 expect(sTgBtn).to.be.an.instanceof(Backbone.View);
    //                 done();
    //             });
    //         });

    //         it('버튼 클릭시 toggleOn 이벤트가 발생해야 한다', function(done) {
    //             sTgBtn.$el.on('toggleOn.cs.button', function(e) {
    //                 console.log('싱글 토글 버튼 toggleOn 발생', e);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.equal('toggleOn');
    //                 done();
    //             }).click();
    //         });

    //         it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있어야 한다.', function() {
    //             expect(sTgBtn.$el.hasClass('active')).to.be.true;
    //         });

    //         it('이미 토글되어 있는 버튼 클릭시 toggleOff 이벤트가 발생해야 한다.', function(done) {
    //             sTgBtn.$el.on('toggleOff.cs.button', function(e) {
    //                 console.log('싱글 토글 버튼 toggleOff 발생', e);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.equal('toggleOff');
    //                 done();
    //             }).click();
    //         });

    //         it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있지 않아야 한다.', function() {
    //             expect(sTgBtn.$el.hasClass('active')).to.not.be.true;
    //         });
    //     });

    //     describe('radio button', function() {
    //         var radio;
    //         var radioLabel0, radioLabel1, radioLabel2;

    //         it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //             require(['widget-button'], function(WidgetButton) {
    //                 radio = new WidgetButton({
    //                     el: '#radio-toggle'
    //                 });
    //                 radio.render();
    //                 radioLabel0 = radio.$el.find('label:eq(0)');
    //                 radioLabel1 = radio.$el.find('label:eq(1)');
    //                 radioLabel2 = radio.$el.find('label:eq(2)');
    //                 expect(radio).to.be.an.instanceof(Backbone.View);
    //                 done();
    //             });
    //         });

    //         it('첫번째 라디오 버튼 클릭 시 toggleOn 이벤트가 발생하여야 한다.', function(done) {
    //             radio.$el.on('toggleOn.cs.button', function(e, el) {
    //                 console.log('toggleOn 발생', el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOn');
    //                 expect(el).to.not.be.undefined;
    //                 done();
    //             });
    //             radioLabel0.click();
    //         });

    //         it('첫번째 라디오 버튼은 .active를 가져야하며 나머지는 .active를 가지면 안된다.', function() {
    //             expect(radioLabel0.hasClass('active')).to.be.ok;
    //             expect(radioLabel1.hasClass('active')).to.not.be.ok;
    //             expect(radioLabel2.hasClass('active')).to.not.be.ok;
    //         });

    //         it('두번째 라디오 버튼을 클릭 시 toggleOff와 toggleOn이 동시에 발생하여야 한다.', function(done) {
    //             radio.$el.on('toggleOff.cs.button', function(e, el) {
    //                 console.log('toggleOff 발생', e, el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOff');
    //                 expect(el).to.not.be.undefined;
    //                 done();
    //             });
    //             radioLabel1.click();
    //         });

    //         it('두번째 라디오 버튼은 .active를 가져야하며 나머지는 .active를 가지면 안된다.', function() {
    //             expect(radioLabel0.hasClass('active')).to.not.be.ok;
    //             expect(radioLabel1.hasClass('active')).to.be.ok;
    //             expect(radioLabel2.hasClass('active')).to.not.be.ok;
    //         });

    //         it('두번째 라디오 버튼 다시 클릭했을때 두번째 라디오 버튼은 .active를 유지야 해야 하며 나머지는 .active를 가지면 안된다.', function() {
    //             radioLabel1.click();
    //             expect(radioLabel0.hasClass('active')).to.not.be.ok;
    //             expect(radioLabel1.hasClass('active')).to.be.ok;
    //             expect(radioLabel2.hasClass('active')).to.not.be.ok;
    //         });
    //     });

    //     describe('checkbox', function() {

    //         var checkbox;
    //         var checkLabel0, checkLabel1, checkLabel2;

    //         it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //             require(['widget-button'], function(WidgetButton) {
    //                 checkbox = new WidgetButton({
    //                     el: '#check-toggle-1'
    //                 });
    //                 checkbox.render();
    //                 checkLabel0 = checkbox.$el.find('label:eq(0)');
    //                 checkLabel1 = checkbox.$el.find('label:eq(1)');
    //                 checkLabel2 = checkbox.$el.find('label:eq(2)');
    //                 expect(checkbox).to.be.an.instanceof(Backbone.View);
    //                 done();
    //             });
    //         });

    //         it('첫번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 한다.', function(done) {
    //             checkbox.$el.on('toggleOn.cs.button', function(e, el) {
    //                 console.log('toggleOn 발생', el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOn');
    //                 expect(el).to.not.be.undefined;
    //                 done();
    //             });
    //             checkLabel0.click();
    //         });

    //         it('첫번째 체크 박스가 .active를 가져야 하며 나머지는 .active를 가지면 안된다.', function() {
    //             expect(checkLabel0.hasClass('active')).to.be.ok;
    //             expect(checkLabel1.hasClass('active')).to.not.be.ok;
    //             expect(checkLabel2.hasClass('active')).to.not.be.ok;
    //         });

    //         it('선택된 첫번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 한다.', function(done) {
    //             checkbox.$el.on('toggleOff.cs.button', function(e, el) {
    //                 console.log('toggleOff 발생', el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOff');
    //                 expect(el).to.not.be.undefined;
    //                 done();
    //             });
    //             checkLabel0.click();
    //         });

    //         it('.active를 가진 체크박스가 존재하면 안된다.', function() {
    //             expect(checkLabel0.hasClass('active')).to.not.be.ok;
    //             expect(checkLabel1.hasClass('active')).to.not.be.ok;
    //             expect(checkLabel2.hasClass('active')).to.not.be.ok;
    //         });

    //         it('세번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 해당 체크박스만 .active를 가져야 한다..', function(done) {
    //             checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

    //             checkbox.$el.on('toggleOn.cs.button', function(e, el) {
    //                 console.log('toggleOn 발생', el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOn');
    //                 expect(el).to.not.be.undefined;
    //                 expect(checkLabel0.hasClass('active')).to.not.be.ok;
    //                 expect(checkLabel1.hasClass('active')).to.not.be.ok;
    //                 expect(checkLabel2.hasClass('active')).to.be.ok;
    //                 done();
    //             });
    //             checkLabel2.click();
    //         });

    //         it('두번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 두번째, 세번째 체크박스가 .active를 가져야 한다.', function(done) {
    //             checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

    //             checkbox.$el.on('toggleOn.cs.button', function(e, el) {
    //                 console.log('toggleOn 발생', el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOn');
    //                 expect(el).to.not.be.undefined;
    //                 expect(checkLabel0.hasClass('active')).to.not.be.ok;
    //                 expect(checkLabel1.hasClass('active')).to.be.ok;
    //                 expect(checkLabel2.hasClass('active')).to.be.ok;
    //                 done();
    //             });
    //             checkLabel1.click();
    //         });

    //         it('세번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 하고 두번째 체크박스만 .active를 가져야 한다.', function(done) {
    //             checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
    //             // 
    //             checkbox.$el.on('toggleOff.cs.button', function(e, el) {
    //                 console.log('toggleOff 발생', el);
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('toggleOff');
    //                 expect(el).to.not.be.undefined;
    //                 expect(checkLabel0.hasClass('active')).to.not.be.ok;
    //                 expect(checkLabel1.hasClass('active')).to.be.ok;
    //                 expect(checkLabel2.hasClass('active')).to.not.be.ok;
    //                 done();
    //             });
    //             checkLabel2.click();
    //         });

    //         it('기존 테스트용 이벤트 리스너를 초기화 한다.', function() {
    //             checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
    //             checkbox.$el.on('toggleOff.cs.button', function(e, el) {
    //                 console.log('toggleOff 발생', el);
    //             }).on('toggleOn.cs.button', function(e, el) {
    //                 console.log('toggleOn 발생', el);
    //             });
    //         });
    //     });
    // });

    // describe('carousel', function() {
    //     var cs;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-carousel'], function(WidgetCarousel) {
    //             cs = new WidgetCarousel({
    //                 el: '#carousel-example-generic'
    //             });
    //             cs.render();
    //             expect(cs).to.be.an.instanceof(Backbone.View);
    //             $('#btnCsStart').click(function() {
    //                 cs.$el.carousel('cycle')
    //             });
    //             done();
    //         });
    //     });

    //     it('케로셀이 플레이 될때 play 이벤트가 발생하여야 한다.', function(done) {
    //         cs.$el.on('play.cs.carousel', function(e) {
    //             console.log('play.cs.carousel 발생', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('play');
    //             done();
    //         }).carousel('pause');
    //         this.timeout(2000);
    //         setTimeout(function() {
    //             cs.$el.carousel('cycle');
    //         }, 1000);
    //     });

    //     it('케로셀이 멈출 때 pause 이벤트가 발생하여야 한다.', function(done) {
    //         cs.$el.on('pause.cs.carousel', function(e) {
    //             console.log('pause.cs.carousel 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('pause');
    //             done();
    //         });
    //         this.timeout(2000);
    //         setTimeout(function() {
    //             cs.$el.carousel('pause');
    //         }, 1000);
    //     });
    // });

    // describe('widget-chart', function() {
    //     var barChart, lineChart, pieChart;
    //     describe('barChart', function() {
    //         it('barChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
    //             require(['widget-chart'], function(WidgetChart) {
    //                 var Model = Backbone.Model.extend({
    //                     url: 'data/sample-bar.json'
    //                 });

    //                 barChart = new WidgetChart({
    //                     el: 'div.barChart',
    //                     chartOptions: {
    //                         chartType: 'bar'
    //                     },
    //                     model: new Model
    //                 });

    //                 barChart.$el.on('shown', function(e) {
    //                     e.stopPropagation();
    //                     console.log('barChart shown', e);
    //                     done();
    //                 });
    //                 barChart.render();
    //                 expect(barChart).to.be.an.instanceof(Backbone.View);
    //             });
    //         });

    //         it('각각의 바에 에니메이션이 끝날때 마다 animationEnd가 발생하고 모두 완료된 후 complete 이벤트가 발생되어야 한다.', function() {
    //             barChart.$el.on('animationEnd', function(e) {
    //                 e.stopPropagation();
    //                 console.log('barChart animationEnd', e);
    //             });
    //             barChart.$el.on('complete', function(e) {
    //                 e.stopPropagation();
    //                 console.log('barChart animation complete', e);

    //             });
    //             barChart.$el.find('g.nv-series:eq(1)').click();
    //         });
    //     });

    //     describe('lineChart', function() {
    //         it('lineChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
    //             require(['widget-chart'], function(WidgetChart) {
    //                 var Model = Backbone.Model.extend({
    //                     url: 'data/sample-line.json'
    //                 });

    //                 lineChart = new WidgetChart({
    //                     el: 'div.lineChart',
    //                     chartOptions: {
    //                         chartType: 'line'
    //                     },
    //                     model: new Model
    //                 });

    //                 lineChart.$el.on('shown', function(e) {
    //                     e.stopPropagation();
    //                     console.log('lineChart shown', e);
    //                     done();
    //                 });
    //                 lineChart.render();
    //                 expect(lineChart).to.be.an.instanceof(Backbone.View);
    //             });
    //         });
    //     });

    //     describe('pieChart', function() {
    //         it('pieChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
    //             require(['widget-chart'], function(WidgetChart) {
    //                 var Model = Backbone.Model.extend({
    //                     url: 'data/sample-pie.json'
    //                 });

    //                 pieChart = new WidgetChart({
    //                     el: 'div.pieChart',
    //                     chartOptions: {
    //                         chartType: 'pie'
    //                     },
    //                     model: new Model
    //                 });

    //                 pieChart.$el.on('shown', function(e) {
    //                     e.stopPropagation();
    //                     console.log('pieChart shown', e);
    //                     done();
    //                 });
    //                 pieChart.render();
    //                 expect(pieChart).to.be.an.instanceof(Backbone.View);
    //             });
    //         });
    //     });
    // });

    // describe('widget-collapse', function() {
    //     var collapse;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-collapse'],function(WidgetCollapse){
    //             collapse = new WidgetCollapse({
    //                 el: '#collapseOne'
    //             });
    //             collapse.render();
    //             expect(collapse).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('첫번 째 패널은 콜랩스가 작동하여야 한다.',function( done ){
    //         this.timeout(2000);
    //         var hasInClass = collapse.$el.hasClass('in');

    //         collapse.$el.parent().find('a.accordion-toggle').click(function(e){
    //             e.preventDefault();
    //             hasInClass = !hasInClass;
    //             collapse.$el.collapse('toggle');
    //             setTimeout(function() {
    //                 expect(hasInClass).to.not.equal(collapse.$el.hasClass('in'));
    //                 done();
    //             }, 1000);
    //         });
    //         collapse.$el.parent().find('a.accordion-toggle').trigger('click');
    //     });
    // });

    // describe('widget-datatable', function() {
    //     var table;
    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-datatable'], function(WidgetDatatable) {
    //             var Model = Backbone.Model.extend({
    //                 url: "data/sample-datatables.json"
    //             });
    //             table = new WidgetDatatable({
    //                 el: '#test-datatables',
    //                 model: new Model
    //             });
    //             table.render();
    //             expect(table).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('테이블의 row를 클릭했을 때 itemClick 이벤트가 발생하여야 한다.', function(done) {
    //         table.$el.on('itemClick.cs.datatables', 'tr', function(e, result) {
    //             console.log('itemClick.cs.datatables', result);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('itemClick');
    //             expect(e.namespace).to.be.equal('cs.datatables');
    //             expect(result).to.be.an('object')
    //             expect(result.data).to.be.instanceof(Array);
    //             done();
    //         });
    //         table.$el.find('tr:eq(2)').click();
    //     });
    // });

    // describe('widget-datepicker', function() {
    //     var datepicker;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-datepicker'],function(WidgetDatepicker){
    //             console.log(WidgetDatepicker);
    //             datepicker = new WidgetDatepicker({
    //                 el: '#date-picker1'
    //             });
    //             datepicker.render();
    //             expect(datepicker).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });
    // });

    describe('widget-dropdown', function() {
        var dropdown;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-dropdown'],function(WidgetDropdown){
                dropdown = new WidgetDropdown({
                    el: '#dropdown .btn-group:first-child > button',
                    widgetOption: 'toggle'
                });
                dropdown.render('toggle');
                expect(dropdown).to.be.an.instanceof(Backbone.View);
                console.log(dropdown);
                done();
            });
        });
        it('test',function(){
            // $('#dropdown .btn-group:first-child > button').click().click();
        })
    });

    // describe('widget-editor', function() {
    //     var editor;
    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-editor'], function(WidgetEditor) {
    //             editor = new WidgetEditor({
    //                 el: '#textarea'
    //             });
    //             editor.render();
    //             expect(editor).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('에디터에 포커스를 잃으면 blur 이벤트가 발생하여야 한다.', function(done) {
    //         editor.$el.on('blur', function(e) {
    //             console.log('editor blur', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('blur');
    //             done();
    //         }).focus().blur();
    //     });
    // });

    // describe('widget-listview', function() {
    //     var listview;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function() {

    //     });
    // });

    // describe('widget-media', function() {
    //     var media;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function() {

    //     });
    // });

    // describe('widget-modal', function() {
    //     var modal;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function() {

    //     });
    // });

    // describe('widget-motioncaptcha', function() {
    //     var captcha;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-motioncaptcha'], function(WidgetMotioncaptcha) {
    //             $("#motion-captcha button").off('click').on("click", function(e) {
    //                 $("#mc-canvas").remove();
    //                 $("<canvas/>", {
    //                     "id": "mc-canvas",
    //                     "class": "mc-canvas"
    //                 }).appendTo($("#motion-captcha-example"));
    //                 captcha = new WidgetMotioncaptcha({
    //                     el: '#mc-canvas'
    //                 });
    //                 captcha.render({
    //                     errorMsg: '다시 시도해주세요.',
    //                     successMsg: '성공',
    //                     onSuccess: function() {
    //                         console.log("성공");
    //                     }
    //                 });
    //                 expect(captcha).to.be.an.instanceof(Backbone.View);
    //                 done();
    //             }).click();
    //         });
    //     });

    //     it('서명을 그릴때 start, move, end 이벤트가 발생하여야 한다.', function() {
    //         captcha.$el.on('start.cs.motionCaptcha', function(e) {
    //             console.log('start', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('start');
    //         }).on('move.cs.motionCaptcha', function(e) {
    //             console.log('move', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('move');
    //         }).on('end.cs.motionCaptcha', function(e) {
    //             console.log('end', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('end');
    //         }).on('fail.cs.motionCaptcha', function(e) {
    //             console.log('fail', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('fail');
    //         }).on('success.cs.motionCaptcha', function(e) {
    //             console.log('success', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('success');
    //         });
    //     });
    // });

    // describe('widget-popover', function() {
    //     var popovers;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-popover'], function(WidgetPopover) {
    //             popovers = new WidgetPopover({
    //                 el: '[data-toggle=popover]'
    //             });
    //             popovers.render();
    //             expect(popovers).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('첫번째 버튼을 클릭하면 show,shown 이벤트가 발생하여야 한다.', function(done) {
    //         popovers.$el.each(function() {
    //             $(this).on('show.bs.popover', function(e) {
    //                 console.log('show.bs.popover 발생');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('show');
    //             }).on('shown.bs.popover', function(e) {
    //                 console.log('shown.bs.popover 발생');
    //                 e.preventDefault();
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('shown');
    //                 done();
    //             });
    //         });
    //         $(popovers.$el[0]).click();
    //     });

    //     it('첫번째 버튼을 다시 클릭하면 hide,hidden 이벤트가 발생하여야 한다.', function(done) {

    //         popovers.$el.each(function() {
    //             $(this).on('hide.bs.popover', function(e) {
    //                 console.log('hide.bs.popover 발생');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('hide');
    //             }).on('hidden.bs.popover', function(e) {
    //                 console.log('hidden.bs.popover 발생');
    //                 e.preventDefault();
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('hidden');
    //                 done();
    //             });
    //         });
    //         $(popovers.$el[0]).click();
    //     });

    //     it('세번째 버튼에 클릭 2회시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function(done) {
    //         $(popovers.$el[2]).off('show.bs.popover').off('shown.bs.popover').off('hide.bs.popover').off('hidden.bs.popover');
    //         $(popovers.$el[2]).on('show.bs.popover', function(e) {
    //             console.log('show.bs.popover 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('show');
    //         }).on('shown.bs.popover', function(e) {
    //             console.log('shown.bs.popover 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('shown');
    //         }).on('hide.bs.popover', function(e) {
    //             console.log('hide.bs.popover 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hide');
    //         }).on('hidden.bs.popover', function(e) {
    //             console.log('hidden.bs.popover 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hidden');
    //             done();
    //         }).click().click();
    //     });
    // });

    // describe('widget-rageinput', function() {

    //     var input_0, input_1, input_2;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-rangeinput'], function(WidgetRangeInput) {
    //             input_0 = new WidgetRangeInput({
    //                 el: '#range1'
    //             });
    //             input_1 = new WidgetRangeInput({
    //                 el: '#range2',
    //                 'progress': true
    //             });
    //             input_2 = new WidgetRangeInput({
    //                 el: '#range3',
    //                 'inputShow': true
    //             });
    //             input_0.render();
    //             input_1.render();
    //             input_2.render();
    //             expect(input_0).to.be.an.instanceof(Backbone.View);
    //             expect(input_1).to.be.an.instanceof(Backbone.View);
    //             expect(input_2).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });


    //     it('start, move, end 이벤트가 핸들을 움직였을 때 발생하여야 한다.', function() {

    //         input_0.$el.on('start.cs.rangeInput', function(e) {
    //             console.log('start', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('start');
    //         }).on('move.cs.rangeInput', function(e) {
    //             console.log('move', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('move');
    //         }).on('end.cs.rangeInput', function(e) {
    //             console.log('end', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('end');
    //         });

    //         input_1.$el.on('start.cs.rangeInput', function(e) {
    //             console.log('start', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('start');
    //         }).on('move.cs.rangeInput', function(e) {
    //             console.log('move', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('move');
    //         }).on('end.cs.rangeInput', function(e) {
    //             console.log('end', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('end');
    //         });

    //         input_2.$el.on('start.cs.rangeInput', function(e) {
    //             console.log('start', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('start');
    //         }).on('move.cs.rangeInput', function(e) {
    //             console.log('move', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('move');
    //         }).on('end.cs.rangeInput', function(e) {
    //             console.log('end', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('end');
    //         });
    //     });
    //     // TODO 강제로 핸들을 드래그 시키는 방법이 필요하다.
    // });

    // describe('widget-scrollspy', function() {
    //     var scrollspy;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function() {

    //     });
    // });

    // describe('widget-scrollview', function() {
    //     // var srcollviewHTML = '<section id="scroll-view" class="demo-scroll-view" title="ScrollView"><header class="page-header"><h2 class="title">ScrollView</h2></header><div class="row"><h3 class="title">기본 스크롤뷰</h3><div class="col col-12"><div id="scrollView1" class="scrollview"><div class="scroller"><ul class="list-group"><li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Dapibus ac facilisis in<div class="pull-right"><span class="badge">2</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Morbi leo risus<div class="pull-right"><span class="badge">1</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Dapibus ac facilisis in<div class="pull-right"><span class="badge">2</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Morbi leo risus<div class="pull-right"><span class="badge">1</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Dapibus ac facilisis in<div class="pull-right"><span class="badge">2</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Morbi leo risus<div class="pull-right"><span class="badge">1</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Dapibus ac facilisis in<div class="pull-right"><span class="badge">2</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Morbi leo risus<div class="pull-right"><span class="badge">1</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Cras justo odio<div class="pull-right"><span class="badge">14</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Dapibus ac facilisis in<div class="pull-right"><span class="badge">2</span><span class="glyphicon glyphicon-chevron-right"></span></div></li><li class="list-group-item">Morbi leo risus<div class="pull-right"><span class="badge">1</span><span class="glyphicon glyphicon-chevron-right"></span></div></li></ul></div></div></div></div></section>';
    //     // $('#mocha-fixture').append(srcollviewHTML);

    //     it('스크롤뷰를 아래로 당길때 pullDown 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰를 위로 당길때 pullUp 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰가 새로고쳐질 때 refresh 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰가 움직이기 시작할 때 start 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰가 움직이고 있을 때 move 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰가 움직임이 멎을 때 end 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰에 터치가 되었을때 touchStart 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰에 터치해제 되었을때 touchEnd 이벤트가 발생하여야 한다.', function() {

    //     });

    //     it('스크롤뷰가 제거될 때 destory 이벤트가 발생하여야 한다.', function() {

    //     });

    // });

    // describe('widget-sign', function() {
    //     var sign;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-sign'], function(WidgetSign) {
    //             sign = new WidgetSign({
    //                 el: '#signature'
    //             });
    //             sign.render();
    //             expect(sign).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('서명을 그릴때 start, move, end 이벤트가 발생하여야 한다.', function() {
    //         sign.$el.on('start.cs.sign', function(e) {
    //             console.log('start', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('start');
    //         }).on('move.cs.sign', function(e) {
    //             console.log('move', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('move');
    //         }).on('end.cs.sign', function(e) {
    //             console.log('end', e);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('end');
    //         });
    //     });

    //     // it('서명을 완료한 후 이미지로 보기를 눌렀을 때 이미지가 복사되어야 한다.',function(done){
    //     //     // 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
    //     //     $("button.show-sign").on('click', function (e) {
    //     //         var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
    //     //         $("div.widget-sign-viewer").html($("<img/>", {
    //     //             src: "data:" + data
    //     //         }));
    //     //         done();
    //     //     }).click();
    //     // });
    //     // TODO 강제로 핸들을 드래그 시키는 방법이 필요하다.
    // });

    // describe('widget-spinner', function() {
    //     var body_spinner, inner_spinner;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-spinner'], function(WidgetSpinner) {
    //             body_spinner = new WidgetSpinner({
    //                 el: 'body'
    //             });
    //             body_spinner.$el.on('show.cs.spinner', function(e) {
    //                 console.log('show spinner');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('show');
    //                 expect(e.namespace).to.be.equal('cs.spinner');
    //             }).on('shown.cs.spinner', function(e) {
    //                 console.log('shown spinner');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('shown');
    //                 expect(e.namespace).to.be.equal('cs.spinner');
    //                 done();
    //             });
    //             body_spinner.render();
    //             expect(body_spinner).to.be.an.instanceof(Backbone.View);
    //         });
    //     });

    //     it('전체 영역 스피너가 보여질 때 백그라운드를 클릭 시 hide, hidden 이벤트가 순차적으로 일어나야한다.', function(done) {
    //         body_spinner.$el.on('hide.cs.spinner', function(e) {
    //             console.log('hide spinner');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hide');
    //             expect(e.namespace).to.be.equal('cs.spinner');
    //         }).on('hidden.cs.spinner', function(e) {
    //             console.log('hidden spinner');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hidden');
    //             expect(e.namespace).to.be.equal('cs.spinner');
    //             done();
    //         });
    //         // $('body.spinner-outer-bg').click();
    //         body_spinner.$el.spinner();
    //     });

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-spinner'], function(WidgetSpinner) {
    //             inner_spinner = new WidgetSpinner({
    //                 el: '#loadingCircle'
    //             });
    //             inner_spinner.$el.on('show.cs.spinner', function(e) {
    //                 e.stopPropagation();
    //                 console.log('inner show spinner');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('show');
    //                 expect(e.namespace).to.be.equal('cs.spinner');
    //             }).on('shown.cs.spinner', function(e) {
    //                 e.stopPropagation();
    //                 console.log('inner shown spinner');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('shown');
    //                 expect(e.namespace).to.be.equal('cs.spinner');
    //                 done();
    //             });
    //             inner_spinner.render();
    //             expect(inner_spinner).to.be.an.instanceof(Backbone.View);
    //         });
    //     });

    //     it('전체 영역 스피너가 보여질 때 백그라운드를 클릭 시 hide, hidden 이벤트가 순차적으로 일어나야한다.', function(done) {
    //         inner_spinner.$el.on('hide.cs.spinner', function(e) {
    //             e.stopPropagation();
    //             console.log('inner hide spinner');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hide');
    //             expect(e.namespace).to.be.equal('cs.spinner');
    //         }).on('hidden.cs.spinner', function(e) {
    //             e.stopPropagation();
    //             console.log('inner hidden spinner');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hidden');
    //             expect(e.namespace).to.be.equal('cs.spinner');
    //             done();
    //         });
    //         inner_spinner.$el.spinner();
    //     });
    // });

    // describe('widget-tab', function() {
    //     var tab;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function() {

    //     });
    // });

    // describe('widget-tooltip', function() {
    //     var tooltips;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-tooltip'], function(WidgetTooltip) {
    //             tooltips = new WidgetTooltip({
    //                 el: '[data-toggle=tooltip]'
    //             });
    //             tooltips.render();
    //             expect(tooltips).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('첫번째 버튼에 마우스를 오버하면 show,shown 이벤트가 발생하여야 한다.', function(done) {
    //         tooltips.$el.each(function() {
    //             $(this).on('show.bs.tooltip', function(e) {
    //                 console.log('show.bs.tooltip 발생');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('show');
    //             }).on('shown.bs.tooltip', function(e) {
    //                 console.log('shown.bs.tooltip 발생');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('shown');
    //                 done();
    //             });
    //         });
    //         $(tooltips.$el[0]).mouseover();
    //     });

    //     it('첫번째 버튼에 마우스 오버를 해제하면 hide,hidden 이벤트가 발생하여야 한다.', function(done) {

    //         tooltips.$el.each(function() {
    //             $(this).on('hide.bs.tooltip', function(e) {
    //                 console.log('hide.bs.tooltip 발생');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('hide');
    //             }).on('hidden.bs.tooltip', function(e) {
    //                 console.log('hidden.bs.tooltip 발생');
    //                 expect(e).to.be.an.instanceof($.Event);
    //                 expect(e.type).to.be.equal('hidden');
    //                 done();
    //             });
    //         });
    //         $(tooltips.$el[0]).mouseout();
    //     });

    //     it('세번째 버튼에 마우스 오버 및 해제시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function(done) {
    //         $(tooltips.$el[3]).off('show.bs.tooltip').off('shown.bs.tooltip').off('hide.bs.tooltip').off('hidden.bs.tooltip');
    //         $(tooltips.$el[3]).on('show.bs.tooltip', function(e) {
    //             console.log('show.bs.tooltip 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('show');
    //         }).on('shown.bs.tooltip', function(e) {
    //             console.log('shown.bs.tooltip 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('shown');
    //         }).on('hide.bs.tooltip', function(e) {
    //             console.log('hide.bs.tooltip 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hide');
    //         }).on('hidden.bs.tooltip', function(e) {
    //             console.log('hidden.bs.tooltip 발생');
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('hidden');
    //             done();
    //         }).mouseover().mouseout();
    //     });
    // });

    // describe('widget-typeahead', function() {
    //     var typeahead, dMenu;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
    //         require(['widget-typeahead'], function(WidgetTypeahead) {
    //             typeahead = new WidgetTypeahead({
    //                 el: 'input.typeahead',
    //                 name: 'countries',
    //                 prefetch: 'data/typeahead-countries.json',
    //                 limit: 10
    //             });
    //             typeahead.render();
    //             expect(typeahead).to.be.an.instanceof(Backbone.View);
    //             done();
    //         });
    //     });

    //     it('input에 korea라고 넣었을 때 2개의 결과값이 검색되어야 한다.', function() {
    //         $("input.typeahead").focus();
    //         typeahead.$el.val('korea');
    //         var e = jQuery.Event("input.tt");
    //         e.which = e.keycode = 65;
    //         typeahead.$el.trigger(e);
    //         dMenu = typeahead.$el.closest('.twitter-typeahead').find('.tt-dropdown-menu');
    //         expect(dMenu).to.not.be.undefined;
    //         expect(dMenu.find('.tt-suggestion').length).to.equal(2);
    //     });

    //     it('검색된 2개의 결과물중 2번째 "South Korea"를 클릭하면 selected이벤트가 발생하여야 한다.', function(done) {
    //         typeahead.$el.on('selected.cs.typeahead', function(e, datum, dataset) {
    //             console.log(e, datum, dataset);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('selected');
    //             expect(e.namespace).to.be.equal('cs.typeahead');
    //             expect(datum.value).to.be.equal('South Korea');
    //             expect(dataset).to.be.equal('countries');
    //             done();
    //         });
    //         dMenu.find('.tt-suggestion:eq(1)').click();
    //     });

    //     it('직접 테스트를 하기위해 기존 이벤트(selected의 값 비교 로직) 제거 후 재바인딩', function() {
    //         typeahead.$el.off('selected.cs.typeahead').on('selected.cs.typeahead', function(e, datum, dataset) {
    //             console.log(e, datum, dataset);
    //             expect(e).to.be.an.instanceof($.Event);
    //             expect(e.type).to.be.equal('selected');
    //             expect(e.namespace).to.be.equal('cs.typeahead');
    //             expect(dataset).to.be.equal('countries');
    //         });
    //     });
    // });






});
