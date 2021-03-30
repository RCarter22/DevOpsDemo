/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.pr.action;

import java.rmi.RemoteException;
import java.util.Iterator;
import java.util.Vector;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.pr.PRRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/pr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PRAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
		
	private final String APPNAME = "PR";
	private final String OWNERMBO = "PR";
	
	@Action(value="main", results={
		@Result(name="success",location="main.jsp"),
		@Result(name="error",location="main.jsp")
	})	
	public String main() {
		try {
			clearMboSession(OWNERMBO);
			clearAppSessions();		
			clearadvancedsearch();
			clearMboSession(EMMConstants.CURRENTWHERECLAUSE);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
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
				mboSetRemote.setQbe("SITEID", "="+this.user.getSiteId());
				mboSetRemote.setQbe("HISTORYFLAG", "=0");
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
	
	@Action(value="advancedsearch",results={
			@Result(name="success", location="advancedsearch.jsp"),
			@Result(name="error", location="advancedsearch.jsp")
		}
	)
	public String advancedsearch() {
		try{	
			clearMboSession(OWNERMBO);
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			if(mbo==null){
				mbo =  this.simpleService.getZombieMbo(OWNERMBO);
				setMboAppName(APPNAME);
				// Set default QBE
				if(this.user.getSiteId() != null)
					mbo.getThisMboSet().setQbe("SITEID", "="+this.user.getSiteId());
				mbo.getThisMboSet().setQbe("HISTORYFLAG", "=0");
			}
			this.setMboSession(EMMConstants.ADVANCEDSEARCHMBO, mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="doadvancedsearch",results={
			@Result(name="success", location="list.action", type="redirect"),
			@Result(name="error", location="list.jsp")
		}
	)
	public String doadvancedsearch() {
		try{	
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			setMboAppName(APPNAME);
			mboSet = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if(mboSet == null || (mboSet != null && mboSet.getApp() != null && !mboSet.getApp().equalsIgnoreCase(this.APPNAME))){
				this.setSessionObject(EMMConstants.CURRENTWHERECLAUSE, "");
				mboSet = this.user.getSession().getMboSet(OWNERMBO);
				mboSet.setWhere(mbo.getThisMboSet().getCompleteWhere());
			}else{
				if(this.getSessionObject(EMMConstants.CURRENTWHERECLAUSE) == null) //Get the initial where clause and save it in session for reuse
					this.setSessionObject(EMMConstants.CURRENTWHERECLAUSE, mboSet.getCompleteWhere());
				//Combine the initial where clause and the advanced search where clause
				if(this.getSessionObject(EMMConstants.CURRENTWHERECLAUSE).toString().equalsIgnoreCase(""))
					mboSet.setWhere(mbo.getThisMboSet().getCompleteWhere());
				else
					mboSet.setWhere(this.getSessionObject(EMMConstants.CURRENTWHERECLAUSE) + " and " + mbo.getThisMboSet().getCompleteWhere());
			}
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);	
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="clearadvancedsearch",results={
			@Result(name="success", location="advancedsearch.action", type="redirect"),
			@Result(name="error", location="advancedsearch.action", type="redirect")
		}
	)
	public String clearadvancedsearch() {
		try{
			this.clearAdvancedSearchSessions();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}		
	
	@Action(value="view", results={
		@Result(name="success",location="pr.jsp"),
		@Result(name="error",location="pr.jsp")
	})
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
	
	@SuppressWarnings("unchecked")
	@Action(value="createpo", results={
			@Result(name="success",location="/po/view.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="/pr/view.action",type="redirect",params={"id","${id}"})
		})	
	public String createPO(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			mbo.getThisMboSet().save();
			((PRRemote)mbo).checkingBeforeCreatePOCont(true);
			Vector vector = ((PRRemote)mbo).createPOsFromPR(this.user.getSession().getMXServerRemote().getDate());
			MboRemote poRemote = null;
			if(!vector.isEmpty()){
				for(Iterator<?> v = vector.iterator(); v.hasNext(); ){
					poRemote = (MboRemote)v.next();
				}
			}			
			mbo.getThisMboSet().save();
			setMboSession(OWNERMBO,this.mbo);
			mbo = poRemote;
			if (mbo!=null)
				id = mbo.getUniqueIDValue();
			
			setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
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
	
	@Action(value="create", results={
		@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="pr.jsp")
	})
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
	
	@Action(value="prlines", results={
		@Result(name="success",location="prlines.jsp"),
		@Result(name="error",location="main",type="redirect")
	})	
	public String prlines() {			
		try {
			clearMboSession("PRLINE");			
			pagination.setPageSize(5);			
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"PRLINE","PRLINENUM ASC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="addline", results={
		@Result(name="success",location="viewline.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="prlines.action",type="redirect",params={"id","${id}"})
	})
	public String addline(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			mbo = simpleService.add(mbo.getMboSet("PRLINE")); 
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="deleteline", results={
		@Result(name="success",location="prlines.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="prlines.action",type="redirect",params={"id","${id}"})
	})
	public String delete(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("PRLINE"), id);
			id = tmpId;
			mbo.delete();
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
	
	@Action(value="viewline", results={
		@Result(name="success",location="prline.jsp"),
		@Result(name="error",location="prline.jsp")
	})	
	public String viewline(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			mbo = this.simpleService.findById(mbo.getMboSet("PRLINE"), id);
			setMboSession("PRLINE",this.mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
}
