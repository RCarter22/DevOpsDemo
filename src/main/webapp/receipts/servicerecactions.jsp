<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ui-sidebar">
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview ui-inset">
		<li>
			<a href="selectorderedservice.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/addnew.png" />
				<h3><s:text name="receipts.selectorderedservice"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="selectservicereturn.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/addnew.png" />
				<h3><s:text name="receipts.selectservicereturn"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li>
			<a href="selectwinspservices.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/addnew.png" />
				<h3><s:text name="receipts.changeinspectionstatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('RUNREPORTS')"/>">
			<a href="reports.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/reports.png" />
				<h3><s:text name="global.runreports"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>	
