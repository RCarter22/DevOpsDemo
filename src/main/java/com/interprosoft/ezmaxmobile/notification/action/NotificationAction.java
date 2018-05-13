package com.interprosoft.ezmaxmobile.notification.action;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.MaximoHelper;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.common.util.PushUtil;

@Component
@Scope("prototype")
@Namespace("/notification")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class NotificationAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private ByteArrayInputStream result = null;
	
	private long pushId;
    private String APIKey;
    private String person;
    private String group;
    private String alert;
    private String details;
    private String openLink;
    private String sentBy;
    private String refNum;
    private int offset = 0;
	
	@Action(value="main",results={
			@Result(name="success", location="main.jsp"),
			@Result(name="error", location="main.jsp")
		}
	)
	public String main() {		
		return SUCCESS;
	}
	
	@Action(value="list",results={
			@Result(name="success", type="stream", params={"inputName", "result"})
		}
	)
	public String list() throws IOException {	
		PushUtil pushUtil = new PushUtil();
		pushUtil.setOffset(offset);
		result = new ByteArrayInputStream(pushUtil.getNotifications(this.user).getBytes());
		return SUCCESS;
	}	

	@Action(value="markread",results={
			@Result(name="success", type="stream", params={"inputName", "result"})
		}
	)
	public String markRead() {
		PushUtil pushUtil = new PushUtil();
		pushUtil.markRead(this.user, pushId);
		result = new ByteArrayInputStream("{}".getBytes());
		return SUCCESS;
	}
	
	@Action(value="directpush",results={
			@Result(name="success", location="result.jsp"),
			@Result(name="error", location="result.jsp")
		}
	)
	public String directPush() {
		if(APIKey != null && APIKey.equalsIgnoreCase(MaximoHelper.getInstance().getAPIKey()))
		{
			PushUtil pushUtil = new PushUtil();
			if(person!=null && !person.equalsIgnoreCase(""))
				pushUtil.setPerson(person.trim());
			if(group!=null && !group.equalsIgnoreCase(""))
				pushUtil.setGroup(group.trim());
			if(sentBy!=null && !sentBy.equalsIgnoreCase(""))
				pushUtil.setSentBy(sentBy.trim() + " from Maximo");
			pushUtil.setAlert(alert);
			pushUtil.setDetails(details);
			pushUtil.setOpenLink(openLink);
			pushUtil.setRefNum(refNum);
			pushUtil.push();
			this.setMessage(new EZMessage(getText("notification.sent"), EMMConstants.SUCCESS));
			return SUCCESS;
		} else {
			this.setMessage(new EZMessage(getText("global.unauthorized"), EMMConstants.ERROR));
			return ERROR;
		}
	}
	
	@Action(value="history",results={
			@Result(name="success", location="history.jsp"),
			@Result(name="error", location="history.jsp")
		}
	)
	public String history() {
		String appName = request.getParameter("appName");
		String recordId = request.getParameter("recordId");		
		this.refNum = appName + "_" + recordId;
		this.APIKey = MaximoHelper.getInstance().getAPIKey();
		return SUCCESS;
	}
	
	@Action(value="listhistory",results={
			@Result(name="success", type="stream", params={"inputName", "result"})
		}
	)
	public String listHistory() throws IOException {
		if(APIKey != null && APIKey.equalsIgnoreCase(MaximoHelper.getInstance().getAPIKey()))
		{
			PushUtil pushUtil = new PushUtil();
			pushUtil.setOffset(offset);
			result = new ByteArrayInputStream(pushUtil.getHistory(this.refNum).getBytes());
			return SUCCESS;
		} else {
			this.setMessage(new EZMessage(getText("global.unauthorized"), EMMConstants.ERROR));
			return ERROR;
		}
	}
	
	public ByteArrayInputStream getResult() {
		return result;
	}

	public void setResult(ByteArrayInputStream result) {
		this.result = result;
	}

	public long getPushId() {
		return pushId;
	}

	public void setPushId(long pushId) {
		this.pushId = pushId;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public String getAPIKey() {
		return APIKey;
	}

	public void setAPIKey(String aPIKey) {
		APIKey = aPIKey;
	}

	public String getPerson() {
		return person;
	}

	public void setPerson(String person) {
		this.person = person;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getAlert() {
		return alert;
	}

	public void setAlert(String alert) {
		this.alert = alert;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getOpenLink() {
		return openLink;
	}

	public void setOpenLink(String openLink) {
		this.openLink = openLink;
	}

	public String getSentBy() {
		return sentBy;
	}

	public void setSentBy(String sentBy) {
		this.sentBy = sentBy;
	}

	public String getRefNum() {
		return refNum;
	}

	public void setRefNum(String refNum) {
		this.refNum = refNum;
	}
	
}
