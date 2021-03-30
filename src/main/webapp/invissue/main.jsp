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
					STOREROOMS : "SELECT * FROM STOREROOM WHERE SITEID='" + '<s:property value="user.getSiteId()"/>' + "'"
				},
				offlinePage = "offline/invissue/main.htm";
			
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
			<a class="ui-btn-left" href="../main.action"><span class="emm-home"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.invissue"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<s:if test="mboList.size > 0">
			    <ul class="ui-listview">
					<li>
						<a href="myqueries.action">
							<span class="emm-other"></span>
							<h3><s:text name="global.mysavedqueries"/></h3>
							<span class="ui-arrow"></span>
						</a>				
					</li>
					<li>
						<a href="queries.action">
							<span class="emm-other"></span>
							<h3><s:text name="global.allsavedqueries"/></h3>
							<span class="ui-arrow"></span>
						</a>				
					</li>
					<li class="ui-divider"><s:text name="inventor.defaultsitestorerooms"/> <s:property value="user.getSiteId()"/></li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="issue.action?id=<s:property value="getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
								<p><s:property value="getString('LOCATION')"/> (<s:property value="getString('STATUS')"/>) </p>								
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
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
			<s:if test="offlineModeEnabled eq true">
				<ul class="ui-listview">
					<li class="ui-divider"><s:text name="global.offlinemode"/></li>
					<li data-native="true">
						<a onclick="EMMServer.Offline.sync();">
							<span class="emm-sync"></span>
							<h3><s:text name="global.syncserver"/></h3>
							<span class="ui-arrow"></span>
						</a>	
					</li>
					<li data-native="true">
						<a onclick="goOffline()">
							<span class="emm-offline"></span>
							<h3><s:text name="ezmaxmobile.offline"/></h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
					<li>
						<a href="../txntrack/main.action">
							<span class="emm-stack-records"></span>
							<h3><s:text name="ezmaxmobile.txntrack"/></h3>
							<span class="ui-badge"><s:property value="getTransactionErrorCount()"/></span>
							<span class="ui-arrow"></span>
						</a>	
					</li>
				</ul>
			</s:if>	
		</div>
	</div>
</body>
</html>
