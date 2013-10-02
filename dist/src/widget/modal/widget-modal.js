/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","bootstrap"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.modal(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(){});