# ----------------------------- # Prepare

# Get our formatted site title as defined by out docpad.cson file
siteTitle = @getSiteTitle()

# Merge our site keywords with our documents keywords and stringify
siteKeywords = @site.keywords.concat(@document.keywords or []).join(', ')


# ----------------------------- # Document

doctype 5
html lang: 'ko', ->

	# ----------------------------- # Document Header

	head ->

		# Set our charset to UFT8 (newschool method)
		meta 'http-equiv':'content-type', content:'text/html; charset=utf-8'

		# ----------------------------- # Stylesheets

		# ----------------------------- # Cornerstone Stylesheets and Scripts

	    link rel: 'stylesheet', href: './dist/lib/bootstrap/css/bootstrap.css'
		link rel: 'stylesheet', href: './dist/lib/bootstrap/css/bootstrap-responsive.css'

		link rel: 'stylesheet', href: './dist/ui/theme/white/css/cornerstone.css'

        style '''
          #customers
          #{
          #      font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
          #      width:100%;
          #      border-collapse:collapse;
          #}
          td, th 
          {
                font-size:1.2em;
                border:1px solid #98bf21;
                padding:3px 7px 2px 7px;
          }
          th 
          {
                font-size:1.4em;
                text-align:left;
                padding-top:5px;
                padding-bottom:4px;
                background-color:#A7C942;
                color:#fff;
          }
          tr.alt td 
          {
                color:#000;
                background-color:#EAF2D3;
          }
        '''

		script src: './dist/lib/jquery-1.8.1.min.js'
		script src: './dist/ui/widget-plugins.js'

		# ----------------------------- # CodeMirror
        
		#script src: 'lib/codemirror.js'
		#script src: 'mode/xml/xml.js'
		#script src: 'mode/javascript/javascript.js'
		#script src: 'mode/css/css.js'
		#script src: 'mode/htmlmixed/htmlmixed.js'
        #link rel: 'stylesheet', href: 'lib/codemirror.css'
        #link rel: 'stylesheet', href: 'doc/docs.css'
        #style '''
        #  .CodeMirror {
        #    float: left;
        #    width: 50%;
        #    border: 1px solid black;
        #  }
        #  iframe {
        #    width: 49%;
        #    float: left;
        #    height: 300px;
        #    border: 1px solid black;
        #    border-left: 0px;
        #  }
        #'''

		# ----------------------------- # CodeMirror
        
        #link rel: 'stylesheet', href: 'github-3436edc31030ce80cb02d83f174dff2f36acd5ad.css'
        #link rel: 'stylesheet', href: 'github2-9684705efd51052eea0d95b9055ac70b9d18fc54.css'

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

        rowmap = (row, orig) ->
          ret = []

          tagnames = []
          for own tag of orig
            tagnames.push tag
          tagnames.sort()

          for tag, i in tagnames
            ret.push(cur = []) if i % row is 0
            cur.push tag

          ret

        cellular = rowmap 3, @tags.store()

        tagstr = '['

        for row in cellular
          for cell in row
            tag = @tags.store( cell )
            tagstr = tagstr + '"' + tag.name + '",' 

        tagstr = tagstr + '""]'
        #p -> tagstr

        div '.navbar.ico-txt', ->
            div '.navbar-inner', ->
                div '.container', ->
                    button '.btn.btn-navbar', 'type':'button', 'data-toggle':'collapse', 'data-target':'.nav-collapse', ->
                        span '.icon-bar', ->
                        span '.icon-bar', ->
                        span '.icon-bar', ->
                    a '.brand', href : './index.html', ->
                        'Cornerstone'
                    div '.nav-collapse.collapse', ->
                        ul '.nav.pull-left', ->
                            @getCollection('pages').toJSON().forEach (page) =>
                                    linkClass = 'inactive'
                                    #linkClass = if @document.url = page.url then 'active' else 'inactive'
                                    linkTitle = h(page.linkTitle or '')
                                    #linkUrl = '.' + h(page.url)
                                    #linkUrl = './livedoc.0.3' + h(page.url) + '.html'
                                    switch h(page.url)
                                        when '/' then linkUrl = './index.html'
                                        else linkUrl = '.' + h(page.url) + '.html'
                                    li 'class':linkClass, 'id':linkTitle, ->
                                        a href:linkUrl, title:linkTitle, ->
                                            page.name
                                            #page.name + h(page.url) + @document.url.indexOf(page.url) + page.order
                                            #page.name +' '+ @document.url +' '+  page.url
                        if @document.linkTitle is 'home' or @document.linkTitle is 'toc' or @document.linkTitle is 'bydate'
                          ul '.nav.pull-right', ->
                            li ->
                                a 'href':'#', ->
                                    i '.icon-write', 'id':'tag-search', -> ''
	                      form '.navbar-search.pull-rigth', 'id' : 'searchForm',
                            -> '<label class="blind"> Tag Search </label>' +
                               '<input class="search-query" type="text" placeholder="TAG" data-provide="typeahead" data-source=\'' + tagstr + '\'>'
                        #else
                        #  ul '.nav.pull-right', ->
                        #    li ->
                        #        a 'href':'#', ->
                        #            i '.icon-write', 'id':'tag-search', -> ''
	                    #  form '.navbar-search.pull-rigth', 'id' : 'searchForm',
                        #    -> '<label class="blind"> Tag Search </label>' +
                        #       '<input class="search-query" type="text" placeholder="TAG" disabled="true" data-provide="typeahead" data-source=\'' + tagstr + '\'>'

        div '.container', ->
          div '.row-fluid', ->
            div '.span12', ->
                # Document
                article '.page',
                    'typeof': 'sioc:page'
                    about: h @document.url
                #	datetime: h @document.date.toISOString()
                    -> @content

		# Include our scripts
		# [신용후] jquery와 script.js를 로딩한다.
		text @getBlock('scripts').add([
		#	'./vendor/log.js'
		#	'./vendor/jquery.js'
		#	'./vendor/modernizr.js'
		#	'./vendor/underscore.js'
		#	'./vendor/backbone.js'
		#	'./vendor/fancybox/jquery.fancybox.js'
		#	"./themes/#{@theme}/script.js"
			"./script.js"
		]).toHTML()

