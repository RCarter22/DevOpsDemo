/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.translator;

import java.rmi.RemoteException;

import psdi.mbo.MboRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.mbo.MboTranslator;
import com.interprosoft.ezmaxmobile.offline.model.WorkType;

public class WorkTypeMboTranslator  implements MboTranslator {

	public Object translate(MboRemote mbo) throws MXException, RemoteException {
		return translate(mbo,false);
	}

	public Object translate(MboRemote mbo, boolean includeRelation) throws MXException, RemoteException {
		WorkType wt = new WorkType();
		wt.setWORKTYPEID(mbo.getInt("WORKTYPEID"));
		wt.setWORKTYPE(mbo.getString("WORKTYPE"));
		wt.setWTYPEDESC(mbo.getString("WTYPEDESC"));
		wt.setTYPE(mbo.getString("TYPE"));
		
//		//To set a column value to null please follow code example
//		if(!mbo.isNull("STARTSTATUS"))
//			wt.setSTARTSTATUS(mbo.getString("STARTSTATUS"));
		return wt;
	}

}
