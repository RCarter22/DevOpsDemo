/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.viewdr.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.mr.MRRemote;
import psdi.mbo.MboConstants;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

@Component
@Scope("prototype")
@Namespace("/viewdr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class ViewDRAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
		
	private final String APPNAME = "VIEWDR";
	private final String OWNERMBO = "MR";
	
	@Action(value="main",results={
			@Result(name="success", location="main.jsp"),
			@Result(name="error", location="main.jsp")
		}
	)
	public String main() {
		clearMboSession(OWNERMBO);
		clearAppSessions();		
		clearadvancedsearch();
		clearMboSession(EMMConstants.CURRENTWHERECLAUSE);
		return SUCCESS;
	}	
	
	@Action(value="viewdrafts",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String viewdrafts() {
		try{
			String defaultStatus = "DRAFT";
			
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote!=null)
				mboSetRemote.reset();
			else {
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
				mboSetRemote.setQbe("STATUS", defaultStatus);
				mboSetRemote.setAppWhere("requestedby in (select personid from personancestor where ancestor=:user) or requestedfor  in (select personid from personancestor where ancestor=:user)");
				this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);				
			}
			mboList = this.simpleService.paginateMboSet(mboSetRemote, pagination);
			this.setSessionObject("MRLISTSTATUS", defaultStatus);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	

	@Action(value="viewreqs",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String viewreqs() {
		try{
			String defaultStatus = "APPR";
			
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote!=null)
				mboSetRemote.reset();
			else {
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
				mboSetRemote.setQbe("STATUS", defaultStatus);
				mboSetRemote.setAppWhere("requestedby in (select personid from personancestor where ancestor=:user) or requestedfor  in (select personid from personancestor where ancestor=:user)");
				this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);				
			}
			mboList = this.simpleService.paginateMboSet(mboSetRemote, pagination);
			this.setSessionObject("MRLISTSTATUS", defaultStatus);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		

	@Action(value="view", results={
		@Result(name="success",location="mr.jsp"),
		@Result(name="error",location="mr.jsp")
	})
	public String view() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			mbo = (MRRemote)mbo;
			this.mbo.setFlag(MboConstants.READONLY, true);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="mrlines", results={
		@Result(name="success",location="mrlines.jsp"),
		@Result(name="error",location="mrlines.jsp")
	})	
	public String mrlines() {			
		try {
			clearMboSession("MRLINE");			
			pagination.setPageSize(5);			
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"MRLINE","MRLINENUM ASC");
			this.mbo.setFlag(MboConstants.READONLY, true);
			setMboSession(OWNERMBO,this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="viewline", results={
		@Result(name="success",location="mrline.jsp"),
		@Result(name="error",location="mrline.jsp")
	})	
	public String viewline(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			mbo = this.simpleService.findById(mbo.getMboSet("MRLINE"), id);
			setMboSession("MRLINE",this.mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="doquicksearch",
			results={
				@Result(name="success", location="%{currentAction}", type="redirect", params={"search","${search}"}),
				@Result(name="error", location="list.jsp")
			}
		)
	public String doquickSearch() {
		try{	
			String defaultStatus = (String)this.getSessionObject("MRLISTSTATUS");
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
            if(mboSetRemote != null)
                mboSetRemote.resetQbe();
            if(mboSetRemote == null || (mboSetRemote != null && mboSetRemote.getApp() != null && !mboSetRemote.getApp().equalsIgnoreCase(this.APPNAME))){
			// Set default app where clause
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();			
				mboSetRemote.setQbe("STATUS", defaultStatus);
				mboSetRemote.setAppWhere("requestedby in (select personid from personancestor where ancestor=:user) or requestedfor  in (select personid from personancestor where ancestor=:user)");
				mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
				mboSetRemote.resetQbe();
            }
			this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			if (defaultStatus.equals("DRAFT"))
				this.currentAction = "viewdrafts.action";
			else
				this.currentAction = "viewreqs.action";
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
			String defaultStatus = (String)this.getSessionObject("MRLISTSTATUS");
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			if(mbo==null){
				mbo =  this.simpleService.getZombieMbo(OWNERMBO);
				setMboAppName(APPNAME);
				
				boolean customQbe = false;
				// Include currently used mbo set
				MboSetRemote currentMboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
				if (currentMboSetRemote!=null){					
					String[][] test = currentMboSetRemote.getQbe();
					for (int i = 0; i < test.length; i++) {
						customQbe = true;
						mbo.getThisMboSet().setQbe(test[i][0], test[i][1]);
					}
				}
				
				if (customQbe){
					// Add default QBE
					mbo.getThisMboSet().setQbe("STATUS", defaultStatus);
					mbo.getThisMboSet().setAppWhere("requestedby in (select personid from personancestor where ancestor=:user) or requestedfor  in (select personid from personancestor where ancestor=:user)");										
				} else if (currentMboSetRemote != null){
					String completeWhere = currentMboSetRemote.getCompleteWhere(); 
					mbo.getThisMboSet().resetQbe();
					mbo.getThisMboSet().setWhere(completeWhere);
					mbo.getThisMboSet().setAppWhere("requestedby in (select personid from personancestor where ancestor=:user) or requestedfor  in (select personid from personancestor where ancestor=:user)");
				}				
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
			@Result(name="success", location="%{currentAction}", type="redirect"),
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
			//mr logic
			String defaultStatus = (String) this.getSessionObject("MRLISTSTATUS");
			if (defaultStatus.equals("DRAFT"))
				this.currentAction = "viewdrafts.action";
			else
				this.currentAction = "viewreqs.action";	
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
	
}
