/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.labtrans.action;

import java.rmi.RemoteException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.labor.LabTransRemote;
import psdi.mbo.MboConstants;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.mbo.SqlFormat;
import psdi.util.MXException;
import psdi.util.MXFormat;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

import org.apache.struts2.convention.annotation.*;

@Component
@Scope("prototype")
@Namespace("/labtrans")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class LabTransAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	public static final String OWNERMBO = "LABTRANS";
	public static final String APPNAME = "LABTRANS";
	
	private String currentWeekRange;
	
	private String currentDay;
	
	private Date selectedDate;
	
	private List<MboRemote> dailyMboList;
	
	private MboSetRemote dailyMboSet;	
	
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
			populateMboListByRelationship(currentMbo, "SHOWACTUALLABOR","ENTERDATE DESC");
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
	
	@Action(value="applyLabor",results={
			@Result(name="success", location="workhours.action", type="redirect"),
			@Result(name="error", location="workhours.action", type="redirect")
		}
	)
	public String applyLabor() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			/*if(this.mbo== null && id>0){
				mbo = this.simpleService.findById(OWNERMBO,id);
			}else{
				mbo = this.simpleService.findById(OWNERMBO, id);
			}*/
			mbo= this.simpleService.findById(OWNERMBO, id);
			setMboSession(OWNERMBO,this.mbo);			
			
			//cast to LabTransRemote
			LabTransRemote labtrans = (LabTransRemote)mbo;
			
			//call MBO method to approve selected labor transaction
			labtrans.approveLaborTransaction();
			
			//save the mbo set after approve has been called
			labtrans.getThisMboSet().save();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	
	@Action(value="view",
			results={
				@Result(name="success", location="labtrans.jsp"),
				@Result(name="error", location="labtrans.jsp")
			}
		)
	public String view() {
		try{
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			if ( mbo!=null && !mbo.getName().equalsIgnoreCase(OWNERMBO)){
				mbo = this.simpleService.findById(mbo.getMboSet(OWNERMBO),id);
				setMboSession(OWNERMBO,this.mbo);
			}
			if(this.mbo == null && id>0){
				mbo = this.simpleService.findById(OWNERMBO,id);
				setMboSession(OWNERMBO,this.mbo);
			}
			/*if(mbo.getString("TIMERSTATUS").equalsIgnoreCase("COMPLETE")){
				mbo.setFieldFlag(new String[]{"TASKID"}, MboConstants.REQUIRED, true);
			}*/
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
			
			//Set laborcode to current user
			MboSetRemote laborSet = this.user.getSession().getMboSet("LABOR");
			laborSet.setQbe("PERSONID", this.user.getPersonId());
			laborSet.setQbe("ORGID", this.user.getOrgId());
			laborSet.setQbeExactMatch(true);
			laborSet.reset();
			if (!laborSet.isEmpty()) {
				MboRemote laborRemote = laborSet.moveFirst();
				if (laborRemote != null) {
					MboSetRemote laborCraftRateSet = laborRemote.getMboSet("LABORCRAFTRATE");
					laborCraftRateSet.setQbe("DEFAULTCRAFT", "1");
					laborCraftRateSet.setQbeExactMatch(true);
					laborCraftRateSet.reset();
					if (!laborCraftRateSet.isEmpty())
						mbo.setValue("LABORCODE", laborRemote.getString("LABORCODE"));
				}
			}
			
			id = mbo.getUniqueIDValue();						
			setMboSession(OWNERMBO, mbo);
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
			// Going back causes an error if the record is unsaved.
			if(this.mbo.toBeSaved() && mbo.getOwner() != null){	
				MboSetRemote ownerSet = mbo.getOwner().getThisMboSet();
				ownerSet.reset();
				id = mbo.getOwner().getUniqueIDValue();
				this.setMboSession(currentMbo, null);
				this.setMboSession(mbo.getOwner().getName(), ownerSet.getMbo(0));
			} else if(mbo.getOwner() != null){
				this.setMboSession(currentMbo, null);
				this.setMboSession(mbo.getOwner().getName(), mbo.getOwner());
				id = mbo.getOwner().getUniqueIDValue();
			} else{
				this.setMboSession(currentMbo, null);
				MboRemote ownerMbo = mbo.getMboSet("WORKORDER").getMbo(0);
				if(ownerMbo.getBoolean("ISTASK"))
					ownerMbo = ownerMbo.getMboSet("PARENT").getMbo(0);
				this.setMboSession(ownerMbo.getName(), ownerMbo);
				id = ownerMbo.getUniqueIDValue();
			}
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	
	//Example for custom function that's not provided by Maximo.
	@Action(value="workhours",
			results={
				@Result(name="success", location="workhours.jsp"),
				@Result(name="error", location="workhours.jsp")
			}
		)
	public String workhours() {
		try {			
			Calendar today = Calendar.getInstance();
			Calendar tomorrow = Calendar.getInstance();
			if (selectedDate != null){
				today.setTime(selectedDate);
				tomorrow.setTime(selectedDate);
			}		
			today.set(Calendar.HOUR, 0);
			today.set(Calendar.MINUTE, 0);
			today.set(Calendar.SECOND, 0);
			today.set(Calendar.MILLISECOND, 0);
			today.set(Calendar.AM_PM, 0);
			
			tomorrow.set(Calendar.HOUR, 0);
			tomorrow.set(Calendar.MINUTE, 0);
			tomorrow.set(Calendar.SECOND, 0);
			tomorrow.set(Calendar.MILLISECOND, 0);
			tomorrow.set(Calendar.AM_PM, 0);
			tomorrow.add(Calendar.DATE, 1);			
			
			//Set current week date range
			Calendar sun = Calendar.getInstance();
			Calendar sat = Calendar.getInstance();			
			sun.set(Calendar.YEAR, today.get(Calendar.YEAR));
			sat.set(Calendar.YEAR, today.get(Calendar.YEAR));
			sun.set(Calendar.MONTH, today.get(Calendar.MONTH));
			sat.set(Calendar.MONTH, today.get(Calendar.MONTH));
			sun.set(Calendar.WEEK_OF_MONTH, today.get(Calendar.WEEK_OF_MONTH));
			sat.set(Calendar.WEEK_OF_MONTH, today.get(Calendar.WEEK_OF_MONTH));			
			sun.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
			sat.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
			
			DateFormat df = new SimpleDateFormat(MXFormat.getDatePattern(this.user.getSession().getLocale()));
			this.setCurrentWeekRange(df.format(sun.getTime()) + " - " + df.format(sat.getTime()));
			
			MboSetRemote weeklyLabTransSet = this.user.getSession().getMboSet(OWNERMBO);
			weeklyLabTransSet.setQbe("LABOR.PERSONID", this.user.getPersonId());
			weeklyLabTransSet.setWhere("STARTDATE >= " + SqlFormat.getDateFunction(sun.getTime()) +  " AND STARTDATE < " + SqlFormat.getDateFunction(sat.getTime()) +  "");
			weeklyLabTransSet.setOrderBy("STARTDATE DESC");
			weeklyLabTransSet.setQbeExactMatch(true);
			weeklyLabTransSet.reset();
			mboList = this.simpleService.paginateMboSet(weeklyLabTransSet, pagination);
			mboSet = weeklyLabTransSet;
			
			//Set today's date
			this.setCurrentDay((df.format(today.getTime())));
			
			MboSetRemote dailyLabTransSet = this.user.getSession().getMboSet(OWNERMBO);
			dailyLabTransSet.setQbe("LABOR.PERSONID", this.user.getPersonId());
			dailyLabTransSet.setWhere("STARTDATE >= " + SqlFormat.getDateFunction(today.getTime()) +  " AND STARTDATE < " + SqlFormat.getDateFunction(tomorrow.getTime()) +  "");
			dailyLabTransSet.setOrderBy("STARTDATE DESC");
			dailyLabTransSet.setQbeExactMatch(true);
			dailyLabTransSet.reset();
			
			MboRemote mboRemote = dailyLabTransSet.moveFirst();
			dailyMboList = new ArrayList<MboRemote>();	
			while (mboRemote != null) {
				dailyMboList.add(mboRemote);
				mboRemote = dailyLabTransSet.moveNext();
			}
			dailyMboSet = dailyLabTransSet;			
			
			this.setSessionObject(EMMConstants.CURRENTMBONAME, "WORKORDER");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="save",
			results={
				@Result(name="success", location="${currentAction}", type="redirect")
			}
		)
	public String save() {
		try{
			mboName = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			this.mbo =  (MboRemote)this.getSessionObject(mboName);
			String appName = this.mbo.getThisMboSet().getParentApp();
			
			if (this.mbo.getOwner() != null){ 
				this.mbo.getOwner().getThisMboSet().save();
				MboRemote ownerMbo = this.mbo.getOwner().getThisMboSet().getMbo(0);
				setSessionObject(ownerMbo.getName(), ownerMbo);
				
				this.id = this.mbo.getUniqueIDValue();
				setSessionObject(mboName, null);
				
				this.mbo = this.simpleService.findById(ownerMbo.getMboSet(mboName), id);
				
				if(this.mbo == null){
					MboSetRemote labTransSet = this.user.getSession().getMboSet("LABTRANS");
					labTransSet.setQbe("LABTRANSID", String.valueOf(id));
					labTransSet.setQbeExactMatch(true);
					labTransSet.reset();
					
					this.mbo = labTransSet.moveFirst();
				}
				
				id = this.mbo.getUniqueIDValue();
				setMboSession(mboName,this.mbo);
				if(appName != null)
					setMboAppName(appName);
				
				setupActionBar(ownerMbo);				
			} else {
				this.mbo.getThisMboSet().save();
				this.id = this.mbo.getUniqueIDValue();
				
				setSessionObject(mboName, null);
				populateMbo(mboName, appName);

			}
				
			setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
		} catch (NullPointerException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));			
		} catch (Exception e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
		}	
		return SUCCESS;
	}	
	
	public String getCurrentWeekRange() {
		return currentWeekRange;
	}

	public void setCurrentWeekRange(String currentWeekRange) {
		this.currentWeekRange = currentWeekRange;
	}

	public String getCurrentDay() {
		return currentDay;
	}

	public void setCurrentDay(String currentDay) {
		this.currentDay = currentDay;
	}

	public List<MboRemote> getDailyMboList() {
		return dailyMboList;
	}

	public void setDailyMboList(List<MboRemote> dailyMboList) {
		this.dailyMboList = dailyMboList;
	}

	public MboSetRemote getDailyMboSet() {
		return dailyMboSet;
	}

	public void setDailyMboSet(MboSetRemote dailyMboSet) {
		this.dailyMboSet = dailyMboSet;
	}
	
	public Date getSelectedDate() {
		return selectedDate;
	}

	public void setSelectedDate(Date selectedDate) {
		this.selectedDate = selectedDate;
	}		
	
}
