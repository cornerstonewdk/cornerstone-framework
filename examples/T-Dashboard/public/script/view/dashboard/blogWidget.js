;define(
	[
		'jquery', 
		'backbone', 
		'template!../../../template/dashboard/blogWidget',
		'template!../../../template/dashboard/blogCell',
		'yql'
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
			
			var statement = "SELECT * FROM rss where url = 'http://blog.sktworld.co.kr/rss'";
			$.queryYQL(statement, 'json', undefined, function(data){
				self.drawList(data.query.results.item);
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