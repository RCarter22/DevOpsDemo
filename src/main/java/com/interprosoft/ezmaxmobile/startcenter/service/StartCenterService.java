/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.startcenter.service;

import java.util.List;

import psdi.mbo.MboRemote;

import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.model.TotalCount;
import com.interprosoft.ezmaxmobile.startcenter.model.Portlet;


public interface StartCenterService {	
	/**
	 * Get list of user portlets from start center
	 */	
	List<Portlet> getUserPortletsByAppName(String appName,long scconfigId) throws BaseMaximoException;
	List<Portlet> getUserPortletsByAppName(String appName,long scconfigId,boolean showCount) throws BaseMaximoException;
	
	/**
	 * Get list of user portlets from start center
	 */
	List<Portlet> getUserPortlets(long scconfigId) throws BaseMaximoException;
	List<Portlet> getUserPortlets(long scconfigId,boolean showCount) throws BaseMaximoException;
	
	List<MboRemote> getKPIGraphDataList(String kpiName) throws BaseMaximoException;
	
	List<MboRemote> getStartCenterList() throws BaseMaximoException;
	
	int getDefaultStartCenterID() throws BaseMaximoException;
	
	/**
	 * Get work order list from a queryId and tableName.  Used to get portlet result set
	 * @param queryId
	 * @param tbName
	 * @param start
	 * @param size
	 * @param totalCount
	 * @return list of work order from the result set query
	 * @throws WorkOrderException
	 */
	List<?> listByQueryId(int queryId, String tbName, int start, int size, String sortBy, String sortDir, TotalCount totalCount) throws BaseMaximoException;
	
	/**
	 * Get work order list from a queryId and tableName.  Used to get portlet result set
	 * @param queryId
	 * @param tbName
	 * @param start
	 * @param size
	 * @param totalCount
	 * @return list of work order from the result set query
	 * @throws WorkOrderException
	 */
	List<?> listMboByQueryId(int queryId, String tbName, int start, int size, String sortBy, String sortDir, TotalCount totalCount) throws BaseMaximoException;
}
