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
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>

		<s:form action="main" method="post">
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label>Entity Name</label>
					<input type="text"
							id="transaction.entityName"
							name="transaction.entityName"
							value="<s:property value="transaction.entityName"/>"/>
				</li>
				<s:if test="user.isMaxAdmin()">
				<li class="ui-field">
					<label>User Id</label>
					<input type="text"
							id="transaction.userId"
							name="transaction.userId"
							value="<s:property value="transaction.userId"/>"/>
				</li>
				</s:if>
				<li class="ui-field">
					<label>Status</label>
					<input type="text"
							id="transaction.status"
							name="transaction.status"
							value="<s:property value="transaction.status"/>"/>
				</li>
			</ul>
		</div>
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="transaction_list.action">
				<s:text name="global.cancel"/>
			</a>
			<input class="ui-btn-a" type="submit" value="<s:text name="global.search"/>">
		</div>
		</s:form>
	</div>
</body>
</html>
