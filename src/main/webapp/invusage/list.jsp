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
			<h3 class="ui-title"><s:text name="ezmaxmobile.invusage"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">INVUSENUM,DESCRIPTION,STATUS,USETYPE</s:param>
			</s:include>
			<s:if test="mboList.size > 0">	
			    <ul class="ui-listview">
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>">							
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
								<p><strong><s:property value="getString('INVUSENUM')"/></strong></p>
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('USETYPE').getTitle()"/>: <s:property value="getString('USETYPE')"/></p>
								<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>
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
