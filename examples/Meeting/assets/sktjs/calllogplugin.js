var CallLog = function() {};

CallLog.prototype.list = function(successCallback, failureCallback,params) {
	srt.exec(successCallback, failureCallback, 'CallLog', 'list', [ params ]);
};

srt.addConstructor(function() {
	srt.addPlugin('CallLog', new CallLog());
});