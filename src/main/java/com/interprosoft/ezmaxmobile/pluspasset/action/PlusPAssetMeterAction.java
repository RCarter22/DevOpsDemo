/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.pluspasset.action;

import java.rmi.RemoteException;
import java.util.ArrayList;

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
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

@Component
@Scope("prototype")
@Namespace("/assetmeter")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusPAssetMeterAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	
	public static final String OWNERMBO = "ASSETMETER";

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
				return EMMConstants.HOME;mbo = (MboRemote)this.getSessionObject(currentMbo);
			pagination.setPageSize(5);
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(currentMbo, OWNERMBO);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
	@Action(value="view",
			results={
				@Result(name="success", location="assetmeter.jsp"),
				@Result(name="error", location="assetmeter.jsp")
			}
		)
	public String view() {
		try{
			mbo = (MboRemote)this.getSessionObject("ASSET");
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById("ASSETMETER",id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet("ASSETMETER"), id);
			}
			setMboSession("ASSETMETER",this.mbo);
			// For IBM BUG!!!
			if(mbo.getString("METER.DOMAINID")!=null && !mbo.getString("METER.DOMAINID").equalsIgnoreCase("") && !mbo.getMboValueData("DOMAINID").isReadOnly())
				this.mbo.setValue("DOMAINID", mbo.getString("METER.DOMAINID"));
			mboList = new ArrayList<MboRemote>();
			MboSetRemote previousReadings = null; 
			if (mbo.getString("METER.METERTYPE").equals("CONTINUOUS")){			
				previousReadings = mbo.getMboSet("METERREADING");
				previousReadings.setOrderBy("METERNAME ASC, READINGDATE DESC");
			} else if (mbo.getString("METER.METERTYPE").equals("CHARACTERISTIC") || mbo.getString("METER.METERTYPE").equals("GAUGE")){			
				previousReadings = mbo.getMboSet("MEASUREMENT");
				previousReadings.setOrderBy("METERNAME ASC, MEASUREDATE DESC");
			}		
			if (previousReadings != null){
				MboRemote mboRemote = previousReadings.moveFirst();
				int ct=0;
				while (mboRemote != null && ct++<5) {
					mboList.add(mboRemote);
					mboRemote = previousReadings.moveNext();
				}
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
	
	@Action(value="add",
			results={
				@Result(name="success", type="redirect", location="view.action", params={"id","${id}"}),
				@Result(name="error", type="redirect", location="view.action", params={"id","${id}"})
			}
		)
	public String add() {
		try{
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			mbo = simpleService.add(mbo.getMboSet(OWNERMBO));
			id = mbo.getUniqueIDValue();			
			setMboSession(OWNERMBO, mbo);
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
	
	@Action(value="saveMeter", results={
			@Result(name="success",location="main.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		})
	public String saveMeter() {
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			// Save ID in case of MBO exception 
			id = mbo.getUniqueIDValue();
			mbo.getOwner().getThisMboSet().save();
			this.setMboSession(currentMbo, null);
			this.setMboSession(mbo.getOwner().getName(), null);
			id = mbo.getOwner().getUniqueIDValue();
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
			mbo.getOwner().getThisMboSet().save();
			this.setMboSession(currentMbo, null);
			this.setMboSession(mbo.getOwner().getName(), null);
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
			this.setMboSession(mbo.getOwner().getName(), mbo.getOwner());
			id = mbo.getOwner().getUniqueIDValue();
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
}