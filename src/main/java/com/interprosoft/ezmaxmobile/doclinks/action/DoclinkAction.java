/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.doclinks.action;

import java.io.ByteArrayInputStream;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.doclink.DoclinksRemote;
import psdi.app.doclink.DoclinksSetRemote;

import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

@Component
@Scope("prototype")
@Namespace("/doclinks")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class DoclinkAction extends BaseDoclinkAction {
	
	private static final long serialVersionUID = 1L;

	private static Log log = LogFactory.getLog(DoclinkAction.class);
	
	@Action(value="doUploadJSon",
			results={
				@Result(name="success", type="stream", params={"inputName", "jsonResult"}),
				@Result(name="input", type="stream", params={"inputName", "jsonResult"})
			}
	)
	public String doUploadJSon() {
		JSONObject jsonObj = new JSONObject();
		try {
			jsonObj = upload(this.getDocInfo(),this.getMyFileFileName(), this.getOwnerTable(), this.getOwnerId());
		}  catch (Exception e){
			log.error(e);
			BaseMaximoException ex = new BaseMaximoException(e);
			this.addActionError(ex.getMessage());
			jsonObj.element("message", e.getMessage());
			setJsonResult(new ByteArrayInputStream(jsonObj.toString().getBytes()));			
			return INPUT;	
		}	
		setJsonResult(new ByteArrayInputStream(jsonObj.toString().getBytes()));
		return SUCCESS;
	}
	
	@Action(value="doUpload",
			results={
				@Result(name="success", location="${currentAction}",type="redirect"),
				@Result(name="error", location="${currentAction}",type="redirect")
			}
	)
	public String doUpload() {
		JSONObject jsonObj = new JSONObject();
		try {
			if (this.getMyFile() != null)
				jsonObj = upload(this.getDocInfo(),this.getMyFileFileName(), this.getOwnerTable(), this.getOwnerId());
			else
				throw new Exception(getText("global.specifyfile"));
		}  catch (Exception e){
			log.error(e);
			jsonObj.element("message", e.getMessage());
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			return ERROR;	
		}	
		this.setMessage(new EZMessage(getText("global.fileuploaded"), EMMConstants.SUCCESS));
		return SUCCESS;
	}

}