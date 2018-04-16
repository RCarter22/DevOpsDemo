/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.invbalances.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

@Component
@Scope("prototype")
@Namespace("/invbalances")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class AdjPhysCountAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;

	private final String OWNERMBO = "INVBALANCES";
	
	@Action(value="adjphyscount", results={
			@Result(name="success",location="adjphyscount.jsp"),
			@Result(name="error",location="adjphyscount.jsp")
		})	
	public String adjphyscount() {
		String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);		
		if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
			return EMMConstants.HOME;
		try {
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			id = mbo.getUniqueIDValue();
			mbo = mbo.getMboSet(OWNERMBO).getMbo(0);
			this.setSessionObject(OWNERMBO, mbo);			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
}
