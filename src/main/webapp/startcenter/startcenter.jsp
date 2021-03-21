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
	<s:include value="../common/includes.jsp"/>
	<s:if test="offlineModeEnabled eq true">
		<script type="text/javascript">
			var queries = {
					STARTCENTER : "SELECT * FROM STARTCENTER ORDER BY DESCRIPTION",
					PORTLET : "SELECT * FROM PORTLET WHERE SCCONFIGID IN (SELECT SCCONFIGID FROM STARTCENTER WHERE ISDEFAULT = '1') ORDER BY ORDERNUM ASC"
				},
				offlinePage = "offline/login/default.htm";
			
			$(function(){
				EMMServer.Offline.prepareBounce(queries, offlinePage);
			});
		</script>
	</s:if>	
</head>
<body>
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>		
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.util.confirm({title:'<s:text name="ezmaxmobile.startcenter"/>',message:'<s:text name="global.updatestartcenter"/>',yes:function(){window.location='update.action?id=<s:property value="id"/>'}});"><span class="emm-refresh"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.startcenter"/></h3>
		</div>
		<ul class="ui-navbar">
			<s:iterator value="startCenters">
				<li>
					<a
						<s:if test="getInt('SCCONFIGID') != id">
							href="main.action?id=<s:property value="getInt('SCCONFIGID')"/>"
						</s:if>
						<s:else>
							class="ui-active"
						</s:else>
					>
						<s:property value="getString('DESCRIPTION')"/>
					</a>
			</s:iterator>	
		</ul>	
				
		<div class="ui-content">
			<ul class="ui-listview">						
				<li id="startCenterTemplatePlaceholder"></li>
								
			</ul>
			<div id="ACTIONS" class="ui-sidebar">
				<ul class="ui-listview">
					<s:if test="isEmmMapEnabled() and isEmmMapScEnabled()">
						<li data-native="true" class="ui-divider ui-divider-b"><s:text name="global.map"/></li>
						<li data-native="true">
							<a id="mapButton" data-control="map" data-modules="">
								<span class="emm-map-location"></span>
								<h3><s:text name="global.openmap"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:if>
			
					<li id="favoriteAppsTemplatePlaceholder"></li>
					<li id="quickInsertTemplatePlaceholder"></li>
				</ul>
			</div>
		</div>		
	</div>
	
	<script type="text/javascript">
		var html = [], 
			userApps = [],
			moduleIds = [];
			
		<s:iterator value="portlets">userApps.push({appName:'<s:property value="appName"/>',portletType:'<s:property value="portletType"/>',title:'<s:property value="title"/>',id:'<s:property value="id"/>',recordCount:'<s:property value="recordCount"/>'});</s:iterator>
		
		html[0] = emm.core.generateStartCenterHtml(userApps);
		html[1] = emm.core.generateFavoriteAppsHtml(userApps);
		html[2] = emm.core.generateQuickInsertHtml(userApps);
		
		$('#startCenterTemplatePlaceholder').replaceWith(html[0]);
		$('#favoriteAppsTemplatePlaceholder').replaceWith(html[1]);
		$('#quickInsertTemplatePlaceholder').replaceWith(html[2]);	

		<s:iterator value="portlets"><s:if test="portletType eq 'RSCONFIG'">moduleIds.push('EMMSC_<s:property value="id"/>');</s:if></s:iterator>
		$("#mapButton").attr("data-modules", JSON.stringify(moduleIds));
	</script>
</body>
</html>
