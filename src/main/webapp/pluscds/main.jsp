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
			<h3 class="ui-title"><s:text name="pluscds.datasheets"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">	
			<s:if test="mboList.size > 0">				
				<ul class="ui-listview">						
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value='getUniqueIDValue()'/>">
								<p><strong><s:property value="getString('DSPLANNUM')"/></strong></p>
								<h3><s:property value="getString('DESCRIPTION')"/></h3>																
							</a>
							<span class="ui-arrow"></span>
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