package co.kr.skr.plugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.skt.runtime.api.LOG;
import org.skt.runtime.api.Plugin;
import org.skt.runtime.api.PluginResult;
import org.skt.runtime.api.RuntimeInterface;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

public class SmsReceivePlugin extends Plugin {

	private String callbackId;                      // The ID of the callback to be invoked with our result

	private final static String RECEIVE_ACTION = "com.sec.mms.intent.action.SMS_RECEIVED";

	private SMSPluginReceiver receiver; 

	@Override
	public void setContext(RuntimeInterface ctx) {
		// TODO Auto-generated method stub
		super.setContext(ctx);
		receiver = new SMSPluginReceiver();
	}


	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {

		if(action.equalsIgnoreCase("onSMS")){		

			if (this.callbackId != null) {
				return new PluginResult(PluginResult.Status.ERROR, "sms listener already running.");
			}

			this.callbackId = callbackId;

			IntentFilter filter = new IntentFilter();
			//sms action
			filter.addAction(RECEIVE_ACTION);

			if(receiver == null) 
				receiver = new SMSPluginReceiver();

			ctx.registerReceiver(receiver, filter);		
			LOG.e("SMS Receiver", "handler is correctly seted");

			// Don't return any result now, since status results will be sent when events come in from broadcast receiver 
			PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
			pluginResult.setKeepCallback(true);

			return pluginResult;
		}

		else if(action.equalsIgnoreCase("stop")){

			removeSMSHandelr();

			PluginResult result = new PluginResult(PluginResult.Status.OK, "handler is correctly removed");
			result.setKeepCallback(false);
			this.success(result, this.callbackId);		

			this.callbackId = null;

			LOG.e("SMS Receiver", "handler is correctly removed");

			return new PluginResult(PluginResult.Status.OK);
		}

		return new PluginResult(PluginResult.Status.NO_RESULT);
	}


	@Override
	public boolean isSynch(String action) {
		// TODO Auto-generated method stub
		if(action.equals("onSMS")){
			return true;
		}

		return super.isSynch(action);
	}


	private void removeSMSHandelr(){
		if(receiver != null){
			ctx.unregisterReceiver(receiver);
			receiver = null;
		}
	}
	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		removeSMSHandelr();
	}

	/**
	 * Create a new plugin result and send it back to JavaScript
	 * 
	 * @param connection the network info to set as navigator.connection
	 */
	private void sendtoCallback(JSONObject info, boolean keepCallback) {
		if (this.callbackId != null) {
			PluginResult result = new PluginResult(PluginResult.Status.OK, info);
			result.setKeepCallback(keepCallback);
			this.success(result, this.callbackId);
		}
	}

	public class SMSPluginReceiver extends BroadcastReceiver{

		@Override
		public void onReceive(Context context, Intent smsIntent) {
			// TODO Auto-generated method stub
			LOG.e("OnSMS","sms is arrived!!");

			Bundle data = smsIntent.getExtras();
			String from = data.getString("DisplayName");
			from = from.replace("-", "");

			LOG.e("OnSMS::sender",from);

			JSONObject returnval = new JSONObject();

			try {
				returnval.put("from", from);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			sendtoCallback(returnval,true);
		}

	}
}
