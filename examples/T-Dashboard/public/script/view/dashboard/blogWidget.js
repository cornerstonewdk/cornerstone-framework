;define(
	[
		'jquery', 
		'backbone', 
		'template!../../../template/dashboard/blogWidget',
		'template!../../../template/dashboard/blogCell'
	], function(
		$, 
		Backbone, 
		template,
		cellTemplate
	){
	var BlogWidget = Backbone.View.extend({
		el : 'div#blogWidget',
		
		initialize: function() {
			
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			$.getJSON("/t-dashboard/getSktBlogRss").success(function(json) {
				self.drawList(json.item);
			});
		},
		
		drawList: function(data) {
			for(var i = 0; i < Math.min(data.length, 5); i++) {
				var rssItem = data[i];
				this.$el.find('ul#blogWidgetList').append(cellTemplate(rssItem));
			}
			
			$('div#blogWidget').parent().spinner('hide');
		},
		
	});
	
	return BlogWidget;
});