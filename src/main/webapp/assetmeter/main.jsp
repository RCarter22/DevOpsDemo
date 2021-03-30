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
			<h3 class="ui-title"><s:text name="ezmaxmobile.meter"/></h3>
			<a class="ui-btn-right" href="add.action"><span class="emm-plus"></span></a>
			<s:include value="../common/statusbar.jsp"/>						
		</div>	
	
		<div class="ui-content">
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('ASSETNUM')"/>"/>
				</li>
			</ul>				
			
			<ul class="ui-listview">
				<li class="ui-divider"><s:text name="ezmaxmobile.meters"/></li>
				<s:if test="mboList.size > 0">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()" />">
								<p><strong><s:property value="getString('METERNAME')"/></strong></p>
								<h3><s:property value="getString('METER.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('LASTREADING').getTitle()" />: <s:property value="getString('LASTREADING')"/></p>
								<p><s:property value="getMboValueInfoStatic('LASTREADINGDATE').getTitle()" />: <s:property value="getString('LASTREADINGDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('LASTREADINGINSPCTR').getTitle()" />: <s:property value="getString('LASTREADINGINSPCTR')"/></p>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</s:if>
			</ul>
		</div>
	</div>
</body>
</html>
