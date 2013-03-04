# Display a series of image thumbnails from our Flickr Feed
section '.social.social-thumbnails.social-flickr', ->
	# Flickr Header
	header ->
		a
			href:  @config.url
			title: @config.title or 'Visit my Flickr'
			->
				h1 -> @config.label or 'Flickr'
				img '.icon', src: @config.imageUrl or '/images/flickr.gif'

	# Only display the feed if we have it
	if @feed?
		ul ->
			for image in @feed.items
				li datetime: image.date_taken, ->
					a href: image.link, title: image.title, ->
						img src: @cachr(image.media.m), alt: image.title