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
			<a class="ui-btn-left" href="main.action"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="inspection.unscheduledinspection" /></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" href="savescheduleinsp.action"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>

		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSET').getTitle()" /></label>
					<input type="text"
							id="ASSET" 
							required="<s:property value="mbo.getMboValueData('ASSET').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSET').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('ASSET').getLength()"/>"
							value="<s:property value="mbo.getString('ASSET')"/>"
							onchange="emm.core.setValue(this)"
							disabled="true"
					/>
					<p id="ASSET.DESCRIPTION" data-update="true"><s:property value="mbo.getString('ASSET.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="" data-control="dialog" href="#assetlookupdialog"></a>
				</li>
				<li class="ui-field ui-field-auto ui-details">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" />
					</label>
					<input type="text"
						id="LOCATION" 
						required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
						maxlength="<s:property value="mbo.getMboValueData('LOCATION').getLength()"/>"
						value="<s:property value="mbo.getString('LOCATION')"/>"
						onchange="emm.core.setValue(this)"
						disabled="true"
					/>
					<p id="LOCATIONS.DESCRIPTION" data-update="true"><s:property value="mbo.getString('LOCATIONS.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,SITEID" data-search="LOCATION,DESCRIPTION,SITEID"></a>
				</li>				
				<li class="ui-field ui-field-auto ui-details">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('INSPFORMNUM').getTitle()" />
					</label>
					<input type="text"
						id="INSPFORMNUM" 
						required="<s:property value="mbo.getMboValueData('INSPFORMNUM').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('INSPFORMNUM').isReadOnly()"/>"
						maxlength="<s:property value="mbo.getMboValueData('INSPFORMNUM').getLength()"/>"
						value="<s:property value="mbo.getString('INSPFORMNUM')"/>"
						onchange="emm.core.setValue(this)"
						disabled="true"
					/>
					<p id="INSPECTIONFORM.NAME" data-update="true"><s:property value="mbo.getString('INSPECTIONFORM.NAME')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPFORMNUM" data-display="INSPFORMNUM,NAME,REVISION" data-search="INSPFORMNUM,NAME,REVISION"></a>
				</li>
				<li class="ui-field ui-field-auto ui-details">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('DUEDATE').getTitle()" />
					</label>
					<input type="text"
						id="DUEDATE" 
						required="<s:property value="mbo.getMboValueData('DUEDATE').isRequired()"/>" 
						readonly="<s:property value="mbo.getMboValueData('DUEDATE').isReadOnly()"/>"
						maxlength="<s:property value="mbo.getMboValueData('DUEDATE').getLength()"/>"
						value="<s:property value="mbo.getString('DUEDATE')"/>"
						onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="DUEDATE"></a>
				</li>
			</ul>
		</div>
		
		<div class="ui-btn-container">
			<a class="ui-btn-e" href="savescheduleinsp.action?inspstatus=INPROG"><s:text name="inspection.startinspection"/></a>
		</div>
			
	</div>
	
	<div id="assetlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.asset"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="ASSET" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,SITEID" data-search="ASSETNUM,DESCRIPTION,LOCATION,SITEID"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.assetDrilldown(this)" data-field="ASSET" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#ASSET')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>	
			</div>
		</div>
	</div>
	
</body>
</html>
