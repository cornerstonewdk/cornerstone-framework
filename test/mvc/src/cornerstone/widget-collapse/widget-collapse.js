/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","bootstrap"],b):a.Collapse=b(a.$,a._,a.Backbone)}(window,function(a,b,c){var d="ontouchstart"in window,e=a.fn.collapse.Constructor;return d&&(e.prototype.toggle=function(){this.$element[0].style.WebkitTransition="none",this[this.$element.hasClass("in")?"hide":"show"]()},e.prototype.transition=function(a,b,c){var d=this,e=function(){"show"==b.type&&d.reset(),d.transitioning=0,d.$element.trigger(c)};this.$element.trigger(b),b.isDefaultPrevented()||(this.transitioning=1,this.$element[a]("in"),e())}),a.fn.collapse.Constructor=e,c?c.View.extend({render:function(a){return"string"==typeof a?this.$el.collapse(a):this.$el.collapse(this.options),this}}):e});