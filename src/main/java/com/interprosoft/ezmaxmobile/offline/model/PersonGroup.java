/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.model;

import com.interprosoft.ezmaxmobile.common.model.BaseMaximoObject;

public class PersonGroup extends BaseMaximoObject {

	/** 	############################################################ 	//
	 * 		User Defined Offline MBO Object
	 * 		All Offline Object Properties Are Case-Sensitive
	 * 		Fields included (besides serialVersionUID) will be included as a column in the offline database
	 * 		############################################################		//
	 */
	
	private static final long serialVersionUID = 1L;
	
	private int PERSONGROUPID;
	
	private String PERSONGROUP;
	
	private String DESCRIPTION;

	public int getPERSONGROUPID() {
		return PERSONGROUPID;
	}

	public void setPERSONGROUPID(int pERSONGROUPID) {
		PERSONGROUPID = pERSONGROUPID;
	}

	public String getPERSONGROUP() {
		return PERSONGROUP;
	}

	public void setPERSONGROUP(String pERSONGROUP) {
		PERSONGROUP = pERSONGROUP;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}
	
}
