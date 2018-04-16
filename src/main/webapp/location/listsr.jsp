<%--
* Copyright © 2012 InterPro Solutions, LLC
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.locations"/></h3>
			<s:include value="../common/statusbar.jsp"/>	
		</div>
		<div class="ui-content">
			<s:if test="mboList.size > 0">										
			    <ul class="ui-listview">
			    	<li class="ui-divider">SR <s:text name="global.list"/></li>	
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="../sr/view.action?id=<s:property value="getUniqueIDValue()"/>">							
								<p class="ui-aside"><s:property value="getString('LOCATION')"/></p>
								<p><strong><s:property value="getString('TICKETID')"/></strong></p>
								<p><s:property value="getMboValueInfoStatic('OWNER').getTitle()"/>: <s:property value="getString('OWNER')"/></p>
								<p><s:property value="getMboValueInfoStatic('OWNERGROUP').getTitle()"/>: <s:property value="getString('OWNERGROUP')"/></p>
								<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>
								<p><s:property value="getMboValueInfoStatic('REPORTDATE').getTitle()"/>: <s:property value="getString('REPORTDATE')"/></p>
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
