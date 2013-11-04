/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","bootstrap"],b):a.Popover=b(a.$,a._,a.Backbone)}(window,function(a,b,c){var d=a.fn.popover.Constructor;return a.fn.popover.Constructor=d,a(function(){a("[data-toggle=popover]").each(function(){a(this).popover()})}),c?c.View.extend({render:function(a){return"string"==typeof a?this.$el.popover(a):this.$el.popover(this.options),this}}):d});