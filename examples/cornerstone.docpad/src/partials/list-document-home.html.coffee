# Document List
div '.row', ->
    unless @documents.length
        div ".span12.main-box.media", 'style':'margin-top: 10px;', ->
          div ".media-body", ->
            h4 ".media-heading", -> "There is no document !"
		return
    row_cnt = 0
    @documents.forEach (document) ->
		row_cnt = row_cnt + 1
		new_row = row_cnt % 3 
		#if new_row is 1
		#	text "<div class='row'>"
		div '.span4.main-box', 'tags': "* " + document.tagstr, 'style':'height: 174px;margin-left: 0px;margin-right: 20px;', ->
          order = document.order
          order_arr = eval(order)
          order_str = ""
          if order_arr.length is 3
              order_str = order_arr[0] + "." + order_arr[1] + "." + order_arr[2] + "."
          else
              order_str = order_arr[0] + "." + order_arr[1] + "."
          div '.media', ->
			a '.pull-left', href:'.'+document.url+'.html', ->
                if document.thumbnail isnt undefined
                  img ".media-object", "src":"./images/"+document.thumbnail, -> ""
            div '.media-body', ->
              h4 '.media-heading', -> 
                a 'href':'.'+document.url+'.html', -> order_str + " " + document.title
			  p -> document.outline
		#if new_row is 0
		#	text "</div>"
		#	row_cnt = 0

    if row_cnt isnt 0
      div '.span4.main-box', 'id':'nothing', 'style':'height: 174px;margin-left: 0px;margin-right: 20px;display: none;', ->
        div '.media', ->
          div '.media-body', ->
            h4 '.media-heading', -> "There is no document !"

