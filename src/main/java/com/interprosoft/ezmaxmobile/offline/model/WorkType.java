/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.model;

import com.interprosoft.ezmaxmobile.common.model.BaseMaximoObject;

public class WorkType extends BaseMaximoObject {

	/** 	############################################################ 	//
	 * 		User Defined Offline MBO Object
	 * 		All Offline Object Properties Are Case-Sensitive
	 * 		Fields included (besides serialVersionUID) will be included as a column in the offline database
	 * 		############################################################		//
	 */
	
	private static final long serialVersionUID = 1L;
	
	/** Map to WORKTYPEID column in WORKTYPE table. */
	private int WORKTYPEID;
	
	/** Map to WORKTYPE column in WORKTYPE table. */
	private String WORKTYPE;
	
	/** Map to WTYPEDESC column in WORKTYPE table. */
	private String WTYPEDESC;
	
	/** Map to TYPE column in WORKTYPE table. */
	private String TYPE;

	public int getWORKTYPEID() {
		return WORKTYPEID;
	}

	public void setWORKTYPEID(int wORKTYPEID) {
		WORKTYPEID = wORKTYPEID;
	}

	public String getWORKTYPE() {
		return WORKTYPE;
	}

	public void setWORKTYPE(String wORKTYPE) {
		WORKTYPE = wORKTYPE;
	}

	public String getWTYPEDESC() {
		return WTYPEDESC;
	}

	public void setWTYPEDESC(String wTYPEDESC) {
		WTYPEDESC = wTYPEDESC;
	}

	public String getTYPE() {
		return TYPE;
	}

	public void setTYPE(String tYPE) {
		TYPE = tYPE;
	}
}
