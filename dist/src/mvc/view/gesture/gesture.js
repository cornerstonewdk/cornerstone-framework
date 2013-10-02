/*
    Cornerstone Framework v0.9.1

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["backbone","underscore","jquery","jquery.hammer"],function(a,b,c){return a.View.extend({constructor:function(){var d=this.gestureOptions,e=c(this.el),f={};this.events&&b.each(this.events,function(a,c){var d=c.match(/^(\S+)\s*(.*)$/),e=d[1],g=d[2];b.contains(["hold","tap","doubletap","transformstart","transform","transformend","dragstart","drag","dragend","swipe","release"],e)&&(f[g]?f[g].push(e):f[g]=[e])}),b.each(f,function(a,c){var f=d?b.clone(d):{};f.drag=b.contains(a,"dragstart")||b.contains(a,"drag")||b.contains(a,"dragend"),f.swipe=b.contains(a,"swipe"),f.transform=b.contains(a,"transformstart")||b.contains(a,"transform")||b.contains(a,"transformend"),f.tap=b.contains(a,"tap"),f.tap_double=b.contains(a,"doubletap"),f.hold=b.contains(a,"hold"),(c?e.find(c):e).hammer(f)}),a.View.apply(this,arguments)}})});