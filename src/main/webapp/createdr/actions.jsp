<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ACTIONS" class="ui-sidebar">
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview ui-inset">
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/attachment.png" />
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>	
