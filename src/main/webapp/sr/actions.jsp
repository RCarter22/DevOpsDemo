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
					<img src="../images/sync.png" />
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
				<img src="../images/changestatus.png" />
				<h3><s:text name="global.changestatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('ROUTEWF')"/>">
			<s:if test="actionBar.isWFActive()">
				<a onclick="emm.core.routeWorkflow()">
					<img src="../images/routeworkflow.png" />
					<h3><s:text name="workflow.routeworkflow"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</s:if>
			<s:else>
				<a onclick="emm.core.startWorkflow()">
					<img src="../images/workflow.png" />
					<h3><s:text name="workflow.startworkflow"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</s:else>
		</li>	
		<s:if test="actionBar.isWFActive()">
			<li data-visible="<s:property value="mbo.sigopGranted('STOPWF')"/>">
	            <a onclick="emm.core.stopWorkflow()">
	                <img src="../images/stopworkflow.png" />
	                <h3><s:text name="workflow.stopworkflow"/></h3>
					<span class="ui-arrow"></span>
	            </a>
			</li>
		</s:if>
		<s:if test="mbo.getMboSet('WFASSIGNMENT').isEmpty() neq true">
			<li data-visible="<s:property value="mbo.sigopGranted('ASSIGNWF')"/>">
				<a href="../workflow/viewassignments.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<img src="../images/usergroup.png" />
					<h3><s:text name="workflow.assignment"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>	
		</s:if>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('OWNERSHIP')"/>">
			<a href="takeownership.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/takeownership.png" />
				<h3><s:text name="global.takeownership"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('OWNER')"/>">
			<a onclick="emm.core.selectOwner(this)" data-field="OWNER" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME">
				<img src="../images/selectowner.png" />
				<h3><s:text name="global.selectowner"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEWO')"/>">
			<a onclick="emm.util.confirm({message:'<s:text name="sr.createwo"/>',yes:function(){window.location='createworkorder.action?id=<s:property value='mbo.getUniqueIDValue()'/>'}});">
				<img src="../images/addfollowup.png" />
				<h3><s:text name="sr.createwo"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li class="ui-divider ui-divider-b"></li>	
		<li>
			<a href="classify.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/classification.png" />
				<h3><s:text name="global.classification"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>				
		<li>
			<a href="../labtrans/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/labor.png" />
				<h3><s:text name="labtrans.labor"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('LABTRANS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../worklog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/notes.png" />
				<h3><s:text name="ezmaxmobile.worklog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODIFYWORKLOG').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<s:if test="mbo.getMboSet('RELATEDRECORD').isEmpty() neq true">
			<li>
				<a href="listrelated.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<img src="../images/relatedrecords.png" />
					<h3><s:text name="global.relatedrecords"/></h3>
					<span class="ui-bubble"><s:property value="mbo.getMboSet('RELATEDRECORD').count()"/></span>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>			
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/attachment.png" />
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATECOMM')"/>">
			<a href="../commlog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/email.png" />
				<h3><s:text name="ezmaxmobile.commlog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('COMMLOG').count()"/></span>
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
