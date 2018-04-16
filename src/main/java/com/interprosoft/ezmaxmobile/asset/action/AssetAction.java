/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.asset.action;

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

import psdi.app.asset.AssetRemote;
import psdi.app.asset.AssetSetRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.mbo.NonPersistentMboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/asset")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class AssetAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	
	public static final String OWNERMBO = "ASSET";
	
	public static final String APPNAME = "ASSET";
	
	public static final String DOWNTIMEREPORT = "DOWNTIMEREPORT";
	private String assetDownView = "CHANGESTATUS";
	
	@Autowired
	public SimpleService simpleService;
	
	@Action(value="main",
			results={
				@Result(name="success", location="main.jsp"),
				@Result(name="error", location="main.jsp")
			}
		)
	public String execute() {
		try{
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
	                mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO).getThisMboSet();
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
		try {
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
		} catch (Exception e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="listwos",
			results={
				@Result(name="success", location="listwos.jsp"),
				@Result(name="error", location="listwos.jsp")
			}
		)
	public String listwos() {
		try{				
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"ALLWO");
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
	
	@Action(value="view",
			results={
				@Result(name="success", location="asset.jsp"),
				@Result(name="error", location="asset.jsp"),
				@Result(name="input", location="main.action", type="redirect")
			}
		)
	public String view() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			setSessionObject("ASSETMOVE",null);
			setSessionObject(DOWNTIMEREPORT, null);
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
			mbo = (MboRemote)((AssetRemote)mbo).createWorkorder(null);
			
			id = mbo.getUniqueIDValue();
			setMessage(new EZMessage(mbo.getMessage("ticket", "WOCreated", new String[]{mbo.getString("WONUM")}), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	@Action(value="createservicerequest",
			results={
				@Result(name="success",location="../sr/view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createServiceRequest() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
			{
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			mbo = (MboRemote)((AssetRemote)mbo).createServiceRequest(null);
			
			id = mbo.getUniqueIDValue();
			setMessage(new EZMessage(mbo.getMessage("ticket", "SRCreated", new String[]{mbo.getString("TICKETID")}), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="listsubassemblies",
			results={
				@Result(name="success", location="listsubassemblies.jsp"),
				@Result(name="error", location="listsubassemblies.jsp")
			}
		)
	public String listsubassemblies() {
		try {
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"CHILDREN");
			this.setSessionObject("SUBASSEMBLY", null);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}	
	
	@Action(value="viewsubassembly",
			results={
				@Result(name="success", location="subassembly.jsp"),
				@Result(name="error", location="subassembly.jsp"),
				@Result(name="list",location="listsubassemblies.action",type="redirect",params={"id","${id}"})
			}
		)
	public String viewsubassembly() {
		try{				
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("CHILDREN",id);
			}else{
				if (mbo.toBeSaved())
					mbo = this.simpleService.findById(mbo.getMboSet("CHILDREN"), id);
				else{
					mbo = (MboRemote)this.getSessionObject(OWNERMBO);
					id = mbo.getUniqueIDValue();
					return "list";					
				}					
			}
			setMboSession("SUBASSEMBLY",this.mbo);				
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="addsubassembly", results={
			@Result(name="success",location="viewsubassembly.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="listsubassemblies.action",type="redirect",params={"id","${id}"})
		})
	public String addsubassembly(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			mbo = simpleService.add(mbo.getMboSet("CHILDREN"));
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="deletesubassembly", results={
			@Result(name="success",location="listsubassemblies.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="listsubassemblies.action",type="redirect",params={"id","${id}"})
		})
	public String deletesubassembly(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("CHILDREN"), id);
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
	
	@Action(value="listspareparts",
			results={
				@Result(name="success", location="listspareparts.jsp"),
				@Result(name="error", location="listspareparts.jsp")
			}
		)
	public String listspareparts() {
		try{				
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"SPAREPART");
			this.setSessionObject("SPAREPART", null);
			this.setSessionObject("SPAREPARTS", null);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="viewsparepart",
			results={
				@Result(name="success", location="sparepart.jsp"),
				@Result(name="error", location="sparepart.jsp")
			}
		)
	public String viewsparepart() {
		try{				
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("SPAREPART",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("SPAREPART"), id);
			}
			setMboSession("SPAREPART",this.mbo);				
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="addsparepart", results={
			@Result(name="success",location="viewsparepart.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="listspareparts.action",type="redirect",params={"id","${id}"})
		})
	public String addline(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			mbo = simpleService.add(mbo.getMboSet("SPAREPART")); 
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="deletesparepart", results={
			@Result(name="success",location="listspareparts.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="listspareparts.action",type="redirect",params={"id","${id}"})
		})
	public String deletesparepart(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("SPAREPART"), id);
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
	
	@Action(value="selectspareparts",
			results={
				@Result(name="success", location="../common/selectspareparts.jsp"),
				@Result(name="error", location="../common/selectspareparts.jsp")
			}
		)
	public String selectSpareParts() {
		try {		
			populateMbo(OWNERMBO, APPNAME);
			if(this.getSessionObject("SPAREPART") == null){
				this.mboSet = simpleService.getMboSet("SPAREPART");
				//this.mboSet.setQueryBySiteQbe();
				this.mbo = this.mboSet.getZombie();
				this.setMboSession("SPAREPART", this.mbo);				
				this.mboSet.reset();
				this.setSessionObject("SPAREPARTS", this.mbo.getThisMboSet());				
			} else {
				this.mbo = (MboRemote)this.getSessionObject("SPAREPART");
				this.mboSet = this.mbo.getThisMboSet();
				if ("1".equals(request.getParameter("refine")))
					this.mboSet.reset();
			}			
			if ("POST".equals(request.getMethod())){			
				this.mbo = this.mboSet.getZombie();
				this.setMboSession("SPAREPART", this.mbo);
				this.setSessionObject("SPAREPARTS", this.mbo.getThisMboSet());
			}				
			mboList = simpleService.paginateMboSet(this.mboSet, pagination);
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
	
	@Action(value="saveselectedspareparts",
			results={
				@Result(name="success",location="listspareparts.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="listspareparts.action",type="redirect",params={"id","${id}"})
		}
	)
	public String saveSelectedSpareParts() {
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			MboSetRemote selectedSet = (MboSetRemote)this.getSessionObject("SPAREPARTS");	
			this.setSessionObject("SPAREPARTS", null);
			AssetRemote assetRemote = (AssetRemote)mbo;
			
			assetRemote.copySpareParts(selectedSet);
			
			this.setSessionObject(OWNERMBO, this.mbo);
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
	
	@Action(value="downtime",
			results={
				@Result(name="success", location="downtime.jsp"),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String downtime() {
		try{			
			MboRemote dtRemote = (MboRemote)this.getSessionObject(DOWNTIMEREPORT);
			if (dtRemote == null){
				populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
				id = mbo.getUniqueIDValue();
				AssetRemote asset = (AssetRemote)mbo;
				//wo.canReportDowntime();
				NonPersistentMboSetRemote downTimeSet = (NonPersistentMboSetRemote)mbo.getMboSet(DOWNTIMEREPORT);
				downTimeSet.setup();
				//conditional here based on what value we're passing in
				//0 is Change Status, 1 is Report Downtime
				downTimeSet.setDefaultValue("ISDOWNTIMEREPORT", "0");
				
				mbo = downTimeSet.addAtEnd();
			} else {
				mbo = dtRemote;
				if(assetDownView.equalsIgnoreCase("CHANGESTATUS"))
					mbo.setValue("ISDOWNTIMEREPORT", "0");
				else
					mbo.setValue("ISDOWNTIMEREPORT", "1");
			}
			this.setMboSession(DOWNTIMEREPORT, mbo);			
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
	
	@Action(value="dodowntime",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="downtime.action",type="redirect",params={"id","${id}"})
			}
		)
	public String dodowntime() {
		try{			
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			id = mbo.getUniqueIDValue();
			
			MboRemote dtRemote = (MboRemote)this.getSessionObject(DOWNTIMEREPORT);
			if (dtRemote != null){
				id = dtRemote.getOwner().getUniqueIDValue();
				
				//replaced OOB code with below which follows Maximo business logic starting from the 
				//execute() method on the DowntimeReport non-persistent mbo
				//OOB code was broken - I suspect it stopped working with Maximo v7.6.0.6
			    dtRemote.validate();
			    
			    boolean isDTReport = dtRemote.getInt("ISDOWNTIMEREPORT") == 1;
			    boolean isOperationalDT = dtRemote.getInt("OPERATIONAL") == 1;
			    
			    MboRemote owner = null;
			    MboRemote tempowner = dtRemote.getOwner();
			    if (tempowner.isBasedOn("MULTIASSETLOCCI")) 
			      owner = tempowner.getOwner();
			    else 
			      owner = tempowner;
			    			    
			    MboSetRemote assetSet = this.mbo.getThisMboSet();
			    AssetRemote asset = (AssetRemote)mbo;			    
			    
			    if (isDTReport)			      
			      asset.reportDowntime(owner, dtRemote.getDate("startdate"), dtRemote.getDate("enddate"), dtRemote.getDouble("downtime"), dtRemote.getString("code"), isOperationalDT);			    
			    else
			      asset.recordAssetStatusChange(owner, dtRemote.getDate("statuschangedate"), dtRemote.getString("statuschangecode"), isOperationalDT);
			    			   
			    mbo.getThisMboSet().save();				
				this.setMboSession(OWNERMBO, null);
				
			    if (isDTReport) 
			    	setMessage(new EZMessage(mbo.getMessage("asset", "downtimerptsuccess"), EMMConstants.SUCCESS));
			    else	
			    	setMessage(new EZMessage(mbo.getMessage("asset", "assetstatchangesuccess"), EMMConstants.SUCCESS));
			}
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
	
	@Action(value="moveassetdialog", results={
			@Result(name="success",location="moveswap.jsp"),
			@Result(name="error",location="moveswap.jsp")
		})
	public String moveAssetDialog(){		
		try {
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			if (mbo==null)
				mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			mbo.getThisMboSet().save();
			/*populateMboListByRelationship(OWNERMBO,"ALLASSET");*/
			mboList = this.simpleService.paginateMboSet(mbo.getThisMboSet(), pagination);
			this.appAction = "VIEWMOVELIST";
			setMboSession("ASSETMOVE",null);
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
    
	@Action(value="viewmove", results={
            @Result(name="success",location="moveswap.jsp"),
            @Result(name="error",location="moveswap.jsp")
      })
      public String viewMove(){           
            try{  
                  mbo = (MboRemote)this.getSessionObject(OWNERMBO);
                  
                  if(this.getSessionObject("ASSETMOVE") == null){
                        AssetRemote assetRemote = (AssetRemote)mbo;
                        AssetSetRemote assetSetRemote = (AssetSetRemote) assetRemote.getThisMboSet();
                        assetSetRemote.setMoveAssetPageFlag(true);
                        mbo = assetSetRemote.moveFirst();
                  }
                  else{
                        mbo = (MboRemote) this.getSessionObject("ASSETMOVE");
                  }
                  setMboSession("ASSETMOVE",this.mbo);
                  this.appAction = "VIEWMOVE";
            } catch (Exception e){
                  e.printStackTrace();
                  this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
                  this.addActionError(e.getMessage());
                  return ERROR;
            }           
            return SUCCESS;
      }     
      
      @Action(value="executemove", results={
            @Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
            @Result(name="error",location="viewmove.action",type="redirect",params={"id","${id}"})
            })
      public String executeMove(){        
            try {
                mbo = (MboRemote)this.getSessionObject("ASSETMOVE");
	            if(this.mbo==null)
	                  return ERROR;
	                  
	            /*mbo.getThisMboSet().save();
	            
	            mbo.getThisMboSet().reset();
	            mbo = mbo.getThisMboSet().getMboForUniqueId(mbo.getUniqueIDValue());*/
	            
	            ((AssetSetRemote)mbo.getThisMboSet()).moveAsset();
	            ((AssetSetRemote)mbo.getThisMboSet()).setMoveAssetPageFlag(false);
	            
	            mbo.getThisMboSet().save();
	            setMessage(new EZMessage(mbo.getMessage("asset", "AssetMoveWasSuccess", new String[]{mbo.getString("ASSETNUM"),mbo.getString("SITEID")}), EMMConstants.SUCCESS));                   
	            this.setMboSession("ASSETMOVE", null);
	            this.setMboSession("ASSET", null); 
	            id = mbo.getUniqueIDValue();
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


	public String getAssetDownView() {
		return assetDownView;
	}

	public void setAssetDownView(String assetDownView) {
		this.assetDownView = assetDownView;
	}	
		
}
