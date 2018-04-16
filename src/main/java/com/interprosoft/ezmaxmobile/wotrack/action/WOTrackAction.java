/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.wotrack.action;

import java.rmi.RemoteException;

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

import psdi.app.asset.AssetRemote;
import psdi.app.workorder.AssignmentRemote;
import psdi.app.workorder.MultiAssetLocCIRemote;
import psdi.app.workorder.WORemote;
import psdi.app.workorder.virtual.AssignLaborSetRemote;
import psdi.mbo.MboConstants;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.mbo.NonPersistentMboRemote;
import psdi.mbo.NonPersistentMboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;
import com.interprosoft.ezmaxmobile.common.util.PushUtil;

@Component
@Scope("prototype")
@Namespace("/wotrack")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class WOTrackAction  extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	public static final String APPNAME = "WOTRACK";	
	public static final String OWNERMBO = "WORKORDER";
	public static final String DOWNTIMEREPORT = "DOWNTIMEREPORT";
	private String assetDownView = "CHANGESTATUS";
	
	private String meterRelationship = "ACTIVEASSETMETER";
	
	private String[] personOptions;
	private String groupOptions;
	private String notificationMessage;
	
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
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			setMboAppName(APPNAME);
			
			MboSetRemote labTransSet = this.user.getSession().getMboSet("LABTRANS");
			labTransSet.setQbe("LABOR.PERSONID", this.user.getPersonId());
			labTransSet.setQbe("TIMERSTATUS", "ACTIVE");			
			labTransSet.setQbeExactMatch(true);
			labTransSet.reset();
			mboList = this.simpleService.paginateMboSet(labTransSet, pagination);
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
			@Result(name="success", location="wotrack.jsp"),
			@Result(name="error", location="wotrack.jsp"),
			@Result(name="input", location="main.action", type="redirect")
		}
	)
	public String view() {
		try{	
			this.setSessionObject("DOWNTIMEREPORT", null);
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
	
	@Action(value="push",results={
			@Result(name="success", location="view.action", type="redirect",params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect",params={"id","${id}"})
		}
	)
	public String push() {
		try{	
			populateMbo(OWNERMBO, APPNAME);
			id = mbo.getUniqueIDValue();
			
			String joinedPerson = "";
			if (personOptions != null) {
				joinedPerson = StringUtils.join(personOptions, ",");  
			}

			try{
				PushUtil pushUtil = new PushUtil();
				pushUtil.setPerson(joinedPerson);
				pushUtil.setGroup(this.groupOptions);
				pushUtil.setAlert("[" + getText("wotrack.shortwonum") + mbo.getString("WONUM") + "] " + getText("notification.messagefrom", new String[]{this.user.getSession().getUserInfo().getDisplayName()}));
				pushUtil.setDetails(this.notificationMessage);
				pushUtil.setOpenLink("wotrack/view.action?id="+mbo.getUniqueIDValue());
				pushUtil.setSentBy(user.getSession().getUserInfo().getDisplayName() + " " + getText("notification.fromemm"));
				pushUtil.setRefNum(APPNAME + "_" + id);
				pushUtil.push();
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

	@Action(value="nextwo",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
		}
	)
	public String nextWo() {
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
	
	@Action(value="prevwo",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
		}
	)
	public String prevWo() {
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

	@Action(value="nexttask",
			results={
			@Result(name="success",location="viewtask.action", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="viewtask.action",type="redirect",params={"id","${id}"})
		}
	)
	public String nextTask() {
		try{
			// Populate the WORKORDER mbo that was in session
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);	
			MboSetRemote tasksMboSetRemote = null;
			if (mbo != null) {
				mbo = this.simpleService.findById(OWNERMBO, mbo.getUniqueIDValue());
				tasksMboSetRemote = mbo.getMboSet("WOACTIVITY");
			}

			// Populate the TASK mbo that was in session
			mbo = (MboRemote)this.getSessionObject("WOACTIVITY");
			MboSetRemote mboSetRemote = this.mbo.getThisMboSet();

			// Safeguard comparison.  
			// Sometimes the count using this.mbo.getThisMboSet() will return only 1 => containing only the mbo in question
			// But the entire WOACTIVITY set is bigger than 1 so we need to use the entire mbo ACTIVITY set instead
			if (tasksMboSetRemote != null) {
				if (mboSetRemote.count() == 1 && tasksMboSetRemote.count() > mboSetRemote.count()) {
					mboSetRemote = tasksMboSetRemote;
					MboRemote mboRemote = mboSetRemote.moveTo(0);
					while (mboRemote != null) {
						if (mboRemote.getUniqueIDValue() == mbo.getUniqueIDValue()) {
							break;
						}
						mboRemote = mboSetRemote.moveNext();
					}
				}
			}
			mbo = mboSetRemote.moveNext();        	
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

	@Action(value="prevtask",
			results={
			@Result(name="success",location="viewtask.action", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="viewtask.action",type="redirect",params={"id","${id}"})
		}
	)
	public String prevTask() {
		try{
			// Populate the WORKORDER mbo that was in session
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);	
			MboSetRemote tasksMboSetRemote = null;
			if (mbo != null) {
				mbo = this.simpleService.findById(OWNERMBO, mbo.getUniqueIDValue());
				tasksMboSetRemote = mbo.getMboSet("WOACTIVITY");
			}

			// Populate the TASK mbo that was in session
			mbo = (MboRemote)this.getSessionObject("WOACTIVITY");
			MboSetRemote mboSetRemote = this.mbo.getThisMboSet();

			// Safeguard comparison.  
			// Sometimes the count using this.mbo.getThisMboSet() will return only 1 => containing only the mbo in question
			// But the entire WOACTIVITY set is bigger than 1 so we need to use the entire mbo ACTIVITY set instead			
			if (tasksMboSetRemote != null) {
				if (mboSetRemote.count() == 1 && tasksMboSetRemote.count() > mboSetRemote.count()) {
					mboSetRemote = tasksMboSetRemote;
					MboRemote mboRemote = mboSetRemote.moveTo(0);
					while (mboRemote != null) {
						if (mboRemote.getUniqueIDValue() == mbo.getUniqueIDValue()) {
							break;
						}
						mboRemote = mboSetRemote.moveNext();
					}
				}
			}
			mbo = mboSetRemote.movePrev();      
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
	
	@Action(value="nextmultiasset",
			results={
			@Result(name="success",location="viewmultiasset.action", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="viewmultiasset.action",type="redirect",params={"id","${id}"})
		}
	)
	public String nextMultiAsset() {
		try{               
			mbo = (MboRemote)this.getSessionObject("MULTIASSETLOCCI");
			MboSetRemote mboSetRemote = this.mbo.getThisMboSet();
        	mbo = mboSetRemote.moveNext();        	
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

	@Action(value="prevmultiasset",
			results={
			@Result(name="success",location="viewmultiasset.action", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="viewmultiasset.action",type="redirect",params={"id","${id}"})
		}
	)
	public String prevMultiAsset() {
		try{         
			mbo = (MboRemote)this.getSessionObject("MULTIASSETLOCCI");
			MboSetRemote mboSetRemote = this.mbo.getThisMboSet();
        	mbo = mboSetRemote.movePrev();      
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
	            MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
	            if(mboSetRemote != null)
	                  mboSetRemote.resetQbe();
	            if(mboSetRemote == null || (mboSetRemote != null && mboSetRemote.getApp() != null && !mboSetRemote.getApp().equalsIgnoreCase(APPNAME))){
	                  mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO).getThisMboSet();
	                  mboSetRemote.setQbe("WOCLASS", "WORKORDER,ACTIVITY");
	                  mboSetRemote.setQbe("HISTORYFLAG" , "0");
	                  mboSetRemote.setQbe("ISTASK", "0");
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
	                  mbo.getThisMboSet().setQbe("WOCLASS", "WORKORDER,ACTIVITY");
	                  mbo.getThisMboSet().setQbe("ISTASK", "0");
	                  mbo.getThisMboSet().setQbe("HISTORYFLAG", "0");
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
		} catch (Exception e) {
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
	
	@Action(value="createchild",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createChild() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
				mbo = this.simpleService.findById(OWNERMBO,id);
			
			mbo = simpleService.add(mbo.getMboSet("CHILDNOTASK"));
			id = mbo.getUniqueIDValue();
			
			setMboSession(OWNERMBO, mbo);
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
	
	@Action(value="listChildren",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String listChildren() {
		try {
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"CHILDNOTASK");
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
	
	@Action(value="tasklist",
			results={
				@Result(name="success", location="tasklist.jsp"),
				@Result(name="error", location="tasklist.jsp")
			}
		)
	public String listTasks() {
		try {
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"WOACTIVITY","TASKID ASC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="viewtask",results={
			@Result(name="success", location="task.jsp"),
			@Result(name="error", location="task.jsp")
		}
	)
	public String viewTask() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("WOACTIVITY",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("WOACTIVITY"), id);
			}
			setMboSession("WOACTIVITY",this.mbo);				
			
// Comment out the following due to Issue # 1903 on project site				
//				MboRemote taskRemote = (MboRemote)this.getSessionObject("WOACTIVITY");
//				if (taskRemote == null || taskRemote.getUniqueIDValue() != id){
//					mbo = this.simpleService.findById(mbo.getMboSet("WOACTIVITY"), id);
//				} else {
//					mbo = taskRemote;
//				}
			
			
			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}
	
	@Action(value="completetask",results={
			@Result(name="success", location="${currentAction}", type="redirect"),
			@Result(name="error", location="${currentAction}", type="redirect")
		}
	)
	public String completeTask() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("WOACTIVITY",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("WOACTIVITY"), id);
			}
			setMboSession("WOACTIVITY",this.mbo);			
			this.doChangeStatus();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="createtask",
			results={
				@Result(name="success",location="viewtask.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="tasklist.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createTask() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
			{
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			mbo = simpleService.add(mbo.getMboSet("WOACTIVITY")); 
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="canceltask", results={
			@Result(name="success",location="tasklist.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="tasklist.action",type="redirect",params={"id","${id}"})
		})
	public String canceltask(){
		try {			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);	
			mbo.delete();			
			mbo.getOwner().getThisMboSet().save();
			this.setMboSession(currentMbo, null);
			this.setMboSession(mbo.getOwner().getName(), mbo.getOwner());
			id = mbo.getOwner().getUniqueIDValue();
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
	
	@Action(value="multiassetlist",
			results={
				@Result(name="success", location="multiassetlist.jsp"),
				@Result(name="error", location="multiassetlist.jsp")
			}
		)
	public String multiAssetList() {
		try {
			if(pagination!=null)
				pagination.setPageSize(50);			
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			MboSetRemote multiSetRemote = this.mbo.getMboSet("MULTIASSETLOCCI");
			multiSetRemote.setOrderBy("SEQUENCE ASC");
			this.mboList = this.simpleService.paginateMboSet(multiSetRemote, pagination);
			this.setSessionObject("MULTIASSETLOCCI", multiSetRemote);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="viewmultiasset",results={
			@Result(name="success", location="multiasset.jsp"),
			@Result(name="error", location="multiasset.jsp")
		}
	)
	public String viewMultiAsset() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("MULTIASSETLOCCI",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("MULTIASSETLOCCI"), id);
			}
			setMboSession("MULTIASSETLOCCI",this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="addmultiasset",results={
			@Result(name="success", location="viewmultiasset.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="multiassetlist.action", type="redirect", params={"id","${id}"})
		}
	)
	public String addMultiAsset() {
		try{	
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			mbo = simpleService.add(mbo.getMboSet("MULTIASSETLOCCI")); 
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="cancelmultiasset", results={
			@Result(name="success",location="multiassetlist.action",type="redirect", params={"id","${id}"}),
			@Result(name="error",location="multiassetlist.action",type="redirect",params={"id","${id}"})
		})
	public String cancelmultiasset(){
		try {			
			mbo = (MboRemote)this.getSessionObject("MULTIASSETLOCCI");	
			mbo.delete();			
			MboSetRemote ownerSet = mbo.getOwner().getThisMboSet();
			ownerSet.save();
			ownerSet.reset();
			id = mbo.getOwner().getUniqueIDValue();
			this.setMboSession("MULTIASSETLOCCI", null);
			this.setMboSession(mbo.getOwner().getName(), ownerSet.getMbo(0));
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
		
	@Action(value="createfollowup",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createFollowup() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
			{
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			mbo.setValue("HASFOLLOWUPWORK", true, MboConstants.NOACCESSCHECK);
			mbo.getThisMboSet().save();
			mbo = ((WORemote)mbo).createWorkorder(); 
			id = mbo.getUniqueIDValue();
			setMessage(new EZMessage(mbo.getMessage("ticket", "WOCreated", new String[]{mbo.getString("WONUM")}), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="meter",
			results={
				@Result(name="success", location="meters.jsp"),
				@Result(name="error", location="meters.jsp")
			}
		)
	public String meter() {
		try {
			populateMbo(OWNERMBO, APPNAME);		
			populateMboListByRelationship(OWNERMBO, meterRelationship);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="failurereporting",
			results={
				@Result(name="success", location="failurereporting.jsp"),
				@Result(name="error", location="failurereporting.jsp")
			}
		)
	public String failureReporting() {
		try {
			populateMbo(OWNERMBO,APPNAME);
			populateMboListByRelationship(OWNERMBO, "FAILUREREPORT");
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
				WORemote wo = (WORemote)mbo;
				wo.canReportDowntime();
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
			    			    
			    MboSetRemote assetSet = this.mbo.getMboSet("ASSET");
			    AssetRemote asset = ((AssetRemote)assetSet.getMbo(0));			    
			    
			    if (isDTReport)			      
			      asset.reportDowntime(owner, dtRemote.getDate("startdate"), dtRemote.getDate("enddate"), dtRemote.getDouble("downtime"), dtRemote.getString("code"), isOperationalDT);			    
			    else
			      asset.recordAssetStatusChange(owner, dtRemote.getDate("statuschangedate"), dtRemote.getString("statuschangecode"), isOperationalDT);
			    
			    assetSet.save();
			    assetSet.close();
			    owner.getThisMboSet().save();
				this.setMboSession(DOWNTIMEREPORT, null);
				
			    if (isDTReport) 
			    	setMessage(new EZMessage(mbo.getMessage("asset", "downtimerptsuccess"), EMMConstants.SUCCESS));
			    else	
			    	setMessage(new EZMessage(mbo.getMessage("asset", "assetstatchangesuccess"), EMMConstants.SUCCESS));
			    
			    //Old OOB code for previous versions
				/*((NonPersistentMboSetRemote)dtRemote.getThisMboSet()).execute();
				dtRemote.getOwner().getThisMboSet().save();
				this.setMboSession(DOWNTIMEREPORT, null);
				setMessage(new EZMessage(mbo.getMessage("asset", "downtimerptsuccess"), EMMConstants.SUCCESS));*/
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
	
	@Action(value="starttimer",
			results={
				@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
				@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
			}
		)
	public String startTimer() {
		try {
			super.save();
			populateMbo(OWNERMBO,APPNAME);
			WORemote woRemote = (WORemote)mbo;
			woRemote.startTimer();
			woRemote.getThisMboSet().save();
			this.setMboSession(OWNERMBO, null);
			populateMbo(OWNERMBO,APPNAME);
			id = woRemote.getUniqueIDValue();
			setMessage(new EZMessage(getText("global.timerstarted"), EMMConstants.SUCCESS));
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
	
	@Action(value="stoptimer",
			results={
				@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
				@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
			}
		)
	public String stopTimer() {
		try {
			super.save();
			populateMbo(OWNERMBO,APPNAME);
			WORemote woRemote = (WORemote)mbo;
			woRemote.stopTimer();
			woRemote.getThisMboSet().save();
			this.setMboSession(OWNERMBO, null);
			populateMbo(OWNERMBO,APPNAME);
			id = woRemote.getUniqueIDValue();
			setMessage(new EZMessage(getText("global.timerstopped"), EMMConstants.SUCCESS));
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
	
	@Action(value="takeownership",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		}
	)
	public String takeOwnership() {
		try {
			populateMbo(OWNERMBO,APPNAME);
			WORemote woRemote = (WORemote)mbo;
			woRemote.getThisMboSet().save();
			woRemote.ownership();
			woRemote.getThisMboSet().save();
			this.setMboSession(OWNERMBO, null);
			populateMbo(OWNERMBO,APPNAME);
			id = woRemote.getUniqueIDValue();
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
            WORemote woRemote = (WORemote)this.mbo;
            
            if(this.field.equalsIgnoreCase("OWNER"))
            	woRemote.applyOwner(value);
            else
            	woRemote.applyOwnerGroup(value);
            
            woRemote.getThisMboSet().save();
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
			populateMboListByRelationship(OWNERMBO,"ALLASSET","SEQUENCE ASC");
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
			mbo = this.simpleService.findById(mbo.getMboSet("ALLASSET"), id);
		   
			((MultiAssetLocCIRemote)mbo).setMoveAssetFieldsDefault();
			
			setMboSession("MULTIASSETLOCCI",this.mbo);
			this.appAction = "VIEWMOVE";
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	} 	
	
	@Action(value="executemove", results={
			@Result(name="success",location="moveassetdialog.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="viewmove.action",type="redirect",params={"id","${id}"})
		})
	public String executeMove(){		
		try {
			mbo = (MboRemote)this.getSessionObject("MULTIASSETLOCCI");
            if(this.mbo==null)
            	return ERROR;
			
            mbo.getThisMboSet().save();
            
            mbo.getThisMboSet().reset();
            mbo = mbo.getThisMboSet().getMboForUniqueId(mbo.getUniqueIDValue());
            
            ((MultiAssetLocCIRemote)mbo).moveAsset();
            
            mbo.getThisMboSet().save();
            setMessage(new EZMessage(mbo.getMessage("asset", "AssetMoveWasSuccess", new String[]{mbo.getString("ASSETNUM"),mbo.getString("SITEID")}), EMMConstants.SUCCESS)); 			
            this.setMboSession("MULTIASSETLOCCI", null); 
            id = mbo.getOwner().getUniqueIDValue();
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
	
	@Action(value="assignments", results={
			@Result(name="success",location="assignments.jsp"),
			@Result(name="error",location="main",type="redirect")
		})	
	public String assignments() {			
		try {											
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"SHOWASSIGNMENT");
			this.setSessionObject("AVAILABLELABOR", null);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="viewassignment", results={
			@Result(name="success",location="assignment.jsp"),
			@Result(name="error",location="assignment.jsp")
		})	
	public String viewassignment(){
		try {
			populateMbo(OWNERMBO, APPNAME); 
			mbo = mbo.getMboSet("SHOWASSIGNMENT").getMbo(row);			
			setMboSession("ASSIGNMENT",this.mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="addassignment", results={
			@Result(name="success",location="viewassignment.action",type="redirect",params={"id","${id}","row","${row}"}),
			@Result(name="error",location="assignments.action",type="redirect",params={"id","${id}"})
		})	
	public String addassignment(){
		try {
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote assignmentSet = mbo.getMboSet("SHOWASSIGNMENT");
			mbo = this.simpleService.add(assignmentSet);
			this.row = assignmentSet.getCurrentPosition();
			setMboSession("ASSIGNMENT",this.mbo);	
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="availablelabor",
			results={
				@Result(name="success", location="availablelabor.jsp"),
				@Result(name="error",location="assignments",type="redirect",params={"id","${id}"})
			}
		)
	public String availablelabor() {
		try {		
			populateMbo(OWNERMBO, APPNAME);
			if (mbo.getMboSet("SHOWASSIGNMENT").count() == 0)
				throw new Exception(mbo.getMessage("workorder", "NoAssignmentForAssignLabor"));
			if(this.getSessionObject("AVAILABLELABOR") == null){
				this.mboSet = mbo.getMboSet("SHOWASSIGNMENT.ASSIGNLABOR");
				((NonPersistentMboSetRemote)this.mboSet).setup();			
				this.mbo = this.mboSet.getMbo(0);
				this.mbo.setValue("SITEID", "BEDFORD");			
			} else {
				this.mbo = (NonPersistentMboRemote)this.getSessionObject("AVAILABLELABOR");				
			}
			setMboSession("AVAILABLELABOR",this.mbo);
			mboList = simpleService.paginateMboSet(((AssignLaborSetRemote)this.mbo.getThisMboSet()).getLaborSet(), pagination);				
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
	
	@Action(value="selectassignlabor",
			results={
				@Result(name="success",location="viewassignment.action",type="redirect",params={"id","${id}","row","${row}"}),
				@Result(name="error",location="viewassignment.action",type="redirect",params={"id","${id}","row","${row}"})
			}
		)
	public String selectassignlabor() {
		try {		
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote assignmentSet = mbo.getMboSet("SHOWASSIGNMENT");
			if(this.getSessionObject("AVAILABLELABOR") == null){
				this.mboSet = mbo.getMboSet("SHOWASSIGNMENT.ASSIGNLABOR");
				((NonPersistentMboSetRemote)this.mboSet).setup();			
				this.mbo = this.mboSet.getMbo(0);
				this.mbo.setValue("SITEID", "BEDFORD");
				setMboSession("AVAILABLELABOR",this.mbo);				
			} else {
				this.mbo = (NonPersistentMboRemote)this.getSessionObject("AVAILABLELABOR");
			}			
			MboRemote newLaborRemote = assignmentSet.getMbo(row);
			if (newLaborRemote == null) 
				newLaborRemote = this.simpleService.add(assignmentSet);			
			MboRemote laborRemote = ((AssignLaborSetRemote)this.mbo.getThisMboSet()).getLaborSet().getMboForUniqueId(selectedrow);
			newLaborRemote.setValue("LABORCODE", laborRemote.getString("LABORCODE"));
			// For some reason this throws a NPE the first time it's accessed
			try{
				laborRemote.getString("STARTTIME");
			} catch (NullPointerException npe){
				;
			}
			newLaborRemote.setValue("SCHEDULEDATE", laborRemote.getString("STARTTIME"));
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
	
	@Action(value="deleteassignment",
			results={
				@Result(name="success",location="assignments.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="assignments.action",type="redirect",params={"id","${id}"})
			}
		)
	public String deleteassignment() {
		try {		
			populateMbo(OWNERMBO, APPNAME);
			mbo = mbo.getMboSet("SHOWASSIGNMENT").getMbo(row);
			mbo.delete();
			super.save();
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
	
	@Action(value="completeassignment",
			results={
				@Result(name="success",location="assignments.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="assignments.action",type="redirect",params={"id","${id}"})
			}
		)
	public String completeassignment() {
		try {		
			populateMbo(OWNERMBO, APPNAME);
			mbo = mbo.getMboSet("SHOWASSIGNMENT").getMbo(row);
			if (mbo == null)
				throw new Exception(mbo.getMessage("workorder", "NoAssignmentForCompletion"));			
			((AssignmentRemote)mbo).completeAssignment();
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
	
	@Action(value="classify",
			results={
				@Result(name="success", location="classify.jsp"),
				@Result(name="error", location="classify.jsp")
			}
		)
	public String classify() {
		try{
			pagination.setPageSize(100);
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(OWNERMBO,"WORKORDERSPECCLASS");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
	public String[] getPersonOptions() {
		return personOptions;
	}
	
	public void setPersonOptions(String[] personOptions) {
		this.personOptions = personOptions;
	}

	public String getGroupOptions() {
		return groupOptions;
	}

	public void setGroupOptions(String groupOptions) {
		this.groupOptions = groupOptions;
	}

	public String getNotificationMessage() {
		return notificationMessage;
	}

	public void setNotificationMessage(String notificationMessage) {
		this.notificationMessage = notificationMessage;
	}

	public String getMeterRelationship() {
		return meterRelationship;
	}

	public void setMeterRelationship(String meterRelationship) {
		this.meterRelationship = meterRelationship;
	}

	public String getAssetDownView() {
		return assetDownView;
	}

	public void setAssetDownView(String assetDownView) {
		this.assetDownView = assetDownView;
	}
}
