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
	<script type="text/javascript">
		function completeTask(id){
			emm.util.confirm({
				message: '<s:text name="global.completetask"/>',
				yes: function(){
					$('input[name="id"]').val(id);
					$('input[name="currentAction"]').val(window.location);
					$('#completeTaskForm').submit();
				}
			});
		}
	</script>	
</head>
<body>
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="wotrack.tasks"/></h3>
			<a class="ui-btn-right" href="createtask.action"><img src="../images/plus.png"/></a>	
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('WONUM')"/>"/>
				</li>
			</ul>
			<ul class="ui-listview">
				<li class="ui-divider"><s:text name="wotrack.tasks"/></li>
				<s:if test="mboList.size > 0">
					<s:include value="../common/pagination.jsp"/>							
					<s:iterator value="mboList">
						<li>
							<a href="viewtask.action?id=<s:property value="getUniqueIDValue()"/>">
								<p><strong><s:property value="getString('TASKID')"/></strong></p>					
								<h3><s:property value="getString('DESCRIPTION')"/></h3>								
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>											
								<span class="ui-arrow"></span>
							</a>
							<a onclick="completeTask(<s:property value="getUniqueIDValue()"/>);" class="ui-checklistbutton" data-checked="<s:property value='getString("STATUS").equals("COMP")'/>"></a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</s:if>
			</ul>
			<form id="completeTaskForm" action="completetask.action" method="post">
				<input type="hidden" name="id"/>
				<input type="hidden" name="currentAction"/>
				<input type="hidden" name="newStatus" value="COMP"/>
			</form>
		</div>
	</div>		
</body>
</html>
