/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.bboard.service;

import java.rmi.RemoteException;
import java.util.List;

import psdi.mbo.MboRemote;
import psdi.util.MXException;
import com.interprosoft.ezmaxmobile.common.pagination.Pagination;

public interface BulletinBoardService {
	List<MboRemote> getMessages(Pagination pagination) throws MXException, RemoteException;
	int getTotalCount() throws MXException, RemoteException;	
}
