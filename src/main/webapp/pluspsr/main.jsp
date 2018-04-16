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
					ACTIVESRTOTAL : "SELECT COUNT(*) AS ACTIVESRTOTAL FROM SR WHERE STATUS NOT IN ('NEW','CLOSED','RESOLVED')",
					NEWSRTOTAL : "SELECT COUNT(*) AS NEWSRTOTAL FROM SR WHERE STATUS = 'NEW'"
				},
				offlinePage = "offline/pluspsr/main.htm";
			
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.pluspsr"/></h3>
		</div>
		<div class="ui-content">	
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">TICKETID,DESCRIPTION</s:param>
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
				<li>
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
				</li>
				<li class="ui-divider"></li>
				<li>
					<a href="listnew.action">
						<img src="../images/wolist.png" />
						<h3><s:text name="sr.newreqs"/></h3>
						<span class="ui-bubble"><s:property value="newSRRemote.count()"/></span>
						<span class="ui-arrow"></span>
					</a>						
				</li>
				<li>
					<a href="listactive.action">
						<img src="../images/wolist.png" />
						<h3><s:text name="sr.activereqs"/></h3>
						<span class="ui-bubble"><s:property value="activeSRRemote.count()"/></span>
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
