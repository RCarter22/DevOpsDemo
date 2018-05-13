/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.plustpo.action;

import java.rmi.RemoteException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

import org.apache.struts2.convention.annotation.*;

@Component
@Scope("prototype")
@Namespace("/plustpo")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusTPOAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	private final String APPNAME = "PLUSTPO";
	private final String OWNERMBO = "PO";
	
	@Action(value="main", results={
		@Result(name="success",location="main.jsp"),
		@Result(name="error",location="main.jsp")
	})	
	public String main() {		
		try {
			clearMboSession(OWNERMBO);
			clearAppSessions();
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			setMboAppName(APPNAME);
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
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
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
				// Set default app where clause
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO).getThisMboSet();
				mboSetRemote.setQbe("HISTORYFLAG", "0");
				mboSetRemote.setQbe("SITEID", "="+this.user.getSiteId());
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
				mbo.getThisMboSet().setQbe("SITEID", "="+this.user.getSiteId());
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
	            if(mboSet != null)
	                  mboSet.resetQbe();
	            else
	                  mboSet = this.user.getSession().getMboSet(OWNERMBO);
			     String [][] qbeSet = mbo.getThisMboSet().getQbe();
			     for(int i = 0; i < qbeSet.length; i++){
			           mboSet.setQbe(qbeSet[i][0], qbeSet[i][1]);
			     }
	            this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);				
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	

	@Action(value="duplicate",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String duplicate() {
		try{		
			populateMbo(OWNERMBO, APPNAME);
			mbo = mbo.duplicate();
			this.setMessage(new EZMessage(mbo.getMessage("system", "duprecord"), EMMConstants.SUCCESS));
			id = mbo.getUniqueIDValue();
			this.setMboSession(OWNERMBO, mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
	@Action(value="view", results={
		@Result(name="success",location="po.jsp"),
		@Result(name="error",location="po.jsp")
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

	@Action(value="create", results={
			@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="po.jsp")
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
	
	@Action(value="polines", results={
			@Result(name="success",location="polines.jsp"),
			@Result(name="error",location="polines.jsp")
		})	
	public String polines() {
		try {
			clearMboSession("POLINE");			
			pagination.setPageSize(5);
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"POLINE","POLINENUM ASC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="addline", results={
		@Result(name="success",location="viewline.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="polines.action",type="redirect",params={"id","${id}"})
	})
	public String addline(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			mbo = simpleService.add(mbo.getMboSet("POLINE")); 
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="deleteline", results={
			@Result(name="success",location="polines.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="polines.action",type="redirect",params={"id","${id}"})
		})
	public String delete(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("POLINE"), id);
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
			@Result(name="success",location="poline.jsp"),
			@Result(name="error",location="poline.jsp")
		})	
	public String viewline(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			mbo = this.simpleService.findById(mbo.getMboSet("POLINE"), id);
			setMboSession("POLINE",this.mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
}
