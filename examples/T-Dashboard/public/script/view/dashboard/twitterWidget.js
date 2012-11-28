define(
	[
		'jquery', 
		'backbone', 
		'template!../../../template/dashboard/twitterWidget',
		'template!../../../template/dashboard/twitterTimeline',
		'widget-scrollview',
		'style!../../../style/dashboard/twitterWidgetStyle',
		'jsonp'
	], function(
		$, 
		Backbone, 
		template,
		timelineTemplate
	){
	var DashboardView = Backbone.View.extend({
		el : '#twitterWedget',
		
		twitterUpdateTimer: null, 
		
		initialize: function() {
			
		},
		
		render: function() {
			var self = this;
			
			$(this.el).html(template());
			
			//처음 한번은 타이머 상관없이 서버에서 가져오도록 강제 호출
			self.updateTwitter();
			
			//일정시간마다 (5초) 트위터서버에서 데이터를 가져온다.
//			self.twitterUpdateTimer = setInterval(function() {
//				self.updateTwitter();
//			}, 5000);
		},
		
		/*
		 * 트위터 업데이트 메서드
		 */
		updateTwitter: function() {
			var self = this;
			
			//화면이 변경되었을때 타이머가 도는것은 자원낭비이니 소스코드가 있는지 확인 후 없으면 타이머를 없앤다.
			if($('#twitterWedget').length == 0) {
				clearInterval(this.twitterUpdateTimer);
				this.twitterUpdateTimer = null;
				return;
			}
			
			Jsonp.get({
				url: 'http://search.twitter.com/search.json',
				data: {
					q: 'SKtelecom'
				},
				success: function(data) {
					self.drawList(data.results);
				},
				error: function() {
					//alert('오류가 발생하였습니다.');
				},
				timeout: 30000
			});
		},
		
		/*
		 * 트위터 서버에서 내려주는 데이터를 리스트를 그려주고 스크롤뷰의 싸이즈를 재정의하는 메서드
		 */
		drawList: function(data) {
			var ulTag = $('#thelist');
			
			//기존 데이터 제거
			ulTag.html('');
			
			for(var i = 0; i < data.length; i++) {
				var timeline = data[i];
				
				timeline['created_at'] = this.timeAgoInWords(timeline['created_at']);
				
				ulTag.append(timelineTemplate(timeline));
			}
			
			//refresh 옵션을 넣어주어 스크롤뷰의 싸이즈를 재정의 시켜준다.
			$('div[data-featured="scrollView"]').featuredScrollView('refresh');
			
			$('#twitterWedget').parent().spinner('hide');
		},
		
		/*
		 * 트위터 서버에서 내려주는 시간을 몇분 전 형식으로 포멧을 변경 해주는 메서드
		 */
		timeAgoInWords: function(date) {
			try {
		        var now = Math.ceil(Number(new Date()) / 1000),
		            dateTime = Math.ceil(Number(new Date(date)) / 1000),
		            diff = now - dateTime,
		            str;
		
		        if (diff < 60) {
		            return String(diff) + ' 초 전';
		        } else if (diff < 3600) {
		            str = String(Math.ceil(diff / (60)));
		            return str + (str == "1" ? ' 분' : ' 분') + ' 전';
		        } else if (diff < 86400) {
		            str = String(Math.ceil(diff / (3600)));
		            return str + (str == "1" ? ' 시간' : ' 시간') + ' 전';
		        } else if (diff < 60 * 60 * 24 * 365) {
		            str = String(Math.ceil(diff / (60 * 60 * 24)));
		            return str + (str == "1" ? ' 일' : ' 일') + ' 전';
		        } else {
		            return Ext.Date.format(new Date(date), 'jS M \'y');
		        }
		    } catch (e) {
		        return '';
		    }
		}
		
	});
	
	return DashboardView;
});