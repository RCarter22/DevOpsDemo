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
			<h3 class="ui-title"><s:text name="Operators and Fleet Groups"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
		</div>
	
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSONID').getTitle()" /></label>
					<input type="text"
							id="PERSONID" 
							required="<s:property value="mbo.getMboValueData('PERSONID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PERSONID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PERSONID')"/>"
							onchange="emm.core.setValue(this)"
					/>	
				</li> 				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSON.DISPLAYNAME').getTitle()" /></label>
					<textarea
							id="PERSON.DISPLAYNAME" 
							required="<s:property value="mbo.getMboValueData('PERSON.DISPLAYNAME').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PERSON.DISPLAYNAME').isReadOnly()"/>"
 							<%-- maxlength="<s:property value="mbo.getMboValueData('PERSON.DISPLAYNAME').getLength()"/>" --%>
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('PERSON.DISPLAYNAME')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISUSER').getTitle()" /></label>
					<input type="checkbox"
							id="ISUSER" 
							required="<s:property value="mbo.getMboValueData('ISUSER').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISUSER').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISUSER')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AEPFLEETSUPERVISOR').getTitle()" /></label>
					<input type="checkbox"
							id="AEPFLEETSUPERVISOR" 
							required="<s:property value="mbo.getMboValueData('AEPFLEETSUPERVISOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AEPFLEETSUPERVISOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AEPFLEETSUPERVISOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>								
			</ul>
		</div>
	</div>
</body>
</html>
