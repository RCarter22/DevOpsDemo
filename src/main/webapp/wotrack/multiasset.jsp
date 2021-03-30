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
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancelmultiasset.action"><span class="emm-times-circle"></span></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			</s:else>	
			<h3 class="ui-title"><s:text name="global.multiassetloc"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			
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
							data-barcode
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
							data-barcode
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
				<s:if test="isInspectionEnabled()">
					<li class="ui-field ui-field-auto ui-details">
						<label><s:property value="mbo.getMboValueInfoStatic('INSPFORMNUM').getTitle()" /></label>
						<input type="text"
								id="INSPFORMNUM" 
								required="<s:property value="mbo.getMboValueData('INSPFORMNUM').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('INSPFORMNUM').isReadOnly()"/>"
								value="<s:property value="mbo.getString('INSPFORMNUM')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<p><s:property value="mbo.getString('INSPECTIONFORM.NAME')"/></p>
						<a class="ui-arrow" onclick="" data-control="dialog" href="#inspectionlookupdialog"></a>
					</li>
				</s:if>
			</ul>
		</div>
	</div>
	
	<div id="inspectionlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.inspection"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPECTIONFORM.INSPFORMNUM" data-display="INSPECTIONFORM.INSPFORMNUM,INSPECTIONFORM.NAME,INSPECTIONFORM.REVISION" data-search="INSPECTIONFORM.INSPFORMNUM,INSPECTIONFORM.NAME"><s:text name="inspection.recommendedforms"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPFORMNUM" data-display="INSPFORMNUM,NAME,REVISION" data-search="INSPFORMNUM,NAME"><s:text name="inspection.otherforms"/></a>
				</div>
			</div>
		</div>
	</div>	
</body>
</html>
