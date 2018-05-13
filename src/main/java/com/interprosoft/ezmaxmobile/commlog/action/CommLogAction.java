package com.interprosoft.ezmaxmobile.commlog.action;

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
@Namespace("/commlog")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class CommLogAction extends BaseAction{

	private static final long serialVersionUID = 1L;

	public static final String OWNERMBO = "COMMLOG";
	
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
				@Result(name="success", location="commlog.jsp"),
				@Result(name="error", location="commlog.jsp")
			}
		)
	public String view() {
		try{
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			if ( mbo!=null && !mbo.getName().equalsIgnoreCase("COMMLOG")){
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
			this.mbo.getThisMboSet().save();
			mbo = simpleService.add(mbo.getMboSet(OWNERMBO));
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
