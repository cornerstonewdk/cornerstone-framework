/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","bootstrap"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.popover(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(a){this.Popover=function(){function b(){}var b;b=a.fn.popover.Constructor,a.fn.popover.Constructor=b,a(function(){a("[data-toggle=popover]").each(function(){a(this).popover()})})}()});