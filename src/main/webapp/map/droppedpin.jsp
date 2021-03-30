<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html emm-nonavigation>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
</head>

<body>
	<div class="ui-page ui-inset">
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<div class="section-header">
				<s:if test="fromList && !fromCluster">
					<button class="section-back-button" onclick="emm.maps.trigger('search')">
						<span class="emm-chevron-left section-center-image"></span>
					</button>				
				</s:if>
				<div>
					<h1 class="section-header-title"><s:text name="global.droppedpin"/></h1>
					<h2 class="section-header-subtitle"></h2>
				</div>
			</div>
			<div class="section-action">
				<button class="section-action-button" onclick="emm.maps.returnToUrl('wotrack/create.action?LONGITUDEX=<s:property value="droppedPinJson.getString('emmmap_x')"/>&LATITUDEY=<s:property value="droppedPinJson.getString('emmmap_y')"/>&jsonParam=<s:property value="jsonParam"/>')">
					<span class="section-action-button-icon emm-workorder"></span>
					<span class="section-action-button-text"><s:text name="location.createwo"/></span>
				</button>
				<button class="section-action-button" onclick="emm.maps.returnToUrl('sr/create.action?LONGITUDEX=<s:property value="droppedPinJson.getString('emmmap_x')"/>&LATITUDEY=<s:property value="droppedPinJson.getString('emmmap_y')"/>&jsonParam=<s:property value="jsonParam"/>')">
					<span class="section-action-button-icon emm-service-request"></span>
					<span class="section-action-button-text"><s:text name="location.createsr"/></span>
				</button>
				<button class="section-action-button" onclick="emm.maps.returnToUrl('asset/create.action?LONGITUDEX=<s:property value="droppedPinJson.getString('emmmap_x')"/>&LATITUDEY=<s:property value="droppedPinJson.getString('emmmap_y')"/>&jsonParam=<s:property value="jsonParam"/>')">
					<span class="section-action-button-icon emm-asset"></span>
					<span class="section-action-button-text"><s:text name="global.createasset"/></span>
				</button>
			</div>
			<div class="ui-btn-container section-action section-border-bottom">
				<button class="section-button" onclick="emm.maps.launchNativeMap(<s:property value="droppedPinJson.getString('emm4326_y')"/>, <s:property value="droppedPinJson.getString('emm4326_x')"/>)">
					<span class="section-button-icon emm-car"></span>
					<span class="section-button-text"><s:text name="global.directions"/></span>
				</button>
			</div>
			<div class="section section-border-bottom">
				<div class="section-line">
					<span class="section-icon"><img src="../images/pins/droppedpin.png" width="15" height="20"></span>
					<span class="section-text">(<s:property value="droppedPinJson.getString('emmmap_y')"/>,<s:property value="droppedPinJson.getString('emmmap_x')"/>)</span>
				</div>
			</div>
			<s:if test="droppedPinJson.getString('emmmap_type') eq 'ESRI'">
				<s:if test="dataSourceId eq 'WiFi Locations'">
					<div class="section section-border-bottom">
						<div class="section-line">
							<label>OBJECTID</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('OBJECTID')"/></span>
						</div>
						<div class="section-line">
							<label>Address</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('Address')"/></span>
						</div>
						<div class="section-line">
							<label>Connect From</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('Connect_from')"/></span>
						</div>
						<div class="section-line">
							<label>Neighborhood</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('Neighborhood')"/></span>
						</div>
					</div>
				</s:if>
				<s:elseif test="dataSourceId eq 'Hubway Stations'">
					<div class="section section-border-bottom">
						<div class="section-line">
							<label>OBJECTID</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('OBJECTID')"/></span>
						</div>
						<div class="section-line">
							<label>Name</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('name')"/></span>
						</div>
						<div class="section-line">
							<label>Terminal Name</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('terminalName')"/></span>
						</div>
						<div class="section-line">
							<label>Install Date</label>
							<span class="section-text"><s:property value="droppedPinJson.getString('installDate')"/></span>
						</div>
					</div>
				</s:elseif>
			</s:if>
		</div>
	</div>
</body>
</html>