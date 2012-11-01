var BackgroundApis = function() {};

BackgroundApis.prototype.forapi = function(callback,param) {
	srt.exec(callback, null, 'Background', 'for', [param]);
};

BackgroundApis.prototype.forstopapi = function() {
	srt.exec(null, null, 'Background', 'stop', []);
};

BackgroundApis.prototype.fibonacci = function(callback,param) {
	srt.exec(callback, null, 'Background', 'fibonacci', [param]);
};

srt.addConstructor(function() {
	srt.addPlugin('BackgroundApis', new BackgroundApis());
});