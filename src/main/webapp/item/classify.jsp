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
	<div id="classificationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h3 class="ui-title"><s:text name="global.classification"/></h3>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="CLASSSTRUCTUREID" data-source="CLASSSTRUCTUREID" data-display="CLASSIFICATIONID,DESCRIPTION" data-search="CLASSIFICATIONID,DESCRIPTION"><s:text name="global.lookup"/></a> 
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.classificationDrilldown(this)" data-field="CLASSSTRUCTUREID" data-source="CLASSSTRUCTUREID"><s:text name="global.drilldown"/></a>
				</div>
			</div>
		</div>
	</div>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="global.classification"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CLASSSTRUCTURE.HIERARCHYPATH').getTitle()" /></label>
					<input type="text"
							id="CLASSSTRUCTURE.HIERARCHYPATH" 
							readonly="true"
							value="<s:property value="mbo.getString('CLASSSTRUCTURE.HIERARCHYPATH')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CLASSSTRUCTURE.DESCRIPTION_CLASS').getTitle()" /></label>
					<input type="text"
							id="CLASSSTRUCTURE.DESCRIPTION_CLASS" 
							required="<s:property value="mbo.getMboValueData('CLASSSTRUCTURE.DESCRIPTION_CLASS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CLASSSTRUCTURE.DESCRIPTION_CLASS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CLASSSTRUCTURE.DESCRIPTION_CLASS')"/>"
							disabled="disabled"
					/>
					<a class="ui-arrow" onclick="" href="#classificationlookupdialog" data-control="dialog"></a>
				</li>
			</ul>
			
			<s:if test="mboList.size > 0">
				<p class="ui-section"><s:text name="global.specifications"/></p>		
				<ul class="ui-listview">
					<s:iterator value="mboList">
						<s:if test="getString('CLASSSPEC.ASSETATTRIBUTE.DATATYPE') == 'NUMERIC'">
							<li class="ui-field">
								<label><s:property value="getString('ASSETATTRID')" /></label>
								<input type="text"
										id="<s:property value="getUniqueIDValue()"/>" 
										required="<s:property value="getBoolean('CLASSSPEC.CLASSSPECUSEWITH.MANDATORY')"/>"
										readonly="<s:property value="getMboValueData('NUMVALUE').isReadOnly()"/>"
										value="<s:property value="getString('NUMVALUE')"/>"
										placeholder="<s:property value="getString('CLASSSPEC.ASSETATTRIBUTE.DATATYPE')"/>"
										onchange="emm.core.setValue(this)"
										data-mbo="ITEMSPECCLASS"
										data-field="NUMVALUE"
								/>
								<s:if test="getString('CLASSSPEC.DOMAINID') != ''">
									<a class="ui-arrow" onclick="emm.core.lookup(this)" data-mbo="ITEMSPECCLASS" data-mboid="<s:property value="getUniqueIDValue()"/>" data-field="NUMVALUE"></a>
								</s:if>
							</li>
						</s:if>
						<s:elseif test="getString('CLASSSPEC.ASSETATTRIBUTE.DATATYPE') == 'ALN'">
							<li class="ui-field">
								<label><s:property value="getString('ASSETATTRID')" /></label>
								<input type="text"
										id="<s:property value="getUniqueIDValue()"/>" 
										required="<s:property value="getBoolean('CLASSSPEC.CLASSSPECUSEWITH.MANDATORY')"/>"
										readonly="<s:property value="getMboValueData('ALNVALUE').isReadOnly()"/>"
										value="<s:property value="getString('ALNVALUE')"/>"
										placeholder="<s:property value="getString('CLASSSPEC.ASSETATTRIBUTE.DATATYPE')"/>"
										onchange="emm.core.setValue(this)"
										data-mbo="ITEMSPECCLASS" 
										data-field="ALNVALUE"
								/>
								<s:if test="getString('CLASSSPEC.DOMAINID') != ''">
									<a class="ui-arrow" onclick="emm.core.lookup(this)" data-mbo="ITEMSPECCLASS" data-mboid="<s:property value="getUniqueIDValue()"/>" data-field="ALNVALUE"></a>
								</s:if>
							</li>
						</s:elseif>		
					</s:iterator>
				</ul>
			</s:if>
		</div>
	</div>
</body>
</html>
