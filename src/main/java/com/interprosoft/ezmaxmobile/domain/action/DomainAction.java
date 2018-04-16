/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.domain.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import org.apache.struts2.convention.annotation.*;

@Component
@Scope("prototype")
@Namespace("/domain")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class DomainAction  extends BaseDomainAction {
	
	private static Log log = LogFactory.getLog(DomainAction.class);
	
	private static final long serialVersionUID = 1L;
	
	@Action(value="domain", 
		results={
			@Result(name="success", location="/common/domain.jsp"),
			@Result(name="error", location="${currentAction}", type="redirect")
		}
	)
	public String execute() throws Exception {
		try {
			setLookupList(getDomainValueList());
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			log.error(e);
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="selectgl", 
		results={
			@Result(name="success", location="/common/glaccount.jsp"),
			@Result(name="error", location="${currentAction}", type="redirect")
		}
	)
	public String selectGLAccount() {
		try{
			glaLookup();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="assetdrilldown", 
			results={
				@Result(name="success", location="/common/assetdrilldown.jsp"),
				@Result(name="error", location="${currentAction}", type="redirect")
			}
		)
	public String assetDrillDown() throws Exception {
		try{
			this.assetdrilldown();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;		
	}
	
	@Action(value="locationdrilldown", 
			results={
				@Result(name="success", location="/common/locationdrilldown.jsp"),
				@Result(name="error", location="${currentAction}", type="redirect")
			}
		)
	public String locationDrillDown() throws Exception {
		try {
			this.locationdrilldown();
		} catch (Exception e){
			e.printStackTrace();
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	

    @Action(value="classificationdrilldown", 
            results={
                  @Result(name="success", location="/common/classificationdrilldown.jsp"),
                  @Result(name="error", location="${currentAction}", type="redirect")
            }
     )
	public String classificationDrilldown() throws Exception {
	     try{
	            this.classificationdrilldown();
	     } catch (Exception e){
	            this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
	            this.addActionError(e.getMessage());
	            return ERROR;
	     }
	     return SUCCESS;            
	}
	
	
    @Action(value="selectowner", 
            results={
                  @Result(name="success", location="/common/selectowner.jsp"),
                  @Result(name="error", location="${currentAction}", type="redirect")
            }
     )
	public String selectOwner() throws Exception {
		try {
			setLookupList(getDomainValueList());
		} catch (Exception e) {
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			log.error(e);
			return ERROR;
		}
		return SUCCESS; 
	}
	
	
	public void setLookupMboId(String lookupMboId) {
		if(lookupMboId != null && lookupMboId.length() > 0)
		try{
			this.lookupMboId = Long.valueOf(lookupMboId);
		}catch(NumberFormatException e){}
	}
	
}
