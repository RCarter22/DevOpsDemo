/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.bboard.service;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.bulletinboard.BBSetRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;

import com.interprosoft.ezmaxmobile.common.pagination.Pagination;
import com.interprosoft.ezmaxmobile.common.service.BaseServiceImpl;
import com.interprosoft.ezmaxmobile.user.model.User;

@Scope("prototype")
@Component
public class BulletinBoardServiceImpl extends BaseServiceImpl implements BulletinBoardService {

	/** An instance of logger. */
	private static Log log = LogFactory.getLog(BulletinBoardServiceImpl.class);
	
	/** The business object key. */
	private static final String BUSINESS_OBJECT_NAME = "BULLETINBOARD";
	
	/**
	 * Constructor to create the instance of POServiceImpl.
	 * @param user An instance of User.
	 */
	@Autowired
	public BulletinBoardServiceImpl(User user) {
		super(user);
	}

	public List<MboRemote> getMessages(Pagination pagination) throws MXException, RemoteException {
		List<MboRemote> list = null;
		try {
			BBSetRemote bbSetRemote = (BBSetRemote)this.user.getSession().getMboSet(BUSINESS_OBJECT_NAME);
			MboSetRemote mboSetRemote = (MboSetRemote)bbSetRemote.getValidMessagesMboSet(this.user.getSession().getUserInfo().getLoginID());
			MboRemote mboRemote = mboSetRemote.moveTo((pagination.getCurrentPageNum() - 1) * pagination.getPageSize());
			int i=0;
			while (mboRemote != null && pagination.getPageSize() > 0) {
				if (list == null) list = new ArrayList<MboRemote>();
				list.add(mboRemote);
				if (++i>pagination.getPageSize()-1) {
					break;
				}
				mboRemote = mboSetRemote.moveNext();
			}
			if (i>0) pagination.setTotal(mboSetRemote.count());
		} catch (RemoteException e){
			e.printStackTrace();
			log.error("getMessages" + e );
			throw e;
		} catch (MXException e){
			e.printStackTrace();
			throw e;
		}
		return list;
	}

	public int getTotalCount() throws MXException, RemoteException {
		try {
			BBSetRemote bbSetRemote = (BBSetRemote)this.user.getSession().getMboSet(BUSINESS_OBJECT_NAME);
			MboSetRemote mboSetRemote = (MboSetRemote)bbSetRemote.getValidMessagesMboSet(this.user.getSession().getUserInfo().getUserName());
			if(!mboSetRemote.isEmpty())
				return mboSetRemote.count();
		} catch (RemoteException e){
			e.printStackTrace();
			log.error("getMessages" + e );
			throw e;
		} catch (MXException e){
			e.printStackTrace();
			throw e;
		}
		return 0;
	}
	
}
