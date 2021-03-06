/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function registerPushwooshAndroid() {

 	var pushNotification = window.plugins.pushNotification;
	console.log(pushNotification);
	//set push notifications handler
	document.addEventListener('push-notification',
		function(event)
		{
            var title = event.notification.title;
            var userData = event.notification.userdata;

            //dump custom data to the console if it exists
            if(typeof(userData) != "undefined") {
				alert('user data: ' + JSON.stringify(userData));
			}

			//and show alert
			alert(title);

			//stopping geopushes
			//pushNotification.stopGeoPushes();
		}
	);

	//initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
	pushNotification.onDeviceReady({ projectid: "glossy-buffer-622", appid : "85016-E80FD" });

	//register for push notifications
	pushNotification.registerDevice(
		function(token)
		{
			alert(token);
			//callback when pushwoosh is ready
			onPushwooshAndroidInitialized(token);
		},
		function(status)
		{
			console.log("failed to register: " +  status);
		    alert(JSON.stringify(['failed to register ', status]));
		}
	);
}

function onPushwooshAndroidInitialized(pushToken)
{
	//output the token to the console
	alert('push token: ' + pushToken);

	var pushNotification = window.plugins.pushNotification;
	
	//if you need push token at a later time you can always get it from Pushwoosh plugin
	pushNotification.getPushToken(
		function(token)
		{
			alert('push token: ' + token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			alert('Pushwoosh HWID: ' + token);
		}
	);
	
	pushNotification.getTags(
		function(tags)
		{
			alert('tags for the device: ' + JSON.stringify(tags));
		},
		function(error)
		{
			alert('get tags error: ' + JSON.stringify(error));
		}
	);
	 

	//set multi notificaiton mode
	//pushNotification.setMultiNotificationMode();
	//pushNotification.setEnableLED(true);
	
	//set single notification mode
	//pushNotification.setSingleNotificationMode();
	
	//disable sound and vibration
	//pushNotification.setSoundType(1);
	//pushNotification.setVibrateType(1);
	
	pushNotification.setLightScreenOnNotification(false);
	
	//goal with count
	//pushNotification.sendGoalAchieved({goal:'purchase', count:3});
	
	//goal with no count
	//pushNotification.sendGoalAchieved({goal:'registration'});

	//setting list tags
	//pushNotification.setTags({"MyTag":["hello", "world"]});
	
	//settings tags
	pushNotification.setTags({deviceName:"hello", deviceId:10},
		function(status) {
			alert('setTags success');
		},
		function(status) {
			alert('setTags failed');
		}
	);

	//Pushwoosh Android specific method that cares for the battery
	//pushNotification.startGeoPushes();
}
