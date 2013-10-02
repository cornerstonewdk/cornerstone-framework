/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","bootstrap"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.collapse(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(a,b){var c="ontouchstart"in b,d=a.fn.collapse.Constructor;c&&(d.prototype.toggle=function(){this.$element[0].style.WebkitTransition="none",this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.transition=function(a,b,c){var d=this,e=function(){"show"==b.type&&d.reset(),d.transitioning=0,d.$element.trigger(c)};this.$element.trigger(b),b.isDefaultPrevented()||(this.transitioning=1,this.$element[a]("in"),e())}),a.fn.collapse.Constructor=d});