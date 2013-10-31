;
(function(root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define( function() {
            return factory(root, doc);
        });
    } else {
        // None AMD
        factory(root, doc);
    }
}(window, document, function(window, document) {
    'use strict';


    /**
     * create faketouches instance
     * @param element
     * @constructor
     */
    function FakeTouches(element) {
        this.element = element;

        this.touches = [];
        this.touch_type = FakeTouches.TOUCH_EVENTS;
        this.has_multitouch = true;
    }

    FakeTouches.POINTER_TOUCH_EVENTS = 100;
    FakeTouches.POINTER_MOUSE_EVENTS = 200;
    FakeTouches.TOUCH_EVENTS = 300;
    FakeTouches.MOUSE_EVENTS = 400;
    FakeTouches.TOUCH_AND_MOUSE_EVENTS = 500;

    FakeTouches.POINTER_TYPE_MOUSE = 1000;
    FakeTouches.POINTER_TYPE_TOUCH = 2000;


    /**
     * set the kind of touchevents we want to trigger
     * @param   {Number}    touch_type
     */
    FakeTouches.prototype.setTouchType = function(touch_type) {
        this.touch_type = touch_type;

        this.has_multitouch = true;
        if(touch_type == FakeTouches.POINTER_MOUSE_EVENTS ||
            touch_type == FakeTouches.MOUSE_EVENTS) {
            this.has_multitouch = false;
        }
    };


    /**
     * uppercase first char
     * @param str
     * @returns {string}
     */
    function ucfirst(str) {
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
    }


    /**
     * insert touches by xy per touch
     * [ [x,y], [x,y] ]
     * @param {Array} touches
     */
    FakeTouches.prototype.setTouches = function(touches) {
        return this.touches = touches;
    };


    /**
     * simple methods to just trigger an event
     */
    ['start','end','move','cancel'].forEach(function(val) {
        FakeTouches.prototype['trigger'+ ucfirst(val)] = (function(type) {
            return function(touches) {
                if(touches) {
                    this.touches = touches;
                }

                this.triggerEvent(type);
            };
        })(val);
    });


    /**
     * move touches to new positions. all with x ammount, or per touch
     * @param  {Mixed}  dx      When dx is an array, each touch can be updated
     * @param  {Number} [dy]
     */
    FakeTouches.prototype.moveBy = function(dx, dy) {
        var self = this;
        // each touch must be updated
        if(typeof dx == 'object') {
            var delta_touches = dx;
            this.touches.forEach(function(val, i) {
                self.touches[i][0] += delta_touches[i][0];
                self.touches[i][1] += delta_touches[i][1];
            });
        }
        // add dx,dy to all touches
        else {
            this.touches.forEach(function(val, i) {
                self.touches[i][0] += dx;
                self.touches[i][1] += dy;
            });
        }

        this.triggerMove();

        return this.touches;
    };


    FakeTouches.prototype.createTouchList = function(touches) {
        var touchlist = [];
        touches.forEach(function(val, index) {
            touchlist.push({
                pageX: val[0],
                pageY: val[1],
                clientX: val[0],
                clientY: val[1],
                identifier: index
            });
        });
        return touchlist;
    };



    FakeTouches.prototype.triggerEvent = function(type) {
        switch(this.touch_type) {
            case FakeTouches.TOUCH_EVENTS:
                triggerTouch.call(this, type);
                break;

            case FakeTouches.MOUSE_EVENTS:
                triggerMouse.call(this, type);
                break;

            case FakeTouches.TOUCH_AND_MOUSE_EVENTS:
                triggerTouch.call(this, type);
                triggerMouse.call(this, type);
                break;

            case FakeTouches.POINTER_TOUCH_EVENTS:
                triggerPointerEvents.call(this, type, FakeTouches.POINTER_TYPE_TOUCH);
                break;

            case FakeTouches.POINTER_MOUSE_EVENTS:
                triggerPointerEvents.call(this, type, FakeTouches.POINTER_TYPE_MOUSE);
                break;
        }
    };


    /**
     * trigger touch event
     * @param type
     * @returns {Boolean}
     */
    function triggerTouch(type) {
        var event = document.createEvent('Event');
        event.initEvent('touch'+ type, true, true);

        var touchlist = this.createTouchList(this.touches);
        if(type == 'end' || type == 'cancel') {
            event.touches = [];
        }
        else {
            event.touches = touchlist;
        }

        return this.element.dispatchEvent(event);
    }


    /**
     * trigger mouse event
     * @param type
     * @returns {Boolean}
     */
    function triggerMouse(type) {
        var names = {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
        };

        var event = document.createEvent('Event');
        event.initEvent(names[type], true, true);
        var touchList = this.createTouchList(this.touches);
        if(touchList[0]) {
            event.pageX = touchList[0].pageX;
            event.pageY = touchList[0].pageY;
            event.clientX = touchList[0].clientX;
            event.clientY = touchList[0].clientY;
            event.target = this.element;
            event.which = 1;
        }
        return this.element.dispatchEvent(event);
    }

    /**
     * trigger pointer event
     * @param type
     * @param pointerType
     * @returns {Boolean}
     */
    function triggerPointerEvents(type, pointerType) {
        var self = this;
        var names = {
            start: 'MSPointerDown',
            move: 'MSPointerMove',
            end: 'MSPointerUp'
        };

        var touchList = this.createTouchList(this.touches);
        touchList.forEach(function(touch) {
            var event = document.createEvent('Event');
            event.initEvent(names[type], true, true);

            event.MSPOINTER_TYPE_MOUSE = FakeTouches.POINTER_TYPE_MOUSE;
            event.MSPOINTER_TYPE_TOUCH = FakeTouches.POINTER_TYPE_TOUCH;

            event.pointerId = touch.identifier;
            event.pointerType = pointerType;
            event.pageX = touch.pageX;
            event.pageY = touch.pageY;
            event.clientX = touch.clientX;
            event.clientY = touch.clientY;
            event.target = self.element;

            if(pointerType === FakeTouches.POINTER_TYPE_MOUSE) {
                event.which = 1;
            }

            self.element.dispatchEvent(event);
        });

        return true;
    }


    window.FakeTouches = FakeTouches;

    return FakeTouches;
}));