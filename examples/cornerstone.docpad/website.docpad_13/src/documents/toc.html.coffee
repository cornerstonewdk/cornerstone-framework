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
        div ".span12", "id":"section", ->
          h2 tag.name
          ul ->
            tag.documents.forEach (documentModel)->
              li -> 
                h4 ->
                  a "href": "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}", "#{documentModel.get('title')}"


###
script ->
  "var secElms = document.getElementById('section'); \n"+
  "    alert(secElms.length);                       \n"+
  "for (var i=0; i<secElms.length; i++) {        \n"+
  "    alert(secElms[i].firstChild.innerHTML);                       \n"+
  "}                                          \n"

script "defer":"defer", "src":"/vendor/jquery.js", ->
script ->
  "(function(){         \n"+
  "    $('#toc').addClass('active');          \n"+
  "    $('#toc')..innerHTML = 've';           \n"+
  "});                                        \n"
###
