define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
        defaults: function () {
            return {
                "title": "SK텔레콤과 함께하는 특별한 하루 - 고나의 T나는 상담실",
                "link": "http://blog.sktworld.co.kr/3712"
            };
        }
    });
});