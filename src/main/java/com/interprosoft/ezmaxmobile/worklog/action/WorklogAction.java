/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.worklog.action;

import java.rmi.RemoteException;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.mbo.MboConstants;
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
@Namespace("/worklog")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class WorklogAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	public static final String OWNERMBO = "MODIFYWORKLOG";
	
	@Action(value="main",
			results={
				@Result(name="success", location="main.jsp"),
				@Result(name="error", location="main.jsp")
			}
		)
	public String execute() {
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			MboRemote thisMbo = null;
			if (currentMbo.equals(OWNERMBO) && mbo.getOwner() != null){
				thisMbo = mbo;
				mbo = mbo.getOwner();
				currentMbo = mbo.getName();				
			}			
			pagination.setPageSize(5);
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(currentMbo, OWNERMBO);
			if (thisMbo != null && !thisMbo.toBeDeleted())
				thisMbo.validate();
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
	
	@Action(value="view",
			results={
				@Result(name="success", location="worklog.jsp"),
				@Result(name="error", location="worklog.jsp")
			}
		)
	public String view() {
		try{
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			if (mbo!=null && !mbo.getName().equalsIgnoreCase("WORKLOG")){
				mbo = this.simpleService.findById(mbo.getMboSet(OWNERMBO),id);
				setMboSession(OWNERMBO,this.mbo);
			}
			if (mbo!=null && mbo.getUniqueIDValue() != id){
				mbo = this.simpleService.findById(mbo.getThisMboSet(),id);
				setMboSession(OWNERMBO,this.mbo);				
			}
			if(this.mbo == null && id>0){
				mbo = this.simpleService.findById(OWNERMBO,id);
				setMboSession(OWNERMBO,this.mbo);
			}
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}
	
	@Action(value="add",
			results={
				@Result(name="success", type="redirect", location="view.action", params={"id","${id}"}),
				@Result(name="error", type="redirect", location="main.action", params={"id","${id}"})
			}
		)
	public String add() {
		try{
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			mbo = simpleService.add(mbo.getMboSet(OWNERMBO)); 
			mbo.setValue("LOGTYPE", "WORK", MboConstants.NOACCESSCHECK);
			id = mbo.getUniqueIDValue();
			setMboSession(OWNERMBO,this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}
	
	@Action(value="cancel", results={
			@Result(name="success",location="main.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="main.action",type="redirect",params={"id","${id}"})
		})
	public String cancel(){
		try {			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);	
			mbo.delete();			
			MboSetRemote ownerSet = mbo.getOwner().getThisMboSet();
			ownerSet.save();
			ownerSet.reset();
			id = mbo.getOwner().getUniqueIDValue();
			this.setMboSession(currentMbo, null);
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
	
	@Action(value="nextlog",
			results={
			@Result(name="success",location="view.action", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		}
	)
	public String nextLog() {
		try{               
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
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

	@Action(value="prevlog",
			results={
			@Result(name="success",location="view.action", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		}
	)
	public String prevLog() {
		try{         
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
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
	
	@Action(value="goback", results={
			@Result(name="success",location="main.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="main.action",type="redirect",params={"id","${id}"})
		})
	public String goback(){
		try {			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);	
			this.setMboSession(currentMbo, null);
			id = mbo.getOwner().getUniqueIDValue();
			this.setMboSession(mbo.getOwner().getName(), mbo.getOwner());			
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
}
