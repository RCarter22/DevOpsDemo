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
			<h3 class="ui-title"><s:text name="asset.spareparts"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:if test="mboList.size > 0">
				<ul class="ui-listview">							
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li data-markdeleted="<s:property value="toBeDeleted()"/>">
							<a href="viewsparepart.action?id=<s:property value="getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
								<p><strong><s:property value="getString('ITEMNUM')"/></strong></p>								
								<h3><s:property value="getString('ITEM.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/>: <s:property value="getString('QUANTITY')"/></p>
								<p><s:property value="getMboValueInfoStatic('ISSUEDQTY').getTitle()"/>: <s:property value="getString('ISSUEDQTY')"/></p>
								<p><s:property value="getMboValueInfoStatic('DESCRIPTION').getTitle()"/>: <s:property value="getString('DESCRIPTION')"/></p>
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
					<a href="addsparepart.action">
						<span class="emm-add"></span>
						<h3><s:text name="global.newrow"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>	
				<li data-visible="">
					<a href="selectspareparts.action">
						<span class="emm-add"></span>
						<h3><s:text name="global.selectspareparts"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
		</div>		
	</div>		
</body>
</html>
