define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var BreadCrumb = require("util/breadcrumb");
	var PageTransition = require("util/pageTransition");
	
	/**
	 * 라우트를 정의
	 */
	var MainRouter = Backbone.Router.extend({
		/*
		 * 프레그먼트 문자를 기준으로 라우트 정의
		 */
		routes : {
			'' : 'dashboardRoute',
			'index' : 'dashboardRoute',
			'pricePlan' : 'pricePlanRoute',
			'pricePlan/:id' : 'pricePlanRoute',
			'lteReport' : 'lteReportRoute',
			'voc' : 'vocRoute',
			'voc/:id' : 'vocRoute',
			'makePricePlan': 'makePricePlanRoute',
			'makePricePlan/:data': 'makePricePlanRoute',

			'*actions' : 'defaultAction'
		},

        initialize: function() {

        },
		
		/*
		 * 대쉬보드 요청시 처리내용
		 */
		dashboardRoute : function() {
			require(["dashboardView"], function(DashboardView) {
				var direction = BreadCrumb.manager.route('index', 'T-Dashboard');
				PageTransition.page.transition(direction, DashboardView);
			});
		},
		
		/*
		 * LTE 개통정보 요청시 처리내용
		 */
		lteReportRoute : function() {
			require(["lteReportView"], function(LteReportView) {
				var direction = BreadCrumb.manager.route('lteReport', 'LTE 개통 통계');
				PageTransition.page.transition(direction, LteReportView);
			});
		},
		
		/*
		 * 정책 요청시 처리내용
		 */
		pricePlanRoute : function(id) {
			require(["pricePlanView"], function(PricePlanView) {
				var direction = BreadCrumb.manager.route('pricePlan', '정책');
				PricePlanView['selectedPricePlanId'] = id || null;
				PageTransition.page.transition(direction, PricePlanView);
			});
		},
		
		/*
		 * VOC 요청시 처리내용
		 */
		vocRoute : function(id) {
			require(["vocView"], function(VocView) {
				var direction = BreadCrumb.manager.route('voc', 'VOC');
				VocView['selectedVocId'] = id || null;
				PageTransition.page.transition(direction, VocView);
			});
		},
		
		/*
		 * 정책 생성, 수정 요청시 처리내용
		 */
		makePricePlanRoute: function(data) {
			require(["makePricePlanView"], function(MakePricePlanView) {
				var title = (typeof(data) == 'undefined') ? '새로운 정책' : '정책 수정';
				var direction = BreadCrumb.manager.route('makePricePlan', title);
				MakePricePlanView.selectPlanData = data || null;
				PageTransition.page.transition(direction, MakePricePlanView);
			});
		},

		defaultAction : function(actions) {
			console.log('default route : ' + actions);
		},
	});

	new MainRouter();

	Backbone.history.start();
}); 