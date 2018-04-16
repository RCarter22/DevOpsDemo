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
			<h3 class="ui-title"><s:text name="plustasset.aliases"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('setOtherRecordsAsNonDefault.action')"><s:text name="global.save"/></a>
		</div>
	
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input readonly value="<s:property value="mbo.getString('ASSETNUM')"/>"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ALIAS').getTitle()" /></label>
					<input type="text"
							id="ALIAS" 
							required="<s:property value="mbo.getMboValueData('ALIAS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ALIAS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ALIAS')"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('ISACTIVE').getTitle()" /></label>
					<input type="checkbox"
							id="ISACTIVE" 
							required="<s:property value="mbo.getMboValueData('ISACTIVE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISACTIVE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISACTIVE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISDEFAULT').getTitle()" /></label>
					<input type="checkbox"
							id="ISDEFAULT" 
							required="<s:property value="mbo.getMboValueData('ISDEFAULT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISDEFAULT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISDEFAULT')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>								
			</ul>
		</div>
	</div>
</body>
</html>
