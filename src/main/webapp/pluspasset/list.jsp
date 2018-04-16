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
	<s:include value="../common/includes.jsp"/></head>
	<script type="text/javascript">
		function openMap(){						
			// Create new Map object
			var map = new emm.maps.Map();
			map.setProvider(emm.maps.Providers.GOOGLE);
			map.setSidebar('pluspasset/map/sidebar_asset.htm'); 			
			map.addEventListener('onDataSelected', function(data){
				location.href = "view.action?id="+data.ASSETUID;
			});
			
			// Data Source
			var ds = new emm.maps.DataSource();
			ds.setKey('ASSETS');
			ds.setTitle('Assets');
			ds.setImage('images/pins/asset.png');
			ds.setCallout('pluspasset/map/callout_asset.htm')
			ds.setLatLngFields('Y', 'X');
			ds.addEventListener('onBoundsChanged', function(bounds){
				return 'pluspasset/ws/assets.action?' + $.param(bounds);
			});
			
			// Add Data Source to Map
			map.addDataSource(ds);				
			
			// Launch Map
			emm.maps.launchMap(map);
		}		
	</script>	
<body>
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.pluspasset"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="LOCATION,ASSETNUM"><img src="../images/barcode.png"/></a>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">ASSETNUM,DESCRIPTION</s:param>
			</s:include>
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">	
				<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="ASSETNUM"><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()"/></option>
							    <option value="LOCATION"><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()"/></option>
							    <option value="STATUS"><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></option>
							    <option value="DESCRIPTION"><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>					
			    <ul class="ui-listview">
			    <li class="ui-divider"><s:text name="global.list"/></li>
					<li data-native="true">
						<a onclick="openMap()">
							<img src="../images/map.png" />
							<h3><s:text name="global.openmap"/></h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>">							
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
								<p><strong><s:property value="getString('ASSETNUM')"/></strong></p>
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/> - <s:property value="getString('LOCATION.DESCRIPTION')"/></p>
								<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
		</div>
	</div>
</body>
</html>
