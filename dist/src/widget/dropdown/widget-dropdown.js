/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","bootstrap"],b):a.Dropdown=b(a.$,a._,a.Backbone)}(window,function(a,b,c){return c&&c.View.extend({render:function(){return this.$el.data("toggle")||this.$el.attr("data-toggle","dropdown"),this.$el.dropdown(this.options),this}})});