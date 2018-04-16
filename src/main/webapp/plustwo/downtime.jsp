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
		<%-- <ul class="ui-navbar">
			<li>
				<a
					<s:if test="assetDownView eq 'CHANGESTATUS'">
						class="ui-active"
					</s:if>
					<s:else>
						href="downtime.action?id=<s:property value='mbo.getUniqueIDValue()'/>&assetDownView=CHANGESTATUS"
					</s:else>
				>
					<s:text name="wotrack.changestatus"/>
				</a>
				</li>
			<li>
				<a
					<s:if test="assetDownView eq 'REPORTDOWNTIME'">
						class="ui-active"
					</s:if>
					<s:else>
						href="downtime.action?id=<s:property value='mbo.getUniqueIDValue()'/>&assetDownView=REPORTDOWNTIME"
					</s:else>
				>
					<s:text name="wotrack.reportdowntime"/>
				</a>
				</li>
		</ul>	
 --%>		<div class="ui-content">
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
					<input type="text"
							id="ISRUNNING" 
							required="<s:property value="mbo.getMboValueData('ISRUNNING').isRequired()"/>"
							readonly="true"
							value="<s:if test="mbo.getBoolean('ISRUNNING')">Yes</s:if><s:else>No</s:else>"
					/>
				</li>				
			</ul>
			
			<%-- <p class="ui-section">Downtime Report</p>					
			<ul class="ui-listview">
				<s:if test="assetDownView eq 'CHANGESTATUS'">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUSCHANGEDATE').getTitle()" /></label>
						<input type="text"
								id="STATUSCHANGEDATE" 
								required="<s:property value="mbo.getMboValueData('STATUSCHANGEDATE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('STATUSCHANGEDATE').isReadOnly()"/>"
								value="<s:property value="mbo.getDate('STATUSCHANGEDATE').getTime()"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="STATUSCHANGEDATE"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUSCHANGECODE').getTitle()" /></label>
						<input type="text"
								id="STATUSCHANGECODE" 
								required="<s:property value="mbo.getMboValueData('STATUSCHANGECODE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('STATUSCHANGECODE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('STATUSCHANGECODE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STATUSCHANGECODE"></a>
					</li>
				</s:if>
				<s:else>
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
				</s:else>
			</ul> --%>
			
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
							name="type"
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
							name="type"
							onclick="emm.core.setValue(this)"
					/>
				</li>
			</ul>
			<s:if test="assetDownView eq 'REPORTDOWNTIME'">
				<p class="ui-section">Start Date Default</p>
				<ul class="ui-listview ui-radiobutton">
				    <li>
						<label for="checkdate1">Reported Date</label>
						<input type="radio"
								id="checkdate1" 
								value="REPORTDATE"
								<s:if test="mbo.getString('STARTDATESOURCE') eq 'REPORTDATE' ">checked="checked"</s:if>
								data-mbo="DOWNTIMEREPORT"
								data-field="STARTDATESOURCE"
								onclick="emm.core.setValue(this);window.location.reload()"
								name="date"
						/>
					</li>		
				    <li>
						<label for="checkdate2">Acual Start Date</label>
						<input type="radio"
								id="checkdate2"
								value="ACTSTART"
								<s:if test="mbo.getString('STARTDATESOURCE') eq 'ACTSTART'">checked="checked"</s:if>
								data-mbo="DOWNTIMEREPORT"
								data-field="STARTDATESOURCE"
								onclick="emm.core.setValue(this);window.location.reload()"
								name="date"
						/>
					</li>
					<li>
						<label for="checkdate3">None</label>
						<input type="radio"
								id="checkdate3"
								value="NONE"
								<s:if test="mbo.getString('STARTDATESOURCE') eq 'NONE' ">checked="checked"</s:if>
								data-mbo="DOWNTIMEREPORT"
								data-field="STARTDATESOURCE"
								onclick="emm.core.setValue(this);window.location.reload()"
								name="date"
						/>
					</li>
				</ul>
			</s:if>
			

		</div>
	</div>
</body>
</html>
