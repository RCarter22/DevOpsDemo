/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.sr.action;

import java.rmi.RemoteException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.ticket.SRRemote;
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
@Namespace("/sr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class SRAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	public static final String APPNAME = "SR";	
	public static final String OWNERMBO = "SR";
	public static final String DEFAULTOWNERLOOKUPTYPE = "PERSON";
	
	private MboSetRemote newSRRemote;
	private MboSetRemote activeSRRemote;
	
	@Autowired
	public SimpleService simpleService;
	
	@Action(value="main", results={
			@Result(name="success",location="main.jsp"),
			@Result(name="error",location="main.jsp")
		})	
	public String main() {
		try{	
			clearMboSession(OWNERMBO);
			clearAppSessions();
			clearadvancedsearch();
			clearMboSession(EMMConstants.CURRENTWHERECLAUSE);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			
			newSRRemote = this.simpleService.getMboSet(OWNERMBO);
			newSRRemote.setQbe("STATUS", "NEW");			
			newSRRemote.setQbeExactMatch(true);
			newSRRemote.reset();
			
			activeSRRemote = this.simpleService.getMboSet(OWNERMBO);
			activeSRRemote.setWhere("STATUS NOT IN ('NEW','CLOSED','RESOLVED')");			
			activeSRRemote.reset();
			
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
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
	
	@Action(value="createworkorder",
			results={
				@Result(name="success",location="../wotrack/view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createWorkorder() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
			{
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			
			// Fix for InterPro issue #5090
			// Comment out the following
			// mbo = (MboRemote)(((SRRemote)mbo).createWorkorder()).get(1);

			// Add the following
			SRRemote sr = (SRRemote) mbo;
			mbo = (MboRemote)(sr.createWorkorder()).get(1);
			sr.getThisMboSet().save();
			
			id = mbo.getUniqueIDValue();
			setMessage(new EZMessage(mbo.getMessage("ticket", "WOCreated", new String[]{mbo.getString("WONUM")}), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="takeownership",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		}
	)
	public String takeOwnership() {
		try {
			populateMbo(OWNERMBO,APPNAME);
			SRRemote srRemote = (SRRemote)mbo;
			srRemote.getThisMboSet().save();
			srRemote.ownership();
			srRemote.getThisMboSet().save();
			this.setMboSession(OWNERMBO, null);
			populateMbo(OWNERMBO,APPNAME);
			id = srRemote.getUniqueIDValue();
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
		} finally {
			try {
				this.setMboSession(OWNERMBO, null);
				populateMbo(OWNERMBO,APPNAME);
				id = mbo.getUniqueIDValue();
			}catch (Exception e) {}
		}
		return SUCCESS;
	}
	
	@Action(value="doselectowner",
			results={
				@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
				@Result(name="error", location="/common/selectowner.jsp")
			}
		)
	public String doselectOwner() {
		try{
            populateMbo(OWNERMBO, APPNAME);
            SRRemote srRemote = (SRRemote)this.mbo;
            
            if(this.field.equalsIgnoreCase("OWNER"))
            	srRemote.applyOwner(this.value);
            else
            	srRemote.applyOwnerGroup(this.value);
            
            srRemote.getThisMboSet().save();
            setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS)); 			
            this.setMboSession(OWNERMBO, null);   
            
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
			@Result(name="success", location="sr.jsp"),
			@Result(name="error", location="sr.jsp"),
			@Result(name="input", location="main.action", type="redirect")
		}
	)
	public String view() {
		try{	
			populateMbo(OWNERMBO, APPNAME);
		} catch (NullPointerException e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return INPUT;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}

	@Action(value="listactive",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String listActive() {
		try{
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = this.simpleService.getMboSet(OWNERMBO);
			mboSetRemote.setWhere("STATUS NOT IN ('NEW','CLOSED','RESOLVED')");
			mboSetRemote.reset();			
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
	
	@Action(value="listnew",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String listNew() {
		try{
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = this.simpleService.getMboSet(OWNERMBO);
			mboSetRemote.setQbe("STATUS", "NEW");			
			mboSetRemote.setQbeExactMatch(true);
			mboSetRemote.reset();			
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
	
	@Action(value="listrelated",
			results={
				@Result(name="success", location="listrelated.jsp"),
				@Result(name="error", location="listrelated.jsp")
			}
		)
	public String listRelated() {
		try {
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"RELATEDRECORD");
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
			this.clearMboSession(OWNERMBO);
			create(OWNERMBO, APPNAME);
			// For Location/Asset lookup
			mbo.setValue("ASSETFILTERBY", "ALL");
			
			// NOTE - For mapping - SR based on a dropped pin... show x and y coordinates in description
			if (jsonParam != null) {
				JSONObject mapJson = JSONObject.fromObject(jsonParam);
				if (mapJson != null) {
					if (mapJson.has("DROPPED_PIN")) {
						JSONArray dpJsonArray = mapJson.getJSONArray("DROPPED_PIN");
						if (dpJsonArray != null && dpJsonArray.size() > 0)
							mapJson = dpJsonArray.getJSONObject(0);
					}
				}				
				if (mapJson != null) {
					mbo.setValue("DESCRIPTION", "(" + mapJson.getString("emmmap_y") + "," + mapJson.getString("emmmap_x") + ")");
					mbo.setValue("SERVICEADDRESS.LATITUDEY", mapJson.getString("emmmap_y"));
					mbo.setValue("SERVICEADDRESS.LONGITUDEX", mapJson.getString("emmmap_x"));
				}
			}				
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
				// Set default app where clause
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
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
				/*
				mbo.getThisMboSet().setQbe("WOCLASS", "WORKORDER,ACTIVITY");
				mbo.getThisMboSet().setQbe("HISTORYFLAG", "0");
				mbo.getThisMboSet().setQbe("ISTASK", "0");
				mbo.getThisMboSet().setQbe("SITEID", "="+this.user.getSiteId());
				*/				
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
		try {
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
				else{
					if(!mbo.getThisMboSet().getCompleteWhere().isEmpty())
						mboSet.setWhere(this.getSessionObject(EMMConstants.CURRENTWHERECLAUSE) + " and " + mbo.getThisMboSet().getCompleteWhere());
					else
						mboSet.setWhere(this.getSessionObject(EMMConstants.CURRENTWHERECLAUSE).toString());
				}
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

	
	
	public MboSetRemote getNewSRRemote() {
		return newSRRemote;
	}

	public void setNewSRRemote(MboSetRemote newSRRemote) {
		this.newSRRemote = newSRRemote;
	}

	public MboSetRemote getActiveSRRemote() {
		return activeSRRemote;
	}

	public void setActiveSRRemote(MboSetRemote activeSRRemote) {
		this.activeSRRemote = activeSRRemote;
	}
}
