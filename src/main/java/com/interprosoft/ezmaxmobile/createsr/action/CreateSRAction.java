/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.createsr.action;

import java.rmi.RemoteException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/createsr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class CreateSRAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	public static final String APPNAME = "CREATESR";	
	public static final String OWNERMBO = "SR";
	public static final String DEFAULTOWNERLOOKUPTYPE = "PERSON";
	
	
	@Autowired
	public SimpleService simpleService;
	
	@Action(value="main", results={
				@Result(name="success",location="../createsr/view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="../createsr/view.action",type="redirect",params={"id","${id}"})
		})	
	public String main() {
		try{	
			clearMboSession(OWNERMBO);
			clearAppSessions();
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			setMboAppName(APPNAME);
			
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return create();
	}
	
	@Action(value="create",
			results={
				@Result(name="success",location="../createsr/view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="../createsr/view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String create() {
		try{
			create(OWNERMBO, APPNAME);
			mbo.setValue("AFFECTEDPERSONID", mbo.getUserInfo().getPersonId());
			mbo.setValue("REPORTEDBYID", mbo.getUserInfo().getPersonId());
			mbo.setValue("REPORTEDEMAIL", mbo.getUserInfo().getEmail());
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="view",results={
			@Result(name="success", location="../viewsr/sr.jsp"),
			@Result(name="error", location="../viewsr/sr.jsp")
		}
	)
	public String view() {
		try{	
			populateMbo(OWNERMBO, APPNAME);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
}
