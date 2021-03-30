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
</head>
<body>
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="asset.movehistory"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="ASSETNUM,DESCRIPTION"><span class="emm-barcode-3"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">		
			    <ul class="ui-listview">
			    	<li class="ui-divider"><s:text name="global.list"/></li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<span>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('TRANSTYPE').getTitle()"/></strong>: <s:property value="getString('TRANSTYPE')"/>		
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('SITEID').getTitle()"/></strong>: <s:property value="getString('SITEID')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('FROMPARENT').getTitle()"/></strong>: <s:property value="getString('FROMPARENT')"/>
										
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('FROMLOC').getTitle()"/></strong>: <s:property value="getString('FROMLOC')"/>
										
									</div>
								</div>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('DATEMOVED').getTitle()"/></strong>: <s:property value="getString('DATEMOVED')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('TOSITEID').getTitle()"/></strong>: <s:property value="getString('TOSITEID')"/>		
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('TOPARENT').getTitle()"/></strong>: <s:property value="getString('TOPARENT')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('TOLOC').getTitle()"/></strong>: <s:property value="getString('TOLOC')"/>		
									</div>
								</div>
							</span>
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
		</div>
	</div>
</body>
</html>
