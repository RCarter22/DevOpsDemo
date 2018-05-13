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
			<h3 class="ui-title"><s:text name="global.relatedrecords"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">	
			    <s:if test="mboList.size > 0">					
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<s:if test="getString('RELATEDRECWONUM') != ''">
							<li>
								<a href="../wotrack/view.action?id=<s:property value="getLong('RELATEDRECWO.WORKORDERID')"/>">	
									<p class="ui-aside"><s:property value="getString('RELATEDRECWO.SITEID')"/></p>
									<p><strong><s:property value="getMboValueInfoStatic('RELATEDRECWO.WONUM').getTitle()"/>: <s:property value="getString('RELATEDRECWO.WONUM')"/></strong></p>										
									<h3><s:property value="getMboValueInfoStatic('RELATEDRECWO.DESCRIPTION').getTitle()"/>: <s:property value="getString('RELATEDRECWO.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('RELATEDRECCLASS').getTitle()"/>: <s:property value="getString('RELATEDRECCLASS')"/></p>
									<p><s:property value="getMboValueInfoStatic('RELATETYPE').getTitle()"/>: <s:property value="getString('RELATETYPE')"/></p>
									<p><s:property value="getMboValueInfoStatic('RELATEDRECTK.STATUS').getTitle()"/>: <s:property value="getMboValueInfoStatic('RELATEDRECTK.STATUS').getTitle()"/>: <s:property value="getString('RELATEDRECWO.STATUS')"/></p>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:if>
						<s:elseif test="getString('RELATEDRECCLASS') == 'SR'">
							<li>
								<a href="view.action?id=<s:property value="getLong('RELATEDRECTK.TICKETUID')"/>">	
									<p class="ui-aside"><s:property value="getString('RELATEDRECTK.SITEID')"/></p>
									<p><strong><s:property value="getMboValueInfoStatic('RELATEDRECTK.TICKETID').getTitle()"/>: <s:property value="getString('RELATEDRECTK.TICKETID')"/></strong></p>	
									<h3><s:property value="getMboValueInfoStatic('RELATEDRECTK.DESCRIPTION').getTitle()"/>: <s:property value="getString('RELATEDRECTK.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('RELATEDRECCLASS').getTitle()"/>: <s:property value="getString('RELATEDRECCLASS')"/></p>
									<p><s:property value="getMboValueInfoStatic('RELATETYPE').getTitle()"/>: <s:property value="getString('RELATETYPE')"/></p>
									<p><s:property value="getMboValueInfoStatic('RELATEDRECTK.STATUS').getTitle()"/>: <s:property value="getString('RELATEDRECTK.STATUS')"/></p>
									<span class="ui-arrow"></span>
								</a>
							</li>						
						</s:elseif>
						<s:else>
							<li>
								<a href="#">	
									<p class="ui-aside"><s:property value="getString('RELATEDRECTK.SITEID')"/></p>
									<p><strong><s:property value="getMboValueInfoStatic('RELATEDRECTK.TICKETID').getTitle()"/>: <s:property value="getString('RELATEDRECTK.TICKETID')"/></strong></p>				
									<h3><s:property value="getMboValueInfoStatic('RELATEDRECTK.DESCRIPTION').getTitle()"/>: <s:property value="getString('RELATEDRECTK.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('RELATEDRECCLASS').getTitle()"/>: <s:property value="getString('RELATEDRECCLASS')"/></p>
									<p><s:property value="getMboValueInfoStatic('RELATETYPE').getTitle()"/>: <s:property value="getString('RELATETYPE')"/></p>									
									<p><s:property value="getMboValueInfoStatic('RELATEDRECTK.STATUS').getTitle()"/>: <s:property value="getString('RELATEDRECTK.STATUS')"/></p>
								</a>
							</li>							
						</s:else>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</s:if>
			</ul>						
		</div>
	</div>		
</body>
</html>
