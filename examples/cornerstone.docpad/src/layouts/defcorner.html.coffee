# ----------------------------- # Prepare

# Get our formatted site title as defined by out docpad.cson file
siteTitle = @getSiteTitle()

# Merge our site keywords with our documents keywords and stringify
siteKeywords = @site.keywords.concat(@document.keywords or []).join(', ')


# ----------------------------- # Document

doctype 5
html lang: 'en', ->

	# ----------------------------- # Document Header

	head ->

		# Set our charset to UFT8 (newschool method)
		meta 'http-equiv':'content-type', content:'text/html; charset=utf-8'

		# ----------------------------- # Stylesheets

		# ----------------------------- # Cornerstone Stylesheets

	    link rel: 'stylesheet', href: 'cornerstone/bootstrap.css'
		link rel: 'stylesheet', href: 'cornerstone/bootstrap-responsive.css'

		link rel: 'stylesheet', href: 'cornerstone/theme/white/css/cornerstone.css'

		# ----------------------------- # CodeMirror

		script src: 'lib/codemirror.js'
		script src: 'mode/xml/xml.js'
		script src: 'mode/javascript/javascript.js'
		script src: 'mode/css/css.js'
		script src: 'mode/htmlmixed/htmlmixed.js'
        link rel: 'stylesheet', href: 'lib/codemirror.css'
        link rel: 'stylesheet', href: 'doc/docs.css'
        style '''
          .CodeMirror {
            float: left;
            width: 50%;
            border: 1px solid black;
          }
          iframe {
            width: 49%;
            float: left;
            height: 300px;
            border: 1px solid black;
            border-left: 0px;
          }
        '''

	# ----------------------------- # Document Body

	body ->
		# Heading
		#header '.heading', ->
		#	a href:'/', title:'Return home', ->
		#		h1 -> @site.heading
		#		span '.heading-avatar', ->
		#	h2 ->
		#		text @site.subheading

		# Pages
		#nav '.pages', ->
		#	ul ->
		#		@getCollection('pages').toJSON().forEach (page) =>
		#			linkClass = if @document.url.indexOf(page.url) is 0 then 'active' else 'inactive'
		#			linkTitle = h(page.linkTitle or '')
		#			linkUrl = h(page.url)
		#			li 'class':linkClass, ->
		#				a href:linkUrl, title:linkTitle, ->
		#					page.name

        div '.navbar', ->
            div '.navbar-inner', ->
                div '.container', ->
                    button '.btn.btn-navbar', type : 'button', 'data-toggle' : 'collapse', 'data-target' : '.nav-collapse', ->
                        span '.icon-bar', ->
                        span '.icon-bar', ->
                        span '.icon-bar', ->
                    a '.brand', href : './index.html', ->
                        'Cornerstone'
                    div '.nav-collapse.collapse', ->
                        ul '.nav', ->
                            @getCollection('pages').toJSON().forEach (page) =>
                                    linkClass = ''
                                    linkTitle = h(page.linkTitle or '')
                                    #linkUrl = '.' + h(page.url)
                                    #linkUrl = './livedoc.0.3' + h(page.url) + '.html'
                                    switch h(page.url)
                                        when '/' then linkUrl = './index.html'
                                        else linkUrl = '.' + h(page.url) + '.html'
                                    li 'class':linkClass, ->
                                        a href:linkUrl, title:linkTitle, ->
                                            page.name

        div '.container', ->

		# Document
		article '.page',
			'typeof': 'sioc:page'
			about: h @document.url
		#	datetime: h @document.date.toISOString()
			-> @content

		# Include our scripts
		#text @getBlock('scripts').add([
		#	'/vendor/log.js'
		#	'/vendor/jquery.js'
		#	'/vendor/modernizr.js'
		#	'/vendor/underscore.js'
		#	'/vendor/backbone.js'
		#	'/vendor/fancybox/jquery.fancybox.js'
		#	"/themes/#{@theme}/script.js"
		#	"/script.js"
		#]).toHTML()

