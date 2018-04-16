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
			<h3 class="ui-title">Database Requests</h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<div class="ui-searchbar">
				<s:form id="quicksearch" method="post">
					<input type="search" placeholder="<s:text name="global.quicksearch"/>" name="search" maxlength="100" value="<s:property value="search"/>" />
<%-- 					<a class="ui-btn-side" href="transaction_advancedsearch.action"><s:text name="global.advanced"/></a> --%>
					<input type="hidden" name="databaseRequest.reqtype" value="<s:property value="databaseRequest.reqtype"/>"/>
					<input type="hidden" name="databaseRequest.userid" value="<s:property value="databaseRequest.userid"/>"/>
					<input type="hidden" name="databaseRequest.status" value="<s:property value="databaseRequest.status"/>"/>
				</s:form>
			</div>


			<s:if test="databaseRequests.size > 0">
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="databaseRequests">
						<li>
							<a href="view.action?databaseRequest.databaseid=<s:property value="databaseid"/>">
								<s:if test="status eq 'ERROR'">
									<span class="ui-accessory-left">
										<span class="ui-circle ui-circle-c"></span>
									</span>
								</s:if>
								<s:if test="status eq 'COMP'">
									<span class="ui-accessory-left">
										<span class="ui-circle ui-circle-e"></span>
									</span>
								</s:if>
								<s:if test="status eq 'PROCESS'">
									<p class="ui-aside"><strong>Position : <s:property value="position"/></strong></p>
									<span class="ui-accessory-left">
										<span class="ui-circle ui-circle-f"></span>
									</span>
								</s:if>
								<p><strong><s:property value="status"/></strong></p>
								<h3>Sync Type: <s:property value="reqtype"/></h3>
								<p>File: <s:property value="url"/></p>
								<p>Timestamp: <s:property value="reqdate"/></p>
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
