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
			<h3 class="ui-title">Multiple Assets, Locations</h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
		</div>
		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			
			<ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew()'/>">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="#" onclick="emm.core.movePrev('prevmultiasset.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
					<div class="ui-container">
						<span><s:text name="global.prev"/></span>
						<span><s:text name="global.next"/></span>
					</div>
					<a class="ui-pagination-next" href="#" onclick="emm.core.moveNext('nextmultiasset.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>
			
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li> 		
				<li class="ui-field-block">
					<label>Asset <s:property value="mbo.getMboValueInfoStatic('ASSET.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="ASSET.DESCRIPTION" 
							readonly="true"
					><s:property value="mbo.getString('ASSET.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field-block">
					<label>Location <s:property value="mbo.getMboValueInfoStatic('LOCATION.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="LOCATION.DESCRIPTION" 
							readonly="true"
					><s:property value="mbo.getString('LOCATION.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SEQUENCE').getTitle()" /></label>
					<input type="text"
							id="SEQUENCE" 
							required="<s:property value="mbo.getOwner().getMboValueData('SEQUENCE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SEQUENCE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SEQUENCE')"/>"
							maxlength="<s:property value="mbo.getMboValueData('SEQUENCE').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PROGRESS').getTitle()" /></label>
					<input type="checkbox"
							id="PROGRESS" 
							required="<s:property value="mbo.getOwner().getMboValueData('PROGRESS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PROGRESS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PROGRESS')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
			</ul>
		</div>
	</div>	
</body>
</html>
