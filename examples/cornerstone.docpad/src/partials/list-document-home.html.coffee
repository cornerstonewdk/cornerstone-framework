# Document List
div '.row', ->
    unless @documents.length
		p '.list-documents-none', -> 'nothing found'
		return
    row_cnt = 0
    @documents.forEach (document) ->
        row_cnt = row_cnt + 1
		div '.span2.main-box', 'tags': document.tagstr, ->
			a '.list-documents-link', href:'.'+document.url+'.html', ->
				strong '.list-documents-title', property:'dc:title', ->
					document.title
			p '.list-documents-outline', property:'dc:outline', ->
				document.outline
			#p '.list-documents-tagstr', property:'dc:tagstr', ->
			#	document.tagstr

