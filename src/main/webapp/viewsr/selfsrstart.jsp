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
		<div class="ui-header">
			<h3 class="ui-title"><s:text name="ezmaxmobile.sr"/></h3>
			<a class="ui-btn-right" href="../login/logout.action"><s:text name="global.logout"/></a>	
		</div>
		<div class="ui-content ui-content-narrow">
			<ul class="ui-listview ui-inset">
				<li>
					<a href="../viewsr/main.action">
						<span class="emm-service-request"></span>
						<h3><s:text name="ezmaxmobile.viewsr"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
				<li>
					<a href="../createsr/main.action">
						<span class="emm-add"></span>
						<h3><s:text name="ezmaxmobile.createsr"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
