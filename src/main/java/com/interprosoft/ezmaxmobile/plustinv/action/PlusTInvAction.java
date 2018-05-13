/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.plustinv.action;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Iterator;

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

import psdi.app.serviceitem.ServiceItemSetRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.mbo.NonPersistentMboSetRemote;
import psdi.plust.app.inventory.PlusTInventoryRemote;
import psdi.util.MXException;

@Component
@Scope("prototype")
@Namespace("/plustinv")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusTInvAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	
	private final String APPNAME = "PLUSTINV";
	private final String OWNERMBO = "INVENTORY";
	
	private String viewType;
	private String storeroom;
	private String itemnum;
	
	private ArrayList<MboRemote> mboInvbList = new ArrayList<MboRemote>();	
	
	/**
	 * Create the the MboSetRemote Object 
	 * @return MboSetRemote Object
	 */
	private MboSetRemote getDefaultMboSet(){
		try {
			MboSetRemote mboSetRemote = this.simpleService.getFakeMbo(OWNERMBO).getThisMboSet();
			
			this.storeroom = (String)this.getSessionObject("STOREROOM");
			if (this.storeroom != null && this.storeroom.length() > 0) {
				mboSetRemote.setQbe("LOCATION", "="+ this.storeroom);
			}
			mboSetRemote.setQbe("STATUS", "!=OBSOLETE");
			mboSetRemote.setQbe("SITEID", "="+this.user.getSiteId()); 
			mboSetRemote.setWhere(mboSetRemote.getUserAndQbeWhere());
			mboSetRemote.reset();
			mboSetRemote.resetQbe();			
		    if (!(mboSetRemote instanceof ServiceItemSetRemote)){		    	
		    	mboSetRemote.setRelationship("exists (select 1 from item where itemnum = inventory.itemnum and itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'ITEM'))");
		    } else if (mboSetRemote instanceof ServiceItemSetRemote){
		    	mboSetRemote.setRelationship("itemnum in (select itemnum from item where itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'STDSERVICE'))");
		    }		
		    return mboSetRemote;
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return null;
		}	
	}	
	
	/**
	 * Main action for main.action 
	 * @return STATUS    SUCCESS -- Successfully initialize this application 
	 * 		   			 ERROR   -- Failed to initialize features and clear session for this application
	 */
	@Action(value="main", results={
		@Result(name="success",location="main.jsp"),
		@Result(name="error",location="main.jsp")
	})	
	public String main() {
		try {
			this.setSessionObject("STOREROOM", null);
			clearMboSession(OWNERMBO);
			clearAppSessions();
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			MboSetRemote storerooms = this.user.getSession().getMboSet("LOCATIONS");
			storerooms.setQbe("TYPE", "STOREROOM");
			storerooms.setQbe("SITEID", user.getSiteId());
			mboList = this.simpleService.paginateMboSet(storerooms, pagination);
			setMboAppName(APPNAME);
			this.setSessionObject("CURRENTACTION", "list.action");
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
			this.setSessionObject("STOREROOM", storeroom);
			this.setSessionObject("CURRENTACTION", "list.action");
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if(mboSetRemote==null){
				mboSetRemote = getDefaultMboSet();			
			} else {
				mboSetRemote.reset();
			}
			mboList = this.simpleService.paginateMboSet(mboSetRemote, pagination);
			this.setSessionObject(EMMConstants.CURRENTMBOLIST, mboList);
			this.setSessionObject("INVBALANCESLIST", null);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	
	/**
	 * This  function will be called if user click  "All Saved Queries" on the main.jsp page
	 * Retrieve all queries that are saved in the server
	 * @return	STATUS returned by baseAction function 
	 */
	@Action(value="queries",
			results={
				@Result(name="success", location="listqueries.jsp"),
				@Result(name="error", location="listqueries.jsp")
			}
		)
	public String queries() {
		return this.retrieveQueries(false, APPNAME);
	}	
	
	/**
	 * This function will be called if user click "My Saved Queries" on the main.jsp page
	 * Retrieve saved queries belong to current user 
	 * @return    STATUS returned by baseAction function 
	 */
	@Action(value="myqueries",
			results={
				@Result(name="success", location="listqueries.jsp"),
				@Result(name="error", location="listqueries.jsp")
			}
		)
	public String myqueries() {
		return retrieveQueries(true, APPNAME);
	}	
	
	@SuppressWarnings("unchecked")
	@Action(value="physicalcount",
			results={
				@Result(name="success", location="physicalcount.jsp"),
				@Result(name="error", location="physicalcount.jsp")
			}
		)
	public String physicalCount() {
		try{
			mboList = (ArrayList<MboRemote>)this.getSessionObject(EMMConstants.CURRENTMBOLIST);
			mboInvbList = (ArrayList<MboRemote>)this.getSessionObject("INVBALANCESLIST");
			if(mboList != null && mboInvbList == null)
			{
				mboInvbList = new ArrayList<MboRemote>();
				String items = itemnum;
				String locations = "";
				if(items == null || items.equalsIgnoreCase(""))
				{
					Iterator<MboRemote> it = mboList.iterator();
					while(it.hasNext())
					{
						MboRemote inv = it.next();
						items += inv.getString("ITEMNUM") + ",";
						locations += inv.getString("LOCATION") + ",";
					}
				}
				MboSetRemote invbSet = this.user.getSession().getMboSet("INVBALANCES");
				if(storeroom!= null && !storeroom.equalsIgnoreCase("")){
					invbSet.setQbe("LOCATION", storeroom);
				}else{
					mbo = (MboRemote)this.getSessionObject(OWNERMBO);
					if (mbo!=null){
						invbSet.setQbe("LOCATION", mbo.getString("LOCATION"));
					}
					else {
						invbSet.setQbe("LOCATION", locations);
					}
				}
				invbSet.setQbe("SITEID", mboList.get(0).getString("SITEID"));
				invbSet.setQbe("ITEMSETID", mboList.get(0).getString("ITEMSETID"));
				invbSet.setQbe("STAGINGBIN", "0");
				invbSet.setQbe("ITEM.ROTATING", "0");
				invbSet.setQbe("ITEMNUM", items);
				invbSet.setOrderBy("LOCATION, BINNUM");
				this.setSessionObject("INVBALANCESMBOSET", invbSet);
				MboRemote invb = invbSet.moveFirst();
				while (invb != null) {
					mboInvbList.add(invb);
					invb = invbSet.moveNext();
				}
				this.setSessionObject("INVBALANCESLIST", mboInvbList);
			}
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="savephysicalcount",
			results={
				@Result(name="success", location="physicalcount.action", type="redirect", params={"itemnum","${itemnum}","storeroom","${storeroom}"}),
				@Result(name="error", location="physicalcount.action", type="redirect")
			}
		)
	public String savePhysicalCount() {

		try{
			MboSetRemote invbSet = (MboSetRemote)this.getSessionObject("INVBALANCESMBOSET");
			invbSet.save();
			this.setSessionObject("INVBALANCESLIST", null);
			this.setMessage(new EZMessage(invbSet.getMbo(0).getMessage("inventory", "physCntAdjusted"), EMMConstants.SUCCESS));
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="doquicksearch",
			results={
				@Result(name="success", location="${currentAction}", type="redirect", params={"search","${search}","storeroom","${storeroom}"}),
				@Result(name="error", location="cyclecountlist.jsp")
			}
		)
	public String doquickSearch() {
		try{
			storeroom = (String) this.getSessionObject("STOREROOM");
			currentAction = (String) this.getSessionObject("CURRENTACTION");
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
            if(mboSetRemote != null)
                  mboSetRemote.resetQbe();
            else{
            	mboSetRemote = getDefaultMboSet();
            }
			this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			//reset the current action for cyclecount
			this.setSessionObject("CURRENTACTION", null);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	

	
	/**
	 * This function will be called if the user click the advanced search button. 
	 * It will return the advancedsearch.jsp to let the client fill some searh filters
	 * @return 		STATUS  SUCCESS  -- successfully jump to the filter setting page
	 * 						ERROR 	 -- failed to jump to advamcedsearch.jsp file. May be 
	 * 									the problem of setting mbo session 
	 */
	
	@Action(value="advancedsearch",results={
			@Result(name="success", location="advancedsearch.jsp"),
			@Result(name="error", location="advancedsearch.jsp")
		}
	)
	public String advancedsearch() {
		try{	
			clearMboSession(OWNERMBO);
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			this.storeroom = (String) this.getSessionObject("STOREROOM");
			if(mbo==null){
				mbo =  this.simpleService.getZombieMbo(OWNERMBO);
				setMboAppName(APPNAME);
				// Set default QBE
				mbo.getThisMboSet().setQbe("STATUS", "!=OBSOLETE");
				mbo.getThisMboSet().setQbe("SITEID", "="+this.user.getSiteId());	
				
				if (this.storeroom != null && this.storeroom.length() > 0){
					mbo.getThisMboSet().setQbe("LOCATION", this.storeroom);
				}
			    if (!(mbo.getThisMboSet() instanceof ServiceItemSetRemote)){		    	
			    	mbo.getThisMboSet().setRelationship("exists (select 1 from item where itemnum = inventory.itemnum and itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'ITEM'))");
			    } else if (mbo.getThisMboSet() instanceof ServiceItemSetRemote){
			    	mbo.getThisMboSet().setRelationship("itemnum in (select itemnum from item where itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'STDSERVICE'))");
			    }										
			} else{
				//check if the storeroom selection was changed
				String currStoreRoom = mbo.getThisMboSet().getQbe("LOCATION");
				if(!currStoreRoom.equalsIgnoreCase(this.storeroom)){
					this.setSessionObject("STOREROOM", currStoreRoom);
				}
			}
			this.setMboSession(EMMConstants.ADVANCEDSEARCHMBO, mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}
	
	/**
	 * This function will be called if the useer click the search button on the advancedsearch.jsp file
	 * It will search matching mboset object based on the core functions
	 * @return   STATUS    SUCCESS -- Successfully do the advanced search based on user input filters
	 * 					   ERROR   -- Failed to do advanced search part 
	 * 					   NONE    -- There is only one matching result. Show the view.jsp file directly
	 * 								   and let the user do any manipulation of this page.  
	 */
	@Action(value="doadvancedsearch",results={
			@Result(name="success", location="${currentAction}", type="redirect", params={"search","${search}","storeroom","${storeroom}"}),
			@Result(name="error", location="list.jsp")
		}
	)
	public String doadvancedsearch() {
		try{	
			this.storeroom = (String) this.getSessionObject("STOREROOM");
			this.currentAction = (String) this.getSessionObject("CURRENTACTION");
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			setMboAppName(APPNAME);
			mboSet = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
		    if(mboSet != null)
		    	mboSet.resetQbe();
		    else
		    	mboSet = this.user.getSession().getMboSet(OWNERMBO);
			String [][] qbeSet = mbo.getThisMboSet().getQbe();
			for(int i = 0; i < qbeSet.length; i++){
				mboSet.setQbe(qbeSet[i][0], qbeSet[i][1]);
			}
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);  

			//reset the current action for cyclecount
			this.setSessionObject("CURRENTACTION", null);		
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}                   
	
	
	
	@Action(value="view", results={
			@Result(name="success",location="view.jsp"),
			@Result(name="error",location="view.jsp")
		})
	public String view() {
		try{
			// clear related caches
			this.setMboSession("TRANSFERCURITEM", null);
			this.setSessionObject("INVBALANCESLIST", null);
			
			populateMbo(OWNERMBO, APPNAME);			
			populateMboListByRelationship(OWNERMBO,"INVBALANCES","BINNUM ASC");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	

	
	@Action(value="viewrotatingassets", results={
			@Result(name="success",location="rotatingassetlist.jsp"),
			@Result(name="error",location="rotatingassetlist.jsp")
		})
	public String viewRotatingAssets() {
		try{
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			if (mbo==null){
				mbo = this.simpleService.findById(this.OWNERMBO,id);
				setMboAppName(APPNAME);
			}
			setMboSession(this.OWNERMBO,this.mbo);
			populateMboListByRelationship(OWNERMBO,"ASSET");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}
	
    @Action(value="reconcilebalances",
            results={
            @Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
            @Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
            }
     )
    public String reconcileBalances() {
	     try{
	            populateMbo(OWNERMBO,APPNAME);                  
	            PlusTInventoryRemote invRemote = (PlusTInventoryRemote)this.mbo;
	            invRemote.getThisMboSet().save();
	            invRemote.reconcileBalances();
	            invRemote.getThisMboSet().save();
	            this.setMboSession(OWNERMBO, null);
	            populateMbo(OWNERMBO,APPNAME);
	            id = invRemote.getUniqueIDValue();
	            this.setMessage(new EZMessage(getText("inventor.balancereconciled"), EMMConstants.SUCCESS));
	     } catch (Exception e){
	            this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
	            this.addActionError(e.getMessage());
	            return ERROR;
	     }
	     return SUCCESS;
	}

	@Action(value="deletebalance", results={
			@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="view.action",type="redirect",params={"id","${id}"})
		})
	public String deleteBalance(){
		try {
		    this.storeroom = (String) this.getSessionObject("STOREROOM");
		        
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			
			MboRemote mboRemote = this.simpleService.findById(mbo.getMboSet("INVBALANCES"), id);
			id = tmpId;
			mboRemote.delete();
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

	@Action(value="createtransfercurrentitem", results={
			@Result(name="success",location="transfercurrentitem.action",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="transfercurrentitem.action",type="redirect",params={"id","${id}"})
		})
	public String createTransferCurrentItem(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			
			this.setSessionObject("TRANSFERCURITEM", null);
			MboSetRemote transferSetRemote = (MboSetRemote)mbo.getMboSet("TRANSFERCURITEM");
			transferSetRemote.clear();
			mbo = transferSetRemote.addAtEnd();
			this.setSessionObject("TRANSFERCURITEM", mbo);
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
	
	@Action(value="transfercurrentitem", results={
			@Result(name="success",location="transfercurrentitem.jsp"),
			@Result(name="error",location="transfercurrentitem.jsp")
		})
	public String transferCurrentItem(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			
			MboRemote transferRemote = (MboRemote)this.getSessionObject("TRANSFERCURITEM");
			if (transferRemote != null){
				mbo = transferRemote;
				this.setMboSession("TRANSFERCURITEM", mbo);
			}
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="dotransfercurrentitem",
			results={
				@Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
				@Result(name="error",location="transfercurrentitem.action",type="redirect",params={"id","${id}"})
			}
		)
	public String doTransferCurrentItem() {
		try{			
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			id = mbo.getUniqueIDValue();
			
			MboRemote transferRemote = (MboRemote)this.getSessionObject("TRANSFERCURITEM");
			if (transferRemote != null){
				id = transferRemote.getOwner().getUniqueIDValue();
				((NonPersistentMboSetRemote)transferRemote.getThisMboSet()).execute();
				transferRemote.getOwner().getThisMboSet().save();
				this.setMboSession("TRANSFERCURITEM", null);
				setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
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
	
	@Action(value="viewreceipts", results={
			@Result(name="success",location="invtransactions.jsp"),
			@Result(name="error",location="invtransactions.jsp")
		})
	public String viewReceipts(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			this.viewType = "MATRECTRANS";
			this.populateMboListByRelationship(OWNERMBO, viewType);		
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
	
	@Action(value="viewissues", results={
			@Result(name="success",location="invtransactions.jsp"),
			@Result(name="error",location="invtransactions.jsp")
		})
	public String viewIssues(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			this.viewType = "MATUSETRANS";
			this.populateMboListByRelationship(OWNERMBO, viewType);			
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
	
	@Action(value="viewadjustments", results={
			@Result(name="success",location="invtransactions.jsp"),
			@Result(name="error",location="invtransactions.jsp")
		})
	public String viewAdjustments(){
		try {
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = mbo.getUniqueIDValue();
			this.viewType = "INVTRANS";
			this.populateMboListByRelationship(OWNERMBO, viewType);						
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
	
    @Action(value="createissuecurrentitem", results={
            @Result(name="success",location="issuecurrentitem.action",type="redirect",params={"id","${id}"}),
            @Result(name="error",location="issuecurrentitem.action",type="redirect",params={"id","${id}"})
      })
	public String createIssueCurrentItem(){
		try {
			mbo = (MboRemote) this.getSessionObject(OWNERMBO);
			this.setSessionObject("ISSUECURRENTITEM", null);
			MboSetRemote transferSetRemote = (MboSetRemote) mbo.getMboSet("ISSUECURRENTITEM");
			transferSetRemote.clear();
			mbo = transferSetRemote.addAtEnd();
			this.setSessionObject("ISSUECURRENTITEM", mbo);
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}     
	
	@Action(value="issuecurrentitem", results={
	            @Result(name="success",location="issuecurrentitem.jsp"),
	            @Result(name="error",location="issuecurrentitem.jsp")
	      })
	public String issueCurrentItem(){
		try {
			mbo = (MboRemote) this.getSessionObject(OWNERMBO);

			MboRemote mboRemote = (MboRemote) this.getSessionObject("ISSUECURRENTITEM");
			if (mboRemote != null) {
				mbo = mboRemote;
				this.setMboSession("ISSUECURRENTITEM", mbo);
			}
		} catch (Exception e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="doissuecurrentitem",
	            results={
	                  @Result(name="success",location="view.action",type="redirect",params={"id","${id}"}),
	                  @Result(name="error",location="issuecurrentitem.action",type="redirect",params={"id","${id}"})
	            }
	      )
	public String doIssueCurrentItem() {
		try {
			populateMbo(OWNERMBO, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			id = mbo.getUniqueIDValue();

			MboRemote transferRemote = (MboRemote) this.getSessionObject("ISSUECURRENTITEM");
			if (transferRemote != null) {
				id = transferRemote.getOwner().getUniqueIDValue();
				((NonPersistentMboSetRemote) transferRemote.getThisMboSet()).execute();
				transferRemote.getOwner().getThisMboSet().save();
				this.setMboSession("ISSUECURRENTITEM", null);
				setMessage(new EZMessage(mbo.getMessage("system", "saverecord"), EMMConstants.SUCCESS));
			}
		} catch (RemoteException e) {
			setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			setMessage(new EZMessage(msg, EMMConstants.ERROR));
			return ERROR;
		} catch (Exception e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	/*                 
	 * All cycle count actions 
	 * 
	 */
	
	@Action(value="cyclecountlist",
			results={
				@Result(name="success", location="cyclecountlist.jsp"),
				@Result(name = "single", location = "cyclecountview.action", type = "redirect", params = {"id", "${id}" ,"storeroom","${storeroom}"}),
				@Result(name="error", location="cyclecountlist.jsp")
			}
		)
	public String cyclecountlist() {
		try{
			currentAction = (String) this.getSessionObject("CURRENTACTION");
			this.setSessionObject("STOREROOM", storeroom);
			clearMboSession(OWNERMBO);
			mbo = this.simpleService.getFakeMbo(OWNERMBO);
			MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
			if(storeroom == null){
				storeroom = (String) this.getSessionObject("STOREROOM");
			}
			if(mboSetRemote==null){
				//first instance, no mbolist needed
				this.setMessage(new EZMessage(getText("inventor.cyclecountsearchboxmsg", new String[] { this.storeroom }), EMMConstants.INFO));		
			} else {
				if(mboSetRemote.count()<=0){
					this.setMessage(new EZMessage(getText("global.norecords"), EMMConstants.INFO));
				}
				mboList = this.simpleService.paginateMboSet(mboSetRemote, pagination);
			}
			
			if(currentAction == null){
				if (this.mboList != null && this.mboList.size() == 1) {
					id = mboList.get(0).getUniqueIDValue();
					this.setSessionObject("CURRENTACTION", "cyclecountlist.action");
					return "single";
				}
			}
			this.search="";
			this.setSessionObject(EMMConstants.CURRENTMBOLIST, mboList);
			
			this.setSessionObject("INVBALANCESLIST", null);
			this.setSessionObject("CURRENTACTION", "cyclecountlist.action");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	
	@Action(value="cyclecountdoquicksearch",
			results={
				@Result(name="success", location="cyclecountlist.action", type="redirect", params={"search","${search}","storeroom","${storeroom}"}),
				@Result(name="error", location="cyclecountlist.jsp")
			}
		)
	public String cyclecountdoquickSearch() {
		try{
			storeroom = (String) this.getSessionObject("STOREROOM");
			currentAction = (String) this.getSessionObject("CURRENTACTION");
            MboSetRemote mboSetRemote = getDefaultMboSet();
			this.mboList = simpleService.quickSearch(mboSetRemote, searchFlds, search, pagination);
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSetRemote);
			//reset the current action for cyclecount
			this.setSessionObject("CURRENTACTION", null);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	/**
	 * Cyclecount save function. This function will be called if user is in cyclecount mode and click the save button
	 * after editing some data for inventory or inventory-physicalcount-balance. 
	 * Success message will be shown on the list view and also show the searching result from input query .
	 * @return
	 */
	@Action(value="cyclecountsave",
			results={
				@Result(name="success", location="cyclecountlist.action", type="redirect", params={"storeroom","${storeroom}"}),
				@Result(name="error", location="cyclecountlist.action", type="redirect")
			}
		)
	public String cyclecountsave() {
		try{
			super.save();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="cyclecountadvancedsearch",results={
			@Result(name="success", location="cyclecountadvancedsearch.jsp"),
			@Result(name="error", location="cyclecountadvancedsearch.jsp")
		}
	)
	public String cyclecountadvancedsearch() {
		try{	
			clearMboSession(OWNERMBO);
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			this.storeroom = (String) this.getSessionObject("STOREROOM");
			if(mbo==null){
				mbo =  this.simpleService.getZombieMbo(OWNERMBO);
				setMboAppName(APPNAME);
				// Set default QBE
				mbo.getThisMboSet().setQbe("STATUS", "!=OBSOLETE");
				mbo.getThisMboSet().setQbe("SITEID", "="+this.user.getSiteId());	
				
				if (this.storeroom != null && this.storeroom.length() > 0){
					mbo.getThisMboSet().setQbe("LOCATION", this.storeroom);
				}
			    if (!(mbo.getThisMboSet() instanceof ServiceItemSetRemote)){		    	
			    	mbo.getThisMboSet().setRelationship("exists (select 1 from item where itemnum = inventory.itemnum and itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'ITEM'))");
			    } else if (mbo.getThisMboSet() instanceof ServiceItemSetRemote){
			    	mbo.getThisMboSet().setRelationship("itemnum in (select itemnum from item where itemtype in (select value from synonymdomain where domainid='ITEMTYPE' and maxvalue = 'STDSERVICE'))");
			    }										
			} else{
				//check if the storeroom selection was changed
				String currStoreRoom = mbo.getThisMboSet().getQbe("LOCATION");
				if(!currStoreRoom.equalsIgnoreCase(this.storeroom)){
					this.setSessionObject("STOREROOM", currStoreRoom);
				}
			}
			this.setMboSession(EMMConstants.ADVANCEDSEARCHMBO, mbo);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}

	@Action(value="cyclecountdoadvancedsearch",results={
			@Result(name="success", location="${currentAction}", type="redirect", params={"search","${search}","storeroom","${storeroom}"}),
			@Result(name="error", location="list.jsp")
		}
	)
	public String cyclecountdoadvancedsearch() {
		try{	
			this.storeroom = (String) this.getSessionObject("STOREROOM");
			this.currentAction = (String) this.getSessionObject("CURRENTACTION");
			mbo = (MboRemote)this.getSessionObject(EMMConstants.ADVANCEDSEARCHMBO);
			setMboAppName(APPNAME);
			mboSet = this.user.getSession().getMboSet(OWNERMBO);
			mboSet.setWhere(mbo.getThisMboSet().getCompleteWhere());
			this.setSessionObject(EMMConstants.CURRENTMBOSET, mboSet);	

			//reset the current action for cyclecount
			this.setSessionObject("CURRENTACTION", null);		
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}  
	/**
	 * over ridden clear advanced search
	 */
	@Action(value="cyclecountclearadvancedsearch",results={
			@Result(name="success", location="cyclecountadvancedsearch.action", type="redirect"),
			@Result(name="error", location="cyclecountadvancedsearch.action", type="redirect")
		}
	)
	public String cyclecountclearadvancedsearch() {
		try{	
			this.clearadvancedsearch();		
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}			
		return SUCCESS;
	}	
	
	@Action(value="cyclecountview", results={
			@Result(name="success",location="cyclecountview.jsp"),
			@Result(name="error",location="cyclecountview.jsp")
		})
	public String cyclecountview() {
		try{
			// clear related caches
			this.setMboSession("TRANSFERCURITEM", null);
			this.setSessionObject("INVBALANCESLIST", null);
			
			populateMbo(OWNERMBO, APPNAME);
			MboSetRemote invbSet = null;

			invbSet = this.mbo.getMboSet("INVBALANCES");
			invbSet.setQbe("SITEID", mbo.getString("SITEID"));
			invbSet.setQbe("ITEMSETID", mbo.getString("ITEMSETID"));
			invbSet.setQbe("STAGINGBIN", "0");
			invbSet.setQbe("ITEM.ROTATING", "0");
			invbSet.setQbe("ITEMNUM", mbo.getString("ITEMNUM"));
			invbSet.setOrderBy("LOCATION, BINNUM");
			this.setSessionObject("INVBALANCESMBOSET", invbSet);
			mboList = this.simpleService.paginateMboSet(invbSet, pagination);
				
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}		
		return SUCCESS;
	}	
	@Action(value="cyclecountdeletebalance", results={
			@Result(name="success",location="cyclecountview.action",type="redirect",params={"id","${id}" ,"storeroom","${storeroom}"}),
			@Result(name="error",location="cyclecountview.action",type="redirect",params={"id","${id}","storeroom","${storeroom}"})
		})
	public String cyclecountdeleteBalance(){
		try {
		    this.storeroom = (String) this.getSessionObject("STOREROOM");
		        
			mbo = (MboRemote)this.getSessionObject(OWNERMBO);
			long tmpId = mbo.getUniqueIDValue();
			
			MboRemote mboRemote = this.simpleService.findById(mbo.getMboSet("INVBALANCES"), id);
			id = tmpId;
			mboRemote.delete();
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
	public String getStoreroom() {
		return storeroom;
	}

	public void setStoreroom(String storeroom) {
		this.storeroom = storeroom;
	}
	
	public ArrayList<MboRemote> getMboInvbList() {
		return mboInvbList;
	}

	public void setMboInvbList(ArrayList<MboRemote> mboInvbList) {
		this.mboInvbList = mboInvbList;
	}

	public String getItemnum() {
		return itemnum;
	}

	public void setItemnum(String itemnum) {
		this.itemnum = itemnum;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

}
