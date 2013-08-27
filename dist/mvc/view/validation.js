/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["backbone","jquery","bootstrap"],function(e,t){return e.View.extend({initialize:function(){this.$el.tooltip({trigger:"manual",animation:!1}),this.$(":input").tooltip({trigger:"manual",animation:!1}),this.reset()},reset:function(){this.$(".control-group").removeClass("error"),this.$(".control-group").find(".help-inline,.help-block").text("").hide(),this.$(":input").tooltip("hide").removeAttr("data-invalid")},success:function(){this.reset()},fail:function(e){var t;e.attribute&&(t=this.$(":input[name="+e.attribute+"]:first")),t=t||this.$(":input:first");var n=t.parents(".control-group");n&&n.addClass("error");var r=n.find(".help-inline,.help-block");r&&r.length?r.text(e.message||e).show():(t.attr({"data-original-title":e.message||e,"data-invalid":!0}),t.tooltip("show")),t.focus()}})})