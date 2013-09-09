describe('Cornerstone 이벤트 확장, view 모듈화 통합 test', function() {
    
    describe('widget-carousel', function() {
        var cs;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            this.timeout(7000);
            require(['widget-carousel'], function(WidgetCarousel) {
                cs = new WidgetCarousel({
                    el: '#carousel-example-generic'
                });
                cs.$el.on('complete.cs.carousel', function(e) {
                    e.stopPropagation();
                    Logging.info('carousel img load complete.', e);
                    done();
                });
                cs.render();
                expect(cs).to.be.an.instanceof(Backbone.View);
                $('#btnCsStart').click(function() {
                    cs.$el.carousel('cycle')
                });
                
            });
        });

        it('케로셀이 플레이 될때 play 이벤트가 발생하여야 한다.', function(done) {
            cs.$el.on('play.cs.carousel', function(e) {
                Logging.info('play.cs.carousel 발생', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('play');
                done();
            }).carousel('pause');
            this.timeout(2000);
            setTimeout(function() {
                cs.$el.carousel('cycle');
            }, 1000);
        });

        it('케로셀이 멈출 때 pause 이벤트가 발생하여야 한다.', function(done) {
            cs.$el.on('pause.cs.carousel', function(e) {
                Logging.info('pause.cs.carousel 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('pause');
                done();
            });
            this.timeout(2000);
            setTimeout(function() {
                cs.$el.carousel('pause');
            }, 1000);
        });
    });

    describe('widget-alert', function() {
        var alert1, alert2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-alert'], function(WidgetAlert) {
                alert1 = new WidgetAlert({
                    el: 'div.alert:first-child'
                });
                alert1.render();
                alert2 = new WidgetAlert({
                    el: 'div.alert:nth-child(2)'
                });
                alert2.render();
                expect(alert1).to.be.an.instanceof(Backbone.View);
                expect(alert2).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('내부 버튼에(button.close) 클릭 리스너를 바인딩 하여 뷰에 플러그인 동작이 되는지 확인한다.', function(done) {
            alert1.$el.find('button.close').click(function(e) {
                alert1.$el.alert('close');
                expect(alert1.$el.css('display')).to.equal('none');
                done();
            }).click();

            alert2.$el.find('button.close').click(function(e) {
                alert2.$el.alert('close');
            });
        });
    });

    describe('widget-button', function() {

        describe('single toggle button', function() {
            var sTgBtn;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-button'], function(WidgetButton) {
                    sTgBtn = new WidgetButton({
                        el: '#single-toggle-button'
                    });
                    sTgBtn.render().$el.on('click', function() {
                        $(this).button('toggle');
                    });
                    expect(sTgBtn).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('버튼 클릭시 toggleOn 이벤트가 발생해야 한다', function(done) {
                sTgBtn.$el.on('toggleOn.cs.button', function(e) {
                    Logging.info('싱글 토글 버튼 toggleOn 발생', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.equal('toggleOn');
                    done();
                }).click();
            });

            it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있어야 한다.', function() {
                expect(sTgBtn.$el.hasClass('active')).to.be.true;
            });

            it('이미 토글되어 있는 버튼 클릭시 toggleOff 이벤트가 발생해야 한다.', function(done) {
                sTgBtn.$el.on('toggleOff.cs.button', function(e) {
                    Logging.info('싱글 토글 버튼 toggleOff 발생', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.equal('toggleOff');
                    done();
                }).click();
            });

            it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있지 않아야 한다.', function() {
                expect(sTgBtn.$el.hasClass('active')).to.not.be.true;
            });
        });

        describe('checkbox', function() {

            var checkbox;
            var checkLabel0, checkLabel1, checkLabel2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-button'], function(WidgetButton) {
                    checkbox = new WidgetButton({
                        el: '#check-toggle-1'
                    });
                    checkbox.render();
                    checkLabel0 = checkbox.$el.find('label:eq(0)');
                    checkLabel1 = checkbox.$el.find('label:eq(1)');
                    checkLabel2 = checkbox.$el.find('label:eq(2)');
                    expect(checkbox).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('첫번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 한다.', function(done) {
                checkbox.$el.on('toggleOn.cs.button', function(e, el) {
                    Logging.info('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    done();
                });
                checkLabel0.click();
            });

            it('첫번째 체크 박스가 .active를 가져야 하며 나머지는 .active를 가지면 안된다.', function() {
                expect(checkLabel0.hasClass('active')).to.be.ok;
                expect(checkLabel1.hasClass('active')).to.not.be.ok;
                expect(checkLabel2.hasClass('active')).to.not.be.ok;
            });

            it('선택된 첫번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 한다.', function(done) {
                checkbox.$el.on('toggleOff.cs.button', function(e, el) {
                    Logging.info('toggleOff 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    done();
                });
                checkLabel0.click();
            });

            it('.active를 가진 체크박스가 존재하면 안된다.', function() {
                expect(checkLabel0.hasClass('active')).to.not.be.ok;
                expect(checkLabel1.hasClass('active')).to.not.be.ok;
                expect(checkLabel2.hasClass('active')).to.not.be.ok;
            });

            it('세번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 해당 체크박스만 .active를 가져야 한다..', function(done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

                checkbox.$el.on('toggleOn.cs.button', function(e, el) {
                    Logging.info('toggleOn 발생', el);
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

            it('두번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 두번째, 세번째 체크박스가 .active를 가져야 한다.', function(done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

                checkbox.$el.on('toggleOn.cs.button', function(e, el) {
                    Logging.info('toggleOn 발생', el);
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

            it('세번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 하고 두번째 체크박스만 .active를 가져야 한다.', function(done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
                checkbox.$el.on('toggleOff.cs.button', function(e, el) {
                    Logging.info('toggleOff 발생', el);
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

            it('기존 테스트용 이벤트 리스너를 초기화 한다.', function() {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
                checkbox.$el.on('toggleOff.cs.button', function(e, el) {
                    Logging.info('toggleOff 발생', el);
                }).on('toggleOn.cs.button', function(e, el) {
                    Logging.info('toggleOn 발생', el);
                });
            });
        });

        describe('radio', function() {
            var radio;
            var radioLabel0, radioLabel1, radioLabel2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-button'], function(WidgetButton) {
                    radio = new WidgetButton({
                        el: '#radio-toggle'
                    });
                    radio.render();
                    radioLabel0 = radio.$el.find('label:eq(0)');
                    radioLabel1 = radio.$el.find('label:eq(1)');
                    radioLabel2 = radio.$el.find('label:eq(2)');
                    expect(radio).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('첫번째 라디오 버튼 클릭 시 toggleOn 이벤트가 발생하여야 한다.', function(done) {
                radio.$el.on('toggleOn.cs.button', function(e, el) {
                    Logging.info('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    done();
                });
                radioLabel0.click();
            });

            it('첫번째 라디오 버튼은 .active를 가져야하며 나머지는 .active를 가지면 안된다.', function() {
                expect(radioLabel0.hasClass('active')).to.be.ok;
                expect(radioLabel1.hasClass('active')).to.not.be.ok;
                expect(radioLabel2.hasClass('active')).to.not.be.ok;
            });

            it('두번째 라디오 버튼을 클릭 시 toggleOff와 toggleOn이 동시에 발생하여야 한다.', function(done) {
                radio.$el.on('toggleOff.cs.button', function(e, el) {
                    Logging.info('toggleOff 발생', e, el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    done();
                }).off('toggleOn.cs.button').on('toggleOn.cs.button', function(e, el) {
                    Logging.info('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                });
                radioLabel1.click();
            });
        });
    });



    describe('widget-collapse', function() {
        var collapse;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-collapse'], function(WidgetCollapse) {
                collapse = new WidgetCollapse({
                    el: '#accordion .collapse',
                    parent: '#accordion',
                    toggle: false
                });
                collapse.render();
                $('#collapse a.accordion-toggle').click(function(e) {
                    e.preventDefault();
                    $($(this).attr('href')).collapse('toggle');
                });
                expect(collapse).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('두번째 패널을 클릭 시 은 콜랩스가 작동하여야 한다.', function(done) {
            this.timeout(2000);
            $('#collapse a.accordion-toggle:eq(1)').click();
            setTimeout(function() {
                expect($('#collapseTwo').hasClass('in')).to.be.true;
                done();
            }, 1000);
        });
    });

    describe('widget-chart', function() {
        var barChart, lineChart, pieChart, horizontalBarChart, linePlusBarChart, bar3dChart, horizontal3dBarChart, lineFocusChart;
        describe('barChart', function() {
            this.timeout(3000);
            it('barChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-bar.json'
                    });

                    barChart = new WidgetChart({
                        el: 'div.barChart',
                        chartOptions: {
                            chartType: 'bar'
                        },
                        model: new Model
                    });

                    barChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('barChart shown', e);
                        done();
                    });
                    barChart.render();
                    expect(barChart).to.be.an.instanceof(Backbone.View);
                });
            });

            it('각각의 바에 에니메이션이 끝날때 마다 animationEnd가 발생하고 모두 완료된 후 complete 이벤트가 발생되어야 한다.', function(done) {
                barChart.$el.on('animationEnd', function(e) {
                    e.stopPropagation();
                    Logging.info('barChart animationEnd', e);
                });
                barChart.$el.on('complete', function(e) {
                    e.stopPropagation();
                    Logging.info('barChart animation complete', e);
                    done();
                });
                // barChart.$el.find('g.nv-series:eq(1)').click();
            });
        });

        describe('horizontalBarChart', function() {
            this.timeout(1000);
            it('horizontalBarChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-bar.json'
                    });

                    horizontalBarChart = new WidgetChart({
                        el: 'div.horizontalBarChart',
                        chartOptions: {
                            chartType: 'horizontalBar'
                        },
                        model: new Model
                    });

                    horizontalBarChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('horizontalBarChart shown', e);
                        done();
                    });
                    horizontalBarChart.render();
                    expect(horizontalBarChart).to.be.an.instanceof(Backbone.View);
                });
            });
        });

        describe('linePlusBarChart', function() {
            this.timeout(1000);
            it('linePlusBarChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-line1.json'
                    });

                    linePlusBarChart = new WidgetChart({
                        el: 'div.linePlusBarChart',
                        chartOptions: {
                            chartType: "linePlusBar",
                            format: '.2f'
                        },
                        model: new Model
                    });

                    linePlusBarChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('linePlusBarChart shown', e);
                        done();
                    });
                    linePlusBarChart.render();
                    expect(linePlusBarChart).to.be.an.instanceof(Backbone.View);
                });
            });
        });

        describe('lineChart', function() {
            this.timeout(1000);
            it('lineChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-line.json'
                    });

                    lineChart = new WidgetChart({
                        el: 'div.lineChart',
                        chartOptions: {
                            chartType: 'line'
                        },
                        model: new Model
                    });

                    lineChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('lineChart shown', e);
                        done();
                    });
                    lineChart.render();
                    expect(lineChart).to.be.an.instanceof(Backbone.View);
                });
            });
        });

        describe('pieChart', function() {
            this.timeout(1000);
            it('pieChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-pie.json'
                    });

                    pieChart = new WidgetChart({
                        el: 'div.pieChart',
                        chartOptions: {
                            chartType: 'pie'
                        },
                        model: new Model
                    });

                    pieChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('pieChart shown', e);
                        done();
                    });
                    pieChart.render();
                    expect(pieChart).to.be.an.instanceof(Backbone.View);
                });
            });
        });

        describe('bar3dChart', function() {
            this.timeout(1000);
            it('bar3dChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-bar.json'
                    });

                    bar3dChart = new WidgetChart({
                        el: 'div.bar3dChart',
                        chartOptions: {
                            chartType: "bar3d",
                            format: '.2f'
                        },
                        model: new Model
                    });

                    bar3dChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('bar3dChart shown', e);
                        done();
                    });
                    bar3dChart.render();
                    expect(bar3dChart).to.be.an.instanceof(Backbone.View);
                });
            });
        });

        describe('horizontal3dBarChart', function() {
            this.timeout(1000);
            it('horizontal3dBarChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function(done) {
                require(['widget-chart'], function(WidgetChart) {
                    var Model = Backbone.Model.extend({
                        url: 'data/sample-bar.json'
                    });

                    horizontal3dBarChart = new WidgetChart({
                        el: 'div.horizontal3dBarChart',
                        chartOptions: {
                            chartType: "horizontalBar3d",
                            format: '.2f'
                        },
                        model: new Model
                    });

                    horizontal3dBarChart.$el.on('shown', function(e) {
                        e.stopPropagation();
                        Logging.info('horizontal3dBarChart shown', e);
                        done();
                    });
                    horizontal3dBarChart.render();
                    expect(horizontal3dBarChart).to.be.an.instanceof(Backbone.View);
                });
            });
        });

        // describe('lineFocusChart', function() {
        //     it('lineFocusChart가 보여질 때 shown 이벤트가 발생하여야 한다.', function() {
        //         require(['widget-chart'], function(WidgetChart) {
        //             var Model = Backbone.Model.extend({
        //                 url: 'data/sample-line.json'
        //             });

        //             lineFocusChart = new WidgetChart({
        //                 el: 'div.lineFocusChart',
        //                 chartOptions: {
        //                     chartType: "lineFocus",
        //                     format: '.2f'
        //                 },
        //                 model: new Model
        //             });

        //             // lineFocusChart.$el.on('shown', function(e) {
        //             //     e.stopPropagation();
        //             //     Logging.info('lineFocusChart shown', e);
        //             //     done();
        //             // });
        //             lineFocusChart.render();
        //             expect(lineFocusChart).to.be.an.instanceof(Backbone.View);
        //         });
        //     });
        // });
    });

    describe('widget-datatable', function() {
        var table;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-datatable'], function(WidgetDatatable) {
                var Model = Backbone.Model.extend({
                    url: "data/sample-datatables.json"
                });
                table = new WidgetDatatable({
                    el: '#test-datatables',
                    model: new Model
                });
                table.render();
                expect(table).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('테이블의 row를 클릭했을 때 itemClick 이벤트가 발생하여야 한다.', function(done) {
            this.timeout(2000);
            setTimeout(function() {}, 500);
            table.$el.on('itemClick.cs.datatables', 'tr', function(e, result) {
                Logging.info('itemClick.cs.datatables', result);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('itemClick');
                expect(e.namespace).to.be.equal('cs.datatables');
                expect(result).to.be.an('object')
                expect(result.data).to.be.instanceof(Array);
                done();
            });
            table.$el.find('tr:eq(2)').click();
        });
    });

    describe('widget-datepicker', function() {
        var datepicker;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-datepicker'], function(WidgetDatepicker) {
                datepicker = new WidgetDatepicker({
                    el: '#date-picker1',
                    format: 'yyyy-MM-dd hh:mm:ss'
                });
                datepicker.render();
                expect(datepicker).to.be.an.instanceof(Backbone.View);
                done();
            });
        });
    });

    describe('widget-dropdown', function() {
        var dropdown1, dropdown2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-dropdown'], function(WidgetDropdown) {
                dropdown1 = new WidgetDropdown({
                    el: '#dropdown .btn-group:first-child > button'
                });
                dropdown1.render();
                expect(dropdown1).to.be.an.instanceof(Backbone.View);
                dropdown2 = new WidgetDropdown({
                    el: '#dropdown .btn-group:nth-child(2) > button'
                });
                dropdown2.render();
                expect(dropdown2).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('첫번째 드랍다운 버튼을 눌렀을 때 메뉴가 펼쳐져야 한다.',function(done){
            dropdown1.$el.click(function(e){
                expect($(this).parent().hasClass('open')).to.be.true;
                done();
            }).click();
        });

        it('첫번째 드랍다운 메뉴가 펼쳐져 있을 때 버튼을 누르면 메뉴가 접혀야 한다.',function(done){
            this.timeout(600);
            dropdown1.$el.off('click').click(function(e){
                setTimeout(function(){
                    expect($(this).parent().hasClass('open')).to.be.false;
                    $(this).off('click');
                    done();
                },500);
            }).click();
        });
    });

    describe('widget-editor', function() {
        var editor;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-editor'], function(WidgetEditor) {
                editor = new WidgetEditor({
                    el: '#textarea'
                });
                editor.render();
                expect(editor).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('에디터에 포커스를 잃으면 blur 이벤트가 발생하여야 한다.', function(done) {
            editor.$el.on('blur', function(e) {
                Logging.info('editor blur', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('blur');
                done();
            }).focus().blur();
        });
    });

    // describe('widget-listview', function() {
    //     var listview;

    //     it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function() {

    //     });
    // });

    describe('widget-media', function() {
        var media1, media2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-media'], function(WidgetMedia) {
                media1 = new WidgetMedia({
                    el: '#media .panel:first-child video'
                });
                media1.render();
                expect(media1).to.be.an.instanceof(Backbone.View);
                media2 = new WidgetMedia({
                    el: '#media .panel:nth-child(1) audio'
                });
                media2.render();
                expect(media2).to.be.an.instanceof(Backbone.View);
                done();
            });
        });
    });

    describe('widget-modal', function() {
        var modal;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-modal'], function(WidgetModal) {
                modal = new WidgetModal({
                    el: '#myModal'
                });
                modal.render();
                expect(modal).to.be.an.instanceof(Backbone.View);
                $('#btnModalToggle').click(function() {
                    modal.$el.modal('toggle');
                });
                done();
            });
        });

        it('modal이 적용된 후 토글을 실행하였을 때 modal이 사라져야 한다.', function(done) {
            modal.$el.modal('toggle');
            this.timeout(2000);
            setTimeout(function() {
                expect(modal.$el.data('bs.modal').$backdrop).to.be.equal(null);
                done()
            }, 500);
        });
    });

    describe('widget-motioncaptcha', function() {
        var captcha;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-motioncaptcha'], function(WidgetMotioncaptcha) {
                $("#motion-captcha button").off('click').on("click", function(e) {
                    $("#mc-canvas").remove();
                    $("<canvas/>", {
                        "id": "mc-canvas",
                        "class": "mc-canvas"
                    }).appendTo($("#motion-captcha-example"));
                    captcha = new WidgetMotioncaptcha({
                        el: '#mc-canvas'
                    });
                    captcha.render({
                        errorMsg: '다시 시도해주세요.',
                        successMsg: '성공',
                        onSuccess: function() {
                            Logging.info("성공");
                        }
                    });
                    expect(captcha).to.be.an.instanceof(Backbone.View);
                    done();
                }).click();
            });
        });
        
        it('캡차을 그릴때 start, move, end 이벤트가 발생하여야 한다. 또한 캡차를 잘못그려 fail 이벤트도 발생하여야 한다.', function(done) {
            this.timeout(2000);
            captcha.$el.on('start.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
                done();
            }).on('fail.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('fail', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('fail');
            }).on('success.cs.motionCaptcha', function(e) {
                e.stopPropagation();
                Logging.info('success', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('success');
            });
            require(['hammer','faketouches','showtouches', 'gestures'], function(Hammer, FakeTouches) {

                Hammer.HAS_POINTEREVENTS = false;
                Hammer.HAS_TOUCHEVENTS = true;

                var set_faketouches_type = FakeTouches.TOUCH_EVENTS;
                var el = document.getElementById('mc-canvas');

                var faker = new FakeTouches(el);
                var hammertime = new Hammer(el);

                var all_events = ["touch", "release", "hold", "tap", "doubletap",
                    "dragstart", "drag", "dragend", "dragleft", "dragright",
                    "dragup", "dragdown", "swipe", "swipeleft", "swiperight",
                    "swipeup", "swipedown", "transformstart", "transform",
                    "transformend", "rotate", "pinch", "pinchin", "pinchout"
                ];

                // keep track of what events are triggered
                var triggered_events = {};
                hammertime.on(all_events.join(" "), function(ev) {
                    triggered_events[ev.type] = ev;
                });

                function testGesture(gesture, expect_events, callback) {
                    // reset triggered events
                    triggered_events = {};

                    // trigger the gesture faker
                    faker.triggerGesture(gesture, function() {
                        var expect = expect_events.split(" ");
                        var events = Object.keys(triggered_events);
                        // _.each(triggered_events, function(ev, name) {
                        //     testEventData(name, ev);
                        // });

                        // trigger callback with true/false is all the events are triggered
                        // if also any other events are triggered it is false
                        var success = (events.length === expect.length);

                        // error msg
                        var msg = gesture + " detected";
                        if (!success) {
                            msg = gesture + " error. Events thrown: " + events.join(" ");
                        }

                        // maybe something happens after the end, so wait a moment
                        callback(success, msg);
                    });
                };

                var gesture_tests = {
                    'Hold': 'touch hold release',
                    'Tap': 'touch tap release',
                    'DoubleTap': 'touch tap doubletap release',
                    'DragRight': 'touch drag dragstart dragright dragend release',
                    'SwipeRight': 'touch drag dragstart dragright dragend swipe swiperight release',
                    'Rotate': 'touch transform transformstart transformend rotate release',
                    'PinchIn': 'touch transform transformstart transformend pinch pinchin release',
                    'PinchOut': 'touch transform transformstart transformend pinch pinchout release'
                };

                testGesture('DragRight', gesture_tests['DragRight'], function(success, msg) {
                    Logging.info(success, msg);
                });
            });
        });
    });

    describe('widget-popover', function() {
        var singlePop, topPop, bottomPop;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-popover'], function(WidgetPopover) {
                singlePop = new WidgetPopover({
                    el: '#popover > div > a',
                    placement: 'top',
                    content: 'single popover testing'
                });
                singlePop.render();
                expect(singlePop).to.be.an.instanceof(Backbone.View);
                topPop = new WidgetPopover({
                    el: '#popover > div > div > ul > li:nth-child(1) > a',
                    placement: 'top',
                    content: 'top popover test'
                });
                topPop.render();
                expect(topPop).to.be.an.instanceof(Backbone.View);
                bottomPop = new WidgetPopover({
                    el: '#popover > div > div > ul > li:nth-child(2) > a',
                    placement: 'bottom',
                    content: 'bottom popover test'
                });
                bottomPop.render();
                expect(bottomPop).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('싱글 팝오버 버튼을 클릭하면 show,shown 이벤트가 발생하여야 한다.', function(done) {
            singlePop.$el.on('show.bs.popover', function(e) {
                Logging.info('show.bs.popover 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('show');
            }).on('shown.bs.popover', function(e) {
                Logging.info('shown.bs.popover 발생');
                e.preventDefault();
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('shown');
                done();
            });
            singlePop.$el.click();
        });

        it('첫번째 버튼을 다시 클릭하면 hide,hidden 이벤트가 발생하여야 한다.', function(done) {
            this.timeout(1000);
            singlePop.$el.on('hide.bs.popover', function(e) {
                Logging.info('hide.bs.popover 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.bs.popover', function(e) {
                Logging.info('hidden.bs.popover 발생');
                e.preventDefault();
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            });
            setTimeout(function(){
                singlePop.$el.click();    
            },500);
            
        });
    });

    describe('widget-rageinput', function() {

        var input_0, input_1, input_2;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-rangeinput'], function(WidgetRangeInput) {
                input_0 = new WidgetRangeInput({
                    el: '#range1'
                });
                input_1 = new WidgetRangeInput({
                    el: '#range2',
                    'progress': true
                });
                input_2 = new WidgetRangeInput({
                    el: '#range3',
                    'inputShow': true
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

        it('첫번째 rangeinput의 핸들을 움직였을때 start, move, end 이벤트가 순차적으로 발생하여야 한다.',function(done){
            this.timeout(1000);
            input_0.$el.on('start.cs.rangeInput', function(e) {
                Logging.info('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.rangeInput', function(e) {
                Logging.info('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.rangeInput', function(e) {
                Logging.info('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
                done();
            });
            require(['hammer','faketouches','showtouches', 'gestures'], function(Hammer, FakeTouches) {

                Hammer.HAS_POINTEREVENTS = false;
                Hammer.HAS_TOUCHEVENTS = true;

                var set_faketouches_type = FakeTouches.TOUCH_EVENTS;
                var el = $('#range1').parent().find('> .slider > button')[0];

                var faker = new FakeTouches(el);
                var hammertime = new Hammer(el);

                var all_events = ["touch", "release", "hold", "tap", "doubletap",
                    "dragstart", "drag", "dragend", "dragleft", "dragright",
                    "dragup", "dragdown", "swipe", "swipeleft", "swiperight",
                    "swipeup", "swipedown", "transformstart", "transform",
                    "transformend", "rotate", "pinch", "pinchin", "pinchout"
                ];

                // keep track of what events are triggered
                var triggered_events = {};
                hammertime.on(all_events.join(" "), function(ev) {
                    triggered_events[ev.type] = ev;
                });

                function testGesture(gesture, expect_events, callback) {
                    // reset triggered events
                    triggered_events = {};

                    // trigger the gesture faker
                    faker.triggerGesture(gesture, function() {
                        var expect = expect_events.split(" ");
                        var events = Object.keys(triggered_events);

                        // trigger callback with true/false is all the events are triggered
                        // if also any other events are triggered it is false
                        var success = (events.length === expect.length);

                        // error msg
                        var msg = gesture + " detected";
                        if (!success) {
                            msg = gesture + " error. Events thrown: " + events.join(" ");
                        }

                        // maybe something happens after the end, so wait a moment
                        callback(success, msg);
                    });
                };

                var gesture_tests = {
                    'DragRight': 'touch drag dragstart dragright dragend release'
                };

                testGesture('DragRight', gesture_tests['DragRight'], function(success, msg) {
                    Logging.info(success, msg);
                });
            });
        });

        it('첫번째 rangeinput의 핸들을 움직였을때 start, move, end 이벤트가 순차적으로 발생하여야 한다.',function(done){
            this.timeout(1000);
            input_1.$el.on('start.cs.rangeInput', function(e) {
                Logging.info('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.rangeInput', function(e) {
                Logging.info('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.rangeInput', function(e) {
                Logging.info('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
                done();
            });
            require(['hammer','faketouches','showtouches', 'gestures'], function(Hammer, FakeTouches) {

                Hammer.HAS_POINTEREVENTS = false;
                Hammer.HAS_TOUCHEVENTS = true;

                var set_faketouches_type = FakeTouches.TOUCH_EVENTS;
                var el = $('#range2').parent().find('> .slider > button')[0];
                

                var faker = new FakeTouches(el);
                var hammertime = new Hammer(el);

                var all_events = ["touch", "release", "hold", "tap", "doubletap",
                    "dragstart", "drag", "dragend", "dragleft", "dragright",
                    "dragup", "dragdown", "swipe", "swipeleft", "swiperight",
                    "swipeup", "swipedown", "transformstart", "transform",
                    "transformend", "rotate", "pinch", "pinchin", "pinchout"
                ];

                // keep track of what events are triggered
                var triggered_events = {};
                hammertime.on(all_events.join(" "), function(ev) {
                    triggered_events[ev.type] = ev;
                });

                function testGesture(gesture, expect_events, callback) {
                    // reset triggered events
                    triggered_events = {};

                    // trigger the gesture faker
                    faker.triggerGesture(gesture, function() {
                        var expect = expect_events.split(" ");
                        var events = Object.keys(triggered_events);

                        // trigger callback with true/false is all the events are triggered
                        // if also any other events are triggered it is false
                        var success = (events.length === expect.length);

                        // error msg
                        var msg = gesture + " detected";
                        if (!success) {
                            msg = gesture + " error. Events thrown: " + events.join(" ");
                        }

                        // maybe something happens after the end, so wait a moment
                        callback(success, msg);
                    });
                };

                var gesture_tests = {
                    'DragRight': 'touch drag dragstart dragright dragend release'
                };

                testGesture('DragRight', gesture_tests['DragRight'], function(success, msg) {
                    Logging.info(success, msg);
                });
            });
        });
    
        it('첫번째 rangeinput의 핸들을 움직였을때 start, move, end 이벤트가 순차적으로 발생하여야 한다.',function(done){
            this.timeout(1000);
            input_2.$el.on('start.cs.rangeInput', function(e) {
                Logging.info('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.rangeInput', function(e) {
                Logging.info('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.rangeInput', function(e) {
                Logging.info('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
                done();
            });
            require(['hammer','faketouches','showtouches', 'gestures'], function(Hammer, FakeTouches) {

                Hammer.HAS_POINTEREVENTS = false;
                Hammer.HAS_TOUCHEVENTS = true;

                var set_faketouches_type = FakeTouches.TOUCH_EVENTS;
                var el = $('#range3').parent().find('> .slider > button')[0];
                

                var faker = new FakeTouches(el);
                var hammertime = new Hammer(el);

                var all_events = ["touch", "release", "hold", "tap", "doubletap",
                    "dragstart", "drag", "dragend", "dragleft", "dragright",
                    "dragup", "dragdown", "swipe", "swipeleft", "swiperight",
                    "swipeup", "swipedown", "transformstart", "transform",
                    "transformend", "rotate", "pinch", "pinchin", "pinchout"
                ];

                // keep track of what events are triggered
                var triggered_events = {};
                hammertime.on(all_events.join(" "), function(ev) {
                    triggered_events[ev.type] = ev;
                });

                function testGesture(gesture, expect_events, callback) {
                    // reset triggered events
                    triggered_events = {};

                    // trigger the gesture faker
                    faker.triggerGesture(gesture, function() {
                        var expect = expect_events.split(" ");
                        var events = Object.keys(triggered_events);

                        // trigger callback with true/false is all the events are triggered
                        // if also any other events are triggered it is false
                        var success = (events.length === expect.length);

                        // error msg
                        var msg = gesture + " detected";
                        if (!success) {
                            msg = gesture + " error. Events thrown: " + events.join(" ");
                        }

                        // maybe something happens after the end, so wait a moment
                        callback(success, msg);
                    });
                };

                var gesture_tests = {
                    'DragRight': 'touch drag dragstart dragright dragend release'
                };

                testGesture('DragRight', gesture_tests['DragRight'], function(success, msg) {
                    Logging.info(success, msg);
                });
            });
        });


        it('start, move, end 이벤트가 핸들을 움직였을 때 발생하여야 한다.', function() {

            

            input_1.$el.on('start.cs.rangeInput', function(e) {
                Logging.info('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.rangeInput', function(e) {
                Logging.info('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.rangeInput', function(e) {
                Logging.info('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            });

            input_2.$el.on('start.cs.rangeInput', function(e) {
                Logging.info('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.rangeInput', function(e) {
                Logging.info('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.rangeInput', function(e) {
                Logging.info('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            });
        });
        // TODO 강제로 핸들을 드래그 시키는 방법이 필요하다.
    });

    describe('widget-scrollspy', function() {
        var scrollspy;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-scrollspy'], function(WidgetScrollSpy) {
                scrollspy = new WidgetScrollSpy({
                    el: '.scrollspy-example',
                    target: '#navbar-example2'
                });
                scrollspy.render();
                expect(scrollspy).to.be.an.instanceof(Backbone.View);
                done();
            });
        });
    });

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

    describe('widget-sign', function() {
        var sign;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-sign'], function(WidgetSign) {
                sign = new WidgetSign({
                    el: '#signature'
                });
                sign.render();
                expect(sign).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        // it('서명을 그릴때 start, move, end 이벤트가 발생하여야 한다.', function() {
        //     this.timeout(5000);
        //     sign.$el.on('start.cs.sign', function(e) {
        //         Logging.info('start', e);
        //         expect(e).to.be.an.instanceof($.Event);
        //         expect(e.type).to.be.equal('start');
        //     }).on('move.cs.sign', function(e) {
        //         Logging.info('move', e);
        //         expect(e).to.be.an.instanceof($.Event);
        //         expect(e.type).to.be.equal('move');
        //     }).on('end.cs.sign', function(e) {
        //         Logging.info('end', e);
        //         expect(e).to.be.an.instanceof($.Event);
        //         expect(e.type).to.be.equal('end');
        //     });

        //     require(['hammer','faketouches','showtouches', 'gestures'], function(Hammer, FakeTouches) {

        //         Hammer.HAS_POINTEREVENTS = true;
        //         Hammer.HAS_TOUCHEVENTS = false;

        //         var set_faketouches_type = FakeTouches.TOUCH_EVENTS;
        //         // var el = document.getElementById('mc-canvas');
        //         // Logging.info($('#signature > canvas').childNodes[1]);
        //         // var el = $('#signature > canvas')[0];
        //         var el = document.getElementById('signature').childNodes[2];
                
        //         Logging.info(el);

        //         var faker = new FakeTouches(el);
        //         var hammertime = new Hammer(el);

        //         var all_events = ["touch", "release", "hold", "tap", "doubletap",
        //             "dragstart", "drag", "dragend", "dragleft", "dragright",
        //             "dragup", "dragdown", "swipe", "swipeleft", "swiperight",
        //             "swipeup", "swipedown", "transformstart", "transform",
        //             "transformend", "rotate", "pinch", "pinchin", "pinchout"
        //         ];

        //         // keep track of what events are triggered
        //         var triggered_events = {};
        //         hammertime.on(all_events.join(" "), function(ev) {
        //             triggered_events[ev.type] = ev;
        //         });

        //         function testGesture(gesture, expect_events, callback) {
        //             // reset triggered events
        //             triggered_events = {};

        //             // trigger the gesture faker
        //             faker.triggerGesture(gesture, function() {
        //                 var expect = expect_events.split(" ");
        //                 var events = Object.keys(triggered_events);
        //                 // _.each(triggered_events, function(ev, name) {
        //                 //     testEventData(name, ev);
        //                 // });

        //                 // trigger callback with true/false is all the events are triggered
        //                 // if also any other events are triggered it is false
        //                 var success = (events.length === expect.length);

        //                 // error msg
        //                 var msg = gesture + " detected";
        //                 if (!success) {
        //                     msg = gesture + " error. Events thrown: " + events.join(" ");
        //                 }

        //                 // maybe something happens after the end, so wait a moment
        //                 callback(success, msg);
        //             });
        //         };

        //         var gesture_tests = {
        //             'Hold': 'touch hold release',
        //             'Tap': 'touch tap release',
        //             'DoubleTap': 'touch tap doubletap release',
        //             'DragRight': 'touch drag dragstart dragright dragend release',
        //             'SwipeRight': 'touch drag dragstart dragright dragend swipe swiperight release',
        //             'Rotate': 'touch transform transformstart transformend rotate release',
        //             'PinchIn': 'touch transform transformstart transformend pinch pinchin release',
        //             'PinchOut': 'touch transform transformstart transformend pinch pinchout release'
        //         };
        //         testGesture('DragRight', gesture_tests['DragRight'], function(success, msg) {
        //             Logging.info(success, msg);
        //         });
        //     });
        // });
        // it('서명을 완료한 후 이미지로 보기를 눌렀을 때 이미지가 복사되어야 한다.',function(done){
        //     // 이미지로 보기, 이미지로 다운로드하기, 리셋하기.
        //     $("button.show-sign").on('click', function (e) {
        //         var data = $("#signature").sign("getData", "image"); // Base64 형태의 이미지 데이터 리턴
        //         $("div.widget-sign-viewer").html($("<img/>", {
        //             src: "data:" + data
        //         }));
        //         done();
        //     }).click();
        // });
        // TODO 강제로 핸들을 드래그 시키는 방법이 필요하다.
    });

    describe('widget-spinner', function() {
        var body_spinner, inner_spinner;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-spinner'], function(WidgetSpinner) {
                body_spinner = new WidgetSpinner({
                    el: 'body'
                });
                body_spinner.$el.on('show.cs.spinner', function(e) {
                    Logging.info('show spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                    expect(e.namespace).to.be.equal('cs.spinner');
                }).on('shown.cs.spinner', function(e) {
                    Logging.info('shown spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                    expect(e.namespace).to.be.equal('cs.spinner');
                    done();
                });
                body_spinner.render();
                expect(body_spinner).to.be.an.instanceof(Backbone.View);
            });
        });

        it('전체 영역 스피너가 보여질 때 백그라운드를 클릭 시 hide, hidden 이벤트가 순차적으로 일어나야한다.', function(done) {
            body_spinner.$el.on('hide.cs.spinner', function(e) {
                Logging.info('hide spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
                expect(e.namespace).to.be.equal('cs.spinner');
            }).on('hidden.cs.spinner', function(e) {
                Logging.info('hidden spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                expect(e.namespace).to.be.equal('cs.spinner');
                done();
            });
            // $('body.spinner-outer-bg').click();
            body_spinner.$el.spinner();
        });

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-spinner'], function(WidgetSpinner) {
                inner_spinner = new WidgetSpinner({
                    el: '#loadingCircle'
                });
                inner_spinner.$el.on('show.cs.spinner', function(e) {
                    e.stopPropagation();
                    Logging.info('inner show spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                    expect(e.namespace).to.be.equal('cs.spinner');
                }).on('shown.cs.spinner', function(e) {
                    e.stopPropagation();
                    Logging.info('inner shown spinner');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                    expect(e.namespace).to.be.equal('cs.spinner');
                    done();
                });
                inner_spinner.render();
                expect(inner_spinner).to.be.an.instanceof(Backbone.View);
            });
        });

        it('전체 영역 스피너가 보여질 때 백그라운드를 클릭 시 hide, hidden 이벤트가 순차적으로 일어나야한다.', function(done) {
            inner_spinner.$el.on('hide.cs.spinner', function(e) {
                e.stopPropagation();
                Logging.info('inner hide spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
                expect(e.namespace).to.be.equal('cs.spinner');
            }).on('hidden.cs.spinner', function(e) {
                e.stopPropagation();
                Logging.info('inner hidden spinner');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                expect(e.namespace).to.be.equal('cs.spinner');
                done();
            });
            inner_spinner.$el.spinner();
        });
    });

    describe('widget-tab', function() {
        var tab;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-tab'], function(WidgetTab) {
                tab = new WidgetTab({
                    el: '#myTab'
                });
                tab.render();

                $('#myTab a').click(function(e) {
                    e.preventDefault()
                    $(this).tab('show')
                })

                expect(tab).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('프로파일 탭을 클릭했을 때 2번째 탭이 보여야 한다.',function(done){
            this.timeout(1000);
            tab.$el.find('a[href="#profile"]').click();
            setTimeout(function(){
                expect($('#myTabContent > #profile').hasClass('active in')).to.be.true;
                done();
            },500);
        })
    });

    describe('widget-tooltip', function() {
        var singleTooltip, leftTooltip, rightTooltip;
        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-tooltip'], function(WidgetTooltip) {
                singleTooltip = new WidgetTooltip({
                    el: '#tooltip div.well > a',
                    placement: 'top'
                });
                singleTooltip.render();
                expect(singleTooltip).to.be.an.instanceof(Backbone.View);
                leftTooltip = new WidgetTooltip({
                    el: '#tooltip ul.demo-tooltips > li:nth-child(2) > a',
                    placement: 'left'
                });
                leftTooltip.render();
                expect(leftTooltip).to.be.an.instanceof(Backbone.View);
                rightTooltip = new WidgetTooltip({
                    el: '#tooltip ul.demo-tooltips > li:nth-child(1) > a',
                    placement: 'right'
                });
                rightTooltip.render();
                expect(rightTooltip).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('첫번째 버튼에 마우스를 오버하면 show,shown 이벤트가 발생하여야 한다.', function(done) {
            singleTooltip.$el.each(function() {
                $(this).on('show.bs.tooltip', function(e) {
                    Logging.info('show.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                }).on('shown.bs.tooltip', function(e) {
                    Logging.info('shown.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                    done();
                });
            });
            $(singleTooltip.$el[0]).mouseover();
        });

        it('첫번째 버튼에 마우스 오버를 해제하면 hide,hidden 이벤트가 발생하여야 한다.', function(done) {

            singleTooltip.$el.each(function() {
                $(this).on('hide.bs.tooltip', function(e) {
                    Logging.info('hide.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hide');
                }).on('hidden.bs.tooltip', function(e) {
                    Logging.info('hidden.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hidden');
                    done();
                });
            });
            $(singleTooltip.$el[0]).mouseout();
        });

        it('왼쪽 툴팁에 마우스 오버 및 해제시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function(done) {
            leftTooltip.$el.on('show.bs.tooltip', function(e) {
                Logging.info('show.bs.tooltip 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('show');
            }).on('shown.bs.tooltip', function(e) {
                Logging.info('shown.bs.tooltip 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('shown');
            }).on('hide.bs.tooltip', function(e) {
                Logging.info('hide.bs.tooltip 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hide');
            }).on('hidden.bs.tooltip', function(e) {
                Logging.info('hidden.bs.tooltip 발생');
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('hidden');
                done();
            }).mouseover().mouseout();
        });
    });

    describe('widget-typeahead', function() {
        var typeahead, dMenu;

        it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
            require(['widget-typeahead'], function(WidgetTypeahead) {
                typeahead = new WidgetTypeahead({
                    el: 'input.typeahead',
                    name: 'countries',
                    prefetch: 'data/typeahead-countries.json',
                    limit: 10
                });
                typeahead.render();
                expect(typeahead).to.be.an.instanceof(Backbone.View);
                done();
            });
        });

        it('input에 korea라고 넣었을 때 2개의 결과값이 검색되어야 한다.', function() {
            $("input.typeahead").focus();
            typeahead.$el.val('korea');
            var e = jQuery.Event("input.tt");
            e.which = e.keycode = 65;
            typeahead.$el.trigger(e);
            dMenu = typeahead.$el.closest('.twitter-typeahead').find('.tt-dropdown-menu');
            expect(dMenu).to.not.be.undefined;
            expect(dMenu.find('.tt-suggestion').length).to.equal(2);
        });

        it('검색된 2개의 결과물중 2번째 "South Korea"를 클릭하면 selected이벤트가 발생하여야 한다.', function(done) {
            typeahead.$el.on('selected.cs.typeahead', function(e, datum, dataset) {
                Logging.info(e, datum, dataset);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('selected');
                expect(e.namespace).to.be.equal('cs.typeahead');
                expect(datum.value).to.be.equal('South Korea');
                expect(dataset).to.be.equal('countries');
                done();
            });
            dMenu.find('.tt-suggestion:eq(1)').click();
        });

        it('직접 테스트를 하기위해 기존 이벤트(selected의 값 비교 로직) 제거 후 재바인딩', function() {
            typeahead.$el.off('selected.cs.typeahead').on('selected.cs.typeahead', function(e, datum, dataset) {
                Logging.info(e, datum, dataset);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('selected');
                expect(e.namespace).to.be.equal('cs.typeahead');
                expect(dataset).to.be.equal('countries');
            });
        });
    });

});
