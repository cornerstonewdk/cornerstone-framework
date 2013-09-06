describe('Cornerstone 이벤트 확장, view 모듈화 통합 test', function() {

    

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

        it('서명을 그릴때 start, move, end 이벤트가 발생하여야 한다.', function() {
            require(['hammer','faketouches','showtouches', 'gestures'], function(Hammer, FakeTouches) {
                sign.$el.on( 'start.cs.sign', function(e) {
                    console.log('start', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('start');
                }).on('move.cs.sign', function(e) {
                    console.log('move', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('move');
                }).on('end.cs.sign', function(e) {
                    console.log('end', e);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('end');
                    // done();
                });
                Hammer.HAS_POINTEREVENTS = false;
                Hammer.HAS_TOUCHEVENTS = true;

                var set_faketouches_type = FakeTouches.TOUCH_EVENTS;
                // var el = document.getElementById('mc-canvas');
                // console.log($('#signature > canvas').childNodes[1]);
                // var el = $('#signature > canvas')[0];
                var el = document.getElementById('signature');
                
                console.log(el);

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
                console.log(hammertime);
                function testGesture(gesture, expect_events, callback) {
                    // reset triggered events
                    console.log(0,triggered_events);
                    triggered_events = {};

                    // trigger the gesture faker
                    faker.triggerGesture(gesture, function() {
                        var expect = expect_events.split(" ");
                        console.log(1,triggered_events);
                        var events = Object.keys(triggered_events);
                        console.log(2,expect,events);
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
                    console.log(success, msg);
                });
            });
        });
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

    
});
