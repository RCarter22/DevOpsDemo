package com.interprosoft.ezmaxmobile.pluspitem.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.item.ToolItemSetRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;
@Component
@Scope("prototype")
@Namespace("/pluspitem")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PluspItemAction extends BaseAction{

	private static final long serialVersionUID = 1L;
	
	private final String APPNAME = "PLUSPITEM";
	
	private final String OWNERMBO = "ITEM";
	
	@Autowired
	public SimpleService simpleService;
	
	private MboSetRemote getDefaultMboSet(){
		try {
			MboSetRemote mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO).getThisMboSet();
			mboSetRemote.setQbe("STATUS", "!=OBSOLETE");
			mboSetRemote.setQbe("ITEMSETID", "SET1");
			mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
			mboSetRemote.reset();
			mboSetRemote.resetQbe();			
		    if (!(mboSetRemote instanceof ToolItemSetRemote))		    	
		    	mboSetRemote.setRelationship("itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'ITEM')");

		    	return mboSetRemote;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return null;
		}	
	}
	
	@Action(value="main", results={
			@Result(name="success",location="main.jsp"),
			@Result(name="error",location="main.jsp")
		})	
	public String main()
	{
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
	@Action(value="doquicksearch",
			results={
				@Result(name="success", location="list.action", type="redirect", params={"search","${search}"}),
				@Result(name="error", location="list.jsp")
			}
		)
	public String doquickSearch() {
		try{	
			// Set default app where clause			
			MboSetRemote mboSetRemote = getDefaultMboSet();
			mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
			mboSetRemote.resetQbe();			
			this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
			
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
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
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if(mboSetRemote==null){
				mboSetRemote = getDefaultMboSet();			
			} else {
				mboSetRemote.reset();
			}
			if (pagination.getSortBy() == null	|| pagination.getSortBy().equalsIgnoreCase("")) {
				pagination.setSortBy("STATUSDATE");
				pagination.setSortOrder("DESC");
			}
			mboList = this.simpleService.paginateMboSet(mboSetRemote, pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	@Action(value="view",results={
			@Result(name="success", location="item.jsp"),
			@Result(name="error", location="item.jsp")
		}
	)
	public String view() {
		try{	
			populateMbo(OWNERMBO, APPNAME);
			//gets us list of store rooms
			pagination.setPageSize(5);
			populateMboListByRelationship(OWNERMBO, "INVENTORY");
			
			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	@Action(value="previtem",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
		}
	)
	public String prevItem() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote == null && mbo != null){
				mboSetRemote = mbo.getThisMboSet();
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			}

			mbo = mboSetRemote.getMboForUniqueId(mbo.getUniqueIDValue());
			id = mbo.getUniqueIDValue(); 
			mbo = mbo.getThisMboSet().movePrev();
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
	
	@Action(value="nextitem",results={
			@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
			@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
		}
	)
	public String nextItem() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote == null && mbo != null){
				mboSetRemote = mbo.getThisMboSet();
				this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			}
			mbo = mboSetRemote.getMboForUniqueId(mbo.getUniqueIDValue());
			id = mbo.getUniqueIDValue(); 
			mbo = mbo.getThisMboSet().moveNext();
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
	@Action(value="classify",
			results={
				@Result(name="success", location="classify.jsp"),
				@Result(name="error", location="classify.jsp")
			}
		)
	public String classify() {
		try{
			pagination.setPageSize(100);			
			populateMbo(OWNERMBO, APPNAME);		
			populateMboListByRelationship("ITEM","ITEMSPECCLASS");
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
				mbo.getThisMboSet().setQbe("ITEMSETID", "=SET1");
				mbo.getThisMboSet().setQbe("STATUS", "!=OBSOLETE");	
				this.setMboSession(EMMConstants.ADVANCEDSEARCHMBO, mbo);
			}
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


	
}
