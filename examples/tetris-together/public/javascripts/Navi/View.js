var View = Class.create({
	
	ViewClass: null,
	view: null,
	routeToken: null,
	
	domData: null,
	
	//생성자
	initialize: function(routeToken, ViewClass) {
		this.ViewClass = ViewClass;
		this.routeToken = routeToken;
		this.view = new ViewClass();
	},
	
	viewDidDisappear: function(direction) {
		console.log('page move to \'' + direction + '\'');
		if(typeof(this.view.viewDidDisappear) != 'undefined') this.view.viewDidDisappear(direction);
	},
	
	backup: function() {
		console.log('\'' + this.routeToken + '\' route ' + ' backup...');
	},
	
	restore: function() {
		console.log('\'' + this.routeToken + '\' route' + ' resotre...');
		this.view.render();
		if(typeof(this.view.viewDidAppear) != 'undefined') this.view.viewDidAppear();
	},
	
	drawView: function() {
		this.view.render();
		if(typeof(this.view.viewDidAppear) != 'undefined') this.view.viewDidAppear();
	},
	
});
