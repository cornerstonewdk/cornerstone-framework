define([
		'gesture-view',
		'jquery', 
		'backbone',
		'util/dummyDataUtil', 
		'template!../template/lteReport/lteReport',
		'widget-chart',
		'style!../style/lteReport/lteReportStyle'
	], function(
		GestureView,
		$, 
		Backbone, 
		DummyDataUtil, 
		template
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

				$('ul[data-branchlist]').append('<li class="list-group-item"><a data-branchcode="' + branchCode + '">' + branchInfo['name'] + '</a></li>');
			}
			
			$('a[data-branchcode="' + this.selectedBranch + '"]').parent().addClass('active');
			this.changeBranchInfo(this.selectedBranch);
		},
		
		/*
		 * 이벤트 정의
		 */
		events: {
			
			'click ul[data-branchlist] > li': 'menuClick'
		},
		
		/*
		 * 지점 클릭
		 */
		menuClick: function(e) {
			
			var prevBranch = this.selectedBranch;
			if( e.target.tagName === 'A' )
				this.selectedBranch = $(e.target).attr('data-branchcode');
			else 
				this.selectedBranch = $(e.target).find('a').attr('data-branchcode');
			
			if(prevBranch == this.selectedBranch) return;
			
			$('#lteReport ul.list-group > li').removeClass('active');

			if( e.target.tagName === 'A' )
				$(e.target).parent().addClass('active');
			else 
				$(e.target).addClass('active');
			
			this.changeBranchInfo(this.selectedBranch);
		},
		
		/*
		 * 지점 정보 변경
		 */
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