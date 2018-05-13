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
			<h3 class="ui-title"><s:text name="ezmaxmobile.receipts"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="PONUM,DESCRIPTION,POLINE.ITEMNUM"><img src="../images/barcode.png"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">PONUM,DESCRIPTION,POLINE.ITEMNUM</s:param>
			</s:include>
			<ul class="ui-listview">
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
		</div>	

	</div>
</body>
</html>
