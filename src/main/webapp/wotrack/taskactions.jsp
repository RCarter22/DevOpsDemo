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
		<li>
			<a href="view.action?id=<s:property value='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue()'/>">
				<span class="emm-return"></span>
				<h3><s:text name="global.parent"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li data-visible="<s:property value="mbo.sigopGranted('STATUS')"/>">
			<a onclick="emm.core.changeStatus()">
				<span class="emm-status"></span>
				<h3><s:text name="global.changestatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../labtrans/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-labor"></span>
				<h3><s:text name="labtrans.labor"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('LABTRANS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../matusetrans/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-material"></span>
				<h3><s:text name="matusetrans.materials"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MATUSETRANS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../worklog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-notes"></span>
				<h3><s:text name="ezmaxmobile.worklog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODIFYWORKLOG').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-attachments"></span>
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
	</ul>
</div>	
