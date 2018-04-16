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
			<h3 class="ui-title"><s:text name="invissue.transferout"/></h3>
			<a class="ui-btn-right" href="transferout.action?id=<s:property value="mbo.getMboSet('FROMLOCATION').getMbo(0).getUniqueIDValue()"/>"><s:text name="global.ok"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
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
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-divider"><s:text name="invissue.transferdetails"/></li>
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
					<label><s:property value="mbo.getMboValueInfoStatic('NEWSITE').getTitle()" /></label>
					<input type="text"
							id="NEWSITE" 
							required="<s:property value="mbo.getMboValueData('NEWSITE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('NEWSITE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('NEWSITE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="NEWSITE" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMBIN').getTitle()" /></label>
					<input type="text"
							id="FROMBIN" 
							required="<s:property value="mbo.getMboValueData('FROMBIN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FROMBIN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FROMBIN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMBIN" data-source="BINNUM" data-display="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID" data-search="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID"></a>
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOBIN" data-source="BINNUM" data-display="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID" data-search="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ROTASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ROTASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ROTASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ROTASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ROTASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ROTASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-divider"><s:text name="global.chargeinfo"/></li>
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
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLCREDITACCT').getTitle()" /></label>
					<input type="text"
							id="GLCREDITACCT" 
							required="<s:property value="mbo.getMboValueData('GLCREDITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLCREDITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLCREDITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLCREDITACCT"></a>
				</li>	
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deletetransferout.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>
</body>
