---
name: ''
layout: 'jsonshell'
---

# Post Listing
text @partial 'list-document-json.html.coffee', {
	documents: @getCollection('posts').toJSON()
}

