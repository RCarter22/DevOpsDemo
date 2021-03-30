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
			<h3 class="ui-title"><s:text name="invissue.issueitem"/></h3>
			<a class="ui-btn-right" href="issue.action?id=<s:property value="mbo.getOwner().getUniqueIDValue()"/>"><span class="emm-check"></span></a>
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
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BINNUM').getTitle()" /></label>
					<input type="text"
							id="BINNUM" 
							required="<s:property value="mbo.getMboValueData('BINNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BINNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BINNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="BINNUM" data-source="BINNUM" data-display="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID" data-search="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID"></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('POSITIVEQUANTITY').getTitle()" /></label>
					<input type="text"
							id="POSITIVEQUANTITY" 
							required="<s:property value="mbo.getMboValueData('POSITIVEQUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('POSITIVEQUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('POSITIVEQUANTITY')"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('TOSITEID').getTitle()" /></label>
					<input type="text"
							id="TOSITEID" 
							required="<s:property value="mbo.getMboValueData('TOSITEID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOSITEID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOSITEID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOSITEID" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>					
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="WONUM" 
							required="<s:property value="mbo.getMboValueData('WONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION" data-search="WONUM,DESCRIPTION"></a>					
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,TYPE,SITEID,ORGID" data-search="LOCATION,DESCRIPTION,TYPE,SITEID,ORGID"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,LOCATION,SERIALNUM,ITEMNUM,SITEID" data-search="ASSETNUM,DESCRIPTION,LOCATION,SERIALNUM,ITEMNUM,SITEID"></a>
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ROTASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,LOCATION,SERIALNUM,ITEMNUM,SITEID" data-search="ASSETNUM,DESCRIPTION,LOCATION,SERIALNUM,ITEMNUM,SITEID"></a>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUETO').getTitle()" /></label>
					<input type="text"
							id="ISSUETO" 
							required="<s:property value="mbo.getMboValueData('ISSUETO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUETO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUETO')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUETO" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>					
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
				<li class="ui-divider"><s:text name="global.transactiondetails"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUETYPE').getTitle()" /></label>
					<input type="text"
							id="ISSUETYPE" 
							required="<s:property value="mbo.getMboValueData('ISSUETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUETYPE"></a>					
				</li>	
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deleteissue.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>
</body>
