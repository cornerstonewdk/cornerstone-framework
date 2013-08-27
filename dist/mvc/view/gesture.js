/*
    Cornerstone Framework v0.9.2

    COPYRIGHT(C) 2012 BY SKTELECOM CO., LTD. ALL RIGHTS RESERVED.
    Released under the Apache License, Version 2.0
*/
define(["backbone","underscore","jquery","jquery.hammer"],function(e,t,n){return e.View.extend({constructor:function(r,i){var s=this.gestureOptions,o=n(this.el),u={};this.events&&t.each(this.events,function(e,n){var r=n.match(/^(\S+)\s*(.*)$/),i=r[1],s=r[2];t.contains(["hold","tap","doubletap","transformstart","transform","transformend","dragstart","drag","dragend","swipe","release"],i)&&(u[s]?u[s].push(i):u[s]=[i])}),t.each(u,function(e,n){var r=s?t.clone(s):{};r.drag=t.contains(e,"dragstart")||t.contains(e,"drag")||t.contains(e,"dragend"),r.swipe=t.contains(e,"swipe"),r.transform=t.contains(e,"transformstart")||t.contains(e,"transform")||t.contains(e,"transformend"),r.tap=t.contains(e,"tap"),r.tap_double=t.contains(e,"doubletap"),r.hold=t.contains(e,"hold"),(n?o.find(n):o).hammer(r)}),e.View.apply(this,arguments)}})})