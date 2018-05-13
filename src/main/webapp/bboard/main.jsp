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
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" href="../main.action"><img src="../images/homelink.png"/></a>
			<h1 class="ui-title"><s:text name="ezmaxmobile.bboard"/></h1>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">BULLETINBOARDID,SUBJECT</s:param>
			</s:include>
			<ul class="ui-listview">
				<li data-visible="<s:property value="mbo.sigopGranted('INSERT')"/>">
					<a href="create.action">
						<img src="../images/addnew.png" />
						<h3><s:text name="global.addnew"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</body>
