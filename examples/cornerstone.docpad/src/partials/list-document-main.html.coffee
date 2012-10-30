# Document List
div '.row', ->
    unless @documents.length
		p '.list-documents-none', -> 'nothing found'
		return
    @documents.forEach (document) ->
		div '.span2', ->
			a '.list-documents-link', href:'.'+document.url+'.html', ->
				strong '.list-documents-title', property:'dc:title', ->
					document.title
			p '.list-documents-outline', property:'dc:outline', ->
				document.outline
