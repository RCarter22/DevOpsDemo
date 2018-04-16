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
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.viewdr"/></h3>	
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="MRNUM"><img src="../images/barcode.png"/></a>		
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">MRNUM,DESCRIPTION</s:param>
			</s:include>
			<s:if test="mboList.size > 0">
				<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="MRNUM"><s:property value="mbo.getMboValueInfoStatic('MRNUM').getTitle()"/></option>
							    <option value="DESCRIPTION"><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()"/></option>
							    <option value="STATUS"><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></option>
							    <option value="ENTERDATE"><s:property value="mbo.getMboValueInfoStatic('ENTERDATE').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>					
				<ul class="ui-listview">			
					<li class="ui-divider"><s:text name="global.list"/></li>				
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>					
								<p><strong><s:property value="getString('MRNUM')"/> (<s:property value="getString('STATUS')"/>)</strong></p>
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('WONUM').getTitle()"/>: <s:property value="getString('WONUM')"/></p>
								<p><s:property value="getMboValueInfoStatic('ENTERDATE').getTitle()"/>: <s:property value="getString('ENTERDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('REQUESTEDBY').getTitle()"/>: <s:property value="getString('REQUESTEDBY')"/></p>
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
