/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.login.action;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.rmi.RemoteException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;
import psdi.util.MXException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.MaximoHelper;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.LicenseControler;
import com.interprosoft.ezmaxmobile.login.LoginException;
import com.interprosoft.ezmaxmobile.login.service.LoginService;
import com.interprosoft.ezmaxmobile.user.UserException;
import com.interprosoft.ezmaxmobile.user.model.User;
import com.interprosoft.ezmaxmobile.user.service.UserServiceImpl;

@Component
@Scope("prototype")
@Namespace("/login")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public final class LoginAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Autowired
	private LoginService loginService;
	
	private String username;

	private String password;
	
	private String licenseInfo; 
	
	private String deviceType;
	
	protected InputStream jsonResult;

	@Action(value="toLogin",
			results={
				@Result(name="success", location="login.jsp")
			}
		)
	public String toLogin() {
		LicenseControler lc = new LicenseControler();
		licenseInfo = lc.getTrialLicenseInfo();
		return SUCCESS;
	}
	
	@Action(value="locale",
			results={
				@Result(name="success", location="login.jsp")
			}
		)
	public String toLocale() {
		return SUCCESS;
	}

	@Action(value="doLogin",
			results={
				@Result(name="success", location="/main.action", type="redirect"),
				@Result(name="selfservice", location="../viewsr/selfsrstart.action", type="redirect"),
				@Result(name="error", location="toLogin.action", type="redirect"),
				@Result(name="invalid.token", location="toLogin.action", type="redirect")
			},
			interceptorRefs={
				@InterceptorRef("token"),
				@InterceptorRef("basicStack")
			}			
		)
	public String doLogin() {
		try {
			if (username.equals("") || password.equals("")) {
				this.setMessage(new EZMessage(getText("global.invalidlogin"), EMMConstants.ERROR));
				return ERROR;
			}
			User user = loginService.login(username, password);

			//extra user fields for offline usage 
			Map<Object, Object> extraFields = new HashMap<Object,Object>();				

			try{
				//set the user's REPAIRFACILITY value so it can be referenced offline
				extraFields.put("REPAIRFACILITY", user.getSession().getProfile().getDefaultRepairFacility());
				extraFields.put("DEFSTOREROOM", user.getSession().getProfile().getDefaultStoreroom());

				user.setExtFields(extraFields);	
				user.buildUserInfo();			
				
			}catch (MXException e) {
				e.printStackTrace();
			} catch (RemoteException e) {
				e.printStackTrace();
			}catch (UserException e) {
				e.printStackTrace();
			}
			
			request.getSession().setAttribute("SESSION_USER", user);
			setAuthorizeto(MaximoHelper.getInstance().getClientDisplayName());
			if(user.isSelfServiceAcct())
				return "selfservice";
			return SUCCESS;
		} catch (LoginException e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));			
			return ERROR;
		}
	}
	
	@Deprecated
	@Action(value="doLoginJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"}),
				@Result(name="error", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String doLoginJson() {
		JSONObject jsonObj = new JSONObject();
		if (jsonParam == null) {
			jsonObj.element("errMsg", "Illegal json parameters!");
		}
		try {		
			JSONObject jsonParamObj = JSONObject.fromObject(jsonParam);
			JSONObject jsonUser = (JSONObject)jsonParamObj.get("user");
			
			if (jsonUser != null) {
			
				User user = (User)JSONObject.toBean(jsonUser, User.class);
				user = loginService.login(user.getUsername(), user.getPassword());

				applyTags(user);					
				
				JsonConfig jsonConfig = new JsonConfig();  
				jsonConfig.setJsonPropertyFilter( new PropertyFilter(){    
				   public boolean apply( Object source, String name, Object value ) {    
				      if( "session".equals(name) || "password".equals(name) || "userInfo".equals(name)) {
				         return true;    
				      }    
				      return false;    
				   }    
				});
				jsonObj = (JSONObject) JSONSerializer.toJSON( user, jsonConfig );
			} else {
				jsonObj.element("errMsg", "Illegal json parameters!");
			}
		} catch (NullPointerException npe){
			npe.printStackTrace();
			jsonObj.element("errMsg", "Null Pointer Exception");
		} catch(Exception ex) {
			ex.printStackTrace();
			jsonObj.element("errMsg", "Unknown Error");
		} 
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());

		// This method should never return ERROR		
		return SUCCESS;
	}
	
	@Deprecated
	private void applyTags(User user) {
		//Set Push notification related attributes. 
		if(MaximoHelper.getInstance().isPushEnabled())
		{
			// Client implementations for push notification tags
			UserServiceImpl userService = new UserServiceImpl(user);
			try {
				// By default, tags are all of the users person groups, sites and orgs
				user.setTags(userService.getTags(user.getPersonId()));
			} catch (UserException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}	
	}
	
	

	/**
	 * @return the loginService
	 */
	public LoginService getLoginService() {
		return loginService;
	}

	/**
	 * @param loginService the loginService to set
	 */
	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	public InputStream getJsonResult() {
		return jsonResult;
	}

	public void setJsonResult(InputStream jsonResult) {
		this.jsonResult = jsonResult;
	}

	public String getLicenseInfo() {
		return licenseInfo;
	}

	public void setLicenseInfo(String licenseInfo) {
		this.licenseInfo = licenseInfo;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
}
