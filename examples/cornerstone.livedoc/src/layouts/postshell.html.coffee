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
		
		text "<script type='text/javascript'>"
		text "</script>"
		
	# ----------------------------- # Document Body

	body "onload":"smartAnchor('mobile_anchor')", ->

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

#        div '.navbar.ico-txt', ->
#            div '.navbar-inner', ->
#                div '.container', ->
#                    button '.btn.btn-navbar', 'type':'button', 'data-toggle':'collapse', 'data-target':'.nav-collapse', ->
#                        span '.icon-bar', ->
#                        span '.icon-bar', ->
#                        span '.icon-bar', ->
#                    a '.brand', href : './index.html', ->
#                        'Cornerstone'
#                    div '.nav-collapse.collapse', ->
#                        ul '.nav.pull-left', ->
#                            @getCollection('pages').toJSON().forEach (page) =>
#                                    linkClass = 'inactive'
#                                    #linkClass = if @document.url = page.url then 'active' else 'inactive'
#                                    linkTitle = h(page.linkTitle or '')
#                                    #linkUrl = '.' + h(page.url)
#                                    #linkUrl = './livedoc.0.3' + h(page.url) + '.html'
#                                    switch h(page.url)
#                                        when '/' then linkUrl = './index.html'
#                                        else linkUrl = '.' + h(page.url) + '.html'
#                                    li 'class':linkClass, 'id':linkTitle, ->
#                                        a href:linkUrl, title:linkTitle, ->
#                                            page.name
#                                            #page.name + h(page.url) + @document.url.indexOf(page.url) + page.order
#                                            #page.name +' '+ @document.url +' '+  page.url
#                        if @document.linkTitle is 'home' or @document.linkTitle is 'toc' or @document.linkTitle is 'bydate'
#                          ul '.nav.pull-right', ->
#                            li ->
#                                a 'href':'#', ->
#                                    i '.icon-write', 'id':'tag-search', -> ''
#	                      form '.navbar-search.pull-rigth', 'id' : 'searchForm',
#                            -> '<label class="blind"> Tag Search </label>' +
#                               '<input class="search-query" type="text" placeholder="TAG" data-provide="typeahead" data-source=\'' + tagstr + '\'>'

        div '.navbar.ico-txt', ->
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

        div '.container-fluid', ->
          div '.row-fluid', ->
            div '.span3.bs-docs-sidebar', ->
                cellular = rowmap 1, @sections.store()
                for row in cellular
                  for cell in row
                    ul '.nav.nav-list', ->
                      tag = @sections.store( cell )
                      tag.documents.sort (a, b) ->
                        a_order = a.get('order')
                        b_order = b.get('order')
                        a_arr = eval(a_order)
                        if a_arr.length is 2
                          a_arr[2] = 0
                        b_arr = eval(b_order)
                        if b_arr.length is 2
                          b_arr[2] = 0
                        a_arr[0] - b_arr[0] || a_arr[1] - b_arr[1] || a_arr[2] - b_arr[2]
                      li '.nav-header', -> tag.name
                      cur_url_2 = @document.url
                      subsection_cnt = 0
                      tag.documents.forEach (documentModel) ->
                          cur_url_1 = "#{documentModel.get('url')}"
                          order = "#{documentModel.get('order')}"
                          order_arr = eval(order)
                          if order_arr[0] isnt subsection_cnt
                             li -> a ".first-depth", "href":"", "#{documentModel.get('subsection')}"
                             subsection_cnt = order_arr[0]
                          indent_sz = (order_arr.length - 1) * 20
                          style_val = "text-indent:"+indent_sz+"px"
                          if order_arr.length is 2
                              depth_val="second-depth"
                          else if order_arr.length is 3
                              depth_val="third-depth"
                          if cur_url_1 is cur_url_2 
                             li '.active', -> a "class":depth_val, "id":"menu_anchor", "href": "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"
                          else
                             li '.inactive', -> a "class":depth_val, "href": "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"
                      li -> a ".first-depth", "href":"", "종합테스트"
                      li '.inactive', -> a "class":"second-depth", "href": "/cornertest/", "Cornerstone Framework Test"

            div '.span9.well', 'style':'float: left;', ->
                a '#mobile_anchor', ""
                # Document
                article '.page',
                    'typeof': 'sioc:page'
                    about: h @document.url
                    -> @content
                #a 'href':'#mobile_anchor', "go to mobile_anchor"
            
            div '.span9.well', 'style':'float: right;', ->
            	"<a href='http://www.sktelecom.com' target='_blank'>SKTELECOM</a>에 의해 작성된 <a href='http://cornerstone.sktelecom.com/livedoc' target='_blank'>Cornerstone 개발자 문서</a>는 <a href='http://creativecommons.org/licenses/by/3.0/deed.ko' target='_blank'>크리에이티브 커먼즈 저작자표시 3.0 라이선스</a>에 따라 이용할 수 있습니다."

            # Include our scripts
            #text @getBlock('scripts').add([
            #"./script.js"
            #]).toHTML()

            script src: './smartanchor.js'

            div '.span9', 'style':'float: right;', ->
                i_cnt = 0
                idx = -1
                cur_url = @document.url
                tag.documents.forEach (documentModel) ->
                                  doc_url = "#{documentModel.get('url')}"
                                  if doc_url is cur_url
                                     idx = i_cnt
                                  i_cnt = i_cnt + 1
                prev_idx = idx - 1
                next_idx = idx + 1
                #p -> tag.documents[idx].get('url') + " " + prev_idx + " " + idx + " " + next_idx

                #div ".pos_fixed_all", ->
                div "#pos_fixed_btn", 'style':'float: right;', ->
                  div ".btn-group", -> 
                    a ".btn.btn-small", "href":"#menu_anchor", -> "Menu"
                  div ".btn-group", -> 
                    if prev_idx isnt -1
                        a ".btn.btn-small", "href":"."+tag.documents[prev_idx].get('url')+".html", -> 
                            i ".icon-chevron-left", -> ""
                    a ".btn.btn-small", "href":"#mobile_anchor", -> "Top"
                    if next_idx isnt i_cnt
                        a ".btn.btn-small", "href":"."+tag.documents[next_idx].get('url')+".html", -> 
                            i ".icon-chevron-right", -> ""
                #script -> "$('.pos_fixed_all').hide(); setTimeout(function() { $('.pos_fixed_all').show() }, 3000);"
                if cur_url isnt  "/4_3_10_range_input" and cur_url isnt "/4_4_01_scroll_view"
                    script -> "$('#pos_fixed_btn').addClass('pos_fixed_all');"
