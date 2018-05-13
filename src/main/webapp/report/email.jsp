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
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.reports"/></h3>			
		</div>
		<div class="ui-content ui-content-narrow">
			<form action="doemailreport.action" method="post">			
				<s:include value="../common/message.jsp"/>
				<s:hidden name="id"/>
				<ul class="ui-listview">							
					<li class="ui-field">
						<label><s:text name="global.emailto"/></label>
						<s:textfield name="emailUsers"/>
					</li>
					<li class="ui-field">
						<label><s:text name="global.subject"/></label>
						<s:textfield name="emailSubject"/>
					</li>
					<li class="ui-field-block">
						<label><s:text name="global.comments"/></label>
						<s:textarea name="emailComments"/>
					</li>				
				</ul>
				<div class="ui-btn-container">
					<input class="ui-btn-a" type="submit" value="<s:text name="global.email"/>"/>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
