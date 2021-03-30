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
		<s:if test="mbo.getString('PARENT') != null and mbo.getString('PARENT') != ''">
			<li class="ui-divider ui-divider-b"></li>
			<li>
				<a href="view.action?id=<s:property value='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue()'/>">
					<span class="emm-asset"></span>
					<h3><s:text name="global.parent"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<li>
			<a href="listsubassemblies.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-asset"></span>
				<h3><s:text name="asset.subassemblies"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('CHILDREN').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="listspareparts.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-inventory"></span>
				<h3><s:text name="asset.spareparts"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SPAREPART').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		<li>
			<a href="listwos.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-workorder"></span>
				<h3><s:text name="asset.workorderhistory"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('ALLWO').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<s:if test="isEmmMapEnabled()">
			<li class="ui-divider ui-divider-b"></li>
			<li data-native="true">
				<a data-control="map"
					data-modules='["DS_ASSETS"]'					
					data-zoom='["DS_ASSETS", "ASSETUID", "<s:property value="mbo.getUniqueIDValue()"/>", "<s:property value="mbo.getString('SERVICEADDRESS.LATITUDEY')"/>", "<s:property value="mbo.getString('SERVICEADDRESS.LONGITUDEX')"/>"]'
				>
					<span class="emm-map-location"></span>
					<h3><s:text name="global.openmap"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>		
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATESR')"/>">
		    <a onclick="emm.util.confirm({message:'<s:text name="asset.createsr"/>',yes:function(){window.location='createservicerequest.action?additionalattrs=ASSETNUM%3D<s:property value='mbo.getString("ASSETNUM")'/>'}});"> 
				<span class="emm-add-new"></span>
				<h3><s:text name="asset.createsr"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEWO')"/>">
		    <a onclick="emm.util.confirm({message:'<s:text name="sr.createwo"/>',yes:function(){window.location='createworkorder.action?additionalattrs=ASSETNUM%3D<s:property value='mbo.getString("ASSETNUM")'/>'}});">
				<span class="emm-add-new"></span>
				<h3><s:text name="sr.createwo"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li class="ui-divider ui-divider-b"></li>
		<s:if test="isInspectionEnabled() && mbo.getMboSet('$insprlt', 'INSPECTIONRESULT', 'asset=:assetnum and orgid=:orgid and siteid=:siteid').count() > 0">
			<li>
				<a href="listpendinginsp.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
					<span class="emm-inspect"></span>
					<h3><s:text name="ezmaxmobile.inspection"/></h3>
					<span class="ui-bubble"><s:property value="mbo.getMboSet('$insprlt', 'INSPECTIONRESULT', 'asset=:assetnum and orgid=:orgid and siteid=:siteid').count()"/></span>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<li data-visible="<s:property value="mbo.sigopGranted('METREAD')"/>">
			<a href="../assetmeter/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-meter"></span>
				<h3><s:text name="global.entermeterreadings"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('ASSETMETER').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('REPDOWN')"/>">
			<a href="downtime.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-downtime"></span>
				<h3><s:text name="global.reportdowntime"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('MANDWNTIME')"/>">
			<a href="viewdowntime.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-downtime"></span>
				<h3><s:text name="asset.downtimehistory"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODDOWNTIMEHIST').setup().getThisMboSet().count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('MASSMOVE')"/>">
			<a href="moveassetdialog.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-move-asset"></span>
				<h3><s:text name="global.moveswap"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('ASMOVEHIST')"/>">
			<a href="movehistory.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-move-asset"></span>
				<h3><s:text name="asset.viewmovehistory"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="classify.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-classification"></span>
				<h3><s:text name="global.specifications"/></h3>
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
		<li data-visible="<s:property value="mbo.sigopGranted('RUNREPORTS')"/>">
			<a href="reports.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-reports"></span>
				<h3><s:text name="global.runreports"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		
	</ul>
</div>	
