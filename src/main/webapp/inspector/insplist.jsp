<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="e" uri="https://www.owasp.org/index.php/OWASP_Java_Encoder_Project" %>

<!DOCTYPE html>
<html>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
</head>

<body>
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" href="main.action"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="inspection.conductinspection"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="RESULTNUM,ASSET,LOCATION,INSPECTIONFORM.NAME,STATUS"><span class="emm-barcode-3"></span></a>		
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<ul class="ui-navbar">			
			<li><a href="insplist.action?inspstatus=PENDING" class="<s:if test="inspstatus.equalsIgnoreCase('PENDING')">ui-active</s:if>"><s:text name="inspection.pending"/></a>
			<li><a href="insplist.action?inspstatus=INPROG" class="<s:if test="inspstatus.equalsIgnoreCase('INPROG')">ui-active</s:if>"><s:text name="inspection.inprogress"/></a>
			<li><a href="insplist.action?inspstatus=COMPLETED" class="<s:if test="inspstatus.equalsIgnoreCase('COMPLETED')">ui-active</s:if>"><s:text name="inspection.completed"/></a>			
		</ul>	
		<div class="ui-content">
			<div class="ui-searchbar">
				<s:form id="quicksearch" action="doquicksearch" method="post">
				    <input type="hidden" name="searchFlds" value="RESULTNUM,ASSET,LOCATION,INSPECTIONFORM.NAME,STATUS"/>	
					<input type="search" placeholder="<s:text name="global.quicksearch"/>" name="search" maxlength="100" value="<e:forHtml value="${search}" />" />
				</s:form>	
			</div>
			
			<s:if test="mboList.size > 0">
				<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="ASSET"><s:property value="mbo.getMboValueInfoStatic('ASSET').getTitle()"/></option>
							    <option value="LOCATION"><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()"/></option>
							    <option value="CREATEDATE"><s:property value="mbo.getMboValueInfoStatic('CREATEDATE').getTitle()"/></option>
							    <option value="DUEDATE"><s:property value="mbo.getMboValueInfoStatic('DUEDATE').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>	
			    <ul class="ui-listview">
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<s:if test="!getString('REFERENCEOBJECT').equalsIgnoreCase('PARENTWO')">
							<li>
								<s:if test="inspstatus.equalsIgnoreCase('PENDING')">
									<a style="padding-right:40px" onclick="emm.util.confirm({message:'<s:text name='inspection.startinspection'/>',yes:function(){window.location='startinsp.action?id=<s:property value='getUniqueIDValue()'/>'}});">
								</s:if>
								<s:else>
									<a style="padding-right:40px" href="inspresultlist.action?id=<s:property value="getUniqueIDValue()"/>">
								</s:else>
									<h3 class="ui-wrap"><s:property value="getString('RESULTNUM')"/> &bull; <s:property value="getString('INSPECTIONFORM.NAME')"/></h3>
									<s:if test="!getString('REFERENCEOBJECT').equalsIgnoreCase('ASSET') && !getString('REFERENCEOBJECT').equalsIgnoreCase('LOCATION')">
										<div class="ui-row-2">
											<div class="ui-column">
												<strong><s:property value="getMboValueInfoStatic('WORKORDER.WONUM').getTitle()"/></strong>: <s:property value="getString('WORKORDER.WONUM')"/>
											</div>
											<div class="ui-column">
												<strong><s:text name="wotrack.workorder"/> <s:property value="getMboValueInfoStatic('WORKORDER.DESCRIPTION').getTitle()"/></strong>: <s:property value="getString('WORKORDER.DESCRIPTION')"/>
											</div>
											<div class="ui-column">

											</div>
										</div>
									</s:if>
									<s:if test="!getString('ASSET').equalsIgnoreCase('')">
										<div class="ui-row-2">
											<div class="ui-column">
												<strong><s:property value="getMboValueInfoStatic('ASSET').getTitle()"/></strong>: <s:property value="getString('ASSET')"/>
											</div>
											<div class="ui-column">
												<strong><s:text name="ezmaxmobile.asset"/> <s:property value="getMboValueInfoStatic('ASSET.DESCRIPTION').getTitle()"/></strong>: <s:property value="getString('ASSET.DESCRIPTION')"/>
											</div>
											<div class="ui-column">
														
											</div>
										</div>
									</s:if>
									<s:if test="!getString('LOCATION').equalsIgnoreCase('')">
										<div class="ui-row-2">
											<div class="ui-column">
												<strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/>
											</div>
											<div class="ui-column">
												<strong><s:text name="ezmaxmobile.location"/> <s:property value="getMboValueInfoStatic('LOCATIONS.DESCRIPTION').getTitle()"/></strong>: <s:property value="getString('LOCATIONS.DESCRIPTION')"/>
											</div>
										</div>
									</s:if>
									<div class="ui-row-2">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('CREATEDATE').getTitle()"/></strong>: <s:property value="getString('CREATEDATE')"/>		
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('DUEDATE').getTitle()"/></strong>: <s:property value="getString('DUEDATE')"/>
										</div>
									</div>
	
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:if>
						<s:else>
							<li>
								<a style="padding-right:40px" href="woinsplist.action?id=<s:property value="getMboSet('WORKORDER').getMbo(0).getUniqueIDValue()"/>">
									<h3 class="ui-wrap"><s:property value="getString('RESULTNUM')"/> &bull; <s:property value="getMboSet('$parentwo', 'WORKORDER', 'WONUM=:REFERENCEOBJECTID AND ORGID=:ORGID AND SITEID=:SITEID').getMbo(0).getString('DESCRIPTION')"/></h3>
									<s:if test="!getString('REFERENCEOBJECT').equalsIgnoreCase('ASSET') && !getString('REFERENCEOBJECT').equalsIgnoreCase('LOCATION')">
										<div class="ui-row-2">
											<div class="ui-column">
												<strong><s:property value="getMboValueInfoStatic('WORKORDER.WONUM').getTitle()"/></strong>: <s:property value="getString('WORKORDER.WONUM')"/>
											</div>
											<div class="ui-column">
												<strong><s:text name="wotrack.workorder"/> <s:property value="getMboValueInfoStatic('WORKORDER.DESCRIPTION').getTitle()"/></strong>: <s:property value="getString('WORKORDER.DESCRIPTION')"/>
											</div>
											<div class="ui-column">

											</div>
										</div>
									</s:if>
									<s:if test="!getString('ASSET').equalsIgnoreCase('')">
										<div class="ui-row-2">
											<div class="ui-column">
												<strong><s:property value="getMboValueInfoStatic('ASSET').getTitle()"/></strong>: <s:property value="getString('ASSET')"/>
											</div>
											<div class="ui-column">
												<strong><s:text name="ezmaxmobile.asset"/> <s:property value="getMboValueInfoStatic('ASSET.DESCRIPTION').getTitle()"/></strong>: <s:property value="getString('ASSET.DESCRIPTION')"/>
											</div>
											<div class="ui-column">
														
											</div>
										</div>
									</s:if>
									<s:if test="!getString('LOCATION').equalsIgnoreCase('')">
										<div class="ui-row-2">
											<div class="ui-column">
												<strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/>
											</div>
											<div class="ui-column">
												<strong><s:text name="ezmaxmobile.location"/> <s:property value="getMboValueInfoStatic('LOCATIONS.DESCRIPTION').getTitle()"/></strong>: <s:property value="getString('LOCATIONS.DESCRIPTION')"/>
											</div>
										</div>
									</s:if>
									<div class="ui-row-2">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('CREATEDATE').getTitle()"/></strong>: <s:property value="getString('CREATEDATE')"/>		
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('DUEDATE').getTitle()"/></strong>: <s:property value="getString('DUEDATE')"/>
										</div>
									</div>
													
									<span class="position-right emm-related-records"></span>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:else>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>

		</div>
	</div>
</body>
</html>
