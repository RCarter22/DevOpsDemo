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
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="location.hierarchy"/></h3>
			<%-- <a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a> --%>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="" href="savehierarchy.action?id=<s:property value='mbo.getUniqueIDValue()'/>"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="" href="#locationlookupdialog" data-control="dialog"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SYSTEMID').getTitle()" /></label>
					<input type="text"
							id="SYSTEMID" 
							readonly="<s:if test='mbo.getOwner().getName().equals("LOCSYSTEM")'>true</s:if><s:else><s:property value="mbo.getMboValueData('SYSTEMID').isReadOnly()"/></s:else>"
							value="<s:property value="mbo.getString('SYSTEMID')"/>"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SYSTEMID" data-source="SYSTEMID" data-display="SYSTEMID" data-search="SYSTEMID"><s:text name="global.lookup"/></a>
				</li>
				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
					<input type="text"
							id="PARENT" 
							required="<s:property value="mbo.getMboValueData('PARENT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PARENT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PARENT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PARENT" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"><s:text name="global.lookup"/></a>
				</li>
			</ul>
		</div>
	</div>
	<div id="locationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.location"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.locationDrilldown(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#LOCATION')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>
			</div>
		</div>
	</div>
	<div id="parentlocationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="location.parent"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="PARENT" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.locationDrilldown(this)" data-field="PARENT" data-source="LOCATIONS" data-display="LOCATION,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#PARENT')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
