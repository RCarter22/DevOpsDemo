package com.interprosoft.ezmaxmobile.wplabor.action;

import java.rmi.RemoteException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;
@Component
@Scope("prototype")
@Namespace("/wplabor")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class WPLaborAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	public static final String OWNERMBO = "WPLABOR";
	
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
			pagination.setPageSize(5);
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(currentMbo, "SHOWPLANLABOR");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="view",
			results={
				@Result(name="success", location="wplabor.jsp"),
				@Result(name="error", location="wplabor.jsp")
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

			//if coming back from a record which references a task, there will be no owner on the mbo
			if(mbo.getOwner() != null){
				this.setMboSession(mbo.getOwner().getName(), mbo.getOwner());
				id = mbo.getOwner().getUniqueIDValue();				
			}
			else{
				MboRemote ownerMbo = mbo.getMboSet("WORKORDER").getMbo(0).getMboSet("PARENT").getMbo(0);
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
}
