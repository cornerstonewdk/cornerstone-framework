define(function (require) {
    var _ = require("underscore");
    var Backbone = require("backbone");
    var $ = require("jquery");
    var template = require("template!../../../tmpl/indexList");

    return Backbone.View.extend({
        el:"#contentsView",

        initialize:function () {
            this.isLoading = false;
            this.pageID = 1;
        },

        events:{
            'click #addItem':'getItem'
        },

        getItem:function () {
            var self = this;

            if (this.isLoading) {
                return false;
            }

            this.isLoading = true;

            var request = $.ajax({
                url:"data/sample.json",
                type:"get",
                dataType:"json"
            });

            request.done(function (json) {
                html = "<ul data-list-pageid='" + self.pageID + "'>";
                if (typeof json === "object" && json.items.length > 0) {
                    $(json.items).each(function (i) {
                        this.index = (i + 1);
                        html += (template(this));
                    });

                    html += "</ul>";

                    Widget.listView(self.$el.find("#listView"), "addItem", html);
                }
                html = "";
                self.pageID++;
                self.isLoading = false;
            });

            request.fail(function (jqXHR, textStatus) {
                console.log("Request failed: " + textStatus);
                self.isLoading = false;
            });
        },

        render:function () {
            var self = this;
            Widget.listView(self.$el.find("#listView"), {
               optimization:true
            });

            this.getItem();
        }
    });
});