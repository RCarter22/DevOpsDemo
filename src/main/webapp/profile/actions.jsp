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
			<a onclick="emm.core.changeDefInsertSite()">
				<img src="../images/changestatus.png" />
				<h3><s:text name="global.changedefinsertsite"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>	
