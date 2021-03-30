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
			<h3 class="ui-title"><s:text name="global.relatedrecords"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<s:if test="!mbo.getString('WORKORDER.WONUM').equals('')">
				    <li class="ui-field ui-field-auto ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('WORKORDER.WONUM').getTitle()" /></label>
						<p><s:property value="mbo.getString('WORKORDER.WONUM')" /></p>
						<p><s:property value="mbo.getString('WORKORDER.DESCRIPTION')" /></p>
					</li>
				</s:if>
				<li class="ui-field ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('INSPECTIONFORM.NAME').getTitle()" /></label>
					<p style="line-height: 1.5em; margin: .2em 0"><s:property value="mbo.getString('INSPECTIONFORM.NAME')"/></p>
				</li>
				<li class="ui-field ui-field-auto ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('INSPRESULTSTATUS_INSTATUS.STATUS')" /></p>
					<p><s:property value="mbo.getString('INSPRESULTSTATUS_INSTATUS.CHANGEDATE')" /></p>
				</li>

			</ul>
			
			<ul class="ui-listview">
				<s:if test="!mbo.getString('DISPLAYMESSAGE').isEmpty()">
					<li>
						<s:if test="mbo.getString('FUPOBJECT').equalsIgnoreCase('WORKORDER')">
							<a href="followupwo.action">
								<h3><s:property value="mbo.getString('DISPLAYMESSAGE')"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</s:if>
						<s:else>
							<a>
								<h3><s:property value="mbo.getString('DISPLAYMESSAGE')"/></h3>
							</a>
						</s:else>
					</li>
				</s:if>
		    	<s:if test="mboList.size > 0">	
					<s:iterator value="mboList">
						<li>
							<s:if test="getString('FUPOBJECT').equalsIgnoreCase('WORKORDER')">
								<a href="followupwo.action?id=<s:property value='getUniqueIDValue()'/>">
									<p><strong><s:property value="getString('INSPQUESTION.DESCRIPTION')"/></strong></p>		
									<h3 data-visible="<s:property value="!getString('TXTRESPONSE').isEmpty()"/>"><s:property value="getString('TXTRESPONSE')"/></h3>
									<h3 data-visible="<s:property value="!getString('NUMRESPONSE').isEmpty()"/>"><s:property value="getString('NUMRESPONSE')"/></h3>
									<p><s:property value="getString('DISPLAYMESSAGE')"/></p>
									<span class="ui-arrow"></span>
								</a>
							</s:if>
							<s:else>
								<a>
									<p><strong><s:property value="getString('INSPQUESTION.DESCRIPTION')"/></strong></p>		
									<h3 data-visible="<s:property value="!getString('TXTRESPONSE').isEmpty()"/>"><s:property value="getString('TXTRESPONSE')"/></h3>
									<h3 data-visible="<s:property value="!getString('NUMRESPONSE').isEmpty()"/>"><s:property value="getString('NUMRESPONSE')"/></h3>
									<p><s:property value="getString('DISPLAYMESSAGE')"/></p>
								</a>
							</s:else>
						</li>
					</s:iterator>
				</s:if>
			</ul>
		</div>
	</div>		
</body>
</html>
