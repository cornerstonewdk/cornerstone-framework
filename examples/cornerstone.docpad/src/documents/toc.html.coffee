---
name: '목차'
linkTitle: 'toc'
pageOrder: 2
layout: 'page'
url: './toc.html'
---

# Post Listing
text @partial 'list-document-toc.html.coffee', {
	documents: @getCollection('posts').toJSON()
}

###
script "defer":"defer", "src":"/vendor/jquery.js", ->
script ->
  "var elms = document.getElementById('toc'); \n"+
  "alert(elms.class);                         \n"+
  "alert(elms.id);                            \n"+
  "for (var i=0; i<elms.length; i++) {        \n"+
  "    elms[i].className = 'active';          \n"+
  "    alert('active');                       \n"+
  "}                                          \n"+
  "alert('hi');                               \n"
script ->
  "(function(){         \n"+
  "    $('#toc').addClass('active');          \n"+
  "    $('#toc')..innerHTML = 've';           \n"+
  "});                                        \n"
###
