/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","bootstrap"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.alert(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(a,b,c){var d='[data-dismiss="alert"]',e=a.fn.alert.Constructor;e.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").hide()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())},a.fn.alert.Constructor=e,a(c).off("click.bs.alert.data-api").on("click.bs.alert.data-api",d,e.prototype.close)});