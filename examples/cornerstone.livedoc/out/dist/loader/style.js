/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["jquery"],function(e){return{load:function(t,n,r,i){function o(){r(s)}var s=n.toUrl(t+".css");if(e("").length){o();return}var u=e('<link rel="stylesheet" type="text/css" media="all" href="'+s+'"></link>')[0];if(e.browser.msie)u.onreadystatechange=function(){if(u.readyState=="loaded"||u.readyState=="complete")u.onreadystatechange=null,o()};else if(e.browser.opera)u.onload=o;else{var a=location.hostname.replace("www.",""),f=/http:/.test(s)?/^(\w+:)?\/\/([^\/?#]+)/.exec(s)[2]:a;e.browser.mozilla&&a!=f?o():function(){try{u.sheet.cssRules}catch(e){setTimeout(arguments.callee,20);return}o()}()}e("head").append(u)}}})