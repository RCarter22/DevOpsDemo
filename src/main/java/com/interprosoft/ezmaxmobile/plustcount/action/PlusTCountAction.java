/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.plustcount.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.plust.app.plustcount.PlusTCountBookLinesSetRemote;
import psdi.plust.app.plustcount.PlusTCountBookRemote;

@Component
@Scope("prototype")
@Namespace("/plustcount")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusTCountAction extends BaseAction{	
	private static final long serialVersionUID = 1L;	
	
	private final String APPNAME = "PLUSTCOUNT";
	private final String OWNERMBO = "PLUSTCB";
	
	private String currentPage;
	
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
				@Result(name="success", location="countbook.jsp"),
				@Result(name="error", location="countbook.jsp")
			}
		)
	public String view() {
		try{									
			populateMbo(OWNERMBO, APPNAME);
			
			pagination.setPageSize(5);
			
			populateMboListByRelationship(OWNERMBO,"PLUSTCBSELTYPE");			
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
			mbo = (MboRemote) this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			setMboAppName(APPNAME);
			mboSet = (MboSetRemote) this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSet != null){
				//mboSet.resetQbe();
				mboSet.setWhere("");
			}
			else
				mboSet = this.user.getSession().getMboSet(OWNERMBO);			
			//2020 - adv search issue
			mboSet.setWhere(mbo.getThisMboSet().getCompleteWhere());
			/*String[][] qbeSet = mbo.getThisMboSet().getQbe();
			for (int i = 0; i < qbeSet.length; i++) {
				mboSet.setQbe(qbeSet[i][0], qbeSet[i][1]);
			}*/
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);
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
	
	@Action(value="cblines", results={
			@Result(name="success",location="cblines.jsp"),
			@Result(name="error",location="cblines.jsp")
		})	
	public String cblines() {
		try {			
			populateMbo(OWNERMBO, APPNAME);					
			MboSetRemote plustCBLinesSet = this.mbo.getMboSet("PLUSTCBALLITM");
			this.setSessionObject("PLUSTCBLINESMBOSET", plustCBLinesSet);
			
			String currentPage = this.getSessionValueByName("CURRENTPAGE");
			
			if(currentPage != null && !currentPage.isEmpty()){
				this.setSessionValue("CURRENTPAGE", null);
				pagination.setCurrentPageNum(Integer.valueOf(currentPage));
			}
			pagination.setPageSize(10);
			mboList = this.simpleService.paginateMboSet(plustCBLinesSet, pagination);
			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	

	@Action(value="savecountbook",
			results={
				@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
				@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
			}
		)
	public String savecountbook() {
		try{			
            populateMbo(OWNERMBO,APPNAME);                  
            PlusTCountBookRemote cb = (PlusTCountBookRemote)mbo;
            cb.beforeSave((PlusTCountBookLinesSetRemote)mbo.getMboSet("PLUSTCBALLITM"));
            super.save();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="reconcile",
			results={
				@Result(name="success", location="cblines.action", type="redirect", params={"id","${id}","currentPage","${currentPage}"}),
				@Result(name="error", location="cblines.action", type="redirect", params={"id","${id}"})
			}
		)
	public String reconcile() {
		try{
			if(currentPage != null && !currentPage.isEmpty() && Integer.parseInt(currentPage) > 1 && currentAction != null && currentAction.contains("cblines.action"))
				this.setSessionValue("CURRENTPAGE", currentPage);
			
            populateMbo(OWNERMBO,APPNAME);                  
            PlusTCountBookLinesSetRemote cbLinesSet = (PlusTCountBookLinesSetRemote)mbo.getMboSet("PLUSTCBALLITM");
            cbLinesSet.reconcileLine(null);
			this.setMessage(new EZMessage(mbo.getMessage("plustcb", "reconciled"), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="cblinessave",
			results={
				@Result(name="success", location="cblines.action", type="redirect", params={"id","${id}","currentPage","${currentPage}"}),
				@Result(name="error", location="cblines.action", type="redirect", params={"id","${id}"})
			}
		)
	public String cblinessave() {
		try{
			if(currentPage != null && !currentPage.isEmpty() && Integer.parseInt(currentPage) > 1 && currentAction != null && currentAction.contains("cblines.action"))
				this.setSessionValue("CURRENTPAGE", currentPage);
			super.save();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	public String getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(String currentPage) {
		this.currentPage = currentPage;
	}
}
