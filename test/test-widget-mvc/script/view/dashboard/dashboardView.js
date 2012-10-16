define(
	[
		'gesture-view',
		'jquery', 
		'backbone', 
		'template!/template/dashboard',
		'isotope', 
		'chart',
		'style!/style/dashboard/dashboardStyle',
		'style!/style/chart/nv.d3',
	], function(
		GestureView,
		$, 
		Backbone, 
		template
	){
	var IsotopeView = GestureView.extend({
		el : '#contentsView',
		
		initialize: function() {
			
		},
		
		events: {
			'click div#dashboard_lte': 'lteClick',
			'click div#dashboard_voc': 'vocClick',
			'click div#dashboard_policy': 'policyClick',
			'click div#dashboard_sns': 'snsClick',
			'click div#dashboard_facebook': 'facebookClick',
			'click div#dashboard_youtube': 'youtubeClick',
		},
		
		lteClick: function(e) {
			
		},
		
		vocClick: function(e) {
			
		},
		
		policyClick: function(e) {
			document.location='#pricePolicy';
		},
		
		snsClick: function(e) {
			
		},
		
		facebookClick: function(e) {
			
		},
		
		youtubeClick: function(e) {
			
		},
		
		render: function() {
			this.$el.html(template());
			
			$('ul.nav > li').removeClass('active');	//dashboard는 index 이므로 active 상태가 없다
			
			$(function() {
				var $container = $('#dashboard_container');

				$container.isotope({
					itemSelector : '.dashboardItem'
				});
			});
			
			$.getJSON("data/bar.json").success(function(json) {
				$("#example").featuredChart({
					chartType : "bar",
					data : json
				});
			});
		},
		
	});
	
	return IsotopeView;
});