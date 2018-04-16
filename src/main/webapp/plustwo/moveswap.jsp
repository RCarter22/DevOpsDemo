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
	<div class="ui-page <s:if test="appAction eq 'VIEWMOVE'">ui-inset</s:if>">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">			
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancelmove.action"><s:text name="global.cancel"/></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			</s:else>
			<h3 class="ui-title"><s:text name="global.moveswap"/></h3>
		</div>
		
		<div class="ui-content <s:if test="appAction eq 'VIEWMOVE'">ui-content-narrow</s:if>">
			<s:include value="../common/statusbar.jsp"/>
		
			<s:if test="appAction eq 'VIEWMOVELIST'">
				<ul class="ui-listview">
					<li class="ui-divider"><s:text name="global.assetlist"/></li>
					<s:if test="mboList.size > 0">
						<s:include value="../common/pagination.jsp"/>							
						<s:iterator value="mboList">
							<li>
								<a href="viewmove.action?id=<s:property value="getUniqueIDValue()"/>">
									<p><strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/>: <s:property value="getString('ASSETNUM')"/></strong></p>								
									<h3><s:property value="getString('ASSET.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('ASSET.LOCATION').getTitle()"/>: <s:property value="getString('ASSET.LOCATION')"/></p>										
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
						<s:include value="../common/pagination.jsp"/>
					</s:if> 
				</ul>
			</s:if>
			
			<s:if test="appAction eq 'VIEWMOVE'">
				<ul class="ui-listview">
	 			<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
						<input type="text"
								id="ASSETNUM" 
								required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
								value="<s:property value="mbo.getString('ASSETNUM')"/>"
								onchange="emm.core.setValue(this)"
						/>
<!-- 						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="DESCRIPTION,ASSETNUM,SERIALNUM,LOCATION" data-search="ASSETNUM,LOCATION,SERIALNUM,DESCRIPTION"></a> --> 
					</li> 		
	 				<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
						<input type="text"
								id="LOCATION" 
								required="<s:property value="mbo.getMboValueData('ASSET.LOCATION').isRequired()"/>"
								readonly="true"
								value="<s:property value="mbo.getString('ASSET.LOCATION')"/>"
						/>
					</li>	
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('NEWASSETNUM').getTitle()" /></label>
						<input type="text"
								id="NEWASSETNUM" 
								readonly="<s:property value="mbo.getMboValueData('NEWASSETNUM').isReadOnly()"/>"
								value="<s:property value="mbo.getString('NEWASSETNUM')"/>"
								onchange="emm.core.setValue(this)"
						/>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('MOVETOSITE').getTitle()" /></label>
						<input type="text"
								id="MOVETOSITE" 
								readonly="<s:property value="mbo.getMboValueData('MOVETOSITE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('MOVETOSITE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MOVETOSITE" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('MOVETOLOCATION').getTitle()" /></label>
						<input type="text"
								id="MOVETOLOCATION" 
								required="<s:property value="mbo.getMboValueData('MOVETOLOCATION').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('MOVETOLOCATION').isReadOnly()"/>"
								value="<s:property value="mbo.getString('MOVETOLOCATION')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MOVETOLOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,TYPE,SITEID" data-search="LOCATION,DESCRIPTION"></a>
					</li> 
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('MOVETOBIN').getTitle()" /></label>
						<input type="text"
								id="MOVETOBIN" 
								required="<s:property value="mbo.getMboValueData('MOVETOBIN').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('MOVETOBIN').isReadOnly()"/>"
								value="<s:property value="mbo.getString('MOVETOBIN')"/>"
								onchange="emm.core.setValue(this)"
						/>
					</li>			
				</ul>
				<div class="ui-btn-container">
					<a class="ui-btn-a" href="executemove.action"><s:text name="global.executenow"/></a>
				</div>				
			</s:if>
			
		</div>
	</div>	
</body>
</html>
