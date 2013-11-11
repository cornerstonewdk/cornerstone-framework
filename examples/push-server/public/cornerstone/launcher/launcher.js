/*
    Cornerstone Framework v2.0

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
!function(a){function b(a){var b=a.indexOf("#");return b>-1&&(a=a.substring(0,b)),{path:a.substring(0,a.lastIndexOf("/")+1),file:a.substring(a.lastIndexOf("/")+1)}}function c(a){return a+"../"}for(var d,e,f,g=document.getElementsByTagName("script"),h=g.length-1;h>-1;h--)if(d=g[h].parentNode,e=g[h].getAttribute("src"),f=g[h].getAttribute("data-target")){var i=b(e).path,j=c(i),k=b(f),l=b(location.href);a.Cornerstone=a.CS={VERSION:"2.0",PATH:l.path+i,PATH_LIB:l.path+j,App:{baseUrl:k.path,mainModule:k.file}};var m=document.createElement("script");m.type="text/javascript",m.charset="utf-8",m.async=!0,m.src=j+"require.js",m.setAttribute("data-main",i+"app-container"),d.appendChild(m);break}}(this);