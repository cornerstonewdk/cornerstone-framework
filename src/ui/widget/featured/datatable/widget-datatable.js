/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-datatable.js
 *  Description: 데이터테이블을 반응형 웹에 맞는 화면을 보여주고, 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    // 코너스톤 MVC 프레임워크인 경우 이 위젯을 모듈화 한다.
    if (typeof Cornerstone === "object" && typeof define === "function" && define.amd) {
        // AMD Hybrid 포맷
        define([ "backbone", "underscore", "jquery", "style!" + Cornerstone.PATH + "ui/widget-datatable"], function (Backbone, _, $) {
            factory($, root, doc);
            return Backbone.View.extend({
                initialize:function () {
                    _.bindAll(this, "render");
//                    this.model.on("change", this.render);
                },

                updateDataTable:function (view) {
                    view.model.clear();
                    view.model.fetch({
                        success:function (model) {
                            view.options = $.extend({}, view.options, model.toJSON());

                            view.dataTable.fnClearTable();
                            view.dataTable.fnAddData(view.options.aaData);
                            view.dataTable.fnDraw();
                        }
                    });
                },

                render:function () {
                    if (!this.dataTable) {
                        this.dataTable = this.$el.featuredDataTable(this.options);
                    }
                    this.updateDataTable(this);
                    return this;
                }
            });
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document) {
    var pluginName = "featuredDataTable";

    // 데이터테이블 플러그인 랩핑 및 기본값 설정
    $.fn[pluginName] = function (options) {
        var defaultOptions = {
            "bProcessing":false,
            sPaginationType:"bootstrap",
            sDom:"<'row'<'span8'l><'span4'f>r>t<'row'<'span12'i><'span12'p>>",
            oLanguage:{sLengthMenu:"_MENU_ 페이지별 레코드수"}
        };

        options = $.extend(true, defaultOptions, options);

        return $(this).dataTable(options);
    };

    /* 기본 클래스명 정의 */
    $.extend($.fn.dataTableExt.oStdClasses, {
        "sSortAsc":"header headerSortDown",
        "sSortDesc":"header headerSortUp",
        "sSortable":"header"
    });

    /* API method to get paging information */
    $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
        return {
            "iStart":oSettings._iDisplayStart,
            "iEnd":oSettings.fnDisplayEnd(),
            "iLength":oSettings._iDisplayLength,
            "iTotal":oSettings.fnRecordsTotal(),
            "iFilteredTotal":oSettings.fnRecordsDisplay(),
            "iPage":Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
            "iTotalPages":Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
        };
    }

    /* 부트스트랩 페이지네이션 스타일링 기능 확장 */
    $.extend($.fn.dataTableExt.oPagination, {
        "bootstrap":{
            "fnInit":function (oSettings, nPaging, fnDraw) {
                var oLang = oSettings.oLanguage.oPaginate;
                var fnClickHandler = function (e) {
                    e.preventDefault();
                    if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                        fnDraw(oSettings);
                    }
                };
                $(nPaging).addClass('pagination2').append(
                    '<ul>' +
                        '<li><a href="#"><span></span></a></li>' +
                        '<li><a href="#"><span></span></a></li>' +
                        '</ul>'
                );
                var els = $('a', nPaging);
                $(els[0]).bind('click.DT', { action:"previous" }, fnClickHandler);
                $(els[1]).bind('click.DT', { action:"next" }, fnClickHandler);
            },

            "fnUpdate":function (oSettings, fnDraw) {
                var iListLength = 5;
                var oPaging = oSettings.oInstance.fnPagingInfo();
                var an = oSettings.aanFeatures.p;
                var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

                if (oPaging.iTotalPages < iListLength) {
                    iStart = 1;
                    iEnd = oPaging.iTotalPages;
                }
                else if (oPaging.iPage <= iHalf) {
                    iStart = 1;
                    iEnd = iListLength;
                } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                    iStart = oPaging.iTotalPages - iListLength + 1;
                    iEnd = oPaging.iTotalPages;
                } else {
                    iStart = oPaging.iPage - iHalf + 1;
                    iEnd = iStart + iListLength - 1;
                }

                for (i = 0, iLen = an.length; i < iLen; i++) {
                    // Remove the middle elements
                    $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                    // Add the new list items and their event handlers
                    for (j = iStart; j <= iEnd; j++) {
                        sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                        $('<li ' + sClass + '><a href="#" >' + j + '</a></li>')
                            .insertBefore($('li:last', an[i])[0])
                            .bind('click', function (e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                fnDraw(oSettings);
                            });
                    }

                    // Add / remove disabled classes from the static elements
                    if (oPaging.iPage === 0) {
                        $('li:first', an[i]).addClass('disabled');
                    } else {
                        $('li:first', an[i]).removeClass('disabled');
                    }

                    if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                        $('li:last', an[i]).addClass('disabled');
                    } else {
                        $('li:last', an[i]).removeClass('disabled');
                    }
                }
            }
        }
    });

    $(function () {
        /**
         * DATA API (HTML5 Data Attribute)
         */
        $("[data-featured=datatable]").each(function (i) {
            $(this)[pluginName]({
                "sAjaxSource":$(this).data("datatableBind")
            });
        });
    });
}));