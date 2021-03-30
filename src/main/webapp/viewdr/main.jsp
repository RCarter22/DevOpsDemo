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
					SAVEDTOTAL : "SELECT COUNT(*) AS SAVEDTOTAL FROM MR WHERE STATUS IN ('DRAFT','WAPPR')",
					SUBMITTOTAL : "SELECT COUNT(*) AS SUBMITTOTAL FROM MR WHERE STATUS IN ('APPR')"
				},
				offlinePage = "offline/viewdr/main.htm";
			
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.viewdr"/></h3>
		</div>
		<div class="ui-content">	
			<ul class="ui-listview">
				<li>
					<a href="viewdrafts.action">
						<span class="emm-purchase"></span>
						<h3><s:text name="viewdr.savedreq"/></h3>
						<span class="ui-arrow"></span>
					</a>						
				</li>
				<li>
					<a href="viewreqs.action">
						<span class="emm-purchase"></span>
						<h3><s:text name="viewdr.submitreq"/></h3>
						<span class="ui-arrow"></span>
					</a>						
				</li>	
			</ul>
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
