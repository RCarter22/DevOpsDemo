/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.login.action;

import java.util.Enumeration;

import javax.servlet.http.HttpSession;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.login.service.LoginService;
import com.interprosoft.ezmaxmobile.user.model.User;

@Component
@Scope("prototype")
@Namespace("/login")
@ResultPath(value="/")
public class LogoutAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Autowired
	private LoginService loginService;
	
	@SuppressWarnings("unchecked")
	@Action(value="logout",
			results={
				@Result(name="success", location="toLogin.action", type="redirect"),
				@Result(name="error", location="toLogin.action", type="redirect")
			}
		)
	public String execute() {
		try{
			HttpSession session = request.getSession(false);
			if (session != null){				
				User user = (User)session.getAttribute("SESSION_USER");			
				loginService.logout(user);
				Enumeration<String> e = session.getAttributeNames();
				while(e.hasMoreElements()) {
					session.removeAttribute((String)e.nextElement());
				}	
				session.invalidate();
			}
		} catch (Exception e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} 
		
		return SUCCESS;
	}
	
}
