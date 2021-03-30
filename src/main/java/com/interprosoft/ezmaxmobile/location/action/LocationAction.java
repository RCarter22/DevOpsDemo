package com.interprosoft.ezmaxmobile.location.action;

import java.rmi.RemoteException;
import java.util.*;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.location.LocationRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.mbo.NonPersistentMboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.pagination.Pagination;
import com.interprosoft.ezmaxmobile.common.service.SimpleService;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;

@Component
@Scope("prototype")
@Namespace("/location")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class LocationAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	
	public static final String OWNERMBO = "LOCATIONS";	
	public static final String APPNAME = "LOCATION";
	
	public String toAdd;
	public MboRemote newLocation;
	public MboRemote currLochHier;
	private List<MboRemote> hierarchyMboList;
	private Pagination hierarchyPagination = new Pagination();
	
	@Autowired
	public SimpleService simpleService;
	
	@Action(value="main",
			results={
				@Result(name="success", location="main.jsp"),
				@Result(name="error", location="main.jsp")
			}
		)
	public String execute() {
		try{
			clearMboSession(OWNERMBO);
			clearMboSession("WORKORDER");
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
	
	@Action(value="list",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
	public String list() {
		try{
			clearMboSession(OWNERMBO);
			clearMboSession("WORKORDER");
			mbo = this.simpleService.getFakeMbo(OWNERMBO, APPNAME);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if (mboSetRemote!=null)
				mboSetRemote.reset();
			
			if (pagination.getSortBy() == null	|| pagination.getSortBy().equalsIgnoreCase("")) {
				pagination.setSortBy("LOCATION");
				pagination.setSortOrder("ASC");
			}
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
				mboSetRemote.setQbe("SITEID", "="+user.getSiteId());
				mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere()+ " and (type in ('COURIER' ,'HOLDING' ,'LABOR' ,'OPERATING' ,'REPAIR' , 'SALVAGE' , 'VENDOR'))");
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
				mbo.getThisMboSet().setQbe("SITEID", user.getSiteId());
				setMboAppName(APPNAME);	
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

	@Action(value="listchildren",
			results={
				@Result(name="success", location="listchildren.jsp"),
				@Result(name="error", location="listchildren.jsp")
			}
		)
	public String listchildren() {
		try {
			clearMboSession("CURRENTHIERARCHY");
			mboName = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			this.mbo =  (MboRemote)this.getSessionObject(mboName);
			//we now have the location
			MboSetRemote hSet = mbo.getMboSet("LOCSYSTEMS_FOR_LOCATION");
			hSet.setQbe("LOCSYSTEMID", ""+id);
			hSet.setQbeExactMatch(true);
			hSet.reset();
			//now we grab the locsys
			MboRemote locsys = hSet.moveFirst();
			MboSetRemote children = locsys.getMboSet("LOCHIERARCHY_CHILDREN");

			mboList = this.simpleService.paginateMboSet(children, pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}
	
	@Action(value="listparents",
			results={
				@Result(name="success", location="listparents.jsp"),
				@Result(name="error", location="listparents.jsp")
			}
		)
	public String listparents() {
		try {
			clearMboSession("CURRENTHIERARCHY");
			mboName = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			this.mbo =  (MboRemote)this.getSessionObject(mboName);
			//we now have the location
			MboSetRemote hSet = mbo.getMboSet("LOCSYSTEMS_FOR_LOCATION");
			hSet.setQbe("LOCSYSTEMID", ""+id);
			hSet.setQbeExactMatch(true);
			hSet.reset();
			//now we grab the locsys
			MboRemote locsys = hSet.moveFirst();								
			MboSetRemote parents = locsys.getMboSet("LOCHIERARCHY_PARENTS");						
			mboList = this.simpleService.paginateMboSet(parents, pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}
	
	@Action(value="viewhierarchy",
			results={
				@Result(name="success", location="addhierarchy.jsp"),
				@Result(name="error", location="addhierarchy.jsp")
			}
		)
	public String viewhierarchy() {
		try {
			populateMbo("LOCHIERARCHY", APPNAME);
		} catch (Exception e){

			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}
	
	@Action(value="savehierarchy",
			results={
				@Result(name="success",location="viewhierarchy", type="redirect",params={"id","${id}"}),
				@Result(name="error",location="viewhierarchy", type="redirect",params={"id","${id}"})
			}
		)
	public String savehierarchy() {
		try {
			populateMbo("LOCHIERARCHY", APPNAME);
			mboName = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			this.mbo =  (MboRemote)this.getSessionObject(mboName);
			this.mbo.getOwner().getThisMboSet().save();
			this.setMessage(new EZMessage("Record Saved", EMMConstants.SUCCESS));
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
	
	@Action(value="addchild",
		results={
			@Result(name="success",location="viewhierarchy", type="redirect",params={"id","${id}"}),
			@Result(name="newchildsuccess",location="view", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="listchildren", type="redirect",params={"id","${id}"})
		}
	)
	public String addchild() {
		try {
			populateMbo("LOCHIERARCHY", APPNAME);
			MboSetRemote locs = this.simpleService.getMboSet("LOCATIONS");
			locs.setQbe("LOCATION", mbo.getString("LOCATION"));
			locs.setQbe("SITEID", mbo.getString("SITEID"));
			locs.setQbe("ORGID", mbo.getString("ORGID"));
			locs.setQbeExactMatch(true);
			MboRemote loc = locs.moveFirst();
			MboSetRemote sysSet = loc.getMboSet("LOCSYSTEMS_FOR_LOCATION");
			sysSet.setQbe("SYSTEMID", mbo.getString("SYSTEMID"));
			sysSet.setQbeExactMatch(true);
			MboRemote sys = sysSet.moveFirst();
			MboSetRemote loch = sys.getMboSet("LOCHIERARCHY_CHILDREN");
			MboRemote newChild = loch.addAtEnd();
			id = newChild.getUniqueIDValue();
			mbo = newChild;
			this.setMboSession("LOCHIERARCHY", newChild);
			
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
	
	@Action(value="addparent",
		results={
			@Result(name="success",location="viewhierarchy", type="redirect",params={"id","${id}"}),
			@Result(name="newparentsuccess",location="view", type="redirect",params={"id","${id}"}),
			@Result(name="error",location="listparents", type="redirect",params={"id","${id}"})
		}
	)
	public String addparent(){
		try {
			populateMbo("LOCHIERARCHY", APPNAME);
			MboSetRemote locs = this.simpleService.getMboSet("LOCATIONS");
			locs.setQbe("LOCATION", mbo.getString("LOCATION"));
			locs.setQbe("SITEID", mbo.getString("SITEID"));
			locs.setQbe("ORGID", mbo.getString("ORGID"));
			locs.setQbeExactMatch(true);
			MboRemote loc = locs.moveFirst();
			MboSetRemote sysSet = loc.getMboSet("LOCSYSTEMS_FOR_LOCATION");
			sysSet.setQbe("SYSTEMID", mbo.getString("SYSTEMID"));
			sysSet.setQbeExactMatch(true);
			MboRemote sys = sysSet.moveFirst();
			MboSetRemote loch = sys.getMboSet("LOCHIERARCHY_PARENTS");
			MboRemote newParent = loch.addAtEnd();
			id = newParent.getUniqueIDValue();
			mbo = newParent;
			this.setMboSession("LOCHIERARCHY", newParent);

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
	
	@Action(value="newcreatechild",
			results={
				@Result(name="success",location="view", type="redirect",params={"id","${id}", "toAdd", "${toAdd}"}),
				@Result(name="error",location="view", type="redirect",params={"id","${id}", "toAdd", "${toAdd}"})
			}
		)
	public String newcreatechild(){
		try {
			populateMbo("LOCHIERARCHY", APPNAME);
			setMboSession("CURRENTHIERARCHY", mbo);
			MboSetRemote newLocs = this.simpleService.getMboSet("LOCATIONS");
			mbo = newLocs.add();
			mbo.setValue("TYPE", "OPERATING");
			id = mbo.getUniqueIDValue();
			toAdd="child";
			setSessionObject(OWNERMBO, mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}
	
	@Action(value="newcreateparent",
			results={
				@Result(name="success",location="view", type="redirect",params={"id","${id}", "toAdd", "${toAdd}"}),
				@Result(name="error",location="view", type="redirect",params={"id","${id}", "toAdd", "${toAdd}"})
			}
		)
	public String newcreateparent(){
		try {
			populateMbo("LOCHIERARCHY", APPNAME);
			setMboSession("CURRENTHIERARCHY", mbo);
			MboSetRemote newLocs = this.simpleService.getMboSet("LOCATIONS");
			mbo = newLocs.add();
			mbo.setValue("TYPE", "OPERATING");
			id = mbo.getUniqueIDValue();
			toAdd="parent";
			setSessionObject(OWNERMBO, mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}
	
	@Action(value="savenewlocationhierachy",
			results={
				@Result(name="success",location="view", type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view", type="redirect",params={"id","${id}", "toAdd", "${toAdd}"})
			}
		)
	public String savenewlocationhierachy(){
		try {
			currLochHier = (MboRemote) getSessionObject("CURRENTHIERARCHY");
			MboSetRemote locs = this.simpleService.getMboSet("LOCATIONS");
			locs.setQbe("LOCATION", currLochHier.getString("LOCATION"));
			locs.setQbe("SITEID", currLochHier.getString("SITEID"));
			locs.setQbe("ORGID", currLochHier.getString("ORGID"));
			locs.setQbeExactMatch(true);
			MboRemote loc = locs.moveFirst();
			MboSetRemote sysSet = loc.getMboSet("LOCSYSTEMS_FOR_LOCATION");
			sysSet.setQbe("SYSTEMID", currLochHier .getString("SYSTEMID"));
			sysSet.setQbeExactMatch(true);
			MboRemote sys = sysSet.moveFirst();
			MboSetRemote loch;
			if(toAdd.equals("child"))
				loch = sys.getMboSet("LOCHIERARCHY_CHILDREN");
			else
				loch = sys.getMboSet("LOCHIERARCHY_PARENTS");
			MboRemote newHier = loch.addAtEnd();
			populateMbo(OWNERMBO, APPNAME);
			mbo.getString("LOCATION");
			mbo.getThisMboSet().save();
			
			if(toAdd.equals("child"))
				newHier.setValue("LOCATION", mbo.getString("LOCATION"));
			else
				newHier.setValue("PARENT", mbo.getString("LOCATION"));
			loch.save();
			if(toAdd.equals("child"))
				this.setMessage(new EZMessage("Child Created", EMMConstants.SUCCESS));
			else
				this.setMessage(new EZMessage("Parent Created", EMMConstants.SUCCESS));
			clearMboSession("CURRENTHIERARCHY");
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
	
	@Action(value="associatesystems",
			results={
				@Result(name="success",location="viewhierarchy", type="redirect",params={"id","${id}"}),
				@Result(name="error",location="viewhierarchy", type="redirect",params={"id","${id}"})
			}
		)
	public String associatesystems(){
		try {
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote locs = this.simpleService.getMboSet("LOCATIONS");
			locs.setQbe("LOCATION", mbo.getString("LOCATION"));
			locs.setQbe("SITEID", mbo.getString("SITEID"));
			locs.setQbe("ORGID", mbo.getString("ORGID"));
			locs.setQbeExactMatch(true);
			MboRemote loc = locs.moveFirst();
			MboSetRemote loch = loc.getMboSet("LOCHIERLOCONLY");
			MboRemote newChild = loch.addAtEnd();
			id = newChild.getUniqueIDValue();
			mbo = newChild;
			this.setMboSession("LOCHIERARCHY", newChild);
		} catch (Exception e){

			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;	
		}
		return SUCCESS;
	}

	@Action(value="create",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String create() {
		try{
			create(OWNERMBO, APPNAME);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="view",
			results={
				@Result(name="success", location="location.jsp"),
				@Result(name="error", location="location.jsp")
			}
		)
	public String view() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			
			MboSetRemote hierarchySet = mbo.getMboSet("LOCSYSTEMS_FOR_LOCATION");
			hierarchyMboList = new ArrayList<MboRemote>();
			hierarchyPagination.setPageSize(5);
			hierarchyMboList = this.simpleService.paginateMboSet(hierarchySet, hierarchyPagination);
			currLochHier = (MboRemote) getSessionObject("CURRENTHIERARCHY");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	
	@Action(value="listwodetail",
			results={
				@Result(name="success", location="listwodetail.jsp"),
				@Result(name="error", location="listwodetail.jsp")
			}
		)
	public String listwodetail() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			NonPersistentMboSetRemote viewwopmset = (NonPersistentMboSetRemote) mbo.getMboSet("VIEWWOPMS");
			MboRemote viewwopm = viewwopmset.setup();
			viewwopm.setValue("LOCATION", mbo.getString("LOCATION"));
			viewwopm.setValue("SITEID", mbo.getString("SITEID"));
			this.clearMboSession("WORKORDER");
			user.getSession().getMboSet("WOACTIVITY");
			mboList = simpleService.paginateMboSet(viewwopm.getMboSet("VIEWWORK_BYLOCANDANCESTORS_WORKSITENOTNULL"), pagination);
			//check for null - 5.2.0
			if(mboList != null){
				if(mboList.size()>0)
					mbo = mboList.get(0);
			}
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="listsr",
			results={
				@Result(name="success", location="listsr.jsp"),
				@Result(name="error", location="listsr.jsp")
			}
		)
	public String listSR() {
		try{				
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"SRLOC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="listwos",
			results={
				@Result(name="success", location="listwos.jsp"),
				@Result(name="error", location="listwos.jsp")
			}
		)
	public String listWOs() {
		try{
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"ALLWO","REPORTDATE DESC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="listassets",
			results={
				@Result(name="success", location="listassets.jsp"),
				@Result(name="error", location="listassets.jsp")
			}
		)
	public String listAssets() {
		try{				
			populateMbo(OWNERMBO, APPNAME);
			populateMboListByRelationship(OWNERMBO,"PLUSCASSET","CHANGEDATE DESC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="createworkorder",
			results={
				@Result(name="success",location="../wotrack/view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createworkorder() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
			{
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			mbo = (MboRemote)(((LocationRemote)mbo).createWorkorder(null));
			
			id = mbo.getUniqueIDValue();
			setMessage(new EZMessage(mbo.getMessage("ticket", "WOCreated", new String[]{mbo.getString("WONUM")}), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="createservicerequest",
			results={
				@Result(name="success",location="../sr/view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
			}
		)
	public String createServiceRequest() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if(this.mbo== null && id>0)
			{
				mbo = this.simpleService.findById(OWNERMBO,id);
			}
			mbo = (MboRemote)((LocationRemote)mbo).createServiceRequest(null);
			
			id = mbo.getUniqueIDValue();
			setMessage(new EZMessage(mbo.getMessage("ticket", "SRCreated", new String[]{mbo.getString("TICKETID")}), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="listpendinginsp",
			results={
				@Result(name="success", location="listpendinginsp.jsp"),
				@Result(name="error", location="listpendinginsp.jsp")
			}
		)
	public String listpendinginsp() {
		try{				
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			mboList = this.simpleService.paginateMboSet(getInspections("PENDING"), pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="listcompleteinsp",
			results={
				@Result(name="success", location="listcompleteinsp.jsp"),
				@Result(name="error", location="listcompleteinsp.jsp")
			}
		)
	public String listcompleteinsp() {
		try{				
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			mboList = this.simpleService.paginateMboSet(getInspections("COMPLETED"), pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="listinproginsp",
			results={
				@Result(name="success", location="listinproginsp.jsp"),
				@Result(name="error", location="listinproginsp.jsp")
			}
		)
	public String listinproginsp() {
		try{				
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			mboList = this.simpleService.paginateMboSet(getInspections("INPROG"), pagination);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
  	
	public MboSetRemote getInspections(String status) throws RemoteException, MXException {
		MboSetRemote inspResults = mbo.getMboSet("INSPECTIONRESULT");
		inspResults.setQbe("STATUS", status);
		inspResults.setOrderBy("DUEDATE, CREATEDATE DESC");
		return inspResults;
	}
	
	public List<MboRemote> getHierarchyMboList() {
		return hierarchyMboList;
	}

	public void setHierarchyMboList(List<MboRemote> hierarchyMboList) {
		this.hierarchyMboList = hierarchyMboList;
	}
	
	public Pagination getHierarchyPagination() {
		return hierarchyPagination;
	}

	public void setHierarchyPagination(Pagination hierarchyPagination) {
		this.hierarchyPagination = hierarchyPagination;
	}

	public void setToAdd(String toAdd) {
		this.toAdd = toAdd;
	}
	
	public String getToAdd() {
		return toAdd;
	}
	
	public MboRemote getNewLocation() {
		return newLocation;
	}

	public void setNewLocation(MboRemote newLocation) {
		this.newLocation = newLocation;
	}
	
	public MboRemote getCurrLochHier() {
		return currLochHier;
	}

	public void setCurrLochHier(MboRemote currLochHier) {
		this.currLochHier = currLochHier;
	}
}