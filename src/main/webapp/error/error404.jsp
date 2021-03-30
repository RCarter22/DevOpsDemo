<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<% String url = request.getScheme() + "://" + request.getServerName() + (request.getServerPort() <= 0 ? "" : ":" + request.getServerPort()) + request.getContextPath(); %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta content="minimum-scale=1.0, width=device-width, maximum-scale=0.6667, user-scalable=no" name="viewport" />
	<title>Error 404</title>
	<link href="<%= url %>/css/ezmaxmobile-font.css" rel="stylesheet" type="text/css" />
	<link href="<%= url %>/css/ezmaxmobile.ui-full.min.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div class="ui-page">
		<div class="ui-header">
			<a class="ui-btn-left" onclick="window.history.back();"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title">Error 404</h3>
		</div>
		<div class="ui-content ui-content-narrow">
			<div class="ui-statusbar ui-statusbar-c ui-inset">
				<h3 class="ui-title">Oops... Page not found!</h3>			
			</div>
		</div>
	</div>
</body>
</html>
