/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b){"function"==typeof define&&define.amd?define(["jquery","underscore","backbone","typeahead"],b):a.Typeahead=b(a.$,a._,a.Backbone)}(window,function(a,b,c){return a.fn.twitterTypeahead=a.fn.typeahead,a.fn.typeahead=function(b){return this.each(function(){var c=a(this);c.twitterTypeahead(b),c.on("typeahead:selected",function(a,b,d){c.trigger("selected.cs.typeahead",[b,d])})})},c&&c.View.extend({render:function(a){return"string"==typeof a?this.$el.typeahead(a):this.$el.typeahead(this.options),this}})});