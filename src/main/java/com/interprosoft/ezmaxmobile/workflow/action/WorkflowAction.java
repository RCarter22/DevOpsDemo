/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.workflow.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;


@Component
@Scope("prototype")
@Namespace("/workflow")
@ResultPath(value="/")
public class WorkflowAction extends BaseWorkflowAction {

	private static final long serialVersionUID = 1L;
	
	@Action(value="main",
			results={
				@Result(name="success", location="main.jsp"),
				@Result(name="error", type="redirect", location="toError.action", params={"error", "${actionErrors[0]}"})
			}
		)
	public String execute(){
		return super.execute();
	}

	@Action(value="inbxconfig",
			results={
				@Result(name="success", location="inbox.jsp"),
				@Result(name="error", type="redirect", location="toError.action", params={"error", "${actionErrors[0]}"})
			}
		)
	public String inbox(){
		return super.inbox();
	}
	
	@Action(value="wfaction", results={
			@Result(name="success",location="../workflow/wfaction.jsp"),
			@Result(name="input",location="../workflow/wfprocess.jsp"),
			@Result(name="complete_success",location="${currentAction}",type="redirect",params={"id","${id}"}),
			@Result(name="complete_input",location="wfinput.action",type="redirect",params={"id","${id}", "currentAction", "${currentAction}"}),			
			@Result(name="error",location="../common/systemmessage.jsp")
		})	
	public String wfaction(){
		return super.wfaction();
	}	
	
	@Action(value="wfinput", results={
			@Result(name="success",location="../workflow/wfinput.jsp"),
			@Result(name="input",location="${currentAction}",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="../common/systemmessage.jsp")
		})	
	public String wfinput(){
		return super.wfinput();
	}	
	
	@Action(value="viewassignments", results={
			@Result(name="success",location="../workflow/wfassignments.jsp"),
			@Result(name="error",location="../common/systemmessage.jsp")
		})	
	public String wfassignments(){
		return super.wfassignments();
	}
	
	@Action(value="completeassignment", results={
			@Result(name="success",location="${currentAction}",type="redirect",params={"id","${id}"}),
			@Result(name="input",location="wfinput.action",type="redirect",params={"id","${id}", "currentAction", "${currentAction}"}),
			@Result(name="wfaction",location="wfaction.action",type="redirect",params={"id","${id}", "currentAction", "${currentAction}"}),
			@Result(name="error",location="${currentAction}",type="redirect")
		})	
	public String completeassignment(){
		return super.completeassignment();
	}	
	
	@Action(value="inputassignment", results={
			@Result(name="success",location="${currentAction}",type="redirect",params={"id","${id}"}),
			@Result(name="input",location="wfinput.action",type="redirect",params={"id","${id}", "currentAction", "${currentAction}"}),
			@Result(name="wfaction",location="wfaction.action",type="redirect",params={"id","${id}", "currentAction", "${currentAction}"}),
			@Result(name="error",location="${currentAction}",type="redirect")
		})	
	public String inputassignment(){
		return super.inputassignment();
	}	
	
	@Action(value="initwfprocess", results={
			@Result(name="success",location="${currentAction}",type="redirect",params={"id","${id}"}),
			@Result(name="error",location="${currentAction}",type="redirect")
		})	
	public String initwfprocess(){
		return super.initwfprocess();
	}
	
}

