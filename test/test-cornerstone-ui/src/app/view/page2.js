define([
	'jquery',
	'underscore',
	'backbone',
	'template!view/page2',
	'style!view/page2'
], function ($, _, Backbone, template) {
	return Backbone.View.extend({

		el: 'section#page2',

		render: function (id) {
			var self = this;

			require(['template!../app/template/' + id], function (example) {
				var title = $.trim(id).replace(/css-|cs-/gi, '').replace('cs-', '').replace(/-/gi, ' ');
				self.$el.html(
					template({
						pageTitle: title,
						exampleHtml: example()
					})
				);

				$('[data-spy="scroll"]').each(function () {
					var $spy = $(this);
					$spy.scrollspy($spy.data())
				});

				if (id.match(".*carousel|.*images|.*thumbnails")) {
					require(['../app/lib/holder'], function () {
						Holder.run();
					});
				}

				if (id.match(".*range-input")) {
					require(['widget-rangeinput'], function() {
						$(".widget-range").rangeinput({
							showInput: true
						});
					});
				}

				if (id.match(".*sign")) {
					require(['widget-sign'], function () {
						$("#signature").length && $("#signature").sign();
					});
				}

				if (id.match(".*spinner")) {
					require(['widget-spinner']);
				}

				if (id.match(".*motion-captcha")) {
					require(['widget-motioncaptcha'], function () {
						$("#motion-captcha button").on("click", function (e) {
							$("#mc-canvas").remove();
							$("<canvas/>", {
								"id": "mc-canvas",
								"class": "mc-canvas"
							}).appendTo($("#motion-captcha-example")).motioncaptcha({
									errorMsg: '다시 시도해주세요.',
									successMsg: '성공',
									onSuccess: function () {
										console.log("성공");
									}
								}).on('start.cs.motionCaptcha',function (e) {
									console.log('start.cs.motionCaptcha', e);
								}).on('move.cs.motionCaptcha',function (e) {
									console.log('move.cs.motionCaptcha', e);
								}).on('end.cs.motionCaptcha',function (e) {
									console.log('end.cs.motionCaptcha', e);
								}).on('success.cs.motionCaptcha',function (e) {
									console.log('success 이벤트 감지', e);
								}).on('fail.cs.motionCaptcha', function (e) {
									console.log('fail 이벤트 감지', e);
								});
						});
						$("#motion-captcha button").trigger("click");
					});
				}

				if (id.match(".*typeahead")) {
					require(['widget-typeahead'], function () {
						$('.example-countries .typeahead').typeahead({
							name: 'countries',
							prefetch: 'data/typeahead-countries.json',
							limit: 10
						});
					});
				}

				if (id.match(".*datepicker")) {
					require(['widget-datepicker'], function () {
						$("#date-picker1, #date-picker2").datetimepicker({
							firstDisable: true,
							changeDisplay: true
						});
					});
				}

				if (id.match(".*chart")) {
					require(['widget-chart']);
				}

				if (id.match(".*scrollview")) {
					require(['widget-scrollview']);
				}

				if (id.match(".*listview")) {
					require(['widget-listview'], function () {
						$(".js-addItem").on("click", function (e) {
							getItem();
						});

						var $el = $('#listView');
						var isLoading = false;
						var html;

						$el.on("scrollEnd.cs.liveView", function() {
							console.log("scrollEndEvent");
						});

						// ID가 listView이 엘리먼트에 ListView 피쳐드 적용
						$el.length && $el.featuredListView({
							$scroller: $el.closest(".list-view-wrapper"),
							optimization: true,
							scrollEndAction: function() {
								console.log("scrollEndAction");
							}
						});

						// AJAX로 데이터를 가져오는 함수
						function getItem() {
							if (isLoading) {
								return false;
							}

							isLoading = true;

							var request = $.ajax({
								url: "data/sample-list.json",
								type: "GET",
								dataType: "json"
							});

							request.done(function (json) {
								html = '<ul class="list-group">';
								if (typeof json === "object" && json.items.length > 0) {
									$(json.items).each(function (i) {
										html += '<li class="list-group-item">';
										html += this.title;
										html += '   <div class="pull-right">'
										html += '   <span class="badge">' + this.published + '</span>';
										html += '   <span class="glyphicon glyphicon-chevron-right"></span>';
										html += '   </div>';
										html += '</li>';
									});
									html += "</ul>";
									$el.featuredListView("addItem", html);
								}
								html = "";
								isLoading = false;
							});

							request.fail(function (jqXHR, textStatus) {
								console.log("Request failed: " + textStatus);
								isLoading = false;
							});

						}
					});
				}
			});
			return this;
		},

		events: {
			'click button.next': 'nextPage'
		},

		nextPage: function () {
			location.href = '#page2';
		}
	});
});
