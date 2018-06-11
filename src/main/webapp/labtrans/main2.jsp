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
			<h3 class="ui-title"><s:text name="ezmaxmobile.labtrans"/></h3>
			<!-- <a class="ui-btn-right" href="add.action"><img src="../images/plus.png"/></a>			 -->
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<s:if test="mboList.size > 0">		
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()" />">
								<p class="ui-aside">Task: <s:property value="getString('TASKID')"/></p>
								<h3><s:property value="getString('PERSON.DISPLAYNAME')"/></h3>
								<p><s:property value="getMboValueInfoStatic('STARTDATE').getTitle()" />: <s:property value="getString('STARTDATE')"/> <s:property value="getString('STARTTIME')"/></p>
								<p><s:property value="getMboValueInfoStatic('FINISHDATE').getTitle()" />: <s:property value="getString('FINISHDATE')"/> <s:property value="getString('FINISHTIME')"/></p>
								<p><s:property value="getMboValueInfoStatic('TIMERSTATUS').getTitle()" />: <s:property value="getString('TIMERSTATUS')"/></p>
								<p><s:property value="getMboValueInfoStatic('REGULARHRS').getTitle()" />: <s:property value="getText('{0,number,#,##0.00}',{getFloat('REGULARHRS')})"/></p>
								<p><s:property value="getMboValueInfoStatic('PREMIUMPAYHOURS').getTitle()" />: <s:property value="getText('{0,number,#,##0.00}',{getFloat('PREMIUMPAYHOURS')})"/></p>
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
