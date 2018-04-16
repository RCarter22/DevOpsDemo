<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
</head>
<body>
	<div class="ui-page ui-inset">	
		<div class="ui-header ui-header-b">
			<h3 class="ui-title"><s:text name="global.changestatus"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<s:form action="dochangestatus.action" method="post">
			<s:hidden name="currentAction"/>
			<div class="ui-content ui-content-narrow">
				<ul class="ui-listview ui-radiobutton">	
					<s:iterator value="mboList" status="status">
						<li>
						    <label for="check<s:property value="#status.index"/>"><s:property value="getString('DESCRIPTION')"/></label>
						    <input type="radio" id="check<s:property value="#status.index"/>" name="newStatus" value="<s:property value="getString('VALUE')"/>">
						</li>
					</s:iterator>
				</ul>
				<div class="ui-btn-container">
					<a class="ui-btn-b" href="<s:property value="currentAction"/>"><s:text name="global.cancel"/></a>
					<input data-esig="STATUS" class="ui-btn-a" type="submit" value="<s:text name="global.ok"/>">
				</div>
			</div>
		</s:form>
	</div>	
</body>
</html>
