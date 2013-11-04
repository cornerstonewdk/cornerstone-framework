/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["jquery","handlebars"],function(a,b){return{load:function(c,d,e){a.ajax({url:d.toUrl(c+".template"),success:function(a){e(b.compile(a))},error:function(a,b,c){e.error(c)}})}}});