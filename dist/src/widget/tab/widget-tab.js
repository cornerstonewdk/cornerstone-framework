/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","bootstrap"],b):a.Tab=b(a.$,a._,a.Backbone)}(window,function(a,b,c){return c&&c.View.extend({render:function(a){return"string"==typeof a?this.$el.tab(a):this.$el.tab(this.options),this}})});