/*******************************************************************************
 * Copyright (c) 2015 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.pluspasset.action;

import java.io.ByteArrayInputStream;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.db.SelectQuery;
import com.interprosoft.ezmaxmobile.db.service.DatabaseService;

@Component
@Scope("prototype")
@Namespace("/pluspasset/ws")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusPAssetWebService  extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Autowired
	public DatabaseService dbService;	
	
	@Action(value="assets",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String assets() {
		JSONArray json = new JSONArray();
		try {	
			Object xmin = request.getParameter("xmin"), xmax = request.getParameter("xmax"), ymin = request.getParameter("ymin"), ymax = request.getParameter("ymax");		
			
			if (xmin != null && xmax != null && ymin != null && ymax != null){
				MboSetRemote mboSetRemote = (MboSetRemote)this.getSessionObject(EMMConstants.CURRENTMBOSET);
				if (mboSetRemote != null){
					String where = mboSetRemote.getCompleteWhere();
					SelectQuery sql = new SelectQuery()
						.column("ASSETUID, ASSETNUM, DESCRIPTION, LOCATION, STATUS, Y, X")
						.from("ASSET")
						.where(where);
					
					double xminDbl = Double.parseDouble(xmin.toString());
					double xmaxDbl = Double.parseDouble(xmax.toString());
					double yminDbl = Double.parseDouble(ymin.toString());
					double ymaxDbl = Double.parseDouble(ymax.toString());
					
					String search = request.getParameter("search");
					if (search != null)												
						sql.and("(DESCRIPTION like '%" + search + "%' OR ASSETNUM like '%" + search + "%')")
							.and("X IS NOT NULL AND Y IS NOT NULL");
					else {
						sql.and("X BETWEEN " + xminDbl + " AND " + xmaxDbl).and("Y BETWEEN " + yminDbl + " AND " + ymaxDbl);
					}	
					
					json = dbService.queryToJSON(sql);					
				}
			}
			
		} catch(Exception ex) {
			JSONObject jsonObj = new JSONObject();
			jsonObj.element("errMsg", ex.getMessage());
			this.setJsonResult(new ByteArrayInputStream(jsonObj.toString().getBytes()));
			return SUCCESS; 
		}
		this.setJsonResult(new ByteArrayInputStream(json.toString().getBytes()));
		return SUCCESS; 
	}		
	
	@Action(value="assetlookup",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String assetlookup() {
		JSONArray json = new JSONArray();
		try {	
			Object xmin = request.getParameter("xmin"), xmax = request.getParameter("xmax"), ymin = request.getParameter("ymin"), ymax = request.getParameter("ymax");
			if (xmin != null && xmax != null && ymin != null && ymax != null){
				MboRemote mboRemote = (MboRemote)this.getSessionObject(this.getSessionValueByName(EMMConstants.CURRENTMBONAME));
				if (mboRemote != null){
					String where = mboRemote.getList("ASSETNUM").getCompleteWhere();				
					SelectQuery sql = new SelectQuery()
						.column("ASSETUID, ASSETNUM, DESCRIPTION, LOCATION, STATUS, Y, X")
						.from("ASSET")
						.where(where);
					
					String search = request.getParameter("search");
					if (search != null)												
						sql.and("(DESCRIPTION like '%" + search + "%' OR ASSETNUM like '%" + search + "%')")
							.and("X IS NOT NULL AND Y IS NOT NULL");
					else {
						sql.and("X BETWEEN " + xmin + " AND " + xmax).and("Y BETWEEN " + ymin + " AND " + ymax);
					}							
					
					json = dbService.queryToJSON(sql);
				}
			}
		} catch(Exception ex) {
			JSONObject jsonObj = new JSONObject();
			jsonObj.element("errMsg", ex.getMessage());
			this.setJsonResult(new ByteArrayInputStream(jsonObj.toString().getBytes()));
			return SUCCESS; 
		}
		this.setJsonResult(new ByteArrayInputStream(json.toString().getBytes()));
		return SUCCESS; 
	}	
	
	@Action(value="locationlookup",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
			}
		)
	public String locationlookup() {
		JSONArray json = new JSONArray();
		try {	
			Object xmin = request.getParameter("xmin"), xmax = request.getParameter("xmax"), ymin = request.getParameter("ymin"), ymax = request.getParameter("ymax");
			if (xmin != null && xmax != null && ymin != null && ymax != null){
				MboRemote mboRemote = (MboRemote)this.getSessionObject(this.getSessionValueByName(EMMConstants.CURRENTMBONAME));
				if (mboRemote != null){
					String where = mboRemote.getList("LOCATION").getCompleteWhere();
					SelectQuery sql = new SelectQuery()
						.column("LOCATIONSID, LOCATION, DESCRIPTION, STATUS, Y, X")
						.from("LOCATIONS")
						.where(where);

					String search = request.getParameter("search");
					if (search != null)
						sql.and("(DESCRIPTION like '%" + search + "%' OR LOCATION like '%" + search + "%')")
							.and("X IS NOT NULL AND Y IS NOT NULL");
					else {
						sql.and("X BETWEEN " + xmin + " AND " + xmax).and("Y BETWEEN " + ymin + " AND " + ymax);
					}					
				
					json = dbService.queryToJSON(sql);					
				}
			}
		} catch(Exception ex) {
			JSONObject jsonObj = new JSONObject();
			jsonObj.element("errMsg", ex.getMessage());
			this.setJsonResult(new ByteArrayInputStream(jsonObj.toString().getBytes()));
			return SUCCESS; 
		}
		this.setJsonResult(new ByteArrayInputStream(json.toString().getBytes()));
		return SUCCESS; 
	}		
	
}
