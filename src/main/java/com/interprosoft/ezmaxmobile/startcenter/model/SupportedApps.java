package com.interprosoft.ezmaxmobile.startcenter.model;

import com.interprosoft.ezmaxmobile.MaximoHelper;
import com.interprosoft.ezmaxmobile.user.model.User;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class SupportedApps {
	
	private User user;	
	
	public JSONArray getEMMApps() {

		String [][] supportedApps = {						
				{"NOTIFICATION", getText("ezmaxmobile.notification"),"notification.png", "emm-notification"},
				{"BBOARD", getText("ezmaxmobile.bboard"),"bulletin.png", "emm-bulletin"},
				{"DIVIDER"},
				{"PERSONGR", getText("ezmaxmobile.persongr"),"usergroup.png", "emm-user-group"},
				{"DIVIDER"},
				{"ASSET", getText("ezmaxmobile.asset"),"asset.png", "emm-asset"},
				{"LOCATION", getText("ezmaxmobile.locations"),"location.png", "emm-location"},	         		
				{"DIVIDER"},
				{"ITEM", getText("ezmaxmobile.itemmaster"),"items.png", "emm-items"},
				{"INVENTOR", getText("ezmaxmobile.inventor"),"inventory.png", "emm-inventory"},
				{"INVUSAGE", getText("ezmaxmobile.invusage"),"inventoryusage.png", "emm-inventory-usage"},
				{"INVISSUE", getText("ezmaxmobile.invissue"),"transfer.png", "emm-transfer"},		         		
				{"DIVIDER"},
				{"PR", getText("ezmaxmobile.pr"),"pr.png", "emm-reserved"},
				{"PO", getText("ezmaxmobile.po"),"po.png", "emm-purchase"},
				{"RECEIPTS", getText("ezmaxmobile.receipts"), "receipts.png", "emm-receipts"},
				{"DIVIDER"},
				{"INSPECTOR", getText("ezmaxmobile.inspection"),"wos.png", "emm-inspect-1"},
				{"DIVIDER"},
				{"WOTRACK", getText("ezmaxmobile.wotrack"),"wos.png", "emm-workorder"},
				{"SR", getText("ezmaxmobile.sr"),"sr.png", "emm-service-request"},
				{"LABREP", getText("ezmaxmobile.labrep"),"labor.png", "emm-labor"},        		
				{"DIVIDER"},
				{"CREATEDR", getText("ezmaxmobile.createdr"), "purchase.png", "emm-reserved"},
				{"VIEWDR", getText("ezmaxmobile.viewdr"), "purchase.png", "emm-reserved"},	
				{"DIVIDER"},
				{"CREATESR", getText("ezmaxmobile.createsr"),"sr.png", "emm-service-request"},
				{"VIEWSR", getText("ezmaxmobile.viewsr"),"sr.png", "emm-service-request"},	         		
		  	};
		
		return convertToJSON(supportedApps);
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
		
	private String getText(String key){
		return MaximoHelper.getInstance().getText(key, user);
		
	}
	
	private JSONArray convertToJSON (String[][] supportedApps) {
		JSONArray supportedJSONapps = new JSONArray();
		for (int i = 0; i < supportedApps.length; i++){
			try {
				JSONObject obj = new JSONObject();
				if (supportedApps[i].length == 1 && supportedApps[i][0] == "DIVIDER") { 
					obj.put("APP", "DIVIDER");	
					supportedJSONapps.add(obj);
				}
				else if (supportedApps[i].length > 1) {
					obj.put("APP", supportedApps[i][0]);
					obj.put("DESCRIPTION", supportedApps[i][1]);
					obj.put("IMAGE", supportedApps[i][2]);
					obj.put("ICON", supportedApps[i][3]);
					supportedJSONapps.add(obj);
				}
				
			}
			catch (Exception e) {

			}
		}
		return supportedJSONapps;
	}
	

}

