/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.viewsr.action;

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

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;

@Component
@Scope("prototype")
@Namespace("/viewsr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class ViewSRAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	public static final String APPNAME = "VIEWSR";	
	public static final String OWNERMBO = "SR";
	public static final String DEFAULTOWNERLOOKUPTYPE = "PERSON";
	
	@Autowired
	public SimpleService simpleService;

	@Action(value="main", results={
			@Result(name="success",location="list.jsp"),
			@Result(name="error",location="list.jsp")
		})	
	public String main() {
		try{	
			clearMboSession(OWNERMBO);
			clearAppSessions();
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			setMboAppName(APPNAME);
			return list();
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
	}
	
	
	@Action(value="selfsrstart", results={
			@Result(name="success",location="selfsrstart.jsp"),
			@Result(name="error",location="selfsrstart.jsp")
		})	
	public String selfsrstart() {
		try{	
			clearMboSession(OWNERMBO);
			clearAppSessions();
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			setMboAppName(APPNAME);
			return SUCCESS;
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
	}
	
	
	@Action(value="view",results={
			@Result(name="success", location="sr.jsp"),
			@Result(name="error", location="sr.jsp")
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

			// Use the same query as Maximo, in maximo its embedded so it may as well be unchangeable here as well
			// TODO - add a user defined query to do the selection
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote!=null) {
				String where = null;
				if (mboSetRemote.getCompleteWhere() != null && mboSetRemote.getCompleteWhere().length() > 0) {
					where = mboSetRemote.getCompleteWhere();
				}
				String baseWhere = "(origrecordclass!='SOLUTION' or origrecordclass is null) and (affectedperson in (select personid from maxuser where userid= '%1$s' ) or reportedby in (select personid from maxuser where userid= '%1$s'))";
				baseWhere = String.format(baseWhere, mbo.getUserInfo().getPersonId());
				if (where != null) {
					where += " AND " + baseWhere;
				} else {
					where = baseWhere;
				}
				mboSetRemote.setWhere(where);
				mboSetRemote.reset();
			} else {
				mboSet = this.user.getSession().getMboSet(OWNERMBO);
				String where = "(origrecordclass!='SOLUTION' or origrecordclass is null) and (affectedperson in (select personid from maxuser where userid= '%1$s' ) or reportedby in (select personid from maxuser where userid= '%1$s'))";
				mboSet.setWhere(String.format(where, mbo.getUserInfo().getPersonId()));
				mboSet.reset();			
	
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);	
				mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			}
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
				// mbo = this.simpleService.getFakeMbo(OWNERMBO);
				// Set default app where clause
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO).getThisMboSet();
				// String where = "(origrecordclass!='SOLUTION' or origrecordclass is null) and (affectedperson in (select personid from maxuser where userid= '%1$s' ) or reportedby in (select personid from maxuser where userid= '%1$s'))";
				// mboSetRemote.setWhere(String.format(where, mbo.getUserInfo().getPersonId()));
				// mboSetRemote.setQbe("HISTORYFLAG", "0");
				// mboSetRemote.setQbe("SITEID", "="+this.user.getSiteId());
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
		try{	
			mbo = (MboRemote) this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			setMboAppName(APPNAME);
			mboSet = (MboSetRemote) this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSet != null)
				mboSet.resetQbe();
			else
				mboSet = this.user.getSession().getMboSet(OWNERMBO);
			String[][] qbeSet = mbo.getThisMboSet().getQbe();
			for (int i = 0; i < qbeSet.length; i++) {
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
	@Action(value="nextsr",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
		}
	)
	public String nextSr() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote == null && mbo != null){
				mboSetRemote = mbo.getThisMboSet();
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			}
			mbo = mboSetRemote.getMboForUniqueId(mbo.getUniqueIDValue());
			id = mbo.getUniqueIDValue(); 
			mbo = mbo.getThisMboSet().moveNext();
			if (mbo == null){
				setMessage(new EZMessage(mboSetRemote.getMessage("system", "lastrecord"), EMMConstants.INFO));
				return ERROR;
			}
			id = mbo.getUniqueIDValue();	
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	
	@Action(value="prevsr",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
		}
	)
	public String prevSr() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote == null && mbo != null){
				mboSetRemote = mbo.getThisMboSet();
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			}

			mbo = mboSetRemote.getMboForUniqueId(mbo.getUniqueIDValue());
			id = mbo.getUniqueIDValue(); 
			mbo = mbo.getThisMboSet().movePrev();
			if (mbo == null){
				setMessage(new EZMessage(mboSetRemote.getMessage("system", "firstrecord"), EMMConstants.INFO));
				return ERROR;
			}
			id = mbo.getUniqueIDValue();			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
}
