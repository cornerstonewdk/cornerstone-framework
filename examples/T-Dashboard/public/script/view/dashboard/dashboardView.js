define(
	[
		'gesture-view',
		'jquery', 
		'backbone', 
		'template!/template/dashboard/dashboard',
		'isotope', 
		'widget-chart',
		'widget-scrollview',
		'style!/style/dashboard/dashboardStyle'
	], function(
		GestureView,
		$, 
		Backbone, 
		template
	){
	var DashboardView = GestureView.extend({
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
			document.location = '#lteReport';
		},
		
		vocClick: function(e) {
			document.location = '#voc';
		},
		
		policyClick: function(e) {
			document.location = '#pricePolicy';
		},
		
		snsClick: function(e) {
			document.location = '#sns';
		},
		
		facebookClick: function(e) {
			document.location = '#facebook';
		},
		
		youtubeClick: function(e) {
			document.location = '#youtube';
		},
		
		render: function() {
			this.$el.html(template());
			
			$('.nav:not(.nav-list) > li').removeClass('active');	//dashboard는 index 이므로 active 상태가 없다
			
			$(function() {
				var $container = $('#dashboard_container');

				$container.isotope({
					itemSelector : '.dashboardItem'
				});
			});
			
			//LTE 계통현황 차트 그려주기
			$.getJSON("data/bar.json").success(function(json) {
				$("#reportChart").featuredChart({
					chartType : "bar",
					data : json
				});
			});
		},
		
	});
	
	return new DashboardView;
});