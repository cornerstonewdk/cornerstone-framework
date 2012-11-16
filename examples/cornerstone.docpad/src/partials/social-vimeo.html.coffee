# Display a series of video thumbnails from our Vimeo Feed
section '.social.social-thumbnails.social-vimeo', ->
	# Header
	header ->
		a
			href:  @config.url
			title: @config.title or 'Visit my Vimeo'
			->
				h1 -> @config.label or 'Vimeo'
				img '.icon', src: @config.imageUrl or '/images/vimeo.gif'

	# Only display the feed if we have it
	if @feed?
		ul ->
			for video,key in @feed
				li datetime: video.upload_date, ->
					a href: video.url, title: video.title, 'data-height': video.height, 'data-width': video.width, ->
						img src: @cachr(video.thumbnail_medium), alt: video.title
