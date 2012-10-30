var SMSReceiver = function() {};

SMSReceiver.prototype.onSMS = function(callback) {
	srt.exec(callback, null, 'SMSReceiver', 'onSMS', []);
};

SMSReceiver.prototype.stop = function() {
	srt.exec(null, null, 'SMSReceiver', 'stop', []);
};

srt.addConstructor(function() {
	srt.addPlugin('SMSReceiver', new SMSReceiver());
});