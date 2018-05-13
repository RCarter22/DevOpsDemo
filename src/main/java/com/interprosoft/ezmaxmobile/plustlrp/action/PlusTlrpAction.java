package com.interprosoft.ezmaxmobile.plustlrp.action;

import java.rmi.RemoteException;

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

import psdi.app.labor.LabTransRemote;
import psdi.mbo.MboConstants;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;

@Component
@Scope("prototype")
@Namespace("/plustlrp")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusTlrpAction extends BaseAction  {

	private static final long serialVersionUID = 1L;
	
	public static final String APPNAME = "PLUSTLRP";	
	public static final String OWNERMBO = "LABTRANS";

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
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="view",results={
			@Result(name="success", location="labrep.jsp"),
			@Result(name="error", location="labrep.jsp")
		}
	)
	public String view() {
		try{	
			populateMbo(OWNERMBO, APPNAME);			
			mbo.setFieldFlag(new String[]{"TASKID"}, MboConstants.REQUIRED, true);

		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="applyLabor",results={
			@Result(name="success", location="list.action", type="redirect"),
			@Result(name="error", location="list.action", type="redirect")
		}
	)
	public String applyLabor() {
		try{	
			mbo = (MboRemote)this.getSessionObject(OWNERMBO); 
			if(this.mbo== null && id>0){
				mbo = this.simpleService.findById(OWNERMBO,id);
			}else{
				mbo = this.simpleService.findById(mbo.getMboSet(OWNERMBO), id);
			}
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
	
	
	@Action(value="goback", results={
			@Result(name="success",location="main.action",type="redirect"),
			@Result(name="error",location="main.action",type="redirect")
		})
	public String goback(){
		try {			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);	
			if(this.mbo.toBeSaved()){	
				mbo.delete();
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
	
	@Action(value="enterbylabor",results={
			@Result(name="success", location="enterbylabor.jsp"),
			@Result(name="error", location="enterbylabor.jsp")
		}
	)
	public String enterByLabor() {
		try{	
			populateMbo(OWNERMBO, APPNAME);

			//Set laborcode to current user
			if (mbo.getString("LABORCODE") == null || mbo.getString("LABORCODE").equalsIgnoreCase("")) {
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
			}
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}		
	
    @Action(value="addenterbylabor",results={
			@Result(name="success",location="enterbylabor.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="main.action",type="redirect")
		}
	)
	public String addEnterByLabor() {
	     try{
	    	 clearMboSession(OWNERMBO);
	    	 create(OWNERMBO, APPNAME);
	     } catch (Exception e) {
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
                mboSetRemote.setApp(APPNAME);
				mboSetRemote.setQbe("SITEID", this.user.getSiteId());
				mboSetRemote.setQbeExactMatch(true);
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
				// Set default QBE
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
		try{	
/*			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			setMboAppName(APPNAME);
			mboSet = (MboSetRemote) this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSet != null)
				mboSet.resetQbe();
			else
				mboSet = this.user.getSession().getMboSet(OWNERMBO);
			String[][] qbeSet = mbo.getThisMboSet().getQbe();
			for (int i = 0; i < qbeSet.length; i++) {
				mboSet.setQbe(qbeSet[i][0], qbeSet[i][1]);
			}
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);		*/
			
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
}
