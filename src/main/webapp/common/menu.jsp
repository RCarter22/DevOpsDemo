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
	<a id="btn_main_menu" href="#main_menu" class="ui-btn-toggle ui-hamburger">
		  <span></span>
		  <span></span>
		  <span></span>
		  <span></span>		
	</a>
</div>
<ul id="main_menu" class="ui-listview ui-panel-content" style="z-index:99999999">
	<li class="ui-divider"><s:text name="global.apps"/></li>
	<li>
		<a href="../main.action">
			<span class="emm-startcenter"></span>					
			<h3><s:text name="ezmaxmobile.startcenter"/></h3>
		</a>
	</li>
	<li id="menuTemplatePlaceholder"></li>
	<s:if test="offlineModeEnabled eq true">
		<li class="ui-divider"><s:text name="global.offlinemode"/></li>
		<li data-native="true">
			<a onclick="emm.offline.sync();">
				<span class="emm-sync"></span>
				<h3><s:text name="global.syncserver"/></h3>
			</a>	
		</li>
		<li data-native="true">
			<a onclick="emm.offline.goOffline()">
				<span class="emm-offline"></span>
				<h3><s:text name="ezmaxmobile.offline"/></h3>
			</a>
		</li>
		<li>
			<a href="../txntrack/main.action">
				<span class="emm-stack-records"></span>
				<h3><s:text name="ezmaxmobile.txntrack"/></h3>
				<span class="ui-badge"><s:property value="getTransactionErrorCount()"/></span>
			</a>	
		</li>
	</s:if>
	<s:if test="user.isEmmAdmin()">
		<li class="ui-divider"><s:text name="global.administration"/></li>
		<li><a href="../admin/main.action"><h3><s:text name="ezmaxmobile.admin"/></h3></a></li>
	</s:if>
	<li class="ui-divider"><s:text name="global.profile"/></li>
	<li><a href="../profile/main.action"><h3><s:text name="global.defaultinfo"/></h3></a></li>
	<li><a href="../profile/verifyoldpwd.action"><h3><s:text name="global.passwordinfo"/></h3></a></li>
	<li><a onclick="emm.core.logout()"><h3><s:text name="global.logout"/></h3></a></li>
	<li class="ui-divider"><s:text name="global.systeminfo"/></li>
	<li><span><p><s:property value="getSystemInfo()" escapeHtml="false"/></p></span></li>
</ul>

<script type="text/javascript">
	var html = '', 
		userApps = [], 
		// List of EZMaxMobile supported apps, title and icon
	 	supportedApps = [						
						['NOTIFICATION','<s:text name="ezmaxmobile.notification"/>','emm-notification'],
		         		['BBOARD','<s:text name="ezmaxmobile.bboard"/>','emm-bulletin'],
		         		['DIVIDER'],
		         		['PERSONGR','<s:text name="ezmaxmobile.persongr"/>','emm-user-group'],
		         		['DIVIDER'],
		         		['ASSET','<s:text name="ezmaxmobile.asset"/>','emm-asset'],
		         		['LOCATION','<s:text name="ezmaxmobile.locations"/>','emm-location'],	         		
		         		['DIVIDER'],
		         		['ITEM','<s:text name="ezmaxmobile.itemmaster"/>','emm-items'],
		         		['INVENTOR','<s:text name="ezmaxmobile.inventor"/>','emm-inventory'],
		         		['INVUSAGE','<s:text name="ezmaxmobile.invusage"/>','emm-inventory-usage'],
		         		['INVISSUE','<s:text name="ezmaxmobile.invissue"/>','emm-transfer'],		         		
		         		['DIVIDER'],
		         		['PR','<s:text name="ezmaxmobile.pr"/>','emm-reserved'],
		         		['PO','<s:text name="ezmaxmobile.po"/>','emm-purchase'],
		         		['RECEIPTS', '<s:text name="ezmaxmobile.receipts"/>', 'emm-receipts'],
		         		['DIVIDER'],
		         		['INSPECTOR', '<s:text name="ezmaxmobile.inspection"/>', 'emm-inspect-1'],
		         		['DIVIDER'],
		         		['WOTRACK','<s:text name="ezmaxmobile.wotrack"/>','emm-workorder'],
		         		['SR','<s:text name="ezmaxmobile.sr"/>','emm-service-request'],
		         		['LABREP','<s:text name="ezmaxmobile.labrep"/>','emm-labor'],        		
		         		['DIVIDER'],
		         		['CREATEDR', '<s:text name="ezmaxmobile.createdr"/>', 'emm-reserved'],
		         		['VIEWDR', '<s:text name="ezmaxmobile.viewdr"/>', 'emm-reserved'],	
		         		['DIVIDER'],
		         		['CREATESR','<s:text name="ezmaxmobile.createsr"/>','emm-service-request'],
		         		['VIEWSR','<s:text name="ezmaxmobile.viewsr"/>','emm-service-request'],	         		
			         	];
			         	
	//  The Supported Apps are now located in the Java class files: java.com.interprosoft.ezmaxmobile.startcenter.model.SupportedApps
 	//  supportedApps = JSON.parse(emm.getDefaults().userInfo).supportedApps;
			         	
	<s:iterator value="user.getSession().getProfile().getApps()">userApps.push('<s:property/>');</s:iterator>

	if (JSON.parse(<s:property value="pushEnabled"/>) == true)
		userApps.push('NOTIFICATION');	
	
	html = emm.core.generateMenuHtml(userApps);
	
	$('#menuTemplatePlaceholder').replaceWith(html);
</script>