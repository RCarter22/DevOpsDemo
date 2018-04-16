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
			<a href="selectordereditem.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/addnew.png" />
				<h3><s:text name="receipts.selectordereditem"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="selectitemreturn.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/addnew.png" />
				<h3><s:text name="receipts.selectitemreturn"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li>
			<a href="receiverotatingitem.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/addnew.png" />
				<h3><s:text name="receipts.receiverotatingitem"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>				
		<li data-visible="<s:property value="mbo.sigopGranted('RUNREPORTS')"/>">
			<a href="reports.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/reports.png" />
				<h3><s:text name="global.runreports"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>	
