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
			<h3 class="ui-title"><s:text name="ezmaxmobile.bboard"/></h3>
			<s:if test="mbo neq null">
				<a class="ui-btn-right" href="view.action?id=<s:property value="mbo.getUniqueIDValue()" />" data-visible="<s:property value="mbo.sigopGranted('INSERT')"/>"><s:text name="global.edit"/></a>
			</s:if>
			<s:include value="../common/statusbar.jsp"/>
		</div>	
		<div class="ui-content">
			<s:if test="mbo neq null">
				<ul class="ui-listview">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('POSTDATE').getTitle()" /></label>
						<input type="text"
								id="POSTDATE" 
								value="<s:property value="mbo.getString('POSTDATE')"/>"
						/>
					</li>			
					<li class="ui-field-block">
						<label><s:property value="mbo.getMboValueInfoStatic('SUBJECT').getTitle()" /></label>
						<textarea
								id="SUBJECT" 
						><s:property value="mbo.getString('SUBJECT')"/></textarea>
					</li>
					<li class="ui-field-block">
						<label><s:property value="mbo.getMboValueInfoStatic('MESSAGE').getTitle()" /></label>
						<textarea
								id="MESSAGE" 
								required="<s:property value="mbo.getMboValueData('MESSAGE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('MESSAGE').isReadOnly()"/>"
								onchange="emm.core.setValue(this)"
								data-htmleditor="true"
						><s:property value="mbo.getString('MESSAGE')"/></textarea>
					</li>
				</ul>
			</s:if>
		</div>
	</div>
</body>
</html>
