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
			<a class="ui-btn-left" href="../main.action"><img src="../images/homelink.png"/></a>
			<h3 class="ui-title"><s:text name="global.profile"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DEFSITE').getTitle()" /></label>
					<input type="text"
							id="DEFSITE" 
							required="<s:property value="mbo.getMboValueData('DEFSITE').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('DEFSITE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<s:if test="ldap eq true">
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="DEFSITE" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>
					</s:if>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSON.LANGUAGE').getTitle()" /></label>
					<input type="text"
							id="PERSON.LANGUAGE" 
							required="<s:property value="mbo.getMboValueData('PERSON.LANGUAGE').isRequired()"/>"
							disabled="true"
							value="<s:property value="mbo.getString('PERSON.LANGUAGE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSON.LANGUAGE" data-source="MAXLANGCODE" data-display="LANGUAGENAME,MAXLANGCODE" data-search="LANGUAGENAME,MAXLANGCODE"></a>
				</li>		
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSON.LOCALE').getTitle()" /></label>
					<input type="text"
							id="PERSON.LOCALE" 
							required="<s:property value="mbo.getMboValueData('PERSON.LOCALE').isRequired()"/>"
							disabled="true"
							value="<s:property value="mbo.getString('PERSON.LOCALE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSON.LOCALE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSON.TIMEZONE').getTitle()" /></label>
					<input type="text"
							id="PERSON.TIMEZONE" 
							required="<s:property value="mbo.getMboValueData('PERSON.TIMEZONE').isRequired()"/>"
							disabled="true"
							value="<s:property value="mbo.getString('PERSON.TIMEZONE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSON.TIMEZONE"></a>
				</li>	
			</ul>
			<s:include value="actions.jsp"/>
		</div>
	</div>
</body>
