/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["jquery","handlebars"],function(e,t){return{load:function(n,r,i,s){e.ajax({url:r.toUrl(n+".template"),success:function(e){i(t.compile(e))},error:function(e,t,n){i.error(n)}})}}})