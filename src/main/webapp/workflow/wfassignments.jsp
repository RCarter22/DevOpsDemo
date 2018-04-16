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
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="workflow.assignment"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
		    <s:if test="mboList.size > 0">
				<ul class="ui-listview">						
					<li data-visible="<s:property value="pushEnabled"/>">
						<a data-control="dialog" href="#notification">
							<img src="../images/notification.png" />
							<h3><s:text name="global.send"/> <s:text name="global.notification"/></h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
					<li class="ui-divider"><s:text name="workflow.assignment"/></li>
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<span>		
								<h3><s:property value="getString('ASSIGNCODE')"/> (<s:property value="getString('ASSIGNEE.DISPLAYNAME')"/>)</h3>
								<p><s:property value="getString('DESCRIPTION')"/></p>
								<p><s:property value="getMboValueInfoStatic('PROCESSNAME').getTitle()" />: <s:property value="getString('PROCESSNAME')"/></p>
							</span>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
		</div>
	</div>
	<div id="notification" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="global.send"/> <s:text name="global.notification"/></h1>
			</div>			
			<div class="ui-content">
				<s:if test="mboList.size > 0">
					<form action="../<s:property value="mboList.get(0).getString('APP').toLowerCase()"/>/push.action" method="post">							
						<ul class="ui-listview">	
							<s:iterator value="mboList">
								<li class="ui-field">
									<label><s:property value="getString('ASSIGNEE.DISPLAYNAME')"/></label>
									<input type="checkbox" name="personOptions" value="<s:property value="getString('ASSIGNCODE')"/>"/>
								</li>	
							</s:iterator>
							<li class="ui-divider"><s:text name="global.message"/></li>
							<li class="ui-field-block">
								<textarea id="notificationMessage" name="notificationMessage"></textarea>
							</li>
						</ul>	
						<div class="ui-btn-container">
							<input class="ui-btn-a" type="submit" value="<s:text name="global.send"/>"/>								
						</div>
					</form>	
				</s:if>
			</div>
		</div>
	</div>		
</body>
</html>
