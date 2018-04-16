/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.model;

import com.interprosoft.ezmaxmobile.common.model.BaseMaximoObject;

public class Craft extends BaseMaximoObject {

	/** 	############################################################ 	//
	 * 		User Defined Offline MBO Object
	 * 		All Offline Object Properties Are Case-Sensitive
	 * 		Fields included (besides serialVersionUID) will be included as a column in the offline database
	 * 		############################################################		//
	 */
	
	private static final long serialVersionUID = 1L;
	
	private int CRAFTID;
	
	private String CRAFT;
	
	private String DESCRIPTION;
	
	private String ORGID;

	public int getCRAFTID() {
		return CRAFTID;
	}

	public void setCRAFTID(int cRAFTID) {
		CRAFTID = cRAFTID;
	}

	public String getCRAFT() {
		return CRAFT;
	}

	public void setCRAFT(String cRAFT) {
		CRAFT = cRAFT;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}

	public String getORGID() {
		return ORGID;
	}

	public void setORGID(String oRGID) {
		ORGID = oRGID;
	}
	
}
