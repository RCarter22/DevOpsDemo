<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ui-panel">
	<h1 class="ui-title">
		<span style="float:left;text-align:left;width:70%;display:inline-block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;"><s:property value="user.getSession().getUserInfo().getDisplayName()"/></span>
	</h1>
	<a id="btn_main_menu" href="#main_menu" class="ui-btn-toggle"><span class="ui-arrow"></span><s:text name="global.goto"/></a>
</div>
<ul id="main_menu" class="ui-listview ui-panel-content" style="z-index:99999999">
	<li class="ui-divider"><s:text name="global.apps"/></li>
	<li>
		<a href="../main.action">
			<img src="../images/startcenter.png" />					
			<h3><s:text name="ezmaxmobile.startcenter"/></h3>
		</a>
	</li>
	<li id="menuTemplatePlaceholder"></li>
	<s:if test="offlineModeEnabled eq true">
		<li class="ui-divider"><s:text name="global.offlinemode"/></li>
		<li data-native="true">
			<a onclick="emm.offline.sync();">
				<img src="../images/sync.png" />
				<h3><s:text name="global.syncserver"/></h3>
			</a>	
		</li>
		<li data-native="true">
			<a onclick="emm.offline.goOffline()">
				<img src="../images/offline.png" />
				<h3><s:text name="ezmaxmobile.offline"/></h3>
			</a>
		</li>
		<li>
			<a href="../txntrack/main.action">
				<img src="../images/map.png" />
				<h3><s:text name="ezmaxmobile.txntrack"/></h3>
				<span class="ui-badge"><s:property value="getTransactionErrorCount()"/></span>
			</a>	
		</li>
<!-- 		<li data-native="true"> -->
<!-- 			<a onclick="selectBaseMaps()"> -->
<!-- 				<img src="../images/map.png" /> -->
<%-- 				<h3><s:text name="global.downloadbasemaps"/></h3> --%>
<%-- 				<span class="ui-arrow"></span> --%>
<!-- 			</a> -->
<!-- 		</li> -->
	</s:if>
	<li class="ui-divider"><s:text name="global.profile"/></li>
	<li><a href="../profile/main.action"><h3><s:text name="global.defaultinfo"/></h3></a></li>
	<li><a href="../profile/verifyoldpwd.action"><h3><s:text name="global.passwordinfo"/></h3></a></li>
	<li><a onclick="emm.core.logout()"><h3><s:text name="global.logout"/></h3></a></li>
</ul>

<script type="text/javascript">
	var html = '', 
		userApps = [], 
		// List of EZMaxMobile supported apps, title and icon
		supportedApps = [						
						['NOTIFICATION','<s:text name="ezmaxmobile.notification"/>','notification.png'],
		         		['BBOARD','<s:text name="ezmaxmobile.bboard"/>','bulletin.png'],
		         		['DIVIDER'],
		         		['PERSONGR','<s:text name="ezmaxmobile.persongr"/>','usergroup.png'],
		         		['DIVIDER'],
		         		['ASSET','<s:text name="ezmaxmobile.asset"/>','asset.png'],
		         		['PLUSTASSET','<s:text name="ezmaxmobile.plustasset"/>','asset.png'],
		         		['PLUSPASSET','<s:text name="ezmaxmobile.pluspasset"/>','asset.png'],
		         		['LOCATION','<s:text name="ezmaxmobile.locations"/>','location.png'],	
		         		['PLUSTLOC','<s:text name="ezmaxmobile.plustloc"/>','location.png'],   
		         		['PLUSPLOC','<s:text name="ezmaxmobile.plusploc"/>','location.png'],	         		      		
		         		['DIVIDER'],
		         		['ITEM','<s:text name="ezmaxmobile.itemmaster"/>','items.png'],
		         		['PLUSTITM','<s:text name="ezmaxmobile.plustitm"/>','items.png'],
		         		['PLUSPITEM','<s:text name="ezmaxmobile.pluspitem"/>','items.png'],
		         		['INVENTOR','<s:text name="ezmaxmobile.inventor"/>','inventory.png'],
		         		['PLUSTINV','<s:text name="ezmaxmobile.plustinv"/>','inventory.png'],
		         		['PLUSTCOUNT','<s:text name="ezmaxmobile.plustcount"/>','reconcile.png'],
		         		['INVUSAGE','<s:text name="ezmaxmobile.invusage"/>','inventoryusage.png'],
		         		['PLUSTINVUS','<s:text name="ezmaxmobile.plustinvus"/>','inventoryusage.png'],
		         		['INVISSUE','<s:text name="ezmaxmobile.invissue"/>','transfer.png'],		         		
		         		['DIVIDER'],
		         		['PR','<s:text name="ezmaxmobile.pr"/>','pr.png'],
		         		['PO','<s:text name="ezmaxmobile.po"/>','po.png'],
		         		['PLUSTPO','<s:text name="ezmaxmobile.plustpo"/>','po.png'],
		         		['RECEIPTS', '<s:text name="ezmaxmobile.receipts"/>', 'receipts.png'],
		         		['PLUSTREC', '<s:text name="ezmaxmobile.plustrec"/>', 'receipts.png'],
		         		['DIVIDER'],
		         		['WOTRACK','<s:text name="ezmaxmobile.wotrack"/>','wos.png'],
		         		['PLUSTWO','<s:text name="ezmaxmobile.plustwo"/>','wos.png'],
		         		['PLUSPWO','<s:text name="ezmaxmobile.pluspwo"/>','wos.png'],
		         		['SR','<s:text name="ezmaxmobile.sr"/>','sr.png'],
		         		['PLUSPSR','<s:text name="ezmaxmobile.pluspsr"/>','sr.png'],
		         		['LABREP','<s:text name="ezmaxmobile.labrep"/>','labor.png'],   
		         		['PLUSTLRP','<s:text name="ezmaxmobile.plustlrp"/>','labor.png'],        		
		         		['DIVIDER'],
		         		['CREATEDR', '<s:text name="ezmaxmobile.createdr"/>', 'purchase.png'],
		         		['VIEWDR', '<s:text name="ezmaxmobile.viewdr"/>', 'purchase.png'],	
		         		['DIVIDER'],
		         		['CREATESR','<s:text name="ezmaxmobile.createsr"/>','sr.png'],
		         		['VIEWSR','<s:text name="ezmaxmobile.viewsr"/>','sr.png'],	         		
// 		         		['DIVIDER'], // uncomment when esri enabled
		         		['ESRI','<s:text name="ezmaxmobile.esri"/>','map.png'],
			         	];
	
	<s:iterator value="user.getSession().getProfile().getApps()">userApps.push('<s:property/>');</s:iterator>

	if ($.parseJSON(<s:property value="pushEnabled"/>) == true)
		userApps.push('NOTIFICATION');	
	// HTML ESRI Support
	if ($.parseJSON(<s:property value="esriEnabled"/>) == true)
		userApps.push('ESRI');
	
	html = emm.core.generateMenuHtml(userApps);
	
	$('#menuTemplatePlaceholder').replaceWith(html);
	
	// Select basemaps
	var selectBaseMaps = function(){
		var basemaps = [];
		/* Example - the .ezm file should exist in this directory */
		//basemaps.push({title:'Las Vegas', url:'offline/basemaps/lasvegas.ezm'}); // Relative path
		emm.maps.selectBaseMaps(basemaps);		
	}
</script>