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
			<h3 class="ui-title"><s:text name="plustcount.cblines"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('cblinessave.action?currentPage=<s:property value='pagination.getCurrentPageNum()'/>')"><s:text name="global.save"/></a>		
		</div>
		<ul class="ui-navbar">
			<li>
				<a href="view.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
					<s:text name="plustcount.cb"/>
				</a>
			<li>
				<a class="ui-active">
					<s:text name="plustcount.cblines"/>
				</a>				
		</ul>		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('COUNTBOOKNUM').getTitle()" /></label>
					<input type="text"
							id="COUNTBOOKNUM" 
							required="<s:property value="mbo.getMboValueData('COUNTBOOKNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('COUNTBOOKNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('COUNTBOOKNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label>Detail</label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STOREROOM').getTitle()" /></label>
					<input type="text" id="STOREROOM" readonly value="<s:property value="mbo.getString('STOREROOM')"/>"/>
					<p><s:property value="mbo.getString('LOCATIONS.DESCRIPTION')"/></p>
				</li>
				<li class="ui-field ui-field-auto ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('STATUS')" /></p>
					<p><s:property value="mbo.getString('STATUSDATE')" /></p>
				</li>																			
			</ul>
			<div class="ui-section"><s:text name="plustcount.cblines"/></div>
			<s:if test="mboList.isEmpty() eq false">
				<s:if test="pagination.total > 1">					
					<ul class="ui-listview">
						<li class="ui-field ui-sort">
							<label><s:text name="global.sortby"/></label>
							<select name="pagination.sortBy" onchange="emm.core.changeSortBy()" data-value="<s:property value="pagination.sortBy"/>">
							    <option value=""><s:text name="global.selectvalue"/></option>
							    <option value="PLUSTCBLINES.BINNUM"><s:text name="BIN"/></option>
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
						<li style="background-color: #f1f1f1;">
							<a>
								<div class="ui-row-4">								
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/></strong>: <s:property value="getString('BINNUM')"/>		
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('LOTNUM').getTitle()"/></strong>: <s:property value="getString('LOTNUM')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()"/></strong>: <s:property value="getString('ITEMNUM')"/> - <s:property value="getString('PLUSTCBLINE_ITEM.DESCRIPTION')"/>
									</div>					
								</div>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ROTATING').getTitle()"/>?</strong>: <s:property value="getString('ROTATING')"/>		
									</div>								
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/>		
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('TOOL').getTitle()"/>?</strong>: <s:property value="getString('TOOL')"/>
									</div>
								
								</div>								
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('MATCH').getTitle()"/>?</strong>: <s:property value="getString('MATCH')"/>		
									</div>								
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ACCURACY').getTitle()"/></strong>: <s:property value="getString('ACCURACY')"/>		
									</div>	
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('CURBAL').getTitle()"/></strong>: <s:property value="getString('CURBAL')"/>		
									</div>																
								</div>																							
							</a>
						</li>
						
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('RECON').getTitle()" />?</label>
							<input type="checkbox" onclick="emm.core.setListValue(this)" readonly="<s:property value="getMboValueData('RECON').isReadOnly()"/>" value="<s:property value="getString('RECON')"/>" id="<s:property value='getUniqueIDValue()'/>_RECON" data-mbo="PLUSTCBLINESMBOSET" data-field="RECON" class="ui-checklistbutton" data-checked="<s:property value='getString("RECON").equals("Y")'/>"></a>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('PHYSCNT').getTitle()" /></label>
							<input type="tel"
								id="<s:property value='getUniqueIDValue()'/>_PHYSCNT" 
								required="<s:property value="getMboValueData('PHYSCNT').isRequired()"/>"
								readonly="<s:property value="getMboValueData('PHYSCNT').isReadOnly()"/>"
								value="<s:property value="getString('PHYSCNT')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="PLUSTCBLINESMBOSET"
								data-field="PHYSCNT"
								data-control="spinner" data-interval="1.00" data-min="0"
							/>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('PHYSCNTBY').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_PHYSCNTBY" 
								required="<s:property value="getMboValueData('PHYSCNTBY').isRequired()"/>"
								readonly="<s:property value="getMboValueData('PHYSCNTBY').isReadOnly()"/>"
								value="<s:property value="getString('PHYSCNTBY')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="PLUSTCBLINESMBOSET"
								data-field="PHYSCNTBY"
							/>
						</li>	
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('PHYSCNTDATE').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_PHYSCNTDATE"
								required="<s:property value="getMboValueData('PHYSCNTDATE').isRequired()"/>"
								readonly="<s:property value="getMboValueData('PHYSCNTDATE').isReadOnly()"/>"
								value="<s:property value="getString('PHYSCNTDATE')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="PLUSTCBLINESMBOSET"
								data-field="PHYSCNTDATE"
							/>
							<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="<s:property value='getUniqueIDValue()'/>_PHYSCNTDATE"></a>
						</li>												
						<li class="ui-divider ui-divider-c"></li>						
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>
			</s:if>
		</div>
	</div>
</body>
