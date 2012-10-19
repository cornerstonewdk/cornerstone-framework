define([
		'gesture-view',
		'jquery', 
		'backbone',
		'template!/template/lteReport/lteReport',
		'observer',
		'widget-chart',
		'style!/style/lteReport/lteReportStyle'
	], function(
		GestureView,
		$, 
		Backbone, 
		template,
		Observer
	){
	var LteReportView = GestureView.extend({
		el : 'div#contentsView',
		
		branchList: null,
		
		selectedBranch: '1',
		
		initialize: function() {
			//지점 데이터 생성
			this.branchList = {
				'1': {'name': '강남지점(신)'},
				'2': {'name': '강북지점(신)'},
				'3': {'name': '보라매지점(신)'},
				'4': {'name': '테크노마트지점(신)'},
				'5': {'name': '부산지점'},
				'6': {'name': '대구지점'},
				'7': {'name': '목포지점'},
				'8': {'name': '대전지점'},
				'9': {'name': '속초점'},
			};
			
			//각 지점들 현재까지 개통수 임시 생성
			for(var branchCode in this.branchList) {
				var branchInfo = this.branchList[branchCode];
				
				branchInfo['result'] = this.randomNumber(100, 500);
			}
			
			var currentHour = new Date().getHours();
			currentHour = Math.min(currentHour, 17);
			
			//각 지점들 차트용 임시 데이터 생성
			for(var branchCode in this.branchList) {
				var branchInfo = this.branchList[branchCode];
				
				var values = new Array();
				for(var i = 9; i < currentHour; i++) {
					values.push({
						'x': i,
						'y': this.randomNumber(10, 50)
					});
				}
				
				var timeData = new Array();
				timeData.push({
					'key': '개통수',
					'values': values
				});
				
				branchInfo['timeData'] = timeData;
			}
			
			//각 지점들 차트용 임시 데이터 생성
			for(var branchCode in this.branchList) {
				var branchInfo = this.branchList[branchCode];
				
				var values = new Array();
					values.push({
						'label': '겔럭시S3',
						'value': this.randomNumber(50, 200)
					});
					values.push({
						'label': '겔럭시노트2',
						'value': this.randomNumber(50, 200)
					});
					values.push({
						'label': '아이폰5',
						'value': this.randomNumber(50, 200)
					});
					values.push({
						'label': '옵티머스G',
						'value': this.randomNumber(50, 200)
					});
					values.push({
						'label': '기타',
						'value': this.randomNumber(50, 200)
					});
				
				var pieData = new Array();
				pieData.push({
					'key': '개통단말기',
					'values': values
				});
				
				branchInfo['deviceData'] = pieData;
			}
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			$('.nav:not(.nav-list) > li').removeClass('active');
			$('#lte_report_menu').addClass('active');
			
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
		
		//랜덤 숫자 생성
		randomNumber: function(n1, n2) {
			return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
		},
	});
	
	return new LteReportView;
});