package com.interprosoft.ezmaxmobile.esri.action;

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
@Namespace("/esri")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class EsriAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Action(value="main",results={
			@Result(name="success", location="main.jsp"),
			@Result(name="error", location="main.jsp")
		}
	)
	public String main() {
		// Clear all applicatiion session
		clearAppSessions();
		clearMboSession("WORKORDER");
		return SUCCESS;
	}
}
