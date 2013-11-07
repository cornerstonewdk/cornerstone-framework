/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-editor.js
 *  Description: 에디터는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */
;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap" ], factory);
    else
        root.Editor = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    var readFileIntoDataUrl = function (fileInfo) {
        var loader = $.Deferred(),
        fReader = new FileReader();
        fReader.onload = function (e) {
            loader.resolve(e.target.result);
        };
        fReader.onerror = loader.reject;
        fReader.onprogress = loader.notify;
        fReader.readAsDataURL(fileInfo);
        return loader.promise();
    };
    $.fn.cleanHtml = function () {
        var html = $(this).html();
        return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
    };
    $.fn.wysiwyg = function (userOptions) {
        var editor = this,
        selectedRange,
        options,
        toolbarBtnSelector,
        updateToolbar = function () {
            if (options.activeToolbarClass) {
                $(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
                    var command = $(this).data(options.commandRole);
                    if (document.queryCommandState(command)) {
                        $(this).addClass(options.activeToolbarClass);
                    } else {
                        $(this).removeClass(options.activeToolbarClass);
                    }
                });
            }
        },
        execCommand = function (commandWithArgs, valueArg) {
            var commandArr = commandWithArgs.split(' '),
            command = commandArr.shift(),
            args = commandArr.join(' ') + (valueArg || '');
            document.execCommand(command, 0, args);
            updateToolbar();
        },
        bindHotkeys = function (hotKeys) {
            $.each(hotKeys, function (hotkey, command) {
                editor.keydown(hotkey,function (e) {
                    if (editor.attr('contenteditable') && editor.is(':visible')) {
                        e.preventDefault();
                        e.stopPropagation();
                        execCommand(command);
                    }
                }).keyup(hotkey, function (e) {
                    if (editor.attr('contenteditable') && editor.is(':visible')) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            });
        },
        getCurrentRange = function () {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        },
        saveSelection = function () {
            selectedRange = getCurrentRange();
        },
        restoreSelection = function () {
            var selection = window.getSelection();
            if (selectedRange) {
                try {
                    selection.removeAllRanges();
                } catch (ex) {
                    document.body.createTextRange().select();
                    document.selection.empty();
                }

                selection.addRange(selectedRange);
            }
        },
        insertFiles = function (files) {
            editor.focus();
            $.each(files, function (idx, fileInfo) {
                if (/^image\//.test(fileInfo.type)) {
                    $.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
                        execCommand('insertimage', dataUrl);
                    }).fail(function (e) {
                        options.fileUploadError("file-reader", e);
                    });
                } else {
                    options.fileUploadError("unsupported-file-type", fileInfo.type);
                }
            });
        },
        markSelection = function (input, color) {
            restoreSelection();
            if (document.queryCommandSupported('hiliteColor')) {
                document.execCommand('hiliteColor', 0, color || 'transparent');
            }
            saveSelection();
            input.data(options.selectionMarker, color);
        },
        bindToolbar = function (toolbar, options) {
            toolbar.find(toolbarBtnSelector).click(function () {
                restoreSelection();
                editor.focus();
                execCommand($(this).data(options.commandRole));
                saveSelection();
            });
            toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

            toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change',function () {
                var newValue = this.value;
                /* ugly but prevents fake double-calls due to selection restoration */
                this.value = '';
                restoreSelection();
                if (newValue) {
                    editor.focus();
                    execCommand($(this).data(options.commandRole), newValue);
                }
                saveSelection();
            }).on('focus',function () {
                var input = $(this);
                if (!input.data(options.selectionMarker)) {
                    markSelection(input, options.selectionColor);
                    input.focus();
                }
            }).on('blur', function () {
                var input = $(this);
                if (input.data(options.selectionMarker)) {
                    markSelection(input, false);
                }
            });
            toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
                restoreSelection();
                if (this.type === 'file' && this.files && this.files.length > 0) {
                    insertFiles(this.files);
                }
                saveSelection();
                this.value = '';
            });
        },
        initFileDrops = function () {
            editor.on('dragenter dragover', false)
            .on('drop', function (e) {
                var dataTransfer = e.originalEvent.dataTransfer;
                e.stopPropagation();
                e.preventDefault();
                if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
                    insertFiles(dataTransfer.files);
                }
            });
        };
        options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
        toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
        bindHotkeys(options.hotKeys);
        if (options.dragAndDropImages) {
            initFileDrops();
        }
        bindToolbar($(options.toolbarSelector), options);
        editor.attr('contenteditable', true)
        .on('mouseup keyup mouseout', function () {
            saveSelection();
            updateToolbar();
        });
        $(window).bind('touchend', function (e) {
            var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
            currentRange = getCurrentRange(),
            clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
            if (!clear || isInside) {
                saveSelection();
                updateToolbar();
            }
        });
        return this;
    };
    $.fn.wysiwyg.defaults = {
        hotKeys: {
            'ctrl+b meta+b': 'bold',
            'ctrl+i meta+i': 'italic',
            'ctrl+u meta+u': 'underline',
            'ctrl+z meta+z': 'undo',
            'ctrl+y meta+y meta+shift+z': 'redo',
            'ctrl+l meta+l': 'justifyleft',
            'ctrl+r meta+r': 'justifyright',
            'ctrl+e meta+e': 'justifycenter',
            'ctrl+j meta+j': 'justifyfull',
            'shift+tab': 'outdent',
            'tab': 'indent'
        },
        toolbarSelector: '[data-role=editor-toolbar]',
        commandRole: 'edit',
        activeToolbarClass: 'btn-info',
        selectionMarker: 'edit-focus-marker',
        selectionColor: 'darkgrey',
        dragAndDropImages: true
    };

    // 스크롤뷰 플러그인 랩핑 및 기본값 설정
    $.fn.featuredEditor = function (options) {
        return this.each(function () {
            var $this = $(this);
            var $parent = $this.closest(".widget-editor");
            var initToolbarBootstrapBindings = function () {
                var fonts = ['Serif', 'Arial', 'Courier', 'Courier New', 'Helvetica', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times'],
                fontTarget = $parent.find('[title=Font]').siblings('.dropdown-menu');
                $.each(fonts, function (idx, fontName) {
                    fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
                });
                $parent.find('a[title]').tooltip({container: 'body'});
                $parent.find('.dropdown-menu input').click(function () {
                    return false;
                })
                .change(function () {
                    $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
                })
                .keydown('esc', function () {
                    this.value = '';
                    $(this).change();
                });

                $parent.find('[data-role=magic-overlay]').each(function () {
                    var overlay = $(this), target = $(overlay.data('target'));
                    overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
                });
                if ("onwebkitspeechchange"  in document.createElement("input")) {
                    var editorOffset = $this.offset();
                    $parent.find('.btn-editor-voice').css('position', 'absolute').offset({top: editorOffset.top, left: editorOffset.left + $this.innerWidth() - 35});
                } else {
                    $parent.find('.btn-editor-voice').hide();
                }
            };

            initToolbarBootstrapBindings();
            $this.wysiwyg(options);
        });
    };

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=editor]").each(function () {
        $(this).featuredEditor();
    });

    return Backbone && Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.featuredEditor(methodName);
            } else {
                this.$el.featuredEditor(this.options);
            }
            return this;
        }
    });
}));