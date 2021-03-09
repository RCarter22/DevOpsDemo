/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.translator;

import java.rmi.RemoteException;

import org.apache.log4j.Logger;

import psdi.mbo.MboRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.mbo.MboTranslator;
import com.interprosoft.ezmaxmobile.offline.model.EMMDate;
import com.interprosoft.ezmaxmobile.offline.model.WorkOrder;

public class WorkOrderMboTranslator implements MboTranslator {

	private static Logger log = Logger.getLogger(WorkOrderMboTranslator.class);
	
	public Object translate(MboRemote mbo) throws MXException, RemoteException {
		return translate(mbo,false);
	}
	
	public Object translate(MboRemote mbo,boolean includeRelation) throws MXException, RemoteException {
		WorkOrder wo = new WorkOrder();

		wo.setWORKORDERID(mbo.getInt("WORKORDERID"));
		wo.setWONUM(mbo.getString("WONUM"));
		wo.setPARENT(mbo.getString("PARENT"));
		wo.setDESCRIPTION(mbo.getString("DESCRIPTION"));
		wo.setLONGDESCRIPTION(mbo.getString("DESCRIPTION_LONGDESCRIPTION"));
		wo.setLOCATION(mbo.getString("LOCATION"));
		wo.setASSETNUM(mbo.getString("ASSETNUM"));
		wo.setPERSONGROUP(mbo.getString("PERSONGROUP"));
		wo.setCREWID(mbo.getString("CREWID"));
		wo.setSUPERVISOR(mbo.getString("SUPERVISOR"));
		wo.setLEAD(mbo.getString("LEAD"));
		wo.setPHONE(mbo.getString("PHONE"));
		wo.setREPORTEDBY(mbo.getString("REPORTEDBY"));
		// Get MBO Date and Convert into EMMDate Type
		wo.setREPORTDATE(new EMMDate(mbo.getDate("REPORTDATE"), "MM/dd/yyyy HH:mm:ss"));
		wo.setSTATUS(mbo.getString("STATUS"));
		// Get MBO Date and Convert into EMMDate Type
		wo.setSTATUSDATE(new EMMDate(mbo.getDate("STATUSDATE"), "MM/dd/yyyy HH:mm:ss"));
		wo.setWOPRIORITY(mbo.getInt("WOPRIORITY"));
		wo.setWORKTYPE(mbo.getString("WORKTYPE"));
		wo.setFAILURECODE(mbo.getString("FAILURECODE"));
		wo.setPROBLEMCODE(mbo.getString("PROBLEMCODE"));
		wo.setISTASK(mbo.getInt("ISTASK"));
		wo.setORIGRECORDID(mbo.getString("ORIGRECORDID"));
		wo.setESTDUR(mbo.getFloat("ESTDUR"));
		wo.setOBSERVATION(mbo.getString("OBSERVATION"));
		wo.setMEASUREMENTVALUE(mbo.getFloat("MEASUREMENTVALUE"));
		wo.setTASKID(mbo.getInt("TASKID"));
		wo.setSITEID(mbo.getString("SITEID"));
		wo.setORGID(mbo.getString("ORGID"));

		if (log.isDebugEnabled()) {
			log.debug("workorder: " + wo);
		}
		return wo;
	}	
}
