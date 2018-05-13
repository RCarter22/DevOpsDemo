<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ui-sidebar">
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview ui-inset">
		<li data-visible="<s:property value="mbo.sigopGranted('STATUS')"/>">
			<a onclick="emm.core.changeStatus()">
				<img src="../images/changestatus.png" />
				<h3><s:text name="global.changestatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="pushEnabled"/>">
			<a onclick="emm.util.confirm({message:'<s:text name="global.send"/> <s:text name="ezmaxmobile.bboard"/>',yes:function(){window.location='push.action?id=<s:property value='mbo.getUniqueIDValue()'/>'}});">
				<img src="../images/notification.png" />
				<h3><s:text name="global.send"/> <s:text name="global.notification"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
	</ul>
</div>	
