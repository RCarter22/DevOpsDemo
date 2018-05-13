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
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BULLETINBOARDID').getTitle()" /></label>
					<input type="text"
							id="BULLETINBOARDID" 
							required="<s:property value="mbo.getMboValueData('BULLETINBOARDID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BULLETINBOARDID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BULLETINBOARDID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('BULLETINBOARDID').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SUBJECT').getTitle()" /></label>
					<input type="text"
							id="SUBJECT" 
							required="<s:property value="mbo.getMboValueData('SUBJECT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SUBJECT').isReadOnly()"/>"
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
							readonly="<s:property value="mbo.getMboValueData('MESSAGE').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('MESSAGE')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('POSTDATE').getTitle()" /></label>
					<input type="text"
							id="POSTDATE" 
							required="<s:property value="mbo.getMboValueData('POSTDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('POSTDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('POSTDATE').getTime()"/>"
							maxlength="<s:property value="mbo.getMboValueData('POSTDATE').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="POSTDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('EXPIREDATE').getTitle()" /></label>
					<input type="text"
							id="EXPIREDATE" 
							required="<s:property value="mbo.getMboValueData('EXPIREDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('EXPIREDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('EXPIREDATE').getTime()"/>"
							maxlength="<s:property value="mbo.getMboValueData('EXPIREDATE').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="EXPIREDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('POSTBY').getTitle()" /></label>
					<input type="text"
							id="POSTBY" 
							required="<s:property value="mbo.getMboValueData('POSTBY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('POSTBY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('POSTBY')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							required="<s:property value="mbo.getMboValueData('STATUS').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('STATUS')"/>"
					/>
				</li>				
			</ul>
			<p class="ui-section"><s:text name="global.audience"/></p>
			<ul class="ui-listview">
				<li>
					<a href="bborg.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
						<h3><s:text name="global.organizations"/></h3>
						<span class="ui-bubble"><s:property value="mbo.getMboSet('BBORG').count()"/></span>
						<span class="ui-arrow"></span>
					</a>
				</li>
				<li>
					<a href="bbsite.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
						<h3><s:text name="global.sites"/></h3>
						<span class="ui-bubble"><s:property value="mbo.getMboSet('BBSITE').count()"/></span>
						<span class="ui-arrow"></span>
					</a>
				</li>
				<li>
					<a href="bbgroup.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
						<h3><s:text name="global.persongroups"/></h3>
						<span class="ui-bubble"><s:property value="mbo.getMboSet('BBGROUP').count()"/></span>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
			<s:include value="actions.jsp"/>	
		</div>
	</div>
</body>
