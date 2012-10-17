---
name: '처음'
linkTitle: 'View articles'
pageOrder: 1
layout: 'page'
url: './index.html'
---

# Post Listing
text @partial 'list-document-main.html.coffee', {
	documents: @getCollection('posts').toJSON()
}

