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
			<h3 class="ui-title"><s:text name="ezmaxmobile.worklog"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			
			<ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew()'/>">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="#" onclick="emm.core.movePrev('prevlog.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
					<div class="ui-container">
						<span><s:text name="global.prev"/></span>
						<span><s:text name="global.next"/></span>
					</div>
					<a class="ui-pagination-next" href="#" onclick="emm.core.moveNext('nextlog.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>	
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOGTYPE').getTitle()" /></label>
					<input type="text"
							id="LOGTYPE" 
							required="<s:property value="mbo.getMboValueData('LOGTYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOGTYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOGTYPE')"/>"
							maxlength="<s:property value="mbo.getMboValueData('LOGTYPE').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOGTYPE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CREATEBY').getTitle()" /></label>
					<input type="text"
							id="CREATEBY" 
							required="<s:property value="mbo.getMboValueData('CREATEBY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CREATEBY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CREATEBY')"/>"
							maxlength="<s:property value="mbo.getMboValueData('CREATEBY').getLength()"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CREATEDATE').getTitle()" /></label>
					<input type="text"
							id="CREATEDATE" 
							required="<s:property value="mbo.getMboValueData('CREATEDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CREATEDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CREATEDATE')"/>"
							maxlength="<s:property value="mbo.getMboValueData('CREATEDATE').getLength()"/>"
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
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
