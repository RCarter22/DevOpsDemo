﻿<%--
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
			<a href="../viewsr/main.action">
				<img src="../images/sr.png" />
				<h3><s:text name="ezmaxmobile.viewsr"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li>
			<a href="../createsr/main.action">
				<img src="../images/addnew.png" />
				<h3><s:text name="ezmaxmobile.createsr"/></h3>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li class="ui-divider ui-divider-b"></li>
		<li>
			<a href="doclinks.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/attachment.png" />
				<h3><s:text name="global.attachments"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('DOCLINKS').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>		
		<li>
			<a href="../worklog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/notes.png" />
				<h3><s:text name="ezmaxmobile.worklog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('MODIFYWORKLOG').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>
		<li data-visible="<s:property value="mbo.sigopGranted('CREATECOMM')"/>">
			<a href="../commlog/main.action?id=<s:property value='mbo.getUniqueIDValue()'/>">
				<img src="../images/email.png" />
				<h3><s:text name="ezmaxmobile.commlog"/></h3>
				<span class="ui-bubble"><s:property value="mbo.getMboSet('COMMLOG').count()"/></span>
				<span class="ui-arrow"></span>
			</a>
		</li>	
	</ul>
</div>	
