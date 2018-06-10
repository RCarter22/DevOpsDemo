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
				<img src="../images/returnarrow.png" />
				<h3><s:text name="global.parent"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li data-visible="<s:property value="mbo.sigopGranted('STATUS')"/>">
			<a onclick="emm.core.changeStatus()">
				<img src="../images/changestatus.png" />
				<h3><s:text name="global.changestatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../labtrans/main2.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/labor.png" />
				<h3><s:text name="labtrans.labor"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('LABTRANS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../matusetrans/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/material.png" />
				<h3><s:text name="ezmaxmobile.inventor"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MATUSETRANS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<%-- <li>
			<a href="../worklog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/notes.png" />
				<h3><s:text name="ezmaxmobile.worklog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODIFYWORKLOG').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/attachment.png" />
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li> --%>
		
	</ul>
	<%-- <div class="ui-btn-container" data-visible="<s:property value="mbo.sigopGranted('STARTTIMER')"/>">
			<s:if test="mbo.getMboSet('$MYACTIVETIMER', 'LABTRANS', \"refwo=:wonum and siteid=:siteid and timerstatus in (select value from synonymdomain where domainid = 'TIMERSTATUS' and maxvalue = 'ACTIVE') and laborcode = (select laborcode from labor where personid = :&PERSONID& and orgid = :orgid)\").isEmpty()">
				<a href="starttimer.action" class="ui-btn-e"><s:text name="labtrans.starttimer"/></a>			
			</s:if>
			<s:else>
				<a href="stoptimer.action" class="ui-btn-c"><s:text name="labtrans.stoptimer"/></a>
			</s:else>
		</div>
	 --%>
</div>	
