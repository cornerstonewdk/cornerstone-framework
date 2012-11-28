# Document List
    text  '[\n'
    docs_first = true
	@documents.forEach (document) ->
        if docs_first
          text  '\n'
          docs_first = false
        else
          text  ',\n'
        text  '{\n'
        text  '    "url":"'+document.url+'",\n'
        if document.thumbnail
          text  '    "image":"'+document.thumbnail+'",\n'
        text  '    "title":"'+document.title+'",\n'
        text  '    "outline":"'+document.outline.replace(/"/gi, '\\"')+'",\n'
        text  '    "tags":"'+document.tagstr+'"\n'
        text  '}\n'
    text  ']\n'

