define(['jquery', 'backbone', 'template!/template/index', 'chart'], function($, Backbone, template, chart){
	var IndexView = Backbone.View.extend({
		el : $('#contentsView'),
		
		initialize: function() {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('ul.nav > li').removeClass('active');
			$('#index_menu').addClass('active');
			
			$.getJSON("data/line.json", function (msg) {
				$("#lineChart").featuredChart({
					margin:[50, 50, 50, 50],
					chartType:"line",
					data:msg,
					color:["lightpink", "darkgray", "lightblue"]
				});
			});
		},
		
	});
	
	return IndexView;
});