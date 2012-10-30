# Display a series of links from our Twitter Feed
section '.social.social-links.social-twitter', ->
	# Header
	header ->
		a
			href:  @config.url
			title: @config.title or 'Visit my Twitter'
			->
				h1 -> @config.label or 'Twitter'
				img '.icon', src: @config.imageUrl or '/images/twitter.gif'

	# Only display the feed if we have it
	if @feed?
		ul ->
			for tweet in @feed
				continue  if tweet.in_reply_to_user_id
				li datetime: tweet.created_at, ->
					a href: "https://twitter.com/#!/#{tweet.user.screen_name}/status/#{tweet.id_str}", title: "View on Twitter", ->
						tweet.text
