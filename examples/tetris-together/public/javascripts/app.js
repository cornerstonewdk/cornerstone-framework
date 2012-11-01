define(
	[
		'jquery',
		'underscore',
		'backbone',
		'router',
		'socketio'
	],
	function(
		$, 
		_, 
		backbone, 
		Router, 
		Socketio
	) {
		initialize = function() {
			//socket.io 연결
			socket = io.connect();
			Router.initialize();
		}
		
		return {
			initialize: initialize
		}
	}
);
