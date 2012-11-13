package co.kr.skr.plugin;

import java.util.Calendar;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.skt.runtime.api.Plugin;
import org.skt.runtime.api.PluginResult;
import org.skt.runtime.api.PluginResult.Status;
import org.skt.runtime.api.RuntimeInterface;

import android.database.Cursor;
import android.provider.CallLog;
import android.util.Log;

public class CallLogPlugin extends Plugin {
	
	/** List Action */
	private static final String ACTION = "list";
	private static final String TAG = "CallLogPlugin";
	
	@Override
	public void setContext(RuntimeInterface ctx) {
		// TODO Auto-generated method stub
		super.setContext(ctx);
		
	}

	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		Log.d(TAG, "Plugin Called");
		
		PluginResult result = null;
		if (ACTION.equals(action)) {
			try {
				int limit = -1;

				//obtain date to limit by
				if (!data.isNull(0)) {
					String d = data.getString(0);
					Log.d(TAG, "Time period is: " + d);
					if (d.equals("week"))
						limit = -7;
					else if (d.equals("month"))
						limit = -30;
					else if (d.equals("all"))
						limit = -1000000; // LOL
				} 

				//turn this into a date
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(new Date());
				calendar.add(Calendar.DAY_OF_YEAR, limit);
				Date limitDate = calendar.getTime();
				String limiter = String.valueOf(limitDate.getTime());

				//now do required search
				JSONObject callInfo = getCallListing(limiter);
				
				Log.d(TAG, "Returning " + callInfo.toString());
				result = new PluginResult(Status.OK, callInfo);
				
			} catch (JSONException jsonEx) {
				Log.d(TAG, "Got JSON Exception " + jsonEx.getMessage());
				result = new PluginResult(Status.JSON_EXCEPTION);
			}
		}  else {
			result = new PluginResult(Status.INVALID_ACTION);
			Log.d(TAG, "Invalid action : " + action + " passed");
		}
		return result;
	}

	private JSONObject getCallListing(String period) throws JSONException {

		JSONObject callLog = new JSONObject();

		String[] strFields = { 
				android.provider.CallLog.Calls.DATE,
				android.provider.CallLog.Calls.NUMBER,
				android.provider.CallLog.Calls.TYPE,
				android.provider.CallLog.Calls.DURATION,
				android.provider.CallLog.Calls.NEW,
				android.provider.CallLog.Calls.CACHED_NAME,
				android.provider.CallLog.Calls.CACHED_NUMBER_TYPE,
				android.provider.CallLog.Calls.CACHED_NUMBER_LABEL };

		try {
			Cursor callLogCursor = ctx.getContentResolver().query(
					android.provider.CallLog.Calls.CONTENT_URI, 
					strFields,
					CallLog.Calls.DATE + ">?",
	                new String[] {period},
					android.provider.CallLog.Calls.DEFAULT_SORT_ORDER);

			int callCount = callLogCursor.getCount();

			if (callCount > 0) {
				JSONObject callLogItem = new JSONObject();
				JSONArray callLogItems = new JSONArray();

				callLogCursor.moveToFirst();
				do {
					callLogItem.put("date", callLogCursor.getLong(0));
					callLogItem.put("number", callLogCursor.getString(1));
					callLogItem.put("type", callLogCursor.getInt(2));
					callLogItem.put("duration", callLogCursor.getLong(3));
					callLogItem.put("new", callLogCursor.getInt(4));
					callLogItem.put("cachedName", callLogCursor.getString(5));
					callLogItem.put("cachedNumberType", callLogCursor.getInt(6));
					//callLogItem.put("name", getContactNameFromNumber(callLogCursor.getString(1))); //grab name too
					callLogItems.put(callLogItem);
					callLogItem = new JSONObject(); 
				} while (callLogCursor.moveToNext());
				callLog.put("rows", callLogItems);
			}

			callLogCursor.close();
		} catch (Exception e) {
			Log.d("CallLog_Plugin",
					" ERROR : SQL to get cursor: ERROR " + e.getMessage());
		}

		return callLog;
	}
}
