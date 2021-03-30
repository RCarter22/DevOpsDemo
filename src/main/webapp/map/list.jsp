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
		<div class="ui-header">
            <s:include value="../common/statusbar.jsp"/>
        </div>
	
		<div class="ui-content">		
			<ul class="ui-listview">	
				<s:iterator value="mapMapObjList" var="mapMapObj">
					<s:if test="#mapMapObj.key == 'DS_WORKORDERS'">
						<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
						<s:iterator value="#mapMapObj.value" var="mapWoList">
							<li>
								<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'WORKORDERID', '<s:property value="#mapWoList.getString('WORKORDERID')"/>', '/map/viewWoPin.action?id=<s:property value="#mapWoList.getString('WORKORDERID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>')">
<%-- 								<a href="viewWoPin.action?id=<s:property value="#mapWoList.getString('WORKORDERID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
									<img src="../images/pins/wo.png" />
									<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapWoList.getString('LATITUDEY')"/>,<s:property value="#mapWoList.getString('LONGITUDEX')"/>)</p>
									<p><strong><s:property value="#mapWoList.getString('WONUM')"/> (<s:property value="#mapWoList.getString('STATUS')"/>)</strong></p>
									<h3 class="ui-wrap"><s:property value="#mapWoList.getString('DESCRIPTION')"/></h3>											
									<div class="ui-row-4">
										<div class="ui-column">
											<strong>Location</strong>: <s:property value="#mapWoList.getString('LOCATION')"/>
										</div>
										<div class="ui-column">
											<strong>Asset</strong>: <s:property value="#mapWoList.getString('ASSETNUM')"/>
										</div>
										<div class="ui-column">
											<strong>Work Type</strong>: <s:property value="#mapWoList.getString('WORKTYPE')"/>
										</div>
										<div class="ui-column">
											<strong>Priority</strong>: <s:property value="#mapWoList.getString('WOPRIORITY')"/>		
										</div>
									</div>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
					</s:if>
					<s:elseif test="#mapMapObj.key == 'DS_SRS'">
						<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
						<s:iterator value="#mapMapObj.value" var="mapSrList">
							<li>
								<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'TICKETUID', '<s:property value="#mapSrList.getString('TICKETUID')"/>', '/map/viewSrPin.action?id=<s:property value="#mapSrList.getString('TICKETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>')">
<%-- 								<a href="viewSrPin.action?id=<s:property value="#mapSrList.getString('TICKETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
									<img src="../images/pins/sr.png" />
									<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapSrList.getString('LATITUDEY')"/>,<s:property value="#mapSrList.getString('LONGITUDEX')"/>)</p>
									<p><strong><s:property value="#mapSrList.getString('TICKETID')"/> (<s:property value="#mapSrList.getString('STATUS')"/>)</strong></p>
									<h3 class="ui-wrap"><s:property value="#mapSrList.getString('DESCRIPTION')"/></h3>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong>Reported By</strong>: <s:property value="#mapSrList.getString('REPORTEDBY')"/>		
										</div>
										<div class="ui-column">
											<strong>Email</strong>: <s:property value="#mapSrList.getString('REPORTEDEMAIL')"/>
										</div>
										<div class="ui-column">
											<strong>Phone</strong>: <s:property value="#mapSrList.getString('REPORTEDPHONE')"/>
										</div>
										<div class="ui-column">
											<strong>Affected</strong>: <s:property value="#mapSrList.getString('AFFECTEDPERSON')"/>		
										</div>
									</div>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
					</s:elseif>
					<s:elseif test="#mapMapObj.key == 'DS_ASSETS'">
						<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
						<s:iterator value="#mapMapObj.value" var="mapAssetList">
							<li>
								<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'ASSETUID', '<s:property value="#mapAssetList.getString('ASSETUID')"/>', '/map/viewAssetPin.action?id=<s:property value="#mapAssetList.getString('ASSETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>&toBeSelected=<s:property value="toBeSelected"/>')">
