/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.plustasset.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.apache.struts2.convention.annotation.*;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

@Component
@Scope("prototype")
@Namespace("/plustasset")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusTAssetSpecAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Action(value="classify",
			results={
				@Result(name="success", location="classify.jsp"),
				@Result(name="error", location="classify.jsp")
			}
		)
	public String execute() {
		try{
			pagination.setPageSize(100);
			populateMbo("ASSET", this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship("ASSET","ASSETSPECCLASS");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
}
