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
        meta 'name':'viewport', content:'width=device-width, initial-scale=1.0'

		# ----------------------------- # Stylesheets

		# ----------------------------- # Cornerstone Stylesheets and Scripts

	    link rel: 'stylesheet', href: './dist/lib/bootstrap/css/bootstrap.css'
		link rel: 'stylesheet', href: './dist/lib/bootstrap/css/bootstrap-responsive.css'

		link rel: 'stylesheet', href: './dist/ui/theme/white/css/cornerstone.css'
		link rel: 'stylesheet', href: './dist/ui/theme/white/css/livedocument.css'

		script src: './dist/lib/jquery-1.8.1.min.js'
		script src: './dist/ui/widget-plugins.js'
        
	# ----------------------------- # Document Body

	body ->

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

        div '.container', ->
          div '.row-fluid', ->
            div '.span3.bs-docs-sidebar', ->
                cellular = rowmap 1, @sections.store()
                for row in cellular
                  for cell in row
                    ul '.nav.nav-list', ->
                      tag = @sections.store( cell )
                      li '.nav-header', -> tag.name
                      cur_url_2 = @document.url
                      subsection_cnt = 0
                      tag.documents.forEach (documentModel) ->
                          cur_url_1 = "#{documentModel.get('url')}"
                          order = "#{documentModel.get('order')}"
                          order_arr = eval(order)
                          if order_arr[0] isnt subsection_cnt
                             li -> a "href":"", "#{documentModel.get('subsection')}"
                             subsection_cnt = order_arr[0]
                          indent_sz = (order_arr.length - 1) * 20
                          style_val = "text-indent:"+indent_sz+"px"
                          #if "#{documentModel.get('url')}" is @document.url 
                          if cur_url_1 is cur_url_2 
                             li '.active', -> a "href": "."+"#{documentModel.get('url')}"+".html", "style":style_val, "#{documentModel.get('title')}"
                          else
                             li '.inactive', -> a "href": "."+"#{documentModel.get('url')}"+".html", "style":style_val, "#{documentModel.get('title')}"

            div '.span9', ->
                # Document
                article '.page',
                    'typeof': 'sioc:page'
                    about: h @document.url
                    -> @content

		# Include our scripts
		text @getBlock('scripts').add([
			"./script.js"
		]).toHTML()