<%-- 								<a href="viewAssetPin.action?id=<s:property value="#mapAssetList.getString('ASSETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
									<img src="../images/pins/asset.png" />
									<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapAssetList.getString('LATITUDEY')"/>,<s:property value="#mapAssetList.getString('LONGITUDEX')"/>)</p>		
									<p><strong><s:property value="#mapAssetList.getString('ASSETNUM')"/> (<s:property value="#mapAssetList.getString('SERIALNUM')"/>)</strong></p>
									<h3 class="ui-wrap"><s:property value="#mapAssetList.getString('DESCRIPTION')"/></h3>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
					</s:elseif>
					<s:elseif test="#mapMapObj.key == 'DS_LOCATIONS'">
						<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
						<s:iterator value="#mapMapObj.value" var="mapLocList">
							<li>
								<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'LOCATIONSID', '<s:property value="#mapLocList.getString('LOCATIONSID')"/>', '/map/viewLocPin.action?id=<s:property value="#mapLocList.getString('LOCATIONSID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>&toBeSelected=<s:property value="toBeSelected"/>')">
<%-- 								<a href="viewLocPin.action?id=<s:property value="#mapLocList.getString('LOCATIONSID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
									<img src="../images/pins/location.png" />
									<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapLocList.getString('LATITUDEY')"/>,<s:property value="#mapLocList.getString('LONGITUDEX')"/>)</p>		
									<p><strong><s:property value="#mapLocList.getString('LOCATION')"/> (<s:property value="#mapLocList.getString('STATUS')"/>)</strong></p>
									<h3 class="ui-wrap"><s:property value="#mapLocList.getString('DESCRIPTION')"/></h3>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
					</s:elseif>
					<s:elseif test="mapScQueryTables.containsKey(#mapMapObj.key)">

						<s:if test="mapScQueryTables[#mapMapObj.key] == 'WORKORDER'">
							<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
							<s:iterator value="#mapMapObj.value" var="mapWoList">
								<li>
									<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'WORKORDERID', '<s:property value="#mapWoList.getString('WORKORDERID')"/>', '/map/viewWoPin.action?id=<s:property value="#mapWoList.getString('WORKORDERID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>')">								
<%-- 									<a href="viewWoPin.action?id=<s:property value="#mapWoList.getString('WORKORDERID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
										<img src="../images/pins/wo.png" />
										<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapWoList.getString('LATITUDEY')"/>,<s:property value="#mapWoList.getString('LONGITUDEX')"/>)</p>		
										<p><strong><s:property value="#mapWoList.getString('WONUM')"/> (<s:property value="#mapWoList.getString('STATUS')"/>)</strong></p>
										<h3 class="ui-wrap"><s:property value="#mapWoList.getString('DESCRIPTION')"/></h3>
										<div class="ui-row-4">
											<div class="ui-column">
												<strong>Location</strong>: <s:property value="#mapWoList.getString('LOCATION')"/>
											</div>
											<div class="ui-column">
												<strong>Asset</strong>: <s:property value="#mapWoList.getString('ASSETNUM')"/>
											</div>
											<div class="ui-column">
												<strong>Work Type</strong>: <s:property value="#mapWoList.getString('WORKTYPE')"/>
											</div>
											<div class="ui-column">
												<strong>Priority</strong>: <s:property value="#mapWoList.getString('WOPRIORITY')"/>		
											</div>
										</div>
										<span class="ui-arrow"></span>
									</a>
								</li>
							</s:iterator>					
						</s:if>
						<s:elseif test="mapScQueryTables[#mapMapObj.key] == 'SR'">
							<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
							<s:iterator value="#mapMapObj.value" var="mapSrList">
								<li>
									<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'TICKETUID', '<s:property value="#mapSrList.getString('TICKETUID')"/>', '/map/viewSrPin.action?id=<s:property value="#mapSrList.getString('TICKETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>')">
