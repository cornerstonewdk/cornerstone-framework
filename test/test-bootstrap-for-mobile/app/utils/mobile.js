/**
 * Created with JetBrains WebStorm.
 * User: AZAMARA
 * Date: 12. 7. 10
 * Time: 오후 5:02
 * To change this template use File | Settings | File Templates.
 */
!function ($) {
    $.cornerStoneMobile = {
        fastButton:function () {
            function NoClickDelay(el) {
                this.element = el;
                if( window.Touch ) this.element.addEventListener('touchstart', this, false);
            }

            NoClickDelay.prototype = {
                handleEvent: function(e) {
                    switch(e.type) {
                        case 'touchstart': this.onTouchStart(e); break;
                        case 'touchmove': this.onTouchMove(e); break;
                        case 'touchend': this.onTouchEnd(e); break;
                    }
                },

                onTouchStart: function(e) {
                    console.log('touch start');
                    e.preventDefault();
                    this.moved = false;

                    this.element.addEventListener('touchmove', this, false);
                    this.element.addEventListener('touchend', this, false);
                },

                onTouchMove: function(e) {
                    console.log('touch move');
                    this.moved = true;
                },

                onTouchEnd: function(e) {
                    console.log('touch end');
                    this.element.removeEventListener('touchmove', this, false);
                    this.element.removeEventListener('touchend', this, false);

                    if( !this.moved ) {
                        var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                        if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;

                        var theEvent = document.createEvent('MouseEvents');
                        theEvent.initEvent('click', true, true);
                        theTarget.dispatchEvent(theEvent);
                    }
                }
            };

            function loaded() {
                var theClick = document.getElementById('theClick');
                var theTap = document.getElementById('theTap');
                var result = document.getElementById('result');

                new NoClickDelay(theTap);

                /*  Benchmarking */
                theClick.addEventListener('touchstart', function(e){
                    this.timeStart = e.timeStamp;
                }, false);

                theClick.addEventListener('click', function(e){
                    result.innerHTML = 'Delay: ' + (e.timeStamp-this.timeStart) + 'ms';
                }, false);

                theTap.addEventListener('touchstart', function(e){
                    this.timeStart = e.timeStamp;
                }, false);

                theTap.addEventListener('click', function(e){
                    result.innerHTML = 'Delay: ' + (e.timeStamp-this.timeStart) + 'ms';
                }, false);
            }
            loaded();
        },
        hoverDelay : function(s) {
            window.addEventListener('mouseover', function(e) {
                e.preventDefault();
            }, false);
        },
        hideUrlAddress:function () {

        }
    }
}(window.jQuery);
