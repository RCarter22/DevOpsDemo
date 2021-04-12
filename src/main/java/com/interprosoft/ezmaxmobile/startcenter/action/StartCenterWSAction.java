/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.startcenter.action;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.MaximoHelper;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.login.LoginException;
import com.interprosoft.ezmaxmobile.login.service.LoginService;
import com.interprosoft.ezmaxmobile.user.model.User;

@Component
@Scope("prototype")
@Namespace("/startcenter/ws")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class StartCenterWSAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	private static Logger log = Logger.getLogger(StartCenterWSAction.class);
	
	
	@Action(value="getWidgetsJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getWidgetsJson() {
		JSONObject jsonArrObject = new JSONObject();

		jsonArrObject.put("QUICKINSERTARR", this.getMyQuickInsertsArray());
		jsonArrObject.put("FAVORITEAPPARR", this.getMyFavoriteAppsArray());
		if (MaximoHelper.getInstance().isOfflineModeEnabled()) {
			jsonArrObject.put("OFFLINESYNCOBJ", this.getOfflineSyncObj());
		}

		this.setJsonResult(new ByteArrayInputStream(jsonArrObject.toString().getBytes()));
		
		return SUCCESS;
	}
	
	public JSONObject getOfflineSyncObj() {
		JSONObject syncObj = new JSONObject();
		
		if (user != null && user.getSession() != null) {
			syncObj.put("DESCRIPTION", MaximoHelper.getInstance().getText("global.syncserver", user));
			syncObj.put("IMAGE", "/images/sync.png");
		}
		else {
			syncObj.put("DESCRIPTION", "Sync with Server");
			syncObj.put("IMAGE", "/images/sync.png");
		}
		
		return syncObj;
	}
	
	public JSONArray getMyQuickInsertsArray() {
		JSONArray quickinsarr = new JSONArray();

		if (user != null && user.getSession() != null) {
			try {
				boolean foundStartCenter = false;
				boolean foundLayout = false;
				MboSetRemote startCenterSetRemote = user.getSession().getMboSet("SCCONFIG");
				startCenterSetRemote.setQbe("USERID", user.getUserId());
				startCenterSetRemote.setOrderBy("ISDEFAULT DESC, DESCRIPTION ASC");
				startCenterSetRemote.reset();
				MboRemote startCenterRemote = startCenterSetRemote.moveFirst();
				while(startCenterRemote != null && !foundStartCenter){
					MboSetRemote layoutSetRemote = startCenterRemote.getMboSet("LAYOUTALL");
					layoutSetRemote.setOrderBy("ORDERNUM");
					layoutSetRemote.reset();
					MboRemote layoutRemote = layoutSetRemote.moveFirst();
					while(layoutRemote != null && !foundLayout){
						MboSetRemote actionConfigSetRemote = layoutRemote.getMboSet("ACTIONSCFG");
						actionConfigSetRemote.setOrderBy("ORDERNUM");
						actionConfigSetRemote.reset();
						MboRemote actionConfigRemote = actionConfigSetRemote.moveFirst();
						while(actionConfigRemote != null && quickinsarr.size() < 5){
							for(int i = 0; i < user.getSupportedApps().size(); i++){
								if(actionConfigRemote.getString("APP").equalsIgnoreCase(user.getSupportedApps().getJSONObject(i).getString("APP"))){
									foundLayout = true;
									foundStartCenter = true;
									MboSetRemote maxAppSetRemote = actionConfigRemote.getMboSet("ACTION_MAXAPPS");
									MboRemote maxAppRemote = maxAppSetRemote.moveFirst();
									if(maxAppRemote != null){
										//Build JSON
										JSONObject favappobj = new JSONObject();
										favappobj.put("APP", maxAppRemote.getString("APP"));
										favappobj.put("DESCRIPTION", actionConfigRemote.getString("DESCRIPTION"));
										favappobj.put("URL", "/" + maxAppRemote.getString("APP").toLowerCase() + "/create.action");
										quickinsarr.add(favappobj);	
									}
								}
							}
							actionConfigRemote = actionConfigSetRemote.moveNext();
						}
						layoutRemote = layoutSetRemote.moveNext();
					}
					startCenterRemote = startCenterSetRemote.moveNext();
				}
			} catch(Exception ex) {
				log.error("getMyQuickInsertsArray :", ex);
				return new JSONArray();
			}
		}
		return quickinsarr; 
	}
	
	public JSONArray getMyFavoriteAppsArray() {
		JSONArray favapparr = new JSONArray();

		if (user != null && user.getSession() != null) {
			try {	
				boolean foundStartCenter = false;
				boolean foundLayout = false;
				MboSetRemote startCenterSetRemote = user.getSession().getMboSet("SCCONFIG");
				startCenterSetRemote.setQbe("USERID", user.getUserId());
				startCenterSetRemote.setOrderBy("ISDEFAULT DESC, DESCRIPTION ASC");
				startCenterSetRemote.reset();
				MboRemote startCenterRemote = startCenterSetRemote.moveFirst();
				while(startCenterRemote != null && !foundStartCenter){
					MboSetRemote layoutSetRemote = startCenterRemote.getMboSet("LAYOUTALL");
					layoutSetRemote.setOrderBy("ORDERNUM");
					layoutSetRemote.reset();
					MboRemote layoutRemote = layoutSetRemote.moveFirst();
					while(layoutRemote != null && !foundLayout){
						MboSetRemote faConfigSetRemote = layoutRemote.getMboSet("FACONFIG");
						faConfigSetRemote.setOrderBy("ORDERNUM");
						faConfigSetRemote.reset();
						MboRemote faConfigRemote = faConfigSetRemote.moveFirst();
						while(faConfigRemote != null && favapparr.size() < 5){
							for(int i = 0; i < user.getSupportedApps().size(); i++){
								if(faConfigRemote.getString("APP").equalsIgnoreCase(user.getSupportedApps().getJSONObject(i).getString("APP"))){
									foundLayout = true;
									foundStartCenter = true;
									MboSetRemote maxAppSetRemote = faConfigRemote.getMboSet("FA_APP");
									MboRemote maxAppRemote = maxAppSetRemote.moveFirst();
									if(maxAppRemote != null){
										//Build JSON
										JSONObject favappobj = new JSONObject();
										favappobj.put("APP", maxAppRemote.getString("APP"));
										favappobj.put("DESCRIPTION", maxAppRemote.getString("DESCRIPTION"));
										favappobj.put("URL", "/" + maxAppRemote.getString("APP").toLowerCase());
										try {
											favappobj.put("IMAGE", "/images/" + user.getSupportedApps().getJSONObject(i).getString("IMAGE"));
										} catch (Exception ex) {
											log.error("Image not found for " + maxAppRemote.getString("APP") +
													  ". Please verify your SupportedApps class.", ex);
											favappobj.put("IMAGE", "");
										}
										favapparr.add(favappobj);	
									}
								}
							}
							faConfigRemote = faConfigSetRemote.moveNext();
						}
						layoutRemote = layoutSetRemote.moveNext();
					}
					startCenterRemote = startCenterSetRemote.moveNext();
				}
			} catch(Exception ex) {
				log.error("getMyFavoriteAppsArrayJson :", ex);
				return new JSONArray();
			}
		}
		return favapparr; 
	}	
	
}
