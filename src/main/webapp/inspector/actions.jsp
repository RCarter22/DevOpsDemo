<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ACTIONS" class="ui-sidebar" >
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview">
		<li ng-repeat="q in inspection.getTopLevelQuestions()" ng-hide="q.TOTALCOUNT == 0">
			<a scroll-to="#groupseq{{q.GROUPSEQ}}">
				<span ng-class="[q.COMPLETECOUNT == q.TOTALCOUNT ? 'emm-check-circle complete' : 'emm-circle-o incomplete']"></span>
				<h3 class="ui-wrap" style="padding-right:10px;">{{q.GROUPSEQ + '. ' + q.DESCRIPTION}}</h3>
				<span class="ui-bubble" style="font-size:17px; -webkit-border-radius: 10px;">
								{{q.COMPLETECOUNT}} / {{q.TOTALCOUNT}}
							</span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider"></li>
		<s:if test="!mbo.getString('FUPOBJECT').isEmpty() || mbo.getMboSet('$ifr', 'INSPFIELDRESULT', 'RESULTNUM=:RESULTNUM AND ORGID=:ORGID AND SITEID=:SITEID AND FUPOBJECT iS NOT NULL').count() > 0">
			<li>
				<a href="listfollowups.action">
					<i class="emm-workorder"></i>
					<h3><s:text name="inspection.inspfollowup"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:if>
		<s:else>
			<li ng-show="inspection.isStatusComplete()" >
				<a href="createwoinspresult.action">
					<i class="emm-workorder"></i>
					<h3><s:text name="inspection.createworkorder"/></h3>
					<span class="ui-arrow"></span>
				</a>
			</li>
		</s:else>
		<li ng-show="inspection.REFERENCEOBJECT == 'WORKORDER'" >
			<a ng-click="goToWorkOrder('relatedworkorder')">
				<i class="emm-return"></i>
				<h3><s:text name="inspection.returntoworkorder"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li ng-show="inspection.isStatusComplete() && inspection.ASSETID" >
			<a ng-href="../asset/view.action?id={{inspection.ASSETID}}">
				<i class="emm-asset"></i>
				<h3><s:text name="inspection.viewassetdetails"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li ng-show="inspection.isStatusComplete() && inspection.LOCATIONSID" >
			<a ng-href="../location/view.action?id={{inspection.LOCATIONSID}}">
				<i class="emm-location"></i>
				<h3><s:text name="inspection.viewlocationdetails"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li ng-show="inspection.isStatusComplete() && inspection.ASSETID && inspection.CHILDASSET > 0" >
			<a ng-href="relatedassets.action?id={{inspection.ASSETID}}">
				<i class="emm-asset"></i>
				<h3><s:text name="inspection.inspectrelatedassets"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li ng-show="inspection.isStatusComplete()" >
			<a href="reports.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<i class="emm-reports"></i>
				<h3><s:text name="global.runreports"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<%-- Support Maximo Take Actions on completed inspection --%>
		<%-- <li ng-show="inspection.isStatusComplete()" >
            <a href="inspactions.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
                <i class="emm-workflow"></i>
                <h3>Take Actions</h3>
                <span class="ui-arrow"></span>
            </a>
        </li> --%>
	</ul>
</div>