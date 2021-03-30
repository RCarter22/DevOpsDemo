<%--
* Copyright © 2012 InterPro Solutions, LLC
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
		<s:if test="isInspectionEnabled() && mbo.getMboSet('INSPECTIONRESULT').count() > 0">
			<li>
				<a href="listpendinginsp.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<span class="emm-inspect"></span>
					<h3><s:text name="ezmaxmobile.inspection"/></h3>
					<span class="ui-bubble"><s:property value="mbo.getMboSet('INSPECTIONRESULT').count()"/></span>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<li data-visible="<s:property value="mbo.sigopGranted('METREAD')"/>">
			<a href="../locationmeter/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-meter"></span>
				<h3><s:text name="global.entermeterreadings"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('LOCATIONMETER').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="classify.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-classification"></span>
				<h3><s:text name="global.classification"/></h3>
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
		<li class="ui-divider ui-divider-b"></li>
		<li>
			<a href="listassets.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-asset"></span>
				<h3><s:text name="ezmaxmobile.asset"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('PLUSCASSET').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="listwodetail.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-workorder"></span>
				<h3><s:text name="global.workdetails"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="associatesystems.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-classification"></span>
				<h3><s:text name="location.associatesystems"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATESR')"/>">
		    <a onclick="emm.util.confirm({message:'<s:text name="location.createsr"/>',yes:function(){window.location='createservicerequest.action?additionalattrs=LOCATION%3D<s:property value='mbo.getString("LOCATION")'/>'}});"> 
				<span class="emm-add-new"></span>
				<h3><s:text name="asset.createsr"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="listsr.action?id=<s:property value='mbo.getUniqueIDValue()'/>"> 
				<span class="emm-add-new"></span>
				<h3><s:text name="sr.viewsr"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SRLOC').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEWO')"/>">
		    <a onclick="emm.util.confirm({message:'<s:text name="location.createwo"/>',yes:function(){window.location='createworkorder.action?additionalattrs=LOCATION%3D<s:property value='mbo.getString("LOCATION")'/>'}});">
				<span class="emm-add-new"></span>
				<h3><s:text name="sr.createwo"/></h3>
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
