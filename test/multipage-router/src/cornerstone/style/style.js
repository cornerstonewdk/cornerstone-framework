/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["jquery"],function(a){return{load:function(b,c,d){function e(){d(g)}function f(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c={browser:b[1]||"",version:b[2]||"0"},d={};return c.browser&&(d[c.browser]=!0,d.version=c.version),d.chrome?d.webkit=!0:d.webkit&&(d.safari=!0),d}var g=c.toUrl(b+".css");if(a("").length)return e(),void 0;var h=a('<link rel="stylesheet" type="text/css" media="all" href="'+g+'"></link>')[0],i=f(navigator.userAgent);if(i.msie)h.onreadystatechange=function(){("loaded"==h.readyState||"complete"==h.readyState)&&(h.onreadystatechange=null,e())};else if(i.opera)h.onload=e;else{var j=location.hostname.replace("www.",""),k=/http:/.test(g)?/^(\w+:)?\/\/([^\/?#]+)/.exec(g)[2]:j;i.mozilla&&j!=k?e():function(){try{h.sheet.cssRules}catch(a){return setTimeout(arguments.callee,20),void 0}e()}()}a("head").append(h)}}});