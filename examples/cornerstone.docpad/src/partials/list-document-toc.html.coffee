# Document List
nav '.list-documents', 'typeof':'dc:collection', ->
	unless @documents.length
		p '.list-documents-none', -> 'nothing found'
		return
	@documents.forEach (document) ->
        div 'tags':document.tagstr, ->
		  li '.list-documents-document', 'typeof':'soic:post', about:document.url, ->
			# Display a header link
            h3 ->  
              a '.list-documents-link', href:'.'+document.url+'.html', ->
                strong '.list-documents-title', property:'dc:title', -> document.title
                #small '.list-documents-date', property:'dc:date', -> document.date.toShortDateString()
                small '.list-documents-tagstr', property:'dc:tagstr', -> document.tagstr
                small '.list-documents-category', property:'dc:category', -> document.category
                small '.list-documents-categoryOrder', property:'dc:categoryOrder', -> document.categoryOrder
                small '.list-documents-tocdepth', property:'dc:tocdepth', -> document.tocdepth

			# Display the description if it exists
			if document.description
				p '.list-documents-description', property:'dc:description', ->
					document.description

