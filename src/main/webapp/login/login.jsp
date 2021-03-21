<%--
* Copyright (c) 2014 InterPro Solutions, LLC.
* All rights reserved.
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
			<h3 class="ui-title">EZMaxMobile <s:text name="global.login"/></h3>
		</div>
		
		<div class="ui-content ui-content-narrow">
			<s:include value="../common/loginmessage.jsp"/>
			<s:form id="myform" action="doLogin" method="post" autocomplete="false">
				<s:token />
				<ul class="ui-listview">
					<li class="ui-field">
						<label><s:text name="global.username"/></label>
						<input type="text" name="username" id="doLogin_username" placeholder="<s:text name="global.username"/>" autocapitalize="none" value=""/>
					</li>
					<li class="ui-field">
						<label><s:text name="global.password"/></label>
						<input type="password" name="password" id="doLogin_password" placeholder="<s:text name="global.password"/>" value="" autocomplete="false" />
					</li>
				</ul>
				<ul class="ui-listview" data-touchid>
					<li class="ui-field">
						<label><s:text name="global.usetouchid"/></label>
						<input type="checkbox" id="touchid"/>
					</li>			
					<li id="logintouchid" data-visible="false">
						<a onclick="emm.core.fingerPrintLogin();">
							<span class="emm-touchid"></span>
							<h3><s:text name="global.logintouchid"/></h3>
						</a>
					</li>					
				</ul>
				<div class="ui-btn-container">
					<input class="ui-btn-a" type="button" name="Submit" onclick="emm.core.mainLogin()" value="<s:text name="global.login"/>" />					
				</div>
<%-- 				<s:include value="../common/languages.jsp"/> --%>
			</s:form>
		</div>
		
		<s:if test="licenseInfo neq ''">
			<div id="license" style="color:red;text-align:center;">
				<h3><s:property value="licenseInfo"/></h3>
			</div>
		</s:if>
		<s:include value="../common/footer.jsp"/>
	</div>		
</body>
</html>