<%-- 									<a href="viewSrPin.action?id=<s:property value="#mapSrList.getString('TICKETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
										<img src="../images/pins/sr.png" />
										<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapSrList.getString('LATITUDEY')"/>,<s:property value="#mapSrList.getString('LONGITUDEX')"/>)</p>		
										<p><strong><s:property value="#mapSrList.getString('TICKETID')"/> (<s:property value="#mapSrList.getString('STATUS')"/>)</strong></p>
										<h3 class="ui-wrap"><s:property value="#mapSrList.getString('DESCRIPTION')"/></h3>
										<div class="ui-row-4">
											<div class="ui-column">
												<strong>Reported By</strong>: <s:property value="#mapSrList.getString('REPORTEDBY')"/>		
											</div>
											<div class="ui-column">
												<strong>Email</strong>: <s:property value="#mapSrList.getString('REPORTEDEMAIL')"/>
											</div>
											<div class="ui-column">
												<strong>Phone</strong>: <s:property value="#mapSrList.getString('REPORTEDPHONE')"/>
											</div>
											<div class="ui-column">
												<strong>Affected</strong>: <s:property value="#mapSrList.getString('AFFECTEDPERSON')"/>		
											</div>
										</div>
										<span class="ui-arrow"></span>
									</a>
								</li>
							</s:iterator>						
						</s:elseif>
						<s:elseif test="mapScQueryTables[#mapMapObj.key] == 'ASSET'">
							<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
							<s:iterator value="#mapMapObj.value" var="mapAssetList">
								<li>
									<a onclick="emm.maps.zoomTo('<s:property value="#mapMapObj.key"/>', 'ASSETUID', '<s:property value="#mapAssetList.getString('ASSETUID')"/>', '/map/viewAssetPin.action?id=<s:property value="#mapAssetList.getString('ASSETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>&toBeSelected=<s:property value="toBeSelected"/>')">
<%-- 									<a href="viewAssetPin.action?id=<s:property value="#mapAssetList.getString('ASSETUID')"/>&dataSourceId=<s:property value="#mapMapObj.key"/>&fromList=true"> --%>
										<img src="../images/pins/asset.png" />
										<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapAssetList.getString('LATITUDEY')"/>,<s:property value="#mapAssetList.getString('LONGITUDEX')"/>)</p>		
										<p><strong><s:property value="#mapAssetList.getString('ASSETNUM')"/> (<s:property value="#mapAssetList.getString('SERIALNUM')"/>)</strong></p>
										<h3 class="ui-wrap"><s:property value="#mapAssetList.getString('DESCRIPTION')"/></h3>
										<span class="ui-arrow"></span>
									</a>
								</li>
							</s:iterator>
						</s:elseif>	
											
					</s:elseif>
					<!-- For ESRI Objects, we will do a standard format below -->
					<s:else>
						<li class="ui-divider"><s:property value="mapMapCategories[#mapMapObj.key]"/></li>
						<s:iterator value="#mapMapObj.value" var="mapEsriList">
							<li>
								<a onclick="emm.maps.zoomToPoint('<s:property value="#mapEsriList.getString('emmmap_y')"/>', '<s:property value="#mapEsriList.getString('emmmap_x')"/>', 14, '/map/viewDroppedPin.action?dataSourceId=<s:property value="#mapMapObj.key"/>&jsonParam=<s:property value="#mapEsriList"/>&fromList=true&fromCluster=<s:property value="fromCluster"/>')">
<%-- 								<a href="viewDroppedPin.action?dataSourceId=<s:property value="#mapMapObj.key"/>&jsonParam=<s:property value="#mapEsriList"/>&fromList=true"> --%>
									<img src="../images/pins/droppedpin.png" />
									<p style="color: #195ea8; margin-bottom: 10px">(<s:property value="#mapEsriList.getString('emmmap_y')"/>,<s:property value="#mapEsriList.getString('emmmap_x')"/>)</p>		
									<h3 class="ui-wrap"><s:property value="#mapEsriList.getString('OBJECTID')"/></h3>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
					</s:else>
				</s:iterator>
			</ul>
		</div>
	</div>

</body>
</html>
