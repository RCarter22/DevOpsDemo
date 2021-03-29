<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="ACTIONS" class="ui-sidebar">
	<p class="ui-section"><s:text name="global.actions"/></p>
	<ul class="ui-listview ui-inset">
		<li>
			<a onclick="emm.core.changeDefInsertSite()">
				<span class="emm-status"></span>
				<h3><s:text name="global.changedefinsertsite"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>	
		<li data-native="true">
            <a onclick ="emm.nativeapp.loadSettingsPage()">
				<span class="emm-cogs"></span>
                 <h3><s:text name="global.ezmaxmobilesettings"/></h3>
                <span class="ui-arrow"></span>
            </a>
        </li>
	</ul>
</div>	
