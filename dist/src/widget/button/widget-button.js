/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","bootstrap"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.button(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(a){var b=function(){};b=a.fn.button.Constructor,b.prototype.toggle=function(){var b=this.$element,c=b.closest('[data-toggle="buttons"]');if(c.length){var d=c.find(".active"),e=b.find("input").prop("checked",!b.hasClass("active"));if("radio"===e.prop("type"))d.length&&c.trigger("toggleOff.cs.button",d),c.find(".active").removeClass("active"),b.toggleClass("active"),c.trigger("toggleOn.cs.button",b);else{var f=b.hasClass("active");b.toggleClass("active"),f?c.trigger("toggleOff.cs.button",b):c.trigger("toggleOn.cs.button",b)}}else{var f=b.hasClass("active");b.toggleClass("active"),f?b.trigger(a.Event("toggleOff.cs.button")):b.trigger(a.Event("toggleOn.cs.button"))}},a.fn.button.Constructor=b});