;define(
	[
		'jquery', 
		'backbone',
        'model/blog',
        'collection/blogs',
		'template!../../../template/dashboard/blogWidget',
		'template!../../../template/dashboard/blogCell',
		'yql'
	], function(
		$, 
		Backbone,
        Blog,
        Blogs,
		template,
		cellTemplate
	){
	var BlogWidget = Backbone.View.extend({
		el : 'div#blogWidget',
		
		initialize: function() {
		},
		
		render: function() {
			var data = [];
            var self = this;
			
			$(this.el).html(template());
			
			var statement = "SELECT * FROM rss where url = 'http://blog.sktworld.co.kr/rss'";

            /**
             * T-Dashboard 블로그 Default 리스트 기능 추가;
             * 코너스톤 Sync를 이용해서 최초 1회 서버 통신시만 로딩이 생기며 서버 통신으로 가져온 데이터를 로컬에 저장하므로
             * 이후 직전에 가져온 데이터를 로딩없이 클라이언트에서 직접 목록을 만들고, 서버 통신이 완료되면 최신정보로 목록을 업데이트한다.
             */
            // 로컬저장소에서 데이터가 있으면 서버 통신전에 뷰에 드로잉.
            Blogs.fetch();
            Blogs.each(function(model) {
                data.push({
                    guid: model.get("guid"),
                    title: model.get("title"),
                    link: model.get("link")
                });
            });
            data.length && self.drawList(data);

            // YQL 서버 통신
			$.queryYQL(statement, 'json', undefined, function(data){
                data = data.query.results.item;

                // 서버에서 가져온 데이터를 아이템 단위로 모델에 저장
                $(data).each(function(i) {
                    self.setModel(data[i]);
                });
				self.drawList(data);
			});
		},

        setModel: function(data) {
            var blog = new Blog();
            var isExist = false;
            blog.set({
                guid: data.guid,
                title: data.title,
                link: data.link
            });

            // 중복된 모델인지 확인
            var duplicateModel = Blogs.find(function(model) {
                return model.get("guid") === blog.get("guid");
            });

            // 중복된 모델이 아닌 경우만 콜렉션에 모델을 추가하여 로컬스토리지에 저장
            !duplicateModel && Blogs.create(blog);
        },
		
		/*
		 * 리스트를 그려준다.
		 */
		drawList: function(data) {
            // 로컬저장소와 서버통신을 통해 드로잉이 2회 발생하므로 리스트 초기화
            this.$el.find('ul#blogWidgetList').html("");
			for(var i = 0; i < Math.min(data.length, 5); i++) {
				var rssItem = data[i];
				this.$el.find('ul#blogWidgetList').append(cellTemplate(rssItem));
			}

			$('div#blogWidget').parent().spinner('hide');
		},
		
	});
	
	return BlogWidget;
});