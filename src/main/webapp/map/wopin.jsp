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
					<h1 class="section-header-title"><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /> <s:property value="mbo.getString('WONUM')"/></h1>
					<h2 class="section-header-subtitle"><s:property value="mbo.getString('DESCRIPTION')"/></h2>
				</div>	
			</div>
			<div class="section-action">
				<button class="section-action-button" onclick="emm.maps.returnToUrl('wotrack/view.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">
					<span class="section-action-button-icon emm-share-square-o"></span>
					<span class="section-action-button-text"><s:text name="global.details"/></span>
				</button>
				<s:if test="mbo.getMboSet('$MYACTIVETIMER', 'LABTRANS', \"refwo=:wonum and siteid=:siteid and timerstatus in (select value from synonymdomain where domainid = 'TIMERSTATUS' and maxvalue = 'ACTIVE') and laborcode = (select laborcode from labor where personid = :&PERSONID& and orgid = :orgid)\").isEmpty()">
					<button class="section-action-button" onclick="window.location='startTimerMap.action?id=<s:property value="mbo.getUniqueIDValue()"/>&fromList=<s:property value="isFromList()"/>'">
						<span class="section-action-button-icon emm-clock-o"></span>
						<span class="section-action-button-text"><s:text name="labtrans.starttimer"/></span>
					</button>		
				</s:if>
				<s:else>
					<button class="section-action-button" onclick="window.location='stopTimerMap.action?id=<s:property value="mbo.getUniqueIDValue()"/>&fromList=<s:property value="isFromList()"/>'">
						<span class="section-action-button-icon emm-clock-o"></span>
						<span class="section-action-button-text"><s:text name="labtrans.stoptimer"/></span>
					</button>
				</s:else>
				<button class="section-action-button ui-btn-save" onclick="emm.core.save();">
					<span class="section-action-button-icon emm-check-circle"></span>
					<span class="section-action-button-text"><s:text name="global.save"/></span>
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
					<span class="section-icon"><img src="../images/pins/wo.png" width="20" height="25"></span>
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
					<label><s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()" /></label>
				</div>
				<div class="section-line">
					<span class="section-icon emm-user"></span>
					<span class="section-text">			
						<span class="section-select">							
							<select name="LEAD" id="LEAD" onchange="emm.core.setValue(this);">
						    	<option value=""><s:text name="global.selectvalue"/></option>
								<s:iterator value="jsonLaborList">
									<s:if test="getString('PERSONID') eq mbo.getString('LEAD')">
								    	<option value="<s:property value="getString('PERSONID')"/>" selected><s:property value="getString('DISPLAYNAME')"/></option>
								    </s:if>
								    <s:else>
								    	<option value="<s:property value="getString('PERSONID')"/>"><s:property value="getString('DISPLAYNAME')"/></option>
								    </s:else>
							    </s:iterator>
<!-- 							    ============================================================================================================= -->
<!-- 							    Uncomment this block to display distance information with the labor list instead of the above block without it. -->
<!-- 							    This requires using the commented out code sample in MaspESRIProviderAction/viewWoPin.action. -->
<!-- 							    Make sure to comment out the iterator block above this. -->
<!-- 								============================================================================================================= -->
<%-- 							    <s:iterator value="jsonLaborList"> --%>
<%-- 									<s:if test="getString('PERSONID') eq mbo.getString('LEAD')"> --%>
<%-- 								    	<option value="<s:property value="getString('PERSONID')"/>" selected>(<s:property value="getString('DISTANCE_MILE')"/>) <s:property value="getString('DISPLAYNAME')"/></option> --%>
<%-- 								    </s:if> --%>
<%-- 								    <s:else> --%>
<%-- 								    	<option value="<s:property value="getString('PERSONID')"/>">(<s:property value="getString('DISTANCE_MILE')"/>) <s:property value="getString('DISPLAYNAME')"/></option> --%>
<%-- 								    </s:else> --%>
<%-- 							    </s:iterator> --%>
							</select>
						</span>			
					</span>					
				</div>
				<div class="section-line">
					<span class="section-icon emm-phone"></span>
					<s:iterator value="jsonLaborList">
						<s:if test="getString('PERSONID') eq mbo.getString('LEAD') and getString('PHONENUM') neq 'null'">	
							<span onclick="emm.util.phone('<s:property value="getString('PHONENUM')"/>')" class="section-text"><s:property value="getString('PHONENUM')"/></span>						
						</s:if>
					</s:iterator>
				</div>
				
				<div class="section-line">
					<span class="section-icon emm-inbox"></span>
					<s:iterator value="jsonLaborList">
						<s:if test="getString('PERSONID') eq mbo.getString('LEAD') and getString('EMAILADDRESS') neq 'null'">						
							<span onclick="emm.util.email('<s:property value="getString('EMAILADDRESS')"/>')" class="section-text"><s:property value="getString('EMAILADDRESS')"/></span>
						</s:if>
					</s:iterator>
				</div>

<!-- 				<div class="section-open"> -->
<!-- 					<button class="section-open-toggle"> -->
<%-- 						More <span class="emm-chevron-down"></span> --%>
<!-- 					</button>					 -->
<!-- 				</div>				 -->
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
					<label><s:property value="mbo.getMboValueInfoStatic('WORKTYPE').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('WORKTYPE')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('WOPRIORITY').getTitle()" /></label>
					<span class="section-text"><s:property value="mbo.getString('WOPRIORITY')" /></span>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('SCHEDSTART').getTitle()" /></label>
					<input type="text" name="SCHEDSTART" id="SCHEDSTART" onchange="emm.core.setValue(this);" value="<s:property value="mbo.getString('SCHEDSTART')" />"></input>
					<a class="section-icon-calendar emm-calendar" data-control="datepicker" data-datetype="datetime" data-input="SCHEDSTART"></a>
				</div>
				<div class="section-line">
					<label><s:property value="mbo.getMboValueInfoStatic('SCHEDFINISH').getTitle()" /></label>
					<input type="text" name="SCHEDFINISH" id="SCHEDFINISH" onchange="emm.core.setValue(this);" value="<s:property value="mbo.getString('SCHEDFINISH')" />"></input>
					<a class="section-icon-calendar emm-calendar" data-control="datepicker" data-datetype="datetime" data-input="SCHEDFINISH"></a>
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
