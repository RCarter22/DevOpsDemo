/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.action;

import java.io.ByteArrayInputStream;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.MaximoHelper;
import com.interprosoft.ezmaxmobile.common.pagination.Pagination;
import com.interprosoft.ezmaxmobile.db.SelectQuery;
import com.interprosoft.ezmaxmobile.offline.OfflineConstants;

@Component
@Scope("prototype")
@Namespace("/offline")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public class OfflineInitSqlDataProviderAction extends BaseOfflineInitAction {
	
	private static final long serialVersionUID = 1L;
	
	private static Logger log = Logger.getLogger(OfflineInitSqlDataProviderAction.class);
	
	/** 	############################################################ 	//
	 * 		Use SQL Query to get Data from MAXIMO to populate Offline Tables
	 * 		Init Actions are listed starting here
	 * 		############################################################		//
	 */
	
	private String getWOCompleteWhere(String appName){
		String sql = " (SELECT DISTINCT * FROM ("
				+ this.getSqlWOByLead() 
				//+ " UNION "
				//+ this.getSqlWOByAssignmentManager() 
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
			.where("WOCLASS = 'WORKORDER' AND ISTASK = 0 AND HISTORYFLAG = 0 AND STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
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
			.where("WOCLASS = 'WORKORDER' AND ISTASK = 0 AND HISTORYFLAG = 0 AND STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
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
			.where("WO1.WOCLASS = 'WORKORDER' AND WO1.ISTASK = 0 AND WO1.HISTORYFLAG = 0 AND WO1.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
			.and("WFA.ASSIGNSTATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WFASGNSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ")")
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
			.where("CLASS = 'SR' AND HISTORYFLAG = 0 AND STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'SRSTATUS'").and("MAXVALUE IN ('CAN','CLOSED','RESOLVED')") + ")")			
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
			.and("WFA.ASSIGNSTATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WFASGNSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ")")
			.and("WFA.OWNERTABLE = 'SR'")
			.and("WFA.ASSIGNCODE = '" + this.user.getPersonId() + "'")
			.and("WFA.APP = '" + appName + "'")
			.toString()
		;
	}
	
	@Action(value="getPersonJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getPersonJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String laborSubSelect = new SelectQuery()
				.column("PERSONID")
				.from("LABOR")
				.where("STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LABORSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ") AND ORGID = '" + this.user.getOrgId() + "'")
				.toString();
				
			SelectQuery sql = new SelectQuery()
				.column("PERSONID", "DISPLAYNAME", "FIRSTNAME", "LASTNAME", "SUPERVISOR", "STATUS")
				.from("PERSON")
				.where("STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'PERSONSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ")")
				.and("PERSONID IN (" + laborSubSelect + ")")
				.orderBy("DISPLAYNAME", "PERSONID");	
			
			jsonObj = getSqlResultJson("PERSON", sql, pagination);

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
	
	@Action(value="getCraftRateJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getCraftRateJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("CRAFTRATEID", "CRAFT", "SKILLLEVEL", "VENDOR", "STANDARDRATE", "ORGID")
				.from("CRAFTRATE")
				.where("ORGID = '" + this.user.getOrgId() + "' AND CONTRACTNUM IS NULL");	

			jsonObj = getSqlResultJson("CRAFTRATE", sql, pagination);
				
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
	
	@Action(value="getPPCraftRateJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getPPCraftRateJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("PPCRAFTRATEID", "CRAFT", "PREMIUMPAYCODE", "ORGID")
				.from("PPCRAFTRATE")
				.where("ORGID = '" + this.user.getOrgId() + "'");
				
			jsonObj = getSqlResultJson("PPCRAFTRATE", sql, pagination);
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
	
	@Action(value="getLaborCraftRateJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLaborCraftRateJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("LCR.LABORCRAFTRATEID", "LCR.LABORCODE", "LCR.CRAFT", "CR.DESCRIPTION AS CRAFTDESC", "LCR.DEFAULTCRAFT")
				.column("LCR.RATE", "LCR.SKILLLEVEL", "CS.DESCRIPTION AS SKILLLEVELDESC", "LCR.GLACCOUNT", "LCR.ORGID")
				.from("LABORCRAFTRATE LCR")
				.leftJoin("CRAFT CR", "LCR.CRAFT = CR.CRAFT AND LCR.ORGID = CR.ORGID")
				.leftJoin("CRAFTSKILL CS", "LCR.CRAFT = CS.CRAFT AND LCR.SKILLLEVEL = CS.SKILLLEVEL AND LCR.ORGID = CS.ORGID")			
				.where("LCR.ORGID = '" + this.user.getOrgId() + "'");
			
			jsonObj = getSqlResultJson("LABORCRAFTRATE", sql, pagination);
				
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
	
	@Action(value="getLaborJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLaborJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("L.LABORID", "L.LABORCODE", "L.STATUS", "L.PERSONID", "L.CREWID", "L.WORKLOCATION", "L.WORKSITE", "L.ORGID")
				.column("P.DISPLAYNAME")
				.from("LABOR L")
				.innerJoin("PERSON P", "L.PERSONID = P.PERSONID")
				.where("L.STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LABORSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ") AND  L.ORGID= '" + this.user.getOrgId() + "'")
				.orderBy("L.LABORCODE")
			;	
			
			jsonObj = getSqlResultJson("LABOR", sql, pagination);

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
	
	@Action(value="getMyToolTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyToolTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
			.distinct()
			.column("W.WORKORDERID")
			.column("TT.TOOLTRANSID", "TT.REFWO AS WONUM")
			.column("TT.ITEMNUM", "TT.TOOLRATE", "TT.LINECOST", "TT.ITEMSETID")
			.column("TT.TOOLQTY", "TT.TOOLHRS", "TT.TRANSDATE", "TT.ENTERDATE","TT.ENTERBY")
			.column("TT.LINECOST", "TT.LOCATION", "TT.ASSETNUM")
			.column("TT.SITEID", "TT.ORGID") 
			//.column("T.DESCRIPTION")
			.from("WORKORDER W")
			.innerJoin("TOOLTRANS TT", "W.WONUM = TT.REFWO AND W.SITEID = TT.SITEID")
			//.innerJoin("TOOLITEM T", "TT.ITEMNUM = T.ITEMNUM")
			.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
			.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
			.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
			.orderBy("W.WORKORDERID", "TT.TOOLTRANSID");	
			
			jsonObj = getSqlResultJson("TOOLTRANS", sql, pagination);

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
	
	
	@Action(value="getMySRListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMySRListJson() {
		JSONObject jsonObj = new JSONObject();
		try {	
			SelectQuery sql = new SelectQuery()
				.column("SR.TICKETID", "SR.TICKETUID", "SR.DESCRIPTION", "SR.LOCATION", "SR.CLASS")
				.column("SR.REPORTEDBY", "SR.REPORTEDPHONE", "SR.REPORTEDEMAIL")
				.column("SR.STATUS", "SR.REPORTEDPRIORITY", "SR.FAILURECODE", "SR.PROBLEMCODE")
				.column("SR.SITEID", "SR.ORGID", "SR.OWNER", "SR.OWNERGROUP", "SR.STATUSDATE", "SR.REPORTDATE", "SR.ASSETORGID", "SR.ASSETSITEID", "SR.GLACCOUNT", "SR.ASSETNUM", "SR.AFFECTEDPERSON", "SR.CHANGEDATE")
				.column("SR.CLASSSTRUCTUREID")
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION") 
				.from("TICKET SR")
				.leftJoin("LONGDESCRIPTION LD", "SR.TICKETUID = LD.LDKEY AND LD.LDOWNERTABLE='TICKET' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("SR.CLASS = 'SR'")
				.and("SR.HISTORYFLAG = 0")
				.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
				.orderBy("SR.TICKETID");			

			// If mapping is enabled, get the XY coordinates
			// if (this.isEmmMapEnabled()) {
			// 	sql
			// 		.column("TKSERVICEADDRESS.LATITUDEY", "TKSERVICEADDRESS.LONGITUDEX")
			// 		.leftJoin("TKSERVICEADDRESS", "SR.TICKETID = TKSERVICEADDRESS.TICKETID AND SR.CLASS = TKSERVICEADDRESS.CLASS");
			// }

			jsonObj = getSqlResultJson("SR", sql, pagination);

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
	
	@Action(value="getMyWorkOrderListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyWorkOrderListJson() {
		JSONObject jsonObj = new JSONObject();
		try {		
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WONUM", "W.WORKORDERID", "W.CLASSSTRUCTUREID", "W.PARENT", "W.DESCRIPTION")
				.column("W.STATUS", "W.LOCATION", "W.ASSETNUM", "W.PERSONGROUP")
				.column("W.AMCREW", "W.SUPERVISOR", "W.LEAD", "W.PHONE")
				.column("W.REPORTEDBY", "W.WOPRIORITY", "W.REPORTDATE", "W.SCHEDSTART")
				.column("W.SCHEDFINISH", "W.STATUSDATE", "W.ESTDUR", "W.WORKTYPE")
				.column("W.FAILURECODE", "W.PROBLEMCODE", "W.ISTASK", "W.ORIGRECORDID", "W.ORIGRECORDCLASS")
				.column("W.SITEID", "W.ORGID")
				.column("W.WOCLASS", "W.HISTORYFLAG")
				.column("W.TARGSTARTDATE", "W.TARGCOMPDATE", "W.ACTSTART", "W.ACTFINISH", "W.OWNER", "W.OWNERGROUP", "W.GLACCOUNT", "W.CHANGEDATE")
				.column("NULL as NEWSITE","NULL as NEWLOCATION", "NULL AS SCHEDSTARTTO", "NULL AS SCHEDSTARTFROM")
				.column("W.PLUSPCUSTOMER")
				.column("W.PLUSTREASON", "W.PLUSTCOMP", "W.PLUSTACCOMP")
				//.column("I.AEPPARTNUMBER")
				.column("PA.ALIAS")	
				.column("W.REPAIRFACILITY")
				.column("W.AEPUSINGDEPARTMENT")
				.column("CASE WHEN WM.METERNAME IS NOT NULL THEN '1' ELSE '0' END AS PLUSTPRIENTERED")
				//IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION")	
				.column("W.INSPFORMNUM", "NULL AS INSPECTIONRESULTID")
				.from("WORKORDER W")
				//.innerJoin("INVOICELINE I", "I.PONUM = ST.PONUM and I.POLINENUM = ST.POLINENUM")
				.leftJoin("LONGDESCRIPTION LD", "W.WORKORDERID = LD.LDKEY AND LD.LDOWNERTABLE='WORKORDER' AND LD.LDOWNERCOL='DESCRIPTION'")
				.leftJoin("PLUSTASSETALIAS PA", "W.ASSETNUM = PA.ASSETNUM AND W.SITEID = PA.SITEID AND PA.ISDEFAULT = 1")
				.leftJoin("ASSETMETER AM", "W.ASSETNUM = AM.ASSETNUM AND W.SITEID = AM.SITEID AND AM.PLUSTPRIMETER = 1")
				.leftJoin("WOMETER WM", "W.WONUM = WM.WONUM AND W.SITEID = WM.SITEID AND WM.METERNAME = AM.METERNAME")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")				
				.and("W.SITEID = 'CORP'")
				.and("W.ISTASK = 0")
				.and(" W.STATUSDATE > SYSDATE-90")
				.and("W.REPAIRFACILITY  = (SELECT DEFAULTREPFAC FROM MAXIMO.MAXUSER WHERE USERID = '" + this.user.getUserId() + "' AND DEFSITE = DEFAULTREPFACSITEID )")
				
				//.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");

			// If mapping is enabled, get the XY coordinates
			if (this.isEmmMapEnabled()) {
				sql
					.column("WOSERVICEADDRESS.LATITUDEY", "WOSERVICEADDRESS.LONGITUDEX")
					.leftJoin("WOSERVICEADDRESS", "W.WONUM = WOSERVICEADDRESS.WONUM AND W.SITEID = WOSERVICEADDRESS.SITEID");
			}
			
			jsonObj = getSqlResultJson("WORKORDER", sql, pagination);

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
	
	@Action(value="getMyTaskWorkOrderListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyTaskWorkOrderListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WONUM AS PARENT", "W.WORKORDERID AS PARENTID")
				.column("WOTASK.WONUM AS WONUM", "WOTASK.WORKORDERID AS WORKORDERID", "WOTASK.CLASSSTRUCTUREID")
				.column("WOTASK.DESCRIPTION", "WOTASK.LOCATION", "WOTASK.ASSETNUM", "WOTASK.STATUSDATE", "WOTASK.ESTDUR")
				.column("WOTASK.OBSERVATION", "WOTASK.MEASUREMENTVALUE", "WOTASK.PERSONGROUP", "WOTASK.AMCREW", "WOTASK.SUPERVISOR", "WOTASK.LEAD")
				.column("WOTASK.STATUS", "WOTASK.WOPRIORITY", "WOTASK.WORKTYPE", "WOTASK.FAILURECODE", "WOTASK.PROBLEMCODE")
				.column("WOTASK.ISTASK", "WOTASK.ORIGRECORDID", "WOTASK.TASKID", "WOTASK.SITEID", "WOTASK.ORGID", "W.ORIGRECORDCLASS")
				.column("WOTASK.WOCLASS", "WOTASK.HISTORYFLAG")
				.column("WOTASK.PLUSTCOMP", "WOTASK.PLUSTACCOMP","WOTASK.PLUSTREASON")
				// IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION") 
				.column("WOTASK.INSPFORMNUM")
				.from("WORKORDER W")
				.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID AND WOTASK.ISTASK = 1")
				.leftJoin("LONGDESCRIPTION LD", "WOTASK.WORKORDERID = LD.LDKEY AND LD.LDOWNERTABLE='WORKORDER' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")				
				.and("W.SITEID = 'CORP'")
				.and(" W.STATUSDATE > SYSDATE-90")
				.and("W.REPAIRFACILITY  = (SELECT DEFAULTREPFAC FROM MAXIMO.MAXUSER WHERE USERID = '" + this.user.getUserId() + "' AND DEFSITE = DEFAULTREPFACSITEID )")
				.orderBy("W.WORKORDERID", "WOTASK.WORKORDERID");			
			
			jsonObj = getSqlResultJson("WORKORDER", sql, pagination);

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

	@Action(value="getMySRWorkLogListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMySRWorkLogListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("SR.TICKETID", "SR.TICKETUID")
				.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.DESCRIPTION", "WL.CLASS", "WL.CREATEBY")
				.column("WL.LOGTYPE", "WL.CREATEDATE", "WL.SITEID", "WL.ORGID")
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION") 
				.from("TICKET SR")
				.innerJoin("WORKLOG WL", "SR.TICKETID = WL.RECORDKEY AND SR.CLASS = WL.CLASS")
				.leftJoin("LONGDESCRIPTION LD", "WL.WORKLOGID = LD.LDKEY AND LD.LDOWNERTABLE='WORKLOG' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
				.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
				.orderBy("SR.TICKETID");
			
			jsonObj = getSqlResultJson("WORKLOG", sql, pagination);

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
	
	@Action(value="getMyWPLaborJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyWPLaborJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WONUM", "W.WORKORDERID")
				.column("WPL.WPLABORUID", "WPL.WPLABORID", "WPL.LABORCODE", "WPL.LABORHRS", "P.DISPLAYNAME")
				.column("WPL.SKILLLEVEL", "WPL.VENDOR", "WPL.CRAFT", "WPL.QUANTITY", "WPL.AMCREW", "WPL.SITEID", "WPL.ORGID")
				.from("WORKORDER W")
				.innerJoin("WPLABOR WPL", "W.WONUM = WPL.WONUM AND W.SITEID = WPL.SITEID")
				.leftJoin("LABOR L", "WPL.LABORCODE = L.LABORCODE")
				.leftJoin("PERSON P", "L.PERSONID = P.PERSONID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID", "WPL.WPLABORID");
			
			jsonObj = getSqlResultJson("WPLABOR", sql, pagination);

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

	@Action(value="getMyWPMaterialJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyWPMaterialJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WONUM", "W.WORKORDERID", "W.PARENT")
				.column("WPL.WPITEMID", "WPL.LINETYPE", "WPL.ITEMNUM", "WPL.DESCRIPTION","WPL.REQUIREDATE", "WPL.ORGID")
				.column("WPL.ITEMQTY", "WPL.LINECOST", "WPL.LOCATION", "WPL.STORELOCSITE", "WPL.ORDERUNIT", "WPL.UNITCOST", "WPL.SITEID")
				.column("WPL.RESTYPE")
				.from("WORKORDER W")
				.innerJoin("WPMATERIAL WPL", "W.WONUM = WPL.WONUM AND W.SITEID = WPL.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("WPL.WPITEMID");
			
			jsonObj = getSqlResultJson("WPMATERIAL", sql, pagination);

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
	
	@Action(value="getMyWorkLogListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyWorkLogListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("W.WONUM", "W.WORKORDERID")
				.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.DESCRIPTION", "WL.CLASS", "WL.CREATEBY")
				.column("WL.LOGTYPE", "WL.CREATEDATE", "WL.SITEID", "WL.ORGID")
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION") 
				.from("WORKORDER W")
				.innerJoin("WORKLOG WL", "W.WONUM = WL.RECORDKEY AND W.WOCLASS = WL.CLASS AND W.SITEID = WL.SITEID")
				.leftJoin("LONGDESCRIPTION LD", "WL.WORKLOGID = LD.LDKEY AND LD.LDOWNERTABLE='WORKLOG' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID", "WL.WORKLOGID");
			
			jsonObj = getSqlResultJson("WORKLOG", sql, pagination);

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
	
	private String getLTCompleteWhere(){
		String sql = " (SELECT DISTINCT * FROM ("
				+ this.getSqlLtByLabor()
				+ " UNION "
				+ this.getSqlLtByLaborOnWo()
				+ " UNION "
				+ this.getSqlLtByLaborOnSr()
				+ " UNION "
				+ this.getSqlLtWithWOCompleteWhere()
				+ " UNION "
				+ this.getSqlLtWithSRCompleteWhere()
				+ ") S )";
		return sql;
	}	
	
	private String getSqlLtByLabor() {
		String laborSubSelect = new SelectQuery()
			.distinct()
			.column("LABORCODE")
			.from("LABOR")
			.where("PERSONID = '" + this.user.getPersonId() + "'")
			.toString();
		
		// All LabTrans Submitted with Signed In User's Laborcode
		// 1> Condition 1 - LabTrans is not against a work order and not against a SR; 
		// LT.REFWO IS NULL AND LT.TICKETID IS NULL
		return new SelectQuery()
			.distinct()
			.column("LT.LABTRANSID")
			.from("LABTRANS LT")
			.where("LT.LABORCODE = (" + laborSubSelect +")")
			.and("LT.REFWO IS NULL")
			.and("LT.TICKETID IS NULL")
			.toString()
		;
	}
	
	private String getSqlLtByLaborOnWo() {
		String laborSubSelect = new SelectQuery()
			.distinct()
			.column("LABORCODE")
			.from("LABOR")
			.where("PERSONID = '" + this.user.getPersonId() + "'")
			.toString();
		
		// 2> Condition 2 - LabTrans is against a work order but not against a SR
		// LT.REFWO IS NOT NULL AND LT.TICKETID IS NULL
		return new SelectQuery()
			.distinct()
			.column("LT.LABTRANSID")
			.from("LABTRANS LT")
			.leftJoin("WORKORDER W", "LT.REFWO = W.WONUM AND LT.SITEID = W.SITEID")
			.where("LT.LABORCODE = (" + laborSubSelect +")")
			.and("LT.REFWO IS NOT NULL")
			.and("LT.TICKETID IS NULL")
			.and("(W.WOCLASS = 'WORKORDER' OR W.WOCLASS = 'ACTIVITY')")
			.and("W.ISTASK = 0")
			.and("W.HISTORYFLAG = 0")
			.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") +")")
			.toString()
		;
	}
	
	private String getSqlLtByLaborOnSr() {
		String laborSubSelect = new SelectQuery()
			.distinct()
			.column("LABORCODE")
			.from("LABOR")
			.where("PERSONID = '" + this.user.getPersonId() + "'")
			.toString();

		// 3> Condition 3 - LabTrans is not against a work order but against a SR 
		// LT.REFWO IS NULL AND LT.TICKETID IS NOT NULL
		return new SelectQuery()
			.distinct()
			.column("LT.LABTRANSID")
			.from("LABTRANS LT")
			.leftJoin("TICKET SR", "LT.TICKETID = SR.TICKETID")
			.where("LT.LABORCODE = (" + laborSubSelect +")")
			.and("LT.REFWO IS NULL")
			.and("LT.TICKETID IS NOT NULL")
			.and("SR.CLASS = 'SR'")
			.and("SR.HISTORYFLAG = 0")
			.and("SR.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'SRSTATUS'").and(" MAXVALUE IN ('CAN','CLOSED','RESOLVED')") +")")
			.toString()
		;
	}
	
	private String getSqlLtWithWOCompleteWhere() {
		// LabTrans on the downloaded WOs
		return new SelectQuery()
			.distinct()
			.column("LT.LABTRANSID")
			.from("LABTRANS LT")
			.leftJoin("WORKORDER W", "LT.REFWO = W.WONUM AND LT.SITEID = W.SITEID")
			.where("(W.WOCLASS = 'WORKORDER' OR W.WOCLASS = 'ACTIVITY')")
			.and("W.HISTORYFLAG = 0")
			.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") +")")
			.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
			.toString()
		;
	}
	
	private String getSqlLtWithSRCompleteWhere() {
        // LabTrans on the downloaded SRs
		return new SelectQuery()
			.distinct()
			.column("LT.LABTRANSID")
			.from("LABTRANS LT")
			// .leftJoin("TICKET SR", "LT.TICKETID = SR.TICKETID")
			// Fix to include checking of Ticket Class
			.leftJoin("TICKET SR", "LT.TICKETID = SR.TICKETID AND SR.CLASS= LT.TICKETCLASS")
			.where("SR.CLASS = 'SR'")
			.and("SR.HISTORYFLAG = 0")
			.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
			.toString()
		;
	}	

	@Action(value="getMySRLabTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMySRLabTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("SR.TICKETUID")
				.column("LT.LABTRANSID", "LT.TICKETID")
				.column("LT.LABORCODE", "LT.CRAFT", "LT.PREMIUMPAYCODE")
				.column("LT.REGULARHRS", "LT.PREMIUMPAYHOURS", "LT.STARTDATE", "LT.FINISHDATE", "LT.STARTTIME", "LT.FINISHTIME", "LT.TIMERSTATUS")
				.column("LT.TRANSTYPE", "LT.ORGID", "LT.SITEID")
				.from("TICKET SR")
				.innerJoin("LABTRANS LT", "SR.TICKETID = LT.TICKETID")
				.where("SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0")
				.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
				.orderBy("LT.TICKETID");
			
			jsonObj = getSqlResultJson("LABTRANS", sql, pagination);

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
	
	@Action(value="getMyLabTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)	
	public String getMyLabTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			String laborSubSelect = new SelectQuery()
			.distinct()
			.column("LABORCODE")
			.from("LABOR")
			.where("PERSONID = '" + this.user.getPersonId() + "'")
			.toString();
			
			// All LabTrans Submitted with Signed In User's Laborcode\
			// 1> Condition 1 - LabTrans is not against a work order and not against a SR; 
			// LT.REFWO IS NULL AND LT.TICKETID IS NULL
			String sWhereLtByLabor = "LT.LABORCODE = (" + laborSubSelect +")";
			sWhereLtByLabor += " AND LT.REFWO IS NULL AND LT.TICKETID IS NULL";

			// 2> Condition 2 - LabTrans is against a work order but not against a SR
			// LT.REFWO IS NOT NULL AND LT.TICKETID IS NULL
			String sWhereLtByLaborOnWo = "LT.LABORCODE = (" + laborSubSelect +")";
			sWhereLtByLaborOnWo += " AND LT.REFWO IS NOT NULL AND LT.TICKETID IS NULL";
			sWhereLtByLaborOnWo += " AND (W.WOCLASS = 'WORKORDER' OR W.WOCLASS = 'ACTIVITY') AND W.ISTASK = 0 AND W.HISTORYFLAG = 0 AND W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CLOSE','COMP','CAN')").toString() + ")";
			
			// 3> Condition 3 - LabTrans is not against a work order but against a SR 
			// LT.REFWO IS NULL AND LT.TICKETID IS NOT NULL
			String sWhereLtByLaborOnSr = "LT.LABORCODE = (" + laborSubSelect +")";
			sWhereLtByLaborOnSr += " AND LT.REFWO IS NULL AND LT.TICKETID IS NOT NULL";
			sWhereLtByLaborOnSr += " AND SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0 AND SR.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'SRSTATUS' AND MAXVALUE IN ('CLOSED','RESOLVED','CAN')").toString() + ")";
			
			// LabTrans on the downloaded WOs
            String sWhereLtOnWo = "W.SITEID ='CORP'";
            sWhereLtOnWo += " AND W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")";
            sWhereLtOnWo += " AND W.STATUSDATE > SYSDATE-90";

                        
            // LabTrans on the downloaded SRs
            String sWhereLtOnSr = "SR.CLASS = 'SR' AND SR.HISTORYFLAG = 0";
            sWhereLtOnSr += " AND SR.TICKETUID IN " + this.getSRCompleteWhere("SR");
            
            SelectQuery sql2 = new SelectQuery()
            .column("PERSONID")
            .from("MAXUSER")
            .where("DEFAULTREPFAC = (SELECT DEFAULTREPFAC FROM MAXIMO.MAXUSER WHERE USERID = '" + this.user.getPersonId() + "')");
            SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID","W.ISTASK"/*, "SR.TICKETUID"*/)
				.column("LT.LABTRANSID", "LT.REFWO AS WONUM", "LT.TICKETID", "LT.TICKETCLASS")
				.column("LT.LABORCODE", "LT.CRAFT", "LT.PREMIUMPAYCODE", "LT.GENAPPRSERVRECEIPT", "LT.SKILLLEVEL")
				.column("LT.REGULARHRS", "LT.PREMIUMPAYHOURS","LT.PREMIUMPAYRATE", "LT.STARTDATE", "LT.STARTTIME", "LT.FINISHDATE", "LT.FINISHTIME", "LT.TIMERSTATUS")
				.column("LT.PAYRATE","LT.LOCATION","LT.ASSETNUM","LT.GLDEBITACCT","LT.GLCREDITACCT")
				.column("LT.TRANSTYPE", "LT.ORGID", "LT.SITEID") 
				.column("NULL AS SCHEDSTARTTO", "NULL AS SCHEDSTARTFROM")
				.column("W.PARENT")
				.from("LABTRANS LT")
				.leftJoin("WORKORDER W", "LT.REFWO = W.WONUM AND LT.SITEID = W.SITEID")
				// .leftJoin("TICKET SR", "LT.TICKETID = SR.TICKETID")
				// Fix to include ticket class
				.innerJoin(sql2, "LTMAXUSER", "LT.LABORCODE = LTMAXUSER.PERSONID")
				// .where("LT.LABTRANSID IN " + this.getLTCompleteWhere())
				.orderBy("LT.LABTRANSID", "W.WORKORDERID"/*, "SR.TICKETUID"*/);
		
            jsonObj = getSqlResultJson("LABTRANS", sql, pagination);

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

	@Action(value="getMyTaskLabTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyTaskLabTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("WOTASK.WORKORDERID","WOTASK.TASKID","WOTASK.PARENT")
				.column("LT.LABTRANSID", "LT.REFWO AS WONUM")
				.column("LT.LABORCODE", "LT.CRAFT", "LT.PREMIUMPAYCODE")
				.column("LT.REGULARHRS", "LT.PREMIUMPAYHOURS", "LT.STARTDATE", "LT.STARTTIME", "LT.FINISHDATE", "LT.FINISHTIME", "LT.TIMERSTATUS")
				.column("LT.TRANSTYPE", "LT.ORGID", "LT.SITEID") 
				.from("WORKORDER W")
				.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID")
				.innerJoin("LABTRANS LT", "WOTASK.WONUM = LT.REFWO AND WOTASK.SITEID = LT.SITEID")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")							
				.and("W.SITEID = 'CORP'")
				.and(" W.STATUSDATE > SYSDATE-90")
				.orderBy("LT.REFWO", "WOTASK.WORKORDERID");
			
			jsonObj = getSqlResultJson("LABTRANS", sql, pagination);
			
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
	
	@Action(value="getMyMatUseTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyMatUseTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID","W.PARENT")
				.column("MT.MATUSETRANSID", "MT.REFWO AS WONUM")
				.column("MT.DESCRIPTION", "MT.LINETYPE", "MT.ITEMNUM", "MT.QUANTITY", "MT.UNITCOST", "MT.TRANSDATE")
				.column("MT.ISSUETYPE", "MT.ISSUETO", "MT.BINNUM", "MT.LOTNUM", "MT.STORELOC", "MT.CURBAL")
				.column("MT.ASSETNUM", "MT.LOCATION", "MT.SITEID", "MT.ORGID", "MT.ROTASSETNUM")  
				.from("WORKORDER W")
				.innerJoin("MATUSETRANS MT", "W.WONUM = MT.REFWO AND W.SITEID = MT.SITEID")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")				
				.and("W.SITEID = 'CORP'")
				.and(" W.STATUSDATE> SYSDATE-90")
				.orderBy("W.WORKORDERID", "MT.MATUSETRANSID");
			
			jsonObj = getSqlResultJson("MATUSETRANS", sql, pagination);
			
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
	@Action(value="getMyTaskMatUseTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyTaskMatUseTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("WOTASK.WORKORDERID","WOTASK.TASKID")
				.column("MT.MATRECTRANSID","MT.ISSUETYPE","MT.REFWO AS WONUM")
				.column("MT.LINETYPE", "MT.ITEMNUM", "MT.DESCRIPTION", "MT.QUANTITY", "MT.CONVERSION", "MT.UNITCOST", "MT.TRANSDATE")
				.column("MT.LINECOST", "MT.FROMSTORELOC", "MT.TOSTORELOC", "MT.FROMSITEID", "MT.ROTASSETNUM")
				.column("MT.SITEID", "MT.ORGID", "NULL AS TRANSFERINOUT", "MT.TOBIN", "MT.FROMBIN", "NULL AS NEWSITE")
				.column("W.PARENT")
				.from("WORKORDER W")
				.innerJoin("WORKORDER WOTASK", "W.WONUM = WOTASK.PARENT AND W.SITEID = WOTASK.SITEID")
				.innerJoin("MATRECTRANS MT", "WOTASK.WONUM = MT.REFWO AND WOTASK.SITEID = MT.SITEID")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")							
				.and("W.SITEID = 'CORP'")
				.and(" W.STATUSDATE > SYSDATE-90")
				.orderBy("MT.REFWO", "WOTASK.WORKORDERID");
			
			System.out.println(sql);
			jsonObj = getSqlResultJson("LABTRANS", sql, pagination);
			
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
	
	
	@Action(value="getMyMatRecTransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyMatRecTransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("MT.MATRECTRANSID","MT.ISSUETYPE")
				.column("MT.LINETYPE", "MT.ITEMNUM", "MT.DESCRIPTION", "MT.QUANTITY", "MT.CONVERSION", "MT.UNITCOST", "MT.TRANSDATE")
				.column("MT.LINECOST", "MT.FROMSTORELOC", "MT.TOSTORELOC", "MT.FROMSITEID", "MT.ROTASSETNUM")
				.column("MT.SITEID", "MT.ORGID", "NULL AS TRANSFERINOUT", "MT.TOBIN", "MT.FROMBIN", "NULL AS NEWSITE")
				.from("MATRECTRANS MT")
				.where("1=2");

			jsonObj = getSqlResultJson("MATRECTRANS", sql, pagination);
			
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
	
	@Action(value="getMyFailureRptListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyFailureRptListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
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
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID", "W.FAILURECODE");
			
			jsonObj = getSqlResultJson("FAILUREREPORT", sql, pagination);
			
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
	
	@Action(value="getMyMultiAssetLocListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyMultiAssetLocListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID")
				.column("MUL.MULTIID", "MUL.SEQUENCE", "MUL.RECORDKEY", "MUL.ASSETNUM", "MUL.LOCATION")
				.column("MUL.ROUTE", "MUL.ROUTESTOP", "MUL.TARGETDESC", "MUL.COMMENTS", "MUL.PROGRESS", "MUL.SITEID", "MUL.ORGID") 
				.column("MUL.INSPFORMNUM")
				.from("WORKORDER W")
				.innerJoin("MULTIASSETLOCCI MUL", "W.WONUM = MUL.RECORDKEY AND W.WOCLASS = MUL.RECORDCLASS AND W.SITEID = MUL.SITEID AND MUL.ISPRIMARY = 0")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID", "MUL.MULTIID");

			jsonObj = getSqlResultJson("MULTIASSETLOCCI", sql, pagination);

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

	@Action(value="getMyAssetMeterJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyAssetMeterJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    	SelectQuery sql = new SelectQuery()
					.distinct()
					.column("AM.ASSETMETERID","A.ASSETUID","A.ASSETID","AM.ASSETNUM","AM.METERNAME","M.DESCRIPTION","M.METERTYPE","AM.LASTREADING","AM.LASTREADINGDATE", "AM.READINGTYPE")
					.column("AM.MEASUREUNITID","M.DOMAINID","AM.SINCEINSTALL","AM.SINCELASTINSPECT","AM.SINCELASTOVERHAUL","AM.SINCELASTREPAIR","AM.LASTREADINGINSPCTR","AM.SITEID", "AM.ROLLOVER")
					.column("NULL as NEWREADING","NULL as NEWREADINGDATE","NULL as READINGDATE","NULL as READING", "AM.PLUSTPRIMETER")
					.from("ASSET A")
					.innerJoin("ASSETMETER AM", "A.ASSETNUM = AM.ASSETNUM AND A.SITEID = AM.SITEID")
					.innerJoin("METER M", "AM.METERNAME = M.METERNAME")
					.where("A.ISRUNNING = '1' AND AM.ACTIVE = '1'")
					.and("A.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LOCASSETSTATUS' AND MAXVALUE IN ('INACTIVE','DECOMMISSIONED')").toString() + ")")
					.and("M.METERNAME NOT IN('FUEL','REPSTATUS')")
					.and("A.SITEID = '" + this.user.getSiteId() + "'");
		
				jsonObj = getSqlResultJson("ASSETMETER", sql, pagination);
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
	
	@Action(value="getMyLocationMeterJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyLocationMeterJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    	SelectQuery sql = new SelectQuery()
		    		.distinct()
					.column("LM.LOCATIONMETERID","L.LOCATIONSID","LM.LOCATION","LM.METERNAME","M.DESCRIPTION","M.METERTYPE","LM.LASTREADING","LM.LASTREADINGDATE", "LM.READINGTYPE")
					.column("LM.MEASUREUNITID","M.DOMAINID","LM.SINCEINSTALL","LM.SINCELASTINSPECT","LM.SINCELASTOVERHAUL","LM.SINCELASTREPAIR","LM.LASTREADINGINSPCTR","LM.SITEID", "LM.ROLLOVER")
					.column("NULL as NEWREADING","NULL as NEWREADINGDATE","NULL as READINGDATE","NULL as READING")
					.from("LOCATIONS L")
					.innerJoin("LOCATIONMETER LM", "L.LOCATION = LM.LOCATION AND L.SITEID = LM.SITEID")
					.innerJoin("METER M", "LM.METERNAME = M.METERNAME")
					.where("LM.ACTIVE = '1'")
					// .and("L.SITEID = '" + this.user.getSession().getProfile().getDefaultSite() + "'");
					.and("L.SITEID IN " + this.user.getSitesString());
		    	
				jsonObj = getSqlResultJson("LOCATIONMETER", sql, pagination);
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
	
	@Action(value="getAllMeterGroupJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getAllMeterGroupJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    	SelectQuery sql = new SelectQuery()
			    	.column("GROUPNAME", "DESCRIPTION", "METERGROUPID")
					.from("METERGROUP")
					.orderBy("METERGROUPID");
		
			jsonObj = getSqlResultJson("METERGROUP", sql, pagination);
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
	
	@Action(value="getWosafetylinkListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getWosafetylinkListJson() {
		JSONObject jsonObj = new JSONObject();
		try {		
			SelectQuery sql = new SelectQuery()
				.column("W.WONUM","W.WORKORDERID","WS.WOSAFETYLINKID","WS.WOSAFETYDATASOURCE")
				.column("WT.ASSETNUM","WT.LOCATION","WT.REQUIREDSTATE","WS.HAZARDID","WS.TAGOUTID","WS.SITEID","WH.DESCRIPTION AS WHDESCRIPTION","WT.DESCRIPTION AS WTDESCRIPTION")
				.column("WS.ASSETNUM AS ASSET","WS.LOCATION AS LOC")
				.column("LD.LDTEXT AS WHLONGDESCRIPTION")
				.column("LDD.LDTEXT AS WTLONGDESCRIPTION")
				.from("WORKORDER W")
				.innerJoin("WOSAFETYLINK WS", "W.WONUM = WS.WONUM AND W.SITEID = WS.SITEID")
				.leftJoin("WOHAZARD WH", "WH.WONUM = WS.WONUM AND WH.HAZARDID = WS.HAZARDID AND WH.SITEID = WS.SITEID AND WH.WOSAFETYDATASOURCE = WS.WOSAFETYDATASOURCE")
				.leftJoin("LONGDESCRIPTION LD", "WH.WOHAZARDID = LD.LDKEY AND LD.LDOWNERTABLE='WOHAZARD' AND LD.LDOWNERCOL='DESCRIPTION'")
				.leftJoin("WOTAGOUT WT", "WT.TAGOUTID = WS.TAGOUTID AND WT.WONUM = WS.WONUM AND WT.SITEID = WS.SITEID")
				.leftJoin("LONGDESCRIPTION LDD", "WT.WOTAGOUTID= LDD.LDKEY AND LDD.LDOWNERTABLE='WOTAGOUT' AND LDD.LDOWNERCOL='DESCRIPTION'")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID", "WS.WOSAFETYLINKID");
			
			jsonObj = getSqlResultJson("WOSAFETYLINK", sql, pagination);

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
		
	//FOR PRECAUTIONS
	@Action(value="getWoHazardPrecListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getWoHazardPrecListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("W.WONUM","W.WORKORDERID","HP.WOSAFETYDATASOURCE")
				.column("HP.HAZARDID","HP.PRECAUTIONID","HP.WOHAZARDPRECID","HP.SITEID","WP.DESCRIPTION AS WPDESCRIPTION")
				.column("LDD.LDTEXT AS WPLONGDESCRIPTION")
				.from("WORKORDER W")
				.innerJoin("WOHAZARDPREC HP", "W.WONUM = HP.WONUM AND W.SITEID = HP.SITEID")
				.leftJoin("WOPRECAUTION WP", "WP.WONUM = HP.WONUM AND WP.PRECAUTIONID= HP.PRECAUTIONID AND WP.SITEID = HP.SITEID AND WP.WOSAFETYDATASOURCE = HP.WOSAFETYDATASOURCE")
				.leftJoin("LONGDESCRIPTION LDD", "WP.WOPRECAUTIONID = LDD.LDKEY AND LDD.LDOWNERTABLE='WOPRECAUTION' AND LDD.LDOWNERCOL='DESCRIPTION'")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("WOHAZARDPREC", sql, pagination);

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
		
	// For WOTAGLOCK
	@Action(value="getTagLockListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getTagLockListJson() {
		JSONObject jsonObj = new JSONObject();
		try {		
			SelectQuery sql = new SelectQuery()
				.column("W.WONUM","W.WORKORDERID")
				.column("TG.TAGOUTID","TG.LOCKOUTID","TG.TAGLOCKID","TG.SITEID")
				.column("WL.DEVICEDESCRIPTION AS WLDESCRIPTION")
				.column("WL.LOCATION","WL.ASSETNUM","WL.REQUIREDSTATE")
				.column("LDD.LDTEXT AS WLLONGDESCRIPTION")
				.from("WORKORDER W")
				.innerJoin("WOTAGLOCK TG", "W.WONUM = TG.WONUM AND W.SITEID = TG.SITEID")
				.leftJoin("WOLOCKOUT WL", "WL.LOCKOUTID = TG.LOCKOUTID AND WL.WONUM = TG.WONUM AND WL.SITEID = TG.SITEID")
				.leftJoin("LONGDESCRIPTION LDD", "WL.WOLOCKOUTID= LDD.LDKEY AND LDD.LDOWNERTABLE='WOLOCKOUT' AND LDD.LDOWNERCOL='DEVICEDESCRIPTION'")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("WOTAGLOCK", sql, pagination);

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
	
	@Action(value="getWoHazardListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getWoHazardListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID","WH.HAZARDID","WH.WOHAZARDID","WH.DESCRIPTION","WH.PRECAUTIONENABLED","WH.HAZMATENABLED","WH.TAGOUTENABLED","WH.WONUM","WH.WOSAFETYDATASOURCE")
				.column("WH.HAZARDTYPE","WH.MSDSNUM","WH.HEALTHRATING","WH.FLAMMABILITYRATING","WH.REACTIVITYRATING","WH.CONTACTRATING")
				.column("WH.ORGID","WH.SITEID")
				.from("WORKORDER W")
				.innerJoin("WOHAZARD WH", "W.WONUM = WH.WONUM AND W.SITEID = WH.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("WOHAZARD", sql, pagination);

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
	
	@Action(value="getPrecautionListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getPrecautionListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID","WP.PRECAUTIONID","WP.WOPRECAUTIONID","WP.DESCRIPTION","WP.WOSAFETYDATASOURCE","WP.WONUM")
				.column("WP.ORGID","WP.SITEID")
				.from("WORKORDER W")
				.innerJoin("WOPRECAUTION WP", "W.WONUM = WP.WONUM AND W.SITEID = WP.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("WOPRECAUTION", sql, pagination);

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
	
	@Action(value="getTagoutListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getTagoutListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID","WT.TAGOUTID","WT.WOTAGOUTID","WT.DESCRIPTION","WT.LOCATION","WT.ASSETNUM","WT.REQUIREDSTATE","WT.WOSAFETYDATASOURCE","WT.WONUM")
				.column("WT.ORGID","WT.SITEID")
				.from("WORKORDER W")
				.innerJoin("WOTAGOUT WT", "W.WONUM = WT.WONUM AND W.SITEID = WT.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("WOTAGOUT", sql, pagination);

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
	
	@Action(value="getLockoutListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String getLockoutListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WORKORDERID", "WL.LOCKOUTID","WL.WOLOCKOUTID","WL.DEVICEDESCRIPTION","WL.LOCATION","WL.ASSETNUM","WL.REQUIREDSTATE","WL.WONUM")
				.column("WL.ORGID","WL.SITEID")
				.from("WORKORDER W")
				.innerJoin("WOLOCKOUT WL", "W.WONUM = WL.WONUM AND W.SITEID = WL.SITEID")
				.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"))
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("WOLOCKOUT", sql, pagination);

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

	@Action(value="getMyMRListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyMRListJson() {
		JSONObject jsonObj = new JSONObject();
		try {		
			SelectQuery sql = new SelectQuery()
				.column("M.MRID", "M.MRNUM", "M.DESCRIPTION", "M.STATUS", "M.SITEID", "M.ORGID")
				.column("M.STATUSDATE", "M.REQUIREDDATE", "M.PRIORITY", "M.WONUM" , "M.LOCATION", "M.ENTERDATE")
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION") 
				.from("MR M")
				.leftJoin("LONGDESCRIPTION LD", "M.MRID = LD.LDKEY AND LD.LDOWNERTABLE='MR' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("M.SITEID = '" + user.getSiteId() + "'")
				.and("M.REQUESTEDBY = '" + user.getUserId() +"'")
				.and("M.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'MRSTATUS'").and("MAXVALUE IN ('CAN','CLOSE')") + ")")
				.orderBy("M.MRID");
			jsonObj = getSqlResultJson("MR", sql, pagination);

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
	
	@Action(value="getMyMRLinesListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyMRLinesListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("ML.MRLINEID", "M.MRID", "ML.MRNUM", "ML.MRLINENUM", "ML.DESCRIPTION", "ML.LINETYPE", "ML.ITEMNUM")
				.column("ML.QTY", "ML.ORDERUNIT", "ML.UNITCOST", "ML.LINECOST", "ML.REQUIREDDATE, ML.SITEID, ML.ORGID")
				.from("MR M")
				.innerJoin("MRLINE ML", "ML.MRNUM = M.MRNUM AND ML.SITEID = M.SITEID")
				.where("M.SITEID = '" + user.getSiteId() + "'")
				.and("M.REQUESTEDBY = '" + user.getUserId() +"'")
				.and("M.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'MRSTATUS'").and("MAXVALUE IN ('CAN','CLOSE')") + ")")
				.orderBy("M.MRID, ML.MRLINEID");
			jsonObj = getSqlResultJson("MRLINES", sql, pagination);

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

    @Action(value="getDomainJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
    public String getDomainJson() {
        JSONObject jsonObj = new JSONObject();
        try {
        	SelectQuery alnDomain = new SelectQuery()
        		.column("DOMAINID")
        		.column("NULL AS MAXVALUE")
        		.column("VALUE")
        		.column("DESCRIPTION")
        		.column("SITEID")
        		.column("ORGID")
        		.from("ALNDOMAIN")
        		.where("DOMAINID IN ('CREWID','PLUSTREASON','AEPMAKE','PLUSTACCOMP') OR DOMAINID IN (" + new SelectQuery().distinct().column("DOMAINID").from("METER").where("DOMAINID IS NOT NULL").toString() + ")");

        	SelectQuery synonymDomain = new SelectQuery()
	    		.column("DOMAINID")
	    		.column("MAXVALUE")
	    		.column("VALUE")
	    		.column("DESCRIPTION")
	    		.column("SITEID")
        		.column("ORGID")
	    		.from("SYNONYMDOMAIN")
	    		.where("DOMAINID IN ('WOSTATUS', 'ITEMSTATUS', 'LOGTYPE', 'CATEGORY', 'LOCASSETSTATUS', 'ASSETTYPE', 'SRSTATUS')");
	        	
        	SelectQuery numericDomain = new SelectQuery()
	    		.column("DOMAINID")
	    		.column("NULL AS MAXVALUE")
	    		.columnAsString("VALUE", 10)
	    		.column("DESCRIPTION")
	    		.column("SITEID")
        		.column("ORGID")
	    		.from("NUMERICDOMAIN")
	    		.where("DOMAINID IN ('TICKETPRIORITY')");
        	
        	SelectQuery sql = new SelectQuery()
        		.union(alnDomain, synonymDomain, numericDomain);

            jsonObj = getSqlResultJson("DOMAIN", sql, pagination);

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
	
    @Action(value="getIssueUnitJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
    public String getIssueUnitJson() {
        JSONObject jsonObj = new JSONObject();
        try {
        	SelectQuery sql = new SelectQuery()
        		.distinct()
	    		.column("MEASUREUNITID")
	    		.column("ABBREVIATION")
	    		.column("DESCRIPTION")
	    		.from("MEASUREUNIT");
        	
            jsonObj = getSqlResultJson("ISSUEUNIT", sql, pagination);

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
	
	@Action(value="getMyLocationsJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyLocationsJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("LOC.LOCATIONSID", "LOC.LOCATION", "LOC.DESCRIPTION", "LOC.TYPE", "LOC.DISABLED", "LOC.STATUS", "LOC.ORGID", "LOC.SITEID")
				.column("LOC.PLUSPCUSTOMER")				
				.from("LOCATIONS LOC")
				.where("LOC.SITEID = 'CORP'")
				.and("LOC.TYPE IN ( 'COURIER' ,  'HOLDING' ,  'LABOR' ,  'OPERATING' ,  'REPAIR' ,  'SALVAGE' ,  'VENDOR' )");
				
			jsonObj = getSqlResultJson("LOCATIONS", sql, pagination);
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
	
	@Action(value="getMyAssetsJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyAssetsJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql2 = new SelectQuery()
				.from("AEPASSETDEPT AD1")	
				.where("AD1.ISUSINGDEPT = '1' AND AD1.AEPEFFECTIVEDATE =(SELECT MAX(AEPEFFECTIVEDATE) FROM MAXIMO.AEPASSETDEPT AD2 WHERE AD2.ISUSINGDEPT = '1' AND TRUNC(AD2.AEPEFFECTIVEDATE) <= TRUNC(SYSDATE) AND AD1.ASSETNUM = AD2.ASSETNUM)");
	
			SelectQuery sql = new SelectQuery()
				.column("A.ASSETUID","A.ASSETID", "A.ASSETNUM", "A.PARENT", "A.CHILDREN", "A.LOCATION", "A.DESCRIPTION", "A.SERIALNUM", "A.VENDOR", "A.MANUFACTURER")
				.column("A.FAILURECODE", "A.STATUS", "A.ISRUNNING", "A.SITEID", "A.ORGID","A.ASSETTYPE","A.GROUPNAME","A.PURCHASEPRICE","A.STATUSDATE")
				.column("A.TOTDOWNTIME","A.INSTALLDATE", "A.CLASSSTRUCTUREID", "A.ITEMNUM", "A.CHANGEDATE")
				.column("NULL as NEWSITE","NULL as NEWLOCATION")
				.column("A.PLUSPCUSTOMER")
				.column("A.AEPMAKE","A.PLUSTYEAR","A.PLUSTMODEL","A.DEFAULTREPFAC")
				.column("AD.CUSTOMER")
				.column("PL.LICENSENUM")
				.column("PC.NAME")
				.column("PA.ALIAS")

				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION")
				.from("ASSET A")
				.leftJoin(sql2,"AD", " AD.assetnum = A.ASSETNUM and AD.SITEID = A.SITEID")
				.leftJoin("PLUSTLICENSE PL", "PL.ASSETNUM = A.ASSETNUM AND PL.AEPPRIMARY = 1")
				.leftJoin("PLUSPCUSTOMER PC", "PC.CUSTOMER = AD.CUSTOMER")
				.leftJoin("LONGDESCRIPTION LD", "A.ASSETUID = LD.LDKEY AND LD.LDOWNERTABLE='ASSET' AND LD.LDOWNERCOL='DESCRIPTION'")
				.leftJoin("PLUSTASSETALIAS PA", "A.ASSETNUM = PA.ASSETNUM AND A.SITEID = PA.SITEID AND PA.ISDEFAULT = 1")
				.where("A.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LOCASSETSTATUS' AND MAXVALUE IN ('INACTIVE','DECOMMISSIONED')").toString() + ")")
				.and("A.SITEID = '" + this.user.getSiteId() + "'");

			// If mapping is enabled, get the XY coordinates
			// if (this.isEmmMapEnabled()) {
			// 	// The following line is an example of using link id between Maximo and GIS instead of using Maximo Lat / Long
			// 	// sql.column("A.MAXGISID");
			// 	sql
			// 		.column("SERVICEADDRESS.LATITUDEY","SERVICEADDRESS.LONGITUDEX")
			// 		.leftJoin("SERVICEADDRESS", "A.SADDRESSCODE = SERVICEADDRESS.ADDRESSCODE AND A.ORGID = SERVICEADDRESS.ORGID");
			// }
			
			jsonObj = getSqlResultJson("ASSET", sql, pagination);
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
	
	@Action(value="getAllInventoryJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAllInventoryJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("INV.INVENTORYID, INV.ITEMNUM, INV.ITEMSETID, INV.LOCATION, ITEM.DESCRIPTION, ITEM.ROTATING, ITEM.ITEMTYPE, INV.CATEGORY, INV.MANUFACTURER")
				.column("INV.MODELNUM, INV.SITEID, INV.STATUS, INV.STATUSDATE")
				.column("INV.BINNUM, INV.ISSUEUNIT, INV.ISSUEYTD, INV.ISSUE1YRAGO, INV.LASTISSUEDATE")
				.from("INVENTORY INV")
				.innerJoin("ITEM", "INV.ITEMNUM = ITEM.ITEMNUM AND INV.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE IN ('ITEM', 'TOOL')")
				.where("INV.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'ITEMSTATUS'").and("MAXVALUE IN ('OBSOLETE')") + ")")
				.orderBy("INV.SITEID", "INV.ITEMNUM");
				
			jsonObj = getSqlResultJson("INVENTORY", sql, pagination);
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
	
	@Action(value="getFailureCodeJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getFailureCodeJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("FAILURELIST.FAILURELIST", "FAILURELIST.FAILURECODE", "FAILURELIST.PARENT", "FAILURELIST.TYPE")
				.column("FAILURECODE.DESCRIPTION", "FAILURECODE.FAILURECODEID", "FAILURELIST.ORGID")
				.from("FAILURELIST")
				.innerJoin("FAILURECODE", "FAILURELIST.FAILURECODE = FAILURECODE.FAILURECODE AND FAILURELIST.ORGID = FAILURECODE.ORGID")
				.where("FAILURELIST.ORGID = '" + this.user.getOrgId() + "'");
				
			jsonObj = getSqlResultJson("FAILURECODE", sql, pagination);
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
	
	@Action(value="getStoreroomJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getStoreroomJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("LOCATIONSID", "LOCATION", "DESCRIPTION", "SITEID", "ORGID")
				.from("LOCATIONS")
				.where("TYPE = 'STOREROOM'");
				
			jsonObj = getSqlResultJson("STOREROOM", sql, pagination);
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
	
	@Action(value="getPersonGroupJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getPersonGroupJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("PERSONGROUPID", "PERSONGROUP", "DESCRIPTION")
				.from("PERSONGROUP");
				
			jsonObj = getSqlResultJson("PERSONGROUP", sql, pagination);
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
	
	@Action(value="getPersonGroupTeamJson",
            results={
                            @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
	)
	public String getPersonGroupTeamJson() {
		JSONObject jsonObj = new JSONObject();
		try {
	        SelectQuery sql = new SelectQuery()
	            .column("PERSONGROUPTEAMID", "PERSONGROUP", "RESPPARTY","RESPPARTYGROUP")
	            .from("PERSONGROUPTEAM");
	                        
	        jsonObj = getSqlResultJson("PERSONGROUPTEAM", sql, pagination);
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
	
	
	@Action(value="getInvBalancesJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getInvBalancesJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery invBalanceSubSelect = new SelectQuery()
				.column("INV.ITEMNUM")
				.from("INVENTORY INV")
				.where("INVB.ITEMSETID = INV.ITEMSETID AND INVB.SITEID = INV.SITEID AND INV.STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'ITEMSTATUS'").and("MAXVALUE NOT IN ('OBSOLETE')") + ")");
			
			SelectQuery sql = new SelectQuery()
				.column("INVB.INVBALANCESID, ITEM.ITEMNUM, ITEM.ITEMSETID, ITEM.DESCRIPTION, ITEM.LOTTYPE, ITEM.ITEMTYPE, ITEM.STATUS")
				.column("INVB.LOCATION, INVB.BINNUM, INVB.LOTNUM, INVB.CURBAL, INVB.PHYSCNT, INVB.PHYSCNTDATE, INVB.RECONCILED, INVB.ORGID, INVB.SITEID")
				.column("ITEM.ROTATING")
				.from("INVBALANCES INVB")
				.innerJoin("ITEM", "INVB.ITEMNUM = ITEM.ITEMNUM AND INVB.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE IN ('ITEM', 'TOOL')")
				.where("ITEM.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'ITEMSTATUS'").and("MAXVALUE IN ('OBSOLETE')") + ")")
				.and("ITEM.ITEMNUM IN (" + invBalanceSubSelect + ")")
				.orderBy("ITEM.ITEMNUM");
		
			jsonObj = getSqlResultJson("INVBALANCES", sql, pagination);
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
	
	@Action(value="getCompaniesJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getCompaniesJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("COMPANIESID", "COMPANY", "TYPE", "NAME", "DISABLED", "ORGID")
				.from("COMPANIES")
				.where("ORGID = '" + this.user.getOrgId() + "'");
			
			jsonObj = getSqlResultJson("COMPANIES", sql, pagination);
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
	
	@Action(value="getSitesJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getSitesJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {				
		    	SelectQuery sql = new SelectQuery()
			    	.column("SITEUID", "DESCRIPTION", "SITEID", "ORGID")
					.from("SITE")
					.where("ACTIVE = '1' AND SITEID IN " + this.user.getSitesString());
		
			jsonObj = getSqlResultJson("SITE", sql, pagination);
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
	
	@Action(value="getSparePartsJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getSparePartsJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {				
		    	SelectQuery sql = new SelectQuery()
			    	.column("SP.SPAREPARTID", "SP.DESCRIPTION AS REMARKS", "SP.SITEID", "SP.ORGID", "SP.QUANTITY", "SP.ISSUEDQTY", "SP.ASSETNUM", "SP.ITEMNUM", "SP.ITEMSETID", "ITEM.DESCRIPTION AS ITEMDESCRIPTION")
					.from("SPAREPART SP")
					.leftJoin("ITEM", "SP.ITEMNUM = ITEM.ITEMNUM ")
					.where("ASSETNUM IN (" + 
							new SelectQuery().column("ASSETNUM")
							.from("ASSET")
							.where("STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LOCASSETSTATUS'").and("MAXVALUE IN ('INACTIVE','DECOMMISSIONED')") + ")").toString() 
							+ " AND SITEID IN " + this.user.getSitesString() + ")"); 
			jsonObj = getSqlResultJson("SPAREPART", sql, pagination);
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
	
	@Action(value="getMyAssignmentsJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMyAssignmentsJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.distinct()
				.column("W.WONUM", "W.WORKORDERID")
				.column("A.ASSIGNMENTID", "A.SITEID", "A.ORGID", "A.LABORHRS", "A.AMCREW")
				.column("A.CRAFT", "A.LABORCODE", "A.SCHEDULEDATE", "A.STARTDATE", "A.STATUS")
				.column("A.WORKDATE")
				.from("WORKORDER W")
				.innerJoin("ASSIGNMENT A", "W.WONUM = A.WONUM AND W.SITEID = A.SITEID")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")				
				.and("W.SITEID = 'CORP'")
				.and(" W.STATUSDATE > SYSDATE-90")
				.orderBy("W.WORKORDERID");
			
			jsonObj = getSqlResultJson("ASSIGNMENT", sql, pagination);

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
	
	@Action(value="getMyAssetSpecJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyAssetSpecJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {

	    	SelectQuery sql = new SelectQuery()
		    	.column("ASP.ASSETSPECID","A.ASSETUID", "ASP.ASSETNUM", "ASP.ASSETATTRID","ATR.DESCRIPTION AS ASSETATTRIDDESC", "ASP.CLASSSTRUCTUREID", "ASP.DISPLAYSEQUENCE", "ASP.NUMVALUE", "ASP.ALNVALUE", "ASP.MEASUREUNITID")
		    	.column("ATR.DATATYPE", "ATR.DOMAINID", "A.ASSETUID", "ASP.CHANGEDATE")
		    	.column("ASP.MANDATORY", "1 AS ISACTIVE")
		    	.from("ASSET A")
				.innerJoin("ASSETSPEC ASP", "A.ASSETNUM = ASP.ASSETNUM AND A.SITEID=ASP.SITEID")
				.leftJoin("CLASSSPEC CS", "ASP.ASSETATTRID=CS.ASSETATTRID AND ASP.CLASSSTRUCTUREID=CS.CLASSSTRUCTUREID")
				.leftJoin("ASSETATTRIBUTE ATR", "CS.ASSETATTRIBUTEID = ATR.ASSETATTRIBUTEID")
				.leftJoin("CLASSSPECUSEWITH CSU", "CSU.CLASSSPECID=CS.CLASSSPECID AND CSU.OBJECTVALUE = 'ASSET' AND ASP.ASSETATTRID=CSU.ASSETATTRID AND ASP.CLASSSTRUCTUREID=CSU.CLASSSTRUCTUREID")
				.where("ASP.ASSETNUM IN (" + 
						new SelectQuery()
						.column("A2.ASSETNUM")
						.from("ASSET A2")
						.where("A2.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LOCASSETSTATUS'").and("MAXVALUE IN ('INACTIVE','DECOMMISSIONED')") + ") AND A2.SITEID IN " + this.user.getSitesString()).toString() + " )")
						.and("ASP.ASSETATTRID IN ('ENGMFG','ENGMOD','ENGSER','HYDMFG','HYDMOD','HYDSER','RADIO#')");
		    	
			jsonObj = getSqlResultJson("ASSETSPEC", sql, pagination);
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
	
	@Action(value="getMyWorkOrderSpecJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyWorkOrderSpecJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    SelectQuery sql = new SelectQuery()
		    	.column("WSP.WORKORDERSPECID", "WSP.WONUM", "WSP.ASSETATTRID","ATR.DESCRIPTION AS ASSETATTRIDDESC", "WSP.CLASSSTRUCTUREID", "WSP.DISPLAYSEQUENCE", "WSP.NUMVALUE", "WSP.ALNVALUE", "WSP.MEASUREUNITID")
		    	.column("ATR.DATATYPE", "ATR.DOMAINID", "W.WORKORDERID", "WSP.CHANGEDATE")
		    	.column("WSP.MANDATORY", "1 AS ISACTIVE")
		    	.from("WORKORDER W")
				.innerJoin("WORKORDERSPEC WSP", "W.WONUM = WSP.WONUM AND W.SITEID=WSP.SITEID")
				.leftJoin("ASSETATTRIBUTE ATR", "ATR.ASSETATTRID = WSP.ASSETATTRID")
		    	.where("W.WOCLASS = 'WORKORDER'")
				.and("W.HISTORYFLAG = 0")
				.and("W.STATUS NOT IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS'").and("MAXVALUE IN ('CLOSE','COMP','CAN')") + ")")
				.and("W.WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"));	
			jsonObj = getSqlResultJson("WORKORDERSPEC", sql, pagination);
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
	
	@Action(value="getMyTicketSpecJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyTicketSpecJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    SelectQuery sql = new SelectQuery()
		    	.column("TSP.TICKETSPECID", "SR.TICKETUID", "TSP.TICKETID", "TSP.ASSETATTRID","ATR.DESCRIPTION AS ASSETATTRIDDESC", "TSP.CLASSSTRUCTUREID", "TSP.DISPLAYSEQUENCE", "TSP.NUMVALUE", "TSP.ALNVALUE", "TSP.MEASUREUNITID")
		    	.column("ATR.DATATYPE", "ATR.DOMAINID", "SR.TICKETUID", "TSP.CHANGEDATE")
		    	.column("TSP.MANDATORY", "1 AS ISACTIVE")
		    	.from("TICKET SR")
				.innerJoin("TICKETSPEC TSP", "TSP.REFOBJECTID = SR.TICKETUID")
				.leftJoin("ASSETATTRIBUTE ATR", "ATR.ASSETATTRID = TSP.ASSETATTRID")
		    	.where("SR.CLASS = 'SR'")
				.and("SR.HISTORYFLAG = 0")
				.and("SR.TICKETUID IN " + this.getSRCompleteWhere("SR"))
				.orderBy("SR.TICKETID");	
			jsonObj = getSqlResultJson("TICKETSPEC", sql, pagination);
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
	/**
	 * Creates the Tool Item Table: Values for all Tool Items
	 */
	@Action(value="getToolItemJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getToolItemJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    	SelectQuery sql = new SelectQuery()
				.column("TI.ITEMNUM", "TI.DESCRIPTION", "TI.ITEMSETID", "TI.ITEMTYPE", "IT.ORGID", "IT.TOOLRATE")
				.from("TOOLITEM TI")
				.innerJoin("ITEMORGINFO IT", "TI.ITEMNUM = IT.ITEMNUM AND TI.ITEMSETID = IT.ITEMSETID")
				.where("TI.STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'ITEMSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ") AND IT.STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'ITEMSTATUS'").and("MAXVALUE IN ('ACTIVE')") + ") AND TI.ITEMTYPE ='TOOL'");	
			jsonObj = getSqlResultJson("TOOLITEM", sql, pagination);
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
  	/**
	 * Creates the Measurepoint Table: Values for all Measure Points
	 */
	@Action(value="getMeasurepointJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMeasurepointJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    	
		    	SelectQuery sql = new SelectQuery()
		    	.column("MEASUREPOINTID", "POINTNUM", "METERNAME")
		    	.column("ASSETNUM", "LOCATION", "DESCRIPTION")
		    	.column("LOWERWARNING", "LOWERACTION", "UPPERWARNING", "UPPERACTION")
		    	.column("SITEID", "ORGID")
				.from("MEASUREPOINT")
				.orderBy("MEASUREPOINTID");
		    	
			jsonObj = getSqlResultJson("MEASUREPOINT", sql, pagination);
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
	
	@Action(value="getDowntimeJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getDowntimeJson(){
		 JSONObject jsonObj = new JSONObject();
		    try {		    	
		    	SelectQuery sql = new SelectQuery()
				.column("NULL AS WORKORDERID", "NULL AS DOWNTIMEID", "NULL AS ASSETNUM", "NULL AS DOWNTIME", "NULL AS STATUSCHANGEDATE", "NULL AS SITEID", "NULL AS ORGID")
				.column("NULL AS STATUSCHANGECODE", "0 AS OPERATIONAL", "0 AS ISRUNNING","NULL as STARTDATESOURCE","NULL as STARTDATE", "NULL as ENDDATE","NULL AS ENDOPERATIONAL","NULL AS STARTOPERATIONAL")
		    	.column("NULL as ASSETUID")
				.from("WORKORDER")
		    	.where("1=2")
		    	.orderBy("DOWNTIMEID");
		    	
			jsonObj = getSqlResultJson("DOWNTIME", sql, pagination);
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
	
	@Action(value="getAssetStatusesJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAssetStatusesJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("AST.ASSETNUM","AST.WONUM", "A.DEFAULTREPFAC","AST.ISRUNNING", "AST.CHANGEDATE", "AST.CHANGEBY", "AST.DOWNTIME", "AST.CALNUM", "AST.CODE", "AST.OPERATIONAL", "AST.LOCATION", "AST.SITEID", "AST.ORGID", "AST.ASSETSTATUSID")
				.from("ASSET A")	
				.innerJoin("ASSETSTATUS AST", "A.ASSETNUM = AST.ASSETNUM AND A.SITEID = AST.SITEID")
				.where("A.STATUS IN (" + new SelectQuery().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'LOCASSETSTATUS'").and("MAXVALUE IN ('OPERATING')") + ")")
				.and("A.SITEID = '" + this.user.getSiteId() + "'");
				
			jsonObj = getSqlResultJson("ASSETSTATUS", sql, pagination);
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
	
	/**
	 * Creates the Classtructure Table: Values for all Classtructure
	 */
	@Action(value="getClasstructureJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getClasstructureJson(){		
		 JSONObject jsonObj = new JSONObject();
		    try {
		    	
		    	SelectQuery sql = new SelectQuery()
				.column("CLASS.DESCRIPTION", "CLASS.CLASSIFICATIONUID", "CSTR.CLASSSTRUCTUREID", "CSTR.ORGID", "CSTR.GENASSETDESC")
				.column("CSTR.SITEID", "CSTR.CLASSIFICATIONID", "CSTR.HASCHILDREN", "CSTR.PARENT", "CU.OBJECTVALUE")
				.from("CLASSIFICATION CLASS")
				.innerJoin("CLASSSTRUCTURE CSTR", "CLASS.CLASSIFICATIONID = CSTR.CLASSIFICATIONID")
				.innerJoin("CLASSUSEWITH CU", "CSTR.CLASSSTRUCTUREID=CU.CLASSSTRUCTUREID AND CU.OBJECTNAME IN ('ASSET','WORKORDER')");
		    	
			jsonObj = getSqlResultJson("CLASSSTRUCTURE", sql, pagination);
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
	
	@Action(value="getAssetAliasesJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAssetAliasesJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("PLUSTASSETALIASID","ALIAS", "ASSETNUM", "ISDEFAULT", "ISACTIVE", "ISASSETNUM", "DESCRIPTION", "ORGID", "SITEID")
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION")
				.from("PLUSTASSETALIAS")	
				.leftJoin("LONGDESCRIPTION LD", "PLUSTASSETALIASID = LD.LDKEY AND LD.LDOWNERTABLE='PLUSTASSETALIAS' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("SITEID = '" + this.user.getSiteId() + "'");
				
			System.out.println(sql);
			jsonObj = getSqlResultJson("PLUSTASSETALIAS", sql, pagination);
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
	
	@Action(value="getAssetLicensesJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAssetLicensesJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("PLUSTLICENSEID", "ASSETNUM", "DESCRIPTION", "ORGID", "SITEID", "LICENSENUM", "STARTDATE", "ENDDATE")
				.column("DBMS_LOB.SUBSTR(LD.LDTEXT, 3700) AS LONGDESCRIPTION")
				.from("PLUSTLICENSE")	
				.leftJoin("LONGDESCRIPTION LD", "PLUSTLICENSEID = LD.LDKEY AND LD.LDOWNERTABLE='PLUSTLICENSE' AND LD.LDOWNERCOL='DESCRIPTION'")
				.where("SITEID = '" + this.user.getSiteId() + "'");
				
			jsonObj = getSqlResultJson("PLUSTLICENSE", sql, pagination);
			System.out.println(sql);
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
	
	@Action(value="getAssetUsersJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAssetUsersJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("A.ASSETLOCUSERCUSTID", "A.ASSETNUM", "A.ISCUSTODIAN", "A.ORGID", "A.SITEID", "A.ISUSER", "A.AEPFLEETSUPERVISOR","A.ISPRIMARY", "A.PERSONID","P.DISPLAYNAME")
				//.column("AD.ISUSINGDEPT","AD.ISOWNINGDEPT","TO_CHAR(AD.AEPEFFECTIVEDATE,'YYYY-MM-DD') AS AEPEFFECTIVEDATE","AD.CUSTOMER")
				//.column("PL.NAME")
				.from("ASSETUSERCUST A")
				//.leftJoin("AEPASSETDEPT AD", "AD.ASSETNUM = A.ASSETNUM")
				//.innerJoin("PLUSPCUSTOMER PL", "AD.CUSTOMER = PL.CUSTOMER")
				.leftJoin("PERSON P","A.PERSONID = P.PERSONID")
				.where("A.SITEID = '" + this.user.getSiteId() + "'");
			
			System.out.println(sql);
			jsonObj = getSqlResultJson("ASSETUSERCUST", sql, pagination);
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
	
	
	@Action(value="getMaxUserJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getMaxUserJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("USERID", "PERSONID", "STATUS", "TYPE", "DEFSITE", "DEFSTOREROOM", "PASSWORD", "LOGINID", "MAXUSERID", "DEFAULTREPFACSITEID","DEFAULTREPFAC")
				.from("MAXUSER")	
				.where("DEFSITE = '" + this.user.getSiteId() + "'");
				
			 System.out.println(sql);  jsonObj = getSqlResultJson("MAXUSER", sql, pagination);
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
	
	@Action(value="getServrectransJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getServrectransJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
					.distinct()
					.column("W.WORKORDERID","W.PARENT AS PARENT")
					.column("ST.SERVRECTRANSID", "ST.REFWO AS WONUM")
					.column("ST.ITEMNUM", "ST.INVOICENUM", "ST.DESCRIPTION", "ST.QUANTITY")
					.column("ST.UNITCOST", "ST.LOADEDCOST", "ST.PLUSTHASWARRANTY")
					.column("ST.LOCATION", "ST.ASSETNUM")
					.column("ST.SITEID", "ST.ORGID") 
					.column("I.AEPPARTNUMBER")
					.from("WORKORDER W")
					.leftJoin("SERVRECTRANS ST", "W.WONUM = ST.REFWO AND W.SITEID = ST.SITEID")
					.innerJoin("INVOICELINE I", "ST.INVOICENUM = I.INVOICENUM AND ST.UNITCOST = I.UNITCOST AND ST.LINECOST = I.LINECOST AND ST.LINETYPE = 'SERVICE' AND ST.DESCRIPTION = I.DESCRIPTION")
					.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")				
					.and("W.SITEID = 'CORP'")
					.and(" W.STATUSDATE > SYSDATE-90")
					.orderBy("W.WORKORDERID", "ST.SERVRECTRANSID");		
				
			 System.out.println(sql);  jsonObj = getSqlResultJson("SERVRECTRANS", sql, pagination);
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
	@Action(value="getInvoiceLineJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getInvoiceLineJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("W.WORKORDERID","W.ACTSTART")
				.column("I.INVOICELINEID")
				.column("I.ITEMNUM", "I.AEPPARTNUMBER","I.INVOICELINENUM","I.SITEID")
				.from("WORKORDER W")
				.innerJoin("INVOICELINE I", "W.SITEID = I.SITEID")
				.where("W.STATUS NOT IN (" + new SelectQuery().distinct().column("VALUE").from("SYNONYMDOMAIN").where("DOMAINID = 'WOSTATUS' AND MAXVALUE IN ('CAN')").toString() + ")")				
				.and("W.SITEID = 'CORP'")
				.and(" W.STATUSDATE > SYSDATE-90")
				.and("I.AEPPARTNUMBER IS NOT NULL")
				.orderBy("W.WORKORDERID", "I.INVOICELINEID");		
				
			 System.out.println(sql);  jsonObj = getSqlResultJson("INVOICELINE", sql, pagination);
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
	@Action(value="getAepAssetDeptJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAepAssetDeptJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("AD.AEPASSETDEPTID","AD.ASSETNUM","AD.ISUSINGDEPT","AD.ISOWNINGDEPT","TO_CHAR(AD.AEPEFFECTIVEDATE,'YYYY-MM-DD') AS AEPEFFECTIVEDATE","AD.CUSTOMER","AD.SITEID")
				.column("PL.NAME")
				.from("AEPASSETDEPT AD")
				.leftJoin("PLUSPCUSTOMER PL", "AD.CUSTOMER = PL.CUSTOMER")
				.where("AD.SITEID = '" + this.user.getSiteId() + "'");
				
			 System.out.println(sql);  jsonObj = getSqlResultJson("AEPASSETDEPT", sql, pagination);
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
	
	@Action(value="getPlustCompJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getPlustCompJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("COMPONENT", "DESCRIPTION")
				.from("PLUSTCOMP")
				.where("STATUS = 'ACTIVE'");
				
			 System.out.println(sql);  jsonObj = getSqlResultJson("PLUSTCOMP", sql, pagination);
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
	
	@Action(value="getAEPMFGMAKEMODELJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getAEPMFGMAKEMODELJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			SelectQuery sql = new SelectQuery()
				.column("MODEL", "MANUFACTURER","MAKE")
				.from("AEPMFGMAKEMODEL")
				.where("ACTIVE = '1'");
				
			 System.out.println(sql);  jsonObj = getSqlResultJson("AEPMFGMAKEMODEL", sql, pagination);
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
	
	@Action(value="getLegacyAppDoctype",
		      results={
		                  @Result(name="success", type="stream", params={"inputName", "jsonResult"})
		                  }
		            )
		      public String getLegacyAppDoctype() {
		            JSONObject jsonObj = new JSONObject();
		            try {
		                  SelectQuery sql = new SelectQuery()
		                              .column("APPDOCTYPEID", "APP", "DOCTYPE")
		                              .from("APPDOCTYPE"); 

		                  jsonObj = getSqlResultJson("APPDOCTYPE", sql, pagination);
		                  
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

	
	public Pagination getPagination() {
        return pagination;
  }
  
  public void setPagination(Pagination pagination) {
        this.pagination = pagination;
  }
	/**
	 * Creates the InspectionResult Table: Values for all InspectionResult
	 */
	@Action(value="getMyInspectionResultJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyInspectionResultJson(){		
		JSONObject jsonObj = new JSONObject();
	 	SelectQuery insresultSql = new SelectQuery().column("MAX(I.INSPRESULTSTATUSID)").from("INSPRESULTSTATUS I").where("I.RESULTNUM = R.RESULTNUM AND I.ORGID = R.ORGID AND I.SITEID = R.SITEID");
	 	String statusJoin = "R.RESULTNUM = S.RESULTNUM AND R.ORGID = S.ORGID AND R.SITEID = S.SITEID AND S.INSPRESULTSTATUSID = (" + insresultSql + ")";
	
	    try {
    		SelectQuery sql =  new SelectQuery()
		 	.column("R.INSPECTIONRESULTID", "R.RESULTNUM", "R.REVISION", "R.ORGID", "R.SITEID")
		 	.column("R.INSPFORMNUM", "R.ASSET", "R.LOCATION", "R.STATUS", "R.REFERENCEOBJECT")
		 	.column("R.CREATEDBY", "R.CREATEDATE", "R.DUEDATE", "S.CHANGEDATE AS STATUSDATE", "R.REFERENCEOBJECTID")
		 	.column("R.PARENT", "R.FUPOBJECT", "R.FUPOBJECTID", "R.DISPLAYMESSAGE", "NULL AS DEFICIENCYLIST")
		 	.column("F.NAME")
			.from("INSPECTIONRESULT R")
			.leftJoin("INSPECTIONFORM F", "R.INSPFORMNUM = F.INSPFORMNUM AND R.REVISION = F.REVISION AND R.ORGID = F.ORGID")
			.leftJoin("INSPRESULTSTATUS S", statusJoin)
			.where("R.INSPECTIONRESULTID IN " + this.getIRCompleteWhere());	
    		
    		pagination.setReturnPageAll(true);
	    	jsonObj = getSqlResultJson("INSPECTIONRESULT", sql, pagination);
	    	
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
	
	private String getIRCompleteWhere(){
		String sql = " (SELECT DISTINCT * FROM ("
				+ this.getSqlIRParentandChildPrevious()
				+ " UNION "
				+ this.getSqlChildCurrent()
				+ ") IR )";
		return sql;
	}
	
	private String getSqlIRParentandChildPrevious() {
		SelectQuery woSql = new SelectQuery().column("WONUM")
 				.from("WORKORDER")
 				.where("WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"));
		return new SelectQuery()
			.distinct()
			.column("INSPECTIONRESULTID")
			.from("INSPECTIONRESULT")
			.where("(REFERENCEOBJECT IN ('PARENTWO')  OR (REFERENCEOBJECT ='WORKORDER' AND PARENT IS NULL ) ) AND REFERENCEOBJECTID IN (" + woSql + ")")
			.toString();
	}
	
	private String getSqlChildCurrent() {
		SelectQuery woSql = new SelectQuery().column("WONUM")
 				.from("WORKORDER")
 				.where("WORKORDERID IN " + this.getWOCompleteWhere("PLUSTWO"));
		
		return new SelectQuery()
			.distinct()
			.column("INSPECTIONRESULTID")
			.from("INSPECTIONRESULT")
			.where("REFERENCEOBJECT IN ('WORKORDER', 'WOACTIVITY', 'MULTIASSETLOCCI') AND PARENT IN (" + woSql + ")")
			.toString();
	}
	
	/**
	 * Creates the InspFieldResult Table: Values for all InspFieldResult
	 */
	@Action(value="getMyInspFieldResultJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMyInspFieldResultJson(){		
		JSONObject jsonObj = new JSONObject();
	    try {
    		SelectQuery sql = new SelectQuery()
	    	.column("R.INSPECTIONRESULTID", "FR.INSPFIELDRESULTID", "FR.INSPFIELDRESULTNUM", "FR.INSPFIELDNUM", "FR.INSPQUESTIONNUM")
			.column("FR.INSPFORMNUM", "FR.RESULTNUM", "FR.REVISION", "FR.ORGID", "FR.SITEID", "FR.ENTEREDBY", "FR.ENTEREDDATE")
			.column("FR.TXTRESPONSE", "FR.NUMRESPONSE", "FR.ERRORFLAG", "FR.ERRORMESSAGE", "FR.ROLLOVERFLAG", "FR.METERNAME")
			.column("IMG.IMAGE AS SIGNATURE", "IMG.IMAGENAME AS SIGNEDDATE", "FR.DATERESPONSE", "FR.TIMERESPONSE")
			.column("FR.FUPOBJECT", "FR.FUPOBJECTID", "FR.DISPLAYMESSAGE")
			.from("INSPFIELDRESULT FR")
			.leftJoin("INSPECTIONRESULT R", "FR.RESULTNUM = R.RESULTNUM AND FR.INSPFORMNUM = R.INSPFORMNUM AND FR.REVISION = R.REVISION")
			.leftJoin("IMGLIB IMG", "FR.INSPFIELDRESULTID = IMG.REFOBJECTID AND IMG.REFOBJECT = 'INSPFIELDRESULT'")
			.where("R.INSPECTIONRESULTID IN " + getIRCompleteWhere());	
    		
    		pagination.setReturnPageAll(true);
	    	jsonObj = getSqlResultJson("INSPFIELDRESULT", sql, pagination);	

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
		
	@Action(value="getMeasurementJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMeasurementJson(){		
		JSONObject jsonObj = new JSONObject();
	 	SelectQuery sql = null;
	    try {
	    	sql= new SelectQuery()
	    	.column("MEASUREMENTID, METERNAME, ASSETNUM, LOCATION, ORGID, SITEID, MEASUREMENTVALUE")
			.column("OBSERVATION, MEASUREDATE, INSPECTOR")
			.from("MEASUREMENT")
			.where("SITEID = '" + this.user.getSiteId()+ "'");
	    	
	    	jsonObj = getSqlResultJson("MEASUREMENT", sql, pagination);			
		
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
	
	@Action(value="getMeterReadingJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getMeterReadingJson(){		
		JSONObject jsonObj = new JSONObject();
		SelectQuery sql = null;
		try {
	    	sql= new SelectQuery()
	    	.column("METERREADINGID, METERNAME, ASSETNUM, ORGID, SITEID, READINGTYPE")
			.column("DELTA, READING, READINGDATE, INSPECTOR, DIDROLLOVER")
			.from("METERREADING")
			.where("SITEID = '" + this.user.getSiteId()+ "'")
			.and("ENTERDATE > SYSDATE-3");
	    	
	    	jsonObj = getSqlResultJson("METERREADING", sql, pagination);
	
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

	@Action(value="getLocMeterReadingJson",
            results={
                    @Result(name="success", type="stream", params={"inputName", "jsonResult"})
            }
    )
	public String getLocMeterReadingJson(){		
		JSONObject jsonObj = new JSONObject();
		SelectQuery sql = null;
		try {
	    	sql= new SelectQuery()
	    	.column("METERREADINGID, METERNAME, LOCATION, ORGID, SITEID, READINGTYPE")
			.column("DELTA, READING, READINGDATE, INSPECTOR, DIDROLLOVER")
			.from("LOCMETERREADING")
			.where("SITEID = '" + this.user.getSiteId()+ "'");
	    	
	    	jsonObj = getSqlResultJson("LOCMETERREADING", sql, pagination);	
		
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