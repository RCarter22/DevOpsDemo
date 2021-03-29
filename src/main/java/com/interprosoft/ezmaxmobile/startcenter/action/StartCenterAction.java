/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.startcenter.action;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.scconfig.SCConfigServiceRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXSession;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.startcenter.model.Portlet;
import com.interprosoft.ezmaxmobile.startcenter.service.StartCenterService;
import com.interprosoft.ezmaxmobile.user.model.User;

@Component
@Scope("prototype")
@Namespace("/startcenter")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class StartCenterAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private StartCenterService startCenterService;	
	
	private List<?> startCenters;
	
	private List<?> portlets;
	
	private List<?> data;

	@Autowired
	public StartCenterAction(User user) {
		this.user = user;
	}
	
	@Action(value="main", results={
			@Result(name="success",location="startcenter.jsp"),
			@Result(name="error",location="startcenter.jsp"),
			@Result(name="selfservice", location="../viewsr/selfsrstart.action", type="redirect")
	})	
	public String main() {
		try {
			/*Fix to #5050 - Self Service Licensing Issue - IdentityFilter has defaultPage set to null on initial launch
			of new EZMaxMobile, resulting in a redirect on first login to /main.action - resulting to startcenter/main.action
			Talk to Sam if unsure about this fix.
			 */
			if(user.isSelfServiceAcct())
				return "selfservice";

			this.clearMboSession("MAXUSER");
			this.clearAppSessions();
			this.clearAdvancedSearchSessions();
			
			this.startCenters =  this.startCenterService.getStartCenterList();
			
			if(this.startCenters == null || this.startCenters.size() == 0){
				SCConfigServiceRemote scService = (SCConfigServiceRemote)this.user.getSession().lookup("SCCONFIG");
				scService.getStartCenters(this.user.getSession().getUserInfo());
				this.startCenters =  this.startCenterService.getStartCenterList();
			}
			

			if(id == 0){
				if(getSessionValueByName(EMMConstants.DEFAULTSCID) != null)
					id = Integer.parseInt(getSessionValueByName(EMMConstants.DEFAULTSCID));
				if(id == 0)
					id =  this.startCenterService.getDefaultStartCenterID();
			}
			setSessionValue(EMMConstants.DEFAULTSCID, Long.toString(id));
			
			this.portlets = this.startCenterService.getUserPortlets(id);		
			
			//need to clear all MBO sessions for any MBO contained in the start center
			//this will make sure any Quick Insert function initiated from the start center
			//will be working from a clean, new MBO, instead of an old one			
			for(Portlet portlet : (List<Portlet>)this.portlets){
				if(portlet.getPortletType().equalsIgnoreCase("QUICKINSERT")){
					this.clearMboSession(portlet.getMboName());
				}					
			}	
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="update", results={
			@Result(name="success", location="main.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="main.action", type="redirect", params={"id","${id}"})
	})
	public String update() {
		try {
			MXSession test = this.user.getSession();

//			Grab all current start centers
			MboSetRemote scSet = test.getMboSet("SCCONFIG");

			scSet.setQbe("SCCONFIGID", String.valueOf(id));
			scSet.setQbeExactMatch(true);

			//Set groupName for current start center template
			String initialGroupName = scSet.getMbo(0).getString("GROUPNAME");

			scSet = test.getMboSet("SCCONFIG");
			scSet.setWhere("userid='" + this.user.getUserId() + "'");
			MboRemote sc = scSet.moveFirst();

			//Clean up all the current ones
			while(sc != null){
				sc.delete();
				sc = scSet.moveNext();
			}
			scSet.save();

			//Load all the new ones based on security group setting
			MboSetRemote guSet = (MboSetRemote)test.getMboSet("GROUPUSER");
			guSet.setWhere("userid='" + this.user.getUserId() + "' and groupname in (select groupname from maxgroup where sctemplateid is not null)");
			MboRemote gu = guSet.moveFirst();

			while(gu != null)
			{
				String groupName = gu.getString("GROUPNAME");

				SCConfigServiceRemote scService = (SCConfigServiceRemote)this.user.getSession().lookup("SCCONFIG");
				if (initialGroupName.equalsIgnoreCase(groupName)) {
					id = scService.loadStartCenterFromTemplate(Long.toString(gu.getLong("maxgroup.sctemplateid")), groupName, this.user.getSession().getUserInfo(), false);
				} else {
					scService.loadStartCenterFromTemplate(Long.toString(gu.getLong("maxgroup.sctemplateid")), groupName, this.user.getSession().getUserInfo(), false);
				}

				gu = guSet.moveNext();
			}

		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="kpiconfig", results={
		@Result(name="success",location="kpi.jsp")
	})		
	public String kpi(){
		try {
			data = startCenterService.getKPIGraphDataList(String.valueOf(id));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="kpigconfig", results={
			@Result(name="success",location="kpi.jsp")
		})		
	public String kpig(){
		try {
			data = startCenterService.getKPIGraphDataList(String.valueOf(id));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	public List<?> getStartCenters() {
		return startCenters;
	}

	public void setStartCenters(List<?> startCenters) {
		this.startCenters = startCenters;
	}

	public void setPortlets(List<?> portlets) {
		this.portlets = portlets;
	}

	public List<?> getPortlets() {
		return portlets;
	}
	
	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}	
}
