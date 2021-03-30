<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.wotrack"/></h3>	
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="WONUM,DESCRIPTION,ASSETNUM,LOCATION,LEAD"><span class="emm-barcode-3"></span></a>		
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">WONUM,DESCRIPTION,ASSETNUM,LOCATION,LEAD</s:param>
			</s:include>
			<s:if test="mboList.size > 0">
				<s:if test="pagination.total > 1">
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="WONUM"><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()"/></option>
							    <option value="REPORTDATE"><s:property value="mbo.getMboValueInfoStatic('REPORTDATE').getTitle()"/></option>
							    <option value="LOCATION"><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()"/></option>
							    <option value="STATUS"><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></option>
							    <option value="SUPERVISOR"><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()"/></option>
							    <option value="AMCREW"><s:property value="mbo.getMboValueInfoStatic('AMCREW').getTitle()"/></option>
							    <option value="LEAD"><s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()"/></option>
							    <option value="WOPRIORITY"><s:property value="mbo.getMboValueInfoStatic('WOPRIORITY').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>					
				<ul class="ui-listview">			
					<li class="ui-divider"><s:text name="global.list"/></li>
					<s:if test="isEmmMapEnabled()">
						<li data-native="true">
							<a data-control="map" data-modules='["DS_WORKORDERS"]'>
								<span class="emm-map-location"></span>
								<h3><s:text name="global.openmap"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:if>					
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>&mboPrevNextVisible=<s:property value="isMboPrevNextVisible()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>					
								<p><strong><s:property value="getString('WONUM')"/> (<s:property value="getString('STATUS')"/>)</strong></p>
								<h3 class="ui-wrap"><s:property value="getString('DESCRIPTION')"/></h3>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/>		
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('PERSONGROUP').getTitle()"/></strong>: <s:property value="getString('PERSONGROUP')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('LEAD').getTitle()"/></strong>: <s:property value="getString('LEAD')"/>		
									</div>
								</div>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('REPORTDATE').getTitle()"/></strong>: <s:property value="getString('REPORTDATE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('SCHEDSTART').getTitle()"/></strong>: <s:property value="getString('SCHEDSTART')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('WOPRIORITY').getTitle()"/></strong>: <s:property value="getString('WOPRIORITY')"/>
									</div>
									<div class="ui-column">
												
									</div>
								</div>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
		</div>
	</div>
</body>
</html>
