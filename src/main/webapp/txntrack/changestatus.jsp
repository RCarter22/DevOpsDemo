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
		<div class="ui-header ui-header-b">
			<h3 class="ui-title"><s:text name="global.changestatus"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<s:form action="transaction_dochangestatus.action" method="post">
			<s:hidden name="currentAction"/>
			<s:hidden name="transaction.transactionId"/>
			<div class="ui-content ui-content-narrow">
				<ul class="ui-listview ui-radiobutton">
					<s:iterator value="transactionStatusList" status="status" id="statusValue">
						<li>
						 	<label for="check<s:property value="#status.index"/>"><s:property/></label>
						 	<input type="radio" id="check<s:property value="#status.index"/>"
						 	 	name="transaction.status" value="<s:property />"
								 <s:if test="transaction.status == #statusValue">checked="true"</s:if>
						 	/>
						</li>
					</s:iterator>
				</ul>
				<ul class="ui-listview">
					<li class="ui-field-block">
						<label>Memo</label>
						<textarea id="transaction.memo" name="transaction.memo"><s:property value="transaction.memo"/></textarea>
					</li>
                </ul>
				<div class="ui-btn-container">
					<a class="ui-btn-b" href="<s:property value="currentAction"/>"><s:text name="global.cancel"/></a>
					<input data-esig="STATUS" class="ui-btn-a" type="submit" value="<s:text name="global.ok"/>">
				</div>
			</div>
		</s:form>
	</div>	
</body>
</html>
