/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : widget.js
 *  Description: widget.js은 각종 플러그인들의 wrapping, 커스텀 플러그인, 전후 처리를 통한 최적화 및 공통적인 터치 기능 등과 같은 작업을 처리한다.
 *  Author: 김우섭
 *  License :
 */

;(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([ "jquery" ], function ($) {
            factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function (jQuery, window, document, undefined) {
    var _pos = {}, _offset, _touch_start_time, swipeTime = 350, swipeMinDistance = 10, _has_touch = ('ontouchstart' in window);

    /**
     * @class Touch
     * @constructor
     */
    var Touch = function () {
        var self = this;
        $(document).on("touchstart mousedown touchmove mousemove touchend mouseup", function (e) {

        });
    };

    Touch.prototype = {
        /**
         * get the x and y positions from the event object
         * @param  event
         * @return array  [{ x: int, y: int }]
         */
        getXYfromEvent:function (event) {
            event = event || window.event;

            // no touches, use the event pageX and pageY
            if (typeof event === "object" && !event.type.match("touch.*")) {
                var doc = document,
                    body = doc.body;

                return [
                    {
                        x:event.pageX || event.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && doc.clientLeft || 0 ),
                        y:event.pageY || event.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && doc.clientTop || 0 )
                    }
                ];
            } else {
                // multitouch, return array with positions
                var pos = [], src, touches = event.touches.length > 0 ? event.touches : event.changedTouches;
                for (var t = 0, len = touches.length; t < len; t++) {
                    src = touches[t];
                    pos.push({ x:src.pageX, y:src.pageY });
                }
                return pos;
            }
        },

        getTouchPageXY:function (e) {
            if (e.type.match("touch.*")) {
                touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                e.pageX = touch.pageX;
                e.pageY = touch.pageY;
            }
        },

        /**
         * calculate the angle between two points
         * @param   object  pos1 { x: int, y: int }
         * @param   object  pos2 { x: int, y: int }
         */
        getAngle:function (pos1, pos2) {
            return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
        },

        /**
         * angle to direction define
         * @param  float    angle
         * @return string   direction
         */
        getDirectionFromAngle:function (angle) {
            var directions = {
                down:angle >= 45 && angle < 135, //90
                left:angle >= 135 || angle <= -135, //180
                up:angle < -45 && angle > -135, //270
                right:angle >= -45 && angle <= 45 //0
            };

            var direction, key;
            for (key in directions) {
                if (directions[key]) {
                    direction = key;
                    break;
                }
            }
            return direction;
        },

        /**
         * count the number of fingers in the event
         * when no fingers are detected, one finger is returned (mouse pointer)
         * @param  event
         * @return int  fingers
         */
        countFingers:function (event) {
            // there is a bug on android (until v4?) that touches is always 1,
            // so no multitouch is supported, e.g. no, zoom and rotation...
            return event.touches ? event.touches.length : 1;
        },

        /**
         * trigger an event/callback by name with params
         * @param string name
         * @param array  params
         */
        triggerEvent:function (eventName, params) {
            // return touches object
            params.touches = this.getXYfromEvent(params.originalEvent);
            params.type = eventName;

            // trigger callback
            if (typeof self["on" + eventName] === "function") {
                self["on" + eventName].call(self, params);
            }
        },

        drag:function (element, option) {
            var doc, draggable, el, self = this;
            option = $.extend({x:true, y:true, drag:true}, option);
            doc = doc || $(document).on("mousedown mouseup touchstart touchend", function (e) {
                self.getTouchPageXY(e);

                var touch, offset, x0, y0, x, y;
                el = $(e.target);

                // 마우스와 터치 이벤트가 시작하고 타겟 엘리먼트가 드래그인 경우
                if (e.type.match("mousedown|touchstart") && el.data("drag")) {
                    offset = el.position(), x0 = e.pageX - offset.left, y0 = e.pageY - offset.top, x, y, start = true;

                    doc.on("mousemove.drag touchmove.drag", function (e) {
                        self.getTouchPageXY(e);
                        x = e.pageX - x0, y = e.pageY - y0, props = {};

                        if (option.x) {
                            props.left = x;
                        }
                        if (option.y) {
                            props.top = y;
                        }

                        if (start) {
                            el.trigger("dragStart");
                            start = false;
                        }

                        if (option.drag) {
                            el.css(props);
                        }

                        el.trigger("drag", [y, x]);
                        draggable = el;
                    });

                    e.preventDefault();
                } else {

                    try {
                        if (draggable) {
                            draggable.trigger("dragEnd");
                        }
                    } finally {
                        // 이벤트 제거
                        doc.off("mousemove.drag touchmove.drag");
                        draggable = null;
                    }
                }
            });

            return element.data("drag", true);
        },

        swipe:function (element, option) {
            var doc, draggable, self = this, option = $.extend({x:true, y:true, swipe:true}, option),
                el = $(element), touch, offset, x0, y0, x, y;

            $("img", $(element)).on("mousedown", function () {
                return false;
            });

            el.on("touchstart",function (e) {
                _touch_start_time = new Date().getTime();
                _pos.start = self.getXYfromEvent(event);
                _fingers = self.countFingers(event);
                _first = true;
                _event_start = event;

                var box = $(this)[0].getBoundingClientRect();
                var clientTop = $(this)[0].clientTop || document.body.clientTop || 0;
                var clientLeft = $(this)[0].clientLeft || document.body.clientLeft || 0;
                var scrollTop = window.pageYOffset || $(this)[0].scrollTop || document.body.scrollTop;
                var scrollLeft = window.pageXOffset || $(this)[0].scrollLeft || document.body.scrollLeft;

                _offset = {
                    top:box.top + scrollTop - clientTop,
                    left:box.left + scrollLeft - clientLeft
                };

                offset = el.position(), x0 = e.pageX - offset.left, y0 = e.pageY - offset.top, x, y, start = true;

                e.preventDefault();
            }).on("touchend.swipe.*", function (e) {
                    _pos.move = self.getXYfromEvent(event);
                    if (!_pos.move) {
                        return;
                    }

                    // get the distance we moved
                    var _distance_x = _pos.move[0].x - _pos.start[0].x;
                    var _distance_y = _pos.move[0].y - _pos.start[0].y;
                    _distance = Math.sqrt(_distance_x * _distance_x + _distance_y * _distance_y);

                    // compare the kind of gesture by time
                    var now = new Date().getTime();
                    var touchTime = now - _touch_start_time;

                    console.log(swipeTime, touchTime, _distance, swipeMinDistance);
                    if ((swipeTime > touchTime) && (_distance > swipeMinDistance)) {
                        // calculate the angle
                        _angle = self.getAngle(_pos.start[0], _pos.move[0]);
                        _direction = self.getDirectionFromAngle(_angle);

                        _gesture = 'swipe';

                        var position = {
                            x:_pos.move[0].x - _offset.left,
                            y:_pos.move[0].y - _offset.top
                        };

                        var eventObj = {
                            originalEvent:event,
                            position:position,
                            direction:_direction,
                            distance:_distance,
                            distanceX:_distance_x,
                            distanceY:_distance_y,
                            angle:_angle
                        };

                        if (typeof eventObj.direction === "string" && eventObj.direction === "left") {
                            el.trigger("swipeLeft", eventObj);
                        } else if (typeof eventObj.direction === "string" && eventObj.direction === "right") {
                            el.trigger("swipeRight", eventObj);
                        } else if (typeof eventObj.direction === "string" && eventObj.direction === "up") {
                            el.trigger("swipeUp", eventObj);
                        } else if (typeof eventObj.direction === "string" && eventObj.direction === "down") {
                            el.trigger("swipeDown", eventObj);
                        }

                        el.trigger("swipe", eventObj);
                    }

                });
            return el.data("swipe", true);
        }
    };

    /**
     ### 사용법
     $().drag

     ### 플러그인 옵션

     |  이름  |   타입   | 기본값 | 설명
     |:------|:-------:|:----:|:------------:
     | x     | boolean | true | X축 드래그 활성화 여부
     | y     | boolean | true | Y축 드래그 활성화 여부
     | drag  | boolean | true | Drag 활성화 여부


     @method $().drag
     @param option{string} 드래그 플러그인의 사용자 설정값
     @return {jQuery} chainable jQuery 클래스
     */
    $.fn.drag = function (option) {
        var touch = new Touch();
        return touch.drag($(this), option);
    };

    /**
     ### 사용법
     $().swipe

     @method $().swipe
     @param option{string} 드래그 플러그인의 사용자 설정값
     @return {jQuery} chainable jQuery 클래스
     */
    $.fn.swipe = function (option) {
        var touch = new Touch();
        return touch.swipe($(this), option);
    };

}))
;