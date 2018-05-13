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
			<h3 class="ui-title"><s:text name="ezmaxmobile.doclinks"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content ui-content-narrow">
			<s:form name="myform" action="../doclinks/doUpload.action" method="POST" enctype="multipart/form-data">
				<s:hidden name="ownerId" value="%{mbo.getUniqueIDValue()}"/>
				<s:hidden name="ownerTable" value="%{mbo.getName()}"/>
				<s:hidden name="currentAction"/>
				<ul class="ui-listview">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('DOCLINKS.DOCUMENT').getTitle()" /></label>
						<s:textfield name="docInfo.document" maxlength="20" value="MOBILE"/>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('DOCLINKS.DESCRIPTION').getTitle()" /></label>
						<s:textfield name="docInfo.description"/>
					</li>
					<li class="ui-divider"><s:text name="global.specifyfile"/></li> 
					<li>
						<br />
						<s:file name="myFile"/>
						<br />
						<br />
					</li>
				</ul>
				<br />
				<div class="ui-btn-container">
					<a class="ui-btn-b" href="#" onclick="emm.core.back()"><s:text name="global.cancel"/></a>
					<input class="ui-btn-a" href="#" type="submit" value="<s:text name="global.ok"/>">
				</div>
			</s:form> 
		</div>
	</div>
</body>
</html>
