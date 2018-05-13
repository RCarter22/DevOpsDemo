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
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="asset.subassemblies"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
		</div>
		<div class="ui-content ui-content-narrow">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ASSETNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="true"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							maxlength="<s:property value="mbo.getMboValueData('LOCATION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="LOCATION.DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('LOCATION.DESCRIPTION').isRequired()"/>"
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('LOCATION.DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('LOCATION.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION.DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="LOCATION.DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('LOCATION.DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="true"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('LOCATION.DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deletesubassembly.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>	
</body>
</html>
