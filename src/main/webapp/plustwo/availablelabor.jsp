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
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.cancel"/></a>
			<h3 class="ui-title"><s:text name="global.availablelabor"/></h3>
			<a class="ui-btn-right" href="saveavailablelabor.action?id=<s:property value="mbo.getOwner().getUniqueIDValue()"/>"><s:text name="global.ok"/></a>	
		</div>
		<div class="ui-content">		
			<s:include value="../common/statusbar.jsp"/>			
			<s:form name="emm_form" action="#" method="post">			
				<ul class="ui-listview">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('FROMDATE').getTitle()" /></label>
						<input type="text"
								id="FROMDATE" 
								required="<s:property value="mbo.getMboValueData('FROMDATE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('FROMDATE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('FROMDATE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="FROMDATE"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('TODATE').getTitle()" /></label>
						<input type="text"
								id="TODATE" 
								required="<s:property value="mbo.getMboValueData('TODATE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('TODATE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('TODATE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="TODATE"></a>
					</li>			
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('ASSIGNED').getTitle()" /></label>
						<input type="checkbox"
								id="ASSIGNED" 
								readonly="<s:property value="mbo.getMboValueData('ASSIGNED').isReadOnly()"/>"
								value="<s:property value="mbo.getString('ASSIGNED')"/>"
								onchange="emm.core.setValue(this)"
						/>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
						<input type="text"
								id="LOCATION" 
								required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
								value="<s:property value="mbo.getString('LOCATION')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"><s:text name="global.lookup"/></a>
					</li>
				</ul>
				<div class="ui-btn-container" style="width: 300px; margin: 0 auto;">
					<input class="ui-btn-a" type="submit" value="<s:text name="global.refresh"/>"/>
				</div>				
			</s:form>
			<ul class="ui-listview" id="emm_filterform">
				<li class="ui-divider"><s:text name="global.availablelabor"/></li>
				<s:if test="mboList.size > 0">
					<s:include value="../common/pagination.jsp"/>												
					<s:iterator value="mboList">
						<li>
							<a href="selectassignlabor.action?id=<s:property value="id"/>&row=<s:property value="row"/>&selectedrow=<s:property value="getUniqueIDValue()"/>">
								<p><strong><s:property value="getMboValueInfoStatic('LABORCODE').getTitle()"/>: <s:property value="getString('LABORCODE')"/></strong></p>								
								<h3><s:property value="getMboValueInfoStatic('PERSON.DISPLAYNAME').getTitle()"/>: <s:property value="getString('PERSON.DISPLAYNAME')"/></h3>
								<p><s:property value="getMboValueInfoStatic('LABORCRAFTRATE.CRAFT').getTitle()"/>: <s:property value="getString('LABORCRAFTRATE.CRAFT')"/></p>
								<p><s:property value="getMboValueInfoStatic('LABORCRAFTRATE.SKILLLEVEL').getTitle()"/>: <s:property value="getString('LABORCRAFTRATE.SKILLLEVEL')"/></p>
								<p><s:property value="getMboValueInfoStatic('WORKLOCATION').getTitle()"/>: <s:property value="getString('WORKLOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('PERSON.PERSONCAL.SHIFTNUM').getTitle()"/>: <s:property value="getString('PERSON.PERSONCAL.SHIFTNUM')"/></p>
								<p><s:property value="getMboValueInfoStatic('STARTTIME').getTitle()"/>: <s:property value="getString('STARTTIME')"/></p>
								<p><s:property value="getMboValueInfoStatic('AVAILABILITY').getTitle()"/>: <s:property value="getString('AVAILABILITY')"/></p>
								<p><s:property value="getMboValueInfoStatic('ASSIGNED').getTitle()"/>: <s:property value="getBoolean('ASSIGNED')"/></p>
								<span class="ui-arrow"></span>									
							</a>
						</li>
					</s:iterator>							
					<s:include value="../common/pagination.jsp"/>
				</s:if>
				<s:else>
					<div class="ui-statusbar ui-statusbar-c">	
						<h3 class="ui-title"><s:text name="global.norecords"/></h3>
					</div>
				</s:else>					
			</ul>
			
		</div>
	</div>		
</body>
</html>
