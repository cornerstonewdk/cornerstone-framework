# Document List
nav '.list-documents', 'typeof':'dc:collection', ->
	unless @documents.length
		p '.list-documents-none', -> 'nothing found'
		return
	@documents.forEach (document) ->
		li '.list-documents-document', 'typeof':'soic:post', about:document.url, ->
			# Display a header link
			h3 ->
				a '.list-documents-link', href:'.'+document.url+'.html', ->
					small '.list-documents-date', property:'dc:date', ->
						document.date.toShortDateString()
					strong '.list-documents-title', property:'dc:title', ->
						document.title

                if document.tags
                    #small '.list-documents-tags', property:'dc:tags', ->
                    #    document.tags + document.tags.length
                    if typeof document.tags is 'string'
                        tagNames = document.tags.split ','
                    else
                        tagNames = document.tags
                    #tagNames = document.tags
                    for name in tagNames
                        tagLists = name.trim()
                        small '.list-documents-tags', property:'dc:tags', ->
                            tagLists

                unless document.tags
                    small '.list-documents-tags', property:'dc:tags', ->
                        'No Tags'

			# Display the description if it exists
			if document.description
				p '.list-documents-description', property:'dc:description', ->
					document.description

    div '.row', ->
	    @documents.forEach (document) ->
			div '.span2', ->
				a '.list-documents-link', href:'.'+document.url+'.html', ->
					strong '.list-documents-title', property:'dc:title', ->
						document.title
				p '.list-documents-outline', property:'dc:outline', ->
					document.outline
