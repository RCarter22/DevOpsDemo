/*******************************************************************************
 * Copyright (c) 2012 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.persongr.action;

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

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/persongr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PersongrAction  extends BaseAction {

	private static final long serialVersionUID = 1L;	
	
	public static final String APPNAME = "PERSONGR";	
	public static final String OWNERMBO = "PERSONGROUP";

	
	@Autowired
	public SimpleService simpleService;
	
	@Action(value="main",results={
			@Result(name="success", location="main.jsp"),
			@Result(name="error", location="main.jsp")
		}
	)
	public String main() {
		try{	
			clearMboSession(OWNERMBO);
			clearAppSessions();
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	
	@Action(value="view",results={
			@Result(name="success", location="persongr.jsp"),
			@Result(name="error", location="persongr.jsp")
		}
	)
	public String view() {
		try{	
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote personGroupTeamSet = mbo.getMboSet("PERSONGROUP_PRIMARYMEMBERS");
			this.setSessionObject("RESPARTYGROUPMBOSET", personGroupTeamSet);
			pagination.setSortBy("RESPPARTYGROUPSEQ");
			pagination.setSortOrder("ASC");
			pagination.setPageSize(50);
			mboList = this.simpleService.paginateMboSet(personGroupTeamSet, pagination);		
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	
	@Action(value="list",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String list() {
		try{
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote!=null)
				mboSetRemote.reset();
			mboList = this.simpleService.paginateMboSet(mboSetRemote, pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="doquicksearch",
			results={
				@Result(name="success", location="list.action", type="redirect", params={"search","${search}"}),
				@Result(name="error", location="list.jsp")
			}
		)
	public String doquickSearch() {
		try{	
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
            if(mboSetRemote != null)
                  mboSetRemote.resetQbe();
            if(mboSetRemote == null || (mboSetRemote != null && mboSetRemote.getApp() != null && !mboSetRemote.getApp().equalsIgnoreCase(this.APPNAME))){
                mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
      			mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
      			mboSetRemote.resetQbe();
            }
            this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
            this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="create",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String create() {
		try{			
			create(OWNERMBO, APPNAME);		
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
	@Action(value="newrow",
			results={
				@Result(name="success",location="viewresppartygroup.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="viewresppartygroup.action",type="redirect",params={"id","${id}"})
			}
		)
	public String newrow() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
				mbo = this.simpleService.findById(OWNERMBO,id);
			
			mbo = simpleService.add(mbo.getMboSet("PERSONGROUP_PRIMARYMEMBERS"));
			id = mbo.getUniqueIDValue();			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
	@Action(value="viewresppartygroup",results={
			@Result(name="success", location="resppartygroup.jsp"),
			@Result(name="error", location="resppartygroup.jsp")
		}
	)
	public String viewresppartygroup() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("PERSONGROUP_PRIMARYMEMBERS",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("PERSONGROUP_PRIMARYMEMBERS"), id);
			}
			setMboSession("PERSONGROUP_PRIMARYMEMBERS",this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	
	@Action(value="savepersongroup",
			results={
				@Result(name="success", location="view.action", type="redirect"),
				@Result(name="error", location="view.action", type="redirect")
			}
		)
	public String savepersongroup() {
		try{
			MboSetRemote respPartySet = (MboSetRemote)this.getSessionObject("RESPARTYGROUPMBOSET");
			respPartySet.save();
			setMessage(new EZMessage(respPartySet.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="deleterespparty", results={
			@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		})
	public String deleterespparty(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			
			MboRemote mboRemote = this.simpleService.findById(mbo.getMboSet("PERSONGROUP_PRIMARYMEMBERS"), id);
			id = tmpId;
			mboRemote.delete();
			mboRemote.getThisMboSet().save();
			setMessage(new EZMessage(mboRemote.getMessage("system", "deleterecord"), EMMConstants.SUCCESS));
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
	
	@Action(value="queries",
			results={
				@Result(name="success", location="listqueries.jsp"),
				@Result(name="error", location="listqueries.jsp")
			}
		)
	public String queries() {
		return this.retrieveQueries(false, APPNAME);
	}	
	
	@Action(value="myqueries",
			results={
				@Result(name="success", location="listqueries.jsp"),
				@Result(name="error", location="listqueries.jsp")
			}
		)
	public String myqueries() {
		return retrieveQueries(true, APPNAME);
	}	

}