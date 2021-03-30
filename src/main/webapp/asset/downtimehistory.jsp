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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title">Downtime History</h3>	
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">					
				<ul class="ui-listview">			
					<li class="ui-divider"><s:text name="global.list"/></li>
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList" status="status">
						<li>
							<a href="managedowntimehistory.action?id=<s:property value="#status.index"/>">
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/>
									</div>
								</div>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('STARTDATE').getTitle()"/></strong>: <s:property value="getString('STARTDATE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('STARTWONUM').getTitle()"/></strong>: <s:property value="getString('STARTWONUM')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('STARTCODE').getTitle()"/></strong>: <s:property value="getString('STARTCODE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('STARTOPERATIONAL').getTitle()"/></strong>: <s:if test="getInt('STARTOPERATIONAL').equals(1)">Operational</s:if><s:elseif test="!isNull('STARTOPERATIONAL') && getInt('STARTOPERATIONAL').equals(0)">Non-operational</s:elseif>
									</div>
								</div>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ENDDATE').getTitle()"/></strong>: <s:property value="getString('ENDDATE')"/>										
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ENDWONUM').getTitle()"/></strong>: <s:property value="getString('ENDWONUM')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ENDCODE').getTitle()"/></strong>: <s:property value="getString('ENDCODE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ENDOPERATIONAL').getTitle()"/></strong>: <s:if test="getInt('ENDOPERATIONAL').equals(1)">Operational</s:if><s:elseif test="!isNull('ENDOPERATIONAL') && getInt('ENDOPERATIONAL').equals(0)">Non-operational</s:elseif>
									</div>
								</div>
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
