/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.login.ws;

import com.interprosoft.ezmaxmobile.login.LoginException;
import com.interprosoft.ezmaxmobile.user.model.User;

public interface LoginWebService {
	User login(String username, String password) throws LoginException;
}
