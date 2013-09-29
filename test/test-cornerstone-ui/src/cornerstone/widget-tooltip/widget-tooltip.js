/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","bootstrap"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.tooltip(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(a){this.Tooltip=function(){function b(){}var b;b=a.fn.tooltip.Constructor,a.fn.tooltip.Constructor=b,a(function(){a("[data-toggle=tooltip]").each(function(){a(this).tooltip()})})}()});