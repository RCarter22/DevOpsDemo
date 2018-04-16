<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<html>
	<head>
		<script type="text/javascript" src="../javascript/jquery.js"></script>
		<script type="text/javascript">
			function go(id) {
				window.open($('#'+id).attr('value'));
			}
		</script>
	</head>
	<body>
		<ul>
			<li>
				<a href="javascript: go('login');">Click me to test login</a>
				<br/>
				<textarea id="login" cols="100" rows="2">../ws/login/login.action?&jsonParam={"user":{"username": "jjiang", "password": "tttttt"}}</textarea>
			</li>
			
			<li>
				<a href="javascript: go('getAvailableApplications');">Click me to test getAvailableApplications</a>
				<br/>
				<textarea id="getAvailableApplications" cols="100" rows="2">../ws/application/getAvailableApplications.action?token=jjiang|tttttt</textarea>
			</li>
			
			<li>
				<a href="javascript: go('getAllSitesTopLevelLocation');">Click me to test getAllSitesTopLevelLocation</a>
				<br/>
				<textarea id="getAllSitesTopLevelLocation" cols="100" rows="2">../ws/location/getAllSitesTopLevelLocation.action?token=jjiang|tttttt</textarea>
			</li>

			<li>
				<a href="javascript: go('getWorkOrderMenus');">Click me to test getWorkOrderMenus</a>
				<br/>
				<textarea id="getWorkOrderMenus" cols="100" rows="2">../ws/workorder/getWorkOrderMenus.action?token=jjiang|tttttt</textarea>
			</li>
		
			<li>
				<a href="javascript: go('getAssignedWorkOrders');">Click me to test getAssignedWorkOrders</a>
				<br/>
				<textarea id="getAssignedWorkOrders" cols="100" rows="2">../ws/workorder/getAssignedWorkOrders.action?token=jjiang|tttttt&jsonParam={"sortBy": "","sortDir": "","pagination":{"currentPageNum": 1}}</textarea>
			</li>
			
			<li>
				<a href="javascript: go('getUnassignedWorkOrders');">Click me to test getUnassignedWorkOrders</a>
				<br/>
				<textarea id="getUnassignedWorkOrders" cols="100" rows="2">../ws/workorder/getUnassignedWorkOrders.action?token=jjiang|tttttt&jsonParam={"sortBy": "","sortDir": "","pagination":{"currentPageNum": 1}}</textarea>
			</li>
			
			<li>
				<a href="javascript: go('getMyWorkOrders');">Click me to test getMyWorkOrders</a>
				<br/>
				<textarea id="getMyWorkOrders" cols="100" rows="2">../ws/workorder/getMyWorkOrders.action?token=jjiang|tttttt&jsonParam={"sortBy": "","sortDir": "","pagination":{"currentPageNum": 1}}</textarea>
			</li>
			
			<li>
				<a href="javascript: go('findWorkOrder');">Click me to test findWorkOrder</a>
				<br/>
				<textarea id="findWorkOrder" cols="100" rows="2">../ws/workorder/findWorkOrder.action?token=jjiang|tttttt&jsonParam={"workOrder":{"woNum": "GP10255"}}</textarea>
			</li>

			<li>
				<a href="javascript: go('addWorkOrder');">Click me to test addWorkOrder</a>
				<br/>
				<textarea id="addWorkOrder" cols="100" rows="2">../ws/workorder/addWorkOrder.action?token=jjiang|tttttt&jsonParam={"workOrder":{"location":"C715", "description": "2010-05-10","woLatitude":"42.37264","woLongitude":"-71.109653"}}</textarea>
			</li>

			<li>
				<a href="javascript: go('updateWorkOrder');">Click me to test updateWorkOrder</a>
				<br/>
				<textarea id="updateWorkOrder" cols="100" rows="2">../ws/workorder/updateWorkOrder.action?token=jjiang|tttttt&jsonParam={"workOrder":{"woNum":"GP10255", "status":"APPR", "description": "2010-05-10 update"}}</textarea>
			</li>

			<li>
				<a href="javascript: go('updateWorkOrders');">Click me to test updateWorkOrders</a>
				<br/>
				<textarea id="updateWorkOrders" cols="100" rows="2">../ws/workorder/updateWorkOrders.action?token=jjiang|tttttt&jsonParam={"workorders":[{"wonum":"GP10255", "status":"APPR", "description": "2010-05-10 update"}]}</textarea>
			</li>

			<li>
				<a href="javascript: go('getValidStatusList');">Click me to test getValidStatusList</a>
				<br/>
				<textarea id="getValidStatusList" cols="100" rows="2">../ws/workorder/getValidStatusList.action?token=jjiang|tttttt&jsonParam={"workOrder":{"woNum":"GP10255"}}</textarea>
			</li>
			
			<li>
				<a href="javascript: go('getAttachments');">Click me to test getAttachments</a>
				<br/>
				<textarea id="getAttachments" cols="100" rows="2">../ws/doclinks/getAttachments.action?token=jjiang|tttttt&jsonParam={"docInfo":{"id":"13605"}}</textarea>
			</li>
			
			<li>
				<a href="javascript: go('listLocationBySite');">Click me to test get location by site</a>
				<br/>
				<textarea id="listLocationBySite" cols="100" rows="2">../ws/location/listLocationBySite.action?token=jjiang|tttttt&jsonParam={"siteId":"OK"}</textarea>
			</li>

			<li>
				<a href="javascript: go('listAssetBySite');">Click me to test get asset by site</a>
				<br/>
				<textarea id="listAssetBySite" cols="100" rows="2">../ws/asset/listAssetBySite.action?token=jjiang|tttttt&jsonParam={"siteId":"OK"}</textarea>
			</li>

			<li>
				<a href="javascript: go('uploadOfflineData');">uploadOfflineData</a>
				<br/>
				<textarea id="uploadOfflineData" cols="100" rows="2">../ws/offline/uploadOfflineData.action?token=jjiang|tttttt&jsonParam={"siteId":"OK"}</textarea>
			</li>
		</ul>
	</body>
</html>
