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
					<h1 class="section-header-title"><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /> <s:property value="mbo.getString('ASSETNUM')"/></h1>
					<h2 class="section-header-subtitle"><s:property value="mbo.getString('DESCRIPTION')"/></h2>
				</div>
			</div>
			<s:if test="dataSourceId.equals('DS_ASSETS') && isToBeSelected()">
				<div class="section-action">
					<button class="section-action-button" onclick="emm.maps.returnToUrl('wotrack/setMapValue.action?MAPATTRNAME=ASSETNUM&MAPATTRVAL=<s:property value="mbo.getString('ASSETNUM')"/>')">
						<span class="section-action-button-icon emm-check-circle"></span>
						<span class="section-action-button-text"><s:text name="global.select"/></span>
					</button>
				</div>
			</s:if>
			<s:else>
				<div class="section-action">
					<button class="section-action-button" onclick="emm.maps.returnToUrl('asset/view.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">
						<span class="section-action-button-icon emm-share-square-o"></span>
						<span class="section-action-button-text"><s:text name="global.details"/></span>
					</button>
					<button class="section-action-button" onclick="emm.maps.returnToUrl('wotrack/create.action?LONGITUDEX=<s:property value="droppedPinJson.getString('emmmap_x')"/>&LATITUDEY=<s:property value="droppedPinJson.getString('emmmap_y')"/>&jsonParam=<s:property value="jsonParam"/>')">
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
			<div class="section section-border-bottom" id="qrcode"></div>
			<div class="section section-border-bottom">
				<div class="section-line">
					<span class="section-icon"><img src="../images/pins/asset.png" width="20" height="25"></span>
					<span class="section-text">(<s:property value="mbo.getString('SERVICEADDRESS.LATITUDEY')"/>,<s:property value="mbo.getString('SERVICEADDRESS.LONGITUDEX')"/>)</span>
				</div>
				<div class="section-line">
					<span class="section-icon emm-building"></span>
					<span class="section-text"><s:property value="mbo.getString('LOCATION.DESCRIPTION')"/></span>
				</div>
<!-- 				<div class="section-open"> -->
<!-- 					<button class="section-open-toggle"> -->
<%-- 						More <span class="emm-chevron-down"></span> --%>
<!-- 					</button>					 -->
<!-- 				</div> -->
			</div>
			<div class="section section-border-bottom">
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('STATUS')" /> (<s:property value="mbo.getString('STATUSDATE')" />)</span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('SITEID')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('PARENT')"/></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('SERIALNUM').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('SERIALNUM')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('VENDOR')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('MANUFACTURER').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('MANUFACTURER')" /></span>
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
				<div class="ui-btn-container section-action">
					<button class="section-button" onclick="emm.maps.returnToUrl('assetmeter/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>')"><s:text name="global.entermeterreadings"/></button>
				</div>
			</s:if>
			<div class="ui-btn-container section-action">
				<button class="section-button" onclick="emm.barcodes.zebra.print('mytemplateQR', {'title':'<s:property value="mbo.getString('ASSETNUM')"/>','placeholder1':'<s:property value="mbo.getString('DESCRIPTION')"/>','barcodeValue':'<s:property value="mbo.getString('ASSETNUM')"/>'});">Print QR Code</button> 
          		<button class="section-button" onclick="emm.barcodes.zebra.print('mytemplate2D', {'title':'<s:property value="mbo.getString('DESCRIPTION')"/>','barcodeValue':'<s:property value="mbo.getString('ASSETNUM')"/>'});">Print 2D Barcode</button> 
			</div>	
		</div>
<%-- 		<s:if test="mbo.sigopGranted('METREAD')"> --%>
<!-- 			<div class="ui-btn-container"> -->
<%-- 				<a onclick="emm.maps.returnToUrl('assetmeter/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>')" class="ui-btn-a"><s:text name="global.entermeterreadings"/></a> --%>
<!-- 			</div> -->
<%-- 		</s:if> --%>
<!-- 		<div class="ui-btn-container"> -->
<%--           <a class="ui-btn-e" onclick="emm.barcodes.zebra.print('mytemplateQR', {'title':'<s:property value="mbo.getString('ASSETNUM')"/>','placeholder1':'<s:property value="mbo.getString('DESCRIPTION')"/>','barcodeValue':'<s:property value="mbo.getString('ASSETNUM')"/>'});">Print QR Code</a>  --%>
<%--           <a class="ui-btn-e" onclick="emm.barcodes.zebra.print('mytemplate2D', {'title':'<s:property value="mbo.getString('DESCRIPTION')"/>','barcodeValue':'<s:property value="mbo.getString('ASSETNUM')"/>'});">Print 2D Barcode</a>  --%>
<!-- 		</div>		 -->
	</div>
	<script type="text/javascript">
		$(function(){
			// QR Code 
			emm.barcodes.zebra.addTemplate('mytemplateQR', '^XA^LH20,20^FO5,17^GB780,360,8^FS^FO5,17^GB780,90,4^FS^FT248,100^A0N,100,100^FD{{title}}^FS^FO5,103^GB390,274,4^FS^FO15,110^A0N,30,30^TBN,355,250^FD{{placeholder1}}^FS^FT26,275^A0N,30,30^FO480,130 ^BQ,2,10^FDQa,{{barcodeValue}}^FS^XZ');
			//  2D Code 
			emm.barcodes.zebra.addTemplate('mytemplate2D', '^XA^LH20,20^FO5,17^GB780,360,8^FS^FO5,17^GB780,200,4^FS^FO45,70^FB750,6,,^A0N,39,38^FD{{title}}^FS^FO280,230^BY3 ^B2N,100,Y,N,N^FD{{barcodeValue}}^FS^XZ');
		});

		new QRCode(document.getElementById("qrcode"), '<s:property value="mbo.getString('ASSETNUM')"/>');
		$("#qrcode > img").css({"margin":"auto", "height": "150px", "width": "150px"});
		
	</script>
</body>
</html>
