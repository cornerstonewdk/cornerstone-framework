# Display a series of links from our Facebook Feed
section '.social.social-thumbnails.social-facebook', ->
	# Flickr Header
	header ->
		a
			href:  @config.url
			title: @config.title or 'Visit my Facebook'
			->
				h1 -> @config.label or 'Facebook'
				img '.icon', src: @config.imageUrl or '/images/facebook.gif'

	# Do not display a facebook feed, as usually it reveals way too much than we want to provide