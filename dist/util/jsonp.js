/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),{get:e.Jsonp.get}}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){var i=t.Jsonp={};i.get=function(t){var n={cache:!1,data:r,dataType:"jsonp",jsonp:"callback",url:r,timeout:3e3,success:function(e){alert("result data : "+e)},error:function(e,t,n){alert("error : "+n.statusText)}},i=e.extend(n,t);t.callback&&(i.jsonpCallback=t.callback),e.ajax(i)}})