/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.action;

import java.io.ByteArrayInputStream;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.MaximoHelper;
import com.interprosoft.ezmaxmobile.db.SelectQuery;
import com.interprosoft.ezmaxmobile.offline.OfflineConstants;

@Component
@Scope("prototype")
@Namespace("/offline")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public class OfflineDeltaSqlDataProviderAction extends BaseOfflineInitAction {
	
	private static final long serialVersionUID = 1L;
	
	private static Log log = LogFactory.getLog(OfflineDeltaSqlDataProviderAction.class);
	
	/** 	############################################################ 	//
	 * 		Use SQL Query to get Data from MAXIMO to populate Offline Tables
	 * 		Delta Actions are listed starting here
	 * 		############################################################		//
	 */
	
	private String getWOCompleteWhere(String appName){
		String sql = " (SELECT DISTINCT * FROM ("
				+ this.getSqlWOByLead() 
				+ " UNION "
				+ this.getSqlWOByAssignmentManager() 
				+ " UNION "
				+ this.getSqlWOByWFAssignment(appName)
				+ ") W )";
		return sql;
	}	
	
	/**
	 * This method gets the SQL for returning a list of workorder IDs we want to include.
	 * The IDs list the work orders that are assigned to this logged in user by work order field (i.e.: LEAD field)
	 * @return
	 */
	private String getSqlWOByLead() {
		return new SelectQuery()
			.distinct()
			.column("WORKORDERID")
			.from("WORKORDER")
			.where("WOCLASS = 'WORKORDER' AND ISTASK = 0 AND HISTORYFLAG = 0 AND STATUS NOT IN ('CLOSE','COMP','CAN')")
			.and(OfflineConstants.WO_LEAD_FIELD_NAME + " = '" + this.user.getPersonId() + "'")
			.toString()
		;
	}

	/**
	 * This method gets the SQL for returning a list of workorder IDs we want to include.
	 * The IDs list the work orders that are assigned to this logged in user within assignment manager
	 * @return
	 */
	private String getSqlWOByAssignmentManager() {
		String laborSubSelect = new SelectQuery()
			.column("LABORCODE")
			.from("LABOR")
			.where("PERSONID = '" + this.user.getPersonId() + "'")
			.toString();
		
		return new SelectQuery()
			.distinct()
			.column("WORKORDERID")
			.from("WMASSIGNMENT")
			.where("WOCLASS = 'WORKORDER' AND ISTASK = 0 AND HISTORYFLAG = 0 AND STATUS NOT IN ('CLOSE','COMP','CAN')")
			.and("LABORCODE IN (" + laborSubSelect + ")")
			.toString()
		;
	}
	
	/**
	 * This method gets the SQL for returning a list of workorder IDs we want to include.
	 * The IDs list the work orders that are in the logged in user's workflow inbox
	 * @return
	 */
	private String getSqlWOByWFAssignment(String appName) {
		return new SelectQuery()
			.distinct()
			.column("WFA.OWNERID")
			.from("WFASSIGNMENT WFA")
			.innerJoin("WORKORDER WO1", "WO1.WORKORDERID = WFA.OWNERID")
			.where("WO1.WOCLASS = 'WORKORDER' AND WO1.ISTASK = 0 AND WO1.HISTORYFLAG = 0 AND WO1.STATUS NOT IN ('CAN')")
			.and("WFA.ASSIGNSTATUS = 'ACTIVE'")
			.and("WFA.OWNERTABLE = 'WORKORDER'")
			.and("WFA.ASSIGNCODE = '" + this.user.getPersonId() + "'")
			.and("WFA.APP = '" + appName + "'")
			.toString()
		;		
	}
	
	private String getSRCompleteWhere(String appName){
		String sql = " (SELECT DISTINCT * FROM ("
				+ this.getSqlSRByLead()  
				+ " UNION "
				+ this.getSqlSRByWFAssignment(appName)
				+ ") S )";
		return sql;
	}	
	
	/**
	 * This method gets the SQL for returning a list of SR IDs we want to include.
	 * The IDs list the SRs that are assigned to this logged in user by SR field
	 * @return
	 */
	private String getSqlSRByLead() {
		String personGroupSubSelect = new SelectQuery()
			.column("PERSONGROUP")
			.from("PERSONGROUPTEAM")
			.where("RESPPARTYGROUP = '" + this.user.getPersonId() + "'")
			.toString();		
		
		return new SelectQuery()
			.distinct()
			.column("TICKETUID")
			.from("TICKET")
			.where("CLASS = 'SR' AND HISTORYFLAG = 0 AND STATUS NOT IN ('CAN','CLOSED','RESOLVED')")
			.and("(OWNERGROUP IN (" + personGroupSubSelect + ") OR OWNER = '" + this.user.getPersonId() + "')")
			.toString()
		;			
	}

	/**
	 * This method gets the SQL for returning a list of SR IDs we want to include.
	 * The IDs list the SRs that are in the logged in user's workflow inbox
	 * @return
	 */
	private String getSqlSRByWFAssignment(String appName) {
		return new SelectQuery()
			.distinct()
			.column("WFA.OWNERID")
			.from("WFASSIGNMENT WFA")
			.innerJoin("TICKET SR1", "SR1.TICKETUID = WFA.OWNERID")
			.where("SR1.CLASS = 'SR' AND SR1.HISTORYFLAG = 0")
			.and("WFA.ASSIGNSTATUS = 'ACTIVE'")
			.and("WFA.OWNERTABLE = 'SR'")
			.and("WFA.ASSIGNCODE = '" + this.user.getPersonId() + "'")
			.and("WFA.APP = '" + appName + "'")
			.toString()
		;
	}
	
	/** 	################################################################### 	//
	 * 		Use SQL Query to get Data from MAXIMO to populate Offline Tables
	 * 		Differentiate between Init and Delta Sql population actions
	 * 		Delta Actions are listed starting here
	 * 		###################################################################		//
	 */
	@Action(value="getDeltaMySRListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMySRListJson() {
		JSONObject jsonObj = new JSONObject();
		try {			
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			
        	SelectQuery sqlToReplace = new SelectQuery()
	    		.distinct()
				.column("SR.TICKETID", "SR.TICKETUID", "SR.DESCRIPTION", "SR.LOCATION")
				.column("SR.REPORTEDBY", "SR.REPORTEDPHONE", "SR.REPORTEDEMAIL")
				.column("SR.STATUS", "SR.REPORTEDPRIORITY", "SR.FAILURECODE", "SR.PROBLEMCODE")
				.column("SR.SITEID", "SR.ORGID", "SR.OWNER", "SR.OWNERGROUP", "SR.STATUSDATE", "SR.REPORTDATE", "SR.ASSETSITEID", "SR.GLACCOUNT", "SR.ASSETNUM", "SR.AFFECTEDPERSON")
	    		.columnAsString("LD.LDTEXT AS LONGDESCRIPTION")
	    		.from("TICKET SR")
	    		.leftJoin("LONGDESCRIPTION LD", "SR.TICKETUID = LD.LDKEY AND LD.LDOWNERTABLE='TICKET' AND LD.LDOWNERCOL='DESCRIPTION'")
	    		.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
	    		.and("SR.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
	    		.orderBy("SR.TICKETID");			
        	
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //

        	SelectQuery sqlToDelete = new SelectQuery()
	    		.distinct()
	    		.column("SR.TICKETID", "SR.TICKETUID")
	    		.from("TICKET SR")
	    		.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
	    		.and("SR.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("SR.TICKETUID NOT IN " + this.getSRCompleteWhere("SR"))
	    		.orderBy("SR.TICKETID");
        	
			jsonObj = getDeltaSqlResultJson("SR", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}    
    
	@Action(value="getDeltaMyWorkOrderListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyWorkOrderListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //

			SelectQuery sqlToReplace = new SelectQuery()
				.distinct()
				.column("W.WONUM", "W.WORKORDERID", "W.PARENT", "W.DESCRIPTION")
				.column("W.STATUS", "W.LOCATION", "W.ASSETNUM", "W.PERSONGROUP")
				.column("W.CREWID", "W.SUPERVISOR", "W.LEAD", "W.PHONE")
				.column("W.REPORTEDBY", "W.WOPRIORITY", "W.REPORTDATE", "W.SCHEDSTART")
				.column("W.SCHEDFINISH", "W.STATUSDATE", "W.ESTDUR", "W.WORKTYPE")
				.column("W.FAILURECODE", "W.PROBLEMCODE", "W.ISTASK", "W.ORIGRECORDID", "W.ORIGRECORDCLASS")
				.column("W.SITEID", "W.ORGID")
				.column("W.TARGSTARTDATE", "W.TARGCOMPDATE", "W.ACTSTART", "W.ACTFINISH", "W.OWNER", "W.OWNERGROUP", "W.GLACCOUNT")
				.column("W.WOCLASS", "W.HISTORYFLAG")
				// IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
				.columnAsString("LD.LDTEXT AS LONGDESCRIPTION")
				.from("WORKORDER W")
				.leftJoin("LONGDESCRIPTION LD", "W.WORKORDERID = LD.LDKEY AND LD.LDOWNERTABLE='WORKORDER' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN " + woStatusFilter)
				.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID");                                 

			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //

			SelectQuery sqlToDelete = new SelectQuery()
				.distinct()
				.column("W.WONUM", "W.WORKORDERID", "W.SITEID")
				.from("WORKORDER W")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
				.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
				.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID");                  

			jsonObj = getDeltaSqlResultJson("WORKORDER", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}

		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}

	@Action(value="getDeltaMyTaskWorkOrderListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyTaskWorkOrderListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			SelectQuery sqlToReplace = new SelectQuery()
				.distinct()
				.column("W.WONUM AS PARENT", "W.WORKORDERID AS PARENTID")
				.column("WOTASK.WONUM", "WOTASK.WORKORDERID")
				.column("WOTASK.DESCRIPTION, WOTASK.LOCATION, WOTASK.ASSETNUM, WOTASK.STATUSDATE, WOTASK.ESTDUR")
				.column("WOTASK.OBSERVATION, WOTASK.MEASUREMENTVALUE, WOTASK.PERSONGROUP, WOTASK.CREWID, WOTASK.SUPERVISOR, WOTASK.LEAD")
				.column("WOTASK.STATUS, WOTASK.WOPRIORITY, WOTASK.WORKTYPE, WOTASK.FAILURECODE, WOTASK.PROBLEMCODE")
				.column("WOTASK.ISTASK, WOTASK.ORIGRECORDID, WOTASK.TASKID, WOTASK.SITEID, WOTASK.ORGID", "W.ORIGRECORDCLASS")
				.column("WOTASK.WOCLASS", "WOTASK.HISTORYFLAG")
				// IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
				.columnAsString("LD.LDTEXT AS LONGDESCRIPTION")
				.from("WORKORDER W")
				.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID")
				.leftJoin("LONGDESCRIPTION LD", "WOTASK.WORKORDERID = LD.LDKEY AND LD.LDOWNERTABLE='WORKORDER' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0 AND WOTASK.ISTASK = 1")
				.and("W.STATUS NOT IN " + woStatusFilter)
				.and("(W.CHANGEDATE  > " + getUserLastSyncDateTime() + " OR WOTASK.CHANGEDATE  > " + getUserLastSyncDateTime() + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "WOTASK.WORKORDERID");                                         

			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //

			SelectQuery sqlToDelete = new SelectQuery()
				.distinct()
				.column("W.WONUM AS PARENT", "W.WORKORDERID AS PARENTID")
				.column("WOTASK.WONUM", "WOTASK.WORKORDERID")
				.column("WOTASK.SITEID")
				.from("WORKORDER W")
				.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND WOTASK.ISTASK = 1")
				.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
				.and("W.CHANGEDATE  > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "WOTASK.WORKORDERID");        

			jsonObj = getDeltaSqlResultJson("WORKORDER", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}

		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}
	
	@Action(value="getDeltaMySRWorkLogListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMySRWorkLogListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			
        	SelectQuery sqlToReplace = new SelectQuery()
	    		.distinct()
				.column("SR.TICKETID", "SR.TICKETUID")
				.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.DESCRIPTION", "WL.CLASS", "WL.CREATEBY", "WL.LOGTYPE", "WL.CREATEDATE")
				.column("WL.SITEID", "WL.ORGID")
				// IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
				.columnAsString("LD.LDTEXT AS LONGDESCRIPTION")
	    		.from("TICKET SR")
	    		.innerJoin("WORKLOG WL", "SR.TICKETID = WL.RECORDKEY AND SR.CLASS = WL.CLASS")
	    		.leftJoin("LONGDESCRIPTION LD", "WL.WORKLOGID = LD.LDKEY AND LD.LDOWNERTABLE='WORKLOG' AND LD.LDOWNERCOL='DESCRIPTION'")
	    		.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
	    		.and("WL.CREATEDATE > " + getUserLastSyncDateTime())
	    		.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
	    		.orderBy("SR.TICKETUID", "WL.WORKLOGID");				
        	
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //
        	
        	SelectQuery sqlToDelete = new SelectQuery()
	    		.distinct()
				.column("SR.TICKETID", "SR.TICKETUID")
				.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.SITEID")
	    		.from("TICKET SR")
	    		.innerJoin("WORKLOG WL", "SR.TICKETID = WL.RECORDKEY AND SR.CLASS = WL.CLASS")
	    		.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
	    		.and("SR.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("SR.TICKETUID NOT IN " + this.getSRCompleteWhere("SR"))
	    		.orderBy("SR.TICKETUID", "WL.WORKLOGID");        	
        	
			jsonObj = getDeltaSqlResultJson("WORKLOG", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}	
	
	
	@Action(value="getDeltaMyWorkLogListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyWorkLogListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //

        	SelectQuery sqlToReplace = new SelectQuery()
	    		.distinct()
				.column("W.WONUM, W.WORKORDERID")
				.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.DESCRIPTION", "WL.CLASS", "WL.CREATEBY", "WL.LOGTYPE", "WL.CREATEDATE")
				.column("WL.SITEID", "WL.ORGID")
				// IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
				.columnAsString("LD.LDTEXT AS LONGDESCRIPTION")
	    		.from("WORKORDER W")
	    		.innerJoin("WORKLOG WL", "W.WONUM = WL.RECORDKEY AND W.WOCLASS = WL.CLASS AND W.SITEID = WL.SITEID")
	    		.leftJoin("LONGDESCRIPTION LD", "WL.WORKLOGID = LD.LDKEY AND LD.LDOWNERTABLE='WORKLOG' AND LD.LDOWNERCOL='DESCRIPTION'")
	    		.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
	    		.and("W.STATUS NOT IN " + woStatusFilter)
	    		.and("WL.CREATEDATE > " + getUserLastSyncDateTime())
	    		.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
	    		.orderBy("W.WORKORDERID", "WL.WORKLOGID");	
			
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //
        	
        	SelectQuery sqlToDelete = new SelectQuery()
	    		.distinct()
				.column("W.WONUM, W.WORKORDERID")
				.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.SITEID")
	    		.from("WORKORDER W")
	    		.innerJoin("WORKLOG WL", "W.WONUM = WL.RECORDKEY AND W.WOCLASS = WL.CLASS AND W.SITEID = WL.SITEID")
	    		.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
	    		.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
	    		.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
	    		.orderBy("W.WORKORDERID", "WL.WORKLOGID");        	
        	
			jsonObj = getDeltaSqlResultJson("WORKLOG", sqlToReplace, sqlToDelete, pagination);
			
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}
	
	@Action(value="getDeltaMySRLabTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMySRLabTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			
        	SelectQuery sqlToReplace = new SelectQuery()
	    		.distinct()
				.column("LT.LABTRANSID", "LT.TICKETID", "SR.TICKETUID", "LT.LABORCODE", "LT.CRAFT", "LT.PREMIUMPAYCODE")
				.column("LT.REGULARHRS", "LT.PREMIUMPAYHOURS", "LT.STARTDATE", "LT.FINISHDATE", "LT.STARTTIME", "LT.FINISHTIME", "LT.TIMERSTATUS")
				.column("LT.TRANSTYPE", "LT.ORGID", "LT.SITEID")
	    		.from("TICKET SR")
	    		.innerJoin("LABTRANS LT", "SR.TICKETID = LT.TICKETID")
	    		.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
	    		.and("LT.ENTERDATE > " + getUserLastSyncDateTime())
	    		.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
	    		.orderBy("SR.TICKETUID", "LT.LABTRANSID");			
        	
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //
        	
        	SelectQuery sqlToDelete = new SelectQuery()
	    		.distinct()
				.column("LT.LABTRANSID", "SR.TICKETID", "SR.TICKETUID")
	    		.from("TICKET SR")
	    		.innerJoin("LABTRANS LT", "SR.TICKETID = LT.TICKETID")
	    		.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
	    		.and("SR.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("SR.TICKETUID NOT IN " + this.getSRCompleteWhere("SR"))
	    		.orderBy("SR.TICKETUID", "LT.LABTRANSID");	        	
        	
			jsonObj = getDeltaSqlResultJson("LABTRANS", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}
	
	@Action(value="getDeltaMyLabTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyLabTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			
        	SelectQuery sqlToReplace = new SelectQuery()
	        	.distinct()
				.column("W.WORKORDERID")
				.column("LT.LABTRANSID", "LT.REFWO AS WONUM")
				.column("LT.LABORCODE", "LT.CRAFT", "LT.PREMIUMPAYCODE")
				.column("LT.REGULARHRS", "LT.PREMIUMPAYHOURS", "LT.STARTDATE", "LT.FINISHDATE", "LT.STARTTIME", "LT.FINISHTIME", "LT.TIMERSTATUS")
				.column("LT.TRANSTYPE", "LT.ORGID", "LT.SITEID")
				.from("WORKORDER W")
				.innerJoin("LABTRANS LT", "W.WONUM = LT.REFWO AND W.SITEID = LT.SITEID")
				.where("(W.WOCLASS = 'WORKORDER' OR W.WOCLASS = 'ACTIVITY') AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN ('CAN')")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "LT.LABTRANSID");			
        	
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //
        	
        	SelectQuery sqlToDelete = new SelectQuery()
	    		.distinct()
				.column("LT.LABTRANSID", "LT.REFWO AS WONUM", "W.WORKORDERID", "LT.SITEID")
	    		.from("WORKORDER W")
	    		.innerJoin("LABTRANS LT", "W.WONUM = LT.REFWO AND W.SITEID = LT.SITEID")
	    		.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
	    		.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
	    		.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
	    		.orderBy("W.WORKORDERID", "LT.LABTRANSID");	        	
        	
			jsonObj = getDeltaSqlResultJson("LABTRANS", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}

	@Action(value="getDeltaMyTaskLabTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyTaskLabTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			
        	SelectQuery sqlToReplace = new SelectQuery()
	    		.distinct()
				.column("LT.LABTRANSID", "LT.REFWO AS WONUM", "WOTASK.WORKORDERID", "LT.LABORCODE", "LT.CRAFT", "LT.PREMIUMPAYCODE")
				.column("LT.REGULARHRS", "LT.PREMIUMPAYHOURS", "LT.STARTDATE", "LT.FINISHDATE", "LT.STARTTIME", "LT.FINISHTIME", "LT.TIMERSTATUS")
				.column("LT.TRANSTYPE", "LT.ORGID", "LT.SITEID")
	    		.from("WORKORDER W")
	    		.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID")
	    		.innerJoin("LABTRANS LT", "WOTASK.WONUM = LT.REFWO AND WOTASK.SITEID = LT.SITEID")
	    		.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0 AND WOTASK.ISTASK = 1")
	    		.and("W.STATUS NOT IN " + woStatusFilter)
	    		.and("LT.ENTERDATE > " + getUserLastSyncDateTime())
	    		.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
	    		.orderBy("LT.REFWO", "WOTASK.WORKORDERID");			
        	
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //
        	
           	SelectQuery sqlToDelete = new SelectQuery()
	    		.distinct()
				.column("LT.LABTRANSID", "LT.REFWO AS WONUM", "WOTASK.WORKORDERID", "LT.SITEID")
	    		.from("WORKORDER W")
	    		.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID")
	    		.innerJoin("LABTRANS LT", "WOTASK.WONUM = LT.REFWO AND WOTASK.SITEID = LT.SITEID")
	    		.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND WOTASK.ISTASK = 1")
	    		.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
	    		.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
	    		.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
	    		.orderBy("LT.REFWO", "WOTASK.WORKORDERID");
           	
			jsonObj = getDeltaSqlResultJson("LABTRANS", sqlToReplace, sqlToDelete, pagination);
			
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}
	
	@Action(value="getDeltaMyMatUseTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyMatUseTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //

			SelectQuery sqlToReplace = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID")
				.column("MT.MATUSETRANSID", "MT.REFWO AS WONUM")
				.column("MT.DESCRIPTION", "MT.LINETYPE", "MT.ITEMNUM", "MT.QUANTITY", "MT.UNITCOST", "MT.TRANSDATE")
				.column("MT.ISSUETYPE", "MT.ISSUETO", "MT.BINNUM", "MT.LOTNUM", "MT.STORELOC", "MT.CURBAL")
				.from("WORKORDER W")
				.innerJoin("MATUSETRANS MT", "W.WONUM = MT.REFWO AND W.SITEID = MT.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN " + woStatusFilter)
				.and("MT.TRANSDATE > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "MT.MATUSETRANSID");                                        

			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //

			SelectQuery sqlToDelete = new SelectQuery()
				.distinct()
				.column("MT.MATUSETRANSID", "MT.REFWO AS WONUM", "W.WORKORDERID", "MT.SITEID")
				.from("WORKORDER W")
				.innerJoin("MATUSETRANS MT", "W.WONUM = MT.REFWO AND W.SITEID = MT.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
				.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
				.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "MT.MATUSETRANSID");

			jsonObj = getDeltaSqlResultJson("MATUSETRANS", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}

		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}

	@Action(value="getDeltaMyFailureRptListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyFailureRptListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String woStatusFilter = (OfflineConstants.WOSTATUS_SQLWHERE_FILTER == null || OfflineConstants.WOSTATUS_SQLWHERE_FILTER.length() == 0) ? "('CAN')" : OfflineConstants.WOSTATUS_SQLWHERE_FILTER;
			// ############################################################################################################### //
			// REPLACEMENT PART
			// ############################################################################################################### //
			
			SelectQuery sqlToReplace = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID", "W.WONUM", "W.SITEID","W.ORGID", "W.FAILURECODE")
				// PROBLEM CODE
				.column("(" +
						new SelectQuery()
							.top(1)
							.column("FR.FAILURECODE")
							.from("FAILUREREPORT FR")
							.where("FR.TYPE = 'PROBLEM' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
							.toString()
						+ ") PROBLEMCODE"
				)
				// CAUSE CODE
				.column("(" +
						new SelectQuery()
							.top(1)
							.column("FR.FAILURECODE")
							.from("FAILUREREPORT FR")
							.where("FR.TYPE = 'CAUSE' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
							.toString()
						+ ") CAUSECODE"
				)		
				// REMEDY CODE
				.column("(" +
						new SelectQuery()
							.top(1)
							.column("FR.FAILURECODE")
							.from("FAILUREREPORT FR")
							.where("FR.TYPE = 'REMEDY' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
							.toString()
						+ ") REMEDYCODE"
				)		 
				.from("WORKORDER W")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN " + woStatusFilter)
				.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "W.FAILURECODE");			
			
			// ############################################################################################################### //
			// DELETION PART
			// ############################################################################################################### //
			
			SelectQuery sqlToDelete = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID", "W.WORKORDERID", "W.WONUM", "W.SITEID","W.ORGID", "W.FAILURECODE")
				// PROBLEM CODE
				.column("(" +
						new SelectQuery()
							.top(1)
							.column("FR.FAILURECODE")
							.from("FAILUREREPORT FR")
							.where("FR.TYPE = 'PROBLEM' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
							.toString()
						+ ") PROBLEMCODE"
				)
				// CAUSE CODE
				.column("(" +
						new SelectQuery()
							.top(1)
							.column("FR.FAILURECODE")
							.from("FAILUREREPORT FR")
							.where("FR.TYPE = 'CAUSE' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
							.toString()
						+ ") CAUSECODE"
				)		
				// REMEDY CODE
				.column("(" +
						new SelectQuery()
							.top(1)
							.column("FR.FAILURECODE")
							.from("FAILUREREPORT FR")
							.where("FR.TYPE = 'REMEDY' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
							.toString()
						+ ") REMEDYCODE"
				)		 
				.from("WORKORDER W")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
				.and("(W.STATUS IN " + woStatusFilter + " OR W.HISTORYFLAG = 0)")
				.and("W.CHANGEDATE > " + getUserLastSyncDateTime())
				.and("W.WORKORDERID NOT IN " + this.getWOCompleteWhere("WOTRACK"))
				.orderBy("W.WORKORDERID", "W.FAILURECODE");
			
			jsonObj = getDeltaSqlResultJson("FAILUREREPORT", sqlToReplace, sqlToDelete, pagination);
			
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}
	
	@Action(value="getDeltaMyAssetsJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaMyAssetsJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String assetSubSelect = new SelectQuery()
				.column("ASSETUID")
				.from("ASSET")
				.where("STATUS NOT IN ('INACTIVE', 'DECOMMISSIONED') AND CHANGEDATE > " + getUserLastSyncDateTime())
				.and("SITEID IN " + this.user.getSession().getProfile().getSitesString())
				.toString();

			SelectQuery sqlToReplace = new SelectQuery()
				.column("ASSETUID", "ASSETID", "ASSETNUM", "PARENT", "CHILDREN", "LOCATION", "DESCRIPTION", "SERIALNUM", "VENDOR", "MANUFACTURER")
				.column("FAILURECODE", "STATUS", "ISRUNNING", "SITEID", "ORGID")
				.column("ASSETTYPE","GROUPNAME","PURCHASEPRICE","STATUSDATE","INSTALLDATE","TOTDOWNTIME","CLASSSTRUCTUREID")
				.columnAsString("LD.LDTEXT AS LONGDESCRIPTION")
				.from("ASSET")
				.leftJoin("LONGDESCRIPTION LD", "ASSETUID = LD.LDKEY AND LD.LDOWNERTABLE='ASSET' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("ASSETUID IN (" + assetSubSelect + ")")
				.orderBy("ASSETUID");

			SelectQuery sqlToDelete = new SelectQuery()
				.column("ASSETUID", "ASSETID", "ASSETNUM", "PARENT", "CHILDREN", "LOCATION", "DESCRIPTION", "SERIALNUM", "VENDOR", "MANUFACTURER")
				.column("FAILURECODE", "STATUS", "ISRUNNING", "SITEID", "ORGID")
				.column("ASSETTYPE","GROUPNAME","PURCHASEPRICE","STATUSDATE","INSTALLDATE","TOTDOWNTIME","CLASSSTRUCTUREID")
				.from("ASSET")
				.where("STATUS IN ('INACTIVE', 'DECOMMISSIONED') AND CHANGEDATE > " + getUserLastSyncDateTime())
				.and("SITEID NOT IN " + this.user.getSession().getProfile().getSitesString())
				.orderBy("ASSETUID");

			jsonObj = getDeltaSqlResultJson("ASSET", sqlToReplace, sqlToDelete, pagination);

			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}

		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}

	@Action(value="getDeltaInventoryListJson",
            results={
                  @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
      )
      public String getDeltaInventoryListJson() {
	      JSONObject jsonObj = new JSONObject();
	      try {
	        	SelectQuery sqlToReplace = new SelectQuery()
		    		.distinct()
					.column("INV.INVENTORYID", "INV.ITEMNUM", "INV.ITEMSETID", "INV.LOCATION", "ITEM.DESCRIPTION", "INV.CATEGORY", "INV.MANUFACTURER")
					.column("INV.MODELNUM", "INV.SITEID", "INV.STATUS", "INV.STATUSDATE")
					.column("INV.BINNUM", "INV.ISSUEUNIT", "INV.ISSUEYTD", "INV.ISSUE1YRAGO", "INV.LASTISSUEDATE")
		    		.from("INVENTORY INV")
		    		.innerJoin("ITEM", "INV.ITEMNUM = ITEM.ITEMNUM AND INV.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
		    		.where("INV.STATUS != 'OBSOLETE'")
		    		.and("(INV.STATUSDATE > " + getUserLastSyncDateTime() + " OR INV.LASTISSUEDATE > " + getUserLastSyncDateTime() + ")")
		    		.orderBy("INV.SITEID", "INV.ITEMNUM");
	        	
	        	SelectQuery sqlToDelete = new SelectQuery()
		    		.distinct()
					.column("INV.INVENTORYID", "INV.ITEMNUM", "INV.ITEMSETID", "INV.LOCATION", "ITEM.DESCRIPTION", "INV.CATEGORY", "INV.MANUFACTURER")
					.column("INV.MODELNUM", "INV.SITEID", "INV.STATUS", "INV.STATUSDATE")
					.column("INV.BINNUM", "INV.ISSUEUNIT", "INV.ISSUEYTD", "INV.ISSUE1YRAGO", "INV.LASTISSUEDATE")
		    		.from("INVENTORY INV")
		    		.innerJoin("ITEM", "INV.ITEMNUM = ITEM.ITEMNUM AND INV.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
		    		.where("INV.STATUS = 'OBSOLETE'")
		    		.and("(INV.STATUSDATE > " + getUserLastSyncDateTime() + " OR INV.LASTISSUEDATE > " + getUserLastSyncDateTime() + ")")
		    		.orderBy("INV.SITEID", "INV.ITEMNUM");
	        	
	    		jsonObj = getDeltaSqlResultJson("INVENTORY", sqlToReplace, sqlToDelete, pagination);
	            
	            // Insert PAGINATION
	            jsonObj.element("PAGINATION", pagination);
	      } catch(Exception ex) {
	            jsonObj.element("errMsg", ex.getMessage());
	      }
	      
	      jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
	      if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
	            log.debug("json: " + jsonObj.toString());
	      }
	      return SUCCESS; 
	}	
	
	@Action(value="getDeltaInvBalancesJson",
            results={
                  @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
      )
      public String getDeltaInvBalancesJson() {
	      JSONObject jsonObj = new JSONObject();
	      try {
	    	  	String invtransSubSelect = new SelectQuery()
	    	  		.distinct()
	    	  		.column("INVT.ITEMNUM")
	    	  		.from("INVTRANS INVT")
	    	  		.where("INVB.ITEMSETID = INVT.ITEMSETID AND INVB.SITEID = INVT.SITEID AND INVB.LOCATION = INVT.STORELOC")
	    	  		.and("INVT.TRANSDATE > " + getUserLastSyncDateTime())
	    	  		.toString();
	
	    	  	String inventorySubSelect = new SelectQuery()
	    	  		.column("INV.ITEMNUM")
	    	  		.from("INVENTORY INV")
	    	  		.where("INVB.ITEMSETID = INV.ITEMSETID AND INVB.SITEID = INV.SITEID AND INV.STATUS IN ('ACTIVE', 'PENDOBS')")
	    	  		.and("(INV.STATUSDATE > " + getUserLastSyncDateTime() + " OR INV.LASTISSUEDATE > " + getUserLastSyncDateTime() + ")")
	    	  		.toString();
    	  	
	        	SelectQuery sqlToReplace = new SelectQuery()
					.column("INVB.INVBALANCESID", "ITEM.ITEMNUM", "ITEM.ITEMSETID", "ITEM.DESCRIPTION", "ITEM.LOTTYPE", "ITEM.ITEMTYPE", "ITEM.STATUS")
					.column("INVB.LOCATION", "INVB.BINNUM", "INVB.LOTNUM", "INVB.CURBAL", "INVB.PHYSCNT", "INVB.PHYSCNTDATE")
					.column("INVB.RECONCILED", "INVB.ORGID", "INVB.SITEID")
		    		.from("INVBALANCES INVB")
		    		.innerJoin("ITEM", "INVB.ITEMNUM = ITEM.ITEMNUM AND INVB.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
		    		.where("ITEM.STATUS != 'OBSOLETE'")
		    		.and("INVB.PHYSCNTDATE > " + getUserLastSyncDateTime())
		    		.and("ITEM.ITEMNUM IN ("
		    				+ invtransSubSelect
		    				+ " UNION " 
		    				+ inventorySubSelect
		    				+ ")"
		    		)
		    		.orderBy("ITEM.ITEMNUM");
	        	
	    	  	String inventoryNotInSubSelect = new SelectQuery()
	    	  		.column("INV.ITEMNUM")
	    	  		.from("INVENTORY INV")
	    	  		.where("INVB.ITEMSETID = INV.ITEMSETID AND INVB.SITEID = INV.SITEID AND INV.STATUS NOT IN ('ACTIVE', 'PENDOBS')")
	    	  		.and("(INV.STATUSDATE > " + getUserLastSyncDateTime() + " OR INV.LASTISSUEDATE > " + getUserLastSyncDateTime() + ")")
	    	  		.toString();		        	
		        	
	        	SelectQuery sqlToDelete = new SelectQuery()
		    		.distinct()
					.column("INVB.INVBALANCESID")
		    		.from("INVBALANCES INVB")
		    		.innerJoin("ITEM", "INVB.ITEMNUM = ITEM.ITEMNUM AND INVB.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
		    		.where("(ITEM.STATUS = 'OBSOLETE' AND ITEM.STATUSDATE > " + getUserLastSyncDateTime() + ")")
		    		.or("ITEM.ITEMNUM IN (" + inventoryNotInSubSelect + ")");	        	
	        	
	            jsonObj = getDeltaSqlResultJson("INVBALANCES", sqlToReplace, sqlToDelete, pagination);
	            
	            // Insert PAGINATION
	            jsonObj.element("PAGINATION", pagination);
	      } catch(Exception ex) {
	            jsonObj.element("errMsg", ex.getMessage());
	      }
	      
	      jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
	      if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
	            log.debug("json: " + jsonObj.toString());
	      }
	      return SUCCESS; 
	}
	
	@Action(value="getDeltaCompaniesJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getDeltaCompaniesJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sqlToReplace = new SelectQuery()
				.column("COMPANIESID", "COMPANY", "TYPE", "NAME", "DISABLED", "ORGID")
				.from("COMPANIES")
				.where("CHANGEDATE > " + getUserLastSyncDateTime())
				.and("ORGID = '" + this.user.getOrgId() + "'")
				.orderBy("COMPANIESID");
			
			jsonObj = getDeltaSqlResultJson("COMPANIES", sqlToReplace, pagination);
			
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		if (log.isDebugEnabled() && !MaximoHelper.getInstance().isSqliteEnabled()) {
			log.debug("json: " + jsonObj.toString());
		}
		return SUCCESS; 
	}
	
}
