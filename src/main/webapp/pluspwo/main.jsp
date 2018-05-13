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
					ACTIVEWORKORDER : "SELECT * FROM WORKORDER W LEFT OUTER JOIN LABTRANS LT ON W.WONUM =  LT.WONUM AND W.SITEID = LT.SITEID WHERE LT.TIMERSTATUS = 'ACTIVE' AND LABORCODE = (SELECT LABORCODE FROM LABOR WHERE PERSONID = '" + '<s:property value="user.getPersonId()"/>' + "')",
					WORKORDER : "SELECT COUNT(*) AS WOTOTAL FROM WORKORDER WHERE ISTASK='0'"
				},
				offlinePage = "offline/pluspwo/main.htm";
			
			function goOffline() {
				EMMServer.DB.Select()
					.addQueries(queries)
					.submit(offlinePage, true);
			}
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
			<a class="ui-btn-left" href="../main.action"><img src="../images/homelink.png"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.pluspwo"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="ASSETNUM,LOCATION,ASSET.SDX_LEGACYASSET,LOCATION.SDX_LEGACYLOCATION"><img src="../images/barcode.png"/></a>
		</div>
		<div class="ui-content">	
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">WONUM,DESCRIPTION,ASSETNUM,LOCATION</s:param>
			</s:include>	
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li data-visible="<s:property value="mbo.sigopGranted('INSERT')"/>">
					<a href="create.action">
						<img src="../images/addnew.png" />
						<h3><s:text name="global.addnew"/></h3>
						<span class="ui-arrow"></span>
					</a>				
				</li>
<%-- 				<li>
					<a href="myqueries.action">
						<img src="../images/other.png" />
						<h3><s:text name="global.mysavedqueries"/></h3>
						<span class="ui-arrow"></span>
					</a>				
				</li>
				<li>
					<a href="queries.action">
						<img src="../images/other.png" />
						<h3><s:text name="global.allsavedqueries"/></h3>
						<span class="ui-arrow"></span>
					</a>				
				</li> --%>
			</ul>
			
			<s:if test="mboList.size > 0">				
				<ul class="ui-listview">			
					<li class="ui-divider"><s:text name="global.activeworkorders"/></li>				
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getMboSet('WORKORDER').getMbo(0).getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>					
								<p><strong><s:property value="getMboValueInfoStatic('WORKORDER.WONUM').getTitle()" />: <s:property value="getString('REFWO')"/></strong></p>
								<h3><s:property value="getString('WORKORDER.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('STARTDATE').getTitle()" />: <s:property value="getString('STARTDATE')"/></p>																
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>			
			
			<ul class="ui-listview">
				<li class="ui-divider"><s:text name="ezmaxmobile.labrep"/></li>
				<li>
					<a href="../labtrans/workhours.action">
						<img src="../images/labor.png" />
						<h3><s:text name="global.timeentry"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
			
			<s:if test="offlineModeEnabled eq true">
				<ul class="ui-listview" data-native="true">
					<li class="ui-divider"><s:text name="global.offlinemode"/></li>
					<li>
						<a onclick="EMMServer.Offline.sync();">
							<img src="../images/sync.png" />
							<h3><s:text name="global.syncserver"/></h3>
							<span class="ui-arrow"></span>
						</a>	
					</li>
					<li>
						<a onclick="goOffline()">
							<img src="../images/offline.png" />
							<h3><s:text name="ezmaxmobile.offline"/></h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
				</ul>
			</s:if>
			
		</div>
	</div>
</body>
</html>
