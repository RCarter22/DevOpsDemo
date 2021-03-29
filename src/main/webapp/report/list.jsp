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
	<s:iterator value="mboList">
		<div id="dialog_<s:property value="getUniqueIDValue()"/>" class="ui-dialog">
			<div class="ui-container">
				<div class="ui-header">
					<h1 class="ui-title"><s:text name="global.reports"/></h1>
				</div>
				<div class="ui-content">
					<div class="ui-btn-container">
						<a class="ui-btn-a" href="runreport.action?id=<s:property value="getUniqueIDValue()"/>"><s:text name="global.view"/></a>
						<br/>
						<a class="ui-btn-a" href="emailreport.action?id=<s:property value="getUniqueIDValue()"/>"><s:text name="global.email"/></a>
					</div>
				</div>
			</div>
		</div>
	</s:iterator>
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="global.reports"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:if test="mboList.size > 0">
				<ul class="ui-listview">							
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="#dialog_<s:property value="getUniqueIDValue()"/>" data-control="dialog">
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
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
