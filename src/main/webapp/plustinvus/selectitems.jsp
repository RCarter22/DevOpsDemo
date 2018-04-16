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
	<div class="ui-page">
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.cancel"/></a>
			<h3 class="ui-title">
				<s:if test="relationship eq 'INVBALANCESOUT'">
					<s:text name="invusage.selectitems"/>				
				</s:if>
				<s:elseif test="relationship eq 'MATUSETRANSRETURN'" >
					<s:text name="invusage.returnitems"/>
				</s:elseif>
				<s:elseif test="relationship eq 'INVRESERVE'" >
					<s:text name="invusage.reserveditems"/>
				</s:elseif>	
				<s:elseif test="relationship eq 'INVUSESPAREPART'" >
					<s:text name="invusage.spareparts"/>
				</s:elseif>								
			</h3>
			<a class="ui-btn-right" href="saveselecteditems.action?id=<s:property value="mbo.getOwner().getUniqueIDValue()"/>&relationship=<s:property value="relationship"/>"><s:text name="global.ok"/></a>	
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVUSENUM').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('INVUSENUM')"/>"/>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMSTORELOC').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('FROMSTORELOC')"/>"/>
				</li>				
			</ul>
			<ul class="ui-listview">		
				<li class="ui-divider"><s:text name="invusage.items"/></li>
				<s:if test="mboList.size > 0">
					<div class="ui-statusbar ui-statusbar-c">
						<h3 class="ui-title"><s:text name="invusage.selecthelp"/></h3>
					</div>			
				</s:if>						
				<s:if test="mboList.size > 0">
					<s:include value="../common/pagination.jsp"/>							
					<s:if test="relationship eq 'INVBALANCESOUT'">
						<s:iterator value="mboList">
							<li>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>">
									<p><strong><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()"/>: <s:property value="getString('ITEMNUM')"/></strong></p>								
									<h3><s:property value="getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()"/>: <s:property value="getString('ITEM.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/>: <s:property value="getString('BINNUM')"/></p>
									<p><s:property value="getMboValueInfoStatic('CURBAL').getTitle()"/>: <s:property value="getString('CURBAL')"/></p>											
								</a>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>" class="ui-checklistbutton" data-checked="<s:property value="isSelected()"/>"></a>
							</li>
						</s:iterator>
					</s:if>
					<s:elseif test="relationship eq 'MATUSETRANSRETURN'" >
						<s:iterator value="mboList">
							<li>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>">
									<p><strong><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()"/>: <s:property value="getString('ITEMNUM')"/></strong></p>								
									<h3><s:property value="getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()"/>: <s:property value="getString('ITEM.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/>: <s:property value="getString('QUANTITY')"/></p>
									<p><s:property value="getMboValueInfoStatic('ISSUETO').getTitle()"/>: <s:property value="getString('ISSUETO')"/></p>
									<p><s:property value="getMboValueInfoStatic('REFWO').getTitle()"/>: <s:property value="getString('REFWO')"/></p>											
								</a>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>" class="ui-checklistbutton" data-checked="<s:property value="isSelected()"/>"></a>
							</li>
						</s:iterator>
					</s:elseif>
					<s:elseif test="relationship eq 'INVRESERVE'" >
						<s:iterator value="mboList">
							<li>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>">
									<p><strong><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()"/>: <s:property value="getString('ITEMNUM')"/></strong></p>								
									<h3><s:property value="getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()"/>: <s:property value="getString('ITEM.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('RESERVEDQTY').getTitle()"/>: <s:property value="getString('RESERVEDQTY')"/></p>
									<p><s:property value="getMboValueInfoStatic('ACTUALQTY').getTitle()"/>: <s:property value="getString('ACTUALQTY')"/></p>
									<p><s:property value="getMboValueInfoStatic('WORKORDER.WOGROUP').getTitle()"/>: <s:property value="getString('WORKORDER.WOGROUP')"/></p>											
								</a>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>" class="ui-checklistbutton" data-checked="<s:property value="isSelected()"/>"></a>
							</li>
						</s:iterator>					
					</s:elseif>		
					<s:elseif test="relationship eq 'INVUSESPAREPART'" >
						<s:iterator value="mboList">
							<li>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>">
									<p><strong><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()"/>: <s:property value="getString('ITEMNUM')"/></strong></p>								
									<h3><s:property value="getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()"/>: <s:property value="getString('ITEM.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/>: <s:property value="getString('QUANTITY')"/></p>
									<p><s:property value="getMboValueInfoStatic('DESCRIPTION').getTitle()"/>: <s:property value="getString('DESCRIPTION')"/></p>										
								</a>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<s:property value="relationship"/>" class="ui-checklistbutton" data-checked="<s:property value="isSelected()"/>"></a>
							</li>
						</s:iterator>					
					</s:elseif>			
					<s:include value="../common/pagination.jsp"/>
				</s:if>
				<s:else>
					<div class="ui-statusbar ui-statusbar-c">	
						<h3 class="ui-title"><s:text name="global.norecords"/></h3>
					</div>
				</s:else>					
			</ul>
		</div>
	</div>		
</body>
</html>
