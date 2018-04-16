<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ui-sidebar">
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview ui-inset">
		<li data-visible="<s:property value="mbo.sigopGranted('STATUS')"/>">
			<a onclick="emm.core.changeStatus()">
				<img src="../images/changestatus.png" />
				<h3><s:text name="global.changestatus"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<s:if test="mbo.getString('PARENT') != null and mbo.getString('PARENT') != ''">
			<li class="ui-divider ui-divider-b"></li>
			<li>
				<a href="view.action?id=<s:property value='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue()'/>">
					<img src="../images/asset.png" />
					<h3><s:text name="global.parent"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<li>
			<a href="listsubassemblies.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/asset.png" />
				<h3><s:text name="asset.subassemblies"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('CHILDREN').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="listspareparts.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/inventory.png" />
				<h3><s:text name="asset.spareparts"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('SPAREPART').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		<li>
			<a href="listwos.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/wos.png" />
				<h3><s:text name="asset.workorderhistory"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('ALLWO').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATESR')"/>">
		    <a onclick="emm.util.confirm({message:'<s:text name="asset.createsr"/>',yes:function(){window.location='createservicerequest.action?additionalattrs=ASSETNUM%3D<s:property value='mbo.getString("ASSETNUM")'/>'}});"> 
				<img src="../images/addfollowup.png" />
				<h3><s:text name="asset.createsr"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li data-visible="<s:property value="mbo.sigopGranted('CREATEWO')"/>">
		    <a onclick="emm.util.confirm({message:'<s:text name="sr.createwo"/>',yes:function(){window.location='createworkorder.action?additionalattrs=ASSETNUM%3D<s:property value='mbo.getString("ASSETNUM")'/>'}});">
				<img src="../images/addfollowup.png" />
				<h3><s:text name="sr.createwo"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('METREAD')"/>">
			<a href="../assetmeter/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/meter.png" />
				<h3><s:text name="global.entermeterreadings"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('ASSETMETER').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('REPDOWN')"/>">
			<a href="downtime.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/downtime.png" />
				<h3><s:text name="global.reportdowntime"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('MASSMOVE')"/>">
			<a href="moveassetdialog.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/assetmove.png" />
				<h3><s:text name="global.moveswap"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="classify.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/classification.png" />
				<h3><s:text name="global.classification"/></h3>
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
