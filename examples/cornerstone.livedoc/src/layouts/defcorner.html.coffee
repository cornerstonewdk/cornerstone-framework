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
		link rel: 'stylesheet', href: './livedocument.css'

		script src: './dist/lib/jquery-1.8.1.min.js'
		script src: './dist/ui/widget-plugins.js'
		script src: './dist/lib/handlebars-1.0.0.beta.6.js'
		
		text "<script type='text/javascript'>"
		text "var _gaq = _gaq || [];"
		text "_gaq.push(['_setAccount', 'UA-37188645-1']);"
		text "_gaq.push(['_trackPageview']);"
		text "(function() {"
		text "  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"
		text "  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"
		text "  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"
		text "})();"
		text "</script>"
        
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

        if @document.linkTitle is 'home'
             styleforindex = "margin-bottom: 0;"
        else
             styleforindex = ""
        div '.navbar.ico-txt', "style":styleforindex , ->
            div '.navbar-inner', ->
                div '.container', ->
                    button '.btn.btn-navbar', 'type':'button', 'data-toggle':'collapse', 'data-target':'.nav-collapse', ->
                        i -> ""
                    a '.brand', href : './index.html', ->
                        'Cornerstone'
                    div '.nav-collapse.collapse', ->
                        ul '.nav', ->
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
                                            #i "class":"", ""
                                            switch linkTitle
                                                when "home" then i ".icon-home", ""
                                                when "toc" then i ".icon-list", ""
                                                when "bytag" then i ".icon-tag", ""
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

        if @document.linkTitle is 'home'
          header ".jumbotron.subhead#overview", ->
            div ".container", ->
                h1 -> "Cornerstone WDK Document"
                p ".lead", -> "코너스톤 웹 개발 킷의 기본적 사용법과 이를 활용한 다양한 웹 애플리케이션을 작성하고 직접 체험할 수 있습니다."

        div '.container', ->
          div '.row-fluid', ->
            div '.span12', ->
                # Document
                article '.page',
                    'typeof': 'sioc:page'
                    about: h @document.url
                    -> @content

		# Include our scripts
		#text @getBlock('scripts').add([
		#	"./script.js"
		#]).toHTML()
		
            div '.span12', 'style':'margin-left: 0;', ->
            	div '.row', ->
            		div '.span12.main-box', ->
            			"<a href='http://www.sktelecom.com' target='_blank'>SKTELECOM</a>에 의해 작성된 <a href='http://cornerstone.sktelecom.com/livedoc/' target='_blank'>Cornerstone 개발자 문서</a>는 <a href='http://creativecommons.org/licenses/by/3.0/deed.ko' target='_blank'>크리에이티브 커먼즈 저작자표시 3.0 라이선스</a>에 따라 이용할 수 있습니다."


        if @document.linkTitle is 'home'
		    script src: './script.js'
        else
		    script src: './script_toc.js'

