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
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title">Database Requests</h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label>Status</label>
					<input type="text" id="status" value="<s:property value="databaseRequest.status"/>"/>
				</li>				
				<li class="ui-field">
					<label>File</label>
					<input type="text" id="url" value="<s:property value="databaseRequest.url"/>"/>
				</li>
				<li class="ui-field">
					<label>Request Type</label>
					<input type="text" id="reqtype" value="<s:property value="databaseRequest.reqtype"/>"/>
				</li>
				<li class="ui-field">
					<label>Timestamp</label>
					<input type="text" id="reqdate" value="<s:property value="databaseRequest.reqdate"/>"/>
				</li>
				<li class="ui-field">
					<label>Last Sync Date</label>
					<input type="text" id="txentityname" value="<s:property value="databaseRequest.syncdate"/>"/>
				</li>
				<li class="ui-field-block">
					<label>Memo</label>
					<textarea id="databaseRequest.message" name="databaseRequest.message" readonly><s:property value="databaseRequest.message"/></textarea>
				</li>
			</ul>

			<div id="ACTIONS" class="ui-sidebar">
				<p class="ui-section"><s:text name="global.actions"/></p>
				<ul class="ui-listview ui-inset">
					<li>
						<a href="delete.action?databaseRequest.databaseid=<s:property value="databaseRequest.databaseid"/>" onclick="">
							<h3><s:text name="global.delete"/></h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</body>
