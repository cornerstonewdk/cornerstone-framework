/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["backbone","jquery","bootstrap"],function(a){return a.View.extend({initialize:function(){this.$el.tooltip({trigger:"manual",animation:!1}),this.$(":input").tooltip({trigger:"manual",animation:!1}),this.reset()},reset:function(){this.$(".control-group").removeClass("error"),this.$(".control-group").find(".help-inline,.help-block").text("").hide(),this.$(":input").tooltip("hide").removeAttr("data-invalid")},success:function(){this.reset()},fail:function(a){var b;a.attribute&&(b=this.$(":input[name="+a.attribute+"]:first")),b=b||this.$(":input:first");var c=b.parents(".control-group");c&&c.addClass("error");var d=c.find(".help-inline,.help-block");d&&d.length?d.text(a.message||a).show():(b.attr({"data-original-title":a.message||a,"data-invalid":!0}),b.tooltip("show")),b.focus()}})});