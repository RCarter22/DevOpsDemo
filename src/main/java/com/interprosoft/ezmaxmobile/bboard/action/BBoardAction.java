/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.bboard.action;

import java.rmi.RemoteException;
import java.util.ArrayList;

import org.apache.commons.lang.StringUtils;
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

import com.interprosoft.ezmaxmobile.bboard.service.BulletinBoardService;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;
import com.interprosoft.ezmaxmobile.common.util.PushUtil;

@Component
@Scope("prototype")
@Namespace("/bboard")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class BBoardAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
		
	private final String APPNAME = "BBOARD";
	private final String OWNERMBO = "BULLETINBOARD";
	private final String BBORG = "BBORG";
	private final String BBSITE = "BBSITE";	
	private final String BBGROUP = "BBGROUP";	
	
	@Autowired
	private BulletinBoardService bulletinBoardService;
	
	@Action(value="main", results={
		@Result(name="success",location="main.jsp"),
		@Result(name="error",location="main.jsp")
	})	
	public String main() {
		try {
			clearMboSession(this.OWNERMBO);
			clearAppSessions();
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
				@Result(name="success", location="bblist.jsp"),
				@Result(name="error", location="bblist.jsp")
			}
		)
	public String list() {
		try{					
			clearMboSession(OWNERMBO);
			clearMboSession("BBADDNEW");
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
	
	@Action(value="bbview",
			results={
				@Result(name="success", location="bbview.jsp"),
				@Result(name="error", location="bbview.jsp")
			}
		)
	public String bbview() {
		try{
			mbo = this.simpleService.findById(OWNERMBO, id);
			this.setMboSession(OWNERMBO, mbo);
			if (mbo==null){
				this.setMessage(new EZMessage(getText("global.norecords"), EMMConstants.INFO));
			}			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="bborg",
			results={
				@Result(name="success", location="bbaudience.jsp"),
				@Result(name="error",location="bbaudience.jsp")
			}
		)
	public String bborg() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if (mbo==null){
				mbo = this.simpleService.findById(this.OWNERMBO,id);
				setMboAppName(APPNAME);
			}
			this.mboList = this.simpleService.paginateMboSet(mbo.getMboSet(BBORG), pagination);
			this.appAction = BBORG;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	

	@Action(value="bbaudience",
			results={
				@Result(name="success", location="bbaudience.jsp"),
				@Result(name="error",location="bbaudience.jsp")
			}
		)
	public String bbaudience() {
		try{		
			mbo = (MboRemote)this.getSessionObject("BBADDNEW");
			String type = (String)this.getSessionObject("BBADDNEWTYPE");
			if (mbo == null){
				return ERROR;
			}
			this.appAction = type;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="addbbaudience",
			results={
				@Result(name="success",location="bbaudience.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="bbaudience.action",type="redirect",params={"id","${id}"})
			}
		)
	public String addbbaudience() {
		try{		
			String type = appAction;
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			setMboSession("BBADDNEW", mbo.getMboSet(type).add());
			setSessionObject("BBADDNEWTYPE", type);
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
	
	@Action(value="bbsite",
			results={
				@Result(name="success", location="bbaudience.jsp")
			}
		)
	public String bbsite() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if (mbo==null){
				mbo = this.simpleService.findById(this.OWNERMBO,id);
				setMboAppName(APPNAME);
			}
			this.mboList = this.simpleService.paginateMboSet(mbo.getMboSet(BBSITE), pagination);
			this.appAction = BBSITE;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="bbgroup",
			results={
				@Result(name="success", location="bbaudience.jsp")
			}
		)
	public String bbgroup() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if (mbo==null){
				mbo = this.simpleService.findById(this.OWNERMBO,id);
				setMboAppName(APPNAME);
			}
			this.mboList = this.simpleService.paginateMboSet(mbo.getMboSet(BBGROUP), pagination);
			this.appAction = BBGROUP;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="quicksearch",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String quickSearch() {
		try{			
			this.mboList = simpleService.quickSearch(OWNERMBO, searchFlds, search, pagination);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="create", results={
			@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="bulletin.jsp")
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
	
	@Action(value="view", results={
		@Result(name="success",location="bulletin.jsp")
	})
	public String view() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if (mbo==null){
				mbo = this.simpleService.findById(this.OWNERMBO,id);
				setMboAppName(APPNAME);
			}
			setMboSession(this.OWNERMBO,this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}

	@Action(value="bboard", results={
			@Result(name="success",location="bboard.jsp"),
			@Result(name="error",location="bboard.jsp")
		})	
	public String bboard(){
		try {
			mboList = bulletinBoardService.getMessages(pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	

	@Action(value="bbmessage", results={
			@Result(name="success",location="bbmessage.jsp"),
			@Result(name="error",location="bbmessage.jsp")
		})	
	public String bbmessage(){
		try {
			mboList = bulletinBoardService.getMessages(pagination);
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
			MboSetRemote mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
			mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
			mboSetRemote.resetQbe();			
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
			mboSet = this.user.getSession().getMboSet(OWNERMBO);
			mboSet.setWhere(mbo.getThisMboSet().getCompleteWhere());
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);		
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="push",results={
			@Result(name="success", location="view.action", type="redirect",params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect",params={"id","${id}"})
		}
	)
	public String push() {
		try{	
			populateMbo(OWNERMBO, APPNAME);
			id = mbo.getUniqueIDValue();

			try{
				ArrayList audience = new ArrayList();
				
				MboSetRemote audienceSetRemote = mbo.getMboSet("BBAUD");
				for(MboRemote currMbo=audienceSetRemote.moveFirst(); currMbo!=null; currMbo=audienceSetRemote.moveNext())
				{
					if (!currMbo.isNull("MSGORGID"))
						audience.add(currMbo.getString("MSGORGID"));
					else if (!currMbo.isNull("MSGSITEID"))
						audience.add(currMbo.getString("MSGSITEID"));
					else if (!currMbo.isNull("PERSONGROUP"))
						audience.add(currMbo.getString("PERSONGROUP"));
				}

				if (!audience.isEmpty()){
					PushUtil pushUtil = new PushUtil();
					pushUtil.setGroup(StringUtils.join(audience, ","));
					pushUtil.setAlert(getText("bboard.alert"));
					pushUtil.setDetails(mbo.getString("MESSAGE"));
					pushUtil.setOpenLink("bboard/bbview.action?id="+mbo.getUniqueIDValue());
					pushUtil.push();
					this.setMessage(new EZMessage(getText("notification.sent"), EMMConstants.INFO));
				} else {
					this.setMessage(new EZMessage(getText("bboard.noaudience"), EMMConstants.ERROR));
				}
			}catch(Exception e)
			{
				this.setMessage(new EZMessage(getText("notification.notsent"), EMMConstants.ERROR));
				return ERROR;
			}
			this.setMessage(new EZMessage(getText("notification.sent"), EMMConstants.INFO));
			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
}
