# Marked Plugin for DocPad
[Markdown](http://daringfireball.net/projects/markdown/) rendering for [DocPad](https://docpad.org), using [Robotskirt](https://github.com/benmills/robotskirt)

Convention:	`.html.md|markdown`


## Install

```
npm install --save docpad-plugin-robotskirt
```

## Configure
For information on customising your plugin configuration you can refer to the [DocPad FAQ](https://github.com/bevry/docpad/wiki/FAQ)

### Robotskirt Options
You can customise the [Robotskirt](https://github.com/benmills/robotskirt) options using the `robotskirtOptions` object. By default we use:

``` coffee
plugins
	robotskirt:
		robotskirtOptions:
			EXT_AUTOLINK: true
			EXT_FENCED_CODE: true
			EXT_LAX_SPACING: true
			EXT_NO_INTRA_EMPHASIS: true
			EXT_SPACE_HEADERS: true
			EXT_STRIKETHROUGH: true
			EXT_SUPERSCRIPT: true
			EXT_TABLES: true
			HTML_SKIP_HTML: false
			HTML_SKIP_STYLE: false
			HTML_SKIP_IMAGES: false
			HTML_SKIP_LINKS: false
			HTML_EXPAND_TABS: false
			HTML_SAFELINK: false
			HTML_TOC: false
			HTML_HARD_WRAP: false
			HTML_USE_XHTML: true
			HTML_ESCAPE: false
```

### SmartyPants

It makes "smart" punctuation. See more on [its homepage](http://daringfireball.net/projects/smartypants). Default is true:

``` coffee
plugins:
	robotskirt:
		smartypants: true
```

### Hightlight

It supports highlighting code blocks at build time. Following is using [highlight.js](https://github.com/isagalaev/highlight.js).

``` coffee
plugins:
	robotskirt:
		highlight: (code, lang)->
			has = lang && hl.LANGUAGES.hasOwnProperty(lang.trim())

			open = if has then '<pre><code class="lang-'+lang.trim()+'">' else '<pre><code>'
			body = if has then hl.highlight(lang, code).value else hl.highlightAuto(code).value
			close = '</code></pre>'

			return open + body + close
```

### Inline

You can add your markup in only normal text blocks. Next example is Twitter tag exmaple. `@pismute` will be rendered `<a href="https://twitter.com/pismute">@pismute</a>`:

``` coffee
inline: (src, hash)->
	out = src

	#for people
	out = out.replace /(^|[ \t]+)@([a-zA-Z0-9]+)/g, (whole, m1, m2) ->
		hash m1 + '<a href="https://twitter.com/' + m2 + '">@' + m2 + '</a>'

	#for hash tag·
	out = out.replace /(^|[ \t]+)#([ㄱ-ㅎ가-힣a-zA-Z0-9]+)/g, (whole, m1, m2) ->
		hash m1 + '<a href="https://twitter.com/search?q=%23' + escapeURL(m2) + '&src=hash">#' + m2 + '</a>'

	return out
```

## History
You can discover the history inside the `History.md` file

## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2012 [Bevry Pty Ltd](http://bevry.me)
