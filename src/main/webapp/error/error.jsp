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
	<title>Error</title>
	<link href="<%= url %>/css/ezmaxmobile-font.css" rel="stylesheet" type="text/css" />
	<link href="<%= url %>/css/ezmaxmobile.ui-full.min.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div class="ui-page">
		<div class="ui-header">
			<a class="ui-btn-left" onclick="window.history.back();"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title">Error</h3>
		</div>
		<div class="ui-content ui-content-narrow">
			<s:if test="msg eq 'INVALIDLICENSE' or msg eq 'INVALIDUSER' or msg eq 'BLOCKEDUSER' or msg eq 'EXPIREDLICENSE' or msg eq 'NOTINEMMGROUP' or msg eq 'EXCEEDVALIDLICENSELIMIT' or msg neq null">
				<div class="ui-message ui-message-a ui-inset">
					<s:if test="msg eq 'INVALIDLICENSE'"><h3><s:text name="global.notavalidlicense"/></h3></s:if>
					<s:elseif test="msg eq 'INVALIDUSER'"><h3><s:text name="global.invalidlogin"/></h3></s:elseif>
					<s:elseif test="msg eq 'BLOCKEDUSER'"><h3><s:text name="global.blockeduser"/></h3></s:elseif>
					<s:elseif test="msg eq 'EXPIREDLICENSE'"><h3><s:text name="global.expiredlicense"/></h3></s:elseif>
					<s:elseif test="msg eq 'NOTINEMMGROUP'"><h3><s:text name="global.notinemmgroup"/></h3></s:elseif>
					<s:elseif test="msg eq 'EXCEEDVALIDLICENSELIMIT'"><h3><s:text name="global.exceedvalidlicenselimit"/></h3></s:elseif>
					<s:elseif test="msg neq null"><h3><s:property value="msg" /></h3></s:elseif>
				</div>				
			</s:if>
			<s:else>			
				<s:if test="hasActionErrors()">
					<s:actionerror cssClass="ui-statusbar ui-statusbar-a"/>							
				</s:if>		
										
				<s:if test="hasActionMessages()">
					<s:actionmessage cssClass="ui-statusbar ui-statusbar-c"/>
				</s:if>
			</s:else>	
		</div>
	</div>
</body>
</html>
