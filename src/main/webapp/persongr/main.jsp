<%--
* Copyright © 2012 InterPro Solutions, LLC
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.persongr"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">	
			<div class="ui-searchbar">
				<s:form id="quicksearch" action="doquicksearch" method="post">
				    <input type="hidden" name="searchFlds" value="PERSONGROUP,DESCRIPTION"/>	
					<input type="search" placeholder="<s:text name="global.quicksearch"/>" name="search" maxlength="100" value="<s:property value="search"/>" />		
				</s:form>	
			</div>		
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
