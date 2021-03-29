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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.persongr"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<div class="ui-searchbar">
				<s:form id="quicksearch" action="doquicksearch" method="post">
				    <input type="hidden" name="searchFlds" value="PERSONGROUP,DESCRIPTION"/>	
					<input type="search" placeholder="<s:text name="global.quicksearch"/>" name="search" maxlength="100" value="<s:property value="search"/>" />		
				</s:form>	
			</div>	
			<s:if test="mboList.size > 0">		
				<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="PERSONGROUP"><s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()"/></option>
							    <option value="DESCRIPTION"><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>					
				<ul class="ui-listview">		
					<li class="ui-divider"><s:text name="global.list"/></li>				
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>">					
								<p><strong><s:property value="getString('PERSONGROUP')"/></strong></p>
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
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
	</div>
</body>
</html>
