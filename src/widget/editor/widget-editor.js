/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-editor.js
 *  Description: 에디터는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, wysihtml5, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD Hybrid 포맷
		define([ "backbone", "underscore", "jquery"], function (Backbone, _, $) {
			factory($, root, doc, wysihtml5);
			return Backbone.view.extend( {
				render: function () {
					this.$el.featuredEditor( this.options );
					return this;
				}
			} );
		});
	} else {
		// Browser globals
		factory(root.jQuery, root, doc, wysihtml5);
	}
}(window, document, window.wysihtml5, function ($, window, document, wysi) {

	"use strict";

	var tpl = {
		"font-styles": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li class='dropdown'>" +
				"<a class='btn dropdown-toggle" + size + "' data-toggle='dropdown' href='#'>" +
				"<i class='icon-font'></i>&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>&nbsp;<b class='caret'></b>" +
				"</a>" +
				"<ul class='dropdown-menu'>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div' tabindex='-1'>" + locale.font_styles.normal + "</a></li>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1' tabindex='-1'>" + locale.font_styles.h1 + "</a></li>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2' tabindex='-1'>" + locale.font_styles.h2 + "</a></li>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3' tabindex='-1'>" + locale.font_styles.h3 + "</a></li>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h4'>" + locale.font_styles.h4 + "</a></li>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h5'>" + locale.font_styles.h5 + "</a></li>" +
				"<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h6'>" + locale.font_styles.h6 + "</a></li>" +
				"</ul>" +
				"</li>";
		},

		"emphasis": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li>" +
				"<div class='btn-group'>" +
				"<a class='btn" + size + "' data-wysihtml5-command='bold' title='CTRL+B' tabindex='-1'>" + locale.emphasis.bold + "</a>" +
				"<a class='btn" + size + "' data-wysihtml5-command='italic' title='CTRL+I' tabindex='-1'>" + locale.emphasis.italic + "</a>" +
				"<a class='btn" + size + "' data-wysihtml5-command='underline' title='CTRL+U' tabindex='-1'>" + locale.emphasis.underline + "</a>" +
				"</div>" +
				"</li>";
		},

		"lists": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li>" +
				"<div class='btn-group'>" +
				"<a class='btn" + size + "' data-wysihtml5-command='insertUnorderedList' title='" + locale.lists.unordered + "' tabindex='-1'><i class='icon-list'></i></a>" +
				"<a class='btn" + size + "' data-wysihtml5-command='insertOrderedList' title='" + locale.lists.ordered + "' tabindex='-1'><i class='icon-th-list'></i></a>" +
				"<a class='btn" + size + "' data-wysihtml5-command='Outdent' title='" + locale.lists.outdent + "' tabindex='-1'><i class='icon-indent-right'></i></a>" +
				"<a class='btn" + size + "' data-wysihtml5-command='Indent' title='" + locale.lists.indent + "' tabindex='-1'><i class='icon-indent-left'></i></a>" +
				"</div>" +
				"</li>";
		},

		"link": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li>" +
				"<div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>" +
				"<div class='modal-header'>" +
				"<a class='close' data-dismiss='modal'>&times;</a>" +
				"<h3>" + locale.link.insert + "</h3>" +
				"</div>" +
				"<div class='modal-body'>" +
				"<input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>" +
				"<label class='checkbox'> <input type='checkbox' class='bootstrap-wysihtml5-insert-link-target' checked>" + locale.link.target + "</label>" +
				"</div>" +
				"<div class='modal-footer'>" +
				"<a href='#' class='btn' data-dismiss='modal'>" + locale.link.cancel + "</a>" +
				"<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.link.insert + "</a>" +
				"</div>" +
				"</div>" +
				"<a class='btn" + size + "' data-wysihtml5-command='createLink' title='" + locale.link.insert + "' tabindex='-1'><i class='icon-share'></i></a>" +
				"</li>";
		},

		"image": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li>" +
				"<div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'>" +
				"<div class='modal-header'>" +
				"<a class='close' data-dismiss='modal'>&times;</a>" +
				"<h3>" + locale.image.insert + "</h3>" +
				"</div>" +
				"<div class='modal-body'>" +
				"<input value='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge'>" +
				"</div>" +
				"<div class='modal-footer'>" +
				"<a href='#' class='btn' data-dismiss='modal'>" + locale.image.cancel + "</a>" +
				"<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.image.insert + "</a>" +
				"</div>" +
				"</div>" +
				"<a class='btn" + size + "' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "' tabindex='-1'><i class='icon-picture'></i></a>" +
				"</li>";
		},

		"html": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li>" +
				"<div class='btn-group'>" +
				"<a class='btn" + size + "' data-wysihtml5-action='change_view' title='" + locale.html.edit + "' tabindex='-1'><i class='icon-pencil'></i></a>" +
				"</div>" +
				"</li>";
		},

		"color": function (locale, options) {
			var size = (options && options.size) ? ' btn-' + options.size : '';
			return "<li class='dropdown'>" +
				"<a class='btn dropdown-toggle" + size + "' data-toggle='dropdown' href='#' tabindex='-1'>" +
				"<span class='current-color'>" + locale.colours.black + "</span>&nbsp;<b class='caret'></b>" +
				"</a>" +
				"<ul class='dropdown-menu'>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='black'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='black'>" + locale.colours.black + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='silver'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='silver'>" + locale.colours.silver + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='gray'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='gray'>" + locale.colours.gray + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='maroon'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='maroon'>" + locale.colours.maroon + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='red'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='red'>" + locale.colours.red + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='purple'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='purple'>" + locale.colours.purple + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='green'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='green'>" + locale.colours.green + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='olive'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='olive'>" + locale.colours.olive + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='navy'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='navy'>" + locale.colours.navy + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='blue'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='blue'>" + locale.colours.blue + "</a></li>" +
				"<li><div class='wysihtml5-colors' data-wysihtml5-command-value='orange'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='orange'>" + locale.colours.orange + "</a></li>" +
				"</ul>" +
				"</li>";
		}
	};

	var templates = function (key, locale, options) {
		return tpl[key](locale, options);
	};


	var Wysihtml5 = function (el, options) {
		this.el = el;
		var toolbarOpts = options || defaultOptions;
		for (var t in toolbarOpts.customTemplates) {
			tpl[t] = toolbarOpts.customTemplates[t];
		}
		this.toolbar = this.createToolbar(el, toolbarOpts);
		this.editor = this.createEditor(options);

		window.editor = this.editor;

		$('iframe.wysihtml5-sandbox').each(function (i, el) {
			$(el.contentWindow).off('focus.wysihtml5').on({
				'focus.wysihtml5': function () {
					$('li.dropdown').removeClass('open');
				}
			});
		});
	};

	Wysihtml5.prototype = {

		constructor: Wysihtml5,

		createEditor: function (options) {
			options = options || {};

			// Add the toolbar to a clone of the options object so multiple instances
			// of the WYISYWG don't break because "toolbar" is already defined
			options = $.extend(true, {}, options);
			options.toolbar = this.toolbar[0];

			var editor = new wysi.Editor(this.el[0], options);

			if (options && options.events) {
				for (var eventName in options.events) {
					editor.on(eventName, options.events[eventName]);
				}
			}
			return editor;
		},

		createToolbar: function (el, options) {
			var self = this;
			var toolbar = $("<ul/>", {
				'class': "wysihtml5-toolbar",
				'style': "display:none"
			});
			var culture = options.locale || defaultOptions.locale || "en";
			for (var key in defaultOptions) {
				var value = false;

				if (options[key] !== undefined) {
					if (options[key] === true) {
						value = true;
					}
				} else {
					value = defaultOptions[key];
				}

				if (value === true) {
					toolbar.append(templates(key, locale[culture], options));

					if (key === "html") {
						this.initHtml(toolbar);
					}

					if (key === "link") {
						this.initInsertLink(toolbar);
					}

					if (key === "image") {
						this.initInsertImage(toolbar);
					}
				}
			}

			if (options.toolbar) {
				for (key in options.toolbar) {
					toolbar.append(options.toolbar[key]);
				}
			}

			toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function (e) {
				var target = e.target || e.srcElement;
				var el = $(target);
				self.toolbar.find('.current-font').text(el.html());
			});

			toolbar.find("a[data-wysihtml5-command='foreColor']").click(function (e) {
				var target = e.target || e.srcElement;
				var el = $(target);
				self.toolbar.find('.current-color').text(el.html());
			});

			this.el.before(toolbar);

			return toolbar;
		},

		initHtml: function (toolbar) {
			var changeViewSelector = "a[data-wysihtml5-action='change_view']";
			toolbar.find(changeViewSelector).click(function (e) {
				toolbar.find('a.btn').not(changeViewSelector).toggleClass('disabled');
			});
		},

		initInsertImage: function (toolbar) {
			var self = this;
			var insertImageModal = toolbar.find('.bootstrap-wysihtml5-insert-image-modal');
			var urlInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-url');
			var insertButton = insertImageModal.find('a.btn-primary');
			var initialValue = urlInput.val();
			var caretBookmark;

			var insertImage = function () {
				var url = urlInput.val();
				urlInput.val(initialValue);
				self.editor.currentView.element.focus();
				if (caretBookmark) {
					self.editor.composer.selection.setBookmark(caretBookmark);
					caretBookmark = null;
				}
				self.editor.composer.commands.exec("insertImage", url);
			};

			urlInput.keypress(function (e) {
				if (e.which == 13) {
					insertImage();
					insertImageModal.modal('hide');
				}
			});

			insertButton.click(insertImage);

			insertImageModal.on('shown', function () {
				urlInput.focus();
			});

			insertImageModal.on('hide', function () {
				self.editor.currentView.element.focus();
			});

			toolbar.find('a[data-wysihtml5-command=insertImage]').click(function () {
				var activeButton = $(this).hasClass("wysihtml5-command-active");

				if (!activeButton) {
					self.editor.currentView.element.focus(false);
					caretBookmark = self.editor.composer.selection.getBookmark();
					insertImageModal.appendTo('body').modal('show');
					insertImageModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function (e) {
						e.stopPropagation();
					});
					return false;
				}
				else {
					return true;
				}
			});
		},

		initInsertLink: function (toolbar) {
			var self = this;
			var insertLinkModal = toolbar.find('.bootstrap-wysihtml5-insert-link-modal');
			var urlInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-url');
			var targetInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-target');
			var insertButton = insertLinkModal.find('a.btn-primary');
			var initialValue = urlInput.val();
			var caretBookmark;

			var insertLink = function () {
				var url = urlInput.val();
				urlInput.val(initialValue);
				self.editor.currentView.element.focus();
				if (caretBookmark) {
					self.editor.composer.selection.setBookmark(caretBookmark);
					caretBookmark = null;
				}

				var newWindow = targetInput.prop("checked");
				self.editor.composer.commands.exec("createLink", {
					'href': url,
					'target': (newWindow ? '_blank' : '_self'),
					'rel': (newWindow ? 'nofollow' : '')
				});
			};
			var pressedEnter = false;

			urlInput.keypress(function (e) {
				if (e.which == 13) {
					insertLink();
					insertLinkModal.modal('hide');
				}
			});

			insertButton.click(insertLink);

			insertLinkModal.on('shown', function () {
				urlInput.focus();
			});

			insertLinkModal.on('hide', function () {
				self.editor.currentView.element.focus();
			});

			toolbar.find('a[data-wysihtml5-command=createLink]').click(function () {
				var activeButton = $(this).hasClass("wysihtml5-command-active");

				if (!activeButton) {
					self.editor.currentView.element.focus(false);
					caretBookmark = self.editor.composer.selection.getBookmark();
					insertLinkModal.appendTo('body').modal('show');
					insertLinkModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function (e) {
						e.stopPropagation();
					});
					return false;
				}
				else {
					return true;
				}
			});
		}
	};

	// these define our public api
	var methods = {
		resetDefaults: function () {
			$.fn.wysihtml5.defaultOptions = $.extend(true, {}, $.fn.wysihtml5.defaultOptionsCache);
		},
		bypassDefaults: function (options) {
			return this.each(function () {
				var $this = $(this);
				$this.data('wysihtml5', new Wysihtml5($this, options));
			});
		},
		shallowExtend: function (options) {
			var settings = $.extend({}, $.fn.wysihtml5.defaultOptions, options || {}, $(this).data());
			var that = this;
			return methods.bypassDefaults.apply(that, [settings]);
		},
		deepExtend: function (options) {
			var settings = $.extend(true, {}, $.fn.wysihtml5.defaultOptions, options || {});
			var that = this;
			return methods.bypassDefaults.apply(that, [settings]);
		},
		init: function (options) {
			var that = this;
			return methods.shallowExtend.apply(that, [options]);
		}
	};

	$.fn.wysihtml5 = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.wysihtml5');
		}
	};

	$.fn.wysihtml5.Constructor = Wysihtml5;

	var defaultOptions = $.fn.wysihtml5.defaultOptions = {
		"font-styles": true,
		"color": false,
		"emphasis": true,
		"lists": true,
		"html": false,
		"link": true,
		"image": true,
		events: {},
		parserRules: {
			classes: {
				"wysiwyg-color-silver": 1,
				"wysiwyg-color-gray": 1,
				"wysiwyg-color-white": 1,
				"wysiwyg-color-maroon": 1,
				"wysiwyg-color-red": 1,
				"wysiwyg-color-purple": 1,
				"wysiwyg-color-fuchsia": 1,
				"wysiwyg-color-green": 1,
				"wysiwyg-color-lime": 1,
				"wysiwyg-color-olive": 1,
				"wysiwyg-color-yellow": 1,
				"wysiwyg-color-navy": 1,
				"wysiwyg-color-blue": 1,
				"wysiwyg-color-teal": 1,
				"wysiwyg-color-aqua": 1,
				"wysiwyg-color-orange": 1
			},
			tags: {
				"b": {},
				"i": {},
				"br": {},
				"ol": {},
				"ul": {},
				"li": {},
				"h1": {},
				"h2": {},
				"h3": {},
				"h4": {},
				"h5": {},
				"h6": {},
				"blockquote": {},
				"u": 1,
				"img": {
					"check_attributes": {
						"width": "numbers",
						"alt": "alt",
						"src": "url",
						"height": "numbers"
					}
				},
				"a": {
					check_attributes: {
						'href': "url", // important to avoid XSS
						'target': 'alt',
						'rel': 'alt'
					}
				},
				"span": 1,
				"div": 1,
				// to allow save and edit files with code tag hacks
				"code": 1,
				"pre": 1
			}
		},
//		stylesheets: ["./lib/css/wysiwyg-color.css"], // (path_to_project/lib/css/wysiwyg-color.css)
		locale: "en"
	};

	if (typeof $.fn.wysihtml5.defaultOptionsCache === 'undefined') {
		$.fn.wysihtml5.defaultOptionsCache = $.extend(true, {}, $.fn.wysihtml5.defaultOptions);
	}

	var locale = $.fn.wysihtml5.locale = {
		en: {
			font_styles: {
				normal: "Normal text",
				h1: "Heading 1",
				h2: "Heading 2",
				h3: "Heading 3",
				h4: "Heading 4",
				h5: "Heading 5",
				h6: "Heading 6"
			},
			emphasis: {
				bold: "Bold",
				italic: "Italic",
				underline: "Underline"
			},
			lists: {
				unordered: "Unordered list",
				ordered: "Ordered list",
				outdent: "Outdent",
				indent: "Indent"
			},
			link: {
				insert: "Insert link",
				cancel: "Cancel",
				target: "Open link in new window"
			},
			image: {
				insert: "Insert image",
				cancel: "Cancel"
			},
			html: {
				edit: "Edit HTML"
			},
			colours: {
				black: "Black",
				silver: "Silver",
				gray: "Grey",
				maroon: "Maroon",
				red: "Red",
				purple: "Purple",
				green: "Green",
				olive: "Olive",
				navy: "Navy",
				blue: "Blue",
				orange: "Orange"
			}
		}
	};


	var pluginName = "featuredEditor",
		defaultOptions = {
			"font-styles": true,
			"color": false,
			"emphasis": true,
			"lists": true,
			"html": false,
			"link": true,
			"image": true,
			events: {
				"load": function() {
	                $( this.textareaElement ).trigger( $.Event('load.cs.editor') );
	            },
	            "blur": function() {
	                $( this.textareaElement ).trigger( $.Event('blur.cs.editor') );
	            }
			},
			parserRules: {
				classes: {
					// (path_to_project/lib/css/wysiwyg-color.css)
					"wysiwyg-color-silver": 1,
					"wysiwyg-color-gray": 1,
					"wysiwyg-color-white": 1,
					"wysiwyg-color-maroon": 1,
					"wysiwyg-color-red": 1,
					"wysiwyg-color-purple": 1,
					"wysiwyg-color-fuchsia": 1,
					"wysiwyg-color-green": 1,
					"wysiwyg-color-lime": 1,
					"wysiwyg-color-olive": 1,
					"wysiwyg-color-yellow": 1,
					"wysiwyg-color-navy": 1,
					"wysiwyg-color-blue": 1,
					"wysiwyg-color-teal": 1,
					"wysiwyg-color-aqua": 1,
					"wysiwyg-color-orange": 1,
				},
				tags: {
					"b": {},
					"i": {},
					"br": {},
					"ol": {},
					"ul": {},
					"li": {},
					"h1": {},
					"h2": {},
					"h3": {},
					"blockquote": {},
					"u": 1,
					"img": {
						"check_attributes": {
							"width": "numbers",
							"alt": "alt",
							"src": "url",
							"height": "numbers"
						}
					},
					"a": {
						set_attributes: {
							target: "_blank",
							rel: "nofollow"
						},
						check_attributes: {
							href: "url" // important to avoid XSS
						}
					},
					"span": 1,
					"div": 1
				}
			},
//			stylesheets: ["./dist/ui/widget-editor.css"], // (path_to_project/lib/css/wysiwyg-color.css)
			locale: "en"
		};

	var Plugin = function (element, options) {
		var self = this;
		this.options = options;
		this.$el = $(element);

		this.formCheck();

		options = $.extend(true, defaultOptions, options);
		this.iscroll = new iScroll(this.$el.attr("id"), options);

	};
 
	Plugin.prototype.refresh = function () {
		this.iscroll.refresh();
	};

	// 폼 엘리먼트인 경우 드래그로 입력박스 터치불가한 문제를 해결
	Plugin.prototype.formCheck = function () {

		defaultOptions.onBeforeScrollStart = onBeforeScrollStart;
	};

	// 스크롤뷰 플러그인 랩핑 및 기본값 설정
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			options = $.extend(true, defaultOptions, options);
			$(this).wysihtml5(options);
		});
	};

	/**
	 * DATA API (HTML5 Data Attribute)
	 */
	$("[data-featured=scrollview]").each(function (i) {
		$(this)[pluginName]();
	});
}));