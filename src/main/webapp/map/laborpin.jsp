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
					<button class="section-back-button" onclick="emm.maps.trigger('search')">
						<span class="emm-chevron-left section-center-image"></span>
					</button>				
				</s:if>
				<div>
					<h1 class="section-header-title"><s:property value="mbo.getMboValueInfoStatic('LABORCODE').getTitle()" /> <s:property value="mbo.getString('LABORCODE')"/></h1>
					<h2 class="section-header-subtitle"><s:property value="mbo.getString('PERSON.DISPLAYNAME')"/></h2>
				</div>
			</div>
			<div class="section-action">
				<button class="section-action-button" onclick="emm.core.ezphoto('<s:property value="ezPhotoURL"/>')">
					<span class="section-action-button-icon emm-camera"></span>
					<span class="section-action-button-text"><s:text name="global.takephoto"/></span>
				</button>
			</div>
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
					<span class="section-icon"><img src="../images/pins/labor.png" width="20" height="25"></span>
					<span class="section-text">(<s:property value="mbo.getString('LATITUDEY')"/>,<s:property value="mbo.getString('LONGITUDEX')"/>)</span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-building"></span>
					<span class="section-text"><s:property value="mbo.getString('PERSON.CITY')"/></span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-phone"></span>
					<span onclick="emm.util.phone('<s:property value="mbo.getString('PERSON.PRIMARYPHONE')"/>')" class="section-text"><s:property value="mbo.getString('PERSON.PRIMARYPHONE')"/></span>		
				</div>
				<div class="section-line">
					<span class="section-icon emm-inbox"></span>
					<span onclick="emm.util.email('<s:property value="mbo.getString('PERSON.PRIMARYEMAIL')"/>')" class="section-text"><s:property value="mbo.getString('PERSON.PRIMARYEMAIL')"/></span>		
				</div>
			</div>
		</div>
	</div>
</body>
</html>
