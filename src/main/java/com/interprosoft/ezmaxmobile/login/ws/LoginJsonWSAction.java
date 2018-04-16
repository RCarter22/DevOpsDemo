/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.login.ws;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.login.LoginException;
import com.interprosoft.ezmaxmobile.login.service.LoginService;
import com.interprosoft.ezmaxmobile.user.model.User;

@Scope("prototype")
@Component
public class LoginJsonWSAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	@Autowired
	private LoginService loginService;

	private String jsonParam;
	
	private InputStream jsonResult;

	public String login() {
		JSONObject jsonObj = new JSONObject();
		if (jsonParam == null) {
			jsonObj.element("errMsg", "Illegal json parameters!");
		}
		JSONObject jsonParamObj = JSONObject.fromObject(jsonParam);
		JSONObject jsonUser = (JSONObject)jsonParamObj.get("user");
		if (jsonUser != null) {
			User user = (User)JSONObject.toBean(jsonUser, User.class);
			try {
				user = loginService.login(user.getUsername(), user.getPassword());
				JsonConfig jsonConfig = new JsonConfig();  
				jsonConfig.setJsonPropertyFilter( new PropertyFilter(){    
				   public boolean apply( Object source, String name, Object value ) {    
				      if( "session".equals(name) ){    
				         return true;    
				      }    
				      return false;    
				   }    
				});   
				jsonObj = (JSONObject) JSONSerializer.toJSON( user, jsonConfig );  
				//jsonObj = JSONObject.fromObject(user);
			} catch(LoginException ex) {
				jsonObj.element("errMsg", ex.getMessage());
			}
		} else {
			jsonObj.element("errMsg", "Illegal json parameters!");
		}

		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		return SUCCESS;
	}

	public String getJsonParam() {
		return jsonParam;
	}

	public void setJsonParam(String jsonParam) {
		this.jsonParam = jsonParam;
	}

	public LoginService getLoginService() {
		return loginService;
	}

	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}

	public InputStream getJsonResult() {
		return jsonResult;
	}

	public void setJsonResult(InputStream jsonResult) {
		this.jsonResult = jsonResult;
	}
}
