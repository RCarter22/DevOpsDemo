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
	<div class="ui-page ui-inset" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.inspection"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('WONUM')"/>"/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
						id="DESCRIPTION" 
						readonly="true"
						maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
						onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-divider"><s:text name="inspection.relatedinspections"/></li>
				<s:if test="mboList.size > 0">
					<s:include value="../common/pagination.jsp"/>							
					<s:iterator value="mboList">
						<li>
							<s:if test="getString('STATUS').equalsIgnoreCase('PENDING')">
								<a onclick="emm.util.confirm({message:'<s:text name='inspection.startinspection'/>',yes:function(){window.location='startinsp.action?id=<s:property value='getUniqueIDValue()'/>'}});">
							</s:if>
							<s:else>
								<a href="inspresultlist.action?id=<s:property value="getUniqueIDValue()"/>">
							</s:else>
								<p class="ui-aside"><s:property value="getString('STATUS')"/></p>		
								<p><strong><s:property value="getString('RESULTNUM')"/></strong>				
								<h3><s:property value="getString('INSPECTIONFORM.NAME')"/></h3>	
								<p><s:property value="getMboValueInfoStatic('ASSET').getTitle()"/>: <s:property value="getString('ASSET')"/></p>	
								<p><s:property value="getMboValueInfoStatic('ASSET.DESCRIPTION').getTitle()"/>: <s:property value="getString('ASSET.DESCRIPTION')"/></p>						
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('LOCATIONS.DESCRIPTION').getTitle()"/>: <s:property value="getString('LOCATIONS.DESCRIPTION')"/></p>
								<p><s:property value="getMboValueInfoStatic('REFERENCEOBJECT').getTitle()"/>: <s:property value="getString('REFERENCEOBJECT')"/></p>
								<p><s:property value="getMboValueInfoStatic('CREATEDATE').getTitle()"/>: <s:property value="getString('CREATEDATE')"/></p>		
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
