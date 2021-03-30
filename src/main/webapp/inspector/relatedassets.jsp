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
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="inspection.relatedassets"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>

		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSET" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('ASSETNUM').getLength()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p id="DESCRIPTION" data-update="true"><s:property value="mbo.getString('DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSET" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID" data-search="ASSETNUM,DESCRIPTION,LOCATION"><s:text name="global.lookup"/></a>
				</li>			
			</ul>
		</div>
				
		<s:if test="mboList.size > 0">
			<s:form action="scheduleinsp.action" method="post">
			<s:hidden name="refobject" value="ASSET" />
				<div class="ui-content">
					<ul class="ui-listview ui-radiobutton">	
					<li class="ui-divider"><s:text name="asset.subassemblies"/></li>
						<s:iterator value="mboList">
							<li>
							    <label for="<s:property value="getString('ASSETNUM')"/>"><s:property value="getString('ASSETNUM')"/>: <s:property value="getString('DESCRIPTION')"/></label>
							    <input type="radio" id="<s:property value="getString('ASSETNUM')"/>" name="assetnum" value="<s:property value="getString('ASSETNUM')"/>">
							</li>
						</s:iterator>
					</ul>
				</div>
				
				<div class="ui-btn-container">
					<input class="ui-btn-e" type="submit" value="<s:text name="inspection.scheduleinspection"/>">
				</div>
			</s:form>
		</s:if>
			

			
	</div>
</body>
</html>
