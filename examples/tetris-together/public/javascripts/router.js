define(
	[
		'jquery',
		'underscore',
		'backbone',
		'Navi/View',
		'Navi/Navigation',
		'./views/IntroView',
		'./views/JoinRoomView',
		'./views/MakeRoomView',
		'./views/WaitingRoomView',
		'./views/TetrisView',
		'./views/WatchRoomView',
	],
	function(
		$,
		_,
		Backbone,
		v,
		n,
		IntroView,
		JoinRoomView,
		MakeRoomView,
		WaitingRoomView,
		TetrisView,
		WatchRoomView
	) {
		AppRouter = Backbone.Router.extend({
			navigation: null,
			
			routes: {
				'*actions': 'defaultAction'	
			},
			
			//라우팅 처리
			defaultAction: function(actions) {
				console.log('defaultAction : ' + actions);
				
				window.scrollTo(0, 0);
				switch(actions) {
					case '':
						this.navigation.push(actions, IntroView);
						break;
					case 'joinRoom':
						this.navigation.push(actions, JoinRoomView);
						break;
					case 'makeRoom':
						this.navigation.push(actions, MakeRoomView);
						break;
					case 'waitingRoom':
						this.navigation.push(actions, WaitingRoomView);
						break;
					case 'playTetris':
						this.navigation.push(actions, TetrisView);
						break;
					case 'watchRoom':
						this.navigation.push(actions, WatchRoomView);
						break;
					default:
						break;
				}				
				
			},

		});
		
		initialize = function() {
			var app_router = new AppRouter();
			app_router.navigation = new Navigation();
			
			Backbone.history.start();
		};
		
		return {
			initialize: initialize
		};
	}
);
