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
			<h3 class="ui-title"><s:text name="ezmaxmobile.po"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<ul class="ui-navbar">
			<li>
				<a href="view.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
					<s:text name="ezmaxmobile.po"/>
				</a>
			<li>
				<a class="ui-active">
					<s:text name="po.polines"/>
				</a>				
		</ul>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PONUM').getTitle()" /></label>
					<input type="text"
							id="PONUM" 
							required="<s:property value="mbo.getMboValueData('PONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
							id="SITEID" 
							required="<s:property value="mbo.getMboValueData('SITEID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SITEID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SITEID')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							required="<s:property value="mbo.getMboValueData('STATUS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STATUS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STATUS')"/>"
					/>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOTALCOST').getTitle()" /></label>
					<input type="text"
							id="TOTALCOST" 
							required="<s:property value="mbo.getMboValueData('TOTALCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOTALCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOTALCOST')"/>"
					/>
				</li>				
			</ul>
			<div class="ui-section"><s:text name="po.polines"/></div>
			<s:if test="mboList.isEmpty() eq false">			
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="viewline.action?id=<s:property value="getUniqueIDValue()"/>" data-markdeleted="<s:property value="toBeDeleted()"/>">
								<p><s:property value="getMboValueInfoStatic('POLINENUM').getTitle()"/>: <s:property value="getString('POLINENUM')"/></p>
								<h3><s:property value="getString('ITEMNUM')"/> - <s:property value="getString('DESCRIPTION')"/></h3>
								<table>
									<tbody>
										<tr><td width="90px"><strong><s:property value="getMboValueInfoStatic('ORDERQTY').getTitle()"/></strong></td><td><s:property value="getString('ORDERQTY')"/></td></tr>
										<tr><td><strong><s:property value="getMboValueInfoStatic('UNITCOST').getTitle()"/></strong></td><td><s:property value="getString('UNITCOST')"/></td></tr>
										<tr><td><strong><s:property value="getMboValueInfoStatic('LINECOST').getTitle()"/></strong></td><td><s:property value="getString('LINECOST')"/></td></tr>
									</tbody>
								</table>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<div class="ui-btn-container">
				<a class="ui-btn-a" href="addline.action"><s:text name="global.newrow"/></a>
			</div>
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>
			</s:if>
		</div>
	</div>
</body>
