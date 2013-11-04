/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","bootstrap"],b):a.Button=b(a.$,a._,a.Backbone)}(window,function(a,b,c){var d=a.fn.button.Constructor;return d.prototype.toggle=function(){var b,c=this.$element,d=c.closest('[data-toggle="buttons"]');if(d.length){var e=d.find(".active"),f=c.find("input").prop("checked",!c.hasClass("active"));"radio"===f.prop("type")?(e.length&&d.trigger("toggleOff.cs.button",e),d.find(".active").removeClass("active"),c.toggleClass("active"),d.trigger("toggleOn.cs.button",c)):(b=c.hasClass("active"),c.toggleClass("active"),b?d.trigger("toggleOff.cs.button",c):d.trigger("toggleOn.cs.button",c))}else b=c.hasClass("active"),c.toggleClass("active"),b?c.trigger(a.Event("toggleOff.cs.button")):c.trigger(a.Event("toggleOn.cs.button"))},a.fn.button.Constructor=d,c?c.View.extend({render:function(a){return"string"==typeof a?this.$el.button(a):this.$el.button(this.options),this}}):d});