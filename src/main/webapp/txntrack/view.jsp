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
			<a class="ui-btn-left" href="main.action"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="txntrack.detail"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label>Status</label>
					<input type="text" id="status" readonly="true" value="<s:property value="transaction.status"/>"/>
				</li>				
				<li class="ui-field">
					<label>Entity Name</label>
					<input type="text" id="entityname" readonly="true" value="<s:property value="transaction.entityName"/>"/>
				</li>
				<li class="ui-field">
					<label>Sync Action</label>
					<input type="text" id="txentityname" readonly="true" value="<s:property value="transaction.syncAction"/>"/>
				</li>
				<s:if test="transaction.status eq 'ERROR'">
					<li class="ui-field-block">
						<label>Message</label>
						<textarea id="transaction.responseMessage" name="transaction.responseMessage" readonly><s:property value="transaction.responseMessage"/></textarea>					
					</li>
				</s:if>
				
				<li class="ui-field">
					<label>Txn ID</label>
					<input type="text" id="txid" readonly="true" value="<s:property value="transaction.txId"/>"/>
				</li>
				<li class="ui-field">
					<label>Txn Entity ID</label>
					<input type="text" id="txentityid" readonly="true" value="<s:property value="transaction.txEntityId"/>"/>
				</li>
				<li class="ui-field">
					<label>Txn Entity Name</label>
					<input type="text" id="txentityname" readonly="true" value="<s:property value="transaction.txEntityName"/>"/>
				</li>
				<li class="ui-field">
					<label>Txn Timestamp</label>
					<input type="text" id="txtimestamp" readonly="true" value="<s:property value="transaction.txTimestamp"/>"/>
				</li>				
				<li class="ui-field-block">
					<label>Memo</label>
					<textarea id="transaction.memo" name="transaction.memo" readonly><s:property value="transaction.memo"/></textarea>
				</li>
			</ul>
			<div id="ACTIONS" class="ui-sidebar">
				<p class="ui-section"><s:text name="global.actions"/></p>
				<ul class="ui-listview ui-inset">
					<s:if test="transaction.syncAction neq 'EMM_FILE_UPLOAD'">					
						<li>
							<a href="transaction_changestatus.action?transaction.transactionId=<s:property value="transaction.transactionId"/>" onclick="">
								<span class="emm-status"></span>
								<h3><s:text name="global.changestatus"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</li>
						<s:if test="transaction.status eq 'ERROR'">
							<li>
								<a href="transaction_edit.action?transaction.transactionId=<s:property value="transaction.transactionId"/>" onclick="">
									<span class="emm-notes"></span>
									<h3>Edit and Reprocess</h3>
									<span class="ui-arrow"></span>
								</a>
							</li>
							<li>
								<a href="transaction_reprocess.action?transaction.transactionId=<s:property value="transaction.transactionId"/>" onclick="">
									<span class="emm-sync"></span>
									<h3>Reprocess</h3>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:if>
					</s:if>
					<s:if test="transaction.status neq 'DELETED'">
						<li>
							<a href="transaction_delete.action?transaction.transactionId=<s:property value="transaction.transactionId"/>" onclick="">
								<span class="emm-trashcan"></span>
								<h3><s:text name="global.delete"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:if>					
				</ul>
			</div>
		</div>
	</div>
</body>
