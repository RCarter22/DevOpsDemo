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
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancel.action"><s:text name="global.cancel"/></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" href="goback.action"><s:text name="global.back"/></a>
			</s:else>
			<h3 class="ui-title"><s:text name="Licenses"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
		</div>
	
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input readonly value="<s:property value="mbo.getString('ASSETNUM')"/>"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LICENSENUM').getTitle()" /></label>
					<input type="text"
							id="LICENSENUM" 
							required="<s:property value="mbo.getMboValueData('LICENSENUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LICENSENUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LICENSENUM')"/>"
							onchange="emm.core.setValue(this)"
					/>	
				</li> 				
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTDATE').getTitle()" /></label>
					<input type="text"
							id="STARTDATE" 
							required="<s:property value="mbo.getMboValueData('STARTDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STARTDATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="STARTDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENDDATE').getTitle()" /></label>
					<input type="text"
							id="ENDDATE" 
							required="<s:property value="mbo.getMboValueData('ENDDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENDDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ENDDATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="ENDDATE"></a>
				</li>								
			</ul>
		</div>
	</div>
</body>
</html>
