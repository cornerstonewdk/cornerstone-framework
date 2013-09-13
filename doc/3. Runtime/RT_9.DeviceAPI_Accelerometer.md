<!--
layout: 'post'
section: 'Cornerstone Framework'
title: 'Accelerometer'
outline: 'Accelerometer 모듈은 디바이스의 가속도 센서를 이용하여 현재 디바이스의 가속도 정보를 얻는 기능을 제공한다.  '
date: '2012-11-16'
tagstr: 'runtime'
subsection: 'Runtime'
order: '[6, 5 ,1]'
thumbnail: '6.1.00.runtime_structure.png'
-->

----------

# Device API Reference 

----------

## Accelerometer  

### 1) Overview

- Accelerometer 모듈은 디바이스의 가속도 센서를 이용하여 주기적인 가속도 정보를 얻거나 현재 디바이스의 가속도 
정보를 얻는 기능을 제공한다. 

### 2) Specification

<table class="table table-bordered">
	<tr>
		<th class="fixed_table">Interface</th>
		<th class="fixed_table">Spec</th>
		<th>관련 표준</th>
	</tr>
	<tr>
		<td class="fixed_table">DeviceAcceleration </td>
		<td class="fixed_table">interface DeviceAcceleration  {
	readonly attribute float x;
	readonly attribute float y;
	readonly attribute float z;
};
		</td>
		<td><a href="http://www.w3.org/TR/2011/WD-orientation-event-20111201/">W3C Geolocation WG</a></td>
	</tr>

	<tr>
		<td class="fixed_table">DeviceMotionEvent </td>
		<td class="fixed_table">interface DeviceMotionEvent : Event {
	readonly attribute DeviceAcceleration? acceleration;
	readonly attribute DeviceAcceleration? accelerationIncludingGravity;
	readonly attribute DeviceRotationRate? rotationRate;
	readonly attribute double? interval;
}
		</td>
		<td><a href="http://www.w3.org/TR/2011/WD-orientation-event-20111201/">W3C Geolocation WG</a></td>
	</tr>

	<tr>
		<td class="fixed_table">AccelerationSuccessCallback</td>
		<td class="fixed_table">interface AccelerationSuccessCallback {
	void onsuccess(DeviceAcceleration acceleration);
};
		</td>
		<td>SKT 자체 규격</td>
	</tr>

	<tr>
		<td class="fixed_table">ErrorCallback</td>
		<td class="fixed_table">interface ErrorCallback {
	void onerror(DeviceAPIError error);
};
		</td>
		<td>SKT 자체 규격</td>
	</tr>

	<tr>
		<td class="fixed_table">Accelerometer</td>
		<td class="fixed_table">interface  Accelerometer { 
	void getCurrentAcceleration(AccelerationSuccessCallback successCallback,optional ErrorCallback errorCallback);
};
		</td>
		<td>SKT 자체 규격</td>
	</tr>
</table>

### 3) Module Method

- getCurrentAcceleration()

	- Description : 디바이스로 부터 현재의 가속도 정보를 얻는 기능 (1회) 
	- W3C Spec : spec 미정의 (자체 규격) 
	- Type : API 
	- Return Value : void
	- Arg1 : AccelerationSuccessCallback
	- Arg2 : ErrorCallback
	- Full Example :
			
			function accelerationSuccessCB(acceleration){
				if (acceleration.x == 0)
					alert("The device is not moving in the xAxis");
				else
					alert("The device is moving in the xAxis");
			}

 			function errorCB(error){
				alert(error.message);
 	     	}

			navigator.accelerometer.getCurrentAcceleration(accelerationSuccessCB,errorCB);

### 4) Module Event 

본 섹션은  [window.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener) 를 통하여 Runtime내부 Window 객체에서 등록 가능한 Accelererometer 이벤트를 설명한다. 

- Event Name : devicemotion

	- Description : device motion . 디바이스로 부터 현재의 가속도 정보를 얻는 기능 (주기적) 
	- W3C Spec : Proposed Recommendation in Geolocation Working Group
	- Listener Arg Type : DeviceMotionEvent
	- Full Example :
		
			 window.addEventListener("devicemotion", function(event) {
			              // event.accelerationIncludingGravity
			              alert("accelerationIncludingGravity.x = "+ event.accelerationIncludingGravity.x +
			         	  "\naccelerationIncludingGravity.y = " + event.accelerationIncludingGravity.y +
			        	  "\naccelerationIncludingGravity.z = " + event.accelerationIncludingGravity.z);
			     	}, true);

