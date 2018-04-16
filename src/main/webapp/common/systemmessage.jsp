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
			<h3 class="ui-title"><s:text name="global.systemmessage"/></h3>
		</div>
		
		<div class="ui-content ui-content-narrow">
			<s:include value="../common/message.jsp"/>
			<div class="ui-btn-container">
				<a class="ui-btn-a" href="<s:property value="currentAction"/>"><s:text name="global.ok"/></a>
			</div>
		</div>
	</div>	
</body>
</html>
