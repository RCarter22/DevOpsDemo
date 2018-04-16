/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.createdr.action;

import java.rmi.RemoteException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.mr.MRRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/createdr")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class CreateDRAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
		
	private final String APPNAME = "CREATEDR";
	private final String OWNERMBO = "MR";
	
	@Action(value="main", results={
		@Result(name="success",location="create.action",type="redirect"),
	})	
	public String main() {
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
	
	@Action(value="view", results={
		@Result(name="success",location="mr.jsp"),
		@Result(name="error",location="mr.jsp")
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
			@Result(name="error",location="mr.jsp")
		})
	public String create() {
		try{
			clearMboSession(OWNERMBO);
			create(OWNERMBO, APPNAME);
			
			String wonum = request.getParameter("wonum");
			String desc = request.getParameter("description");
			
			if (desc != null){
				desc = desc.substring(0, Math.min(desc.length(), 100));	
			}
			
			if (wonum!=null && !wonum.equals("")){
				mbo.setValue("WONUM", wonum);
			}
			if (desc!=null && !desc.equals("")){
				mbo.setValue("DESCRIPTION", desc);
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
	
	@Action(value="mrlines", results={
		@Result(name="success",location="mrlines.jsp"),
		@Result(name="error",location="mrlines.jsp")
	})	
	public String mrlines() {			
		try {
			clearMboSession("MRLINE");			
			pagination.setPageSize(5);								
			populateMbo(OWNERMBO, APPNAME);
			// Set Default Value of QTY
			mbo.getMboSet("MRLINE").setDefaultValue("QTY", "1");
			mbo.getMboSet("MRLINE").setDefaultValue("ORDERUNIT", "EACH");
			populateMboListByRelationship(OWNERMBO,"MRLINE","MRLINENUM ASC");
			this.setSessionObject("SPAREPART", null);
			this.setSessionObject("SPAREPARTS", null);
			mbo.getMboSet("MRLINE").validate();
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

	@Action(value="addline", results={
		@Result(name="success",location="viewline.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="mrlines.action",type="redirect",params={"id","${id}"})
	})
	public String addline(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			mbo = simpleService.add(mbo.getMboSet("MRLINE")); 
			id = mbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="deleteline", results={
		@Result(name="success",location="mrlines.action",type="redirect",params={"id","${id}"}),
		@Result(name="error",location="mrlines.action",type="redirect",params={"id","${id}"})
	})
	public String delete(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("MRLINE"), id);
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
		@Result(name="success",location="mrline.jsp"),
		@Result(name="error",location="mrline.jsp")
	})	
	public String viewline(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("MRLINE",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("MRLINE"), id);
			}
			// Reset to update count
			mbo.getMboSet("DOCLINKS").reset();
			setMboSession("MRLINE",this.mbo);	
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="submit",
			results={
				@Result(name="success", location="${currentAction}",type="redirect"),
				@Result(name="error", location="${currentAction}",type="redirect")
			}
	)
	public String submit(){		
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if (((MRRemote)this.mbo).isAPPR() == false){
				try{
					super.save();
					if (!mbo.toBeSaved()){
						this.mbo.startCheckpoint();
						((MRRemote)this.mbo).approveMR();
						super.save();
						if (!mbo.toBeSaved())
							setMessage(new EZMessage(this.mbo.getMessage("mr", "reqSibmitted"), EMMConstants.SUCCESS));
					}
				} catch (RemoteException e) {
					this.mbo.rollbackToCheckpoint();
					throw e;
				} catch (MXException e) {
					this.mbo.rollbackToCheckpoint();
					throw e;
				}				
			} else {
				super.save();
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
				this.mboSet.setQueryBySiteQbe();
				String assetFromWo = this.mbo.getString("MR_WORKORDER.ASSETNUM");
				if (assetFromWo != null){
					mboSet.setQbe("ASSETNUM", assetFromWo);
				}			
				setMboSetQbeFromRequest(this.mboSet, "ASSETNUM");
				setMboSetQbeFromRequest(this.mboSet, "SITEID");
				setMboSetQbeFromRequest(this.mboSet, "ITEMNUM");
				setMboSetQbeFromRequest(this.mboSet, "ITEM.DESCRIPTION");
				setMboSetQbeFromRequest(this.mboSet, "ASSETNUM");
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
				@Result(name="success",location="mrlines.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="mrlines.action",type="redirect",params={"id","${id}"})
		}
	)
	public String saveSelectedSpareParts() {
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			MboSetRemote selectedSet = (MboSetRemote)this.getSessionObject("SPAREPARTS");	
			this.setSessionObject("SPAREPARTS", null);
			MRRemote mrRemote = (MRRemote)mbo;
			
			mrRemote.copySpareParts(selectedSet);
			
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
	
	private void setMboSetQbeFromRequest(MboSetRemote mboSet, String field) throws RemoteException, MXException{
		String value = request.getParameter(field);
		if (value != null){
			mboSet.setQbe(field, value);	
		}		
	}
}
