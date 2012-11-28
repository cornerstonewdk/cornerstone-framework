package co.kr.skr.plugin;

import org.json.JSONArray;
import org.skt.runtime.api.Plugin;
import org.skt.runtime.api.PluginResult;
import org.skt.runtime.api.RuntimeInterface;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;
import android.webkit.WebSettings.PluginState;

public class MacAddressPlugin extends Plugin {

	private String callbackId;                      // The ID of the callback to be invoked with our result
	
	private WifiManager wifiManager;
	private TelephonyManager tm;
	
	
	@Override
	public void setContext(RuntimeInterface ctx) {
		// TODO Auto-generated method stub
		super.setContext(ctx);
		
		wifiManager = (WifiManager)ctx.getSystemService(Context.WIFI_SERVICE);
		tm = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
	}


	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		
			//JSONObject obj = args.optJSONObject(0);	
			
			this.callbackId = callbackId;
			
			if(action.equalsIgnoreCase("getMacAddress")){		
				WifiInfo wifiInfo = wifiManager.getConnectionInfo();
				String macAddress = wifiInfo.getMacAddress();
				
				PluginResult result = new PluginResult(PluginResult.Status.OK, macAddress);
				return result;
			}
			else if(action.equalsIgnoreCase("getDeviceID")){		
				String android_id = Secure.getString(ctx.getContentResolver(), Secure.ANDROID_ID);
				
				PluginResult result = new PluginResult(PluginResult.Status.OK, android_id);
				return result;
			}
			else if(action.equalsIgnoreCase("getPhoneNumber")){
				String phoneNumber = tm.getLine1Number();
				return new PluginResult(PluginResult.Status.OK, phoneNumber);
			}
			
			return new PluginResult(PluginResult.Status.NO_RESULT);
	}


	@Override
	public boolean isSynch(String action) {
		// TODO Auto-generated method stub
		if(action.equals("getMacAddress"))
			return true;
		else if(action.equals("getDeviceID"))
			return true;
		else if(action.equals("getPhoneNumber"))
			return true;
		
		return super.isSynch(action);
	}
	
	
}
