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

import com.interprosoft.ezmaxmobile.db.SelectQuery;
import com.interprosoft.ezmaxmobile.offline.OfflineException;
import com.interprosoft.ezmaxmobile.offline.model.EMMCacheSize;

@Component
@Scope("prototype")
@Namespace("/offline")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public class OfflineCachedDataProviderAction extends BaseOfflineInitAction {

	private static final long serialVersionUID = 1L;
	
	private static Log log = LogFactory.getLog(OfflineCachedDataProviderAction.class);
	
	// The Key of the CACHE object
	private static final String CACHE_KEY_LOCATIONS = "LOCATIONS";
	private static final String CACHE_KEY_PPCRAFTRATE = "PPCRAFTRATE";
	private static final String CACHE_KEY_FAILURECODE = "FAILURECODE";
	private static final String CACHE_KEY_STOREROOMS = "STOREROOM";
	private static final String CACHE_KEY_PERSONGROUP = "PERSONGROUP";
	private static final String CACHE_KEY_PERSONGROUPTEAM = "PERSONGROUPTEAM";
	private static final String CACHE_KEY_COMPANIES = "COMPANIES";
	private static final String CACHE_KEY_LABOR = "LABOR";
	private static final String CACHE_KEY_PERSON = "PERSON";
	private static final String CACHE_KEY_METERGROUP = "METERGROUP";
	private static final String CACHE_KEY_DOMAIN = "DOMAIN";
	private static final String CACHE_KEY_ISSUEUNIT = "ISSUEUNIT";
	private static final String CACHE_KEY_WORKTYPE = "WORKTYPE";
	private static final String CACHE_KEY_CRAFT = "CRAFT";
	private static final String CACHE_KEY_CRAFTRATE = "CRAFTRATE";
	private static final String CACHE_KEY_LABORCRAFTRATE = "LABORCRAFTRATE";
	private static final String CACHE_KEY_AMCREW = "AMCREW";
	private static final String CACHE_KEY_MEASUREPOINT = "MEASUREPOINT";
	private static final String CACHE_KEY_ASSETATTRIBUTE = "ASSETATTRIBUTE";
	private static final String CACHE_KEY_CLASSSTRUCTURE = "CLASSSTRUCTURE";
	private static final String CACHE_KEY_SPECDOMAIN = "SPECDOMAIN";
	private static final String CACHE_KEY_TOOLITEM = "TOOLITEM";
	private static final String CACHE_KEY_MEASUREUNIT  = "MEASUREUNIT";
	private static final String CACHE_KEY_PLUSPCUST = "PLUSPCUSTOMER";
	private static final String CACHE_KEY_PLUSPCUSTASSOC = "PLUSPCUSTASSOC";

	
//	 The size of each page of the CACHED object
	private static final EMMCacheSize CACHE_SIZE_LOCATIONS = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_PPCRAFTRATE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_FAILURECODE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_STOREROOMS = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_PERSONGROUP = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_PERSONGROUPTEAM = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_COMPANIES = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_LABOR = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_PERSON = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_METERGROUP = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_DOMAIN = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_ISSUEUNIT = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_WORKTYPE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_CRAFT = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_CRAFTRATE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_LABORCRAFTRATE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_AMCREW = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_MEASUREPOINT = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_ASSETATTRIBUTE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_CLASSSTRUCTURE = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_SPECDOMAIN = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_TOOLITEM = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_MEASUREUNIT = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_PLUSPCUST = EMMCacheSize.CACHE_SIZE_5000;
	private static final EMMCacheSize CACHE_SIZE_PLUSPCUSTASSOC = EMMCacheSize.CACHE_SIZE_5000;

	
	public void cacheLocations() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("LOC.LOCATIONSID", "LOC.LOCATION", "LOC.DESCRIPTION", "LOC.TYPE", "LOC.DISABLED", "LOC.STATUS", "LOC.ORGID", "LOC.SITEID")
			.column("LOCH.SYSTEMID", "LOCH.PARENT", "LOCH.CHILDREN AS HASCHILDREN")
			.from("LOCATIONS LOC", "LOCHIERARCHY LOCH")
			.where("LOC.STATUS IN (SELECT VALUE FROM SYNONYMDOMAIN WHERE DOMAINID = 'LOCASSETSTATUS' AND MAXVALUE IN ('OPERATING')) AND LOC.LOCATION = LOCH.LOCATION AND LOC.SITEID = LOCH.SITEID");

		cacheSqlResultJson(CACHE_KEY_LOCATIONS, sqlCache, CACHE_SIZE_LOCATIONS);
	}
	
	public void cacheStorerooms() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("LOCATIONSID", "LOCATION", "DESCRIPTION", "SITEID", "ORGID")
			.from("LOCATIONS")
			.where("TYPE = 'STOREROOM'");
		
		cacheSqlResultJson(CACHE_KEY_STOREROOMS, sqlCache, CACHE_SIZE_STOREROOMS);
	}	

	public void cachePPCraftRate() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("P.PPCRAFTRATEID", "P.CRAFT", "P.PREMIUMPAYCODE", "P.ORGID", "PP.DEFAULTRATE")
			.from("PPCRAFTRATE P")
			.leftJoin("PREMIUMPAY PP","P.PREMIUMPAYCODE = PP.PREMIUMPAYCODE AND P.ORGID = PP.ORGID");
		
		cacheSqlResultJson(CACHE_KEY_PPCRAFTRATE, sqlCache, CACHE_SIZE_PPCRAFTRATE);
	}
	
	public void cacheFailureCode() throws OfflineException {		
		SelectQuery sqlCache = new SelectQuery()
			.column("FAILURELIST.FAILURELIST", "FAILURELIST.FAILURECODE", "FAILURELIST.PARENT", "FAILURELIST.TYPE")
			.column("FAILURECODE.DESCRIPTION", "FAILURECODE.FAILURECODEID", "FAILURELIST.ORGID")
			.from("FAILURELIST")
			.innerJoin("FAILURECODE", "FAILURELIST.FAILURECODE = FAILURECODE.FAILURECODE AND FAILURELIST.ORGID = FAILURECODE.ORGID");
		
		cacheSqlResultJson(CACHE_KEY_FAILURECODE, sqlCache, CACHE_SIZE_FAILURECODE);
	}
	
	public void cachePersonGroup() throws OfflineException {		
		SelectQuery sqlCache = new SelectQuery()
			.column("PERSONGROUPID", "PERSONGROUP", "DESCRIPTION")
			.from("PERSONGROUP");
		
		cacheSqlResultJson(CACHE_KEY_PERSONGROUP, sqlCache, CACHE_SIZE_PERSONGROUP);
	}
	
	
	public void cacheCompanies() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("COMPANIESID", "COMPANY", "TYPE", "NAME", "DISABLED", "ORGID")
			.from("COMPANIES")
			.where("DISABLED = 0");
				
		cacheSqlResultJson(CACHE_KEY_COMPANIES, sqlCache, CACHE_SIZE_COMPANIES);
	}
	
	public void cacheLabor() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("L.LABORID", "L.LABORCODE", "L.STATUS", "L.PERSONID", "L.CREWID", "L.WORKLOCATION", "L.WORKSITE", "L.ORGID")
			.column("P.DISPLAYNAME")
			.from("LABOR L")
			.innerJoin("PERSON P", "L.PERSONID = P.PERSONID")
			.where("L.STATUS IN (SELECT VALUE FROM SYNONYMDOMAIN WHERE DOMAINID = 'LABORSTATUS' AND MAXVALUE IN ('ACTIVE'))")
			.orderBy("L.LABORCODE");
		
		cacheSqlResultJson(CACHE_KEY_LABOR, sqlCache, CACHE_SIZE_LABOR);
	}
	
	public void cachePerson() throws OfflineException {
		String laborSubSelect = new SelectQuery()
			.column("PERSONID")
			.from("LABOR")
			.where("STATUS IN (SELECT VALUE FROM SYNONYMDOMAIN WHERE DOMAINID = 'LABORSTATUS' AND MAXVALUE IN ('ACTIVE'))")
			.toString();
		
		SelectQuery sqlCache = new SelectQuery()
			.column("PERSONID", "DISPLAYNAME", "FIRSTNAME", "LASTNAME", "SUPERVISOR", "STATUS")
			.from("PERSON")
			.where("STATUS IN (SELECT VALUE FROM SYNONYMDOMAIN WHERE DOMAINID = 'PERSONSTATUS' AND MAXVALUE IN ('ACTIVE'))")
			.and("PERSONID IN (" + laborSubSelect + ")")
			.orderBy("DISPLAYNAME", "PERSONID");
				
		cacheSqlResultJson(CACHE_KEY_PERSON, sqlCache, CACHE_SIZE_PERSON);
	}
	
	public void cacheAllMeterGroup() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
	    	.column("GROUPNAME", "DESCRIPTION", "METERGROUPID")
			.from("METERGROUP")
			.orderBy("METERGROUPID");
				
		cacheSqlResultJson(CACHE_KEY_METERGROUP, sqlCache, CACHE_SIZE_METERGROUP);
	}
	
	public void cacheDomain() throws OfflineException {
		SelectQuery alnDomain = new SelectQuery()
			.column("DOMAINID")
			.column("NULL AS MAXVALUE")
			.column("VALUE")
			.column("DESCRIPTION")
			.column("SITEID")
			.column("ORGID")
			.column("PLUSPCUSTOMER")
			.from("ALNDOMAIN")
			.where("DOMAINID IN ('CREWID', 'SKILLLEVEL','DOWNCODE','PLUSTCOMP','PLUSTACCOMPLISHED','PLUSTREASON','AEPMAKE') OR DOMAINID IN (" + new SelectQuery().distinct().column("DOMAINID").from("METER").where("DOMAINID IS NOT NULL").toString() + ")");
		
		SelectQuery synonymDomain = new SelectQuery()
			.column("DOMAINID")
			.columnAsString("MAXVALUE")
			.columnAsString("VALUE")
			.column("DESCRIPTION")
			.column("SITEID")
			.column("ORGID")
			.column("PLUSPCUSTOMER")
			.from("SYNONYMDOMAIN")
			.where("DOMAINID IN ('WOSTATUS', 'ITEMSTATUS', 'LOGTYPE', 'CATEGORY', 'LOCASSETSTATUS', 'ASSETTYPE', 'SRSTATUS', 'LTTYPE', 'REPAIRFACILITY')");
	    	
		SelectQuery numericDomain = new SelectQuery()
			.column("DOMAINID")
			.column("NULL AS MAXVALUE")
			.columnAsString("VALUE", 10)
			.column("DESCRIPTION")
			.column("SITEID")
			.column("ORGID")
			.column("PLUSPCUSTOMER")
			.from("NUMERICDOMAIN")
			.where("DOMAINID IN ('TICKETPRIORITY')");
		
		SelectQuery sqlCache = new SelectQuery()
			.union(alnDomain, synonymDomain, numericDomain);
		System.out.println(sqlCache);

		cacheSqlResultJson(CACHE_KEY_DOMAIN, sqlCache, CACHE_SIZE_DOMAIN);
	}
	public void cacheIssueUnit() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.distinct()
			.column("MEASUREUNITID")
			.column("ABBREVIATION")
			.column("DESCRIPTION")
			.from("MEASUREUNIT");
				
		cacheSqlResultJson(CACHE_KEY_ISSUEUNIT, sqlCache, CACHE_SIZE_ISSUEUNIT);
	}
	
	public void cacheWorktype() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("WORKTYPEID", "WORKTYPE", "TYPE", "WTYPEDESC", "ORGID")
			.from("WORKTYPE");
		
		cacheSqlResultJson(CACHE_KEY_WORKTYPE, sqlCache, CACHE_SIZE_WORKTYPE);
	}
	
	public void cacheCraft() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("CRAFTID", "CRAFT", "DESCRIPTION", "ORGID")
			.from("CRAFT");

		cacheSqlResultJson(CACHE_KEY_CRAFT, sqlCache, CACHE_SIZE_CRAFT);
	}
	
	public void cacheCraftRate() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("CRAFTRATEID", "CRAFT", "SKILLLEVEL", "VENDOR", "STANDARDRATE", "ORGID")
			.from("CRAFTRATE")
			.where("CONTRACTNUM IS NULL");

		cacheSqlResultJson(CACHE_KEY_CRAFTRATE, sqlCache, CACHE_SIZE_CRAFTRATE);
	}
	
	public void cacheLaborCraftRate() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("LCR.LABORCRAFTRATEID", "LCR.LABORCODE", "LCR.CRAFT", "CR.DESCRIPTION AS CRAFTDESC", "LCR.DEFAULTCRAFT")
			.column("LCR.RATE", "LCR.SKILLLEVEL", "CS.DESCRIPTION AS SKILLLEVELDESC", "LCR.GLACCOUNT", "LCR.ORGID")
			.from("LABORCRAFTRATE LCR")
			.leftJoin("CRAFT CR", "LCR.CRAFT = CR.CRAFT AND LCR.ORGID = CR.ORGID")
			.leftJoin("CRAFTSKILL CS", "LCR.CRAFT = CS.CRAFT AND LCR.SKILLLEVEL = CS.SKILLLEVEL AND LCR.ORGID = CS.ORGID");

		cacheSqlResultJson(CACHE_KEY_LABORCRAFTRATE, sqlCache, CACHE_SIZE_LABORCRAFTRATE);
	}
	
	public void cachePersonGroupTeam() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("PERSONGROUPTEAMID", "PERSONGROUP", "RESPPARTY","RESPPARTYGROUP")
	        .from("PERSONGROUPTEAM");

		cacheSqlResultJson(CACHE_KEY_PERSONGROUPTEAM, sqlCache, CACHE_SIZE_PERSONGROUPTEAM);
	}
	
	public void cacheAMCrew() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("AMCREWID", "AMCREW", "DESCRIPTION", "ORGID","AMCREWTYPE")
			.from("AMCREW");	
		
		cacheSqlResultJson(CACHE_KEY_AMCREW, sqlCache, CACHE_SIZE_AMCREW);
	}
	
	public void cacheMeasurePoint() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
	    	.column("MEASUREPOINTID", "POINTNUM", "METERNAME")
	    	.column("ASSETNUM", "LOCATION", "DESCRIPTION")
	    	.column("LOWERWARNING", "LOWERACTION", "UPPERWARNING", "UPPERACTION")
	    	.column("SITEID", "ORGID")
			.from("MEASUREPOINT")
			.orderBy("MEASUREPOINTID");

		cacheSqlResultJson(CACHE_KEY_MEASUREPOINT, sqlCache, CACHE_SIZE_MEASUREPOINT);
	}
	
	public void cacheSpecDomain() throws OfflineException {
		
		SelectQuery alnSpecDomain = new SelectQuery()
			.column("DISTINCT CS.DOMAINID", "ALD.DESCRIPTION")
			.column("MXD.DOMAINTYPE")
			.column("ALD.VALUE")
			.from("ALNDOMAIN ALD")
			.leftJoin("CLASSSPEC CS", "ALD.DOMAINID = CS.DOMAINID")
			.leftJoin("MAXDOMAIN MXD", "CS.DOMAINID = MXD.DOMAINID")
			.where("CS.DOMAINID IS NOT NULL AND MXD.DOMAINTYPE ='ALN'");
		
		SelectQuery numericSpecDomain = new SelectQuery()
			.column("DISTINCT CS.DOMAINID", "ND.DESCRIPTION")
			.column("MXD.DOMAINTYPE")
			.columnAsString("ND.VALUE", 10)
			.from("NUMERICDOMAIN ND")
			.leftJoin("CLASSSPEC CS", "ND.DOMAINID = CS.DOMAINID")
			.leftJoin("MAXDOMAIN MXD", "CS.DOMAINID = MXD.DOMAINID")
			.where("CS.DOMAINID IS NOT NULL AND MXD.DOMAINTYPE ='NUMERIC'");
		
		
		SelectQuery sqlCache = new SelectQuery()
			.union(alnSpecDomain, numericSpecDomain);
				
		cacheSqlResultJson(CACHE_KEY_SPECDOMAIN, sqlCache, CACHE_SIZE_SPECDOMAIN);
	}
	
	public void cacheAssetAttribute() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("CS.ASSETATTRID", "AT.DESCRIPTION", "AT.DATATYPE", "CS.MEASUREUNITID", "CS.DOMAINID", "CS.ASSETATTRIBUTEID")
			.column("CS.CLASSSTRUCTUREID", "CSU.OBJECTVALUE", "CSU.MANDATORY", "CSU.SEQUENCE", "CS.SITEID", "CSU.DEFAULTALNVALUE", "CSU.DEFAULTNUMVALUE")
			.from("ASSETATTRIBUTE AT")
			.innerJoin("CLASSSPEC CS", "CS.ASSETATTRIBUTEID = AT.ASSETATTRIBUTEID")
			.leftJoin("CLASSSPECUSEWITH CSU", "CSU.CLASSSPECID=CS.CLASSSPECID AND CS.ASSETATTRID=CSU.ASSETATTRID AND CS.CLASSSTRUCTUREID=CSU.CLASSSTRUCTUREID");

		cacheSqlResultJson(CACHE_KEY_ASSETATTRIBUTE, sqlCache, CACHE_SIZE_ASSETATTRIBUTE);
	}

	public void cacheClassStructure() throws OfflineException {
		//How Filter Site?
		SelectQuery sqlCache = new SelectQuery()
			.column("CLASS.DESCRIPTION", "CLASS.CLASSIFICATIONUID", "CSTR.CLASSSTRUCTUREID", "CSTR.ORGID", "CSTR.GENASSETDESC")
			.column("CSTR.SITEID", "CSTR.CLASSIFICATIONID", "CSTR.HASCHILDREN", "CSTR.PARENT", "CU.OBJECTVALUE")
			.from("CLASSIFICATION CLASS")
			.innerJoin("CLASSSTRUCTURE CSTR", "CLASS.CLASSIFICATIONID = CSTR.CLASSIFICATIONID")
			.innerJoin("CLASSUSEWITH CU", "CSTR.CLASSSTRUCTUREID=CU.CLASSSTRUCTUREID");

		cacheSqlResultJson(CACHE_KEY_CLASSSTRUCTURE, sqlCache, CACHE_SIZE_CLASSSTRUCTURE);
	}
	public void cacheToolItem() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("TI.ITEMNUM", "TI.DESCRIPTION", "TI.ITEMSETID", "TI.ITEMTYPE", "IT.ORGID", "IT.TOOLRATE")
			.from("TOOLITEM TI")
			.innerJoin("ITEMORGINFO IT", "TI.ITEMNUM = IT.ITEMNUM AND TI.ITEMSETID = IT.ITEMSETID")
			.where("TI.STATUS IN (SELECT VALUE FROM SYNONYMDOMAIN WHERE DOMAINID = 'ITEMSTATUS' AND MAXVALUE IN ('ACTIVE')) AND IT.STATUS IN (SELECT VALUE FROM SYNONYMDOMAIN WHERE DOMAINID = 'ITEMSTATUS' AND MAXVALUE IN ('ACTIVE')) AND TI.ITEMTYPE ='TOOL'");
		
		cacheSqlResultJson(CACHE_KEY_TOOLITEM, sqlCache, CACHE_SIZE_TOOLITEM);
	}
	
	public void cacheMeasureUnit() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("MEASUREUNITUID","MEASUREUNITID","ABBREVIATION","DESCRIPTION","ORGID","SITEID")
			.from("MEASUREUNIT");
		
		cacheSqlResultJson(CACHE_KEY_MEASUREUNIT, sqlCache, CACHE_SIZE_MEASUREUNIT);
	}
	
	public void cachePlusPCustomer() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("CUSTOMER,PARENT,NAME")
			.from("PLUSPCUSTOMER")
			.where("STATUS = 'ACTIVE'");	
		
		 cacheSqlResultJson(CACHE_KEY_PLUSPCUST, sqlCache, CACHE_SIZE_PLUSPCUST);
	}

	public void cachePlusPCustAssoc() throws OfflineException {
		SelectQuery sqlCache = new SelectQuery()
			.column("CUSTOMER,OWNERTABLE,OWNERID")
			.from("PLUSPCUSTASSOC")
			.where("OWNERTABLE = 'CLASSSTRUCTURE'");
		
		 cacheSqlResultJson(CACHE_KEY_PLUSPCUSTASSOC, sqlCache, CACHE_SIZE_PLUSPCUSTASSOC);
	}
	
	// #####################################################################################################################################	//
	// The Following Section is for Legacy Synchronization Process
	// #####################################################################################################################################	//

	/**
	 * Legacy call to get cached Domain JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedDomainJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedDomainJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_DOMAIN, pagination);
			System.out.println(jsonObj);
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

	/**
	 * Legacy call to get cached PLUSPCUSTOMER JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedPlusPCustomerJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedPlusPCustomerJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_PLUSPCUST, pagination);
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
	
	/**
	 * Legacy call to get cached PLUSPCUSTASSOC JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedPlusPCustAssocJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedPlusPCustAssocJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_PLUSPCUSTASSOC, pagination);
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
	
	/**
	 * Legacy call to get cached MEASUREUNIT JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedMeasureUnitJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedMeasureUnitJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_MEASUREUNIT, pagination);
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
	
	/**
	 * Legacy call to get cached Asset Attribute JSON result
	 * @return
	 */
	@Action(value="getLegacyAssetAttributeJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyAssetAttributeJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_ASSETATTRIBUTE, pagination);
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

	/**
	 * Legacy call to get cached Asset Attribute JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedSpecDomainJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedSpecDomainJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_SPECDOMAIN, pagination);
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
	
	/**
	 * Legacy call to get cached PersonGroupTeam JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedPersonGroupTeamJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
		}
	)
	public String getLegacyCachedPersonGroupTeamJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_PERSONGROUPTEAM, pagination);
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
	
	/**
	 * Legacy call to get cached Craft JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedCraftJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedCraftJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_CRAFT, pagination);
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
	
	/**
	 * Legacy call to get cached Worktype JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedWorktypeJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedWorktypeJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_WORKTYPE, pagination);
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
	
	/**
	 * Legacy call to get cached Storerooms JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedStoreroomsJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedStoreroomsJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_STOREROOMS, pagination);
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
	
	/**
	 * Legacy call to get cached AMCrew JSON result
	 * @return
	 */
	@Action(value="getLegacyCachedAMCrewJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLegacyCachedAMCrewJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getCachedSqlResultJson(CACHE_KEY_AMCREW, pagination);
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
	
}