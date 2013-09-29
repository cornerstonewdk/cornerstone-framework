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
    // if (typeof Cornerstone === "object" && typeof define === "function" && define.amd) {
    if ( typeof define === "function" && define.amd ) {
        // AMD Hybrid 포맷
        define([ "backbone", "underscore", "jquery", "datatable" ], function (Backbone, _, $) {
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
            sDom:"<'row'<'col-lg-8 col-sm-12'l><'col col-lg-4 col-sm-12'f>r>t<'row'<'col-sm-12'i><'col-sm-12'p>>",
            oLanguage:{sLengthMenu:"_MENU_ 페이지별 레코드수", sInfo:"총 레코드 수:_TOTAL_ (시작 번호:_START_, 끝 번호:_END_)"}
        };

        options = $.extend(true, defaultOptions, options);
        var dt = $( this ).data( 'featuredDataTable', $(this).dataTable(options) );
        
        dt.off( 'click', 'tr' ).on( 'click', 'tr', function () {
            var rowData = $( this ).closest( 'table' ).data( 'featuredDataTable' ).fnGetData( this );
            $( this ).trigger( 'itemClick.cs.datatables', { 'data': rowData } );
        } );
        return dt.data( 'featuredDataTable');
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
    };

    /* 부트스트랩 페이지네이션 스타일링 기능 확장 */
    $.extend($.fn.dataTableExt.oPagination, {
        "bootstrap":{
            "fnInit":function (oSettings, nPaging, fnDraw) {
                var fnClickHandler = function (e) {
                    e.preventDefault();
                    if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                        fnDraw(oSettings);
                    }
                };

                $(nPaging).append(
                    '<ul class="pagination">' +
                        '<li class="disabled"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span></a></li>' +
                        '<li><a href="#"><span class="glyphicon glyphicon-chevron-right"></span></a></li>' +
                        '</ul>'
                );
                var els = $('a', nPaging);
                $(els[0]).bind('click.DT', { action:"previous" }, fnClickHandler);
                $(els[1]).bind('click.DT', { action:"next" }, fnClickHandler);
            },

            "fnUpdate":function (oSettings, fnDraw) {
                var iListLength = 4;
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


                var $inputFilter = $(".dataTables_filter input");
                $inputFilter.hasClass("form-control") || $inputFilter.addClass("form-control");
            }
        }
    });

    $(function () {
        /**
         * DATA API (HTML5 Data Attribute)
         */
        $("[data-featured=datatable]").each(function () {
            $(this)[pluginName]({
                "sAjaxSource":$(this).data("datatableBind")
            });
        });

        $(".dataTables_paginate a").on("click", function(e) {
            e.preventDefault();
        });
    });
}));