
define( [ 'underscore', 'backbone', 'template!view/tags' ], function( _, Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page-tags',

		// 문서들을 태그별로 나누어서 재구성한다.
		initialize: function() {

			// 태그 목록을 구한다.
			var tags = [];
			this.collection.each( function( doc ) {
				tags = _.union( tags, doc.get( 'tags' ) || [] );
			} );

			// 각 태그별로 문서를 검색해서 분류한다.
			var list = [];
			for ( var i in tags ) {

				// 해당 태그를 가지고 있는 문서들을 검색한다.
				var docs = this.collection.filter( function( doc ) {
					return _.contains( doc.get( 'tags' ) || [], tags[ i ] );
				} );

				// Model을 JSON으로 변환
				docs = _.map( docs, function( doc ) {
					return doc.toJSON();
				} );

				list.push( { tag: tags[ i ], docs: docs } );
			}

			this.listByTags = list;
		},

		render: function() {
			this.$el.html( template( this.listByTags ) );
			return this;
		}
	} );
} );
