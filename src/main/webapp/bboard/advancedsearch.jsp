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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BULLETINBOARDID').getTitle()" /></label>
					<input type="text"
							id="BULLETINBOARDID" 
							value="<s:property value="mbo.getThisMboSet().getQbe('BULLETINBOARDID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('BULLETINBOARDID').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('SUBJECT').getTitle()" /></label>
					<textarea
							id="SUBJECT" 
							maxlength="<s:property value="mbo.getMboValueData('SUBJECT').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getThisMboSet().getQbe('SUBJECT')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('POSTBY').getTitle()" /></label>
					<input type="text"
							id="POSTBY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('POSTBY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
			</ul>
		</div>
		
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="clearadvancedsearch.action">
				<s:text name="global.clear"/>
			</a>
			<a class="ui-btn-a" href="doadvancedsearch.action">
				<s:text name="global.search"/>
			</a>
		</div>		
	</div>
</body>
</html>
