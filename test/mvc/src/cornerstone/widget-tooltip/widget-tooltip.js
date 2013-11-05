/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","bootstrap"],b):a.Tooltip=b(a.$,a._,a.Backbone)}(window,function(a,b,c){var d=a.fn.tooltip.Constructor;return a.fn.tooltip.Constructor=d,a(function(){a("[data-toggle=tooltip]").each(function(){a(this).tooltip()})}),c&&c.View.extend({render:function(a){return"string"==typeof a?this.$el.tooltip(a):this.$el.tooltip(this.options),this}})});