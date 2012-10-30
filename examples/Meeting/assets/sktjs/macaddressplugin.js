var MacAddress = function() {};

MacAddress.prototype.getMacAddress = function() {
	//do sync
	var macAddress = srt.exec(null, null, 'MacAddress', 'getMacAddress', []);
	return macAddress;
};

MacAddress.prototype.getPhoneNumber = function() {
	//do sync
	var phoneNumber = srt.exec(null, null, 'MacAddress', 'getPhoneNumber', []);
	return phoneNumber;
};

MacAddress.prototype.getDeviceID = function() {
	//do sync
	var deviceID = srt.exec(null, null, 'MacAddress', 'getDeviceID', []);
	return deviceID;
};

srt.addConstructor(function() {
	srt.addPlugin('MacAddress', new MacAddress());
});