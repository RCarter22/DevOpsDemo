<%--
* Copyright © 2012 InterPro Solutions, LLC
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
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="asset.workdetails"/></h3>
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">
				<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="CLASS"><s:property value="mbo.getMboValueInfoStatic('CLASS').getTitle()"/></option>
							    <option value="RECORDKEY"><s:property value="mbo.getMboValueInfoStatic('RECORDKEY').getTitle()"/></option>
							    <option value="STATUS"><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></option>
							    <option value="REPORTDATE"><s:property value="mbo.getMboValueInfoStatic('REPORTDATE').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>	
				 <ul class="ui-listview">	    
				    	<s:include value="../common/pagination.jsp"/>
						<s:iterator value="mboList">
							<li>
								<s:if test="getString('CLASS').equals('WORKORDER')">
									<a href="../wotrack/view.action?id=<s:property value="getLong('OWNERID')"/>">
										<p class="ui-aside"><s:property value="getString('CLASS')"/></p>					
										<p><strong><s:property value="getString('RECORDKEY')"/></strong></p>
										<h3><s:property value="getString('DESCRIPTION')"/></h3>
										<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>
										<p><s:property value="getMboValueInfoStatic('REPORTDATE').getTitle()"/>: <s:property value="getString('REPORTDATE')"/></p>
										<span class="ui-arrow"></span>
									</a>
								</s:if>
								<s:elseif test="getString('CLASS').equals('ACTIVITY')">
									<a href="../wotrack/viewtask.action?id=<s:property value="getLong('OWNERID')"/>">
										<p class="ui-aside"><s:property value="getString('CLASS')"/></p>					
										<p><strong><s:property value="getString('RECORDKEY')"/></strong></p>
										<h3><s:property value="getString('DESCRIPTION')"/></h3>
										<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>
										<p><s:property value="getMboValueInfoStatic('REPORTDATE').getTitle()"/>: <s:property value="getString('REPORTDATE')"/></p>
										<span class="ui-arrow"></span>
									</a>
								</s:elseif>
								<s:elseif test="getString('CLASS').equals('SR')">
									<a href="../sr/view.action?id=<s:property value="getLong('OWNERID')"/>">
										<p class="ui-aside"><s:property value="getString('CLASS')"/></p>					
										<p><strong><s:property value="getString('RECORDKEY')"/></strong></p>
										<h3><s:property value="getString('DESCRIPTION')"/></h3>
										<p><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/>: <s:property value="getString('STATUS')"/></p>
										<p><s:property value="getMboValueInfoStatic('REPORTDATE').getTitle()"/>: <s:property value="getString('REPORTDATE')"/></p>
										<span class="ui-arrow"></span>
									</a>
								</s:elseif>
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
