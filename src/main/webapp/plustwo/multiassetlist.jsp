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
			<h3 class="ui-title"><s:text name="global.multiassetloc"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<a class="ui-btn-right" href="addmultiasset.action"><img src="../images/plus.png"/></a>				
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
				<li class="ui-divider"><s:text name="global.multiassetloc"/></li>
				<s:if test="mboList.size > 0">
					<s:include value="../common/pagination.jsp"/>							
					<s:iterator value="mboList">
						<li>
							<a href="viewmultiasset.action?id=<s:property value="getUniqueIDValue()"/>">
								<p><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/>: <s:property value="getString('ASSETNUM')"/></p>								
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('SEQUENCE').getTitle()"/>: <s:property value="getString('SEQUENCE')"/></p>											
								<span class="ui-arrow"></span>
							</a>
							<a onclick="emm.core.toggleCheck(this)" data-mbo="MULTIASSETLOCCI" data-field="PROGRESS" data-id="<s:property value="getUniqueIDValue()"/>" class="ui-checklistbutton" data-checked="<s:property value="getBoolean('PROGRESS')"/>"></a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</s:if>
			</ul>
		</div>
	</div>		
</body>
</html>
