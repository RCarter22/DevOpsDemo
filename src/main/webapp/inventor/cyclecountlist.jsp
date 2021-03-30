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
			<a class="ui-btn-left" href="main.action"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="inventor.cyclecount"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="ITEMNUM"><span class="emm-barcode-3"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../inventor/cyclecountquicksearch.jsp">
				<s:param name="searchFields">ITEMNUM,ITEM.DESCRIPTION</s:param>
			</s:include>
			<s:if test="mboList.size > 0">
			    <ul id="INVLIST" class="ui-listview">
					<li class="ui-divider"><s:property value='storeroom'/> <s:text name='inventor.storeroom'/></li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="cyclecountview.action?id=<s:property value="getUniqueIDValue()"/>&storeroom=<s:property value="storeroom"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
								<p><strong><s:property value="getString('ITEMNUM')"/> (<s:property value="getString('STATUS')"/>)</strong></p>								
								<h3><s:property value="getString('ITEM.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('INVENTORY.MANUFACTURER').getTitle()"/>: <s:property value="getString('INVENTORY.MANUFACTURER')"/></p>
								<p><s:property value="getMboValueInfoStatic('MANUFACTURER.NAME').getTitle()"/>: <s:property value="getString('MANUFACTURER.NAME')"/></p>
								<p><s:property value="getMboValueInfoStatic('INVVENDOR.MODELNUM').getTitle()"/>: <s:property value="getString('INVVENDOR.MODELNUM')"/></p>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
		</div>
	</div>
</body>
</html>
