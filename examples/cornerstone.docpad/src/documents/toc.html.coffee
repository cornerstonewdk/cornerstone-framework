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
          if a_arr.length is 2
            a_arr[2] = 0
          b_arr = eval(b_order)
          if b_arr.length is 2
            b_arr[2] = 0
          a_arr[0] - b_arr[0] || a_arr[1] - b_arr[1] || a_arr[2] - b_arr[2]
        section_name = "sect_" + section_cnt
        #div ".span8", "id":section_name, ->
        h1 tag.name
        subsection_cnt = 0
        tag.documents.forEach (documentModel)->
          subsection_name = documentModel.get('subsection')
          order = documentModel.get('order')
          order_arr = eval(order)
          if order_arr[0] isnt subsection_cnt
              div ".span12.main-box.media", -> 
                #a ".pull-left", "href":"#", ->
                #  img ".media-object", "src":"", -> ""
                img ".media-object", "src":"", -> ""
                div ".media-body", ->
                  h4 ".media-heading", -> subsection_name
                  #p -> documentModel.get('outline')
              subsection_cnt = order_arr[0]
          depth = "main-box media"
          order_str = ""
          if order_arr.length is 3
              depth = "span10 offset2 " + depth
              order_str = order_arr[0] + "." + order_arr[1] + "." + order_arr[2] + "."
          else 
              depth = "span11 offset1 " + depth
              order_str = order_arr[0] + "." + order_arr[1] + ".0."
          div "class":depth, ->
                a ".pull-left", "href":"."+"#{documentModel.get('url')}"+".html", ->
                  img ".media-object", "src":"./images/"+"#{documentModel.get('thumbnail')}", -> ""
                div ".media-body", ->
                  a ".pull-left", "href":"."+"#{documentModel.get('url')}"+".html", ->
                    h4 ".media-heading", -> order_str + "#{documentModel.get('title')}"
                  p -> documentModel.get('outline')




#          indent_sz = (order_arr.length - 1) * 20
#          style_val = "text-indent:"+indent_sz+"px"
#          div "order":order, "subsection":subsection_name, "tags":"#{documentModel.get('tagstr')}", ->
#            li "style":style_val, "order_depth":order_arr.length, -> 
#              a "href": "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"

#        ul ->
#            subsection_cnt = 0
#            tag.documents.forEach (documentModel)->
#              #console.log documentModel.get('order')
#              subsection_name = documentModel.get('subsection')
#              order = documentModel.get('order')
#              order_arr = eval(order)
#              if order_arr[0] isnt subsection_cnt
#                  li "order_depth":"1", -> subsection_name
#                  subsection_cnt = order_arr[0]
#              indent_sz = (order_arr.length - 1) * 20
#              style_val = "text-indent:"+indent_sz+"px"
#              div "order":order, "subsection":subsection_name, "tags":"#{documentModel.get('tagstr')}", ->
#                li "style":style_val, "order_depth":order_arr.length, ->
#                  a "href": "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"

