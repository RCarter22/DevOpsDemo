/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/

package com.interprosoft.ezmaxmobile.receipts.action;

import java.rmi.RemoteException;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.inventory.virtual.AssetInputSetRemote;
import psdi.app.labor.ServRecTransRemote;
import psdi.app.labor.ServRecTransSetRemote;
import psdi.app.po.virtual.ReceiptInputSetRemote;
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
@Namespace("/receipts")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})

public class ReceiptsAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(ReceiptsAction.class);
	
	private final String APPNAME = "RECEIPTS";
	private final String OWNERMBO = "PO";
	private final String SERVICESUCCESS = "servicesuccess";
	private final String SERVICEERROR = "serviceerror";
	
	private String[] checkedID;
	private String[] qtyRequested;
	private String[] qtyRejected;
	private String viewType;
	
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
				mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO, APPNAME).getThisMboSet();
				mboSetRemote.setQbe("HISTORYFLAG", "0");
				mboSetRemote.setQbe("SITEID", "="+this.user.getSiteId());
				mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
				
				mboSetRemote.setApp(APPNAME);
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
				if(this.user.getSiteId() != null)
					mbo.getThisMboSet().setQbe("SITEID", "="+this.user.getSiteId());
			}
			this.setMboSession(EMMConstants.ADVANCEDSEARCHMBO, mbo);
		} catch (Exception e){
			e.getStackTrace();
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
			setMboAppName(APPNAME);
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
	
	@Action(value="materialreceipts", results={
			@Result(name="success",location="materialreceipts.jsp"),
			@Result(name="error",location="materialreceipts.jsp")
		})	
	public String materialreceipts() {
		try {
			
			clearMboSession("PARENTMATRECTRANS");
			pagination.setPageSize(5);
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"PARENTMATRECTRANS","POLINENUM ASC");
			
			this.setSessionObject("ASSETINPUT", null);  
			this.setSessionObject("ASSETINPUTMBOSET", null);

		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="servicereceipts", results={
			@Result(name="success",location="servicereceipts.jsp"),
			@Result(name="error",location="servicereceipts.jsp")
		})	
	public String servicereceipts() {
		try {			
			clearMboSession("NOCOSTSERVRECTRANS");	
			pagination.setPageSize(5);
			populateMbo(OWNERMBO, APPNAME);
			
			populateMboListByRelationship(OWNERMBO,"NOCOSTSERVRECTRANS","POLINENUM ASC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	
	private void prepareSelectItemList() throws RemoteException, MXException, BaseMaximoException{
		ReceiptInputSetRemote receiptInputSet = (ReceiptInputSetRemote)mbo.getMboSet(this.viewType);
		receiptInputSet.reset();
		receiptInputSet.setup();				

		mboList = this.simpleService.paginateMboSet(receiptInputSet, pagination);
		this.setSessionObject(this.viewType, mboList);
	}	
	
	private void prepareRotatingItemList() throws RemoteException, MXException, BaseMaximoException{
		AssetInputSetRemote assetInputSet = (AssetInputSetRemote)mbo.getMboSet("ASSETINPUT");
		assetInputSet.reset();
		assetInputSet.setup();				

		mboList = this.simpleService.paginateMboSet(assetInputSet, pagination);
		this.setSessionObject("ASSETINPUT", mboList);
		this.setSessionObject("ASSETINPUTMBOSET", assetInputSet);
	}
	
	@Action(value="selectorderedservice", results={
			@Result(name="success",location="selectservices.jsp", params={"id","${id}"}),
			@Result(name="error",location="servicereceipts.action",type="redirect",params={"id","${id}"})
		})
	public String selectorderedservice(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 
		
			this.viewType = "SERVRECEIPTINPUT";
			this.prepareSelectItemList();

		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="selectwinspservices", results={
			@Result(name="success",location="selectwinspservices.jsp", params={"id","${id}"}),
			@Result(name="error",location="selectwinspservices.jsp", params={"id","${id}"})
		})
	public String selectwinspservices(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 

			this.viewType = "SERVRECEIPTINPUT";
			populateMboListByRelationship(OWNERMBO,"UNAPPROVEDSERVRECTRANS","POLINENUM ASC");

			this.setSessionObject(this.viewType, mboList);

		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="selectordereditem", results={
			@Result(name="success",location="selectitems.jsp", params={"id","${id}"}),
			@Result(name="error",location="materialreceipts.action",type="redirect",params={"id","${id}"})
		})
	public String selectordereditem(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 

			this.viewType = "MATRECEIPTINPUT";
			this.prepareSelectItemList();

		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="selectitemreturn", results={
			@Result(name="success",location="selectitems.jsp", params={"id","${id}"}),
			@Result(name="error",location="selectitems.jsp", params={"id","${id}"})
		})
	public String selectitemreturn(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 

			this.viewType = "RETURNRECEIPTINPUT";
			this.prepareSelectItemList();

		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="selectservicereturn", results={
			@Result(name="success",location="selectservices.jsp", params={"id","${id}"}),
			@Result(name="error",location="servicereceipts.action",type="redirect",params={"id","${id}"})
		})
	public String selectservicereturn(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 

			this.viewType = "RETURNRECEIPTINPUTSRV";
			this.prepareSelectItemList();

		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="generatereceipts", results={
			@Result(name="success",location="materialreceipts.action",type="redirect", params={"id","${id}"}),
			@Result(name="servicesuccess",location="servicereceipts.action",type="redirect", params={"id","${id}"}),
			@Result(name="error",location="materialreceipts.action",type="redirect",params={"id","${id}"}),
			@Result(name="serviceerror",location="servicereceipts.action",type="redirect",params={"id","${id}"})
		})
	public String generatereceipts(){		
		try {
			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 
			if (this.mbo == null && id>0) {
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			
			ReceiptInputSetRemote receiptMboSet = (ReceiptInputSetRemote)mbo.getMboSet(this.viewType);
			if (checkedID != null) {
				id = mbo.getUniqueIDValue();
				for(int i = 0; i < checkedID.length; i++){
					int idx = Integer.parseInt(checkedID[i].replace("idx_", ""));
					receiptMboSet.getMbo(idx).setValue("QTYREQUESTED", qtyRequested[idx]);
					receiptMboSet.select(idx);													
				}
				receiptMboSet.execute();
				super.save();
				setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
				this.setSessionObject(this.viewType, null);
			} else {
				id = mbo.getUniqueIDValue();
				setMessage(new EZMessage(getText("global.norecordsselected"), EMMConstants.INFO));
				if(this.viewType.equalsIgnoreCase("SERVRECEIPTINPUT") || this.viewType.equalsIgnoreCase("RETURNRECEIPTINPUTSRV"))
					return SERVICEERROR;
				else
					return ERROR;
			}
			id = mbo.getUniqueIDValue();
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			if(this.viewType.equalsIgnoreCase("SERVRECEIPTINPUT") || this.viewType.equalsIgnoreCase("RETURNRECEIPTINPUTSRV"))
				return SERVICEERROR;
			else
				return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			if(this.viewType.equalsIgnoreCase("SERVRECEIPTINPUT") || this.viewType.equalsIgnoreCase("RETURNRECEIPTINPUTSRV"))
				return SERVICEERROR;
			else
				return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			if(this.viewType.equalsIgnoreCase("SERVRECEIPTINPUT") || this.viewType.equalsIgnoreCase("RETURNRECEIPTINPUTSRV"))
				return SERVICEERROR;
			else
				return ERROR;
		}
		if(this.viewType.equalsIgnoreCase("SERVRECEIPTINPUT") || this.viewType.equalsIgnoreCase("RETURNRECEIPTINPUTSRV"))
			return SERVICESUCCESS;
		else
			return SUCCESS;
	}
	
	@Action(value="changeinspstatus", results={
			@Result(name="success",location="servicereceipts.action",type="redirect", params={"id","${id}"}),
			@Result(name="servicesuccess",location="servicereceipts.action",type="redirect", params={"id","${id}"}),
			@Result(name="error",location="servicereceipts.action",type="redirect",params={"id","${id}"})
		})
	public String changeinspstatus() {		
		try {
			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 
			if (this.mbo == null && id>0) {
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			
			ServRecTransSetRemote servRecTransMboSet = (ServRecTransSetRemote)mbo.getMboSet("UNAPPROVEDSERVRECTRANS");
			if (checkedID != null) {				
				id = mbo.getUniqueIDValue();
				for(int i = 0; i < checkedID.length; i++) {
					int idx = Integer.parseInt(checkedID[i].replace("idx_", ""));
					ServRecTransRemote servRecTransMbo = (ServRecTransRemote)servRecTransMboSet.getMbo(idx);
					servRecTransMbo.setValue("REJECTQTYDISPLAY", qtyRejected[idx]);
					servRecTransMbo.approve(this.user.getSession().getMXServerRemote().getDate(), false);
				}
				mbo.getThisMboSet().save();
				setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
				this.setSessionObject(this.viewType, null);
			} else {
				id = mbo.getUniqueIDValue();
				setMessage(new EZMessage(getText("global.norecordsselected"), EMMConstants.INFO));
				return ERROR;
			}
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		if(this.viewType.equalsIgnoreCase("SERVRECEIPTINPUT"))
			return SERVICESUCCESS;
		else
			return SUCCESS;
	}
	
	@Action(value="viewreceipt", results={
			@Result(name="success",location="materialreceipt.jsp"),
			@Result(name="error",location="materialreceipt.jsp")
		})	
	public String viewreceipt(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			mbo = this.simpleService.findById(mbo.getMboSet("MATRECTRANS"), id);
			setMboSession("MATRECTRANS",this.mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="addreceipt", results={
			@Result(name="success",location="materialreceipt.jsp",params={"id","${id}"}),
			@Result(name="error",location="materialreceipt.jsp",params={"id","${id}"})
		})
		public String addreceipt(){		
			try {
				mbo = (MboRemote)this.getSessionObject(OWNERMBO);			
				mbo = simpleService.add(mbo.getMboSet("MATRECTRANS")); 
				id = mbo.getUniqueIDValue();
			} catch (Exception e){
				this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
				this.addActionError(e.getMessage());
				return ERROR;
			}
			return SUCCESS;
		}
	
	@Action(value="deletereceipt", results={
			@Result(name="success",location="materialreceipts.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="materialreceipts.action",type="redirect",params={"id","${id}"})
		})
	public String deletereceipt(){
		try {			
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			mbo = this.simpleService.findById(mbo.getMboSet("MATRECTRANS"), id);
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
	
	@Action(value="receiverotatingitem", results={
			@Result(name="success",location="receiverotatingitems.jsp", params={"id","${id}"}),
			@Result(name="error",location="materialreceipts.action",type="redirect",params={"id","${id}"})
		})
	public String receiverotatingitem(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 
			
			if(this.getSessionObject("ASSETINPUT") == null || this.getSessionObject("ASSETINPUTMBOSET") == null)
				this.prepareRotatingItemList();		
			else
				mboList = (ArrayList<MboRemote>)this.getSessionObject("ASSETINPUT");
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="autonumber", results={
			@Result(name="success",location="receiverotatingitem.action",type="redirect", params={"id","${id}"}),
			@Result(name="error",location="receiverotatingitem.action",type="redirect",params={"id","${id}"})
		})
	public String autonumber(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 			
			
			AssetInputSetRemote assetInputSet = (AssetInputSetRemote)this.getSessionObject("ASSETINPUTMBOSET");
			assetInputSet.autoNumberAll();
			mboList = this.simpleService.paginateMboSet(assetInputSet, pagination);
			this.setSessionObject("ASSETINPUT", mboList);
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="saverotatingreceipts", results={
			@Result(name="success",location="materialreceipts.action",type="redirect", params={"id","${id}"}),
			@Result(name="error",location="materialreceipts.action",type="redirect",params={"id","${id}"})
		})
	public String saverotatingreceipts(){		
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			mbo = (MboRemote)this.getSessionObject(currentMbo); 			
			if (this.mbo == null && id>0) {
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			id = mbo.getUniqueIDValue();
		
			AssetInputSetRemote assetInputSet = (AssetInputSetRemote)this.getSessionObject("ASSETINPUTMBOSET");
			assetInputSet.execute();
			mbo.getThisMboSet().save();
			super.save();
			setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));						
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String[] getCheckedID() {
		return checkedID;
	}

	public void setCheckedID(String[] checkedID) {
		this.checkedID = checkedID;
	}
	
	public String[] getQtyRequested() {
		return qtyRequested;
	}

	public void setQtyRequested(String[] qtyRequested) {
		this.qtyRequested = qtyRequested;
	}
	
	public String[] getQtyRejected() {
		return qtyRejected;
	}
	
	public void setQtyRejected(String[] qtyRejected) {
		this.qtyRejected = qtyRejected;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	
}