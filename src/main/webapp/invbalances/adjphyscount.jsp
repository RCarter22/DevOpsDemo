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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="invbalances.physcount"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>							
		</div>
			
		<div class="ui-content">			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BINNUM').getTitle()" /></label>
					<input type="text"
							id="BINNUM" 
							required="<s:property value="mbo.getMboValueData('BINNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BINNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BINNUM')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
							id="SITEID" 
							required="<s:property value="mbo.getMboValueData('SITEID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SITEID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SITEID')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PHYSCNT').getTitle()" /></label>
					<input type="text"
							id="PHYSCNT" 
							required="<s:property value="mbo.getMboValueData('PHYSCNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PHYSCNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PHYSCNT')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ADJUSTEDPHYSCNT').getTitle()" /></label>
					<input type="text"
							id="<s:property value="mbo.getUniqueIDValue()"/>" 
							required="<s:property value="mbo.getMboValueData('ADJUSTEDPHYSCNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ADJUSTEDPHYSCNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ADJUSTEDPHYSCNT')"/>"
							onchange="emm.core.setValue(this)"
							data-mbo="INVBALANCES" data-field="ADJUSTEDPHYSCNT"
					/>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
