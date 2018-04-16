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
			<h3 class="ui-title"><s:text name="ezmaxmobile.meter"/></h3>
			<a class="ui-btn-right" href="add.action"><img src="../images/plus.png"/></a>
			<s:include value="../common/statusbar.jsp"/>						
		</div>	
	
		<div class="ui-content">
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('LOCATION')"/>"/>
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
								<s:if test="!getString('LOCMETERREADING.INSPECTOR').equalsIgnoreCase('')">
									<p><s:property value="getMboValueInfoStatic('LOCMETERREADING.INSPECTOR').getTitle()" />: <s:property value="getString('LOCMETERREADING.INSPECTOR')"/></p>
								</s:if>
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
