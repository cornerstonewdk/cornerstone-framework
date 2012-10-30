package co.kr.skr.plugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.skt.runtime.api.LOG;
import org.skt.runtime.api.Plugin;
import org.skt.runtime.api.PluginResult;

public class BackgroundPlugin extends Plugin {

	private String callbackId;                      // The ID of the callback to be invoked with our result
	private boolean threadstop = false;

	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		JSONObject obj = args.optJSONObject(0);	

		if(action.equalsIgnoreCase("for")){

			int end = obj.optInt("end");		
			int i = obj.optInt("start");

			threadstop = false;
			this.callbackId = callbackId;

			do{
				//do somthig
				i++;
				LOG.e("background","in native : " + i);
				//If you want to notify something to webview , use code below
				if(i%1000 == 0){
					PluginResult result = new PluginResult(PluginResult.Status.OK, i);
					result.setKeepCallback(true);						
					this.success(result, this.callbackId);
				}
				else if(i == end){
					threadstop = true;
					PluginResult result = new PluginResult(PluginResult.Status.OK, "stop");
					result.setKeepCallback(false);						
					this.success(result, this.callbackId);
				}	

			}while(!threadstop);
		}

		else if(action.equalsIgnoreCase("stop")){
			threadstop = true;
			PluginResult result = new PluginResult(PluginResult.Status.OK, "stop");
			result.setKeepCallback(false);						
			this.success(result, this.callbackId);
		}

		else if(action.equalsIgnoreCase("fibonacci")){
			
			int n = args.optInt(0);
			long beforeTime = 0; 
			long endTime = 0 ; 
			long returnval = 0 ;

			if(n != 0){
				beforeTime = System.currentTimeMillis();
				returnval = fibo(n);
				endTime = System.currentTimeMillis();
				
				JSONObject returnobj = new JSONObject();
				
				try {
					returnobj.put("value", returnval);
					returnobj.put("time", endTime -beforeTime );
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				PluginResult result = new PluginResult(PluginResult.Status.OK, returnobj);
				return result;
			}

		}

		return new PluginResult(PluginResult.Status.NO_RESULT);
	}

	public long fibo(int n){
		if(n==0 || n==1){
			return n;
		}
		else{
			return fibo(n-1) + fibo(n-2);
		}
	}
}
