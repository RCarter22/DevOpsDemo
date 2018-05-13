/*******************************************************************************
 * Copyright (c) 2015 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.dbtrack.action;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.offline.action.BaseOfflineDatabaseTrackingAction;
import com.interprosoft.ezmaxmobile.offline.model.DatabaseRequest;

@Component
@Scope("prototype")
@Namespace("/dbtrack")
@ResultPath(value="/")
public class DatabaseTrackingAction extends BaseOfflineDatabaseTrackingAction {
	
	private List<DatabaseRequest> databaseRequests;
	
	private DatabaseRequest databaseRequest;
	
	@Action(value="main",
			results={
				@Result(name="success", location="list.jsp"),
				@Result(name="error", location="list.jsp")
			}
		)
		public String main() {
			try {
				if(this.search != null && this.search.length() != 0)
					setDatabaseRequests(this.getOfflineDatabaseService().listByUser(user, search, pagination));
				else 
					setDatabaseRequests(this.getOfflineDatabaseService().search(user, databaseRequest, pagination));
			}
			catch(BaseMaximoException e){
				this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
				this.addActionError(e.getMessage());
				return ERROR;
			}
				
			return SUCCESS;
		}
	
		@Action(value="view",
			results={
				@Result(name="success", location="view.jsp"),
				@Result(name="error", location="view.jsp")
			}
		)
		public String view() {
			try {
				setDatabaseRequest(this.getOfflineDatabaseService().getRequestById(databaseRequest.getDatabaseid()));
			} catch(Exception ex) {
				this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
				this.addActionError(ex.getMessage());
				return ERROR;
			}
			return SUCCESS;
		}
		
		@Action(value="delete", results={
			@Result(name="success",location="delete.jsp"),
			@Result(name="error",location="../common/systemmessage.jsp")
		})
		public String delete(){
			try {
				setDatabaseRequest(this.getOfflineDatabaseService().getRequestById(databaseRequest.getDatabaseid()));
				this.currentAction = "main.action";
			} catch(Exception ex) {
				this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
				this.addActionError(ex.getMessage());
				return ERROR;
			}
			return SUCCESS;
		}
	
		@Action(value="doDelete", results={
			@Result(name="success",location="${currentAction}",type="redirect"),
			@Result(name="error",location="${currentAction}",type="redirect")
		})
		public String doDelete() {
			try {
				this.getOfflineDatabaseService().delete(databaseRequest);
			} catch(BaseMaximoException ex) {
				this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
				this.addActionError(ex.getMessage());
				return ERROR;
			}
			return SUCCESS;
		}

	public DatabaseRequest getDatabaseRequest() {
		return databaseRequest;
	}

	public void setDatabaseRequest(DatabaseRequest databaseRequest) {
		this.databaseRequest = databaseRequest;
	}

	public List<DatabaseRequest> getDatabaseRequests() {
		return databaseRequests;
	}

	public void setDatabaseRequests(List<DatabaseRequest> databaseRequests) {
		this.databaseRequests = databaseRequests;
	}
}
