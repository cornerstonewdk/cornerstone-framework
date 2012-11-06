---
name: '목차'
linkTitle: 'toc'
pageOrder: 2
layout: 'page'
url: './toc.html'
---

# Post Listing
#text @partial 'list-document-toc.html.coffee', {
#   documents: @getCollection('posts').toJSON()
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
  section_cnt = 0
  for row in cellular
    section_cnt = section_cnt + 1
    div '#tagmap.row', ->
      for cell in row
        tag = @sections.store( cell )
        tag.documents.sort (a, b) ->
          a_order = a.get('order')
          b_order = b.get('order')
          a_arr = eval(a_order)
          b_arr = eval(b_order)
          a_arr[0] - b_arr[0] || a_arr[1] - b_arr[1]
        section_name = "sect_" + section_cnt
        ul_section_name = "usect_" + section_cnt
        li_section_name = "lsect_" + section_cnt
        div ".span8", "id":section_name, ->
          h1 tag.name
          ul "id":ul_section_name, ->
            tag.documents.forEach (documentModel)->
              #console.log documentModel.get('order')
              subsection_name = documentModel.get('subsection')
              doc_order = documentModel.get('order')
              doc_order_arr = eval(doc_order)
              order_one = doc_order_arr[0]
              order_two = doc_order_arr[1]
              div "order":doc_order, "orderone":order_one, "ordertwo":order_two, "subsection":subsection_name, "tags":"#{documentModel.get('tagstr')}", "name":li_section_name,->
                li "aname":li_section_name, -> 
                  a "href": "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"

