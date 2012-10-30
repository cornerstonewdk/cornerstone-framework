;define([
		'jquery', 
		'backbone',
		'template!../../../template/dashboard/facebookLikeWidget'
], function(
		$, 
		Backbone, 
		template
){
	var FacebookLikeWidget = Backbone.View.extend({
		el : 'div#facebookLikeWidget',

		initialize: function() {
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
		},

	});
	
	return FacebookLikeWidget;
});