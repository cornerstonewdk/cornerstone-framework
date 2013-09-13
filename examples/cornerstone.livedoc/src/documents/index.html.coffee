---
name: '처음'
linkTitle: 'home'
pageOrder: 1
layout: 'page'
url: './index.html'
---

# Post Listing
text @partial 'list-document-home.html.coffee', {
	documents: @getCollection('posts').toJSON()
}

