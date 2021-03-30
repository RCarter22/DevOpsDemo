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
				<a class="ui-btn-left ui-btn-e" href="cancel.action"><span class="emm-times-circle"></span></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" href="goback.action"><span class="emm-chevron-left"></span></a>
			</s:else>	
			<h3 class="ui-title"><s:text name="ezmaxmobile.commlog"/></h3>
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-right ui-btn-f" onclick="emm.core.sendCommLog()"><s:text name="global.send"/></a>
			</s:if>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TEMPLATEID').getTitle()" /></label>
					<input type="text"
							id="TEMPLATEID" 
							required="<s:property value="mbo.getMboValueData('TEMPLATEID').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							value="<s:property value="mbo.getString('TEMPLATEID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('TEMPLATEID').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TEMPLATEID" data-source="TEMPLATEID" data-display="TEMPLATEID,DESCRIPTION" data-search="TEMPLATEID,DESCRIPTION"></a>
				</li>			
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SENDTO').getTitle()" /></label>
					<input type="text"
							id="SENDTO" 
							required="<s:property value="mbo.getMboValueData('SENDTO').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							value="<s:property value="mbo.getString('SENDTO')"/>"
							maxlength="<s:property value="mbo.getMboValueData('SENDTO').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CC').getTitle()" /></label>
					<input type="text"
							id="CC" 
							required="<s:property value="mbo.getMboValueData('CC').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							value="<s:property value="mbo.getString('CC')"/>"
							maxlength="<s:property value="mbo.getMboValueData('CC').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BCC').getTitle()" /></label>
					<input type="text"
							id="BCC" 
							required="<s:property value="mbo.getMboValueData('BCC').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							value="<s:property value="mbo.getString('BCC')"/>"
							maxlength="<s:property value="mbo.getMboValueData('BCC').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SENDFROM').getTitle()" /></label>
					<input type="text"
							id="SENDFROM" 
							required="<s:property value="mbo.getMboValueData('SENDFROM').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							value="<s:property value="mbo.getString('SENDFROM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('SENDFROM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SUBJECT').getTitle()" /></label>
					<input type="text"
							id="SUBJECT" 
							required="<s:property value="mbo.getMboValueData('SUBJECT').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							value="<s:property value="mbo.getString('SUBJECT')"/>"
							maxlength="<s:property value="mbo.getMboValueData('SUBJECT').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('MESSAGE').getTitle()" /></label>
					<textarea
							id="MESSAGE" 
							required="<s:property value="mbo.getMboValueData('MESSAGE').isRequired()"/>"
							readonly="<s:property value="!mbo.toBeAdded()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('MESSAGE')"/></textarea>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
