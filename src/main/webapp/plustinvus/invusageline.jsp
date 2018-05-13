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
			<h3 class="ui-title"><s:text name="invusage.invusageline"/></h3>
			<a class="ui-btn-right" onclick="emm.core.back()"><s:text name="global.ok"/></a>
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVUSELINENUM').getTitle()" /></label>
					<input type="text"
							id="INVUSELINENUM" 
							required="<s:property value="mbo.getMboValueData('INVUSELINENUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('INVUSELINENUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('INVUSELINENUM')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('USETYPE').getTitle()" /></label>
					<input type="text"
							id="USETYPE" 
							required="<s:property value="mbo.getMboValueData('USETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('USETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('USETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="USETYPE"></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('QUANTITY').getTitle()" /></label>
					<input type="text"
							id="QUANTITY" 
							required="<s:property value="mbo.getMboValueData('QUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('QUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('QUANTITY')"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('INVENTORY.ISSUEUNIT').getTitle()" /></label>
					<input type="text"
							id="INVENTORY.ISSUEUNIT" 
							required="<s:property value="mbo.getMboValueData('INVENTORY.ISSUEUNIT').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('INVENTORY.ISSUEUNIT')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVENTORY.COSTTYPE').getTitle()" /></label>
					<input type="text"
							id=INVENTORY.COSTTYPE 
							required="<s:property value="mbo.getMboValueData('INVENTORY.COSTTYPE').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('INVENTORY.COSTTYPE')"/>"
					/>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DISPLAYUNITCOST').getTitle()" /></label>
					<input type="text"
							id="UNITCOST" 
							required="<s:property value="mbo.getMboValueData('DISPLAYUNITCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DISPLAYUNITCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('DISPLAYUNITCOST')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DISPLAYLINECOST').getTitle()" /></label>
					<input type="text"
							id="LINECOST" 
							required="<s:property value="mbo.getMboValueData('DISPLAYLINECOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DISPLAYLINECOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('DISPLAYLINECOST')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-divider"><s:text name="invissue.bindetails"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMBIN').getTitle()" /></label>
					<input type="text"
							id="FROMBIN" 
							required="<s:property value="mbo.getMboValueData('FROMBIN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FROMBIN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FROMBIN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMBIN" data-source="BINNUM" data-display="BINNUM,LOTNUM,CURBAL,SITEID" data-search="BINNUM,LOTNUM"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMLOT').getTitle()" /></label>
					<input type="text"
							id="FROMLOT" 
							required="<s:property value="mbo.getMboValueData('FROMLOT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FROMLOT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FROMLOT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMLOT" data-source="INVBALLOT" data-display="BINNUM,LOTNUM,USEBY,CURBAL,SITEID" data-search="BINNUM,LOTNUM" ></a>
				</li>
				<s:if test="mbo.getString('USETYPE').equals('TRANSFER')">
				<li class="ui-divider"><s:text name="invissue.transferdetails"/></li>
				<li class="ui-field ui-field-auto ui-details">
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOBIN" data-source="BINNUM" data-display="BINNUM,LOTNUM,CURBAL,SITEID" data-search="BINNUM,LOTNUM"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOLOT').getTitle()" /></label>
					<input type="text"
							id="TOLOT" 
							required="<s:property value="mbo.getMboValueData('TOLOT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOLOT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOLOT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOLOT" data-source="INVBALLOT" data-display="BINNUM,LOTNUM,USEBY,CURBAL,SITEID" data-search="BINNUM,LOTNUM"></a>
				</li>	
				</s:if>		
				<li class="ui-divider"><s:text name="global.chargeinfo"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUETO').getTitle()" /></label>
					<input type="text"
							id="ISSUETO" 
							required="<s:property value="mbo.getMboValueData('ISSUETO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUETO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUETO')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUETO" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a>
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
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM"
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p><s:property value="mbo.getString('ASSET.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID" data-search="ASSETNUM,DESCRIPTION,LOCATION"></a>
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
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
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deleteline.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>
</body>
