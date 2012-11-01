# Project List
nav '.list-projects', 'typeof':'dc:collection', ->
	unless @documents.length
		p '.list-projects-none', -> 'nothing found'
		return
	@projects.forEach (document) ->
		li '.list-projects-project', 'typeof':'soic:post', about:project.url, ->
			# Display a header link
			h3 ->
				a '.list-projects-link', href:project.html_url, ->
					em '.list-projects-owner', property:'dc:owner', ->
						project.owner.login
					text ' / '
					strong '.list-projects-name', property:'dc:name', ->
						project.name
					small '.list-projects-watchers', property:'dc:watchers', ->
						text "#{project.watchers} watchers"

			# Display the description if it exists
			if project.description
				p '.list-projects-description', property:'dc:description', ->
					project.description
