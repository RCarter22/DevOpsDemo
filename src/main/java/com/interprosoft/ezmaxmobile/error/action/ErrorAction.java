package com.interprosoft.ezmaxmobile.error.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.action.BaseAction;

@Component
@Scope("prototype")
@Namespace("/error")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class ErrorAction extends BaseAction{

	private static final long serialVersionUID = 5673782249234405667L;

	private String msg;
	
	@Action(value="error",
		results={
			@Result(name="success", location="/error/error.jsp")
		}
	)
	public String error() {
		return SUCCESS;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}
