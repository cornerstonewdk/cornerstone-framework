/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-media.js
 *  Description: 미디어 피처드는 반응형웹에 맞는 화면을 보여주고, 동영상의 비율을 설정할 수 있는 옵션등이 추가적으로 들어갔으며, DATA-API를 사용해서
 *  스크립트 사용없이 마크업 속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([ "backbone", "underscore", "jquery", "style!" + Cornerstone.PATH + "ui/widget-media"], function (Backbone, _, $) {
            factory($, root, doc);
            return Backbone.View.extend({
                tagName:'div',

                className:'featured-media',

                model:new Backbone.Model(),

                initialize:function () {
                    _.bindAll(this, "render");
                    this.model.on("change", this.render);
                },

                render:function () {
                    var data = [];
                    $.each(this.model.toJSON(), function (i, obj) {
                        data.push(obj);
                    });

                    this.$el.featuredMedia(this.options);

                    return this;
                }
            });
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document, undefined) {
    var mePlayer;
    var pluginName = "featuredMedia";

    $.fn[pluginName] = function (options) {
        // 기본 화면 비율값을 옵션으로 정의한다.
        var defaultOptions = {
            rate:"16:9",
            flashName: typeof Cornerstone !== "undefined" ? Cornerstone.PATH + "ui/flashmediaelement.swf" : undefined,
            silverlightName: typeof Cornerstone !== "undefined" ? Cornerstone.PATH + "ui/silverlightmediaelement.xap" : undefined
        };
        options = $.extend(true, defaultOptions, options);
        return this.each(function () {
            // 4:3, 16:9, 16:10 비율 옵션 추가
            mejs.MediaElementPlayer.prototype.setPlayerSize = function (width, height) {
                var t = this;

                if (typeof width != 'undefined')
                    t.width = width;

                if (typeof height != 'undefined')
                    t.height = height;

                // detect 100% mode
                if (t.height.toString().indexOf('%') > 0 || t.$node.css('max-width') === '100%') {

                    // do we have the native dimensions yet?
                    var nativeWidth = (t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth,
                        nativeHeight = (t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight;

                    if (navigator.userAgent.match("Android")) {
                        nativeWidth = t.options.defaultVideoWidth;
                        nativeHeight = t.options.defaultVideoHeight;
                    }

                    // 옵션으로 화면 비율 값을 받아서 실제 보여줄 영상의 비율을 설정한다.
                    if (typeof t.options.rate === "string" && t.options.rate.match(":") && t.options.rate.split(":").length > 1) {
                        nativeWidth = t.options.rate.split(":")[0];
                        nativeHeight = t.options.rate.split(":")[1];
                    }

                    var parentWidth = t.container.parent().width(),
                        newHeight = parseInt(parentWidth * nativeHeight / nativeWidth, 10);

                    if (t.container.parent()[0].tagName.toLowerCase() === 'body') { // && t.container.siblings().count == 0) {
                        parentWidth = $(window).width();
                        newHeight = $(window).height();
                    }

                    if (newHeight != 0) {
                        // set outer container size
                        t.container
                            .width(parentWidth)
                            .height(newHeight);

                        // set native <video>
                        t.$media
                            .width('100%')
                            .height('100%');

                        // set shims
                        t.container.find('object, embed, iframe')
                            .width('100%')
                            .height('100%');

                        // if shim is ready, send the size to the embeded plugin
                        if (t.isVideo) {
                            if (t.media.setVideoSize) {
                                t.media.setVideoSize(parentWidth, newHeight);
                            }
                        }

                        // set the layers
                        t.layers.children('.mejs-layer')
                            .width('100%')
                            .height('100%');
                    }


                } else {

                    t.container
                        .width(t.width)
                        .height(t.height);

                    t.layers.children('.mejs-layer')
                        .width(t.width)
                        .height(t.height);

                }
            };

            mejs.PluginMediaElement.prototype.setVideoSize = function (width, height) {

                //if (this.pluginType == 'flash' || this.pluginType == 'silverlight') {
                if (this.pluginElement != null && this.pluginElement.style) {
                    this.pluginElement.style.width = width + 'px';
                    this.pluginElement.style.height = height + 'px';
                }
                if (this.pluginApi != null && this.pluginApi.setVideoSize) {
                    this.pluginApi.setVideoSize(width, height);
                }
                //}
            };

            mejs.Utility.encodeUrl = function (url) {
                return url === "100%" ? false : encodeURIComponent(url);
            };
            mePlayer = new mejs.MediaElementPlayer(this, options);
        });
    };


    $(function () {
        /**
         * DATA API (HTML5 Data Attribute)
         */
        $("[data-featured=media]").each(function () {
            var self = this;
            $(this)[pluginName]({
                alwaysShowControls:true,
                rate:$(self).data("mediaRate")
            });
        });
    });
}));