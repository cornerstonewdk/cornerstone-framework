var PageLoading = function() {};

PageLoading.prototype.getPageLoadingTime = function(successcallback,errorcallback) {
	srt.exec(successcallback, errorcallback, 'PageLoading', 'getPageLoadingTime', []);
};

PageLoading.prototype.getLoadDataUrl = function(successcallback,errorcallback) {
	srt.exec(successcallback, errorcallback, 'PageLoading', 'getLoadDataUrl', []);
};

srt.addConstructor(function() {
	srt.addPlugin('PageLoading', new PageLoading());
});