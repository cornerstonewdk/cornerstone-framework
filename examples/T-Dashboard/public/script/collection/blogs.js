define([
    'jquery',
    'underscore',
    'backbone',
    'sync',
    'model/blog'
], function ($, _, Backbone, Sync, Blog) {
    Backbone.sync = Sync.local;
    var Collection =  Backbone.Collection.extend({
        model: Blog
    });

    return new Collection();
});