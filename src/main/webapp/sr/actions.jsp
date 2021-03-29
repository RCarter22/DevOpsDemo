<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:if test="offlineModeEnabled eq true">	
	<div id="SYNC_ACTION" class="ui-sidebar" data-native="true" data-visible="false">
		<p class="ui-section"><s:text name="global.synchronization"/></p>
		<ul class="ui-listview ui-inset">
			<li>
				<a onclick="EMMServer.Offline.sync()">
					<span class="emm-sync"></span>
					<h3><s:text name="global.syncserver"/></h3>
					<span class="ui-badge"><s:text name="global.sync"/></span> 
					<span class="ui-arrow"></span>
				</a>
			</li>
		</ul>
	</div>
</s:if>

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
			<li data-visible="<s:property value="mbo.sigopGranted('STOPWF')"/>">
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
		<li data-visible="<s:property value="mbo.sigopGranted('OWNERSHIP')"/>">
			<a href="takeownership.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-owner-select-1"></span>
				<h3><s:text name="global.takeownership"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('OWNER')"/>">
			<a onclick="emm.core.selectOwner(this)" data-field="OWNER" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME">
				<span class="emm-owner-select-1"></span>
				<h3><s:text name="global.selectowner"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<s:if test="isEmmMapEnabled()">		
			<li class="ui-divider ui-divider-b"></li>
			<li data-native="true">
				<a data-control="map"
					data-modules='["DS_SRS"]'					
					data-zoom='["DS_SRS", "TICKETUID", "<s:property value="mbo.getUniqueIDValue()"/>", "<s:property value="mbo.getString('SERVICEADDRESS.LATITUDEY')"/>", "<s:property value="mbo.getString('SERVICEADDRESS.LONGITUDEX')"/>"]'
				>
					<span class="emm-map-location"></span>
					<h3><s:text name="global.openmap"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEWO')"/>">
			<a onclick="emm.util.confirm({message:'<s:text name="sr.createwo"/>',yes:function(){window.location='createworkorder.action?id=<s:property value='mbo.getUniqueIDValue()'/>'}});">
				<span class="emm-add-new"></span>
				<h3><s:text name="sr.createwo"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li class="ui-divider ui-divider-b"></li>	
		<li>
			<a href="classify.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-classification"></span>
				<h3><s:text name="global.classification"/></h3>
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
			<a href="../worklog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-notes"></span>
				<h3><s:text name="ezmaxmobile.worklog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODIFYWORKLOG').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<s:if test="mbo.getMboSet('RELATEDRECORD').isEmpty() neq true">
			<li>
				<a href="listrelated.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<span class="emm-related-records"></span>
					<h3><s:text name="global.relatedrecords"/></h3>
					<span class="ui-bubble"><s:property value="mbo.getMboSet('RELATEDRECORD').count()"/></span>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>			
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-attachments"></span>
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATECOMM')"/>">
			<a href="../commlog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-message"></span>
				<h3><s:text name="ezmaxmobile.commlog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('COMMLOG').count()"/></span>
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
