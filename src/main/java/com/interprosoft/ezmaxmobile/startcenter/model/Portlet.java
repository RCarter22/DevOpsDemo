/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.startcenter.model;

public class Portlet {

	private String portletType;
	
	private long recordCount;
	
	private long id;
	
	private String appName;
	
	private String title;
	
	private String mboName;

	public Portlet(){		
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public void setPortletType(String portletType) {
		this.portletType = portletType;
	}

	public String getPortletType() {
		return portletType;
	}

	public void setRecordCount(long recordCount) {
		this.recordCount = recordCount;
	}


	public long getRecordCount() {
		return recordCount;
	}


	public void setId(long id) {
		this.id = id;
	}


	public long getId() {
		return id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public String getMboName() {
		return mboName;
	}

	public void setMboName(String mboName) {
		this.mboName = mboName;
	}
}
