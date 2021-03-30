/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.invusage.action;

import java.rmi.RemoteException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.inventory.InvUseRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/invusage")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class InvUsageAction extends BaseAction{	
	private static final long serialVersionUID = 1L;	
	
	private String relationship;
	
	private final String APPNAME = "INVUSAGE";
	private final String OWNERMBO = "INVUSE";
	
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
	
	@Action(value="view",
			results={
				@Result(name="success", location="invusage.jsp"),
				@Result(name="error", location="invusage.jsp")
			}
		)
	public String view() {
		try{
			clearMboSession("INVUSELINE");	
			this.setSessionObject(this.relationship != null ? this.relationship : "", null);
			this.setSessionObject("INVBALANCESOUT", null);
			this.setSessionObject("MATUSETRANSRETURN", null);
			this.setSessionObject("INVRESERVE", null);
			this.setSessionObject("INVUSESPAREPART", null);	
			
			pagination.setPageSize(5);			
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"INVUSELINE","INVUSELINENUM ASC");			
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
				this.setMboSession(EMMConstants.ADVANCEDSEARCHMBO, mbo);
			}
			
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
			// Set default app where clause
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
            if(mboSetRemote != null)
                  mboSetRemote.resetQbe();
            if(mboSetRemote == null || (mboSetRemote != null && mboSetRemote.getApp() != null && !mboSetRemote.getApp().equalsIgnoreCase(this.APPNAME))){
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
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
	
	@Action(value="viewline", results={
			@Result(name="success",location="invusageline.jsp"),
			@Result(name="error",location="invusageline.jsp")
		})	
	public String viewline(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			mbo = this.simpleService.findById(mbo.getMboSet("INVUSELINE"), id);
			setMboSession("INVUSELINE",this.mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	

	@Action(value="addline", results={
			@Result(name="success",location="viewline.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		})
	public String addline(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			if(mbo.getString("FROMSTORELOC").isEmpty()){									
				this.setMessage(new EZMessage(getText("invusage.specifystoreroom"), EMMConstants.ERROR));	
				return ERROR;
			}			
			mbo = simpleService.add(mbo.getMboSet("INVUSELINE"));
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="deleteline", results={
			@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		})
	public String delete(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("INVUSELINE"), id);
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
	
	@Action(value="selectitems",
			results={
				@Result(name="success", location="selectitems.jsp"),
				@Result(name="error", location="selectitems.jsp")
			}
		)
	public String selectItems() {
		try {
			this.relationship = "INVBALANCESOUT";
			prepareSelectItemList();
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
	
	@Action(value="selectitemreturn",
			results={
				@Result(name="success", location="selectitems.jsp"),
				@Result(name="error", location="selectitems.jsp")
			}
		)
	public String selectItemReturn() {
		try {
			this.relationship = "MATUSETRANSRETURN";
			prepareSelectItemList();
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
	
	@Action(value="selectreserveditems",
			results={
				@Result(name="success", location="selectitems.jsp"),
				@Result(name="error", location="selectitems.jsp")
			}
		)
	public String selectReservedItems() {
		try {
			this.relationship = "INVRESERVE";
			prepareSelectItemList();
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
	
	@Action(value="selectspareparts",
			results={
				@Result(name="success", location="selectitems.jsp"),
				@Result(name="error", location="selectitems.jsp")
			}
		)
	public String selectSpareParts() {
		try {
			this.relationship = "INVUSESPAREPART";
			prepareSelectItemList();
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
	
	private void prepareSelectItemList() throws RemoteException, MXException, BaseMaximoException{
		populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));							
		if(this.getSessionObject(this.relationship) == null)
		{
			MboSetRemote mboSetRemote = mbo.getMboSet(this.relationship);
			mboList = simpleService.paginateMboSet(mboSetRemote, pagination);
			this.setSessionObject(this.relationship, mboSetRemote);
		}
		else
			mboList = simpleService.paginateMboSet((MboSetRemote)this.getSessionObject(this.relationship), pagination);		
	}

	@Action(value="saveselecteditems",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="selectitems.action",type="redirect",params={"id","${id}"})
		}
	)
	public String saveSelectedItems() {
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			MboSetRemote selectedItemsSet = (MboSetRemote)this.getSessionObject(this.relationship);	
			this.setSessionObject(this.relationship, null);
			InvUseRemote invUse = (InvUseRemote)mbo;
			
			if(this.relationship.equalsIgnoreCase("INVBALANCESOUT"))
				invUse.copyInvBalancesSetForItems(selectedItemsSet);
			else if(this.relationship.equalsIgnoreCase("MATUSETRANSRETURN"))
				invUse.copyInvUseLineSetForReturn(selectedItemsSet);
			else if(this.relationship.equalsIgnoreCase("INVRESERVE"))
				invUse.copyInvReserveSetForInvUse(selectedItemsSet);
			else if(this.relationship.equalsIgnoreCase("INVUSESPAREPART"))
				invUse.copySparePartSetForInvUse(selectedItemsSet);		
			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String getRelationship() {
		return relationship;
	}

	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}
}
