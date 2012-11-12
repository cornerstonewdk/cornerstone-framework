define([
		'gesture-view',
		'jquery', 
		'backbone',
		'util/dummyDataUtil', 
		'template!../template/lteReport/lteReport',
		'observer',
		'widget-chart',
		'style!../style/lteReport/lteReportStyle'
	], function(
		GestureView,
		$, 
		Backbone, 
		DummyDataUtil, 
		template,
		Observer
	){
	var LteReportView = GestureView.extend({
		el : 'div#contentsView',
		
		branchList: null,
		
		selectedBranch: '1',
		
		initialize: function() {
			//지점 데이터 생성			
			this.branchList = DummyDataUtil.makeBranchData();
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			for(var branchCode in this.branchList) {
				var branchInfo = this.branchList[branchCode];
				$('ul[data-branchlist]').append('<li><a data-branchcode="' + branchCode + '">' + branchInfo['name'] + '</a></li>');
			}
			
			$('a[data-branchcode="' + this.selectedBranch + '"]').parent().addClass('active');
			this.changeBranchInfo(this.selectedBranch);
		},
		
		//이벤트 정의
		events: {
			'click a[data-branchcode]': 'menuClick',
		},
		
		//지점 클릭
		menuClick: function(e) {
			var prevBranch = this.selectedBranch;
			this.selectedBranch = $(e.target).attr('data-branchcode');
			
			if(prevBranch == this.selectedBranch) return;
			
			$('ul.nav.nav-list > li').removeClass('active');
			$(e.target).parent().addClass('active');
			
			this.changeBranchInfo(this.selectedBranch);
		},
		
		//지점 정보 변경
		changeBranchInfo: function(branchCode) {
			var branchInfo = this.branchList[branchCode];
			
			$('h2[data-branchname]').html(branchInfo['name']);
			$('p[data-branchresult]').html('오늘 현재까지 개통수 ' + branchInfo['result'] + '대');
			
			$('div[data-timechart]').featuredChart({
				chartType : "bar",
				data : branchInfo['timeData']
			});
			$('div[data-devicechart]').featuredChart({
				chartType : "pie",
				data : branchInfo['deviceData']
			});
		},
	});
	
	return new LteReportView;
});