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
				offlinePage = "offline/inventor/main.htm";
			
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.inventor"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="ITEMNUM,ITEM.DESCRIPTION,BINNUM"><span class="emm-barcode-3"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">ITEMNUM,ITEM.DESCRIPTION,BINNUM</s:param>
			</s:include>
			<ul class="ui-listview">
				<li>
					<a href="list.action">
						<span class="emm-inventory"></span>
						<h3><s:text name="inventor.allitems"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
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
			</ul>
			
			<s:if test="mboList.size > 0">
			    <ul class="ui-listview">
			    	<li class="ui-divider"><s:text name="inventor.defaultsitestorerooms"/> <s:property value="user.getSiteId()"/></li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>	
							<a onclick="emm.util.confirm({title:'<s:text name='inventor.iscyclecount'/>',message:'<s:text name='inventor.performcount'><s:param><s:property value='getString("LOCATION")'/></s:param></s:text> ',yes: function(){window.location='cyclecountlist.action?storeroom=<s:property value='getString("LOCATION")'/>';},no: function(){window.location='list.action?storeroom=<s:property value='getString("LOCATION")'/>';},yesText :'<s:text name='global.yes'/>',noCssClass: 'ui-btn-a',noText:'<s:text name='global.no'/>'});">
								<p><s:property value="getString('LOCATION')"/></p>								
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>

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
