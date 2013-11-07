
define( [ 'backbone', 'template!view/page3' ], function( Backbone, template ) {
	
	return Backbone.View.extend( {

		el: 'section#page3',

		render: function() {
			// page3.template 템플릿을 렌더링한 결과를 el의 하부에 추가한다.
			this.$el.html( template() );
			return this;
		},

		events: {
			'click button.prev': 'prevPage'
		},

		prevPage: function() {
			location.href = '#page2';
		}
	} );
} );
