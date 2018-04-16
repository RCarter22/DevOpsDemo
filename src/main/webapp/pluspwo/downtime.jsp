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
			<h3 class="ui-title">Report Downtime</h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" href="dodowntime.action"><s:text name="global.save"/></a>
		</div>
	
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISRUNNING').getTitle()" /></label>
					<input type="checkbox"
							id="ISRUNNING" 
							required="<s:property value="mbo.getMboValueData('ISRUNNING').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('ISRUNNING')"/>"
					/>
				</li>				
			</ul>
			
			<p class="ui-section">Downtime Report</p>		
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTDATE').getTitle()" /></label>
					<input type="text"
							id="STARTDATE" 
							required="<s:property value="mbo.getMboValueData('STARTDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('STARTDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="STARTDATE"></a>
				</li>		
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENDDATE').getTitle()" /></label>
					<input type="text"
							id="ENDDATE" 
							required="<s:property value="mbo.getMboValueData('ENDDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENDDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('ENDDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="ENDDATE"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DOWNTIME').getTitle()" /></label>
					<input type="text"
							id="DOWNTIME" 
							required="<s:property value="mbo.getMboValueData('DOWNTIME').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DOWNTIME').isReadOnly()"/>"
							value="<s:property value="mbo.getString('DOWNTIME')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CODE').getTitle()" /></label>
					<input type="text"
							id="CODE" 
							required="<s:property value="mbo.getMboValueData('CODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CODE"></a>
				</li>
			</ul>
			
			<p class="ui-section">Downtime Type</p>
			<ul class="ui-listview ui-radiobutton">
			    <li>
					<label for="check1">Operational</label>
					<input type="radio"
							id="check1" 
							value="1"
							<s:if test="mbo.getString('OPERATIONAL') eq 1">checked="checked"</s:if>
							data-mbo="DOWNTIMEREPORT"
							data-field="OPERATIONAL"
							onclick="emm.core.setValue(this)"
					/>
				</li>		
			    <li>
					<label for="check2">Non-Operational</label>
					<input type="radio"
							id="check2"
							value="0"
							<s:if test="mbo.getString('OPERATIONAL') eq 0">checked="checked"</s:if>
							data-mbo="DOWNTIMEREPORT"
							data-field="OPERATIONAL"
							onclick="emm.core.setValue(this)"
					/>
				</li>
			</ul>

		</div>
	</div>
</body>
</html>
