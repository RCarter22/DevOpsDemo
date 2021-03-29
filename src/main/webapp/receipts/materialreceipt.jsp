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
			<h3 class="ui-title"><s:text name="receipts.materialreceipt"/></h3>
			<a class="ui-btn-right" onclick="emm.core.back()"><span class="emm-check"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('POLINENUM').getTitle()" /></label>
					<input type="text"
							id="POLINENUM" 
							required="<s:property value="mbo.getMboValueData('POLINENUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('POLINENUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('POLINENUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LINETYPE').getTitle()" /></label>
					<input type="text"
							id="LINETYPE" 
							required="<s:property value="mbo.getMboValueData('LINETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LINETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LINETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMNUM" data-source="ITEMNUM" data-display="ITEMNUM,DESCRIPTION" data-search="ITEMNUM,DESCRIPTION"></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('TOSTORELOC').getTitle()" /></label>
					<input type="text"
							id="TOSTORELOC" 
							required="<s:property value="mbo.getMboValueData('TOSTORELOC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOSTORELOC').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOSTORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOSTORELOC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOBIN').getTitle()" /></label>
					<input type="text"
							id="TOBIN" 
							required="<s:property value="mbo.getMboValueData('TOBIN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOBIN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOBIN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOBIN"></a>
				</li>									
				<li class="ui-divider"><s:text name="global.qtyandcost"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('RECEIPTQUANTITY').getTitle()" /></label>
					<input type="text"
							id="RECEIPTQUANTITY" 
							required="<s:property value="mbo.getMboValueData('RECEIPTQUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RECEIPTQUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RECEIPTQUANTITY')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('QTYREQUESTED').getTitle()" /></label>
					<input type="text"
							id="QTYREQUESTED" 
							required="<s:property value="mbo.getMboValueData('QTYREQUESTED').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('QTYREQUESTED').isReadOnly()"/>"
							value="<s:property value="mbo.getString('QTYREQUESTED')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('RECEIVEDUNIT').getTitle()" /></label>
					<input type="text"
							id="RECEIVEDUNIT" 
							required="<s:property value="mbo.getMboValueData('RECEIVEDUNIT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RECEIVEDUNIT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RECEIVEDUNIT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="RECEIVEDUNIT" data-source="MEASUREUNITID" data-display="MEASUREUNITID,ABBREVIATION,DESCRIPTION" data-search="MEASUREUNITID,ABBREVIATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CONVERSION').getTitle()" /></label>
					<input type="text"
							id="CONVERSION" 
							required="<s:property value="mbo.getMboValueData('CONVERSION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CONVERSION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CONVERSION')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.chargeinfo"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION"
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLDEBITACCT').getTitle()" /></label>
					<input type="text"
							id="GLDEBITACCT" 
							required="<s:property value="mbo.getMboValueData('GLDEBITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLDEBITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLDEBITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLDEBITACCT"></a>
				</li>	
				<li class="ui-divider"><s:text name="Receipt Details"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENTERBY').getTitle()" /></label>
					<input type="text"
							id="ENTERBY" 
							required="<s:property value="mbo.getMboValueData('ENTERBY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENTERBY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ENTERBY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACTUALDATE').getTitle()" /></label>
					<input type="text"
							id="ACTUALDATE" 
							required="<s:property value="mbo.getMboValueData('ACTUALDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ACTUALDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ACTUALDATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deletereceipt.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>
</body>
