/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a,b,c){"function"==typeof define&&define.amd?define(["jquery"],function(d){return c(d,a,b)}):c(a.jQuery,a,b)}(this,document,function(a,b,c,d){var e=b.Jsonp={};return e.get=function(b){var c={cache:!1,data:d,dataType:"jsonp",jsonp:"callback",url:d,timeout:3e3,success:function(a){alert("result data : "+a)},error:function(a,b,c){alert("error : "+c.statusText)}},e=a.extend(c,b);b.callback&&(e.jsonpCallback=b.callback),a.ajax(e)},e});