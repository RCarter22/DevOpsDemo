/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.translator;

import java.rmi.RemoteException;

import com.interprosoft.ezmaxmobile.mbo.MboTranslator;
import com.interprosoft.ezmaxmobile.offline.model.Craft;

import psdi.mbo.MboRemote;
import psdi.util.MXException;

public class CraftMboTranslator implements MboTranslator {

	public Object translate(MboRemote mbo) throws MXException, RemoteException {
		return translate(mbo,false);
	}

	public Object translate(MboRemote mbo, boolean includeRelation) throws MXException, RemoteException {
		Craft craft = new Craft();
		craft.setCRAFTID(mbo.getInt("CRAFTID"));
		craft.setCRAFT(mbo.getString("CRAFT"));
		craft.setDESCRIPTION(mbo.getString("DESCRIPTION"));
		craft.setORGID(mbo.getString("ORGID"));
		return craft;
	}
	
}
