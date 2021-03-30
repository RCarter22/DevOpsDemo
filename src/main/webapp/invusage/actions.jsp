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
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('SELITEMS')"/>">
			<a href="selectitems.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-add"></span>
				<h3><s:text name="invusage.selectitems"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('RETURNS')"/>">
			<a href="selectitemreturn.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-add"></span>
				<h3><s:text name="invusage.returnitems"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li data-visible="<s:property value="mbo.sigopGranted('RESITEMS')"/>">
			<a href="selectreserveditems.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-add"></span>
				<h3><s:text name="invusage.reserveditems"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('SPAREPARTS')"/>">
			<a href="selectspareparts.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-add"></span>
				<h3><s:text name="invusage.spareparts"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('RUNREPORTS')"/>">
			<a href="reports.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-reports"></span>
				<h3><s:text name="global.runreports"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>
