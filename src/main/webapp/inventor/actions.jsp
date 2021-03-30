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
		<li>
			<a href="viewrotatingassets.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<span class="emm-asset"></span>
				<h3><s:text name="inventor.rotatingassets"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>				
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('PHYSCNTADJ')"/>">
			<a href="physicalcount.action?itemnum=<s:property value="mbo.getString('ITEMNUM')"/>&storeroom=<s:property value="mbo.getString('LOCATION')"/>">
				<span class="emm-balance"></span>
				<h3><s:text name="invbalances.physcount"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		<li data-visible="<s:property value="mbo.sigopGranted('RECONCILE')"/>">
			<a href="reconcilebalances.action?id=<s:property value="id"/>">
				<span class="emm-reconcile"></span>
				<h3><s:text name="inventor.reconcilebalance"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li data-visible="<s:property value="mbo.sigopGranted('TRANSFER')"/>">
			<a href="createtransfercurrentitem.action?id=<s:property value="id"/>">
				<span class="emm-transfer"></span>
				<h3><s:text name="inventor.transfercurrentitem"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('ISSUE')"/>">
			<a href="createissuecurrentitem.action?id=<s:property value="id"/>">
				<span class="emm-transfer"></span>
				<h3><s:text name="inventor.issuecurrentitem" /></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
	</ul>
	<p class="ui-section"><s:text name="inventor.viewtransactions"/></p>	
	<ul class="ui-listview ui-inset">
		<li data-visible="<s:property value="mbo.sigopGranted('INVTRANS')"/>">
			<a href="viewreceipts.action?id=<s:property value="id"/>">
				<span class="emm-inventory"></span>
				<h3><s:text name="inventor.receiptsandtransfers"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('INVTRANS')"/>">
			<a href="viewissues.action?id=<s:property value="id"/>">
				<span class="emm-inventory"></span>
				<h3><s:text name="inventor.issuesandreturns"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('INVTRANS')"/>">
			<a href="viewadjustments.action?id=<s:property value="id"/>">
				<span class="emm-inventory"></span>
				<h3><s:text name="inventor.adjustments"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
	</ul>
</div>
