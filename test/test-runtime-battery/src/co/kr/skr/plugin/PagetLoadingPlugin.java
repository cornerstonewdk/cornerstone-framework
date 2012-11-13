package co.kr.skr.plugin;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.skt.runtime.RuntimeWebViewClient;
import org.skt.runtime.api.LOG;
import org.skt.runtime.api.Plugin;
import org.skt.runtime.api.PluginResult;

public class PagetLoadingPlugin extends Plugin {

	private String callbackId;                      // The ID of the callback to be invoked with our result
	
	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		
			JSONObject obj = args.optJSONObject(0);	
			
			this.callbackId = callbackId;
			
			if(action.equalsIgnoreCase("getPageLoadingTime")){		
				long loadingtime = RuntimeWebViewClient.getPageLoadingTime();
				PluginResult result = new PluginResult(PluginResult.Status.OK, loadingtime);
				this.success(result, this.callbackId);
			}
			
			else if(action.equalsIgnoreCase("getLoadDataUrl")){
				ArrayList<String> loadedUrl = RuntimeWebViewClient.getLoadedAllDataUrl();
				JSONArray returnData = makeLoadedUrl(loadedUrl);	
				PluginResult result = new PluginResult(PluginResult.Status.OK, returnData);
				this.success(result, this.callbackId);
			}		
			
			return new PluginResult(PluginResult.Status.NO_RESULT);
	}
	
	public JSONArray makeLoadedUrl(ArrayList<String> dataurl){
		JSONArray returnArray = new JSONArray();
		
		for(int i = 0 ; i < dataurl.size() ; i ++){
			returnArray.put(dataurl.get(i));
		}
		
		return returnArray;
	}
}
