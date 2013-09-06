;
(function(root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD
        define(['faketouches'], function(FakeTouches) {
            return factory(root, doc, FakeTouches);
        });
    } else {
        // None AMD
        factory(root, doc, root.FakeTouches);
    }
}(window, document, function(window, document, FakeTouches) {
    'use strict';

    var Gestures = {};

    Gestures.Tap = function(callback) {
        this.setTouches([
            [100, 100]
        ]);
        this.triggerStart();
        this.triggerEnd();
        if (callback) {
            callback();
        }
    };

    Gestures.DoubleTap = function(callback) {
        var self = this;
        self.setTouches([
            [100, 100]
        ]);
        self.triggerStart();
        self.triggerEnd();

        setTimeout(function() {
            self.triggerStart();
            self.triggerEnd();

            if (callback) {
                callback();
            }
        }, 50);
    };

    Gestures.Hold = function(callback) {
        var self = this;
        this.setTouches([
            [100, 100]
        ]);
        this.triggerStart();

        setTimeout(function() {
            self.triggerEnd();
            if (callback) {
                callback();
            }
        }, 600);
    };

    Gestures.DragRight = function(callback) {
        var self = this;
        self.setTouches([
            [50, 50]
        ]);
        self.triggerStart();

        var moves = 0;
        var interval = setInterval(function() {
            if (moves == 10) {
                self.triggerEnd();
                clearInterval(interval);
                if (callback) {
                    callback();
                }
                return;
            }
            self.moveBy(6, 1);
            moves++;
        }, 30);
    };

    Gestures.SwipeRight = function(callback) {
        var self = this;
        self.setTouches([
            [100, 100]
        ]);
        self.triggerStart();

        var moves = 0;
        var interval = setInterval(function() {
            if (moves == 20) {
                self.triggerEnd();
                clearInterval(interval);
                if (callback) {
                    callback();
                }
                return;
            }
            self.moveBy(3 * moves, 1);
            moves++;
        }, 15);
    };

    Gestures.PinchOut = function(callback) {
        var self = this;
        self.setTouches([
            [150, 50],
            [50, 150]
        ]);
        self.triggerStart();

        var moves = 0;
        var interval = setInterval(function() {
            if (moves == 20) {
                self.triggerEnd();
                clearInterval(interval);
                if (callback) {
                    callback();
                }
                return;
            }
            self.moveBy([
                [1, -1],
                [-1, 1]
            ]);
            moves++;
        }, 30);
    };

    Gestures.PinchIn = function(callback) {
        var self = this;
        self.setTouches([
            [150, 50],
            [50, 150]
        ]);
        self.triggerStart();

        var moves = 0;
        var interval = setInterval(function() {
            if (moves == 20) {
                self.triggerEnd();
                clearInterval(interval);
                if (callback) {
                    callback();
                }
                return;
            }
            self.moveBy([
                [-1, 1],
                [1, -1]
            ]);
            moves++;
        }, 30);
    };

    Gestures.Rotate = function(callback) {
        var self = this;
        var touches = self.setTouches([
            [50, 50],
            [150, 150]
        ]);
        self.triggerStart();

        var center_x = 100;
        var center_y = 100;
        var rotation = 0;

        var interval = setInterval(function() {
            var rad = rotation * (Math.PI / 180);

            var new_pos = [];
            for (var t = 0; t < touches.length; t++) {
                var x = touches[t][0];
                var y = touches[t][1];

                new_pos.push([
                    center_x + (x - center_x) * Math.cos(rad) - (y - center_y) * Math.sin(rad),
                    center_y + (x - center_x) * Math.sin(rad) + (y - center_y) * Math.cos(rad)
                ]);
            }

            self.triggerMove(new_pos);
            rotation += 2;
        }, 20);

        setTimeout(function() {
            clearInterval(interval);
            self.triggerEnd();
            if (callback) {
                callback();
            }
        }, 2000);
    };

    FakeTouches.prototype.triggerGesture = function(name, callback) {
        FakeTouches.Gestures[name].call(this, callback);
    };

    FakeTouches.Gestures = Gestures;
    return FakeTouches.Gestures;
}));
