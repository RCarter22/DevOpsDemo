/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.translator;

import java.rmi.RemoteException;

import psdi.mbo.MboRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.mbo.MboTranslator;
import com.interprosoft.ezmaxmobile.offline.model.PersonGroup;

public class PersonGroupMboTranslator implements MboTranslator {

	public Object translate(MboRemote mbo) throws MXException, RemoteException {
		return translate(mbo,false);
	}

	public Object translate(MboRemote mbo, boolean includeRelation) throws MXException, RemoteException {
		PersonGroup personGroup = new PersonGroup();
		personGroup.setPERSONGROUPID(mbo.getInt("PERSONGROUPID"));
		personGroup.setPERSONGROUP(mbo.getString("PERSONGROUP"));
		personGroup.setDESCRIPTION(mbo.getString("DESCRIPTION"));
		return personGroup;
	}
}
