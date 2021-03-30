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
			<h3 class="ui-title"><s:text name="ezmaxmobile.inventor"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezscan(this)" data-search="ITEMNUM,ITEM.DESCRIPTION,BINNUM"><span class="emm-barcode-3"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">ITEMNUM,ITEM.DESCRIPTION,BINNUM</s:param>
			</s:include>
			<s:if test="mboList.size > 0">
			<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="ITEMNUM"><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()"/></option>
							    <option value="BINNUM"><s:property value="mbo.getMboValueInfoStatic('BINNUM').getTitle()"/></option>
							     <option value="LOCATION"><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()"/></option>
							</select>
							<a class="ui-btn-sort" onclick="emm.core.changeSortOrder()">
								<span data-sortorder="<s:property value="pagination.sortOrder"/>"></span>
							</a>
						</li>
					</ul>
				</s:if>	
			    <ul id="INVLIST" class="ui-listview">
					<li data-visible="<s:property value="mboList.get(0).sigopGranted('PHYSCNTADJ')"/>">
						<a href="physicalcount.action?itemnum=<s:property value='itemnum'/>&storeroom=<s:property value='storeroom'/>">
							<span class="emm-balance"></span>
							<h3>
								<s:text name="invbalances.adjphyscount"/>
							</h3>
							<span class="ui-arrow"></span>
						</a>
					</li>
					<li class="ui-divider"><s:text name="ezmaxmobile.inventor"/></li>
			    	<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
								<p><strong><s:property value="getString('ITEMNUM')"/> (<s:property value="getString('STATUS')"/>)</strong></p>								
								<h3><s:property value="getString('ITEM.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('CURBALTOTAL').getTitle()"/>: <s:property value="getString('CURBALTOTAL')"/></p>
								<p><s:property value="getMboValueInfoStatic('PHYSCNTTOTAL').getTitle()"/>: <s:property value="getString('PHYSCNTTOTAL')"/></p>
								<p><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/>: <s:property value="getString('BINNUM')"/></p>
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('MANUFACTURER').getTitle()"/>: <s:property value="getString('MANUFACTURER')"/></p>
								<p><s:property value="getMboValueInfoStatic('INVVENDOR.MODELNUM').getTitle()"/>: <s:property value="getString('INVVENDOR.MODELNUM')"/></p>
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
