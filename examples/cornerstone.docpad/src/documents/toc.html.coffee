---
name: '목차'
linkTitle: 'toc'
pageOrder: 2
layout: 'page'
url: './toc.html'
---

# Post Listing
#text @partial 'list-document-toc.html.coffee', {
#	documents: @getCollection('posts').toJSON()
#}

rowmap = (row, orig) ->
  ret = []

  tagnames = []
  for own tag of orig
    tagnames.push tag
  tagnames.sort()

  for tag, i in tagnames
    ret.push(cur = []) if i % row is 0
    cur.push tag

  ret

cellular = rowmap 1, @sections.store()

section ".tagmap", ->
  for row in cellular
    div '#tagmap.row', ->
      for cell in row
        tag = @sections.store( cell )
        div ".span4", ->
          h4 tag.name
          ul ->
            tag.documents.forEach (documentModel)->
              li -> a href: "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"


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
