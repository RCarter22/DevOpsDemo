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
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" href="../main.action"><img src="../images/homelink.png"/></a>
			<h1 class="ui-title"><s:text name="Inventory (Tr)"/></h1>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="ITEMNUM,ITEM.DESCRIPTION,BINNUM"><img src="../images/barcode.png"/></a>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">ITEMNUM,ITEM.DESCRIPTION,BINNUM</s:param>
			</s:include>
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li>
					<a href="list.action">
						<img src="../images/inventory.png"/>
						<h3><s:text name="inventor.allitems"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
				<li>
					<a href="myqueries.action">
						<img src="../images/other.png" />
						<h3><s:text name="global.mysavedqueries"/></h3>
						<span class="ui-arrow"></span>
					</a>				
				</li>
				<li>
					<a href="queries.action">
						<img src="../images/other.png" />
						<h3><s:text name="global.allsavedqueries"/></h3>
						<span class="ui-arrow"></span>
					</a>				
				</li>
			</ul>
			
			<%-- <s:if test="mboList.size > 0">
			    <ul class="ui-listview">
			    	<li class="ui-divider"><s:text name="inventor.defaultsitestorerooms"/> <s:property value="user.getSiteId()"/></li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>	
							<a href="cyclecountlist.action?id=<s:property value="getUniqueIDValue()"/>&storeroom=<s:property value='getString("LOCATION")'/>">
								<p><s:property value="getString('LOCATION')"/></p>								
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if> --%>
						
		</div>
	</div>
</body>
