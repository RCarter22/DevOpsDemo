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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.inspection"/></h3>
		</div>
		
		<ul class="ui-navbar" id="inspectionbar">			
			<li><a href="listpendinginsp.action"><s:text name="inspection.pending"/></a>
			<li><a href="listinproginsp.action" class="ui-active"><s:text name="inspection.inprogress"/></a>
			<li><a href="listcompleteinsp.action"><s:text name="inspection.completed"/></a>			
		</ul>	
		
		<div class="ui-content" id="inspectionresultlist">	
			<ul class="ui-listview">	
				<s:if test="mboList.size > 0">						
					<s:include value="../common/pagination.jsp"/>
				
					<s:iterator value="mboList" status="status">
						<li id="<s:property value="getUniqueIDValue()"/>">
							<a href="../inspector/inspresultlist.action?id=<s:property value="getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('STATUS')"/></p>
								<p><strong><s:property value="getString('RESULTNUM')"/></strong></p>								
								<h3><s:property value="getString('INSPECTIONFORM.NAME')"/></h3>
								<p><s:property value="getMboValueInfoStatic('CREATEDATE').getTitle()"/>: <s:property value="getString('CREATEDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('DUEDATE').getTitle()"/>: <s:property value="getString('DUEDATE')"/></p>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
	
					<s:include value="../common/pagination.jsp"/>
				</s:if>
				<s:else>
					<div class="ui-statusbar ui-statusbar-c">	
						<h3 class="ui-title"><s:text name="global.norecords"/></h3>
					</div>
				</s:else>
			</ul>
		</div>
		
		<div id="ACTIONS" class="ui-sidebar">
			<p class="ui-section"><s:text name="global.actions"/></p>
			<ul class="ui-listview ui-inset">
				<li data-visible="">
					<a href="../inspector/scheduleinsp.action?refobject=asset&assetnum=<s:property value="mbo.getString('ASSETNUM')"/>">
						<span class="emm-add"></span>
						<h3><s:text name="inspection.unscheduledinspection"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
		</div>		
	</div>		
</body>
</html>
