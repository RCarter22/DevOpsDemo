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
			<h3 class="ui-title"><s:text name="ezmaxmobile.receipts"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<ul class="ui-navbar">
			<li>
				<a class="ui-active">
					<s:text name="receipts.materialreceipts"/>
				</a>
			<li>
				<a href="servicereceipts.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
					<s:text name="receipts.servicereceipts"/>
				</a>				
		</ul>		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-divider"><s:text name="receipts.materialreceipts"/></li>					
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
					<label><s:property value="mbo.getMboValueInfoStatic('RECEIPTS').getTitle()" /></label>
					<input type="text"
							id="RECEIPTS" 
							required="<s:property value="mbo.getMboValueData('RECEIPTS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RECEIPTS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RECEIPTS')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.dates"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUSDATE').getTitle()" /></label>
					<input type="text"
							id="STATUSDATE" 
							required="<s:property value="mbo.getMboValueData('STATUSDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STATUSDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STATUSDATE')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ORDERDATE').getTitle()" /></label>
					<input type="text"
							id="ORDERDATE" 
							required="<s:property value="mbo.getMboValueData('ORDERDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ORDERDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ORDERDATE')"/>"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.costs"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PRETAXTOTAL').getTitle()" /></label>
					<input type="text"
							id="PRETAXTOTAL" 
							required="<s:property value="mbo.getMboValueData('PRETAXTOTAL').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PRETAXTOTAL').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PRETAXTOTAL')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('RECEIVEDTOTALCOST').getTitle()" /></label>
					<input type="text"
							id="RECEIVEDTOTALCOST" 
							required="<s:property value="mbo.getMboValueData('RECEIVEDTOTALCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RECEIVEDTOTALCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RECEIVEDTOTALCOST')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.vendor"/></li>		
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" /></label>
					<input type="text"
							id="VENDOR" 
							required="<s:property value="mbo.getMboValueData('VENDOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('VENDOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('VENDOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SHIPTOATTN').getTitle()" /></label>
					<input type="text"
							id="SHIPTOATTN" 
							required="<s:property value="mbo.getMboValueData('SHIPTOATTN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SHIPTOATTN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SHIPTOATTN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SHIPTOATTN" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>			
			</ul>
			<s:if test="mboList.isEmpty() eq false">
				<div class="ui-section"><s:text name="receipts.materialreceipts"/></div>			
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<span>
								<p><s:property value="getMboValueInfoStatic('POLINENUM').getTitle()"/>: <s:property value="getString('POLINENUM')"/></p>
								<h3 class="ui-wrap"><s:property value="getString('ITEMNUM')"/> - <s:property value="getString('DESCRIPTION')"/></h3>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('RECEIPTQUANTITY').getTitle()"/></strong>: <s:property value="getString('RECEIPTQUANTITY')"/>		
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('RECEIVEDUNIT').getTitle()"/></strong>: <s:property value="getString('RECEIVEDUNIT')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ISSUETYPE').getTitle()"/></strong>: <s:property value="getString('ISSUETYPE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/></strong>: <s:property value="getString('STATUS')"/>		
									</div>
								</div>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('ACTUALDATE').getTitle()"/></strong>: <s:property value="getString('ACTUALDATE')"/>		
									</div>
									<div class="ui-column">
										
									</div>
									<div class="ui-column">
										
									</div>
									<div class="ui-column">
												
									</div>
								</div>
							</span>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>
			</s:if>			
		</div>			
	</div>
</body>
