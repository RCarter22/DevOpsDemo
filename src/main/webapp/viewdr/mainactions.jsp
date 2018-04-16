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
		<s:if test="mbo.isAPPR() == false">
			<li>
				<a href="../createdr/mrlines.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<img src="../images/purchase.png" />
					<h3><s:text name="mr.editrequisition"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<s:else>
			<li data-visible="<s:property value="mbo.sigopGranted('STATUS')"/>">
				<a onclick="emm.core.changeStatus()">
					<img src="../images/changestatus.png" />
					<h3><s:text name="global.changestatus"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>			
		</s:else>
	</ul>
</div>	
