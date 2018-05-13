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
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.assignments"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content ui-content-narrow">
			<s:if test="mboList.isEmpty() eq false">			
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList" status="row">
						<li data-markdeleted="<s:property value="toBeDeleted()"/>">
							<a href="viewassignment.action?id=<s:property value="id"/>&row=<s:property value="#row.index"/>">
								<p><strong><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></strong></p>
								<h3><s:property value="getString('WORKORDER.DESCRIPTION')"/> - <s:property value="getString('WORKORDER.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('CRAFT').getTitle()"/>: <s:property value="getString('CRAFT')"/></p>
								<p><s:property value="getMboValueInfoStatic('SKILLLEVEL').getTitle()"/>: <s:property value="getString('SKILLLEVEL')"/></p>
								<p><s:property value="getMboValueInfoStatic('LABORCODE').getTitle()"/>: <s:property value="getString('LABORCODE')"/></p>
								<p><s:property value="getMboValueInfoStatic('SCHEDULEDATE').getTitle()"/>: <s:property value="getString('SCHEDULEDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('LABORHRS').getTitle()"/>: <s:property value="getString('LABORHRS')"/></p>
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
		</div>
		<div id="ACTIONS" class="ui-sidebar">
			<p class="ui-section"><s:text name="global.actions"/></p>
			<ul class="ui-listview ui-inset">
				<li data-visible="">
					<a href="addassignment.action">
						<img src="../images/addnew.png" />
						<h3><s:text name="global.newrow"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>	
			</ul>
		</div>		
	</div>
</body>
