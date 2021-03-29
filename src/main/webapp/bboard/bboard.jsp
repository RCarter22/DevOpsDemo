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
			<h3 class="ui-title"><s:text name="ezmaxmobile.bboard"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:if test="mboList.isEmpty() eq false">
			    <ul class="ui-listview">
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<span>
								<p><strong><s:property value="getString('SUBJECT')"/></strong></p>								
								<h4 style="padding:0;margin:5px 0;"><s:property value="getString('MESSAGE')" escapeHtml="false"/></h4>
								<p><s:property value="getMboValueInfoStatic('POSTDATE').getTitle()"/>: <s:property value="getString('POSTDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('EXPIREDATE').getTitle()"/>: <s:property value="getString('EXPIREDATE')"/></p>
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
