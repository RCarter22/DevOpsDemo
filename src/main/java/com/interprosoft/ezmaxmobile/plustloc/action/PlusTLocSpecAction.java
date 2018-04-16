/*******************************************************************************
 * Copyright © 2012 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.plustloc.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.apache.struts2.convention.annotation.*;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

@Component
@Scope("prototype")
@Namespace("/plustloc")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusTLocSpecAction extends BaseAction {

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
			populateMbo("LOCATIONS", this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			this.pagination.setPageSize(50);
			populateMboListByRelationship("LOCATIONS","LOCATIONSSPECCLASS");
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}	
		return SUCCESS;
	}
	
}
