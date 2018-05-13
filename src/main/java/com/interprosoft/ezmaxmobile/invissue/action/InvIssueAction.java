/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.invissue.action;

import java.rmi.RemoteException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.location.LocationSetRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/invissue")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class InvIssueAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	private final String APPNAME = "INVISSUE";
	private final String OWNERMBO = "LOCATIONS";
	
	private final String CURRENTRELATIONSHIP = "CURRENTRELATIONSHIP";
	
	private String action;

	@Action(value="main", results={
			@Result(name="success",location="main.jsp"),
			@Result(name="error",location="main.jsp")
		})	
	public String main() {		
		try {
			clearMboSession(OWNERMBO);
			LocationSetRemote mboSet = (LocationSetRemote)simpleService.getMboSet("LOCATIONS");
			mboSet.setApp(APPNAME);
			mboSet.setStoreroom();
			mboSet.findStoreRooms();
			mboSet.filterLocSet(this.user.getSiteId());			
			this.populateMboList(mboSet);
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
	
	@Action(value="newrow", results={
			@Result(name="success",location="${action}",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="main",type="redirect")
		})	
	public String newrow() {
		try {		
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
			mbo = simpleService.add(mbo.getMboSet(relationship)); 
			id = mbo.getUniqueIDValue();			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="issue", results={
			@Result(name="success",location="issue.jsp"),
			@Result(name="error",location="issue.jsp")
		})	
	public String view() {
		try {
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSet = mbo.getMboSet("MATUSETRANSISSUE");
			mboSet.setApp(APPNAME);
			if (!mboSet.isEmpty()){
				populateMboList(mboSet);
			}
			setSessionObject("MATUSETRANSISSUE", mboSet);
			setSessionValue(CURRENTRELATIONSHIP, "MATUSETRANSISSUE");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
	@Action(value="issuedetail", results={
			@Result(name="success",location="issuedetail.jsp"),
			@Result(name="error",location="issuedetail.jsp")
		})	
	public String issuedetail() {	
		try {
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			mbo = this.simpleService.findById(mbo.getMboSet(relationship), id);
			setMboSession(relationship,this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="deleteissue", results={
			@Result(name="success",location="issue.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="issue.action",type="redirect",params={"id","${id}"})
		})
	public String deleteissue(){
		try {			
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet(relationship), id);
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
	
	@Action(value="transferout", results={
			@Result(name="success",location="transferout.jsp"),
			@Result(name="error",location="transferout.jsp")
		})	
	public String transferout() {
		try {
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSet = mbo.getMboSet("MATRECTRANSOUT");
			mboSet.setApp(APPNAME);
			if (!mboSet.isEmpty()){
				populateMboList(mboSet);
			}
			setSessionObject("MATRECTRANSOUT", mboSet);
			setSessionValue(CURRENTRELATIONSHIP, "MATRECTRANSOUT");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="transferoutdetail", results={
			@Result(name="success",location="transferoutdetail.jsp"),
			@Result(name="error",location="transferoutdetail.jsp")
		})	
	public String transferoutdetail() {	
		try {
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			mbo = this.simpleService.findById(mbo.getMboSet(relationship), id);
			setMboSession(relationship,this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="deletetransferout", results={
			@Result(name="success",location="transferout.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="transferout.action",type="redirect",params={"id","${id}"})
		})
	public String deletetransferout(){
		try {			
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet(relationship), id);
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
	
	@Action(value="transferin", results={
			@Result(name="success",location="transferin.jsp"),
			@Result(name="error",location="transferin.jsp")
		})	
	public String transferin() {
		try {
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSet = mbo.getMboSet("MATRECTRANSIN");
			mboSet.setApp(APPNAME);
			if (!mboSet.isEmpty()){
				populateMboList(mboSet);
			}
			setSessionObject("MATRECTRANSIN", mboSet);
			setSessionValue(CURRENTRELATIONSHIP, "MATRECTRANSIN");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="transferindetail", results={
			@Result(name="success",location="transferindetail.jsp"),
			@Result(name="error",location="transferindetail.jsp")
		})	
	public String transferindetail() {	
		try {
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			mbo = this.simpleService.findById(mbo.getMboSet(relationship), id);
			setMboSession(relationship,this.mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="deletetransferin", results={
			@Result(name="success",location="transferin.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="transferin.action",type="redirect",params={"id","${id}"})
		})
	public String deletetransferin(){
		try {			
			String relationship = (String)this.getSessionObject(CURRENTRELATIONSHIP);
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet(relationship), id);
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

	public void setAction(String action) {
		this.action = action;
	}

	public String getAction() {
		return action;
	}
}
