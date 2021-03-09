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

@Component
@Scope("prototype")
@Namespace("/offline")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public class OfflineDomainDataProviderAction extends BaseOfflineInitAction {

	private static final long serialVersionUID = 1L;
	
	private static Logger log = Logger.getLogger(OfflineDomainDataProviderAction.class);
	
	@Action(value="getWOStatusListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getWOStatusListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			/** All Work Status list. */
			if (!user.isMaxAdmin()) {
				// For Non-Maxadmin... we may want to filter out some statuses
				
				// String filterStatus = MaximoHelper.getInstance().getChangeStatusFilter();
				// if (filterStatus != null && !filterStatus.equalsIgnoreCase("")) {
				//	String[] filterStatuses = filterStatus.split(",");
				//	List listExcludeStatus = Arrays.asList(filterStatuses);
				
				jsonObj = getStdDomainValuesJson("WOSTATUSLIST", "WOSTATUS",  "VALUE", "ASC", pagination);
				//} else {
				//	jsonObj = getStdDomainValuesJson("WOSTATUSLIST", "WOSTATUS",  "VALUE", "ASC", pagination);
				//}					
			} else {
				jsonObj = getStdDomainValuesJson("WOSTATUSLIST", "WOSTATUS",  "VALUE", "ASC", pagination);
			}
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		log.debug("json: " + jsonObj.toString());
		return SUCCESS; 
	}
	
	@Action(value="getItemStatusListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getItemStatusListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = getStdDomainValuesJson("ITEMSTATUSLIST", "ITEMSTATUS",  "VALUE", "ASC", pagination);
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		log.debug("json: " + jsonObj.toString());
		return SUCCESS; 
	}
	
	@Action(value="getWOPriorityListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getWOPriorityListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			/** All WO Priority list. */
			jsonObj = getStdDomainValuesJson("WOPRIORITYLIST", "WOPRIORITY",  "VALUE", "ASC", pagination);
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		log.debug("json: " + jsonObj.toString());
		return SUCCESS; 
	}
	
	@Action(value="getCrewIdListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getCrewIdListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			/** All Crew ID list. */
			jsonObj = getStdDomainValuesJson("CREWIDLIST", "CREWID",  "VALUE", "ASC", pagination);
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		log.debug("json: " + jsonObj.toString());
		return SUCCESS; 
	}
	
	@Action(value="getLogTypeListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getLogTypeListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			/** All Log Type list. */
			jsonObj = getStdDomainValuesJson("LOGTYPELIST", "LOGTYPE",  "VALUE", "ASC", pagination);
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		log.debug("json: " + jsonObj.toString());
		return SUCCESS; 
	}
	
	@Action(value="getCategoryListJson",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String getCategoryListJson() {
		JSONObject jsonObj = new JSONObject();
		try {
			/** All Category list. */
			jsonObj = getStdDomainValuesJson("CATEGORYLIST", "CATEGORY",  "VALUE", "ASC", pagination);
			// Insert PAGINATION
			jsonObj.element("PAGINATION", pagination);
		} catch(Exception ex) {
			jsonObj.element("errMsg", ex.getMessage());
		}
		
		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
		log.debug("json: " + jsonObj.toString());
		return SUCCESS; 
	}
}
