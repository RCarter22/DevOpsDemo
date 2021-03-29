<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ACTIONS" class="ui-sidebar">
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview ui-inset">
		<li data-visible="<s:property value="mbo.sigopGranted('STATUS')"/>">
			<a onclick="emm.core.changeStatus()">
				<span class="emm-status"></span>
				<h3><s:text name="global.changestatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('ROUTEWF')"/>">
			<s:if test="actionBar.isWFActive()">
				<a onclick="emm.core.routeWorkflow()">
					<span class="emm-route-workflow"></span>
					<h3><s:text name="workflow.routeworkflow"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</s:if>
			<s:else>
				<a onclick="emm.core.startWorkflow()">
					<span class="emm-workflow"></span>
					<h3><s:text name="workflow.startworkflow"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</s:else>
		</li>	
		<s:if test="actionBar.isWFActive()">
			<li data-visible="<s:property value="mbo.sigopGranted('ROUTEWF')"/>">
	            <a onclick="emm.core.stopWorkflow()">
	                <span class="emm-stop-workflow"></span>
	                <h3><s:text name="workflow.stopworkflow"/></h3>
					<span class="ui-arrow"></span>
	            </a>
			</li>
		</s:if>
		<s:if test="mbo.getMboSet('WFASSIGNMENT').isEmpty() neq true">
			<li data-visible="<s:property value="mbo.sigopGranted('ASSIGNWF')"/>">
				<a href="../workflow/viewassignments.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<span class="emm-user-group"></span>
					<h3><s:text name="workflow.assignment"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>	
		</s:if>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEPO')"/>">
			<a href="createpo.action">
				<span class="emm-purchase-1"></span>
				<h3><s:text name="pr.createpo"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('RUNREPORTS')"/>">
			<a href="reports.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-reports"></span>
				<h3><s:text name="global.runreports"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>	
