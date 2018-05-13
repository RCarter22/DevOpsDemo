/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.model;

import com.interprosoft.ezmaxmobile.common.model.BaseMaximoObject;

public class WorkOrder extends BaseMaximoObject {

	/** 	############################################################ 	//
	 * 		User Defined Offline MBO Object
	 * 		All Offline Object Properties Are Case-Sensitive
	 * 		Fields included (besides serialVersionUID) will be included as a column in the offline database
	 * 		############################################################		//
	 */
	
	private static final long serialVersionUID = 1L;
	
	/** Map to the workorderid in workorder table. */
	private int WORKORDERID;
	
	/** The number of work order object. */
	private String WONUM;
	
	private String PARENTID;
	
	private String PARENT;
	
	/** The description of work order. */
	private String DESCRIPTION;
	
	/** The longdescription of work order. */
	private String LONGDESCRIPTION;
	
	/** The location of work order. */
	private String LOCATION;
	
	private String ASSETNUM;
	
	private String PERSONGROUP;
	
	private String CREWID;
	
	private String SUPERVISOR;
	
	private String LEAD;
	
	private String PHONE;
	
	private String REPORTEDBY;
	
	// Date for offline must be defined with EMMDate data type
	private EMMDate REPORTDATE;
	
	private String STATUS;
	
	// Date for offline must be defined with EMMDate data type
	private EMMDate STATUSDATE;
	
	private int WOPRIORITY;
	
	private String WORKTYPE;
	
	private String FAILURECODE;
	
	private String PROBLEMCODE;
	
	private int ISTASK;

	private String ORIGRECORDID;
	
	private float ESTDUR;
	
	private String OBSERVATION;
	
	private float MEASUREMENTVALUE;

	/** Map to the taskid in workorder table. */
	private int TASKID;
	
	private String SITEID;
	
	private String ORGID;

	public int getWORKORDERID() {
		return WORKORDERID;
	}

	public void setWORKORDERID(int wORKORDERID) {
		WORKORDERID = wORKORDERID;
	}

	public String getWONUM() {
		return WONUM;
	}

	public void setWONUM(String wONUM) {
		WONUM = wONUM;
	}

	public String getPARENTID() {
		return PARENTID;
	}

	public void setPARENTID(String pARENTID) {
		PARENTID = pARENTID;
	}

	public String getPARENT() {
		return PARENT;
	}

	public void setPARENT(String pARENT) {
		PARENT = pARENT;
	}

	public String getDESCRIPTION() {
		return DESCRIPTION;
	}

	public void setDESCRIPTION(String dESCRIPTION) {
		DESCRIPTION = dESCRIPTION;
	}

	public String getLONGDESCRIPTION() {
		return LONGDESCRIPTION;
	}

	public void setLONGDESCRIPTION(String lONGDESCRIPTION) {
		LONGDESCRIPTION = lONGDESCRIPTION;
	}

	public String getLOCATION() {
		return LOCATION;
	}

	public void setLOCATION(String lOCATION) {
		LOCATION = lOCATION;
	}

	public String getASSETNUM() {
		return ASSETNUM;
	}

	public void setASSETNUM(String aSSETNUM) {
		ASSETNUM = aSSETNUM;
	}

	public String getPERSONGROUP() {
		return PERSONGROUP;
	}

	public void setPERSONGROUP(String pERSONGROUP) {
		PERSONGROUP = pERSONGROUP;
	}

	public String getCREWID() {
		return CREWID;
	}

	public void setCREWID(String cREWID) {
		CREWID = cREWID;
	}

	public String getSUPERVISOR() {
		return SUPERVISOR;
	}

	public void setSUPERVISOR(String sUPERVISOR) {
		SUPERVISOR = sUPERVISOR;
	}

	public String getLEAD() {
		return LEAD;
	}

	public void setLEAD(String lEAD) {
		LEAD = lEAD;
	}

	public String getPHONE() {
		return PHONE;
	}

	public void setPHONE(String pHONE) {
		PHONE = pHONE;
	}

	public String getREPORTEDBY() {
		return REPORTEDBY;
	}

	public void setREPORTEDBY(String rEPORTEDBY) {
		REPORTEDBY = rEPORTEDBY;
	}

	public EMMDate getREPORTDATE() {
		return REPORTDATE;
	}

	public void setREPORTDATE(EMMDate rEPORTDATE) {
		REPORTDATE = rEPORTDATE;
	}

	public String getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}

	public EMMDate getSTATUSDATE() {
		return STATUSDATE;
	}

	public void setSTATUSDATE(EMMDate sTATUSDATE) {
		STATUSDATE = sTATUSDATE;
	}

	public int getWOPRIORITY() {
		return WOPRIORITY;
	}

	public void setWOPRIORITY(int wOPRIORITY) {
		WOPRIORITY = wOPRIORITY;
	}

	public String getWORKTYPE() {
		return WORKTYPE;
	}

	public void setWORKTYPE(String wORKTYPE) {
		WORKTYPE = wORKTYPE;
	}

	public String getFAILURECODE() {
		return FAILURECODE;
	}

	public void setFAILURECODE(String fAILURECODE) {
		FAILURECODE = fAILURECODE;
	}

	public String getPROBLEMCODE() {
		return PROBLEMCODE;
	}

	public void setPROBLEMCODE(String pROBLEMCODE) {
		PROBLEMCODE = pROBLEMCODE;
	}

	public int getISTASK() {
		return ISTASK;
	}

	public void setISTASK(int iSTASK) {
		ISTASK = iSTASK;
	}

	public String getORIGRECORDID() {
		return ORIGRECORDID;
	}

	public void setORIGRECORDID(String oRIGRECORDID) {
		ORIGRECORDID = oRIGRECORDID;
	}

	public float getESTDUR() {
		return ESTDUR;
	}

	public void setESTDUR(float eSTDUR) {
		ESTDUR = eSTDUR;
	}

	public String getOBSERVATION() {
		return OBSERVATION;
	}

	public void setOBSERVATION(String oBSERVATION) {
		OBSERVATION = oBSERVATION;
	}

	public float getMEASUREMENTVALUE() {
		return MEASUREMENTVALUE;
	}

	public void setMEASUREMENTVALUE(float mEASUREMENTVALUE) {
		MEASUREMENTVALUE = mEASUREMENTVALUE;
	}

	public int getTASKID() {
		return TASKID;
	}

	public void setTASKID(int tASKID) {
		TASKID = tASKID;
	}

	public String getSITEID() {
		return SITEID;
	}

	public void setSITEID(String sITEID) {
		SITEID = sITEID;
	}

	public String getORGID() {
		return ORGID;
	}

	public void setORGID(String oRGID) {
		ORGID = oRGID;
	}
	
}
