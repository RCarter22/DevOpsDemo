/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.model;

import com.interprosoft.ezmaxmobile.common.model.BaseMaximoObject;

public class Labor extends BaseMaximoObject {

	/** 	############################################################ 	//
	 * 		User Defined Offline MBO Object
	 * 		All Offline Object Properties Are Case-Sensitive
	 * 		Fields included (besides serialVersionUID) will be included as a column in the offline database
	 * 		############################################################		//
	 */
	
	private static final long serialVersionUID = 1L;
	
	private int LABORID;
	
	private String LABORCODE;
	
	private String STATUS;
	
	private String PERSONID;

	private String DISPLAYNAME;

	private String CREWID;

	private String WORKLOCATION;
	
	private String WORKSITE;
	
	private String ORGID;

	public int getLABORID() {
		return LABORID;
	}

	public void setLABORID(int lABORID) {
		LABORID = lABORID;
	}

	public String getLABORCODE() {
		return LABORCODE;
	}

	public void setLABORCODE(String lABORCODE) {
		LABORCODE = lABORCODE;
	}

	public String getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}

	public String getPERSONID() {
		return PERSONID;
	}

	public void setPERSONID(String pERSONID) {
		PERSONID = pERSONID;
	}

	public String getDISPLAYNAME() {
		return DISPLAYNAME;
	}

	public void setDISPLAYNAME(String dISPLAYNAME) {
		DISPLAYNAME = dISPLAYNAME;
	}

	public String getCREWID() {
		return CREWID;
	}

	public void setCREWID(String cREWID) {
		CREWID = cREWID;
	}

	public String getWORKLOCATION() {
		return WORKLOCATION;
	}

	public void setWORKLOCATION(String wORKLOCATION) {
		WORKLOCATION = wORKLOCATION;
	}

	public String getWORKSITE() {
		return WORKSITE;
	}

	public void setWORKSITE(String wORKSITE) {
		WORKSITE = wORKSITE;
	}

	public String getORGID() {
		return ORGID;
	}

	public void setORGID(String oRGID) {
		ORGID = oRGID;
	}
	
}
