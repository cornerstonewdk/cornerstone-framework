# Document List
nav '.list-documents', 'typeof':'dc:collection', ->
	unless @documents.length
		p '.list-documents-none', -> 'nothing found'
		return
	@documents.forEach (document) ->
		li '.list-documents-document', 'typeof':'soic:post', about:document.url, ->
			# Display a header link
			h3 ->
				#a '.list-documents-link', href:document.url, ->
				#a '.list-documents-link', href:'./livedoc.0.3'+document.url+'.html', ->
				a '.list-documents-link', href:'.'+document.url+'.html', ->
					small '.list-documents-date', property:'dc:date', ->
						document.date.toShortDateString()
					strong '.list-documents-title', property:'dc:title', ->
						document.title

                if document.tags
                    if typeof document.tags is 'string'
                        tagNames = document.tags.split ','
                    else
                        tagNames = document.tags
                    for name in tagNames
                        tagLists = name.trim()
                        small '.list-documents-tags', property:'dc:tags', ->
                            tagLists

			# Display the description if it exists
			if document.description
				p '.list-documents-description', property:'dc:description', ->
					document.description

