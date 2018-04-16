/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.translator;

import java.rmi.RemoteException;

import psdi.mbo.MboRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.mbo.MboTranslator;
import com.interprosoft.ezmaxmobile.offline.model.Labor;

public class LaborMboTranslator implements MboTranslator {
	
	public Object translate(MboRemote mbo) throws MXException, RemoteException {
		return translate(mbo,false);
	}

	public Object translate(MboRemote mbo, boolean includeRelation) throws MXException, RemoteException {
		Labor labor = new Labor();
		labor.setLABORID(mbo.getInt("LABORID"));
		labor.setLABORCODE(mbo.getString("LABORCODE"));
		labor.setSTATUS(mbo.getString("STATUS"));
		labor.setPERSONID(mbo.getString("PERSONID"));
		labor.setDISPLAYNAME(mbo.getString("PERSON.DISPLAYNAME"));
		labor.setCREWID(mbo.getString("CREWID"));
		labor.setWORKLOCATION(mbo.getString("WORKLOCATION"));
		labor.setWORKSITE(mbo.getString("WORKSITE"));
		labor.setORGID(mbo.getString("ORGID"));
		return labor;
	}

}
