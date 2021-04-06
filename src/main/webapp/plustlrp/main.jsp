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
					LABORINFO : "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT, LABORCRAFTRATE.SKILLLEVEL,LABORCRAFTRATE.GLACCOUNT,LABORCRAFTRATE.RATE " +
		    		"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
		    		"WHERE LABOR.PERSONID = '" + '<s:property value="user.getPersonId()"/>' + "' AND LABOR.ORGID =  '" + '<s:property value="user.getOrgId()"/>' + "'"
				},
				offlinePage = "offline/plustlrp/main.htm";
			
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
			<h3 class="ui-title"><s:text name="Labor Reporting (TR)"/></h3>
			<s:include value="../common/statusbar.jsp"/>	
		</div>
		<div class="ui-content">	
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">LABORCODE,REFWO</s:param>
			</s:include>	
			<ul class="ui-listview">
				<li data-visible="<s:property value="mbo.sigopGranted('BYLABOR')"/>">
					<a href="addenterbylabor.action">
						<img src="../images/addnew.png" />
						<h3><s:text name="labrep.enterbylabor"/></h3>
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
				<ul class="ui-listview">
					<li class="ui-divider"><s:text name="global.offlinemode"/></li>
					<li data-native="true">
						<a onclick="EMMServer.Offline.sync();">
							<img src="../images/sync.png" />
							<h3><s:text name="global.syncserver"/></h3>
							<span class="ui-arrow"></span>
						</a>	
					</li>
					<li data-native="true">
						<a onclick="goOffline()">
							<img src="../images/offline.png" />
							<h3><s:text name="ezmaxmobile.offline"/></h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
					<li>
						<a href="../txntrack/main.action">
							<img src="../images/map.png" />
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
