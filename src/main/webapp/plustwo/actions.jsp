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
		<li>
			<a href="tasklist.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/tasks.png" />
				<h3><s:text name="wotrack.tasks"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('WO_TASKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../nonstock/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/material.png" />
				<h3><s:text name="Nonstock"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('REP_ACTSERV').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../labtrans/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/labor.png" />
				<h3><s:text name="labtrans.labor"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SHOWACTUALLABOR').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li> 
		
		<%-- <li data-visible="<s:property value="mbo.sigopGranted('ROUTEWF')"/>">
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
			<li data-visible="<s:property value="mbo.sigopGranted('ROUTEWF')"/>">
	            <a onclick="emm.core.stopWorkflow()">
	                <img src="../images/stopworkflow.png" />
	                <h3><s:text name="workflow.stopworkflow"/></h3>
					<span class="ui-arrow"></span>
	            </a>
			</li>
		</s:if> --%>
		
		<li class="ui-divider ui-divider-b"></li>
		<li>
			<a href="downtime.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/downtime.png" />
				<%-- <h3><s:text name="global.reportdowntime"/></h3> --%>
				<h3>Change Downtime Status</h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('PLUSTMETREAD')"/>">
			<a href="meter.action?id=<s:property value='mbo.getUniqueIDValue()'/>&meterRelationship=ACTIVEASSETMETER">
				<img src="../images/meter.png" />
				<h3><s:text name="global.entermeterreadings"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('ACTIVEASSETMETER').count()+mbo.getMboSet('ACTIVELOCATIONMETER').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>	
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
		<li>
			<a href="assignments.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/usergroup.png" />
				<h3><s:text name="global.assignments"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>		
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
		<li>
			<a href="../worklog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/notes.png" />
				<h3><s:text name="ezmaxmobile.worklog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODIFYWORKLOG').count()"/></span>
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
		<%-- <li>
			<a href="../wplabor/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/labor.png" />
				<h3><s:text name="wotrack.plannedlabor"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SHOWPLANLABOR').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../wpmaterial/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/material.png" />
				<h3><s:text name="wotrack.plannedmaterials"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SHOWPLANMATERIAL').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../wpservice/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/tasks.png" />
				<h3><s:text name="wotrack.plannedservices"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SHOWPLANSERVICE').count()"/></span>
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
		</li> --%>
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/attachment.png" />
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<s:if test="mbo.getMboSet('CHILDNOTASK').isEmpty() neq true">
			<li>
				<a href="listChildren.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<img src="../images/childwo.png" />
					<h3><s:text name="wotrack.childwo"/></h3>
					<span class="ui-bubble"><s:property value="mbo.getMboSet('CHILDNOTASK').count()"/></span>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>	
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEWO')"/>">
			<a onclick="emm.util.confirm({message:'<s:text name="wotrack.createfollowup"/>',yes:function(){window.location='createfollowup.action?id=<s:property value='mbo.getUniqueIDValue()'/>'}});">
				<img src="../images/addfollowup.png" />
				<h3><s:text name="wotrack.createfollowup"/></h3>
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
		
		<li data-visible="<s:property value="mbo.sigopGranted('INSERT')"/>">
			<a onclick="emm.util.confirm({message:'<s:text name="wotrack.createchild"/>',yes:function(){window.location='createchild.action?id=<s:property value='mbo.getUniqueIDValue()'/>'}});">
				<img src="../images/createchild.png" />
				<h3><s:text name="wotrack.createchild"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		
		<%-- <li data-visible="<s:property value="mbo.sigopGranted('PLUSREVIEW')"/>">
			<a href="../pluscds/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/datasheet.png" />
				<h3><s:text name="wotrack.datasheet"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('PLUSCWODS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>		 --%>
		 
		<%-- <li>
			<a href="../matusetrans/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/material.png" />
				<h3><s:text name="matusetrans.materials"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MATUSETRANS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li> --%>
		
		
		<li>
			<a href="failurereporting.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/failurereport.png" />
				<h3><s:text name="global.failurereporting"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		
		<li class="ui-divider ui-divider-b"></li>
		<%-- <li>
			<a href="multiassetlist.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/multiasset.png" />
				<h3><s:text name="global.multiassetloc"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MULTIASSETLOCCI').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li> --%>
		
		<%-- <li data-visible="<s:property value="mbo.sigopGranted('MASSMOVE')"/>">
			<a href="moveassetdialog.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/assetmove.png" />
				<h3><s:text name="global.moveswap"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	 --%>
		
	
		<%-- <li>
			<a onclick="$('#createdr').submit();">
				<img src="../images/purchase.png" />
				<h3><s:text name="wotrack.createdr" /></h3>
				<span class="ui-arrow"></span>
			</a>
			<s:form id="createdr" action="../createdr/create.action" method="GET">
				<s:hidden name="wonum" value="%{mbo.getString('WONUM')}"/>
				<s:hidden name="description" value="%{mbo.getString('DESCRIPTION')}"/>
			</s:form>
		</li> --%>
		
		<li data-visible="<s:property value="pushEnabled"/>">
			<a data-control="dialog" href="#notification">
				<img src="../images/notification.png" />
				<h3><s:text name="global.send"/> <s:text name="global.notification"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="pushEnabled"/>">
			<a href="../notification/history.action?client=emm&appName=WOTRACK&recordId=<s:property value="mbo.getUniqueIDValue()" />">
				<img src="../images/wolist.png" />
				<h3><s:text name="global.notificationhistory"/></h3>
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
 	 <div class="ui-btn-container" data-visible="<s:property value="mbo.sigopGranted('STARTTIMER')"/>">
		<s:if test="mbo.getMboSet('$MYACTIVETIMER', 'LABTRANS', \"refwo=:wonum and siteid=:siteid and timerstatus in (select value from synonymdomain where domainid = 'TIMERSTATUS' and maxvalue = 'ACTIVE') and laborcode = (select laborcode from labor where personid = :&PERSONID& and orgid = :orgid)\").isEmpty()">
			<a href="starttimer.action" class="ui-btn-e"><s:text name="labtrans.starttimer"/></a>			
		</s:if>
		<s:else>
			<a href="stoptimer.action" class="ui-btn-c"><s:text name="labtrans.stoptimer"/></a>
		</s:else>
	</div>	  
</div>	


