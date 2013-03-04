# Display a series of links from our Github Feed
section '.social.social-links.social-twitter', ->
	# Header
	header ->
		a
			href:  @config.url
			title: @config.title or 'Visit my Github'
			->
				h1 -> @config.label or 'Github'
				img '.icon', src: @config.imageUrl or '/images/github.gif'

	# Only display the feed if we have it
	if @feed?
		ul ->
			for entry in @feed.entry
				li datetime: entry.published, ->
					a href: entry.link['@'].href, title: "View on Github", ->
						entry.title['#']
