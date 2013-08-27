/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["jquery"],function(e){return{load:function(t,n,r,i){function o(){r(s)}function a(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n={browser:t[1]||"",version:t[2]||"0"},r={};return n.browser&&(r[n.browser]=!0,r.version=n.version),r.chrome?r.webkit=!0:r.webkit&&(r.safari=!0),r}var s=n.toUrl(t+".css");if(e("").length){o();return}var u=e('<link rel="stylesheet" type="text/css" media="all" href="'+s+'"></link>')[0],f=a(navigator.userAgent);if(f.msie)u.onreadystatechange=function(){if(u.readyState=="loaded"||u.readyState=="complete")u.onreadystatechange=null,o()};else if(f.opera)u.onload=o;else{var l=location.hostname.replace("www.",""),c=/http:/.test(s)?/^(\w+:)?\/\/([^\/?#]+)/.exec(s)[2]:l;f.mozilla&&l!=c?o():function(){try{u.sheet.cssRules}catch(e){setTimeout(arguments.callee,20);return}o()}()}e("head").append(u)}}})