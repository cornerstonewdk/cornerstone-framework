define( [ 'device' ], function () {
	return {
		launch: function () {
			alert( 'Application Launched ( amd loading )' );
			
			navigator.battery.addEventListener( 'chargingchange', function() {
				alert("navigator.battery.charging = " + navigator.battery.charging);
				alert("navigator.battery.level = " + navigator.battery.level);
			}, false );
		}
	};
} );