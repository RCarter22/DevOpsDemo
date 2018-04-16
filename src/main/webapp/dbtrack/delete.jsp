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
		<div class="ui-header">
			<h3 class="ui-title"><s:text name="global.delete"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<s:form action="doDelete.action" method="post">
			<s:hidden name="currentAction"/>
			<s:hidden name="databaseRequest.databaseid"/>
			<div class="ui-content ui-content-narrow">
<!-- 				<ul class="ui-listview"> -->
<!-- 					<li class="ui-field-block"> -->
<!-- 						<label>Memo</label> -->
<%-- 						<textarea id="transaction.memo" name="transaction.memo"><s:property value="transaction.memo"/></textarea> --%>
<!-- 					</li> -->
<!--                 </ul> -->
				<div class="ui-btn-container">
					<a class="ui-btn-b" href="<s:property value="currentAction"/>"><s:text name="global.cancel"/></a>
					<input data-esig="STATUS" class="ui-btn-a" type="submit" value="<s:text name="global.ok"/>">
				</div>
			</div>
		</s:form>
	</div>	
</body>
</html>
