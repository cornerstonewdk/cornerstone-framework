---
name: '목차'
linkTitle: 'View articles'
pageOrder: 2
layout: 'page'
url: './toc.html'
---

# Post Listing
text @partial 'list-documents.html.coffee', {
	documents: @getCollection('posts').toJSON()
}

