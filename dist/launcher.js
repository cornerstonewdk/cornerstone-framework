/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
(function(e){function t(e){var t=e.indexOf("#");return t>-1&&(e=e.substring(0,t)),{path:e.substring(0,e.lastIndexOf("/")+1),file:e.substring(e.lastIndexOf("/")+1)}}function n(e){return e+"lib/"}var r=document.getElementsByTagName("script"),i,s,o;for(var u=r.length-1;u>-1;u--){i=r[u].parentNode,s=r[u].getAttribute("src"),o=r[u].getAttribute("data-target");if(o){var a=t(s).path,f=n(a),l=t(o),c=t(location.href);e.Cornerstone=e.CS={VERSION:"1.0",PATH:c.path+a,PATH_LIB:c.path+f,App:{baseUrl:l.path,mainModule:l.file}};var h=document.createElement("script");h.type="text/javascript",h.charset="utf-8",h.async=!0,h.src=f+"require.js",h.setAttribute("data-main",a+"app-container"),i.appendChild(h);break}}})(this)