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
	<div class="ui-page">
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<div class="section-header">
				<s:if test="fromList && !fromCluster">
					<button class="section-button" onclick="emm.maps.trigger('search')">
						<span class="emm-chevron-left section-center-image"></span>
					</button>				
				</s:if>
				<div>
					<h1 class="section-header-title"><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /> <s:property value="mbo.getString('LOCATION')"/></h1>
					<h2 class="section-header-subtitle"><s:property value="mbo.getString('DESCRIPTION')"/></h2>
				</div>
			</div>
			<s:if test="isToBeSelected()">
				<div class="section-action">
					<button class="section-action-button" onclick="emm.maps.returnToUrl('wotrack/setMapValue.action?MAPATTRNAME=LOCATION&MAPATTRVAL=<s:property value="mbo.getString('LOCATION')"/>')">
						<span class="section-action-button-icon emm-check-circle"></span>
						<span class="section-action-button-text"><s:text name="global.select"/></span>
					</button>
				</div>
			</s:if>
			<s:else>
				<div class="section-action">
					<button class="section-action-button" onclick="emm.maps.returnToUrl('location/view.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">
						<span class="section-action-button-icon emm-share-square-o"></span>
						<span class="section-action-button-text"><s:text name="global.details"/></span>
					</button>
					<button class="section-action-button" onclick="emm.maps.returnToUrl('wotrack/create.action?LONGITUDEX=<s:property value="droppedPinJson.getString('LONGITUDEX')"/>&LATITUDEY=<s:property value="droppedPinJson.getString('LATITUDEY')"/>&jsonParam=<s:property value="jsonParam"/>')">
						<span class="section-action-button-icon emm-workorder"></span>
						<span class="section-action-button-text"><s:text name="location.createwo"/></span>
					</button>
					<button class="section-action-button" onclick="emm.core.ezphoto('<s:property value="ezPhotoURL"/>')">
						<span class="section-action-button-icon emm-camera"></span>
						<span class="section-action-button-text"><s:text name="global.takephoto"/></span>
					</button>
				</div>
			</s:else>
			<div class="ui-btn-container section-action section-border-bottom">
				<button class="section-button" onclick="emm.maps.launchNativeMap(<s:property value="droppedPinJson.getString('emm4326_y')"/>, <s:property value="droppedPinJson.getString('emm4326_x')"/>)">
					<span class="section-button-icon emm-car"></span>
					<span class="section-button-text"><s:text name="global.directions"/></span>
				</button>
			</div>
			<s:iterator value="convertedMboList" status="lastDoc">
				<s:if test="#lastDoc.last == true">
					<div class="section section-border-bottom">
						<a class="ui-image-detail section-center-image">
							<div class="section-block">	
								<img src="<s:property value="getWeburl()" />">
							</div>
						</a>					
					</div>
				</s:if>
			</s:iterator>
			<div class="section section-border-bottom">
				<div class="section-line">
					<span class="section-icon"><img src="../images/pins/location.png" width="20" height="25"></span>
					<span class="section-text">(<s:property value="droppedPinJson.getString('LATITUDEY')"/>,<s:property value="droppedPinJson.getString('LONGITUDEX')"/>)</span>
				</div>
			</div>
			<div class="section section-border-bottom">
					<div class="section-line">
						<span class="section-text"><s:property value="mbo.getString('STATUS')" /> (<s:property value="mbo.getString('STATUSDATE')" />)</span>
					</div>
					<div class="section-line">
						<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
						<span class="section-text"><s:property value="mbo.getString('SITEID')" /></span>
					</div>
					<div class="section-line">
						<label><s:property value="mbo.getMboValueInfoStatic('TYPE').getTitle()" /></label>
						<span class="section-text"><s:property value="mbo.getString('TYPE')" /></span>
					</div>
					<div class="section-line">
						<label><s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" /></label>
						<span class="section-text"><s:property value="mbo.getString('FAILURECODE')" /></span>
					</div>
			</div>
			<s:if test="!mbo.getString('DESCRIPTION_LONGDESCRIPTION').equalsIgnoreCase('')">
				<div class="section section-border-bottom">
					<div class="section-block">
						<s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/>
					</div>				
				</div>
			</s:if>
			<s:if test="mbo.sigopGranted('METREAD')">
				<div class="ui-btn-container">
					<a onclick="emm.maps.returnToUrl('locationmeter/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>')" class="ui-btn-a"><s:text name="global.entermeterreadings"/></a>
				</div>
			</s:if>
		</div>
	</div>	
</body>
</html>
