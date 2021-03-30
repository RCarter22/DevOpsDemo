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
					<h1 class="section-header-title"><s:property value="mbo.getMboValueInfoStatic('TICKETID').getTitle()" /> <s:property value="mbo.getString('TICKETID')"/></h1>
					<h2 class="section-header-subtitle"><s:property value="mbo.getString('DESCRIPTION')"/></h2>
				</div>
			</div>
			<div class="section-action">
				<button class="section-action-button" onclick="emm.maps.returnToUrl('sr/view.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">
					<span class="section-action-button-icon emm-share-square-o"></span>
					<span class="section-action-button-text"><s:text name="global.details"/></span>
				</button>
				<button class="section-action-button" onclick="window.location='takeOwnershipMap.action?id=<s:property value="mbo.getUniqueIDValue()"/>&fromList=<s:property value="isFromList()"/>'">
					<span class="section-action-button-icon emm-owner-select-1"></span>
					<span class="section-action-button-text"><s:text name="global.takeownership"/></span>
				</button>
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
					<span class="section-icon"><img src="../images/pins/sr.png" width="20" height="25"></span>
					<span class="section-text">(<s:property value="mbo.getString('SERVICEADDRESS.LATITUDEY')"/>,<s:property value="mbo.getString('SERVICEADDRESS.LONGITUDEX')"/>)</span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-fire-extinguisher"></span>
					<span class="section-text"><s:property value="mbo.getString('ASSET.DESCRIPTION')"/></span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-building"></span>
					<span class="section-text"><s:property value="mbo.getString('LOCATION.DESCRIPTION')"/></span>
				</div>		
			</div>
			<div class="section section-border-bottom">
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('STATUS')" /> (<s:property value="mbo.getString('STATUSDATE')" />)</span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETSITEID').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('ASSETSITEID')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('OWNER').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('OWNER')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDPRIORITY').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('REPORTEDPRIORITY')" /></span>
				</div>
			</div>
			<div class="section section-border-bottom">
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('AFFECTEDPERSONID').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('AFFECTEDPERSONID')" /></span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-phone"></span>
					<span onclick="emm.util.phone('<s:property value="mbo.getString('AFFECTEDPHONE')"/>')" class="section-text"><s:property value="mbo.getString('AFFECTEDPHONE')"/></span>		
				</div>
				<div class="section-line">
					<span class="section-icon emm-inbox"></span>
					<span onclick="emm.util.email('<s:property value="mbo.getString('AFFECTEDEMAIL')"/>')" class="section-text"><s:property value="mbo.getString('AFFECTEDEMAIL')"/></span>		
				</div>	
			</div>
			<div class="section section-border-bottom">
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDBYID').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('REPORTEDBYID')" /></span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-phone"></span>
					<span onclick="emm.util.phone('<s:property value="mbo.getString('REPORTEDPHONE')"/>')" class="section-text"><s:property value="mbo.getString('REPORTEDPHONE')"/></span>		
				</div>
				<div class="section-line">
					<span class="section-icon emm-inbox"></span>
					<span onclick="emm.util.email('<s:property value="mbo.getString('REPORTEDEMAIL')"/>')" class="section-text"><s:property value="mbo.getString('REPORTEDEMAIL')"/></span>		
				</div>	
			</div>
			<s:if test="!mbo.getString('DESCRIPTION_LONGDESCRIPTION').equalsIgnoreCase('')">
				<div class="section section-border-bottom">
					<div class="section-block">
						<s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/>
					</div>				
				</div>
			</s:if>
		</div>
	</div>
</body>
</html>
