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
			<a class="ui-btn-left" href="../main.action"><span class="emm-home"></span></a>
			<h3 class="ui-title"><s:text name="global.passwordinfo"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:form action="changepwd.action" autocomplete="false">
				<ul class="ui-listview">
					<li class="ui-divider ui-divider-a"><s:text name="profile.passwordinstructions"/></li>
					<li class="ui-field ui-field-auto ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('USERID').getTitle()" /></label>
						<p><s:property value="mbo.getString('USERID')" /></p>
						<p><s:property value="mbo.getString('MAXUSER.PERSON.DISPLAYNAME')" /></p>
					</li>
					<li class="ui-field ui-field-auto ui-details">
						<label><s:property value="mbo.getMboValueInfoStatic('PASSWORDOLD').getTitle()" /></label>
						<input type="password"
								id="PASSWORDOLD"
								name="password"
								required="<s:property value="mbo.getMboValueData('PASSWORDOLD').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('PASSWORDOLD').isReadOnly()"/>"
								value="<s:property value="mbo.getString('PASSWORDOLD')"/>"
								autocomplete="false"
						/>
					</li>		
				</ul>
				<div class="ui-btn-container">
					<input type="submit" class="ui-btn ui-btn-a" value="<s:text name="profile.next"/>"/>
				</div>
			</s:form>
		</div>
	</div>
</body>
