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
			<h3 class="ui-title"><s:text name="po.poline"/></h3>
			<a class="ui-btn-right" onclick="emm.core.back()"><s:text name="global.ok"/></a>
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
							data-control="spinner" data-interval="1"
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LINETYPE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
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
				<li class="ui-divider"><s:text name="global.qtyandcost"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ORDERQTY').getTitle()" /></label>
					<input type="text"
							id="ORDERQTY" 
							required="<s:property value="mbo.getMboValueData('ORDERQTY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ORDERQTY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ORDERQTY')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ORDERUNIT').getTitle()" /></label>
					<input type="text"
							id="ORDERUNIT" 
							required="<s:property value="mbo.getMboValueData('ORDERUNIT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ORDERUNIT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ORDERUNIT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ORDERUNIT" data-source="MEASUREUNITID" data-display="MEASUREUNITID,ABBREVIATION,DESCRIPTION" data-search="MEASUREUNITID,ABBREVIATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CONVERSION').getTitle()" /></label>
					<input type="text"
							id="CONVERSION" 
							required="<s:property value="mbo.getMboValueData('CONVERSION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CONVERSION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CONVERSION')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('UNITCOST').getTitle()" /></label>
					<input type="text"
							id="UNITCOST" 
							required="<s:property value="mbo.getMboValueData('UNITCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('UNITCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('UNITCOST')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LINECOST').getTitle()" /></label>
					<input type="text"
							id="LINECOST" 
							required="<s:property value="mbo.getMboValueData('LINECOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LINECOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LINECOST')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.chargeinfo"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STORELOC').getTitle()" /></label>
					<input type="text"
							id=STORELOC 
							required="<s:property value="mbo.getMboValueData('STORELOC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STORELOC').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STORELOC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
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
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deleteline.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>
</body>
