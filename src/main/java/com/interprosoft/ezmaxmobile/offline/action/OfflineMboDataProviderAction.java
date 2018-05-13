/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.action;

import java.io.ByteArrayInputStream;
import java.util.List;

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

import com.interprosoft.ezmaxmobile.offline.model.Craft;
import com.interprosoft.ezmaxmobile.offline.translator.CraftMboTranslator;

@Component
@Scope("prototype")
@Namespace("/offline")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public class OfflineMboDataProviderAction extends BaseOfflineInitAction {
	
	private static final long serialVersionUID = 1L;
	
	private static Log log = LogFactory.getLog(OfflineMboDataProviderAction.class);
	
//	@Action(value="getWorkTypeJson",
//			results={
//				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
//			}
//		)
//	public String getWorkTypeJson() {
//		JSONObject jsonObj = new JSONObject();
//		try {
//			// Set MBO user
//			mboTemplate.setUser(this.user);
//			// Set the MBO to retrieve data from
//			mboTemplate.setMboName("WORKTYPE");
//			// Set the User Defined MBO translator that holds the temporary MBO data
//			mboTemplate.setTranslator(new WorkTypeMboTranslator());
//
//			/** 	Get Work Type list from MBO 
//			 ** 	Returns a list of WorkType models */
//			Map<String, String> mapParams = new HashMap<String, String>();
//			mapParams.put("ORGID", this.user.getOrgId());
//			mapParams.put("WOCLASS", "WORKORDER");
//			
//			List<Object> listObjs = mboTemplate.list(mapParams, pagination);
//			
//			// Convert object properties to the names and types specified in "offlineconfig.xml" file 
//			jsonObj = convertObjListToJson("WORKTYPE", listObjs, WorkType.class);
//			// Insert PAGINATION
//			jsonObj.element("PAGINATION", pagination);
//		} catch(Exception ex) {
//			jsonObj.element("errMsg", ex.getMessage());
//		}
//		
//		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
//		log.debug("json: " + jsonObj.toString());
//		return SUCCESS; 
//	}
//	
//	@Action(value="getCraftJson",
//			results={
//				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
//			}
//		)
//	public String getCraftJson() {
//		JSONObject jsonObj = new JSONObject();
//		try {
//			// Set MBO user
//			mboTemplate.setUser(this.user);
//			// Set the MBO to retrieve data from
//			mboTemplate.setMboName("CRAFT");
//			// Set the User Defined MBO translator that holds the temporary MBO data
//			mboTemplate.setTranslator(new CraftMboTranslator());
//
//			/** 	Get craft list from MBO 
//			 ** 	Returns a list of Craft models
//			 **	We are limiting returning Crafts belong to the OrgId of the signed in user */
//			List<Object> listObjs = mboTemplate.list("ORGID", this.user.getOrgId(), pagination);
//			// Convert object properties to the names and types specified in "offlineconfig.xml" file 
//			jsonObj = convertObjListToJson("CRAFT", listObjs, Craft.class);
//			// Insert PAGINATION
//			jsonObj.element("PAGINATION", pagination);
//		} catch(Exception ex) {
//			jsonObj.element("errMsg", ex.getMessage());
//		}
//		
//		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
//		log.debug("json: " + jsonObj.toString());
//		return SUCCESS; 
//	}
//	
//	@Action(value="getLaborJson",
//			results={
//				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
//			}
//		)
//	public String getLaborJson() {
//		JSONObject jsonObj = new JSONObject();
//		try {
//			// Set MBO user
//			mboTemplate.setUser(this.user);
//			// Set the MBO to retrieve data from
//			mboTemplate.setMboName("LABOR");
//			// Set the User Defined MBO translator that holds the temporary MBO data
//			mboTemplate.setTranslator(new LaborMboTranslator());
//
//			/** 	Get labor list from MBO 
//			 ** 	Returns a list of Labor models
//			 **	We are limiting returning Labors belong to the OrgId of the signed in user */
//			Map<String, String> mapParams = new HashMap<String, String>();
//			mapParams.put("ORGID", this.user.getOrgId());
//			mapParams.put("STATUS", "ACTIVE");
//			
//			List<Object> listObjs = mboTemplate.list(mapParams, pagination);
//			// Convert object properties to the names and types specified in "offlineconfig.xml" file 
//			jsonObj = convertObjListToJson("LABOR", listObjs, Labor.class);
//			// Insert PAGINATION
//			jsonObj.element("PAGINATION", pagination);
//		} catch(Exception ex) {
//			jsonObj.element("errMsg", ex.getMessage());
//		}
//		
//		jsonResult = new ByteArrayInputStream(jsonObj.toString().getBytes());
//		log.debug("json: " + jsonObj.toString());
//		return SUCCESS; 
//	}	
	
}
