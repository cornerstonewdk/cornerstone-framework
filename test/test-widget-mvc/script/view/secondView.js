define(['jquery', 'backbone', 'template!/template/second'], function($, Backbone, template){
	var IndexView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('ul.nav > li').removeClass('active');
			$('#second_menu').addClass('active');
		},
		
	});
	
	return IndexView;
});