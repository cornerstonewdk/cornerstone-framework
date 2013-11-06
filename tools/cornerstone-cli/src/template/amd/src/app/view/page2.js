
define( [ 'backbone', 'template!view/page2' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page2',

		render: function() {
			// page2.template 템플릿을 렌더링한 결과를 el의 하부에 추가한다.
			this.$el.html( template() );
			return this;
		},

		events: {
			'click button.prev': 'prevPage',
			'click button.next': 'nextPage'
		},

		prevPage: function() {
			location.href = '#page1';
		},

		nextPage: function() {
			location.href = '#page3';
		}
	} );
} );
