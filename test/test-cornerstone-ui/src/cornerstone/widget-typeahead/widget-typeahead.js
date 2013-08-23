/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["backbone","underscore","jquery","typeahead"],function(d,e,f){return c(f,a,b),d.View.extend({render:function(){return this.$el.typeahead(this.options),this}})}):c(a.jQuery,a,b)}(window,document,function(a){a.fn.twitterTypeahead=a.fn.typeahead,a.fn.typeahead=function(b){return this.each(function(){var c=a(this);c.twitterTypeahead(b),c.on("typeahead:selected",function(a,b,d){c.trigger("selected.cs.typeahead",[b,d])})})}});