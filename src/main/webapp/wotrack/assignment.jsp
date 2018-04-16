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
			<h3 class="ui-title"><s:text name="global.assignment"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							readonly="true"
							value="<s:property value="mbo.getString('STATUS')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TASKID').getTitle()" /></label>
					<input type="text"
							id="TASKID" 
							required="<s:property value="mbo.getMboValueData('TASKID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TASKID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TASKID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TASKID" data-source="TASKID" data-display="TASKID,DESCRIPTION,SITEID" data-search="TASKID,DESCRIPTION,SITEID"></a>
				</li>	
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('WORKORDER.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="WORKORDER.DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('WORKORDER.DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="!mbo.getMboValueData('WORKORDER.DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('WORKORDER.DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('WORKORDER.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CRAFT').getTitle()" /></label>
					<input type="text"
							id="CRAFT" 
							required="<s:property value="mbo.getMboValueData('CRAFT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CRAFT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CRAFT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CRAFT" data-source="CRAFT" data-display="CRAFT,SKILLLEVEL" data-search="CRAFT,SKILLLEVEL"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SKILLLEVEL').getTitle()" /></label>
					<input type="text"
							id="SKILLLEVEL" 
							required="<s:property value="mbo.getMboValueData('SKILLLEVEL').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SKILLLEVEL').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SKILLLEVEL')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SKILLLEVEL" data-source="SKILLLEVEL" data-display="CRAFT,SKILLLEVEL" data-search="CRAFT,SKILLLEVEL"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LABORCODE').getTitle()" /></label>
					<input type="text"
							id="LABORCODE" 
							required="<s:property value="mbo.getMboValueData('LABORCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LABORCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LABORCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LABORCODE" data-source="LABORCODE" data-display="LABORCODE,LABOR.PERSON.DISPLAYNAME,CRAFT" data-search="LABORCODE,LABOR.PERSON.DISPLAYNAME,CRAFT"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SCHEDULEDATE').getTitle()" /></label>
					<input type="text"
							id="SCHEDULEDATE" 
							required="<s:property value="mbo.getMboValueData('SCHEDULEDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SCHEDULEDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('SCHEDULEDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="SCHEDULEDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LABORHRS').getTitle()" /></label>
					<input type="text"
							id="LABORHRS" 
							required="<s:property value="mbo.getMboValueData('LABORHRS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LABORHRS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LABORHRS')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deleteassignment.action?id=<s:property value="id"/>&row=<s:property value="row"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
		<div id="ACTIONS" class="ui-sidebar">
			<p class="ui-section"><s:text name="global.actions"/></p>
			<ul class="ui-listview ui-inset">	
				<li data-visible="">
					<a href="availablelabor.action?id=<s:property value="id"/>&row=<s:property value="row"/>">
						<h3><s:text name="global.availablelabor"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
				<li data-visible="">
					<a href="completeassignment.action?id=<s:property value="id"/>&row=<s:property value="row"/>">
						<h3><s:text name="global.completeassignment"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
		</div>			
	</div>
</body>
